import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserRole } from './roles';

const getUserRole = (): UserRole => {
  return localStorage.getItem('userRole') as UserRole;
};

interface ProtectedRouteProps {
  allowedRoles: UserRole[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const userRole = getUserRole();

  return allowedRoles.includes(userRole) ? <Outlet /> : <Navigate to="/main" replace />;
};

export default ProtectedRoute;
