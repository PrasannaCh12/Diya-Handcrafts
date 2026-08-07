import React from 'react';
import ShopSection from '../components/ShopSection';

const ShopPage = ({ onSelectProduct, onAddToCart }) => {
  return (
    <div style={{ paddingTop: '2rem' }}>
      <ShopSection
        onSelectProduct={onSelectProduct}
        onAddToCart={onAddToCart}
      />
    </div>
  );
};

export default ShopPage;
