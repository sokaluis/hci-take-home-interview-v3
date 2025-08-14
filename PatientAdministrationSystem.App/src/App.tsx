import { useEffect } from 'react';
import { usePatientSearch } from './hooks/usePatientSearch';
import { SearchBar } from './components/SearchBar';
import { PatientCard } from './components/PatientCard';
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

  useEffect(() => {
    searchPatients();
  }, [searchPatients]);

  const handleSearch = () => {
    searchPatients(searchTerm || undefined);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>🏥 Patient Search System</h1>
        <p>Find patient visit information</p>
      </header>

      <main className="app-main">
        <SearchBar
          searchTerm={searchTerm}
          onSearchTermChange={setSearchTerm}
          onSearch={handleSearch}
          onClear={clearSearch}
          loading={loading}
        />

        {error && (
          <div className="error-message">
            ❌ {error}
          </div>
        )}

        {loading && (
          <div className="loading">
            ⏳ Searching patients...
          </div>
        )}

        {!loading && !error && patients.length > 0 && (
          <div className="results">
            <h2>📊 Found {patients.length} patient{patients.length !== 1 ? 's' : ''}</h2>
            <div className="patients-grid">
              {patients.map((patient) => (
                <PatientCard key={patient.patientId} patient={patient} />
              ))}
            </div>
          </div>
        )}

        {!loading && !error && patients.length === 0 && searchTerm && (
          <div className="no-results">
            🔍 No patients found for "{searchTerm}"
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
