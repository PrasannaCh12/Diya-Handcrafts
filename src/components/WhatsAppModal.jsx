import React from 'react';
import { FaWhatsapp, FaTimes, FaComments } from 'react-icons/fa';

const WHATSAPP_NUMBERS = [
  {
    display: '+91 79816 64314',
    raw: '917981664314',
    label: 'Divya Yelchuri Studio',
    icon: '📱'
  },
  {
    display: '+91 85550 87143',
    raw: '918555087143',
    label: 'Order & Customization',
    icon: '📱'
  },
  {
    display: '+91 91546 07582',
    raw: '919154607582',
    label: 'DM For Resin Art',
    icon: '🎨'
  }
];

const WhatsAppModal = ({ isOpen, onClose, messageText }) => {
  if (!isOpen) return null;

  const handleSelectNumber = (rawNumber) => {
    const defaultMsg = 'Hi Divya Handcrafts! I am interested in your handcrafted collections.';
    const textToSend = messageText || defaultMsg;
    const url = `https://wa.me/${rawNumber}?text=${encodeURIComponent(textToSend)}`;
    window.open(url, '_blank');
    if (onClose) onClose();
  };

  return (
    <div className="wa-modal-overlay" onClick={onClose}>
      <div className="wa-modal-card glass-card animate-scale-up" onClick={(e) => e.stopPropagation()}>
        {/* Top Close Icon Button */}
        <button className="wa-modal-close-icon" onClick={onClose} aria-label="Close modal">
          <FaTimes />
        </button>

        {/* Header */}
        <div className="wa-modal-header text-center">
          <div className="wa-icon-badge">
            <FaWhatsapp />
          </div>
          <h3 className="wa-gold-title">Choose a WhatsApp Number</h3>
          <p className="wa-sub-text">
            Need assistance or ready to place your order? Select a WhatsApp number below.
          </p>
        </div>

        {/* Number Selection Buttons */}
        <div className="wa-numbers-list">
          {WHATSAPP_NUMBERS.map((num, idx) => (
            <button
              key={idx}
              className="wa-number-choice-btn"
              onClick={() => handleSelectNumber(num.raw)}
              type="button"
            >
              <div className="wa-choice-left">
                <div className="wa-btn-icon">
                  <FaWhatsapp />
                </div>
                <div className="wa-choice-text">
                  <span className="wa-num-digits">📱 {num.display}</span>
                  <span className="wa-num-sub">{num.label}</span>
                </div>
              </div>
              <span className="wa-chat-badge">Start Chat →</span>
            </button>
          ))}
        </div>

        {/* Cancel Button */}
        <div className="wa-modal-footer text-center">
          <button className="wa-cancel-btn" onClick={onClose} type="button">
            Cancel
          </button>
        </div>
      </div>

      <style>{`
        .wa-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(20, 15, 25, 0.65);
          backdrop-filter: blur(8px);
          z-index: 99999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.25rem;
          animation: fadeIn 0.25s ease-out;
        }

        .wa-modal-card {
          width: 100%;
          max-width: 420px;
          background: #FFFFFF;
          border-radius: 20px;
          padding: 2rem 1.75rem 1.5rem;
          position: relative;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.25);
          border: 1px solid var(--gold-border);
          background: linear-gradient(180deg, #FFFFFF 0%, #FFFDF9 100%);
        }

        .wa-modal-close-icon {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: rgba(212, 175, 55, 0.12);
          border: none;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.95rem;
          color: var(--text-dark);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .wa-modal-close-icon:hover {
          background: var(--rose-primary);
          color: #FFFFFF;
        }

        .wa-icon-badge {
          width: 58px;
          height: 58px;
          background: #25D366;
          color: #FFFFFF;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2.1rem;
          margin: 0 auto 0.85rem;
          box-shadow: 0 8px 24px rgba(37, 211, 102, 0.35);
        }

        .wa-gold-title {
          font-family: var(--font-serif);
          font-size: 1.45rem;
          color: var(--gold-dark);
          margin-bottom: 0.4rem;
          font-weight: 700;
        }

        .wa-sub-text {
          font-size: 0.88rem;
          color: var(--text-muted);
          line-height: 1.45;
          margin-bottom: 1.5rem;
          padding: 0 0.5rem;
        }

        .wa-numbers-list {
          display: flex;
          flex-direction: column;
          gap: 0.9rem;
          margin-bottom: 1.25rem;
        }

        .wa-number-choice-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 1.15rem;
          background: #FFFDF9;
          border: 1.5px solid rgba(212, 175, 55, 0.3);
          border-radius: 16px;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          text-align: left;
        }

        .wa-number-choice-btn:hover {
          background: rgba(37, 211, 102, 0.08);
          border-color: #25D366;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(37, 211, 102, 0.22);
        }

        .wa-choice-left {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }

        .wa-btn-icon {
          width: 42px;
          height: 42px;
          background: #25D366;
          color: #FFFFFF;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.35rem;
          flex-shrink: 0;
          box-shadow: 0 4px 12px rgba(37, 211, 102, 0.3);
        }

        .wa-choice-text {
          display: flex;
          flex-direction: column;
        }

        .wa-num-digits {
          font-weight: 700;
          font-size: 1rem;
          color: var(--text-dark);
        }

        .wa-num-sub {
          font-size: 0.8rem;
          color: var(--rose-primary);
          font-weight: 600;
        }

        .wa-chat-badge {
          font-size: 0.8rem;
          font-weight: 700;
          color: #25D366;
          background: rgba(37, 211, 102, 0.12);
          padding: 0.4rem 0.85rem;
          border-radius: 20px;
          transition: all 0.2s ease;
        }

        .wa-number-choice-btn:hover .wa-chat-badge {
          background: #25D366;
          color: #FFFFFF;
        }

        .wa-modal-footer {
          border-top: 1px solid rgba(212, 175, 55, 0.15);
          padding-top: 1rem;
        }

        .wa-cancel-btn {
          background: transparent;
          border: 1px solid rgba(212, 175, 55, 0.4);
          color: var(--text-muted);
          padding: 0.45rem 1.5rem;
          border-radius: 25px;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .wa-cancel-btn:hover {
          background: #F5F0EB;
          color: var(--text-dark);
          border-color: var(--gold-primary);
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .animate-scale-up {
          animation: scaleUp 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        @keyframes scaleUp {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default WhatsAppModal;
