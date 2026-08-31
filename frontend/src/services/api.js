const API_BASE = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/$/, '');

export const apiFetch = async (endpoint, options = {}) => {
  const url = `${API_BASE}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;
  
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      return {
        success: false,
        status: response.status,
        message: data.message || data.error || 'Server error occurred'
      };
    }

    return { success: true, ...data };
  } catch (error) {
    console.warn(`API Connection warning [${endpoint}]:`, error.message);
    return { success: false, isNetworkError: true, message: error.message };
  }
};

export const API_ENDPOINTS = {
  AUTH_LOGIN: '/auth/login',
  AUTH_USERS: '/auth/users',
  PRODUCTS: '/products',
  PRODUCTS_ARCHIVED: '/products/archived',
  CATEGORIES: '/categories',
  ORDERS: '/orders',
  CUSTOMERS: '/customers',
  GALLERY: '/gallery',
  REVIEWS: '/reviews'
};
