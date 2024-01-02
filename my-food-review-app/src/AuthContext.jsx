import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  const checkAuthToken = () => {
    const token = Cookies.get('jwt');
    return !!token;
  };

  const refreshAuthToken = async () => {
    try {
      const refreshToken = Cookies.get('refreshToken');
      const response = await axios.post('http://localhost:5000/auth/refresh-token', { refreshToken });
      const { accessToken, role } = response.data;
      Cookies.set('jwt', accessToken, { expires: 1, sameSite: 'Strict' });
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      setIsAuthenticated(true);
      setUserRole(role);
    } catch (error) {
      setIsAuthenticated(false);
      setUserRole(null);
      Cookies.remove('jwt');
      Cookies.remove('refreshToken');
    }
  };

  useEffect(() => {
    if (checkAuthToken()) {
      refreshAuthToken();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, refreshAuthToken }}>
      {children}
    </AuthContext.Provider>
  );
};