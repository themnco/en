import React from 'react';
import { SearchResult } from '../types';

interface ResultsPanelProps {
  result: SearchResult | null;
  isLoading: boolean;
}

const ResultsPanel: React.FC<ResultsPanelProps> = ({ result, isLoading }) => {
  if (isLoading) {
    return null; // Don't show panel while loading, a spinner is in the search bar
  }

  if (!result || (!result.text && result.groundingChunks.length === 0)) {
    return null;
  }

  return (
    <div className="absolute bottom-0 left-0 right-0 z-[1000] p-4 bg-gray-800/80 backdrop-blur-sm max-h-[40vh] overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        {result.text && (
          <div className="mb-4 prose prose-invert prose-sm">
            <p>{result.text}</p>
          </div>
        )}
        {result.groundingChunks.length > 0 && (
          <div>
            <h3 className="text-lg font-bold mb-2 text-gray-200">Places found:</h3>
            <ul className="space-y-2">
              {result.groundingChunks.map((chunk, index) => (
                chunk.maps ? (
                  <li key={index} className="bg-gray-700/50 p-3 rounded-lg">
                    <a
                      href={chunk.maps.uri}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-blue-400 hover:underline"
                    >
                      {chunk.maps.title}
                    </a>
                  </li>
                ) : null
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultsPanel;
