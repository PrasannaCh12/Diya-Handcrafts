import React, { useState } from 'react';
import { FaWhatsapp, FaCheck, FaHeart, FaStar, FaMagic, FaGift, FaEdit, FaRibbon, FaCalendarAlt, FaUser, FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaFileAlt } from 'react-icons/fa';
import WhatsAppModal from './WhatsAppModal';

export const CHOCOLATE_FLAVORS = [
  {
    id: 'flv-milk',
    name: 'Milk Chocolate',
    icon: '🍫',
    desc: 'Smooth and creamy premium milk chocolate crafted with rich cocoa and fresh milk for a classic sweet flavor.',
    ingredients: 'Rich cocoa solids, cocoa butter, milk powder, sugar, natural vanilla.',
    allergens: 'Contains Dairy & Soy.',
    image: '/milk_chocolate.png'
  },
  {
    id: 'flv-dark',
    name: 'Dark Chocolate',
    icon: '🍫',
    desc: 'Rich, intense dark chocolate with a high cocoa content, offering a bold taste and smooth finish.',
    ingredients: '70% Single-origin cocoa mass, cocoa butter, organic cane sugar.',
    allergens: 'Vegan & Dairy-Free options available.',
    image: '/dark_chocolate.png'
  },
  {
    id: 'flv-white',
    name: 'White Chocolate',
    icon: '🤍',
    desc: 'Velvety white chocolate made with premium cocoa butter, delivering a rich, creamy sweetness.',
    ingredients: 'Pure cocoa butter, milk solids, natural Madagascar vanilla, sugar.',
    allergens: 'Contains Dairy.',
    image: '/white_chocolate.png'
  },
  {
    id: 'flv-strawberry',
    name: 'Strawberry Chocolate',
    icon: '🍓',
    desc: 'Creamy chocolate infused with natural strawberry flavor for a fruity and refreshing taste.',
    ingredients: 'White cocoa butter base, freeze-dried strawberry extract, milk solids.',
    allergens: 'Contains Dairy.',
    image: '/strawberry_chocolate.png'
  },
  {
    id: 'flv-pista',
    name: 'Pista (Pistachio) Chocolate',
    icon: '💚',
    desc: 'Premium milk chocolate blended with roasted pistachios for a crunchy, nutty experience.',
    ingredients: 'Milk chocolate cocoa mass, slow-roasted Iranian pistachios, cocoa butter.',
    allergens: 'Contains Tree Nuts & Dairy.',
    image: '/pista_chocolate.png'
  },
  {
    id: 'flv-kunafa',
    name: 'Kunafa Chocolate',
    icon: '🥮',
    desc: 'Delicious chocolate filled with crispy kunafa and rich pistachio cream, inspired by Middle Eastern desserts.',
    ingredients: 'Roasted crispy kataifi pastry threads, pistachio tahini cream, Belgian chocolate shell.',
    allergens: 'Contains Gluten, Tree Nuts & Dairy.',
    image: '/kunafa_chocolate.png'
  }
];

export const CHOCOLATE_ADDONS = [
  { id: 'add-dryfruits', name: 'Mixed Dry Fruits', icon: '🌰', desc: 'California almonds, cashews, pistachios & golden raisins', image: '/mixed_dry_fruits.png' },
  { id: 'add-crispy', name: 'Crispy Rice Balls', icon: '🌾', desc: 'Crunchy golden crispy rice crunchies', image: '/crispy_rice_balls.png' }
];

