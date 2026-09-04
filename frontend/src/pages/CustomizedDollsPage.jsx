import React, { useState, useEffect } from 'react';
import MasterCategoryCustomizer from '../components/MasterCategoryCustomizer';
import { getStoredProducts, subscribeToDataStore } from '../services/adminDataStore';

export const DOLL_PRODUCTS = [
  {
    id: 'doll-01',
    name: 'Handcrafted Bridal Couple Theme Dolls',
    icon: '🎎',
    category: '🎎 CUSTOMIZED DOLLS COLLECTION',
    shortDesc: 'Handcrafted traditional royal bride & groom theme dolls for wedding displays and trousseau hampers.',
    detailedDesc: 'Beautifully detailed handcrafted traditional theme dolls dressed in authentic velvet and zardosi royal attire.',
    image: '/bridal_bangle_set.jpg'
  },
  {
    id: 'doll-02',
    name: 'Personalized Festive & Baby Theme Dolls',
    icon: '🎎',
    category: '🎎 CUSTOMIZED DOLLS COLLECTION',
    shortDesc: 'Artisanal festive theme dolls handcrafted for housewarming, baby shower, and traditional ceremonies.',
    detailedDesc: 'Customized theme dolls handcrafted with intricate thread work, jewelry accents, and personalized themes.',
    image: '/kundan_stone_bangles.jpg'
  }
];

export const getDollProducts = () => {
  const all = getStoredProducts();
  const filtered = all.filter((p) => p.category === 'Customized Dolls' && p.status !== 'INACTIVE');
  if (filtered.length > 0) {
    return filtered.map((p) => ({
      ...p,
      icon: p.icon || '🎎',
      category: '🎎 CUSTOMIZED DOLLS COLLECTION',
      shortDesc: p.shortDesc || p.desc || 'Handcrafted custom miniature dolls & couple figurines.',
      detailedDesc: p.description || p.shortDesc
    }));
  }
  return DOLL_PRODUCTS;
};

const CustomizedDollsPage = ({ onSelectProduct, onAddToCart }) => {
  const [products, setProducts] = useState(() => getDollProducts());

  useEffect(() => {
    const unsub = subscribeToDataStore(() => {
      setProducts(getDollProducts());
    });
    return unsub;
  }, []);

  return (
    <div style={{ paddingTop: '2rem' }}>
      <MasterCategoryCustomizer
        subtitle="🎎 ARTISANAL DOLL ATELIER"
        title="Customized Dolls Collection"
        description="Handcrafted traditional theme dolls, bridal couple display dolls, and festive keepsakes customized with love."
        products={products}
        onSelectProduct={onSelectProduct}
        onAddToCart={onAddToCart}
        hideHeaderStepRow={true}
        hideOrderSummary={true}
      />
    </div>
  );
};

export default CustomizedDollsPage;
