import React, { useState, useEffect } from 'react';
import { FaWhatsapp, FaCheck, FaHeart, FaStar, FaMagic, FaGift, FaUser, FaPhone, FaEnvelope, FaMapMarkerAlt, FaCalendarAlt, FaClock, FaGem, FaChevronDown, FaChevronUp, FaTimes, FaChevronLeft, FaChevronRight, FaSearchPlus } from 'react-icons/fa';
import WhatsAppModal from './WhatsAppModal';

export const THREADWORK_DESIGNS = [
  {
    id: 'tw-bridal-red',
    name: 'Royal Peacock Silk Thread Bridal Bangle Set',
    icon: '🧵',
    desc: 'Luxurious handcrafted royal blue silk thread bridal bangles featuring antique peacock motifs, premium kundan stones, sparkling crystals, and traditional temple-inspired detailing. Perfect for weddings, receptions, and festive occasions.',
    image: '/blue_peacock_bangles.jpg'
  },
  {
    id: 'tw-purple-velvet',
    name: 'Royal Emerald Coin Silk Thread Bridal Bangle Set',
    icon: '💚',
    desc: 'Handcrafted emerald green silk thread bridal bangles featuring antique gold coin motifs, ruby-red stones, crystal embellishments, and traditional South Indian temple-inspired detailing. Perfect for weddings, bridal ceremonies, and festive occasions.',
    image: '/emerald_coin_bangles.jpg'
  },
  {
    id: 'tw-kundan-cuffs',
    name: 'Emerald Peacock Silk Thread Bangles',
    icon: '🦚',
    desc: 'Elegant handcrafted emerald green silk thread bangles featuring antique peacock motifs, premium kundan stones, sparkling crystals, and traditional gold embellishments. Perfect for weddings, festivals, return gifts, and special occasions.',
    image: '/emerald_peacock_bangles.png'
  },
  {
    id: 'tw-multicolor-set',
    name: 'Royal Emerald Peacock Bridal Bangle Set',
    icon: '✨',
    desc: 'Premium handcrafted emerald green silk thread bridal bangles featuring antique gold peacock motifs, sparkling mirror kundan stones, crystal embellishments, and intricate traditional detailing. A luxurious choice for weddings, bridal ceremonies, festivals, and special occasions.',
    image: '/royal_emerald_peacock_set.jpg'
  },
  {
    id: 'tw-floral-thread',
    name: 'Multicolor Designer Silk Thread Bangle Collection',
    icon: '🌈',
    desc: 'Vibrant handcrafted silk thread bangles in royal blue, mustard yellow, pink, emerald green, and crimson red, beautifully embellished with floral kundan stones, gold accents, and elegant traditional detailing. Perfect for festivals, bridal favors, return gifts, and everyday ethnic wear.',
    image: '/multicolor_bangles_collection.jpg'
  },
  {
    id: 'tw-bridal-chooda',
    name: 'Lotus Kundan Designer Bangles',
    icon: '🪷',
    desc: 'Elegant handcrafted silk thread bangles featuring lotus-shaped ruby pink kundan stones, emerald green accents, antique gold detailing, and sparkling crystal embellishments. A graceful design perfect for weddings, festive occasions, traditional ceremonies, and premium gifting.',
    image: '/lotus_kundan_bangles.png'
  },
  {
    id: 'tw-pearl-bead',
    name: 'Designer Silk Thread Latkans',
    icon: '✨',
    desc: 'Elegant handcrafted silk thread latkans decorated with premium kundan stones, pearl detailing, and vibrant silk colors. Perfect for bridal blouses, sarees, lehengas, return gifts, potli bags, and festive decorations. Each piece is handmade with fine craftsmanship and premium materials.',
    image: '/designer_silk_latkans.png'
  },
  {
    id: 'tw-customized-name',
    name: 'Designer Silk Thread Finger Rings',
    icon: '💍',
    desc: 'Beautiful handcrafted silk thread finger rings featuring premium kundan stone work, vibrant silk thread colors, pearl embellishments, and elegant handcrafted detailing. Lightweight, stylish, and perfect for weddings, festive celebrations, return gifts, mehendi ceremonies, and everyday traditional wear.',
    image: '/designer_silk_finger_rings.png'
  },
  {
    id: 'tw-pearl-bridal',
    name: 'Handcrafted Silk Thread Hair Band',
    icon: '🌸',
    desc: 'Premium handmade silk thread hair band featuring an elegant floral kundan centerpiece with antique gold detailing, emerald green stones, and sparkling crystal accents. Lightweight, comfortable, and perfect for weddings, festive occasions, traditional wear, and special celebrations.',
    image: '/silk_thread_hair_band.png'
  },
  {
    id: 'tw-temple-silk',
    name: 'Handcrafted Floral Silk Thread Hair Band',
    icon: '🌺',
    desc: 'Beautiful handmade silk thread hair band featuring a floral kundan centerpiece with antique gold detailing, pearl accents, and a ruby-pink center stone. Designed for weddings, festive occasions, traditional wear, and elegant everyday styling. Comfortable, lightweight, and crafted with premium-quality materials.',
    image: '/floral_silk_thread_hair_band.png'
  }
];

