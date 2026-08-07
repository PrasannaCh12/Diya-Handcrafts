import React, { useState, useEffect } from 'react';
import { FaWhatsapp, FaCheck, FaHeart, FaStar, FaMagic, FaGift, FaUser, FaPhone, FaEnvelope, FaMapMarkerAlt, FaCalendarAlt, FaClock, FaGem, FaTimes, FaChevronLeft, FaChevronRight, FaPalette } from 'react-icons/fa';
import WhatsAppModal from './WhatsAppModal';

export const RESINART_DESIGNS = [
  {
    id: 'ra-coasters',
    name: 'Personalized Resin Wedding Photo Frame',
    icon: '🖼️',
    desc: 'Luxury handcrafted resin photo frame with personalized names, wedding date, preserved botanicals, gold foil accents, and your favorite photo. A perfect wedding keepsake and heartfelt gift.',
    image: '/resin_coasters_set.jpg'
  },
  {
    id: 'ra-photo-frame',
    name: 'Personalized Resin Calendar Keepsake',
    icon: '📅',
    desc: 'Luxury handcrafted resin calendar with a personalized photo, special date, floral decorations, gold foil accents, and custom design. A perfect gift for birthdays, anniversaries, and special memories.',
    image: '/resin_photo_plaque.jpg'
  },
  {
    id: 'ra-keychains',
    name: 'Personalized Resin Anniversary Plaque',
    icon: '💍',
    desc: 'Luxury handcrafted resin plaque with personalized photo, names, special date, preserved flowers, crystal accents, and gold foil. A perfect anniversary keepsake and heartfelt gift.',
    image: '/resin_keychains.jpg'
  },
  {
    id: 'ra-bracelets',
    name: 'Personalized Resin Valentine Plaque',
    icon: '❤️',
    desc: 'Cute handcrafted resin plaque with a personalized couple illustration, custom message, premium glossy finish, and vibrant design. A perfect Valentine\'s Day and anniversary gift.',
    image: '/resin_bracelets_rakhi.jpg'
  },
  {
    id: 'ra-clock',
    name: 'Personalized Resin Couple Plaque',
    icon: '💖',
    desc: 'Cute handcrafted resin plaque with a personalized couple illustration, custom message, and glossy finish. A perfect keepsake for Valentine\'s Day, anniversaries, and romantic gifts.',
    image: '/resin_clock.jpg'
  },
  {
    id: 'ra-frame-keepsake',
    name: 'Personalized Resin Love Memory Plaque',
    icon: '❤️',
    desc: 'Luxury handcrafted resin plaque with a personalized photo, names, special date, preserved flowers, and gold accents. A perfect keepsake for weddings, anniversaries, and special moments.',
    image: '/personalized_resin_photo_frame.jpg'
  },
  {
    id: 'ra-serving-tray',
    name: 'Personalized Resin Initial Keychain',
    icon: '🗝️',
    desc: 'Luxury handcrafted resin initial keychain with glitter, gold foil accents, and a stylish tassel. A personalized accessory perfect for gifting and everyday use.',
    image: '/resin_serving_tray.jpg'
  },
  {
    id: 'ra-name-plate',
    name: 'Personalized Resin VOD Photo Stand',
    icon: '✨',
    desc: 'Luxury handcrafted resin VOD photo stand with a personalized couple photo, gold foil accents, and glossy finish. A unique keepsake for weddings, anniversaries, and special moments.',
    image: '/resin_name_plate.jpg'
  },
  {
    id: 'ra-jewelry-tray',
    name: 'Personalized Resin Heart Keepsake',
    icon: '💖',
    desc: 'Luxury handcrafted heart-shaped resin keepsake with personalized names, preserved flowers, gold foil accents, and a glossy finish. A perfect gift for weddings, anniversaries, and cherished memories.',
    image: '/resin_jewelry_tray.jpg'
  },
  {
    id: 'ra-candle-holder',
    name: 'Personalized Resin Rakhi Collection',
    icon: '✨',
    desc: 'Luxury handcrafted resin Rakhi with personalized names, elegant pearl beads, premium resin finish, and vibrant colors. A thoughtful keepsake for celebrating Raksha Bandhan.',
    image: '/resin_candle_holder.jpg'
  }
];

export const RESINART_HIGHLIGHTS = [
  'Preserved Wedding Flowers',
  'Resin Wall Clocks',
  'Photo Frames & Name Plaques',
  'Personalized Keychains',
  'Decorative Trays & Coasters',
  'Custom Gift Keepsakes'
];

