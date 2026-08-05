const DEFAULT_API_BASE_URL = 'https://fakestoreapi.com';

export const appName = import.meta.env.VITE_APP_NAME?.trim() || 'Mono Store';
export const apiBaseUrl = (
  import.meta.env.VITE_API_BASE_URL?.trim() || DEFAULT_API_BASE_URL
).replace(/\/$/, '');
