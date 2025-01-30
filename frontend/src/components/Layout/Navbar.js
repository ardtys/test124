import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/authSlice';
import AuthService from '../../services/authService';

const Navbar = () => {
    const { isAuthenticated, user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await AuthService.logout();
            dispatch(logout());
            navigate('/login');
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    return (
        <nav className="bg-blue-600 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold">
                    Document Management
                </Link>

                <div className="flex items-center space-x-4">
                    {isAuthenticated ? (
                        <>
                            <Link to="/dashboard" className="hover:text-blue-200">
                                Dashboard
                            </Link>
                            <Link to="/documents" className="hover:text-blue-200">
                                Documents
                            </Link>
                            <Link to="/documents/create" className="hover:text-blue-200">
                                Create Document
                            </Link>
                            <span className="text-sm">
                                Welcome, {user?.username || user?.email}
                            </span>
                            <button 
                                onClick={handleLogout}
                                className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="hover:text-blue-200">
                                Login
                            </Link>
                            <Link to="/register" className="hover:text-blue-200">
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
