// Initial Default Gallery Showcase Items (Optimized for 500x500 1:1 Square Ratio)
export const initialGalleryItems = [
  {
    id: 1,
    title: 'Royal Silk Thread Bridal Bangles Set',
    category: 'Thread Work',
    image: 'https://images.unsplash.com/photo-1611591475140-be3e9ed9e2d7?auto=format&fit=crop&w=500&h=500&q=85',
    description: 'Custom crimson silk thread bangles embellished with Kundan stones and pearl drops for bridal trousseau.'
  },
  {
    id: 2,
    title: 'Preserved Wedding Flower Resin Wall Clock',
    category: 'Resin Art',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=500&h=500&q=85',
    description: '14-inch handcrafted resin clock with preserved varmala marigolds, roses, and 24K gold leaf accents.'
  },
  {
    id: 3,
    title: 'Artisan Belgian Truffles & Pralines Box',
    category: 'Chocolates',
    image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=500&h=500&q=85',
    description: 'Luxury handcrafted chocolate box filled with roasted almond rochers, dark ganache, and pistachio praline.'
  },
  {
    id: 4,
    title: 'Customized Gold Plated Name Pendant Chain',
    category: 'Customized Chains',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=500&h=500&q=85',
    description: 'Laser-cut calligraphy personalized name necklace with delicate Figaro chain and anti-tarnish finish.'
  },
  {
    id: 5,
    title: 'Traditional Wedding Kankanams & Bridal Trays',
    category: 'Wedding Items',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=500&h=500&q=85',
    description: 'Auspicious silk-wrapped marriage items, decorative coconut holders, and ceremony Aarti thalis.'
  },
  {
    id: 6,
    title: 'Pure Ghee Crunchy Ragi & Dry Fruit Cookies',
    category: 'Biscuits',
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=500&h=500&q=85',
    description: 'Melt-in-mouth eggless oven baked cookies made with native millets, organic jaggery, and desi ghee.'
  },
  {
    id: 7,
    title: 'Personalized Couple Photo Memory Resin Lamp',
    category: 'Customized Gifts',
    image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=500&h=500&q=85',
    description: 'Warm LED backlit resin display block preserving keepsake polaroids and dried baby breath flowers.'
  },
  {
    id: 8,
    title: 'Bridal Kadi & Zari Studded Silk Bangles',
    category: 'Thread Work',
    image: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=500&h=500&q=85',
    description: 'Emerald green and gold zari thread work bangles with zircon cluster centers.'
  },
  {
    id: 9,
    title: 'Ocean Wave Resin Serving Platter & Coasters',
    category: 'Resin Art',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=500&h=500&q=85',
    description: 'Teak wood cheese board with multi-layered turquoise ocean resin foam waves.'
  }
];

export const GALLERY_STORAGE_KEY = 'divya_admin_gallery_items';

export const getStoredGalleryItems = () => {
  try {
    const data = localStorage.getItem(GALLERY_STORAGE_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.error('Failed to load gallery items from localStorage', e);
  }
  return initialGalleryItems;
};

export const saveStoredGalleryItems = (items) => {
  try {
    localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new Event('gallery-updated'));
  } catch (e) {
    console.error('Failed to save gallery items', e);
  }
};
