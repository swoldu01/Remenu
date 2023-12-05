import React, { useState, useEffect } from 'react';
import jwt_decode from "jwt-decode";
import axios from 'axios';
import Cookies from 'js-cookie';

const RestaurantDropdown = () => {
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        const token = Cookies.get('jwt');
        if (!token) {
            // Handle the absence of a token (e.g., redirect to login)
            return;
        }

        // Decode the token to get user data
        const decodedToken = jwt_decode(token);
        const userRole = decodedToken.role; // Assuming 'role' is a part of the token payload

        // Set the URL based on the user role
        const url = userRole === 'admin' ? 'http://localhost:5000/admin/restaurants' : 'http://localhost:5000/owner/restaurants';
        
        axios.get(url, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
            setRestaurants(response.data);
        })
        .catch(error => {
            console.error('Error fetching restaurants:', error);
        });
    }, []);

    return (
        <select>
            {restaurants.map(restaurant => (
                <option key={restaurant._id} value={restaurant._id}>
                    {restaurant.name} - {restaurant.location}
                </option>
            ))}
        </select>
    );
};

export default RestaurantDropdown;
