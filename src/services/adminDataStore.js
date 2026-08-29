import { PRODUCTS } from '../data/products';

const PRODUCTS_KEY = 'diya_admin_products_v2';
const ARCHIVED_PRODUCTS_KEY = 'diya_admin_archived_products_v2';
const CATEGORIES_KEY = 'diya_admin_categories_v2';
const ORDERS_KEY = 'diya_admin_orders_v2';
const CUSTOMERS_KEY = 'diya_admin_customers_v2';

const INITIAL_CATEGORIES = [
  { id: 'cat-1', name: 'Thread Work', description: 'Handcrafted bridal bangles, silk thread cuffs & Kundan stone jewelry.', icon: '🧵', status: 'ACTIVE', createdAt: '2026-01-01' },
  { id: 'cat-2', name: 'Resin Art', description: 'Custom preserved floral frames, anniversary plaques, coasters & keychains.', icon: '🎨', status: 'ACTIVE', createdAt: '2026-01-01' },
  { id: 'cat-3', name: 'Chocolates', description: 'Artisanal handmade luxury chocolates, truffles & customized gift boxes.', icon: '🍫', status: 'ACTIVE', createdAt: '2026-01-01' },
  { id: 'cat-4', name: 'Biscuits', description: 'Freshly baked artisanal gourmet butter biscuits & cookies.', icon: '🍪', status: 'ACTIVE', createdAt: '2026-01-01' },
  { id: 'cat-5', name: 'Wedding & Marriage Items', description: 'Bespoke bridal thali plates, wedding favors & ceremonial keepsakes.', icon: '💍', status: 'ACTIVE', createdAt: '2026-01-01' },
  { id: 'cat-6', name: 'Customized Chains', description: 'Handcrafted personalized name chains, pendants & charms.', icon: '📿', status: 'ACTIVE', createdAt: '2026-01-01' },
  { id: 'cat-7', name: 'Customized Gifts', description: 'Personalized gift hampers, photo frames & bespoke keepsakes.', icon: '🎁', status: 'ACTIVE', createdAt: '2026-01-01' },
  { id: 'cat-8', name: 'Customized Dolls', description: 'Handcrafted custom miniature dolls & couple figurines.', icon: '🧸', status: 'ACTIVE', createdAt: '2026-01-01' }
];

const INITIAL_ORDERS = [
  {
    id: 'DH-892401',
    customerName: 'Shamanth Kumar',
    email: 'shamanth.k@gmail.com',
    phone: '+91 98765 43210',
    date: '2026-08-28T14:32:00Z',
    items: [
      { id: 'resin-001', name: 'Personalized Resin Anniversary Photo Plaque', quantity: 1, customName: 'Shamanth & Vani' }
    ],
    totalAmount: 1899,
    paymentStatus: 'PAID',
    orderStatus: 'Confirmed',
    shippingAddress: 'Plot 42, Jubilee Hills, Hyderabad, Telangana'
  },
  {
    id: 'DH-581923',
    customerName: 'Ananya Sharma',
    email: 'ananya.s@outlook.com',
    phone: '+91 91234 56789',
    date: '2026-08-29T09:15:00Z',
    items: [
      { id: 'resin-00', name: 'Personalized Resin Photo Frame – Happy Birthday', quantity: 1, customName: 'Akhil Birthday' }
    ],
    totalAmount: 1299,
    paymentStatus: 'PAID',
    orderStatus: 'Processing',
    shippingAddress: 'Flat 301, Rosewood Apartments, Bangalore, Karnataka'
  },
  {
    id: 'DH-391024',
    customerName: 'Priya Reddy',
    email: 'priya.reddy@yahoo.com',
    phone: '+91 99887 76655',
    date: '2026-08-29T10:45:00Z',
    items: [
      { id: 'bangle-01', name: 'Royal Zardosi & Velvet Bridal Bangle Set', quantity: 2, customName: 'Red Lehenga Set' }
    ],
    totalAmount: 3798,
    paymentStatus: 'PAID',
    orderStatus: 'Shipped',
    shippingAddress: 'Door 12-4-5, Anna Nagar, Chennai, Tamil Nadu'
  }
];

const INITIAL_CUSTOMERS = [
  { id: 'cust-1', name: 'Shamanth Kumar', email: 'shamanth.k@gmail.com', phone: '+91 98765 43210', ordersCount: 1, totalSpent: 1899, lastOrder: '2026-08-28' },
  { id: 'cust-2', name: 'Ananya Sharma', email: 'ananya.s@outlook.com', phone: '+91 91234 56789', ordersCount: 1, totalSpent: 1299, lastOrder: '2026-08-29' },
  { id: 'cust-3', name: 'Priya Reddy', email: 'priya.reddy@yahoo.com', phone: '+91 99887 76655', ordersCount: 2, totalSpent: 3798, lastOrder: '2026-08-29' }
];

// Event listeners for real-time reactivity across components
const listeners = new Set();
export const subscribeToDataStore = (listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};
const notifyListeners = () => {
  listeners.forEach((fn) => fn());
};

