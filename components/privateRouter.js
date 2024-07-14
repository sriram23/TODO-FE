// PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = sessionStorage.getItem('todo_token');
  
  return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
