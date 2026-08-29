import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext';

const ProtectedRoute = ({ children, requiredPermission }) => {
  const { isAuthenticated, hasPermission } = useAdminAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/admin" replace state={{ from: location }} />;
  }

  if (requiredPermission && !hasPermission(requiredPermission)) {
    return (
      <div style={{ padding: '3rem', textAlign: 'center', background: '#FFFFFF', borderRadius: '16px', margin: '2rem', border: '1px solid #FEE2E2' }}>
        <h2 style={{ color: '#DC2626', marginBottom: '0.5rem' }}>⚠️ Access Denied</h2>
        <p style={{ color: '#4B5563', marginBottom: '1.5rem' }}>You do not have sufficient role permissions to access this administrative feature.</p>
        <a href="/admin/dashboard" style={{ display: 'inline-block', background: '#C89B3C', color: '#FFF', padding: '10px 24px', borderRadius: '50px', fontWeight: 700, textDecoration: 'none' }}>
          Return to Dashboard
        </a>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
