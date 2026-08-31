import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  getStoredProducts,
  addProduct,
  updateProduct,
  getStoredCategories
} from '../../services/adminDataStore';
import { useAdminAuth } from '../../context/AdminAuthContext';
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
  const { adminUser } = useAdminAuth();
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

  // Persistent Multi-Image File Upload Handler
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const handleMultipleImagesSelect = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    const validFiles = files.filter(f => validTypes.includes(f.type.toLowerCase()) && f.size <= 5 * 1024 * 1024);

    if (validFiles.length < files.length) {
      alert('Some files were skipped because they are invalid format or exceed 5MB size limit.');
    }

    if (!validFiles.length) return;

    setIsUploadingImage(true);
    let readCount = 0;
    const newUrls = [];

    validFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        newUrls.push(event.target.result);
        readCount++;
        if (readCount === validFiles.length) {
          setFormData((prev) => {
            const currentList = Array.isArray(prev.images) && prev.images.length > 0 ? prev.images : (prev.image ? [prev.image] : []);
            const updatedImages = [...currentList, ...newUrls];
            const mainImg = prev.image || updatedImages[0] || '';
            setImagePreviewUrl(mainImg);
            return {
              ...prev,
              image: mainImg,
              images: updatedImages
            };
          });
          setIsUploadingImage(false);
        }
      };
      reader.onerror = () => {
        readCount++;
        if (readCount === validFiles.length) setIsUploadingImage(false);
      };
      reader.readAsDataURL(file);
    });

    // Reset input value so same files can be re-selected if needed
    e.target.value = '';
  };

  // Replace specific image by index
  const handleReplaceSingleImage = (index, file) => {
    if (!file) return;
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!validTypes.includes(file.type.toLowerCase())) {
      alert('Unsupported file format.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      const newUrl = event.target.result;
      setFormData((prev) => {
        const copy = [...(prev.images || [])];
        copy[index] = newUrl;
        const main = (index === 0 || prev.image === prev.images[index]) ? newUrl : prev.image;
        setImagePreviewUrl(main);
        return { ...prev, image: main, images: copy };
      });
    };
    reader.readAsDataURL(file);
  };

  // Delete specific image by index
  const handleDeleteImage = (index) => {
    setFormData((prev) => {
      const currentList = prev.images || [];
      if (currentList.length <= 1) {
        if (!confirm('This product must have at least 1 image. Are you sure you want to delete it?')) return prev;
      }
      const copy = currentList.filter((_, idx) => idx !== index);
      const newMain = copy[0] || '';
      setImagePreviewUrl(newMain);
      return { ...prev, image: newMain, images: copy };
    });
  };

  // Set specific image as Main Image
  const handleSetMainImage = (index) => {
    setFormData((prev) => {
      const targetImg = prev.images[index];
      if (!targetImg) return prev;
      setImagePreviewUrl(targetImg);
      return { ...prev, image: targetImg };
    });
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

    const parsedPrice = Number(formData.price);
    if (formData.price === '' || isNaN(parsedPrice) || parsedPrice <= 0) {
      alert('Please enter a valid price greater than 0');
      return;
    }

    const payload = {
      ...formData,
      price: parsedPrice,
      stockQuantity: Number(formData.stockQuantity) || 0,
      customFields: customFields.filter((f) => f.name.trim() !== '')
    };

    if (isEdit) {
      updateProduct(id, payload);
      setToastMessage('Product updated successfully!');
    } else {
      addProduct(payload, adminUser);
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
              <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#2D2523', display: 'block', marginBottom: '4px' }}>Price (₹) *</label>
              <input
                type="number"
                step="any"
                min="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="e.g. 1499.00"
                style={{ width: '100%', padding: '11px 14px', borderRadius: '10px', border: '1px solid #E5DFD5', outline: 'none', boxSizing: 'border-box' }}
                required
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

        {/* SECTION 2: Image Upload & Unlimited Multi-Image Gallery */}
        <div style={{ background: '#FFFFFF', padding: '1.8rem', borderRadius: '20px', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0, color: '#2D2523' }}>
              🖼️ Product / Label Images ({formData.images?.length || 0} Images)
            </h3>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, background: 'rgba(200,155,60,0.12)', color: '#C89B3C', padding: '4px 12px', borderRadius: '50px' }}>
              Unlimited Support
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Image Upload Drop Zone */}
            <div style={{ border: '2px dashed #C89B3C', background: '#FFFDF9', borderRadius: '16px', padding: '2rem 1.5rem', textAlign: 'center', position: 'relative' }}>
              <FaCloudUploadAlt style={{ fontSize: '2.5rem', color: '#C89B3C', marginBottom: '0.5rem' }} />
              <div style={{ fontWeight: 700, color: '#2D2523', fontSize: '0.95rem' }}>
                {isUploadingImage ? '⏳ Processing & Converting Images...' : 'Drag & drop image files or click to select multiple'}
              </div>
              <span style={{ fontSize: '0.78rem', color: '#7A6965' }}>Select 1, 4, 8, 10, 20+ JPG, PNG, WEBP files (Max 5MB each)</span>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleMultipleImagesSelect}
                disabled={isUploadingImage}
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }}
              />
            </div>

            {/* Unlimited Multi-Image Cards Grid */}
            {Array.isArray(formData.images) && formData.images.length > 0 && (
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#5A4A42', marginBottom: '10px' }}>
                  Uploaded Gallery ({formData.images.length} item{formData.images.length > 1 ? 's' : ''}):
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '14px' }}>
                  {formData.images.map((img, idx) => {
                    const isMain = formData.image === img || (idx === 0 && !formData.image);
                    return (
                      <div
                        key={idx}
                        style={{
                          position: 'relative',
                          borderRadius: '12px',
                          overflow: 'hidden',
                          border: isMain ? '2.5px solid #C89B3C' : '1px solid #E5DFD5',
                          background: '#FFF',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
                        }}
                      >
                        <div style={{ height: '110px', overflow: 'hidden', background: '#F8F6F2' }}>
                          <img src={getImageUrl(img)} alt={`Gallery Image ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>

                        {/* Top Badge */}
                        <div style={{ position: 'absolute', top: '6px', left: '6px' }}>
                          {isMain ? (
                            <span style={{ background: '#C89B3C', color: '#FFF', fontSize: '0.65rem', fontWeight: 700, padding: '2px 6px', borderRadius: '4px' }}>
                              ★ Main
                            </span>
                          ) : (
                            <span style={{ background: 'rgba(0,0,0,0.5)', color: '#FFF', fontSize: '0.65rem', fontWeight: 600, padding: '2px 6px', borderRadius: '4px' }}>
                              #{idx + 1}
                            </span>
                          )}
                        </div>

                        {/* Action Controls */}
                        <div style={{ padding: '6px', display: 'flex', flexDirection: 'column', gap: '4px', background: '#FFF' }}>
                          {!isMain && (
                            <button
                              type="button"
                              onClick={() => handleSetMainImage(idx)}
                              style={{ background: '#FFFDF5', border: '1px solid #C89B3C', color: '#C89B3C', fontSize: '0.68rem', fontWeight: 700, borderRadius: '4px', padding: '3px 0', cursor: 'pointer' }}
                            >
                              Set Main
                            </button>
                          )}

                          <div style={{ display: 'flex', gap: '4px' }}>
                            <label style={{ flex: 1, background: '#F3EFEA', color: '#2D2523', fontSize: '0.68rem', fontWeight: 600, borderRadius: '4px', padding: '3px 0', textAlign: 'center', cursor: 'pointer' }}>
                              Replace
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleReplaceSingleImage(idx, e.target.files && e.target.files[0])}
                                style={{ display: 'none' }}
                              />
                            </label>
                            <button
                              type="button"
                              onClick={() => handleDeleteImage(idx)}
                              style={{ flex: 1, background: '#FEE2E2', border: 'none', color: '#DC2626', fontSize: '0.68rem', fontWeight: 700, borderRadius: '4px', padding: '3px 0', cursor: 'pointer' }}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
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
