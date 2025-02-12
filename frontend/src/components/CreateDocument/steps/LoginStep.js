import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginStep = ({ onNext }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Bypass authentication for now
        // Create a mock user object
        const mockUser = {
            id: '123456',
            email: email,
            username: email.split('@')[0],
            role: 'user'
        };

        // Store mock user in localStorage
        localStorage.setItem('token', 'mock_token_123456');
        localStorage.setItem('user', JSON.stringify(mockUser));

        // Navigate to next step or dashboard
        onNext({ 
            loginCredentials: { 
                email, 
                userId: mockUser.id 
            } 
        });

        // Optional: Navigate to dashboard
        navigate('/dashboard');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6 text-center">
                    Login (Bypassed)
                </h2>

                <form onSubmit={handleSubmit}>
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
                        />
                    </div>
                    
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Continue (Mock Login)
                        </button>
                    </div>
                </form>

                <div className="mt-4 text-center text-red-500">
                    <p>⚠️ Authentication is currently disabled</p>
                </div>
            </div>
        </div>
    );
};

export default LoginStep;
