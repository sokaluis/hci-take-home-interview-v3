export interface PatientVisit {
  patientId: string;
  firstName: string;
  lastName: string;
  email: string;
  fullName: string;
  hospitalId: string;
  hospitalName: string;
  visitId: string;
  visitDate: string;
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export interface SearchParams {
  searchTerm?: string;
} 