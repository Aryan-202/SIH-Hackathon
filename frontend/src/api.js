import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000/api',
  withCredentials: true, // Important for sending/receiving cookies!
});

export default api;
