import React from 'react';
import MasterCategoryCustomizer from '../components/MasterCategoryCustomizer';

export const DOLL_PRODUCTS = [
  {
    id: 'doll-01',
    name: 'Handcrafted Bridal Couple Theme Dolls',
    icon: '🎎',
    category: '🎎 CUSTOMIZED DOLLS COLLECTION',
    shortDesc: 'Handcrafted traditional royal bride & groom theme dolls for wedding displays and trousseau hampers.',
    description: 'Beautifully detailed handcrafted traditional theme dolls dressed in authentic velvet and zardosi royal attire.',
    image: '/bridal_bangle_set.jpg'
  },
  {
    id: 'doll-02',
    name: 'Personalized Festive & Baby Theme Dolls',
    icon: '🎎',
    category: '🎎 CUSTOMIZED DOLLS COLLECTION',
    shortDesc: 'Artisanal festive theme dolls handcrafted for housewarming, baby shower, and traditional ceremonies.',
    description: 'Customized theme dolls handcrafted with intricate thread work, jewelry accents, and personalized themes.',
    image: '/kundan_stone_bangles.jpg'
  }
];

const CustomizedDollsPage = ({ onSelectProduct }) => {
  return (
    <div style={{ paddingTop: '2rem' }}>
      <MasterCategoryCustomizer
        subtitle="🎎 ARTISANAL DOLL ATELIER"
        title="Customized Dolls Collection"
        description="Handcrafted traditional theme dolls, bridal couple display dolls, and festive keepsakes customized with love."
        products={DOLL_PRODUCTS}
        onSelectProduct={onSelectProduct}
      />
    </div>
  );
};

export default CustomizedDollsPage;
