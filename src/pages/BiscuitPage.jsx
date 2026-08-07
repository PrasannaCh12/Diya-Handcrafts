import React from 'react';
import BiscuitCustomizer from '../components/BiscuitCustomizer';

const BiscuitPage = ({ onSelectProduct }) => {
  return (
    <div style={{ paddingTop: '2rem' }}>
      <BiscuitCustomizer onSelectProduct={onSelectProduct} />
    </div>
  );
};

export default BiscuitPage;
