import React, { createContext, useState, useContext, useEffect } from 'react';
import AuthService from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (token && storedUser) {
            setUser(JSON.parse(storedUser));
            setIsAuthenticated(true);
        }
    }, []);

    const login = async (email, password) => {
        const userData = await AuthService.login(email, password);
        setUser(userData.user);
        setIsAuthenticated(true);
        return userData;
    };

    const register = async (userData) => {
        const registeredUser = await AuthService.register(userData);
        setUser(registeredUser.user);
        setIsAuthenticated(true);
        return registeredUser;
    };

    const logout = () => {
        AuthService.logout();
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider 
            value={{ 
                user, 
                isAuthenticated, 
                login, 
                register, 
                logout 
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
