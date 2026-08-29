import React, { useState } from 'react';
import { FaTimes, FaShoppingBag, FaTrash, FaWhatsapp, FaArrowRight } from 'react-icons/fa';
import WhatsAppModal from './WhatsAppModal';
import { getImageUrl } from '../utils/imageUtils';

const CartDrawer = ({ isOpen, onClose, cartItems, onUpdateQty, onRemoveItem }) => {
  const [waModalOpen, setWaModalOpen] = useState(false);
  const [waOrderText, setWaOrderText] = useState('');

  if (!isOpen) return null;

  const totalQuantity = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);

  const handleCheckoutClick = () => {
    const randomDigits = Math.floor(100000 + Math.random() * 900000);
    const orderId = `DH-${randomDigits}`;

    let text = `NEW ORDER – DIYA HANDCRAFTS\n\n`;
    text += `Product:\n`;
    cartItems.forEach((item, idx) => {
      text += `${item.name || item.title}${idx < cartItems.length - 1 ? ', ' : ''}`;
    });
    text += `\n\nQuantity:\n${totalQuantity}\n\n`;
    text += `Custom Name / Title:\nHandcrafted Selection\n\n`;
    let opts = [];
    cartItems.forEach((item) => {
      if (item.selectedSize) opts.push(`${item.name || item.title}: Size ${item.selectedSize}`);
      if (item.customName) opts.push(`${item.name || item.title}: Custom Name ${item.customName}`);
    });
    text += `Customization:\n${opts.length > 0 ? opts.join(', ') : 'Shopping Bag Order'}\n\n`;
    text += `Order ID:\n${orderId}`;

    setWaOrderText(text);
    setWaModalOpen(true);
  };

  return (
    <div className="cart-drawer-overlay" onClick={onClose}>
      <div className="cart-drawer-content" onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header */}
        <div className="cart-drawer-header">
          <div className="header-title-flex">
            <FaShoppingBag className="header-bag-icon" />
            <h3>Your Shopping Bag ({cartItems.length})</h3>
          </div>
          <button className="close-drawer-btn" onClick={onClose} aria-label="Close cart drawer">
            <FaTimes />
          </button>
        </div>

        {/* Cart Items Scrollable Container */}
        <div className="cart-items-body">
          {cartItems.length === 0 ? (
            <div className="empty-cart-state">
              <FaShoppingBag className="empty-icon" />
              <h4>Your bag is currently empty</h4>
              <p>Explore our bridal bangles, resin art, chocolates, and biscuits to fill it with handmade treasures.</p>
              <button className="btn btn-primary" onClick={onClose} style={{ marginTop: '1.5rem' }}>
                Start Shopping
              </button>
            </div>
          ) : (
            cartItems.map((item, idx) => (
              <div key={`${item.id}-${idx}`} className="cart-item-card">
                {/* Product Thumbnail Box */}
                <div className="cart-thumb-wrap">
                  <img 
                    src={getImageUrl(item.image)} 
                    alt={item.name || item.title} 
                    className="cart-thumb-img"
                    loading="lazy"
                  />
                </div>

                {/* Product Details Column */}
                <div className="cart-item-details">
                  <div className="cart-item-header-row">
                    <h4 className="cart-item-name">{item.name || item.title}</h4>
                    <button 
                      className="remove-item-btn"
                      onClick={() => onRemoveItem(item.id)}
                      title="Remove item"
                      type="button"
                    >
                      <FaTrash />
                    </button>
                  </div>

                  {(item.selectedSize || item.selectedColor || item.customName) && (
                    <div className="cart-item-opts">
                      {item.selectedSize && <span className="meta-pill">Size: {item.selectedSize}</span>}
                      {item.selectedColor && <span className="meta-pill">Theme: {item.selectedColor}</span>}
                      {item.customName && <span className="meta-pill">Name: {item.customName}</span>}
                    </div>
                  )}

                  <div className="cart-item-footer-row">
                    <div className="mini-qty-counter">
                      <button 
                        type="button" 
                        onClick={() => onUpdateQty(item.id, Math.max(1, item.quantity - 1))}
                        aria-label="Decrease quantity"
                      >-</button>
                      <span className="qty-val">{item.quantity}</span>
                      <button 
                        type="button" 
                        onClick={() => onUpdateQty(item.id, item.quantity + 1)}
                        aria-label="Increase quantity"
                      >+</button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Fixed Footer */}
        {cartItems.length > 0 && (
          <div className="cart-drawer-footer">
            <p className="shipping-note">✨ Made to Order. Express dispatch pan-India & global.</p>

            <button
              onClick={handleCheckoutClick}
              className="btn btn-whatsapp w-full"
              style={{ width: '100%', marginTop: '0.85rem', padding: '0.9rem' }}
              type="button"
            >
              <FaWhatsapp /> Order via WhatsApp <FaArrowRight />
            </button>
          </div>
        )}
      </div>

      <WhatsAppModal
        isOpen={waModalOpen}
        onClose={() => setWaModalOpen(false)}
        messageText={waOrderText}
      />

      <style>{`
        .cart-drawer-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(20, 15, 25, 0.65);
          backdrop-filter: blur(6px);
          z-index: 99999;
          display: flex;
          justify-content: flex-end;
          align-items: flex-start;
          animation: fadeIn 0.2s ease-out;
        }

        .cart-drawer-content {
          width: 100%;
          max-width: 440px;
          height: auto;
          max-height: 100vh;
          background: #FFFFFF;
          display: flex;
          flex-direction: column;
          box-shadow: -10px 0 35px rgba(0, 0, 0, 0.2);
          animation: slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          overflow: hidden;
          border-bottom-left-radius: 20px;
        }

        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }

        .cart-drawer-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.25rem 1.5rem;
          border-bottom: 1px solid var(--gold-border);
          background: #FFFDF9;
          flex-shrink: 0;
        }

        .header-title-flex {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }

        .header-bag-icon {
          color: var(--gold-dark);
          font-size: 1.35rem;
        }

        .cart-drawer-header h3 {
          font-family: var(--font-serif);
          font-size: 1.35rem;
          color: var(--text-dark);
          font-weight: 700;
          margin: 0;
        }

        .close-drawer-btn {
          background: rgba(212, 175, 55, 0.12);
          border: none;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          color: var(--text-dark);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .close-drawer-btn:hover {
          background: var(--rose-primary);
          color: #FFFFFF;
        }



        .cart-items-body {
          flex: 0 1 auto;
          max-height: calc(100vh - 240px);
          overflow-y: auto;
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          background: #FFFFFF;
        }

        .empty-cart-state {
          text-align: center;
          padding: 3.5rem 1.5rem;
          margin: 0 auto;
        }

        .empty-icon {
          font-size: 3.5rem;
          color: var(--gold-primary);
          opacity: 0.5;
          margin-bottom: 1rem;
        }

        .empty-cart-state h4 {
          font-size: 1.3rem;
          color: var(--text-dark);
          margin-bottom: 0.5rem;
        }

        .empty-cart-state p {
          font-size: 0.88rem;
          color: var(--text-muted);
        }

        .cart-item-card {
          display: flex;
          align-items: center;
          gap: 0.95rem;
          padding: 0.95rem;
          background: #FFFDF9;
          border: 1.5px solid rgba(212, 175, 55, 0.35);
          border-radius: 16px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
          transition: all 0.2s ease;
          width: 100%;
          box-sizing: border-box;
          margin: 0;
        }

        .cart-item-card:hover {
          border-color: var(--gold-primary);
          box-shadow: 0 6px 16px rgba(212, 175, 55, 0.15);
        }

        .cart-thumb-wrap {
          width: 80px;
          height: 80px;
          min-width: 80px;
          min-height: 80px;
          max-width: 80px;
          max-height: 80px;
          border-radius: 12px;
          overflow: hidden;
          background: #FFFFFF;
          border: 1px solid rgba(212, 175, 55, 0.3);
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        .cart-thumb-img {
          width: 100% !important;
          height: 100% !important;
          max-width: 100% !important;
          max-height: 100% !important;
          object-fit: cover !important;
          object-position: center !important;
          display: block !important;
          margin: 0 !important;
          padding: 0 !important;
          border: none !important;
        }

        .cart-item-details {
          flex: 1 1 auto;
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
        }

        .cart-item-header-row {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 0.5rem;
          width: 100%;
        }

        .cart-item-name {
          font-family: var(--font-serif);
          font-size: 0.98rem;
          font-weight: 700;
          color: var(--text-dark);
          line-height: 1.25;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .remove-item-btn {
          background: transparent;
          border: none;
          color: #E63946;
          font-size: 0.9rem;
          cursor: pointer;
          padding: 0.15rem;
          flex-shrink: 0;
          transition: transform 0.2s ease;
        }

        .remove-item-btn:hover {
          transform: scale(1.18);
        }

        .cart-item-opts {
          display: flex;
          flex-wrap: wrap;
          gap: 0.3rem;
          margin-top: 0.1rem;
        }

        .meta-pill {
          background: rgba(194, 24, 91, 0.08);
          color: var(--rose-primary);
          font-size: 0.73rem;
          font-weight: 600;
          padding: 0.15rem 0.45rem;
          border-radius: 4px;
          border: 1px solid rgba(194, 24, 91, 0.18);
        }

        .cart-item-footer-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 0.4rem;
          gap: 0.5rem;
          width: 100%;
        }

        .cart-item-price {
          font-family: var(--font-serif);
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--rose-dark);
        }

        .mini-qty-counter {
          display: inline-flex;
          align-items: center;
          border: 1px solid rgba(212, 175, 55, 0.4);
          border-radius: 20px;
          background: #FFFFFF;
          overflow: hidden;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
        }

        .mini-qty-counter button {
          border: none;
          background: #FFFDF9;
          width: 26px;
          height: 26px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-dark);
          cursor: pointer;
          transition: background 0.2s ease;
        }

        .mini-qty-counter button:hover {
          background: var(--rose-light);
          color: var(--rose-primary);
        }

        .qty-val {
          padding: 0 0.45rem;
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--text-dark);
          min-width: 20px;
          text-align: center;
        }

        .cart-drawer-footer {
          padding: 1.25rem 1.5rem;
          background: #FFFDF9;
          border-top: 1px solid var(--gold-border);
          flex-shrink: 0;
          box-shadow: 0 -6px 20px rgba(0, 0, 0, 0.03);
        }

        .cart-subtotal-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.25rem;
        }

        .subtotal-label {
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--text-dark);
        }

        .subtotal-val {
          font-family: var(--font-serif);
          font-size: 1.5rem;
          color: var(--rose-dark);
          font-weight: 700;
        }

        .shipping-note {
          font-size: 0.76rem;
          color: var(--text-muted);
        }
      `}</style>
    </div>
  );
};

export default CartDrawer;
