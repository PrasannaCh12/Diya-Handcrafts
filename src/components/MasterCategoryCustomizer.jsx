import React, { useState, useEffect } from 'react';
import { FaWhatsapp, FaCheck, FaHeart, FaRegHeart, FaStar, FaMagic, FaGift, FaEdit, FaRibbon, FaCalendarAlt, FaUser, FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaFileAlt, FaTimes } from 'react-icons/fa';
import WhatsAppModal from './WhatsAppModal';

export const MasterDetailsModal = ({ product, isOpen, onClose, hidePrices = true, hideWhatsApp = false, hideExtraOptions = false, onAddToCart }) => {
  const [customName, setCustomName] = useState('');
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [photoPreviewUrl, setPhotoPreviewUrl] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
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

  const category = product?.category || 'HANDMADE COLLECTION';
  const name = product?.name || 'Handcrafted Product';
  const shortDesc = product?.shortDesc || product?.desc || 'Luxury handcrafted product made with high quality materials.';
  const detailedDesc = product?.detailedDesc || product?.description || 'Artisanal product crafted with attention to detail and traditional heritage skills.';
  const ingredients = product?.ingredients || product?.materials;
  const rating = product?.rating || 5.0;
  const reviewsCount = product?.reviewsCount || 58;
  const price = product?.price;
  const availability = product?.availability || 'In Stock (Made to Order)';

  const handlePhotoSelect = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setSelectedPhoto(file);
      setPhotoPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleWhatsAppClick = () => {
    const randomDigits = Math.floor(100000 + Math.random() * 900000);
    const orderId = `DH-${randomDigits}`;
    const productImgUrl = window.location.origin + (product?.image || '');

    let msg = `NEW ORDER – DIYA HANDCRAFTS\n\n`;
    msg += `Product:\n${name}\n\n`;
    msg += `Quantity:\n${quantity}\n\n`;
    msg += `Custom Name / Title:\n${customName || 'Handcrafted Order'}\n\n`;
    msg += `Customization:\n${shortDesc || 'Personalized order'}\n\n`;
    if (product?.image) {
      msg += `PRODUCT IMAGE:\n${productImgUrl}\n\n`;
    }
    if (selectedPhoto) {
      msg += `CUSTOMER CUSTOMIZATION PHOTO:\n[Attached: ${selectedPhoto.name}]\n\n`;
    }
    msg += `Order ID:\n${orderId}`;

    window.open(`https://wa.me/917981664314?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const handleBuyNow = () => {
    handleWhatsAppClick();
  };

  const boxSizes = Array.isArray(product.boxSizes) 
    ? product.boxSizes 
    : product.packSizes || ['Standard Size', 'Grand Display'];

  return (
    <div className="modal-backdrop-overlay" onClick={onClose}>
      <div className="product-details-modal-box master-modal-box" onClick={(e) => e.stopPropagation()}>
        {/* Circular Close (X) Icon Button */}
        <button className="modal-close-icon" onClick={onClose} title="Close Modal (ESC)">
          <FaTimes />
        </button>

        <div className="modal-two-col-grid">
          {/* Left Column: Single Full-Bleed Product Image Panel */}
          <div className="modal-image-col product-image-panel">
            <img src={product.image} alt={name} className="modal-main-img" />
            <div className="modal-img-badge">✨ 100% Handmade Atelier</div>
          </div>

          {/* Right Column: Detailed Product Information */}
          <div className="modal-details-col">
            <div className="modal-header-block">
              <div className="modal-top-tags-row">
                <span className="modal-category-tag">{category}</span>
                <span className="modal-availability-badge">🟢 {availability}</span>
              </div>

              <h2 className="modal-product-title">{name}</h2>

              {/* Rating & Price Row */}
              <div className="modal-rating-price-row">
                <div className="modal-rating-badge">
                  <FaStar color="#F59E0B" />
                  <span className="m-rating-val">{rating}</span>
                  <span className="m-reviews-val">({reviewsCount} Reviews)</span>
                </div>

                {!hidePrices && price && (
                  <div className="modal-price-val">
                    ₹{price}
                  </div>
                )}
              </div>

              <p className="modal-short-desc-highlight">{shortDesc}</p>
            </div>

            <div className="modal-body-scroll">
              {/* 📜 Detailed Description */}
              <div className="modal-section-block">
                <h4>📜 Detailed Description</h4>
                <p className="modal-desc-text" style={{ whiteSpace: 'pre-line' }}>{detailedDesc}</p>
              </div>

              {/* Perfect For if present */}
              {product.perfectFor && (
                <div className="modal-section-block">
                  <h4>🎁 Perfect For</h4>
                  <div className="modal-chips-flex">
                    {product.perfectFor.map((item, i) => (
                      <span key={i} className="modal-chip-item gold-chip">✨ {item}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Customization Details Input Fields */}
              {!hideExtraOptions && (
                <div className="modal-section-block custom-inputs-box">
                  <h4>🎨 Product Customization Details</h4>

                  <div className="modal-input-field">
                    <label className="m-input-label">Custom Name / Title Inlay *</label>
                    <input
                      type="text"
                      className="m-text-input"
                      placeholder="e.g. Happy Birthday Akhil / Custom Name"
                      value={customName}
                      onChange={(e) => setCustomName(e.target.value)}
                    />
                  </div>

                  <div className="modal-input-field" style={{ marginTop: '0.85rem' }}>
                    <label className="m-input-label">Upload Personal Photographs *</label>
                    <input
                      type="file"
                      accept="image/*"
                      className="m-file-input"
                      onChange={handlePhotoSelect}
                    />
                    {photoPreviewUrl && (
                      <div className="photo-preview-thumbnail-box" style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '12px', background: '#FFF', padding: '8px', borderRadius: '10px', border: '1px solid #E8C86A' }}>
                        <img src={photoPreviewUrl} alt="Customer Upload Preview" style={{ width: '54px', height: '54px', objectFit: 'cover', borderRadius: '8px' }} />
                        <div>
                          <span className="file-selected-name" style={{ margin: 0, fontWeight: 700 }}>✓ Photo Selected</span>
                          <span style={{ fontSize: '0.75rem', color: '#7A6965', display: 'block' }}>{selectedPhoto?.name}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Product Features List */}
              {product.features && (
                <div className="modal-section-block">
                  <h4>⭐ Product Features</h4>
                  <ul className="modal-features-list">
                    {product.features.map((feat, i) => (
                      <li key={i}>• {feat}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Materials & Processing */}
              {!hideExtraOptions && ingredients && (
                <div className="modal-section-block">
                  <h4>✨ Materials & Craftsmanship</h4>
                  <p className="modal-info-p">{ingredients}</p>
                </div>
              )}

              {/* Quantity & Interactive Action Buttons */}
              <div className="modal-actions-wrapper">
                <div className="qty-picker-row">
                  <span className="qty-label">Quantity:</span>
                  <div className="qty-stepper">
                    <button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                    <span className="qty-val">{quantity}</span>
                    <button type="button" onClick={() => setQuantity(quantity + 1)}>+</button>
                  </div>

                  <button
                    type="button"
                    className={`modal-wishlist-btn ${isWishlisted ? 'active' : ''}`}
                    onClick={() => setIsWishlisted(!isWishlisted)}
                  >
                    <FaHeart color={isWishlisted ? '#E63946' : '#A38087'} /> Wishlist
                  </button>
                </div>

                <div className="modal-buttons-grid">
                  {onAddToCart && (
                    <button
                      type="button"
                      className="btn-modal-cart"
                      onClick={() => onAddToCart({ ...product, quantity, customName })}
                    >
                      🛒 Add to Cart
                    </button>
                  )}

                  <button type="button" className="btn-modal-buynow" onClick={handleBuyNow}>
                    ⚡ Buy Now
                  </button>

                  {!hideWhatsApp && (
                    <button type="button" className="btn-modal-wa" onClick={handleWhatsAppClick}>
                      <FaWhatsapp /> WhatsApp Enquiry
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MasterCategoryCustomizer = ({
  subtitle = "✨ HANDMADE ATELIER",
  title = "Handcrafted Collection",
  description = "Explore our handcrafted premium collection crafted with love and attention to detail.",
  products = [],
  hidePrices = false,
  hideWhatsAppInModal = false,
  hideOptionsInModal = false,
  onSelectProduct,
  onAddToCart
}) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [wishlistIds, setWishlistIds] = useState([]);

  const toggleWishlist = (id) => {
    setWishlistIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };
  const [boxSize, setBoxSize] = useState('');
  const [packagingStyle, setPackagingStyle] = useState('');
  const [ribbonColor, setRibbonColor] = useState('');
  const [occasion, setOccasion] = useState('');
  
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerWhatsApp, setCustomerWhatsApp] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');

  const [recipientName, setRecipientName] = useState('');
  const [recipientPhone, setRecipientPhone] = useState('');

  const [deliveryDate, setDeliveryDate] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');

  const [orderNotes, setOrderNotes] = useState('');

  const [waModalOpen, setWaModalOpen] = useState(false);
  const [waOrderText, setWaOrderText] = useState('');

  const [detailsModalProduct, setDetailsModalProduct] = useState(null);

  const toggleSelect = (product) => {
    setSelectedItems((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) {
        return prev.filter((item) => item.id !== product.id);
      } else {
        return [...prev, product];
      }
    });

    if (onSelectProduct) {
      onSelectProduct(product);
    }
  };

  const handleWhatsAppSend = (e) => {
    if (e) e.preventDefault();

    if (selectedItems.length === 0) {
      alert('Please select at least one product card above.');
      return;
    }

    const randomDigits = Math.floor(100000 + Math.random() * 900000);
    const orderId = `DH-${randomDigits}`;

    let text = `NEW ORDER – DIYA HANDCRAFTS\n\n`;
    text += `Product:\n`;
    selectedItems.forEach((item, idx) => {
      text += `${item.name}${idx < selectedItems.length - 1 ? ', ' : ''}`;
    });
    text += `\n\nQuantity:\n${selectedItems.length}\n\n`;
    text += `Custom Name / Title:\n${customerName || title}\n\n`;
    let customDesc = [];
    if (boxSize) customDesc.push(`Size: ${boxSize}`);
    if (packagingStyle) customDesc.push(`Packaging: ${packagingStyle}`);
    if (occasion && occasion !== 'None') customDesc.push(`Occasion: ${occasion}`);
    if (orderNotes) customDesc.push(`Notes: ${orderNotes}`);
    text += `Customization:\n${customDesc.length > 0 ? customDesc.join(', ') : 'Custom Handcrafted Order'}\n\n`;
    text += `Order ID:\n${orderId}`;

    setWaOrderText(text);
    setWaModalOpen(true);
  };

  return (
    <section className="customizer-section section-padding">
      <div className="container">
        {/* Hero Header */}
        <div className="hero-header-wrap">
          <div className="tw-hero-subtitle">{subtitle}</div>
          <h2 className="tw-hero-title">{title}</h2>
          <p className="tw-hero-description">{description}</p>

          <div className="tw-hero-divider">
            <span className="divider-line left-line"></span>
            <span className="divider-motif">🪷</span>
            <span className="divider-line right-line"></span>
          </div>

          <div className="tw-brand-tagline">
            <span className="quote-mark">“</span>Made With Love, Made For You.<span className="quote-mark">”</span>
          </div>
        </div>

        {/* Main 2-Column Grid */}
        <div className="customizer-main-grid">
          {/* Left Column: Product Cards */}
          <div className="customizer-left-panel">
            <div className="flavor-header-row">
              <h3>🛍️ Step 1: Select Your Handcrafted Items</h3>
              <span className="selected-count-badge">
                {selectedItems.length} Selected
              </span>
            </div>

            <div className="flavors-grid">
              {products.map((product, idx) => {
                const isSelected = selectedItems.some((item) => item.id === product.id);
                const isWishlisted = wishlistIds.includes(product.id);
                const rating = product.rating || 4.9;
                const reviews = product.reviewsCount || 35 + (idx % 25);

                return (
                  <div
                    key={product.id || idx}
                    className={`flavor-card ${isSelected ? 'selected' : ''}`}
                    onClick={() => toggleSelect(product)}
                    style={{ animationDelay: `${(idx % 3) * 90 + 250}ms` }}
                  >
                    <div className="flavor-card-header">
                      <span className="flavor-icon">{product.icon || '✨'}</span>
                      <div className="card-top-actions">
                        <button
                          type="button"
                          className={`wishlist-heart-btn ${isWishlisted ? 'active' : ''}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleWishlist(product.id);
                          }}
                          title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                        >
                          {isWishlisted ? <FaHeart color="#E63946" /> : <FaRegHeart />}
                        </button>
                        <div className={`check-badge ${isSelected ? 'checked' : ''}`}>
                          <FaCheck />
                        </div>
                      </div>
                    </div>

                    <div className="flavor-img-wrap">
                      <img src={product.image} alt={`Handcrafted ${product.name} - Diya Handcrafts`} className="flavor-thumb-img" loading="lazy" />
                    </div>

                    <h4 className="flavor-title">{product.name}</h4>

                    {/* Rating & Review count */}
                    <div className="card-rating-row">
                      <span className="star-icon"><FaStar /></span>
                      <span className="rating-num">{rating}</span>
                      <span className="reviews-count">({reviews})</span>
                    </div>

                    {/* Price if available */}
                    {!hidePrices && product.price && (
                      <div className="card-price-tag">
                        ₹{product.price}
                      </div>
                    )}

                    <div className="card-bottom-actions-flex">
                      <div 
                        className="card-view-details-link"
                        onClick={(e) => {
                          e.stopPropagation();
                          setDetailsModalProduct(product);
                        }}
                      >
                        <span>View Details <span className="view-arrow">→</span></span>
                      </div>

                      {onAddToCart && (
                        <button
                          type="button"
                          className="btn-card-add-cart"
                          onClick={(e) => {
                            e.stopPropagation();
                            onAddToCart(product);
                          }}
                          title="Add to Cart"
                        >
                          🛒 Add
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Sticky Order Summary */}
          <div className="customizer-right-panel">
            <div className="summary-sticky-card glass-card">
              <h3 className="summary-title">📋 Order Summary</h3>

              <div className="summary-box-block">
                <div className="summary-block-title">Selected Items:</div>
                {selectedItems.length === 0 ? (
                  <div className="empty-selection-msg">No items selected (Click a card above)</div>
                ) : (
                  <div className="selected-flavors-chips">
                    {selectedItems.map((item) => (
                      <span key={item.id} className="selected-flavor-chip">
                        {item.name}
                        <button
                          type="button"
                          className="remove-chip-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleSelect(item);
                          }}
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Customer Contact Box */}
              <div className="summary-box-block" style={{ marginTop: '1.25rem' }}>
                <div className="summary-block-title">Customer Contact:</div>
                {customerName || customerPhone ? (
                  <div className="summary-user-text">
                    {customerName && <div><strong>Name:</strong> {customerName}</div>}
                    {customerPhone && <div><strong>Phone:</strong> {customerPhone}</div>}
                  </div>
                ) : (
                  <div className="empty-selection-msg">Name & Phone (Enter details in step 4)</div>
                )}
              </div>

              {/* WhatsApp Checkout Button */}
              <button
                type="button"
                className="btn-whatsapp-checkout"
                onClick={handleWhatsAppSend}
                disabled={selectedItems.length === 0}
                style={{
                  opacity: selectedItems.length === 0 ? 0.6 : 1,
                  cursor: selectedItems.length === 0 ? 'not-allowed' : 'pointer',
                  marginTop: '1.5rem'
                }}
              >
                <FaWhatsapp className="wa-icon" /> Order via WhatsApp
              </button>

              <div className="tagline-footer">
                ✨ Made With Love, Made For You
              </div>
            </div>
          </div>
        </div>
      </div>

      <WhatsAppModal
        isOpen={waModalOpen}
        onClose={() => setWaModalOpen(false)}
        messageText={waOrderText}
      />

      <MasterDetailsModal
        product={detailsModalProduct}
        isOpen={detailsModalProduct !== null}
        onClose={() => setDetailsModalProduct(null)}
        hidePrices={hidePrices}
        hideWhatsApp={hideWhatsAppInModal}
        hideExtraOptions={hideOptionsInModal}
      />

      <style>{`
        @keyframes heroFadeUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .customizer-section {
          background: #FAF8F5;
          padding: 3rem 0 5rem 0;
        }

        .hero-header-wrap {
          max-width: 960px;
          margin: 0 auto 3rem auto;
          text-align: center;
        }

        .tw-hero-subtitle {
          font-family: var(--font-sans);
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          color: #C89B3C;
          text-transform: uppercase;
          margin-bottom: 28px;
          opacity: 0;
          animation: heroFadeUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.1s forwards;
        }

        .tw-hero-title {
          font-family: var(--font-serif);
          font-size: 52px;
          font-weight: 700;
          color: #2D2523;
          line-height: 1.2;
          letter-spacing: 0.02em;
          margin: 0 0 35px 0;
          opacity: 0;
          animation: heroFadeUp 0.65s cubic-bezier(0.22, 1, 0.36, 1) 0.2s forwards;
        }

        @media (max-width: 768px) {
          .tw-hero-title {
            font-size: 34px;
          }
        }

        .tw-hero-description {
          font-family: var(--font-sans);
          font-size: 20px;
          line-height: 1.8;
          color: rgba(45, 37, 35, 0.88);
          max-width: 750px;
          margin: 0 auto 50px auto;
          opacity: 0;
          animation: heroFadeUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.3s forwards;
        }

        .tw-hero-divider {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          margin: 50px auto 50px auto;
          opacity: 0;
          animation: heroFadeUp 0.75s cubic-bezier(0.22, 1, 0.36, 1) 0.35s forwards;
        }

        .divider-line {
          height: 1.5px;
          width: 100px;
          display: block;
        }

        .divider-line.left-line {
          background: linear-gradient(90deg, rgba(200, 155, 60, 0) 0%, rgba(200, 155, 60, 0.75) 100%);
        }

        .divider-line.right-line {
          background: linear-gradient(90deg, rgba(200, 155, 60, 0.75) 0%, rgba(200, 155, 60, 0) 100%);
        }

        .divider-motif {
          font-size: 26px;
          color: #C89B3C;
        }

        .tw-brand-tagline {
          font-family: var(--font-serif);
          font-style: italic;
          font-size: 22px;
          font-weight: 500;
          color: rgba(45, 37, 35, 0.94);
          text-align: center;
          margin-top: 50px;
          margin-bottom: 55px;
          opacity: 0.92;
          animation: heroFadeUp 0.75s cubic-bezier(0.22, 1, 0.36, 1) 0.4s forwards;
        }

        .tw-brand-tagline .quote-mark {
          color: #C89B3C;
        }

        .customizer-main-grid {
          display: grid;
          grid-template-columns: 1.35fr 0.65fr;
          gap: 2.5rem;
          align-items: start;
        }

        .flavor-header-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.25rem;
        }

        .flavor-header-row h3 {
          font-size: 1.5rem;
          color: var(--text-main);
        }

        .selected-count-badge {
          background: var(--gold-soft-gradient);
          color: var(--gold-dark);
          border: 1px solid var(--gold-border);
          padding: 0.35rem 0.85rem;
          border-radius: var(--radius-full);
          font-size: 0.8rem;
          font-weight: 700;
        }

        .flavors-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
          align-items: start;
        }

        @keyframes twCardFadeUp {
          0% {
            opacity: 0;
            transform: translateY(22px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
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
          opacity: 0;
          animation: twCardFadeUp 0.55s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .flavor-card:hover {
          border-color: #E8C86A;
          transform: translateY(-6px);
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.12);
        }

        .flavor-card.selected {
          background: #FFFDF9;
          border-color: #E8C86A;
          box-shadow: 0 8px 24px rgba(212, 175, 55, 0.25);
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

        .card-top-actions {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .wishlist-heart-btn {
          background: #FFFDF9;
          border: 1px solid rgba(110, 58, 70, 0.15);
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
          color: #A38087;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .wishlist-heart-btn:hover {
          transform: scale(1.12);
          border-color: #E63946;
          color: #E63946;
        }

        .check-badge {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          border: 1px solid #DDD;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.65rem;
          color: transparent;
          transition: all 0.25s ease;
        }

        .check-badge.checked {
          background: #E8C86A;
          border-color: #E8C86A;
          color: #FFFFFF;
          box-shadow: 0 0 10px rgba(232, 200, 106, 0.6);
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

        .card-rating-row {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          font-size: 0.8rem;
          margin-bottom: 0.25rem;
        }

        .star-icon {
          color: #F59E0B;
          display: flex;
          align-items: center;
        }

        .rating-num {
          font-weight: 700;
          color: #2D2523;
        }

        .reviews-count {
          color: #8C7A77;
        }

        .card-price-tag {
          font-family: var(--font-sans);
          font-weight: 700;
          font-size: 1rem;
          color: #C89B3C;
          margin-bottom: 0.35rem;
        }

        .card-bottom-actions-flex {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 0.4rem;
          gap: 0.5rem;
        }

        .btn-card-add-cart {
          background: #FFFDF9;
          border: 1px solid #C89B3C;
          color: #7A5C1B;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.25rem 0.65rem;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-card-add-cart:hover {
          background: #C89B3C;
          color: #FFFFFF;
          box-shadow: 0 2px 8px rgba(200, 155, 60, 0.3);
        }

        .flavor-title {
          font-size: 1.1rem;
          font-family: var(--font-serif);
          font-weight: 700;
          color: var(--text-main);
          margin-bottom: 0.3rem;
        }

        .card-view-details-link {
          font-size: 0.85rem;
          color: #C89B3C;
          font-weight: 600;
          margin-top: 0.4rem;
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          transition: color 0.25s ease;
          user-select: none;
        }

        .card-view-details-link .view-arrow {
          display: inline-block;
          transition: transform 0.25s ease;
        }

        .flavor-card:hover .card-view-details-link {
          color: #B8860B;
        }

        .flavor-card:hover .card-view-details-link .view-arrow {
          transform: translateX(4px);
        }

        .summary-sticky-card {
          position: sticky;
          top: 100px;
          background: #FFFDF9;
          border: 1px solid var(--gold-border);
          border-radius: var(--radius-lg);
          padding: 1.75rem;
          box-shadow: var(--shadow-gold);
        }

        .summary-title {
          font-size: 1.4rem;
          color: var(--text-main);
          margin-bottom: 1.25rem;
          border-bottom: 1px solid var(--gold-border);
          padding-bottom: 0.75rem;
        }

        .summary-block-title {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.5rem;
        }

        .empty-selection-msg {
          font-size: 0.85rem;
          color: var(--text-light);
          font-style: italic;
        }

        .selected-flavors-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
        }

        .selected-flavor-chip {
          background: var(--gold-soft-gradient);
          color: var(--gold-dark);
          border: 1px solid var(--gold-border);
          padding: 0.25rem 0.6rem;
          border-radius: var(--radius-full);
          font-size: 0.8rem;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
        }

        .remove-chip-btn {
          background: none;
          border: none;
          color: var(--gold-dark);
          font-size: 1rem;
          cursor: pointer;
          padding: 0 0.1rem;
          line-height: 1;
        }

        .btn-whatsapp-checkout {
          width: 100%;
          padding: 0.85rem 1.5rem;
          background: #25D366;
          color: #FFFFFF;
          border: none;
          border-radius: var(--radius-full);
          font-size: 1rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          box-shadow: 0 4px 15px rgba(37, 211, 102, 0.3);
          transition: var(--transition-smooth);
        }

        .btn-whatsapp-checkout:hover:not(:disabled) {
          background: #1DA851;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(37, 211, 102, 0.4);
        }

        .tagline-footer {
          text-align: center;
          margin-top: 1.25rem;
          font-size: 0.8rem;
          color: var(--gold-dark);
          font-weight: 600;
          font-style: italic;
        }

        @media (max-width: 992px) {
          .customizer-main-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 576px) {
          .flavors-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 0.85rem !important;
          }
          .flavor-card {
            padding: 0.85rem !important;
            border-radius: 14px !important;
          }
          .flavor-title {
            font-size: 0.9rem !important;
          }
        }

        /* Modal Styles */
        .modal-backdrop-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.68);
          backdrop-filter: blur(6px);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          box-sizing: border-box;
        }

        .product-details-modal-box {
          background: #FFFFFF;
          border-radius: 24px;
          border: 1px solid rgba(212, 175, 55, 0.25);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.18);
          width: 100%;
          max-width: 1020px;
          height: 92vh;
          max-height: 92vh;
          position: relative;
          overflow: hidden;
          animation: modalFadeScale 0.3s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          display: flex;
          flex-direction: column;
        }

        @keyframes modalFadeScale {
          from {
            opacity: 0;
            transform: scale(0.94) translateY(14px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .modal-close-icon {
          position: absolute;
          top: 16px;
          right: 16px;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.95);
          border: 1px solid rgba(212, 175, 55, 0.3);
          color: #2D2523;
          font-size: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 30;
          transition: all 0.25s ease;
        }

        .modal-close-icon:hover {
          background: #C89B3C;
          color: #FFFFFF;
        }

        .modal-two-col-grid {
          display: grid;
          grid-template-columns: 50% 50%;
          height: 100%;
          overflow: hidden;
        }

        .modal-image-col,
        .product-image-panel {
          position: relative;
          width: 50%;
          height: 100%;
          min-height: 100%;
          background: #FAF8F5;
          border-right: 1px solid rgba(212, 175, 55, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          padding: 0 !important;
          margin: 0 !important;
          box-sizing: border-box;
        }

        .modal-main-img,
        .product-image-panel img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
          padding: 0 !important;
          margin: 0 !important;
          border: none !important;
          border-radius: 0 !important;
          box-shadow: none !important;
          transition: transform 0.4s ease;
        }

        .modal-main-img:hover,
        .product-image-panel img:hover {
          transform: scale(1.02);
        }

        .modal-img-badge {
          position: absolute;
          bottom: 20px;
          left: 20px;
          background: rgba(255, 255, 255, 0.94);
          backdrop-filter: blur(4px);
          color: #2D2523;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 6px 14px;
          border-radius: 50px;
          border: 1px solid rgba(212, 175, 55, 0.3);
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          z-index: 10;
        }

        .modal-details-col {
          padding: 28px 24px;
          display: flex;
          flex-direction: column;
          overflow-y: auto;
        }

        .modal-category-tag {
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          color: #C89B3C;
          text-transform: uppercase;
        }

        .modal-product-title {
          font-family: var(--font-serif);
          font-size: 2rem;
          font-weight: 700;
          color: #2D2523;
          margin: 4px 0 8px 0;
        }

        .modal-short-desc-highlight {
          font-size: 0.95rem;
          color: #6E5752;
          line-height: 1.5;
          margin-bottom: 16px;
        }

        .modal-body-scroll {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .modal-section-block h4 {
          font-size: 0.9rem;
          font-weight: 700;
          color: #2D2523;
          margin-bottom: 6px;
        }

        .modal-desc-text, .modal-info-p {
          font-size: 0.88rem;
          color: #5A4A42;
          line-height: 1.6;
        }

        .modal-chips-flex {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .modal-chip-item {
          background: #FAF5EA;
          border: 1px solid rgba(212, 175, 55, 0.3);
          color: #7A5C1B;
          font-size: 0.8rem;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 50px;
        }

        .modal-top-tags-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.4rem;
        }

        .modal-availability-badge {
          font-size: 0.75rem;
          font-weight: 700;
          color: #15803D;
          background: #DCFCE7;
          padding: 2px 10px;
          border-radius: 50px;
        }

        .modal-rating-price-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.75rem;
        }

        .modal-rating-badge {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.85rem;
        }

        .m-rating-val {
          font-weight: 700;
          color: #2D2523;
        }

        .m-reviews-val {
          color: #7A6965;
        }

        .modal-price-val {
          font-family: var(--font-sans);
          font-size: 1.4rem;
          font-weight: 700;
          color: #C89B3C;
        }

        .custom-inputs-box {
          background: #FFFDF9;
          border: 1.5px solid rgba(200, 155, 60, 0.25);
          padding: 14px 16px;
          border-radius: 14px;
        }

        .m-input-label {
          display: block;
          font-size: 0.82rem;
          font-weight: 700;
          color: #2D2523;
          margin-bottom: 4px;
        }

        .m-text-input {
          width: 100%;
          padding: 8px 12px;
          border: 1px solid #D4C5B9;
          border-radius: 8px;
          font-size: 0.88rem;
          background: #FFFFFF;
          box-sizing: border-box;
        }

        .m-file-input {
          width: 100%;
          font-size: 0.82rem;
        }

        .file-selected-name {
          display: block;
          font-size: 0.78rem;
          color: #15803D;
          font-weight: 600;
          margin-top: 4px;
        }

        .modal-features-list {
          list-style: none;
          padding: 0;
          margin: 0;
          font-size: 0.86rem;
          color: #5A4A42;
          line-height: 1.6;
        }

        .gold-chip {
          background: #FEF08A !important;
          color: #854D0E !important;
          border-color: #FDE047 !important;
        }

        .modal-actions-wrapper {
          margin-top: 1.25rem;
          border-top: 1px solid rgba(212, 175, 55, 0.2);
          padding-top: 1rem;
        }

        .qty-picker-row {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 0.85rem;
        }

        .qty-label {
          font-size: 0.85rem;
          font-weight: 700;
          color: #2D2523;
        }

        .qty-stepper {
          display: inline-flex;
          align-items: center;
          border: 1px solid #C89B3C;
          border-radius: 50px;
          overflow: hidden;
          background: #FFFFFF;
        }

        .qty-stepper button {
          background: none;
          border: none;
          padding: 4px 12px;
          font-weight: 700;
          cursor: pointer;
          color: #2D2523;
        }

        .qty-val {
          padding: 0 8px;
          font-size: 0.9rem;
          font-weight: 700;
        }

        .modal-wishlist-btn {
          background: #FFFDF9;
          border: 1px solid #D4C5B9;
          padding: 4px 14px;
          border-radius: 50px;
          font-size: 0.8rem;
          font-weight: 600;
          color: #7A6965;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .modal-buttons-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
          gap: 0.65rem;
        }

        .btn-modal-cart {
          background: #FFFDF9;
          border: 1.5px solid #C89B3C;
          color: #7A5C1B;
          font-weight: 700;
          font-size: 0.88rem;
          padding: 0.65rem 1rem;
          border-radius: 50px;
          cursor: pointer;
        }

        .btn-modal-buynow {
          background: linear-gradient(135deg, #E8C86A 0%, #C89B3C 100%);
          border: none;
          color: #FFFFFF;
          font-weight: 700;
          font-size: 0.88rem;
          padding: 0.65rem 1rem;
          border-radius: 50px;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(200, 155, 60, 0.3);
        }

        .btn-modal-wa {
          background: #25D366;
          border: none;
          color: #FFFFFF;
          font-weight: 700;
          font-size: 0.88rem;
          padding: 0.65rem 1rem;
          border-radius: 50px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }

        @media (max-width: 768px) {
          .modal-two-col-grid {
            grid-template-columns: 1fr;
            overflow-y: auto;
          }
          .product-details-modal-box {
            width: 95%;
            max-height: 92vh;
          }
        }
      `}</style>
    </section>
  );
};

export default MasterCategoryCustomizer;
