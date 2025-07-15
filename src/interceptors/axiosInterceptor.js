// src/interceptors/axiosInterceptor.js
import axios from 'axios';

// Create Axios instance
const api = axios.create({
  baseURL: 'https://your-api-url.com/api', // 🔁 Change to your backend API base URL
  timeout: 10000,
  headers: {
    'Accept': 'application/json',
  },
});

// ✅ Request Interceptor: Attach auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // or sessionStorage, or Redux store
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ❌ Response Interceptor: Global error handler
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Optional: auto-logout or redirect
      console.warn("Unauthorized, logging out...");
      localStorage.removeItem("token");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;
