import React from 'react';
import MasterCategoryCustomizer, { MasterDetailsModal } from './MasterCategoryCustomizer';
import { PRODUCTS } from '../data/products';

export const WEDDING_PRODUCTS = PRODUCTS.filter((p) => p.category === 'Wedding & Marriage Items').map((p) => ({
  ...p,
  icon: '💒',
  category: '💒 WEDDING & MARRIAGE COLLECTION',
  shortDesc: p.shortDesc || p.desc || 'Intricately handcrafted wedding accessories designed to make your marriage ceremonies memorable.',
  detailedDesc: p.description || p.shortDesc
}));

export const WeddingItemsDetailsModal = MasterDetailsModal;

const WeddingItemsCustomizer = ({ onSelectProduct }) => {
  return (
    <MasterCategoryCustomizer
      subtitle="💒 ROYAL BRIDAL ATELIER"
      title="Wedding & Marriage Collection"
      description="Explore handcrafted bridal accessories, marriage trousseau trays, traditional decorated coconuts, varmala preserved resin plaques, and custom wedding favors."
      products={WEDDING_PRODUCTS}
      onSelectProduct={onSelectProduct}
    />
  );
};

export default WeddingItemsCustomizer;
