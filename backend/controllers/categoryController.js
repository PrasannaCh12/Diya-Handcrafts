let categoriesStore = [
  { id: 'cat-1', name: 'Thread Work', slug: 'thread-work', description: 'Handcrafted bridal bangles, silk thread cuffs & Kundan stone jewelry.', icon: '🧵', status: 'ACTIVE', displayOrder: 1, createdAt: '2026-01-01T00:00:00.000Z' },
  { id: 'cat-2', name: 'Resin Art', slug: 'resin-art', description: 'Custom preserved floral frames, anniversary plaques, coasters & keychains.', icon: '🎨', status: 'ACTIVE', displayOrder: 2, createdAt: '2026-01-01T00:00:00.000Z' },
  { id: 'cat-3', name: 'Chocolates', slug: 'chocolates', description: 'Artisanal handmade luxury chocolates, truffles & customized gift boxes.', icon: '🍫', status: 'ACTIVE', displayOrder: 3, createdAt: '2026-01-01T00:00:00.000Z' },
  { id: 'cat-4', name: 'Biscuits', slug: 'biscuits', description: 'Freshly baked artisanal gourmet butter biscuits & cookies.', icon: '🍪', status: 'ACTIVE', displayOrder: 4, createdAt: '2026-01-01T00:00:00.000Z' },
  { id: 'cat-5', name: 'Wedding & Marriage Items', slug: 'wedding-marriage-items', description: 'Bespoke bridal thali plates, wedding favors & ceremonial keepsakes.', icon: '💍', status: 'ACTIVE', displayOrder: 5, createdAt: '2026-01-01T00:00:00.000Z' },
  { id: 'cat-6', name: 'Customized Chains', slug: 'customized-chains', description: 'Handcrafted personalized name chains, pendants & charms.', icon: '📿', status: 'ACTIVE', displayOrder: 6, createdAt: '2026-01-01T00:00:00.000Z' },
  { id: 'cat-7', name: 'Customized Gifts', slug: 'customized-gifts', description: 'Personalized gift hampers, photo frames & bespoke keepsakes.', icon: '🎁', status: 'ACTIVE', displayOrder: 7, createdAt: '2026-01-01T00:00:00.000Z' },
  { id: 'cat-8', name: 'Customized Dolls', slug: 'customized-dolls', description: 'Handcrafted custom miniature dolls & couple figurines.', icon: '🧸', status: 'ACTIVE', displayOrder: 8, createdAt: '2026-01-01T00:00:00.000Z' }
];

const generateSlug = (name) => {
  return (name || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '') || 'collection';
};

export const getCategories = (req, res) => {
  const sorted = [...categoriesStore].sort((a, b) => (Number(a.displayOrder) || 99) - (Number(b.displayOrder) || 99));
  res.json({ success: true, categories: sorted });
};

export const createCategory = (req, res) => {
  const categoryData = req.body;
  const name = categoryData.name || 'New Collection';
  const newCat = {
    id: `cat-${Date.now()}`,
    name,
    slug: categoryData.slug || generateSlug(name),
    description: categoryData.description || '',
    icon: categoryData.icon || '✨',
    image: categoryData.image || '',
    status: categoryData.status === 'INACTIVE' ? 'INACTIVE' : 'ACTIVE',
    displayOrder: Number(categoryData.displayOrder) || categoriesStore.length + 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  categoriesStore = [newCat, ...categoriesStore];
  res.status(201).json({ success: true, category: newCat });
};

export const updateCategory = (req, res) => {
  const { id } = req.params;
  const fields = req.body;

  const idx = categoriesStore.findIndex((c) => c.id === id);
  if (idx === -1) {
    return res.status(404).json({ success: false, message: 'Collection not found' });
  }

  const updatedName = fields.name !== undefined ? fields.name : categoriesStore[idx].name;
  categoriesStore[idx] = {
    ...categoriesStore[idx],
    ...fields,
    name: updatedName,
    slug: fields.slug || generateSlug(updatedName),
    displayOrder: fields.displayOrder !== undefined ? Number(fields.displayOrder) : categoriesStore[idx].displayOrder,
    updatedAt: new Date().toISOString()
  };

  res.json({ success: true, category: categoriesStore[idx] });
};

export const deleteCategory = (req, res) => {
  const { id } = req.params;
  const target = categoriesStore.find((c) => c.id === id);

  if (!target) {
    return res.status(404).json({ success: false, message: 'Collection not found' });
  }

  categoriesStore = categoriesStore.filter((c) => c.id !== id);
  res.json({ success: true, message: 'Collection deleted successfully' });
};
