import React, { useState } from 'react';
import { FaHeart, FaRegHeart, FaWhatsapp, FaTimes, FaGift, FaStar } from 'react-icons/fa';
import { PRODUCTS } from '../data/products';
import WhatsAppModal from './WhatsAppModal';

export const GiftsDetailsModal = ({ product, isOpen, onClose }) => {
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  const category = '🎁 CUSTOMIZED GIFTS COLLECTION';
  const name = product.name || 'Personalized Keepsake Gift';
  const shortDesc = product.shortDesc || 'Personalized keepsake gifts handcrafted to celebrate birthdays, weddings, anniversaries, and festive occasions.';
  const detailedDesc = product.description || 'Personalized keepsake gifts handcrafted to celebrate birthdays, weddings, anniversaries, and festive occasions.';

  return (
    <div className="modal-backdrop-overlay" onClick={onClose}>
      <div className="product-details-modal-box resin-modal-box gift-modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-icon" onClick={onClose} title="Close Modal (ESC)">
          <FaTimes />
        </button>

        <div className="modal-two-col-grid">
          <div className="modal-image-col">
            <div className="modal-img-wrap">
              <img src={product.image || '/resin_photo_frame.jpg'} alt={name} className="modal-main-img" />
              <div className="modal-img-badge">✨ Handcrafted Personalized Gift</div>
            </div>
          </div>

          <div className="modal-details-col">
            <div className="modal-header-block">
              <span className="modal-category-tag">{category}</span>
              <h2 className="modal-product-title">{name}</h2>
              <p className="modal-short-desc-highlight">{shortDesc}</p>
            </div>

            <div className="modal-body-scroll">
              <div className="modal-section-block">
                <h4>📜 Detailed Description</h4>
                <p className="modal-desc-text">{detailedDesc}</p>
              </div>

              <div className="modal-section-block">
                <h4>✨ Available Personalization</h4>
                <p className="modal-info-p">Custom photo printing, line art engraving, recipient name & special message printing with luxury gift wrapping.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const GiftsCustomizer = () => {
  const [detailsModalProduct, setDetailsModalProduct] = useState(null);
  const [wishlist, setWishlist] = useState({});
  const [waModalOpen, setWaModalOpen] = useState(false);
  const [waText, setWaText] = useState('');

  const giftProducts = PRODUCTS.filter((p) => p.category === 'Customized Gifts');

  const toggleWishlist = (e, id) => {
    e.stopPropagation();
    setWishlist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCustomizeGiftClick = (product) => {
    const text = `Hi Divya Handcrafts! I want to order a customized gift: *${product.name}*. Please send customization options, photo guidelines, and delivery timeline!`;
    setWaText(text);
    setWaModalOpen(true);
  };

  return (
    <section className="gifts-section" style={{ padding: '3rem 0 5rem 0', background: '#FAF8F5' }}>
      <div className="container">
        {/* Section Header */}
        <div className="text-center" style={{ maxWidth: '750px', margin: '0 auto 3rem auto' }}>
          <span style={{ color: '#C89B3C', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.85rem' }}>
            🎁 Artisanal Gifting Atelier
          </span>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', color: '#1C3B2B', marginTop: '0.4rem' }}>
            Customized Gifts Collection
          </h2>
          <p style={{ color: '#5A4A42', fontSize: '1.05rem', lineHeight: 1.6 }}>
            Thoughtfully personalized gifts for birthdays, weddings, anniversaries, housewarmings, and festive occasions. Made with love for your special ones.
          </p>
        </div>

        {/* Product Cards Grid */}
        <div className="gallery-grid">
          {giftProducts.map((product, index) => {
            const isWish = wishlist[product.id];
            return (
              <div key={product.id} className="gallery-card glass-card fade-in-visible" style={{ animationDelay: `${index * 90}ms` }}>
                <div className="gallery-img-wrap" onClick={() => setDetailsModalProduct(product)}>
                  <img src={product.image} alt={`Handcrafted ${product.name} - Diya Handcrafts`} className="gallery-img loaded" loading="lazy" />
                  <div className="card-badge-tag">✨ Personalized</div>
                  <button
                    className={`wishlist-btn ${isWish ? 'active' : ''}`}
                    onClick={(e) => toggleWishlist(e, product.id)}
                    title="Add to Wishlist"
                    type="button"
                  >
                    {isWish ? <FaHeart className="wish-icon filled" /> : <FaRegHeart className="wish-icon" />}
                  </button>
                </div>

                <div className="gallery-card-info">
                  <h4 className="card-item-title" onClick={() => setDetailsModalProduct(product)}>
                    {product.name}
                  </h4>

                  <div className="card-actions-dual" style={{ marginTop: '0.8rem' }}>
                    <button type="button" className="btn-card-cart" onClick={() => setDetailsModalProduct(product)}>
                      View Details
                    </button>
                    <button type="button" className="btn-card-buynow" onClick={() => handleCustomizeGiftClick(product)}>
                      <FaGift /> Customize Your Gift
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Details Modal */}
      <GiftsDetailsModal
        product={detailsModalProduct}
        isOpen={detailsModalProduct !== null}
        onClose={() => setDetailsModalProduct(null)}
      />

      {/* WhatsApp Modal */}
      <WhatsAppModal
        isOpen={waModalOpen}
        onClose={() => setWaModalOpen(false)}
        customText={waText}
      />
    </section>
  );
};

export default GiftsCustomizer;
