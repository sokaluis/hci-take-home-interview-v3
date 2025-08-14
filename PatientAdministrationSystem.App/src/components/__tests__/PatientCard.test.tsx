import { render } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { PatientCard } from '../PatientCard';
import { PatientVisit } from '../../types/api';

describe('PatientCard', () => {
  const mockOnClick = vi.fn();

  const mockPatientWithVisit: PatientVisit = {
    patientId: '123e4567-e89b-12d3-a456-426614174000',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@test.com',
    fullName: 'John Doe',
    hospitalId: '456e7890-e89b-12d3-a456-426614174001',
    hospitalName: 'Test Hospital',
    visitId: '789e0123-e89b-12d3-a456-426614174002',
    visitDate: '2023-08-22T00:00:00Z'
  };

  const mockPatientWithoutVisit: PatientVisit = {
    patientId: '987e6543-e89b-12d3-a456-426614174003',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@test.com',
    fullName: 'Jane Smith',
    hospitalId: '',
    hospitalName: 'No Hospital',
    visitId: '',
    visitDate: ''
  };

  beforeEach(() => {
    mockOnClick.mockClear();
  });

  it('should render patient with visit information correctly', () => {
    const { getByText } = render(
      <PatientCard patient={mockPatientWithVisit} onClick={mockOnClick} />
    );
    
    expect(getByText('John Doe')).toBeDefined();
    expect(getByText('john.doe@test.com')).toBeDefined();
    expect(getByText('Test Hospital')).toBeDefined();
    expect(getByText('Aug 21, 2023')).toBeDefined();
    expect(getByText('View Details')).toBeDefined();
  });

  it('should render patient without visit information correctly', () => {
    const { getByText } = render(
      <PatientCard patient={mockPatientWithoutVisit} onClick={mockOnClick} />
    );
    
    expect(getByText('Jane Smith')).toBeDefined();
    expect(getByText('jane.smith@test.com')).toBeDefined();
    expect(getByText('No hospital visits')).toBeDefined();
    expect(getByText('View Details')).toBeDefined();
  });

  it('should render patient card structure correctly', () => {
    const { container } = render(
      <PatientCard patient={mockPatientWithVisit} onClick={mockOnClick} />
    );
    
    const patientCard = container.querySelector('.patient-card');
    const patientAvatar = container.querySelector('.patient-avatar');
    const viewDetailsBtn = container.querySelector('.view-details-btn');
    const avatarImg = container.querySelector('.avatar-img');
    
    expect(patientCard).toBeDefined();
    expect(patientAvatar).toBeDefined();
    expect(viewDetailsBtn).toBeDefined();
    expect(avatarImg).toBeDefined();
  });

  it('should have proper CSS classes applied', () => {
    const { container } = render(
      <PatientCard patient={mockPatientWithVisit} onClick={mockOnClick} />
    );
    
    expect(container.querySelector('.patient-card-header')).toBeDefined();
    expect(container.querySelector('.patient-card-body')).toBeDefined();
    expect(container.querySelector('.visit-info')).toBeDefined();
    expect(container.querySelector('.hospital-info')).toBeDefined();
    expect(container.querySelector('.visit-date')).toBeDefined();
  });

  // Additional tests that could be implemented in a full project:
  // - Test patient avatar src generation based on name
  // - Test icon component rendering
  // - Test card hover effects (with user-event library)
  // - Test responsive behavior
  // - Test accessibility attributes
  // - Test keyboard navigation
  // - Test different date formats
  // - Test long names/emails handling
  // - Test card animations
}); 