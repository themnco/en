import React from 'react';
import SearchIcon from './icons/SearchIcon';

interface SearchBarProps {
  query: string;
  setQuery: (query: string) => void;
  onSearch: () => void;
  isLoading: boolean;
  disabled: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ query, setQuery, onSearch, isLoading, disabled }) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000] w-11/12 max-w-lg">
      <div className="relative flex items-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search for places..."
          disabled={disabled || isLoading}
          className="w-full pl-4 pr-12 py-3 rounded-full bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg"
        />
        <button
          onClick={onSearch}
          disabled={disabled || isLoading}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
          ) : (
            <SearchIcon className="w-5 h-5 text-white" />
          )}
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
