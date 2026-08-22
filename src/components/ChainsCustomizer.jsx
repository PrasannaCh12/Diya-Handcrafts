import React, { useState } from 'react';
import { FaHeart, FaRegHeart, FaWhatsapp, FaTimes, FaGem, FaMagic } from 'react-icons/fa';
import { PRODUCTS } from '../data/products';
import WhatsAppModal from './WhatsAppModal';

export const ChainsDetailsModal = ({ product, isOpen, onClose }) => {
  if (!isOpen || !product) return null;

  const handleWhatsAppEnquiry = () => {
    const message = `Hi Divya Handcrafts! I am interested in ordering a customized chain (*${product.name}*). Please share font options and metal finishes!`;
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
            <img src={product.image || '/threadwork_text_banner_1786369075234.jpg'} alt={product.name} className="modal-product-img" />
            <div className="modal-artisan-badge">✨ Anti-Tarnish Laser Engraved</div>
          </div>

          {/* Right Column: Details & Customization Options */}
          <div className="modal-details-col">
            <span className="modal-category-tag">📿 Customized Chains Collection</span>
            <h2 className="modal-product-title">{product.name}</h2>
            <p className="modal-product-short">{product.shortDesc}</p>

            <div className="modal-section-box">
              <h4>📜 Product Description</h4>
              <p>{product.description || 'Precision laser engraved customized chains crafted with anti-tarnish gold polish and hypoallergenic steel.'}</p>
            </div>

            <div className="modal-section-box">
              <h4>✨ Available Metal Finishes</h4>
              <ul className="modal-specs-list">
                <li>• 24k Yellow Gold Polish</li>
                <li>• Blush Rose Gold Finish</li>
                <li>• Pure Sterling Silver Polish</li>
              </ul>
            </div>

            <div className="modal-section-box">
              <h4>📦 Customization Details</h4>
              <ul className="modal-specs-list">
                <li>• Custom Cursive / Block Font Name Engraving</li>
                <li>• Chain Length: 16 inch / 18 inch / 20 inch</li>
                <li>• Gift Box & Velvet Pouch Included</li>
              </ul>
            </div>

            <div className="modal-actions-row" style={{ marginTop: '1.5rem' }}>
              <button onClick={handleWhatsAppEnquiry} className="btn btn-whatsapp-cta" style={{ width: '100%' }}>
                <FaWhatsapp /> Customize Now via WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ChainsCustomizer = () => {
  const [detailsModalProduct, setDetailsModalProduct] = useState(null);
  const [wishlist, setWishlist] = useState({});
  const [waModalOpen, setWaModalOpen] = useState(false);
  const [waText, setWaText] = useState('');

  const chainProducts = PRODUCTS.filter((p) => p.category === 'Customized Chains' && p.image.startsWith('/custom_chain_'));

  const toggleWishlist = (e, id) => {
    e.stopPropagation();
    setWishlist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCustomizeClick = (product) => {
    const text = `Hi Divya Handcrafts! I want to customize *${product.name}* with my required design / name / specifications. Please send options and price details!`;
    setWaText(text);
    setWaModalOpen(true);
  };

  const handleEnquireClick = (product) => {
    const text = `Hi Divya Handcrafts! I would like to enquire about *${product.name}*. Please share availability, pricing and customization options!`;
    setWaText(text);
    setWaModalOpen(true);
  };

  return (
    <section className="chains-section" style={{ padding: '3rem 0 5rem 0', background: '#FAF8F5' }}>
      <div className="container">
        {/* Section Header */}
        <div className="text-center" style={{ maxWidth: '750px', margin: '0 auto 3rem auto' }}>
          <span style={{ color: '#C89B3C', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.85rem' }}>
            📿 Personalized Jewelry Studio
          </span>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', color: '#1C3B2B', marginTop: '0.4rem' }}>
            Customized Chains & Pendants
          </h2>
          <p style={{ color: '#5A4A42', fontSize: '1.05rem', lineHeight: 1.6 }}>
            Explore our handcrafted red coral temple chains, black crystal bead neckpieces, ruby & emerald Kundan chokers, double-layer pearl drops, and gold Lakshmi coin chains.
          </p>
        </div>

        {/* Exact Flavors-Grid Structure copied from Chocolates page */}
        <div className="flavors-grid" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {chainProducts.map((product, idx) => {
            const isWish = wishlist[product.id];
            return (
              <div
                key={product.id}
                className="flavor-card"
                onClick={() => setDetailsModalProduct(product)}
                style={{ animationDelay: `${(idx % 3) * 90 + 250}ms` }}
              >
                <div className="flavor-card-header">
                  <span className="flavor-icon">📿</span>
                  <button
                    className={`wishlist-btn ${isWish ? 'active' : ''}`}
                    onClick={(e) => toggleWishlist(e, product.id)}
                    title="Add to Wishlist"
                    type="button"
                    style={{ position: 'static' }}
                  >
                    {isWish ? <FaHeart className="wish-icon filled" /> : <FaRegHeart className="wish-icon" />}
                  </button>
                </div>

                <div className="flavor-img-wrap">
                  <img src={product.image} alt={`Handcrafted ${product.name} - Diya Handcrafts`} className="flavor-thumb-img" loading="lazy" />
                </div>

                <h4 className="flavor-title">{product.name}</h4>

                <div className="card-actions-dual" style={{ marginTop: '0.8rem' }}>
                  <button type="button" className="btn-card-cart" onClick={(e) => { e.stopPropagation(); handleCustomizeClick(product); }}>
                    <FaMagic /> Customize Now
                  </button>
                  <button type="button" className="btn-card-buynow" onClick={(e) => { e.stopPropagation(); handleEnquireClick(product); }}>
                    <FaWhatsapp /> Enquire Now
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Details Modal */}
      <ChainsDetailsModal
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

      <style>{`
        .flavors-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 1.25rem;
          align-items: start;
        }

        .flavor-card {
          background: #FFFFFF;
          border: 1.5px solid rgba(110, 58, 70, 0.12);
          border-radius: 20px;
          padding: 1.2rem;
          cursor: pointer;
          transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
          display: flex;
          flex-direction: column;
          position: relative;
        }

        .flavor-card:hover {
          border-color: #E8C86A;
          transform: translateY(-6px);
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.12);
        }

        .flavor-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.6rem;
        }

        .flavor-icon {
          font-size: 1.5rem;
        }

        .flavor-img-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 1 / 1.14;
          border-radius: 15px 15px 0 0;
          overflow: hidden;
          background: #FFFDF9;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 0.75rem;
          border: 1px solid rgba(212, 175, 55, 0.2);
          box-sizing: border-box;
        }

        .flavor-thumb-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
          transition: transform 0.5s ease;
        }

        .flavor-card:hover .flavor-thumb-img {
          transform: scale(1.06);
        }

        .flavor-title {
          font-size: 1.1rem;
          font-family: var(--font-serif);
          font-weight: 700;
          color: var(--text-main);
          margin-bottom: 0.3rem;
        }
      `}</style>
    </section>
  );
};

export default ChainsCustomizer;
