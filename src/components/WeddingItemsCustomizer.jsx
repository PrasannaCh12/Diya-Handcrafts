import React, { useState } from 'react';
import { FaHeart, FaRegHeart, FaWhatsapp, FaArrowRight, FaTimes, FaGem, FaGift, FaCheck } from 'react-icons/fa';
import { PRODUCTS } from '../data/products';
import WhatsAppModal from './WhatsAppModal';

export const WeddingItemsDetailsModal = ({ product, isOpen, onClose }) => {
  if (!isOpen || !product) return null;

  const handleWhatsAppEnquiry = () => {
    const message = `Hi Divya Handcrafts! I am interested in inquiring about *${product.name}* for my wedding event. Please share pricing, customization details, and lead time.`;
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
            <img src={product.image || '/bridal_bangle_set.jpg'} alt={product.name} className="modal-product-img" />
            <div className="modal-artisan-badge">✨ 100% Handcrafted Wedding Collection</div>
          </div>

          {/* Right Column: Details & Enquiry */}
          <div className="modal-details-col">
            <span className="modal-category-tag">💒 Wedding & Marriage Collection</span>
            <h2 className="modal-product-title">{product.name}</h2>
            <p className="modal-product-short">{product.shortDesc}</p>

            <div className="modal-section-box">
              <h4>📜 Detailed Product Description</h4>
              <p>{product.description || 'Intricately handcrafted wedding accessories designed to make your marriage ceremonies memorable.'}</p>
            </div>

            <div className="modal-section-box">
              <h4>✨ Craftsmanship & Materials</h4>
              <p>{product.materials || 'Handmade Velvet, Kundan Stones, Zardosi Trim, Pearl Accents'}</p>
            </div>

            <div className="modal-section-box">
              <h4>📦 Customization & Event Options</h4>
              <ul className="modal-specs-list">
                <li>• Customized to match your wedding lehenga or saree theme</li>
                <li>• Bride & Groom initials engraving available</li>
                <li>• Express Pan-India dispatch for wedding dates</li>
              </ul>
            </div>

            <div className="modal-actions-row" style={{ marginTop: '1.5rem' }}>
              <button onClick={handleWhatsAppEnquiry} className="btn btn-whatsapp-cta" style={{ width: '100%' }}>
                <FaWhatsapp /> Enquire Now via WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const WeddingItemsCustomizer = () => {
  const [detailsModalProduct, setDetailsModalProduct] = useState(null);
  const [wishlist, setWishlist] = useState({});
  const [waModalOpen, setWaModalOpen] = useState(false);
  const [waText, setWaText] = useState('');

  const weddingProducts = PRODUCTS.filter((p) => p.category === 'Wedding & Marriage Items');

  const toggleWishlist = (e, id) => {
    e.stopPropagation();
    setWishlist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleEnquireClick = (product) => {
    const text = `Hi Divya Handcrafts! I want to enquire about *${product.name}* for an upcoming wedding. Please share customization options and availability!`;
    setWaText(text);
    setWaModalOpen(true);
  };

  return (
    <section className="wedding-items-section" style={{ padding: '3rem 0 5rem 0', background: '#FAF8F5' }}>
      <div className="container">
        {/* Section Header */}
        <div className="text-center" style={{ maxWidth: '750px', margin: '0 auto 3rem auto' }}>
          <span style={{ color: '#C89B3C', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.85rem' }}>
            💒 Royal Bridal Atelier
          </span>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', color: '#1C3B2B', marginTop: '0.4rem' }}>
            Wedding & Marriage Collection
          </h2>
          <p style={{ color: '#5A4A42', fontSize: '1.05rem', lineHeight: 1.6 }}>
            Explore handcrafted bridal accessories, marriage trousseau trays, traditional decorated coconuts, varmala preserved resin plaques, and custom wedding favors.
          </p>
        </div>

        {/* Product Cards Grid */}
        <div className="gallery-grid">
          {weddingProducts.map((product, index) => {
            const isWish = wishlist[product.id];
            return (
              <div key={product.id} className="gallery-card glass-card fade-in-visible" style={{ animationDelay: `${index * 90}ms` }}>
                <div className="gallery-img-wrap" onClick={() => setDetailsModalProduct(product)}>
                  <img src={product.image} alt={`Handcrafted ${product.name} - Diya Handcrafts`} className="gallery-img loaded" loading="lazy" />
                  <div className="card-badge-tag">✨ Bridal Special</div>
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
                    <button type="button" className="btn-card-buynow" onClick={() => handleEnquireClick(product)}>
                      <FaWhatsapp /> Enquire Now
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Details Modal */}
      <WeddingItemsDetailsModal
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

export default WeddingItemsCustomizer;
