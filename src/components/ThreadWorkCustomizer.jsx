import React, { useState, useEffect } from 'react';
import { FaWhatsapp, FaCheck, FaHeart, FaStar, FaMagic, FaGift, FaUser, FaPhone, FaEnvelope, FaMapMarkerAlt, FaCalendarAlt, FaClock, FaGem, FaChevronDown, FaChevronUp, FaTimes, FaChevronLeft, FaChevronRight, FaSearchPlus } from 'react-icons/fa';
import WhatsAppModal from './WhatsAppModal';

export const THREADWORK_DESIGNS = [
  {
    id: 'tw-bridal-red',
    name: 'Royal Peacock Silk Thread Bridal Bangle Set',
    icon: '🧵',
    desc: 'Luxurious handcrafted royal blue silk thread bridal bangles featuring antique peacock motifs, premium kundan stones, sparkling crystals, and traditional temple-inspired detailing. Perfect for weddings, receptions, and festive occasions.',
    image: '/blue_peacock_bangles.jpg',
    images: ['/blue_peacock_bangles.jpg'],
    materials: 'Royal Blue Silk Thread, Antique Gold Peacock Motifs, Hand-set Kundan Stones & Crystals',
    processingTime: '3 – 5 Business Days (Handcrafted to Order)',
    careInstructions: 'Keep in an airtight box or velvet pouch. Avoid moisture, hairsprays, and harsh perfumes.',
    customizations: {
      sizes: ['2.2', '2.4', '2.6', '2.8', 'Custom Wrist Measure'],
      colors: ['Royal Peacock Blue', 'Emerald Green', 'Ruby Red', 'Gold & Pearl']
    },
    specs: [
      '100% Hand-embroidered Peacock Motifs & Silk Threadwork',
      'Hand-set Kundan Stones & Sparkling Crystals',
      'Custom Bridal Set of 24 to 44 Bangles'
    ],
    occasions: ['Bridal Weddings', 'Grand Receptions', 'Festive Celebrations']
  },
  {
    id: 'tw-purple-velvet',
    name: 'Royal Emerald Coin Silk Thread Bridal Bangle Set',
    icon: '💚',
    desc: 'Handcrafted emerald green silk thread bridal bangles featuring antique gold coin motifs, ruby-red stones, crystal embellishments, and traditional South Indian temple-inspired detailing. Perfect for weddings, bridal ceremonies, and festive occasions.',
    image: '/emerald_coin_bangles.jpg',
    images: ['/emerald_coin_bangles.jpg'],
    materials: 'Emerald Green Silk Thread, Antique Temple Coins, Ruby Kundan Crystals & Brass Base',
    processingTime: '3 – 4 Business Days',
    careInstructions: 'Wipe gently with a soft dry cloth after use. Store away from direct sunlight and humidity.',
    customizations: {
      sizes: ['2.2', '2.4', '2.6', '2.8'],
      colors: ['Emerald & Gold', 'Ruby & Emerald Mix', 'Classic Gold']
    },
    specs: [
      'Authentic Temple Coin Motifs & Kundan Details',
      'Premium Emerald Green Resham Thread Wrapping',
      'Comfortable & Durable Inner Frame'
    ],
    occasions: ['Weddings', 'Bridal Ceremonies', 'Traditional Festive Wear']
  },
  {
    id: 'tw-kundan-cuffs',
    name: 'Emerald Peacock Silk Thread Bangles',
    icon: '🦚',
    desc: 'Elegant handcrafted emerald green silk thread bangles featuring antique peacock motifs, premium kundan stones, sparkling crystals, and traditional gold embellishments. Perfect for weddings, festivals, return gifts, and special occasions.',
    image: '/emerald_peacock_bangles.png',
    images: ['/emerald_peacock_bangles.png'],
    materials: 'Emerald Green Resham Thread, Antique Gold Peacock Cuffs, Glass Kundan Crystals',
    processingTime: '2 – 4 Business Days',
    careInstructions: 'Store in dry cotton wrap. Keep away from water, soap, and chemicals.',
    customizations: {
      sizes: ['2.2', '2.4', '2.6', '2.8'],
      colors: ['Emerald Green', 'Peacock Blue', 'Crimson Red']
    },
    specs: [
      'Intricate Peacock Kundan Centerpieces',
      'Hand-wrapped Silk Thread Finish',
      'Set of Heavy Statement Bangle Cuffs'
    ],
    occasions: ['Wedding Favors', 'Sangeet & Mehndi', 'Festive Celebrations']
  },
  {
    id: 'tw-multicolor-set',
    name: 'Royal Emerald Peacock Bridal Bangle Set',
    icon: '✨',
    desc: 'Premium handcrafted emerald green silk thread bridal bangles featuring antique gold peacock motifs, sparkling mirror kundan stones, crystal embellishments, and intricate traditional detailing. A luxurious choice for weddings, bridal ceremonies, festivals, and special occasions.',
    image: '/royal_emerald_peacock_set.jpg',
    images: ['/royal_emerald_peacock_set.jpg'],
    materials: 'Emerald Silk Threads, Mirror Kundan Stones, Antique Gold Kada Castings',
    processingTime: '3 – 5 Business Days',
    careInstructions: 'Store flat in velvet box. Clean with microfiber cloth.',
    customizations: {
      sizes: ['2.2', '2.4', '2.6', '2.8', 'Custom Sizing'],
      colors: ['Royal Emerald & Gold', 'Ruby Red & Gold', 'Multicolor Velvet']
    },
    specs: [
      'Handcrafted Mirror Kundan & Gold Detailing',
      'Heavy Bridal Stack of 36 Bangles',
      'Includes Premium Kada Borders'
    ],
    occasions: ['Bridal Ceremonies', 'Grand Weddings', 'Reception & Party Wear']
  },
  {
    id: 'tw-floral-thread',
    name: 'Multicolor Designer Silk Thread Bangle Collection',
    icon: '🌈',
    desc: 'Vibrant handcrafted silk thread bangles in royal blue, mustard yellow, pink, emerald green, and crimson red, beautifully embellished with floral kundan stones, gold accents, and elegant traditional detailing. Perfect for festivals, bridal favors, return gifts, and everyday ethnic wear.',
    image: '/multicolor_bangles_collection.jpg',
    images: ['/multicolor_bangles_collection.jpg'],
    materials: 'Vibrant Silk Thread Palette, Gold Leaf Wire, Floral Kundan Flower Studs',
    processingTime: '2 – 3 Business Days',
    careInstructions: 'Avoid direct contact with liquids or perfumes. Store in airtight box.',
    customizations: {
      sizes: ['2.2', '2.4', '2.6', '2.8'],
      colors: ['Multicolor Rainbow Mix', 'Festive Pink & Yellow', 'Green & Red']
    },
    specs: [
      'Vibrant Multi-hue Silk Thread Collection',
      'Floral Kundan Accent Motifs',
      'Ideal for Return Gifts & Bulk Favors'
    ],
    occasions: ['Return Gifts', 'Mehndi Functions', 'Everyday Festive Styling']
  },
  {
    id: 'tw-bridal-chooda',
    name: 'Lotus Kundan Designer Bangles',
    icon: '🪷',
    desc: 'Elegant handcrafted silk thread bangles featuring lotus-shaped ruby pink kundan stones, emerald green accents, antique gold detailing, and sparkling crystal embellishments. A graceful design perfect for weddings, festive occasions, traditional ceremonies, and premium gifting.',
    image: '/lotus_kundan_bangles.png',
    images: ['/lotus_kundan_bangles.png'],
    materials: 'Ruby Pink Kundan Crystals, Emerald Glass Accents, Gold Thread Finish',
    processingTime: '2 – 4 Business Days',
    careInstructions: 'Keep in soft pouch. Wipe gently after wearing.',
    customizations: {
      sizes: ['2.2', '2.4', '2.6', '2.8'],
      colors: ['Lotus Ruby Pink', 'Emerald Green', 'Royal Maroon']
    },
    specs: [
      'Graceful Lotus Motif Kundan Inlays',
      'Delicate Silk Thread Ribbon Wrap',
      'Set of Elegant Traditional Kada Bangles'
    ],
    occasions: ['Pooja & Festivals', 'Traditional Ceremonies', 'Premium Gifting']
  },
  {
    id: 'tw-pearl-bead',
    name: 'Designer Silk Thread Latkans',
    icon: '✨',
    desc: 'Elegant handcrafted silk thread latkans decorated with premium kundan stones, pearl detailing, and vibrant silk colors. Perfect for bridal blouses, sarees, lehengas, return gifts, potli bags, and festive decorations. Each piece is handmade with fine craftsmanship and premium materials.',
    image: '/designer_silk_latkans.png',
    images: ['/designer_silk_latkans.png'],
    materials: 'Vibrant Resham Silk Tassels, Faux Pearls, Kundan Beads & Gold Cord',
    processingTime: '2 – 3 Business Days',
    careInstructions: 'Store flat to keep tassel threads neat. Avoid moisture.',
    customizations: {
      sizes: ['Standard Blouse/Lehenga Size'],
      colors: ['Deep Red', 'Emerald Green', 'Royal Blue', 'Golden Yellow']
    },
    specs: [
      '100% Hand-tied Silk Latkans',
      'Embedded Kundan & Pearl Clusters',
      'Ideal for Blouses, Lehengas & Potli Accessories'
    ],
    occasions: ['Bridal Lehengas', 'Blouse Accessories', 'Potli Bags & Favors']
  },
  {
    id: 'tw-customized-name',
    name: 'Designer Silk Thread Finger Rings',
    icon: '💍',
    desc: 'Beautiful handcrafted silk thread finger rings featuring premium kundan stone work, vibrant silk thread colors, pearl embellishments, and elegant handcrafted detailing. Lightweight, stylish, and perfect for weddings, festive celebrations, return gifts, mehendi ceremonies, and everyday traditional wear.',
    image: '/designer_silk_finger_rings.png',
    images: ['/designer_silk_finger_rings.png'],
    materials: 'Adjustable Metal Band, Silk Thread Wrap, Kundan Stone Flower Motif',
    processingTime: '1 – 2 Business Days',
    careInstructions: 'Remove before washing hands or applying lotions.',
    customizations: {
      sizes: ['Adjustable Universal Ring Size'],
      colors: ['Pink & Gold', 'Green & Pearl', 'Red & Kundan']
    },
    specs: [
      'Adjustable Free-size Ring Base',
      'Hand-wrapped Silk Thread Flower Accent',
      'Lightweight & Skin-friendly'
    ],
    occasions: ['Mehendi Ceremony', 'Festival Favors', 'Ethnic Party Wear']
  },
  {
    id: 'tw-pearl-bridal',
    name: 'Handcrafted Silk Thread Hair Band',
    icon: '🌸',
    desc: 'Premium handmade silk thread hair band featuring an elegant floral kundan centerpiece with antique gold detailing, emerald green stones, and sparkling crystal accents. Lightweight, comfortable, and perfect for weddings, festive occasions, traditional wear, and special celebrations.',
    image: '/silk_thread_hair_band.png',
    images: ['/silk_thread_hair_band.png'],
    materials: 'Satin & Silk Thread Wrapped Band, Antique Gold Kundan Brooch',
    processingTime: '2 – 3 Business Days',
    careInstructions: 'Store in hard box to maintain band curvature. Keep dry.',
    customizations: {
      sizes: ['Standard Flexible Comfort Fit'],
      colors: ['Emerald & Gold', 'Ruby Red', 'Royal Blue']
    },
    specs: [
      'Flexible Ergonomic Hairband Core',
      'Hand-embroidered Kundan Brooch',
      'Non-slip Soft Inner Cushion'
    ],
    occasions: ['Weddings', 'Haldi & Sangeet', 'Festive Celebrations']
  },
  {
    id: 'tw-temple-silk',
    name: 'Handcrafted Floral Silk Thread Hair Band',
    icon: '🌺',
    desc: 'Beautiful handmade silk thread hair band featuring a floral kundan centerpiece with antique gold detailing, pearl accents, and a ruby-pink center stone. Designed for weddings, festive occasions, traditional wear, and elegant everyday styling. Comfortable, lightweight, and crafted with premium-quality materials.',
    image: '/floral_silk_thread_hair_band.png',
    images: ['/floral_silk_thread_hair_band.png'],
    materials: 'Resham Silk Thread, Pearl Bead Clusters, Ruby Centerpiece Kundan',
    processingTime: '2 – 3 Business Days',
    careInstructions: 'Store in clean pouch. Do not crush or wash.',
    customizations: {
      sizes: ['Standard Flexible Comfort Fit'],
      colors: ['Ruby Floral Pink', 'Emerald Green', 'Mustard Gold']
    },
    specs: [
      'Hand-assembled Floral Kundan Motif',
      'Soft Silk Ribbon Wrapper',
      'Comfortable All-day Wear Design'
    ],
    occasions: ['Bridal Functions', 'Temple Visits', 'Family Celebrations']
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

export const ProductDetailsModal = ({ product, isOpen, onClose }) => {
  const [activeImgIndex, setActiveImgIndex] = useState(0);

  useEffect(() => {
    setActiveImgIndex(0);
  }, [product]);

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

  // Extract all available fields safely with friendly fallbacks
  const title = product.name || 'Handcrafted Boutique Piece';
  const icon = product.icon || '🧵';
  const category = product.category || 'Thread Work Bangle Collection';
  const shortDesc = product.shortDesc || 'Exquisite artisanal creation handcrafted with premium silk threads, kundan stones, and traditional detailing.';
  const fullDesc = product.description || product.desc || 'Designed exclusively for festive celebrations and bridal wear, featuring meticulously handcrafted silk thread wrapping, authentic Kundan stone borders, and rich gold accents.';
  
  // Image gallery support (array or single image string)
  const imageList = Array.isArray(product.images) && product.images.length > 0 
    ? product.images 
    : (product.image ? [product.image] : ['/blue_peacock_bangles.jpg']);
  
  const currentImage = imageList[activeImgIndex] || imageList[0] || '/blue_peacock_bangles.jpg';

  // Materials & Specs (Craftsmanship Details)
  const materialsText = typeof product.materials === 'string' 
    ? product.materials 
    : '100% Handcrafted Zardosi, Silk Threads & Gold Resham with Authentic Kundan Stones';
  
  const craftsmanshipSpecs = Array.isArray(product.specs) && product.specs.length > 0
    ? product.specs
    : [
        '100% Hand-embroidered Zardosi & Silk Threadwork',
        'Authentic Kundan stones, pearls & glass beads',
        'Velvet finish over durable inner bangle frame'
      ];

  // Colors & Sizes
  const colorOptions = product.customizations?.colors || ['Signature Mix', 'Royal Blue & Gold', 'Emerald Green', 'Deep Red & Maroon'];
  const sizeOptions = product.customizations?.sizes || ['2.2', '2.4', '2.6', '2.8', 'Custom Wrist Measure'];

  // Care instructions
  const careText = product.careInstructions || product.care || 'Avoid direct contact with water, perfume, or spray. Store in an airtight velvet pouch to preserve silk and metal luster.';

  return (
    <div className="modal-backdrop-overlay" onClick={onClose}>
      <div className="product-details-modal-box" onClick={(e) => e.stopPropagation()}>
        {/* Close (X) Icon Button */}
        <button className="modal-close-icon" onClick={onClose} title="Close Modal (ESC)">
          <FaTimes />
        </button>

        <div className="modal-two-col-grid">
          {/* Left Column: Large Product Image Gallery */}
          <div className="modal-image-col">
            <div className="modal-img-wrap">
              <img src={currentImage} alt={title} className="modal-main-img" />
              <div className="modal-img-badge">✨ Handmade Studio Piece</div>
            </div>

            {/* Thumbnail Row if multiple images */}
            {imageList.length > 1 && (
              <div className="modal-thumbs-row">
                {imageList.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`modal-thumb-btn ${idx === activeImgIndex ? 'active' : ''}`}
                    onClick={() => setActiveImgIndex(idx)}
                  >
                    <img src={img} alt={`Thumb ${idx + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Information Only (No price, delivery time, or WhatsApp order button) */}
          <div className="modal-details-col">
            <div className="modal-header-block">
              <span className="modal-category-tag">🧵 {category}</span>
              <h2 className="modal-product-title">{icon} {title}</h2>
              <p className="modal-short-desc-highlight">{shortDesc}</p>
            </div>

            <div className="modal-body-scroll">
              {/* Detailed Description */}
              <div className="modal-section-block">
                <h4>📜 Detailed Description</h4>
                <p className="modal-desc-text">{fullDesc}</p>
              </div>

              {/* Available Colors */}
              <div className="modal-section-block">
                <h4>🎨 Available Colors</h4>
                <p className="modal-info-p">
                  {Array.isArray(colorOptions) ? colorOptions.join(', ') : colorOptions}
                </p>
              </div>

              {/* Available Sizes */}
              <div className="modal-section-block">
                <h4>📏 Available Sizes</h4>
                <p className="modal-info-p">
                  {Array.isArray(sizeOptions) ? sizeOptions.join(', ') : sizeOptions}
                </p>
              </div>

              {/* Materials Used */}
              <div className="modal-section-block">
                <h4>💎 Materials Used</h4>
                <p className="modal-info-p">{materialsText}</p>
              </div>

              {/* Craftsmanship Details */}
              <div className="modal-section-block">
                <h4>✨ Craftsmanship Details</h4>
                <ul className="modal-specs-list">
                  {craftsmanshipSpecs.map((spec, i) => (
                    <li key={i}>✨ {spec}</li>
                  ))}
                </ul>
              </div>

              {/* Care Instructions */}
              <div className="modal-section-block">
                <h4>🌿 Care Instructions</h4>
                <p className="modal-info-p">{careText}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ThreadWorkCard = ({ tw, idx, isSelected, onSelect, onOpenDetailsModal }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const cardRef = React.useRef(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const staggerDelay = (idx % 4) * 80;

  const handleCardClick = () => {
    onSelect(tw.name);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect(tw.name);
    }
  };

  return (
    <div
      ref={cardRef}
      tabIndex={0}
      role="button"
      aria-pressed={isSelected}
      aria-label={`Select ${tw.name}`}
      className={`flavor-card ${isSelected ? 'selected' : ''} ${isVisible ? 'fade-in-visible' : ''}`}
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      style={{
        animationDelay: `${staggerDelay}ms`,
        cursor: 'pointer'
      }}
    >
      {/* Top-Right Circular Radio Checkmark Badge */}
      <div className={`tw-radio-circle ${isSelected ? 'selected' : ''}`}>
        {isSelected && <FaCheck className="tw-radio-check" />}
      </div>

      <div className="flavor-img-wrap">
        {!imgLoaded && <div className="skeleton-img-placeholder skeleton-shimmer" />}
        <img 
          src={tw.image} 
          alt={tw.name} 
          className={`flavor-thumb-img ${imgLoaded ? 'loaded' : 'loading'}`}
          loading="lazy"
          decoding="async"
          onLoad={() => setImgLoaded(true)}
          onError={() => setImgLoaded(true)}
        />
      </div>

      <div className="flavor-content">
        <div className="flavor-title-row">
          <span className="flavor-icon">{tw.icon}</span>
          <h4>{tw.name}</h4>
        </div>

        <div 
          className="card-view-details-link"
          onClick={(e) => { 
            e.stopPropagation(); 
            onOpenDetailsModal(tw); 
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.stopPropagation();
              onOpenDetailsModal(tw);
            }
          }}
        >
          <span>View Details →</span>
        </div>
      </div>
    </div>
  );
};

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
  const [detailsModalProduct, setDetailsModalProduct] = useState(null);
  const [waModalOpen, setWaModalOpen] = useState(false);
  const [waOrderText, setWaOrderText] = useState('');
  const [lightboxIndex, setLightboxIndex] = useState(null);

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
        <div className="hero-header-wrap">
          <div className="tw-hero-subtitle">🧵 HANDMADE THREAD WORK STUDIO</div>
          <h1 className="tw-hero-title">Customize Your Thread Work</h1>
          <p className="tw-hero-description">
            Create your dream handcrafted thread work with <span className="gold-highlight">premium silk threads</span>, elegant <span className="gold-highlight">kundan stones</span>, pearls, zardosi work, and <span className="gold-highlight">personalized color combinations</span>. Every piece is <span className="gold-highlight">handmade with love</span> and <span className="gold-highlight">customized for weddings, festivals, and special occasions</span>.
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

        {/* Highlights Bar */}
        <div className="special-features-bar">
          <div className="features-flex">
            {THREADWORK_HIGHLIGHTS.map((feat, idx) => (
              <span key={idx} className="feature-pill">
                <FaGem style={{ color: '#C89B3C', fontSize: '18px' }} /> {feat}
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
                  return (
                    <ThreadWorkCard
                      key={tw.id}
                      tw={tw}
                      idx={idx}
                      isSelected={isSelected}
                      onSelect={(name) => selectDesign(name)}
                      onOpenDetailsModal={(item) => setDetailsModalProduct(item)}
                    />
                  );
                })}
              </div>
            </div>

            {/* Step 2: Customization Options */}
            <div className="cust-delivery-details-card glass-card">
              <div className="card-section-header">
                <h3>🎁 Customization Options</h3>
                <p className="step-hint">Specify your preferences for size, theme, ribbon, and occasion.</p>
              </div>

              <div className="details-form-grid">
                <div className="form-field-item">
                  <label className="field-label">📐 Wrist / Bangle Size</label>
                  <div className="select-wrapper">
                    <select 
                      value={wristSize} 
                      onChange={(e) => setWristSize(e.target.value)}
                      className="lux-select-field"
                    >
                      <option value="None">None (Default Standard)</option>
                      <option value="2.2 (Small)">2.2 (Small - 2.125")</option>
                      <option value="2.4 (Standard Medium)">2.4 (Standard Medium - 2.25")</option>
                      <option value="2.6 (Large)">2.6 (Large - 2.375")</option>
                      <option value="2.8 (Extra Large)">2.8 (Extra Large - 2.5")</option>
                      <option value="Custom Wrist Measure">Custom Wrist Measure</option>
                    </select>
                    <FaChevronDown className="select-arrow" />
                  </div>
                  <span className="field-helper">Choose standard Indian bangle size or custom measure.</span>
                </div>

                <div className="form-field-item">
                  <label className="field-label">🎨 Color Theme & Palette</label>
                  <div className="select-wrapper">
                    <select 
                      value={colorTheme} 
                      onChange={(e) => setColorTheme(e.target.value)}
                      className="lux-select-field"
                    >
                      <option value="None">None (Default Signature)</option>
                      <option value="Crimson Red & Gold">Crimson Red & Gold</option>
                      <option value="Royal Purple & Gold">Royal Purple & Gold</option>
                      <option value="Emerald Green & Kundan">Emerald Green & Kundan</option>
                      <option value="Blush Rose & Pearls">Blush Rose & Pearls</option>
                      <option value="Multicolor Festive Mix">Multicolor Festive Mix</option>
                    </select>
                    <FaChevronDown className="select-arrow" />
                  </div>
                  <span className="field-helper">Select silk thread & embroidery color shade.</span>
                </div>

                <div className="form-field-item">
                  <label className="field-label">🎁 Packaging Style</label>
                  <div className="select-wrapper">
                    <select 
                      value={packagingStyle} 
                      onChange={(e) => setPackagingStyle(e.target.value)}
                      className="lux-select-field"
                    >
                      <option value="None">None (Standard Packaging)</option>
                      <option value="Boutique Premium">Boutique Premium Box</option>
                      <option value="Bridal Velvet Box">Bridal Velvet Box</option>
                      <option value="Wedding Favor Hamper">Wedding Favor Hamper</option>
                    </select>
                    <FaChevronDown className="select-arrow" />
                  </div>
                  <span className="field-helper">Signature handcrafted gift box options.</span>
                </div>

                <div className="form-field-item">
                  <label className="field-label">🎀 Ribbon Color</label>
                  <div className="select-wrapper">
                    <select 
                      value={ribbonColor} 
                      onChange={(e) => setRibbonColor(e.target.value)}
                      className="lux-select-field"
                    >
                      <option value="None">None (Default Satin)</option>
                      <option value="Gold">Luxury Gold Ribbon</option>
                      <option value="Rose Gold">Rose Gold Satin</option>
                      <option value="Silver">Shimmering Silver</option>
                      <option value="Red">Crimson Red Satin</option>
                      <option value="Pink">Blush Pink Satin</option>
                      <option value="White">Pure Ivory Ribbon</option>
                    </select>
                    <FaChevronDown className="select-arrow" />
                  </div>
                  <span className="field-helper">Decorative ribbon tie for gift boxes.</span>
                </div>

                <div className="form-field-item full-width">
                  <label className="field-label">🎉 Occasion & Event</label>
                  <div className="select-wrapper">
                    <select 
                      value={occasion} 
                      onChange={(e) => setOccasion(e.target.value)}
                      className="lux-select-field"
                    >
                      <option value="None">None (General Purchase)</option>
                      <option value="Wedding / Reception">Wedding / Bridal Reception</option>
                      <option value="Mehendi / Sangeet">Mehendi / Sangeet Ceremony</option>
                      <option value="Anniversary">Anniversary Celebration</option>
                      <option value="Festival / Puja">Festival / Puja Special</option>
                      <option value="Bridal Gift">Bridal Gift Hamper</option>
                    </select>
                    <FaChevronDown className="select-arrow" />
                  </div>
                  <span className="field-helper">Optional event tag for custom card messaging.</span>
                </div>
              </div>
            </div>

            {/* Step 3: Customer & Delivery Details Section */}
            <div className="cust-delivery-details-card glass-card">
              <div className="card-section-header">
                <h3>👤 Customer & Delivery Details</h3>
                <p className="step-hint">Please provide your contact information to confirm your order directly on WhatsApp.</p>
              </div>

              <div className="details-form-grid">
                {/* Left Column: Customer Information */}
                <div className="form-column-block">
                  <h4 className="sub-section-title">👤 Customer Details</h4>

                  <div className="form-field-item">
                    <label className="field-label">Full Name <span className="req-star">*</span></label>
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
                    <label className="field-label">Phone Number <span className="req-star">*</span></label>
                    <input
                      type="tel"
                      placeholder="10-digit mobile number"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value.replace(/\D/g, ''))}
                      className="lux-input-field"
                      required
                    />
                  </div>

                  <div className="form-field-item">
                    <label className="field-label">WhatsApp Number <span className="req-star">*</span></label>
                    <input
                      type="tel"
                      placeholder="WhatsApp number for order confirmation"
                      value={customerWhatsApp}
                      onChange={(e) => setCustomerWhatsApp(e.target.value.replace(/\D/g, ''))}
                      className="lux-input-field"
                      required
                    />
                  </div>

                  <div className="form-field-item">
                    <label className="field-label">Email Address <span className="opt-tag">(Optional)</span></label>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="lux-input-field"
                    />
                    <span className="field-helper">For order updates & digital invoices.</span>
                  </div>
                </div>

                {/* Right Column: Recipient & Delivery Schedule */}
                <div className="form-column-block">
                  <h4 className="sub-section-title">🎁 Recipient & Schedule <span className="opt-tag">(Optional)</span></h4>

                  <div className="form-field-item">
                    <label className="field-label">Recipient Name <span className="opt-tag">(Optional)</span></label>
                    <input
                      type="text"
                      placeholder="Recipient's full name if gifting"
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                      className="lux-input-field"
                    />
                  </div>

                  <div className="form-field-item">
                    <label className="field-label">Recipient Phone <span className="opt-tag">(Optional)</span></label>
                    <input
                      type="tel"
                      placeholder="Recipient's contact phone number"
                      value={recipientPhone}
                      onChange={(e) => setRecipientPhone(e.target.value.replace(/\D/g, ''))}
                      className="lux-input-field"
                    />
                  </div>

                  <div className="form-field-item">
                    <label className="field-label">Preferred Delivery Date <span className="opt-tag">(Optional)</span></label>
                    <input
                      type="date"
                      min={new Date().toISOString().split('T')[0]}
                      value={deliveryDate}
                      onChange={(e) => setDeliveryDate(e.target.value)}
                      className="lux-input-field date-picker"
                    />
                  </div>

                  <div className="form-field-item">
                    <label className="field-label">Delivery Time Slot <span className="opt-tag">(Optional)</span></label>
                    <div className="select-wrapper">
                      <select
                        value={deliveryTime}
                        onChange={(e) => setDeliveryTime(e.target.value)}
                        className="lux-select-field"
                      >
                        <option value="">Select Preferred Time Slot</option>
                        <option value="Morning">Morning (9:00 AM - 12:00 PM)</option>
                        <option value="Afternoon">Afternoon (12:00 PM - 4:00 PM)</option>
                        <option value="Evening">Evening (4:00 PM - 8:00 PM)</option>
                        <option value="Anytime">Anytime Slot</option>
                      </select>
                      <FaChevronDown className="select-arrow" />
                    </div>
                  </div>
                </div>

                {/* Full Width Bottom: Delivery Address & Order Notes */}
                <div className="form-field-item full-width" style={{ marginTop: '0.5rem' }}>
                  <label className="field-label">Delivery Address <span className="opt-tag">(Optional)</span></label>
                  <textarea
                    rows={3}
                    placeholder="Enter street address, flat/suite, landmark, city, state, and pincode..."
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    className="lux-textarea-field"
                  />
                  <span className="field-helper">Providing your address speeds up instant WhatsApp dispatch.</span>
                </div>

                <div className="form-field-item full-width">
                  <label className="field-label">Order Notes & Special Instructions <span className="opt-tag">(Optional)</span></label>
                  <textarea
                    rows={3}
                    placeholder="Add custom size requests, gift message notes, or color customization details..."
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                    className="lux-textarea-field"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Minimal Order Summary Panel */}
          <div className="customizer-summary-col">
            <div className="summary-sticky-card">
              <h3 className="summary-title">📋 Order Summary</h3>

              <div className="summary-details-list">
                <div className="summary-item">
                  <span className="summary-label">Selected Style</span>
                  <span className="summary-val highlight-gold">
                    {selectedDesign ? selectedDesign : <em className="none-tag">No product selected</em>}
                  </span>
                </div>

                <div className="summary-item">
                  <span className="summary-label">Wrist Size</span>
                  <span className="summary-val">
                    {wristSize && wristSize !== 'None' ? wristSize : <em className="none-tag">Standard (2.4)</em>}
                  </span>
                </div>

                <div className="summary-item">
                  <span className="summary-label">Color Theme</span>
                  <span className="summary-val">
                    {colorTheme && colorTheme !== 'None' ? colorTheme : <em className="none-tag">Signature Mix</em>}
                  </span>
                </div>

                <div className="summary-item">
                  <span className="summary-label">Packaging</span>
                  <span className="summary-val">
                    {packagingStyle && packagingStyle !== 'None' ? packagingStyle : <em className="none-tag">Boutique Box</em>}
                  </span>
                </div>

                <div className="summary-item">
                  <span className="summary-label">Ribbon Color</span>
                  <span className="summary-val">
                    {ribbonColor && ribbonColor !== 'None' ? ribbonColor : <em className="none-tag">Gold Satin</em>}
                  </span>
                </div>

                <div className="summary-item">
                  <span className="summary-label">Occasion</span>
                  <span className="summary-val">
                    {occasion && occasion !== 'None' ? occasion : <em className="none-tag">Personal Special</em>}
                  </span>
                </div>

                <div className="summary-divider"></div>

                <div className="summary-item">
                  <span className="summary-label">Customer</span>
                  <span className="summary-val">
                    {customerName.trim() ? customerName : <em className="none-tag">Not entered</em>}
                  </span>
                </div>

                <div className="summary-item">
                  <span className="summary-label">WhatsApp</span>
                  <span className="summary-val">
                    {customerWhatsApp.trim() ? customerWhatsApp : <em className="none-tag">Not entered</em>}
                  </span>
                </div>
              </div>

              <div className="summary-actions">
                <button
                  type="button"
                  className={`btn btn-whatsapp-order w-full ${!selectedDesign ? 'disabled-wa-btn' : ''}`}
                  onClick={handleWhatsAppSend}
                  disabled={!selectedDesign}
                  style={{
                    opacity: !selectedDesign ? 0.55 : 1,
                    cursor: !selectedDesign ? 'not-allowed' : 'pointer'
                  }}
                  title={!selectedDesign ? 'Please select a Thread Work product card above' : 'Order on WhatsApp'}
                >
                  <FaWhatsapp className="wa-btn-icon" /> Order on WhatsApp
                </button>

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
                  <FaMagic /> Reset Choices
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ProductDetailsModal
        product={detailsModalProduct}
        isOpen={detailsModalProduct !== null}
        onClose={() => setDetailsModalProduct(null)}
        onSelectDesign={(name) => setSelectedDesign(name)}
      />

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
          margin: 0 auto 3.5rem auto;
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
          .special-features-bar { padding: 18px 14px; }
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
            transform: translateY(24px);
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

        .summary-sticky-card {
          position: relative;
          top: 0;
          background: #FFFFFF;
          border-radius: 15px;
          border: 1px solid rgba(212, 175, 55, 0.25);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
          padding: 24px;
          box-sizing: border-box;
        }

        .summary-title {
          font-family: var(--font-serif);
          font-size: 1.25rem;
          font-weight: 700;
          color: #2C2224;
          margin-bottom: 1rem;
          border-bottom: 1px solid rgba(212, 175, 55, 0.2);
          padding-bottom: 8px;
        }

        .summary-details-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-bottom: 1.25rem;
        }

        .summary-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 14.5px;
          gap: 0.5rem;
        }

        .summary-label {
          font-weight: 500;
          color: #7A6B63;
          flex-shrink: 0;
        }

        .summary-val {
          font-weight: 600;
          color: #2C2224;
          text-align: right;
          word-break: break-word;
        }

        .summary-val.highlight-gold {
          color: #D4AF37;
          font-weight: 700;
        }

        .none-tag {
          color: #A09088;
          font-style: italic;
          font-weight: 400;
        }

        .summary-divider {
          height: 1px;
          background: rgba(212, 175, 55, 0.2);
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
          border: 1px solid rgba(212, 175, 55, 0.4);
          border-radius: 12px;
          padding: 0.7rem 1rem;
          font-weight: 600;
          font-size: 0.88rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-outline-gold:hover {
          background: #FFFDF9;
          border-color: #D4AF37;
        }

        .btn-whatsapp-order {
          height: 50px;
          width: 100%;
          border-radius: 12px;
          background: #25D366;
          color: #FFFFFF;
          font-size: 15px;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          border: none;
          cursor: pointer;
          transition: background 0.2s ease;
        }

        .btn-whatsapp-order:hover {
          background: #1DA851;
        }

        .wa-btn-icon {
          font-size: 18px;
        }

        .summary-trust-badge {
          font-size: 12.5px;
          color: #7A6B63;
          text-align: center;
          margin-top: 10px;
          line-height: 1.45;
        }

        .tw-5col-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          column-gap: 24px;
          row-gap: 24px;
          max-width: 1400px;
          margin: 0 auto;
          align-items: stretch;
        }

        @media (max-width: 1199px) {
          .tw-5col-grid {
            grid-template-columns: repeat(3, 1fr);
            column-gap: 20px;
            row-gap: 20px;
          }
        }

        @media (max-width: 991px) {
          .tw-5col-grid {
            grid-template-columns: repeat(2, 1fr);
            column-gap: 16px;
            row-gap: 20px;
          }
        }

        @media (max-width: 576px) {
          .tw-5col-grid {
            grid-template-columns: repeat(1, 1fr);
            column-gap: 16px;
            row-gap: 16px;
          }
        }

        .flavor-card {
          background: #FFFFFF;
          border: 1.5px solid rgba(212, 175, 55, 0.25);
          border-radius: 18px;
          padding: 0;
          cursor: pointer;
          transition: transform 300ms ease, border-color 300ms ease, box-shadow 300ms ease;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-self: stretch;
          height: 100%;
          position: relative;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
          overflow: hidden;
          box-sizing: border-box;
          opacity: 0;
          transform: translateY(20px) scale(0.97);
          will-change: opacity, transform;
        }

        .flavor-card.fade-in-visible {
          animation: twCardFadeUp 0.4s cubic-bezier(0.25, 1, 0.5, 1) forwards;
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

        @media (hover: hover) and (pointer: fine) {
          .flavor-card:hover {
            transform: translateY(-5px);
            border-color: rgba(212, 175, 55, 0.45);
            box-shadow: 0 14px 34px rgba(61, 43, 31, 0.10), 0 6px 20px rgba(212, 175, 55, 0.16);
          }

          .flavor-card:hover .flavor-thumb-img {
            transform: scale(1.03);
          }
        }

        .flavor-card.selected {
          border: 2px solid #D4AF37 !important;
          background: #FFFDF9 !important;
          box-shadow: 0 8px 25px rgba(212, 175, 55, 0.25), 0 0 15px rgba(246, 211, 101, 0.3) !important;
          transform: scale(1.02) !important;
        }

        .tw-radio-circle {
          position: absolute;
          top: 12px;
          right: 12px;
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.9);
          border: 1.5px solid rgba(212, 175, 55, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
          transition: all 0.25s ease;
        }

        .tw-radio-circle.selected {
          background: linear-gradient(135deg, #F6D365 0%, #D4AF37 50%, #C79A2B 100%);
          border-color: transparent;
          color: #FFFFFF;
        }

        .tw-radio-check {
          font-size: 13px;
          color: #FFFFFF;
        }

        .flavor-img-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 5;
          border-radius: 18px 18px 0 0;
          overflow: hidden;
          background: #FFFDF9;
          padding: 0;
          margin: 0;
          border-bottom: 1px solid rgba(212, 175, 55, 0.15);
          box-sizing: border-box;
          cursor: pointer;
        }

        .flavor-thumb-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
          filter: brightness(1.025) contrast(1.045) saturate(1.035) sepia(0.03);
          will-change: transform;
          backface-visibility: hidden;
          transition: opacity 350ms ease-out, transform 300ms ease, filter 300ms ease;
        }

        .flavor-content {
          padding: 18px 18px 20px 18px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          text-align: center;
          background: #FFFFFF;
          flex-grow: 1;
          box-sizing: border-box;
        }

        .flavor-title-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          margin-bottom: 0;
          width: 100%;
        }

        .flavor-icon {
          font-size: 1.1rem;
          flex-shrink: 0;
        }

        .flavor-title-row h4 {
          font-family: var(--font-serif);
          font-size: 19.5px;
          font-weight: 600;
          color: var(--text-dark);
          line-height: 1.45;
          letter-spacing: 0.25px;
          height: 2.9em;
          max-height: 2.9em;
          margin: 0;
          text-align: center;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .card-view-details-link {
          font-family: var(--font-sans);
          font-size: 16px;
          font-weight: 500;
          color: #D4AF37;
          margin-top: 16px;
          cursor: pointer;
          transition: color 0.25s ease, border-color 0.25s ease, transform 0.25s ease;
          text-align: center;
          display: inline-block;
          user-select: none;
          text-decoration: none;
          border-bottom: 1px solid transparent;
          line-height: 1.3;
        }

        .card-view-details-link:hover {
          color: #B8860B;
          border-bottom-color: #B8860B;
          text-decoration: underline;
          transform: translateY(-1px);
        }
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

        .modal-backdrop-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.65);
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
          border-radius: 18px;
          border: 1px solid rgba(212, 175, 55, 0.25);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.18);
          width: 100%;
          max-width: 920px;
          max-height: 88vh;
          position: relative;
          overflow: hidden;
          animation: modalFadeScale 0.28s cubic-bezier(0.25, 1, 0.5, 1) forwards;
          display: flex;
          flex-direction: column;
        }

        @keyframes modalFadeScale {
          from {
            opacity: 0;
            transform: scale(0.94) translateY(12px);
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
          color: #2C2224;
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
          background: #D4AF37;
          color: #FFFFFF;
          transform: scale(1.08);
        }

        .modal-two-col-grid {
          display: grid;
          grid-template-columns: 55% 45%;
          height: 100%;
          max-height: 88vh;
          overflow: hidden;
        }

        @media (max-width: 768px) {
          .product-details-modal-box {
            width: 95%;
            max-height: 92vh;
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
            max-height: 300px !important;
          }

          .modal-details-col {
            padding: 20px 18px !important;
            overflow-y: visible !important;
            max-height: none !important;
          }
        }

        .modal-image-col {
          padding: 24px;
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
          min-height: 360px;
          max-height: 520px;
          position: relative;
          border-radius: 14px;
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
          color: #2C2224;
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
          max-height: 88vh;
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
          color: #D4AF37;
          font-weight: 700;
          display: block;
          margin-bottom: 4px;
        }

        .modal-product-title {
          font-family: var(--font-serif);
          font-size: 24px;
          font-weight: 700;
          color: #2C2224;
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
          color: #2C2224;
          margin: 0 0 6px 0;
        }

        .modal-desc-text {
          font-size: 14.5px;
          line-height: 1.6;
          color: #5A4A42;
          margin: 0;
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

        .modal-tag-pill {
          display: inline-block;
          font-size: 12px;
          font-weight: 500;
          color: #2C2224;
          background: #FFFDF9;
          border: 1px solid rgba(212, 175, 55, 0.3);
          padding: 4px 12px;
          border-radius: 50px;
          margin-right: 6px;
          margin-top: 4px;
        }

        .modal-actions-bar {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: 20px;
          padding-top: 16px;
          border-top: 1px solid rgba(212, 175, 55, 0.2);
        }

        .btn-select-design {
          flex: 1;
          height: 48px;
          background: linear-gradient(135deg, #F6D365 0%, #D4AF37 50%, #C79A2B 100%);
          color: #FFFFFF;
          border: none;
          border-radius: 12px;
          font-weight: 700;
          font-size: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          cursor: pointer;
          transition: all 0.25s ease;
          box-shadow: 0 4px 14px rgba(212, 175, 55, 0.3);
        }

        .btn-select-design:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(212, 175, 55, 0.4);
        }

        .btn-close-modal {
          height: 48px;
          padding: 0 22px;
          background: #F3F4F6;
          color: #4B5563;
          border: 1px solid #E5E7EB;
          border-radius: 12px;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.22s ease;
        }

        .btn-close-modal:hover {
          background: #E5E7EB;
          color: #1F2937;
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

        /* Customer & Delivery Details & Customization Options Cards */
        .cust-delivery-details-card {
          margin-top: 2.5rem;
          background: #FFFFFF;
          border: 1px solid rgba(212, 175, 55, 0.25);
          border-radius: 16px;
          padding: 32px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
          box-sizing: border-box;
        }

        .card-section-header h3 {
          font-family: var(--font-serif);
          font-size: 1.55rem;
          font-weight: 700;
          color: #2C2224;
          margin: 0 0 0.35rem 0;
        }

        .card-section-header .step-hint {
          margin-bottom: 2rem;
          color: #7A6B63;
          font-size: 0.92rem;
          line-height: 1.45;
        }

        .form-column-block {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .sub-section-title {
          font-family: var(--font-serif);
          font-size: 1.15rem;
          font-weight: 600;
          color: var(--gold-dark);
          margin: 0 0 0.5rem 0;
          padding-bottom: 8px;
          border-bottom: 1.5px dashed rgba(212, 175, 55, 0.3);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .details-form-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }

        @media (max-width: 991px) {
          .details-form-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .cust-delivery-details-card {
            padding: 24px 18px;
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
          font-size: 16.5px;
          font-weight: 600;
          color: #2C2224;
          letter-spacing: 0.01em;
          margin-bottom: 2px;
          display: flex;
          align-items: center;
        }

        .req-star {
          color: #D4AF37;
          font-weight: 700;
          margin-left: 4px;
        }

        .opt-tag {
          color: #8A7A70;
          font-size: 13.5px;
          font-weight: 500;
          margin-left: 6px;
        }

        .field-helper {
          font-size: 13.5px;
          color: #7A6B63;
          margin-top: 4px;
          line-height: 1.35;
        }

        .select-wrapper {
          position: relative;
          width: 100%;
          display: flex;
          align-items: center;
        }

        .select-arrow {
          position: absolute;
          right: 18px;
          color: #D4AF37;
          font-size: 13px;
          pointer-events: none;
          transition: transform 0.25s ease;
        }

        .lux-input-field,
        .lux-select-field {
          height: 52px;
          width: 100%;
          background: #FFFDF9;
          border: 1px solid rgba(212, 175, 55, 0.3);
          border-radius: 12px;
          padding: 0 18px;
          font-size: 16px;
          color: #2C2224;
          font-family: var(--font-sans);
          box-sizing: border-box;
          outline: none;
          transition: all 0.25s ease;
        }

        .lux-select-field {
          appearance: none;
          -webkit-appearance: none;
          -moz-appearance: none;
          padding-right: 44px;
          cursor: pointer;
        }

        .lux-textarea-field {
          width: 100%;
          background: #FFFDF9;
          border: 1px solid rgba(212, 175, 55, 0.3);
          border-radius: 12px;
          padding: 14px 18px;
          font-size: 16px;
          color: #2C2224;
          font-family: var(--font-sans);
          box-sizing: border-box;
          outline: none;
          resize: vertical;
          min-height: 105px;
          transition: all 0.25s ease;
        }

        .lux-input-field::placeholder,
        .lux-textarea-field::placeholder {
          color: #A09088;
        }

        .lux-input-field:focus,
        .lux-select-field:focus,
        .lux-textarea-field:focus {
          border-color: #D4AF37;
          box-shadow: 0 0 0 4px rgba(212, 175, 55, 0.15);
          background: #FFFFFF;
        }

        .date-picker::-webkit-calendar-picker-indicator {
          cursor: pointer;
          filter: invert(48%) sepia(79%) saturate(457%) hue-rotate(6deg) brightness(92%) contrast(89%);
        }
      `}</style>
    </section>
  );
};

export default ThreadWorkCustomizer;
