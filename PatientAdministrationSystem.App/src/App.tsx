import { useEffect, useState } from 'react';
import { usePatientSearch } from './hooks/usePatientSearch';
import { SearchBar } from './components/SearchBar';
import { PatientCard } from './components/PatientCard';
import { PatientModal } from './components/PatientModal';
import { Navbar } from './components/Navbar';
import { LoadingSpinner, EmptyState, SearchIcon } from './components/ui';
import { PatientVisit } from './types/api';
import './App.css';

function App() {
  const { 
    patients, 
    loading, 
    error, 
    searchTerm, 
    setSearchTerm, 
    searchPatients, 
    clearSearch 
  } = usePatientSearch();

  const [selectedPatient, setSelectedPatient] = useState<PatientVisit | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    searchPatients();
  }, [searchPatients]);

  const handleSearch = () => {
    searchPatients(searchTerm || undefined);
  };

  const handlePatientClick = (patient: PatientVisit) => {
    setSelectedPatient(patient);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPatient(null);
  };

  return (
    <div className="app">
      <Navbar />
      
      <main className="app-main">
        <div className="app-container">
          <div className="search-section">
            <div className="search-header">
              <h1 className="search-title">
                <SearchIcon size="lg" /> Patient Search
              </h1>
              <p className="search-subtitle">
                Search for patients by name or email to view their hospital visit information
              </p>
            </div>
            
            <SearchBar
              searchTerm={searchTerm}
              onSearchTermChange={setSearchTerm}
              onSearch={handleSearch}
              onClear={clearSearch}
              loading={loading}
            />
          </div>

          <div className="results-section">
            {error && (
              <EmptyState
                type="error"
                title="Error Loading Patients"
                description={error}
              />
            )}

            {loading && (
              <LoadingSpinner
                size="lg"
                text="⏳ Searching patients..."
                center
              />
            )}

            {!loading && !error && patients.length > 0 && (
              <div className="results-container">
                <div className="results-header">
                  <h2 className="results-title">
                    📊 Search Results
                    <span className="results-count">({patients.length} patients found)</span>
                  </h2>
                </div>
                <div className="patients-grid">
                  {patients.map((patient) => (
                    <PatientCard
                      key={patient.patientId}
                      patient={patient}
                      onClick={() => handlePatientClick(patient)}
                    />
                  ))}
                </div>
              </div>
            )}

            {!loading && !error && patients.length === 0 && searchTerm && (
              <EmptyState
                type="no-results"
                title="No Patients Found"
                description={`No patients match your search for "${searchTerm}". Try a different search term.`}
              />
            )}

            {!loading && !error && patients.length === 0 && !searchTerm && (
              <EmptyState
                type="welcome"
                title="Welcome to Patient Search"
                description="Search for patients using the search bar above, or browse all patients to get started."
              />
            )}
          </div>
        </div>
      </main>

      <PatientModal
        patient={selectedPatient}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}

export default App;
