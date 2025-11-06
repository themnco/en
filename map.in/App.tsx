import React, { useState, useEffect } from 'react';
import { useGeolocation } from './hooks/useGeolocation';
import { searchPlaces } from './services/geminiService';
import { SearchResult } from './types';
import SearchBar from './components/SearchBar';
import MapComponent from './components/MapComponent';
import ResultsPanel from './components/ResultsPanel';

const App: React.FC = () => {
  const { location, error: locationError, loading: locationLoading } = useGeolocation();
  const [query, setQuery] = useState<string>('');
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [apiLoading, setApiLoading] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!query || !location) return;

    setApiLoading(true);
    setApiError(null);
    try {
      const result = await searchPlaces(query, location);
      setSearchResult(result);
    } catch (err) {
      setApiError('Failed to get results. Please try again.');
    } finally {
      setApiLoading(false);
    }
  };

  const getStatusMessage = () => {
    if (locationLoading) {
        return 'Getting your location...';
    }
    if (locationError) {
        return locationError;
    }
    if (apiError) {
        return apiError;
    }
    if (!location) {
        return 'Please allow location access to use the map.';
    }
    return 'Ready to search';
  };
  
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-gray-900">
      <header className="absolute top-0 left-0 p-4 z-[1001]">
        <h1 className="text-2xl font-bold tracking-wider text-white" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
          ANTHROP\C <span className="text-blue-400">MAPS</span>
        </h1>
      </header>
      
      {location && (
        <SearchBar
          query={query}
          setQuery={setQuery}
          onSearch={handleSearch}
          isLoading={apiLoading}
          disabled={!location}
        />
      )}

      <main className="h-full w-full">
        {location ? (
          <MapComponent center={location} />
        ) : (
          <div className="flex items-center justify-center h-full w-full flex-col text-center">
            <h2 className="text-2xl font-semibold mb-2">{getStatusMessage()}</h2>
             {locationLoading && <div className="mt-4 w-10 h-10 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>}
            <p className="text-gray-400 max-w-sm">This app requires your current location to provide grounded search results. Please grant permission when prompted.</p>
          </div>
        )}
      </main>

      <ResultsPanel result={searchResult} isLoading={apiLoading} />
    </div>
  );
};

export default App;
