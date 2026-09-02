import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getStoredCategories,
  getStoredProducts,
  subscribeToDataStore,
  addCategory,
  updateCategory,
  deleteCategory,
  updateCollectionProducts
} from '../../services/adminDataStore';
import {
  FaLayerGroup,
  FaPlus,
  FaEdit,
  FaTrash,
  FaEye,
  FaExternalLinkAlt,
  FaBoxOpen,
  FaSearch,
  FaEllipsisV,
  FaTimes,
  FaCheck,
  FaExclamationTriangle,
  FaTasks
} from 'react-icons/fa';

const DEFAULT_ICONS = {
  'Thread Work': '🧵',
  'Resin Art': '🎨',
  'Chocolates': '🍫',
  'Biscuits': '🍪',
  'Wedding & Marriage Items': '💍',
  'Customized Chains': '📿',
  'Customized Gifts': '🎁',
  'Customized Dolls': '🧸'
};

const COLLECTION_PATHS = {
  'Thread Work': '/threadwork',
  'Resin Art': '/resinart',
  'Chocolates': '/chocolates',
  'Biscuits': '/biscuits',
  'Wedding & Marriage Items': '/wedding-marriage-items',
  'Customized Chains': '/customized-chains',
  'Customized Gifts': '/customized-gifts',
  'Customized Dolls': '/customized-dolls'
};

const generateSlug = (name) => {
  return (name || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '') || 'collection';
};

