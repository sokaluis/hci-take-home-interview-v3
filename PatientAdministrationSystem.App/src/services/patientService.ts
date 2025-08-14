import apiClient from '../api/apiClient';
import { PatientVisit, SearchParams } from '../types/api';

export const patientService = {
  async searchPatients(params?: SearchParams): Promise<PatientVisit[]> {
    const response = await apiClient.get('/api/patients', { params });
    return response.data;
  },

  async getPatientById(id: string): Promise<PatientVisit> {
    const response = await apiClient.get(`/api/patients/${id}`);
    return response.data;
  },

  async healthCheck(): Promise<{ status: string; timestamp: string }> {
    const response = await apiClient.get('/api/patients/health');
    return response.data;
  }
}; 