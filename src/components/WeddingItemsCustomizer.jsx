import React, { useState, useEffect } from 'react';
import MasterCategoryCustomizer, { MasterDetailsModal } from './MasterCategoryCustomizer';
import { getStoredProducts, subscribeToDataStore } from '../services/adminDataStore';

export const getWeddingProducts = () => {
  const all = getStoredProducts();
  return all
    .filter((p) => p.category === 'Wedding & Marriage Items' && p.status !== 'INACTIVE')
    .map((p) => ({
      ...p,
      icon: p.icon || '💒',
      category: '💒 WEDDING & MARRIAGE COLLECTION',
      shortDesc: p.shortDesc || p.desc || 'Intricately handcrafted wedding accessories designed to make your marriage ceremonies memorable.',
      detailedDesc: p.description || p.shortDesc
    }));
};

export const WeddingItemsDetailsModal = MasterDetailsModal;

const WeddingItemsCustomizer = ({ onSelectProduct, onAddToCart }) => {
  const [products, setProducts] = useState(() => getWeddingProducts());

  useEffect(() => {
    const unsub = subscribeToDataStore(() => {
      setProducts(getWeddingProducts());
    });
    return unsub;
  }, []);

  return (
    <MasterCategoryCustomizer
      subtitle="💒 ROYAL BRIDAL ATELIER"
      title="Wedding & Marriage Collection"
      description="Explore handcrafted bridal accessories, marriage trousseau trays, traditional decorated coconuts, varmala preserved resin plaques, and custom wedding favors."
      products={products}
      onSelectProduct={onSelectProduct}
      onAddToCart={onAddToCart}
      hideHeaderStepRow={true}
      hideOrderSummary={true}
    />
  );
};

export default WeddingItemsCustomizer;
