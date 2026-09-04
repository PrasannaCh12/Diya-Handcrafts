import React, { useState, useEffect } from 'react';
import MasterCategoryCustomizer, { MasterDetailsModal } from './MasterCategoryCustomizer';
import { getStoredProducts, subscribeToDataStore } from '../services/adminDataStore';

export const CHOCOLATE_FLAVORS = [
  {
    id: 'flv-milk',
    name: 'Milk Chocolate',
    icon: '🍫',
    category: '🍫 HANDMADE CONFECTIONERY COLLECTION',
    shortDesc: 'Smooth and creamy premium milk chocolate crafted with rich cocoa and fresh milk.',
    detailedDesc: 'Indulge in our signature handcrafted milk chocolate bars, made with single-origin cocoa beans, real cocoa butter, and fresh wholesome milk solids.',
    image: '/milk_chocolate.png'
  },
  {
    id: 'flv-dark',
    name: 'Dark Chocolate',
    icon: '🍫',
    category: '🍫 HANDMADE CONFECTIONERY COLLECTION',
    shortDesc: 'Rich, intense dark chocolate with high cocoa content for a bold taste and smooth finish.',
    detailedDesc: 'Crafted for dark chocolate connoisseurs, this 70% single-origin artisanal dark chocolate delivers deep fruity undertones and a velvety clean finish.',
    image: '/dark_chocolate.png'
  },
  {
    id: 'flv-white',
    name: 'White Chocolate',
    icon: '🤍',
    category: '🍫 HANDMADE CONFECTIONERY COLLECTION',
    shortDesc: 'Velvety white chocolate made with premium cocoa butter, delivering rich creamy sweetness.',
    detailedDesc: 'Our luxury white chocolate is slow-crafted using 100% natural cocoa butter, fresh dairy milk solids, and fragrant vanilla beans.',
    image: '/white_chocolate.png'
  },
  {
    id: 'flv-strawberry',
    name: 'Strawberry Chocolate',
    icon: '🍓',
    category: '🍫 HANDMADE CONFECTIONERY COLLECTION',
    shortDesc: 'Creamy white chocolate infused with natural freeze-dried strawberry for a refreshing fruity taste.',
    detailedDesc: 'Experience a delightful fusion of rich creamy cocoa butter and real pulverized freeze-dried strawberries.',
    image: '/strawberry_chocolate.png'
  },
  {
    id: 'flv-pista',
    name: 'Pista (Pistachio) Chocolate',
    icon: '💚',
    category: '🍫 HANDMADE CONFECTIONERY COLLECTION',
    shortDesc: 'Premium chocolate blended with slow-roasted pistachios for a crunchy, nutty gourmet experience.',
    detailedDesc: 'Hand-selected roasted Iranian pistachios crushed and embedded into smooth Belgian milk chocolate.',
    image: '/pista_chocolate.png'
  },
  {
    id: 'flv-kunafa',
    name: 'Kunafa Chocolate',
    icon: '🥮',
    category: '🍫 HANDMADE CONFECTIONERY COLLECTION',
    shortDesc: 'Crispy Middle Eastern kunafa pastry & rich pistachio cream encased in a smooth chocolate shell.',
    detailedDesc: 'Inspired by Dubai\'s viral Kunafa dessert, this luxury bar features butter-roasted kataifi pastry threads folded into velvety pistachio tahini cream.',
    image: '/kunafa_chocolate.png'
  }
];

export const getChocolateProducts = () => {
  const all = getStoredProducts();
  const filtered = all.filter((p) => (p.category === 'Chocolates' || p.category === 'Homemade Chocolates') && p.status !== 'INACTIVE');
  if (filtered.length > 0) {
    return filtered.map((p) => ({
      ...p,
      icon: p.icon || '🍫',
      category: '🍫 HANDMADE CONFECTIONERY COLLECTION',
      shortDesc: p.shortDesc || p.desc || 'Artisanal handmade luxury chocolates made with cocoa butter.',
      detailedDesc: p.description || p.shortDesc
    }));
  }
  return CHOCOLATE_FLAVORS;
};

export const ChocolateDetailsModal = MasterDetailsModal;

const ChocolateCustomizer = ({ onSelectProduct, onAddToCart }) => {
  const [products, setProducts] = useState(() => getChocolateProducts());

  useEffect(() => {
    const unsub = subscribeToDataStore(() => {
      setProducts(getChocolateProducts());
    });
    return unsub;
  }, []);

  return (
    <MasterCategoryCustomizer
      subtitle="🍫 HANDMADE CONFECTIONERY STUDIO"
      title="Customize Your Handmade Chocolates"
      description="Create your perfect handmade chocolates with premium flavors, crunchy add-ons, elegant shapes, and luxury packaging. Customize every detail for a truly special gift."
      products={products}
      onSelectProduct={onSelectProduct}
      onAddToCart={onAddToCart}
      hideHeaderStepRow={true}
      hideOrderSummary={true}
    />
  );
};

export default ChocolateCustomizer;
