import React, { useState, useEffect } from 'react';
import {
  getStoredCategories,
  addCategory,
  updateCategory,
  deleteCategory,
  subscribeToDataStore
} from '../../services/adminDataStore';
import { FaPlus, FaEdit, FaTrash, FaTags, FaTimes } from 'react-icons/fa';

const AdminCategories = () => {
  const [categories, setCategories] = useState(getStoredCategories());
  const [showModal, setShowModal] = useState(false);
  const [editingCat, setEditingCat] = useState(null);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('✨');
  const [status, setStatus] = useState('ACTIVE');

  useEffect(() => {
    const unsub = subscribeToDataStore(() => {
      setCategories(getStoredCategories());
    });
    return unsub;
  }, []);

  const handleOpenAdd = () => {
    setEditingCat(null);
    setName('');
    setDescription('');
    setIcon('✨');
    setStatus('ACTIVE');
    setShowModal(true);
  };

  const handleOpenEdit = (cat) => {
    setEditingCat(cat);
    setName(cat.name);
    setDescription(cat.description || '');
    setIcon(cat.icon || '✨');
    setStatus(cat.status || 'ACTIVE');
    setShowModal(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (editingCat) {
      updateCategory(editingCat.id, { name, description, icon, status });
    } else {
      addCategory({ name, description, icon, status });
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      deleteCategory(id);
    }
  };

  return (
    <div className="admin-categories-page">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.85rem', fontWeight: 700, margin: 0 }}>Category Management</h1>
          <p style={{ fontSize: '0.9rem', color: '#7A6965', margin: '4px 0 0 0' }}>Manage product categories displayed across store collections</p>
        </div>
        <button
          onClick={handleOpenAdd}
          style={{ background: 'linear-gradient(135deg, #E8C86A 0%, #C89B3C 100%)', color: '#FFF', border: 'none', padding: '10px 22px', borderRadius: '50px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', boxShadow: '0 4px 12px rgba(200,155,60,0.3)' }}
        >
          <FaPlus /> Add Category
        </button>
      </div>

      {/* Categories Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.2rem' }}>
        {categories.map((cat) => (
          <div key={cat.id} style={{ background: '#FFFFFF', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(212, 175, 55, 0.2)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '1.8rem' }}>{cat.icon || '✨'}</span>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '4px 10px', borderRadius: '50px', background: cat.status === 'ACTIVE' ? '#DCFCE7' : '#FEE2E2', color: cat.status === 'ACTIVE' ? '#15803D' : '#DC2626' }}>
                  {cat.status || 'ACTIVE'}
                </span>
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: '0 0 6px 0', color: '#2D2523' }}>{cat.name}</h3>
              <p style={{ fontSize: '0.85rem', color: '#5A4A42', lineHeight: '1.5', margin: 0 }}>{cat.description || 'No description provided.'}</p>
            </div>

            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '1.2rem', paddingTop: '0.85rem', borderTop: '1px solid #F3EFEA' }}>
              <button onClick={() => handleOpenEdit(cat)} style={{ background: '#FEF3C7', border: '1px solid #FCD34D', color: '#B45309', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <FaEdit /> Edit
              </button>
              <button onClick={() => handleDelete(cat.id)} style={{ background: '#FEE2E2', border: '1px solid #FCA5A5', color: '#DC2626', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <FaTrash /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Category Modal */}
      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div style={{ background: '#FFF', borderRadius: '20px', padding: '2rem', maxWidth: '440px', width: '100%', position: 'relative' }}>
            <button onClick={() => setShowModal(false)} style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer' }}>
              <FaTimes />
            </button>
            <h3 style={{ margin: '0 0 1.2rem 0', fontSize: '1.3rem' }}>{editingCat ? 'Edit Category' : 'Add New Category'}</h3>
            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Category Name *</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #E5DFD5', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Icon Emoji</label>
                <input type="text" value={icon} onChange={(e) => setIcon(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #E5DFD5', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Description</label>
                <textarea rows="3" value={description} onChange={(e) => setDescription(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #E5DFD5', boxSizing: 'border-box' }}></textarea>
              </div>
              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Status</label>
                <select value={status} onChange={(e) => setStatus(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #E5DFD5', background: '#FFF' }}>
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="INACTIVE">INACTIVE</option>
                </select>
              </div>
              <button type="submit" style={{ background: 'linear-gradient(135deg, #E8C86A 0%, #C89B3C 100%)', color: '#FFF', border: 'none', padding: '12px', borderRadius: '50px', fontWeight: 700, cursor: 'pointer', marginTop: '0.5rem' }}>
                {editingCat ? 'Save Changes' : 'Create Category'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCategories;
