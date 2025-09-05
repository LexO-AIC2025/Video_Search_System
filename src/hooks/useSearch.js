import { useState, useCallback } from 'react';
import { filterKeyframes } from '../utils/searchUtils';
import { mockKeyframes } from '../data/mockData';
import { searchAPI } from '../services/api';

export const useSearch = () => {
  const [results, setResults] = useState(mockKeyframes);
  const [isLoading, setIsLoading] = useState(false);

  const performSearch = useCallback(async (searchParams) => {
    const { queryText, queryImage, weights, filters, topK } = searchParams;
    
    setIsLoading(true);
    
    try {
      // Prepare API payload
      const payload = {
        query_text: queryText || '',
        query_image_base64: queryImage || null,
        filters: {
          tags: filters.tags ? filters.tags.split(',').map(t => t.trim()).filter(Boolean) : [],
          ocr_contains: filters.ocr_contains ? filters.ocr_contains.split(',').map(t => t.trim()).filter(Boolean) : []
        },
        weights: {
          semantic: weights.semantic / 100,
          visual: weights.visual / 100,
          keyword: weights.keyword / 100
        },
        top_k: topK || 50
      };
      
      console.log('API Payload:', payload);
      
      // TODO: Replace with actual API call when backend is ready
      // const searchResult = await searchAPI.searchByText(queryText, {
      //   filters: payload.filters,
      //   weights: payload.weights,
      //   limit: topK,
      //   page: 1
      // });
      // setResults(searchResult.results);
      
      // For demo, simulate API call with mock data
      await new Promise(resolve => setTimeout(resolve, 500));
      const filtered = filterKeyframes(mockKeyframes, queryText, filters);
      setResults(filtered.slice(0, topK));
      
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    results,
    isLoading,
    performSearch
  };
};