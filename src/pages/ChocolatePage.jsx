import React from 'react';
import ChocolateCustomizer from '../components/ChocolateCustomizer';

const ChocolatePage = ({ onSelectProduct }) => {
  return (
    <div style={{ paddingTop: '2rem' }}>
      <ChocolateCustomizer onSelectProduct={onSelectProduct} />
    </div>
  );
};

export default ChocolatePage;
