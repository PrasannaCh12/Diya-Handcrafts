import React from 'react';
import { useLocation } from 'react-router-dom';
import BiscuitCustomizer from '../components/BiscuitCustomizer';

const BiscuitPage = ({ onSelectProduct }) => {
  const location = useLocation();

  return (
    <div key={location.key || location.pathname} style={{ paddingTop: '2rem' }}>
      <BiscuitCustomizer onSelectProduct={onSelectProduct} />
    </div>
  );
};

export default BiscuitPage;
