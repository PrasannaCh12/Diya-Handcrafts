import React from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import FeaturedCategories from '../components/FeaturedCategories';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Hero
        onExploreClick={() => navigate('/shop')}
        onCustomOrderClick={() => navigate('/custom-order')}
      />
      <div id="collections-studio">
        <FeaturedCategories />
      </div>
    </div>
  );
};

export default HomePage;
