import React, { useState } from 'react';
import { FaWhatsapp, FaPaperPlane, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

const ContactSection = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    category: '',
    eventDate: '',
    message: ''
  });

  const validateForm = () => {
    if (!formData.name.trim() || !formData.phone.trim() || !formData.category || !formData.message.trim()) {
      setFormError('Please complete all required fields (*): Name, WhatsApp Phone, Product Interest, and Message.');
      return false;
    }
    setFormError('');
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({
        name: '',
        phone: '',
        email: '',
        category: '',
        eventDate: '',
        message: ''
      });
    }, 5000);
  };

  const handleWhatsAppSubmit = () => {
    if (!validateForm()) return;

    const formattedMessage = 
      `*New Atelier Inquiry*\n` +
      `👤 *Name:* ${formData.name}\n` +
      `📱 *Phone:* ${formData.phone}\n` +
      `✉️ *Email:* ${formData.email || 'N/A'}\n` +
      `✨ *Product Interest:* ${formData.category}\n` +
      `📅 *Event Date:* ${formData.eventDate || 'N/A'}\n` +
      `📝 *Requirements:* ${formData.message}`;

    const encoded = encodeURIComponent(formattedMessage);
    window.open(`https://wa.me/917981664314?text=${encoded}`, '_blank');
  };

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <div className="section-subtitle">Get In Touch</div>
          <h2 className="section-title">Contact & Atelier Inquiry</h2>
          <p className="section-description">
            Have a question or want to discuss a bespoke bridal set, customized resin art, or corporate hamper order? Send us a message or chat directly on WhatsApp with Divya Yelchuri.
          </p>
        </div>

        <div className="contact-grid">
          {/* Left Column: Form */}
          <div className="contact-form-card glass-card">
            <h3 className="form-card-title">Send an Inquiry</h3>
            <p className="form-card-sub">We usually respond within 1–2 business hours.</p>

            {formError && (
              <div className="form-error-toast" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem',
                padding: '1rem 1.25rem',
                background: '#FFF5F5',
                border: '1px solid #FEB2B2',
                borderRadius: '12px',
                color: '#C53030',
                fontSize: '0.88rem',
                fontWeight: '500',
                marginBottom: '1.5rem'
              }}>
                <FaExclamationCircle style={{ fontSize: '1.2rem', flexShrink: 0 }} />
                <span>{formError}</span>
              </div>
            )}

            {formSubmitted ? (
              <div className="success-toast">
                <FaCheckCircle className="toast-icon" />
                <h4>Inquiry Received!</h4>
                <p>Thank you <strong>{formData.name}</strong>. Divya Yelchuri's team will contact you on WhatsApp or Email shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="inquiry-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="inquiry-name">Full Name *</label>
                    <input 
                      id="inquiry-name"
                      type="text" 
                      required 
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Radhika Sharma" 
                      className="form-input" 
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="inquiry-phone">WhatsApp Phone Number *</label>
                    <input 
                      id="inquiry-phone"
                      type="tel" 
                      required 
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210" 
                      className="form-input" 
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="inquiry-email">Email Address</label>
                    <input 
                      id="inquiry-email"
                      type="email" 
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="radhika@example.com" 
                      className="form-input" 
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="inquiry-category">Product Interest *</label>
                    <select 
                      id="inquiry-category"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="form-input"
                    >
                      <option value="">Select Product Interest</option>
                      <option value="Customized Thread Work">Customized Thread Work Bangles</option>
                      <option value="Customized Resin Art">Customized Resin Art & Preservation Clocks</option>
                      <option value="Customized Homemade Chocolates">Customized Homemade Chocolates</option>
                      <option value="Customized Homemade Biscuits">Customized Gourmet Biscuits</option>
                      <option value="Royal Trousseau Hampers">Royal Trousseau Hampers</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="inquiry-date">Event Date (Optional)</label>
                  <input 
                    id="inquiry-date"
                    type="date" 
                    value={formData.eventDate}
                    onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                    className="form-input" 
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="inquiry-message">Your Message / Customization Requirements *</label>
                  <textarea 
                    id="inquiry-message"
                    rows="5" 
                    required 
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your outfit colors, bangle sizes, quantity, or specific customization questions..." 
                    className="form-input" 
                  ></textarea>
                </div>

                <div className="form-actions-dual">
                  <button type="submit" className="btn-submit-web">
                    <FaPaperPlane style={{ fontSize: '1.05rem' }} /> SUBMIT WEB INQUIRY
                  </button>
                  <button 
                    type="button" 
                    onClick={handleWhatsAppSubmit} 
                    className="btn-submit-wa" 
                  >
                    <FaWhatsapp style={{ fontSize: '1.25rem' }} /> SEND VIA WHATSAPP
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Direct Info Cards & Studio Details */}
          <div className="contact-info-column">
            {/* Quick WhatsApp Box */}
            <div className="quick-wa-card">
              <div className="wa-card-header">
                <FaWhatsapp className="wa-big-icon" />
                <div>
                  <h4 style={{ color: '#FFFFFF', fontSize: '1.25rem' }}>Instant WhatsApp Consultations</h4>
                  <p style={{ color: 'rgba(255,255,255,0.88)', fontSize: '0.85rem' }}>
                    Speak directly with Divya Yelchuri or our dedicated orders team:
                  </p>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginTop: '1rem' }}>
                <a
                  href="https://wa.me/917981664314?text=Hi%20Divya!%20I%20would%20like%20to%20consult%20for%20my%20upcoming%20order."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                  style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                >
                  <FaWhatsapp /> 💬 +91 79816 64314 (Divya Yelchuri)
                </a>
                <a
                  href="https://wa.me/919603551889?text=Hi!%20I%20would%20like%20to%20place%20an%20order."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                  style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                >
                  <FaWhatsapp /> 💬 +91 96035 51889 (Orders & Support)
                </a>
                <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.85)', textAlign: 'center', marginTop: '0.2rem' }}>
                  Available Mon-Sat: 10:00 AM - 7:30 PM IST
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .contact-section {
          padding: 6rem 0;
          background: var(--bg-secondary);
          scroll-margin-top: 90px;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: 1.25fr 0.75fr;
          gap: 2.5rem;
          align-items: start;
        }

        .contact-form-card {
          padding: 3.25rem 3rem;
          background: #FFFFFF;
          border: 1px solid rgba(200, 155, 60, 0.25);
          border-radius: 24px;
          box-shadow: 0 16px 40px rgba(61, 43, 31, 0.08), 0 2px 6px rgba(200, 155, 60, 0.1);
        }

        .form-card-title {
          font-family: var(--font-serif);
          font-size: 2rem;
          font-weight: 700;
          color: #2D2523;
          margin: 0 0 0.35rem 0;
          letter-spacing: 0.01em;
        }

        .form-card-sub {
          font-family: var(--font-sans);
          font-size: 0.9rem;
          color: #7A6962;
          font-weight: 500;
          margin: 0 0 2.25rem 0;
        }

        .inquiry-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
          position: relative;
        }

        .form-group label {
          font-family: var(--font-sans);
          font-size: 0.88rem;
          font-weight: 700;
          color: #3D2B1F;
          letter-spacing: 0.01em;
          margin: 0;
          display: block;
        }

        .form-input {
          height: 52px;
          width: 100%;
          border-radius: 12px;
          border: 1.5px solid rgba(200, 155, 60, 0.25);
          background: #FFFDF9;
          padding: 0 16px;
          font-size: 0.95rem;
          color: #2D2523;
          font-family: var(--font-sans);
          box-sizing: border-box;
          outline: none;
          transition: border-color 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
          appearance: none;
          -webkit-appearance: none;
        }

        select.form-input {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23C89B3C' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 16px center;
          background-size: 16px;
          padding-right: 44px;
          cursor: pointer;
        }

        textarea.form-input {
          height: auto;
          min-height: 140px;
          padding: 16px;
          resize: vertical;
          line-height: 1.55;
        }

        .form-input::placeholder {
          color: #A09088;
          font-weight: 400;
        }

        .form-input:hover {
          border-color: rgba(200, 155, 60, 0.45);
        }

        .form-input:focus {
          border-color: #C89B3C;
          box-shadow: 0 0 0 3.5px rgba(200, 155, 60, 0.18);
          background: #FFFFFF;
        }

        .form-actions-dual {
          display: flex;
          gap: 1.25rem;
          margin-top: 0.5rem;
        }

        .btn-submit-web {
          height: 54px;
          flex: 1;
          background: linear-gradient(135deg, #C89B3C 0%, #B38428 100%);
          color: #FFFFFF;
          border: none;
          border-radius: 14px;
          font-family: var(--font-sans);
          font-size: 0.92rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          cursor: pointer;
          transition: all 0.25s ease;
          box-shadow: 0 6px 20px rgba(200, 155, 60, 0.3);
          box-sizing: border-box;
        }

        .btn-submit-web:hover {
          background: linear-gradient(135deg, #D4AF37 0%, #C89B3C 100%);
          transform: translateY(-2px);
          box-shadow: 0 10px 26px rgba(200, 155, 60, 0.42);
        }

        .btn-submit-wa {
          height: 54px;
          flex: 1;
          background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
          color: #FFFFFF;
          border: none;
          border-radius: 14px;
          font-family: var(--font-sans);
          font-size: 0.92rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          cursor: pointer;
          transition: all 0.25s ease;
          box-shadow: 0 6px 20px rgba(37, 211, 102, 0.3);
          box-sizing: border-box;
        }

        .btn-submit-wa:hover {
          background: linear-gradient(135deg, #28E16F 0%, #1DA851 100%);
          transform: translateY(-2px);
          box-shadow: 0 10px 26px rgba(37, 211, 102, 0.42);
        }

        .success-toast {
          text-align: center;
          padding: 3rem 1.5rem;
          background: #FFFDF8;
          border-radius: 16px;
          border: 1px solid #C89B3C;
        }

        .toast-icon {
          font-size: 3rem;
          color: #25D366;
          margin-bottom: 1rem;
        }

        .quick-wa-card {
          background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
          border-radius: 20px;
          padding: 2rem;
          color: #FFFFFF;
          margin-bottom: 0;
          box-shadow: 0 10px 25px rgba(37, 211, 102, 0.3);
        }

        .wa-card-header {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .wa-big-icon {
          font-size: 2.8rem;
        }

        @media (max-width: 992px) {
          .contact-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
          .contact-form-card {
            padding: 2rem 1.5rem;
          }
          .form-row {
            grid-template-columns: 1fr;
            gap: 1.25rem;
          }
          .form-actions-dual {
            flex-direction: column;
            gap: 0.85rem;
          }
          .btn-submit-web,
          .btn-submit-wa {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
};

export default ContactSection;
