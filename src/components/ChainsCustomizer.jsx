import React, { useState, useEffect } from 'react';
import { FaHeart, FaRegHeart, FaWhatsapp, FaTimes, FaGem, FaMagic, FaCheck, FaGift, FaMapMarkerAlt, FaFileAlt, FaUser } from 'react-icons/fa';
import { PRODUCTS } from '../data/products';
import WhatsAppModal from './WhatsAppModal';

export const ChainsDetailsModal = ({ product, isOpen, onClose }) => {
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

  const category = product.category || '📿 CUSTOMIZED CHAINS COLLECTION';
  const name = product.name || 'Customized Chain';
  const shortDesc = product.shortDesc || 'Bespoke handcrafted customized chain designed to elevate your personal style.';
  const detailedDesc = product.description || 'Artisanal customized chain crafted with high-precision laser engraving, anti-tarnish gold polish, and hypoallergenic materials.';
  const materials = product.materials || 'Red Coral Beads / Black Crystal Beads / Pearl Strands / 24k Gold Polish Coins';
  const processingTime = product.processingTime || '2 – 4 Business Days';
  const careInstructions = product.careInstructions || 'Store flat in velvet pouch. Avoid direct contact with harsh sprays and moisture.';
  
  const sizes = product.customizations?.sizes || ['16 inch (Choker)', '18 inch (Standard)', '20 inch (Long)', '22 inch (Extra Long)'];
  const colors = product.customizations?.colors || ['24k Yellow Gold', 'Antique Temple Gold', 'Blush Rose Gold', 'Sterling Silver'];
  const specs = product.specs || ['Handcrafted Custom Jewelry', 'Anti-Tarnish Water Resistant Polish', 'Gift Box & Velvet Pouch Included'];

  const handleWhatsAppEnquiry = () => {
    const message = `Hi Divya Handcrafts! I am interested in customizing / ordering *${name}*. Please share font preview styles and order instructions!`;
    window.open(`https://wa.me/917981664314?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="modal-backdrop-overlay" onClick={onClose}>
      <div className="product-details-modal-box chains-modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-icon" onClick={onClose} title="Close Modal (ESC)">
          <FaTimes />
        </button>

        <div className="modal-two-col-grid">
          {/* Left Column: Product Image */}
          <div className="modal-image-col">
            <div className="modal-img-wrap">
              <img src={product.image} alt={name} className="modal-main-img" />
              <div className="modal-img-badge">✨ 100% Handcrafted Jewelry</div>
            </div>
          </div>

          {/* Right Column: Detailed Product Information */}
          <div className="modal-details-col">
            <div className="modal-header-block">
              <span className="modal-category-tag">📿 CUSTOMIZED CHAINS COLLECTION</span>
              <h2 className="modal-product-title">{name}</h2>
              <p className="modal-short-desc-highlight">{shortDesc}</p>
            </div>

            <div className="modal-body-scroll">
              <div className="modal-section-block">
                <h4>📜 Detailed Description</h4>
                <p className="modal-desc-text">{detailedDesc}</p>
              </div>

              <div className="modal-section-block">
                <h4>💎 Craftsmanship & Materials</h4>
                <p className="modal-info-p">{materials}</p>
              </div>

              <div className="modal-section-block">
                <h4>📏 Available Chain Lengths</h4>
                <div className="modal-chips-flex">
                  {sizes.map((sz, i) => (
                    <span key={i} className="modal-chip-item">{sz}</span>
                  ))}
                </div>
              </div>

              <div className="modal-section-block">
                <h4>✨ Metal & Color Finishes</h4>
                <div className="modal-chips-flex">
                  {colors.map((c, i) => (
                    <span key={i} className="modal-chip-item">{c}</span>
                  ))}
                </div>
              </div>

              <div className="modal-section-block">
                <h4>📦 Customization & Features</h4>
                <ul className="modal-specs-list">
                  {specs.map((sp, i) => (
                    <li key={i}>✨ {sp}</li>
                  ))}
                </ul>
              </div>

              <div className="modal-section-block">
                <h4>❄️ Dispatch & Care Instructions</h4>
                <p className="modal-info-p"><strong>Processing Time:</strong> {processingTime}</p>
                <p className="modal-info-p" style={{ marginTop: '4px' }}><strong>Care:</strong> {careInstructions}</p>
              </div>

              <div className="modal-actions-block" style={{ marginTop: '1rem' }}>
                <button onClick={handleWhatsAppEnquiry} className="btn btn-whatsapp" style={{ width: '100%' }}>
                  <FaWhatsapp /> Customize & Enquire via WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ChainsCustomizer = () => {
  // Product & Selection State
  const [selectedChain, setSelectedChain] = useState(null);
  const [selectedAddons, setSelectedAddons] = useState([]);
  
  // Customization Choices
  const [chainLength, setChainLength] = useState('');
  const [chainStyle, setChainStyle] = useState('');
  const [beadPendant, setBeadPendant] = useState('');
  const [metalFinish, setMetalFinish] = useState('');
  const [claspType, setClaspType] = useState('');
  const [packagingStyle, setPackagingStyle] = useState('');
  const [personalizedName, setPersonalizedName] = useState('');
  const [occasion, setOccasion] = useState('None');

  // Customer Contact State
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerWhatsApp, setCustomerWhatsApp] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');

  // Recipient & Delivery State
  const [recipientName, setRecipientName] = useState('');
  const [recipientPhone, setRecipientPhone] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [orderNotes, setOrderNotes] = useState('');

  // Modals
  const [detailsModalProduct, setDetailsModalProduct] = useState(null);
  const [wishlist, setWishlist] = useState({});
  const [waModalOpen, setWaModalOpen] = useState(false);
  const [waOrderText, setWaOrderText] = useState('');

  const chainProducts = PRODUCTS.filter((p) => p.category === 'Customized Chains' && p.image.startsWith('/custom_chain_'));

  const toggleWishlist = (e, id) => {
    e.stopPropagation();
    setWishlist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSelectChain = (product) => {
    if (selectedChain?.id === product.id) {
      setSelectedChain(null);
    } else {
      setSelectedChain(product);
    }
  };

  const toggleAddon = (addonName) => {
    if (selectedAddons.includes(addonName)) {
      setSelectedAddons(selectedAddons.filter((a) => a !== addonName));
    } else {
      setSelectedAddons([...selectedAddons, addonName]);
    }
  };

  const handleWhatsAppCheckout = (e) => {
    if (e) e.preventDefault();

    if (!selectedChain) {
      alert('Please select a Customized Chain product card above.');
      return;
    }

    let text = `*NEW CUSTOMIZED CHAIN ORDER - DIYA HANDCRAFTS*\n\n`;
    text += `📿 *Chain Product:* ${selectedChain.name}\n`;
    if (selectedAddons.length > 0) text += `✨ *Add-on(s):* ${selectedAddons.join(', ')}\n`;
    text += `📏 *Chain Length:* ${chainLength || 'Not selected'}\n`;
    text += `🎨 *Chain Design / Style:* ${chainStyle || 'Not selected'}\n`;
    text += `💎 *Bead / Pendant:* ${beadPendant || 'Not selected'}\n`;
    text += `✨ *Metal / Finish:* ${metalFinish || 'Not selected'}\n`;
    text += `🔒 *Clasp Type:* ${claspType || 'Not selected'}\n`;
    text += `📦 *Packaging Style:* ${packagingStyle || 'Not selected'}\n`;
    text += `✏️ *Personalization / Name:* ${personalizedName || 'Not selected'}\n`;
    text += `🎉 *Occasion:* ${occasion === 'None' ? 'None' : (occasion || 'None')}\n`;

    if (customerName) {
      text += `\n👤 *CUSTOMER CONTACT DETAILS:*\n`;
      text += `• Name: ${customerName}\n`;
      if (customerPhone) text += `• Phone: ${customerPhone}\n`;
      if (customerWhatsApp) text += `• WhatsApp: ${customerWhatsApp}\n`;
      if (customerEmail) text += `• Email: ${customerEmail}\n`;
      if (recipientName) text += `• Recipient Name: ${recipientName}\n`;
      if (recipientPhone) text += `• Recipient Phone: ${recipientPhone}\n`;
      if (deliveryDate) text += `• Preferred Delivery Date: ${deliveryDate}\n`;
      if (deliveryTime) text += `• Delivery Slot: ${deliveryTime}\n`;
      if (deliveryAddress) text += `• Shipping Address: ${deliveryAddress}\n`;
      if (orderNotes) text += `• Order Notes: ${orderNotes}\n`;
    }

    setWaOrderText(text);
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

        {/* Main Grid: Left Selector & Right Live Order Summary */}
        <div className="customizer-main-grid">
          {/* Left Column: Product Cards & Options */}
          <div className="customizer-left-panel">
            {/* Step 1: Available Customized Chain Products */}
            <div className="flavor-header-row">
              <h3>📿 Step 1: Select Your Customized Chain</h3>
              <span className="selected-count-badge">
                {selectedChain ? '1 Chain Selected' : '0 Selected'}
              </span>
            </div>

            <div className="flavors-grid">
              {chainProducts.map((product, idx) => {
                const isSelected = selectedChain?.id === product.id;
                const isWish = wishlist[product.id];
                return (
                  <div
                    key={product.id}
                    className={`flavor-card ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleSelectChain(product)}
                    style={{ animationDelay: `${(idx % 3) * 90 + 250}ms` }}
                  >
                    <div className="flavor-card-header">
                      <span className="flavor-icon">📿</span>
                      <div className={`check-badge ${isSelected ? 'checked' : ''}`}>
                        <FaCheck />
                      </div>
                    </div>

                    <div className="flavor-img-wrap">
                      <img src={product.image} alt={`Handcrafted ${product.name} - Diya Handcrafts`} className="flavor-thumb-img" loading="lazy" />
                    </div>

                    <h4 className="flavor-title">{product.name}</h4>

                    <div 
                      className="card-view-details-link"
                      onClick={(e) => {
                        e.stopPropagation();
                        setDetailsModalProduct(product);
                      }}
                    >
                      <span>View Details →</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Step 2: Customization Options Form */}
            <div className="options-custom-box glass-card" style={{ marginTop: '2.5rem' }}>
              <h3>🎁 Step 2: Customization Options</h3>

              <div className="options-grid-form">
                {/* Chain Length */}
                <div className="opt-form-group">
                  <label className="opt-label">Chain Length:</label>
                  <div className="opt-pill-group">
                    {['16 inch (Choker)', '18 inch (Standard)', '20 inch (Long)', '22 inch (Extra Long)'].map((len) => (
                      <button
                        key={len}
                        type="button"
                        className={`opt-pill-btn ${chainLength === len ? 'active' : ''}`}
                        onClick={() => setChainLength(chainLength === len ? '' : len)}
                      >
                        {len}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Chain Design / Style */}
                <div className="opt-form-group">
                  <label className="opt-label">Chain Design / Style:</label>
                  <select
                    value={chainStyle}
                    onChange={(e) => setChainStyle(e.target.value)}
                    className="custom-select-input"
                  >
                    <option value="">Select Chain Design</option>
                    <option value="Red Coral Beaded Strand">Red Coral Beaded Strand</option>
                    <option value="Black Crystal Faceted Bead">Black Crystal Faceted Bead</option>
                    <option value="Double Layer Pearl Strand">Double Layer Pearl Strand</option>
                    <option value="Royal Kundan Choker Band">Royal Kundan Choker Band</option>
                    <option value="Classic Cable Link Chain">Classic Cable Link Chain</option>
                  </select>
                </div>

                {/* Bead / Pendant Motif */}
                <div className="opt-form-group">
                  <label className="opt-label">Bead / Pendant Motif:</label>
                  <select
                    value={beadPendant}
                    onChange={(e) => setBeadPendant(e.target.value)}
                    className="custom-select-input"
                  >
                    <option value="">Select Bead / Pendant</option>
                    <option value="Lakshmi Coin Medallion (5 Coins)">Lakshmi Coin Medallion (5 Coins)</option>
                    <option value="Red Enamel Kundan Barrel Bead">Red Enamel Kundan Barrel Bead</option>
                    <option value="Ruby & Emerald Teardrop Crystals">Ruby & Emerald Teardrop Crystals</option>
                    <option value="Pearl Drop Clusters (Latkan)">Pearl Drop Clusters (Latkan)</option>
                    <option value="Evil Eye Protection Bead">Evil Eye Protection Bead</option>
                  </select>
                </div>

                {/* Metal / Finish */}
                <div className="opt-form-group">
                  <label className="opt-label">Metal / Finish:</label>
                  <div className="opt-pill-group">
                    {['24k Gold Polish', 'Antique Temple Gold', 'Rose Gold', 'Sterling Silver'].map((fin) => (
                      <button
                        key={fin}
                        type="button"
                        className={`opt-pill-btn ${metalFinish === fin ? 'active' : ''}`}
                        onClick={() => setMetalFinish(metalFinish === fin ? '' : fin)}
                      >
                        {fin}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Clasp Type */}
                <div className="opt-form-group">
                  <label className="opt-label">Clasp Type:</label>
                  <select
                    value={claspType}
                    onChange={(e) => setClaspType(e.target.value)}
                    className="custom-select-input"
                  >
                    <option value="">Select Clasp Type</option>
                    <option value="Standard S-Hook Clasp">Standard S-Hook Clasp</option>
                    <option value="Adjustable Zari Dori Thread">Adjustable Zari Dori Thread</option>
                    <option value="Lobster Claw Clasp with Extender">Lobster Claw Clasp with Extender</option>
                  </select>
                </div>

                {/* Packaging Style */}
                <div className="opt-form-group">
                  <label className="opt-label">Packaging Style:</label>
                  <select
                    value={packagingStyle}
                    onChange={(e) => setPackagingStyle(e.target.value)}
                    className="custom-select-input"
                  >
                    <option value="">Select Packaging Style</option>
                    <option value="Velvet Jewelry Pouch">Velvet Jewelry Pouch</option>
                    <option value="Royal Diya Gift Box">Royal Diya Gift Box</option>
                    <option value="Bridal Trousseau Presentation Trunk">Bridal Trousseau Presentation Trunk</option>
                  </select>
                </div>

                {/* Personalization / Name */}
                <div className="opt-form-group full-width">
                  <label className="opt-label">Personalization / Name (Optional Engraving):</label>
                  <input
                    type="text"
                    value={personalizedName}
                    onChange={(e) => setPersonalizedName(e.target.value)}
                    placeholder="Enter name, initial, or custom date (e.g. Radhika / 24.11.2024)"
                    className="custom-select-input"
                  />
                </div>

                {/* Occasion */}
                <div className="opt-form-group full-width">
                  <label className="opt-label">Occasion:</label>
                  <select
                    value={occasion}
                    onChange={(e) => setOccasion(e.target.value)}
                    className="custom-select-input"
                  >
                    <option value="None">None</option>
                    <option value="Wedding / Marriage Ritual">Wedding / Marriage Ritual</option>
                    <option value="Anniversary">Anniversary</option>
                    <option value="Birthday Gift">Birthday Gift</option>
                    <option value="Festival / Temple Function">Festival / Temple Function</option>
                    <option value="Daily Wear Wearable">Daily Wear Wearable</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Step 4: Customer Details Form */}
            <div className="customer-details-box glass-card" style={{ marginTop: '2.5rem' }}>
              <h3>👤 Step 4: Your Contact & Delivery Details</h3>

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

              {/* Recipient Details (Optional) */}
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

              {/* Delivery Details */}
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

              {/* Order Notes */}
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

          {/* Right Column: Live Order Summary Card (Exact Match to Chocolates Page) */}
          <div className="customizer-right-panel">
            <div className="summary-sticky-card glass-card">
              <div className="summary-card-header">
                <FaGift style={{ color: 'var(--gold-primary)', fontSize: '1.4rem' }} />
                <h3>📋 Order Summary</h3>
              </div>

              <div className="summary-section-body">
                {/* Selected Chain Type */}
                <div className="summary-section-item">
                  <label className="summary-item-label">Selected Chain Type:</label>
                  <div className="flavor-chips-wrap">
                    {selectedChain ? (
                      <span className="flavor-chip">
                        {selectedChain.name}
                      </span>
                    ) : (
                      <span className="none-tag">No chain type selected (Click a card above)</span>
                    )}
                  </div>
                </div>

                {/* Selected Add-on(s) */}
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
                  <span>Chain Length:</span>
                  <strong>{chainLength || <em className="none-tag">Not selected</em>}</strong>
                </div>

                <div className="summary-row">
                  <span>Chain Design / Style:</span>
                  <strong>{chainStyle || <em className="none-tag">Not selected</em>}</strong>
                </div>

                <div className="summary-row">
                  <span>Bead / Pendant:</span>
                  <strong>{beadPendant || <em className="none-tag">Not selected</em>}</strong>
                </div>

                <div className="summary-row">
                  <span>Metal / Finish:</span>
                  <strong>{metalFinish || <em className="none-tag">Not selected</em>}</strong>
                </div>

                <div className="summary-row">
                  <span>Clasp Type:</span>
                  <strong>{claspType || <em className="none-tag">Not selected</em>}</strong>
                </div>

                <div className="summary-row">
                  <span>Packaging Style:</span>
                  <strong>{packagingStyle || <em className="none-tag">Not selected</em>}</strong>
                </div>

                <div className="summary-row">
                  <span>Personalization / Name:</span>
                  <strong>{personalizedName || <em className="none-tag">Not selected</em>}</strong>
                </div>

                <div className="summary-row">
                  <span>Occasion:</span>
                  <strong>{occasion === 'None' ? 'None' : (occasion || 'None')}</strong>
                </div>

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

              <button onClick={handleWhatsAppCheckout} className="btn btn-whatsapp w-full" style={{ marginTop: '1.5rem' }}>
                <FaWhatsapp /> CHECKOUT & ORDER ON WHATSAPP
              </button>

              <div className="tagline-footer">
                ✨ Made With Love, Made For You
              </div>
            </div>
          </div>
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
        messageText={waOrderText}
      />

      <style>{`
        .customizer-main-grid {
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 2rem;
          align-items: start;
        }

        .customizer-left-panel {
          min-width: 0;
        }

        .customizer-right-panel {
          position: sticky;
          top: 100px;
        }

        .flavor-header-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1rem;
        }

        .flavor-header-row h3 {
          font-size: 1.25rem;
          font-family: var(--font-serif);
          color: var(--text-main);
          margin: 0;
        }

        .selected-count-badge {
          background: #C89B3C;
          color: #FFFFFF;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.2rem 0.65rem;
          border-radius: 50px;
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

        .flavor-title {
          font-size: 1.1rem;
          font-family: var(--font-serif);
          font-weight: 700;
          color: var(--text-main);
          margin-bottom: 0.3rem;
        }

        .card-view-details-link {
          font-size: 0.8rem;
          color: #C89B3C;
          font-weight: 600;
          margin-top: 0.4rem;
        }

        .addons-section-box,
        .options-custom-box,
        .customer-details-box {
          padding: 1.75rem 2rem;
          background: #FFFFFF;
          border: 1px solid var(--gold-border);
          border-radius: var(--radius-md);
        }

        .addons-section-box h3,
        .options-custom-box h3,
        .customer-details-box h3 {
          font-size: 1.25rem;
          margin-bottom: 0.4rem;
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
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.85rem;
          border: 1px solid var(--gold-border);
          border-radius: var(--radius-sm);
          background: #FFFDF9;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .addon-choice-card.active {
          border-color: #C89B3C;
          background: #FFFDF5;
          box-shadow: 0 4px 12px rgba(200, 155, 60, 0.15);
        }

        .addon-icon-badge {
          font-size: 1.4rem;
        }

        .addon-info h4 {
          font-size: 0.88rem;
          margin: 0 0 0.15rem 0;
        }

        .addon-info p {
          font-size: 0.75rem;
          color: var(--text-muted);
          margin: 0;
        }

        .addon-check {
          margin-left: auto;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          border: 1px solid #DDD;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.55rem;
          color: transparent;
        }

        .addon-check.checked {
          background: #C89B3C;
          border-color: #C89B3C;
          color: #FFF;
        }

        .options-grid-form {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.25rem;
          margin-top: 1.25rem;
        }

        .opt-form-group.full-width {
          grid-column: 1 / -1;
        }

        .opt-label {
          display: block;
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--text-main);
          margin-bottom: 0.4rem;
        }

        .opt-pill-group {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .opt-pill-btn {
          padding: 0.4rem 0.85rem;
          font-size: 0.78rem;
          border: 1px solid var(--gold-border);
          border-radius: 50px;
          background: #FFFFFF;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .opt-pill-btn.active {
          background: #C89B3C;
          color: #FFFFFF;
          border-color: #C89B3C;
        }

        .custom-select-input {
          width: 100%;
          padding: 0.65rem 0.85rem;
          border: 1px solid var(--gold-border);
          border-radius: var(--radius-sm);
          font-size: 0.85rem;
          background: #FFFDF9;
          box-sizing: border-box;
        }

        .details-sub-header {
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--gold-dark);
          display: flex;
          align-items: center;
          gap: 0.4rem;
          border-bottom: 1px dashed var(--gold-border);
          padding-bottom: 0.4rem;
        }

        /* Order Summary Sticky Card */
        .summary-sticky-card {
          padding: 1.75rem;
          background: #FFFFFF;
          border: 1.5px solid var(--gold-border);
          box-shadow: var(--shadow-lg);
          border-radius: var(--radius-md);
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
          font-size: 1.3rem;
          margin: 0;
        }

        .summary-section-body {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          font-size: 0.88rem;
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
          font-size: 0.85rem;
        }

        .summary-row strong {
          color: var(--text-main);
          text-align: right;
        }

        .flavor-chips-wrap {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
        }

        .flavor-chip {
          background: #FDF3E3;
          color: #8C6212;
          font-size: 0.75rem;
          font-weight: 600;
          padding: 0.25rem 0.65rem;
          border-radius: 50px;
          border: 1px solid rgba(200, 155, 60, 0.3);
        }

        .addon-chip {
          background: #F6F9F5;
          color: #1C3B2B;
          border: 1px solid rgba(28, 59, 43, 0.2);
          font-size: 0.75rem;
          font-weight: 600;
          padding: 0.25rem 0.65rem;
          border-radius: 50px;
        }

        .none-tag {
          font-size: 0.78rem;
          color: var(--text-light);
          font-style: italic;
        }

        .summary-details-box {
          background: #FFFDF9;
          border: 1px solid var(--gold-border);
          padding: 0.85rem;
          border-radius: var(--radius-sm);
          font-size: 0.8rem;
          margin-top: 0.5rem;
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

        .btn-whatsapp {
          background: #25D366;
          color: #FFFFFF;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.85rem 1.25rem;
          border-radius: var(--radius-sm);
          border: none;
          cursor: pointer;
          transition: all 0.25s ease;
          box-shadow: 0 4px 14px rgba(37, 211, 102, 0.25);
          width: 100%;
          font-size: 0.88rem;
        }

        .btn-whatsapp:hover {
          background: #1EBE5B;
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(37, 211, 102, 0.35);
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
            margin-top: 2rem;
          }
          .options-grid-form,
          .addons-selection-grid {
            grid-template-columns: 1fr;
          }
        }

        /* 📿 Customized Chains Details Modal Styles (Exact Parity to Chocolates Page) */
        .modal-backdrop-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.68);
          backdrop-filter: blur(6px);
          z-index: 99999;
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
          max-width: 940px;
          max-height: 90vh;
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
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .modal-close-icon:hover {
          background: #C89B3C;
          color: #FFFFFF;
          transform: scale(1.08);
        }

        .modal-two-col-grid {
          display: grid;
          grid-template-columns: 50% 50%;
          height: 100%;
          max-height: 90vh;
          overflow: hidden;
        }

        .modal-image-col {
          padding: 28px;
          background: #FCFAF7;
          border-right: 1px solid rgba(212, 175, 55, 0.2);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          box-sizing: border-box;
          overflow: hidden;
        }

        .modal-img-wrap {
          width: 100%;
          height: 100%;
          min-height: 380px;
          max-height: 540px;
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          background: #FFFFFF;
          box-shadow: 0 8px 24px rgba(61, 43, 31, 0.08);
          border: 1px solid rgba(212, 175, 55, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .modal-main-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
          transition: transform 0.4s ease;
        }

        .modal-main-img:hover {
          transform: scale(1.03);
        }

        .modal-img-badge {
          position: absolute;
          bottom: 14px;
          left: 14px;
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(4px);
          color: #2D2523;
          font-size: 12px;
          font-weight: 600;
          padding: 6px 14px;
          border-radius: 50px;
          border: 1px solid rgba(212, 175, 55, 0.3);
        }

        .modal-details-col {
          padding: 28px 28px;
          background: #FFFFFF;
          display: flex;
          flex-direction: column;
          height: 100%;
          max-height: 90vh;
          overflow-y: auto;
          box-sizing: border-box;
        }

        .modal-header-block {
          margin-bottom: 16px;
          padding-bottom: 14px;
          border-bottom: 1px solid rgba(212, 175, 55, 0.2);
        }

        .modal-category-tag {
          font-size: 11.5px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #C89B3C;
          font-weight: 700;
          display: block;
          margin-bottom: 4px;
        }

        .modal-product-title {
          font-family: var(--font-serif);
          font-size: 24px;
          font-weight: 700;
          color: #2D2523;
          margin: 0 0 6px 0;
          line-height: 1.25;
        }

        .modal-short-desc-highlight {
          font-size: 13.5px;
          color: #8C7032;
          font-weight: 500;
          line-height: 1.5;
          margin: 4px 0 0 0;
        }

        .modal-body-scroll {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .modal-section-block h4 {
          font-family: var(--font-serif);
          font-size: 15.5px;
          font-weight: 600;
          color: #2D2523;
          margin: 0 0 6px 0;
        }

        .modal-desc-text {
          font-size: 14.5px;
          line-height: 1.6;
          color: #5A4A42;
          margin: 0;
        }

        .modal-chips-flex {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 4px;
        }

        .modal-chip-item {
          font-family: var(--font-sans);
          font-size: 13px;
          font-weight: 500;
          color: #2D2523;
          background: #FFFDF8;
          border: 1px solid rgba(200, 155, 60, 0.25);
          border-radius: 50px;
          padding: 4px 14px;
          display: inline-flex;
          align-items: center;
        }

        .modal-specs-list {
          margin: 0;
          padding-left: 18px;
          font-size: 13.5px;
          color: #4A3A32;
          line-height: 1.65;
        }

        .modal-info-p {
          font-size: 13.5px;
          color: #5A4A42;
          line-height: 1.55;
          margin: 0;
        }

        @media (max-width: 768px) {
          .product-details-modal-box {
            width: 95%;
            max-height: 92vh;
            border-radius: 20px;
          }

          .modal-two-col-grid {
            grid-template-columns: 1fr;
            overflow-y: auto;
            max-height: 92vh;
          }

          .modal-image-col {
            padding: 16px !important;
            border-right: none !important;
            border-bottom: 1px solid rgba(212, 175, 55, 0.2);
          }

          .modal-img-wrap {
            min-height: 240px !important;
            max-height: 320px !important;
          }

          .modal-details-col {
            padding: 20px 18px !important;
            overflow-y: visible !important;
            max-height: none !important;
          }
        }
      `}</style>
    </section>
  );
};

export default ChainsCustomizer;
