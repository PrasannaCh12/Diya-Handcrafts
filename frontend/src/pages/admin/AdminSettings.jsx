import React, { useState, useRef } from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import {
  FaUserShield,
  FaKey,
  FaStore,
  FaCheck,
  FaExclamationCircle,
  FaCamera,
  FaImage,
  FaCrown,
  FaCheckCircle,
  FaTrash,
  FaUpload
} from 'react-icons/fa';

const PRESET_AVATARS = [
  { id: 'av-1', label: 'Artisan Atelier (Divya)', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250' },
  { id: 'av-2', label: 'Bridal Jewelry Designer', url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250' },
  { id: 'av-3', label: 'Creative Studio Lead', url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=250' },
  { id: 'av-4', label: 'Craft Operations Manager', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250' },
  { id: 'av-5', label: 'Artisan Workshop Staff', url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=250' },
  { id: 'av-6', label: 'Master Craftsman', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250' }
];

const AdminSettings = () => {
  const { adminUser, changePassword, updateAvatar } = useAdminAuth();
  const fileInputRef = useRef(null);

  // Avatar state
  const [avatarPreview, setAvatarPreview] = useState(adminUser?.avatar || '');
  const [avatarMsg, setAvatarMsg] = useState('');
  const [avatarErr, setAvatarErr] = useState('');
  const [isSavingAvatar, setIsSavingAvatar] = useState(false);

  // Password state
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pwdMsg, setPwdMsg] = useState('');
  const [pwdErr, setPwdErr] = useState('');
  const [submittingPwd, setSubmittingPwd] = useState(false);

  // Handle Local Photo File Upload & 1:1 Center-crop
  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setAvatarErr('Please select a valid image file (JPG, PNG, WebP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        // Create square canvas for perfect circular avatar
        const canvas = document.createElement('canvas');
        const size = 300;
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');

        // Center crop math
        const minDim = Math.min(img.width, img.height);
        const startX = (img.width - minDim) / 2;
        const startY = (img.height - minDim) / 2;

        ctx.drawImage(img, startX, startY, minDim, minDim, 0, 0, size, size);
        const croppedDataUrl = canvas.toDataURL('image/jpeg', 0.92);

        setAvatarPreview(croppedDataUrl);
        setAvatarErr('');
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleSaveAvatar = () => {
    if (!avatarPreview) {
      setAvatarErr('Please select or upload a profile picture.');
      return;
    }
    setIsSavingAvatar(true);
    try {
      updateAvatar(avatarPreview);
      setAvatarMsg('Profile picture updated successfully!');
      setAvatarErr('');
      setTimeout(() => setAvatarMsg(''), 4000);
    } catch (e) {
      setAvatarErr('Failed to update avatar. Please try again.');
    } finally {
      setIsSavingAvatar(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPwdMsg('');
    setPwdErr('');

    if (!oldPassword || !newPassword) {
      setPwdErr('Please fill in all password fields');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPwdErr('New passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      setPwdErr('Password must be at least 6 characters long');
      return;
    }

    setSubmittingPwd(true);
    try {
      const res = await changePassword(oldPassword, newPassword);
      if (res.success) {
        setPwdMsg('Password updated successfully! Your new password is now active.');
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setTimeout(() => setPwdMsg(''), 4000);
      } else {
        setPwdErr(res.message || 'Failed to update password');
      }
    } catch (e) {
      setPwdErr('An error occurred. Please try again.');
    } finally {
      setSubmittingPwd(false);
    }
  };

  return (
    <div className="admin-settings-page" style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', fontWeight: 700, margin: 0, color: '#2D2523' }}>
          Admin Profile & Settings
        </h1>
        <p style={{ fontSize: '0.9rem', color: '#7A6965', margin: '4px 0 0 0' }}>
          Update your profile picture, account security credentials, and store configurations
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
        {/* SECTION 1: Profile Picture & Account Card */}
        <div style={{ background: '#FFFFFF', padding: '1.8rem', borderRadius: '20px', border: '1px solid #E8D8B5', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: '0 0 1.2rem 0', color: '#2D2523', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FaCamera style={{ color: '#C89B3C' }} /> Profile Picture & Avatar
          </h3>

          {avatarMsg && (
            <div style={{ background: '#DCFCE7', border: '1px solid #86EFAC', color: '#15803D', padding: '10px 16px', borderRadius: '10px', fontSize: '0.88rem', fontWeight: 700, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FaCheckCircle /> {avatarMsg}
            </div>
          )}

          {avatarErr && (
            <div style={{ background: '#FEE2E2', border: '1px solid #FCA5A5', color: '#DC2626', padding: '10px 16px', borderRadius: '10px', fontSize: '0.88rem', fontWeight: 700, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FaExclamationCircle /> {avatarErr}
            </div>
          )}

          <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
            {/* Avatar Preview with Camera Overlay */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
              <div
                style={{
                  position: 'relative',
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  border: '3.5px solid #C89B3C',
                  boxShadow: '0 6px 20px rgba(200, 155, 60, 0.25)',
                  overflow: 'hidden'
                }}
                onClick={() => fileInputRef.current?.click()}
                title="Click to upload a new profile picture from your device"
              >
                <img
                  src={avatarPreview || adminUser?.avatar || '/logo192.png'}
                  alt={adminUser?.name || 'Admin'}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(0,0,0,0.45)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFFFFF',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    opacity: 0.85,
                    transition: 'opacity 0.2s'
                  }}
                >
                  <FaCamera style={{ fontSize: '1.3rem', marginBottom: '3px' }} />
                  Change
                </div>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/png, image/jpeg, image/webp"
                style={{ display: 'none' }}
                onChange={handlePhotoUpload}
              />

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                style={{
                  background: '#FAF7F2',
                  border: '1px solid #E8D8B5',
                  padding: '6px 14px',
                  borderRadius: '50px',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  color: '#2D2523',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <FaUpload style={{ color: '#C89B3C' }} /> Choose Photo
              </button>
            </div>

            {/* Profile Info & Presets */}
            <div style={{ flex: 1, minWidth: '280px' }}>
              <div style={{ marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h4 style={{ margin: 0, fontSize: '1.3rem', color: '#2D2523', fontWeight: 700 }}>
                    {adminUser?.name}
                  </h4>
                  {adminUser?.role === 'SUPER_ADMIN' && (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: '#FFF8E1', color: '#B45309', border: '1px solid #FCD34D', padding: '2px 8px', borderRadius: '20px', fontSize: '0.72rem', fontWeight: 800 }}>
                      <FaCrown /> Super Admin
                    </span>
                  )}
                </div>
                <div style={{ fontSize: '0.88rem', color: '#7A6965', marginTop: '2px' }}>
                  {adminUser?.email} • User ID: <strong>{adminUser?.username || 'admin'}</strong>
                </div>
              </div>

              {/* Choose from Luxury Presets */}
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#5A4A42', display: 'block', marginBottom: '8px' }}>
                Or select an Atelier Avatar preset:
              </label>

              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
                {PRESET_AVATARS.map((p) => {
                  const isSelected = avatarPreview === p.url;
                  return (
                    <div
                      key={p.id}
                      onClick={() => {
                        setAvatarPreview(p.url);
                        setAvatarErr('');
                      }}
                      title={p.label}
                      style={{
                        width: '46px',
                        height: '46px',
                        borderRadius: '50%',
                        cursor: 'pointer',
                        border: isSelected ? '3px solid #C89B3C' : '2px solid #E8D8B5',
                        boxShadow: isSelected ? '0 0 0 2px rgba(200, 155, 60, 0.4)' : 'none',
                        overflow: 'hidden',
                        transition: 'transform 0.15s'
                      }}
                    >
                      <img src={p.url} alt={p.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  );
                })}
              </div>

              {/* Save Avatar Button */}
              {avatarPreview !== adminUser?.avatar && (
                <button
                  type="button"
                  onClick={handleSaveAvatar}
                  disabled={isSavingAvatar}
                  style={{
                    background: 'linear-gradient(135deg, #E8C86A 0%, #C89B3C 100%)',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '9px 22px',
                    borderRadius: '50px',
                    fontWeight: 700,
                    fontSize: '0.88rem',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: '0 4px 15px rgba(200, 155, 60, 0.3)'
                  }}
                >
                  <FaCheck /> {isSavingAvatar ? 'Saving Photo...' : 'Save New Profile Picture'}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* SECTION 2: Change Password Form */}
        <div style={{ background: '#FFFFFF', padding: '1.8rem', borderRadius: '20px', border: '1px solid #E8D8B5', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: '0 0 1.2rem 0', color: '#2D2523', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FaKey style={{ color: '#C89B3C' }} /> Change Admin Password
          </h3>

          {pwdMsg && (
            <div style={{ background: '#DCFCE7', border: '1px solid #86EFAC', color: '#15803D', padding: '10px 14px', borderRadius: '10px', fontSize: '0.88rem', fontWeight: 700, marginBottom: '1rem' }}>
              ✓ {pwdMsg}
            </div>
          )}

          {pwdErr && (
            <div style={{ background: '#FEE2E2', border: '1px solid #FCA5A5', color: '#DC2626', padding: '10px 14px', borderRadius: '10px', fontSize: '0.88rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <FaExclamationCircle /> {pwdErr}
            </div>
          )}

          <form onSubmit={handlePasswordSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '450px' }}>
            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 700, display: 'block', marginBottom: '4px', color: '#2D2523' }}>Current Password *</label>
              <input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder="Enter current password"
                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #E8D8B5', boxSizing: 'border-box', outline: 'none' }}
                required
              />
            </div>

            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 700, display: 'block', marginBottom: '4px', color: '#2D2523' }}>New Password *</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #E8D8B5', boxSizing: 'border-box', outline: 'none' }}
                required
              />
            </div>

            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 700, display: 'block', marginBottom: '4px', color: '#2D2523' }}>Confirm New Password *</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #E8D8B5', boxSizing: 'border-box', outline: 'none' }}
                required
              />
            </div>

            <button
              type="submit"
              disabled={submittingPwd}
              style={{ background: 'linear-gradient(135deg, #E8C86A 0%, #C89B3C 100%)', color: '#FFF', border: 'none', padding: '11px 24px', borderRadius: '50px', fontWeight: 700, cursor: 'pointer', marginTop: '0.5rem', alignSelf: 'flex-start', boxShadow: '0 4px 12px rgba(200, 155, 60, 0.25)' }}
            >
              {submittingPwd ? 'Updating Password...' : 'Update Password'}
            </button>
          </form>
        </div>

        {/* SECTION 3: Store Configuration Information */}
        <div style={{ background: '#FFFFFF', padding: '1.8rem', borderRadius: '20px', border: '1px solid #E8D8B5', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: '0 0 1.2rem 0', color: '#2D2523', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FaStore style={{ color: '#C89B3C' }} /> Store Environment Settings
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.2rem', fontSize: '0.88rem' }}>
            <div>
              <span style={{ color: '#7A6965', display: 'block' }}>Store Brand Name</span>
              <strong style={{ color: '#2D2523' }}>Diya Handcrafts</strong>
            </div>
            <div>
              <span style={{ color: '#7A6965', display: 'block' }}>Official Contact Phone / WhatsApp</span>
              <strong style={{ color: '#2D2523' }}>+91 79816 64314</strong>
            </div>
            <div>
              <span style={{ color: '#7A6965', display: 'block' }}>Default Currency</span>
              <strong style={{ color: '#2D2523' }}>INR (₹)</strong>
            </div>
            <div>
              <span style={{ color: '#7A6965', display: 'block' }}>Platform Environment</span>
              <strong style={{ color: '#16A34A' }}>Production Ready (React + Vite)</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
