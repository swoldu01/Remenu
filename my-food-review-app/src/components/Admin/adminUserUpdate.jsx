import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import Cookies from 'js-cookie';
// import * as Yup from 'yup';
import axios from 'axios';
import { Form, Button, InputGroup, FormControl, ListGroup } from 'react-bootstrap'

const AdminUserUpdate = () => {
    const [searchEmail, setSearchEmail] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [userRole, setUserRole] = useState('');
    const [isEmailVerified, setIsEmailVerified] = useState(false);

    const searchUsers = async () => {
        if (!searchEmail) {
            setSearchResults([]);
            return;
        }
        try {
            const token = Cookies.get('jwt');
           const response = await axios.get(`http://localhost:5000/admin/users/search?email=${searchEmail}`,{
               headers: { Authorization: `Bearer ${token}` }
             });
            setSearchResults(response.data);
        } catch (error) {
            console.error('Error searching users:', error);
        }
    };

    // Handler for selecting a user from search results
    const handleSelectUser = (user) => {
        setSelectedUser(user);
        setUserRole(user.role); // Set the role for the selected user
        setIsEmailVerified(user.isEmailVerified); // Set the email verification status
    };

    // Handler for form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = Cookies.get('jwt');
            const formData = {
                email: selectedUser.email,
                role: userRole,
                isEmailVerified: isEmailVerified
            };
            await axios.put(`http://localhost:5000/admin/users/${selectedUser._id}`, formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('User updated successfully');
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    useEffect(() => {
        // Reset form when selectedUser changes
        if (selectedUser) {
            setUserRole(selectedUser.role);
            setIsEmailVerified(selectedUser.isEmailVerified);
        }
    }, [selectedUser]);

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
                <Form onSubmit= {handleSubmit}>
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            name="username"
                            value={selectedUser.username}
                            onChange={(e) => setSelectedUser({ ...selectedUser, username: e.target.value })}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            value={selectedUser.email}
                            onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Role</Form.Label>
                        <Form.Control as="select" value={userRole} onChange={(e) => setUserRole(e.target.value)}>
                            <option value="owner">Owner</option>
                            <option value="reviewer">Reviewer</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Email Verified</Form.Label>
                        <Form.Control as="select" value={isEmailVerified} onChange={(e) => setIsEmailVerified(e.target.value === 'true')}>
                            <option value="true">True</option>
                            <option value="false">False</option>
                        </Form.Control>
                    </Form.Group>

                    {/* Add additional form fields as needed */}

                    <Button variant="primary" type="submit">
                        Update User
                    </Button>
                </Form>
            )}
        </div>
    );
};

export default AdminUserUpdate;