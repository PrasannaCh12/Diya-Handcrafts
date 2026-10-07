// Initial Default Gallery Showcase Items (Empty by default)
export const initialGalleryItems = [];

export const GALLERY_STORAGE_KEY = 'divya_admin_gallery_items';

export const getStoredGalleryItems = () => {
  try {
    const data = localStorage.getItem(GALLERY_STORAGE_KEY);
    let items = [];
    if (data) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) {
        items = parsed.filter(item => typeof item.id !== 'number' || item.id > 9);
      }
    }

    // Auto-sync check: Ensure all existing products have a corresponding gallery entry
    try {
      const productsData = localStorage.getItem('diya_admin_products_v2');
      if (productsData) {
        const products = JSON.parse(productsData);
        if (Array.isArray(products) && products.length > 0) {
          let changed = false;
          products.forEach((prod) => {
            if (!prod || !prod.id) return;
            const mainImg = prod.image || (Array.isArray(prod.images) && prod.images[0]) || '';

            const existingIdx = items.findIndex((it) => String(it.productId) === String(prod.id));
            if (existingIdx === -1) {
              if (mainImg) {
                items.unshift({
                  id: `gal-prod-${prod.id}`,
                  productId: prod.id,
                  title: prod.name || 'Product Item',
                  category: prod.category || 'General',
                  description: prod.description || prod.shortDesc || '',
                  image: mainImg,
                  images: Array.isArray(prod.images) && prod.images.length > 0 ? prod.images : [mainImg],
                  createdAt: prod.createdAt || new Date().toISOString(),
                  updatedAt: new Date().toISOString()
                });
                changed = true;
              }
            }
          });

          if (changed) {
            localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(items));
          }
        }
      }
    } catch (err) {
      console.error('Auto-sync product gallery check error:', err);
    }

    return items;
  } catch (e) {
    console.error('Failed to load gallery items from localStorage', e);
  }
  localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify([]));
  return [];
};

export const saveStoredGalleryItems = (items) => {
  try {
    localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new Event('gallery-updated'));
  } catch (e) {
    console.error('Failed to save gallery items', e);
  }
};

/**
 * Auto-sync product to gallery
 * Links gallery entry to product using item.productId
 */
export const syncProductToGallery = (product, action = 'CREATE_OR_UPDATE') => {
  if (!product || !product.id) return;

  try {
    const currentItems = getStoredGalleryItems();

    if (action === 'DELETE') {
      const remaining = currentItems.filter((item) => String(item.productId) !== String(product.id));
      if (remaining.length !== currentItems.length) {
        saveStoredGalleryItems(remaining);
      }
      return;
    }

    // CREATE_OR_UPDATE
    const mainImg = product.image || (Array.isArray(product.images) && product.images[0]) || '';
    const imagesList = Array.isArray(product.images) && product.images.length > 0 
      ? product.images 
      : (mainImg ? [mainImg] : []);

    const existingIdx = currentItems.findIndex((item) => String(item.productId) === String(product.id));

    if (existingIdx !== -1) {
      // Update existing gallery entry in-place (Duplicate protection)
      currentItems[existingIdx] = {
        ...currentItems[existingIdx],
        productId: product.id,
        title: product.name || 'Product Item',
        category: product.category || 'General',
        description: product.description || product.shortDesc || '',
        image: mainImg,
        images: imagesList,
        updatedAt: new Date().toISOString()
      };
    } else {
      // Create new gallery entry linked by productId
      const newItem = {
        id: `gal-prod-${product.id}`,
        productId: product.id,
        title: product.name || 'Product Item',
        category: product.category || 'General',
        description: product.description || product.shortDesc || '',
        image: mainImg,
        images: imagesList,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      currentItems.unshift(newItem);
    }

    saveStoredGalleryItems(currentItems);
  } catch (err) {
    console.error('Error syncing product to gallery:', err);
  }
};
