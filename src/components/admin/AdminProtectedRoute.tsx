import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { isAdminAuthenticated } from '../../utils/adminAuth';

const AdminProtectedRoute: React.FC = () => {
  const location = useLocation();

  if (!isAdminAuthenticated()) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  }

  return <Outlet />;
};

export default AdminProtectedRoute;