const ChocolateCustomizer = ({ onSelectProduct }) => {
  // Customization Choice State (Default: Completely blank initially - no pre-selected options)
  const [selectedFlavors, setSelectedFlavors] = useState([]);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [shape, setShape] = useState('');
  const [boxSize, setBoxSize] = useState('');
  const [packagingStyle, setPackagingStyle] = useState('');
  const [ribbonColor, setRibbonColor] = useState('None');
  const [occasion, setOccasion] = useState('None');
  const [customMessage, setCustomMessage] = useState('');

  const [expandedCardId, setExpandedCardId] = useState(null);

  const toggleCardExpansion = (id, e) => {
    if (e) e.stopPropagation();
    setExpandedCardId((prevId) => (prevId === id ? null : id));
  };

  // Customer Details State (Required)
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerWhatsApp, setCustomerWhatsApp] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');

  // Recipient Details State (Optional)
  const [recipientName, setRecipientName] = useState('');
  const [recipientPhone, setRecipientPhone] = useState('');

  // Delivery Details State (Optional)
  const [deliveryDate, setDeliveryDate] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');

  // Order Notes (Optional)
  const [orderNotes, setOrderNotes] = useState('');
  const [waModalOpen, setWaModalOpen] = useState(false);
  const [waOrderText, setWaOrderText] = useState('');

  const toggleFlavor = (flavorName) => {
    if (selectedFlavors.includes(flavorName)) {
      setSelectedFlavors(selectedFlavors.filter((f) => f !== flavorName));
    } else {
      setSelectedFlavors([...selectedFlavors, flavorName]);
    }
  };

  const handleProductDetailClick = (flv, e) => {
    if (e) e.stopPropagation();
    toggleFlavor(flv.name);
    if (onSelectProduct) {
      onSelectProduct({
        id: flv.id,
        title: flv.name,
        name: flv.name,
        category: 'Homemade Chocolates',
        image: flv.image,
        images: [flv.image],
        description: flv.desc,
        price: 999,
        specs: ['100% Homemade Gourmet Chocolate', 'Eggless & Maida-Free Pure Cocoa', 'Custom Box & Ribbon Packaging'],
        customizations: {
          sizes: ['Box of 6 (Standard)', 'Box of 12 (Gift Box)', 'Box of 24 (Luxury Assortment)'],
          colors: ['Dark Cocoa', 'Milk Chocolate Gold', 'White Vanilla', 'Ruby Velvet']
        }
      });
    }
  };

  const toggleAddon = (addonName) => {
    if (selectedAddons.includes(addonName)) {
      setSelectedAddons(selectedAddons.filter((a) => a !== addonName));
    } else {
      setSelectedAddons([...selectedAddons, addonName]);
    }
  };

  const handleWhatsAppSend = (e) => {
    if (e) e.preventDefault();

    if (selectedFlavors.length === 0) {
      alert('Please select at least one chocolate flavor by clicking a flavor card above.');
      return;
    }

    if (!boxSize) {
      alert('Please select a Box Size.');
      return;
    }

    if (!shape) {
      alert('Please select a Chocolate Shape.');
      return;
    }

    if (!packagingStyle) {
      alert('Please select a Packaging Style.');
      return;
    }

    if (!customerName || !customerPhone || !customerWhatsApp) {
      alert('Please enter your Full Name, Phone Number, and WhatsApp Number in Customer Details.');
      return;
    }

    let text = `✨ *Custom Handmade Chocolate Order - Divya Handcrafts* ✨\n`;
    text += `----------------------------------------\n`;
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

    if (deliveryDate || deliveryTime || deliveryAddress) {
      text += `\n🚚 *Delivery Details:*\n`;
      if (deliveryDate) text += `- Delivery Date: ${deliveryDate}\n`;
      if (deliveryTime) text += `- Delivery Time: ${deliveryTime}\n`;
      if (deliveryAddress) text += `- Delivery Address: ${deliveryAddress}\n`;
    }

    text += `\n🍫 *Chocolate Customization Choices:*\n`;
    text += `- Box Size: ${boxSize}\n`;
    text += `- Flavors: ${selectedFlavors.join(', ')}\n`;
    text += `- Add-ons: ${selectedAddons.length > 0 ? selectedAddons.join(', ') : 'None'}\n`;
    text += `- Shape: ${shape}\n`;
    text += `- Packaging Style: ${packagingStyle}\n`;
    if (ribbonColor && ribbonColor !== 'None') {
      text += `- Ribbon Color: ${ribbonColor}\n`;
    }
    if (occasion && occasion !== 'None') {
      text += `- Occasion: ${occasion}\n`;
    }

    if (customMessage) {
      text += `\n💌 *Personalized Gift Message:*\n"${customMessage}"\n`;
    }

    if (orderNotes) {
      text += `\n📝 *Special Instructions:*\n"${orderNotes}"\n`;
    }

    text += `\nHi Divya Handcrafts! I customized this order on your website and would love to place my order!`;

    setWaOrderText(text);
    setWaModalOpen(true);
  };

  return (
    <section id="chocolate-customizer" className="chocolate-customizer-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-subtitle">
            <span style={{ fontSize: '1.1rem' }}>🍫</span> Handmade Confectionery Studio
          </div>
          <h2 className="section-title">Customize Your Handmade Chocolates</h2>
          <p className="section-description">
            Create your <span className="gold-highlight">perfect handmade chocolates</span> with <span className="gold-highlight">premium flavors</span>, <span className="gold-highlight">crunchy add-ons</span>, <span className="gold-highlight">elegant shapes</span>, and <span className="gold-highlight">luxury packaging</span>. Customize every detail with <span className="gold-highlight">personalized ribbons</span> and notes for a <span className="gold-highlight">truly special gift</span>.
          </p>
        </div>

        <div className="customizer-main-grid">
          {/* Left Column: Selector & Details Forms */}
          <div className="customizer-left-panel">
            {/* Step 1: Available Chocolate Flavors */}
            <div className="flavor-header-row">
              <h3>🍫 Available Chocolate Flavors</h3>
              <span className="selected-count-badge">
                {selectedFlavors.length} Flavor{selectedFlavors.length > 1 ? 's' : ''} Selected
              </span>
            </div>

            <div className="flavors-grid">
              {CHOCOLATE_FLAVORS.map((flv) => {
                const isSelected = selectedFlavors.includes(flv.name);
                const isExpanded = expandedCardId === flv.id;
                return (
                  <div
                    key={flv.id}
                    className={`flavor-card ${isSelected ? 'selected' : ''} ${isExpanded ? 'card-is-expanded' : ''}`}
                    onClick={() => toggleFlavor(flv.name)}
                  >
                    <div className="flavor-card-header">
                      <span className="flavor-icon">{flv.icon}</span>
                      <div className={`check-badge ${isSelected ? 'checked' : ''}`}>
                        <FaCheck />
                      </div>
                    </div>

                    <div className="flavor-img-wrap">
                      <img src={flv.image} alt={flv.name} className="flavor-thumb-img" />
                    </div>

                    <h4 className="flavor-title">{flv.name}</h4>

                    <div 
                      className="click-view-details-cta"
                      onClick={(e) => toggleCardExpansion(flv.id, e)}
                    >
                      <span>{isExpanded ? 'Hide Details' : 'Click to View Details'}</span>
                      <span className={`chevron-rotate-icon ${isExpanded ? 'rotated' : ''}`}>⌄</span>
                    </div>

                    {/* Smooth Accordion Expanded Drawer */}
                    {isExpanded && (
                      <div className="card-expanded-drawer open">
                        <div className="drawer-inner-content">
                          <p className="drawer-desc">{flv.desc}</p>

                          <div className="drawer-info-block">
                            <h5>✨ Ingredients & Flavor Notes:</h5>
                            <p>{flv.ingredients}</p>
                          </div>

                          <div className="drawer-info-block">
                            <h5>❄️ Storage & Allergens:</h5>
                            <p>Store in a cool dry place (15-18°C). {flv.allergens}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Step 2: Add-ons */}
            <div className="addons-section-box glass-card" style={{ marginTop: '2.5rem' }}>
              <h3>✨ Optional Add-ons</h3>
              <p className="addons-sub-text">Enhance your chocolates with delicious crunchy toppings:</p>

              <div className="addons-selection-grid">
                {CHOCOLATE_ADDONS.map((add) => {
                  const isSelected = selectedAddons.includes(add.name);
                  return (
                    <div
                      key={add.id}
                      className={`addon-choice-card ${isSelected ? 'active' : ''}`}
                      onClick={() => toggleAddon(add.name)}
                    >
                      {add.image ? (
                        <img src={add.image} alt={add.name} className="addon-thumb-img" />
                      ) : (
                        <div className="addon-icon-badge">{add.icon}</div>
                      )}
                      <div className="addon-info">
                        <h4>{add.name}</h4>
                        <p>{add.desc}</p>
                      </div>
                      <div className={`addon-check ${isSelected ? 'checked' : ''}`}>
                        <FaCheck />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Customization Choices */}
            <div className="options-custom-box glass-card" style={{ marginTop: '2.5rem' }}>
              <h3>🎁 Customization Options</h3>

              <div className="options-grid-form">
                {/* Box Size */}
                <div className="opt-form-group">
                  <label className="opt-label">Box Size:</label>
                  <div className="opt-pill-group">
                    {['Small', 'Medium', 'Large'].map((sz) => (
                      <button
                        key={sz}
                        className={`opt-choice-btn ${boxSize === sz ? 'active' : ''}`}
                        onClick={() => setBoxSize((prev) => (prev === sz ? '' : sz))}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Chocolate Shape */}
                <div className="opt-form-group">
                  <label className="opt-label">Chocolate Shape:</label>
                  <div className="opt-pill-group">
                    {['Heart', 'Round', 'Square', 'Flower', 'Letter', 'Number'].map((sh) => (
                      <button
                        key={sh}
                        className={`opt-choice-btn ${shape === sh ? 'active' : ''}`}
                        onClick={() => setShape((prev) => (prev === sh ? '' : sh))}
                      >
                        {sh}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Packaging Style */}
                <div className="opt-form-group">
                  <label className="opt-label">Packaging Style:</label>
                  <div className="opt-pill-group">
                    {['Classic', 'Premium', 'Wedding', 'Birthday', 'Festival'].map((pkg) => (
                      <button
                        key={pkg}
                        className={`opt-choice-btn ${packagingStyle === pkg ? 'active' : ''}`}
                        onClick={() => setPackagingStyle((prev) => (prev === pkg ? '' : pkg))}
                      >
                        {pkg}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Ribbon Color */}
                <div className="opt-form-group">
                  <label className="opt-label">Ribbon Color:</label>
                  <select
                    value={ribbonColor}
                    onChange={(e) => setRibbonColor(e.target.value)}
                    className="custom-select-input"
                  >
                    <option value="None">None (Default)</option>
                    <option value="Metallic Gold">Metallic Gold</option>
                    <option value="Metallic Silver">Metallic Silver</option>
                    <option value="Rose Gold">Rose Gold</option>
                    <option value="Red">Red</option>
                    <option value="Pink">Pink</option>
                    <option value="White">White</option>
                    <option value="Ivory">Ivory</option>
                    <option value="Purple">Purple</option>
                    <option value="Blue">Blue</option>
                    <option value="Green">Green</option>
                    <option value="Yellow">Yellow</option>
                    <option value="Orange">Orange</option>
                    <option value="Black">Black</option>
                    <option value="Brown">Brown</option>
                    <option value="Custom Color">Custom Color</option>
                  </select>
                </div>

                {/* Occasion */}
                <div className="opt-form-group">
                  <label className="opt-label">Occasion:</label>
                  <select
                    value={occasion}
                    onChange={(e) => setOccasion(e.target.value)}
                    className="custom-select-input"
                  >
                    <option value="None">None (Default)</option>
                    <option value="Birthday">Birthday</option>
                    <option value="Anniversary">Anniversary</option>
                    <option value="Wedding">Wedding</option>
                    <option value="Engagement">Engagement</option>
                    <option value="Baby Shower">Baby Shower</option>
                    <option value="Housewarming">Housewarming</option>
                    <option value="Farewell">Farewell</option>
                    <option value="Congratulations">Congratulations</option>
                    <option value="Thank You">Thank You</option>
                    <option value="Festival">Festival</option>
                    <option value="Corporate Gift">Corporate Gift</option>
                    <option value="Valentine's Day">Valentine's Day</option>
                    <option value="Mother's Day">Mother's Day</option>
                    <option value="Father's Day">Father's Day</option>
                    <option value="Friendship Day">Friendship Day</option>
                    <option value="Raksha Bandhan">Raksha Bandhan</option>
                    <option value="Diwali">Diwali</option>
                    <option value="Christmas">Christmas</option>
                    <option value="New Year">New Year</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Step 4: Customer & Delivery Details */}
            <div className="options-custom-box glass-card" style={{ marginTop: '2.5rem' }}>
              <h3>👤 Customer & Delivery Details</h3>

              {/* Customer Information (Required) */}
              <div className="details-sub-header">
                <FaUser className="header-icon" /> Customer Information
              </div>
              <div className="options-grid-form">
                <div className="opt-form-group">
                  <label className="opt-label">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Radhika Sharma"
                    className="custom-select-input"
                  />
                </div>

                <div className="opt-form-group">
                  <label className="opt-label">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="e.g. +91 98765 43210"
                    className="custom-select-input"
                  />
                </div>

                <div className="opt-form-group">
                  <label className="opt-label">WhatsApp Number *</label>
                  <input
                    type="tel"
                    required
                    value={customerWhatsApp}
                    onChange={(e) => setCustomerWhatsApp(e.target.value)}
                    placeholder="e.g. +91 98765 43210"
                    className="custom-select-input"
                  />
                </div>

                <div className="opt-form-group">
                  <label className="opt-label">Email Address (Optional)</label>
                  <input
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="radhika@example.com"
                    className="custom-select-input"
                  />
                </div>
              </div>

              {/* Recipient Information (Optional) */}
              <div className="details-sub-header" style={{ marginTop: '1.5rem' }}>
                <FaGift className="header-icon" /> Recipient Information (Optional Gift Delivery)
              </div>
              <div className="options-grid-form">
                <div className="opt-form-group">
                  <label className="opt-label">Recipient Name</label>
                  <input
                    type="text"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    placeholder="Recipient's Name (if gifting)"
                    className="custom-select-input"
                  />
                </div>

                <div className="opt-form-group">
                  <label className="opt-label">Recipient Phone Number</label>
                  <input
                    type="tel"
                    value={recipientPhone}
                    onChange={(e) => setRecipientPhone(e.target.value)}
                    placeholder="Recipient's contact number"
                    className="custom-select-input"
                  />
                </div>
              </div>

              {/* Delivery Details (Optional) */}
              <div className="details-sub-header" style={{ marginTop: '1.5rem' }}>
                <FaMapMarkerAlt className="header-icon" /> Delivery Details (Optional)
              </div>
              <div className="options-grid-form">
                <div className="opt-form-group">
                  <label className="opt-label">Preferred Delivery Date</label>
                  <input
                    type="date"
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    className="custom-select-input"
                  />
                </div>

                <div className="opt-form-group">
                  <label className="opt-label">Preferred Delivery Time</label>
                  <select
                    value={deliveryTime}
                    onChange={(e) => setDeliveryTime(e.target.value)}
                    className="custom-select-input"
                  >
                    <option value="">Select Delivery Slot</option>
                    <option value="Morning (10 AM - 1 PM)">Morning (10 AM - 1 PM)</option>
                    <option value="Afternoon (1 PM - 5 PM)">Afternoon (1 PM - 5 PM)</option>
                    <option value="Evening (5 PM - 8 PM)">Evening (5 PM - 8 PM)</option>
                  </select>
                </div>

                <div className="opt-form-group full-width">
                  <label className="opt-label">Delivery Address</label>
                  <textarea
                    rows="3"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    placeholder="Enter complete shipping/delivery address..."
                    className="custom-select-input"
                  ></textarea>
                </div>
              </div>

              {/* Special Instructions / Order Notes */}
              <div className="details-sub-header" style={{ marginTop: '1.5rem' }}>
                <FaFileAlt className="header-icon" /> Order Notes
              </div>
              <div className="opt-form-group full-width">
                <textarea
                  rows="3"
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  placeholder="Any special instructions for your order? (Optional)"
                  className="custom-select-input"
                ></textarea>
              </div>
            </div>
          </div>

          {/* Right Column: Live Order Summary Card */}
          <div className="customizer-right-panel">
            <div className="summary-sticky-card glass-card">
              <div className="summary-card-header">
                <FaGift style={{ color: 'var(--gold-primary)', fontSize: '1.4rem' }} />
                <h3>📋 Order Summary</h3>
              </div>

              <div className="summary-section-body">
                {/* Selected Flavors */}
                <div className="summary-section-item">
                  <label className="summary-item-label">Selected Chocolate Flavor(s):</label>
                  <div className="flavor-chips-wrap">
                    {selectedFlavors.length > 0 ? (
                      selectedFlavors.map((flv) => (
                        <span key={flv} className="flavor-chip">
                          {flv}
                        </span>
                      ))
                    ) : (
                      <span className="none-tag">No flavor selected (Click a card above)</span>
                    )}
                  </div>
                </div>

                {/* Selected Add-ons */}
                <div className="summary-section-item">
                  <label className="summary-item-label">Selected Add-on(s):</label>
                  <div className="flavor-chips-wrap">
                    {selectedAddons.length > 0 ? (
                      selectedAddons.map((add) => (
                        <span key={add} className="addon-chip">
                          {add}
                        </span>
                      ))
                    ) : (
                      <span className="none-tag">None selected</span>
                    )}
                  </div>
                </div>

                <div className="summary-row">
                  <span>Box Size:</span>
                  <strong>{boxSize || <em className="none-tag">Not selected</em>}</strong>
                </div>

                <div className="summary-row">
                  <span>Chocolate Shape:</span>
                  <strong>{shape || <em className="none-tag">Not selected</em>}</strong>
                </div>

                <div className="summary-row">
                  <span>Packaging Style:</span>
                  <strong>{packagingStyle || <em className="none-tag">Not selected</em>}</strong>
                </div>

                <div className="summary-row">
                  <span>Ribbon Color:</span>
                  <strong>{ribbonColor === 'None' ? 'None' : (ribbonColor || 'None')}</strong>
                </div>

                <div className="summary-row">
                  <span>Occasion:</span>
                  <strong>{occasion === 'None' ? 'None' : occasion}</strong>
                </div>

                {/* Personalized Message Preview */}
                {customMessage && (
                  <div className="message-preview-card">
                    <span className="msg-tag"><FaEdit /> Personalized Message:</span>
                    <p>"{customMessage}"</p>
                  </div>
                )}

                {/* Customer Details Summary */}
                <div className="summary-details-box">
                  <span className="msg-tag"><FaUser /> Customer Contact:</span>
                  {customerName ? (
                    <div className="summary-user-text">
                      <p><strong>Name:</strong> {customerName}</p>
                      <p><strong>Phone:</strong> {customerPhone}</p>
                      <p><strong>WhatsApp:</strong> {customerWhatsApp}</p>
                      {recipientName && <p><strong>Recipient:</strong> {recipientName}</p>}
                    </div>
                  ) : (
                    <p className="none-tag" style={{ marginTop: '0.2rem' }}>Please enter name & phone in Step 4</p>
                  )}
                </div>
              </div>

              <button onClick={handleWhatsAppSend} className="btn btn-whatsapp w-full" style={{ marginTop: '1.5rem' }}>
                <FaWhatsapp /> Checkout & Order on WhatsApp
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

      <style>{`
        .chocolate-customizer-section {
          padding: 6rem 0;
          background: var(--bg-secondary);
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
          transition: var(--transition-smooth);
          display: flex;
          flex-direction: column;
          position: relative;
        }

        .flavor-card:hover {
          border-color: var(--gold-primary);
          transform: translateY(-4px);
          box-shadow: var(--shadow-sm);
        }

        .flavor-card.selected {
          background: #FFFDF9;
          border-color: var(--gold-primary);
          box-shadow: 0 6px 20px rgba(212, 175, 55, 0.22);
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
          transition: all 0.2s;
        }

        .check-badge.checked {
          background: var(--gold-primary);
          border-color: var(--gold-primary);
          color: #FFFFFF;
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
        }

        .flavor-title {
          font-size: 1.1rem;
          font-family: var(--font-serif);
          font-weight: 700;
          color: var(--text-main);
          margin-bottom: 0.3rem;
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

        .drawer-info-block p {
          margin: 0;
          font-size: 0.8rem;
          color: #665558;
          line-height: 1.4;
        }

        .addons-section-box {
          padding: 1.75rem 2rem;
          background: #FFFFFF;
          border: 1px solid var(--gold-border);
        }

        .addons-section-box h3 {
          font-size: 1.35rem;
          margin-bottom: 0.25rem;
        }

        .addons-sub-text {
          font-size: 0.85rem;
          color: var(--text-muted);
          margin-bottom: 1.25rem;
        }

        .addons-selection-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .addon-choice-card {
          background: #FFFDF9;
          border: 1.5px solid rgba(110, 58, 70, 0.15);
          border-radius: var(--radius-md);
          padding: 1rem 1.25rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          cursor: pointer;
          transition: var(--transition-smooth);
        }

        .addon-choice-card:hover {
          border-color: var(--gold-primary);
        }

        .addon-choice-card.active {
          border-color: var(--gold-primary);
          background: var(--gold-soft-gradient);
          box-shadow: var(--shadow-sm);
        }

        .addon-icon-badge {
          font-size: 1.8rem;
        }

        .addon-thumb-img {
          width: 52px;
          height: 52px;
          border-radius: var(--radius-sm);
          object-fit: cover;
          border: 1px solid var(--gold-border);
          flex-shrink: 0;
        }

        .addon-info h4 {
          font-size: 0.95rem;
          color: var(--text-main);
          margin-bottom: 0.1rem;
        }

        .addon-info p {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .addon-check {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          border: 1px solid #DDD;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.65rem;
          color: transparent;
          margin-left: auto;
        }

        .addon-check.checked {
          background: var(--gold-primary);
          border-color: var(--gold-primary);
          color: #FFFFFF;
        }

        .options-custom-box {
          padding: 2rem;
          background: #FFFFFF;
          border: 1px solid var(--gold-border);
        }

        .options-custom-box h3 {
          font-size: 1.4rem;
          margin-bottom: 1.25rem;
        }

        .details-sub-header {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--rose-dark);
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1rem;
          padding-bottom: 0.4rem;
          border-bottom: 1px solid rgba(212, 175, 55, 0.2);
        }

        .header-icon {
          color: var(--gold-primary);
        }

        .options-grid-form {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.25rem;
        }

        .opt-form-group {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .opt-form-group.full-width {
          grid-column: 1 / -1;
        }

        .opt-label {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-main);
        }

        .opt-pill-group {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .opt-choice-btn {
          background: #FFFFFF;
          border: 1px solid rgba(110, 58, 70, 0.2);
          padding: 0.45rem 0.9rem;
          border-radius: var(--radius-sm);
          font-size: 0.8rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .opt-choice-btn.active {
          background: var(--gold-soft-gradient);
          border-color: var(--gold-primary);
          color: var(--gold-dark);
          font-weight: 600;
        }

        .custom-select-input {
          width: 100%;
          padding: 0.65rem 0.9rem;
          border-radius: var(--radius-sm);
          border: 1px solid rgba(110, 58, 70, 0.2);
          font-family: var(--font-sans);
          font-size: 0.875rem;
          outline: none;
          background: #FFFFFF;
        }

        .custom-select-input:focus {
          border-color: var(--gold-primary);
        }

        .customizer-right-panel {
          position: sticky;
          top: 100px;
        }

        .summary-sticky-card {
          padding: 2rem;
          background: #FFFFFF;
          border: 1.5px solid var(--gold-border);
          box-shadow: var(--shadow-lg);
        }

        .summary-card-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--bg-secondary);
          margin-bottom: 1.25rem;
        }

        .summary-card-header h3 {
          font-size: 1.4rem;
        }

        .summary-section-body {
          display: flex;
          flex-direction: column;
          gap: 0.9rem;
          font-size: 0.9rem;
        }

        .summary-section-item {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .summary-item-label {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--text-main);
        }

        .summary-row {
          display: flex;
          justify-content: space-between;
          color: var(--text-muted);
        }

        .summary-row strong {
          color: var(--text-main);
        }

        .flavor-chips-wrap {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
        }

        .flavor-chip {
          background: var(--bg-blush-accent);
          color: var(--rose-dark);
          font-size: 0.75rem;
          font-weight: 600;
          padding: 0.25rem 0.65rem;
          border-radius: var(--radius-full);
        }

        .addon-chip {
          background: var(--gold-soft-gradient);
          color: var(--gold-dark);
          border: 1px solid var(--gold-border);
          font-size: 0.75rem;
          font-weight: 600;
          padding: 0.25rem 0.65rem;
          border-radius: var(--radius-full);
        }

        .none-tag {
          font-size: 0.75rem;
          color: var(--text-light);
          font-style: italic;
        }

        .message-preview-card,
        .summary-details-box {
          background: #FFFDF9;
          border: 1px solid var(--gold-border);
          padding: 0.85rem;
          border-radius: var(--radius-sm);
          font-size: 0.8rem;
        }

        .summary-user-text {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
          margin-top: 0.3rem;
          color: var(--text-muted);
        }

        .summary-user-text strong {
          color: var(--text-main);
        }

        .msg-tag {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--gold-dark);
          display: flex;
          align-items: center;
          gap: 0.3rem;
          margin-bottom: 0.25rem;
        }

        .tagline-footer {
          text-align: center;
          margin-top: 1.25rem;
          font-family: var(--font-sans);
          font-size: 0.8rem;
          color: var(--gold-dark);
          font-weight: 600;
          font-style: italic;
          letter-spacing: 0.05em;
        }

        @media (max-width: 992px) {
          .customizer-main-grid {
            grid-template-columns: 1fr;
          }
          .customizer-right-panel {
            position: static;
          }
          .options-grid-form,
          .addons-selection-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};

export default ChocolateCustomizer;
