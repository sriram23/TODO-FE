// axios.js
import axios from 'axios';
import constants from './constants';
const axiosInstance = axios.create({
  baseURL: constants.BASE_URL,
  timeout: 10000, // Optional: Set a timeout for requests (in milliseconds)
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the token in the headers if it exists
axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('todo_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
