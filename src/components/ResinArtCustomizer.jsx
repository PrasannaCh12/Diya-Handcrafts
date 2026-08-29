import React from 'react';
import MasterCategoryCustomizer, { MasterDetailsModal } from './MasterCategoryCustomizer';
import { PRODUCTS } from '../data/products';

export const RESIN_ART_PRODUCTS = PRODUCTS.filter((p) => p.category === 'Resin Art').map((p) => ({
  ...p,
  icon: '✨',
  category: '🎨 RESIN ART COLLECTION',
  shortDesc: p.shortDesc || p.desc || 'Handcrafted crystal clear resin plaque embedded with real dried flowers, gold leaf foil, and custom photo memories.',
  detailedDesc: p.description || p.shortDesc
}));

export const ResinArtDetailsModal = MasterDetailsModal;

const ResinArtCustomizer = ({ onSelectProduct, onAddToCart }) => {
  return (
    <MasterCategoryCustomizer
      subtitle="✨ RESIN ART ATELIER"
      title="Customize Your Resin Art Keepsakes"
      description="Preserve your cherished memories, wedding varmala flowers, baby milestone keepsakes, and personalized photos in crystal-clear epoxy resin with 24k gold leaf foil."
      products={RESIN_ART_PRODUCTS}
      onSelectProduct={onSelectProduct}
      onAddToCart={onAddToCart}
    />
  );
};

export default ResinArtCustomizer;
