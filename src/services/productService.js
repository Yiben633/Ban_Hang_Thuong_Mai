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
  const rating = product.rating;
  const stockValue = product.stock ?? product.quantity ?? product.inventory;
  const image =
    product.image ||
    product.imageUrl ||
    product.thumbnail ||
    DEFAULT_PRODUCT_IMAGE;
  const images = Array.isArray(product.images)
    ? product.images.filter(Boolean)
    : [];

  return {
    id: String(product.id ?? product._id ?? ''),
    name: product.name || product.title || 'Untitled product',
    price: toNumber(product.price ?? product.salePrice),
    image,
    images: images.length > 0 ? images : [image],
    category:
      typeof product.category === 'object'
        ? product.category.name || ''
        : product.category || '',
    description: product.description || '',
    rating: toNumber(
      typeof rating === 'object' ? (rating.rate ?? rating.value) : rating,
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
  return {
    title: product.title || product.name || '',
    price: toNumber(product.price),
    description: product.description || '',
    image: product.image || '',
    category:
      typeof product.category === 'object'
        ? product.category.name || ''
        : product.category || '',
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
  if (!id) throw new ApiError('Product id is required.');

  const response = await getJson(`products/${encodeURIComponent(id)}`);
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
