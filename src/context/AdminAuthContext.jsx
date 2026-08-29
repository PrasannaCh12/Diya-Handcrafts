import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  getActiveAdminSession,
  authenticateAdmin,
  logoutAdminSession,
  updateAdminPassword
} from '../services/adminAuthService';

const AdminAuthContext = createContext(null);

export const ROLE_PERMISSIONS = {
  SUPER_ADMIN: {
    canViewDashboard: true,
    canAddProducts: true,
    canEditProducts: true,
    canDeleteProducts: true,
    canRestoreProducts: true,
    canUploadImages: true,
    canManageCategories: true,
    canManageOrders: true,
    canManageCustomers: true,
    canManageInventory: true,
    canManageAdmins: true,
    canChangeSettings: true,
    canViewAnalytics: true
  },
  ADMIN: {
    canViewDashboard: true,
    canAddProducts: true,
    canEditProducts: true,
    canDeleteProducts: false,
    canRestoreProducts: false,
    canUploadImages: true,
    canManageCategories: true,
    canManageOrders: true,
    canManageCustomers: true,
    canManageInventory: true,
    canManageAdmins: false,
    canChangeSettings: false,
    canViewAnalytics: true
  },
  STAFF: {
    canViewDashboard: true,
    canAddProducts: false,
    canEditProducts: true,
    canDeleteProducts: false,
    canRestoreProducts: false,
    canUploadImages: false,
    canManageCategories: false,
    canManageOrders: true,
    canManageCustomers: false,
    canManageInventory: true,
    canManageAdmins: false,
    canChangeSettings: false,
    canViewAnalytics: false
  }
};

export const AdminAuthProvider = ({ children }) => {
  const [adminUser, setAdminUser] = useState(() => getActiveAdminSession());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const session = getActiveAdminSession();
    if (session) {
      setAdminUser(session);
    }
  }, []);

  const login = async (emailOrUsername, password) => {
    setLoading(true);
    try {
      const res = await authenticateAdmin(emailOrUsername, password);
      if (res.success) {
        setAdminUser(res.user);
      }
      return res;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    logoutAdminSession();
    setAdminUser(null);
  };

  const changePassword = async (oldPassword, newPassword) => {
    if (!adminUser) return { success: false, message: 'Not authenticated' };
    return await updateAdminPassword(adminUser.id, oldPassword, newPassword);
  };

  const hasPermission = (permissionKey) => {
    if (!adminUser || !adminUser.role) return false;
    const roleConfig = ROLE_PERMISSIONS[adminUser.role];
    return roleConfig ? Boolean(roleConfig[permissionKey]) : false;
  };

  return (
    <AdminAuthContext.Provider
      value={{
        adminUser,
        isAuthenticated: Boolean(adminUser),
        loading,
        login,
        logout,
        changePassword,
        hasPermission
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};