const ResinArtCustomizer = ({ onSelectProduct }) => {
  // Customization Choice State (Single radio selection by default)
  const [selectedDesign, setSelectedDesign] = useState('');
  const [shape, setShape] = useState('');
  const [colorTheme, setColorTheme] = useState('');
  const [ribbonColor, setRibbonColor] = useState('');
  const [occasion, setOccasion] = useState('');

  // Customer Details State (Required)
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerWhatsApp, setCustomerWhatsApp] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');

  // Delivery & Recipient Details State (Optional)
  const [recipientName, setRecipientName] = useState('');
  const [recipientPhone, setRecipientPhone] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [orderNotes, setOrderNotes] = useState('');
  const [waModalOpen, setWaModalOpen] = useState(false);
  const [waOrderText, setWaOrderText] = useState('');

  const [expandedCardId, setExpandedCardId] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const openLightbox = (e, idx) => {
    if (e) e.stopPropagation();
    setLightboxIndex(idx);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextLightbox = (e) => {
    if (e) e.stopPropagation();
    setLightboxIndex((prev) => (prev !== null ? (prev + 1) % RESINART_DESIGNS.length : null));
  };

  const prevLightbox = (e) => {
    if (e) e.stopPropagation();
    setLightboxIndex((prev) => (prev !== null ? (prev - 1 + RESINART_DESIGNS.length) % RESINART_DESIGNS.length : null));
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex !== null) {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') nextLightbox();
        if (e.key === 'ArrowLeft') prevLightbox();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex]);

  const toggleCardExpansion = (id, e) => {
    if (e) e.stopPropagation();
    setExpandedCardId((prev) => (prev === id ? null : id));
  };

  const selectDesign = (designName) => {
    setSelectedDesign((prev) => (prev === designName ? '' : designName));
  };

  const handleDirectCardWhatsAppOrder = (item) => {
    let text = `✨ *Direct Product Order - Divya Handcrafts* ✨\n`;
    text += `----------------------------------------\n`;
    text += `🛍️ *Creation:* ${item.name}\n`;
    text += `🏷️ *Category:* Resin Art Keepsake\n`;
    text += `📜 *Description:* ${item.desc}\n\n`;
    text += `Please let me know how to proceed with customization choices, pricing, and delivery slot!`;
    setWaOrderText(text);
    setWaModalOpen(true);
  };

  const handleWhatsAppSend = (e) => {
    if (e) e.preventDefault();

    if (!selectedDesign) {
      alert('Please select a Resin Art product by clicking a card above.');
      return;
    }

    let text = `✨ *Custom Resin Art Order - Divya Handcrafts* ✨\n`;
    text += `----------------------------------------\n`;
    if (customerName || customerPhone || customerWhatsApp) {
      text += `👤 *Customer Details:*\n`;
      if (customerName) text += `- Name: ${customerName}\n`;
      if (customerPhone) text += `- Phone: ${customerPhone}\n`;
      if (customerWhatsApp) text += `- WhatsApp: ${customerWhatsApp}\n`;
      if (customerEmail) text += `- Email: ${customerEmail}\n`;
    }

    if (recipientName || recipientPhone) {
      text += `\n🎁 *Recipient Details (Gift):*\n`;
      if (recipientName) text += `- Recipient Name: ${recipientName}\n`;
      if (recipientPhone) text += `- Recipient Phone: ${recipientPhone}\n`;
    }

    if (deliveryDate || deliveryTime || deliveryAddress) {
      text += `\n🚚 *Delivery Details:*\n`;
      if (deliveryDate) text += `- Preferred Date: ${deliveryDate}\n`;
      if (deliveryTime) text += `- Preferred Time: ${deliveryTime}\n`;
      if (deliveryAddress) text += `- Delivery Address: ${deliveryAddress}\n`;
    }

    text += `\n🎨 *Resin Art Customization Choices:*\n`;
    text += `- Selected Product: ${selectedDesign}\n`;
    if (shape) text += `- Shape / Format: ${shape}\n`;
    if (colorTheme) text += `- Color Theme: ${colorTheme}\n`;
    if (ribbonColor) text += `- Ribbon Color: ${ribbonColor}\n`;
    if (occasion) text += `- Occasion: ${occasion}\n`;

    if (orderNotes) {
      text += `\n📝 *Special Instructions:*\n"${orderNotes}"\n`;
    }

    text += `----------------------------------------\n`;
    text += `*Preserving Your Precious Memories Forever - Divya Handcrafts*\n`;
    text += `Please let me know how to proceed with pricing and delivery slot!`;

    setWaOrderText(text);
    setWaModalOpen(true);
  };

  return (
    <section id="resinart-customizer" className="customizer-section section-padding">
      <div className="container">
        {/* Section Header */}
        <div className="hero-header-wrap">
          <div className="tw-hero-subtitle">HANDMADE RESIN ART STUDIO</div>
          <h2 className="tw-hero-title">Customize Your Resin Art</h2>
          <p className="tw-hero-description">
            Transform your <span className="gold-highlight">precious memories</span> into <span className="gold-highlight">timeless resin art</span> creations. Customize preserved <span className="gold-highlight">wedding flowers</span>, name plaques, <span className="gold-highlight">wall clocks</span>, trays, keychains, photo frames, coasters, and keepsakes with premium <span className="gold-highlight">crystal-clear resin</span>, elegant floral arrangements, and <span className="gold-highlight">personalized designs</span>. Every piece is <span className="gold-highlight">handcrafted with love</span> to preserve your special moments forever.
          </p>

          <div className="tw-hero-divider">
            <span className="divider-line left-line"></span>
            <span className="divider-motif">🪷</span>
            <span className="divider-line right-line"></span>
          </div>

          <div className="tw-brand-tagline">
            <span className="quote-mark">“</span>Preserving Your Precious Memories Forever.<span className="quote-mark">”</span>
          </div>
        </div>

        {/* Highlights Bar */}
        <div className="special-features-bar">
          <div className="features-flex">
            {RESINART_HIGHLIGHTS.map((feat, idx) => (
              <span key={idx} className="feature-pill">
                <FaGem style={{ color: '#C89B3C', fontSize: '18px' }} /> {feat}
              </span>
            ))}
          </div>
        </div>

        <div className="customizer-grid">
          {/* Left Column: Interactive Form Steps */}
          <div className="customizer-form-col">
            
            {/* Step 1: Choose Resin Art Designs */}
            <div className="options-card glass-card">
              <div className="card-step-header">
                <span className="step-badge">Step 1</span>
                <h3>🎨 Choose Your Resin Art Style</h3>
                <p className="step-hint">Click cards to select your favorite resin art style.</p>
              </div>

              <div className="products-3col-grid">
                {RESINART_DESIGNS.map((ra, idx) => {
                  const isSelected = selectedDesign === ra.name;
                  const isExpanded = expandedCardId === ra.id;
                  return (
                    <div
                      key={ra.id}
                      className={`flavor-card ${isSelected ? 'selected' : ''} ${isExpanded ? 'card-is-expanded' : ''}`}
                      onClick={() => selectDesign(ra.name)}
                    >
                      {/* Top-Right Circular Radio Button */}
                      <div className={`resin-radio-circle ${isSelected ? 'selected' : ''}`}>
                        {isSelected && <FaCheck className="resin-radio-check" />}
                      </div>

                      <div 
                        className="flavor-img-wrap"
                        onClick={(e) => openLightbox(e, idx)}
                        title="Click to view full-screen photo preview"
                      >
                        <img 
                          src={ra.image} 
                          alt={ra.name} 
                          className="flavor-thumb-img"
                          loading="lazy"
                        />
                      </div>

                      <div className="flavor-content">
                        <div className="flavor-title-row">
                          <span className="flavor-icon">{ra.icon}</span>
                          <h4 className="flavor-serif-title">{ra.name}</h4>
                        </div>
                        <div 
                          className="click-view-details-cta"
                          onClick={(e) => toggleCardExpansion(ra.id, e)}
                        >
                          <span>{isExpanded ? 'Hide Details' : 'Click to View Details'}</span>
                          <span className={`chevron-rotate-icon ${isExpanded ? 'rotated' : ''}`}>⌄</span>
                        </div>

                        {/* Smooth Accordion Expanded Drawer */}
                        {isExpanded && (
                          <div className="card-expanded-drawer open">
                            <div className="drawer-inner-content">
                              <p className="drawer-desc">{ra.desc}</p>

                              <div className="drawer-info-block">
                                <h5>✨ Specifications & Materials:</h5>
                                <ul>
                                  <li>✨ 100% Handcrafted Premium Resin & Gold Foil</li>
                                  <li>🌸 Preserved Real Botanicals & Custom Typography</li>
                                  <li>💎 Glossy UV-Resistant High-Durability Finish</li>
                                </ul>
                              </div>

                              <div className="drawer-info-block">
                                <h5>🌿 Care Instructions:</h5>
                                <p>Wipe gently with a soft micro-fiber cloth. Avoid direct flame or harsh chemical sprays.</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Premium Customization Options Card */}
            <div className="cust-delivery-details-card" style={{ marginTop: '2.25rem' }}>
              <div className="card-section-header">
                <h3>🎁 Customization Options</h3>
                <p className="step-hint">Personalize your resin creation shape, floral themes, ribbon accent, and occasion.</p>
              </div>

              <div className="details-form-grid">
                {/* Shape / Format */}
                <div className="form-field-item">
                  <label className="field-label">📐 Shape / Format</label>
                  <select
                    value={shape}
                    onChange={(e) => setShape(e.target.value)}
                    className="lux-select-field"
                  >
                    <option value="">Select Shape / Format</option>
                    <option value="Rectangle">Rectangle</option>
                    <option value="Square">Square</option>
                    <option value="Circle">Circle</option>
                    <option value="Heart">Heart</option>
                    <option value="Hexagon">Hexagon</option>
                    <option value="Oval">Oval</option>
                    <option value="Arch">Arch</option>
                    <option value="Custom Shape">Custom Shape</option>
                  </select>
                </div>

                {/* Color & Floral Theme */}
                <div className="form-field-item">
                  <label className="field-label">🎨 Color & Floral Theme</label>
                  <select
                    value={colorTheme}
                    onChange={(e) => setColorTheme(e.target.value)}
                    className="lux-select-field"
                  >
                    <option value="">Select Color & Floral Theme</option>
                    <option value="White & Gold">White & Gold</option>
                    <option value="Pink Floral">Pink Floral</option>
                    <option value="Red Rose">Red Rose</option>
                    <option value="Blue Floral">Blue Floral</option>
                    <option value="Lavender">Lavender</option>
                    <option value="Green Botanical">Green Botanical</option>
                    <option value="Rustic Brown">Rustic Brown</option>
                    <option value="Pastel Theme">Pastel Theme</option>
                    <option value="Custom Theme">Custom Theme</option>
                  </select>
                </div>

                {/* Ribbon Color */}
                <div className="form-field-item">
                  <label className="field-label">🎀 Ribbon Color</label>
                  <select
                    value={ribbonColor}
                    onChange={(e) => setRibbonColor(e.target.value)}
                    className="lux-select-field"
                  >
                    <option value="">Select Ribbon Color</option>
                    <option value="None">None</option>
                    <option value="Gold">Gold</option>
                    <option value="Rose Gold">Rose Gold</option>
                    <option value="Silver">Silver</option>
                    <option value="Red">Red</option>
                    <option value="Pink">Pink</option>
                    <option value="White">White</option>
                    <option value="Black">Black</option>
                    <option value="Purple">Purple</option>
                    <option value="Blue">Blue</option>
                    <option value="Green">Green</option>
                  </select>
                </div>

                {/* Occasion */}
                <div className="form-field-item">
                  <label className="field-label">🎉 Occasion</label>
                  <select
                    value={occasion}
                    onChange={(e) => setOccasion(e.target.value)}
                    className="lux-select-field"
                  >
                    <option value="">Select Occasion</option>
                    <option value="Wedding">Wedding</option>
                    <option value="Anniversary">Anniversary</option>
                    <option value="Birthday">Birthday</option>
                    <option value="Engagement">Engagement</option>
                    <option value="Baby Shower">Baby Shower</option>
                    <option value="Housewarming">Housewarming</option>
                    <option value="Valentine's Day">Valentine's Day</option>
                    <option value="Mother's Day">Mother's Day</option>
                    <option value="Father's Day">Father's Day</option>
                    <option value="Friendship Day">Friendship Day</option>
                    <option value="Festival">Festival</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Customer & Delivery Details Section */}
            <div className="cust-delivery-details-card glass-card" style={{ marginTop: '2.25rem' }}>
              <div className="card-section-header">
                <h3>👤 Customer & Delivery Details</h3>
                <p className="step-hint">Please provide your contact details so we can confirm your order via WhatsApp.</p>
              </div>

              {/* Section 1: Customer Information */}
              <div className="details-sub-section">
                <h4 className="sub-section-title">👤 Customer Information</h4>
                <div className="details-form-grid">
                  <div className="form-field-item">
                    <label className="field-label">Full Name *</label>
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="lux-input-field"
                      required
                    />
                  </div>

                  <div className="form-field-item">
                    <label className="field-label">Phone Number *</label>
                    <input
                      type="tel"
                      placeholder="Enter 10-digit phone number"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value.replace(/\D/g, ''))}
                      className="lux-input-field"
                      required
                    />
                  </div>

                  <div className="form-field-item">
                    <label className="field-label">WhatsApp Number *</label>
                    <input
                      type="tel"
                      placeholder="Enter WhatsApp number"
                      value={customerWhatsApp}
                      onChange={(e) => setCustomerWhatsApp(e.target.value.replace(/\D/g, ''))}
                      className="lux-input-field"
                      required
                    />
                  </div>

                  <div className="form-field-item">
                    <label className="field-label">Email Address (Optional)</label>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="lux-input-field"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Recipient Information (Optional Gift Delivery) */}
              <div className="details-sub-section">
                <h4 className="sub-section-title">🎁 Recipient Information (Optional Gift Delivery)</h4>
                <div className="details-form-grid">
                  <div className="form-field-item">
                    <label className="field-label">Recipient Name</label>
                    <input
                      type="text"
                      placeholder="Enter recipient's name"
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                      className="lux-input-field"
                    />
                  </div>

                  <div className="form-field-item">
                    <label className="field-label">Recipient Phone Number</label>
                    <input
                      type="tel"
                      placeholder="Enter recipient's phone"
                      value={recipientPhone}
                      onChange={(e) => setRecipientPhone(e.target.value.replace(/\D/g, ''))}
                      className="lux-input-field"
                    />
                  </div>
                </div>
              </div>

              {/* Section 3: Delivery Details (Optional) */}
              <div className="details-sub-section">
                <h4 className="sub-section-title">📍 Delivery Details (Optional)</h4>
                <div className="details-form-grid">
                  <div className="form-field-item">
                    <label className="field-label">Preferred Delivery Date</label>
                    <input
                      type="date"
                      min={new Date().toISOString().split('T')[0]}
                      value={deliveryDate}
                      onChange={(e) => setDeliveryDate(e.target.value)}
                      className="lux-input-field"
                    />
                  </div>

                  <div className="form-field-item">
                    <label className="field-label">Preferred Delivery Time</label>
                    <select
                      value={deliveryTime}
                      onChange={(e) => setDeliveryTime(e.target.value)}
                      className="lux-select-field"
                    >
                      <option value="">Select Delivery Slot</option>
                      <option value="Morning">Morning (9 AM - 12 PM)</option>
                      <option value="Afternoon">Afternoon (12 PM - 4 PM)</option>
                      <option value="Evening">Evening (4 PM - 8 PM)</option>
                      <option value="Anytime">Anytime Slot</option>
                    </select>
                  </div>

                  <div className="form-field-item full-width">
                    <label className="field-label">Delivery Address</label>
                    <textarea
                      rows={3}
                      placeholder="Enter full street address, apartment/suite, landmark, city, and pincode..."
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      className="lux-textarea-field"
                    />
                  </div>
                </div>
              </div>

              {/* Section 4: Order Notes */}
              <div className="details-sub-section">
                <h4 className="sub-section-title">📝 Order Notes</h4>
                <div className="details-form-grid">
                  <div className="form-field-item full-width">
                    <textarea
                      rows={3}
                      placeholder="Any special instructions for your order? (Optional)"
                      value={orderNotes}
                      onChange={(e) => setOrderNotes(e.target.value)}
                      className="lux-textarea-field"
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Premium Sticky Order Summary Panel */}
          <div className="customizer-summary-col">
            <div className="summary-sticky-card">
              <h3 className="summary-title">🪄 Order Summary</h3>

              <div className="summary-details-list">
                <div className="summary-item">
                  <span className="summary-label">Selected Product:</span>
                  <span className="summary-val highlight-gold">
                    {selectedDesign ? selectedDesign : <em className="none-tag">None Selected</em>}
                  </span>
                </div>

                <div className="summary-item">
                  <span className="summary-label">Shape / Format:</span>
                  <span className="summary-val">
                    {shape && shape !== 'None' ? shape : <em className="none-tag">None</em>}
                  </span>
                </div>

                <div className="summary-item">
                  <span className="summary-label">Color & Floral Theme:</span>
                  <span className="summary-val">
                    {colorTheme && colorTheme !== 'None' ? colorTheme : <em className="none-tag">None</em>}
                  </span>
                </div>

                <div className="summary-item">
                  <span className="summary-label">Ribbon Color:</span>
                  <span className="summary-val">
                    {ribbonColor && ribbonColor !== 'None' ? ribbonColor : <em className="none-tag">None</em>}
                  </span>
                </div>

                <div className="summary-item">
                  <span className="summary-label">Occasion:</span>
                  <span className="summary-val">
                    {occasion && occasion !== 'None' ? occasion : <em className="none-tag">None</em>}
                  </span>
                </div>

                <div className="summary-divider"></div>

                <div className="summary-item">
                  <span className="summary-label">Customer:</span>
                  <span className="summary-val">
                    {customerName.trim() ? customerName : <em className="none-tag">Not entered</em>}
                  </span>
                </div>

                <div className="summary-item">
                  <span className="summary-label">WhatsApp:</span>
                  <span className="summary-val">
                    {customerWhatsApp.trim() ? customerWhatsApp : <em className="none-tag">Not entered</em>}
                  </span>
                </div>
              </div>

              <div className="summary-actions">
                <button
                  type="button"
                  className="btn btn-outline-gold w-full"
                  onClick={() => {
                    setSelectedDesign('');
                    setShape('');
                    setColorTheme('');
                    setRibbonColor('');
                    setOccasion('');
                    setCustomerName('');
                    setCustomerPhone('');
                    setCustomerWhatsApp('');
                    setCustomerEmail('');
                    setRecipientName('');
                    setRecipientPhone('');
                    setDeliveryDate('');
                    setDeliveryTime('');
                    setDeliveryAddress('');
                    setOrderNotes('');
                  }}
                >
                  <FaMagic /> RESET CHOICES
                </button>

                <button
                  type="button"
                  className="btn btn-whatsapp-order w-full"
                  onClick={handleWhatsAppSend}
                >
                  <FaWhatsapp /> ORDER ON WHATSAPP
                </button>
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

      {lightboxIndex !== null && (
        <div className="tw-lightbox-backdrop" onClick={closeLightbox}>
          <div className="tw-lightbox-modal" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close-btn" onClick={closeLightbox} title="Close Preview (ESC)">
              <FaTimes />
            </button>

            <button className="lightbox-nav-btn prev-btn" onClick={prevLightbox} title="Previous (Left Arrow)">
              <FaChevronLeft />
            </button>

            <div className="lightbox-content-box">
              <div className="lightbox-img-holder">
                <img 
                  src={RESINART_DESIGNS[lightboxIndex].image} 
                  alt={RESINART_DESIGNS[lightboxIndex].name} 
                  className="lightbox-full-img"
                />
              </div>
              <div className="lightbox-info-bar">
                <span className="lightbox-counter">{lightboxIndex + 1} / {RESINART_DESIGNS.length}</span>
                <h3 className="lightbox-title">{RESINART_DESIGNS[lightboxIndex].icon} {RESINART_DESIGNS[lightboxIndex].name}</h3>
                <p className="lightbox-desc-text">{RESINART_DESIGNS[lightboxIndex].desc}</p>
              </div>
            </div>

            <button className="lightbox-nav-btn next-btn" onClick={nextLightbox} title="Next (Right Arrow)">
              <FaChevronRight />
            </button>
          </div>
        </div>
      )}

      <style>{`
        .customizer-section {
          padding: 110px 0 110px 0;
          background: radial-gradient(ellipse at top center, #FFFDF8 0%, #FCFAF7 50%, #F8F3EA 100%);
          position: relative;
          box-shadow: inset 0 1px 0 rgba(200, 155, 60, 0.15), 0 20px 60px rgba(45, 37, 35, 0.03);
        }

        .customizer-section::before {
          content: '';
          position: absolute;
          top: 40px;
          left: 50%;
          transform: translateX(-50%);
          width: 600px;
          height: 350px;
          background: radial-gradient(circle, rgba(200, 155, 60, 0.018) 0%, rgba(200, 155, 60, 0) 70%);
          pointer-events: none;
          z-index: 0;
        }

        .hero-header-wrap {
          max-width: 960px;
          margin: 0 auto 3rem auto;
          text-align: center;
          position: relative;
          z-index: 1;
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

        .tw-hero-description {
          font-family: var(--font-sans);
          font-size: 20px;
          line-height: 1.8;
          letter-spacing: 0.2px;
          color: rgba(45, 37, 35, 0.88);
          max-width: 750px;
          width: 100%;
          margin: 0 auto 50px auto;
          text-align: center;
          opacity: 0;
          animation: heroFadeUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.3s forwards;
        }

        .gold-highlight {
          color: #C89B3C;
          font-weight: 600;
          text-decoration: none;
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
          display: flex;
          align-items: center;
          justify-content: center;
          filter: drop-shadow(0 0 6px rgba(200, 155, 60, 0.3));
          line-height: 1;
        }

        .tw-brand-tagline {
          font-family: var(--font-serif);
          font-style: italic;
          font-size: 22px;
          font-weight: 500;
          line-height: 1.7;
          letter-spacing: 0.3px;
          color: rgba(45, 37, 35, 0.94);
          opacity: 0.92;
          text-align: center;
          margin-top: 50px;
          margin-bottom: 55px;
          animation: heroFadeUp 0.75s cubic-bezier(0.22, 1, 0.36, 1) 0.4s forwards;
        }

        .tw-brand-tagline .quote-mark {
          color: #C89B3C;
          font-family: var(--font-serif);
          font-size: 26px;
          font-weight: 700;
          font-style: normal;
          margin: 0 4px;
        }

        @media (max-width: 991px) {
          .tw-hero-title { font-size: 44px; }
          .tw-hero-description {
            font-size: 18px;
            max-width: 650px;
            margin-bottom: 40px;
          }

          .tw-brand-tagline {
            font-size: 20px;
            margin-top: 40px;
            margin-bottom: 45px;
          }
        }

        @media (max-width: 576px) {
          .customizer-section { padding: 75px 0 75px 0; }
          .tw-hero-subtitle { margin-bottom: 20px; }
          .tw-hero-title { font-size: 34px; margin-bottom: 24px; }
          .tw-hero-description {
            font-size: 16px;
            max-width: 90%;
            margin-bottom: 30px;
          }

          .tw-hero-divider {
            margin: 35px auto 35px auto;
            gap: 12px;
          }

          .divider-line {
            width: 60px;
          }

          .divider-motif {
            font-size: 22px;
          }

          .tw-brand-tagline {
            font-size: 18px;
            margin-top: 35px;
            margin-bottom: 35px;
          }
        }

        .special-features-bar {
          max-width: 900px;
          margin: 0 auto 4.5rem auto;
          padding: 24px 32px;
          border: 1px solid rgba(200, 155, 60, 0.22);
          border-radius: 20px;
          background: #FFFDF8;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.04);
          opacity: 0;
          animation: heroFadeUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.5s forwards;
          position: relative;
          z-index: 1;
        }

        @media (max-width: 576px) {
          .special-features-bar {
            padding: 18px 14px;
            margin-bottom: 3.5rem;
          }
        }

        .features-flex {
          display: flex;
          flex-wrap: wrap;
          gap: 16px 20px;
          justify-content: center;
          align-items: center;
          max-width: 840px;
          margin: 0 auto;
        }

        .feature-pill {
          font-family: var(--font-sans);
          font-weight: 500;
          font-size: 15px;
          color: #2D2523;
          background: #FFFDF8;
          border: 1px solid rgba(200, 155, 60, 0.2);
          border-radius: 50px;
          padding: 10px 22px;
          min-height: 46px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 300ms ease;
          user-select: none;
          box-sizing: border-box;
        }

        .feature-pill:hover {
          background: #FFF9EE;
          border-color: #C89B3C;
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 6px 20px rgba(200, 155, 60, 0.16);
        }

        @media (prefers-reduced-motion: reduce) {
          .tw-hero-subtitle,
          .tw-hero-title,
          .tw-hero-description,
          .tw-hero-divider,
          .tw-brand-tagline,
          .special-features-bar {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
          .feature-pill:hover {
            transform: none !important;
          }
        }

        @keyframes heroFadeUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .customizer-grid {
          display: grid;
          grid-template-columns: 70% 30%;
          gap: 2rem;
          align-items: start;
        }

        @media (max-width: 992px) {
          .customizer-grid {
            grid-template-columns: 1fr;
          }
        }

        .customizer-form-col {
          width: 100%;
        }

        .customizer-summary-col {
          width: 100%;
        }

        .summary-sticky-card {
          position: sticky;
          top: 100px;
          background: #FFFFFF;
          border-radius: 20px;
          border: 1px solid #E8C86A;
          box-shadow: 0 10px 30px rgba(110, 58, 70, 0.08);
          padding: 1.5rem;
          z-index: 10;
        }

        .summary-title {
          font-family: 'Cormorant Garamond', 'Playfair Display', Georgia, serif;
          font-size: 1.5rem;
          font-weight: 700;
          color: #3D2B1F;
          margin-bottom: 1.25rem;
          border-bottom: 1px solid rgba(232, 200, 106, 0.3);
          padding-bottom: 0.75rem;
        }

        .summary-details-list {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          margin-bottom: 1.5rem;
        }

        .summary-item {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          font-size: 0.9rem;
          gap: 0.5rem;
        }

        .summary-label {
          font-weight: 600;
          color: #5C3D2E;
          flex-shrink: 0;
        }

        .summary-val {
          font-weight: 500;
          color: #2C2224;
          text-align: right;
          word-break: break-word;
        }

        .summary-val.highlight-gold {
          color: var(--rose-primary);
          font-weight: 600;
        }

        .none-tag {
          color: #9CA3AF;
          font-style: italic;
          font-weight: 400;
        }

        .summary-divider {
          height: 1px;
          background: rgba(232, 200, 106, 0.3);
          margin: 0.25rem 0;
        }

        .summary-actions {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .btn-outline-gold {
          background: #FFFFFF;
          color: var(--gold-dark);
          border: 1px solid #E8C86A;
          border-radius: 50px;
          padding: 0.75rem 1rem;
          font-weight: 600;
          font-size: 0.85rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          cursor: pointer;
          transition: all 0.25s ease;
          letter-spacing: 0.05em;
        }

        .btn-outline-gold:hover {
          background: var(--gold-soft-gradient);
          border-color: var(--gold-primary);
        }

        .btn-whatsapp-order {
          background: #25D366;
          color: #FFFFFF;
          border: none;
          border-radius: 50px;
          padding: 0.75rem 1rem;
          font-weight: 700;
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          cursor: pointer;
          transition: all 0.25s ease;
          box-shadow: 0 4px 12px rgba(37, 211, 102, 0.25);
          letter-spacing: 0.05em;
        }

        .btn-whatsapp-order:hover {
          background: #1DA851;
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(37, 211, 102, 0.35);
        }

        .flavor-card {
          position: relative;
        }

        .resin-radio-circle {
          position: absolute;
          top: 14px;
          right: 14px;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #FFFFFF;
          border: 2px solid #D1D5DB;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 5;
          transition: all 0.25s ease;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
        }

        .resin-radio-circle.selected {
          background: #E8C86A;
          border-color: #E8C86A;
          box-shadow: 0 0 10px rgba(232, 200, 106, 0.6);
        }

        .resin-radio-check {
          color: #FFFFFF;
          font-size: 11px;
        }

        .special-features-bar {
          padding: 1rem 1.5rem;
          margin-bottom: 2.5rem;
          border: 1px solid var(--gold-border);
          border-radius: var(--radius-md);
          background: #FFFFFF;
        }

        .features-flex {
          display: flex;
          flex-wrap: wrap;
          gap: 1.25rem;
          justify-content: center;
          align-items: center;
        }

        .feature-pill {
          font-weight: 600;
          font-size: 0.85rem;
          color: var(--text-main);
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }

        .brand-tagline {
          font-family: var(--font-serif);
          font-style: italic;
          color: var(--gold-dark);
          font-size: 1.05rem;
          margin-top: 0.5rem;
          font-weight: 600;
        }

        /* Responsive Grid: 4 columns (≥1200px), 3 columns (992-1199px), 2 columns (768-991px), 1 column (<768px) */
        .products-3col-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          max-width: 1450px;
          margin: 0 auto;
          align-items: start;
        }

        @media (max-width: 1199px) {
          .products-3col-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 18px;
          }
        }

        @media (max-width: 991px) {
          .products-3col-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
          }
        }

        @media (max-width: 767px) {
          .products-3col-grid {
            grid-template-columns: repeat(1, 1fr);
            gap: 16px;
          }
        }

        .flavor-card {
          background: #FFFFFF;
          border-radius: 20px;
          padding: 16px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
          border: 1px solid rgba(165, 78, 98, 0.12);
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-self: start;
          height: auto;
          position: relative;
        }

        .flavor-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 14px 32px rgba(165, 78, 98, 0.12);
          border-color: rgba(165, 78, 98, 0.3);
        }

        .flavor-card.selected {
          background: #FFFDF9;
          border-color: var(--gold-primary, #D4AF37);
          box-shadow: 0 10px 28px rgba(212, 175, 55, 0.2);
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
          margin: 0 auto 0.75rem auto;
          border: 1px solid rgba(212, 175, 55, 0.2);
          box-sizing: border-box;
        }

        .flavor-thumb-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
        }

        .flavor-content {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          flex-grow: 0;
          height: auto;
        }

        .flavor-title-row {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
        }

        .flavor-icon {
          font-size: 20px;
          line-height: 1.2;
          flex-shrink: 0;
        }

        .flavor-serif-title {
          font-family: 'Cormorant Garamond', 'Playfair Display', Georgia, serif;
          font-size: 24px;
          font-weight: 700;
          color: #2C2224;
          line-height: 1.25;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .click-view-details-cta {
          display: flex;
          align-items: center;
          gap: 5px;
          margin-top: 8px;
          padding: 8px 0;
          color: #B14F68;
          font-size: 14px;
          font-weight: 600;
          line-height: 1.2;
          cursor: pointer;
          transition: color 0.25s ease;
          user-select: none;
        }

        .chevron-rotate-icon {
          font-size: 12px;
          font-weight: 700;
          line-height: 1;
          display: inline-block;
          transition: transform 300ms ease;
        }

        .chevron-rotate-icon.rotated {
          transform: rotate(180deg);
        }

        .flavor-card:hover .click-view-details-cta {
          color: #8C3A4F;
        }

        .card-expanded-drawer {
          max-height: 0;
          overflow: hidden;
          opacity: 0;
          transition: max-height 300ms ease, opacity 300ms ease, margin-top 300ms ease;
          margin-top: 0;
        }

        .card-expanded-drawer.open {
          max-height: 600px;
          opacity: 1;
          margin-top: 0.85rem;
          padding-top: 0.85rem;
          border-top: 1px dashed rgba(165, 78, 98, 0.2);
        }

        .drawer-inner-content {
          font-size: 0.85rem;
          color: #4A3E40;
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
          text-align: left;
        }

        .drawer-desc {
          font-size: 0.85rem;
          line-height: 1.45;
          color: #3C2E31;
          margin: 0;
        }

        .drawer-info-block h5 {
          font-size: 0.82rem;
          font-weight: 700;
          color: #A54E62;
          margin: 0 0 0.25rem 0;
        }

        .drawer-info-block ul {
          margin: 0;
          padding-left: 1rem;
          line-height: 1.4;
          font-size: 0.8rem;
        }

        .drawer-info-block p {
          margin: 0;
          font-size: 0.8rem;
          color: #665558;
        }

        .btn-whatsapp-card-order {
          background: #25D366;
          color: #FFFFFF;
          border: none;
          padding: 0.55rem 1rem;
          border-radius: 12px;
          font-weight: 700;
          font-size: 0.85rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          margin-top: 0.4rem;
          transition: background 0.2s ease, transform 0.2s ease;
          cursor: pointer;
          width: 100%;
        }

        .btn-whatsapp-card-order:hover {
          background: #1DA851;
          transform: translateY(-2px);
        }

        /* Customer & Delivery Details Card */
        .cust-delivery-details-card {
          margin-top: 2.25rem;
          background: #FFFFFF;
          border: 1px solid #E8C86A;
          border-radius: 20px;
          padding: 32px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
        }

        .card-section-header h3 {
          font-family: 'Cormorant Garamond', 'Playfair Display', Georgia, serif;
          font-size: 1.5rem;
          font-weight: 700;
          color: #3D2B1F;
          margin: 0 0 0.25rem 0;
        }

        .card-section-header .step-hint {
          margin-bottom: 1.75rem;
          color: #776669;
          font-size: 0.9rem;
        }

        .details-sub-section {
          margin-bottom: 1.75rem;
        }

        .details-sub-section:last-child {
          margin-bottom: 0;
        }

        .sub-section-title {
          font-size: 1.05rem;
          font-weight: 700;
          color: #5C3D2E;
          margin: 0 0 1.25rem 0;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .details-form-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }

        @media (max-width: 767px) {
          .details-form-grid {
            grid-template-columns: 1fr;
            gap: 18px;
          }

          .cust-delivery-details-card {
            padding: 1.5rem 1.25rem;
          }
        }

        .form-field-item {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .form-field-item.full-width {
          grid-column: 1 / -1;
        }

        .field-label {
          font-size: 0.9rem;
          font-weight: 700;
          color: #3D2B1F;
          letter-spacing: 0.01em;
        }

        .lux-input-field,
        .lux-select-field {
          height: 52px;
          width: 100%;
          background: #FFFFFF;
          border: 1px solid #E5E7EB;
          border-radius: 12px;
          padding: 0 16px;
          font-size: 16px;
          color: #1F2937;
          font-family: inherit;
          box-sizing: border-box;
          outline: none;
          transition: border-color 0.25s ease, box-shadow 0.25s ease;
        }

        .lux-textarea-field {
          width: 100%;
          background: #FFFFFF;
          border: 1px solid #E5E7EB;
          border-radius: 12px;
          padding: 16px;
          font-size: 16px;
          color: #1F2937;
          font-family: inherit;
          box-sizing: border-box;
          outline: none;
          resize: vertical;
          min-height: 100px;
          transition: border-color 0.25s ease, box-shadow 0.25s ease;
        }

        .lux-input-field::placeholder,
        .lux-textarea-field::placeholder {
          color: #9CA3AF;
        }

        .lux-input-field:focus,
        .lux-select-field:focus,
        .lux-textarea-field:focus {
          border-color: #E8C86A;
          box-shadow: 0 0 0 3px rgba(232, 200, 106, 0.25);
        }
      `}</style>
    </section>
  );
};

export default ResinArtCustomizer;
