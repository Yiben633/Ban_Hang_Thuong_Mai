import axiosClient from './axiosClient.js';

const SUPPORTED_LIST_PARAMS = ['limit', 'sort'];

function validateId(id) {
  if (id === undefined || id === null || String(id).trim() === '') {
    throw new TypeError('Product id is required.');
  }

  return encodeURIComponent(String(id));
}

function validateCategory(category) {
  if (!category || String(category).trim() === '') {
    throw new TypeError('Product category is required.');
  }

  return encodeURIComponent(String(category).trim());
}

function getSupportedListParams(params = {}) {
  return Object.fromEntries(
    SUPPORTED_LIST_PARAMS.filter(
      (key) => params[key] !== undefined && params[key] !== null,
    ).map((key) => [key, params[key]]),
  );
}

export function getAll(params) {
  return axiosClient.get('/products', {
    params: getSupportedListParams(params),
  });
}

export function getById(id) {
  return axiosClient.get(`/products/${validateId(id)}`);
}

export function getCategories() {
  return axiosClient.get('/products/categories');
}

export function getByCategory(category) {
  return axiosClient.get(`/products/category/${validateCategory(category)}`);
}

export function create(product) {
  return axiosClient.post('/products', product);
}

export function update(id, product) {
  return axiosClient.put(`/products/${validateId(id)}`, product);
}

export function patch(id, data) {
  return axiosClient.patch(`/products/${validateId(id)}`, data);
}

export function remove(id) {
  return axiosClient.delete(`/products/${validateId(id)}`);
}
