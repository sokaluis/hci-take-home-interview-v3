import { useState, useCallback } from 'react';
import { PatientVisit } from '../types/api';
import { patientService } from '../services/patientService';

export const usePatientSearch = () => {
  const [patients, setPatients] = useState<PatientVisit[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const searchPatients = useCallback(async (term?: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const results = await patientService.searchPatients(
        term ? { searchTerm: term } : undefined
      );
      setPatients(results);
    } catch (err) {
      setError('Failed to search patients. Please try again.');
      setPatients([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearSearch = useCallback(() => {
    setSearchTerm('');
    setPatients([]);
    setError(null);
  }, []);

  return {
    patients,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    searchPatients,
    clearSearch
  };
}; 