import React, { useState } from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { FaUserShield, FaKey, FaStore, FaCheck, FaExclamationCircle } from 'react-icons/fa';

const AdminSettings = () => {
  const { adminUser, changePassword } = useAdminAuth();

  // Password state
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pwdMsg, setPwdMsg] = useState('');
  const [pwdErr, setPwdErr] = useState('');
  const [submittingPwd, setSubmittingPwd] = useState(false);

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
    <div className="admin-settings-page" style={{ maxWidth: '850px', margin: '0 auto' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.85rem', fontWeight: 700, margin: 0 }}>Admin Settings & Profile</h1>
        <p style={{ fontSize: '0.9rem', color: '#7A6965', margin: '4px 0 0 0' }}>Manage profile security, change password & view store settings</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* SECTION 1: Active Admin Profile */}
        <div style={{ background: '#FFFFFF', padding: '1.8rem', borderRadius: '20px', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0 0 1.2rem 0', color: '#2D2523', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FaUserShield style={{ color: '#C89B3C' }} /> Active Account Information
          </h3>

          {adminUser && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
              <img src={adminUser.avatar} alt={adminUser.name} style={{ width: '70px', height: '70px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #C89B3C' }} />
              <div>
                <h4 style={{ margin: '0 0 4px 0', fontSize: '1.2rem', color: '#2D2523' }}>{adminUser.name}</h4>
                <div style={{ fontSize: '0.88rem', color: '#7A6965' }}>{adminUser.email}</div>
                <div style={{ marginTop: '8px' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, padding: '4px 12px', borderRadius: '50px', background: '#FEF3C7', color: '#92400E' }}>
                    Role: {adminUser.role}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* SECTION 2: Change Password Form */}
        <div style={{ background: '#FFFFFF', padding: '1.8rem', borderRadius: '20px', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0 0 1.2rem 0', color: '#2D2523', display: 'flex', alignItems: 'center', gap: '8px' }}>
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
              <label style={{ fontSize: '0.82rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Current Password *</label>
              <input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder="Enter current password"
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #E5DFD5', boxSizing: 'border-box' }}
                required
              />
            </div>

            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>New Password *</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #E5DFD5', boxSizing: 'border-box' }}
                required
              />
            </div>

            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Confirm New Password *</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #E5DFD5', boxSizing: 'border-box' }}
                required
              />
            </div>

            <button
              type="submit"
              disabled={submittingPwd}
              style={{ background: 'linear-gradient(135deg, #E8C86A 0%, #C89B3C 100%)', color: '#FFF', border: 'none', padding: '11px 24px', borderRadius: '50px', fontWeight: 700, cursor: 'pointer', marginTop: '0.5rem', alignSelf: 'flex-start' }}
            >
              {submittingPwd ? 'Updating Password...' : 'Update Password'}
            </button>
          </form>
        </div>

        {/* SECTION 3: Store Configuration Information */}
        <div style={{ background: '#FFFFFF', padding: '1.8rem', borderRadius: '20px', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0 0 1.2rem 0', color: '#2D2523', display: 'flex', alignItems: 'center', gap: '8px' }}>
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
