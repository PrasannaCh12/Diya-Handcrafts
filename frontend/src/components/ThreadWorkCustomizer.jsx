import React, { useState, useEffect } from 'react';
import MasterCategoryCustomizer, { MasterDetailsModal } from './MasterCategoryCustomizer';
import { getStoredProducts, subscribeToDataStore } from '../services/adminDataStore';

export const THREADWORK_DESIGNS = [
  {
    id: 'tw-bridal-red',
    name: 'Royal Peacock Silk Thread Bridal Bangle Set',
    icon: '🧵',
    category: '🧵 THREAD WORK COLLECTION',
    shortDesc: 'Luxurious handcrafted royal blue silk thread bridal bangles featuring antique peacock motifs, premium kundan stones, sparkling crystals, and traditional temple-inspired detailing.',
    detailedDesc: 'Crafted with royal blue silk thread, antique gold peacock motifs, hand-set kundan stones & crystals. Perfect for bridal weddings, receptions, and festive occasions.',
    image: '/blue_peacock_bangles.jpg'
  },
  {
    id: 'tw-purple-velvet',
    name: 'Royal Emerald Coin Silk Thread Bridal Bangle Set',
    icon: '💚',
    category: '🧵 THREAD WORK COLLECTION',
    shortDesc: 'Handcrafted emerald green silk thread bridal bangles featuring antique gold coin motifs, ruby-red stones, crystal embellishments, and traditional South Indian temple-inspired detailing.',
    detailedDesc: 'Crafted with emerald green silk thread, antique temple coins, ruby kundan crystals & brass base.',
    image: '/emerald_coin_bangles.jpg'
  },
  {
    id: 'tw-kundan-cuffs',
    name: 'Emerald Peacock Silk Thread Bangles',
    icon: '🦚',
    category: '🧵 THREAD WORK COLLECTION',
    shortDesc: 'Elegant handcrafted emerald green silk thread bangles featuring antique peacock motifs, premium kundan stones, sparkling crystals, and traditional gold embellishments.',
    detailedDesc: 'Crafted with emerald green resham thread, antique gold peacock cuffs, glass kundan crystals.',
    image: '/emerald_peacock_bangles.png'
  },
  {
    id: 'tw-multicolor-set',
    name: 'Royal Emerald Peacock Bridal Bangle Set',
    icon: '✨',
    category: '🧵 THREAD WORK COLLECTION',
    shortDesc: 'Premium handcrafted emerald green silk thread bridal bangles featuring antique gold peacock motifs, sparkling mirror kundan stones, crystal embellishments, and intricate traditional detailing.',
    detailedDesc: 'Crafted with emerald silk threads, mirror kundan stones, antique gold kada castings.',
    image: '/royal_emerald_peacock_set.jpg'
  },
  {
    id: 'tw-floral-thread',
    name: 'Multicolor Designer Silk Thread Bangle Collection',
    icon: '🌈',
    category: '🧵 THREAD WORK COLLECTION',
    shortDesc: 'Vibrant handcrafted silk thread bangles in royal blue, mustard yellow, pink, emerald green, and crimson red, beautifully embellished with floral kundan stones, gold accents, and elegant traditional detailing.',
    detailedDesc: 'Crafted with vibrant silk thread palette, gold leaf wire, floral kundan flower studs.',
    image: '/multicolor_bangles_collection.jpg'
  }
];

export const getThreadWorkProducts = () => {
  const all = getStoredProducts();
  const filtered = all.filter((p) => (p.category === 'Thread Work' || p.category === 'Silk Thread Bangles') && p.status !== 'INACTIVE');
  if (filtered.length > 0) {
    return filtered.map((p) => ({
      ...p,
      icon: p.icon || '🧵',
      category: '🧵 THREAD WORK COLLECTION',
      shortDesc: p.shortDesc || p.desc || 'Handcrafted silk thread bangle set with Kundan stone embellishments.',
      detailedDesc: p.description || p.shortDesc
    }));
  }
  return THREADWORK_DESIGNS;
};

export const ProductDetailsModal = MasterDetailsModal;

const ThreadWorkCustomizer = ({ onSelectProduct, onAddToCart }) => {
  const [products, setProducts] = useState(() => getThreadWorkProducts());

  useEffect(() => {
    const unsub = subscribeToDataStore(() => {
      setProducts(getThreadWorkProducts());
    });
    return unsub;
  }, []);

  return (
    <MasterCategoryCustomizer
      subtitle="🧵 HANDMADE THREAD WORK STUDIO"
      title="Customize Your Thread Work"
      description="Create your dream thread work with premium silk threads, kundan stones, pearls, and zardosi. Handmade with love, customized for every occasion."
      products={products}
      onSelectProduct={onSelectProduct}
      onAddToCart={onAddToCart}
      hideHeaderStepRow={true}
      hideOrderSummary={true}
    />
  );
};

export default ThreadWorkCustomizer;
