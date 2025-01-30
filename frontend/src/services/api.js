import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add request interceptor for authentication
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor for handling errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle specific error responses
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // Unauthorized - redirect to login or refresh token
                    window.location.href = '/login';
                    break;
                case 403:
                    // Forbidden - show error message
                    console.error('Access denied');
                    break;
                case 500:
                    // Server error
                    console.error('Server error');
                    break;
            }
        }
        return Promise.reject(error);
    }
);

export default api;
