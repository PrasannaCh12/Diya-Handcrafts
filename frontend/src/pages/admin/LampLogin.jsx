import React, { useState, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { FaExclamationCircle, FaLock, FaUser, FaGoogle, FaGithub, FaSpinner } from 'react-icons/fa';
import './LampLogin.css';

const LampLogin = () => {
  const { login, isAuthenticated } = useAdminAuth();
  const navigate = useNavigate();

  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Lamp state & animation mechanics
  const [lampOn, setLampOn] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const [isPullingChain, setIsPullingChain] = useState(false);

  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const handlePullChain = () => {
    setIsPullingChain(true);
    setTimeout(() => {
      setLampOn((prev) => !prev);
      setIsPullingChain(false);
    }, 180);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!emailOrUsername.trim() || !password.trim()) {
      setError('Please fill in both email/username and password');
      return;
    }

    setSubmitting(true);
    try {
      const res = await login(emailOrUsername, password);
      if (res.success) {
        navigate('/admin/dashboard', { replace: true });
      } else {
        setError(res.message || 'Invalid username or password');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="lamp-login-page">
      {/* Subtle Floating Particles Background */}
      <div className="floating-particles">
        <div className="particle" style={{ width: '8px', height: '8px', top: '15%', left: '20%', animationDelay: '0s' }}></div>
        <div className="particle" style={{ width: '12px', height: '12px', top: '35%', left: '75%', animationDelay: '2s' }}></div>
        <div className="particle" style={{ width: '6px', height: '6px', top: '65%', left: '15%', animationDelay: '4s' }}></div>
        <div className="particle" style={{ width: '10px', height: '10px', top: '80%', left: '80%', animationDelay: '1s' }}></div>
        <div className="particle" style={{ width: '7px', height: '7px', top: '45%', left: '50%', animationDelay: '3s' }}></div>
      </div>

      <div className="lamp-login-wrapper">
        {/* PURE CSS/REACT ANIMATED LAMP */}
        <div className={`lamp-container ${lampOn ? 'lamp-on' : ''} ${isFocused ? 'focused' : ''}`}>
          <div className="lamp-cord"></div>
          <div className="lamp-shade">
            <div className="lamp-bulb"></div>
          </div>

          {/* Interactive Pull Chain */}
          <div
            className={`lamp-chain-wrap ${isPullingChain ? 'pulling' : ''}`}
            onClick={handlePullChain}
            title="Click to pull chain (toggle light)"
          >
            <div className="lamp-chain-line"></div>
            <div className="lamp-chain-handle"></div>
          </div>
        </div>

        {/* Light Beam Cone */}
        <div className="light-beam"></div>

        {/* LOGIN CARD GLASSMORPHISM */}
        <div className={`login-card ${!lampOn ? 'lamp-off-card' : ''} ${isFocused ? 'focused-card' : ''}`}>
          <div className="login-card-header">
            <span className="login-brand-tag">✨ DIYA HANDCRAFTS ATELIER</span>
            <h1 className="login-card-title">Welcome Back</h1>
            <p className="login-card-subtitle">Enter your details to access your admin portal</p>
          </div>

          {error && (
            <div className="login-error-alert">
              <FaExclamationCircle />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Username / Email Field */}
            <div className="form-group">
              <label className="form-label">Username or Email</label>
              <div className="input-wrapper">
                <input
                  type="text"
                  className="input-field"
                  placeholder="admin@diyahandcrafts.com"
                  value={emailOrUsername}
                  onChange={(e) => setEmailOrUsername(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  disabled={submitting}
                  autoComplete="username"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="input-field"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  disabled={submitting}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="toggle-password-btn"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn-login-submit" disabled={submitting}>
              {submitting ? (
                <>
                  <FaSpinner className="fa-spin" />
                  <span>Signing In...</span>
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* OAuth Section */}
          <div className="oauth-divider">
            <span>OR CONTINUE WITH</span>
          </div>

          <div className="oauth-buttons-grid">
            <button type="button" className="btn-oauth-disabled" disabled title="OAuth is not configured">
              <FaGoogle /> Google
            </button>
            <button type="button" className="btn-oauth-disabled" disabled title="OAuth is not configured">
              <FaGithub /> GitHub
            </button>
          </div>

          {/* Seeded Credentials Quick Hint */}
          <div className="demo-creds-hint">
            <strong>🔑 Seeded Administrator Accounts:</strong>
            <div>• Super Admin: <code>admin@diyahandcrafts.com</code> / <code>DiyaAdmin@2026#1</code></div>
            <div>• Manager: <code>manager@diyahandcrafts.com</code> / <code>DiyaManager@2026#2</code></div>
            <div>• Staff: <code>staff@diyahandcrafts.com</code> / <code>DiyaStaff@2026#3</code></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LampLogin;
