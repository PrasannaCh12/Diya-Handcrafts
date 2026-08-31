import React, { useState, useEffect, useRef } from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import {
  getAdminAccounts,
  createAdminAccount,
  updateAdminAccount,
  deleteAdminAccount,
  DEFAULT_ROLE_PERMISSIONS
} from '../../services/adminAuthService';
import {
  FaUserShield,
  FaPlus,
  FaEdit,
  FaTrash,
  FaKey,
  FaLock,
  FaCheck,
  FaTimes,
  FaCrown,
  FaShieldAlt,
  FaUser,
  FaEye,
  FaEyeSlash,
  FaCheckCircle,
  FaExclamationTriangle,
  FaCamera,
  FaUpload
} from 'react-icons/fa';

const PRESET_AVATARS = [
  { id: 'av-1', label: 'Divya Yelchuri (Super Admin)', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250' },
  { id: 'av-2', label: 'Bridal Jewelry Designer', url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250' },
  { id: 'av-3', label: 'Creative Studio Lead', url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=250' },
  { id: 'av-4', label: 'Craft Operations Manager', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250' },
  { id: 'av-5', label: 'Artisan Workshop Staff', url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=250' },
  { id: 'av-6', label: 'Master Craftsman', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250' }
];

const PERMISSION_DEFINITIONS = [
  { key: 'canAddProducts', label: 'Add Products to Catalog', desc: 'Can create and publish new handcrafted products' },
  { key: 'canEditProducts', label: 'Edit Products & Prices', desc: 'Can modify pricing, images, and descriptions' },
  { key: 'canDeleteProducts', label: 'Delete / Archive Products', desc: 'Can soft-delete and restore catalog items' },
  { key: 'canManageCategories', label: 'Manage Categories', desc: 'Can add, edit, or delete product studio categories' },
  { key: 'canManageOrders', label: 'Manage Orders', desc: 'Can view customer orders and update shipping statuses' },
  { key: 'canManageCustomers', label: 'View Customer CRM', desc: 'Can access customer directory, lifetime spend & contact info' },
  { key: 'canManageInventory', label: 'Manage Stock & Inventory', desc: 'Can update inventory quantities and stock statuses' },
  { key: 'canManageGallery', label: 'Manage Gallery Showcase', desc: 'Can add, crop to 500×500 px, and delete gallery photos' },
  { key: 'canManageReviews', label: 'Approve / Moderate Reviews', desc: 'Can approve customer reviews before they appear live on website' },
  { key: 'canChangeSettings', label: 'Store Settings', desc: 'Can modify store branding, contact info, and policies' }
];

const AdminUserManagement = () => {
  const { adminUser } = useAdminAuth();
  const fileInputRef = useRef(null);

  const [accounts, setAccounts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const isSuperAdmin = adminUser?.role === 'SUPER_ADMIN';

  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    role: 'ADMIN',
    avatar: PRESET_AVATARS[0].url,
    permissions: { ...DEFAULT_ROLE_PERMISSIONS.ADMIN }
  });

  const loadAccounts = () => {
    setAccounts(getAdminAccounts());
  };

  useEffect(() => {
    loadAccounts();
    const handleUpdate = () => loadAccounts();
    window.addEventListener('admin-accounts-updated', handleUpdate);
    return () => window.removeEventListener('admin-accounts-updated', handleUpdate);
  }, []);

  const handleRoleChange = (newRole) => {
    setFormData((prev) => ({
      ...prev,
      role: newRole,
      permissions: { ...(DEFAULT_ROLE_PERMISSIONS[newRole] || DEFAULT_ROLE_PERMISSIONS.STAFF) }
    }));
  };

  const handlePermissionToggle = (permKey) => {
    setFormData((prev) => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [permKey]: !prev.permissions[permKey]
      }
    }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMessage('Please select a valid image file (JPG, PNG, WebP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const size = 300;
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');

        const minDim = Math.min(img.width, img.height);
        const startX = (img.width - minDim) / 2;
        const startY = (img.height - minDim) / 2;

        ctx.drawImage(img, startX, startY, minDim, minDim, 0, 0, size, size);
        const croppedDataUrl = canvas.toDataURL('image/jpeg', 0.92);

        setFormData((prev) => ({ ...prev, avatar: croppedDataUrl }));
        setErrorMessage('');
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleOpenAdd = () => {
    setEditingUser(null);
    setErrorMessage('');
    setFormData({
      name: '',
      username: '',
      email: '',
      password: '',
      role: 'ADMIN',
      avatar: PRESET_AVATARS[0].url,
      permissions: { ...DEFAULT_ROLE_PERMISSIONS.ADMIN }
    });
    setShowModal(true);
  };

  const handleOpenEdit = (acc) => {
    setEditingUser(acc);
    setErrorMessage('');
    setFormData({
      name: acc.name,
      username: acc.username || acc.email.split('@')[0],
      email: acc.email,
      password: '', // Leave blank to keep existing password
      role: acc.role,
      avatar: acc.avatar || PRESET_AVATARS[0].url,
      permissions: { ...acc.permissions }
    });
    setShowModal(true);
  };

  const handleSaveUser = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.name.trim() || !formData.email.trim()) {
      setErrorMessage('Please fill in Name and Email address.');
      return;
    }

    if (!editingUser && !formData.password.trim()) {
      setErrorMessage('Please assign a password for the new admin/staff profile.');
      return;
    }

    if (editingUser) {
      const res = await updateAdminAccount(editingUser.id, {
        name: formData.name.trim(),
        username: formData.username.trim() || formData.email.split('@')[0],
        email: formData.email.trim(),
        role: formData.role,
        avatar: formData.avatar,
        permissions: formData.permissions,
        ...(formData.password.trim() ? { password: formData.password.trim() } : {})
      });

      if (!res.success) {
        setErrorMessage(res.message);
        return;
      }
      setSuccessMessage(`Account for ${formData.name} updated successfully!`);
    } else {
      const res = await createAdminAccount({
        name: formData.name.trim(),
        username: formData.username.trim() || formData.email.split('@')[0],
        email: formData.email.trim(),
        password: formData.password.trim(),
        role: formData.role,
        avatar: formData.avatar,
        customPermissions: formData.permissions
      });

      if (!res.success) {
        setErrorMessage(res.message);
        return;
      }
      setSuccessMessage(`New profile created for ${formData.name}! Credentials are now active.`);
    }

    setShowModal(false);
    loadAccounts();
    setTimeout(() => setSuccessMessage(''), 5000);
  };

  const handleDeleteUser = (acc) => {
    if (acc.id === adminUser?.id) {
      alert('You cannot delete your own logged-in account.');
      return;
    }

    if (window.confirm(`Are you sure you want to permanently revoke access for ${acc.name} (${acc.email})?`)) {
      const res = deleteAdminAccount(acc.id);
      if (!res.success) {
        alert(res.message);
      } else {
        loadAccounts();
        setSuccessMessage(`Account for ${acc.name} deleted.`);
        setTimeout(() => setSuccessMessage(''), 4000);
      }
    }
  };

  const handleToggleActive = async (acc) => {
    if (acc.id === adminUser?.id) {
      alert('You cannot deactivate your own account.');
      return;
    }
    const newStatus = acc.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
    await updateAdminAccount(acc.id, { status: newStatus });
    loadAccounts();
  };

  if (!isSuperAdmin) {
    return (
      <div style={{ padding: '3rem 1.5rem', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: '#FEE2E2', color: '#DC2626', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', margin: '0 auto 1.5rem' }}>
          <FaLock />
        </div>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: '#2D2523' }}>Access Restricted</h2>
        <p style={{ color: '#7A6965', lineHeight: 1.6 }}>
          Only the <strong>Super Admin</strong> holds the master authority to create new admin credentials and configure privacy & access permissions.
        </p>
      </div>
    );
  }

  return (
    <div className="admin-user-mgmt-page">
      {/* Success Notification */}
      {successMessage && (
        <div className="alert-success-banner">
          <FaCheckCircle /> {successMessage}
        </div>
      )}

      {/* Top Header */}
      <div className="page-header-row">
        <div>
          <div className="super-admin-tag">
            <FaCrown /> SUPER ADMIN EXCLUSIVE PORTAL
          </div>
          <h1 className="page-main-title">Admin & Staff Profiles Management</h1>
          <p className="page-subtitle">
            Create new login user IDs, assign custom profile pictures, set passwords, and customize role-based privacy & operational permissions.
          </p>
        </div>

        <button onClick={handleOpenAdd} className="btn-add-profile">
          <FaPlus /> Add New Admin / Staff
        </button>
      </div>

      {/* Authority Overview Card */}
      <div className="authority-card">
        <div className="authority-icon"><FaCrown /></div>
        <div className="authority-text">
          <strong>Master Control & Privacy Governance:</strong> As Super Admin, you determine who can add products, manage customer CRM details, moderate reviews, or alter store settings. Every action taken by sub-admins & staff is attributed to their user account.
        </div>
      </div>

      {/* Accounts List Grid */}
      <div className="accounts-grid">
        {accounts.map((acc) => {
          const isSuper = acc.role === 'SUPER_ADMIN';
          const isAdmin = acc.role === 'ADMIN';
          const isActive = acc.status !== 'INACTIVE';

          return (
            <div key={acc.id} className={`account-card ${!isActive ? 'is-inactive' : ''}`}>
              <div className="card-top-row">
                <div className="account-avatar-wrap">
                  <img src={acc.avatar || '/logo192.png'} alt={acc.name} className="account-avatar-img" />
                  {isSuper && <span className="crown-badge"><FaCrown /></span>}
                </div>

                <div className="role-status-badges">
                  <span className={`role-badge role-${acc.role.toLowerCase()}`}>
                    {isSuper && <FaCrown />}
                    {isAdmin && <FaShieldAlt />}
                    {!isSuper && !isAdmin && <FaUser />}
                    {acc.role.replace('_', ' ')}
                  </span>
                  <span className={`status-tag ${isActive ? 'status-active' : 'status-inactive'}`}>
                    {isActive ? 'Active' : 'Deactivated'}
                  </span>
                </div>
              </div>

              <div className="account-info">
                <h3 className="acc-name">{acc.name}</h3>
                <div className="acc-meta-item">
                  <strong>User ID:</strong> <code>{acc.username || acc.email.split('@')[0]}</code>
                </div>
                <div className="acc-meta-item">
                  <strong>Login Email:</strong> {acc.email}
                </div>
              </div>

              {/* Permissions Preview */}
              <div className="permissions-summary">
                <span className="perm-title">Configured Access Privileges:</span>
                <div className="perm-chips-wrap">
                  {PERMISSION_DEFINITIONS.map((def) => {
                    const hasAccess = isSuper || (acc.permissions && acc.permissions[def.key]);
                    return (
                      <span
                        key={def.key}
                        className={`perm-chip ${hasAccess ? 'perm-granted' : 'perm-denied'}`}
                        title={def.desc}
                      >
                        {hasAccess ? <FaCheck /> : <FaTimes />} {def.label}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="card-actions-bar">
                <button
                  onClick={() => handleOpenEdit(acc)}
                  className="btn-card-edit"
                  title="Edit permissions, photo or reset password"
                >
                  <FaEdit /> Edit Profile / Photo
                </button>

                {acc.id !== adminUser?.id && (
                  <>
                    <button
                      onClick={() => handleToggleActive(acc)}
                      className={`btn-card-toggle ${isActive ? 'btn-deactivate' : 'btn-activate'}`}
                      title={isActive ? 'Deactivate account access' : 'Reactivate account'}
                    >
                      {isActive ? 'Deactivate' : 'Activate'}
                    </button>

                    <button
                      onClick={() => handleDeleteUser(acc)}
                      className="btn-card-delete"
                      title="Permanently remove account"
                    >
                      <FaTrash />
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add / Edit Profile Modal */}
      {showModal && (
        <div className="modal-backdrop" onClick={() => setShowModal(false)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-bar">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <FaUserShield style={{ color: '#D4AF37', fontSize: '1.4rem' }} />
                <h3>{editingUser ? `Edit Profile: ${editingUser.name}` : 'Create New Admin / Staff Profile'}</h3>
              </div>
              <button className="modal-close" onClick={() => setShowModal(false)}>
                <FaTimes />
              </button>
            </div>

            {errorMessage && (
              <div className="modal-error-box">
                <FaExclamationTriangle /> {errorMessage}
              </div>
            )}

            <form onSubmit={handleSaveUser} className="modal-form-content">
              {/* Profile Picture Chooser */}
              <div className="modal-avatar-picker-section">
                <div className="avatar-preview-box">
                  <img src={formData.avatar || PRESET_AVATARS[0].url} alt="Avatar Preview" className="modal-avatar-preview-img" />
                  <button
                    type="button"
                    className="avatar-overlay-cam-btn"
                    onClick={() => fileInputRef.current?.click()}
                    title="Upload photo from computer"
                  >
                    <FaCamera />
                  </button>
                </div>

                <div className="avatar-pick-controls">
                  <div className="avatar-pick-heading">
                    <strong>Admin Profile Picture:</strong> Upload custom photo or pick an avatar preset
                  </div>
                  
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png, image/jpeg, image/webp"
                    style={{ display: 'none' }}
                    onChange={handlePhotoUpload}
                  />

                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                    <button
                      type="button"
                      className="btn-upload-avatar-chip"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <FaUpload /> Upload Photo
                    </button>

                    {PRESET_AVATARS.map((p) => {
                      const isSel = formData.avatar === p.url;
                      return (
                        <div
                          key={p.id}
                          className={`mini-preset-avatar ${isSel ? 'selected' : ''}`}
                          onClick={() => setFormData({ ...formData, avatar: p.url })}
                          title={p.label}
                        >
                          <img src={p.url} alt={p.label} />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="form-two-col">
                <div className="form-field">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sravani Rao"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="form-field">
                  <label>User ID / Username *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. sravani.admin"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-two-col">
                <div className="form-field">
                  <label>Login Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. sravani@diyahandcrafts.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="form-field">
                  <label>{editingUser ? 'New Password (leave blank to keep current)' : 'Login Password *'}</label>
                  <div className="password-input-wrap">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required={!editingUser}
                      placeholder={editingUser ? '••••••••' : 'Set secure password'}
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                    <button
                      type="button"
                      className="pwd-toggle-btn"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Role Selection */}
              <div className="form-field" style={{ marginTop: '0.5rem' }}>
                <label>Admin Profile Role</label>
                <div className="role-options-grid">
                  <div
                    className={`role-option-box ${formData.role === 'SUPER_ADMIN' ? 'selected' : ''}`}
                    onClick={() => handleRoleChange('SUPER_ADMIN')}
                  >
                    <div className="role-opt-header">
                      <FaCrown style={{ color: '#D4AF37' }} />
                      <strong>Super Admin</strong>
                    </div>
                    <p>Unrestricted full master control over the entire platform, accounts, and finances.</p>
                  </div>

                  <div
                    className={`role-option-box ${formData.role === 'ADMIN' ? 'selected' : ''}`}
                    onClick={() => handleRoleChange('ADMIN')}
                  >
                    <div className="role-opt-header">
                      <FaShieldAlt style={{ color: '#1E88E5' }} />
                      <strong>Store Admin</strong>
                    </div>
                    <p>Can manage products, orders, customers, reviews, and gallery items.</p>
                  </div>

                  <div
                    className={`role-option-box ${formData.role === 'STAFF' ? 'selected' : ''}`}
                    onClick={() => handleRoleChange('STAFF')}
                  >
                    <div className="role-opt-header">
                      <FaUser style={{ color: '#43A047' }} />
                      <strong>Craft Staff</strong>
                    </div>
                    <p>Can view/update order status, stock inventory, and assist in product listings.</p>
                  </div>
                </div>
              </div>

              {/* Granular Permission Toggles */}
              <div className="permissions-control-section">
                <label className="perm-section-title">
                  🔐 Custom Privacy & Access Permissions (Super Admin Configured)
                </label>
                <p className="perm-section-desc">
                  Toggle individual feature permissions for this specific user.
                </p>

                <div className="perm-checkboxes-grid">
                  {PERMISSION_DEFINITIONS.map((def) => {
                    const isChecked = formData.role === 'SUPER_ADMIN' || Boolean(formData.permissions[def.key]);
                    const isDisabled = formData.role === 'SUPER_ADMIN';

                    return (
                      <div
                        key={def.key}
                        className={`perm-toggle-row ${isChecked ? 'active' : ''} ${isDisabled ? 'disabled' : ''}`}
                        onClick={() => !isDisabled && handlePermissionToggle(def.key)}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          disabled={isDisabled}
                          onChange={() => !isDisabled && handlePermissionToggle(def.key)}
                        />
                        <div className="perm-row-text">
                          <span className="perm-name">{def.label}</span>
                          <span className="perm-sub">{def.desc}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="modal-footer-bar">
                <button type="button" className="btn-modal-cancel" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-modal-save">
                  <FaCheck /> {editingUser ? 'Save Profile Changes' : 'Create & Activate Profile'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        .admin-user-mgmt-page {
          padding: 1.5rem;
          max-width: 1350px;
          margin: 0 auto;
        }

        .alert-success-banner {
          background: #DCFCE7;
          border: 1px solid #86EFAC;
          color: #15803D;
          padding: 0.85rem 1.25rem;
          border-radius: 12px;
          font-weight: 700;
          font-size: 0.9rem;
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .page-header-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          flex-wrap: wrap;
          margin-bottom: 1.5rem;
        }

        .super-admin-tag {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: linear-gradient(135deg, #FFF8E1 0%, #FFECB3 100%);
          border: 1px solid #D4AF37;
          color: #8D6E1A;
          font-size: 0.72rem;
          font-weight: 800;
          padding: 3px 10px;
          border-radius: 20px;
          letter-spacing: 0.08em;
          margin-bottom: 0.4rem;
        }

        .page-main-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 2rem;
          font-weight: 700;
          color: #2D2523;
          margin: 0;
        }

        .page-subtitle {
          font-size: 0.88rem;
          color: #7A6B5E;
          margin-top: 4px;
        }

        .btn-add-profile {
          background: linear-gradient(135deg, #C79A2B 0%, #AA7C11 100%);
          color: #FFFFFF;
          border: none;
          padding: 0.7rem 1.4rem;
          border-radius: 50px;
          font-weight: 700;
          font-size: 0.88rem;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          box-shadow: 0 4px 15px rgba(199, 154, 43, 0.25);
          transition: transform 0.2s;
        }

        .btn-add-profile:hover {
          transform: translateY(-2px);
        }

        .authority-card {
          background: linear-gradient(135deg, rgba(212, 175, 55, 0.12) 0%, rgba(212, 175, 55, 0.03) 100%);
          border: 1px solid rgba(212, 175, 55, 0.35);
          border-radius: 14px;
          padding: 1rem 1.25rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.75rem;
        }

        .authority-icon {
          font-size: 1.6rem;
          color: #C79A2B;
          flex-shrink: 0;
        }

        .authority-text {
          font-size: 0.85rem;
          color: #3E2C1C;
          line-height: 1.5;
        }

        .accounts-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
          gap: 1.5rem;
        }

        .account-card {
          background: #FFFFFF;
          border: 1px solid #E8D8B5;
          border-radius: 16px;
          padding: 1.5rem;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.04);
          display: flex;
          flex-direction: column;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .account-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 24px rgba(199, 154, 43, 0.15);
        }

        .account-card.is-inactive {
          opacity: 0.6;
          border-color: #E0E0E0;
        }

        .card-top-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1rem;
        }

        .account-avatar-wrap {
          position: relative;
          width: 52px;
          height: 52px;
        }

        .account-avatar-img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid #C79A2B;
        }

        .crown-badge {
          position: absolute;
          bottom: -2px;
          right: -2px;
          background: #D4AF37;
          color: #FFFFFF;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.65rem;
          border: 2px solid #FFFFFF;
        }

        .role-status-badges {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 4px;
        }

        .role-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 3px 10px;
          border-radius: 20px;
          text-transform: uppercase;
        }

        .role-super_admin {
          background: #FFF8E1;
          color: #B45309;
          border: 1px solid #FCD34D;
        }

        .role-admin {
          background: #E0F2FE;
          color: #0369A1;
          border: 1px solid #BAE6FD;
        }

        .role-staff {
          background: #DCFCE7;
          color: #15803D;
          border: 1px solid #BBF7D0;
        }

        .status-tag {
          font-size: 0.7rem;
          font-weight: 600;
          padding: 1px 8px;
          border-radius: 10px;
        }

        .status-active {
          color: #15803D;
        }

        .status-inactive {
          color: #DC2626;
        }

        .account-info {
          margin-bottom: 1.25rem;
        }

        .acc-name {
          font-size: 1.15rem;
          font-weight: 700;
          color: #2D2523;
          margin: 0 0 0.4rem 0;
        }

        .acc-meta-item {
          font-size: 0.82rem;
          color: #7A6B5E;
          margin-bottom: 2px;
        }

        .acc-meta-item code {
          background: #FAF7F2;
          padding: 2px 6px;
          border-radius: 4px;
          border: 1px solid #E8D8B5;
          color: #C79A2B;
          font-weight: 700;
        }

        .permissions-summary {
          border-top: 1px solid #F0E6D2;
          padding-top: 0.85rem;
          margin-bottom: 1.25rem;
          flex: 1;
        }

        .perm-title {
          font-size: 0.75rem;
          font-weight: 700;
          color: #8C7A6B;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          display: block;
          margin-bottom: 0.5rem;
        }

        .perm-chips-wrap {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
        }

        .perm-chip {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 0.7rem;
          font-weight: 600;
          padding: 2px 7px;
          border-radius: 6px;
        }

        .perm-granted {
          background: #E8F5E9;
          color: #2E7D32;
        }

        .perm-denied {
          background: #F5F5F5;
          color: #BDBDBD;
          text-decoration: line-through;
        }

        .card-actions-bar {
          border-top: 1px solid #F0E6D2;
          padding-top: 0.85rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .btn-card-edit {
          flex: 1;
          background: #FAF5EF;
          color: #3E2C1C;
          border: 1px solid #E8D8B5;
          padding: 0.45rem 0.75rem;
          border-radius: 6px;
          font-size: 0.78rem;
          font-weight: 700;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
        }

        .btn-card-edit:hover {
          background: #C79A2B;
          color: #FFFFFF;
        }

        .btn-card-toggle {
          background: transparent;
          border: 1px solid #E8D8B5;
          padding: 0.45rem 0.65rem;
          border-radius: 6px;
          font-size: 0.75rem;
          font-weight: 600;
          cursor: pointer;
        }

        .btn-deactivate {
          color: #D97706;
        }

        .btn-activate {
          color: #15803D;
        }

        .btn-card-delete {
          background: #FEE2E2;
          color: #DC2626;
          border: 1px solid #FECACA;
          padding: 0.45rem 0.65rem;
          border-radius: 6px;
          font-size: 0.8rem;
          cursor: pointer;
        }

        /* Modal Styles */
        .modal-backdrop {
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

        .modal-container {
          background: #FFFFFF;
          width: 100%;
          max-width: 760px;
          max-height: 90vh;
          border-radius: 18px;
          overflow-y: auto;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }

        .modal-header-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.25rem 1.5rem;
          border-bottom: 1px solid #E8D8B5;
        }

        .modal-header-bar h3 {
          margin: 0;
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.45rem;
          color: #2D2523;
        }

        .modal-close {
          background: transparent;
          border: none;
          font-size: 1.2rem;
          color: #9C8E7F;
          cursor: pointer;
        }

        .modal-error-box {
          background: #FFEBEE;
          color: #C62828;
          padding: 0.75rem 1.25rem;
          font-size: 0.85rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .modal-form-content {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .modal-avatar-picker-section {
          background: #FAF7F2;
          border: 1px solid #E8D8B5;
          border-radius: 12px;
          padding: 1rem;
          display: flex;
          gap: 1.25rem;
          align-items: center;
          flex-wrap: wrap;
        }

        .avatar-preview-box {
          position: relative;
          width: 65px;
          height: 65px;
          border-radius: 50%;
          border: 2px solid #C79A2B;
          overflow: hidden;
          flex-shrink: 0;
        }

        .modal-avatar-preview-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .avatar-overlay-cam-btn {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.4);
          color: #FFFFFF;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          opacity: 0.7;
          transition: opacity 0.2s;
        }

        .avatar-overlay-cam-btn:hover {
          opacity: 1;
        }

        .avatar-pick-controls {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .avatar-pick-heading {
          font-size: 0.8rem;
          color: #2D2523;
        }

        .btn-upload-avatar-chip {
          background: #FFFFFF;
          border: 1px solid #E8D8B5;
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 700;
          color: #2D2523;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 5px;
        }

        .mini-preset-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 2px solid #E8D8B5;
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.15s;
        }

        .mini-preset-avatar.selected {
          border-color: #C79A2B;
          box-shadow: 0 0 0 2px rgba(199, 154, 43, 0.4);
        }

        .mini-preset-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .form-two-col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .form-field {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
        }

        .form-field label {
          font-size: 0.8rem;
          font-weight: 700;
          color: #2D2523;
        }

        .form-field input {
          padding: 0.65rem 0.85rem;
          border-radius: 8px;
          border: 1px solid #E8D8B5;
          font-size: 0.88rem;
          outline: none;
        }

        .password-input-wrap {
          position: relative;
          display: flex;
          align-items: center;
        }

        .password-input-wrap input {
          width: 100%;
          padding-right: 38px;
        }

        .pwd-toggle-btn {
          position: absolute;
          right: 10px;
          background: transparent;
          border: none;
          color: #9C8E7F;
          cursor: pointer;
        }

        .role-options-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 0.75rem;
          margin-top: 0.35rem;
        }

        .role-option-box {
          background: #FAF7F2;
          border: 1.5px solid #E8D8B5;
          border-radius: 10px;
          padding: 0.85rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .role-option-box.selected {
          background: #FFFDF9;
          border-color: #C79A2B;
          box-shadow: 0 4px 12px rgba(199, 154, 43, 0.18);
        }

        .role-opt-header {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.88rem;
          margin-bottom: 4px;
        }

        .role-option-box p {
          font-size: 0.72rem;
          color: #7A6B5E;
          margin: 0;
          line-height: 1.35;
        }

        .permissions-control-section {
          background: #FAF7F2;
          border: 1px solid #E8D8B5;
          border-radius: 12px;
          padding: 1rem 1.25rem;
          margin-top: 0.5rem;
        }

        .perm-section-title {
          font-size: 0.85rem;
          font-weight: 700;
          color: #2D2523;
          display: block;
        }

        .perm-section-desc {
          font-size: 0.75rem;
          color: #7A6B5E;
          margin: 2px 0 0.85rem 0;
        }

        .perm-checkboxes-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.6rem;
        }

        .perm-toggle-row {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          background: #FFFFFF;
          border: 1px solid #E8D8B5;
          padding: 0.6rem 0.75rem;
          border-radius: 8px;
          cursor: pointer;
          transition: border-color 0.15s;
        }

        .perm-toggle-row.active {
          border-color: #C79A2B;
          background: #FFFDF9;
        }

        .perm-toggle-row.disabled {
          opacity: 0.75;
          cursor: not-allowed;
        }

        .perm-row-text {
          display: flex;
          flex-direction: column;
        }

        .perm-name {
          font-size: 0.78rem;
          font-weight: 700;
          color: #2D2523;
        }

        .perm-sub {
          font-size: 0.68rem;
          color: #8C7A6B;
          line-height: 1.3;
        }

        .modal-footer-bar {
          display: flex;
          justify-content: flex-end;
          gap: 0.75rem;
          padding-top: 1rem;
          border-top: 1px solid #E8D8B5;
          margin-top: 0.5rem;
        }

        .btn-modal-save {
          background: linear-gradient(135deg, #C79A2B 0%, #AA7C11 100%);
          color: #FFFFFF;
          border: none;
          padding: 0.65rem 1.35rem;
          border-radius: 8px;
          font-weight: 700;
          font-size: 0.88rem;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        .btn-modal-cancel {
          background: #FAF5EF;
          color: #3E2C1C;
          border: 1px solid #E8D8B5;
          padding: 0.65rem 1.25rem;
          border-radius: 8px;
          font-weight: 600;
          font-size: 0.88rem;
          cursor: pointer;
        }

        @media (max-width: 768px) {
          .form-two-col,
          .role-options-grid,
          .perm-checkboxes-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminUserManagement;
