import React from 'react';
import { PatientVisit } from '../types/api';
import './PatientModal.css';

interface PatientModalProps {
  patient: PatientVisit | null;
  isOpen: boolean;
  onClose: () => void;
}

export const PatientModal: React.FC<PatientModalProps> = ({ patient, isOpen, onClose }) => {
  if (!isOpen || !patient) return null;

  const hasVisit = patient.hospitalName && patient.hospitalName !== 'No Hospital';

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-container">
        <div className="modal-header">
          <h2>👤 Patient Details</h2>
          <button className="modal-close" onClick={onClose}>
            ✕
          </button>
        </div>
        
        <div className="modal-content">
          <div className="patient-info-section">
            <h3>📋 Personal Information</h3>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Full Name:</span>
                <span className="info-value">{patient.fullName}</span>
              </div>
              <div className="info-item">
                <span className="info-label">First Name:</span>
                <span className="info-value">{patient.firstName}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Last Name:</span>
                <span className="info-value">{patient.lastName}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Email:</span>
                <span className="info-value">{patient.email}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Patient ID:</span>
                <span className="info-value patient-id">{patient.patientId}</span>
              </div>
            </div>
          </div>

          {hasVisit ? (
            <div className="visit-info-section">
              <h3>🏥 Hospital Visit Information</h3>
              <div className="info-grid">
                <div className="info-item">
                  <span className="info-label">Hospital:</span>
                  <span className="info-value">{patient.hospitalName}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Visit Date:</span>
                  <span className="info-value">
                    {new Date(patient.visitDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                <div className="info-item">
                  <span className="info-label">Visit ID:</span>
                  <span className="info-value visit-id">{patient.visitId}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Hospital ID:</span>
                  <span className="info-value hospital-id">{patient.hospitalId}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="no-visit-section">
              <div className="no-visit-message">
                <h3>🏥 Hospital Visit Information</h3>
                <p>📋 No hospital visits recorded for this patient.</p>
              </div>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}; 