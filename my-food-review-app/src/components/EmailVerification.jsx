import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EmailVerification = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParams.get('token');
    const [verificationStatus, setVerificationStatus] = useState('');

    useEffect(() => {
        if (token) {
            verifyEmail(token);
        }
    }, [token]);

    const verifyEmail = async (token) => {
        try {
            const response = await axios.get(`http://localhost:5000/auth/verify-email?token=${token}`);
            setVerificationStatus('success');
            // Redirect to login page after a short delay
            setTimeout(() => navigate('/login'), 3000);
        } catch (error) {
            setVerificationStatus('error');
            console.error('Verification error:', error);
        }
    };

    return (
        <div>
            {verificationStatus === '' && <p>Verifying your email, please wait...</p>}
            {verificationStatus === 'success' && <p>Email verified successfully! Redirecting to login...</p>}
            {/* {verificationStatus === 'error' && <p>Failed to verify email. Please try again.</p>} */}
        </div>
    );
};

export default EmailVerification;
