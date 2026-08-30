import React, { useState, useEffect } from 'react';
import {
  FaStar,
  FaCheck,
  FaTimes,
  FaTrash,
  FaCheckCircle,
  FaClock,
  FaBan,
  FaPlus,
  FaUpload,
  FaSearch,
  FaQuoteLeft,
  FaImage,
  FaEye
} from 'react-icons/fa';
import {
  getAllStoredReviews,
  saveAllReviews,
  initialReviewsData
} from '../../data/reviewsData';

const categories = [
  'Bridal Bangles',
  'Resin Art',
  'Handmade Chocolates',
  'Customized Chains',
  'Wedding Items',
  'Biscuits',
  'Customized Gifts',
  'Customized Dolls'
];

const AdminReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [activeTab, setActiveTab] = useState('PENDING'); // 'ALL', 'PENDING', 'APPROVED', 'REJECTED'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    city: 'Hyderabad, TS',
    category: 'Bridal Bangles',
    rating: 5,
    comment: '',
    photo: '',
    verified: true,
    status: 'APPROVED'
  });

  const loadReviews = () => {
    setReviews(getAllStoredReviews());
  };

  useEffect(() => {
    loadReviews();
  }, []);

  const handleApprove = (id) => {
    const updated = reviews.map((r) =>
      r.id === id ? { ...r, status: 'APPROVED' } : r
    );
    setReviews(updated);
    saveAllReviews(updated);
  };

  const handleReject = (id) => {
    const updated = reviews.map((r) =>
      r.id === id ? { ...r, status: 'REJECTED' } : r
    );
    setReviews(updated);
    saveAllReviews(updated);
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this review permanently?')) {
      const updated = reviews.filter((r) => r.id !== id);
      setReviews(updated);
      saveAllReviews(updated);
    }
  };

  const handleToggleVerified = (id) => {
    const updated = reviews.map((r) =>
      r.id === id ? { ...r, verified: !r.verified } : r
    );
    setReviews(updated);
    saveAllReviews(updated);
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setFormData((prev) => ({ ...prev, photo: event.target.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSaveNewReview = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.comment) return;

    const newRev = {
      id: Date.now(),
      date: 'Just now',
      ...formData,
      rating: Number(formData.rating)
    };

    const updated = [newRev, ...reviews];
    setReviews(updated);
    saveAllReviews(updated);
    setShowAddModal(false);
    setFormData({
      name: '',
      city: 'Hyderabad, TS',
      category: 'Bridal Bangles',
      rating: 5,
      comment: '',
      photo: '',
      verified: true,
      status: 'APPROVED'
    });
  };

  const handleResetDefaults = () => {
    if (window.confirm('Reset all reviews to default verified list?')) {
      setReviews(initialReviewsData);
      saveAllReviews(initialReviewsData);
    }
  };

  const pendingCount = reviews.filter((r) => r.status === 'PENDING').length;
  const approvedCount = reviews.filter((r) => r.status === 'APPROVED').length;
  const rejectedCount = reviews.filter((r) => r.status === 'REJECTED').length;

  const filteredReviews = reviews.filter((r) => {
    const matchesTab = activeTab === 'ALL' || r.status === activeTab;
    const matchesSearch =
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.comment.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (r.city && r.city.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTab && matchesSearch;
  });

  return (
    <div className="admin-reviews-page">
      {/* Top Header */}
      <div className="page-header-row">
        <div>
          <h1 className="admin-page-title" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <FaStar style={{ color: '#D4AF37' }} /> Customer Reviews & Moderation
          </h1>
          <p className="admin-page-desc">
            All reviews submitted by customers require <strong>admin approval</strong> before they appear on the public website.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button onClick={handleResetDefaults} className="btn-secondary">
            Reset Default Reviews
          </button>
          <button onClick={() => setShowAddModal(true)} className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <FaPlus /> Add Verified Review
          </button>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="reviews-stat-grid">
        <div
          className={`review-stat-card ${activeTab === 'PENDING' ? 'active' : ''}`}
          onClick={() => setActiveTab('PENDING')}
        >
          <div className="stat-icon-wrap pending-icon"><FaClock /></div>
          <div>
            <div className="stat-number">{pendingCount}</div>
            <div className="stat-label">Pending Approval</div>
          </div>
        </div>

        <div
          className={`review-stat-card ${activeTab === 'APPROVED' ? 'active' : ''}`}
          onClick={() => setActiveTab('APPROVED')}
        >
          <div className="stat-icon-wrap approved-icon"><FaCheckCircle /></div>
          <div>
            <div className="stat-number">{approvedCount}</div>
            <div className="stat-label">Live on Website</div>
          </div>
        </div>

        <div
          className={`review-stat-card ${activeTab === 'REJECTED' ? 'active' : ''}`}
          onClick={() => setActiveTab('REJECTED')}
        >
          <div className="stat-icon-wrap rejected-icon"><FaBan /></div>
          <div>
            <div className="stat-number">{rejectedCount}</div>
            <div className="stat-label">Rejected</div>
          </div>
        </div>

        <div
          className={`review-stat-card ${activeTab === 'ALL' ? 'active' : ''}`}
          onClick={() => setActiveTab('ALL')}
        >
          <div className="stat-icon-wrap all-icon"><FaStar /></div>
          <div>
            <div className="stat-number">{reviews.length}</div>
            <div className="stat-label">Total Submissions</div>
          </div>
        </div>
      </div>

      {/* Tabs & Search Toolbar */}
      <div className="reviews-toolbar">
        <div className="tab-buttons">
          <button
            className={`tab-btn ${activeTab === 'PENDING' ? 'active' : ''}`}
            onClick={() => setActiveTab('PENDING')}
          >
            Pending ({pendingCount})
          </button>
          <button
            className={`tab-btn ${activeTab === 'APPROVED' ? 'active' : ''}`}
            onClick={() => setActiveTab('APPROVED')}
          >
            Approved ({approvedCount})
          </button>
          <button
            className={`tab-btn ${activeTab === 'REJECTED' ? 'active' : ''}`}
            onClick={() => setActiveTab('REJECTED')}
          >
            Rejected ({rejectedCount})
          </button>
          <button
            className={`tab-btn ${activeTab === 'ALL' ? 'active' : ''}`}
            onClick={() => setActiveTab('ALL')}
          >
            All ({reviews.length})
          </button>
        </div>

        <div className="search-box">
          <FaSearch style={{ color: '#9C8E7F' }} />
          <input
            type="text"
            placeholder="Search by customer name, city, or review text..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Reviews Table / Cards */}
      <div className="reviews-cards-list">
        {filteredReviews.length === 0 ? (
          <div className="no-reviews-box">
            <FaCheckCircle style={{ fontSize: '2.2rem', color: '#25D366', marginBottom: '0.5rem' }} />
            <h3>No {activeTab.toLowerCase()} reviews found</h3>
            <p>You're all caught up on review moderation!</p>
          </div>
        ) : (
          filteredReviews.map((rev) => (
            <div key={rev.id} className={`admin-rev-card status-${rev.status.toLowerCase()}`}>
              <div className="rev-card-header">
                <div className="reviewer-details">
                  <div className="reviewer-avatar">
                    {rev.name ? rev.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div>
                    <h3 className="reviewer-name">{rev.name}</h3>
                    <div className="reviewer-sub">
                      {rev.city || 'India'} • {rev.date} • <span className="cat-text">{rev.category}</span>
                    </div>
                  </div>
                </div>

                <div className="header-status-group">
                  <span className={`status-pill pill-${rev.status.toLowerCase()}`}>
                    {rev.status === 'PENDING' && <FaClock />}
                    {rev.status === 'APPROVED' && <FaCheck />}
                    {rev.status === 'REJECTED' && <FaTimes />}
                    {rev.status}
                  </span>

                  <button
                    onClick={() => handleToggleVerified(rev.id)}
                    className={`verified-toggle-btn ${rev.verified ? 'is-verified' : ''}`}
                    title="Toggle Verified Buyer badge"
                  >
                    <FaCheckCircle /> {rev.verified ? 'Verified Buyer' : 'Unverified'}
                  </button>
                </div>
              </div>

              {/* Star Rating */}
              <div className="rev-stars-row">
                {[...Array(rev.rating || 5)].map((_, i) => (
                  <FaStar key={i} style={{ color: '#D4AF37' }} />
                ))}
                <span className="rating-num">({rev.rating}/5 Stars)</span>
              </div>

              {/* Review Text */}
              <p className="rev-comment-text">
                <FaQuoteLeft className="quote-mark" /> {rev.comment}
              </p>

              {/* Attached Customer Photo */}
              {rev.photo && (
                <div className="attached-photo-wrap">
                  <div className="photo-thumbnail" onClick={() => setSelectedPhoto(rev.photo)}>
                    <img src={rev.photo} alt="Customer Attached Craft" />
                    <span className="photo-zoom-hint"><FaEye /> Zoom Photo</span>
                  </div>
                  <span className="photo-attached-label"><FaImage /> Customer attached product photo</span>
                </div>
              )}

              {/* Action Bar */}
              <div className="rev-action-bar">
                <div className="action-buttons-group">
                  {rev.status !== 'APPROVED' && (
                    <button
                      onClick={() => handleApprove(rev.id)}
                      className="btn-approve"
                      title="Approve and show on public website"
                    >
                      <FaCheck /> Approve & Publish
                    </button>
                  )}

                  {rev.status !== 'REJECTED' && (
                    <button
                      onClick={() => handleReject(rev.id)}
                      className="btn-reject"
                      title="Reject this review"
                    >
                      <FaTimes /> Reject
                    </button>
                  )}

                  <button
                    onClick={() => handleDelete(rev.id)}
                    className="btn-delete"
                    title="Delete permanently"
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Image Lightbox Modal */}
      {selectedPhoto && (
        <div className="photo-lightbox-overlay" onClick={() => setSelectedPhoto(null)}>
          <div className="photo-lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="photo-lightbox-close" onClick={() => setSelectedPhoto(null)}>
              <FaTimes />
            </button>
            <img src={selectedPhoto} alt="Customer Review Zoom" className="zoom-full-img" />
          </div>
        </div>
      )}

      {/* Add Review Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add Verified Customer Review</h3>
              <button className="modal-close-btn" onClick={() => setShowAddModal(false)}>
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSaveNewReview} className="modal-form-body">
              <div className="form-row">
                <div className="form-group">
                  <label>Customer Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sravani Rao"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>City & State</label>
                  <input
                    type="text"
                    placeholder="e.g. Hyderabad, TS"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Product Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Rating</label>
                  <select
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                  >
                    <option value="5">⭐⭐⭐⭐⭐ 5 Stars</option>
                    <option value="4">⭐⭐⭐⭐ 4 Stars</option>
                    <option value="3">⭐⭐⭐ 3 Stars</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Review Description *</label>
                <textarea
                  rows="3"
                  required
                  placeholder="Customer's feedback on craft, customization, and packaging..."
                  value={formData.comment}
                  onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                ></textarea>
              </div>

              <div className="form-group">
                <label>Attach Product Photo</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                />
                {formData.photo && (
                  <div style={{ marginTop: '0.5rem', width: '80px', height: '80px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #C79A2B' }}>
                    <img src={formData.photo} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                )}
              </div>

              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Publish Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        .admin-reviews-page {
          padding: 1.5rem;
          max-width: 1300px;
          margin: 0 auto;
        }

        .page-header-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          flex-wrap: wrap;
          margin-bottom: 1.5rem;
        }

        .admin-page-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 2rem;
          font-weight: 700;
          color: #2D2523;
          margin: 0;
        }

        .admin-page-desc {
          color: #7A6B5E;
          font-size: 0.9rem;
          margin-top: 0.25rem;
        }

        .reviews-stat-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1.25rem;
          margin-bottom: 1.75rem;
        }

        .review-stat-card {
          background: #FFFFFF;
          border: 1px solid #E8D8B5;
          border-radius: 14px;
          padding: 1.25rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .review-stat-card:hover,
        .review-stat-card.active {
          border-color: #C79A2B;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(199, 154, 43, 0.15);
        }

        .stat-icon-wrap {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.3rem;
        }

        .pending-icon {
          background: #FFF8E1;
          color: #F57F17;
        }

        .approved-icon {
          background: #E8F5E9;
          color: #2E7D32;
        }

        .rejected-icon {
          background: #FFEBEE;
          color: #C62828;
        }

        .all-icon {
          background: #FAF5EF;
          color: #C79A2B;
        }

        .stat-number {
          font-size: 1.6rem;
          font-weight: 800;
          color: #2D2523;
          line-height: 1;
        }

        .stat-label {
          font-size: 0.8rem;
          color: #7A6B5E;
          font-weight: 600;
          margin-top: 4px;
        }

        .reviews-toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          flex-wrap: wrap;
          background: #FFFFFF;
          border: 1px solid #E8D8B5;
          padding: 0.85rem 1.25rem;
          border-radius: 12px;
          margin-bottom: 1.5rem;
        }

        .tab-buttons {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .tab-btn {
          background: transparent;
          border: 1px solid transparent;
          padding: 0.45rem 0.9rem;
          border-radius: 8px;
          font-size: 0.85rem;
          font-weight: 600;
          color: #554236;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .tab-btn.active {
          background: #C79A2B;
          color: #FFFFFF;
        }

        .search-box {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: #FAF7F2;
          border: 1px solid #E8D8B5;
          border-radius: 8px;
          padding: 0.45rem 0.85rem;
          min-width: 280px;
        }

        .search-box input {
          border: none;
          background: transparent;
          outline: none;
          font-size: 0.85rem;
          color: #3E2C1C;
          width: 100%;
        }

        .reviews-cards-list {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .admin-rev-card {
          background: #FFFFFF;
          border: 1px solid #E8D8B5;
          border-radius: 14px;
          padding: 1.5rem;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.03);
          transition: border-color 0.2s;
        }

        .admin-rev-card.status-pending {
          border-left: 5px solid #F57F17;
          background: #FFFDF9;
        }

        .admin-rev-card.status-approved {
          border-left: 5px solid #2E7D32;
        }

        .admin-rev-card.status-rejected {
          border-left: 5px solid #C62828;
          opacity: 0.75;
        }

        .rev-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          flex-wrap: wrap;
          margin-bottom: 0.85rem;
        }

        .reviewer-details {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }

        .reviewer-avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: #2D2523;
          color: #E8C86A;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 1.15rem;
        }

        .reviewer-name {
          font-size: 1.05rem;
          font-weight: 700;
          color: #2D2523;
          margin: 0;
        }

        .reviewer-sub {
          font-size: 0.78rem;
          color: #7A6B5E;
          margin-top: 2px;
        }

        .cat-text {
          color: #C79A2B;
          font-weight: 600;
        }

        .header-status-group {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }

        .status-pill {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 20px;
          text-transform: uppercase;
        }

        .pill-pending {
          background: #FFF8E1;
          color: #F57F17;
          border: 1px solid #FFE082;
        }

        .pill-approved {
          background: #E8F5E9;
          color: #2E7D32;
          border: 1px solid #C8E6C9;
        }

        .pill-rejected {
          background: #FFEBEE;
          color: #C62828;
          border: 1px solid #FFCDD2;
        }

        .verified-toggle-btn {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 0.75rem;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 20px;
          border: 1px solid #E8D8B5;
          background: #FAF7F2;
          color: #7A6B5E;
          cursor: pointer;
        }

        .verified-toggle-btn.is-verified {
          background: #E8F5E9;
          color: #2E7D32;
          border-color: #A5D6A7;
        }

        .rev-stars-row {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 0.95rem;
          margin-bottom: 0.75rem;
        }

        .rating-num {
          font-size: 0.78rem;
          color: #7A6B5E;
          margin-left: 6px;
          font-weight: 600;
        }

        .rev-comment-text {
          font-size: 0.92rem;
          color: #4A3B30;
          line-height: 1.6;
          margin-bottom: 1rem;
        }

        .quote-mark {
          color: #E8D8B5;
          font-size: 0.8rem;
        }

        .attached-photo-wrap {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          margin-bottom: 1.25rem;
          background: #FAF7F2;
          padding: 0.6rem 0.85rem;
          border-radius: 10px;
          border: 1px solid #E8D8B5;
          width: fit-content;
        }

        .photo-thumbnail {
          position: relative;
          width: 60px;
          height: 60px;
          border-radius: 8px;
          overflow: hidden;
          cursor: pointer;
          border: 2px solid #C79A2B;
        }

        .photo-thumbnail img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .photo-zoom-hint {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          color: #FFFFFF;
          font-size: 0.55rem;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.2s;
        }

        .photo-thumbnail:hover .photo-zoom-hint {
          opacity: 1;
        }

        .photo-attached-label {
          font-size: 0.78rem;
          color: #554236;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .rev-action-bar {
          border-top: 1px solid #F0E6D2;
          padding-top: 0.85rem;
          display: flex;
          justify-content: flex-end;
        }

        .action-buttons-group {
          display: flex;
          gap: 0.6rem;
        }

        .btn-approve {
          background: #2E7D32;
          color: #FFFFFF;
          border: none;
          padding: 0.45rem 0.95rem;
          border-radius: 6px;
          font-size: 0.82rem;
          font-weight: 700;
          display: inline-flex;
          align-items: center;
          gap: 5px;
          cursor: pointer;
          transition: background 0.2s;
        }

        .btn-approve:hover {
          background: #1B5E20;
        }

        .btn-reject {
          background: #FFF3E0;
          color: #E65100;
          border: 1px solid #FFE0B2;
          padding: 0.45rem 0.95rem;
          border-radius: 6px;
          font-size: 0.82rem;
          font-weight: 700;
          display: inline-flex;
          align-items: center;
          gap: 5px;
          cursor: pointer;
        }

        .btn-reject:hover {
          background: #E65100;
          color: #FFFFFF;
        }

        .btn-delete {
          background: #FFEBEE;
          color: #C62828;
          border: 1px solid #FFCDD2;
          padding: 0.45rem 0.85rem;
          border-radius: 6px;
          font-size: 0.82rem;
          font-weight: 700;
          display: inline-flex;
          align-items: center;
          gap: 5px;
          cursor: pointer;
        }

        .btn-delete:hover {
          background: #C62828;
          color: #FFFFFF;
        }

        .no-reviews-box {
          text-align: center;
          padding: 3.5rem 1rem;
          background: #FFFFFF;
          border-radius: 14px;
          border: 1px dashed #E8D8B5;
        }

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
          max-width: 600px;
          max-height: 80vh;
        }

        .zoom-full-img {
          width: 100%;
          height: auto;
          border-radius: 12px;
          border: 2px solid #E8D8B5;
        }

        .photo-lightbox-close {
          position: absolute;
          top: -40px;
          right: 0;
          background: rgba(255, 255, 255, 0.2);
          border: none;
          color: #FFFFFF;
          font-size: 1.5rem;
          cursor: pointer;
        }

        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.65);
          backdrop-filter: blur(4px);
          z-index: 99999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
        }

        .modal-content-box {
          background: #FFFFFF;
          width: 100%;
          max-width: 620px;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.25);
        }

        .modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.25rem 1.5rem;
          border-bottom: 1px solid #E8D8B5;
        }

        .modal-header h3 {
          margin: 0;
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.4rem;
          color: #2D2523;
        }

        .modal-close-btn {
          background: transparent;
          border: none;
          font-size: 1.2rem;
          color: #9C8E7F;
          cursor: pointer;
        }

        .modal-form-body {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
        }

        .form-group label {
          font-size: 0.8rem;
          font-weight: 700;
          color: #3E2C1C;
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          padding: 0.65rem 0.85rem;
          border-radius: 8px;
          border: 1px solid #E8D8B5;
          font-family: inherit;
          font-size: 0.88rem;
          outline: none;
        }

        .modal-footer {
          display: flex;
          justify-content: flex-end;
          gap: 0.75rem;
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid #E8D8B5;
        }

        .btn-primary {
          background: linear-gradient(135deg, #C79A2B 0%, #AA7C11 100%);
          color: #FFFFFF;
          border: none;
          padding: 0.55rem 1.25rem;
          border-radius: 8px;
          font-weight: 700;
          font-size: 0.88rem;
          cursor: pointer;
        }

        .btn-secondary {
          background: #FAF5EF;
          color: #3E2C1C;
          border: 1px solid #E8D8B5;
          padding: 0.55rem 1.25rem;
          border-radius: 8px;
          font-weight: 600;
          font-size: 0.88rem;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default AdminReviews;
