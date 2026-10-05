// Initial Default Gallery Showcase Items (Empty by default)
export const initialGalleryItems = [];

export const GALLERY_STORAGE_KEY = 'divya_admin_gallery_items';

export const getStoredGalleryItems = () => {
  try {
    const data = localStorage.getItem(GALLERY_STORAGE_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) {
        const filtered = parsed.filter(item => typeof item.id !== 'number' || item.id > 9);
        if (filtered.length !== parsed.length) {
          localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(filtered));
        }
        return filtered;
      }
    }
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
