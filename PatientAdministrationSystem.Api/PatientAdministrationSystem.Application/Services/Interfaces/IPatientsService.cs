using PatientAdministrationSystem.Application.Entities;

namespace PatientAdministrationSystem.Application.Interfaces;

public interface IPatientsService
{
    Task<IEnumerable<PatientVisitDto>> SearchPatientsAsync(string? searchTerm = null);
    Task<PatientVisitDto?> GetPatientVisitByIdAsync(Guid patientId);
}

public class PatientVisitDto
{
    public Guid PatientId { get; set; }
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string FullName => $"{FirstName} {LastName}";
    public Guid HospitalId { get; set; }
    public string HospitalName { get; set; } = string.Empty;
    public Guid VisitId { get; set; }
    public DateTime VisitDate { get; set; }
}