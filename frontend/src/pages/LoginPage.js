import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AuthService from '../services/authService';
import { login } from '../store/authSlice';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Validate email
            if (!email || !email.includes('@')) {
                setError('Please enter a valid email address');
                setLoading(false);
                return;
            }

            const userData = await AuthService.login(email);
            
            // Update Redux store
            dispatch(login(userData.user));
            
            // Redirect to dashboard
            navigate('/dashboard');
        } catch (err) {
            console.error('Login Error:', err);
            setError(err.message || 'Login failed. Please try again.');
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label 
                            htmlFor="email" 
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter your email"
                            required
                            disabled={loading}
                        />
                    </div>
                    <button
                        type="submit"
                        className={`
                            w-full py-2 px-4 rounded 
                            ${loading 
                                ? 'bg-gray-400 cursor-not-allowed' 
                                : 'bg-blue-500 hover:bg-blue-700 text-white'
                            }
                        `}
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Login with Magic Link'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
