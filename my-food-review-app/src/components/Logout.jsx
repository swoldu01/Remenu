import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            // Call backend logout endpoint
            await axios.post('http://localhost:5000/auth/logout');

            // Remove tokens from cookies or local storage
            Cookies.remove('jwt');
            Cookies.remove('refreshToken');

            // Update authentication state (e.g., using React Context or Redux)

            // Redirect user to login page or home page
            navigate('/login');
        } catch (error) {
            console.error('Logout error:', error.response);
            // Handle errors (e.g., show error message)
        }
    };

    return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
