import React from 'react';
import { PatientVisit } from '../types/api';
import { EmailIcon, HospitalIcon, CalendarIcon, DocumentIcon } from './ui/Icons';

interface PatientCardProps {
  patient: PatientVisit;
  onClick: () => void;
}

export const PatientCard: React.FC<PatientCardProps> = ({ patient, onClick }) => {
  const hasVisit = patient.hospitalName && patient.hospitalName !== 'No Hospital';
  
  // Generate consistent avatar based on patient name
  const avatarSeed = patient.fullName.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="patient-card" onClick={onClick}>
      <div className="patient-card-header">
        <div className="patient-avatar">
          <img 
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${avatarSeed}&backgroundColor=3182ce`}
            alt={`${patient.fullName} avatar`}
            className="avatar-img"
          />
        </div>
        <div className="patient-basic-info">
          <h3 className="patient-name">{patient.fullName}</h3>
          <p className="patient-email">
            <EmailIcon size="sm" /> {patient.email}
          </p>
        </div>
        <div className="patient-card-actions">
          <button className="view-details-btn" type="button">
            View Details
          </button>
        </div>
      </div>
      
      <div className="patient-card-body">
        {hasVisit ? (
          <div className="visit-info">
            <div className="hospital-info">
              <HospitalIcon size="sm" className="info-icon" />
              <span className="hospital-name">{patient.hospitalName}</span>
            </div>
            <div className="visit-date">
              <CalendarIcon size="sm" className="info-icon" />
              <span className="date-text">
                {new Date(patient.visitDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </span>
            </div>
          </div>
        ) : (
          <div className="no-visits">
            <DocumentIcon size="sm" className="no-visits-icon" />
            <span className="no-visits-text">No hospital visits</span>
          </div>
        )}
      </div>
    </div>
  );
}; 