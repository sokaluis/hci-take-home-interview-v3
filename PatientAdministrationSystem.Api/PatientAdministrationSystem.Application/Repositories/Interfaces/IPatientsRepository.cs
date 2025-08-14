using System.Linq.Expressions;
using PatientAdministrationSystem.Application.Entities;

namespace PatientAdministrationSystem.Application.Repositories.Interfaces;

public interface IPatientsRepository
{
    Task<IEnumerable<PatientEntity>> GetAllPatientsWithVisitsAsync();
    Task<IEnumerable<PatientEntity>> SearchPatientsAsync(string searchTerm);
    Task<PatientEntity?> GetPatientWithVisitsByIdAsync(Guid patientId);
}