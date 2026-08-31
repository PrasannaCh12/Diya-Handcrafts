import { initialGalleryItems } from '../../src/data/galleryData.js';

let galleryStore = [...initialGalleryItems];

export const getGalleryItems = (req, res) => {
  res.json({ success: true, items: galleryStore });
};

export const createGalleryItem = (req, res) => {
  const itemData = req.body;
  const newItem = {
    ...itemData,
    id: `gal-${Date.now()}`,
    likes: 0,
    featured: Boolean(itemData.featured),
    createdAt: new Date().toISOString()
  };

  galleryStore = [newItem, ...galleryStore];
  res.status(201).json({ success: true, item: newItem });
};
