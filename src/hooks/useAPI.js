import { useState, useEffect, useCallback } from 'react';
import { searchAPI, userAPI, videoAPI } from '../services/api';

// Custom hook for API calls with loading and error states
export const useAPI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const makeRequest = useCallback(async (apiCall, ...args) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await apiCall(...args);
      setLoading(false);
      return result;
    } catch (err) {
      setError(err);
      setLoading(false);
      throw err;
    }
  }, []);

  return {
    loading,
    error,
    makeRequest,
    clearError: () => setError(null)
  };
};

// Hook for search operations
export const useSearchAPI = () => {
  const { loading, error, makeRequest, clearError } = useAPI();
  const [searchResults, setSearchResults] = useState([]);

  const textSearch = useCallback(async (query, filters = {}) => {
    try {
      const result = await makeRequest(searchAPI.searchByText, query, filters);
      setSearchResults(result.results || []);
      return result;
    } catch (err) {
      setSearchResults([]);
      throw err;
    }
  }, [makeRequest]);

  const kisSearch = useCallback(async (imageFile, filters = {}) => {
    try {
      const result = await makeRequest(searchAPI.searchByKIS, imageFile, filters);
      setSearchResults(result.results || []);
      return result;
    } catch (err) {
      setSearchResults([]);
      throw err;
    }
  }, [makeRequest]);

  const trakeSearch = useCallback(async (query, timeRange, reasoning = {}) => {
    try {
      const result = await makeRequest(searchAPI.searchByTRAKE, query, timeRange, reasoning);
      setSearchResults(result.results || []);
      return result;
    } catch (err) {
      setSearchResults([]);
      throw err;
    }
  }, [makeRequest]);

  const eventSequenceSearch = useCallback(async (events, timeConstraints = {}) => {
    try {
      const result = await makeRequest(searchAPI.searchByEventSequence, events, timeConstraints);
      setSearchResults(result.results || []);
      return result;
    } catch (err) {
      setSearchResults([]);
      throw err;
    }
  }, [makeRequest]);

  return {
    loading,
    error,
    searchResults,
    textSearch,
    kisSearch,
    trakeSearch,
    eventSequenceSearch,
    clearError
  };
};

// Hook for user authentication
export const useAuth = () => {
  const { loading, error, makeRequest, clearError } = useAPI();
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
      // TODO: Validate token and get user info when backend is ready
      // getUserProfile();
    }
  }, []);

  const login = useCallback(async (credentials) => {
    try {
      const result = await makeRequest(userAPI.login, credentials);
      setUser(result.user);
      setIsAuthenticated(true);
      return result;
    } catch (err) {
      setUser(null);
      setIsAuthenticated(false);
      throw err;
    }
  }, [makeRequest]);

  const logout = useCallback(async () => {
    try {
      await makeRequest(userAPI.logout);
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('authToken');
    } catch (err) {
      // Even if logout fails on server, clear local state
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('authToken');
      throw err;
    }
  }, [makeRequest]);

  const getUserProfile = useCallback(async () => {
    try {
      const profile = await makeRequest(userAPI.getUserProfile);
      setUser(profile);
      return profile;
    } catch (err) {
      setUser(null);
      setIsAuthenticated(false);
      throw err;
    }
  }, [makeRequest]);

  return {
    loading,
    error,
    user,
    isAuthenticated,
    login,
    logout,
    getUserProfile,
    clearError
  };
};

// Hook for video operations
export const useVideoAPI = () => {
  const { loading, error, makeRequest, clearError } = useAPI();
  const [videos, setVideos] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);

  const uploadVideo = useCallback(async (videoFile, metadata = {}) => {
    try {
      // TODO: Implement progress tracking when backend is ready
      // const result = await makeRequest(videoAPI.uploadVideo, videoFile, metadata);
      // return result;
      
      // Mock upload with progress simulation
      setUploadProgress(0);
      for (let i = 0; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 100));
        setUploadProgress(i);
      }
      
      const mockResult = { id: Date.now(), status: 'processing' };
      console.log('Mock video upload:', videoFile, metadata, mockResult);
      return mockResult;
    } catch (err) {
      setUploadProgress(0);
      throw err;
    }
  }, [makeRequest]);

  const getVideoList = useCallback(async (page = 1, limit = 20, filters = {}) => {
    try {
      const result = await makeRequest(videoAPI.getVideoList, page, limit, filters);
      setVideos(result.videos || []);
      return result;
    } catch (err) {
      setVideos([]);
      throw err;
    }
  }, [makeRequest]);

  const deleteVideo = useCallback(async (videoId) => {
    try {
      const result = await makeRequest(videoAPI.deleteVideo, videoId);
      // Remove from local state
      setVideos(prev => prev.filter(video => video.id !== videoId));
      return result;
    } catch (err) {
      throw err;
    }
  }, [makeRequest]);

  const getVideoMetadata = useCallback(async (videoId) => {
    try {
      return await makeRequest(searchAPI.getVideoMetadata, videoId);
    } catch (err) {
      throw err;
    }
  }, [makeRequest]);

  const getVideoKeyframes = useCallback(async (videoId, options = {}) => {
    try {
      return await makeRequest(searchAPI.getVideoKeyframes, videoId, options);
    } catch (err) {
      throw err;
    }
  }, [makeRequest]);

  return {
    loading,
    error,
    videos,
    uploadProgress,
    uploadVideo,
    getVideoList,
    deleteVideo,
    getVideoMetadata,
    getVideoKeyframes,
    clearError
  };
};