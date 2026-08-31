import React from 'react';
import MasterCategoryCustomizer, { MasterDetailsModal } from './MasterCategoryCustomizer';
import { PRODUCTS } from '../data/products';

export const GIFT_PRODUCTS = PRODUCTS.filter((p) => p.category === 'Customized Gifts').map((p) => ({
  ...p,
  icon: '🎁',
  category: '🎁 CUSTOMIZED GIFTS COLLECTION',
  shortDesc: p.shortDesc || p.desc || 'Personalized keepsake gifts handcrafted to celebrate birthdays, weddings, anniversaries, and festive occasions.',
  detailedDesc: p.description || p.shortDesc
}));

export const GiftsDetailsModal = MasterDetailsModal;

const GiftsCustomizer = ({ onSelectProduct }) => {
  return (
    <MasterCategoryCustomizer
      subtitle="🎁 ARTISANAL GIFTING ATELIER"
      title="Customized Gifts Collection"
      description="Thoughtfully personalized gifts for birthdays, weddings, anniversaries, housewarmings, and festive occasions. Made with love for your special ones."
      products={GIFT_PRODUCTS}
      onSelectProduct={onSelectProduct}
    />
  );
};

export default GiftsCustomizer;
