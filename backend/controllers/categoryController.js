let categoriesStore = [
  { id: 'cat-1', name: 'Thread Work', description: 'Handcrafted bridal bangles, silk thread cuffs & Kundan stone jewelry.', icon: '🧵', status: 'ACTIVE', createdAt: '2026-01-01' },
  { id: 'cat-2', name: 'Resin Art', description: 'Custom preserved floral frames, anniversary plaques, coasters & keychains.', icon: '🎨', status: 'ACTIVE', createdAt: '2026-01-01' },
  { id: 'cat-3', name: 'Chocolates', description: 'Artisanal handmade luxury chocolates, truffles & customized gift boxes.', icon: '🍫', status: 'ACTIVE', createdAt: '2026-01-01' },
  { id: 'cat-4', name: 'Biscuits', description: 'Freshly baked artisanal gourmet butter biscuits & cookies.', icon: '🍪', status: 'ACTIVE', createdAt: '2026-01-01' },
  { id: 'cat-5', name: 'Wedding & Marriage Items', description: 'Bespoke bridal thali plates, wedding favors & ceremonial keepsakes.', icon: '💍', status: 'ACTIVE', createdAt: '2026-01-01' },
  { id: 'cat-6', name: 'Customized Chains', description: 'Handcrafted personalized name chains, pendants & charms.', icon: '📿', status: 'ACTIVE', createdAt: '2026-01-01' },
  { id: 'cat-7', name: 'Customized Gifts', description: 'Personalized gift hampers, photo frames & bespoke keepsakes.', icon: '🎁', status: 'ACTIVE', createdAt: '2026-01-01' },
  { id: 'cat-8', name: 'Customized Dolls', description: 'Handcrafted custom miniature dolls & couple figurines.', icon: '🧸', status: 'ACTIVE', createdAt: '2026-01-01' }
];

export const getCategories = (req, res) => {
  res.json({ success: true, categories: categoriesStore });
};

export const createCategory = (req, res) => {
  const categoryData = req.body;
  const newCat = {
    ...categoryData,
    id: `cat-${Date.now()}`,
    status: categoryData.status || 'ACTIVE',
    createdAt: new Date().toISOString()
  };

  categoriesStore = [newCat, ...categoriesStore];
  res.status(201).json({ success: true, category: newCat });
};

export const updateCategory = (req, res) => {
  const { id } = req.params;
  const fields = req.body;

  const idx = categoriesStore.findIndex((c) => c.id === id);
  if (idx === -1) {
    return res.status(404).json({ success: false, message: 'Category not found' });
  }

  categoriesStore[idx] = { ...categoriesStore[idx], ...fields, updatedAt: new Date().toISOString() };
  res.json({ success: true, category: categoriesStore[idx] });
};

export const deleteCategory = (req, res) => {
  const { id } = req.params;
  categoriesStore = categoriesStore.filter((c) => c.id !== id);
  res.json({ success: true, message: 'Category deleted' });
};
