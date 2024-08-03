import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const token = localStorage.getItem('token'); // or use context/state for auth
  
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
