import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '../contexts/auth';

const AspirantRoutes = () => {
  const { idToken, user } = useAuth();

  if (!idToken || user.role !== 'aspirant') {
    return null;
  }

  return <Outlet />;
};

export default AspirantRoutes;
