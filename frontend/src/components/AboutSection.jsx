import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaMagic, FaLeaf, FaGift, FaCheckCircle, FaWhatsapp, FaGem, FaQuoteLeft, FaStar, FaShieldAlt, FaArrowRight } from 'react-icons/fa';
import WhatsAppModal from './WhatsAppModal';

const AboutSection = () => {
  const [waModalOpen, setWaModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleExploreClick = (e) => {
    e.preventDefault();
    const shopSection = document.getElementById('shop') || document.getElementById('products');
    if (shopSection) {
      shopSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/shop');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };



  const whyChooseUsCards = [
    {
      icon: <FaHeart />,
      title: 'Handmade with Love'
    },
    {
      icon: <FaStar />,
      title: 'Premium Quality'
    },
    {
      icon: <FaMagic />,
      title: 'Customized Gifts'
    },
    {
      icon: <FaGift />,
      title: 'Beautiful Packaging'
    },
    {
      icon: <FaLeaf />,
      title: 'Fresh Ingredients'
    },
    {
      icon: <FaShieldAlt />,
      title: 'Trusted by Customers'
    }
  ];

  return (
    <section id="about" className="about-section">
      {/* Soft Radial Lighting Glows & Watercolor Blush Shapes */}
      <div className="about-glow-topleft"></div>
      <div className="about-glow-bottomright"></div>
      <div className="about-blush-topleft"></div>
      <div className="about-blush-bottomright"></div>
      <div className="about-blush-topright"></div>

      {/* Subtle Linen / Paper Texture Overlay */}
      <div className="about-texture-overlay"></div>

      {/* Corner Botanical Leaves, Floral & Gold Sparkle Accents (5-8% Opacity) */}
      <div className="about-bg-decor decor-top-left">🌸 🍃</div>
      <div className="about-bg-decor decor-top-right">🌿 ✨</div>
      <div className="about-bg-decor decor-mid-left">✨ 🌺</div>
      <div className="about-bg-decor decor-mid-right">🌿 ✨</div>
      <div className="about-bg-decor decor-bottom-left">✨ 🍃</div>
      <div className="about-bg-decor decor-bottom-right">🌺 🌸</div>

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="about-grid">
          {/* Left Column: Logo Card + Why Choose Us Grid */}
          <div className="about-visual">
            <div className="logo-card-container">
              <div className="about-visual-backdrop">
                <div className="backdrop-gradient-glow"></div>
                <div className="backdrop-botanical top-right-leaf">🌿</div>
                <div className="backdrop-botanical bottom-left-flower">🌸</div>
                <div className="backdrop-botanical top-left-sparkle">✨</div>
                <div className="backdrop-botanical bottom-right-sparkle">✨</div>
              </div>

              <div className="card-glow-bg"></div>

              <div className="logo-premium-card">
                <div className="card-corner-decor corner-tl">✨</div>
                <div className="card-corner-decor corner-tr">🌸</div>
                <div className="card-corner-decor corner-bl">🌸</div>
                <div className="card-corner-decor corner-br">✨</div>

                <div className="logo-wrapper">
                  <div className="about-logo-halo"></div>
                  <img 
                    src="/divya-logo.jpg" 
                    alt="Divya Handcrafts Logo" 
                    className="about-logo-img"
                  />
                </div>

                <div className="logo-card-text">
                  <h3 className="brand-card-title">Divya Handcrafts</h3>
                  <p className="brand-card-tagline">MADE WITH LOVE, MADE FOR YOU</p>
                </div>
              </div>
            </div>

            {/* Why Choose Us Section in Left Column */}
            <div className="why-choose-left-container">
              <div className="why-choose-us-title">
                Why Choose Us
              </div>

              <div className="why-choose-cards-grid">
                {whyChooseUsCards.map((card, idx) => (
                  <div key={idx} className="why-card">
                    <div className="why-card-icon-wrap">
                      {card.icon}
                    </div>
                    <h4 className="why-card-title">{card.title}</h4>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Narrative */}
          <div className="about-text">
            <div className="section-subtitle" style={{ justifyContent: 'flex-start' }}>
              ABOUT DIVYA HANDCRAFTS
            </div>
            
            <h2 className="about-main-title">
              <span className="title-line">Crafted with <span className="gold-highlight">Love</span>,</span>
              <span className="title-line">Made for Every <span className="gold-highlight">Special Moment</span></span>
            </h2>

            {/* Premium Glassmorphism Feature Quote Card */}
            <div className="premium-quote-card">
              <div className="quote-corner-decor q-corner-tl">🌸</div>
              <div className="quote-corner-decor q-corner-tr">✨</div>
              <div className="quote-corner-decor q-corner-bl">✨</div>
              <div className="quote-corner-decor q-corner-br">🌸</div>

              <FaQuoteLeft className="quote-icon-gold" />
              <p className="quote-card-text">
                "Every creation at Divya Handcrafts is made with love, creativity, and care. We believe every handmade gift should bring happiness and become a cherished memory."
              </p>
              <span className="quote-author">— Divya Handcrafts</span>
            </div>

            <p className="about-paragraph">
              Welcome to <strong>Divya Handcrafts</strong>, where creativity meets craftsmanship. We specialize in beautifully handcrafted bridal bangles, resin art, homemade chocolates, homemade biscuits, personalized gifts, and premium gift hampers. Every product is carefully made using quality materials and fresh ingredients to ensure beauty, quality, and customer satisfaction. Whether it's a wedding, birthday, baby shower, anniversary, or festival, we create unique handmade gifts that make every celebration memorable.
            </p>

            {/* Call to Action Buttons */}
            <div className="about-cta-buttons">
              <button 
                onClick={handleExploreClick} 
                className="btn btn-primary about-btn-explore"
                type="button"
                aria-label="Explore Our Collection"
              >
                <span>EXPLORE OUR COLLECTION</span> <FaArrowRight className="explore-btn-icon" />
              </button>
              <button 
                onClick={() => setWaModalOpen(true)}
                className="btn btn-whatsapp about-btn-wa"
                type="button"
              >
                <FaWhatsapp /> <span>ORDER ON WHATSAPP</span>
              </button>
            </div>
          </div>
        </div>

        <WhatsAppModal
          isOpen={waModalOpen}
          onClose={() => setWaModalOpen(false)}
          messageText="Hi Divya Handcrafts! I would like to order from your handmade collection."
        />


      </div>

      <style>{`
        .about-section {
          padding: 3rem 0 6rem 0;
          background: linear-gradient(135deg, #FFFDF8 0%, #FFF8EC 45%, #FFFFFF 100%);
          position: relative;
          overflow: hidden;
        }

        .about-section .container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        .about-glow-topleft {
          position: absolute;
          top: -5%;
          left: -5%;
          width: 550px;
          height: 550px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(246, 211, 101, 0.08) 0%, transparent 65%);
          pointer-events: none;
          z-index: 1;
        }

        .about-glow-bottomright {
          position: absolute;
          bottom: -5%;
          right: -5%;
          width: 600px;
          height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255, 244, 214, 0.06) 0%, transparent 65%);
          pointer-events: none;
          z-index: 1;
        }

        .about-blush-topleft {
          position: absolute;
          top: -60px;
          left: -60px;
          width: 480px;
          height: 480px;
          border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
          background: radial-gradient(circle, rgba(255, 238, 220, 0.55) 0%, rgba(253, 228, 200, 0.25) 50%, transparent 70%);
          filter: blur(35px);
          pointer-events: none;
          z-index: 1;
        }

        .about-blush-bottomright {
          position: absolute;
          bottom: -80px;
          right: -60px;
          width: 520px;
          height: 520px;
          border-radius: 60% 40% 30% 70% / 50% 60% 40% 50%;
          background: radial-gradient(circle, rgba(252, 235, 215, 0.5) 0%, rgba(248, 220, 190, 0.2) 50%, transparent 70%);
          filter: blur(40px);
          pointer-events: none;
          z-index: 1;
        }

        .about-blush-topright {
          position: absolute;
          top: 2%;
          right: -40px;
          width: 380px;
          height: 380px;
          border-radius: 50% 50% 40% 60% / 60% 40% 60% 40%;
          background: radial-gradient(circle, rgba(246, 211, 101, 0.12) 0%, transparent 65%);
          filter: blur(30px);
          pointer-events: none;
          z-index: 1;
        }

        .about-texture-overlay {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(rgba(199, 154, 43, 0.04) 1px, transparent 1px);
          background-size: 28px 28px;
          opacity: 0.025;
          pointer-events: none;
          z-index: 1;
        }

        .about-bg-decor {
          position: absolute;
          opacity: 0.07;
          filter: grayscale(0.2) sepia(0.3);
          pointer-events: none;
          user-select: none;
          z-index: 1;
          animation: floatSlow 14s ease-in-out infinite;
        }

        @keyframes floatSlow {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-4px) rotate(3deg); }
        }

        .decor-top-left { top: 3%; left: 2%; font-size: 2rem; animation-delay: 0s; }
        .decor-top-right { top: 4%; right: 2.5%; font-size: 1.8rem; animation-delay: 2s; }
        .decor-mid-left { top: 45%; left: 1.5%; font-size: 1.6rem; animation-delay: 4s; }
        .decor-mid-right { top: 42%; right: 2%; font-size: 1.5rem; animation-delay: 6s; }
        .decor-bottom-left { bottom: 4%; left: 2.5%; font-size: 1.6rem; animation-delay: 8s; }
        .decor-bottom-right { bottom: 3%; right: 2%; font-size: 1.9rem; animation-delay: 10s; }

        .about-grid {
          display: grid;
          grid-template-columns: 0.98fr 1.02fr;
          gap: 3.5rem;
          align-items: flex-start;
          margin-bottom: 0;
        }

        .about-visual {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          max-width: 580px;
          position: relative;
          margin-top: 0.25rem;
        }

        .logo-card-container {
          position: relative;
          width: 100%;
          display: flex;
          justify-content: center;
        }

        .why-choose-left-container {
          width: 100%;
          margin-top: 72px;
        }

        .why-choose-left-container .why-choose-us-title {
          font-family: var(--font-serif);
          font-size: 1.45rem;
          font-weight: 700;
          color: #3E2C1C;
          margin-bottom: 1.25rem;
          text-align: center;
        }

        .about-visual-backdrop {
          position: absolute;
          inset: -30px -25px;
          pointer-events: none;
          z-index: 1;
        }

        .backdrop-gradient-glow {
          position: absolute;
          inset: 0;
          border-radius: 36px;
          background: radial-gradient(ellipse at center, rgba(253, 245, 246, 0.85) 0%, rgba(250, 240, 242, 0.5) 55%, rgba(255, 255, 255, 0) 80%);
          filter: blur(8px);
        }

        .backdrop-botanical {
          position: absolute;
          font-size: 1.6rem;
          opacity: 0.08;
          filter: grayscale(0.2) contrast(1.1);
          user-select: none;
        }

        .top-right-leaf {
          top: -5px;
          right: 15px;
          transform: rotate(25deg);
        }

        .bottom-left-flower {
          bottom: -5px;
          left: 15px;
          transform: rotate(-15deg);
        }

        .top-left-sparkle {
          top: 15px;
          left: 20px;
          font-size: 1.3rem;
          opacity: 0.07;
        }

        .bottom-right-sparkle {
          bottom: 20px;
          right: 20px;
          font-size: 1.3rem;
          opacity: 0.07;
        }

        .card-glow-bg {
          position: absolute;
          inset: -15px;
          border-radius: 36px;
          background: radial-gradient(circle at center, rgba(212, 175, 55, 0.15) 0%, rgba(248, 231, 160, 0.08) 50%, transparent 75%);
          filter: blur(12px);
          pointer-events: none;
          z-index: 1;
        }

        .logo-premium-card {
          background: #FFFDF8;
          border: 1px solid #E8D8B5;
          border-radius: 28px;
          padding: 24px 20px 16px 20px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          width: 100%;
          max-width: 580px;
          position: relative;
          z-index: 2;
          transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
          animation: floatCard 4s ease-in-out infinite;
          overflow: hidden;
        }

        @keyframes floatCard {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }

        .logo-premium-card:hover {
          animation-play-state: paused;
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 22px 55px rgba(0, 0, 0, 0.12), 0 8px 22px rgba(212, 175, 55, 0.22);
          border-color: transparent;
          background-image: linear-gradient(#FFFDF8, #FFFDF8), linear-gradient(135deg, #F8E7A0 0%, #D4AF37 50%, #F6D365 100%);
          background-origin: border-box;
          background-clip: padding-box, border-box;
        }

        .card-corner-decor {
          position: absolute;
          font-size: 0.95rem;
          opacity: 0.22;
          pointer-events: none;
          user-select: none;
        }

        .corner-tl { top: 14px; left: 16px; }
        .corner-tr { top: 14px; right: 16px; }
        .corner-bl { bottom: 14px; left: 16px; }
        .corner-br { bottom: 14px; right: 16px; }

        .logo-wrapper {
          width: 290px;
          height: 290px;
          margin-bottom: 0.75rem;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .about-logo-halo {
          position: absolute;
          inset: -10px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(248, 231, 160, 0.5) 0%, rgba(212, 175, 55, 0.18) 55%, transparent 75%);
          filter: blur(6px);
          animation: pulseGlow 3.5s ease-in-out infinite alternate;
        }

        .about-logo-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          border-radius: 50%;
          border: 3px solid #C79A2B;
          box-shadow: 0 8px 25px rgba(199, 154, 43, 0.25);
          background: #FFFFFF;
          position: relative;
          z-index: 2;
          transition: transform 0.35s ease;
        }

        .logo-premium-card:hover .about-logo-img {
          transform: scale(1.03);
        }

        .logo-card-text {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          padding-top: 0.85rem;
          border-top: 1px solid rgba(212, 175, 55, 0.25);
          width: 100%;
        }

        .about-main-title {
          font-family: 'Playfair Display', 'Cormorant Garamond', Georgia, serif;
          font-size: 60px;
          font-weight: 700;
          color: #3E2C1C;
          line-height: 1.1;
          letter-spacing: -0.5px;
          margin-bottom: 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          animation: fadeInUpAbout 0.85s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .about-main-title .title-line {
          display: block;
        }

        .gold-highlight {
          background: linear-gradient(135deg, #F6D365 0%, #D4AF37 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        @keyframes fadeInUpAbout {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .brand-card-title {
          font-family: var(--font-serif);
          font-size: 1.85rem;
          font-weight: 700;
          color: #3E2C1C;
          letter-spacing: 0.02em;
          line-height: 1.1;
        }

        .brand-card-tagline {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.72rem;
          color: #C79A2B;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }

        .premium-quote-card {
          background: linear-gradient(135deg, #FFFBF5 0%, #FFFFFF 100%);
          border: 1px solid #E8D8B5;
          border-radius: 24px;
          padding: 34px;
          max-width: 540px;
          width: 100%;
          box-shadow: 0 12px 35px rgba(0, 0, 0, 0.08), 0 0 40px rgba(212, 175, 55, 0.10);
          margin-bottom: 24px;
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
          box-sizing: border-box;
        }

        .premium-quote-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 18px 45px rgba(0, 0, 0, 0.12), 0 0 48px rgba(212, 175, 55, 0.18);
        }

        .quote-corner-decor {
          position: absolute;
          font-size: 1rem;
          opacity: 0.05;
          pointer-events: none;
          user-select: none;
        }

        .q-corner-tl { top: 10px; left: 12px; }
        .q-corner-tr { top: 10px; right: 12px; }
        .q-corner-bl { bottom: 10px; left: 12px; }
        .q-corner-br { bottom: 10px; right: 12px; }

        .quote-icon-gold {
          font-size: 55px;
          background: linear-gradient(135deg, #F6D365 0%, #D4AF37 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          color: #D4AF37;
          opacity: 0.90;
          margin-bottom: 0.75rem;
          display: block;
        }

        .quote-card-text {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 22px;
          font-style: italic;
          color: #5A4032;
          line-height: 1.65;
          margin-bottom: 0.85rem;
        }

        .quote-author {
          font-family: 'Poppins', 'Montserrat', sans-serif;
          font-size: 15px;
          font-weight: 600;
          color: #C79A2B;
          letter-spacing: 0.04em;
          display: inline-block;
          border-top: 1px solid rgba(212, 175, 55, 0.3);
          padding-top: 0.6rem;
          margin-top: 0;
        }

        .about-paragraph {
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          font-size: 18px;
          color: #5A4A42;
          line-height: 1.8;
          letter-spacing: 0.2px;
          max-width: 490px;
          width: 100%;
          text-align: left;
          margin-top: 0;
          margin-bottom: 32px;
        }

        .why-choose-us-title {
          font-family: var(--font-serif);
          font-size: 1.35rem;
          font-weight: 700;
          color: var(--text-main);
          margin-bottom: 1rem;
        }

        .why-choose-cards-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px 22px;
          margin-bottom: 2.25rem;
        }

        .why-card {
          background: #FFFFFF;
          border: 1px solid #F2E5C3;
          border-radius: 20px;
          padding: 28px 24px;
          min-height: 122px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
          display: flex;
          align-items: center;
          gap: 1.15rem;
          transition: all 300ms cubic-bezier(0.25, 1, 0.5, 1);
          cursor: pointer;
          box-sizing: border-box;
        }

        .why-card:hover {
          transform: translateY(-5px);
          background: #FFFCF7;
          border-color: #D4AF37;
          box-shadow: 0 16px 38px rgba(212, 175, 55, 0.15), 0 6px 20px rgba(0, 0, 0, 0.07);
        }

        .why-card-icon-wrap {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: #FFF6E5;
          color: #C79A2B;
          border: 1px solid #F2E5C3;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          flex-shrink: 0;
          transition: all 300ms ease;
        }

        .why-card:hover .why-card-icon-wrap {
          transform: scale(1.08);
          border-color: #D4AF37;
          background: #FFF0D6;
        }

        .why-card-title {
          font-family: 'Poppins', 'Montserrat', sans-serif;
          font-size: 17px;
          font-weight: 600;
          color: #3E2C1C;
          margin: 0;
          line-height: 1.35;
        }

        .about-cta-buttons {
          display: flex;
          gap: 1.25rem;
          flex-wrap: wrap;
          margin-top: 2rem;
          align-items: center;
        }

        .about-cta-buttons .btn {
          width: 260px;
          height: 54px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.65rem;
          border-radius: 50px;
          font-weight: 600;
          font-size: 0.95rem;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          box-sizing: border-box;
        }

        .about-btn-explore {
          background: linear-gradient(135deg, #F6D365 0%, #D4AF37 50%, #C79A2B 100%);
          color: #FFFFFF !important;
          box-shadow: 0 8px 24px rgba(212, 175, 55, 0.35);
          border: none;
          cursor: pointer;
          transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .about-btn-explore:hover {
          transform: translateY(-5px);
          background: linear-gradient(135deg, #F9DA73 0%, #DFC048 50%, #D2A430 100%);
          box-shadow: 0 14px 34px rgba(212, 175, 55, 0.55), 0 0 20px rgba(246, 211, 101, 0.4);
          filter: brightness(1.08);
        }

        .about-btn-explore:hover .explore-btn-icon {
          transform: translateX(4px);
        }

        .explore-btn-icon {
          transition: transform 0.3s ease;
        }

        .about-btn-wa {
          background: linear-gradient(135deg, #25D366 0%, #1EBE5D 100%);
          color: #FFFFFF;
          box-shadow: 0 8px 24px rgba(37, 211, 102, 0.35);
          border: none;
        }

        .about-btn-wa:hover {
          transform: translateY(-4px);
          box-shadow: 0 0 28px rgba(37, 211, 102, 0.65), 0 12px 30px rgba(37, 211, 102, 0.45);
          filter: brightness(1.06);
        }

        @media (max-width: 1024px) {
          .about-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
          .about-visual {
            max-width: 100%;
          }
          .about-main-title {
            font-size: 42px;
          }
          .logo-premium-card {
            max-width: 480px;
          }
          .logo-wrapper {
            width: 220px;
            height: 220px;
          }
          .why-choose-cards-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .premium-quote-card {
            padding: 30px;
          }
          .quote-card-text {
            font-size: 22px;
          }
          .about-paragraph {
            font-size: 16px;
            max-width: 90%;
          }
        }

        @media (max-width: 768px) {
          .about-main-title {
            font-size: 32px;
            line-height: 1.2;
          }
        }

        @media (max-width: 576px) {
          .why-choose-cards-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          .about-cta-buttons .btn {
            width: 100%;
          }
          .premium-quote-card {
            padding: 24px;
          }
          .quote-card-text {
            font-size: 20px;
            line-height: 1.65;
          }
          .quote-icon-gold {
            font-size: 48px;
          }
          .about-paragraph {
            font-size: 15px;
            max-width: 100%;
            padding: 0 4px;
          }
        }
      `}</style>
    </section>
  );
};

export default AboutSection;