const AdminCollections = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState(() => getStoredCategories());
  const [products, setProducts] = useState(() => getStoredProducts());
  const [searchTerm, setSearchTerm] = useState('');
  const [activeMenuId, setActiveMenuId] = useState(null);

  // Toast Notification State
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  // Add / Edit Modal State
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [editingCollection, setEditingCollection] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    icon: '✨',
    description: '',
    status: 'ACTIVE',
    displayOrder: 1,
    slug: ''
  });

  // Delete Modal State
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [collectionToDelete, setCollectionToDelete] = useState(null);

  // Manage Products Modal State
  const [manageModalOpen, setManageModalOpen] = useState(false);
  const [managingCollection, setManagingCollection] = useState(null);
  const [productSearchTerm, setProductSearchTerm] = useState('');
  const [selectedProductIds, setSelectedProductIds] = useState([]);

  useEffect(() => {
    const unsub = subscribeToDataStore(() => {
      setCategories(getStoredCategories());
      setProducts(getStoredProducts());
    });
    return unsub;
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: 'success' });
    }, 4000);
  };

  const getProductCount = (categoryName) => {
    return products.filter((p) => p.category === categoryName || p.category?.includes(categoryName)).length;
  };

  const filteredCategories = useMemo(() => {
    return categories.filter((c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (c.description && c.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [categories, searchTerm]);

  // Open Add Collection Modal
  const handleOpenAddModal = () => {
    setEditingCollection(null);
    const nextOrder = categories.length + 1;
    setFormData({
      name: '',
      icon: '✨',
      description: '',
      status: 'ACTIVE',
      displayOrder: nextOrder,
      slug: ''
    });
    setFormModalOpen(true);
    setActiveMenuId(null);
  };

  // Open Edit Collection Modal
  const handleOpenEditModal = (col) => {
    setEditingCollection(col);
    setFormData({
      name: col.name || '',
      icon: col.icon || DEFAULT_ICONS[col.name] || '✨',
      description: col.description || '',
      status: col.status || 'ACTIVE',
      displayOrder: col.displayOrder || 1,
      slug: col.slug || generateSlug(col.name)
    });
    setFormModalOpen(true);
    setActiveMenuId(null);
  };

  // Handle Name Input Change (Auto-generate slug)
  const handleNameChange = (e) => {
    const val = e.target.value;
    setFormData((prev) => ({
      ...prev,
      name: val,
      slug: generateSlug(val)
    }));
  };

  // Save Collection (Add / Edit)
  const handleSaveCollection = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      showToast('Collection name is required.', 'error');
      return;
    }
    if (!formData.description.trim()) {
      showToast('Short description is required.', 'error');
      return;
    }

    if (editingCollection) {
      updateCategory(editingCollection.id, formData);
      showToast('Collection updated successfully.');
    } else {
      addCategory(formData);
      showToast('Collection created successfully.');
    }

    setFormModalOpen(false);
  };

  // Open Delete Confirmation Modal
  const handleOpenDeleteModal = (col) => {
    setCollectionToDelete(col);
    setDeleteModalOpen(true);
    setActiveMenuId(null);
  };

  // Execute Delete (Safety Option A)
  const handleConfirmDelete = () => {
    if (!collectionToDelete) return;
    const count = getProductCount(collectionToDelete.name);

    if (count > 0) {
      showToast('Unable to delete collection because it contains products.', 'error');
      return;
    }

    const res = deleteCategory(collectionToDelete.id);
    if (res && res.success === false) {
      showToast(res.message, 'error');
    } else {
      showToast('Collection deleted successfully.');
      setDeleteModalOpen(false);
      setCollectionToDelete(null);
    }
  };

  // Open Manage Products Modal
  const handleOpenManageProductsModal = (col) => {
    setManagingCollection(col);
    const assignedIds = products
      .filter((p) => p.category === col.name || p.category?.includes(col.name))
      .map((p) => p.id);
    setSelectedProductIds(assignedIds);
    setProductSearchTerm('');
    setManageModalOpen(true);
    setActiveMenuId(null);
  };

  // Toggle Product Selection in Manage Modal
  const handleToggleProductSelection = (productId) => {
    setSelectedProductIds((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  // Save Product Assignments
  const handleSaveManagedProducts = () => {
    if (!managingCollection) return;
    updateCollectionProducts(managingCollection.name, selectedProductIds);
    showToast('Products updated for collection.');
    setManageModalOpen(false);
    setManagingCollection(null);
  };

  const filteredModalProducts = products.filter((p) =>
    p.name.toLowerCase().includes(productSearchTerm.toLowerCase()) ||
    (p.sku && p.sku.toLowerCase().includes(productSearchTerm.toLowerCase()))
  );

  return (
    <div className="admin-collections-page" style={{ padding: '0.5rem 0' }}>
      {/* Toast Notification */}
      {toast.show && (
        <div
          style={{
            position: 'fixed',
            top: '80px',
            right: '20px',
            background: toast.type === 'error' ? '#FEE2E2' : '#DCFCE7',
            border: `1px solid ${toast.type === 'error' ? '#FCA5A5' : '#86EFAC'}`,
            color: toast.type === 'error' ? '#991B1B' : '#15803D',
            padding: '12px 22px',
            borderRadius: '50px',
            fontWeight: 700,
            fontSize: '0.88rem',
            zIndex: 99999,
            boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            animation: 'fadeIn 0.25s ease'
          }}
        >
          {toast.type === 'error' ? <FaExclamationTriangle /> : <FaCheck />}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', fontWeight: 700, margin: 0, color: '#2D2523', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FaLayerGroup style={{ color: '#C89B3C' }} /> Explore Collections Studio
          </h1>
          <p style={{ fontSize: '0.85rem', color: '#7A6965', margin: '4px 0 0 0' }}>
            Manage handcrafted product collections, assign items, and control customer storefront visibility.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <button
            onClick={() => navigate('/admin/products/add')}
            type="button"
            style={{
              background: '#FAF8F5',
              color: '#2D2523',
              border: '1.5px solid #C89B3C',
              padding: '10px 20px',
              borderRadius: '50px',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <FaPlus /> + Add Product To Collection
          </button>

          <button
            onClick={handleOpenAddModal}
            type="button"
            style={{
              background: 'linear-gradient(135deg, #E8C86A 0%, #C89B3C 100%)',
              color: '#FFFFFF',
              border: 'none',
              padding: '10px 24px',
              borderRadius: '50px',
              fontWeight: 700,
              fontSize: '0.88rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 16px rgba(200,155,60,0.35)',
              transition: 'transform 0.2s ease'
            }}
          >
            <FaPlus /> + Add Collection
          </button>
        </div>
      </div>

      {/* Dynamic Search Bar */}
      <div style={{ background: '#FFFFFF', padding: '1rem 1.25rem', borderRadius: '16px', border: '1px solid rgba(212,175,55,0.2)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%', maxWidth: '400px', background: '#FAF8F5', padding: '8px 14px', borderRadius: '10px', border: '1px solid #E5DFD5' }}>
          <FaSearch style={{ color: '#7A6965', fontSize: '0.85rem' }} />
          <input
            type="text"
            placeholder="Search collections..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%', border: 'none', background: 'transparent', outline: 'none', fontSize: '0.88rem', color: '#2D2523' }}
          />
        </div>

        <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#5A4A42' }}>
          Showing <strong>{filteredCategories.length}</strong> Collection{filteredCategories.length === 1 ? '' : 's'}
        </div>
      </div>

      {/* Collections Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: '1.35rem' }}>
        {filteredCategories.map((col) => {
          const count = getProductCount(col.name);
          const icon = col.icon || DEFAULT_ICONS[col.name] || '✨';
          const path = COLLECTION_PATHS[col.name] || '/shop';
          const isMenuActive = activeMenuId === col.id;

          return (
            <div
              key={col.id}
              style={{
                background: '#FFFFFF',
                borderRadius: '18px',
                border: '1px solid rgba(212, 175, 55, 0.25)',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                justify: 'space-between',
                boxShadow: '0 4px 18px rgba(0,0,0,0.04)',
                position: 'relative',
                transition: 'transform 0.25s ease, box-shadow 0.25s ease'
              }}
            >
              <div>
                {/* Header Badge, Status & Three-Dot Menu (⋮) */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '2.2rem', background: '#FFFDF9', padding: '8px', borderRadius: '14px', border: '1px solid #F5E8C7' }}>
                    {icon}
                  </span>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', position: 'relative' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '4px 12px', borderRadius: '50px', background: col.status === 'ACTIVE' ? '#DCFCE7' : '#FEE2E2', color: col.status === 'ACTIVE' ? '#15803D' : '#DC2626' }}>
                      {col.status || 'ACTIVE'}
                    </span>

                    {/* Three-Dot Menu Trigger */}
                    <button
                      onClick={() => setActiveMenuId(isMenuActive ? null : col.id)}
                      type="button"
                      aria-label="Collection options"
                      style={{
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#7A6965',
                        fontSize: '1.1rem',
                        padding: '6px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justify: 'center'
                      }}
                    >
                      <FaEllipsisV />
                    </button>

                    {/* Dropdown Options Popup */}
                    {isMenuActive && (
                      <div
                        style={{
                          position: 'absolute',
                          top: '100%',
                          right: '0',
                          marginTop: '6px',
                          background: '#FFFFFF',
                          borderRadius: '12px',
                          border: '1px solid #E5DFD5',
                          boxShadow: '0 10px 30px rgba(0,0,0,0.12)',
                          width: '160px',
                          zIndex: 100,
                          overflow: 'hidden'
                        }}
                      >
                        <button
                          onClick={() => handleOpenEditModal(col)}
                          type="button"
                          style={{
                            width: '100%',
                            textAlign: 'left',
                            background: 'none',
                            border: 'none',
                            padding: '10px 14px',
                            fontSize: '0.85rem',
                            fontWeight: 600,
                            color: '#2D2523',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                          }}
                        >
                          <FaEdit style={{ color: '#C89B3C' }} /> Edit Collection
                        </button>
                        <button
                          onClick={() => handleOpenDeleteModal(col)}
                          type="button"
                          style={{
                            width: '100%',
                            textAlign: 'left',
                            background: 'none',
                            border: 'none',
                            padding: '10px 14px',
                            fontSize: '0.85rem',
                            fontWeight: 600,
                            color: '#DC2626',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            borderTop: '1px solid #F5E8C7'
                          }}
                        >
                          <FaTrash /> Delete Collection
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 700, color: '#2D2523', margin: '0 0 0.4rem 0' }}>
                  {col.name}
                </h3>
                <p style={{ fontSize: '0.84rem', color: '#7A6965', lineHeight: 1.45, margin: '0 0 1rem 0' }}>
                  {col.description || 'Exclusive handcrafted collection studio.'}
                </p>
              </div>

              {/* Footer Meta & Actions */}
              <div style={{ borderTop: '1px solid #F5E8C7', paddingTop: '1rem', marginTop: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
                  <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#5A4A42', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <FaBoxOpen style={{ color: '#C89B3C' }} /> <strong>{count}</strong> Product{count === 1 ? '' : 's'}
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => navigate('/admin/products')}
                    type="button"
                    style={{ flex: 1, minWidth: '85px', background: '#FAF8F5', border: '1px solid #D4C5B9', padding: '8px 10px', borderRadius: '8px', fontSize: '0.78rem', fontWeight: 700, color: '#2D2523', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}
                  >
                    <FaEye /> View Catalog
                  </button>

                  <button
                    onClick={() => handleOpenManageProductsModal(col)}
                    type="button"
                    style={{ flex: 1.2, minWidth: '105px', background: '#FFFDF9', border: '1px solid #C89B3C', padding: '8px 10px', borderRadius: '8px', fontSize: '0.78rem', fontWeight: 700, color: '#C89B3C', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}
                  >
                    <FaTasks /> Manage Products
                  </button>

                  <a
                    href={path}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ flex: 0.9, minWidth: '75px', background: 'rgba(200,155,60,0.12)', border: '1px solid #C89B3C', padding: '8px 10px', borderRadius: '8px', fontSize: '0.78rem', fontWeight: 700, color: '#C89B3C', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}
                  >
                    <FaExternalLinkAlt /> Preview ↗
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 1 & 2: ADD / EDIT COLLECTION MODAL */}
      {formModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(20,15,25,0.65)', backdropFilter: 'blur(4px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div style={{ width: '100%', maxWidth: '520px', background: '#FFFFFF', borderRadius: '20px', padding: '1.75rem', boxShadow: '0 20px 50px rgba(0,0,0,0.2)', border: '1px solid #D4AF37', position: 'relative' }}>
            <button onClick={() => setFormModalOpen(false)} type="button" style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', fontSize: '1.1rem', color: '#7A6965', cursor: 'pointer' }}>
              <FaTimes />
            </button>

            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', fontWeight: 700, color: '#2D2523', margin: '0 0 1.25rem 0' }}>
              {editingCollection ? 'Edit Collection' : '+ Add New Collection'}
            </h2>

            <form onSubmit={handleSaveCollection} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#3D2B1F', marginBottom: '4px' }}>
                  Collection Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleNameChange}
                  placeholder="e.g. Resin Art"
                  style={{ width: '100%', height: '44px', borderRadius: '10px', border: '1.5px solid #C89B3C', padding: '0 12px', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#3D2B1F', marginBottom: '4px' }}>
                    Icon / Emoji
                  </label>
                  <input
                    type="text"
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    placeholder="e.g. 🎨"
                    style={{ width: '100%', height: '44px', borderRadius: '10px', border: '1.5px solid rgba(200,155,60,0.3)', padding: '0 12px', fontSize: '1.1rem', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#3D2B1F', marginBottom: '4px' }}>
                    Display Order
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.displayOrder}
                    onChange={(e) => setFormData({ ...formData, displayOrder: e.target.value })}
                    style={{ width: '100%', height: '44px', borderRadius: '10px', border: '1.5px solid rgba(200,155,60,0.3)', padding: '0 12px', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#3D2B1F', marginBottom: '4px' }}>
                  Slug (Auto-generated)
                </label>
                <input
                  type="text"
                  readOnly
                  value={formData.slug}
                  style={{ width: '100%', height: '40px', borderRadius: '10px', border: '1px solid #E5DFD5', background: '#FAF8F5', padding: '0 12px', fontSize: '0.85rem', color: '#7A6965', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#3D2B1F', marginBottom: '4px' }}>
                  Short Description *
                </label>
                <textarea
                  rows="3"
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe this collection..."
                  style={{ width: '100%', borderRadius: '10px', border: '1.5px solid rgba(200,155,60,0.3)', padding: '10px 12px', fontSize: '0.88rem', outline: 'none', boxSizing: 'border-box' }}
                ></textarea>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#3D2B1F', marginBottom: '6px' }}>
                  Collection Status
                </label>
                <div style={{ display: 'flex', gap: '1.5rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.88rem', fontWeight: 600, cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="status"
                      value="ACTIVE"
                      checked={formData.status === 'ACTIVE'}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    />
                    <span style={{ color: '#15803D' }}>Active (Visible on Website)</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.88rem', fontWeight: 600, cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="status"
                      value="INACTIVE"
                      checked={formData.status === 'INACTIVE'}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    />
                    <span style={{ color: '#DC2626' }}>Inactive (Hidden from Website)</span>
                  </label>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '1rem' }}>
                <button
                  type="button"
                  onClick={() => setFormModalOpen(false)}
                  style={{ background: '#FAF8F5', border: '1px solid #D4C5B9', padding: '10px 20px', borderRadius: '10px', fontWeight: 600, fontSize: '0.88rem', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ background: 'linear-gradient(135deg, #E8C86A 0%, #C89B3C 100%)', color: '#FFFFFF', border: 'none', padding: '10px 24px', borderRadius: '10px', fontWeight: 700, fontSize: '0.88rem', cursor: 'pointer', boxShadow: '0 4px 14px rgba(200,155,60,0.3)' }}
                >
                  {editingCollection ? 'Save Changes' : 'Save Collection'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3: DELETE CONFIRMATION MODAL */}
      {deleteModalOpen && collectionToDelete && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(20,15,25,0.65)', backdropFilter: 'blur(4px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div style={{ width: '100%', maxWidth: '440px', background: '#FFFFFF', borderRadius: '20px', padding: '1.75rem', boxShadow: '0 20px 50px rgba(0,0,0,0.2)', border: '1px solid #FCA5A5', position: 'relative' }}>
            <button onClick={() => setDeleteModalOpen(false)} type="button" style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', fontSize: '1.1rem', color: '#7A6965', cursor: 'pointer' }}>
              <FaTimes />
            </button>

            <div style={{ textAlign: 'center' }}>
              <div style={{ width: '54px', height: '54px', borderRadius: '50%', background: '#FEE2E2', color: '#DC2626', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem', margin: '0 auto 1rem' }}>
                <FaExclamationTriangle />
              </div>

              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', fontWeight: 700, color: '#2D2523', margin: '0 0 0.5rem 0' }}>
                Delete Collection?
              </h3>

              <p style={{ fontSize: '0.9rem', color: '#5A4A42', margin: '0 0 1rem 0' }}>
                Are you sure you want to delete <strong>'{collectionToDelete.name}'</strong>?
              </p>

              {getProductCount(collectionToDelete.name) > 0 ? (
                <div style={{ background: '#FFF5F5', border: '1px solid #FECDD3', padding: '1rem', borderRadius: '12px', color: '#991B1B', fontSize: '0.85rem', fontWeight: 600, textAlign: 'left', marginBottom: '1.5rem' }}>
                  ⚠️ This collection currently contains <strong>{getProductCount(collectionToDelete.name)}</strong> product{getProductCount(collectionToDelete.name) === 1 ? '' : 's'}.<br />
                  <span style={{ fontSize: '0.8rem', fontWeight: 500, display: 'block', marginTop: '4px' }}>
                    This collection contains products. Please move or remove the products before deleting this collection.
                  </span>
                </div>
              ) : (
                <p style={{ fontSize: '0.82rem', color: '#7A6965', margin: '0 0 1.5rem 0' }}>
                  This action is permanent. No products will be lost.
                </p>
              )}

              <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
                <button
                  type="button"
                  onClick={() => setDeleteModalOpen(false)}
                  style={{ background: '#FAF8F5', border: '1px solid #D4C5B9', padding: '10px 20px', borderRadius: '10px', fontWeight: 600, fontSize: '0.88rem', cursor: 'pointer' }}
                >
                  Cancel
                </button>

                {getProductCount(collectionToDelete.name) === 0 && (
                  <button
                    type="button"
                    onClick={handleConfirmDelete}
                    style={{ background: '#DC2626', color: '#FFFFFF', border: 'none', padding: '10px 22px', borderRadius: '10px', fontWeight: 700, fontSize: '0.88rem', cursor: 'pointer', boxShadow: '0 4px 14px rgba(220,38,38,0.3)' }}
                  >
                    Delete Collection
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4: MANAGE PRODUCTS IN COLLECTION MODAL */}
      {manageModalOpen && managingCollection && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(20,15,25,0.65)', backdropFilter: 'blur(4px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div style={{ width: '100%', maxWidth: '580px', background: '#FFFFFF', borderRadius: '20px', padding: '1.75rem', boxShadow: '0 20px 50px rgba(0,0,0,0.2)', border: '1px solid #D4AF37', position: 'relative', maxHeight: '85vh', display: 'flex', flexDirection: 'column' }}>
            <button onClick={() => setManageModalOpen(false)} type="button" style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', fontSize: '1.1rem', color: '#7A6965', cursor: 'pointer' }}>
              <FaTimes />
            </button>

            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', fontWeight: 700, color: '#2D2523', margin: '0 0 0.2rem 0' }}>
              Manage Products: {managingCollection.name}
            </h3>
            <p style={{ fontSize: '0.82rem', color: '#7A6965', margin: '0 0 1rem 0' }}>
              Select products to assign to this collection. Removing a product does NOT delete the product itself.
            </p>

            {/* Filter Search inside Modal */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#FAF8F5', padding: '8px 12px', borderRadius: '10px', border: '1px solid #E5DFD5', marginBottom: '1rem' }}>
              <FaSearch style={{ color: '#7A6965', fontSize: '0.85rem' }} />
              <input
                type="text"
                placeholder="Search catalog products..."
                value={productSearchTerm}
                onChange={(e) => setProductSearchTerm(e.target.value)}
                style={{ width: '100%', border: 'none', background: 'transparent', outline: 'none', fontSize: '0.85rem', color: '#2D2523' }}
              />
            </div>

            {/* Products Selection List */}
            <div style={{ flex: 1, overflowY: 'auto', border: '1px solid #E5DFD5', borderRadius: '12px', padding: '8px', display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '1.25rem' }}>
              {filteredModalProducts.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '2rem 1rem', color: '#7A6965', fontSize: '0.88rem' }}>
                  No products found matching your search.
                </div>
              ) : (
                filteredModalProducts.map((p) => {
                  const isChecked = selectedProductIds.includes(p.id);
                  return (
                    <label
                      key={p.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justify: 'space-between',
                        padding: '10px 12px',
                        borderRadius: '10px',
                        background: isChecked ? '#FFFDF9' : '#FFFFFF',
                        border: `1.5px solid ${isChecked ? '#C89B3C' : '#F0EBE1'}`,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleToggleProductSelection(p.id)}
                          style={{ width: '18px', height: '18px', accentColor: '#C89B3C', cursor: 'pointer' }}
                        />
                        <div>
                          <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#2D2523' }}>
                            {p.name}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: '#7A6965' }}>
                            {p.category || 'General'} • ₹{Number(p.price || 0).toLocaleString('en-IN')}
                          </div>
                        </div>
                      </div>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '2px 8px', borderRadius: '50px', background: isChecked ? '#DCFCE7' : '#F5E8C7', color: isChecked ? '#15803D' : '#7A6965' }}>
                        {isChecked ? 'Included' : 'Not Included'}
                      </span>
                    </label>
                  );
                })
              )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#5A4A42' }}>
                Selected: <strong>{selectedProductIds.length}</strong> Products
              </span>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => setManageModalOpen(false)}
                  style={{ background: '#FAF8F5', border: '1px solid #D4C5B9', padding: '8px 16px', borderRadius: '10px', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveManagedProducts}
                  style={{ background: 'linear-gradient(135deg, #E8C86A 0%, #C89B3C 100%)', color: '#FFFFFF', border: 'none', padding: '8px 20px', borderRadius: '10px', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', boxShadow: '0 4px 14px rgba(200,155,60,0.3)' }}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCollections;
