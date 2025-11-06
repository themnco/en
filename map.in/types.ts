export interface Location {
  latitude: number;
  longitude: number;
}

export interface GroundingChunk {
  maps?: {
    uri: string;
    title: string;
    placeAnswerSources?: {
        reviewSnippets?: {
            uri: string;
            text: string;
        }[];
    }[]
  };
}

export interface SearchResult {
  text: string;
  groundingChunks: GroundingChunk[];
}
