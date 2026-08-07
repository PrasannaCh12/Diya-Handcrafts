import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  FaArrowLeft, 
  FaWhatsapp, 
  FaCheck, 
  FaClock, 
  FaShieldAlt, 
  FaTruck, 
  FaChevronLeft, 
  FaChevronRight,
  FaSearchPlus,
  FaTimes,
  FaHeart,
  FaGem,
  FaCrown
} from 'react-icons/fa';
import { PRODUCTS } from '../data/products';

const DEFAULT_FALLBACK_PRODUCT = {
  id: 'royal-handcraft-custom',
  name: 'Royal Handcrafted Luxury Collection Piece',
  category: 'Thread Work',
  price: 1499,
  image: '/bridal_bangle_set.jpg',
  images: [
    '/bridal_bangle_set.jpg',
    '/purple_velvet_bangles.jpg',
    '/kundan_stone_bangles.jpg'
  ],
  shortDesc: 'Artisanal bespoke handcrafted piece made with premium materials, gold leaf accents, and intricate detailing.',
  description: 'Each piece from Divya Handcrafts is individually created by skilled artisans with utmost precision and dedication. Made to order with customizable color themes, personalized names, and premium gift packaging.',
  materials: 'Silk Thread, Velvet Base, 24k Gold Foil Polish, Glass Kundan Crystals, Pearl Tassels',
  processingTime: '3 – 5 Business Days (Bespoke Handcrafted to Order)',
  careInstructions: 'Store in an airtight velvet packaging away from direct moisture, hairsprays, and harsh perfumes.',
  customizations: {
    sizes: ['2.2', '2.4', '2.6', '2.8', 'Custom Measure'],
    colors: ['Royal Gold & Red', 'Emerald Green', 'Blush Rose', 'Purple Kundan']
  },
  specs: [
    '100% Handcrafted Authenticity',
    'Custom Color & Size Matching',
    'Hypoallergenic & Comfortable Wear',
    'Luxury Gift Packaging Included'
  ]
};

