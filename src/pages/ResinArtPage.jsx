import React from 'react';
import ResinArtCustomizer from '../components/ResinArtCustomizer';

const ResinArtPage = ({ onSelectProduct }) => {
  return (
    <div style={{ paddingTop: '2rem' }}>
      <ResinArtCustomizer onSelectProduct={onSelectProduct} />
    </div>
  );
};

export default ResinArtPage;
