import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaFacebookF, FaPinterestP, FaWhatsapp, FaHeart, FaPaperPlane, FaCheck } from 'react-icons/fa';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setEmail('');
    }, 4000);
  };

  return (
    <footer className="footer-section">
      <div className="container">
        {/* Newsletter Banner */}
        <div className="footer-newsletter-box glass-card">
          <div className="newsletter-text">
            <h3>Join Divya's Royal Circle</h3>
            <p>Subscribe to receive VIP access to new bridal collections, festive hamper drops, and private offers.</p>
          </div>

          <form onSubmit={handleSubscribe} className="newsletter-form">
            {subscribed ? (
              <div className="sub-success flex items-center gap-2 text-green-600">
                <FaCheck /> Thank you for subscribing!
              </div>
            ) : (
              <div className="newsletter-input-group">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  className="newsletter-input"
                />
                <button type="submit" className="btn btn-primary">
                  <FaPaperPlane /> Join
                </button>
              </div>
            )}
          </form>
        </div>

        {/* Main Footer Links */}
        <div className="footer-links-grid">
          {/* Brand Info */}
          <div className="footer-brand-col">
            <Link to="/" className="nav-logo" style={{ marginBottom: '1rem' }}>
              <img src="/divya-logo.jpg" alt="Divya Handcrafts Logo" className="navbar-logo-img" />
              <div className="logo-text-wrap">
                <span className="logo-brand" style={{ color: '#FFFFFF' }}>Divya Yelchuri</span>
                <span className="logo-tagline" style={{ color: 'var(--gold-light)' }}>HANDCRAFTED LUXURY</span>
              </div>
            </Link>
            <p className="footer-bio">
              Handcrafting timeless royal memories. Specializing in customized bridal bangles, preserved wedding flower resin clocks, homemade Belgian chocolates, eggless cookies, and luxury trousseau hampers.
            </p>
            <div className="footer-social-icons">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" title="Instagram"><FaInstagram /></a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" title="Facebook"><FaFacebookF /></a>
              <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" title="Pinterest"><FaPinterestP /></a>
              <a href="https://wa.me/917981664314" target="_blank" rel="noopener noreferrer" title="WhatsApp"><FaWhatsapp /></a>
            </div>
            <div style={{ marginTop: '0.75rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              💬 <strong>WhatsApp Contact:</strong><br />
              • <a href="https://wa.me/917981664314" style={{ color: 'var(--gold-dark)', fontWeight: '600' }}>+91 79816 64314</a><br />
              • <a href="https://wa.me/918555087143" style={{ color: 'var(--gold-dark)', fontWeight: '600' }}>+91 85550 87143</a><br />
              • <a href="https://wa.me/919154607582" style={{ color: 'var(--gold-dark)', fontWeight: '600' }}>+91 91546 07582</a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-nav-col">
            <h4 className="footer-col-title">Navigation</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Divya</Link></li>
              <li><Link to="/shop">Boutique Shop</Link></li>
              <li><Link to="/custom-order">Custom Order Studio</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/admin">Admin Panel</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="footer-nav-col">
            <h4 className="footer-col-title">Product Studios</h4>
            <ul>
              <li><Link to="/threadwork">Thread Work Studio</Link></li>
              <li><Link to="/resinart">Resin Art Studio</Link></li>
              <li><Link to="/wedding-marriage-items">Wedding & Marriage Items</Link></li>
              <li><Link to="/customized-chains">Customized Chains</Link></li>
              <li><Link to="/chocolates">Handmade Chocolates</Link></li>
              <li><Link to="/biscuits">Gourmet Biscuits</Link></li>
              <li><Link to="/customized-gifts">Customized Gifts</Link></li>
            </ul>
          </div>

          {/* Atelier Contact */}
          <div className="footer-nav-col">
            <h4 className="footer-col-title">Artisan Atelier</h4>
            <p className="footer-contact-item">Banjara Hills, Phase 2, Hyderabad, TS, India</p>
            <p className="footer-contact-item">WhatsApp: +91 79816 64314</p>
            <p className="footer-contact-item">Email: hello@divyayelchuri.com</p>
            <span className="shipping-badge">✈️ Express Pan-India & Global Dispatch</span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <p>© {new Date().getFullYear()} Divya Yelchuri Handcrafted Luxury. All rights reserved.</p>
          <p className="made-with-love">
            Crafted with <FaHeart style={{ color: '#E63946', margin: '0 0.2rem' }} /> for brides & gift connoisseurs.
          </p>
        </div>
      </div>

      <style>{`
        .footer-section {
          background: #2C2224;
          color: rgba(255, 255, 255, 0.8);
          padding: 5rem 0 2rem 0;
          position: relative;
        }

        .footer-newsletter-box {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(212, 175, 55, 0.3);
          padding: 2.5rem;
          margin-bottom: 4rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
          flex-wrap: wrap;
        }

        .newsletter-text h3 {
          color: #FFFFFF;
          font-size: 1.8rem;
          margin-bottom: 0.25rem;
        }

        .newsletter-text p {
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.9rem;
          max-width: 500px;
        }

        .newsletter-input-group {
          display: flex;
          gap: 0.5rem;
        }

        .newsletter-input {
          padding: 0.75rem 1.25rem;
          border-radius: var(--radius-full);
          border: 1px solid rgba(255, 255, 255, 0.2);
          background: rgba(255, 255, 255, 0.1);
          color: #FFFFFF;
          font-family: var(--font-sans);
          outline: none;
          min-width: 280px;
        }

        .newsletter-input::placeholder {
          color: rgba(255, 255, 255, 0.5);
        }

        .sub-success {
          color: #25D366;
          font-weight: 600;
        }

        .footer-links-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr 1.2fr;
          gap: 3rem;
          padding-bottom: 3.5rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .footer-bio {
          font-size: 0.875rem;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.65);
          margin-bottom: 1.5rem;
        }

        .footer-social-icons {
          display: flex;
          gap: 0.85rem;
        }

        .footer-social-icons a {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          color: var(--gold-light);
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          transition: var(--transition-smooth);
        }

        .footer-social-icons a:hover {
          background: var(--gold-gradient);
          color: #FFFFFF;
          transform: translateY(-2px);
        }

        .footer-col-title {
          font-size: 1.2rem;
          color: #FFFFFF;
          margin-bottom: 1.25rem;
        }

        .footer-nav-col ul {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .footer-nav-col a {
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          font-size: 0.875rem;
          transition: color 0.2s;
        }

        .footer-nav-col a:hover {
          color: var(--gold-light);
        }

        .footer-contact-item {
          font-size: 0.875rem;
          margin-bottom: 0.5rem;
          color: rgba(255, 255, 255, 0.75);
        }

        .shipping-badge {
          display: inline-block;
          margin-top: 0.75rem;
          font-size: 0.75rem;
          background: rgba(212, 175, 55, 0.2);
          color: var(--gold-light);
          padding: 0.35rem 0.75rem;
          border-radius: var(--radius-full);
          border: 1px solid rgba(212, 175, 55, 0.3);
        }

        .footer-bottom-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 2rem;
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.5);
        }

        .made-with-love {
          display: flex;
          align-items: center;
        }

        @media (max-width: 992px) {
          .footer-links-grid {
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
          }
        }

        @media (max-width: 576px) {
          .footer-links-grid {
            grid-template-columns: 1fr;
          }
          .footer-bottom-bar {
            flex-direction: column;
            gap: 0.75rem;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
