import axios from 'axios';

const DEFAULT_API_BASE_URL = 'https://fakestoreapi.com';
const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL?.trim() || DEFAULT_API_BASE_URL
).replace(/\/$/, '');

const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      (error.code === 'ECONNABORTED'
        ? 'API request timed out. Please try again.'
        : 'Unable to connect to the product service. Please try again.');
    const apiError = new Error(message);

    apiError.name = 'ApiError';
    apiError.status = error.response?.status;
    apiError.cause = error;

    return Promise.reject(apiError);
  },
);

export default axiosClient;
