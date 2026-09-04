import React, { useState, useEffect } from 'react';
import MasterCategoryCustomizer, { MasterDetailsModal } from './MasterCategoryCustomizer';
import { getStoredProducts, subscribeToDataStore } from '../services/adminDataStore';

export const BISCUIT_VARIETIES = [
  {
    id: 'bsc-ragi',
    name: 'Ragi Biscuits',
    icon: '🍫',
    category: '🍪 GOURMET BAKERY COLLECTION',
    shortDesc: 'Nutritious finger millet biscuits made with pure jaggery, whole grains, and 100% maida-free ingredients.',
    detailedDesc: 'Crafted with organic finger millet (Ragi), whole wheat flour, and pure cow ghee, sweetened naturally with organic jaggery.',
    image: '/ragi_biscuits.jpg'
  },
  {
    id: 'bsc-wheat',
    name: 'Wheat Biscuits',
    icon: '🌾',
    category: '🍪 GOURMET BAKERY COLLECTION',
    shortDesc: 'Stone-ground whole wheat baked fresh with pure cow ghee and raw brown sugar for a rich crunchy bite.',
    detailedDesc: 'Traditional stone-ground whole wheat cookies slow-baked in small batches using pure churned cow ghee and raw unrefined brown sugar.',
    image: '/wheat_biscuits.jpg'
  },
  {
    id: 'bsc-oats',
    name: 'Oats Biscuits',
    icon: '🥣',
    category: '🍪 GOURMET BAKERY COLLECTION',
    shortDesc: 'Rolled oats & raw wildflower honey crunchy tea biscuits rich in dietary fiber and wholesome energy.',
    detailedDesc: 'Healthy rolled oats blended with raw wildflower honey, whole wheat, and golden flaxseeds.',
    image: '/oats_biscuits.jpg'
  },
  {
    id: 'bsc-millet',
    name: 'Millet Biscuits',
    icon: '🌿',
    category: '🍪 GOURMET BAKERY COLLECTION',
    shortDesc: 'Multi-millet roasted crunch with natural aromatic cardamom, organic jaggery, and zero refined sugar.',
    detailedDesc: 'Power-packed blend of foxtail millet, pearl millet (bajra), and sorghum flour infused with aromatic green cardamom pods.',
    image: '/millet_biscuits.jpg'
  },
  {
    id: 'bsc-butter',
    name: 'Butter Biscuits',
    icon: '🧈',
    category: '🍪 GOURMET BAKERY COLLECTION',
    shortDesc: 'Classic European melt-in-mouth pure butter shortbread cookies with a rich silky vanilla finish.',
    detailedDesc: 'Authentic melt-in-mouth butter cookies prepared with 100% pure unsalted creamery butter and pure vanilla bean extract.',
    image: '/butter_biscuits.jpg'
  },
  {
    id: 'bsc-almond',
    name: 'Almond Biscuits',
    icon: '🥜',
    category: '🍪 GOURMET BAKERY COLLECTION',
    shortDesc: 'Sliced golden roasted California almonds baked into crisp butter shortbread cookies.',
    detailedDesc: 'Generously loaded with hand-sliced California almonds and aromatic nutmeg for a golden nut-crusted crunch.',
    image: '/almond_biscuits.jpg'
  }
];

export const getBiscuitProducts = () => {
  const all = getStoredProducts();
  const filtered = all.filter((p) => p.category === 'Biscuits' && p.status !== 'INACTIVE');
  if (filtered.length > 0) {
    return filtered.map((p) => ({
      ...p,
      icon: p.icon || '🍪',
      category: '🍪 GOURMET BAKERY COLLECTION',
      shortDesc: p.shortDesc || p.desc || 'Freshly baked artisanal gourmet butter biscuits & cookies.',
      detailedDesc: p.description || p.shortDesc
    }));
  }
  return BISCUIT_VARIETIES;
};

export const BiscuitDetailsModal = MasterDetailsModal;

const BiscuitCustomizer = ({ onSelectProduct, onAddToCart }) => {
  const [products, setProducts] = useState(() => getBiscuitProducts());

  useEffect(() => {
    const unsub = subscribeToDataStore(() => {
      setProducts(getBiscuitProducts());
    });
    return unsub;
  }, []);

  return (
    <MasterCategoryCustomizer
      subtitle="🍪 GOURMET BAKERY STUDIO"
      title="Customize Your Homemade Biscuits"
      description="Build your bespoke box of fresh, eggless, 100% maida-free cookies baked with pure cow ghee, whole grains, and natural sweeteners."
      products={products}
      onSelectProduct={onSelectProduct}
      onAddToCart={onAddToCart}
      hideHeaderStepRow={true}
      hideOrderSummary={true}
    />
  );
};

export default BiscuitCustomizer;
