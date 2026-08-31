import React, { useState } from 'react';
import { FaWhatsapp, FaTimes, FaMagic } from 'react-icons/fa';
import WhatsAppModal from './WhatsAppModal';

const WhatsAppButton = () => {
  const [showTooltip, setShowTooltip] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="floating-wa-container">
        {showTooltip && (
          <div className="wa-tooltip-bubble glass-card">
            <button className="close-bubble" onClick={() => setShowTooltip(false)}>
              <FaTimes />
            </button>

            <div className="bubble-header">
              <FaMagic style={{ color: '#D4AF37' }} />
              <span>Divya Yelchuri Studio</span>
            </div>
            <p className="bubble-text">
              Hi there! Need help customizing your bridal bangles, resin art, or biscuits? Chat with us live!
            </p>
            <button
              onClick={() => setModalOpen(true)}
              className="bubble-action-btn"
              type="button"
            >
              Start WhatsApp Chat
            </button>
          </div>
        )}

        <button
          onClick={() => setModalOpen(true)}
          className="wa-floating-btn"
          aria-label="Choose WhatsApp Contact Number"
          type="button"
        >
          <FaWhatsapp />
          <span className="wa-pulse"></span>
        </button>
      </div>

      {/* WhatsApp Choice Popup */}
      <WhatsAppModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        messageText="Hi Divya Handcrafts! I would like to inquire about your handmade collections."
      />

      <style>{`
        .floating-wa-container {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          z-index: 998;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }

        .wa-tooltip-bubble {
          margin-bottom: 1rem;
          padding: 1.25rem;
          max-width: 280px;
          position: relative;
          box-shadow: var(--shadow-lg);
          border-radius: var(--radius-md);
          background: #FFFFFF;
          border: 1px solid var(--gold-border);
          animation: bounce 2s infinite;
        }

        .close-bubble {
          position: absolute;
          top: 0.5rem;
          right: 0.5rem;
          background: transparent;
          border: none;
          color: var(--text-muted);
          font-size: 0.85rem;
          cursor: pointer;
        }

        .bubble-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 700;
          font-size: 0.9rem;
          margin-bottom: 0.4rem;
          color: var(--rose-primary);
        }

        .bubble-text {
          font-size: 0.8rem;
          color: var(--text-main);
          line-height: 1.4;
          margin-bottom: 0.75rem;
        }

        .bubble-action-btn {
          display: block;
          width: 100%;
          text-align: center;
          background: #25D366;
          color: #FFFFFF;
          font-weight: 600;
          font-size: 0.8rem;
          padding: 0.5rem;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          transition: var(--transition-fast);
        }

        .bubble-action-btn:hover {
          background: #1EBE57;
          transform: scale(1.02);
        }

        .wa-floating-btn {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: #25D366;
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2.2rem;
          border: none;
          box-shadow: 0 8px 25px rgba(37, 211, 102, 0.4);
          position: relative;
          cursor: pointer;
          transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .wa-floating-btn:hover {
          transform: scale(1.1);
        }

        .wa-pulse {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: #25D366;
          opacity: 0.6;
          z-index: -1;
          animation: waPulse 2s infinite;
        }

        @keyframes waPulse {
          0% {
            transform: scale(1);
            opacity: 0.6;
          }
          100% {
            transform: scale(1.6);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
};

export default WhatsAppButton;
