import React from 'react';
import { SearchIcon, LoadingIcon, CloseIcon } from './ui/Icons';

interface SearchBarProps {
  searchTerm: string;
  onSearchTermChange: (value: string) => void;
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
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchTermChange(e.target.value)}
        placeholder="Search by patient name or email..."
        disabled={loading}
      />
      <button 
        type="submit" 
        disabled={loading}
      >
        {loading ? <LoadingIcon size="sm" /> : <SearchIcon size="sm" />} Search
      </button>
      {searchTerm && (
        <button 
          type="button" 
          onClick={onClear}
          disabled={loading}
        >
          <CloseIcon size="sm" /> Clear
        </button>
      )}
    </form>
  );
}; 