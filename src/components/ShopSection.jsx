import React, { useState, useMemo } from 'react';
import { PRODUCTS, CATEGORIES } from '../data/products';

const CATEGORY_FALLBACK_IMAGES = {
  'Thread Work': '/bridal_bangle_set.jpg',
  'Resin Art': '/resin_art_category.jpg',
  'Homemade Chocolates': '/kunafa_chocolate.png',
  'Homemade Biscuits': '/ragi_biscuits.jpg'
};

const AnimatedProductCard = ({ product, index, fallbackImg }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = React.useRef(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Trigger animation once when entering viewport
        }
      },
      { threshold: 0.12 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const staggerDelay = (index % 6) * 100; // 100ms staggered delay between cards

  return (
    <div
      ref={cardRef}
      className={`gallery-card glass-card ${isVisible ? 'fade-in-visible' : ''}`}
      title={product.name}
      style={{
        animationDelay: `${staggerDelay}ms`
      }}
    >
      <div className="gallery-img-wrap">
        <img 
          src={product.image || fallbackImg} 
          alt={product.name} 
          className="gallery-img"
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = fallbackImg;
          }}
        />
      </div>
      <div className="gallery-card-info">
        <h4 className="card-item-title">{product.name}</h4>
      </div>
    </div>
  );
};

