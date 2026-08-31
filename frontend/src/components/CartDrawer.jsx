import React, { useState } from 'react';
import { FaTimes, FaShoppingBag, FaTrash, FaWhatsapp, FaArrowRight, FaUser, FaPhone, FaEnvelope, FaMapMarkerAlt, FaCheckCircle } from 'react-icons/fa';
import WhatsAppModal from './WhatsAppModal';
import { getImageUrl } from '../utils/imageUtils';
import { recordCustomerOrder } from '../services/adminDataStore';

const CartDrawer = ({ isOpen, onClose, cartItems, onUpdateQty, onRemoveItem }) => {
  const [waModalOpen, setWaModalOpen] = useState(false);
  const [waOrderText, setWaOrderText] = useState('');
  const [showCustomerForm, setShowCustomerForm] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    email: '',
    address: ''
  });
  const [formError, setFormError] = useState('');

  if (!isOpen) return null;

  const totalQuantity = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + (Number(item.price || 0) * (item.quantity || 1)), 0);

  const handleCheckoutClick = () => {
    // If customer form is not yet shown, show it to capture name/phone/email
    if (!showCustomerForm) {
      setShowCustomerForm(true);
      return;
    }

    if (!customerInfo.name.trim() || !customerInfo.phone.trim()) {
      setFormError('Please enter your Name and WhatsApp Mobile Number.');
      return;
    }
    setFormError('');

    const randomDigits = Math.floor(100000 + Math.random() * 900000);
    const orderId = `DH-${randomDigits}`;

    // 1. Automatically record Order & Customer into Admin Panel Data Store
    recordCustomerOrder({
      customerName: customerInfo.name.trim(),
      phone: customerInfo.phone.trim(),
      email: customerInfo.email.trim(),
      shippingAddress: customerInfo.address.trim() || 'Direct WhatsApp Dispatch',
      items: cartItems,
      totalAmount: totalPrice,
      orderId
    });

    // 2. Build WhatsApp Message
    let text = `👑 *NEW ORDER – DIYA HANDCRAFTS*\n\n`;
    text += `👤 *Customer Name:* ${customerInfo.name.trim()}\n`;
    text += `📱 *Phone:* ${customerInfo.phone.trim()}\n`;
    if (customerInfo.email.trim()) text += `✉️ *Email:* ${customerInfo.email.trim()}\n`;
    if (customerInfo.address.trim()) text += `📍 *Delivery Address:* ${customerInfo.address.trim()}\n`;
    text += `\n📦 *Order ID:* ${orderId}\n`;
    text += `──────────────\n`;
    text += `🛍️ *Items Ordered (${totalQuantity} items):*\n`;

    cartItems.forEach((item, idx) => {
      text += `\n${idx + 1}. *${item.name || item.title}* (Qty: ${item.quantity || 1})`;
      if (item.price) text += ` - ₹${Number(item.price) * (item.quantity || 1)}`;
      if (item.selectedSize) text += `\n   • Size: ${item.selectedSize}`;
      if (item.selectedColor) text += `\n   • Theme: ${item.selectedColor}`;
      if (item.customName) text += `\n   • Custom Name: "${item.customName}"`;
    });

    if (totalPrice > 0) {
      text += `\n\n💰 *Total Amount:* ₹${totalPrice.toLocaleString()}`;
    }
    text += `\n\n✨ _Please confirm my handcrafted order details & payment link._`;

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
            <>
              {cartItems.map((item, idx) => (
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

                      {item.price > 0 && (
                        <span className="item-price-tag">₹{(Number(item.price) * item.quantity).toLocaleString()}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/* Customer Contact Details Section (Auto-saved to Admin Customers & Orders) */}
              {showCustomerForm && (
                <div className="customer-info-box">
                  <h4 className="customer-box-title">
                    <FaUser style={{ color: '#C79A2B' }} /> Enter Contact Information
                  </h4>
                  <p className="customer-box-desc">
                    Your details will be registered for order tracking and sent directly to our atelier on WhatsApp.
                  </p>

                  {formError && (
                    <div className="form-error-msg">{formError}</div>
                  )}

                  <div className="cart-input-group">
                    <label>Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Priya Sundaram"
                      value={customerInfo.name}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                    />
                  </div>

                  <div className="cart-input-group">
                    <label>WhatsApp Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 98765 43210"
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                    />
                  </div>

                  <div className="cart-input-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      placeholder="e.g. priya@gmail.com"
                      value={customerInfo.email}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                    />
                  </div>

                  <div className="cart-input-group">
                    <label>Delivery City / Address</label>
                    <input
                      type="text"
                      placeholder="e.g. Banjara Hills, Hyderabad"
                      value={customerInfo.address}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                    />
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Drawer Fixed Footer */}
        {cartItems.length > 0 && (
          <div className="cart-drawer-footer">
            {totalPrice > 0 && (
              <div className="cart-total-row">
                <span>Total Amount:</span>
                <span className="total-gold-price">₹{totalPrice.toLocaleString()}</span>
              </div>
            )}

            <p className="shipping-note">✨ Made to Order. Express dispatch pan-India & global.</p>

            <button
              onClick={handleCheckoutClick}
              className="btn btn-whatsapp w-full"
              style={{ width: '100%', marginTop: '0.65rem', padding: '0.9rem' }}
              type="button"
            >
              <FaWhatsapp /> {showCustomerForm ? 'Confirm & Order on WhatsApp' : 'Proceed to WhatsApp Checkout'} <FaArrowRight />
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

        .cart-drawer-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.25rem 1.5rem;
          border-bottom: 1px solid rgba(212, 175, 55, 0.2);
          background: #FFFDF9;
        }

        .header-title-flex {
          display: flex;
          align-items: center;
          gap: 0.65rem;
        }

        .header-bag-icon {
          color: #C79A2B;
          font-size: 1.25rem;
        }

        .cart-drawer-header h3 {
          margin: 0;
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.35rem;
          color: #2D2523;
          font-weight: 700;
        }

        .close-drawer-btn {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #F8F3EC;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #2D2523;
          cursor: pointer;
          transition: background 0.2s;
        }

        .close-drawer-btn:hover {
          background: #E8D8B5;
        }

        .cart-items-body {
          padding: 1.25rem;
          overflow-y: auto;
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          max-height: calc(100vh - 200px);
        }

        .empty-cart-state {
          text-align: center;
          padding: 3rem 1rem;
          color: #7A6B5E;
        }

        .empty-icon {
          font-size: 3rem;
          color: #D4AF37;
          opacity: 0.4;
          margin-bottom: 1rem;
        }

        .cart-item-card {
          display: flex;
          gap: 0.85rem;
          padding: 0.85rem;
          background: #FAF7F2;
          border: 1px solid #E8D8B5;
          border-radius: 12px;
        }

        .cart-thumb-wrap {
          width: 65px;
          height: 65px;
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid #E8D8B5;
          flex-shrink: 0;
        }

        .cart-thumb-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .cart-item-details {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .cart-item-header-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 0.5rem;
        }

        .cart-item-name {
          font-size: 0.92rem;
          font-weight: 700;
          color: #2D2523;
          margin: 0;
          line-height: 1.25;
        }

        .remove-item-btn {
          background: transparent;
          border: none;
          color: #A89F91;
          cursor: pointer;
          font-size: 0.82rem;
          padding: 2px;
        }

        .remove-item-btn:hover {
          color: #C62828;
        }

        .cart-item-opts {
          display: flex;
          gap: 0.35rem;
          flex-wrap: wrap;
          margin: 0.3rem 0;
        }

        .meta-pill {
          font-size: 0.68rem;
          background: #FFFDF9;
          border: 1px solid #E8D8B5;
          color: #C79A2B;
          padding: 1px 6px;
          border-radius: 4px;
          font-weight: 600;
        }

        .cart-item-footer-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 0.4rem;
        }

        .mini-qty-counter {
          display: flex;
          align-items: center;
          border: 1px solid #E8D8B5;
          border-radius: 6px;
          background: #FFFFFF;
        }

        .mini-qty-counter button {
          background: transparent;
          border: none;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-weight: 700;
        }

        .qty-val {
          font-size: 0.8rem;
          font-weight: 700;
          padding: 0 6px;
        }

        .item-price-tag {
          font-size: 0.88rem;
          font-weight: 700;
          color: #C79A2B;
        }

        /* Customer Contact Info Box */
        .customer-info-box {
          background: #FFFDF9;
          border: 1.5px solid #C79A2B;
          border-radius: 12px;
          padding: 1.15rem;
          margin-top: 0.5rem;
          animation: fadeIn 0.25s ease;
        }

        .customer-box-title {
          font-size: 0.95rem;
          font-weight: 700;
          color: #2D2523;
          margin: 0 0 0.25rem 0;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .customer-box-desc {
          font-size: 0.78rem;
          color: #7A6B5E;
          margin: 0 0 0.85rem 0;
          line-height: 1.4;
        }

        .form-error-msg {
          background: #FFEBEE;
          color: #C62828;
          padding: 0.4rem 0.65rem;
          border-radius: 6px;
          font-size: 0.75rem;
          font-weight: 600;
          margin-bottom: 0.75rem;
        }

        .cart-input-group {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          margin-bottom: 0.65rem;
        }

        .cart-input-group label {
          font-size: 0.75rem;
          font-weight: 700;
          color: #2D2523;
        }

        .cart-input-group input {
          padding: 0.5rem 0.75rem;
          border-radius: 6px;
          border: 1px solid #E8D8B5;
          font-size: 0.82rem;
          outline: none;
        }

        .cart-input-group input:focus {
          border-color: #C79A2B;
        }

        .cart-drawer-footer {
          padding: 1.25rem;
          border-top: 1px solid #E8D8B5;
          background: #FFFDF9;
        }

        .cart-total-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 1rem;
          font-weight: 700;
          color: #2D2523;
          margin-bottom: 0.5rem;
        }

        .total-gold-price {
          color: #C79A2B;
          font-size: 1.2rem;
        }

        .shipping-note {
          font-size: 0.75rem;
          color: #7A6B5E;
          margin: 0;
          text-align: center;
        }

        .btn-whatsapp {
          background: #25D366;
          color: #FFFFFF;
          border: none;
          border-radius: 50px;
          font-weight: 700;
          font-size: 0.92rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: background 0.2s, transform 0.2s;
        }

        .btn-whatsapp:hover {
          background: #1EBE5D;
          transform: translateY(-1px);
        }

        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};

export default CartDrawer;
