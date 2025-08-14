using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using PatientAdministrationSystem.Application.Entities;
using PatientAdministrationSystem.Application.Repositories.Interfaces;

namespace PatientAdministrationSystem.Infrastructure.Repositories;

public class PatientsRepository : IPatientsRepository
{
    private readonly HciDataContext _context;

    public PatientsRepository(HciDataContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<PatientEntity>> GetAllPatientsWithVisitsAsync()
    {
        return await _context
            .Patients.Include(p => p.PatientHospitals!)
            .ThenInclude(ph => ph.Hospital)
            .Include(p => p.PatientHospitals!)
            .ThenInclude(ph => ph.Visit)
            .ToListAsync();
    }

    public async Task<IEnumerable<PatientEntity>> SearchPatientsAsync(string searchTerm)
    {
        var query = _context
            .Patients.Include(p => p.PatientHospitals!)
            .ThenInclude(ph => ph.Hospital)
            .Include(p => p.PatientHospitals!)
            .ThenInclude(ph => ph.Visit)
            .AsQueryable();

        if (!string.IsNullOrWhiteSpace(searchTerm))
        {
            var lowerSearchTerm = searchTerm.ToLower();
            query = query.Where(p =>
                p.FirstName.ToLower().Contains(lowerSearchTerm)
                || p.LastName.ToLower().Contains(lowerSearchTerm)
                || p.Email.ToLower().Contains(lowerSearchTerm)
            );
        }

        return await query.ToListAsync();
    }

    public async Task<PatientEntity?> GetPatientWithVisitsByIdAsync(Guid patientId)
    {
        return await _context
            .Patients.Include(p => p.PatientHospitals!)
            .ThenInclude(ph => ph.Hospital)
            .Include(p => p.PatientHospitals!)
            .ThenInclude(ph => ph.Visit)
            .FirstOrDefaultAsync(p => p.Id == patientId);
    }
}
