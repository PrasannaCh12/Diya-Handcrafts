import React from 'react';
import ResinArtCustomizer from '../components/ResinArtCustomizer';

const ResinArtPage = ({ onSelectProduct, onAddToCart }) => {
  return (
    <div style={{ paddingTop: '2rem', paddingBottom: '3rem' }}>
      <ResinArtCustomizer onSelectProduct={onSelectProduct} onAddToCart={onAddToCart} />
    </div>
  );
};

export default ResinArtPage;
