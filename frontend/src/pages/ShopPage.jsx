import React from 'react';
import ShopSection from '../components/ShopSection';

const ShopPage = ({ onAddToCart }) => {
  return (
    <div style={{ paddingTop: '2rem' }}>
      <ShopSection onAddToCart={onAddToCart} />
    </div>
  );
};

export default ShopPage;