const ShopSection = ({ activeCategory, onResetCategory }) => {
  const [selectedCategory, setSelectedCategory] = useState(activeCategory || 'All');

  // Synchronize when activeCategory prop changes
  React.useEffect(() => {
    if (activeCategory) {
      setSelectedCategory(activeCategory);
    }
  }, [activeCategory]);

  const allProducts = Array.isArray(PRODUCTS) ? PRODUCTS : [];
  const allCategories = Array.isArray(CATEGORIES) ? CATEGORIES : ['All'];

  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      return selectedCategory === 'All' || product.category === selectedCategory;
    });
  }, [selectedCategory, allProducts]);

  return (
    <section id="shop" className="shop-section">
      <div className="container">
        {/* Product Categories Pills */}
        <div className="shop-toolbar glass-card">
          <div className="category-pills">
            {allCategories.map((cat) => (
              <button
                key={cat}
                className={`category-pill ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => {
                  setSelectedCategory(cat);
                  if (onResetCategory) onResetCategory(cat);
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Compact Responsive Gallery Grid */}
        {filteredProducts.length === 0 ? (
          <div className="no-products-state">
            <h3>No Products Available in this category.</h3>
            <button 
              className="btn btn-outline-gold"
              onClick={() => { setSelectedCategory('All'); }}
              style={{ marginTop: '1rem' }}
            >
              Show All Creations
            </button>
          </div>
        ) : (
          <div className="gallery-grid">
            {filteredProducts.map((product, index) => {
              const fallbackImg = CATEGORY_FALLBACK_IMAGES[product.category] || '/bridal_bangle_set.jpg';

              return (
                <AnimatedProductCard
                  key={product.id}
                  product={product}
                  index={index}
                  fallbackImg={fallbackImg}
                />
              );
            })}
          </div>
        )}
      </div>

      <style>{`
        .shop-section {
          padding: 2.5rem 0 5rem 0;
          background: var(--bg-secondary);
          position: relative;
        }

        .coming-soon-toast {
          position: fixed;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          background: var(--gold-dark);
          color: #FFFFFF;
          padding: 0.85rem 1.75rem;
          border-radius: var(--radius-full);
          font-weight: 600;
          font-size: 0.9rem;
          box-shadow: var(--shadow-lg);
          z-index: 9999;
          animation: slideUpToast 0.3s ease;
        }

        @keyframes slideUpToast {
          from { opacity: 0; transform: translate(-50%, 20px); }
          to { opacity: 1; transform: translate(-50%, 0); }
        }

        .shop-toolbar {
          padding: 0.5rem 1rem;
          margin-bottom: 0.25rem;
          display: flex;
          justify-content: center;
          border: 1px solid var(--gold-border);
          border-radius: var(--radius-md);
        }

        .category-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          justify-content: center;
          align-items: center;
        }

        .category-pill {
          background: #FFFFFF;
          border: 1px solid rgba(212, 175, 55, 0.3);
          color: #5A4A42;
          height: 44px;
          padding: 0 1.65rem;
          border-radius: 50px;
          font-family: var(--font-sans);
          font-weight: 600;
          font-size: 0.86rem;
          letter-spacing: 0.02em;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          box-sizing: border-box;
          white-space: nowrap;
        }

        .category-pill:hover {
          border-color: #D4AF37;
          color: #3E2C1C;
          background: linear-gradient(135deg, #FFFDF8 0%, #FFF5E6 100%);
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(212, 175, 55, 0.15);
        }

        .category-pill.active {
          background: linear-gradient(135deg, #F6D365 0%, #D4AF37 50%, #C79A2B 100%);
          color: #FFFFFF;
          border-color: transparent;
          box-shadow: 0 4px 16px rgba(212, 175, 55, 0.4);
          transform: translateY(-1px);
        }

        /* Balanced Centered Gallery Grid: 4 cols Desktop, 2 cols Tablet, 1 col Mobile */
        .gallery-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 1.15rem;
        }

        .gallery-card {
          flex: 0 0 calc(25% - 0.87rem);
          max-width: calc(25% - 0.87rem);
          width: 100%;
          background: #FFFFFF;
          border-radius: 15px;
          overflow: hidden;
          cursor: default;
          border: 1.5px solid rgba(212, 175, 55, 0.25);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
          display: flex;
          flex-direction: column;
          opacity: 0;
          transform: translateY(24px) scale(0.96);
          will-change: opacity, transform;
          transition: transform 0.35s ease-out, box-shadow 0.35s ease-out, border-color 0.35s ease-out;
          box-sizing: border-box;
        }

        @media (max-width: 992px) {
          .gallery-grid {
            gap: 1rem;
          }
          .gallery-card {
            flex: 0 0 calc(50% - 0.5rem);
            max-width: calc(50% - 0.5rem);
          }
        }

        @media (max-width: 576px) {
          .gallery-grid {
            gap: 1rem;
          }
          .gallery-card {
            flex: 0 0 100%;
            max-width: 100%;
          }
        }

        .gallery-card.fade-in-visible {
          animation: cardFadeUpZoom 0.6s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }

        @keyframes cardFadeUpZoom {
          from {
            opacity: 0;
            transform: translateY(24px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .gallery-card.fade-in-visible:hover {
          transform: translateY(-6px) scale(1);
          box-shadow: 0 18px 40px rgba(0, 0, 0, 0.15), 0 6px 20px rgba(212, 175, 55, 0.20);
          border-color: var(--gold-primary);
        }

        @media (prefers-reduced-motion: reduce) {
          .gallery-card {
            opacity: 1;
            transform: none;
            animation: none;
          }
        }

        .gallery-img-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 1 / 1.14;
          overflow: hidden;
          background: #FFFDF9;
          border-radius: 15px 15px 0 0;
          box-shadow: inset 0 0 20px rgba(61, 43, 31, 0.08), 0 4px 16px rgba(0, 0, 0, 0.06);
        }

        .gallery-img-wrap::after {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, rgba(255, 245, 230, 0.03) 0%, rgba(212, 175, 55, 0.03) 100%);
          pointer-events: none;
          z-index: 2;
          transition: opacity 0.35s ease;
        }

        .gallery-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          border-radius: 15px 15px 0 0;
          filter: brightness(1.03) contrast(1.05);
          transition: transform 0.35s ease-out, filter 0.35s ease-out;
        }

        .gallery-card-info {
          padding: 15px 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          background: #FFFFFF;
          flex-grow: 1;
        }

        .card-item-title {
          font-family: var(--font-serif);
          font-size: 18px;
          font-weight: 600;
          color: var(--text-dark);
          line-height: 1.5;
          height: 3em;
          margin: 0;
          text-align: center;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .no-products-state {
          text-align: center;
          padding: 4rem 1rem;
          background: #FFFFFF;
          border-radius: var(--radius-md);
        }
      `}</style>
    </section>
  );
};

export default ShopSection;
