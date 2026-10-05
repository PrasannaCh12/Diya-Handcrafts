import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  getStoredProducts,
  addProduct,
  updateProduct,
  getStoredCategories
} from '../../services/adminDataStore';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { getImageUrl } from '../../utils/imageUtils';
import {
  FaCloudUploadAlt,
  FaTrash,
  FaPlus,
  FaSave,
  FaArrowLeft,
  FaCheck,
  FaTimes,
  FaExclamationTriangle
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

  const [categories, setCategories] = useState(() => {
    try {
      const cats = getStoredCategories();
      return Array.isArray(cats) ? cats : [];
    } catch (e) {
      console.error('Error initializing categories:', e);
      return [];
    }
  });

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    shortDesc: '',
    description: '',
    category: 'Thread Work',
    subCategory: '',
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

  // Image Upload State & Messages
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [imageError, setImageError] = useState('');
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  useEffect(() => {
    if (isEdit) {
      try {
        const products = getStoredProducts();
        if (Array.isArray(products)) {
          const target = products.find((p) => String(p.id) === String(id));
          if (target) {
            const rawImages = Array.isArray(target.images) && target.images.length > 0
              ? target.images
              : (target.image ? [target.image] : []);

            setFormData({
              name: target.name || '',
              shortDesc: target.shortDesc || '',
              description: target.description || '',
              category: target.category || 'Thread Work',
              subCategory: target.subCategory || '',
              price: target.price || '',
              discountPrice: target.discountPrice || '',
              sku: target.sku || `SKU-${target.id}`,
              stockQuantity: String(target.stockQuantity ?? 25),
              stockStatus: target.stockStatus || 'In Stock',
              rating: String(target.rating || '5.0'),
              status: target.status || 'ACTIVE',
              image: target.image || rawImages[0] || '',
              images: rawImages
            });
            setImagePreviewUrl(target.image || rawImages[0] || '');
            setCustomFields(Array.isArray(target.customFields) ? target.customFields : []);
          }
        }
      } catch (err) {
        console.error('Error fetching product details:', err);
      }
    }
  }, [id, isEdit]);

  // Safe Multi-Image Upload Handler
  const handleMultipleImagesSelect = (e) => {
    setImageError('');
    try {
      const fileList = e?.target?.files;
      if (!fileList || fileList.length === 0) return;

      const files = Array.from(fileList);
      const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
      const validFiles = [];
      let skippedCount = 0;

      for (const f of files) {
        if (!f) {
          skippedCount++;
          continue;
        }
        const lowerType = (f.type || '').toLowerCase();
        const fileName = (f.name || '').toLowerCase();
        const isValidExtension = /\.(jpg|jpeg|png|webp)$/i.test(fileName);
        const isValidType = validTypes.includes(lowerType) || isValidExtension;

        if (isValidType) {
          if (f.size <= 15 * 1024 * 1024) { // 15MB safe limit
            validFiles.push(f);
          } else {
            skippedCount++;
          }
        } else {
          skippedCount++;
        }
      }

      if (skippedCount > 0 && validFiles.length === 0) {
        setImageError('Unable to preview selected file(s). Please select valid JPG, JPEG, PNG, or WEBP images under 15MB.');
        if (e.target) e.target.value = '';
        return;
      } else if (skippedCount > 0) {
        setImageError('Some files were skipped because they exceed 15MB or are unsupported formats.');
      }

      if (!validFiles.length) {
        if (e.target) e.target.value = '';
        return;
      }

      setIsUploadingImage(true);
      let readCount = 0;
      const newUrls = [];

      validFiles.forEach((file) => {
        try {
          const reader = new FileReader();
          reader.onload = (event) => {
            try {
              const result = event?.target?.result;
              if (result) {
                newUrls.push(result);
              }
            } catch (err) {
              console.error('Error reading image data:', err);
              setImageError('Unable to preview this image. Please try another image.');
            } finally {
              readCount++;
              if (readCount === validFiles.length) {
                finalizeUpload(newUrls);
              }
            }
          };

          reader.onerror = (err) => {
            console.error('FileReader onerror triggered:', err);
            setImageError('Unable to preview this image. Please try another image.');
            readCount++;
            if (readCount === validFiles.length) {
              finalizeUpload(newUrls);
            }
          };

          reader.readAsDataURL(file);
        } catch (fileErr) {
          console.error('Error initiating file read:', fileErr);
          setImageError('Unable to preview this image. Please try another image.');
          readCount++;
          if (readCount === validFiles.length) {
            finalizeUpload(newUrls);
          }
        }
      });
    } catch (globalErr) {
      console.error('Global image selection error:', globalErr);
      setImageError('Unable to preview this image. Please try another image.');
      setIsUploadingImage(false);
    } finally {
      if (e?.target) {
        e.target.value = '';
      }
    }
  };

  const finalizeUpload = (newUrls) => {
    if (newUrls && newUrls.length > 0) {
      setFormData((prev) => {
        const currentList = Array.isArray(prev.images) ? prev.images : (prev.image ? [prev.image] : []);
        const updatedImages = [...currentList, ...newUrls];
        const mainImg = prev.image || updatedImages[0] || '';
        setImagePreviewUrl(mainImg);
        return {
          ...prev,
          image: mainImg,
          images: updatedImages
        };
      });
    }
    setIsUploadingImage(false);
  };

  // Safe replace single image by index
  const handleReplaceSingleImage = (index, file) => {
    setImageError('');
    if (!file || !(file instanceof File)) return;
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    const lowerType = (file.type || '').toLowerCase();
    const fileName = (file.name || '').toLowerCase();
    const isValidExtension = /\.(jpg|jpeg|png|webp)$/i.test(fileName);

    if (!validTypes.includes(lowerType) && !isValidExtension) {
      setImageError('Unsupported file format. Please select JPG, PNG, or WEBP.');
      return;
    }

    try {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const newUrl = event?.target?.result;
          if (!newUrl) return;
          setFormData((prev) => {
            const copy = Array.isArray(prev.images) ? [...prev.images] : [];
            copy[index] = newUrl;
            const main = (index === 0 || prev.image === prev.images?.[index]) ? newUrl : prev.image;
            setImagePreviewUrl(main);
            return { ...prev, image: main, images: copy };
          });
        } catch (err) {
          console.error('Error setting replaced image:', err);
          setImageError('Unable to preview this image. Please try another image.');
        }
      };

      reader.onerror = (err) => {
        console.error('Replace image error:', err);
        setImageError('Unable to preview this image. Please try another image.');
      };

      reader.readAsDataURL(file);
    } catch (err) {
      console.error('Error initiating file replace:', err);
      setImageError('Unable to preview this image. Please try another image.');
    }
  };

  // Safe delete specific image by index
  const handleDeleteImage = (index) => {
    setImageError('');
    setFormData((prev) => {
      const currentList = Array.isArray(prev.images) ? prev.images : [];
      if (currentList.length <= 1) {
        if (!confirm('This product will have no remaining images. Are you sure you want to delete it?')) return prev;
      }
      const copy = currentList.filter((_, idx) => idx !== index);
      const newMain = copy[0] || '';
      setImagePreviewUrl(newMain);
      return { ...prev, image: newMain, images: copy };
    });
  };

  // Safe set specific image as Main Image
  const handleSetMainImage = (index) => {
    setFormData((prev) => {
      const imagesList = Array.isArray(prev.images) ? prev.images : [];
      const targetImg = imagesList[index];
      if (!targetImg) return prev;
      setImagePreviewUrl(targetImg);
      return { ...prev, image: targetImg };
    });
  };

  // Custom Fields Handlers
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
      Array.isArray(prev) ? prev.map((f) => (f.id === fieldId ? { ...f, [key]: value } : f)) : []
    );
  };

  const handleRemoveCustomField = (fieldId) => {
    setCustomFields((prev) =>
      Array.isArray(prev) ? prev.filter((f) => f.id !== fieldId) : []
    );
  };

  // Submit Handler
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
      customFields: Array.isArray(customFields) ? customFields.filter((f) => f && f.name && f.name.trim() !== '') : []
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

  const safeImages = Array.isArray(formData.images) ? formData.images : [];

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
                {(Array.isArray(categories) ? categories : []).map((c) => {
                  const catName = typeof c === 'string' ? c : (c?.name || c?.title || '');
                  if (!catName) return null;
                  return (
                    <option key={typeof c === 'string' ? c : (c?.id || catName)} value={catName}>
                      {catName}
                    </option>
                  );
                })}
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
              🖼️ Product / Label Images ({safeImages.length} Image{safeImages.length === 1 ? '' : 's'})
            </h3>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, background: 'rgba(200,155,60,0.12)', color: '#C89B3C', padding: '4px 12px', borderRadius: '50px' }}>
              Unlimited Support
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Inline Graceful Error Banner */}
            {imageError && (
              <div style={{ background: '#FEF2F2', border: '1px solid #FCA5A5', color: '#991B1B', padding: '10px 14px', borderRadius: '10px', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FaExclamationTriangle style={{ color: '#DC2626', flexShrink: 0 }} />
                <span>{imageError}</span>
                <button type="button" onClick={() => setImageError('')} style={{ marginLeft: 'auto', background: 'none', border: 'none', color: '#991B1B', cursor: 'pointer', fontWeight: 700 }}>✕</button>
              </div>
            )}

            {/* Image Upload Drop Zone */}
            <div style={{ border: '2px dashed #C89B3C', background: '#FFFDF9', borderRadius: '16px', padding: '2rem 1.5rem', textAlign: 'center', position: 'relative' }}>
              <FaCloudUploadAlt style={{ fontSize: '2.5rem', color: '#C89B3C', marginBottom: '0.5rem' }} />
              <div style={{ fontWeight: 700, color: '#2D2523', fontSize: '0.95rem' }}>
                {isUploadingImage ? '⏳ Processing & Loading Images...' : 'Drag & drop image files or click to select'}
              </div>
              <span style={{ fontSize: '0.78rem', color: '#7A6965' }}>Supports JPG, JPEG, PNG, WEBP files</span>
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/jpg"
                multiple
                onChange={handleMultipleImagesSelect}
                disabled={isUploadingImage}
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }}
              />
            </div>

            {/* Unlimited Multi-Image Cards Grid with Full Aspect Ratio Preservation */}
            {safeImages.length > 0 && (
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#5A4A42', marginBottom: '10px' }}>
                  Uploaded Gallery ({safeImages.length} item{safeImages.length > 1 ? 's' : ''}):
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '14px' }}>
                  {safeImages.map((img, idx) => {
                    const isMain = formData.image === img || (idx === 0 && !formData.image);
                    const resolvedSrc = getImageUrl(img);

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
                        {/* Aspect Ratio Preserving Preview Box */}
                        <div style={{ height: '140px', overflow: 'hidden', background: '#FAF8F5', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4px' }}>
                          <img
                            src={resolvedSrc}
                            alt={`Gallery Image ${idx + 1}`}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = '/logo192.png';
                            }}
                            style={{ maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto', objectFit: 'contain', display: 'block', margin: 'auto' }}
                          />
                        </div>

                        {/* Top Badge */}
                        <div style={{ position: 'absolute', top: '6px', left: '6px' }}>
                          {isMain ? (
                            <span style={{ background: '#C89B3C', color: '#FFF', fontSize: '0.65rem', fontWeight: 700, padding: '2px 6px', borderRadius: '4px', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }}>
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
                                accept="image/jpeg,image/png,image/webp,image/jpg"
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
