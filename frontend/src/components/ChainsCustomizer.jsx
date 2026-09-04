import React, { useState, useEffect } from 'react';
import MasterCategoryCustomizer, { MasterDetailsModal } from './MasterCategoryCustomizer';
import { getStoredProducts, subscribeToDataStore } from '../services/adminDataStore';

export const CHAIN_PRODUCTS = [
  {
    id: 'chain-04',
    name: 'Customized Name Chain - Gold Finish',
    icon: '📿',
    category: '📿 CUSTOMIZED CHAINS COLLECTION',
    shortDesc: 'Artisanal customized chain with personalized name pendant in rich gold finish.',
    detailedDesc: 'Artisanal customized chain crafted with high-precision laser engraving and anti-tarnish materials.',
    image: '/custom_chain_01.jpg'
  },
  {
    id: 'chain-05',
    name: 'Initial Heart Pendant Chain - Rose Gold',
    icon: '📿',
    category: '📿 CUSTOMIZED CHAINS COLLECTION',
    shortDesc: 'Delicate heart pendant chain personalized with custom initial engraving.',
    detailedDesc: 'Artisanal customized chain crafted with high-precision laser engraving and anti-tarnish materials.',
    image: '/custom_chain_02.jpg'
  },
  {
    id: 'chain-06',
    name: 'Custom Date & Coordinate Locket Chain',
    icon: '📿',
    category: '📿 CUSTOMIZED CHAINS COLLECTION',
    shortDesc: 'Elegant bar locket chain customized with special date and coordinates.',
    detailedDesc: 'Artisanal customized chain crafted with high-precision laser engraving and anti-tarnish materials.',
    image: '/custom_chain_03.jpg'
  },
  {
    id: 'chain-07',
    name: 'Double Layered Pearl Name Necklace',
    icon: '📿',
    category: '📿 CUSTOMIZED CHAINS COLLECTION',
    shortDesc: 'Sophisticated double-layer chain with freshwater pearl accents and custom lettering.',
    detailedDesc: 'Artisanal customized chain crafted with high-precision laser engraving and anti-tarnish materials.',
    image: '/custom_chain_04.jpg'
  },
  {
    id: 'chain-08',
    name: 'Lakshmi Coin Traditional Temple Chain',
    icon: '📿',
    category: '📿 CUSTOMIZED CHAINS COLLECTION',
    shortDesc: 'Handcrafted traditional temple chain with intricate Lakshmi coin motif.',
    detailedDesc: 'Artisanal customized chain crafted with high-precision laser engraving and anti-tarnish materials.',
    image: '/custom_chain_05.jpg'
  }
];

export const getChainsProducts = () => {
  const all = getStoredProducts();
  const filtered = all.filter((p) => p.category === 'Customized Chains' && p.status !== 'INACTIVE');
  if (filtered.length > 0) {
    return filtered.map((p) => ({
      ...p,
      icon: p.icon || '📿',
      category: '📿 CUSTOMIZED CHAINS COLLECTION',
      shortDesc: p.shortDesc || p.desc || 'Handcrafted personalized name chains, pendants & charms.',
      detailedDesc: p.description || p.shortDesc
    }));
  }
  return CHAIN_PRODUCTS;
};

export const ChainsDetailsModal = MasterDetailsModal;

const ChainsCustomizer = ({ onSelectProduct, onAddToCart }) => {
  const [products, setProducts] = useState(() => getChainsProducts());

  useEffect(() => {
    const unsub = subscribeToDataStore(() => {
      setProducts(getChainsProducts());
    });
    return unsub;
  }, []);

  return (
    <MasterCategoryCustomizer
      subtitle="📿 PERSONALIZED JEWELRY STUDIO"
      title="Customized Chains & Pendants"
      description="Explore our handcrafted red coral temple chains, black crystal bead neckpieces, ruby & emerald Kundan chokers, double-layer pearl drops, and gold Lakshmi coin chains."
      products={products}
      onSelectProduct={onSelectProduct}
      onAddToCart={onAddToCart}
      hideHeaderStepRow={true}
      hideOrderSummary={true}
    />
  );
};

export default ChainsCustomizer;
