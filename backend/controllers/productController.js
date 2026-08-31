import { PRODUCTS } from '../../src/data/products.js';

let productsStore = [...PRODUCTS];
let archivedProductsStore = [];

export const getProducts = (req, res) => {
  res.json({ success: true, products: productsStore });
};

export const getArchivedProducts = (req, res) => {
  res.json({ success: true, archived: archivedProductsStore });
};

export const getProductById = (req, res) => {
  const { id } = req.params;
  const product = productsStore.find((p) => p.id === id);
  if (!product) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }
  res.json({ success: true, product });
};

export const createProduct = (req, res) => {
  const productData = req.body;
  const newProduct = {
    ...productData,
    id: productData.id || `prod-${Date.now()}`,
    sku: productData.sku || `SKU-DIY-${Math.floor(1000 + Math.random() * 9000)}`,
    status: productData.status || 'ACTIVE',
    stockQuantity: Number(productData.stockQuantity || 20),
    stockStatus: Number(productData.stockQuantity || 20) > 0 ? 'In Stock' : 'Out of Stock',
    customFields: productData.customFields || [],
    addedBy: productData.addedBy || 'Divya Yelchuri (Super Admin)',
    addedByRole: productData.addedByRole || 'SUPER_ADMIN',
    createdAt: new Date().toISOString()
  };

  productsStore = [newProduct, ...productsStore];
  res.status(201).json({ success: true, product: newProduct });
};

export const updateProduct = (req, res) => {
  const { id } = req.params;
  const updatedFields = req.body;

  const idx = productsStore.findIndex((p) => p.id === id);
  if (idx !== -1) {
    productsStore[idx] = {
      ...productsStore[idx],
      ...updatedFields,
      stockQuantity: updatedFields.stockQuantity !== undefined ? Number(updatedFields.stockQuantity) : productsStore[idx].stockQuantity,
      stockStatus: updatedFields.stockQuantity !== undefined 
        ? (Number(updatedFields.stockQuantity) > 0 ? 'In Stock' : 'Out of Stock')
        : productsStore[idx].stockStatus,
      updatedAt: new Date().toISOString()
    };

    res.json({ success: true, product: productsStore[idx] });
  } else {
    res.status(404).json({ success: false, message: 'Product not found' });
  }
};

export const archiveProduct = (req, res) => {
  const { id } = req.params;
  const target = productsStore.find((p) => p.id === id);

  if (target) {
    productsStore = productsStore.filter((p) => p.id !== id);
    archivedProductsStore = [{ ...target, archivedAt: new Date().toISOString() }, ...archivedProductsStore];
    return res.json({ success: true, message: 'Product archived' });
  }

  res.status(404).json({ success: false, message: 'Product not found' });
};

export const restoreProduct = (req, res) => {
  const { id } = req.params;
  const target = archivedProductsStore.find((p) => p.id === id);

  if (target) {
    archivedProductsStore = archivedProductsStore.filter((p) => p.id !== id);
    productsStore = [target, ...productsStore];
    return res.json({ success: true, message: 'Product restored' });
  }

  res.status(404).json({ success: false, message: 'Archived product not found' });
};
