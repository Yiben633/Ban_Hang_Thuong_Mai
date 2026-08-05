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

async function requestJson(path, { method = 'GET', params, body } = {}) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(createUrl(path, params), {
      method,
      headers: {
        Accept: 'application/json',
        ...(body ? { 'Content-Type': 'application/json' } : {}),
      },
      ...(body ? { body: JSON.stringify(body) } : {}),
      signal: controller.signal,
    });

    const contentType = response.headers.get('content-type') || '';
    const responseBody = contentType.includes('application/json')
      ? await response.json()
      : await response.text();

    if (!response.ok) {
      const serverMessage =
        typeof responseBody === 'object' && responseBody?.message
          ? responseBody.message
          : null;
      throw new ApiError(
        serverMessage || `API request failed with status ${response.status}`,
        { status: response.status },
      );
    }

    return responseBody;
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

export function getJson(path, params) {
  return requestJson(path, { method: 'GET', params });
}

export function postJson(path, body) {
  return requestJson(path, { method: 'POST', body });
}

export function putJson(path, body) {
  return requestJson(path, { method: 'PUT', body });
}

export function deleteJson(path) {
  return requestJson(path, { method: 'DELETE' });
}
