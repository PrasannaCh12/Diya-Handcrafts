import React, { useState, useMemo } from 'react';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { ProductDetailsModal } from './ThreadWorkCustomizer';

const CATEGORY_FALLBACK_IMAGES = {
  'Thread Work': '/bridal_bangle_set.jpg',
  'Resin Art': '/resin_art_category.jpg',
  'Homemade Chocolates': '/kunafa_chocolate.png',
  'Homemade Biscuits': '/ragi_biscuits.jpg'
};

const AnimatedProductCard = ({ product, index, fallbackImg, onOpenDetails }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const cardRef = React.useRef(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const staggerDelay = (index % 6) * 80; // 80ms staggered delay between cards

  return (
    <div
      ref={cardRef}
      className={`gallery-card glass-card ${isVisible ? 'fade-in-visible' : ''}`}
      title={product.name}
      onClick={() => onOpenDetails && onOpenDetails(product)}
      style={{
        animationDelay: `${staggerDelay}ms`,
        cursor: 'pointer'
      }}
    >
      <div className="gallery-img-wrap">
        {!imgLoaded && <div className="skeleton-img-placeholder skeleton-shimmer" />}
        <img 
          src={product.image || fallbackImg} 
          alt={product.name} 
          className={`gallery-img ${imgLoaded ? 'loaded' : 'loading'}`}
          loading="lazy"
          decoding="async"
          onLoad={() => setImgLoaded(true)}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = fallbackImg;
            setImgLoaded(true);
          }}
        />
      </div>
      <div className="gallery-card-info">
        <h4 className="card-item-title">{product.name}</h4>
      </div>
    </div>
  );
};

const ProductCardSkeleton = ({ index }) => (
  <div className="gallery-card glass-card skeleton-card">
    <div className="gallery-img-wrap skeleton-shimmer" />
    <div className="gallery-card-info">
      <div className="skeleton-line skeleton-shimmer" />
      <div className="skeleton-line short skeleton-shimmer" />
    </div>
  </div>
);

const ShopSection = ({ activeCategory, onResetCategory }) => {
  const [selectedCategory, setSelectedCategory] = useState(activeCategory || 'All');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [detailsModalProduct, setDetailsModalProduct] = useState(null);

  // Synchronize when activeCategory prop changes
  React.useEffect(() => {
    if (activeCategory) {
      handleCategoryChange(activeCategory);
    }
  }, [activeCategory]);

  const handleCategoryChange = (cat) => {
    if (cat === selectedCategory) return;
    setIsTransitioning(true);
    setSelectedCategory(cat);
    if (onResetCategory) onResetCategory(cat);
    setTimeout(() => {
      setIsTransitioning(false);
    }, 220);
  };

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
                onClick={() => handleCategoryChange(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Compact Responsive Gallery Grid */}
        {isTransitioning ? (
          <div className="gallery-grid">
            {[1, 2, 3, 4].map((i) => (
              <ProductCardSkeleton key={i} index={i} />
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="no-products-state">
            <h3>No Products Available in this category.</h3>
            <button 
              className="btn btn-outline-gold"
              onClick={() => handleCategoryChange('All')}
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
                  onOpenDetails={(item) => setDetailsModalProduct(item)}
                />
              );
            })}
          </div>
        )}
      </div>

      <ProductDetailsModal
        product={detailsModalProduct}
        isOpen={detailsModalProduct !== null}
        onClose={() => setDetailsModalProduct(null)}
      />

      <style>{`
        .shop-section {
          padding: 2.5rem 0 5rem 0;
          background: #FCFAF7;
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
          margin-bottom: 1rem;
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
          transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
          box-sizing: border-box;
          white-space: nowrap;
          user-select: none;
        }

        .category-pill:hover {
          border-color: #D4AF37;
          color: #3E2C1C;
          background: linear-gradient(135deg, #FFFDF8 0%, #FFF5E6 100%);
          transform: translateY(-2px);
          box-shadow: 0 4px 14px rgba(212, 175, 55, 0.2);
        }

        .category-pill:active {
          transform: scale(0.97);
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
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          column-gap: 24px;
          row-gap: 24px;
          max-width: 1400px;
          margin: 0 auto;
          align-items: stretch;
          min-height: 400px;
        }

        .gallery-card {
          width: 100%;
          max-width: 100%;
          background: #FFFFFF;
          border-radius: 18px;
          overflow: hidden;
          cursor: default;
          border: 1px solid rgba(212, 175, 55, 0.2);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
          display: flex;
          flex-direction: column;
          opacity: 0;
          transform: translateY(24px) scale(0.96);
          will-change: opacity, transform;
          transition: transform 300ms ease, box-shadow 300ms ease, border-color 300ms ease;
          box-sizing: border-box;
        }

        @media (max-width: 992px) {
          .gallery-grid {
            grid-template-columns: repeat(2, 1fr);
            column-gap: 20px;
            row-gap: 20px;
          }
        }

        @media (max-width: 576px) {
          .gallery-grid {
            grid-template-columns: repeat(1, 1fr);
            column-gap: 16px;
            row-gap: 16px;
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

        /* Desktop Only Hover Animation */
        @media (hover: hover) and (pointer: fine) {
          .gallery-card.fade-in-visible:hover {
            transform: translateY(-5px);
            box-shadow: 0 14px 34px rgba(61, 43, 31, 0.10), 0 6px 20px rgba(212, 175, 55, 0.16);
            border-color: rgba(212, 175, 55, 0.45);
          }

          .gallery-card:hover .gallery-img {
            transform: scale(1.03);
          }
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
          aspect-ratio: 4 / 5;
          overflow: hidden;
          background: #FFFDF9;
          border-radius: 18px 18px 0 0;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
        }

        .gallery-img-wrap::after {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, rgba(255, 245, 230, 0.03) 0%, rgba(212, 175, 55, 0.03) 100%);
          pointer-events: none;
          z-index: 2;
          transition: opacity 300ms ease;
        }

        .gallery-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          border-radius: 18px 18px 0 0;
          filter: brightness(1.025) contrast(1.045) saturate(1.035) sepia(0.03);
          will-change: transform;
          backface-visibility: hidden;
          transition: opacity 350ms ease-out, transform 300ms ease, filter 300ms ease;
        }

        .gallery-img.loading {
          opacity: 0;
        }

        .gallery-img.loaded {
          opacity: 1;
        }

        /* Shimmer Loading Skeleton */
        .skeleton-card {
          opacity: 1 !important;
          transform: none !important;
          animation: none !important;
        }

        .skeleton-img-placeholder {
          position: absolute;
          inset: 0;
          z-index: 1;
        }

        .skeleton-shimmer {
          background: linear-gradient(90deg, #FAF4EB 25%, #FFFDF9 50%, #FAF4EB 75%);
          background-size: 200% 100%;
          animation: shimmerSweep 1.5s infinite ease-in-out;
        }

        @keyframes shimmerSweep {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        .skeleton-line {
          height: 16px;
          width: 85%;
          border-radius: 8px;
          margin: 4px auto;
        }

        .skeleton-line.short {
          width: 55%;
        }

        .gallery-card-info {
          padding: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          background: #FFFFFF;
          flex-grow: 1;
          box-sizing: border-box;
        }

        .card-item-title {
          font-family: var(--font-serif);
          font-size: 19.5px;
          font-weight: 600;
          color: var(--text-dark);
          line-height: 1.45;
          letter-spacing: 0.25px;
          height: 2.9em;
          max-height: 2.9em;
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
