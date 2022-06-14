import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from '../contexts/auth';
import { Login } from '../views';
import { Signup, CompanySignup, AspirantSignup } from '../views/Signup';

const PublicRoutes = () => {
  const { idToken } = useAuth();
  if (idToken) return null;
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signup/company" element={<CompanySignup />} />
      <Route path="/signup/aspirant" element={<AspirantSignup />} />
    </Routes>
  );
};

export default PublicRoutes;
