import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext';
import {
  FaChartLine,
  FaBoxOpen,
  FaPlusCircle,
  FaTags,
  FaShoppingCart,
  FaUsers,
  FaWarehouse,
  FaCog,
  FaSignOutAlt,
  FaSearch,
  FaBars,
  FaTimes,
  FaHome,
  FaImages,
  FaStar,
  FaUserShield,
  FaCrown
} from 'react-icons/fa';
import './AdminLayout.css';

const AdminLayout = ({ children }) => {
  const { adminUser, logout, hasPermission } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin', { replace: true });
  };

  const getRoleClass = (role) => {
    if (role === 'SUPER_ADMIN') return 'role-super-admin';
    if (role === 'ADMIN') return 'role-admin';
    return 'role-staff';
  };

  const formatRoleLabel = (role) => {
    if (role === 'SUPER_ADMIN') return 'Super Admin';
    if (role === 'ADMIN') return 'Admin';
    return 'Staff';
  };

  return (
    <div className="admin-shell">
      {/* Sidebar Navigation */}
      <aside className={`admin-sidebar ${mobileOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-header">
          <span className="sidebar-logo-icon">✨</span>
          <div>
            <div className="sidebar-logo-title">Diya Handcrafts</div>
            <span className="sidebar-logo-subtitle">ADMIN CONTROL PANEL</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}
            onClick={() => setMobileOpen(false)}
          >
            <FaChartLine /> Dashboard
          </NavLink>

          <NavLink
            to="/admin/products"
            end
            className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}
            onClick={() => setMobileOpen(false)}
          >
            <FaBoxOpen /> All Products
          </NavLink>

          {hasPermission('canAddProducts') && (
            <NavLink
              to="/admin/products/add"
              className={({ isActive }) => `sidebar-nav-item sidebar-nav-subitem ${isActive ? 'active' : ''}`}
              onClick={() => setMobileOpen(false)}
            >
              <FaPlusCircle /> Add Product
            </NavLink>
          )}

          {hasPermission('canManageCategories') && (
            <NavLink
              to="/admin/categories"
              className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}
              onClick={() => setMobileOpen(false)}
            >
              <FaTags /> Categories
            </NavLink>
          )}

          <NavLink
            to="/admin/gallery"
            className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}
            onClick={() => setMobileOpen(false)}
          >
            <FaImages /> Gallery Photos
          </NavLink>

          <NavLink
            to="/admin/reviews"
            className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}
            onClick={() => setMobileOpen(false)}
          >
            <FaStar /> Customer Reviews
          </NavLink>

          {hasPermission('canManageOrders') && (
            <NavLink
              to="/admin/orders"
              className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}
              onClick={() => setMobileOpen(false)}
            >
              <FaShoppingCart /> Orders
            </NavLink>
          )}

          {hasPermission('canManageCustomers') && (
            <NavLink
              to="/admin/customers"
              className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}
              onClick={() => setMobileOpen(false)}
            >
              <FaUsers /> Customers
            </NavLink>
          )}

          {hasPermission('canManageInventory') && (
            <NavLink
              to="/admin/inventory"
              className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}
              onClick={() => setMobileOpen(false)}
            >
              <FaWarehouse /> Inventory
            </NavLink>
          )}

          {(adminUser?.role === 'SUPER_ADMIN' || hasPermission('canManageAdmins')) && (
            <NavLink
              to="/admin/users"
              className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}
              style={{ borderLeft: '3px solid #D4AF37' }}
              onClick={() => setMobileOpen(false)}
            >
              <FaUserShield style={{ color: '#D4AF37' }} /> Admin & Staff Profiles
            </NavLink>
          )}

          {hasPermission('canChangeSettings') && (
            <NavLink
              to="/admin/settings"
              className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}
              onClick={() => setMobileOpen(false)}
            >
              <FaCog /> Settings
            </NavLink>
          )}

          <a href="/" target="_blank" rel="noopener noreferrer" className="sidebar-nav-item" style={{ marginTop: 'auto' }}>
            <FaHome /> Customer Site ↗
          </a>
        </nav>

        <div className="sidebar-footer">
          <button className="sidebar-nav-item" style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer' }} onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content Viewport */}
      <div className="admin-main-viewport">
        {/* Topbar */}
        <header className="admin-topbar">
          <div className="topbar-left">
            <button className="mobile-menu-btn" onClick={() => setMobileOpen((prev) => !prev)}>
              {mobileOpen ? <FaTimes /> : <FaBars />}
            </button>
            <div className="topbar-search-box">
              <FaSearch className="topbar-search-icon" />
              <input type="text" placeholder="Search products, orders..." />
            </div>
          </div>

          <div className="topbar-right">
            {adminUser && (
              <div className="topbar-user-badge">
                <img src={adminUser.avatar} alt={adminUser.name} className="user-avatar" />
                <div className="user-meta-info">
                  <span className="user-name">{adminUser.name}</span>
                  <span className={`user-role-tag ${getRoleClass(adminUser.role)}`}>
                    {formatRoleLabel(adminUser.role)}
                  </span>
                </div>
              </div>
            )}

            <button className="btn-topbar-logout" onClick={handleLogout} title="Sign Out">
              <FaSignOutAlt /> Sign Out
            </button>
          </div>
        </header>

        {/* Page Body */}
        <main className="admin-page-container">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
