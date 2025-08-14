import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { PatientCard } from '../PatientCard';
import { PatientVisit } from '../../types/api';

describe('PatientCard', () => {
  const mockPatientWithVisit: PatientVisit = {
    patientId: '123',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@test.com',
    fullName: 'John Doe',
    hospitalId: '456',
    hospitalName: 'Test Hospital',
    visitId: '789',
    visitDate: '2023-08-22T00:00:00'
  };

  const mockPatientWithoutVisit: PatientVisit = {
    patientId: '124',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@test.com',
    fullName: 'Jane Smith',
    hospitalId: '',
    hospitalName: 'No Hospital',
    visitId: '',
    visitDate: ''
  };

  it('should render patient with visit information correctly', () => {
    const { getByText } = render(<PatientCard patient={mockPatientWithVisit} />);
    
    expect(getByText('John Doe')).toBeDefined();
    expect(getByText('📧 john.doe@test.com')).toBeDefined();
    expect(getByText('🏥 Test Hospital')).toBeDefined();
    expect(getByText('📅 8/22/2023')).toBeDefined();
  });

  it('should render patient without visit information correctly', () => {
    const { getByText } = render(<PatientCard patient={mockPatientWithoutVisit} />);
    
    expect(getByText('Jane Smith')).toBeDefined();
    expect(getByText('📧 jane.smith@test.com')).toBeDefined();
    expect(getByText('🏥 No hospital visits')).toBeDefined();
  });

  // Additional tests that would be implemented in a full project:
  // - Test hover effects and accessibility
  // - Test with different date formats
  // - Test with long patient names (text truncation)
  // - Test with special characters in names/emails
  // - Test component styling and CSS classes
  // - Test with missing/null data fields
  // - Test responsive behavior on different screen sizes
  // - Test API integration with usePatientSearch hook
  // - Test error handling and loading states
  // - Test search functionality with different inputs
  // - Test form validation and user interactions
}); 