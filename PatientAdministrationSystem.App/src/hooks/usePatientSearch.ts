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
      // Simulate realistic loading time
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const searchParams = term ? { searchTerm: term } : undefined;
      const results = await patientService.searchPatients(searchParams);
      setPatients(results);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred while searching patients';
      setError(errorMessage);
      setPatients([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearSearch = useCallback(() => {
    setSearchTerm('');
    setError(null);
    searchPatients();
  }, [searchPatients]);

  return {
    patients,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    searchPatients,
    clearSearch,
  };
}; 