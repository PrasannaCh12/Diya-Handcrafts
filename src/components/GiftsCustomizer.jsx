import React, { useState, useEffect } from 'react';
import MasterCategoryCustomizer, { MasterDetailsModal } from './MasterCategoryCustomizer';
import { getStoredProducts, subscribeToDataStore } from '../services/adminDataStore';

export const getGiftsProducts = () => {
  const all = getStoredProducts();
  return all
    .filter((p) => p.category === 'Customized Gifts' && p.status !== 'INACTIVE')
    .map((p) => ({
      ...p,
      icon: p.icon || '🎁',
      category: '🎁 CUSTOMIZED GIFTS COLLECTION',
      shortDesc: p.shortDesc || p.desc || 'Personalized keepsake gifts handcrafted to celebrate birthdays, weddings, anniversaries, and festive occasions.',
      detailedDesc: p.description || p.shortDesc
    }));
};

export const GiftsDetailsModal = MasterDetailsModal;

const GiftsCustomizer = ({ onSelectProduct, onAddToCart }) => {
  const [products, setProducts] = useState(() => getGiftsProducts());

  useEffect(() => {
    const unsub = subscribeToDataStore(() => {
      setProducts(getGiftsProducts());
    });
    return unsub;
  }, []);

  return (
    <MasterCategoryCustomizer
      subtitle="🎁 ARTISANAL GIFTING ATELIER"
      title="Customized Gifts Collection"
      description="Thoughtfully personalized gifts for birthdays, weddings, anniversaries, housewarmings, and festive occasions. Made with love for your special ones."
      products={products}
      onSelectProduct={onSelectProduct}
      onAddToCart={onAddToCart}
      hideHeaderStepRow={true}
      hideOrderSummary={true}
    />
  );
};

export default GiftsCustomizer;
