import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  getStoredProducts,
  addProduct,
  updateProduct,
  getStoredCategories
} from '../../services/adminDataStore';
import {
  FaCloudUploadAlt,
  FaTrash,
  FaPlus,
  FaSave,
  FaArrowLeft,
  FaCheck,
  FaTimes
} from 'react-icons/fa';

const FIELD_TYPES = [
  { value: 'Text', label: 'Text Input' },
  { value: 'Long Text', label: 'Long Text Area' },
  { value: 'Number', label: 'Number' },
  { value: 'Price', label: 'Price' },
  { value: 'Dropdown', label: 'Dropdown Options' },
  { value: 'Checkbox', label: 'Checkbox' },
  { value: 'Radio', label: 'Radio Choice' },
  { value: 'Date', label: 'Date Picker' },
  { value: 'Image', label: 'Image Upload' },
  { value: 'URL', label: 'Web URL Link' }
];

const AdminAddEditProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const categories = getStoredCategories();

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    shortDesc: '',
    description: '',
    category: 'Resin Art',
    subCategory: 'Personalized Gifts',
    price: '',
    discountPrice: '',
    sku: '',
    stockQuantity: '25',
    stockStatus: 'In Stock',
    rating: '5.0',
    status: 'ACTIVE',
    image: '',
    images: []
  });

  // Custom Fields Builder State
  const [customFields, setCustomFields] = useState([]);

  // Image Upload State
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    if (isEdit) {
      const products = getStoredProducts();
      const target = products.find((p) => p.id === id);
      if (target) {
        setFormData({
          name: target.name || '',
          shortDesc: target.shortDesc || '',
          description: target.description || '',
          category: target.category || 'Resin Art',
          subCategory: target.subCategory || 'Personalized Gifts',
          price: target.price || '',
          discountPrice: target.discountPrice || '',
          sku: target.sku || `SKU-${target.id}`,
          stockQuantity: String(target.stockQuantity ?? 25),
          stockStatus: target.stockStatus || 'In Stock',
          rating: String(target.rating || '5.0'),
          status: target.status || 'ACTIVE',
          image: target.image || '',
          images: target.images || [target.image || '']
        });
        setImagePreviewUrl(target.image || '');
        setCustomFields(target.customFields || []);
      }
    }
  }, [id, isEdit]);

  // Image File Upload Handler
  const handleImageFileSelect = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const blobUrl = URL.createObjectURL(file);
      setImagePreviewUrl(blobUrl);
      setFormData((prev) => ({
        ...prev,
        image: blobUrl,
        images: [blobUrl, ...prev.images]
      }));
    }
  };

  // Add Custom Field Handler
  const handleAddCustomField = () => {
    const newField = {
      id: `cf-${Date.now()}`,
      name: '',
      type: 'Text',
      required: false,
      options: ''
    };
    setCustomFields((prev) => [...prev, newField]);
  };

  const handleCustomFieldChange = (fieldId, key, value) => {
    setCustomFields((prev) =>
      prev.map((f) => (f.id === fieldId ? { ...f, [key]: value } : f))
    );
  };

  const handleRemoveCustomField = (fieldId) => {
    setCustomFields((prev) => prev.filter((f) => f.id !== fieldId));
  };

  // Save Form Handler
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert('Please enter a product name');
      return;
    }

    const payload = {
      ...formData,
      price: Number(formData.price) || 0,
      stockQuantity: Number(formData.stockQuantity) || 0,
      customFields: customFields.filter((f) => f.name.trim() !== '')
    };

    if (isEdit) {
      updateProduct(id, payload);
      setToastMessage('Product updated successfully!');
    } else {
      addProduct(payload);
      setToastMessage('Product added successfully!');
    }

    setTimeout(() => {
      navigate('/admin/products');
    }, 800);
  };

  return (
    <div className="admin-add-edit-page" style={{ maxWidth: '900px', margin: '0 auto' }}>
      {/* Toast Notification */}
      {toastMessage && (
        <div style={{ position: 'fixed', top: '80px', right: '20px', background: '#DCFCE7', border: '1px solid #86EFAC', color: '#15803D', padding: '12px 20px', borderRadius: '50px', fontWeight: 700, zIndex: 1000, boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
          ✓ {toastMessage}
        </div>
      )}

      {/* Header Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={() => navigate('/admin/products')} style={{ background: '#FFF', border: '1px solid #E5DFD5', width: '38px', height: '38px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2D2523' }}>
            <FaArrowLeft />
          </button>
          <div>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', fontWeight: 700, margin: 0 }}>
              {isEdit ? 'Edit Product' : 'Add New Product'}
            </h1>
            <p style={{ fontSize: '0.85rem', color: '#7A6965', margin: '2px 0 0 0' }}>
              {isEdit ? 'Update product details, images, and custom input fields' : 'Fill in product information to publish to catalog'}
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* SECTION 1: Basic Information */}
        <div style={{ background: '#FFFFFF', padding: '1.8rem', borderRadius: '20px', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0 0 1.2rem 0', color: '#2D2523' }}>📌 Basic Information</h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.2rem' }}>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#2D2523', display: 'block', marginBottom: '4px' }}>Product Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Personalized Resin Anniversary Photo Plaque"
                style={{ width: '100%', padding: '11px 14px', borderRadius: '10px', border: '1px solid #E5DFD5', outline: 'none', boxSizing: 'border-box' }}
                required
              />
            </div>

            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#2D2523', display: 'block', marginBottom: '4px' }}>Category *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                style={{ width: '100%', padding: '11px 14px', borderRadius: '10px', border: '1px solid #E5DFD5', outline: 'none', background: '#FFF', boxSizing: 'border-box' }}
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#2D2523', display: 'block', marginBottom: '4px' }}>Subcategory / Tag</label>
              <input
                type="text"
                value={formData.subCategory}
                onChange={(e) => setFormData({ ...formData, subCategory: e.target.value })}
                placeholder="e.g. Personalized Gifts"
                style={{ width: '100%', padding: '11px 14px', borderRadius: '10px', border: '1px solid #E5DFD5', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>

            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#2D2523', display: 'block', marginBottom: '4px' }}>Short Summary Description</label>
              <input
                type="text"
                value={formData.shortDesc}
                onChange={(e) => setFormData({ ...formData, shortDesc: e.target.value })}
                placeholder="Brief 1-2 sentence overview for product cards"
                style={{ width: '100%', padding: '11px 14px', borderRadius: '10px', border: '1px solid #E5DFD5', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>

            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#2D2523', display: 'block', marginBottom: '4px' }}>Detailed Product Description</label>
              <textarea
                rows="5"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Comprehensive description of materials, craftsmanship, and occasion features"
                style={{ width: '100%', padding: '11px 14px', borderRadius: '10px', border: '1px solid #E5DFD5', outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit' }}
              ></textarea>
            </div>
          </div>
        </div>

        {/* SECTION 2: Image Upload */}
        <div style={{ background: '#FFFFFF', padding: '1.8rem', borderRadius: '20px', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0 0 1.2rem 0', color: '#2D2523' }}>🖼️ Product Images</h3>

          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
            {/* Image Upload Drop Zone */}
            <div style={{ flex: '1 1 260px', border: '2px dashed #C89B3C', background: '#FFFDF9', borderRadius: '16px', padding: '2rem 1.5rem', textAlign: 'center', position: 'relative' }}>
              <FaCloudUploadAlt style={{ fontSize: '2.5rem', color: '#C89B3C', marginBottom: '0.5rem' }} />
              <div style={{ fontWeight: 700, color: '#2D2523', fontSize: '0.9rem' }}>Drag & drop image file or click to select</div>
              <span style={{ fontSize: '0.75rem', color: '#7A6965' }}>Supports JPG, PNG, WEBP files</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageFileSelect}
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }}
              />
            </div>

            {/* Image Preview Box */}
            {imagePreviewUrl && (
              <div style={{ position: 'relative', width: '130px', height: '130px', borderRadius: '16px', overflow: 'hidden', border: '2px solid #C89B3C' }}>
                <img src={imagePreviewUrl} alt="Main Product Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <span style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(200,155,60,0.9)', color: '#FFF', fontSize: '0.68rem', fontWeight: 700, textAlign: 'center', padding: '3px 0' }}>
                  Main Image
                </span>
              </div>
            )}
          </div>
        </div>

        {/* SECTION 3: Stock & Status */}
        <div style={{ background: '#FFFFFF', padding: '1.8rem', borderRadius: '20px', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0 0 1.2rem 0', color: '#2D2523' }}>📦 Inventory & Status</h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.2rem' }}>
            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#2D2523', display: 'block', marginBottom: '4px' }}>SKU Code</label>
              <input
                type="text"
                value={formData.sku}
                onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                placeholder="SKU-DIY-1001"
                style={{ width: '100%', padding: '11px 14px', borderRadius: '10px', border: '1px solid #E5DFD5', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#2D2523', display: 'block', marginBottom: '4px' }}>Stock Quantity</label>
              <input
                type="number"
                value={formData.stockQuantity}
                onChange={(e) => setFormData({ ...formData, stockQuantity: e.target.value })}
                style={{ width: '100%', padding: '11px 14px', borderRadius: '10px', border: '1px solid #E5DFD5', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#2D2523', display: 'block', marginBottom: '4px' }}>Catalog Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                style={{ width: '100%', padding: '11px 14px', borderRadius: '10px', border: '1px solid #E5DFD5', outline: 'none', background: '#FFF', boxSizing: 'border-box' }}
              >
                <option value="ACTIVE">ACTIVE (Published)</option>
                <option value="INACTIVE">INACTIVE (Hidden)</option>
              </select>
            </div>
          </div>
        </div>

        {/* SECTION 4: Expandable Custom Product Fields */}
        <div style={{ background: '#FFFFFF', padding: '1.8rem', borderRadius: '20px', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0, color: '#2D2523' }}>🛠️ Custom Product Fields</h3>
              <p style={{ fontSize: '0.8rem', color: '#7A6965', margin: '2px 0 0 0' }}>Add expandable custom options (e.g., Custom Name, Size dropdown, Color picker, Photo upload)</p>
            </div>
            <button
              type="button"
              onClick={handleAddCustomField}
              style={{ background: '#FEF3C7', border: '1px solid #FCD34D', color: '#B45309', padding: '8px 16px', borderRadius: '50px', fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <FaPlus /> Add Custom Field
            </button>
          </div>

          {customFields.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '1.5rem', background: '#FAF8F5', borderRadius: '12px', color: '#7A6965', fontSize: '0.88rem' }}>
              No custom fields added yet. Click <strong>+ Add Custom Field</strong> above to define custom inputs.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {customFields.map((field) => (
                <div key={field.id} style={{ display: 'flex', gap: '12px', alignItems: 'center', background: '#FAF8F5', padding: '12px 14px', borderRadius: '12px', border: '1px solid #E5DFD5', flexWrap: 'wrap' }}>
                  <input
                    type="text"
                    placeholder="Field Name (e.g. Custom Name / Title)"
                    value={field.name}
                    onChange={(e) => handleCustomFieldChange(field.id, 'name', e.target.value)}
                    style={{ flex: '1 1 200px', padding: '9px 12px', borderRadius: '8px', border: '1px solid #E5DFD5', fontSize: '0.85rem' }}
                  />

                  <select
                    value={field.type}
                    onChange={(e) => handleCustomFieldChange(field.id, 'type', e.target.value)}
                    style={{ flex: '0 0 140px', padding: '9px 12px', borderRadius: '8px', border: '1px solid #E5DFD5', fontSize: '0.85rem', background: '#FFF' }}
                  >
                    {FIELD_TYPES.map((t) => (
                      <option key={t.value} value={t.value}>{t.label}</option>
                    ))}
                  </select>

                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={field.required}
                      onChange={(e) => handleCustomFieldChange(field.id, 'required', e.target.checked)}
                    />
                    Required
                  </label>

                  <button
                    type="button"
                    onClick={() => handleRemoveCustomField(field.id)}
                    style={{ background: '#FEE2E2', border: '1px solid #FCA5A5', color: '#DC2626', padding: '8px', borderRadius: '8px', cursor: 'pointer' }}
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit Actions */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
          <button
            type="button"
            onClick={() => navigate('/admin/products')}
            style={{ background: '#FAF8F5', border: '1px solid #D4C5B9', padding: '12px 24px', borderRadius: '50px', fontWeight: 700, cursor: 'pointer', fontSize: '0.9rem' }}
          >
            Cancel
          </button>
          <button
            type="submit"
            style={{ background: 'linear-gradient(135deg, #E8C86A 0%, #C89B3C 100%)', color: '#FFFFFF', border: 'none', padding: '12px 30px', borderRadius: '50px', fontWeight: 700, cursor: 'pointer', fontSize: '0.9rem', boxShadow: '0 4px 15px rgba(200,155,60,0.3)', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <FaSave /> {isEdit ? 'Save Changes' : 'Publish Product'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminAddEditProduct;
