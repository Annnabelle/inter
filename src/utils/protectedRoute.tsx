import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserRole } from './roles';

const isAuthenticated = (): boolean => {
  const token = localStorage.getItem('accessToken');
  return !!token; 
};

const getUserRole = (): UserRole | null => {
  return localStorage.getItem('userRole') as UserRole | null;
};

interface ProtectedRouteProps {
  allowedRoles: UserRole[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const userRole = getUserRole();

  if (!isAuthenticated() || !userRole) {
    return <Navigate to="/" replace />;
  }

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/main" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

