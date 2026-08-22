import React, { useState, useMemo } from 'react';
import { FaHeart, FaRegHeart, FaShoppingBag, FaStar, FaBolt } from 'react-icons/fa';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { ProductDetailsModal } from './ThreadWorkCustomizer';
import { ResinArtDetailsModal } from './ResinArtCustomizer';
import { ChocolateDetailsModal } from './ChocolateCustomizer';
import { BiscuitDetailsModal } from './BiscuitCustomizer';
import { WeddingItemsDetailsModal } from './WeddingItemsCustomizer';
import { ChainsDetailsModal } from './ChainsCustomizer';
import { GiftsDetailsModal } from './GiftsCustomizer';

const CATEGORY_FALLBACK_IMAGES = {
  'Thread Work': '/bridal_bangle_set.jpg',
  'Resin Art': '/resin_art_category.jpg',
  'Wedding & Marriage Items': '/bridal_bangle_set.jpg',
  'Customized Chains': '/threadwork_text_banner_1786369075234.jpg',
  'Chocolates': '/kunafa_chocolate.png',
  'Homemade Chocolates': '/kunafa_chocolate.png',
  'Biscuits': '/ragi_biscuits.jpg',
  'Homemade Biscuits': '/ragi_biscuits.jpg',
  'Customized Gifts': '/resin_photo_frame.jpg'
};

const AnimatedProductCard = ({ product, index, fallbackImg, onOpenDetails, onAddToCart }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
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

  const staggerDelay = (index % 6) * 80;

  const handleWishlistToggle = (e) => {
    e.stopPropagation();
    setIsWishlisted((prev) => !prev);
  };

  const handleBuyNow = (e) => {
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(product);
    } else if (onOpenDetails) {
      onOpenDetails(product);
    }
  };

  return (
    <div
      ref={cardRef}
      className={`gallery-card glass-card ${isVisible ? 'fade-in-visible' : ''}`}
      style={{
        animationDelay: `${staggerDelay}ms`
      }}
    >
      {/* Product Image Container with Zoom & Wishlist */}
      <div className="gallery-img-wrap" onClick={() => onOpenDetails && onOpenDetails(product)}>
        {!imgLoaded && <div className="skeleton-img-placeholder skeleton-shimmer" />}
        <img 
          src={product.image || fallbackImg} 
          alt={`Handcrafted ${product.name || 'Artisan Product'} - Diya Handcrafts`} 
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
        
        {/* Top Badges & Wishlist */}
        <div className="card-badge-tag">✨ Handmade</div>
        <button 
          className={`wishlist-btn ${isWishlisted ? 'active' : ''}`} 
          onClick={handleWishlistToggle}
          title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
          type="button"
        >
          {isWishlisted ? <FaHeart className="wish-icon filled" /> : <FaRegHeart className="wish-icon" />}
        </button>
      </div>

      {/* Product Name & Dual Action Buttons ONLY */}
      <div className="gallery-card-info">
        <h4 className="card-item-title" onClick={() => onOpenDetails && onOpenDetails(product)}>
          {product.name}
        </h4>

        {/* Dual Actions: Add to Cart & Buy Now */}
        <div className="card-actions-dual">
          <button 
            type="button"
            className="btn-card-cart"
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart && onAddToCart(product);
            }}
          >
            <FaShoppingBag /> Add to Cart
          </button>
          <button 
            type="button"
            className="btn-card-buynow"
            onClick={handleBuyNow}
          >
            <FaBolt /> Buy Now
          </button>
        </div>
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

