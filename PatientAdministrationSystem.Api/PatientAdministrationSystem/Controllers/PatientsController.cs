using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using PatientAdministrationSystem.Application.Interfaces;

namespace Hci.Ah.Home.Api.Gateway.Controllers.Patients;

[Route("api/patients")]
[ApiExplorerSettings(GroupName = "Patients")]
[ApiController]
public class PatientsController : ControllerBase
{
    private readonly IPatientsService _patientsService;
    private readonly ILogger<PatientsController> _logger;

    public PatientsController(IPatientsService patientsService, ILogger<PatientsController> logger)
    {
        _patientsService = patientsService;
        _logger = logger;
    }

    /// <summary>
    /// Search for patient visit information
    /// </summary>
    /// <param name="searchTerm">Optional search term to filter by patient name or email</param>
    /// <returns>List of patient visits matching the search criteria</returns>
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult<IEnumerable<PatientVisitDto>>> SearchPatients(
        [FromQuery] string? searchTerm = null
    )
    {
        var stopwatch = Stopwatch.StartNew();
        var requestId = Guid.NewGuid().ToString("N")[..8];

        try
        {
            // Validate search term length
            if (!string.IsNullOrWhiteSpace(searchTerm) && searchTerm.Length > 100)
            {
                _logger.LogWarning(
                    "🚫 [400] 'Search Patients' | ❌ Validation Error: Search term too long ({Length} chars) | [{RequestId}]",
                    searchTerm.Length,
                    requestId
                );
                return BadRequest("Search term cannot exceed 100 characters");
            }

            var patientVisits = await _patientsService.SearchPatientsAsync(searchTerm);
            var resultCount = patientVisits.Count();
            stopwatch.Stop();

            // Log successful response with visual indicators
            _logger.LogInformation(
                "✅ [200] 'Search Patients' | 📊 {Count} results | ⏱️ {ElapsedMs}ms | 🔍 '{SearchTerm}' | [{RequestId}]",
                resultCount,
                stopwatch.ElapsedMilliseconds,
                searchTerm ?? "all",
                requestId
            );

            return Ok(patientVisits);
        }
        catch (Exception ex)
        {
            stopwatch.Stop();
            _logger.LogError(
                "💥 [500] 'Search Patients' | ❌ ERROR after {ElapsedMs}ms | [{RequestId}]",
                stopwatch.ElapsedMilliseconds,
                requestId
            );
            _logger.LogError(
                "🔍 Request Details: GET /api/patients?searchTerm={SearchTerm} | [{RequestId}]",
                searchTerm ?? "null",
                requestId
            );
            _logger.LogError(
                "🐛 Exception: {ExceptionType} - {Message} | [{RequestId}]",
                ex.GetType().Name,
                ex.Message,
                requestId
            );
            _logger.LogError(
                "📋 Stack Trace: {StackTrace} | [{RequestId}]",
                ex.StackTrace,
                requestId
            );

            return StatusCode(500, "An error occurred while searching for patients");
        }
    }

    /// <summary>
    /// Get patient visit information by patient ID
    /// </summary>
    /// <param name="id">The patient ID</param>
    /// <returns>Patient visit information</returns>
    [HttpGet("{id:guid}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult<PatientVisitDto>> GetPatientById(Guid id)
    {
        var stopwatch = Stopwatch.StartNew();
        var requestId = Guid.NewGuid().ToString("N")[..8];

        try
        {
            if (id == Guid.Empty)
            {
                _logger.LogWarning(
                    "🚫 [400] 'Get Patient by ID' | ❌ Validation Error: Empty patient ID | [{RequestId}]",
                    requestId
                );
                return BadRequest("Patient ID cannot be empty");
            }

            var patientVisit = await _patientsService.GetPatientVisitByIdAsync(id);
            stopwatch.Stop();

            if (patientVisit == null)
            {
                _logger.LogWarning(
                    "🔍 [404] 'Get Patient by ID' | ❌ Patient not found | ⏱️ {ElapsedMs}ms | 🆔 {PatientId} | [{RequestId}]",
                    stopwatch.ElapsedMilliseconds,
                    id,
                    requestId
                );
                return NotFound($"Patient with ID {id} not found");
            }

            // Log successful response
            _logger.LogInformation(
                "✅ [200] 'Get Patient by ID' | 👤 {PatientName} | ⏱️ {ElapsedMs}ms | 🆔 {PatientId} | [{RequestId}]",
                patientVisit.FullName,
                stopwatch.ElapsedMilliseconds,
                id,
                requestId
            );

            return Ok(patientVisit);
        }
        catch (Exception ex)
        {
            stopwatch.Stop();
            _logger.LogError(
                "💥 [500] 'Get Patient by ID' | ❌ ERROR after {ElapsedMs}ms | [{RequestId}]",
                stopwatch.ElapsedMilliseconds,
                requestId
            );
            _logger.LogError(
                "🔍 Request Details: GET /api/patients/{PatientId} | [{RequestId}]",
                id,
                requestId
            );
            _logger.LogError(
                "🐛 Exception: {ExceptionType} - {Message} | [{RequestId}]",
                ex.GetType().Name,
                ex.Message,
                requestId
            );
            _logger.LogError(
                "📋 Stack Trace: {StackTrace} | [{RequestId}]",
                ex.StackTrace,
                requestId
            );

            return StatusCode(500, "An error occurred while retrieving patient information");
        }
    }

    /// <summary>
    /// Health check endpoint for the patients API
    /// </summary>
    /// <returns>API status</returns>
    [HttpGet("health")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public ActionResult<object> HealthCheck()
    {
        var requestId = Guid.NewGuid().ToString("N")[..8];
        var response = new { status = "healthy", timestamp = DateTime.UtcNow };

        _logger.LogInformation(
            "💚 [200] 'Health Check' | ✅ API is healthy | 🕐 {Timestamp} | [{RequestId}]",
            DateTime.UtcNow.ToString("HH:mm:ss"),
            requestId
        );

        return Ok(response);
    }
}
