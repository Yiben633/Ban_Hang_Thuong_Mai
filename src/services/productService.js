import {
  ApiError,
  deleteJson,
  getJson,
  postJson,
  putJson,
} from './apiClient.js';

const DEFAULT_PRODUCT_IMAGE = '/product-placeholder.svg';

function toNumber(value, fallback = 0) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function getResponseItems(response) {
  if (Array.isArray(response)) return response;
  if (Array.isArray(response?.products)) return response.products;
  if (Array.isArray(response?.items)) return response.items;
  if (Array.isArray(response?.results)) return response.results;
  if (Array.isArray(response?.data)) return response.data;
  return [];
}

export function normalizeProduct(product = {}) {
  const safeProduct = product && typeof product === 'object' ? product : {};
  const rating = safeProduct.rating;
  const stockValue =
    safeProduct.stock ?? safeProduct.quantity ?? safeProduct.inventory;
  const image =
    safeProduct.image ||
    safeProduct.imageUrl ||
    safeProduct.thumbnail ||
    DEFAULT_PRODUCT_IMAGE;
  const images = Array.isArray(safeProduct.images)
    ? safeProduct.images.filter(Boolean)
    : [];
  const hasRatingObject = rating && typeof rating === 'object';

  return {
    id: String(safeProduct.id ?? safeProduct._id ?? ''),
    name: safeProduct.name || safeProduct.title || 'Untitled product',
    price: toNumber(safeProduct.price ?? safeProduct.salePrice),
    image,
    images: images.length > 0 ? images : [image],
    category:
      safeProduct.category && typeof safeProduct.category === 'object'
        ? safeProduct.category.name || ''
        : safeProduct.category || '',
    description: safeProduct.description || '',
    rating: toNumber(hasRatingObject ? (rating.rate ?? rating.value) : rating),
    ratingCount: toNumber(
      hasRatingObject ? rating.count : safeProduct.ratingCount,
    ),
    stock: stockValue == null ? undefined : toNumber(stockValue),
  };
}

function normalizeCategory(category) {
  if (typeof category === 'string') {
    return { name: category, detail: '' };
  }

  return {
    name: category?.name || category?.title || '',
    detail: category?.detail || category?.description || '',
  };
}

function toProductPayload(product = {}) {
  const safeProduct = product && typeof product === 'object' ? product : {};

  return {
    title: safeProduct.title || safeProduct.name || '',
    price: toNumber(safeProduct.price),
    description: safeProduct.description || '',
    image: safeProduct.image || '',
    category:
      safeProduct.category && typeof safeProduct.category === 'object'
        ? safeProduct.category.name || ''
        : safeProduct.category || '',
  };
}

export async function getProducts(params = {}) {
  const response = await getJson('products', {
    search: params.search,
    category: params.category,
    minPrice: params.minPrice,
    maxPrice: params.maxPrice,
    inStock: params.inStock,
    sort: params.sort,
    page: params.page,
  });

  return getResponseItems(response).map(normalizeProduct);
}

export async function getProductById(id) {
  if (id === undefined || id === null || String(id).trim() === '') {
    throw new ApiError('Product id is required.');
  }

  const response = await getJson(
    `products/${encodeURIComponent(String(id).trim())}`,
  );
  return normalizeProduct(response);
}

export async function createProduct(product) {
  const response = await postJson('products', toProductPayload(product));
  return normalizeProduct(response);
}

export async function updateProduct(id, product) {
  if (!id) throw new ApiError('Product id is required.');

  const response = await putJson(
    `products/${encodeURIComponent(id)}`,
    toProductPayload(product),
  );
  return normalizeProduct(response);
}

export async function deleteProduct(id) {
  if (!id) throw new ApiError('Product id is required.');

  const response = await deleteJson(`products/${encodeURIComponent(id)}`);
  return response && typeof response === 'object'
    ? normalizeProduct(response)
    : { id: String(id) };
}

export async function getCategories() {
  const response = await getJson('products/categories');
  return getResponseItems(response)
    .map(normalizeCategory)
    .filter((item) => item.name);
}