const ShopSection = ({ activeCategory, onResetCategory, onAddToCart }) => {
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
      if (selectedCategory === 'All') return true;
      if (selectedCategory === 'Chocolates') {
        return product.category === 'Chocolates' || product.category === 'Homemade Chocolates';
      }
      if (selectedCategory === 'Biscuits') {
        return product.category === 'Biscuits' || product.category === 'Homemade Biscuits';
      }
      return product.category === selectedCategory;
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
          <div className={selectedCategory === 'Customized Chains' ? 'gallery-grid grid-3col' : 'gallery-grid'}>
            {filteredProducts.map((product, index) => {
              const fallbackImg = CATEGORY_FALLBACK_IMAGES[product.category] || '/bridal_bangle_set.jpg';

              return (
                <AnimatedProductCard
                  key={product.id}
                  product={product}
                  index={index}
                  fallbackImg={fallbackImg}
                  onOpenDetails={(item) => setDetailsModalProduct(item)}
                  onAddToCart={onAddToCart}
                />
              );
            })}
          </div>
        )}
      </div>

      {detailsModalProduct?.category === 'Wedding & Marriage Items' || detailsModalProduct?.id?.startsWith('wedding-') ? (
        <WeddingItemsDetailsModal
          product={detailsModalProduct}
          isOpen={detailsModalProduct !== null}
          onClose={() => setDetailsModalProduct(null)}
        />
      ) : detailsModalProduct?.category === 'Customized Chains' || detailsModalProduct?.id?.startsWith('chain-') ? (
        <ChainsDetailsModal
          product={detailsModalProduct}
          isOpen={detailsModalProduct !== null}
          onClose={() => setDetailsModalProduct(null)}
        />
      ) : detailsModalProduct?.category === 'Customized Gifts' || detailsModalProduct?.id?.startsWith('gift-') ? (
        <GiftsDetailsModal
          product={detailsModalProduct}
          isOpen={detailsModalProduct !== null}
          onClose={() => setDetailsModalProduct(null)}
        />
      ) : detailsModalProduct?.category === 'Resin Art' || detailsModalProduct?.id?.startsWith('ra-') || detailsModalProduct?.id?.startsWith('resin-') ? (
        <ResinArtDetailsModal
          product={detailsModalProduct}
          isOpen={detailsModalProduct !== null}
          onClose={() => setDetailsModalProduct(null)}
        />
      ) : detailsModalProduct?.category === 'Chocolates' || detailsModalProduct?.category === 'Homemade Chocolates' || detailsModalProduct?.id?.startsWith('flv-') || detailsModalProduct?.id?.startsWith('chk-') || detailsModalProduct?.id?.startsWith('choco-') ? (
        <ChocolateDetailsModal
          product={detailsModalProduct}
          isOpen={detailsModalProduct !== null}
          onClose={() => setDetailsModalProduct(null)}
        />
      ) : detailsModalProduct?.category === 'Biscuits' || detailsModalProduct?.category === 'Homemade Biscuits' || detailsModalProduct?.id?.startsWith('bsc-') || detailsModalProduct?.id?.startsWith('biscuit-') ? (
        <BiscuitDetailsModal
          product={detailsModalProduct}
          isOpen={detailsModalProduct !== null}
          onClose={() => setDetailsModalProduct(null)}
        />
      ) : (
        <ProductDetailsModal
          product={detailsModalProduct}
          isOpen={detailsModalProduct !== null}
          onClose={() => setDetailsModalProduct(null)}
        />
      )}

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

        .gallery-grid.grid-3col {
          grid-template-columns: repeat(3, 1fr) !important;
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
          aspect-ratio: 1 / 1;
          overflow: hidden;
          background: #FAF8F5;
          border-radius: 18px 18px 0 0;
          box-shadow: 0 4px 14px rgba(27, 59, 43, 0.04);
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
          display: block;
          border-radius: 18px 18px 0 0;
          filter: brightness(1.025) contrast(1.045) saturate(1.035);
          image-rendering: -webkit-optimize-contrast;
          will-change: transform;
          backface-visibility: hidden;
          transition: opacity 350ms ease-out, transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), filter 300ms ease;
        }

        .gallery-card:hover .gallery-img {
          transform: scale(1.08);
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

        .card-badge-tag {
          position: absolute;
          top: 12px;
          left: 12px;
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(4px);
          color: #1C3B2B;
          font-size: 0.72rem;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 50px;
          border: 1px solid rgba(200, 155, 60, 0.3);
          z-index: 5;
          letter-spacing: 0.04em;
        }

        .wishlist-btn {
          position: absolute;
          top: 12px;
          right: 12px;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(4px);
          border: 1px solid rgba(200, 155, 60, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 5;
          color: #7A6962;
          font-size: 14px;
          transition: all 0.25s ease;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
        }

        .wishlist-btn:hover {
          transform: scale(1.12);
          color: #E63946;
          border-color: #E63946;
          background: #FFFFFF;
        }

        .wishlist-btn.active {
          color: #E63946;
          background: #FFF0F2;
          border-color: #E63946;
        }

        .wish-icon.filled {
          color: #E63946;
        }

        .gallery-card-info {
          padding: 16px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: space-between;
          text-align: left;
          background: #FFFFFF;
          flex-grow: 1;
          box-sizing: border-box;
          gap: 0.85rem;
        }

        .card-item-title {
          font-family: var(--font-serif);
          font-size: 1.12rem;
          font-weight: 700;
          color: #1C3B2B;
          line-height: 1.35;
          margin: 0;
          text-align: left;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          cursor: pointer;
          transition: color 0.2s ease;
        }

        .card-item-title:hover {
          color: #C89B3C;
        }

        .card-actions-dual {
          display: flex;
          gap: 0.6rem;
          width: 100%;
          margin-top: 0.2rem;
        }

        .btn-card-cart {
          flex: 1.2;
          height: 42px;
          background: linear-gradient(135deg, #1C3B2B 0%, #2A543E 100%);
          color: #FFFFFF;
          border: none;
          border-radius: 10px;
          font-family: var(--font-sans);
          font-size: 0.82rem;
          font-weight: 700;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          cursor: pointer;
          transition: all 0.25s ease;
          box-shadow: 0 4px 12px rgba(27, 59, 43, 0.15);
        }

        .btn-card-cart:hover {
          background: linear-gradient(135deg, #274F3B 0%, #1C3B2B 100%);
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(27, 59, 43, 0.25);
        }

        .btn-card-buynow {
          flex: 1;
          height: 42px;
          background: linear-gradient(135deg, #C89B3C 0%, #B38428 100%);
          color: #FFFFFF;
          border: none;
          border-radius: 10px;
          font-family: var(--font-sans);
          font-size: 0.82rem;
          font-weight: 700;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.35rem;
          cursor: pointer;
          transition: all 0.25s ease;
          box-shadow: 0 4px 12px rgba(200, 155, 60, 0.2);
        }

        .btn-card-buynow:hover {
          background: linear-gradient(135deg, #D4AF37 0%, #C89B3C 100%);
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(200, 155, 60, 0.35);
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
