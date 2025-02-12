import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  
  return token ? (
      children
  ) : (
      <Navigate to="/login" replace />
  );
};
