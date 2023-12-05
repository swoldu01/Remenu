import { useState } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import AppRoutes from './components/appRoutes';
import Nav from './components/Nav'
import './App.css'

function App() {
  const navigate = useNavigate();

  axios.interceptors.response.use(
    response => response,
    async error => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const refreshToken = Cookies.get('refreshToken');
          const response = await axios.post('http://localhost:5000/auth/refresh-token', { refreshToken });
          const newToken = response.data.accessToken;
          Cookies.set('jwt', newToken, { expires: 1, sameSite: 'Strict' }); //might need to erase secure: true for testing purposes.
          axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
          return axios(originalRequest);
        } catch (refreshError) {
          navigate('/login');
        }
      }
      return Promise.reject(error);
    }
  );

  return (
    <div className="App">
      <Nav/>
    <AppRoutes />
  </div>
);
}

export default App
