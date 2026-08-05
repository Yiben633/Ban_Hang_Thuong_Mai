import { apiBaseUrl } from '../config/env.js';

const REQUEST_TIMEOUT_MS = 10000;

export class ApiError extends Error {
  constructor(message, { status, cause } = {}) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.cause = cause;
  }
}

export const API_BASE_URL = apiBaseUrl.replace(/\/$/, '');

function createUrl(path, params) {
  const url = new URL(`${API_BASE_URL}/${path.replace(/^\//, '')}`);

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, value);
    }
  });

  return url;
}

export async function getJson(path, params) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(createUrl(path, params), {
      headers: { Accept: 'application/json' },
      signal: controller.signal,
    });

    const contentType = response.headers.get('content-type') || '';
    const body = contentType.includes('application/json')
      ? await response.json()
      : await response.text();

    if (!response.ok) {
      const serverMessage =
        typeof body === 'object' && body?.message ? body.message : null;
      throw new ApiError(
        serverMessage || `API request failed with status ${response.status}`,
        { status: response.status },
      );
    }

    return body;
  } catch (error) {
    if (error instanceof ApiError) throw error;

    const message =
      error.name === 'AbortError'
        ? 'API request timed out. Please try again.'
        : 'Unable to connect to the product service. Please try again.';

    throw new ApiError(message, { cause: error });
  } finally {
    clearTimeout(timeoutId);
  }
}
