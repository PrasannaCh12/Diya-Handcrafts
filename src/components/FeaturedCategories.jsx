import React from 'react';
import { FaGem, FaPaintBrush, FaCookie, FaBreadSlice, FaGift, FaHeart } from 'react-icons/fa';

const FeaturedCategories = ({ onSelectCategory }) => {
  const categories = [
    {
      id: 'Thread Work',
      title: 'Thread Work',
      tagline: 'Custom Velvet & Zardosi Sets',
      icon: <FaGem />,
      bg: 'linear-gradient(135deg, #F8E4E7 0%, #FAF0F2 100%)',
      iconColor: 'var(--rose-primary)',
      img: '/bridal_bangle_set.jpg'
    },
    {
      id: 'Resin Art',
      title: 'Resin Art',
      tagline: 'Floral Clocks & Memory Geodes',
      icon: <FaPaintBrush />,
      bg: 'linear-gradient(135deg, #FAF0D7 0%, #FFFDF9 100%)',
      iconColor: '#B8860B',
      img: '/resin_art_category.jpg'
    },
    {
      id: 'Homemade Chocolates',
      title: 'Homemade Chocolates',
      tagline: 'Belgian Truffles & Almond Rochers',
      icon: <FaCookie />,
      bg: 'linear-gradient(135deg, #E8D8CE 0%, #F5EAE0 100%)',
      iconColor: '#5C3A21',
      img: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'Homemade Biscuits',
      title: 'Homemade Biscuits',
      tagline: 'Eggless Pure Ghee Nankhatai',
      icon: <FaBreadSlice />,
      bg: 'linear-gradient(135deg, #FFF0DB 0%, #FFF8EE 100%)',
      iconColor: '#D97706',
      img: '/ragi_biscuits.jpg'
    }
  ];

  return (
    <section className="featured-categories-section">
      <div className="container">
        <div className="section-header">
          <div className="section-subtitle">Artisanal Collections</div>
          <h2 className="section-title">Explore Featured Categories</h2>
          <p className="section-description">
            Handcrafted with precision, passion, and elegance for every unforgettable celebration.
          </p>
        </div>

        <div className="categories-grid">
          {categories.map((cat) => (
            <div 
              key={cat.id} 
              className="category-card glass-card"
              onClick={() => onSelectCategory(cat.id)}
            >
              <div className="cat-image-thumb">
                <img src={cat.img} alt={cat.title} />
                <div className="cat-overlay"></div>
                <div className="cat-icon-badge" style={{ background: cat.bg, color: cat.iconColor }}>
                  {cat.icon}
                </div>
              </div>
              <div className="cat-info">
                <h3>{cat.title}</h3>
                <p>{cat.tagline}</p>
                <span className="cat-link-text">Browse Collection →</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .featured-categories-section {
          padding: 5rem 0;
          background: var(--bg-primary);
        }

        .categories-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2rem;
        }

        .category-card {
          cursor: pointer;
          border-radius: var(--radius-md);
          overflow: hidden;
          background: #FFFFFF;
          border: 1px solid var(--gold-border);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .category-card:hover {
          transform: translateY(-6px);
          box-shadow: var(--shadow-lg);
        }

        .cat-image-thumb {
          position: relative;
          height: 220px;
          overflow: hidden;
        }

        .cat-image-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center center;
          transition: transform 0.6s ease;
        }

        .category-card:hover .cat-image-thumb img {
          transform: scale(1.08);
        }

        .cat-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 40%, rgba(44, 34, 36, 0.4) 100%);
        }

        .cat-icon-badge {
          position: absolute;
          bottom: 1rem;
          right: 1rem;
          width: 46px;
          height: 46px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }

        .cat-info {
          padding: 1.5rem;
        }

        .cat-info h3 {
          font-size: 1.35rem;
          color: var(--text-main);
          margin-bottom: 0.35rem;
        }

        .cat-info p {
          font-size: 0.875rem;
          color: var(--text-muted);
          margin-bottom: 1rem;
        }

        .cat-link-text {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--rose-primary);
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }
      `}</style>
    </section>
  );
};

export default FeaturedCategories;
