import React, { useState, useEffect } from 'react';
import { FaWhatsapp, FaCheck, FaHeart, FaStar, FaMagic, FaGift, FaEdit, FaRibbon, FaCalendarAlt, FaUser, FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaFileAlt, FaLeaf, FaTimes } from 'react-icons/fa';
import WhatsAppModal from './WhatsAppModal';

export const BISCUIT_VARIETIES = [
  {
    id: 'bsc-ragi',
    name: 'Ragi Biscuits',
    icon: '🍫',
    category: '🍪 GOURMET BAKERY COLLECTION',
    shortDesc: 'Nutritious finger millet biscuits made with pure jaggery, whole grains, and 100% maida-free ingredients.',
    detailedDesc: 'Crafted with organic finger millet (Ragi), whole wheat flour, and pure cow ghee, sweetened naturally with organic jaggery. Rich in calcium and iron, these tea-time biscuits offer a wholesome crunchy bite.',
    ingredients: 'Organic Ragi (Finger Millet), Whole Wheat Flour, Organic Jaggery, Pure Cow Ghee, Green Cardamom, Milk Powder.',
    allergens: '100% Maida-Free & Eggless. Contains Dairy & Gluten.',
    packSizes: ['Small', 'Medium', 'Large', 'Custom'],
    packagingOptions: ['Regular Box', 'Gift Box', 'Premium Box', 'Custom'],
    ribbonColors: ['Gold', 'Pink', 'Red', 'Blue', 'Custom'],
    customizationOptions: ['Personalized message', 'Gift theme', 'Custom packaging', 'Quantity'],
    storageInstructions: 'Store in an airtight container in a cool, dry place. Best enjoyed fresh within 45 days.',
    desc: 'Nutritious finger millet biscuits made with pure jaggery, whole grains, and 100% maida-free ingredients. Freshly baked for a healthy snack.',
    image: '/ragi_biscuits.jpg'
  },
  {
    id: 'bsc-wheat',
    name: 'Wheat Biscuits',
    icon: '🌾',
    category: '🍪 GOURMET BAKERY COLLECTION',
    shortDesc: 'Stone-ground whole wheat baked fresh with pure cow ghee and raw brown sugar for a rich crunchy bite.',
    detailedDesc: 'Traditional stone-ground whole wheat cookies slow-baked in small batches using pure churned cow ghee and raw unrefined brown sugar. Delivers a heartwarming nutty aroma and delicate crispness.',
    ingredients: 'Stone-ground Whole Wheat Flour, Pure Cow Ghee, Raw Brown Sugar, Milk Powder, Cardamom.',
    allergens: 'Eggless. Contains Gluten & Dairy.',
    packSizes: ['Small', 'Medium', 'Large', 'Custom'],
    packagingOptions: ['Regular Box', 'Gift Box', 'Premium Box', 'Custom'],
    ribbonColors: ['Gold', 'Pink', 'Red', 'Blue', 'Custom'],
    customizationOptions: ['Personalized message', 'Gift theme', 'Custom packaging', 'Quantity'],
    storageInstructions: 'Keep sealed in a cool dry pantry away from moisture.',
    desc: 'Stone-ground whole wheat baked fresh with pure cow ghee and raw brown sugar for a rich crunchy bite.',
    image: '/wheat_biscuits.jpg'
  },
  {
    id: 'bsc-oats',
    name: 'Oats Biscuits',
    icon: '🥣',
    category: '🍪 GOURMET BAKERY COLLECTION',
    shortDesc: 'Rolled oats & raw wildflower honey crunchy tea biscuits rich in dietary fiber and wholesome energy.',
    detailedDesc: 'Healthy rolled oats blended with raw wildflower honey, whole wheat, and golden flaxseeds. Slow-roasted to create a high-fiber, low-calorie gourmet cookie for health-conscious tea lovers.',
    ingredients: 'Rolled Oats, Whole Wheat Flour, Wildflower Honey, Pure Cow Ghee, Flaxseeds, Natural Vanilla.',
    allergens: 'Eggless & High Fiber. Contains Gluten & Dairy.',
    packSizes: ['Small', 'Medium', 'Large', 'Custom'],
    packagingOptions: ['Regular Box', 'Gift Box', 'Premium Box', 'Custom'],
    ribbonColors: ['Gold', 'Pink', 'Red', 'Blue', 'Custom'],
    customizationOptions: ['Personalized message', 'Gift theme', 'Custom packaging', 'Quantity'],
    storageInstructions: 'Store in an airtight jar in a cool, dry place.',
    desc: 'Rolled oats & raw wildflower honey crunchy tea biscuits rich in dietary fiber and wholesome energy.',
    image: '/oats_biscuits.jpg'
  },
  {
    id: 'bsc-millet',
    name: 'Millet Biscuits',
    icon: '🌿',
    category: '🍪 GOURMET BAKERY COLLECTION',
    shortDesc: 'Multi-millet roasted crunch with natural aromatic cardamom, organic jaggery, and zero refined sugar.',
    detailedDesc: 'Power-packed blend of foxtail millet, pearl millet (bajra), and sorghum flour infused with aromatic green cardamom pods and organic brown jaggery. 100% refined sugar-free.',
    ingredients: 'Foxtail Millet, Bajra Millet, Whole Wheat, Organic Jaggery, Cow Ghee, Green Cardamom.',
    allergens: 'Refined Sugar Free & Eggless. Contains Dairy & Gluten.',
    packSizes: ['Small', 'Medium', 'Large', 'Custom'],
    packagingOptions: ['Regular Box', 'Gift Box', 'Premium Box', 'Custom'],
    ribbonColors: ['Gold', 'Pink', 'Red', 'Blue', 'Custom'],
    customizationOptions: ['Personalized message', 'Gift theme', 'Custom packaging', 'Quantity'],
    storageInstructions: 'Keep in a cool dry place in an airtight container.',
    desc: 'Multi-millet roasted crunch with natural aromatic cardamom, organic jaggery, and zero refined sugar.',
    image: '/millet_biscuits.jpg'
  },
  {
    id: 'bsc-butter',
    name: 'Butter Biscuits',
    icon: '🧈',
    category: '🍪 GOURMET BAKERY COLLECTION',
    shortDesc: 'Classic European melt-in-mouth pure butter shortbread cookies with a rich silky vanilla finish.',
    detailedDesc: 'Authentic melt-in-mouth butter cookies prepared with 100% pure unsalted creamery butter and pure vanilla bean extract. Rich, golden, and delicate with a crumbly buttery texture.',
    ingredients: 'Unsalted Pure Butter, Whole Wheat Flour, Fine Sugar, Pure Vanilla Extract.',
    allergens: 'Contains Dairy & Gluten.',
    packSizes: ['Small', 'Medium', 'Large', 'Custom'],
    packagingOptions: ['Regular Box', 'Gift Box', 'Premium Box', 'Custom'],
    ribbonColors: ['Gold', 'Pink', 'Red', 'Blue', 'Custom'],
    customizationOptions: ['Personalized message', 'Gift theme', 'Custom packaging', 'Quantity'],
    storageInstructions: 'Store in a cool place away from sunlight.',
    desc: 'Classic European melt-in-mouth pure butter shortbread cookies with a rich silky vanilla finish.',
    image: '/butter_biscuits.jpg'
  },
  {
    id: 'bsc-almond',
    name: 'Almond Biscuits',
    icon: '🥜',
    category: '🍪 GOURMET BAKERY COLLECTION',
    shortDesc: 'Sliced golden roasted California almonds baked into crisp butter shortbread cookies.',
    detailedDesc: 'Generously loaded with hand-sliced California almonds and aromatic nutmeg, these golden butter biscuits offer an exquisite nut-crusted crunch in every bite.',
    ingredients: 'California Almond Flakes, Pure Ghee, Wheat Flour, Sugar, Nutmeg, Vanilla.',
    allergens: 'Contains Tree Nuts & Dairy.',
    packSizes: ['Small', 'Medium', 'Large', 'Custom'],
    packagingOptions: ['Regular Box', 'Gift Box', 'Premium Box', 'Custom'],
    ribbonColors: ['Gold', 'Pink', 'Red', 'Blue', 'Custom'],
    customizationOptions: ['Personalized message', 'Gift theme', 'Custom packaging', 'Quantity'],
    storageInstructions: 'Store in an airtight container to preserve nut crispness.',
    desc: 'Sliced golden roasted California almonds baked into crisp butter shortbread cookies.',
    image: '/almond_biscuits.jpg'
  },
  {
    id: 'bsc-cashew',
    name: 'Cashew Biscuits',
    icon: '🥜',
    category: '🍪 GOURMET BAKERY COLLECTION',
    shortDesc: 'Rich roasted cashew butter biscuits infused with fragrant green cardamom and saffron threads.',
    detailedDesc: 'Made with rich roasted Goan cashew paste, whole cashews, green cardamom, and Kashmir saffron strands. Melt-in-mouth royal cookies ideal for celebratory gifting.',
    ingredients: 'Goan Roasted Cashews, Wheat Flour, Pure Butter, Green Cardamom, Saffron Threads.',
    allergens: 'Contains Tree Nuts & Dairy.',
    packSizes: ['Small', 'Medium', 'Large', 'Custom'],
    packagingOptions: ['Regular Box', 'Gift Box', 'Premium Box', 'Custom'],
    ribbonColors: ['Gold', 'Pink', 'Red', 'Blue', 'Custom'],
    customizationOptions: ['Personalized message', 'Gift theme', 'Custom packaging', 'Quantity'],
    storageInstructions: 'Keep sealed in a cool, dry place.',
    desc: 'Rich roasted cashew butter biscuits infused with fragrant green cardamom and saffron threads.',
    image: '/cashew_biscuits.jpg'
  },
  {
    id: 'bsc-pista',
    name: 'Pistachio Biscuits',
    icon: '🟢',
    category: '🍪 GOURMET BAKERY COLLECTION',
    shortDesc: 'Handcrafted pistachios & green cardamom rich butter nankhatai cookies with royal nutty crunch.',
    detailedDesc: 'Royally crafted nankhatai-style cookies loaded with crushed Iranian green pistachios, pure ghee, and saffron, delivering a delicate festive crunch.',
    ingredients: 'Iranian Roasted Pistachios, Pure Ghee, Whole Wheat, Saffron, Cardamom.',
    allergens: 'Contains Tree Nuts & Dairy.',
    packSizes: ['Small', 'Medium', 'Large', 'Custom'],
    packagingOptions: ['Regular Box', 'Gift Box', 'Premium Box', 'Custom'],
    ribbonColors: ['Gold', 'Pink', 'Red', 'Blue', 'Custom'],
    customizationOptions: ['Personalized message', 'Gift theme', 'Custom packaging', 'Quantity'],
    storageInstructions: 'Store in an airtight container.',
    desc: 'Handcrafted pistachios & green cardamom rich butter nankhatai cookies with royal nutty crunch.',
    image: '/pistachio_biscuits.jpg'
  },
  {
    id: 'bsc-dryfruit',
    name: 'Dry Fruit Biscuits',
    icon: '🍇',
    category: '🍪 GOURMET BAKERY COLLECTION',
    shortDesc: 'Royal roasted almond, cashew, pistachio & dried cranberry gourmet biscuits baked for special celebrations.',
    detailedDesc: 'Our signature festive assortment cookie packed with roasted almonds, cashews, pistachios, and dried ruby cranberries. Baked to a golden crisp with aromatic spices.',
    ingredients: 'Assorted Roasted Tree Nuts, Dried Cranberries, Pure Butter, Wheat Flour, Spiced Sugar.',
    allergens: 'Contains Tree Nuts & Dairy.',
    packSizes: ['Small', 'Medium', 'Large', 'Custom'],
    packagingOptions: ['Regular Box', 'Gift Box', 'Premium Box', 'Custom'],
    ribbonColors: ['Gold', 'Pink', 'Red', 'Blue', 'Custom'],
    customizationOptions: ['Personalized message', 'Gift theme', 'Custom packaging', 'Quantity'],
    storageInstructions: 'Store sealed in a cool, dry environment.',
    desc: 'Royal roasted almond, cashew, pistachio & dried cranberry gourmet biscuits baked for special celebrations.',
    image: '/dryfruit_biscuits.jpg'
  }
];