// --- PRODUCTS ---
export const getStoredProducts = () => {
  try {
    const data = localStorage.getItem(PRODUCTS_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (e) {
    console.error('Error reading products data:', e);
  }
  // Fallback to initial PRODUCTS array with default status
  const normalized = PRODUCTS.map((p) => ({
    ...p,
    status: p.status || 'ACTIVE',
    stockQuantity: p.stockQuantity ?? (p.availability === 'Out of Stock' ? 0 : 25),
    stockStatus: p.stockStatus || (p.availability === 'Out of Stock' ? 'Out of Stock' : 'In Stock'),
    sku: p.sku || `SKU-${p.id.toUpperCase()}`,
    customFields: p.customFields || [],
    createdAt: p.createdAt || '2026-01-01'
  }));
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(normalized));
  return normalized;
};

export const getStoredArchivedProducts = () => {
  try {
    const data = localStorage.getItem(ARCHIVED_PRODUCTS_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (e) {
    console.error('Error reading archived products:', e);
  }
  return [];
};

export const addProduct = (productData) => {
  const products = getStoredProducts();
  const newProduct = {
    ...productData,
    id: productData.id || `prod-${Date.now()}`,
    sku: productData.sku || `SKU-DIY-${Math.floor(1000 + Math.random() * 9000)}`,
    status: productData.status || 'ACTIVE',
    stockQuantity: Number(productData.stockQuantity || 20),
    stockStatus: Number(productData.stockQuantity || 20) > 0 ? 'In Stock' : 'Out of Stock',
    customFields: productData.customFields || [],
    createdAt: new Date().toISOString()
  };

  const updated = [newProduct, ...products];
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(updated));
  notifyListeners();
  return newProduct;
};

export const updateProduct = (id, updatedFields) => {
  const products = getStoredProducts();
  const idx = products.findIndex((p) => p.id === id);
  if (idx !== -1) {
    products[idx] = {
      ...products[idx],
      ...updatedFields,
      stockQuantity: updatedFields.stockQuantity !== undefined ? Number(updatedFields.stockQuantity) : products[idx].stockQuantity,
      stockStatus: updatedFields.stockQuantity !== undefined 
        ? (Number(updatedFields.stockQuantity) > 0 ? 'In Stock' : 'Out of Stock')
        : products[idx].stockStatus,
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
    notifyListeners();
    return products[idx];
  }
  return null;
};

export const archiveProduct = (id) => {
  const products = getStoredProducts();
  const archived = getStoredArchivedProducts();
  const target = products.find((p) => p.id === id);

  if (target) {
    const remaining = products.filter((p) => p.id !== id);
    const updatedArchived = [{ ...target, archivedAt: new Date().toISOString() }, ...archived];
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(remaining));
    localStorage.setItem(ARCHIVED_PRODUCTS_KEY, JSON.stringify(updatedArchived));
    notifyListeners();
    return true;
  }
  return false;
};

export const restoreProduct = (id) => {
  const products = getStoredProducts();
  const archived = getStoredArchivedProducts();
  const target = archived.find((p) => p.id === id);

  if (target) {
    const remainingArchived = archived.filter((p) => p.id !== id);
    const updatedProducts = [target, ...products];
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(updatedProducts));
    localStorage.setItem(ARCHIVED_PRODUCTS_KEY, JSON.stringify(remainingArchived));
    notifyListeners();
    return true;
  }
  return false;
};

// --- CATEGORIES ---
export const getStoredCategories = () => {
  try {
    const data = localStorage.getItem(CATEGORIES_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (e) {
    console.error('Error reading categories:', e);
  }
  localStorage.setItem(CATEGORIES_KEY, JSON.stringify(INITIAL_CATEGORIES));
  return INITIAL_CATEGORIES;
};

export const addCategory = (categoryData) => {
  const categories = getStoredCategories();
  const newCat = {
    ...categoryData,
    id: `cat-${Date.now()}`,
    status: categoryData.status || 'ACTIVE',
    createdAt: new Date().toISOString()
  };
  const updated = [newCat, ...categories];
  localStorage.setItem(CATEGORIES_KEY, JSON.stringify(updated));
  notifyListeners();
  return newCat;
};

export const updateCategory = (id, fields) => {
  const categories = getStoredCategories();
  const idx = categories.findIndex((c) => c.id === id);
  if (idx !== -1) {
    categories[idx] = { ...categories[idx], ...fields, updatedAt: new Date().toISOString() };
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
    notifyListeners();
    return categories[idx];
  }
  return null;
};

export const deleteCategory = (id) => {
  const categories = getStoredCategories();
  const filtered = categories.filter((c) => c.id !== id);
  localStorage.setItem(CATEGORIES_KEY, JSON.stringify(filtered));
  notifyListeners();
};

// --- ORDERS ---
export const getStoredOrders = () => {
  try {
    const data = localStorage.getItem(ORDERS_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (e) {
    console.error('Error reading orders:', e);
  }
  localStorage.setItem(ORDERS_KEY, JSON.stringify(INITIAL_ORDERS));
  return INITIAL_ORDERS;
};

export const updateOrderStatus = (id, newStatus) => {
  const orders = getStoredOrders();
  const idx = orders.findIndex((o) => o.id === id);
  if (idx !== -1) {
    orders[idx].orderStatus = newStatus;
    orders[idx].updatedAt = new Date().toISOString();
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
    notifyListeners();
    return orders[idx];
  }
  return null;
};

// --- CUSTOMERS ---
export const getStoredCustomers = () => {
  try {
    const data = localStorage.getItem(CUSTOMERS_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (e) {
    console.error('Error reading customers:', e);
  }
  localStorage.setItem(CUSTOMERS_KEY, JSON.stringify(INITIAL_CUSTOMERS));
  return INITIAL_CUSTOMERS;
};
