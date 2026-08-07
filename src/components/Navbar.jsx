import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaShoppingBag, FaWhatsapp, FaBars, FaTimes, FaSearch, FaHeart, FaMagic } from 'react-icons/fa';
import WhatsAppModal from './WhatsAppModal';

const Navbar = ({ cartCount = 0, onOpenCart }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [waModalOpen, setWaModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Shop', path: '/shop' },
    { name: 'Thread Work', path: '/threadwork' },
    { name: 'Resin Art', path: '/resinart' },
    { name: 'Chocolates', path: '/chocolates' },
    { name: 'Biscuits', path: '/biscuits' },
    { name: 'Custom Orders', path: '/custom-order' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      {/* Top Luxury Announcement Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #C79A2B 0%, #D4AF37 50%, #AA7C11 100%)',
        color: '#FFFFFF',
        textAlign: 'center',
        padding: '0.35rem 1rem',
        fontSize: '0.78rem',
        fontWeight: '600',
        letterSpacing: '0.05em',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem'
      }}>
        <FaMagic style={{ fontSize: '0.8rem' }} />
        <span>Handcrafted with Love in India • Worldwide Express Shipping Available</span>
        <FaMagic style={{ fontSize: '0.8rem' }} />
      </div>

      {/* Main Sticky Premium Header (Slimmer 78px height, 1400px max width) */}
      <header className={`navbar-header ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          {/* Left: Logo, Brand Name & Tagline */}
          <Link to="/" className="nav-logo">
            <img src="/divya-logo.jpg" alt="Divya Handcrafts Logo" className="navbar-logo-img" />
            <div className="logo-text-wrap">
              <span className="logo-brand">Divya Handcrafts</span>
              <span className="logo-tagline">MADE WITH LOVE, MADE FOR YOU</span>
            </div>
          </Link>

          {/* Center: Desktop Navigation */}
          <nav className="desktop-nav">
            {navLinks.map((link) => (
              <NavLink 
                key={link.name} 
                to={link.path} 
                className={({ isActive }) => `nav-item-link ${isActive ? 'active' : ''}`}
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Right: Actions (Search, Wishlist, Cart, Custom Order, WhatsApp) */}
          <div className="nav-actions">
            <button 
              className="icon-action-btn" 
              onClick={() => navigate('/shop')} 
              title="Search Products"
              aria-label="Search"
            >
              <FaSearch />
            </button>

            <button 
              className="icon-action-btn" 
              onClick={() => navigate('/shop')} 
              title="Wishlist"
              aria-label="Wishlist"
            >
              <FaHeart />
            </button>

            <button 
              className="icon-action-btn cart-icon-btn" 
              onClick={onOpenCart} 
              title="View Cart"
              aria-label="Cart"
            >
              <FaShoppingBag />
              {cartCount > 0 && <span className="cart-badge-count">{cartCount}</span>}
            </button>

            <button 
              className="custom-order-btn"
              onClick={() => navigate('/custom-order')}
              title="Design Custom Order"
            >
              <FaMagic />
              <span>Custom Order</span>
            </button>

            <button 
              onClick={() => setWaModalOpen(true)}
              className="nav-whatsapp-btn"
              title="Chat on WhatsApp"
              type="button"
            >
              <FaWhatsapp />
            </button>

            <button 
              className="mobile-hamburger" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="mobile-menu-overlay">
            <div className="mobile-menu-inner">
              <div className="mobile-menu-header">
                <span className="mobile-menu-title">Menu</span>
                <button onClick={() => setMobileMenuOpen(false)} aria-label="Close menu">
                  <FaTimes />
                </button>
              </div>
              <ul className="mobile-nav-links">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <NavLink 
                      to={link.path} 
                      onClick={() => setMobileMenuOpen(false)}
                      className={({ isActive }) => `mobile-link ${isActive ? 'active' : ''}`}
                    >
                      {link.name}
                    </NavLink>
                  </li>
                ))}
              </ul>

              <div className="mobile-actions">
                <button
                  className="custom-order-btn-full"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate('/custom-order');
                  }}
                >
                  <FaMagic /> Design Custom Order
                </button>
                
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setWaModalOpen(true);
                  }}
                  className="btn-whatsapp-full"
                  type="button"
                >
                  <FaWhatsapp /> WhatsApp Inquiry
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      <WhatsAppModal
        isOpen={waModalOpen}
        onClose={() => setWaModalOpen(false)}
        messageText="Hi Divya Handcrafts! I would like to inquire about your handmade collections."
      />

      <style>{`
        .navbar-header {
          position: sticky;
          top: 0;
          left: 0;
          right: 0;
          z-index: 999;
          background: #FFFDF8;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
          border-bottom: 1px solid #E8D8B5;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
        }

        .navbar-header.scrolled {
          background: rgba(255, 253, 248, 0.98);
          box-shadow: 0 6px 24px rgba(0, 0, 0, 0.08);
          border-bottom-color: #DFCDA3;
        }

        .navbar-header.scrolled .nav-container {
          height: 70px;
        }

        .nav-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 78px;
          gap: 1.15rem;
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 1.5rem 0 22px;
          transition: height 0.3s ease;
        }

        .nav-logo {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          text-decoration: none;
          flex-shrink: 0;
        }

        .navbar-logo-img {
          width: 47px;
          height: 47px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid #C79A2B;
          box-shadow: 0 3px 12px rgba(199, 154, 43, 0.22);
          transition: transform 0.3s ease;
        }

        .nav-logo:hover .navbar-logo-img {
          transform: scale(1.06);
        }

        .logo-text-wrap {
          display: flex;
          flex-direction: column;
        }

        .logo-brand {
          font-family: 'Cormorant Garamond', 'Playfair Display', Georgia, serif;
          font-size: 1.35rem;
          font-weight: 700;
          color: #3E2C1C;
          line-height: 1.1;
          letter-spacing: 0.02em;
          white-space: nowrap;
        }

        .logo-tagline {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.54rem;
          color: #C79A2B;
          letter-spacing: 0.2em;
          font-weight: 600;
          white-space: nowrap;
          margin-top: 0.08rem;
        }

        .desktop-nav {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          white-space: nowrap;
        }

        .nav-item-link {
          text-decoration: none;
          color: #3E2C1C;
          font-size: 0.88rem;
          font-weight: 500;
          letter-spacing: 0.02em;
          transition: color 0.3s ease;
          position: relative;
          padding: 0.4rem 0;
          white-space: nowrap;
        }

        .nav-item-link:hover {
          color: #C79A2B;
        }

        .nav-item-link.active {
          color: #C79A2B;
          font-weight: 700;
        }

        .nav-item-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 0%;
          height: 2.5px;
          background: linear-gradient(90deg, #C79A2B, #E8C86A);
          border-radius: 2px;
          transition: width 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        }

        .nav-item-link:hover::after,
        .nav-item-link.active::after {
          width: 100%;
        }

        .nav-actions {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-shrink: 0;
        }

        .icon-action-btn {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: transparent;
          border: none;
          color: #3E2C1C;
          font-size: 1.05rem;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
        }

        .icon-action-btn:hover {
          color: #C79A2B;
          transform: scale(1.12);
          background: rgba(199, 154, 43, 0.08);
        }

        .cart-icon-btn {
          position: relative;
        }

        .cart-badge-count {
          position: absolute;
          top: -2px;
          right: -2px;
          background: #C79A2B;
          color: #FFFFFF;
          font-size: 0.68rem;
          font-weight: 700;
          min-width: 18px;
          height: 18px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 4px;
          box-shadow: 0 2px 6px rgba(199, 154, 43, 0.4);
        }

        .custom-order-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.45rem;
          background: transparent;
          color: #3E2C1C;
          border: 1.5px solid #C79A2B;
          height: 42px;
          padding: 0 1.35rem;
          border-radius: 50px;
          font-family: 'Montserrat', sans-serif;
          font-size: 0.85rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          white-space: nowrap;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
        }

        .custom-order-btn:hover {
          background: linear-gradient(135deg, #C79A2B 0%, #AA7C11 100%);
          color: #FFFFFF;
          border-color: transparent;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(199, 154, 43, 0.35);
        }

        .nav-whatsapp-btn {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: #25D366;
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
          text-decoration: none;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(37, 211, 102, 0.25);
          border: none;
          cursor: pointer;
          flex-shrink: 0;
        }

        .nav-whatsapp-btn:hover {
          transform: scale(1.08);
          box-shadow: 0 6px 18px rgba(37, 211, 102, 0.35);
        }

        .mobile-hamburger {
          display: none;
          background: transparent;
          border: none;
          font-size: 1.35rem;
          color: #3E2C1C;
          cursor: pointer;
          padding: 0.4rem;
        }

        .mobile-menu-overlay {
          position: fixed;
          inset: 0;
          background: rgba(30, 20, 15, 0.5);
          backdrop-filter: blur(6px);
          z-index: 1001;
          display: flex;
          justify-content: flex-end;
        }

        .mobile-menu-inner {
          width: 82%;
          max-width: 320px;
          height: 100vh;
          background: #FFFDF8;
          padding: 1.75rem 1.5rem;
          display: flex;
          flex-direction: column;
          box-shadow: -8px 0 30px rgba(0, 0, 0, 0.15);
          animation: slideLeft 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        }

        @keyframes slideLeft {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }

        .mobile-menu-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 1.25rem;
          border-bottom: 1px solid #E8D8B5;
        }

        .mobile-menu-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.4rem;
          font-weight: 700;
          color: #3E2C1C;
        }

        .mobile-menu-header button {
          background: none;
          border: none;
          font-size: 1.3rem;
          color: #3E2C1C;
          cursor: pointer;
        }

        .mobile-nav-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 1.15rem;
          margin-top: 1.5rem;
          flex-grow: 1;
          overflow-y: auto;
        }

        .mobile-link {
          text-decoration: none;
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.25rem;
          color: #3E2C1C;
          font-weight: 600;
          transition: color 0.2s;
          display: block;
        }

        .mobile-link:hover,
        .mobile-link.active {
          color: #C79A2B;
        }

        .mobile-actions {
          margin-top: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .custom-order-btn-full {
          width: 100%;
          height: 44px;
          border-radius: 50px;
          border: 1.5px solid #C79A2B;
          background: transparent;
          color: #3E2C1C;
          font-weight: 700;
          font-size: 0.9rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
        }

        .custom-order-btn-full:hover {
          background: #C79A2B;
          color: #FFFFFF;
        }

        .btn-whatsapp-full {
          width: 100%;
          height: 44px;
          border-radius: 50px;
          border: none;
          background: #25D366;
          color: #FFFFFF;
          font-weight: 700;
          font-size: 0.9rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
        }

        @media (max-width: 1250px) {
          .desktop-nav {
            gap: 1.1rem;
          }
          .nav-item-link {
            font-size: 0.83rem;
          }
        }

        @media (max-width: 1100px) {
          .desktop-nav {
            display: none;
          }
          .custom-order-btn {
            display: none;
          }
          .mobile-hamburger {
            display: block;
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;
