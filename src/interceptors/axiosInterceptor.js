 import axios from 'axios';
import BASE_URL from '../../utils/Config'; // ⚠️ Adjust path as needed

// Create Axios instance
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    Accept: 'application/json',
  },
});

// ✅ Request Interceptor: Attach auth token + handle content type
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // You can change to Redux/sessionStorage if needed
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // ⚙️ Automatically set Content-Type based on data
    const isFormData =
      config.data instanceof FormData ||
      (config.headers['Content-Type'] &&
        config.headers['Content-Type'].includes('multipart/form-data'));

    if (!isFormData && !config.headers['Content-Type']) {
      config.headers['Content-Type'] = 'application/json';
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
      console.warn('Unauthorized, logging out...');
      localStorage.removeItem('token');
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

export default api;
