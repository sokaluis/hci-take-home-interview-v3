interface SearchBarProps {
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
  onSearch: () => void;
  onClear: () => void;
  loading: boolean;
}

export const SearchBar = ({ 
  searchTerm, 
  onSearchTermChange, 
  onSearch, 
  onClear, 
  loading 
}: SearchBarProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <div className="search-input-group">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchTermChange(e.target.value)}
          placeholder="Search by patient name or email..."
          className="search-input"
          disabled={loading}
        />
        <button 
          type="submit" 
          className="search-btn"
          disabled={loading}
        >
          {loading ? '⏳' : '🔍'} Search
        </button>
        {searchTerm && (
          <button 
            type="button" 
            onClick={onClear}
            className="clear-btn"
            disabled={loading}
          >
            ✖️ Clear
          </button>
        )}
      </div>
    </form>
  );
}; 