const ProductDetailPage = ({ onAddToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find product by ID or use fallback
  const product = PRODUCTS.find((p) => String(p.id).toLowerCase() === String(id).toLowerCase()) || DEFAULT_FALLBACK_PRODUCT;

  // Active gallery image
  const productImages = product.images && product.images.length > 0 ? product.images : [product.image];
  const [activeImg, setActiveImg] = useState(productImages[0]);
  const [activeImgIndex, setActiveImgIndex] = useState(0);

  // Selected options
  const [selectedSize, setSelectedSize] = useState(product.customizations?.sizes?.[0] || 'Standard');
  const [selectedColor, setSelectedColor] = useState(product.customizations?.colors?.[0] || 'Default Theme');
  const [quantity, setQuantity] = useState(1);
  const [customNotes, setCustomNotes] = useState('');

  // Image zoom modal state
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const imgs = product.images && product.images.length > 0 ? product.images : [product.image];
    setActiveImg(imgs[0]);
    setActiveImgIndex(0);
    if (product.customizations?.sizes?.[0]) setSelectedSize(product.customizations.sizes[0]);
    if (product.customizations?.colors?.[0]) setSelectedColor(product.customizations.colors[0]);
  }, [id, product]);

  const handlePrevImg = () => {
    const newIdx = (activeImgIndex - 1 + productImages.length) % productImages.length;
    setActiveImgIndex(newIdx);
    setActiveImg(productImages[newIdx]);
  };

  const handleNextImg = () => {
    const newIdx = (activeImgIndex + 1) % productImages.length;
    setActiveImgIndex(newIdx);
    setActiveImg(productImages[newIdx]);
  };

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  // Pre-filled WhatsApp ordering handler
  const handleWhatsAppOrder = () => {
    const phoneNumber = '919876543210';
    let message = `Hello Divya Handcrafts! 🌸\n\n`;
    message += `I would like to order: *${product.name || product.title}*\n`;
    message += `Category: ${product.category}\n`;
    message += `Price: ₹${(product.price || 999).toLocaleString()}\n`;
    message += `Quantity: ${quantity}\n`;
    if (selectedSize) message += `Size: ${selectedSize}\n`;
    if (selectedColor) message += `Color/Design: ${selectedColor}\n`;
    if (customNotes) message += `Customization Notes: ${customNotes}\n`;
    message += `\nPlease confirm availability and payment details. Thank you!`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encoded}`, '_blank');
  };

  // Related products
  const relatedProducts = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="product-detail-page">
      <div className="container">
        {/* Navigation Breadcrumb */}
        <div className="pdp-breadcrumb flex items-center justify-between py-4 mb-4">
          <button className="btn btn-back flex items-center gap-2" onClick={() => navigate('/shop')}>
            <FaArrowLeft /> Back to Products
          </button>
          <div className="breadcrumb-path text-sm text-gray-500">
            <Link to="/">Home</Link> &nbsp;/&nbsp; <Link to="/shop">Shop</Link> &nbsp;/&nbsp; <span className="text-gold-dark font-medium">{product.name}</span>
          </div>
        </div>

        {/* Main Product Showcase Grid */}
        <div className="pdp-showcase-grid">
          {/* Left Column: Interactive Image Gallery with Zoom */}
          <div className="pdp-gallery-container">
            <div 
              className="pdp-main-img-wrap"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onMouseMove={handleMouseMove}
              onClick={() => setIsZoomOpen(true)}
            >
              <img 
                src={activeImg} 
                alt={product.name} 
                className="pdp-main-img"
                style={
                  isHovered ? {
                    transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                    transform: 'scale(1.45)'
                  } : {}
                }
              />

              <div className="pdp-zoom-badge">
                <FaSearchPlus /> Click to Expand
              </div>

              {productImages.length > 1 && (
                <>
                  <button className="pdp-nav-btn prev" onClick={(e) => { e.stopPropagation(); handlePrevImg(); }}>
                    <FaChevronLeft />
                  </button>
                  <button className="pdp-nav-btn next" onClick={(e) => { e.stopPropagation(); handleNextImg(); }}>
                    <FaChevronRight />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Carousel Selector */}
            {productImages.length > 1 && (
              <div className="pdp-thumbs-row">
                {productImages.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    className={`pdp-thumb-btn ${activeImgIndex === idx ? 'active' : ''}`}
                    onClick={() => { setActiveImg(imgUrl); setActiveImgIndex(idx); }}
                  >
                    <img src={imgUrl} alt="" className="pdp-thumb-img" />
                  </button>
                ))}
              </div>
            )}

            {/* Quality & Handmade Badges */}
            <div className="pdp-trust-pills mt-6 grid grid-cols-2 gap-3">
              <div className="trust-pill-card flex items-center gap-3">
                <FaCrown className="text-gold text-xl" />
                <div>
                  <strong>100% Handcrafted</strong>
                  <span>Artisanal Quality Guarantee</span>
                </div>
              </div>
              <div className="trust-pill-card flex items-center gap-3">
                <FaTruck className="text-gold text-xl" />
                <div>
                  <strong>Pan-India & Global</strong>
                  <span>Insured Express Shipping</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Full Product Information */}
          <div className="pdp-info-container">
            <div className="pdp-header-tags flex items-center gap-2 mb-2">
              <span className="badge-gold">{product.category || 'Handcrafted Collection'}</span>
              <span className="handmade-badge-pill">✨ Handcrafted with Love</span>
            </div>

            <h1 className="pdp-title">{product.name}</h1>

            {/* Price & Guarantee */}
            <div className="pdp-price-row flex items-baseline gap-3 my-3">
              <span className="pdp-price">₹{(product.price || 999).toLocaleString()}</span>
              <span className="pdp-tax-note">(Taxes Included • Free Gift Packing)</span>
            </div>

            {/* Short Description */}
            {product.shortDesc && (
              <div className="pdp-short-desc-box">
                ✨ {product.shortDesc}
              </div>
            )}

            {/* Detailed Description */}
            <div className="pdp-description-section my-4">
              <h3>Detailed Description</h3>
              <p>{product.description || 'Designed and handcrafted exclusively by Divya Handcrafts. Made using high-grade materials, traditional artistry, and modern finish.'}</p>
            </div>

            {/* Materials Used */}
            <div className="pdp-spec-block mb-4">
              <label className="pdp-label"><FaGem className="text-gold inline mr-1" /> Materials Used:</label>
              <div className="pdp-materials-tag">
                {product.materials || (product.specs ? product.specs.join(' • ') : 'Silk Thread, Velvet, Glass Kundan, Epoxy Resin')}
              </div>
            </div>

            {/* Options: Colors */}
            {product.customizations?.colors && (
              <div className="pdp-option-group mb-4">
                <label className="pdp-label">Available Colors / Design Themes:</label>
                <div className="pdp-option-pills flex flex-wrap gap-2 mt-1">
                  {product.customizations.colors.map((col) => (
                    <button
                      key={col}
                      className={`pdp-opt-btn ${selectedColor === col ? 'selected' : ''}`}
                      onClick={() => setSelectedColor(col)}
                    >
                      {col}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Options: Sizes */}
            {product.customizations?.sizes && (
              <div className="pdp-option-group mb-4">
                <label className="pdp-label">Available Sizes / Dimensions:</label>
                <div className="pdp-option-pills flex flex-wrap gap-2 mt-1">
                  {product.customizations.sizes.map((sz) => (
                    <button
                      key={sz}
                      className={`pdp-opt-btn ${selectedSize === sz ? 'selected' : ''}`}
                      onClick={() => setSelectedSize(sz)}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Customization Input */}
            <div className="pdp-option-group mb-4">
              <label className="pdp-label">Customization Options (Optional):</label>
              <input
                type="text"
                className="pdp-input-field w-full mt-1"
                placeholder="e.g. Enter name for calligraphy, color preference, or gift note..."
                value={customNotes}
                onChange={(e) => setCustomNotes(e.target.value)}
              />
            </div>

            {/* Product Highlights */}
            {product.specs && product.specs.length > 0 && (
              <div className="pdp-highlights-block mb-4">
                <label className="pdp-label">Product Highlights:</label>
                <div className="pdp-highlights-grid grid grid-cols-2 gap-2 mt-2">
                  {product.specs.map((item, idx) => (
                    <div key={idx} className="pdp-highlight-tag flex items-center gap-2">
                      <FaCheck className="text-gold" /> <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Delivery Information & Care Instructions */}
            <div className="pdp-info-callouts grid grid-cols-2 gap-3 mb-6">
              <div className="callout-card">
                <strong className="flex items-center gap-2 text-gold-dark mb-1">
                  <FaClock /> Delivery Information
                </strong>
                <p>{product.processingTime || '2 – 4 Business Days dispatch time. Express courier available.'}</p>
              </div>
              <div className="callout-card">
                <strong className="flex items-center gap-2 text-gold-dark mb-1">
                  <FaShieldAlt /> Care Instructions
                </strong>
                <p>{product.careInstructions || 'Store in dry velvet box. Keep away from direct water & perfumes.'}</p>
              </div>
            </div>

            {/* Quantity Selector & Action CTAs */}
            <div className="pdp-actions-wrap flex flex-col gap-3">
              <div className="pdp-qty-row flex items-center gap-4">
                <span className="pdp-label mb-0">Quantity:</span>
                <div className="pdp-qty-counter">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                  <span>{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)}>+</button>
                </div>
              </div>

              <div className="pdp-btn-group grid grid-cols-1 gap-3 mt-2">
                <button className="btn btn-whatsapp-lg w-full" onClick={handleWhatsAppOrder}>
                  <FaWhatsapp className="text-2xl mr-2" /> Direct Order via WhatsApp
                </button>
                <button className="btn btn-outline-gold w-full" onClick={() => navigate('/shop')}>
                  <FaArrowLeft className="mr-2" /> Back to Products
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Creations Section */}
        {relatedProducts.length > 0 && (
          <div className="pdp-related-section mt-16 pt-8 border-t border-gold-border">
            <h2 className="related-heading text-center font-serif text-3xl mb-8">You May Also Love</h2>
            <div className="related-grid grid grid-cols-4 gap-4">
              {relatedProducts.map((rel) => (
                <div 
                  key={rel.id} 
                  className="related-card glass-card cursor-pointer"
                  onClick={() => navigate(`/product/${rel.id}`)}
                >
                  <div className="rel-img-wrap">
                    <img src={rel.image} alt={rel.name} className="rel-img" />
                  </div>
                  <div className="rel-info p-3 text-center">
                    <h4 className="rel-title font-serif text-base font-semibold line-clamp-2">{rel.name}</h4>
                    <span className="rel-price text-gold-dark font-bold mt-1 block">₹{(rel.price || 999).toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Fullscreen Lightbox Zoom Modal */}
      {isZoomOpen && (
        <div className="pdp-lightbox-overlay" onClick={() => setIsZoomOpen(false)}>
          <div className="pdp-lightbox-box" onClick={(e) => e.stopPropagation()}>
            <button className="pdp-lightbox-close" onClick={() => setIsZoomOpen(false)}>
              <FaTimes />
            </button>
            <img src={activeImg} alt={product.name} className="pdp-lightbox-img" />
            <div className="pdp-lightbox-caption">
              <h3>{product.name}</h3>
              <p>100% Handcrafted Artisanal Creation • Divya Handcrafts</p>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .product-detail-page {
          padding: 2.5rem 0 5rem 0;
          background: var(--bg-secondary);
          min-height: 85vh;
        }

        .pdp-breadcrumb a {
          color: #5A4A42;
          transition: color 0.2s;
        }

        .pdp-breadcrumb a:hover {
          color: var(--gold-dark);
        }

        .btn-back {
          background: #FFFFFF;
          border: 1px solid rgba(212, 175, 55, 0.35);
          color: #3E2C1C;
          padding: 0.55rem 1.15rem;
          border-radius: 50px;
          font-weight: 600;
          font-size: 0.85rem;
          transition: all 0.3s ease;
        }

        .btn-back:hover {
          border-color: #D4AF37;
          background: #FFFDF9;
          transform: translateX(-3px);
        }

        .pdp-showcase-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          align-items: start;
        }

        @media (max-width: 992px) {
          .pdp-showcase-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }

        .pdp-main-img-wrap {
          position: relative;
          width: 100%;
          height: 480px;
          border-radius: 20px;
          overflow: hidden;
          background: #FFFDF9;
          border: 1.5px solid rgba(212, 175, 55, 0.3);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
          cursor: zoom-in;
        }

        .pdp-main-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.15s ease-out, filter 0.35s ease;
          filter: brightness(1.03) contrast(1.05);
        }

        .pdp-zoom-badge {
          position: absolute;
          bottom: 1rem;
          right: 1rem;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(4px);
          padding: 0.4rem 0.85rem;
          border-radius: 50px;
          font-size: 0.78rem;
          font-weight: 600;
          color: #3E2C1C;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          border: 1px solid rgba(212, 175, 55, 0.3);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          pointer-events: none;
        }

        .pdp-nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255, 255, 255, 0.9);
          border: 1px solid rgba(212, 175, 55, 0.3);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 1rem;
          color: #3E2C1C;
          transition: all 0.3s ease;
          z-index: 5;
        }

        .pdp-nav-btn:hover {
          background: var(--gold-dark);
          color: #FFFFFF;
        }

        .pdp-nav-btn.prev { left: 1rem; }
        .pdp-nav-btn.next { right: 1rem; }

        .pdp-thumbs-row {
          display: flex;
          gap: 0.75rem;
          margin-top: 1rem;
        }

        .pdp-thumb-btn {
          width: 75px;
          height: 75px;
          border-radius: 12px;
          overflow: hidden;
          border: 2px solid transparent;
          cursor: pointer;
          transition: all 0.3s ease;
          padding: 0;
          background: #FFFFFF;
        }

        .pdp-thumb-btn.active, .pdp-thumb-btn:hover {
          border-color: #D4AF37;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(212, 175, 55, 0.25);
        }

        .pdp-thumb-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .trust-pill-card {
          background: #FFFFFF;
          border: 1px solid rgba(212, 175, 55, 0.25);
          padding: 0.85rem 1rem;
          border-radius: 14px;
        }

        .trust-pill-card strong {
          display: block;
          font-size: 0.85rem;
          color: #3E2C1C;
        }

        .trust-pill-card span {
          display: block;
          font-size: 0.75rem;
          color: #6E5C50;
        }

        .handmade-badge-pill {
          background: #FFF5E6;
          color: var(--gold-dark);
          border: 1px solid #E8D8B5;
          padding: 0.25rem 0.75rem;
          border-radius: 50px;
          font-size: 0.78rem;
          font-weight: 600;
        }

        .pdp-title {
          font-family: var(--font-serif);
          font-size: 2.1rem;
          font-weight: 700;
          color: #2C1E16;
          line-height: 1.25;
          margin-top: 0.25rem;
        }

        .pdp-price {
          font-family: var(--font-serif);
          font-size: 1.85rem;
          font-weight: 700;
          color: var(--gold-dark);
        }

        .pdp-tax-note {
          font-size: 0.82rem;
          color: #7E6C60;
        }

        .pdp-short-desc-box {
          background: #FFFBF5;
          border: 1px solid #E8D8B5;
          padding: 0.85rem 1.15rem;
          border-radius: 12px;
          font-size: 0.92rem;
          color: #5A4A42;
          font-weight: 500;
          line-height: 1.5;
        }

        .pdp-description-section h3 {
          font-family: var(--font-serif);
          font-size: 1.15rem;
          font-weight: 700;
          color: #3E2C1C;
          margin-bottom: 0.4rem;
        }

        .pdp-description-section p {
          color: #5A4A42;
          font-size: 0.95rem;
          line-height: 1.65;
        }

        .pdp-label {
          font-size: 0.88rem;
          font-weight: 700;
          color: #3E2C1C;
          margin-bottom: 0.35rem;
          display: block;
        }

        .pdp-materials-tag {
          background: #FFFFFF;
          border: 1px solid rgba(212, 175, 55, 0.3);
          padding: 0.65rem 0.95rem;
          border-radius: 10px;
          font-size: 0.88rem;
          color: #3E2C1C;
        }

        .pdp-opt-btn {
          background: #FFFFFF;
          border: 1.5px solid rgba(212, 175, 55, 0.3);
          color: #5A4A42;
          padding: 0.45rem 1.1rem;
          border-radius: 50px;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .pdp-opt-btn.selected, .pdp-opt-btn:hover {
          background: linear-gradient(135deg, #F6D365 0%, #D4AF37 50%, #C79A2B 100%);
          color: #FFFFFF;
          border-color: transparent;
          box-shadow: 0 4px 12px rgba(212, 175, 55, 0.25);
        }

        .pdp-input-field {
          background: #FFFFFF;
          border: 1.5px solid rgba(212, 175, 55, 0.3);
          padding: 0.65rem 0.95rem;
          border-radius: 10px;
          font-size: 0.88rem;
          color: #3E2C1C;
          outline: none;
          transition: border-color 0.2s;
        }

        .pdp-input-field:focus {
          border-color: #D4AF37;
        }

        .pdp-highlight-tag {
          background: #FFFFFF;
          border: 1px solid rgba(212, 175, 55, 0.2);
          padding: 0.5rem 0.75rem;
          border-radius: 8px;
          font-size: 0.82rem;
          color: #3E2C1C;
        }

        .callout-card {
          background: #FFFDF9;
          border: 1px solid #E8D8B5;
          padding: 0.85rem 1rem;
          border-radius: 12px;
          font-size: 0.82rem;
          color: #5A4A42;
        }

        .pdp-qty-counter {
          display: inline-flex;
          align-items: center;
          background: #FFFFFF;
          border: 1.5px solid rgba(212, 175, 55, 0.3);
          border-radius: 50px;
          overflow: hidden;
        }

        .pdp-qty-counter button {
          width: 36px;
          height: 36px;
          background: transparent;
          border: none;
          font-size: 1rem;
          font-weight: 700;
          color: #3E2C1C;
          cursor: pointer;
        }

        .pdp-qty-counter span {
          width: 40px;
          text-align: center;
          font-weight: 700;
          color: #3E2C1C;
        }

        .btn-whatsapp-lg {
          background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
          color: #FFFFFF;
          padding: 0.95rem 1.5rem;
          border-radius: 14px;
          font-weight: 700;
          font-size: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          cursor: pointer;
          box-shadow: 0 6px 20px rgba(37, 211, 102, 0.3);
          transition: all 0.3s ease;
        }

        .btn-whatsapp-lg:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(37, 211, 102, 0.4);
        }

        .related-card {
          border-radius: 16px;
          overflow: hidden;
          border: 1.5px solid rgba(212, 175, 55, 0.25);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          background: #FFFFFF;
        }

        .related-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.1);
        }

        .rel-img-wrap {
          height: 180px;
          overflow: hidden;
        }

        .rel-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* Lightbox Overlay */
        .pdp-lightbox-overlay {
          position: fixed;
          inset: 0;
          background: rgba(15, 10, 8, 0.85);
          backdrop-filter: blur(8px);
          z-index: 10000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }

        .pdp-lightbox-box {
          position: relative;
          max-width: 900px;
          max-height: 90vh;
          background: #FFFFFF;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
        }

        .pdp-lightbox-close {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: #FFFFFF;
          border: none;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
          color: #3E2C1C;
          cursor: pointer;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
          z-index: 10;
        }

        .pdp-lightbox-img {
          max-width: 100%;
          max-height: 75vh;
          object-fit: contain;
          display: block;
          margin: 0 auto;
        }

        .pdp-lightbox-caption {
          padding: 1.25rem 2rem;
          background: #FFFDF9;
          border-top: 1px solid #E8D8B5;
          text-align: center;
        }

        .pdp-lightbox-caption h3 {
          font-family: var(--font-serif);
          font-size: 1.35rem;
          color: #3E2C1C;
          margin: 0 0 0.2rem 0;
        }

        .pdp-lightbox-caption p {
          font-size: 0.85rem;
          color: var(--gold-dark);
          margin: 0;
        }

        @media (max-width: 768px) {
          .related-grid {
            grid-template-columns: 1fr 1fr;
          }
          .pdp-trust-pills, .pdp-highlights-grid, .pdp-info-callouts {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default ProductDetailPage;
