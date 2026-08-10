import React, { useState, useEffect } from 'react';
import { FaWhatsapp, FaCheck, FaHeart, FaStar, FaMagic, FaGift, FaUser, FaPhone, FaEnvelope, FaMapMarkerAlt, FaCalendarAlt, FaClock, FaGem, FaTimes, FaChevronLeft, FaChevronRight, FaPalette, FaArrowRight } from 'react-icons/fa';
import WhatsAppModal from './WhatsAppModal';

export const RESINART_DESIGNS = [
  {
    id: 'ra-coasters',
    name: 'Personalized Resin Wedding Photo Frame',
    icon: '🖼️',
    category: '🎨 PERSONALIZED RESIN ART COLLECTION',
    shortDesc: 'A timeless handcrafted wedding keepsake capturing your most cherished bridal photo in crystal-clear resin.',
    detailedDesc: 'This luxury handcrafted resin frame features your favorite wedding photograph set amidst hand-arranged preserved bridal flowers, gold leaf accents, and custom calligraphy. Crafted with UV-resistant high-clarity resin, it serves as an enduring symbol of love and commitment for your home decor.',
    image: '/resin_coasters_set.jpg',
    images: ['/resin_coasters_set.jpg'],
    availableColors: ['Royal Blue', 'Blush Pink', 'Ruby Red', 'Pearl White', 'Luxury Gold', 'Custom Color'],
    availableSizes: ['Small (6" x 8")', 'Medium (8" x 10")', 'Large (10" x 12")', 'Custom Size'],
    materials: 'Premium epoxy resin, preserved wedding flowers, gold leaf flakes, high-resolution photo print, acrylic base frame',
    customizationOptions: ['Couple Names', 'Wedding Date & Venue', 'Custom Photo', 'Romantic Quote', 'Color Theme'],
    craftsmanshipSpecs: [
      'Handmade resin artwork',
      'Carefully arranged decorative elements',
      'High-quality resin finish',
      'Personalized according to customer requirements'
    ],
    careInstructions: 'Keep away from direct sunlight, excessive heat, moisture, and harsh chemicals. Clean gently with a soft dry cloth.'
  },
  {
    id: 'ra-photo-frame',
    name: 'Personalized Resin Calendar Keepsake',
    icon: '📅',
    category: '🎨 PERSONALIZED RESIN ART COLLECTION',
    shortDesc: 'Highlight your special date forever on an elegant resin calendar plaque featuring custom photo and floral detailing.',
    detailedDesc: 'Celebrate birthdays, anniversaries, or wedding dates with this bespoke resin calendar stand. It combines a high-definition photograph, custom calendar grid highlighting your special date, preserved dried flowers, and shimmering gold foil embedded in durable resin.',
    image: '/resin_photo_plaque.jpg',
    images: ['/resin_photo_plaque.jpg'],
    availableColors: ['Rose Gold', 'Emerald Green', 'Pearl White', 'Classic Gold', 'Sky Blue', 'Custom Color'],
    availableSizes: ['Small (6" x 6")', 'Medium (8" x 8")', 'Large (10" x 10")', 'Custom Size'],
    materials: 'Crystal-clear epoxy resin, preserved dried botanicals, metallic calendar grid, gold foil flakes, photo print, wooden display stand',
    customizationOptions: ['Special Month & Date Circle', 'Customer / Couple Names', 'Personal Photo Upload', 'Custom Short Message', 'Floral Color Palette'],
    craftsmanshipSpecs: [
      'Handmade resin artwork',
      'Carefully arranged decorative elements',
      'High-quality resin finish',
      'Personalized according to customer requirements'
    ],
    careInstructions: 'Keep away from direct sunlight, excessive heat, moisture, and harsh chemicals. Clean gently with a soft dry cloth.'
  },
  {
    id: 'ra-keychains',
    name: 'Personalized Resin Anniversary Plaque',
    icon: '💍',
    category: '🎨 PERSONALIZED RESIN ART COLLECTION',
    shortDesc: 'A sophisticated handcrafted anniversary plaque blending couple portrait, custom vows, and gold leaf elements.',
    detailedDesc: 'Crafted to honor milestone wedding anniversaries, this handcrafted resin plaque incorporates high-grade crystal-clear resin poured over real preserved florals, personalized names, anniversary year, and romantic lettering. Designed to stand beautifully on mantlepieces or side tables.',
    image: '/resin_keychains.jpg',
    images: ['/resin_keychains.jpg'],
    availableColors: ['Ruby Red', 'Royal Gold', 'Blush Pink', 'Champagne White', 'Deep Navy', 'Custom Color'],
    availableSizes: ['Medium (8" x 10")', 'Large (10" x 12")', 'Extra Large (12" x 14")', 'Custom Size'],
    materials: 'Optical grade epoxy resin, preserved real flowers, gold foil gilding, high-res photograph, premium wooden/acrylic stand',
    customizationOptions: ['Anniversary Year & Date', 'Husband & Wife Names', 'Wedding / Couple Photo', 'Personal Vows / Quote', 'Gold/Silver Leaf Accents'],
    craftsmanshipSpecs: [
      'Handmade resin artwork',
      'Carefully arranged decorative elements',
      'High-quality resin finish',
      'Personalized according to customer requirements'
    ],
    careInstructions: 'Keep away from direct sunlight, excessive heat, moisture, and harsh chemicals. Clean gently with a soft dry cloth.'
  },
  {
    id: 'ra-bracelets',
    name: 'Personalized Resin Valentine Plaque',
    icon: '❤️',
    category: '🎨 PERSONALIZED RESIN ART COLLECTION',
    shortDesc: 'A charming Valentine artwork featuring a custom couple illustration, romantic text, and glossy resin dome.',
    detailedDesc: 'Express your love with this handcrafted Valentine resin plaque. Designed with vibrant custom couple artwork, personalized names, romantic messages, and glittering accents, it makes a heartfelt gift for Valentine\'s Day, proposals, and sweet romantic surprises.',
    image: '/resin_bracelets_rakhi.jpg',
    images: ['/resin_bracelets_rakhi.jpg'],
    availableColors: ['Crimson Red', 'Pastel Pink', 'Pure White', 'Rose Gold', 'Lavender', 'Custom Color'],
    availableSizes: ['Small (5" x 7")', 'Medium (7" x 9")', 'Large (9" x 11")', 'Custom Size'],
    materials: 'Non-yellowing resin, custom couple illustration print, decorative glitter, preserved rose petals, gold foil flakes',
    customizationOptions: ['Couple Names', 'Love Quote / Vow', 'Illustration Style', 'Heart & Flower Embellishments', 'Background Color Theme'],
    craftsmanshipSpecs: [
      'Handmade resin artwork',
      'Carefully arranged decorative elements',
      'High-quality resin finish',
      'Personalized according to customer requirements'
    ],
    careInstructions: 'Keep away from direct sunlight, excessive heat, moisture, and harsh chemicals. Clean gently with a soft dry cloth.'
  },
  {
    id: 'ra-clock',
    name: 'Personalized Resin Couple Plaque',
    icon: '💖',
    category: '🎨 PERSONALIZED RESIN ART COLLECTION',
    shortDesc: 'A stunning romantic plaque showcasing couple memories, personalized names, and shimmering gold foil.',
    detailedDesc: 'Celebrate your togetherness with this bespoke couple plaque. Formulated with premium clear resin, real dried flowers, personalized couple name art, and delicate gold foil flakes, it creates an elegant table centerpiece that captures romantic moments forever.',
    image: '/resin_clock.jpg',
    images: ['/resin_clock.jpg'],
    availableColors: ['Emerald Green', 'Royal Blue', 'Champagne Gold', 'Blush Pink', 'Ivory White', 'Custom Color'],
    availableSizes: ['Medium (8" x 8")', 'Large (10" x 10")', 'Grand (12" x 12")', 'Custom Size'],
    materials: 'High-gloss epoxy resin, real dried botanicals, gold leafing, custom couple photo print, acrylic easel',
    customizationOptions: ['Couple Names & Date', 'Photo Upload', 'Background Color Tint', 'Gold / Silver Flakes', 'Personalized Love Message'],
    craftsmanshipSpecs: [
      'Handmade resin artwork',
      'Carefully arranged decorative elements',
      'High-quality resin finish',
      'Personalized according to customer requirements'
    ],
    careInstructions: 'Keep away from direct sunlight, excessive heat, moisture, and harsh chemicals. Clean gently with a soft dry cloth.'
  },
  {
    id: 'ra-frame-keepsake',
    name: 'Personalized Resin Love Memory Plaque',
    icon: '❤️',
    category: '🎨 PERSONALIZED RESIN ART COLLECTION',
    shortDesc: 'Preserve your favorite memory in a luxury resin plaque embedded with real flowers and gold leaf.',
    detailedDesc: 'Turn your favorite photograph into a forever memory with this handcrafted resin love plaque. Each piece is individually poured using crystal-clear resin to preserve real dried flowers, custom typography, and gold leaf accents surrounding your picture.',
    image: '/personalized_resin_photo_frame.jpg',
    images: ['/personalized_resin_photo_frame.jpg'],
    availableColors: ['Blush Pink', 'Sapphire Blue', 'Burgundy Red', 'Pearl Gold', 'White & Rose', 'Custom Color'],
    availableSizes: ['Small (6" x 8")', 'Medium (8" x 10")', 'Large (10" x 12")', 'Custom Size'],
    materials: 'Crystal-clear resin, real preserved garden flowers, gold foil flakes, high-resolution photo print, sturdy stand',
    customizationOptions: ['Custom Photo', 'Names & Anniversary / Event Date', 'Personalized Memory Quote', 'Floral Theme & Color Palette'],
    craftsmanshipSpecs: [
      'Handmade resin artwork',
      'Carefully arranged decorative elements',
      'High-quality resin finish',
      'Personalized according to customer requirements'
    ],
    careInstructions: 'Keep away from direct sunlight, excessive heat, moisture, and harsh chemicals. Clean gently with a soft dry cloth.'
  },
  {
    id: 'ra-serving-tray',
    name: 'Personalized Resin Initial Keychain',
    icon: '🗝️',
    category: '🎨 PERSONALIZED RESIN ART COLLECTION',
    shortDesc: 'A chic personalized initial keychain with embedded glitter, real flowers, and gold keyring.',
    detailedDesc: 'Carry a piece of personalized luxury everywhere with this initial resin keychain. Handcrafted with non-toxic crystal resin, dried flowers, gold leaf flakes, and a sturdy gold key ring with matching tassel, it is ideal for personal use and return gifts.',
    image: '/resin_serving_tray.jpg',
    images: ['/resin_serving_tray.jpg'],
    availableColors: ['Pink & Gold', 'Blue & Silver', 'Purple & Pearl', 'Black & Gold', 'Red & Rose Gold', 'Custom Color'],
    availableSizes: ['Small (Standard 1.5")', 'Medium', 'Large', 'Custom Size'],
    materials: 'UV-resistant epoxy resin, initial mold, glitter, gold foil, dried flowers, metal keyring & suede tassel',
    customizationOptions: ['Alphabet / Letter Choice (A-Z)', 'Customer name', 'Date', 'Initials', 'Color theme', 'Design theme'],
    craftsmanshipSpecs: [
      'Handmade resin artwork',
      'Carefully arranged decorative elements',
      'High-quality resin finish',
      'Personalized according to customer requirements'
    ],
    careInstructions: 'Keep away from direct sunlight, excessive heat, moisture, and harsh chemicals. Clean gently with a soft dry cloth.'
  },
  {
    id: 'ra-name-plate',
    name: 'Personalized Resin VOD Photo Stand',
    icon: '✨',
    category: '🎨 PERSONALIZED RESIN ART COLLECTION',
    shortDesc: 'An exclusive VOD style photo stand combining personalized couple photo and resin art.',
    detailedDesc: 'This luxury VOD (Vision of Desire) photo stand features a crystal-clear resin block showcasing a couple portrait, customized names, special date, and gold foil accents. Designed to create a captivating visual centerpiece for bedrooms and living spaces.',
    image: '/resin_name_plate.jpg',
    images: ['/resin_name_plate.jpg'],
    availableColors: ['Crystal Clear & Gold', 'Ocean Blue', 'Blush Rose', 'Emerald Gold', 'Obsidian Black', 'Custom Color'],
    availableSizes: ['Medium (7" x 9")', 'Large (9" x 11")', 'Grand (11" x 13")', 'Custom Size'],
    materials: 'Heavyweight optical resin, high-res photo print, gold leafing, dried florals, acrylic base stand',
    customizationOptions: ['Couple Photo Upload', 'Customer name', 'Date', 'Quote/message', 'Color theme', 'Design theme'],
    craftsmanshipSpecs: [
      'Handmade resin artwork',
      'Carefully arranged decorative elements',
      'High-quality resin finish',
      'Personalized according to customer requirements'
    ],
    careInstructions: 'Keep away from direct sunlight, excessive heat, moisture, and harsh chemicals. Clean gently with a soft dry cloth.'
  },
  {
    id: 'ra-jewelry-tray',
    name: 'Personalized Resin Heart Keepsake',
    icon: '💖',
    category: '🎨 PERSONALIZED RESIN ART COLLECTION',
    shortDesc: 'A romantic heart-shaped resin block encasing personalized names, preserved roses, and gold foil.',
    detailedDesc: 'Express romantic devotion with this heart-shaped resin keepsake. Handcrafted using high-purity clear resin poured over real preserved red and pink roses, gold leafing, and custom calligraphy names. A romantic treasure for engagements, weddings, and anniversaries.',
    image: '/resin_jewelry_tray.jpg',
    images: ['/resin_jewelry_tray.jpg'],
    availableColors: ['Ruby & Gold', 'Rose Pink & Pearl', 'Crystal Clear & Gold', 'Deep Purple & Silver', 'Custom Color'],
    availableSizes: ['Small (4" x 4")', 'Medium (6" x 6")', 'Large (8" x 8")', 'Custom Size'],
    materials: 'Optical grade epoxy resin, preserved red/pink rose petals, gold foil leafing, custom calligraphy print',
    customizationOptions: ['Customer name', 'Date', 'Photo', 'Quote/message', 'Initials', 'Color theme', 'Design theme'],
    craftsmanshipSpecs: [
      'Handmade resin artwork',
      'Carefully arranged decorative elements',
      'High-quality resin finish',
      'Personalized according to customer requirements'
    ],
    careInstructions: 'Keep away from direct sunlight, excessive heat, moisture, and harsh chemicals. Clean gently with a soft dry cloth.'
  },
  {
    id: 'ra-candle-holder',
    name: 'Personalized Resin Rakhi Collection',
    icon: '✨',
    category: '🎨 PERSONALIZED RESIN ART COLLECTION',
    shortDesc: 'Elegant handcrafted resin Rakhis featuring personalized names, pearl beads, and gold thread cords.',
    detailedDesc: 'Celebrate Raksha Bandhan with personalized resin Rakhis crafted with clear resin dials encasing your brother\'s or family names, dried petals, and sparkling glitter. Paired with soft silk cords and pearl accents, it becomes a memorable keepsake to treasure long after the festival.',
    image: '/resin_candle_holder.jpg',
    images: ['/resin_candle_holder.jpg'],
    availableColors: ['Royal Blue', 'Emerald Green', 'Maroon Red', 'Sunshine Yellow', 'Pastel Pink', 'Custom Color'],
    availableSizes: ['Small (Standard Wrist)', 'Medium', 'Large', 'Custom Size'],
    materials: 'Non-toxic resin, personalized name prints, dried petals, pearl beads, silk thread cords, metallic charm rings',
    customizationOptions: ['Customer name', 'Date', 'Initials', 'Color theme', 'Design theme'],
    craftsmanshipSpecs: [
      'Handmade resin artwork',
      'Carefully arranged decorative elements',
      'High-quality resin finish',
      'Personalized according to customer requirements'
    ],
    careInstructions: 'Keep away from direct sunlight, excessive heat, moisture, and harsh chemicals. Clean gently with a soft dry cloth.'
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

export const ResinArtDetailsModal = ({ product, isOpen, onClose }) => {
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

  const category = product.category || '🎨 PERSONALIZED RESIN ART COLLECTION';
  const name = product.name || 'Personalized Resin Artwork';
  const shortDesc = product.shortDesc || 'Luxury handcrafted resin creation tailored to preserve your special memories.';
  const detailedDesc = product.detailedDesc || product.desc || 'Crafted using premium crystal-clear epoxy resin, preserved botanicals, custom photography, and gold foil accents. Every piece is carefully poured and hand-finished for high durability and timeless beauty.';
  
  const colors = Array.isArray(product.availableColors) 
    ? product.availableColors 
    : ['Royal Blue', 'Blush Pink', 'Ruby Red', 'Pearl White', 'Luxury Gold', 'Custom Color'];
  
  const sizes = Array.isArray(product.availableSizes) 
    ? product.availableSizes 
    : ['Small', 'Medium', 'Large', 'Custom Size'];

  const materials = typeof product.materials === 'string'
    ? product.materials
    : 'Premium epoxy resin, dried flowers, decorative stones, glitter, gold flakes, printed photographs, decorative elements';

  const customizationOptions = Array.isArray(product.customizationOptions)
    ? product.customizationOptions
    : ['Customer name', 'Date', 'Photo', 'Quote/message', 'Initials', 'Color theme', 'Design theme'];

  const craftsmanshipSpecs = Array.isArray(product.craftsmanshipSpecs)
    ? product.craftsmanshipSpecs
    : [
        '✨ Handmade resin artwork',
        '✨ Carefully arranged decorative elements',
        '✨ High-quality resin finish',
        '✨ Personalized according to customer requirements'
      ];

  const careText = product.careInstructions || 'Keep away from direct sunlight, excessive heat, moisture, and harsh chemicals. Clean gently with a soft dry cloth.';

  return (
    <div className="modal-backdrop-overlay" onClick={onClose}>
      <div className="product-details-modal-box resin-modal-box" onClick={(e) => e.stopPropagation()}>
        {/* Close (X) Icon Button */}
        <button className="modal-close-icon" onClick={onClose} title="Close Modal (ESC)">
          <FaTimes />
        </button>

        <div className="modal-two-col-grid">
          {/* Left Column: Large Product Image */}
          <div className="modal-image-col">
            <div className="modal-img-wrap">
              <img src={product.image} alt={name} className="modal-main-img" />
              <div className="modal-img-badge">✨ Handcrafted Resin Studio</div>
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
              {/* Detailed Description */}
              <div className="modal-section-block">
                <h4>📜 Detailed Description</h4>
                <p className="modal-desc-text">{detailedDesc}</p>
              </div>

              {/* Available Colors / Designs */}
              <div className="modal-section-block">
                <h4>🎨 Available Colors / Designs</h4>
                <div className="modal-chips-flex">
                  {colors.map((c, i) => (
                    <span key={i} className="modal-chip-item">{c}</span>
                  ))}
                </div>
              </div>

              {/* Available Sizes */}
              <div className="modal-section-block">
                <h4>📏 Available Sizes</h4>
                <div className="modal-chips-flex">
                  {sizes.map((s, i) => (
                    <span key={i} className="modal-chip-item">{s}</span>
                  ))}
                </div>
              </div>

              {/* Materials Used */}
              <div className="modal-section-block">
                <h4>💎 Materials Used</h4>
                <p className="modal-info-p">{materials}</p>
              </div>

              {/* Customization Options */}
              <div className="modal-section-block">
                <h4>✨ Customization Options</h4>
                <ul className="modal-specs-list">
                  {customizationOptions.map((opt, i) => (
                    <li key={i}>✨ {opt}</li>
                  ))}
                </ul>
              </div>

              {/* Craftsmanship Details */}
              <div className="modal-section-block">
                <h4>🪄 Craftsmanship Details</h4>
                <ul className="modal-specs-list">
                  {craftsmanshipSpecs.map((spec, i) => (
                    <li key={i}>{spec.startsWith('✨') ? spec : `✨ ${spec}`}</li>
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

const ResinArtCard = ({ ra, idx, isSelected, isExpanded, onSelect, onToggleExpand, onOpenLightbox, onOpenDetailsModal }) => {
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
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const staggerDelay = (idx % 4) * 80;

  if (!ra) return null;

  return (
    <div
      ref={cardRef}
      tabIndex={0}
      role="button"
      aria-pressed={isSelected}
      aria-label={`Select ${ra.name || 'Resin Art'}`}
      className={`flavor-card ${isSelected ? 'selected' : ''} ${isExpanded ? 'card-is-expanded' : ''} ${isVisible ? 'fade-in-visible' : ''}`}
      onClick={() => onSelect(ra.name)}
      style={{
        animationDelay: `${staggerDelay}ms`,
        cursor: 'pointer'
      }}
    >
      {/* Top-Right Circular Radio Button */}
      <div className={`resin-radio-circle ${isSelected ? 'selected' : ''}`}>
        {isSelected && <FaCheck className="resin-radio-check" />}
      </div>

      <div 
        className="flavor-img-wrap"
        onClick={(e) => onOpenLightbox(e, idx)}
        title="Click to view full-screen photo preview"
      >
        {!imgLoaded && <div className="skeleton-img-placeholder skeleton-shimmer" />}
        <img 
          src={ra.image || '/placeholder.jpg'} 
          alt={ra.name || 'Resin Art'} 
          className={`flavor-thumb-img ${imgLoaded ? 'loaded' : 'loading'}`}
          loading="lazy"
          decoding="async"
          onLoad={() => setImgLoaded(true)}
          onError={() => setImgLoaded(true)}
        />
      </div>

      <div className="flavor-content">
        <div className="flavor-title-row">
          <FaGem className="flavor-card-svg-icon" />
          <h4 className="flavor-serif-title">{ra.name || 'Custom Resin Creation'}</h4>
        </div>
        <div 
          className="click-view-details-cta card-view-details-link"
          onClick={(e) => {
            e.stopPropagation();
            if (onOpenDetailsModal) {
              onOpenDetailsModal(ra);
            } else if (onToggleExpand) {
              onToggleExpand(ra.id, e);
            }
          }}
        >
          <span>View Details</span>
          <FaArrowRight className="view-details-arrow" />
        </div>

        {/* Smooth Accordion Expanded Drawer */}
        {isExpanded && (
          <div className="card-expanded-drawer open">
            <div className="drawer-inner-content">
              <p className="drawer-desc">{ra.desc || 'Handcrafted luxury resin art creation.'}</p>

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
};

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
  const [detailsModalProduct, setDetailsModalProduct] = useState(null);

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
            Turn your <span className="gold-highlight">precious memories</span> into <span className="gold-highlight">timeless resin art</span>. Preserve <span className="gold-highlight">wedding flowers</span>, photos, and special keepsakes with <span className="gold-highlight">crystal-clear resin</span> and <span className="gold-highlight">personalized designs</span>. <span className="gold-highlight">Handmade with love</span> for <span className="gold-highlight">memories that last forever</span>.
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
                {RESINART_DESIGNS.map((ra, idx) => (
                  <ResinArtCard
                    key={ra.id}
                    ra={ra}
                    idx={idx}
                    isSelected={selectedDesign === ra.name}
                    isExpanded={expandedCardId === ra.id}
                    onSelect={selectDesign}
                    onToggleExpand={toggleCardExpansion}
                    onOpenLightbox={openLightbox}
                    onOpenDetailsModal={(item) => setDetailsModalProduct(item)}
                  />
                ))}
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

      <ResinArtDetailsModal
        product={detailsModalProduct}
        isOpen={detailsModalProduct !== null}
        onClose={() => setDetailsModalProduct(null)}
      />

      <WhatsAppModal
        isOpen={waModalOpen}
        onClose={() => setWaModalOpen(false)}
        messageText={waOrderText}
      />

      {lightboxIndex !== null && RESINART_DESIGNS[lightboxIndex] && (
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
                  src={RESINART_DESIGNS[lightboxIndex]?.image || ''} 
                  alt={RESINART_DESIGNS[lightboxIndex]?.name || 'Resin Art'} 
                  className="lightbox-full-img"
                />
              </div>
              <div className="lightbox-info-bar">
                <span className="lightbox-counter">{lightboxIndex + 1} / {RESINART_DESIGNS.length}</span>
                <h3 className="lightbox-title">{RESINART_DESIGNS[lightboxIndex]?.name || ''}</h3>
                <p className="lightbox-desc-text">{RESINART_DESIGNS[lightboxIndex]?.desc || ''}</p>
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
          background: #FFFDF8;
          border-radius: 20px;
          border: 1px solid rgba(200, 155, 60, 0.25);
          box-shadow: 0 12px 35px rgba(0, 0, 0, 0.06);
          padding: 1.75rem 1.5rem;
          z-index: 10;
        }

        .summary-title {
          font-family: var(--font-serif);
          font-size: 1.45rem;
          font-weight: 700;
          color: #2D2523;
          margin-bottom: 1.25rem;
          border-bottom: 1px solid rgba(200, 155, 60, 0.25);
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
          color: #2D2523;
          flex-shrink: 0;
        }

        .summary-val {
          font-weight: 500;
          color: #5A4A42;
          text-align: right;
          word-break: break-word;
        }

        .summary-val.highlight-gold {
          color: #C89B3C;
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
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: #FFFFFF;
          border: 1.5px solid rgba(200, 155, 60, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          transition: all 250ms ease;
        }

        .resin-radio-circle.selected {
          background: linear-gradient(135deg, #F6D365 0%, #C89B3C 50%, #B3832A 100%);
          border-color: transparent;
          color: #FFFFFF;
          box-shadow: 0 4px 12px rgba(200, 155, 60, 0.35);
        }

        .resin-radio-check {
          color: #FFFFFF;
          font-size: 13px;
        }

        .products-3col-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          column-gap: 24px;
          row-gap: 24px;
          max-width: 1400px;
          margin: 0 auto;
          align-items: stretch;
        }

        @media (max-width: 1199px) {
          .products-3col-grid {
            grid-template-columns: repeat(3, 1fr);
            column-gap: 20px;
            row-gap: 20px;
          }
        }

        @media (max-width: 991px) {
          .products-3col-grid {
            grid-template-columns: repeat(2, 1fr);
            column-gap: 16px;
            row-gap: 20px;
          }
        }

        @media (max-width: 576px) {
          .products-3col-grid {
            grid-template-columns: repeat(1, 1fr);
            column-gap: 16px;
            row-gap: 16px;
          }
        }

        .flavor-card {
          background: #FFFDF8;
          border: 1px solid rgba(212, 175, 55, 0.18);
          border-radius: 20px;
          padding: 0;
          cursor: pointer;
          transition: transform 300ms ease, border-color 300ms ease, box-shadow 300ms ease;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-self: stretch;
          height: 100%;
          position: relative;
          box-shadow: 0 12px 35px rgba(0, 0, 0, 0.06);
          overflow: hidden;
          box-sizing: border-box;
          opacity: 0;
          transform: translateY(20px) scale(0.97);
          will-change: opacity, transform;
        }

        .flavor-card.fade-in-visible {
          animation: twCardFadeUp 0.55s cubic-bezier(0.22, 1, 0.36, 1) forwards;
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
            transform: translateY(-4px) scale(1.02);
            border-color: rgba(212, 175, 55, 0.45);
            box-shadow: 0 16px 40px rgba(61, 43, 31, 0.08), 0 6px 20px rgba(200, 155, 60, 0.18);
          }

          .flavor-card:hover .flavor-thumb-img {
            transform: scale(1.03);
            filter: brightness(1.04) contrast(1.05) saturate(1.04) sepia(0.03);
          }

          .flavor-card:hover .card-view-details-link {
            color: #B3832A;
          }

          .flavor-card:hover .view-details-arrow {
            transform: translateX(4px);
          }
        }

        .flavor-card.selected {
          border: 2px solid #C89B3C !important;
          background: #FFFDF8 !important;
          box-shadow: 0 8px 30px rgba(200, 155, 60, 0.28), 0 0 18px rgba(246, 211, 101, 0.35) !important;
          transform: translateY(-4px) scale(1.02) !important;
        }

        .flavor-img-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 5;
          border-radius: 20px 20px 0 0;
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
          padding: 20px 20px 22px 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          text-align: center;
          background: #FFFDF8;
          flex-grow: 1;
          box-sizing: border-box;
        }

        .flavor-title-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          margin-bottom: 0;
          width: 100%;
          min-height: 48px;
          max-height: 48px;
        }

        .flavor-card-svg-icon {
          color: #C89B3C;
          font-size: 18px;
          flex-shrink: 0;
        }

        .flavor-serif-title {
          font-family: var(--font-serif);
          font-size: 18px;
          font-weight: 600;
          color: #2D2523;
          line-height: 1.35;
          letter-spacing: 0.2px;
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
          font-size: 15px;
          font-weight: 600;
          color: #C89B3C;
          margin-top: 16px;
          cursor: pointer;
          transition: color 250ms ease, transform 250ms ease;
          text-align: center;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          user-select: none;
          text-decoration: none;
          line-height: 1.3;
        }

        .view-details-arrow {
          font-size: 12px;
          transition: transform 250ms ease;
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

        /* Resin Product Details Modal Styling */
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
      `}</style>
    </section>
  );
};

export default ResinArtCustomizer;
