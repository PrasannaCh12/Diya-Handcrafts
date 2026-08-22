import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { FaShoppingBag, FaWhatsapp, FaBars, FaTimes, FaSearch, FaHeart, FaMagic } from 'react-icons/fa';
import WhatsAppModal from './WhatsAppModal';

const Navbar = ({ cartCount = 0, onOpenCart }) => {
  const [scrolled, setScrolled] = useState(false);
  const [waModalOpen, setWaModalOpen] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

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

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileDrawerOpen(false);
  }, [location.pathname]);

  // Exact 10 Navigation Links
  const navLinks = [
    { name: 'Home Page', path: '/' },
    { name: 'Shop & Gallery', path: '/shop' },
    { name: 'Thread Work', path: '/threadwork' },
    { name: 'Resin Art', path: '/resinart' },
    { name: 'Wedding & Marriage Items', path: '/wedding-marriage-items' },
    { name: 'Customized Chains', path: '/customized-chains' },
    { name: 'Chocolates', path: '/chocolates' },
    { name: 'Biscuits', path: '/biscuits' },
    { name: 'Customized Gifts', path: '/customized-gifts' },
    { name: 'Contact & Inquiry', path: '/contact' },
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

      {/* Main Single-Row Sticky Header */}
      <header className={`navbar-header ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          {/* Left: Logo */}
          <Link to="/" className="nav-logo">
            <img src="/divya-logo.jpg" alt="Divya Handcrafts Logo" className="navbar-logo-img" />
            <div className="logo-text-wrap">
              <span className="logo-brand">Divya Handcrafts</span>
              <span className="logo-tagline">MADE WITH LOVE, MADE FOR YOU</span>
            </div>
          </Link>

          {/* Center: Desktop Navigation Items (Exact 10 Items Single Line) */}
          <nav className="desktop-single-nav">
            {navLinks.map((link) => (
              <NavLink 
                key={link.name} 
                to={link.path} 
                className={({ isActive }) => `nav-single-link ${isActive ? 'active' : ''}`}
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Right: Actions */}
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
              className="custom-order-btn desktop-only-btn"
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

            {/* Mobile Hamburger Drawer Toggle Button */}
            <button
              onClick={() => setMobileDrawerOpen((prev) => !prev)}
              className="mobile-hamburger-btn"
              title="Toggle Menu"
              aria-label="Toggle Menu"
              type="button"
            >
              {mobileDrawerOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </header>

      {/* Slide-Out Mobile Navigation Drawer */}
      {mobileDrawerOpen && (
        <div className="mobile-drawer-overlay" onClick={() => setMobileDrawerOpen(false)}>
          <div className="mobile-drawer-content" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header">
              <div className="logo-text-wrap">
                <span className="logo-brand">Divya Handcrafts</span>
                <span className="logo-tagline">NAVIGATION MENU</span>
              </div>
              <button className="drawer-close-btn" onClick={() => setMobileDrawerOpen(false)}>
                <FaTimes />
              </button>
            </div>

            <nav className="drawer-nav-list">
              {navLinks.map((link, idx) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) => `drawer-nav-item ${isActive ? 'active' : ''}`}
                >
                  <span className="drawer-num">{idx + 1}.</span>
                  <span>{link.name}</span>
                </NavLink>
              ))}
            </nav>

            <div className="drawer-footer-actions">
              <button 
                className="btn btn-gold-solid" 
                style={{ width: '100%' }}
                onClick={() => {
                  setMobileDrawerOpen(false);
                  navigate('/custom-order');
                }}
              >
                <FaMagic /> Design Custom Order
              </button>
              <button 
                className="btn btn-whatsapp-cta" 
                style={{ width: '100%', marginTop: '0.6rem' }}
                onClick={() => {
                  setMobileDrawerOpen(false);
                  setWaModalOpen(true);
                }}
              >
                <FaWhatsapp /> Chat on WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}

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
          transition: all 0.3s ease;
          border-bottom: 1px solid #E8D8B5;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
        }

        .navbar-header.scrolled {
          background: rgba(255, 253, 248, 0.98);
          box-shadow: 0 6px 24px rgba(0, 0, 0, 0.08);
        }

        .nav-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 74px;
          gap: 0.85rem;
          max-width: 98%;
          margin: 0 auto;
          padding: 0 1rem 0 0.75rem;
        }

        .nav-logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          text-decoration: none;
          flex-shrink: 0;
        }

        .navbar-logo-img {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid #C79A2B;
          box-shadow: 0 3px 10px rgba(199, 154, 43, 0.2);
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
          font-size: 1.3rem;
          font-weight: 700;
          color: #3E2C1C;
          line-height: 1.1;
          letter-spacing: 0.02em;
          white-space: nowrap;
        }

        .logo-tagline {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.52rem;
          color: #C79A2B;
          letter-spacing: 0.18em;
          font-weight: 600;
          white-space: nowrap;
          margin-top: 0.06rem;
        }

        /* Single-Row Desktop Navigation */
        .desktop-single-nav {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          white-space: nowrap;
        }

        .nav-single-link {
          text-decoration: none;
          color: #2D2523;
          font-family: var(--font-sans, 'Montserrat', sans-serif);
          font-size: 0.77rem;
          font-weight: 600;
          letter-spacing: -0.01em;
          padding: 0.35rem 0.25rem;
          position: relative;
          transition: color 0.25s ease;
          white-space: nowrap;
          background: transparent;
          border: none;
          cursor: pointer;
        }

        .nav-single-link:hover {
          color: #C79A2B;
        }

        .nav-single-link.active {
          color: #C79A2B;
          font-weight: 700;
        }

        .nav-single-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 0%;
          height: 2px;
          background: #C79A2B;
          border-radius: 2px;
          transition: width 0.25s ease;
        }

        .nav-single-link:hover::after,
        .nav-single-link.active::after {
          width: 100%;
        }

        .nav-actions {
          display: flex;
          align-items: center;
          gap: 0.55rem;
          flex-shrink: 0;
        }

        .icon-action-btn {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: #FAF5EF;
          border: 1px solid rgba(199, 154, 43, 0.25);
          color: #1C3B2B;
          font-size: 0.95rem;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.25s ease;
          position: relative;
        }

        .icon-action-btn:hover {
          background: #1C3B2B;
          color: #FFFFFF;
          transform: scale(1.06);
          border-color: #1C3B2B;
        }

        .cart-icon-btn {
          position: relative;
        }

        .cart-badge-count {
          position: absolute;
          top: -3px;
          right: -3px;
          background: #C79A2B;
          color: #FFFFFF;
          font-size: 0.65rem;
          font-weight: 700;
          min-width: 17px;
          height: 17px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 4px;
        }

        .custom-order-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          background: transparent;
          color: #3E2C1C;
          border: 1.5px solid #C79A2B;
          height: 38px;
          padding: 0 1.15rem;
          border-radius: 50px;
          font-family: 'Montserrat', sans-serif;
          font-size: 0.8rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.25s ease;
          white-space: nowrap;
        }

        .custom-order-btn:hover {
          background: linear-gradient(135deg, #C79A2B 0%, #AA7C11 100%);
          color: #FFFFFF;
          border-color: transparent;
          transform: translateY(-1px);
        }

        .nav-whatsapp-btn {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: #25D366;
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.15rem;
          text-decoration: none;
          transition: all 0.25s ease;
          border: none;
          cursor: pointer;
          flex-shrink: 0;
        }

        .nav-whatsapp-btn:hover {
          transform: scale(1.08);
        }

        .mobile-hamburger-btn {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: #FAF5EF;
          border: 1px solid rgba(199, 154, 43, 0.3);
          color: #1C3B2B;
          font-size: 1rem;
          display: none;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .mobile-hamburger-btn:hover {
          background: #C79A2B;
          color: #FFFFFF;
        }

        /* Slide-out Mobile Navigation Drawer */
        .mobile-drawer-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.55);
          backdrop-filter: blur(4px);
          z-index: 9999;
          display: flex;
          justify-content: flex-end;
          animation: fadeIn 0.25s ease;
        }

        .mobile-drawer-content {
          width: 320px;
          max-width: 85vw;
          height: 100%;
          background: #FFFDF9;
          display: flex;
          flex-direction: column;
          box-shadow: -10px 0 30px rgba(0, 0, 0, 0.15);
          animation: slideInRight 0.3s cubic-bezier(0.22, 1, 0.36, 1);
          padding: 1.5rem;
          box-sizing: border-box;
          overflow-y: auto;
        }

        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }

        .drawer-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 1rem;
          border-bottom: 1px solid rgba(199, 154, 43, 0.2);
          margin-bottom: 1rem;
        }

        .drawer-close-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #FBF0F3;
          border: none;
          color: #1C3B2B;
          font-size: 1.1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .drawer-nav-list {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          flex-grow: 1;
        }

        .drawer-nav-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 0.85rem;
          border-radius: 10px;
          text-decoration: none;
          color: #2D2523;
          font-weight: 600;
          font-size: 0.92rem;
          transition: all 0.2s ease;
        }

        .drawer-num {
          color: #C79A2B;
          font-size: 0.82rem;
          font-weight: 700;
          width: 20px;
        }

        .drawer-nav-item:hover,
        .drawer-nav-item.active {
          background: #FBF0F3;
          color: #1C3B2B;
          font-weight: 700;
        }

        .drawer-footer-actions {
          margin-top: 1.5rem;
          padding-top: 1rem;
          border-top: 1px solid rgba(199, 154, 43, 0.2);
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        @media (max-width: 1180px) {
          .desktop-single-nav {
            display: none !important;
          }
          .desktop-only-btn {
            display: none !important;
          }
          .mobile-hamburger-btn {
            display: flex !important;
          }
          .nav-container {
            height: 64px !important;
            padding: 0 1rem !important;
          }
          .navbar-logo-img {
            width: 38px;
            height: 38px;
          }
          .logo-brand {
            font-size: 1.15rem;
          }
          .logo-tagline {
            font-size: 0.46rem;
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;
