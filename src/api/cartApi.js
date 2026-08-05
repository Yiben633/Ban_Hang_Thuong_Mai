import axiosClient from './axiosClient.js';

function validateId(value, fieldName) {
  if (value === undefined || value === null || String(value).trim() === '') {
    throw new TypeError(`${fieldName} is required.`);
  }

  return encodeURIComponent(String(value).trim());
}

export function getAll() {
  return axiosClient.get('/carts');
}

export function getById(id) {
  return axiosClient.get(`/carts/${validateId(id, 'Cart id')}`);
}

export function getByUserId(userId) {
  return axiosClient.get(`/carts/user/${validateId(userId, 'User id')}`);
}

export function create(cart) {
  return axiosClient.post('/carts', cart);
}

export function update(id, cart) {
  return axiosClient.put(`/carts/${validateId(id, 'Cart id')}`, cart);
}

export function remove(id) {
  return axiosClient.delete(`/carts/${validateId(id, 'Cart id')}`);
}

// Fake Store API simulates cart mutations; created, updated, or deleted data
// is not persisted permanently. The storefront cart belongs in CartContext.
