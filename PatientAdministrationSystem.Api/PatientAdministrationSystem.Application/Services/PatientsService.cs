using System.Linq.Expressions;
using PatientAdministrationSystem.Application.Entities;
using PatientAdministrationSystem.Application.Interfaces;
using PatientAdministrationSystem.Application.Repositories.Interfaces;

namespace PatientAdministrationSystem.Application.Services;

public class PatientsService : IPatientsService
{
    private readonly IPatientsRepository _repository;

    public PatientsService(IPatientsRepository repository)
    {
        _repository = repository ?? throw new ArgumentNullException(nameof(repository));
    }

    public async Task<IEnumerable<PatientVisitDto>> SearchPatientsAsync(string? searchTerm = null)
    {
        var patients = string.IsNullOrWhiteSpace(searchTerm)
            ? await _repository.GetAllPatientsWithVisitsAsync()
            : await _repository.SearchPatientsAsync(searchTerm);

        var patientVisits = new List<PatientVisitDto>();

        foreach (var patient in patients)
        {
            if (patient.PatientHospitals?.Any() == true)
            {
                foreach (var patientHospital in patient.PatientHospitals)
                {
                    patientVisits.Add(
                        new PatientVisitDto
                        {
                            PatientId = patient.Id,
                            FirstName = patient.FirstName,
                            LastName = patient.LastName,
                            Email = patient.Email,
                            HospitalId = patientHospital.HospitalId,
                            HospitalName = patientHospital.Hospital?.Name ?? "Unknown Hospital",
                            VisitId = patientHospital.VisitId,
                            VisitDate = patientHospital.Visit?.Date ?? DateTime.MinValue,
                        }
                    );
                }
            }
            else
            {
                // Include patients without visits for completeness
                patientVisits.Add(
                    new PatientVisitDto
                    {
                        PatientId = patient.Id,
                        FirstName = patient.FirstName,
                        LastName = patient.LastName,
                        Email = patient.Email,
                        HospitalId = Guid.Empty,
                        HospitalName = "No Hospital",
                        VisitId = Guid.Empty,
                        VisitDate = DateTime.MinValue,
                    }
                );
            }
        }

        return patientVisits.OrderBy(pv => pv.LastName).ThenBy(pv => pv.FirstName);
    }

    public async Task<PatientVisitDto?> GetPatientVisitByIdAsync(Guid patientId)
    {
        if (patientId == Guid.Empty)
            throw new ArgumentException("Patient ID cannot be empty", nameof(patientId));

        var patient = await _repository.GetPatientWithVisitsByIdAsync(patientId);

        if (patient == null)
            return null;

        var firstVisit = patient.PatientHospitals?.FirstOrDefault();

        return new PatientVisitDto
        {
            PatientId = patient.Id,
            FirstName = patient.FirstName,
            LastName = patient.LastName,
            Email = patient.Email,
            HospitalId = firstVisit?.HospitalId ?? Guid.Empty,
            HospitalName = firstVisit?.Hospital?.Name ?? "No Hospital",
            VisitId = firstVisit?.VisitId ?? Guid.Empty,
            VisitDate = firstVisit?.Visit?.Date ?? DateTime.MinValue,
        };
    }
}
