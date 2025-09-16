import axios from 'axios';

// Base URL for your backend API - using a direct URL for development
// Create React App automatically makes environment variables available that start with REACT_APP_
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
console.log('Environment:', {
  apiUrl: process.env.REACT_APP_API_BASE_URL || import.meta.env.REACT_APP_API_BASE_URL,
  allEnv: process.env || import.meta.env
});

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('authToken');
      localStorage.removeItem('touristData');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Tourist API functions
export const touristApi = {
  // Register a new tourist
  register: async (touristData) => {
  try {
    const response = await api.post('/api/v1/tourists/register', touristData);
    return response.data;
  } catch (error) {
    // Better error handling
    const errorMessage = error.response?.data?.message || 
                        error.message || 
                        'Registration failed. Please try again.';
    throw new Error(errorMessage);
  }
},

  // Login tourist
  login: async (credentials) => {
    try {
      const response = await api.post('/api/v1/tourists/login', credentials);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Login failed. Please try again.' };
    }
  },

  // Get tourist profile (protected route)
  getProfile: async () => {
    try {
      const response = await api.get('/api/v1/tourists/me');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch profile.' };
    }
  },

  // Update location (protected route)
  updateLocation: async (locationData) => {
    try {
      const response = await api.post('/api/v1/tourists/location', locationData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update location.' };
    }
  },

  // Trigger panic alert (protected route)
  triggerPanic: async () => {
    try {
       const response = await api.post('/api/v1/tourists/panic');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to trigger panic alert.' };
    }
  },
  clearAuthData: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('touristData');
  }
};

// Utility function to store auth data
export const storeAuthData = (token, touristData) => {
  localStorage.setItem('authToken', token);
  localStorage.setItem('touristData', JSON.stringify(touristData));
};

// Utility function to get stored auth data
export const getAuthData = () => {
  const token = localStorage.getItem('authToken');
  const touristData = JSON.parse(localStorage.getItem('touristData') || 'null');
  return { token, touristData };
};

// Utility function to clear auth data
export const clearAuthData = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('touristData');
};



export default touristApi;