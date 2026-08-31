import React, { useState, useEffect, useRef } from 'react';
import {
  FaImages,
  FaPlus,
  FaTrash,
  FaEdit,
  FaSearch,
  FaCropAlt,
  FaCheck,
  FaTimes,
  FaUpload,
  FaEye,
  FaExclamationTriangle
} from 'react-icons/fa';
import {
  getStoredGalleryItems,
  saveStoredGalleryItems,
  initialGalleryItems
} from '../../data/galleryData';

const categories = [
  'Thread Work',
  'Resin Art',
  'Chocolates',
  'Customized Chains',
  'Wedding Items',
  'Biscuits',
  'Customized Gifts',
  'Customized Dolls'
];

const AdminGallery = () => {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [previewImage, setPreviewImage] = useState('');
  const [isProcessingImage, setIsProcessingImage] = useState(false);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Thread Work',
    image: '',
    description: ''
  });

  useEffect(() => {
    setItems(getStoredGalleryItems());
  }, []);

  // Handle local image file upload with automatic 500x500 1:1 center crop/resize
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (PNG, JPG, WEBP).');
      return;
    }

    setIsProcessingImage(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        // Create 500x500 canvas
        const canvas = document.createElement('canvas');
        canvas.width = 500;
        canvas.height = 500;
        const ctx = canvas.getContext('2d');

        // Calculate center square crop
        const minDim = Math.min(img.width, img.height);
        const startX = (img.width - minDim) / 2;
        const startY = (img.height - minDim) / 2;

        // Draw cropped & resized 500x500 image
        ctx.drawImage(img, startX, startY, minDim, minDim, 0, 0, 500, 500);

        const dataUrl = canvas.toDataURL('image/jpeg', 0.88);
        setFormData((prev) => ({ ...prev, image: dataUrl }));
        setPreviewImage(dataUrl);
        setIsProcessingImage(false);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      title: '',
      category: 'Thread Work',
      image: '',
      description: ''
    });
    setPreviewImage('');
    setShowModal(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      category: item.category,
      image: item.image,
      description: item.description || ''
    });
    setPreviewImage(item.image);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this gallery item?')) {
      const updated = items.filter((it) => it.id !== id);
      setItems(updated);
      saveStoredGalleryItems(updated);
    }
  };

  const handleResetDefaults = () => {
    if (window.confirm('Reset gallery to default showcase items?')) {
      setItems(initialGalleryItems);
      saveStoredGalleryItems(initialGalleryItems);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.image) {
      alert('Please provide a title and an image (upload or URL).');
      return;
    }

    let updated;
    if (editingItem) {
      updated = items.map((it) =>
        it.id === editingItem.id ? { ...it, ...formData } : it
      );
    } else {
      const newItem = {
        id: Date.now(),
        ...formData
      };
      updated = [newItem, ...items];
    }

    setItems(updated);
    saveStoredGalleryItems(updated);
    setShowModal(false);
  };

  const filteredItems = items.filter((it) => {
    const matchesCat = selectedCategory === 'All' || it.category === selectedCategory;
    const matchesSearch =
      it.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (it.description && it.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="admin-gallery-page">
      {/* Header bar */}
      <div className="page-header-row">
        <div>
          <h1 className="admin-page-title" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <FaImages style={{ color: '#D4AF37' }} /> Gallery Showcase Management
          </h1>
          <p className="admin-page-desc">
            Add and customize photos displayed on the customer-facing Gallery page. All images are rendered in a <strong>500×500 px (1:1 aspect ratio)</strong> format.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button onClick={handleResetDefaults} className="btn-secondary" title="Restore default images">
            Reset Defaults
          </button>
          <button onClick={handleOpenAdd} className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <FaPlus /> Add New Photo
          </button>
        </div>
      </div>

      {/* 500x500 Spec Banner */}
      <div className="spec-info-card">
        <div className="spec-icon"><FaCropAlt /></div>
        <div className="spec-text">
          <strong>Automatic 500×500 px (1:1 Ratio) Processing:</strong> Any photo you upload is automatically centered and cropped to an exact 500×500 px square canvas for crisp, uniform presentation across mobile & desktop devices.
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="filter-search-toolbar">
        <div className="search-input-wrap">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search by title or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="category-select-wrap">
          <label>Category:</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="All">All Categories ({items.length})</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat} ({items.filter((i) => i.category === cat).length})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 1:1 Aspect Ratio Gallery Cards Grid */}
      <div className="gallery-admin-grid">
        {filteredItems.length === 0 ? (
          <div className="no-items-placeholder">
            <FaExclamationTriangle style={{ fontSize: '2rem', color: '#D4AF37', marginBottom: '0.5rem' }} />
            <h3>No gallery photos found</h3>
            <p>Try adjusting your category filter or click "Add New Photo" above.</p>
          </div>
        ) : (
          filteredItems.map((item) => (
            <div key={item.id} className="admin-gallery-card">
              <div className="square-image-container">
                <img
                  src={item.image}
                  alt={item.title}
                  className="square-500-img"
                  loading="lazy"
                />
                <span className="card-cat-badge">{item.category}</span>
                <span className="dimension-badge">500×500 px (1:1)</span>
              </div>

              <div className="card-content-body">
                <h3 className="card-item-title">{item.title}</h3>
                <p className="card-item-desc">{item.description || 'No description provided.'}</p>
                <div className="card-action-buttons">
                  <button
                    onClick={() => handleOpenEdit(item)}
                    className="card-btn-edit"
                    title="Edit Item"
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="card-btn-delete"
                    title="Delete Item"
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add / Edit Modal */}
      {showModal && (
        <div className="admin-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="admin-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingItem ? 'Edit Gallery Photo' : 'Add New Gallery Photo'}</h3>
              <button className="modal-close-btn" onClick={() => setShowModal(false)}>
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSave} className="modal-form">
              <div className="modal-grid">
                {/* Form Inputs */}
                <div className="form-fields-col">
                  <div className="form-group">
                    <label>Photo / Product Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Royal Maroon Velvet Bridal Bangles"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>Category *</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                      {categories.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Upload Image (Auto 500×500 1:1 Crop)</label>
                    <div
                      className="upload-dropzone"
                      onClick={() => fileInputRef.current && fileInputRef.current.click()}
                    >
                      <FaUpload style={{ fontSize: '1.5rem', color: '#C79A2B' }} />
                      <span>{isProcessingImage ? 'Processing 500×500...' : 'Click to Upload Image File'}</span>
                      <span className="dropzone-hint">JPG, PNG, WEBP (Larger images automatically center-cropped to 500×500)</span>
                      <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={handleFileUpload}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Or Paste Direct Image URL</label>
                    <input
                      type="url"
                      placeholder="https://images.unsplash.com/..."
                      value={formData.image}
                      onChange={(e) => {
                        setFormData({ ...formData, image: e.target.value });
                        setPreviewImage(e.target.value);
                      }}
                    />
                  </div>

                  <div className="form-group">
                    <label>Description / Craft Details</label>
                    <textarea
                      rows="3"
                      placeholder="Details about stones, materials, dimensions, or custom options..."
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                  </div>
                </div>

                {/* 500x500 1:1 Live Preview Box */}
                <div className="preview-col">
                  <label style={{ fontWeight: '700', fontSize: '0.85rem', color: '#3E2C1C' }}>
                    1:1 Square (500×500) Live Preview
                  </label>
                  <div className="preview-square-box">
                    {previewImage ? (
                      <img src={previewImage} alt="Preview" className="preview-img" />
                    ) : (
                      <div className="empty-preview">
                        <FaImages style={{ fontSize: '2.5rem', color: '#D4AF37', opacity: 0.5 }} />
                        <span>No image selected</span>
                        <span style={{ fontSize: '0.72rem', color: '#A89F91' }}>500 × 500 px ratio</span>
                      </div>
                    )}
                    <span className="preview-badge">500 × 500 PX</span>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary" disabled={isProcessingImage}>
                  {editingItem ? 'Save Changes' : 'Publish to Gallery'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        .admin-gallery-page {
          padding: 1.5rem;
          max-width: 1400px;
          margin: 0 auto;
        }

        .page-header-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          flex-wrap: wrap;
          margin-bottom: 1.25rem;
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

        .spec-info-card {
          background: linear-gradient(135deg, rgba(199, 154, 43, 0.12) 0%, rgba(212, 175, 55, 0.05) 100%);
          border: 1px solid rgba(199, 154, 43, 0.35);
          border-radius: 12px;
          padding: 0.9rem 1.25rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .spec-icon {
          font-size: 1.5rem;
          color: #C79A2B;
          flex-shrink: 0;
        }

        .spec-text {
          font-size: 0.85rem;
          color: #3E2C1C;
          line-height: 1.5;
        }

        .filter-search-toolbar {
          display: flex;
          gap: 1rem;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          background: #FFFFFF;
          border: 1px solid #E8D8B5;
          padding: 1rem 1.25rem;
          border-radius: 12px;
          margin-bottom: 1.75rem;
        }

        .search-input-wrap {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: #FAF7F2;
          border: 1px solid #E8D8B5;
          border-radius: 8px;
          padding: 0.5rem 0.85rem;
          flex: 1;
          min-width: 250px;
        }

        .search-icon {
          color: #9C8E7F;
        }

        .search-input-wrap input {
          border: none;
          background: transparent;
          outline: none;
          width: 100%;
          font-size: 0.88rem;
          color: #3E2C1C;
        }

        .category-select-wrap {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.88rem;
          font-weight: 600;
          color: #3E2C1C;
        }

        .category-select-wrap select {
          padding: 0.5rem 0.85rem;
          border-radius: 8px;
          border: 1px solid #E8D8B5;
          background: #FAF7F2;
          font-size: 0.88rem;
          outline: none;
        }

        .gallery-admin-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.5rem;
        }

        .admin-gallery-card {
          background: #FFFFFF;
          border: 1px solid #E8D8B5;
          border-radius: 14px;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.04);
          display: flex;
          flex-direction: column;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .admin-gallery-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 24px rgba(199, 154, 43, 0.15);
        }

        .square-image-container {
          position: relative;
          width: 100%;
          aspect-ratio: 1 / 1;
          background: #F5EFEB;
          overflow: hidden;
        }

        .square-500-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.4s ease;
        }

        .admin-gallery-card:hover .square-500-img {
          transform: scale(1.05);
        }

        .card-cat-badge {
          position: absolute;
          top: 10px;
          left: 10px;
          background: rgba(45, 37, 35, 0.85);
          backdrop-filter: blur(4px);
          color: #E8C86A;
          font-size: 0.72rem;
          font-weight: 700;
          padding: 3px 8px;
          border-radius: 6px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .dimension-badge {
          position: absolute;
          bottom: 10px;
          right: 10px;
          background: rgba(0, 0, 0, 0.65);
          color: #FFFFFF;
          font-size: 0.65rem;
          font-weight: 600;
          padding: 2px 6px;
          border-radius: 4px;
        }

        .card-content-body {
          padding: 1.15rem;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .card-item-title {
          font-size: 1.05rem;
          font-weight: 700;
          color: #2D2523;
          margin: 0 0 0.4rem 0;
          line-height: 1.3;
        }

        .card-item-desc {
          font-size: 0.82rem;
          color: #7A6B5E;
          line-height: 1.5;
          margin: 0 0 1rem 0;
          flex: 1;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .card-action-buttons {
          display: flex;
          gap: 0.6rem;
          border-top: 1px solid #F0E6D2;
          padding-top: 0.85rem;
        }

        .card-btn-edit,
        .card-btn-delete {
          flex: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          font-size: 0.8rem;
          font-weight: 700;
          padding: 0.45rem 0.75rem;
          border-radius: 6px;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .card-btn-edit {
          background: #FAF5EF;
          color: #3E2C1C;
          border: 1px solid #E8D8B5;
        }

        .card-btn-edit:hover {
          background: #C79A2B;
          color: #FFFFFF;
          border-color: #C79A2B;
        }

        .card-btn-delete {
          background: #FDF0F0;
          color: #D32F2F;
          border: 1px solid #FFCDD2;
        }

        .card-btn-delete:hover {
          background: #D32F2F;
          color: #FFFFFF;
        }

        .no-items-placeholder {
          grid-column: 1 / -1;
          text-align: center;
          padding: 4rem 1rem;
          background: #FFFFFF;
          border-radius: 12px;
          border: 1px dashed #E8D8B5;
        }

        /* Modal Styles */
        .admin-modal-overlay {
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

        .admin-modal-box {
          background: #FFFFFF;
          width: 100%;
          max-width: 780px;
          max-height: 90vh;
          border-radius: 16px;
          overflow-y: auto;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
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
          font-size: 1.5rem;
          color: #2D2523;
        }

        .modal-close-btn {
          background: transparent;
          border: none;
          font-size: 1.2rem;
          color: #9C8E7F;
          cursor: pointer;
        }

        .modal-form {
          padding: 1.5rem;
        }

        .modal-grid {
          display: grid;
          grid-template-columns: 1.3fr 1fr;
          gap: 1.5rem;
        }

        .form-fields-col {
          display: flex;
          flex-direction: column;
          gap: 0.9rem;
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
          font-size: 0.88rem;
          font-family: inherit;
          outline: none;
        }

        .upload-dropzone {
          border: 2px dashed #C79A2B;
          border-radius: 10px;
          padding: 1.25rem;
          background: #FAF7F2;
          text-align: center;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.85rem;
          font-weight: 600;
          color: #3E2C1C;
          transition: background 0.2s;
        }

        .upload-dropzone:hover {
          background: #F3EBDD;
        }

        .dropzone-hint {
          font-size: 0.72rem;
          color: #8C7A6B;
          font-weight: normal;
        }

        .preview-col {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .preview-square-box {
          position: relative;
          width: 100%;
          aspect-ratio: 1 / 1;
          border-radius: 12px;
          border: 2px solid #E8D8B5;
          background: #FAF5EF;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .preview-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .empty-preview {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.85rem;
          color: #7A6B5E;
          font-weight: 600;
        }

        .preview-badge {
          position: absolute;
          bottom: 8px;
          right: 8px;
          background: rgba(0, 0, 0, 0.7);
          color: #E8C86A;
          font-size: 0.68rem;
          font-weight: 700;
          padding: 2px 6px;
          border-radius: 4px;
        }

        .modal-footer {
          display: flex;
          justify-content: flex-end;
          gap: 0.75rem;
          margin-top: 1.5rem;
          padding-top: 1rem;
          border-top: 1px solid #E8D8B5;
        }

        .btn-primary {
          background: linear-gradient(135deg, #C79A2B 0%, #AA7C11 100%);
          color: #FFFFFF;
          border: none;
          padding: 0.6rem 1.25rem;
          border-radius: 8px;
          font-weight: 700;
          font-size: 0.88rem;
          cursor: pointer;
        }

        .btn-secondary {
          background: #FAF5EF;
          color: #3E2C1C;
          border: 1px solid #E8D8B5;
          padding: 0.6rem 1.25rem;
          border-radius: 8px;
          font-weight: 600;
          font-size: 0.88rem;
          cursor: pointer;
        }

        @media (max-width: 768px) {
          .modal-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminGallery;
