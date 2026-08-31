import React from 'react';
import { useLocation } from 'react-router-dom';
import ChocolateCustomizer from '../components/ChocolateCustomizer';

const ChocolatePage = ({ onSelectProduct }) => {
  const location = useLocation();

  return (
    <div key={location.key || location.pathname} style={{ paddingTop: '2rem' }}>
      <ChocolateCustomizer onSelectProduct={onSelectProduct} />
    </div>
  );
};

export default ChocolatePage;
