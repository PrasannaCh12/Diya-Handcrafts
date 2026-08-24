import React from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import FeaturedCategories from '../components/FeaturedCategories';

const HomePage = () => {
  const navigate = useNavigate();

  const handleSelectCategory = (catId) => {
    if (catId === 'Thread Work') navigate('/threadwork');
    else if (catId === 'Resin Art') navigate('/resinart');
    else if (catId === 'Wedding & Marriage Items') navigate('/wedding-marriage-items');
    else if (catId === 'Customized Chains') navigate('/customized-chains');
    else if (catId === 'Chocolates' || catId === 'Homemade Chocolates') navigate('/chocolates');
    else if (catId === 'Biscuits' || catId === 'Homemade Biscuits') navigate('/biscuits');
    else if (catId === 'Customized Gifts') navigate('/customized-gifts');
    else if (catId === 'Customized Dolls') navigate('/customized-dolls');
    else navigate('/shop');
  };

  return (
    <div>
      <Hero
        onExploreClick={() => navigate('/shop')}
        onCustomOrderClick={() => navigate('/custom-order')}
      />
      <div id="categories">
        <FeaturedCategories onSelectCategory={handleSelectCategory} />
      </div>
    </div>
  );
};

export default HomePage;
