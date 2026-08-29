import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext';
import {
  getStoredProducts,
  getStoredArchivedProducts,
  archiveProduct,
  restoreProduct,
  subscribeToDataStore
} from '../../services/adminDataStore';
import { getImageUrl } from '../../utils/imageUtils';
import {
  FaPlus,
  FaSearch,
  FaEdit,
  FaTrash,
  FaUndo,
  FaEye,
  FaFilter,
  FaBoxOpen,
  FaTimes
} from 'react-icons/fa';

const AdminProducts = () => {
  const { hasPermission } = useAdminAuth();
  const [activeTab, setActiveTab] = useState('ACTIVE'); // 'ACTIVE' or 'ARCHIVED'
  const [products, setProducts] = useState(getStoredProducts());
  const [archivedProducts, setArchivedProducts] = useState(getStoredArchivedProducts());

  // Search, Filter & Sort State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedStockStatus, setSelectedStockStatus] = useState('ALL');
  const [sortBy, setSortBy] = useState('NEWEST');

  // Modal State for Preview & Confirm Delete
  const [previewProduct, setPreviewProduct] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  useEffect(() => {
    const unsub = subscribeToDataStore(() => {
      setProducts(getStoredProducts());
      setArchivedProducts(getStoredArchivedProducts());
    });
    return unsub;
  }, []);

  const handleArchive = (id) => {
    archiveProduct(id);
    setConfirmDeleteId(null);
  };

  const handleRestore = (id) => {
    restoreProduct(id);
  };

  // Filter & Sort Logic
  const currentList = activeTab === 'ACTIVE' ? products : archivedProducts;

  const filteredProducts = currentList.filter((p) => {
    const matchesSearch =
      (p.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.sku || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.category || '').toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'ALL' || p.category === selectedCategory;

    const isOutOfStock = Number(p.stockQuantity) <= 0 || p.stockStatus === 'Out of Stock';
    const matchesStock =
      selectedStockStatus === 'ALL' ||
      (selectedStockStatus === 'IN_STOCK' && !isOutOfStock) ||
      (selectedStockStatus === 'OUT_OF_STOCK' && isOutOfStock);

    return matchesSearch && matchesCategory && matchesStock;
  });

  // Sort Logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'PRICE_LOW') return Number(a.price || 0) - Number(b.price || 0);
    if (sortBy === 'PRICE_HIGH') return Number(b.price || 0) - Number(a.price || 0);
    if (sortBy === 'NAME_AZ') return (a.name || '').localeCompare(b.name || '');
    if (sortBy === 'NAME_ZA') return (b.name || '').localeCompare(a.name || '');
    return 0; // Default NEWEST
  });

  return (
    <div className="admin-products-page">
      {/* Header Banner */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.85rem', fontWeight: 700, color: '#2D2523', margin: 0 }}>
            Product Catalog Management
          </h1>
          <p style={{ fontSize: '0.9rem', color: '#7A6965', margin: '4px 0 0 0' }}>
            Manage catalog items, custom inputs, pricing & soft-deleted archives
          </p>
        </div>

        {hasPermission('canAddProducts') && (
          <NavLink
            to="/admin/products/add"
            style={{
              background: 'linear-gradient(135deg, #E8C86A 0%, #C89B3C 100%)',
              color: '#FFFFFF',
              padding: '10px 22px',
              borderRadius: '50px',
              fontWeight: 700,
              textDecoration: 'none',
              fontSize: '0.88rem',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 4px 12px rgba(200, 155, 60, 0.3)'
            }}
          >
            <FaPlus /> Add Product
          </NavLink>
        )}
      </div>

      {/* Tabs: Active vs Archived */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '1.5rem', borderBottom: '2px solid #E5DFD5', paddingBottom: '0.5rem' }}>
        <button
          onClick={() => setActiveTab('ACTIVE')}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '0.95rem',
            fontWeight: 700,
            color: activeTab === 'ACTIVE' ? '#C89B3C' : '#7A6965',
            cursor: 'pointer',
            padding: '6px 12px',
            borderBottom: activeTab === 'ACTIVE' ? '3px solid #C89B3C' : 'none',
            marginBottom: '-0.6rem'
          }}
        >
          Active Products ({products.length})
        </button>

        {hasPermission('canRestoreProducts') && (
          <button
            onClick={() => setActiveTab('ARCHIVED')}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '0.95rem',
              fontWeight: 700,
              color: activeTab === 'ARCHIVED' ? '#C89B3C' : '#7A6965',
              cursor: 'pointer',
              padding: '6px 12px',
              borderBottom: activeTab === 'ARCHIVED' ? '3px solid #C89B3C' : 'none',
              marginBottom: '-0.6rem'
            }}
          >
            Archived Items ({archivedProducts.length})
          </button>
        )}
      </div>

      {/* Filter Toolbar */}
      <div style={{ background: '#FFFFFF', padding: '1.2rem', borderRadius: '16px', border: '1px solid rgba(212, 175, 55, 0.2)', marginBottom: '1.5rem', display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
        {/* Search */}
        <div style={{ position: 'relative', flex: '1 1 240px' }}>
          <FaSearch style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#9C8C83' }} />
          <input
            type="text"
            placeholder="Search by product name, SKU, or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: '100%', padding: '9px 14px 9px 38px', borderRadius: '50px', border: '1px solid #E5DFD5', fontSize: '0.85rem', outline: 'none', boxSizing: 'border-box' }}
          />
        </div>

        {/* Category Filter */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{ padding: '9px 14px', borderRadius: '50px', border: '1px solid #E5DFD5', fontSize: '0.85rem', outline: 'none', background: '#FFF' }}
        >
          <option value="ALL">All Categories</option>
          <option value="Resin Art">Resin Art</option>
          <option value="Thread Work">Thread Work</option>
          <option value="Chocolates">Chocolates</option>
          <option value="Biscuits">Biscuits</option>
          <option value="Wedding & Marriage Items">Wedding Items</option>
          <option value="Customized Chains">Customized Chains</option>
          <option value="Customized Gifts">Customized Gifts</option>
          <option value="Customized Dolls">Customized Dolls</option>
        </select>

        {/* Stock Filter */}
        <select
          value={selectedStockStatus}
          onChange={(e) => setSelectedStockStatus(e.target.value)}
          style={{ padding: '9px 14px', borderRadius: '50px', border: '1px solid #E5DFD5', fontSize: '0.85rem', outline: 'none', background: '#FFF' }}
        >
          <option value="ALL">All Stock Status</option>
          <option value="IN_STOCK">In Stock</option>
          <option value="OUT_OF_STOCK">Out of Stock</option>
        </select>

        {/* Sort */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={{ padding: '9px 14px', borderRadius: '50px', border: '1px solid #E5DFD5', fontSize: '0.85rem', outline: 'none', background: '#FFF' }}
        >
          <option value="NEWEST">Sort by: Newest</option>
          <option value="PRICE_LOW">Price: Low to High</option>
          <option value="PRICE_HIGH">Price: High to Low</option>
          <option value="NAME_AZ">Name: A to Z</option>
        </select>
      </div>

      {/* Products Table */}
      <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid rgba(212, 175, 55, 0.2)', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ background: '#FAF8F5', borderBottom: '1px solid #E5DFD5', color: '#7A6965', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                <th style={{ padding: '14px 16px' }}>Product</th>
                <th style={{ padding: '14px 16px' }}>Category</th>
                <th style={{ padding: '14px 16px' }}>SKU</th>
                <th style={{ padding: '14px 16px' }}>Stock</th>
                <th style={{ padding: '14px 16px' }}>Status</th>
                <th style={{ padding: '14px 16px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedProducts.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ padding: '3rem', textAlign: 'center', color: '#7A6965' }}>
                    <FaBoxOpen style={{ fontSize: '2.5rem', color: '#D4C5B9', marginBottom: '0.5rem' }} />
                    <p style={{ margin: 0, fontWeight: 700 }}>No products found matching criteria</p>
                  </td>
                </tr>
              ) : (
                sortedProducts.map((p) => {
                  const isOut = Number(p.stockQuantity) <= 0 || p.stockStatus === 'Out of Stock';
                  return (
                    <tr key={p.id} style={{ borderBottom: '1px solid #F3EFEA' }}>
                      {/* Product Name & Image */}
                      <td style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <img
                          src={getImageUrl(p.image)}
                          alt={p.name}
                          style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '10px', border: '1px solid #E5DFD5' }}
                        />
                        <div>
                          <div style={{ fontWeight: 700, color: '#2D2523' }}>{p.name}</div>
                          {p.rating && <span style={{ fontSize: '0.75rem', color: '#D97706' }}>★ {p.rating}</span>}
                        </div>
                      </td>

                      {/* Category */}
                      <td style={{ padding: '14px 16px', color: '#5A4A42', fontWeight: 600 }}>{p.category}</td>

                      {/* SKU */}
                      <td style={{ padding: '14px 16px', color: '#7A6965', fontFamily: 'monospace', fontSize: '0.82rem' }}>
                        {p.sku || `SKU-${p.id}`}
                      </td>

                      {/* Stock */}
                      <td style={{ padding: '14px 16px' }}>
                        <span style={{ fontWeight: 700, color: isOut ? '#DC2626' : '#16A34A' }}>
                          {isOut ? 'Out of Stock (0)' : `${p.stockQuantity ?? 20} in stock`}
                        </span>
                      </td>

                      {/* Status */}
                      <td style={{ padding: '14px 16px' }}>
                        <span
                          style={{
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            padding: '4px 10px',
                            borderRadius: '50px',
                            background: p.status === 'ACTIVE' ? '#DCFCE7' : '#FEE2E2',
                            color: p.status === 'ACTIVE' ? '#15803D' : '#DC2626'
                          }}
                        >
                          {p.status || 'ACTIVE'}
                        </span>
                      </td>

                      {/* Actions */}
                      <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                          <button
                            onClick={() => setPreviewProduct(p)}
                            title="Quick View"
                            style={{ background: '#FAF8F5', border: '1px solid #E5DFD5', padding: '6px 10px', borderRadius: '8px', cursor: 'pointer', color: '#5A4A42' }}
                          >
                            <FaEye />
                          </button>

                          {activeTab === 'ACTIVE' ? (
                            <>
                              {hasPermission('canEditProducts') && (
                                <NavLink
                                  to={`/admin/products/edit/${p.id}`}
                                  title="Edit Product"
                                  style={{ background: '#FEF3C7', border: '1px solid #FCD34D', padding: '6px 10px', borderRadius: '8px', color: '#B45309', textDecoration: 'none' }}
                                >
                                  <FaEdit />
                                </NavLink>
                              )}

                              {hasPermission('canDeleteProducts') && (
                                <button
                                  onClick={() => setConfirmDeleteId(p.id)}
                                  title="Archive / Soft Delete"
                                  style={{ background: '#FEE2E2', border: '1px solid #FCA5A5', padding: '6px 10px', borderRadius: '8px', cursor: 'pointer', color: '#DC2626' }}
                                >
                                  <FaTrash />
                                </button>
                              )}
                            </>
                          ) : (
                            <button
                              onClick={() => handleRestore(p.id)}
                              title="Restore Product"
                              style={{ background: '#DCFCE7', border: '1px solid #86EFAC', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', color: '#15803D', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}
                            >
                              <FaUndo /> Restore
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confirmation Delete Modal */}
      {confirmDeleteId && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div style={{ background: '#FFF', borderRadius: '20px', padding: '2rem', maxWidth: '420px', width: '100%', textAlign: 'center' }}>
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#DC2626' }}>Archive Product?</h3>
            <p style={{ color: '#5A4A42', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Are you sure you want to archive this product? It will be removed from active customer listings, but can be restored later by a Super Admin.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button onClick={() => setConfirmDeleteId(null)} style={{ background: '#FAF8F5', border: '1px solid #D4C5B9', padding: '10px 20px', borderRadius: '50px', fontWeight: 700, cursor: 'pointer' }}>
                Cancel
              </button>
              <button onClick={() => handleArchive(confirmDeleteId)} style={{ background: '#DC2626', color: '#FFF', border: 'none', padding: '10px 20px', borderRadius: '50px', fontWeight: 700, cursor: 'pointer' }}>
                Delete / Archive
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick View Modal */}
      {previewProduct && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div style={{ background: '#FFF', borderRadius: '20px', padding: '1.8rem', maxWidth: '520px', width: '100%', position: 'relative' }}>
            <button onClick={() => setPreviewProduct(null)} style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer' }}>
              <FaTimes />
            </button>
            <div style={{ display: 'flex', gap: '16px', marginBottom: '1rem' }}>
              <img src={previewProduct.image} alt={previewProduct.name} style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '12px' }} />
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#C89B3C' }}>{previewProduct.category}</span>
                <h3 style={{ margin: '4px 0 8px 0', fontSize: '1.2rem' }}>{previewProduct.name}</h3>
                <div style={{ fontWeight: 700, color: '#2D2523' }}>Stock: {previewProduct.stockQuantity ?? 20}</div>
              </div>
            </div>
            <p style={{ fontSize: '0.88rem', color: '#5A4A42', lineHeight: '1.5' }}>{previewProduct.description || previewProduct.shortDesc}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
