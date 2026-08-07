import React, { useState } from 'react';
import { FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaClock, FaPaperPlane, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

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
            <h3 className="form-card-title">Send An Inquiry</h3>
            <p className="form-card-sub">We usually respond within 1-2 business hours.</p>

            {formError && (
              <div className="form-error-toast" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '0.9rem 1.2rem',
                background: '#FFF5F5',
                border: '1px solid #FEB2B2',
                borderRadius: 'var(--radius-sm)',
                color: '#C53030',
                fontSize: '0.875rem',
                marginBottom: '1.25rem'
              }}>
                <FaExclamationCircle style={{ fontSize: '1.1rem', flexShrink: 0 }} />
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
                    <label>Full Name *</label>
                    <input 
                      type="text" 
                      required 
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Radhika Sharma" 
                      className="form-input" 
                    />
                  </div>

                  <div className="form-group">
                    <label>WhatsApp Phone Number *</label>
                    <input 
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
                    <label>Email Address</label>
                    <input 
                      type="email" 
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="radhika@example.com" 
                      className="form-input" 
                    />
                  </div>

                  <div className="form-group">
                    <label>Product Interest *</label>
                    <select 
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
                  <label>Event Date (Optional)</label>
                  <input 
                    type="date" 
                    value={formData.eventDate}
                    onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                    className="form-input" 
                  />
                </div>

                <div className="form-group">
                  <label>Your Message / Customization Requirement *</label>
                  <textarea 
                    rows="4" 
                    required 
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your outfit colors, bangle sizes, quantity, or specific customization questions..." 
                    className="form-input" 
                  ></textarea>
                </div>

                <div className="form-actions-dual" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <button type="submit" className="btn btn-primary" style={{ flex: '1 1 200px' }}>
                    <FaPaperPlane /> Submit Web Inquiry
                  </button>
                  <button 
                    type="button" 
                    onClick={handleWhatsAppSubmit} 
                    className="btn btn-whatsapp" 
                    style={{ flex: '1 1 200px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                  >
                    <FaWhatsapp style={{ fontSize: '1.2rem' }} /> Send via WhatsApp
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

            {/* Info Cards */}
            <div className="info-cards-stack">
              <div className="info-item-card glass-card">
                <div className="info-icon"><FaMapMarkerAlt /></div>
                <div>
                  <h4>Studio & Atelier</h4>
                  <p>Banjara Hills, Phase 2, Hyderabad, Telangana - 500034</p>
                  <span className="info-sub-tag">Pan-India & Worldwide Express Shipping</span>
                </div>
              </div>

              <div className="info-item-card glass-card">
                <div className="info-icon"><FaEnvelope /></div>
                <div>
                  <h4>Email Us</h4>
                  <p><a href="mailto:orders@divyayelchuri.com" style={{ color: 'inherit', textDecoration: 'none' }}>orders@divyayelchuri.com</a></p>
                  <span className="info-sub-tag">Replies within 24 business hours</span>
                </div>
              </div>

              <div className="info-item-card glass-card">
                <div className="info-icon"><FaClock /></div>
                <div>
                  <h4>Working Hours</h4>
                  <p>Mon - Sat: 10:00 AM - 7:30 PM IST</p>
                  <span className="info-sub-tag">Sunday consultations by appointment</span>
                </div>
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
          grid-template-columns: 1.2fr 0.8fr;
          gap: 3rem;
          align-items: start;
        }

        .contact-form-card {
          padding: 3rem;
          background: #FFFFFF;
          border: 1px solid var(--gold-border);
        }

        .form-card-title {
          font-size: 2rem;
          margin-bottom: 0.25rem;
        }

        .form-card-sub {
          font-size: 0.875rem;
          color: var(--text-muted);
          margin-bottom: 2rem;
        }

        .inquiry-form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.25rem;
        }

        .success-toast {
          text-align: center;
          padding: 3rem 1.5rem;
          background: var(--bg-secondary);
          border-radius: var(--radius-md);
          border: 1px solid var(--gold-primary);
        }

        .toast-icon {
          font-size: 3rem;
          color: #25D366;
          margin-bottom: 1rem;
        }

        .quick-wa-card {
          background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
          border-radius: var(--radius-md);
          padding: 2rem;
          color: #FFFFFF;
          margin-bottom: 1.75rem;
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

        .info-cards-stack {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .info-item-card {
          padding: 1.25rem 1.5rem;
          background: #FFFFFF;
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          border: 1px solid rgba(110, 58, 70, 0.12);
        }

        .info-icon {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: var(--gold-soft-gradient);
          color: var(--gold-dark);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
          flex-shrink: 0;
        }

        .info-item-card h4 {
          font-size: 1.05rem;
          margin-bottom: 0.2rem;
        }

        .info-item-card p {
          font-size: 0.875rem;
          color: var(--text-main);
          margin-bottom: 0.2rem;
        }

        .info-sub-tag {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        @media (max-width: 992px) {
          .contact-grid {
            grid-template-columns: 1fr;
          }
          .contact-form-card {
            padding: 1.75rem;
          }
          .form-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};

export default ContactSection;
