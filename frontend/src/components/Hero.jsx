import React, { useState } from 'react';
import { FaGem, FaMagic, FaWhatsapp, FaHeart, FaStar, FaShieldAlt, FaTimes } from 'react-icons/fa';

const Hero = ({ onExploreClick, onCustomOrderClick }) => {
  const [showWaPopup, setShowWaPopup] = useState(false);

  return (
    <section id="home" className="hero-section">
      <div className="hero-background-artistic"></div>
      <div className="hero-background-gradient"></div>
      <div className="hero-background-bokeh"></div>

      {/* Four Corner Soft Watercolor Blush Layers */}
      <div className="hero-blush-topleft"></div>
      <div className="hero-blush-topright"></div>
      <div className="hero-blush-bottomleft"></div>
      <div className="hero-blush-bottomright"></div>

      {/* Four Corner Subtle Botanical Leaves, Florals & Gold Sparkles (5-8% Opacity) */}
      <div className="hero-corner-decor decor-tl">🌸 🍃 ✨</div>
      <div className="hero-corner-decor decor-tr">🌿 ✨ 🌺</div>
      <div className="hero-corner-decor decor-bl">✨ 🍃 🌸</div>
      <div className="hero-corner-decor decor-br">🌺 🌿 ✨</div>



      <div className="container hero-container">
        {/* PROMINENTLY CENTERED HERO BRANDING */}
        <div className="hero-center-content">
          <div className="hero-logo-wrapper">
            <div className="logo-halo-glow"></div>
            <img 
              src="/divya-logo.jpg" 
              alt="Divya Handcrafts Logo" 
              className="hero-centered-logo"
            />
          </div>

          <div className="hero-badge">
            <FaHeart className="hero-badge-icon" /> ✨ 100% HANDMADE ARTISAN STUDIO
          </div>

          <h1 className="hero-title">
            <span className="hero-title-main">Handcrafted With Love,</span>
            <span className="hero-title-sub gold-text-gradient">Made For You</span>
          </h1>

          <p className="hero-subheading">
            Discover exquisite silk thread bangles, bespoke resin art preservation, luxury handmade chocolates, and wholesome gourmet biscuits—each piece lovingly handcrafted to make your special moments truly unforgettable.
          </p>

          {/* TWO PRIMARY HERO CTA BUTTONS */}
          <div className="hero-actions-center">
            <button onClick={onExploreClick} className="btn btn-hero-gold hero-btn">
              <FaGem /> Shop Now
            </button>
            <button 
              onClick={() => {
                const catElem = document.getElementById('categories');
                if (catElem) {
                  catElem.scrollIntoView({ behavior: 'smooth' });
                } else if (onCustomOrderClick) {
                  onCustomOrderClick();
                }
              }} 
              className="btn btn-hero-outline hero-btn"
            >
              <FaMagic /> Explore Collection
            </button>
          </div>

          {/* FEATURED PRODUCT VISUAL SHOWCASE GRID */}
          <div className="hero-product-showcase-grid">
            <div className="hero-showcase-card showcase-float-1">
              <div className="showcase-img-wrap">
                <img src="/bridal_bangle_set.jpg" alt="Handmade Silk Thread Bangles" />
              </div>
              <div className="showcase-card-label">
                <span>Thread Work</span>
                <h4>Bridal Bangle Sets</h4>
              </div>
            </div>

            <div className="hero-showcase-card showcase-float-2">
              <div className="showcase-img-wrap">
                <img src="/resin_art_category.jpg" alt="Custom Resin Art Preservation" />
              </div>
              <div className="showcase-card-label">
                <span>Resin Art</span>
                <h4>Floral Keepsakes</h4>
              </div>
            </div>

            <div className="hero-showcase-card showcase-float-3">
              <div className="showcase-img-wrap">
                <img src="/kunafa_chocolate.png" alt="Handmade Gourmet Chocolates" />
              </div>
              <div className="showcase-card-label">
                <span>Chocolates</span>
                <h4>Kunafa Delights</h4>
              </div>
            </div>

            <div className="hero-showcase-card showcase-float-4">
              <div className="showcase-img-wrap">
                <img src="/ragi_biscuits.jpg" alt="Freshly Baked Gourmet Biscuits" />
              </div>
              <div className="showcase-card-label">
                <span>Biscuits</span>
                <h4>Healthy Ragi Biscuits</h4>
              </div>
            </div>
          </div>

          {/* THREE ELEGANT BENEFIT FEATURE CARDS */}
          <div className="hero-trust-grid">
            <div className="trust-card glass-card">
              <div className="trust-icon-box" style={{ background: '#F8E4E7', color: 'var(--rose-primary)' }}>
                <FaHeart />
              </div>
              <div>
                <div className="trust-title">100% Handcrafted</div>
                <div className="trust-sub">Made with love & precision</div>
              </div>
            </div>

            <div className="trust-card glass-card">
              <div className="trust-icon-box" style={{ background: '#FAF0D7', color: '#B8860B' }}>
                <FaMagic />
              </div>
              <div>
                <div className="trust-title">Bespoke Customization</div>
                <div className="trust-sub">Personalized for your events</div>
              </div>
            </div>

            <div className="trust-card glass-card">
              <div className="trust-icon-box" style={{ background: '#E8F5E9', color: '#25D366' }}>
                <FaWhatsapp />
              </div>
              <div>
                <div className="trust-title">Direct WhatsApp</div>
                <div className="trust-sub">Direct artisan consultation</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* WHATSAPP SUPPORT POPUP MODAL */}
      {showWaPopup && (
        <div className="wa-modal-overlay" onClick={() => setShowWaPopup(false)}>
          <div className="wa-modal-card glass-card" onClick={(e) => e.stopPropagation()}>
            <button
              className="wa-modal-close-btn"
              onClick={() => setShowWaPopup(false)}
              type="button"
              aria-label="Close modal"
            >
              <FaTimes />
            </button>

            <div className="wa-modal-header text-center">
              <div className="wa-modal-icon-badge">
                <FaWhatsapp />
              </div>
              <h3 className="wa-modal-title">Choose WhatsApp Support</h3>
              <p className="wa-modal-subtitle">Select a contact number below to start chat</p>
            </div>

            <div className="wa-modal-options-list">
              {/* Option 1: Primary Support */}
              <div className="wa-modal-option-card">
                <div className="wa-option-left">
                  <div className="wa-option-title">
                    <span className="wa-dot">🟢</span> Primary Support
                  </div>
                  <div className="wa-option-phone">📱 +91 79816 64314</div>
                </div>
                <a
                  href="https://wa.me/917981664314?text=Hi%20Divya%20Handcrafts!%20I%20am%20looking%20for%20Primary%20Support."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp-chat-sm"
                  onClick={() => setShowWaPopup(false)}
                >
                  Chat Now
                </a>
              </div>

              {/* Option 2: Order Support */}
              <div className="wa-modal-option-card">
                <div className="wa-option-left">
                  <div className="wa-option-title">
                    <span className="wa-dot">🟢</span> Order Support
                  </div>
                  <div className="wa-option-phone">📱 +91 96035 51889</div>
                </div>
                <a
                  href="https://wa.me/919603551889?text=Hi%20Divya%20Handcrafts!%20I%20am%20looking%20for%20Order%20Support."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp-chat-sm"
                  onClick={() => setShowWaPopup(false)}
                >
                  Chat Now
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .hero-section {
          position: relative;
          padding: 4.5rem 0 6rem 0;
          background: linear-gradient(180deg, #FFFDF9 0%, #FDF5F6 40%, #FAF5EF 75%, #FFFDF9 100%);
          overflow: hidden;
          text-align: center;
        }

        .hero-background-artistic {
          position: absolute;
          inset: 0;
          background: url('/divya_master_lifestyle_hero_bg.jpg') center center / cover no-repeat;
          opacity: 0.52;
          mix-blend-mode: multiply;
          filter: blur(1.5px) contrast(1.14) brightness(1.04) saturate(1.09);
          pointer-events: none;
          z-index: 1;
          -webkit-mask-image: 
            radial-gradient(ellipse 55% 55% at 50% 42%, transparent 20%, rgba(0, 0, 0, 0.45) 55%, black 90%),
            radial-gradient(circle at 10% 15%, black 42%, rgba(0, 0, 0, 0.75) 62%, transparent 88%),
            radial-gradient(circle at 90% 15%, black 42%, rgba(0, 0, 0, 0.75) 62%, transparent 88%),
            radial-gradient(circle at 12% 82%, black 42%, rgba(0, 0, 0, 0.75) 62%, transparent 88%),
            radial-gradient(circle at 88% 85%, black 42%, rgba(0, 0, 0, 0.75) 62%, transparent 88%);
          mask-image: 
            radial-gradient(ellipse 55% 55% at 50% 42%, transparent 20%, rgba(0, 0, 0, 0.45) 55%, black 90%),
            radial-gradient(circle at 10% 15%, black 42%, rgba(0, 0, 0, 0.75) 62%, transparent 88%),
            radial-gradient(circle at 90% 15%, black 42%, rgba(0, 0, 0, 0.75) 62%, transparent 88%),
            radial-gradient(circle at 12% 82%, black 42%, rgba(0, 0, 0, 0.75) 62%, transparent 88%),
            radial-gradient(circle at 88% 85%, black 42%, rgba(0, 0, 0, 0.75) 62%, transparent 88%);
          -webkit-mask-composite: source-over, source-over, source-over, source-over, source-over;
          mask-composite: add;
        }

        .hero-background-gradient {
          position: absolute;
          top: -10%;
          left: 50%;
          transform: translateX(-50%);
          width: 780px;
          height: 780px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(253, 245, 246, 0.95) 0%, rgba(255, 253, 249, 0.9) 35%, rgba(232, 160, 191, 0.12) 65%, rgba(255, 253, 249, 0) 80%);
          pointer-events: none;
        }

        .hero-background-bokeh {
          position: absolute;
          inset: 0;
          background-image: 
            radial-gradient(circle at 8% 15%, rgba(212, 175, 55, 0.05) 0%, transparent 35%),
            radial-gradient(circle at 92% 82%, rgba(232, 160, 191, 0.08) 0%, transparent 40%),
            radial-gradient(circle at 50% 50%, rgba(255, 253, 249, 0.9) 0%, transparent 70%);
          pointer-events: none;
        }

        .hero-blush-topleft {
          position: absolute;
          top: -60px;
          left: -60px;
          width: 440px;
          height: 440px;
          border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
          background: radial-gradient(circle, rgba(255, 238, 220, 0.5) 0%, rgba(253, 228, 200, 0.2) 50%, transparent 70%);
          filter: blur(35px);
          pointer-events: none;
          z-index: 1;
        }

        .hero-blush-topright {
          position: absolute;
          top: -50px;
          right: -50px;
          width: 420px;
          height: 420px;
          border-radius: 50% 50% 40% 60% / 60% 40% 60% 40%;
          background: radial-gradient(circle, rgba(246, 211, 101, 0.12) 0%, transparent 65%);
          filter: blur(32px);
          pointer-events: none;
          z-index: 1;
        }

        .hero-blush-bottomleft {
          position: absolute;
          bottom: -60px;
          left: -50px;
          width: 400px;
          height: 400px;
          border-radius: 60% 40% 50% 50% / 50% 60% 40% 50%;
          background: radial-gradient(circle, rgba(252, 235, 215, 0.45) 0%, transparent 70%);
          filter: blur(35px);
          pointer-events: none;
          z-index: 1;
        }

        .hero-blush-bottomright {
          position: absolute;
          bottom: -70px;
          right: -60px;
          width: 460px;
          height: 460px;
          border-radius: 50% 60% 30% 70% / 60% 50% 50% 40%;
          background: radial-gradient(circle, rgba(232, 160, 191, 0.1) 0%, transparent 70%);
          filter: blur(38px);
          pointer-events: none;
          z-index: 1;
        }

        .hero-corner-decor {
          position: absolute;
          opacity: 0.07;
          filter: grayscale(0.2) sepia(0.3);
          pointer-events: none;
          user-select: none;
          z-index: 1;
          animation: floatSubtle 14s ease-in-out infinite;
        }

        @keyframes floatSubtle {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-3px) rotate(2deg); }
        }

        .decor-tl { top: 4%; left: 2.5%; font-size: 1.85rem; animation-delay: 0s; }
        .decor-tr { top: 4.5%; right: 2.5%; font-size: 1.75rem; animation-delay: 2.5s; }
        .decor-bl { bottom: 5%; left: 2.5%; font-size: 1.65rem; animation-delay: 5s; }
        .decor-br { bottom: 4.5%; right: 2.5%; font-size: 1.85rem; animation-delay: 7.5s; }



        .hero-container {
          position: relative;
          z-index: 5;
        }

        .hero-center-content {
          max-width: 700px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          z-index: 10;
          padding: 1rem 0;
        }

        /* 🌸 FOUR FLOATING CATEGORY CARDS AROUND HERO */
        .hero-floating-card {
          position: absolute;
          width: 215px;
          background: #FFFDF9;
          border: 1px solid rgba(232, 200, 106, 0.65);
          border-radius: 20px;
          padding: 0.85rem;
          box-shadow: 0 14px 32px rgba(61, 43, 31, 0.08), 0 4px 14px rgba(212, 175, 55, 0.12);
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
          text-align: left;
          transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
          z-index: 8;
          backdrop-filter: blur(12px);
          transform: translateY(-3px);
        }

        .hero-floating-card:hover {
          transform: translateY(-8px) scale(1.03) !important;
          box-shadow: 0 20px 42px rgba(61, 43, 31, 0.12), 0 8px 22px rgba(212, 175, 55, 0.24);
          border-color: #D4AF37;
        }

        /* Top Left: Bridal Bangles */
        .hero-floating-card.top-left {
          top: 0%;
          left: -5.5%;
        }

        /* Top Right: Homemade Chocolates */
        .hero-floating-card.top-right {
          top: 0%;
          right: -5.5%;
        }

        /* Middle Right: Butter Biscuits */
        .hero-floating-card.middle-right {
          top: 48%;
          right: -6%;
        }

        /* Bottom Left: Resin Art */
        .hero-floating-card.bottom-left {
          top: 48%;
          left: -6%;
        }

        @keyframes floatLeft {
          0%, 100% { transform: translateY(0) rotate(-1.5deg); }
          50% { transform: translateY(-12px) rotate(1deg); }
        }

        @keyframes floatRight {
          0%, 100% { transform: translateY(0) rotate(1.5deg); }
          50% { transform: translateY(-14px) rotate(-1deg); }
        }

        .float-card-img-wrap {
          width: 100%;
          height: 120px;
          border-radius: 14px;
          overflow: hidden;
          background: #FAF5EF;
          border: 1px solid rgba(232, 200, 106, 0.4);
        }

        .float-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center center;
          transition: transform 0.4s ease;
        }

        .hero-floating-card:hover .float-card-img {
          transform: scale(1.08);
        }

        .float-card-info {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
        }

        .float-card-tag {
          font-size: 0.7rem;
          font-weight: 700;
          color: #8C6D23;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        .float-card-title {
          font-family: 'Playfair Display', 'Cormorant Garamond', Georgia, serif;
          font-size: 0.92rem;
          font-weight: 700;
          color: #3D2B1F;
          margin: 0;
          line-height: 1.25;
        }

        .float-card-sub {
          font-size: 0.75rem;
          color: #6B7280;
          margin: 0;
          line-height: 1.2;
        }

        .hero-logo-wrapper {
          position: relative;
          margin-bottom: 1.5rem;
          display: inline-block;
        }

        .logo-halo-glow {
          position: absolute;
          inset: -8px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(212, 175, 55, 0.26) 0%, rgba(232, 200, 106, 0.12) 50%, rgba(255, 255, 255, 0) 75%);
          filter: blur(4px);
          animation: pulseGlow 3.5s ease-in-out infinite alternate;
        }

        @keyframes pulseGlow {
          0% { transform: scale(0.97); opacity: 0.45; }
          100% { transform: scale(1.04); opacity: 0.75; }
        }

        .hero-centered-logo {
          width: 180px;
          height: 180px;
          border-radius: 50%;
          object-fit: cover;
          position: relative;
          z-index: 2;
          border: 4px solid var(--gold-primary);
          box-shadow: 0 10px 28px rgba(212, 175, 55, 0.25);
          transition: transform 0.4s ease;
        }

        .hero-centered-logo:hover {
          transform: scale(1.03) rotate(2deg);
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          background: linear-gradient(135deg, #FFF9EA 0%, #F5E8C7 50%, #EBD49B 100%);
          color: #8C6D23;
          border: 1px solid rgba(212, 175, 55, 0.45);
          padding: 0.32rem 1.15rem;
          border-radius: 50px;
          font-size: 0.76rem;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.9), 0 4px 14px rgba(212, 175, 55, 0.12);
          margin-top: 0.5rem;
          margin-bottom: 1.6rem;
          user-select: none;
        }

        .hero-badge-icon {
          color: var(--rose-primary, #9C5263);
          font-size: 0.72rem;
          flex-shrink: 0;
        }

        .hero-title {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.25rem;
          text-align: center;
          gap: 0.25rem;
        }

        .hero-title-main {
          font-family: 'Playfair Display', 'Cormorant Garamond', Georgia, serif;
          font-size: 3.4rem;
          font-weight: 700;
          color: #3D2B1F;
          line-height: 1.1;
          text-shadow: 0 2px 10px rgba(61, 43, 31, 0.12);
        }

        .hero-title-sub {
          font-family: 'Playfair Display', 'Cormorant Garamond', Georgia, serif;
          font-size: 2.75rem;
          font-weight: 700;
          line-height: 1.15;
        }

        .gold-text-gradient {
          background: linear-gradient(135deg, #D4AF37 0%, #AA7C11 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-subheading {
          font-size: 1.2rem;
          color: var(--text-muted);
          margin-bottom: 2.5rem;
          max-width: 760px;
          line-height: 1.7;
          font-weight: 400;
        }

        .hero-actions-center {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          gap: 1.75rem;
          margin-top: 0.5rem;
          margin-bottom: 4.25rem;
        }

        .hero-btn {
          min-width: 200px;
          height: 58px;
          padding: 0 2.5rem;
          font-size: 1rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          border-radius: 50px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.65rem;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          cursor: pointer;
          user-select: none;
        }

        .btn-hero-gold {
          background: linear-gradient(135deg, #E6C665 0%, #D4AF37 50%, #B8860B 100%);
          color: #FFFFFF;
          border: none;
          box-shadow: 0 8px 22px rgba(212, 175, 55, 0.32), 0 2px 8px rgba(184, 134, 11, 0.2);
        }

        .btn-hero-gold:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 28px rgba(212, 175, 55, 0.48), 0 4px 12px rgba(184, 134, 11, 0.25);
          background: linear-gradient(135deg, #EED279 0%, #E0B942 50%, #C49214 100%);
        }

        .btn-hero-outline {
          background: #FFFFFF;
          color: #3D2B1F;
          border: 2px solid #E8C86A;
          box-shadow: 0 6px 18px rgba(61, 43, 31, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.8);
        }

        .btn-hero-outline:hover {
          transform: translateY(-3px);
          background: #FFFDF9;
          border-color: #D4AF37;
          color: #8C6D23;
          box-shadow: 0 10px 24px rgba(212, 175, 55, 0.25);
        }

        /* 🟢 WHATSAPP SUPPORT MODAL POPUP */
        .wa-modal-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: rgba(0, 0, 0, 0.55);
          backdrop-filter: blur(5px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          animation: fadeIn 0.25s ease;
        }

        .wa-modal-card {
          width: 100%;
          max-width: 440px;
          background: #FFFDF9;
          border: 1px solid #E8C86A;
          border-radius: 24px;
          padding: 2.25rem 2rem 2rem 2rem;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.25);
          position: relative;
          animation: popIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes popIn {
          from { transform: scale(0.85); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        .wa-modal-close-btn {
          position: absolute;
          top: 1rem;
          right: 1rem;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          border: 1px solid #E8C86A;
          background: #FFFFFF;
          color: #3D2B1F;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 1rem;
          transition: all 0.2s ease;
        }

        .wa-modal-close-btn:hover {
          background: var(--rose-primary, #C2185B);
          color: #FFFFFF;
          border-color: var(--rose-primary, #C2185B);
        }

        .wa-modal-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.4rem;
          margin-bottom: 1.75rem;
        }

        .wa-modal-icon-badge {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: #E8F5E9;
          color: #25D366;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.8rem;
          border: 1px solid rgba(37, 211, 102, 0.3);
          margin-bottom: 0.25rem;
        }

        .wa-modal-title {
          font-family: 'Playfair Display', 'Cormorant Garamond', Georgia, serif;
          font-size: 1.45rem;
          font-weight: 700;
          color: #3D2B1F;
          margin: 0;
        }

        .wa-modal-subtitle {
          font-size: 0.85rem;
          color: #6B7280;
          margin: 0;
        }

        .wa-modal-options-list {
          display: flex;
          flex-direction: column;
          gap: 1.1rem;
        }

        .wa-modal-option-card {
          background: #FFFFFF;
          border: 1px solid #E8C86A;
          border-radius: 16px;
          padding: 1rem 1.25rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.04);
          transition: all 0.25s ease;
        }

        .wa-modal-option-card:hover {
          transform: translateY(-2px);
          border-color: #25D366;
          box-shadow: 0 8px 20px rgba(37, 211, 102, 0.15);
        }

        .wa-option-left {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          text-align: left;
        }

        .wa-option-title {
          font-size: 0.95rem;
          font-weight: 700;
          color: #3D2B1F;
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }

        .wa-dot {
          font-size: 0.85rem;
        }

        .wa-option-phone {
          font-size: 0.88rem;
          font-weight: 600;
          color: #6B7280;
        }

        .btn-whatsapp-chat-sm {
          padding: 0.55rem 1.15rem;
          background: linear-gradient(135deg, #25D366, #1DA851);
          color: #FFFFFF;
          font-weight: 700;
          font-size: 0.88rem;
          border-radius: 50px;
          text-decoration: none;
          white-space: nowrap;
          transition: all 0.25s ease;
          box-shadow: 0 4px 10px rgba(37, 211, 102, 0.25);
        }

        .btn-whatsapp-chat-sm:hover {
          background: linear-gradient(135deg, #1DA851, #16853F);
          color: #FFFFFF;
          transform: translateY(-2px);
          box-shadow: 0 6px 14px rgba(37, 211, 102, 0.35);
        }

        @media (max-width: 768px) {
          .whatsapp-cards-grid {
            grid-template-columns: 1fr;
            gap: 1.15rem;
          }
        }

        .hero-trust-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          width: 100%;
          max-width: 840px;
          margin: 0 auto;
        }

        @media (max-width: 992px) {
          .hero-trust-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 1rem;
          }
        }

        @media (max-width: 768px) {
          .hero-trust-grid {
            grid-template-columns: 1fr;
            gap: 1.15rem;
          }
        }

        .trust-card {
          padding: 1rem 1.25rem;
          display: flex;
          align-items: center;
          gap: 0.85rem;
          text-align: left;
        }

        .trust-icon-box {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
          flex-shrink: 0;
        }

        .trust-title {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--text-main);
        }

        .trust-sub {
          font-size: 0.775rem;
          color: var(--text-muted);
        }

        @media (max-width: 1350px) {
          .hero-floating-card {
            display: none;
          }
        }

        /* Hero Product Showcase Grid */
        .hero-product-showcase-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.25rem;
          width: 100%;
          margin: 2.5rem 0 2rem 0;
        }

        .hero-showcase-card {
          background: #FFFFFF;
          border: 1px solid rgba(200, 155, 60, 0.25);
          border-radius: 20px;
          padding: 0.85rem;
          box-shadow: 0 10px 28px rgba(27, 59, 43, 0.06), 0 2px 6px rgba(200, 155, 60, 0.1);
          transition: all 0.35s cubic-bezier(0.22, 1, 0.36, 1);
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          text-align: left;
        }

        .showcase-float-1 { animation: floatSubtle 6s ease-in-out infinite 0s; }
        .showcase-float-2 { animation: floatSubtle 6s ease-in-out infinite 1.5s; }
        .showcase-float-3 { animation: floatSubtle 6s ease-in-out infinite 3s; }
        .showcase-float-4 { animation: floatSubtle 6s ease-in-out infinite 4.5s; }

        @keyframes floatSubtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        .hero-showcase-card:hover {
          transform: translateY(-10px) scale(1.03) !important;
          border-color: #C89B3C;
          box-shadow: 0 16px 36px rgba(27, 59, 43, 0.12), 0 4px 12px rgba(200, 155, 60, 0.2);
        }

        .showcase-img-wrap {
          width: 100%;
          height: 140px;
          border-radius: 14px;
          overflow: hidden;
          background: #FAF8F5;
        }

        .showcase-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .hero-showcase-card:hover .showcase-img-wrap img {
          transform: scale(1.08);
        }

        .showcase-card-label span {
          font-size: 0.72rem;
          font-weight: 700;
          color: #C89B3C;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          display: block;
        }

        .showcase-card-label h4 {
          font-family: var(--font-serif);
          font-size: 1rem;
          font-weight: 700;
          color: #1C3B2B;
          margin: 2px 0 0 0;
        }

        @media (max-width: 992px) {
          .hero-title-main {
            font-size: 2.5rem;
          }
          .hero-title-sub {
            font-size: 2rem;
          }
          .hero-subheading {
            font-size: 1.05rem;
          }
          .hero-centered-logo {
            width: 140px;
            height: 140px;
          }
          .hero-trust-grid {
            grid-template-columns: 1fr;
          }
          .hero-product-showcase-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
          }
          .showcase-img-wrap {
            height: 130px;
          }
        }

        @media (max-width: 576px) {
          .hero-title-main {
            font-size: 2rem;
          }
          .hero-title-sub {
            font-size: 1.6rem;
          }
          .hero-product-showcase-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 0.75rem;
          }
          .showcase-img-wrap {
            height: 110px;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
