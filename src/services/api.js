import axios from 'axios';

// API base configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
apiClient.interceptors.request.use(
  (config) => {
    // TODO: Add authentication token when available
    // const token = localStorage.getItem('authToken');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling common errors
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common HTTP errors
    if (error.response?.status === 401) {
      // TODO: Handle unauthorized - redirect to login
      // localStorage.removeItem('authToken');
      // window.location.href = '/login';
    } else if (error.response?.status === 500) {
      console.error('Server error:', error.response.data);
    }
    return Promise.reject(error);
  }
);

// API service functions

// Search API calls
export const searchAPI = {
  // Text-based search
  searchByText: async (query, filters = {}) => {
    try {
      // TODO: Implement when backend is ready
      // const response = await apiClient.post('/search/text', {
      //   query,
      //   filters,
      //   page: filters.page || 1,
      //   limit: filters.limit || 20
      // });
      // return response.data;
      
      // Mock response for now
      console.log('Searching by text:', query, filters);
      return { results: [], total: 0, page: 1 };
    } catch (error) {
      console.error('Search by text error:', error);
      throw error;
    }
  },

  // KIS search (Keyframe Image Search)
  searchByKIS: async (imageFile, filters = {}) => {
    try {
      // TODO: Implement when backend is ready
      // const formData = new FormData();
      // formData.append('image', imageFile);
      // Object.keys(filters).forEach(key => {
      //   formData.append(key, filters[key]);
      // });
      // 
      // const response = await apiClient.post('/search/kis', formData, {
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //   },
      // });
      // return response.data;
      
      // Mock response for now
      console.log('Searching by KIS:', imageFile, filters);
      return { results: [], total: 0, page: 1 };
    } catch (error) {
      console.error('KIS search error:', error);
      throw error;
    }
  },

  // TRAKE search (Temporal Reasoning and Knowledge Enhancement)
  searchByTRAKE: async (query, timeRange, reasoning = {}) => {
    try {
      // TODO: Implement when backend is ready
      // const response = await apiClient.post('/search/trake', {
      //   query,
      //   timeRange,
      //   reasoning,
      // });
      // return response.data;
      
      // Mock response for now
      console.log('Searching by TRAKE:', query, timeRange, reasoning);
      return { results: [], total: 0, page: 1 };
    } catch (error) {
      console.error('TRAKE search error:', error);
      throw error;
    }
  },

  // Event sequence search
  searchByEventSequence: async (events, timeConstraints = {}) => {
    try {
      // TODO: Implement when backend is ready
      // const response = await apiClient.post('/search/event-sequence', {
      //   events,
      //   timeConstraints,
      // });
      // return response.data;
      
      // Mock response for now
      console.log('Searching by event sequence:', events, timeConstraints);
      return { results: [], total: 0, page: 1 };
    } catch (error) {
      console.error('Event sequence search error:', error);
      throw error;
    }
  },

  // Get video metadata
  getVideoMetadata: async (videoId) => {
    try {
      // TODO: Implement when backend is ready
      // const response = await apiClient.get(`/videos/${videoId}/metadata`);
      // return response.data;
      
      // Mock response for now
      console.log('Getting video metadata for:', videoId);
      return { id: videoId, title: 'Mock Video', duration: 120 };
    } catch (error) {
      console.error('Get video metadata error:', error);
      throw error;
    }
  },

  // Get video keyframes
  getVideoKeyframes: async (videoId, options = {}) => {
    try {
      // TODO: Implement when backend is ready
      // const response = await apiClient.get(`/videos/${videoId}/keyframes`, {
      //   params: options
      // });
      // return response.data;
      
      // Mock response for now
      console.log('Getting keyframes for:', videoId, options);
      return { keyframes: [], total: 0 };
    } catch (error) {
      console.error('Get video keyframes error:', error);
      throw error;
    }
  },
};

// User management API calls
export const userAPI = {
  // User authentication
  login: async (credentials) => {
    try {
      // TODO: Implement when backend is ready
      // const response = await apiClient.post('/auth/login', credentials);
      // const { token, user } = response.data;
      // localStorage.setItem('authToken', token);
      // return { token, user };
      
      // Mock response for now
      console.log('Login attempt:', credentials);
      return { token: 'mock-token', user: { id: 1, name: 'Mock User' } };
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  logout: async () => {
    try {
      // TODO: Implement when backend is ready
      // await apiClient.post('/auth/logout');
      // localStorage.removeItem('authToken');
      
      // Mock response for now
      console.log('Logout');
      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  },

  // Get user profile
  getUserProfile: async () => {
    try {
      // TODO: Implement when backend is ready
      // const response = await apiClient.get('/user/profile');
      // return response.data;
      
      // Mock response for now
      console.log('Getting user profile');
      return { id: 1, name: 'Mock User', email: 'user@example.com' };
    } catch (error) {
      console.error('Get user profile error:', error);
      throw error;
    }
  },
};

// Video management API calls
export const videoAPI = {
  // Upload video
  uploadVideo: async (videoFile, metadata = {}) => {
    try {
      // TODO: Implement when backend is ready
      // const formData = new FormData();
      // formData.append('video', videoFile);
      // Object.keys(metadata).forEach(key => {
      //   formData.append(key, metadata[key]);
      // });
      // 
      // const response = await apiClient.post('/videos/upload', formData, {
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //   },
      //   onUploadProgress: (progressEvent) => {
      //     const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      //     console.log('Upload progress:', progress);
      //   },
      // });
      // return response.data;
      
      // Mock response for now
      console.log('Uploading video:', videoFile, metadata);
      return { id: Date.now(), status: 'processing' };
    } catch (error) {
      console.error('Video upload error:', error);
      throw error;
    }
  },

  // Get video list
  getVideoList: async (page = 1, limit = 20, filters = {}) => {
    try {
      // TODO: Implement when backend is ready
      // const response = await apiClient.get('/videos', {
      //   params: { page, limit, ...filters }
      // });
      // return response.data;
      
      // Mock response for now
      console.log('Getting video list:', page, limit, filters);
      return { videos: [], total: 0, page, limit };
    } catch (error) {
      console.error('Get video list error:', error);
      throw error;
    }
  },

  // Delete video
  deleteVideo: async (videoId) => {
    try {
      // TODO: Implement when backend is ready
      // const response = await apiClient.delete(`/videos/${videoId}`);
      // return response.data;
      
      // Mock response for now
      console.log('Deleting video:', videoId);
      return { success: true };
    } catch (error) {
      console.error('Delete video error:', error);
      throw error;
    }
  },
};

export default apiClient;