export const THREADWORK_HIGHLIGHTS = [
  '🧵 Silk Thread Bangles',
  '✨ Kundan & Stone Work',
  '💎 Pearl & Bead Designs',
  '👰 Bridal Wedding Sets',
  '🎨 Custom Color Combinations',
  '💝 Personalized Gift Packaging'
];

const ThreadWorkCustomizer = ({ onSelectProduct }) => {
  // Customization Choice State (Single radio selection by default)
  const [selectedDesign, setSelectedDesign] = useState('');
  const [wristSize, setWristSize] = useState('None');
  const [colorTheme, setColorTheme] = useState('None');
  const [packagingStyle, setPackagingStyle] = useState('None');
  const [ribbonColor, setRibbonColor] = useState('None');
  const [occasion, setOccasion] = useState('None');

  // Customer & Recipient Details State
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerWhatsApp, setCustomerWhatsApp] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [recipientPhone, setRecipientPhone] = useState('');

  // Delivery & Order Notes State (Optional)
  const [deliveryDate, setDeliveryDate] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [orderNotes, setOrderNotes] = useState('');
  const [waModalOpen, setWaModalOpen] = useState(false);
  const [waOrderText, setWaOrderText] = useState('');
  const [expandedDesignId, setExpandedDesignId] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const toggleCardExpansion = (id, e) => {
    if (e) e.stopPropagation();
    setExpandedDesignId((prev) => (prev === id ? null : id));
  };

  const handleDirectCardWhatsAppOrder = (item) => {
    let text = `✨ *Direct Bangle Order - Divya Handcrafts* ✨\n`;
    text += `----------------------------------------\n`;
    text += `🧵 *Design:* ${item.name}\n`;
    text += `🏷️ *Category:* Thread Work Bangle Set\n`;
    text += `📜 *Description:* ${item.desc}\n\n`;
    text += `Please let me know how to proceed with size choices, pricing, and delivery slot!`;
    setWaOrderText(text);
    setWaModalOpen(true);
  };

  const openLightbox = (e, idx) => {
    e.stopPropagation();
    setLightboxIndex(idx);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextLightbox = (e) => {
    if (e) e.stopPropagation();
    setLightboxIndex((prev) => (prev !== null ? (prev + 1) % THREADWORK_DESIGNS.length : null));
  };

  const prevLightbox = (e) => {
    if (e) e.stopPropagation();
    setLightboxIndex((prev) => (prev !== null ? (prev - 1 + THREADWORK_DESIGNS.length) % THREADWORK_DESIGNS.length : null));
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

  const selectDesign = (designName) => {
    setSelectedDesign((prev) => (prev === designName ? '' : designName));
  };

  const handleCardClick = (tw) => {
    selectDesign(tw.name);
  };

  const handleWhatsAppSend = (e) => {
    if (e) e.preventDefault();

    if (!selectedDesign) {
      alert('Please select a Thread Work style by clicking a card above.');
      return;
    }

    if (!customerName || !customerPhone || !customerWhatsApp) {
      alert('Please enter your Full Name, Phone Number, and WhatsApp Number in Customer Details.');
      return;
    }

    let text = `✨ *Custom Thread Work Order - Divya Handcrafts* ✨\n`;
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

    text += `\n🧵 *Thread Work Customization Options:*\n`;
    text += `- Selected Style: ${selectedDesign}\n`;
    if (wristSize && wristSize !== 'None') text += `- Wrist Size: ${wristSize}\n`;
    if (colorTheme && colorTheme !== 'None') text += `- Color Theme: ${colorTheme}\n`;
    if (packagingStyle && packagingStyle !== 'None') text += `- Packaging Style: ${packagingStyle}\n`;
    if (ribbonColor && ribbonColor !== 'None') text += `- Ribbon Color: ${ribbonColor}\n`;
    if (occasion && occasion !== 'None') text += `- Occasion: ${occasion}\n`;

    if (orderNotes) {
      text += `\n📝 *Special Instructions:*\n"${orderNotes}"\n`;
    }

    text += `----------------------------------------\n`;
    text += `*Made With Love, Made For You - Divya Handcrafts*\n`;
    text += `Please let me know how to proceed with pricing and delivery slot!`;

    setWaOrderText(text);
    setWaModalOpen(true);
  };

  return (
    <section id="threadwork-customizer" className="customizer-section section-padding">
      <div className="container">
        {/* Section Header */}
        <div className="section-header text-center" style={{ marginBottom: '3rem' }}>
          <div className="section-subtitle">🧵 HANDMADE THREAD WORK STUDIO</div>
          <h2 className="section-title">Customize Your Thread Work</h2>
          <p className="section-description">
            Create your dream handcrafted thread work with premium silk threads, elegant kundan stones, pearls, zardosi work, and personalized color combinations. Every piece is handmade with love and customized for weddings, festivals, and special occasions.
          </p>
          <div className="brand-tagline">"Made With Love, Made For You."</div>
        </div>

        {/* Highlights Bar */}
        <div className="special-features-bar glass-card mb-4">
          <div className="features-flex">
            {THREADWORK_HIGHLIGHTS.map((feat, idx) => (
              <span key={idx} className="feature-pill">
                <FaGem className="text-gold mr-1" /> {feat}
              </span>
            ))}
          </div>
        </div>

        <div className="customizer-grid">
          {/* Left Column: Interactive Form Steps */}
          <div className="customizer-form-col">
            
            {/* Choose Thread Work Designs */}
            <div className="options-card glass-card">
              <div className="card-step-header">
                <h3>🧵 Choose Your Thread Work Style</h3>
                <p className="step-hint">Click cards to select your favorite thread work styles.</p>
              </div>

              <div className="tw-5col-grid">
                {THREADWORK_DESIGNS.map((tw, idx) => {
                  const isSelected = selectedDesign === tw.name;
                  const isExpanded = expandedDesignId === tw.id;
                  return (
                    <div
                      key={tw.id}
                      className={`flavor-card ${isSelected ? 'selected' : ''} ${isExpanded ? 'card-is-expanded' : ''}`}
                      onClick={() => selectDesign(tw.name)}
                    >
                      {/* Top-Right Circular Radio Button */}
                      <div className={`tw-radio-circle ${isSelected ? 'selected' : ''}`}>
                        {isSelected && <FaCheck className="tw-radio-check" />}
                      </div>

                      <div 
                        className="flavor-img-wrap" 
                        onClick={(e) => openLightbox(e, idx)} 
                        title="Click to view full-screen photo"
                      >
                        <img 
                          src={tw.image} 
                          alt={tw.name} 
                          className="flavor-thumb-img"
                          loading="lazy"
                        />
                      </div>

                      <div className="flavor-content">
                        <div className="flavor-title-row">
                          <span className="flavor-icon">{tw.icon}</span>
                          <h4>{tw.name}</h4>
                        </div>

                        <div 
                          className="card-toggle-details-btn"
                          onClick={(e) => toggleCardExpansion(tw.id, e)}
                        >
                          <span className="toggle-text">{isExpanded ? 'Hide Details' : 'Click to View Details'}</span>
                          <FaChevronDown className={`toggle-chevron ${isExpanded ? 'rotated' : ''}`} />
                        </div>

                        {/* Smooth Accordion Expanded Drawer */}
                        {isExpanded && (
                          <div className="card-expanded-drawer open">
                            <div className="drawer-inner-content">
                              <p className="drawer-desc">{tw.desc}</p>

                              <div className="drawer-info-block">
                                <h5>✨ Bangle Specs & Materials:</h5>
                                <ul>
                                  <li>✨ 100% Hand-embroidered Zardosi & Threadwork</li>
                                  <li>💎 Premium Velvet & Silk Base with Kundan Beads</li>
                                  <li>📏 Sizes Available: 2.2, 2.4, 2.6, 2.8 & Custom</li>
                                </ul>
                              </div>

                              <div className="drawer-info-block">
                                <h5>🌿 Care Instructions:</h5>
                                <p>Keep away from direct water or perfume. Store in a soft pouch to preserve metallic thread shine.</p>
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

            {/* Step 2: Customization Options */}
            <div className="cust-delivery-details-card" style={{ marginTop: '2.25rem' }}>
              <div className="card-section-header">
                <h3>🎁 Customization Options</h3>
                <p className="step-hint">Specify your preferences for size, theme, ribbon, and occasion.</p>
              </div>

              <div className="details-form-grid">
                <div className="form-field-item">
                  <label className="field-label">📐 Wrist / Bangle Size</label>
                  <select 
                    value={wristSize} 
                    onChange={(e) => setWristSize(e.target.value)}
                    className="lux-select-field"
                  >
                    <option value="None">None (Default)</option>
                    <option value="2.2 (Small)">2.2 (Small)</option>
                    <option value="2.4 (Standard Medium)">2.4 (Standard Medium)</option>
                    <option value="2.6 (Large)">2.6 (Large)</option>
                    <option value="2.8 (Extra Large)">2.8 (Extra Large)</option>
                    <option value="Custom Wrist Measure">Custom Wrist Measure</option>
                  </select>
                </div>

                <div className="form-field-item">
                  <label className="field-label">🎨 Color Theme & Palette</label>
                  <select 
                    value={colorTheme} 
                    onChange={(e) => setColorTheme(e.target.value)}
                    className="lux-select-field"
                  >
                    <option value="None">None (Default)</option>
                    <option value="Crimson Red & Gold">Crimson Red & Gold</option>
                    <option value="Royal Purple & Gold">Royal Purple & Gold</option>
                    <option value="Emerald Green & Kundan">Emerald Green & Kundan</option>
                    <option value="Blush Rose & Pearls">Blush Rose & Pearls</option>
                    <option value="Multicolor Festive Mix">Multicolor Festive Mix</option>
                  </select>
                </div>

                <div className="form-field-item">
                  <label className="field-label">🎁 Packaging Style</label>
                  <select 
                    value={packagingStyle} 
                    onChange={(e) => setPackagingStyle(e.target.value)}
                    className="lux-select-field"
                  >
                    <option value="None">None (Default)</option>
                    <option value="Boutique Premium">Boutique Premium</option>
                    <option value="Bridal Velvet Box">Bridal Velvet Box</option>
                    <option value="Wedding Favor Hamper">Wedding Favor Hamper</option>
                  </select>
                </div>

                <div className="form-field-item">
                  <label className="field-label">🎀 Ribbon Color</label>
                  <select 
                    value={ribbonColor} 
                    onChange={(e) => setRibbonColor(e.target.value)}
                    className="lux-select-field"
                  >
                    <option value="None">None (Default)</option>
                    <option value="Gold">Gold</option>
                    <option value="Rose Gold">Rose Gold</option>
                    <option value="Silver">Silver</option>
                    <option value="Red">Red</option>
                    <option value="Pink">Pink</option>
                    <option value="White">White</option>
                  </select>
                </div>

                <div className="form-field-item full-width">
                  <label className="field-label">🎉 Occasion</label>
                  <select 
                    value={occasion} 
                    onChange={(e) => setOccasion(e.target.value)}
                    className="lux-select-field"
                  >
                    <option value="None">None (Default)</option>
                    <option value="Wedding / Reception">Wedding / Reception</option>
                    <option value="Mehendi / Sangeet">Mehendi / Sangeet</option>
                    <option value="Anniversary">Anniversary</option>
                    <option value="Festival / Puja">Festival / Puja</option>
                    <option value="Bridal Gift">Bridal Gift</option>
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
              <h3 className="summary-title">📋 Order Summary</h3>

              <div className="summary-details-list">
                <div className="summary-item">
                  <span className="summary-label">Selected Style:</span>
                  <span className="summary-val highlight-gold">
                    {selectedDesign ? selectedDesign : <em className="none-tag">None Selected</em>}
                  </span>
                </div>

                <div className="summary-item">
                  <span className="summary-label">Wrist Size:</span>
                  <span className="summary-val">
                    {wristSize && wristSize !== 'None' ? wristSize : <em className="none-tag">None</em>}
                  </span>
                </div>

                <div className="summary-item">
                  <span className="summary-label">Color Theme:</span>
                  <span className="summary-val">
                    {colorTheme && colorTheme !== 'None' ? colorTheme : <em className="none-tag">None</em>}
                  </span>
                </div>

                <div className="summary-item">
                  <span className="summary-label">Packaging Style:</span>
                  <span className="summary-val">
                    {packagingStyle && packagingStyle !== 'None' ? packagingStyle : <em className="none-tag">None</em>}
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
                  <span className="summary-label">Customer Name:</span>
                  <span className="summary-val">
                    {customerName.trim() ? customerName : <em className="none-tag">Not entered</em>}
                  </span>
                </div>

                <div className="summary-item">
                  <span className="summary-label">WhatsApp Number:</span>
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
                    setWristSize('None');
                    setColorTheme('None');
                    setPackagingStyle('None');
                    setRibbonColor('None');
                    setOccasion('None');
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
                  <FaMagic /> ✨ RESET CHOICES
                </button>

                <button
                  type="button"
                  className="btn btn-whatsapp-order w-full"
                  onClick={handleWhatsAppSend}
                >
                  <FaWhatsapp /> 🟢 ORDER ON WHATSAPP
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
                  src={THREADWORK_DESIGNS[lightboxIndex].image} 
                  alt={THREADWORK_DESIGNS[lightboxIndex].name} 
                  className="lightbox-full-img"
                />
              </div>
              <div className="lightbox-info-bar">
                <span className="lightbox-counter">{lightboxIndex + 1} / {THREADWORK_DESIGNS.length}</span>
                <h3 className="lightbox-title">{THREADWORK_DESIGNS[lightboxIndex].icon} {THREADWORK_DESIGNS[lightboxIndex].name}</h3>
                <p className="lightbox-desc-text">{THREADWORK_DESIGNS[lightboxIndex].desc}</p>
              </div>
            </div>

            <button className="lightbox-nav-btn next-btn" onClick={nextLightbox} title="Next (Right Arrow)">
              <FaChevronRight />
            </button>
          </div>
        </div>
      )}

      <style>{`
        .flavor-card {
          position: relative;
        }

        .tw-radio-circle {
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

        .tw-radio-circle.selected {
          background: #E8C86A;
          border-color: #E8C86A;
          box-shadow: 0 0 10px rgba(232, 200, 106, 0.6);
        }

        .tw-radio-check {
          color: #FFFFFF;
          font-size: 11px;
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
        }

        .btn-outline-gold:hover {
          background: var(--gold-soft-gradient);
          border-color: var(--gold-primary);
        }

        .btn-whatsapp-order {
          background: linear-gradient(135deg, #25D366, #1DA851);
          color: #FFFFFF;
          border: none;
          border-radius: 50px;
          padding: 0.85rem 1rem;
          font-weight: 700;
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          cursor: pointer;
          transition: all 0.25s ease;
          box-shadow: 0 4px 14px rgba(37, 211, 102, 0.35);
        }

        .btn-whatsapp-order:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(37, 211, 102, 0.45);
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
          background: transparent;
          color: var(--gold-dark);
          border: 1px solid #E8C86A;
          border-radius: 12px;
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
          border-radius: 12px;
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
        .tw-5col-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          max-width: 1450px;
          margin: 0 auto;
          align-items: start;
        }

        @media (max-width: 1199px) {
          .tw-5col-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 18px;
          }
        }

        @media (max-width: 991px) {
          .tw-5col-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
          }
        }

        @media (max-width: 767px) {
          .tw-5col-grid {
            grid-template-columns: repeat(1, 1fr);
            gap: 16px;
          }
        }

        .flavor-card {
          background: #FFFFFF;
          border: 1.5px solid rgba(212, 175, 55, 0.3);
          border-radius: 20px;
          padding: 16px;
          cursor: pointer;
          transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-self: start;
          height: auto;
          position: relative;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
        }

        .flavor-card:hover {
          transform: translateY(-4px);
          border-color: var(--gold-primary);
          box-shadow: 0 10px 24px rgba(212, 175, 55, 0.2);
        }

        .flavor-card.selected {
          border-color: var(--rose-primary);
          background: #FFFDF9;
          box-shadow: 0 8px 24px rgba(156, 82, 99, 0.2);
        }

        /* Perfect Square (1:1) Image Container (300px-320px) with 16px Rounded Corners */
        .flavor-img-wrap {
          position: relative;
          width: 100%;
          max-width: 320px;
          aspect-ratio: 1 / 1;
          border-radius: 16px;
          overflow: hidden;
          background: #FFFFFF;
          padding: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 0.75rem auto;
          border: 1px solid rgba(212, 175, 55, 0.2);
          box-sizing: border-box;
          cursor: pointer;
        }

        .flavor-thumb-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: center;
          display: block;
        }

        .selected-tag {
          margin-left: auto;
          background: var(--gold-primary);
          color: #FFFFFF;
          font-size: 0.68rem;
          font-weight: 700;
          padding: 2px 8px;
          border-radius: 12px;
          display: inline-flex;
          align-items: center;
          gap: 3px;
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
          gap: 0.4rem;
          margin-bottom: 0.4rem;
        }

        .flavor-icon {
          font-size: 1.1rem;
          flex-shrink: 0;
        }

        .flavor-title-row h4 {
          font-family: var(--font-serif);
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--text-dark);
          margin: 0;
          line-height: 1.3;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .card-toggle-details-btn {
          display: flex;
          align-items: center;
          gap: 5px;
          margin-top: 8px;
          padding: 8px 0;
          font-size: 14px;
          font-weight: 600;
          color: #B14F68;
          transition: color 0.3s ease;
          user-select: none;
          cursor: pointer;
        }

        .flavor-card:hover .card-toggle-details-btn {
          color: #8C3A4F;
        }

        .toggle-chevron {
          font-size: 12px;
          transition: transform 300ms ease;
        }

        .toggle-chevron.rotated {
          transform: rotate(180deg);
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

        .flavor-desc-expandable {
          overflow: hidden;
          max-height: 0;
          opacity: 0;
          transform: translateY(-6px);
          transition: max-height 0.35s cubic-bezier(0.165, 0.84, 0.44, 1),
                      opacity 0.35s ease,
                      transform 0.35s ease,
                      margin-top 0.35s ease;
          margin-top: 0;
        }

        .flavor-desc-expandable.expanded {
          max-height: 280px;
          opacity: 1;
          transform: translateY(0);
          margin-top: 0.45rem;
          padding-top: 0.35rem;
          border-top: 1px dashed rgba(212, 175, 55, 0.3);
        }

        .flavor-desc {
          font-size: 0.78rem;
          color: var(--text-muted);
          line-height: 1.4;
          margin: 0;
        }

        /* Premium Lightbox Modal Styles */
        .tw-lightbox-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(10, 6, 12, 0.88);
          backdrop-filter: blur(12px);
          z-index: 99999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          animation: fadeIn 0.3s ease;
        }

        .tw-lightbox-modal {
          position: relative;
          width: 100%;
          max-width: 850px;
          max-height: 90vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .lightbox-close-btn {
          position: absolute;
          top: -45px;
          right: 0;
          background: rgba(255, 255, 255, 0.15);
          color: #FFFFFF;
          border: 1px solid rgba(255, 255, 255, 0.3);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          cursor: pointer;
          transition: all 0.3s ease;
          z-index: 10;
        }

        .lightbox-close-btn:hover {
          background: var(--rose-primary);
          color: #FFFFFF;
          transform: scale(1.1);
        }

        .lightbox-nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255, 255, 255, 0.12);
          color: #FFFFFF;
          border: 1px solid rgba(212, 175, 55, 0.4);
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          cursor: pointer;
          transition: all 0.3s ease;
          z-index: 10;
          backdrop-filter: blur(4px);
        }

        .lightbox-nav-btn:hover {
          background: var(--gold-primary);
          color: #FFFFFF;
          transform: translateY(-50%) scale(1.1);
        }

        .lightbox-nav-btn.prev-btn {
          left: -65px;
        }

        .lightbox-nav-btn.next-btn {
          right: -65px;
        }

        @media (max-width: 768px) {
          .lightbox-nav-btn.prev-btn { left: 10px; }
          .lightbox-nav-btn.next-btn { right: 10px; }
        }

        .lightbox-content-box {
          background: #FFFFFF;
          border: 2px solid var(--gold-primary);
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
          display: flex;
          flex-direction: column;
          max-height: 85vh;
          max-width: 800px;
          width: 100%;
        }

        .lightbox-img-holder {
          position: relative;
          width: 100%;
          max-height: 60vh;
          background: #0F0A0F;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .lightbox-full-img {
          max-width: 100%;
          max-height: 60vh;
          object-fit: contain;
        }

        .lightbox-info-bar {
          padding: 1.25rem 1.75rem;
          background: #FFFDF9;
          border-top: 1px solid var(--gold-border);
        }

        .lightbox-counter {
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--rose-primary);
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .lightbox-title {
          font-family: var(--font-serif);
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-dark);
          margin: 0.25rem 0 0.5rem;
        }

        .lightbox-desc-text {
          font-size: 0.88rem;
          color: var(--text-muted);
          line-height: 1.5;
          margin: 0;
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
          height: 56px;
          width: 100%;
          background: #FFFFFF;
          border: 1px solid #E5E7EB;
          border-radius: 14px;
          padding: 0 18px;
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

export default ThreadWorkCustomizer;
