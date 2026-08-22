import React, { useState } from 'react';
import { FaHeart, FaRegHeart, FaWhatsapp, FaTimes, FaGift, FaStar } from 'react-icons/fa';
import { PRODUCTS } from '../data/products';
import WhatsAppModal from './WhatsAppModal';

export const GiftsDetailsModal = ({ product, isOpen, onClose }) => {
  if (!isOpen || !product) return null;

  const handleWhatsAppEnquiry = () => {
    const message = `Hi Divya Handcrafts! I am looking to order a customized gift (*${product.name}*). Please share design templates and customization options!`;
    window.open(`https://wa.me/917981664314?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="customizer-modal-overlay" onClick={onClose}>
      <div className="customizer-modal-content glass-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <FaTimes />
        </button>

        <div className="modal-two-col">
          {/* Left Column: Product Image */}
          <div className="modal-img-col">
            <img src={product.image || '/resin_photo_frame.jpg'} alt={product.name} className="modal-product-img" />
            <div className="modal-artisan-badge">✨ Handcrafted Personalized Gift</div>
          </div>

          {/* Right Column: Details & Customization Options */}
          <div className="modal-details-col">
            <span className="modal-category-tag">🎁 Customized Gifts Collection</span>
            <h2 className="modal-product-title">{product.name}</h2>
            <p className="modal-product-short">{product.shortDesc}</p>

            <div className="modal-section-box">
              <h4>📜 Product Details</h4>
              <p>{product.description || 'Personalized keepsake gifts handcrafted to celebrate birthdays, weddings, anniversaries, and festive occasions.'}</p>
            </div>

            <div className="modal-section-box">
              <h4>✨ Available Personalization</h4>
              <ul className="modal-specs-list">
                <li>• Custom photo printing & line art engraving</li>
                <li>• Recipient name & special message printing</li>
                <li>• Luxury gift box wrapping & satin ribbon packaging</li>
              </ul>
            </div>

            <div className="modal-section-box">
              <h4>📦 Suitable Occasions</h4>
              <ul className="modal-specs-list">
                <li>• Birthdays, Anniversaries & Weddings</li>
                <li>• Housewarming, Festivals & Special Celebrations</li>
              </ul>
            </div>

            <div className="modal-actions-row" style={{ marginTop: '1.5rem' }}>
              <button onClick={handleWhatsAppEnquiry} className="btn btn-whatsapp-cta" style={{ width: '100%' }}>
                <FaWhatsapp /> Customize Your Gift via WhatsApp
              </button>
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
