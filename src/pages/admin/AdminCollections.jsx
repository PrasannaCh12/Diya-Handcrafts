import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getStoredCategories, getStoredProducts, subscribeToDataStore } from '../../services/adminDataStore';
import { FaLayerGroup, FaPlus, FaEdit, FaEye, FaExternalLinkAlt, FaBoxOpen, FaCheck, FaSearch } from 'react-icons/fa';

const COLLECTION_ICONS = {
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

const AdminCollections = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState(() => getStoredCategories());
  const [products, setProducts] = useState(() => getStoredProducts());
  const [searchTerm, setSearchTerm] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    const unsub = subscribeToDataStore(() => {
      setCategories(getStoredCategories());
      setProducts(getStoredProducts());
    });
    return unsub;
  }, []);

  const getProductCount = (categoryName) => {
    return products.filter((p) => p.category === categoryName || p.category?.includes(categoryName)).length;
  };

  const filteredCategories = categories.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (c.description && c.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="admin-collections-page" style={{ padding: '0.5rem 0' }}>
      {/* Toast Notification */}
      {toastMessage && (
        <div style={{ position: 'fixed', top: '80px', right: '20px', background: '#DCFCE7', border: '1px solid #86EFAC', color: '#15803D', padding: '12px 20px', borderRadius: '50px', fontWeight: 700, zIndex: 1000, boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
          ✓ {toastMessage}
        </div>
      )}

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', fontWeight: 700, margin: 0, color: '#2D2523', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FaLayerGroup style={{ color: '#C89B3C' }} /> Explore Collections Studio
          </h1>
          <p style={{ fontSize: '0.85rem', color: '#7A6965', margin: '4px 0 0 0' }}>
            Manage handcrafted product collections, view collection catalogs, and preview storefront studios.
          </p>
        </div>

        <button
          onClick={() => navigate('/admin/products/add')}
          style={{ background: 'linear-gradient(135deg, #E8C86A 0%, #C89B3C 100%)', color: '#FFFFFF', border: 'none', padding: '10px 22px', borderRadius: '50px', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 14px rgba(200,155,60,0.3)' }}
        >
          <FaPlus /> Add Product To Collection
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div style={{ background: '#FFFFFF', padding: '1rem 1.25rem', borderRadius: '16px', border: '1px solid rgba(212,175,55,0.2)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%', maxWidth: '380px', background: '#FAF8F5', padding: '8px 14px', borderRadius: '10px', border: '1px solid #E5DFD5' }}>
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
          Showing <strong>{filteredCategories.length}</strong> Handcrafted Collections
        </div>
      </div>

      {/* Collections Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
        {filteredCategories.map((col) => {
          const count = getProductCount(col.name);
          const icon = col.icon || COLLECTION_ICONS[col.name] || '✨';
          const path = COLLECTION_PATHS[col.name] || '/shop';

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
                boxShadow: '0 4px 15px rgba(0,0,0,0.04)',
                transition: 'all 0.25s ease'
              }}
            >
              <div>
                {/* Header Badge */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '2.2rem', background: '#FFFDF9', padding: '8px', borderRadius: '14px', border: '1px solid #F5E8C7' }}>
                    {icon}
                  </span>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '4px 12px', borderRadius: '50px', background: col.status === 'ACTIVE' ? '#DCFCE7' : '#FEE2E2', color: col.status === 'ACTIVE' ? '#15803D' : '#DC2626' }}>
                    {col.status || 'ACTIVE'}
                  </span>
                </div>

                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', fontWeight: 700, color: '#2D2523', margin: '0 0 0.4rem 0' }}>
                  {col.name}
                </h3>
                <p style={{ fontSize: '0.82rem', color: '#7A6965', lineHeight: 1.45, margin: '0 0 1rem 0' }}>
                  {col.description || 'Exclusive handcrafted collection studio.'}
                </p>
              </div>

              {/* Footer Meta & Actions */}
              <div style={{ borderTop: '1px solid #F5E8C7', paddingTop: '1rem', marginTop: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#5A4A42', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <FaBoxOpen style={{ color: '#C89B3C' }} /> <strong>{count}</strong> Product{count === 1 ? '' : 's'}
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => navigate('/admin/products')}
                    style={{ flex: 1, background: '#FAF8F5', border: '1px solid #D4C5B9', padding: '8px 12px', borderRadius: '8px', fontSize: '0.78rem', fontWeight: 700, color: '#2D2523', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}
                  >
                    <FaEye /> View Catalog
                  </button>

                  <a
                    href={path}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ flex: 1, background: 'rgba(200,155,60,0.12)', border: '1px solid #C89B3C', padding: '8px 12px', borderRadius: '8px', fontSize: '0.78rem', fontWeight: 700, color: '#C89B3C', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}
                  >
                    <FaExternalLinkAlt /> Preview ↗
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminCollections;
