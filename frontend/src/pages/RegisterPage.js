import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AuthService from '../services/authService';
import { login } from '../store/authSlice';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        walletAddress: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Validate form inputs
    const validateForm = () => {
        const { username, email, password, confirmPassword } = formData;
        
        // Basic validation
        if (!username || !email || !password) {
            setError('Please fill in all required fields');
            return false;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Please enter a valid email address');
            return false;
        }

        // Password validation
        if (password.length < 6) {
            setError('Password must be at least 6 characters long');
            return false;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return false;
        }

        return true;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Validate form
        if (!validateForm()) {
            setLoading(false);
            return;
        }

        try {
            // Prepare registration data
            const { username, email, password, walletAddress } = formData;
            
            // Call backend registration
            const response = await AuthService.register({
                username,
                email,
                password,
                walletAddress
            });

            // Dispatch login action
            dispatch(login(response.user));

            // Redirect to dashboard
            navigate('/dashboard');
        } catch (err) {
            // Handle registration error
            setError(err.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
                
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    {/* Form fields as in previous implementation */}
                    {/* (Keep the entire form from the previous RegisterPage.js) */}
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
