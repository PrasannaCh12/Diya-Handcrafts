import { PRODUCTS } from '../data/products';
import { apiFetch, API_ENDPOINTS } from './api';

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

  const normalized = PRODUCTS.map((p) => ({
    ...p,
    status: p.status || 'ACTIVE',
    stockQuantity: p.stockQuantity ?? (p.availability === 'Out of Stock' ? 0 : 25),
    stockStatus: p.stockStatus || (p.availability === 'Out of Stock' ? 'Out of Stock' : 'In Stock'),
    sku: p.sku || `SKU-${p.id.toUpperCase()}`,
    image: p.image || (Array.isArray(p.images) && p.images[0]) || '',
    images: Array.isArray(p.images) && p.images.length > 0 ? p.images : (p.image ? [p.image] : []),
    customFields: p.customFields || [],
    addedBy: p.addedBy || 'Divya Yelchuri (Super Admin)',
    addedByRole: p.addedByRole || 'SUPER_ADMIN',
    createdAt: p.createdAt || '2026-01-01'
  }));
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(normalized));

  // Async API sync in background
  apiFetch(API_ENDPOINTS.PRODUCTS).then((res) => {
    if (res.success && Array.isArray(res.products)) {
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(res.products));
      notifyListeners();
    }
  });

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

export const addProduct = (productData, creator = null) => {
  const products = getStoredProducts();
  const addedBy = productData.addedBy || (creator ? `${creator.name} (${creator.role === 'SUPER_ADMIN' ? 'Super Admin' : creator.role === 'ADMIN' ? 'Admin' : 'Staff'})` : 'Divya Yelchuri (Super Admin)');
  const addedByRole = productData.addedByRole || creator?.role || 'SUPER_ADMIN';

  const newProduct = {
    ...productData,
    id: productData.id || `prod-${Date.now()}`,
    sku: productData.sku || `SKU-DIY-${Math.floor(1000 + Math.random() * 9000)}`,
    status: productData.status || 'ACTIVE',
    stockQuantity: Number(productData.stockQuantity || 20),
    stockStatus: Number(productData.stockQuantity || 20) > 0 ? 'In Stock' : 'Out of Stock',
    customFields: productData.customFields || [],
    addedBy,
    addedByRole,
    createdAt: new Date().toISOString()
  };

  const updated = [newProduct, ...products];
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(updated));
  notifyListeners();

  // Async API Push
  apiFetch(API_ENDPOINTS.PRODUCTS, {
    method: 'POST',
    body: JSON.stringify(newProduct)
  });

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

    // Async API Update
    apiFetch(`${API_ENDPOINTS.PRODUCTS}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updatedFields)
    });

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

    apiFetch(`${API_ENDPOINTS.PRODUCTS}/${id}/archive`, { method: 'POST' });
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

    apiFetch(`${API_ENDPOINTS.PRODUCTS}/${id}/restore`, { method: 'POST' });
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

  apiFetch(API_ENDPOINTS.CATEGORIES).then((res) => {
    if (res.success && Array.isArray(res.categories)) {
      localStorage.setItem(CATEGORIES_KEY, JSON.stringify(res.categories));
      notifyListeners();
    }
  });

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

  apiFetch(API_ENDPOINTS.CATEGORIES, { method: 'POST', body: JSON.stringify(newCat) });
  return newCat;
};

export const updateCategory = (id, fields) => {
  const categories = getStoredCategories();
  const idx = categories.findIndex((c) => c.id === id);
  if (idx !== -1) {
    categories[idx] = { ...categories[idx], ...fields, updatedAt: new Date().toISOString() };
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
    notifyListeners();

    apiFetch(`${API_ENDPOINTS.CATEGORIES}/${id}`, { method: 'PUT', body: JSON.stringify(fields) });
    return categories[idx];
  }
  return null;
};

export const deleteCategory = (id) => {
  const categories = getStoredCategories();
  const filtered = categories.filter((c) => c.id !== id);
  localStorage.setItem(CATEGORIES_KEY, JSON.stringify(filtered));
  notifyListeners();

  apiFetch(`${API_ENDPOINTS.CATEGORIES}/${id}`, { method: 'DELETE' });
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

  apiFetch(API_ENDPOINTS.ORDERS).then((res) => {
    if (res.success && Array.isArray(res.orders)) {
      localStorage.setItem(ORDERS_KEY, JSON.stringify(res.orders));
      notifyListeners();
    }
  });

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

    apiFetch(`${API_ENDPOINTS.ORDERS}/${id}/status`, { method: 'PUT', body: JSON.stringify({ orderStatus: newStatus }) });
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

  apiFetch(API_ENDPOINTS.CUSTOMERS).then((res) => {
    if (res.success && Array.isArray(res.customers)) {
      localStorage.setItem(CUSTOMERS_KEY, JSON.stringify(res.customers));
      notifyListeners();
    }
  });

  return INITIAL_CUSTOMERS;
};

// --- CUSTOMER & ORDER RECORDING ---
export const recordCustomerOrder = ({
  customerName,
  email = '',
  phone = '',
  shippingAddress = '',
  items = [],
  totalAmount = 0,
  orderId = null,
  customNotes = ''
}) => {
  const finalOrderId = orderId || `DH-${Math.floor(100000 + Math.random() * 900000)}`;
  const todayDate = new Date().toISOString().split('T')[0];
  const timestamp = new Date().toISOString();

  const orders = getStoredOrders();
  const calculatedTotal = Number(totalAmount) || items.reduce((sum, i) => sum + (Number(i.price || 0) * Number(i.quantity || 1)), 0);

  const newOrder = {
    id: finalOrderId,
    customerName: customerName || 'Valued Customer',
    email: email || 'N/A',
    phone: phone || 'N/A',
    date: timestamp,
    items: items.map((it) => ({
      id: it.id || 'custom',
      name: it.name || it.title || 'Handmade Item',
      quantity: it.quantity || 1,
      price: it.price || 0,
      customName: it.customName || it.selectedSize || ''
    })),
    totalAmount: calculatedTotal,
    paymentStatus: 'WHATSAPP ENQUIRY',
    orderStatus: 'Pending',
    shippingAddress: shippingAddress || 'Pending Confirmation via WhatsApp',
    notes: customNotes
  };
  const updatedOrders = [newOrder, ...orders];
  localStorage.setItem(ORDERS_KEY, JSON.stringify(updatedOrders));

  const customers = getStoredCustomers();
  const cleanPhone = (phone || '').replace(/\D/g, '');
  const existingIdx = customers.findIndex((c) => 
    (cleanPhone && cleanPhone.length >= 10 && c.phone && c.phone.replace(/\D/g, '').includes(cleanPhone.slice(-10))) ||
    (email && email !== 'N/A' && c.email && c.email.toLowerCase() === email.toLowerCase())
  );

  let updatedCustomers;
  if (existingIdx !== -1) {
    const existing = customers[existingIdx];
    customers[existingIdx] = {
      ...existing,
      name: customerName || existing.name,
      email: (email && email !== 'N/A') ? email : existing.email,
      phone: phone || existing.phone,
      ordersCount: (existing.ordersCount || 0) + 1,
      totalSpent: (existing.totalSpent || 0) + calculatedTotal,
      lastOrder: todayDate
    };
    updatedCustomers = [...customers];
  } else {
    const newCustomer = {
      id: `cust-${Date.now()}`,
      name: customerName || 'Valued Customer',
      email: email || 'N/A',
      phone: phone || 'N/A',
      ordersCount: 1,
      totalSpent: calculatedTotal,
      lastOrder: todayDate
    };
    updatedCustomers = [newCustomer, ...customers];
  }

  localStorage.setItem(CUSTOMERS_KEY, JSON.stringify(updatedCustomers));
  notifyListeners();

  apiFetch(API_ENDPOINTS.ORDERS, {
    method: 'POST',
    body: JSON.stringify({
      customerName, email, phone, shippingAddress, items, totalAmount: calculatedTotal, orderId: finalOrderId, customNotes
    })
  });

  return { order: newOrder, orderId: finalOrderId };
};

export const recordCustomerInquiry = ({
  name,
  phone = '',
  email = '',
  category = '',
  message = '',
  eventDate = ''
}) => {
  return recordCustomerOrder({
    customerName: name,
    email: email || 'N/A',
    phone: phone || 'N/A',
    shippingAddress: eventDate ? `Event Date: ${eventDate}` : 'Inquiry via Contact Form',
    items: [{ id: 'inquiry', name: `${category} Inquiry`, quantity: 1, price: 0, customName: message }],
    totalAmount: 0,
    customNotes: message
  });
};
