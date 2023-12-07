import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Form, Button, InputGroup, FormControl, ListGroup } from 'react-bootstrap';

const AdminUserUpdate = () => {
    const [searchEmail, setSearchEmail] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [formValues, setFormValues] = useState({
        username: '',
        email: '',
        role: '',
        isEmailVerified: ''
    });

    const searchUsers = async () => {
        if (!searchEmail) {
            setSearchResults([]);
            return;
        }
        try {
            const token = Cookies.get('jwt');
            const response = await axios.get(`http://localhost:5000/admin/users/search?email=${searchEmail}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setSearchResults(response.data);
        } catch (error) {
            console.error('Error searching users:', error);
        }
    };

    useEffect(() => {
        if (selectedUser) {
            setFormValues({
                username: selectedUser.username || '',
                email: selectedUser.email || '',
                role: selectedUser.role || '',
                isEmailVerified: selectedUser.isEmailVerified.toString() || 'false'
            });
        }
    }, [selectedUser]);

    const handleSelectUser = (user) => {
        setSelectedUser(user);
    };

    const handleInputChange = (e) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = Cookies.get('jwt');
            await axios.put(`http://localhost:5000/admin/users/${selectedUser._id}`, {
                ...formValues,
                isEmailVerified: formValues.isEmailVerified === 'true',
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('User updated successfully');
            // Optional: Refresh user data or re-fetch user list
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

     const handleDeleteUser = async () => {
        if (!selectedUser) return;

        try {
            const token = Cookies.get('jwt');
            await axios.delete(`http://localhost:5000/admin/users/${selectedUser._id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('User deleted successfully');

            // Update the state to reflect the deletion
            setSelectedUser(null);
            setSearchResults(searchResults.filter(user => user._id !== selectedUser._id));
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <div>
            <InputGroup className="mb-3">
                <FormControl
                    placeholder="Search user by email"
                    value={searchEmail}
                    onChange={(e) => setSearchEmail(e.target.value)}
                />
                <Button onClick={searchUsers}>Search</Button>
            </InputGroup>

            {searchResults.length > 0 && (
                <ListGroup>
                    {searchResults.map((user) => (
                        <ListGroup.Item key={user._id} onClick={() => handleSelectUser(user)}>
                            {user.email}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )}

            {selectedUser && (
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            name="username"
                            value={formValues.username}
                            onChange={handleInputChange}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            value={formValues.email}
                            onChange={handleInputChange}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Role</Form.Label>
                        <Form.Control as="select" name="role" value={formValues.role} onChange={handleInputChange}>
                            <option value="owner">Owner</option>
                            <option value="reviewer">Reviewer</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Email Verified</Form.Label>
                        <Form.Control as="select" name="isEmailVerified" value={formValues.isEmailVerified} onChange={handleInputChange}>
                            <option value="true">True</option>
                            <option value="false">False</option>
                        </Form.Control>
                    </Form.Group>

                    <Button variant="primary" type="submit" className="mt-3">
                        Update User
                    </Button>
                    <Button variant="danger" onClick={handleDeleteUser} className="mt-3">
                        Delete User
                    </Button>
                </Form>
            )}
        </div>
    );
};

export default AdminUserUpdate;

