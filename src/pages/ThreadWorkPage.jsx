import React from 'react';
import ThreadWorkCustomizer from '../components/ThreadWorkCustomizer';

const ThreadWorkPage = ({ onSelectProduct }) => {
  return (
    <div style={{ paddingTop: '2rem' }}>
      <ThreadWorkCustomizer onSelectProduct={onSelectProduct} />
    </div>
  );
};

export default ThreadWorkPage;
