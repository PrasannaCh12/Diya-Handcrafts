import React, { useState } from 'react';
import { FaWhatsapp, FaMagic, FaCheck, FaCalculator, FaUpload, FaArrowRight, FaArrowLeft, FaHeart, FaImage } from 'react-icons/fa';
import WhatsAppModal from './WhatsAppModal';

const CustomOrderBuilder = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [orderType, setOrderType] = useState('');
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);
  const [waOrderText, setWaOrderText] = useState('');
  
  // Form options state
  const [colorTheme, setColorTheme] = useState('Royal Crimson Red & Gold');
  const [wristSize, setWristSize] = useState('2.4 (Standard Medium)');
  const [workType, setWorkType] = useState('Velvet Zardosi + Silk Thread');
  const [addons, setAddons] = useState(['Pearl Cluster Latkans', 'Velvet Storage Trunk']);
  const [eventDate, setEventDate] = useState('');
  const [specialNotes, setSpecialNotes] = useState('');
  
  // Photo upload preview state
  const [photoPreview, setPhotoPreview] = useState(null);
  const [fileName, setFileName] = useState('');

  const handleStepClick = (stepNum) => {
    if (stepNum > 1 && !orderType) {
      alert('Please select a product category to continue.');
      return;
    }
    setCurrentStep(stepNum);
  };

  const handleStep1Next = () => {
    if (!orderType) {
      alert('Please select a product category to continue.');
      return;
    }
    setCurrentStep(2);
  };

  // Toggle addons
  const handleAddonToggle = (item) => {
    if (addons.includes(item)) {
      setAddons(addons.filter((a) => a !== item));
    } else {
      setAddons([...addons, item]);
    }
  };

  // Image Upload Handler
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Base prices & addon prices calculation
  const calculatePrice = () => {
    let base = 3500;
    if (orderType === 'resin-art') base = 2500;
    if (orderType === 'gift-hamper') base = 4500;
    if (orderType === 'chocolates') base = 1400;
    if (orderType === 'biscuits') base = 800;
    if (orderType === 'personalized') base = 1600;

    if (workType.includes('Zardosi')) base += 1000;
    if (workType.includes('Real Flowers')) base += 800;

    const addonPrice = addons.length * 400;
    return base + addonPrice;
  };

  const estimatedPrice = calculatePrice();

  const handleWhatsAppSend = (e) => {
    if (e) e.preventDefault();
    let text = `✨ *New Bespoke Custom Order Inquiry* ✨
--------------------------------
*Product Category:* ${orderType.toUpperCase().replace('-', ' ')}
*Theme / Color Match:* ${colorTheme}
*Size / Measure:* ${wristSize}
*Craftsmanship Choice:* ${workType}
*Add-ons Selected:* ${addons.join(', ') || 'None'}
*Target Event Date:* ${eventDate || 'Not specified'}
*Inspiration Photo Attached:* ${fileName ? `Yes (${fileName})` : 'No'}
*Estimated Quote:* ₹${estimatedPrice.toLocaleString()}

*Special Requests / Notes:*
${specialNotes || 'None'}`;

    text += `\nHi Divya Handcrafts! I built this custom request on your website wizard and would love to place my order!`;

    setWaOrderText(text);
    setShowWhatsAppModal(true);
  };

  return (
    <section id="custom-orders" className="custom-builder-section">
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <div className="section-subtitle">
            <FaMagic /> Co-Create Your Custom Masterpiece
          </div>
          <h2 className="section-title">Step-by-Step Customization Wizard</h2>
          <p className="section-description">
            Personalize your products, upload your inspiration photos, and submit your request directly to Divya Handcrafts.
          </p>
        </div>

        {/* Wizard Card Container */}
        <div className="builder-card glass-card">
          {/* Wizard Step Navigation Indicator */}
          <div className="wizard-progress-bar">
            {[
              { num: 1, title: 'Category' },
              { num: 2, title: 'Personalize' },
              { num: 3, title: 'Inspiration Photo' },
              { num: 4, title: 'Review & Submit' }
            ].map((step) => (
              <div 
                key={step.num}
                className={`wizard-step-node ${currentStep === step.num ? 'active' : ''} ${currentStep > step.num ? 'completed' : ''}`}
                onClick={() => handleStepClick(step.num)}
              >
                <div className="node-circle">{currentStep > step.num ? <FaCheck /> : step.num}</div>
                <span className="node-label">{step.title}</span>
              </div>
            ))}
          </div>

          {/* STEP 1: CATEGORY SELECTOR */}
          {currentStep === 1 && (
            <div className="builder-step animate-fade-in">
              <span className="step-badge">Step 1 of 4</span>
              <h3>Select Product Category</h3>
              <div className="type-options-grid">
                {[
                  { id: 'thread-work', icon: '🧵', title: 'Thread Work', desc: 'Silk velvet, Zardosi, Kundan & Latkans' },
                  { id: 'resin-art', icon: '🎨', title: 'Resin Art Keepsake', desc: 'Preserved Varmala, Wall Clocks & Trays' },
                  { id: 'chocolates', icon: '🍫', title: 'Homemade Chocolates', desc: 'Belgian Dark Truffles & Almond Rochers' },
                  { id: 'biscuits', icon: '🍪', title: 'Homemade Biscuits', desc: 'Pure Ghee Nankhatai & Butter Shortbread' }
                ].map((item) => (
                  <div 
                    key={item.id}
                    className={`type-card ${orderType === item.id ? 'active' : ''}`}
                    onClick={() => setOrderType(item.id)}
                  >
                    <div className="type-icon">{item.icon}</div>
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </div>
                ))}
              </div>
              <div className="wizard-actions">
                <div></div>
                <button 
                  className="btn btn-primary" 
                  onClick={handleStep1Next}
                  disabled={!orderType}
                  style={{
                    opacity: !orderType ? 0.6 : 1,
                    cursor: !orderType ? 'not-allowed' : 'pointer'
                  }}
                >
                  Next Step: Personalize <FaArrowRight />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: CUSTOMIZATION DETAILS */}
          {currentStep === 2 && (
            <div className="builder-step animate-fade-in">
              <span className="step-badge">Step 2 of 4</span>
              <h3>Specify Customization Details</h3>

              <div className="config-fields-grid">
                {/* Theme / Color */}
                <div className="form-group">
                  <label>Outfit / Theme Color Palette:</label>
                  <input 
                    type="text" 
                    value={colorTheme}
                    onChange={(e) => setColorTheme(e.target.value)}
                    placeholder="e.g. Royal Crimson Red & Gold, Pastel Blush Pink" 
                    className="form-input"
                  />
                </div>

                {/* Size / Dimension */}
                <div className="form-group">
                  <label>Size / Measurements:</label>
                  <select 
                    value={wristSize} 
                    onChange={(e) => setWristSize(e.target.value)}
                    className="form-input"
                  >
                    <option value="2.2 (Small Wrist)">2.2 (Small Wrist - 2.125")</option>
                    <option value="2.4 (Standard Medium)">2.4 (Standard Medium - 2.25")</option>
                    <option value="2.6 (Large)">2.6 (Large - 2.375")</option>
                    <option value="2.8 (Extra Large)">2.8 (Extra Large - 2.5")</option>
                    <option value="Custom Measurement">Custom Measure (Send photo measurement)</option>
                  </select>
                </div>

                {/* Work Type */}
                <div className="form-group">
                  <label>Craftsmanship & Finish:</label>
                  <select 
                    value={workType} 
                    onChange={(e) => setWorkType(e.target.value)}
                    className="form-input"
                  >
                    {orderType === 'bridal-bangles' && (
                      <>
                        <option value="Velvet Zardosi + Silk Thread">Velvet Zardosi + Silk Thread</option>
                        <option value="Full Kundan Floral Studded">Full Kundan Floral Studded</option>
                        <option value="Pure Silk Thread Minimalist">Pure Silk Thread Minimalist</option>
                      </>
                    )}
                    {orderType === 'resin-art' && (
                      <>
                        <option value="Clear Resin + Real Flowers + Gold Leaf">Clear Resin + Real Flowers + Gold Leaf</option>
                        <option value="Geode Ocean Crystal Gold Foil">Geode Ocean Crystal Gold Foil</option>
                        <option value="Personalized Photo & Name Inscription">Personalized Photo & Name Inscription</option>
                      </>
                    )}
                    {orderType === 'gift-hamper' && (
                      <>
                        <option value="Velvet Wooden Trunk + Chocolates + Bangles">Velvet Wooden Trunk + Chocolates + Bangles</option>
                        <option value="Floral Basket + Resin Tray + Cookies">Floral Basket + Resin Tray + Cookies</option>
                      </>
                    )}
                    {(orderType === 'chocolates' || orderType === 'biscuits' || orderType === 'personalized') && (
                      <>
                        <option value="Signature Handmade Gourmet Recipe">Signature Handmade Gourmet Recipe</option>
                        <option value="Sugar Free Honey Sweetened">Sugar Free Honey Sweetened</option>
                        <option value="Custom Gold Calligraphy Engraving">Custom Gold Calligraphy Engraving</option>
                      </>
                    )}
                  </select>
                </div>

                {/* Needed By Date */}
                <div className="form-group">
                  <label>Target Event / Needed By Date:</label>
                  <input 
                    type="date" 
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="form-input"
                  />
                </div>
              </div>

              {/* Addons Selection */}
              <div className="form-group" style={{ marginTop: '1.5rem' }}>
                <label>Select Optional Luxury Add-ons:</label>
                <div className="addons-checkboxes">
                  {[
                    'Pearl Cluster Latkans (+₹400)',
                    'Velvet Storage Trunk (+₹400)',
                    '24k Edible Gold Leafing (+₹400)',
                    'Handwritten Calligraphy Card (+₹400)'
                  ].map((addonLabel) => {
                    const rawName = addonLabel.split(' (')[0];
                    const isChecked = addons.includes(rawName);
                    return (
                      <div 
                        key={rawName}
                        className={`addon-pill ${isChecked ? 'active' : ''}`}
                        onClick={() => handleAddonToggle(rawName)}
                      >
                        <FaCheck className={`check-icon ${isChecked ? 'visible' : ''}`} />
                        <span>{addonLabel}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="wizard-actions">
                <button className="btn btn-secondary" onClick={() => setCurrentStep(1)}>
                  <FaArrowLeft /> Back
                </button>
                <button className="btn btn-primary" onClick={() => setCurrentStep(3)}>
                  Next Step: Upload Photo <FaArrowRight />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: INSPIRATION PHOTO UPLOAD */}
          {currentStep === 3 && (
            <div className="builder-step animate-fade-in">
              <span className="step-badge">Step 3 of 4</span>
              <h3>Upload Inspiration Photo or Outfit Match</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                Upload a photo of your wedding lehenga/saree, room decor, or reference image so Divya can perfectly match your design!
              </p>

              <div className="upload-dropzone">
                <input 
                  type="file" 
                  accept="image/*" 
                  id="photo-upload-input"
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                />
                <label htmlFor="photo-upload-input" className="upload-drop-label">
                  {photoPreview ? (
                    <div className="preview-container">
                      <img src={photoPreview} alt="Inspiration Preview" className="preview-img" />
                      <p className="preview-filename">Attached File: <strong>{fileName}</strong> (Click to Change)</p>
                    </div>
                  ) : (
                    <div className="upload-placeholder">
                      <FaUpload className="upload-icon" />
                      <h4>Click to Upload Inspiration Photo</h4>
                      <p>Supports JPG, PNG, WEBP (Max 10MB)</p>
                    </div>
                  )}
                </label>
              </div>

              {/* Special Instructions */}
              <div className="form-group" style={{ marginTop: '1.5rem' }}>
                <label>Additional Notes / Custom Instructions:</label>
                <textarea 
                  rows="3"
                  value={specialNotes}
                  onChange={(e) => setSpecialNotes(e.target.value)}
                  placeholder="Mention bride & groom names, specific quotes, or preservation details..."
                  className="form-input"
                ></textarea>
              </div>

              <div className="wizard-actions">
                <button className="btn btn-secondary" onClick={() => setCurrentStep(2)}>
                  <FaArrowLeft /> Back
                </button>
                <button className="btn btn-primary" onClick={() => setCurrentStep(4)}>
                  Review Summary & Quote <FaArrowRight />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: REVIEW & SUBMIT REQUEST */}
          {currentStep === 4 && (
            <div className="builder-step animate-fade-in">
              <span className="step-badge">Step 4 of 4</span>
              <h3>Review & Submit Your Request</h3>

              <div className="summary-details-box">
                <div className="summary-grid">
                  <div><strong>Product Category:</strong> {orderType.toUpperCase().replace('-', ' ')}</div>
                  <div><strong>Color Palette:</strong> {colorTheme}</div>
                  <div><strong>Size / Dimensions:</strong> {wristSize}</div>
                  <div><strong>Craftsmanship Style:</strong> {workType}</div>
                  <div><strong>Add-ons:</strong> {addons.join(', ') || 'None'}</div>
                  <div><strong>Needed By:</strong> {eventDate || 'Asap'}</div>
                  <div><strong>Photo Attached:</strong> {fileName ? fileName : 'None'}</div>
                </div>

                {photoPreview && (
                  <div className="summary-photo-preview" style={{ marginTop: '1rem' }}>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Attached Photo Preview:</p>
                    <img src={photoPreview} alt="Attached Preview" style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px', border: '1px solid var(--gold-primary)', marginTop: '0.25rem' }} />
                  </div>
                )}
              </div>

              {/* Quote & Submit Bar */}
              <div className="builder-summary-box">
                <div className="quote-left">
                  <div className="quote-label">
                    <FaCalculator /> Estimated Custom Quote:
                  </div>
                  <div className="quote-amount">
                    ₹{estimatedPrice.toLocaleString()} <span className="tax-tag">(Inc. Handcrafting & Packaging)</span>
                  </div>
                </div>

                <button onClick={handleWhatsAppSend} className="btn btn-whatsapp btn-lg">
                  <FaWhatsapp style={{ fontSize: '1.3rem' }} /> Submit Request via WhatsApp
                </button>
              </div>

              <div className="wizard-actions" style={{ marginTop: '1.5rem' }}>
                <button className="btn btn-secondary" onClick={() => setCurrentStep(3)}>
                  <FaArrowLeft /> Back to Photo Upload
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <WhatsAppModal
        isOpen={showWhatsAppModal}
        onClose={() => setShowWhatsAppModal(false)}
        messageText={waOrderText}
      />

      <style>{`
        .custom-builder-section {
          padding: 6rem 0;
          background: #FFFFFF;
        }

        .builder-card {
          padding: 3rem;
          background: var(--bg-primary);
          border: 1px solid var(--gold-border);
          box-shadow: var(--shadow-lg);
          border-radius: var(--radius-lg);
        }

        .wizard-progress-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
          margin-bottom: 3rem;
          padding: 0 1rem;
        }

        .wizard-progress-bar::before {
          content: '';
          position: absolute;
          top: 20px;
          left: 10%;
          right: 10%;
          height: 3px;
          background: rgba(110, 58, 70, 0.15);
          z-index: 1;
        }

        .wizard-step-node {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.4rem;
          cursor: pointer;
        }

        .node-circle {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: #FFFFFF;
          border: 2px solid rgba(110, 58, 70, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 0.95rem;
          color: var(--text-muted);
          transition: var(--transition-smooth);
        }

        .wizard-step-node.active .node-circle {
          background: var(--gold-gradient);
          color: #FFFFFF;
          border-color: transparent;
          box-shadow: var(--shadow-gold);
        }

        .wizard-step-node.completed .node-circle {
          background: var(--rose-primary);
          color: #FFFFFF;
          border-color: transparent;
        }

        .node-label {
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-muted);
        }

        .wizard-step-node.active .node-label {
          color: var(--rose-dark);
          font-weight: 700;
        }

        .step-badge {
          display: inline-block;
          background: var(--gold-soft-gradient);
          color: var(--gold-dark);
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          padding: 0.25rem 0.85rem;
          border-radius: var(--radius-full);
          margin-bottom: 0.5rem;
        }

        .builder-step h3 {
          font-size: 1.6rem;
          margin-bottom: 1.25rem;
        }

        .type-options-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.25rem;
        }

        .type-card {
          background: #FFFFFF;
          border: 2px solid rgba(110, 58, 70, 0.15);
          border-radius: var(--radius-md);
          padding: 1.5rem;
          cursor: pointer;
          transition: var(--transition-smooth);
        }

        .type-card:hover {
          border-color: var(--gold-primary);
        }

        .type-card.active {
          border-color: var(--gold-primary);
          background: var(--bg-secondary);
          box-shadow: var(--shadow-sm);
        }

        .type-icon {
          font-size: 2rem;
          margin-bottom: 0.5rem;
        }

        .type-card h4 {
          font-size: 1.2rem;
          color: var(--text-main);
          margin-bottom: 0.25rem;
        }

        .type-card p {
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        .config-fields-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.25rem;
        }

        .form-group label {
          display: block;
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-main);
          margin-bottom: 0.4rem;
        }

        .form-input {
          width: 100%;
          padding: 0.75rem 1rem;
          border-radius: var(--radius-sm);
          border: 1px solid rgba(110, 58, 70, 0.2);
          font-family: var(--font-sans);
          font-size: 0.9rem;
          outline: none;
          background: #FFFFFF;
          transition: border-color 0.2s;
        }

        .form-input:focus {
          border-color: var(--gold-primary);
        }

        .addons-checkboxes {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
        }

        .addon-pill {
          background: #FFFFFF;
          border: 1px solid rgba(110, 58, 70, 0.2);
          padding: 0.5rem 1rem;
          border-radius: var(--radius-full);
          font-size: 0.85rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.2s;
        }

        .addon-pill.active {
          background: var(--gold-soft-gradient);
          border-color: var(--gold-primary);
          color: var(--gold-dark);
          font-weight: 600;
        }

        .check-icon {
          font-size: 0.75rem;
          opacity: 0;
        }

        .check-icon.visible {
          opacity: 1;
        }

        .upload-dropzone {
          border: 2px dashed var(--gold-primary);
          border-radius: var(--radius-md);
          padding: 2.5rem;
          text-align: center;
          background: #FFFFFF;
          cursor: pointer;
          transition: var(--transition-smooth);
        }

        .upload-dropzone:hover {
          background: var(--bg-secondary);
        }

        .upload-icon {
          font-size: 2.5rem;
          color: var(--gold-dark);
          margin-bottom: 0.75rem;
        }

        .preview-img {
          max-width: 220px;
          max-height: 220px;
          border-radius: var(--radius-sm);
          object-fit: cover;
          border: 2px solid var(--gold-primary);
          margin-bottom: 0.75rem;
        }

        .summary-details-box {
          background: #FFFFFF;
          padding: 1.5rem;
          border-radius: var(--radius-md);
          border: 1px solid var(--gold-border);
          margin-bottom: 2rem;
        }

        .summary-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.85rem;
          font-size: 0.9rem;
        }

        .wizard-actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 2.5rem;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(110, 58, 70, 0.1);
        }

        .builder-summary-box {
          margin-top: 1.5rem;
          padding: 1.75rem 2rem;
          background: var(--rose-dark);
          color: #FFFFFF;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
          flex-wrap: wrap;
        }

        .quote-label {
          font-size: 0.9rem;
          color: var(--gold-light);
          display: flex;
          align-items: center;
          gap: 0.5rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .quote-amount {
          font-family: var(--font-serif);
          font-size: 2.2rem;
          font-weight: 700;
          color: #FFFFFF;
        }

        .tax-tag {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.7);
          font-family: var(--font-sans);
          font-weight: 400;
        }

        @media (max-width: 768px) {
          .builder-card {
            padding: 1.5rem;
          }
          .config-fields-grid, .summary-grid {
            grid-template-columns: 1fr;
          }
          .node-label {
            display: none;
          }
          .builder-summary-box {
            flex-direction: column;
            align-items: stretch;
            text-align: center;
          }
        }
      `}</style>
    </section>
  );
};

export default CustomOrderBuilder;
