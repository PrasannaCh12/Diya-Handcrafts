import React from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Hero
        onExploreClick={() => navigate('/shop')}
        onCustomOrderClick={() => navigate('/custom-order')}
      />
    </div>
  );
};

export default HomePage;