export const BiscuitDetailsModal = ({ product, isOpen, onClose }) => {
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

  const category = product.category || '🍪 GOURMET BAKERY COLLECTION';
  const name = product.name || 'Handcrafted Gourmet Biscuit';
  const shortDesc = product.shortDesc || product.desc || '100% Maida-free, eggless gourmet biscuits baked fresh with pure cow ghee and whole grains.';
  const detailedDesc = product.detailedDesc || 'Slow-baked using traditional heritage recipes, our gourmet biscuits blend wholesome whole grains, pure cow ghee, and natural unrefined sweeteners for an irresistible crunchy texture and authentic buttery taste.';
  const ingredients = product.ingredients || 'Whole wheat flour, pure cow ghee, organic jaggery, milk powder, natural spices.';
  
  const packSizes = Array.isArray(product.packSizes) 
    ? product.packSizes 
    : ['Small', 'Medium', 'Large', 'Custom'];

  const packagingOptions = Array.isArray(product.packagingOptions)
    ? product.packagingOptions
    : ['Regular Box', 'Gift Box', 'Premium Box', 'Custom'];

  const ribbonColors = Array.isArray(product.ribbonColors)
    ? product.ribbonColors
    : ['Gold', 'Pink', 'Red', 'Blue', 'Custom'];

  const customizationOptions = Array.isArray(product.customizationOptions)
    ? product.customizationOptions
    : ['Personalized message', 'Gift theme', 'Custom packaging', 'Quantity'];

  const storageInstructions = product.storageInstructions || 'Store in an airtight glass container in a cool, dry place away from direct sunlight and humidity.';
  const allergens = product.allergens || 'Eggless & 100% Maida-Free. May contain dairy and nuts depending on flavor.';

  return (
    <div className="modal-backdrop-overlay" onClick={onClose}>
      <div className="product-details-modal-box resin-modal-box biscuit-modal-box" onClick={(e) => e.stopPropagation()}>
        {/* Circular Close (X) Icon Button */}
        <button className="modal-close-icon" onClick={onClose} title="Close Modal (ESC)">
          <FaTimes />
        </button>

        <div className="modal-two-col-grid">
          {/* Left Column: Large Product Image */}
          <div className="modal-image-col">
            <div className="modal-img-wrap">
              <img src={product.image} alt={name} className="modal-main-img" />
              <div className="modal-img-badge">✨ Freshly Baked Bakery</div>
            </div>
          </div>

          {/* Right Column: Detailed Product Information */}
          <div className="modal-details-col">
            <div className="modal-header-block">
              <span className="modal-category-tag">{category}</span>
              <h2 className="modal-product-title">{name}</h2>
              <p className="modal-short-desc-highlight">{shortDesc}</p>
            </div>

            <div className="modal-body-scroll">
              {/* 📜 Detailed Description */}
              <div className="modal-section-block">
                <h4>📜 Detailed Description</h4>
                <p className="modal-desc-text">{detailedDesc}</p>
              </div>

              {/* ✨ Ingredients & Flavor Notes */}
              <div className="modal-section-block">
                <h4>✨ Ingredients & Flavor Notes</h4>
                <p className="modal-info-p">{ingredients}</p>
              </div>

              {/* 📦 Available Pack Sizes */}
              <div className="modal-section-block">
                <h4>📦 Available Pack Sizes</h4>
                <div className="modal-chips-flex">
                  {packSizes.map((sz, i) => (
                    <span key={i} className="modal-chip-item">{sz}</span>
                  ))}
                </div>
              </div>

              {/* 🎁 Packaging Options */}
              <div className="modal-section-block">
                <h4>🎁 Packaging Options</h4>
                <div className="modal-chips-flex">
                  {packagingOptions.map((pkg, i) => (
                    <span key={i} className="modal-chip-item">{pkg}</span>
                  ))}
                </div>
              </div>

              {/* 🎀 Ribbon Colors */}
              <div className="modal-section-block">
                <h4>🎀 Ribbon Colors</h4>
                <div className="modal-chips-flex">
                  {ribbonColors.map((rc, i) => (
                    <span key={i} className="modal-chip-item">{rc}</span>
                  ))}
                </div>
              </div>

              {/* ✨ Customization Options */}
              <div className="modal-section-block">
                <h4>✨ Customization Options</h4>
                <ul className="modal-specs-list">
                  {customizationOptions.map((opt, i) => (
                    <li key={i}>✨ {opt}</li>
                  ))}
                </ul>
              </div>

              {/* ❄️ Storage & Allergens */}
              <div className="modal-section-block">
                <h4>❄️ Storage & Allergens</h4>
                <p className="modal-info-p"><strong>Storage:</strong> {storageInstructions}</p>
                <p className="modal-info-p" style={{ marginTop: '4px' }}><strong>Allergens:</strong> {allergens}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const BISCUIT_QUANTITY_OPTIONS = [
  '250g',
  '500g',
  '1kg',
  '2kg'
];

export const PACK_SIZE_OPTIONS = [
  '6 Pieces',
  '12 Pieces',
  '24 Pieces',
  '36 Pieces',
  'Family Pack',
  'Gift Hamper'
];

export const DIETARY_PREFERENCES_OPTIONS = [
  'No Maida',
  'Eggless',
  'Jaggery Sweetened',
  'Low Sugar',
  'High Fiber',
  'Homemade',
  'Freshly Baked',
  'No Preservatives'
];

export const GIFT_PACKAGING_OPTIONS = [
  'Classic',
  'Premium',
  'Wedding',
  'Birthday',
  'Festival',
  'Baby Shower',
  'Corporate Gift'
];

export const RIBBON_COLOR_OPTIONS = [
  'None',
  'Red',
  'Gold',
  'Pink',
  'Blue',
  'Green',
  'Purple',
  'White'
];

export const OCCASION_OPTIONS = [
  'None',
  'Birthday',
  'Anniversary',
  'Wedding',
  'Baby Shower',
  'Festival',
  'Congratulations',
  'Thank You',
  'Corporate',
  'Other'
];

const BiscuitCustomizer = ({ onSelectProduct }) => {
  // Customization Choice State (Multiple selection enabled)
  const [selectedBiscuits, setSelectedBiscuits] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [selectedQuantity, setSelectedQuantity] = useState('');
  const [boxSize, setBoxSize] = useState('');
  const [packagingStyle, setPackagingStyle] = useState('');
  const [ribbonColor, setRibbonColor] = useState('');
  const [occasion, setOccasion] = useState('');
  const [customMessage, setCustomMessage] = useState('');
  const [waModalOpen, setWaModalOpen] = useState(false);
  const [waOrderText, setWaOrderText] = useState('');

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

  // Details Modal State
  const [detailsModalProduct, setDetailsModalProduct] = useState(null);

  const toggleBiscuit = (biscuitName) => {
    setSelectedBiscuits((prev) =>
      prev.includes(biscuitName)
        ? prev.filter((name) => name !== biscuitName)
        : [...prev, biscuitName]
    );
  };

  const handleProductDetailClick = (bsc, e) => {
    if (e) e.stopPropagation();
    toggleBiscuit(bsc.name);
    if (onSelectProduct) {
      onSelectProduct({
        id: bsc.id,
        title: bsc.name,
        name: bsc.name,
        category: 'Homemade Biscuits',
        image: bsc.image,
        images: [bsc.image],
        description: bsc.desc,
        price: 499,
        specs: ['100% Maida-Free Whole Grain', 'Baked Fresh with Pure Cow Ghee', 'No Artificial Preservatives'],
        customizations: {
          sizes: ['Box of 12 (Standard)', 'Box of 24 (Family Pack)', 'Gift Hamper Box'],
          colors: ['Classic Gold Packaging', 'Eco Kraft Box', 'Festive Red & Gold']
        }
      });
    }
  };

  const toggleFeature = (feature) => {
    if (selectedFeatures.includes(feature)) {
      setSelectedFeatures(selectedFeatures.filter((f) => f !== feature));
    } else {
      setSelectedFeatures([...selectedFeatures, feature]);
    }
  };

  const handleWhatsAppSend = (e) => {
    if (e) e.preventDefault();

    if (selectedBiscuits.length === 0) {
      alert('Please select at least one biscuit variety by clicking a card above.');
      return;
    }

    let text = `✨ *Custom Homemade Biscuit Gift Box Order - Divya Handcrafts* ✨\n`;
    text += `----------------------------------------\n`;
    text += `🍪 *Selected Biscuit Flavors (${selectedBiscuits.length}):*\n`;
    selectedBiscuits.forEach((biscuit, idx) => {
      text += `${idx + 1}. ${biscuit}${selectedQuantity ? ` (${selectedQuantity})` : ''}\n`;
    });
    if (selectedFeatures.length > 0) text += `- Special Features: ${selectedFeatures.join(', ')}\n`;
    if (boxSize) text += `- Box Size: ${boxSize}\n`;
    if (packagingStyle) text += `- Packaging Style: ${packagingStyle}\n`;
    if (ribbonColor) text += `- Ribbon Color: ${ribbonColor}\n`;
    if (occasion) text += `- Occasion: ${occasion}\n`;

    if (customerName) {
      text += `\n👤 *Customer Contact:*\n`;
      text += `- Name: ${customerName}\n`;
      if (customerPhone) text += `- Phone: ${customerPhone}\n`;
      if (recipientName) text += `- Recipient: ${recipientName} (${recipientPhone || 'Same'})\n`;
    }

    if (deliveryDate || deliveryAddress) {
      text += `\n📍 *Delivery Details:*\n`;
      if (deliveryDate) text += `- Preferred Date: ${deliveryDate}\n`;
      if (deliveryTime) text += `- Preferred Time: ${deliveryTime}\n`;
      if (deliveryAddress) text += `- Address: ${deliveryAddress}\n`;
    }

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
    <section id="biscuit-customizer" className="customizer-section section-padding">
      <div className="container">
        {/* Section Header */}
        <div className="hero-header-wrap">
          <div className="tw-hero-subtitle">🍪 GOURMET BAKERY STUDIO</div>
          <h2 className="tw-hero-title">Customize Your Homemade Biscuits</h2>
          <p className="tw-hero-description">
            Build your bespoke box of fresh, eggless, <span className="gold-highlight">100% maida-free cookies</span> baked with <span className="gold-highlight">pure cow ghee</span>, whole grains, and <span className="gold-highlight">natural sweeteners</span>. Select your favorite variety, gift box sizes, and <span className="gold-highlight">personalized gift messages</span>.
          </p>

          {/* Premium Decorative Divider */}
          <div className="tw-hero-divider">
            <span className="divider-line left-line"></span>
            <span className="divider-motif">🪷</span>
            <span className="divider-line right-line"></span>
          </div>

          <div className="tw-brand-tagline">
            <span className="quote-mark">“</span>Made With Love, Made For You.<span className="quote-mark">”</span>
          </div>
        </div>

        <div className="customizer-grid">
          {/* Left Column: Interactive Form Steps */}
          <div className="customizer-form-col">
            
            {/* Available Biscuit Flavors Section */}
            <div className="options-card glass-card">
              <div className="flavor-header-row">
                <h3>🍪 Available Biscuit Flavors</h3>
                <span className="selected-count-badge">
                  {selectedBiscuits.length} Biscuit{selectedBiscuits.length === 1 ? '' : 's'} Selected
                </span>
              </div>

              <div className="flavors-grid">
                {BISCUIT_VARIETIES.map((bsc, idx) => {
                  const isSelected = selectedBiscuits.includes(bsc.name);
                  const isExpanded = expandedCardId === bsc.id;
                  return (
                    <div
                      key={bsc.id}
                      className={`flavor-card ${isSelected ? 'selected' : ''} ${isExpanded ? 'card-is-expanded' : ''}`}
                      onClick={() => toggleBiscuit(bsc.name)}
                      style={{ animationDelay: `${(idx % 3) * 90 + 250}ms` }}
                    >
                      {/* Top-Left Ingredient Icon */}
                      <div className="biscuit-ingredient-icon">
                        {bsc.icon}
                      </div>

                      {/* Top-Right Circular Radio Button */}
                      <div className={`biscuit-radio-circle ${isSelected ? 'selected' : ''}`}>
                        {isSelected && <FaCheck className="biscuit-radio-check" />}
                      </div>

                      <div className="flavor-img-wrap">
                        <img 
                          src={bsc.image} 
                          alt={bsc.name} 
                          className="flavor-thumb-img"
                          loading="lazy"
                        />
                      </div>

                      <div className="flavor-content">
                        <h4 className="biscuit-card-title">{bsc.name}</h4>

                        <div 
                          className="card-view-details-link"
                          onClick={(e) => {
                            e.stopPropagation();
                            setDetailsModalProduct(bsc);
                          }}
                        >
                          <span>View Details <span className="view-arrow">→</span></span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 🍪 Biscuit Customization Section */}
            <div className="biscuit-customization-card glass-card" style={{ marginTop: '2.5rem' }}>
              <div className="customization-card-header">
                <h3>🍪 Biscuit Customization</h3>
              </div>

              <div className="biscuit-customization-grid">
                {/* Left Column */}
                <div className="biscuit-custom-col">
                  {/* Biscuit Quantity */}
                  <div className="custom-field-group">
                    <label className="custom-field-label">⚖️ Biscuit Quantity:</label>
                    <div className="pill-buttons-wrap">
                      {BISCUIT_QUANTITY_OPTIONS.map((qty) => {
                        const isSelected = selectedQuantity === qty;
                        return (
                          <button
                            key={qty}
                            type="button"
                            className={`custom-pill-btn ${isSelected ? 'active' : ''}`}
                            onClick={() => setSelectedQuantity((prev) => (prev === qty ? '' : qty))}
                          >
                            {qty}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Pack Size */}
                  <div className="custom-field-group">
                    <label className="custom-field-label">📦 Pack Size:</label>
                    <div className="pill-buttons-wrap">
                      {PACK_SIZE_OPTIONS.map((sz) => {
                        const isSelected = boxSize === sz;
                        return (
                          <button
                            key={sz}
                            type="button"
                            className={`custom-pill-btn ${isSelected ? 'active' : ''}`}
                            onClick={() => setBoxSize((prev) => (prev === sz ? '' : sz))}
                          >
                            {sz}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Dietary Preferences (Multiple Selection) */}
                  <div className="custom-field-group">
                    <label className="custom-field-label">🌿 Dietary Preferences (Multiple Selection):</label>
                    <div className="pill-buttons-wrap">
                      {DIETARY_PREFERENCES_OPTIONS.map((pref) => {
                        const isSelected = selectedFeatures.includes(pref);
                        return (
                          <button
                            key={pref}
                            type="button"
                            className={`custom-pill-btn ${isSelected ? 'active' : ''}`}
                            onClick={() => toggleFeature(pref)}
                          >
                            {isSelected && <FaCheck className="pill-check-icon" />} {pref}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="biscuit-custom-col">
                  {/* Gift Packaging */}
                  <div className="custom-field-group">
                    <label className="custom-field-label">🎁 Gift Packaging:</label>
                    <div className="pill-buttons-wrap">
                      {GIFT_PACKAGING_OPTIONS.map((pkg) => {
                        const isSelected = packagingStyle === pkg;
                        return (
                          <button
                            key={pkg}
                            type="button"
                            className={`custom-pill-btn ${isSelected ? 'active' : ''}`}
                            onClick={() => setPackagingStyle((prev) => (prev === pkg ? '' : pkg))}
                          >
                            {pkg}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Ribbon Color */}
                  <div className="custom-field-group">
                    <label className="custom-field-label">🎀 Ribbon Color:</label>
                    <select
                      value={ribbonColor}
                      onChange={(e) => setRibbonColor(e.target.value)}
                      className="custom-dropdown-select"
                    >
                      {RIBBON_COLOR_OPTIONS.map((clr) => (
                        <option key={clr} value={clr}>
                          {clr === 'None' ? 'None (Default)' : clr}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Occasion */}
                  <div className="custom-field-group">
                    <label className="custom-field-label">🎉 Occasion:</label>
                    <select
                      value={occasion}
                      onChange={(e) => setOccasion(e.target.value)}
                      className="custom-dropdown-select"
                    >
                      {OCCASION_OPTIONS.map((occ) => (
                        <option key={occ} value={occ}>
                          {occ === 'None' ? 'None (Default)' : occ}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Customer & Delivery Details Form Card */}
            <div className="cust-delivery-details-card glass-card" style={{ marginTop: '2.25rem' }}>
              <div className="card-section-header">
                <h3>👤 Customer & Delivery Details</h3>
              </div>

              {/* Section 1: Customer Details */}
              <div className="details-sub-section">
                <h4 className="sub-section-title">👤 Customer Details</h4>
                <div className="details-form-grid">
                  <div className="form-field-item">
                    <label className="field-label">Full Name *</label>
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="lux-input-field"
                    />
                  </div>

                  <div className="form-field-item">
                    <label className="field-label">Phone / WhatsApp Number *</label>
                    <input
                      type="tel"
                      placeholder="Enter contact number"
                      value={customerPhone}
                      onChange={(e) => {
                        setCustomerPhone(e.target.value.replace(/\D/g, ''));
                        setCustomerWhatsApp(e.target.value.replace(/\D/g, ''));
                      }}
                      className="lux-input-field"
                    />
                  </div>

                  <div className="form-field-item">
                    <label className="field-label">Recipient Name</label>
                    <input
                      type="text"
                      placeholder="Recipient's Name (if gifting)"
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                      className="lux-input-field"
                    />
                  </div>

                  <div className="form-field-item">
                    <label className="field-label">Recipient Phone Number</label>
                    <input
                      type="tel"
                      placeholder="Recipient's contact number"
                      value={recipientPhone}
                      onChange={(e) => setRecipientPhone(e.target.value.replace(/\D/g, ''))}
                      className="lux-input-field"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Delivery Details (Optional) */}
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
                      <option value="Morning (9 AM - 12 PM)">Morning (9 AM - 12 PM)</option>
                      <option value="Afternoon (12 PM - 4 PM)">Afternoon (12 PM - 4 PM)</option>
                      <option value="Evening (4 PM - 8 PM)">Evening (4 PM - 8 PM)</option>
                      <option value="Anytime Slot">Anytime Slot</option>
                    </select>
                  </div>

                  <div className="form-field-item full-width">
                    <label className="field-label">Delivery Address</label>
                    <textarea
                      rows={3}
                      placeholder="Enter complete shipping/delivery address..."
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      className="lux-textarea-field"
                    />
                  </div>
                </div>
              </div>

              {/* Section 3: Order Notes */}
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

              {/* Bottom WhatsApp Order Button */}
              <div style={{ marginTop: '1.75rem' }}>
                <button
                  className="btn btn-whatsapp-bakery w-full"
                  onClick={handleWhatsAppSend}
                  type="button"
                >
                  🟢 CHECKOUT & ORDER ON WHATSAPP
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: Bakery-Inspired Sticky Order Summary Panel (357px x 740px) */}
          <div className="customizer-summary-col">
            <div className="bakery-summary-card">
              <div className="bakery-summary-top">
                <div className="bakery-summary-header">
                  <h3>🍪 Order Summary</h3>
                </div>

                {/* Subtle Divider Beneath Title */}
                <div className="bakery-card-divider"></div>

                {/* Vertical Fields List with Balanced Spacing */}
                <div className="bakery-summary-fields">
                  <div className="bakery-summary-block row-align" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                    <span className="bakery-label">Selected Biscuits:</span>
                    <div className="bakery-val-text highlight-gold" style={{ textAlign: 'left', marginTop: '0.2rem', width: '100%' }}>
                      {selectedBiscuits.length > 0 ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                          {selectedBiscuits.map((biscuit) => (
                            <div key={biscuit} style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                              <span>• {biscuit}</span>
                              {selectedQuantity && <span style={{ color: '#6B7280', fontSize: '0.85rem' }}>({selectedQuantity})</span>}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <em className="placeholder-text">No biscuits selected.</em>
                      )}
                    </div>
                  </div>

                  <div className="bakery-summary-block row-align">
                    <span className="bakery-label">Dietary Preferences:</span>
                    <span className="bakery-val-text">
                      {selectedFeatures.length > 0 ? (
                        selectedFeatures.join(', ')
                      ) : (
                        <em className="placeholder-text">None Selected</em>
                      )}
                    </span>
                  </div>

                  <div className="bakery-summary-block row-align">
                    <span className="bakery-label">Selected Quantity:</span>
                    <span className="bakery-val-text">
                      {selectedQuantity ? selectedQuantity : <em className="placeholder-text">Not selected</em>}
                    </span>
                  </div>

                  <div className="bakery-summary-block row-align">
                    <span className="bakery-label">Pack Size:</span>
                    <span className="bakery-val-text">
                      {boxSize ? boxSize : <em className="placeholder-text">Not selected</em>}
                    </span>
                  </div>

                  <div className="bakery-summary-block row-align">
                    <span className="bakery-label">Gift Packaging:</span>
                    <span className="bakery-val-text">
                      {packagingStyle ? packagingStyle : <em className="placeholder-text">Not selected</em>}
                    </span>
                  </div>

                  <div className="bakery-summary-block row-align">
                    <span className="bakery-label">Ribbon Color:</span>
                    <span className="bakery-val-text">
                      {ribbonColor && ribbonColor !== 'None' ? ribbonColor : <em className="placeholder-text">None</em>}
                    </span>
                  </div>

                  <div className="bakery-summary-block row-align">
                    <span className="bakery-label">Occasion:</span>
                    <span className="bakery-val-text">
                      {occasion && occasion !== 'None' ? occasion : <em className="placeholder-text">None</em>}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bakery-summary-bottom">
                {/* Subtle Divider Before Checkout Section */}
                <div className="bakery-card-divider"></div>

                <button
                  className="btn btn-whatsapp-bakery w-full"
                  onClick={handleWhatsAppSend}
                  type="button"
                >
                  🟢 CHECKOUT & ORDER ON WHATSAPP
                </button>

                <div className="bakery-footer-tagline">
                  ✨ Freshly Baked With Love
                </div>

                <button
                  className="btn btn-reset-bakery w-full"
                  onClick={() => {
                    setSelectedBiscuits([]);
                    setSelectedFeatures([]);
                    setSelectedQuantity('');
                    setBoxSize('');
                    setPackagingStyle('');
                    setRibbonColor('');
                    setOccasion('');
                    setCustomMessage('');
                    setOrderNotes('');
                  }}
                  type="button"
                >
                  <FaMagic /> RESET CHOICES
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

      <BiscuitDetailsModal
        product={detailsModalProduct}
        isOpen={detailsModalProduct !== null}
        onClose={() => setDetailsModalProduct(null)}
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

        @keyframes twCardFadeUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
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

        @media (max-width: 768px) {
          .tw-hero-title {
            font-size: 34px;
          }
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

        .flavor-card {
          position: relative;
          opacity: 0;
          animation: twCardFadeUp 0.55s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .biscuit-radio-circle {
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

        .biscuit-radio-circle.selected {
          background: #E8C86A;
          border-color: #E8C86A;
          box-shadow: 0 0 10px rgba(232, 200, 106, 0.6);
        }

        .biscuit-radio-check {
          color: #FFFFFF;
          font-size: 11px;
        }

        .special-features-bar {
          padding: 1.25rem 1.5rem;
          margin-bottom: 2.5rem;
          border: 1px solid var(--gold-border);
          border-radius: var(--radius-md);
          background: #FFFFFF;
        }

        .features-flex {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
          justify-content: center;
          align-items: center;
        }

        .feature-chip-btn {
          font-weight: 600;
          font-size: 0.82rem;
          color: var(--text-main);
          background: #FFFDF9;
          border: 1px solid rgba(212, 175, 55, 0.3);
          border-radius: 50px;
          padding: 0.4rem 0.85rem;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        /* 🍪 Biscuit Customization Card & 2-Column Layout */
        .biscuit-customization-card {
          background: #FFFDF9;
          border: 1px solid #E8C86A;
          border-radius: 20px;
          padding: 32px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
        }

        .customization-card-header h3 {
          font-family: 'Playfair Display', 'Cormorant Garamond', Georgia, serif;
          font-size: 1.5rem;
          font-weight: 700;
          color: #3D2B1F;
          margin: 0 0 1.25rem 0;
          border-bottom: 1px solid rgba(232, 200, 106, 0.35);
          padding-bottom: 0.75rem;
        }

        .biscuit-customization-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2.25rem;
        }

        @media (max-width: 991px) {
          .biscuit-customization-grid {
            grid-template-columns: 1fr;
            gap: 1.75rem;
          }
        }

        .biscuit-custom-col {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .custom-field-group {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .custom-field-label {
          font-size: 0.92rem;
          font-weight: 700;
          color: #3D2B1F;
          letter-spacing: 0.01em;
        }

        .pill-buttons-wrap {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
        }

        .custom-pill-btn {
          font-size: 0.88rem;
          font-weight: 600;
          color: #3D2B1F;
          background: #FFFFFF;
          border: 1px solid #E8C86A;
          border-radius: 50px;
          padding: 0.5rem 1.1rem;
          cursor: pointer;
          transition: all 0.25s ease;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.03);
          user-select: none;
        }

        .custom-pill-btn:hover {
          transform: translateY(-2px);
          border-color: #25D366;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.06);
        }

        .custom-pill-btn.active {
          background: linear-gradient(135deg, #25D366, #1DA851);
          color: #FFFFFF;
          border-color: #25D366;
          box-shadow: 0 4px 14px rgba(37, 211, 102, 0.3);
        }

        .pill-check-icon {
          font-size: 0.78rem;
        }

        .custom-dropdown-select {
          width: 100%;
          padding: 0.8rem 1rem;
          border: 1px solid #E8C86A;
          border-radius: 12px;
          background: #FFFFFF;
          font-size: 0.92rem;
          color: #3D2B1F;
          font-family: inherit;
          font-weight: 500;
          transition: all 0.25s ease;
          box-sizing: border-box;
          cursor: pointer;
        }

        .custom-dropdown-select:focus {
          outline: none;
          border-color: #25D366;
          box-shadow: 0 0 0 3px rgba(37, 211, 102, 0.18);
        }

        .feature-chip-btn.active {
          background: var(--rose-primary);
          color: #FFFFFF;
          border-color: var(--rose-primary);
          box-shadow: 0 4px 12px rgba(194, 24, 91, 0.2);
        }

        .chip-check {
          font-size: 0.75rem;
          opacity: 0.5;
        }

        .feature-chip-btn.active .chip-check {
          opacity: 1;
        }

        .feature-tag {
          background: rgba(194, 24, 91, 0.08);
          color: var(--rose-primary);
          border: 1px solid rgba(194, 24, 91, 0.2);
          font-size: 0.75rem;
          font-weight: 600;
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
        }

        .biscuit-tag {
          background: rgba(212, 175, 55, 0.12);
          color: var(--gold-dark);
          border: 1px solid var(--gold-border);
          font-size: 0.75rem;
          font-weight: 600;
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
        }

        .summary-tags-wrap {
          display: flex;
          flex-wrap: wrap;
          gap: 0.35rem;
          justify-content: flex-end;
        }

        .summary-message {
          font-size: 0.85rem;
          color: var(--text-dark);
          font-style: italic;
          background: rgba(212, 175, 55, 0.06);
          padding: 0.5rem;
          border-radius: 6px;
          border-left: 3px solid var(--gold-primary);
          margin-top: 0.25rem;
          display: block;
        }

        .flavor-header-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.5rem;
        }

        .flavor-header-row h3 {
          font-family: 'Playfair Display', 'Cormorant Garamond', Georgia, serif;
          font-size: 1.5rem;
          font-weight: 700;
          color: #3D2B1F;
          margin: 0;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .selected-count-badge {
          background: linear-gradient(135deg, #FFFDF9 0%, #FAF0D7 100%);
          color: #B8860B;
          border: 1px solid #E8C86A;
          padding: 0.35rem 0.9rem;
          border-radius: 50px;
          font-size: 0.82rem;
          font-weight: 700;
          letter-spacing: 0.02em;
          box-shadow: 0 2px 6px rgba(212, 175, 55, 0.12);
          white-space: nowrap;
        }

        .flavors-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
          align-items: start;
        }

        @media (max-width: 991px) {
          .flavors-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 24px;
          }
        }

        @media (max-width: 600px) {
          .flavors-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
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
          border: 1px solid #E8D3A3;
          border-radius: 22px;
          padding: 20px;
          cursor: pointer;
          transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-self: stretch;
          height: 100%;
          position: relative;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
          box-sizing: border-box;
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

        .biscuit-ingredient-icon {
          position: absolute;
          top: 16px;
          left: 16px;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: #FFFDF9;
          border: 1px solid #E8D3A3;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          z-index: 5;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
        }

        .biscuit-radio-circle {
          position: absolute;
          top: 16px;
          right: 16px;
          width: 26px;
          height: 26px;
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

        .biscuit-radio-circle.selected {
          background: #E8C86A;
          border-color: #E8C86A;
          box-shadow: 0 0 10px rgba(232, 200, 106, 0.6);
        }

        .biscuit-radio-check {
          color: #FFFFFF;
          font-size: 11px;
        }

        .flavor-img-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 1 / 1.14;
          border-radius: 15px 15px 0 0;
          overflow: hidden;
          background: #FFFDF9;
          border: 1px solid rgba(232, 211, 163, 0.4);
          margin-bottom: 14px;
          box-sizing: border-box;
          cursor: pointer;
        }

        .flavor-thumb-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center center;
          border-radius: 15px 15px 0 0;
          display: block;
          transition: transform 0.5s ease;
        }

        .flavor-card:hover .flavor-thumb-img {
          transform: scale(1.06);
        }

        .flavor-content {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          flex-grow: 0;
          height: auto;
          text-align: left;
        }

        .biscuit-card-title {
          font-family: 'Playfair Display', 'Cormorant Garamond', Georgia, serif;
          font-size: 1.25rem;
          font-weight: 700;
          color: #3B2A24;
          margin: 0 0 6px 0;
          text-align: left;
        }

        .click-view-details-cta {
          color: #C75A73;
          font-size: 0.88rem;
          font-weight: 600;
          cursor: pointer;
          transition: color 0.25s ease;
          text-align: left;
          display: inline-block;
          margin-top: 2px;
          user-select: none;
        }

        .click-view-details-cta:hover,
        .flavor-card:hover .click-view-details-cta {
          color: #8C3A4F;
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

        /* 2-Column Desktop Layout with 357px Sticky Panel */
        .customizer-grid {
          display: grid;
          grid-template-columns: 1fr 357px;
          gap: 2rem;
          align-items: start;
          max-width: 1550px;
          margin: 0 auto;
        }

        @media (max-width: 991px) {
          .customizer-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
        }

        /* Clean Premium White Sticky Order Summary Panel (357px x 740px) */
        .bakery-summary-card {
          position: sticky;
          top: 90px;
          width: 357px;
          height: 740px;
          background: #FFFFFF;
          border: 1px solid #E8C86A;
          border-radius: 20px;
          padding: 28px 24px;
          box-shadow: 0 10px 30px rgba(110, 58, 70, 0.08);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          z-index: 10;
          box-sizing: border-box;
        }

        @media (max-width: 991px) {
          .bakery-summary-card {
            width: 100%;
            height: auto;
            min-height: auto;
            position: static;
            padding: 24px;
          }
        }

        .bakery-summary-header h3 {
          font-family: 'Cormorant Garamond', 'Playfair Display', Georgia, serif;
          font-size: 1.5rem;
          font-weight: 700;
          color: #3D2B1F;
          margin: 0;
          text-align: center;
        }

        .bakery-card-divider {
          height: 1px;
          background: rgba(232, 200, 106, 0.35);
          margin: 1.25rem 0;
          width: 100%;
        }

        .bakery-summary-fields {
          display: flex;
          flex-direction: column;
          gap: 1.35rem;
          margin-top: 0.5rem;
        }

        .bakery-summary-block.row-align {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 0.5rem;
        }

        .bakery-label {
          font-size: 0.88rem;
          font-weight: 700;
          color: #3D2B1F;
          letter-spacing: 0.01em;
          flex-shrink: 0;
        }

        .bakery-val-text {
          font-size: 0.95rem;
          font-weight: 500;
          color: #2C2224;
          word-break: break-word;
        }

        .bakery-val-text.highlight-gold {
          color: var(--rose-primary);
          font-weight: 700;
        }

        .placeholder-text {
          color: #9CA3AF;
          font-weight: 400;
          font-style: italic;
          font-size: 0.9rem;
        }

        .btn-whatsapp-bakery {
          background: linear-gradient(135deg, #25D366, #1DA851);
          color: #FFFFFF;
          border: none;
          padding: 1rem 1.5rem;
          border-radius: 14px;
          font-size: 0.95rem;
          font-weight: 800;
          letter-spacing: 0.03em;
          box-shadow: 0 6px 20px rgba(37, 211, 102, 0.3);
          transition: all 0.25s ease;
          cursor: pointer;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .btn-whatsapp-bakery:hover {
          background: #1DA851;
          transform: translateY(-2px);
          box-shadow: 0 10px 24px rgba(37, 211, 102, 0.4);
        }

        .bakery-footer-tagline {
          text-align: center;
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-style: italic;
          font-size: 1.15rem;
          color: #B8860B;
          font-weight: 600;
          margin: 0.85rem 0;
        }

        .btn-reset-bakery {
          background: #FFFFFF;
          color: #4B5563;
          border: 1px solid #D1D5DB;
          padding: 0.85rem 1rem;
          border-radius: 14px;
          font-size: 0.88rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.25s ease;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          letter-spacing: 0.03em;
        }

        .btn-reset-bakery:hover {
          color: #1F2937;
          border-color: #9CA3AF;
          background: #F9FAFB;
        }

        /* Customer & Delivery Details Card */
        .cust-delivery-details-card {
          margin-top: 2.25rem;
          background: #FFFFFF;
          border: 1px solid #E8C86A;
          border-radius: 20px;
          padding: 2.25rem 2rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
        }

        .card-section-header h3 {
          font-family: 'Cormorant Garamond', 'Playfair Display', Georgia, serif;
          font-size: 1.5rem;
          font-weight: 700;
          color: #3D2B1F;
          margin: 0 0 1.75rem 0;
          border-bottom: 2px solid rgba(232, 200, 106, 0.3);
          padding-bottom: 0.75rem;
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

        /* 🍪 Premium Biscuit Details Modal Styles (Resin Art Parity) */
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

export default BiscuitCustomizer;
