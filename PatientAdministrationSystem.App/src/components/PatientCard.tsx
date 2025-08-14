import { PatientVisit } from '../types/api';

interface PatientCardProps {
  patient: PatientVisit;
}

export const PatientCard = ({ patient }: PatientCardProps) => {
  const hasVisit = patient.hospitalName && patient.hospitalName !== 'No Hospital';
  
  return (
    <div className="patient-card">
      <h3>{patient.fullName}</h3>
      <div className="patient-details">
        <p>📧 {patient.email}</p>
        {hasVisit ? (
          <>
            <p>🏥 {patient.hospitalName}</p>
            <p>📅 {new Date(patient.visitDate).toLocaleDateString()}</p>
          </>
        ) : (
          <p className="no-visits">🏥 No hospital visits</p>
        )}
      </div>
    </div>
  );
}; 