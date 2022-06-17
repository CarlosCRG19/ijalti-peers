import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/auth';

const SharedRoutes = () => {
  const { idToken } = useAuth();
  if (!idToken) {
    return null;
  }
  return <Outlet />;
};

export default SharedRoutes;
