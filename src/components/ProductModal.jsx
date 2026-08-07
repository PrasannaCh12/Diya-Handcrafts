import React, { useState } from 'react';
import { FaTimes, FaStar, FaWhatsapp, FaShoppingBag, FaCheck, FaTruck, FaShieldAlt, FaChevronLeft, FaChevronRight, FaMagic, FaUser, FaPhone, FaEnvelope, FaGift, FaCalendarAlt, FaClock, FaMapMarkerAlt, FaFileAlt, FaArrowLeft, FaArrowRight, FaRibbon, FaHeart, FaEdit } from 'react-icons/fa';
import WhatsAppModal from './WhatsAppModal';

const ProductModal = ({ product, onClose, onAddToCart }) => {
  if (!product) return null;

  const productImages = product.images && product.images.length > 0 ? product.images : [product.image];
  const [activeImg, setActiveImg] = useState(productImages[0] || product.image);
  const [selectedSize, setSelectedSize] = useState(product.customizations?.sizes?.[0] || 'Standard');
  const [selectedColor, setSelectedColor] = useState(product.customizations?.colors?.[0] || 'Standard');
  const [quantity, setQuantity] = useState(1);

  // Modal View State: 'overview' (Product Overview by default)
  const [activeView, setActiveView] = useState('overview');
  const [wizardStep, setWizardStep] = useState(1);

  // Step 1: Customer Details
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerWhatsApp, setCustomerWhatsApp] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');

  // Step 2: Delivery Details
  const [recipientName, setRecipientName] = useState('');
  const [recipientPhone, setRecipientPhone] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('Select Delivery Slot');
  const [deliveryAddress, setDeliveryAddress] = useState('');

  // Step 3: Gift Personalization
  const [occasion, setOccasion] = useState('None');
  const [ribbonColor, setRibbonColor] = useState('None');
  const [giftMessage, setGiftMessage] = useState('');

  const currentImgIndex = productImages.indexOf(activeImg) >= 0 ? productImages.indexOf(activeImg) : 0;

  const handlePrevImg = (e) => {
    e.stopPropagation();
    const prevIdx = (currentImgIndex - 1 + productImages.length) % productImages.length;
    setActiveImg(productImages[prevIdx]);
  };

  const handleNextImg = (e) => {
    e.stopPropagation();
    const nextIdx = (currentImgIndex + 1) % productImages.length;
    setActiveImg(productImages[nextIdx]);
  };

  // Step 1 Validation
  const handleNextToStep2 = () => {
    if (!customerName.trim() || !customerPhone.trim() || !customerWhatsApp.trim()) {
      alert('Please fill in your Full Name, Mobile Number, and WhatsApp Number to continue.');
      return;
    }
    setWizardStep(2);
  };

  // WhatsApp Order Submission
  const handleWhatsAppSend = (e) => {
    if (e) e.preventDefault();

    if (!customerName || !customerPhone || !customerWhatsApp) {
      alert('Please fill in your Full Name, Phone Number, and WhatsApp Number in Step 1 to continue.');
      setWizardStep(1);
      return;
    }

    let text = `✨ *Direct Product Order - Divya Handcrafts* ✨\n`;
    text += `----------------------------------------\n`;
    text += `🛍️ *Product:* ${product.title}\n`;
    text += `🏷️ *Category:* ${product.category}\n`;
    text += `💰 *Price:* ₹${product.price.toLocaleString()}\n`;
    text += `📦 *Quantity:* ${quantity}\n`;
    text += `📏 *Size / Option:* ${selectedSize}\n`;
    text += `🎨 *Color Choice:* ${selectedColor}\n\n`;

    text += `👤 *Customer Details:*\n`;
    text += `- Name: ${customerName}\n`;
    text += `- Phone: ${customerPhone}\n`;
    text += `- WhatsApp: ${customerWhatsApp}\n`;
    if (customerEmail) text += `- Email: ${customerEmail}\n`;

    if (recipientName || recipientPhone) {
      text += `\n🎁 *Recipient Details (Gift):*\n`;
      if (recipientName) text += `- Recipient Name: ${recipientName}\n`;
      if (recipientPhone) text += `- Recipient Phone: ${recipientPhone}\n`;
    }

    if (deliveryDate || (deliveryTime && deliveryTime !== 'Select Delivery Slot') || deliveryAddress) {
      text += `\n🚚 *Delivery Info:*\n`;
      if (deliveryDate) text += `- Preferred Date: ${deliveryDate}\n`;
      if (deliveryTime && deliveryTime !== 'Select Delivery Slot') text += `- Delivery Slot: ${deliveryTime}\n`;
      if (deliveryAddress) text += `- Delivery Address: ${deliveryAddress}\n`;
    }

    if ((occasion && occasion !== 'None') || (ribbonColor && ribbonColor !== 'None') || giftMessage) {
      text += `\n🎨 *Gift Personalization:*\n`;
      if (occasion && occasion !== 'None') text += `- Occasion: ${occasion}\n`;
      if (ribbonColor && ribbonColor !== 'None') text += `- Ribbon Color: ${ribbonColor}\n`;
      if (giftMessage) text += `- Gift Message: "${giftMessage}"\n`;
    }

    text += `----------------------------------------\n`;
    text += `*Made With Love, Made For You - Divya Handcrafts*\n`;
    text += `Please confirm availability and details!`;

    setWaOrderText(text);
    setWaModalOpen(true);
  };

  const handleScrollToCustomizer = () => {
    onClose();
    setTimeout(() => {
      const el = document.getElementById('chocolate-customizer') || document.getElementById('biscuit-customizer');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content product-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close Modal">
          <FaTimes />
        </button>

        {/* View Switcher Header */}
        <div className="modal-view-header mb-3">
          <button 
            className={`view-toggle-btn ${activeView === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveView('overview')}
          >
            🛍️ Product Overview
          </button>
          <button 
            className={`view-toggle-btn ${activeView === 'wizard' ? 'active' : ''}`}
            onClick={() => setActiveView('wizard')}
          >
            🌸 Order & Personalize Wizard
          </button>
        </div>

        {/* VIEW 1: Product Overview & Customizations */}
        {activeView === 'overview' && (
          <div className="product-modal-grid animate-fade-in">
            {/* Left: Image Gallery Carousel */}
            <div className="modal-gallery">
              <div className="modal-main-img-wrap">
                <img src={activeImg || product.image} alt={product.title || product.name} className="modal-main-img" />

                {productImages.length > 1 && (
                  <>
                    <button className="carousel-nav-btn prev-btn" onClick={handlePrevImg} aria-label="Previous Image">
                      <FaChevronLeft />
                    </button>
                    <button className="carousel-nav-btn next-btn" onClick={handleNextImg} aria-label="Next Image">
                      <FaChevronRight />
                    </button>
                  </>
                )}
              </div>

              {productImages.length > 1 && (
                <div className="modal-thumbs flex gap-2 mt-3">
                  {productImages.map((imgUrl, idx) => (
                    <img
                      key={idx}
                      src={imgUrl}
                      alt=""
                      className={`thumb-img ${activeImg === imgUrl ? 'active' : ''}`}
                      onClick={() => setActiveImg(imgUrl)}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Right: Details & Options */}
            <div className="modal-details">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span className="badge-gold">
                  {product.category || 'Handmade Creation'}
                </span>
                <span style={{ fontSize: '1.4rem', fontWeight: '700', color: 'var(--gold-dark)', fontFamily: 'var(--font-serif)' }}>
                  ₹{(product.price || 999).toLocaleString()}
                </span>
              </div>

              <h2 className="modal-product-title">{product.title || product.name}</h2>

              {product.shortDesc && (
                <div style={{ background: '#FFFBF5', border: '1px solid #E8D8B5', padding: '0.65rem 0.85rem', borderRadius: '10px', fontSize: '0.85rem', color: '#5A4A42', marginTop: '0.75rem', fontWeight: '500' }}>
                  ✨ {product.shortDesc}
                </div>
              )}

              <p className="modal-description" style={{ marginTop: '0.75rem' }}>{product.description || product.desc}</p>

              {/* Materials Used */}
              {(product.materials || product.specs) && (
                <div style={{ marginTop: '0.75rem' }}>
                  <label className="option-label" style={{ marginBottom: '0.35rem', display: 'block' }}>Materials Used:</label>
                  <div style={{ fontSize: '0.85rem', color: '#3E2C1C', background: '#FFFFFF', border: '1px solid rgba(212,175,55,0.25)', padding: '0.5rem 0.75rem', borderRadius: '8px' }}>
                    💎 {product.materials || product.specs?.join(' • ')}
                  </div>
                </div>
              )}

              {/* Specs list */}
              {product.specs && (
                <div className="specs-list" style={{ marginTop: '0.65rem' }}>
                  {product.specs.map((spec, i) => (
                    <div key={i} className="spec-tag">
                      <FaCheck className="text-gold" /> {spec}
                    </div>
                  ))}
                </div>
              )}

              {/* Customization Controls */}
              {product.customizations?.sizes && (
                <div className="custom-option-group" style={{ marginTop: '0.75rem' }}>
                  <label className="option-label">Available Sizes / Dimensions:</label>
                  <div className="option-buttons">
                    {product.customizations.sizes.map((sz) => (
                      <button
                        key={sz}
                        className={`opt-btn ${selectedSize === sz ? 'selected' : ''}`}
                        onClick={() => setSelectedSize(sz)}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {product.customizations?.colors && (
                <div className="custom-option-group" style={{ marginTop: '0.65rem' }}>
                  <label className="option-label">Available Colors / Design Themes:</label>
                  <div className="option-buttons">
                    {product.customizations.colors.map((col) => (
                      <button
                        key={col}
                        className={`opt-btn ${selectedColor === col ? 'selected' : ''}`}
                        onClick={() => setSelectedColor(col)}
                      >
                        {col}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Processing Time & Care Instructions */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem', marginTop: '0.85rem' }}>
                <div style={{ background: '#FFFDF9', border: '1px solid #E8D8B5', padding: '0.6rem 0.75rem', borderRadius: '10px', fontSize: '0.78rem' }}>
                  <strong style={{ color: 'var(--gold-dark)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}><FaClock /> Processing Time:</strong>
                  <span style={{ color: '#5A4A42', display: 'block', marginTop: '0.2rem' }}>{product.processingTime || '2 – 4 Business Days'}</span>
                </div>
                <div style={{ background: '#FFFDF9', border: '1px solid #E8D8B5', padding: '0.6rem 0.75rem', borderRadius: '10px', fontSize: '0.78rem' }}>
                  <strong style={{ color: 'var(--gold-dark)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}><FaShieldAlt /> Care Instructions:</strong>
                  <span style={{ color: '#5A4A42', display: 'block', marginTop: '0.2rem' }}>{product.careInstructions || 'Keep dry & store in airtight container.'}</span>
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="quantity-wrap" style={{ marginTop: '0.85rem' }}>
                <label className="option-label">Quantity:</label>
                <div className="qty-counter">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                  <span>{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)}>+</button>
                </div>
              </div>

              {/* Primary Action Buttons */}
              <div className="modal-actions" style={{ flexDirection: 'column', gap: '0.65rem', marginTop: '1rem' }}>
                <button className="btn btn-whatsapp w-full" onClick={() => { setActiveView('wizard'); setWizardStep(1); }}>
                  <FaWhatsapp /> WhatsApp Order Now
                </button>

                <button className="btn btn-outline-gold w-full" onClick={onClose}>
                  <FaArrowLeft /> Back to Products
                </button>
              </div>

              {/* Trust Badges */}
              <div className="modal-trust-footer" style={{ marginTop: '0.75rem' }}>
                <div><FaTruck /> Express Pan-India & Global Delivery</div>
                <div><FaShieldAlt /> 100% Handcrafted Authenticity</div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: Premium 4-Step Multi-Step Wizard */}
        {activeView === 'wizard' && (
          <div className="wizard-container animate-fade-in">
            
            {/* 3-Step Progress Indicator Bar */}
            <div className="wizard-progress-bar">
              <div className="progress-steps-row">
                <div className={`step-pill ${wizardStep >= 1 ? 'active' : ''} ${wizardStep > 1 ? 'completed' : ''}`}>
                  <span className="step-num">{wizardStep > 1 ? <FaCheck /> : '1'}</span>
                  <span className="step-text">🌸 Customer Details</span>
                </div>

                <div className={`step-pill ${wizardStep >= 2 ? 'active' : ''} ${wizardStep > 2 ? 'completed' : ''}`}>
                  <span className="step-num">{wizardStep > 2 ? <FaCheck /> : '2'}</span>
                  <span className="step-text">🎁 Delivery Info</span>
                </div>

                <div className={`step-pill ${wizardStep >= 3 ? 'active' : ''}`}>
                  <span className="step-num">3</span>
                  <span className="step-text">📋 Order Summary</span>
                </div>
              </div>

              <div className="progress-line-track">
                <div className="progress-line-fill" style={{ width: `${((wizardStep - 1) / 2) * 100}%` }}></div>
              </div>
            </div>

            {/* STEP 1: Customer Details */}
            {wizardStep === 1 && (
              <div className="wizard-step-content animate-slide-in">
                <div className="wizard-step-header text-center">
                  <h2>🌸 Customer Details</h2>
                  <p>Tell us how we can contact you.</p>
                </div>

                <div className="wizard-form-two-col">
                  {/* Left Column */}
                  <div className="wform-field">
                    <label><FaUser className="ficon" /> Full Name *</label>
                    <input
                      type="text"
                      required
                      className="wform-input"
                      placeholder="e.g. Radhika Sharma"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                    />
                  </div>

                  <div className="wform-field">
                    <label><FaPhone className="ficon" /> Mobile Number *</label>
                    <input
                      type="tel"
                      required
                      className="wform-input"
                      placeholder="e.g. +91 98765 43210"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                    />
                  </div>

                  {/* Right Column */}
                  <div className="wform-field">
                    <label><FaWhatsapp className="ficon" /> WhatsApp Number *</label>
                    <input
                      type="tel"
                      required
                      className="wform-input"
                      placeholder="e.g. +91 98765 43210"
                      value={customerWhatsApp}
                      onChange={(e) => setCustomerWhatsApp(e.target.value)}
                    />
                  </div>

                  <div className="wform-field">
                    <label><FaEnvelope className="ficon" /> Email Address (Optional)</label>
                    <input
                      type="email"
                      className="wform-input"
                      placeholder="radhika@example.com"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="wizard-actions-bar">
                  <button className="btn btn-outline-gold" onClick={() => setActiveView('overview')}>
                    <FaArrowLeft /> Back to Overview
                  </button>
                  <button className="btn btn-primary-gold" onClick={handleNextToStep2}>
                    Continue <FaArrowRight />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Delivery Information */}
            {wizardStep === 2 && (
              <div className="wizard-step-content animate-slide-in">
                <div className="wizard-step-header text-center">
                  <h2>🎁 Delivery Information</h2>
                  <p>Provide delivery address and preferred schedule (Optional).</p>
                </div>

                <div className="wizard-form-two-col">
                  <div className="wform-field">
                    <label><FaUser className="ficon" /> Recipient Name (Optional)</label>
                    <input
                      type="text"
                      className="wform-input"
                      placeholder="Recipient's Name (if gifting)"
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                    />
                  </div>

                  <div className="wform-field">
                    <label><FaPhone className="ficon" /> Recipient Phone (Optional)</label>
                    <input
                      type="tel"
                      className="wform-input"
                      placeholder="Recipient's Contact Number"
                      value={recipientPhone}
                      onChange={(e) => setRecipientPhone(e.target.value)}
                    />
                  </div>

                  <div className="wform-field">
                    <label><FaCalendarAlt className="ficon" /> Delivery Date (Optional)</label>
                    <input
                      type="date"
                      className="wform-input"
                      value={deliveryDate}
                      onChange={(e) => setDeliveryDate(e.target.value)}
                    />
                  </div>

                  <div className="wform-field">
                    <label><FaClock className="ficon" /> Delivery Time (Optional)</label>
                    <select
                      className="wform-input"
                      value={deliveryTime}
                      onChange={(e) => setDeliveryTime(e.target.value)}
                    >
                      <option value="Select Delivery Slot">Select Delivery Slot</option>
                      <option value="Morning (9 AM – 12 PM)">Morning (9 AM – 12 PM)</option>
                      <option value="Afternoon (12 PM – 3 PM)">Afternoon (12 PM – 3 PM)</option>
                      <option value="Evening (3 PM – 6 PM)">Evening (3 PM – 6 PM)</option>
                      <option value="Night (6 PM – 9 PM)">Night (6 PM – 9 PM)</option>
                    </select>
                  </div>

                  <div className="wform-field full-width">
                    <label><FaMapMarkerAlt className="ficon" /> Delivery Address (Optional)</label>
                    <textarea
                      rows="2"
                      className="wform-textarea"
                      placeholder="Enter complete shipping/delivery address..."
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                    />
                  </div>
                </div>

                <div className="wizard-actions-bar">
                  <button className="btn btn-outline-gold" onClick={() => setWizardStep(1)}>
                    <FaArrowLeft /> Back
                  </button>
                  <button className="btn btn-primary-gold" onClick={() => setWizardStep(3)}>
                    Continue <FaArrowRight />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Order Summary */}
            {wizardStep === 3 && (
              <div className="wizard-step-content animate-slide-in">
                <div className="wizard-step-header text-center">
                  <h2>📋 Order Summary</h2>
                  <p>Please review your details before sending your order via WhatsApp.</p>
                </div>

                <div className="wizard-summary-card glass-card">
                  <div className="wsummary-grid">
                    <div className="wsum-row">
                      <span>Product Name:</span>
                      <strong>{product.name}</strong>
                    </div>
                    <div className="wsum-row">
                      <span>Category:</span>
                      <strong>{product.category}</strong>
                    </div>
                    <div className="wsum-row">
                      <span>Size / Flavor:</span>
                      <strong>{selectedSize}</strong>
                    </div>
                    <div className="wsum-row">
                      <span>Color / Add-ons:</span>
                      <strong>{selectedColor}</strong>
                    </div>
                    <div className="wsum-row">
                      <span>Quantity:</span>
                      <strong>{quantity}</strong>
                    </div>

                    <div className="wsum-divider"></div>

                    <div className="wsum-row">
                      <span>Customer Name:</span>
                      <strong>{customerName}</strong>
                    </div>
                    <div className="wsum-row">
                      <span>Mobile Number:</span>
                      <strong>{customerPhone}</strong>
                    </div>
                    <div className="wsum-row">
                      <span>WhatsApp Number:</span>
                      <strong>{customerWhatsApp}</strong>
                    </div>

                    {recipientName && (
                      <div className="wsum-row">
                        <span>Recipient:</span>
                        <strong>{recipientName} ({recipientPhone || 'N/A'})</strong>
                      </div>
                    )}
                    {deliveryDate && (
                      <div className="wsum-row">
                        <span>Delivery Date:</span>
                        <strong>{deliveryDate}</strong>
                      </div>
                    )}
                    {deliveryTime && deliveryTime !== 'Select Delivery Slot' && (
                      <div className="wsum-row">
                        <span>Delivery Time:</span>
                        <strong>{deliveryTime}</strong>
                      </div>
                    )}
                  </div>
                </div>

                <div className="wizard-actions-bar mt-4">
                  <button className="btn btn-outline-gold" onClick={() => setWizardStep(2)}>
                    <FaArrowLeft /> Back
                  </button>
                  <button className="btn btn-whatsapp-large" onClick={handleWhatsAppSend}>
                    <FaWhatsapp /> Order on WhatsApp
                  </button>
                </div>
              </div>
            )}

          </div>
        )}
      </div>

      <WhatsAppModal
        isOpen={waModalOpen}
        onClose={() => setWaModalOpen(false)}
        messageText={waOrderText}
      />

      <style>{`
        .product-modal {
          padding: 2.25rem;
          max-width: 900px;
          max-height: 90vh;
          overflow-y: auto;
          background: #FFFFFF;
          border-radius: var(--radius-lg);
          box-shadow: 0 20px 50px rgba(110, 58, 70, 0.25);
          position: relative;
        }

        .modal-view-header {
          display: flex;
          gap: 0.75rem;
          border-bottom: 1px solid var(--gold-border);
          padding-bottom: 0.75rem;
        }

        .view-toggle-btn {
          background: transparent;
          border: none;
          padding: 0.55rem 1.2rem;
          font-weight: 700;
          font-size: 0.88rem;
          color: var(--text-muted);
          cursor: pointer;
          border-radius: var(--radius-full);
          transition: var(--transition-smooth);
        }

        .view-toggle-btn.active {
          background: var(--gold-gradient);
          color: #FFFFFF;
          box-shadow: var(--shadow-gold);
        }

        /* 4-Step Progress Indicator Bar */
        .wizard-progress-bar {
          margin-bottom: 2rem;
          padding: 1rem 0;
        }

        .progress-steps-row {
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
          margin-bottom: 0.75rem;
        }

        .step-pill {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--text-muted);
          padding: 0.4rem 0.8rem;
          border-radius: var(--radius-full);
          background: var(--bg-secondary);
          transition: var(--transition-smooth);
        }

        .step-pill.active {
          background: var(--gold-gradient);
          color: #FFFFFF;
          box-shadow: var(--shadow-gold);
        }

        .step-pill.completed {
          background: var(--bg-blush-accent);
          color: var(--rose-primary);
        }

        .step-num {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
        }

        .progress-line-track {
          width: 100%;
          height: 6px;
          background: var(--bg-secondary);
          border-radius: var(--radius-full);
          overflow: hidden;
        }

        .progress-line-fill {
          height: 100%;
          background: var(--gold-gradient);
          transition: width 0.4s ease;
        }

        @media (max-width: 640px) {
          .step-text {
            display: none;
          }
        }

        /* 2-Column Responsive Form & Rounded 14px Inputs */
        .wizard-step-header h2 {
          font-family: var(--font-serif);
          color: var(--rose-dark);
          font-size: 1.6rem;
          margin-bottom: 0.25rem;
        }

        .wizard-step-header p {
          color: var(--text-muted);
          font-size: 0.9rem;
          margin-bottom: 1.75rem;
        }

        .wizard-form-two-col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.25rem;
        }

        @media (max-width: 640px) {
          .wizard-form-two-col {
            grid-template-columns: 1fr;
          }
        }

        .wform-field {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .wform-field.full-width {
          grid-column: 1 / -1;
        }

        .wform-field label {
          font-weight: 600;
          font-size: 0.85rem;
          color: var(--text-main);
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .ficon {
          color: var(--gold-primary);
        }

        .wform-input {
          padding: 0.75rem 1rem;
          border: 1.5px solid rgba(110, 58, 70, 0.15);
          border-radius: 14px;
          font-family: var(--font-sans);
          font-size: 0.9rem;
          background: #FFFFFF;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .wform-input:focus {
          outline: none;
          border-color: var(--gold-primary);
          box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.18);
        }

        .wform-textarea {
          padding: 0.75rem 1rem;
          border: 1.5px solid rgba(110, 58, 70, 0.15);
          border-radius: 14px;
          font-family: var(--font-sans);
          font-size: 0.9rem;
          background: #FFFFFF;
          resize: vertical;
        }

        .wform-textarea:focus {
          outline: none;
          border-color: var(--gold-primary);
          box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.18);
        }

        .wizard-actions-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 2rem;
          padding-top: 1rem;
          border-top: 1px dashed var(--gold-border);
        }

        .btn-primary-gold {
          background: var(--gold-gradient);
          color: #FFFFFF;
          font-weight: 700;
          padding: 0.75rem 1.75rem;
          border-radius: var(--radius-full);
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          box-shadow: var(--shadow-gold);
          transition: var(--transition-smooth);
        }

        .btn-primary-gold:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(212, 175, 55, 0.35);
        }

        .btn-whatsapp-large {
          background: #25D366;
          color: #FFFFFF;
          font-weight: 700;
          font-size: 1rem;
          padding: 0.85rem 2rem;
          border-radius: var(--radius-full);
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.6rem;
          box-shadow: 0 6px 20px rgba(37, 211, 102, 0.3);
          transition: var(--transition-smooth);
        }

        .btn-whatsapp-large:hover {
          background: #20BA5A;
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(37, 211, 102, 0.4);
        }

        /* Order Summary Card Styles */
        .wizard-summary-card {
          padding: 1.75rem;
          background: var(--bg-secondary);
          border-radius: var(--radius-md);
          border: 1px solid var(--gold-border);
        }

        .wsummary-grid {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .wsum-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.9rem;
        }

        .wsum-row.full {
          flex-direction: column;
          gap: 0.25rem;
        }

        .wsum-row span {
          color: var(--text-muted);
        }

        .wsum-row strong {
          color: var(--text-main);
          text-align: right;
        }

        .wsum-divider {
          height: 1px;
          background: var(--gold-border);
          margin: 0.5rem 0;
        }

        .modal-close-btn {
          position: absolute;
          top: 1.25rem;
          right: 1.25rem;
          background: var(--bg-secondary);
          border: none;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
          cursor: pointer;
          color: var(--text-main);
          transition: background 0.2s;
          z-index: 10;
        }

        .modal-close-btn:hover {
          background: var(--bg-blush-accent);
          color: var(--rose-primary);
        }

        .product-modal-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2.5rem;
        }

        @media (max-width: 768px) {
          .product-modal-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
        }

        .modal-main-img-wrap {
          position: relative;
          height: 380px;
          border-radius: var(--radius-md);
          overflow: hidden;
          background: var(--bg-blush-light);
          border: 1px solid var(--gold-border);
          box-shadow: inset 0 0 20px rgba(61, 43, 31, 0.08), 0 4px 16px rgba(0, 0, 0, 0.06);
        }

        .modal-main-img-wrap::after {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, rgba(255, 245, 230, 0.03) 0%, rgba(212, 175, 55, 0.03) 100%);
          pointer-events: none;
          z-index: 2;
        }

        .carousel-nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(4px);
          border: 1px solid var(--gold-border);
          color: var(--rose-dark);
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 1rem;
          transition: var(--transition-smooth);
          box-shadow: var(--shadow-sm);
          z-index: 5;
        }

        .carousel-nav-btn:hover {
          background: var(--gold-gradient);
          color: #FFFFFF;
          border-color: transparent;
        }

        .carousel-nav-btn.prev-btn {
          left: 0.75rem;
        }

        .carousel-nav-btn.next-btn {
          right: 0.75rem;
        }

        .modal-main-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: brightness(1.03) contrast(1.05);
        }

        .modal-thumbs .thumb-img {
          width: 65px;
          height: 65px;
          object-fit: cover;
          border-radius: var(--radius-sm);
          cursor: pointer;
          border: 2px solid transparent;
          transition: border-color 0.2s;
        }

        .modal-thumbs .thumb-img.active {
          border-color: var(--gold-primary);
        }
      `}</style>
    </div>
  );
};

export default ProductModal;
