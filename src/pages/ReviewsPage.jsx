import React, { useState, useEffect, useRef } from 'react';
import {
  FaStar,
  FaQuoteLeft,
  FaHeart,
  FaCheckCircle,
  FaPaperPlane,
  FaUpload,
  FaImage,
  FaTimes,
  FaEye,
  FaShieldAlt,
  FaClock
} from 'react-icons/fa';
import { getApprovedReviews, submitCustomerReview } from '../data/reviewsData';

const ReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef(null);

  const [newReview, setNewReview] = useState({
    name: '',
    city: '',
    rating: 5,
    category: 'Bridal Bangles',
    comment: '',
    photo: ''
  });

  const loadReviews = () => {
    setReviews(getApprovedReviews());
  };

  useEffect(() => {
    loadReviews();
    window.addEventListener('reviews-updated', loadReviews);
    window.addEventListener('storage', loadReviews);
    return () => {
      window.removeEventListener('reviews-updated', loadReviews);
      window.removeEventListener('storage', loadReviews);
    };
  }, []);

  // Handle Photo selection from customer
  const handlePhotoSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file (JPG, PNG, WEBP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        // Create 500x500 square canvas
        const canvas = document.createElement('canvas');
        canvas.width = 500;
        canvas.height = 500;
        const ctx = canvas.getContext('2d');

        const minDim = Math.min(img.width, img.height);
        const startX = (img.width - minDim) / 2;
        const startY = (img.height - minDim) / 2;

        ctx.drawImage(img, startX, startY, minDim, minDim, 0, 0, 500, 500);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);

        setPhotoPreview(dataUrl);
        setNewReview((prev) => ({ ...prev, photo: dataUrl }));
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    setPhotoPreview('');
    setNewReview((prev) => ({ ...prev, photo: '' }));
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newReview.name || !newReview.comment) return;

    // Submits review to storage with PENDING status (Strictly requiring admin approval)
    submitCustomerReview({
      name: newReview.name,
      city: newReview.city || 'India',
      rating: Number(newReview.rating),
      category: newReview.category,
      comment: newReview.comment,
      photo: newReview.photo || ''
    });

    setSubmitted(true);
    setPhotoPreview('');
    setNewReview({
      name: '',
      city: '',
      rating: 5,
      category: 'Bridal Bangles',
      comment: '',
      photo: ''
    });
  };

  // Calculate Average Rating
  const avgRating = reviews.length > 0
    ? (reviews.reduce((acc, r) => acc + Number(r.rating || 5), 0) / reviews.length).toFixed(1)
    : '5.0';

  return (
    <div className="reviews-page">
      {/* Header */}
      <section className="reviews-hero">
        <div className="container">
          <span className="reviews-badge">AUTHENTIC ARTISAN FEEDBACK</span>
          <h1 className="reviews-title">Customer Reviews</h1>
          <p className="reviews-subtitle">
            Read real stories from our brides, families, and gift connoisseurs. Every review is verified by our master artisans.
          </p>

          {/* Rating Summary Card */}
          <div className="rating-overview-card">
            <div className="rating-score-box">
              <span className="score-num">{avgRating}</span>
              <div className="score-stars">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} style={{ color: '#D4AF37' }} />
                ))}
              </div>
              <span className="score-text">Based on {reviews.length}+ Verified Customer Reviews</span>
            </div>

            <div className="rating-metrics">
              <div className="metric-row">
                <span>Handcraft Quality</span>
                <div className="metric-bar"><div className="metric-fill" style={{ width: '99%' }}></div></div>
                <span>99%</span>
              </div>
              <div className="metric-row">
                <span>Color & Design Accuracy</span>
                <div className="metric-bar"><div className="metric-fill" style={{ width: '98%' }}></div></div>
                <span>98%</span>
              </div>
              <div className="metric-row">
                <span>Packaging & Safe Delivery</span>
                <div className="metric-bar"><div className="metric-fill" style={{ width: '97%' }}></div></div>
                <span>97%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Content Grid */}
      <section className="reviews-content-section">
        <div className="container">
          <div className="reviews-layout">
            {/* Approved Reviews List */}
            <div className="reviews-list-col">
              <div className="reviews-list-header">
                <h2 className="section-heading">Verified Customer Experiences</h2>
                <span className="reviews-count-badge">{reviews.length} Published Reviews</span>
              </div>

              {reviews.length === 0 ? (
                <div className="empty-reviews-state">
                  <p>No verified customer reviews published yet. Be the first to share your experience!</p>
                </div>
              ) : (
                <div className="reviews-grid">
                  {reviews.map((rev) => (
                    <div key={rev.id} className="review-card">
                      <div className="review-card-top">
                        <div className="reviewer-info">
                          <div className="reviewer-avatar">
                            {rev.name ? rev.name.charAt(0).toUpperCase() : 'C'}
                          </div>
                          <div>
                            <h4 className="reviewer-name">{rev.name}</h4>
                            <span className="reviewer-meta">{rev.city || 'India'} • {rev.date}</span>
                          </div>
                        </div>

                        <div className="star-rating">
                          {[...Array(rev.rating || 5)].map((_, idx) => (
                            <FaStar key={idx} style={{ color: '#D4AF37' }} />
                          ))}
                        </div>
                      </div>

                      <div className="review-category-badge">
                        <span>Ordered: <strong>{rev.category}</strong></span>
                        {rev.verified && (
                          <span className="verified-badge"><FaCheckCircle /> Verified Buyer</span>
                        )}
                      </div>

                      <p className="review-comment">
                        <FaQuoteLeft className="quote-icon" /> {rev.comment}
                      </p>

                      {/* Customer Attached Photo */}
                      {rev.photo && (
                        <div className="review-photo-container">
                          <div
                            className="review-photo-thumb"
                            onClick={() => setSelectedPhoto(rev.photo)}
                          >
                            <img src={rev.photo} alt={`Craft received by ${rev.name}`} />
                            <span className="thumb-zoom-badge"><FaEye /> Zoom</span>
                          </div>
                          <span className="customer-photo-tag">📸 Photo shared by {rev.name.split(' ')[0]}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Customer Review Form */}
            <div className="submit-review-col">
              <div className="submit-card">
                <h3>Share Your Experience</h3>
                <p>Loved your handmade order or customized hampers? Share your thoughts and photos with us!</p>

                {submitted ? (
                  <div className="submit-moderation-success">
                    <div className="moderation-icon-box">
                      <FaClock />
                    </div>
                    <h4>Review Submitted for Verification</h4>
                    <p>
                      Thank you so much! To ensure genuine, high-quality feedback, our artisan team reviews all submissions before they go live on the website.
                    </p>
                    <button
                      className="btn btn-secondary"
                      style={{ marginTop: '1rem', width: '100%' }}
                      onClick={() => setSubmitted(false)}
                    >
                      Submit Another Review
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="review-form">
                    <div className="form-group">
                      <label>Your Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Sravani Rao"
                        value={newReview.name}
                        onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label>City & State</label>
                      <input
                        type="text"
                        placeholder="e.g. Hyderabad, TS"
                        value={newReview.city}
                        onChange={(e) => setNewReview({ ...newReview, city: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label>Product Category Ordered *</label>
                      <select
                        value={newReview.category}
                        onChange={(e) => setNewReview({ ...newReview, category: e.target.value })}
                      >
                        <option value="Bridal Bangles">Bridal Bangles & Thread Work</option>
                        <option value="Resin Art">Resin Keepsakes & Wall Clocks</option>
                        <option value="Handmade Chocolates">Handmade Belgian Chocolates</option>
                        <option value="Customized Chains">Customized Name Chains</option>
                        <option value="Wedding Items">Wedding & Marriage Items</option>
                        <option value="Biscuits">Pure Ghee Biscuits</option>
                        <option value="Customized Gifts">Customized Gifts & Hampers</option>
                        <option value="Customized Dolls">Customized Dolls</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Your Rating *</label>
                      <select
                        value={newReview.rating}
                        onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}
                      >
                        <option value="5">⭐⭐⭐⭐⭐ 5 Stars (Exceptional Experience)</option>
                        <option value="4">⭐⭐⭐⭐ 4 Stars (Very Good)</option>
                        <option value="3">⭐⭐⭐ 3 Stars (Good)</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Attach Picture of Your Craft (Optional)</label>
                      <div className="photo-upload-container">
                        {photoPreview ? (
                          <div className="photo-preview-item">
                            <img src={photoPreview} alt="Customer Upload" />
                            <button
                              type="button"
                              className="remove-photo-btn"
                              onClick={handleRemovePhoto}
                              title="Remove photo"
                            >
                              <FaTimes />
                            </button>
                          </div>
                        ) : (
                          <div
                            className="photo-dropzone"
                            onClick={() => fileInputRef.current && fileInputRef.current.click()}
                          >
                            <FaUpload className="upload-icon" />
                            <span>Click to Choose Photo</span>
                            <span className="upload-hint">Upload a picture of your finished craft / gift</span>
                            <input
                              type="file"
                              ref={fileInputRef}
                              accept="image/*"
                              style={{ display: 'none' }}
                              onChange={handlePhotoSelect}
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Your Feedback / Story *</label>
                      <textarea
                        required
                        rows="4"
                        placeholder="Tell us about the craftsmanship, finish, customization details, and how you liked it..."
                        value={newReview.comment}
                        onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                      ></textarea>
                    </div>

                    <div className="moderation-notice">
                      <FaShieldAlt style={{ color: '#C79A2B', flexShrink: 0 }} />
                      <span>Reviews are verified by our admin team before appearing live.</span>
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                      <FaPaperPlane /> Submit for Verification
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Zoom Modal */}
      {selectedPhoto && (
        <div className="photo-lightbox-overlay" onClick={() => setSelectedPhoto(null)}>
          <div className="photo-lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="photo-lightbox-close" onClick={() => setSelectedPhoto(null)} title="Close">
              <FaTimes />
            </button>
            <img src={selectedPhoto} alt="Customer Review Zoom" className="zoom-full-img" />
          </div>
        </div>
      )}

      <style>{`
        .reviews-page {
          padding-top: 1.5rem;
          padding-bottom: 5rem;
          background: #FDFBF7;
          min-height: 100vh;
        }

        .reviews-hero {
          text-align: center;
          padding: 3rem 1rem 2rem;
          max-width: 900px;
          margin: 0 auto;
        }

        .reviews-badge {
          display: inline-block;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          color: #C79A2B;
          background: rgba(199, 154, 43, 0.12);
          padding: 0.35rem 1rem;
          border-radius: 50px;
          margin-bottom: 0.75rem;
        }

        .reviews-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 2.8rem;
          font-weight: 700;
          color: #3E2C1C;
          margin-bottom: 0.75rem;
        }

        .reviews-subtitle {
          color: #6C584C;
          font-size: 1.05rem;
          line-height: 1.6;
          margin-bottom: 2.5rem;
        }

        .rating-overview-card {
          background: #FFFFFF;
          border: 1px solid #E8D8B5;
          border-radius: 20px;
          padding: 2rem;
          box-shadow: 0 8px 30px rgba(199, 154, 43, 0.08);
          display: flex;
          align-items: center;
          justify-content: space-around;
          gap: 2rem;
          flex-wrap: wrap;
          text-align: left;
        }

        .rating-score-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding-right: 2rem;
          border-right: 1px solid #F0E6D2;
        }

        .score-num {
          font-size: 3.2rem;
          font-weight: 800;
          color: #3E2C1C;
          line-height: 1;
        }

        .score-stars {
          display: flex;
          gap: 4px;
          margin: 0.4rem 0;
          font-size: 1.2rem;
        }

        .score-text {
          font-size: 0.8rem;
          color: #8C7A6B;
          font-weight: 600;
        }

        .rating-metrics {
          flex: 1;
          min-width: 260px;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .metric-row {
          display: flex;
          align-items: center;
          gap: 1rem;
          font-size: 0.85rem;
          font-weight: 600;
          color: #3E2C1C;
        }

        .metric-row span:first-child {
          width: 170px;
        }

        .metric-bar {
          flex: 1;
          height: 8px;
          background: #F0E6D2;
          border-radius: 10px;
          overflow: hidden;
        }

        .metric-fill {
          height: 100%;
          background: linear-gradient(90deg, #C79A2B 0%, #D4AF37 100%);
          border-radius: 10px;
        }

        .reviews-content-section {
          padding: 2rem 0;
        }

        .reviews-layout {
          display: grid;
          grid-template-columns: 1.55fr 1fr;
          gap: 2.5rem;
        }

        .reviews-list-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .section-heading {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.8rem;
          color: #3E2C1C;
          margin: 0;
        }

        .reviews-count-badge {
          background: #FAF5EF;
          border: 1px solid #E8D8B5;
          color: #8C7A6B;
          font-size: 0.8rem;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 20px;
        }

        .reviews-grid {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .review-card {
          background: #FFFFFF;
          border-radius: 16px;
          border: 1px solid #E8D8B5;
          padding: 1.5rem;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.04);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .review-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(199, 154, 43, 0.12);
        }

        .review-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.85rem;
        }

        .reviewer-info {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .reviewer-avatar {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: #3E2C1C;
          color: #D4AF37;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 1.1rem;
        }

        .reviewer-name {
          font-size: 1rem;
          font-weight: 700;
          color: #3E2C1C;
          margin: 0;
        }

        .reviewer-meta {
          font-size: 0.75rem;
          color: #8C7A6B;
        }

        .review-category-badge {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.75rem;
          color: #C79A2B;
          font-weight: 600;
          margin-bottom: 0.85rem;
          flex-wrap: wrap;
        }

        .verified-badge {
          color: #2E7D32;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: rgba(46, 125, 50, 0.08);
          padding: 2px 8px;
          border-radius: 12px;
          font-size: 0.72rem;
        }

        .review-comment {
          color: #554236;
          font-size: 0.92rem;
          line-height: 1.6;
          position: relative;
          margin-bottom: 1rem;
        }

        .quote-icon {
          color: #E8D8B5;
          font-size: 0.85rem;
          margin-right: 0.35rem;
        }

        /* Review Photo Attachment */
        .review-photo-container {
          display: flex;
          align-items: center;
          gap: 1rem;
          background: #FAF7F2;
          border: 1px solid #E8D8B5;
          border-radius: 12px;
          padding: 0.6rem 0.85rem;
          width: fit-content;
        }

        .review-photo-thumb {
          position: relative;
          width: 68px;
          height: 68px;
          border-radius: 8px;
          overflow: hidden;
          cursor: pointer;
          border: 2px solid #C79A2B;
        }

        .review-photo-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .thumb-zoom-badge {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.55);
          color: #FFFFFF;
          font-size: 0.65rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 3px;
          opacity: 0;
          transition: opacity 0.2s;
        }

        .review-photo-thumb:hover .thumb-zoom-badge {
          opacity: 1;
        }

        .customer-photo-tag {
          font-size: 0.78rem;
          font-weight: 600;
          color: #3E2C1C;
        }

        /* Submit Form Card */
        .submit-card {
          background: #FFFFFF;
          border-radius: 20px;
          border: 1px solid #E8D8B5;
          padding: 2rem;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.06);
          position: sticky;
          top: 100px;
        }

        .submit-card h3 {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.6rem;
          color: #3E2C1C;
          margin-bottom: 0.35rem;
        }

        .submit-card p {
          color: #8C7A6B;
          font-size: 0.85rem;
          margin-bottom: 1.25rem;
        }

        .review-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
          text-align: left;
        }

        .form-group label {
          font-size: 0.8rem;
          font-weight: 700;
          color: #3E2C1C;
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          padding: 0.7rem 0.9rem;
          border-radius: 8px;
          border: 1px solid #E8D8B5;
          font-family: var(--font-sans, inherit);
          font-size: 0.88rem;
          outline: none;
          transition: border-color 0.2s;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          border-color: #C79A2B;
        }

        .photo-dropzone {
          border: 2px dashed #C79A2B;
          border-radius: 10px;
          padding: 1rem;
          background: #FAF7F2;
          text-align: center;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.85rem;
          font-weight: 600;
          color: #3E2C1C;
          transition: background 0.2s;
        }

        .photo-dropzone:hover {
          background: #F3EBDD;
        }

        .upload-icon {
          font-size: 1.3rem;
          color: #C79A2B;
        }

        .upload-hint {
          font-size: 0.7rem;
          color: #8C7A6B;
          font-weight: normal;
        }

        .photo-preview-item {
          position: relative;
          width: 90px;
          height: 90px;
          border-radius: 10px;
          overflow: hidden;
          border: 2px solid #C79A2B;
        }

        .photo-preview-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .remove-photo-btn {
          position: absolute;
          top: 4px;
          right: 4px;
          background: rgba(0, 0, 0, 0.7);
          color: #FFFFFF;
          border: none;
          border-radius: 50%;
          width: 22px;
          height: 22px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.7rem;
          cursor: pointer;
        }

        .moderation-notice {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: #FAF7F2;
          border: 1px solid #E8D8B5;
          padding: 0.65rem 0.85rem;
          border-radius: 8px;
          font-size: 0.75rem;
          color: #7A6B5E;
          line-height: 1.4;
        }

        .submit-moderation-success {
          text-align: center;
          padding: 2rem 1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .moderation-icon-box {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: #FFF8E1;
          color: #F57F17;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.8rem;
          margin-bottom: 1rem;
          border: 2px solid #FFE082;
        }

        .submit-moderation-success h4 {
          font-size: 1.15rem;
          color: #2D2523;
          margin: 0 0 0.5rem 0;
        }

        .submit-moderation-success p {
          font-size: 0.85rem;
          color: #6C584C;
          line-height: 1.6;
        }

        /* Lightbox Zoom */
        .photo-lightbox-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(6px);
          z-index: 999999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
        }

        .photo-lightbox-content {
          position: relative;
          max-width: 550px;
          max-height: 80vh;
        }

        .zoom-full-img {
          width: 100%;
          height: auto;
          border-radius: 12px;
          border: 2px solid #E8D8B5;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4);
        }

        .photo-lightbox-close {
          position: absolute;
          top: -38px;
          right: 0;
          background: rgba(255, 255, 255, 0.2);
          border: none;
          color: #FFFFFF;
          font-size: 1.4rem;
          cursor: pointer;
        }

        @media (max-width: 900px) {
          .reviews-layout {
            grid-template-columns: 1fr;
          }
          .rating-score-box {
            border-right: none;
            padding-right: 0;
            border-bottom: 1px solid #F0E6D2;
            padding-bottom: 1.5rem;
            width: 100%;
          }
          .submit-card {
            position: static;
          }
        }
      `}</style>
    </div>
  );
};

export default ReviewsPage;
