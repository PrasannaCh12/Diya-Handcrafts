import React, { useState, useEffect } from 'react';
import MasterCategoryCustomizer, { MasterDetailsModal } from './MasterCategoryCustomizer';
import { getStoredProducts, subscribeToDataStore } from '../services/adminDataStore';

export const getResinArtProducts = () => {
  const all = getStoredProducts();
  return all
    .filter((p) => p.category === 'Resin Art' && p.status !== 'INACTIVE')
    .map((p) => ({
      ...p,
      icon: p.icon || '✨',
      category: '🎨 RESIN ART COLLECTION',
      shortDesc: p.shortDesc || p.desc || 'Handcrafted crystal clear resin plaque embedded with real dried flowers, gold leaf foil, and custom photo memories.',
      detailedDesc: p.description || p.shortDesc
    }));
};

export const ResinArtDetailsModal = MasterDetailsModal;

const ResinArtCustomizer = ({ onSelectProduct, onAddToCart }) => {
  const [resinProducts, setResinProducts] = useState(() => getResinArtProducts());

  useEffect(() => {
    const unsub = subscribeToDataStore(() => {
      setResinProducts(getResinArtProducts());
    });
    return unsub;
  }, []);

  return (
    <MasterCategoryCustomizer
      subtitle="✨ RESIN ART ATELIER"
      title="Customize Your Resin Art Keepsakes"
      description="Preserve your cherished memories, wedding varmala flowers, baby milestone keepsakes, and personalized photos in crystal-clear epoxy resin with 24k gold leaf foil."
      products={resinProducts}
      onSelectProduct={onSelectProduct}
      onAddToCart={onAddToCart}
    />
  );
};

export default ResinArtCustomizer;
