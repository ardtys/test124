import axios from 'axios';
import { Magic } from 'magic-sdk';

class AuthService {
    constructor() {
        // Validate Magic Link key with explicit error
        if (!process.env.REACT_APP_MAGIC_PUBLISHABLE_KEY) {
            console.error('❌ CRITICAL: Magic Publishable Key is NOT SET');
            throw new Error('Magic Publishable Key is missing');
        }

        // Initialize Magic Link with maximum verbosity
        this.magic = new Magic(process.env.REACT_APP_MAGIC_PUBLISHABLE_KEY, {
            logging: true,
            network: 'mainnet' // or 'testnet' depending on your setup
        });
        
        // Enhanced axios configuration
        this.api = axios.create({
            baseURL: process.env.REACT_APP_BACKEND_URL || 'http://localhost:3000/api',
            timeout: 15000, // Increased timeout
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });

        // Comprehensive request interceptor
        this.api.interceptors.request.use(
            (config) => {
                console.group('🚀 Axios Request');
                console.log('URL:', config.url);
                console.log('Method:', config.method);
                console.log('Headers:', config.headers);
                console.log('Data:', config.data);
                console.groupEnd();
                
                const token = localStorage.getItem('token');
                if (token) {
                    config.headers['Authorization'] = `Bearer ${token}`;
                }
                return config;
            },
            (error) => {
                console.error('❌ Request Interceptor Error:', error);
                return Promise.reject(error);
            }
        );

        // Comprehensive response interceptor
        this.api.interceptors.response.use(
            (response) => {
                console.group('✅ Axios Response');
                console.log('Status:', response.status);
                console.log('Data:', response.data);
                console.groupEnd();
                return response;
            },
            (error) => {
                console.group('❌ Axios Response Error');
                console.error('Status:', error.response?.status);
                console.error('Data:', error.response?.data);
                console.error('Message:', error.message);
                console.error('Full Error:', error);
                console.groupEnd();
                return Promise.reject(error);
            }
        );
    }

    // Enhanced email validation
    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = emailRegex.test(String(email).toLowerCase());
        console.log(`Email Validation: ${email} - ${isValid}`);
        return isValid;
    }

    async login(email) {
        console.group('🔐 Login Process');
        console.log('Attempting login for:', email);

        try {
            // Comprehensive email validation
            if (!this.validateEmail(email)) {
                console.error('❌ Invalid email format');
                throw new Error('Invalid email format. Please enter a valid email.');
            }

            // Magic Link Login with comprehensive options
            console.log('🔮 Initiating Magic Link Login');
            const magicLinkResult = await this.magic.auth.loginWithMagicLink({ 
                email,
                showUI: true
            });
            console.log('Magic Link Login Result:', magicLinkResult);

            // Retrieve user metadata
            console.log('🕵️ Retrieving User Metadata');
            const metadata = await this.magic.user.getMetadata();
            console.log('Magic Link Metadata:', metadata);

            // Get DID Token for backend verification
            console.log('🔑 Generating DID Token');
            const didToken = await this.magic.user.getIdToken();
            console.log('DID Token Generated');

            // Comprehensive backend login request
            console.log('📡 Sending Login Request to Backend');
            const response = await this.api.post('/auth/magic-link', {
                email: metadata.email,
                publicAddress: metadata.publicAddress,
                didToken: didToken
            });

            console.log('🎉 Backend Login Response:', response.data);

            // Store authentication details
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));

            console.groupEnd();
            return response.data;

        } catch (error) {
            console.group('❌ Login Error');
            console.error('Complete Login Process Error:', {
                name: error.name,
                message: error.message,
                stack: error.stack,
                responseData: error.response?.data
            });
            console.groupEnd();

            // Detailed error handling
            if (error.response) {
                console.error('Server Error Response:', error.response.data);
                throw new Error(
                    error.response.data.message || 
                    'Login failed. Please check your credentials and try again.'
                );
            } else if (error.request) {
                console.error('No Response Received:', error.request);
                throw new Error('No response from server. Check your network connection.');
            } else {
                console.error('Request Setup Error:', error.message);
                throw new Error(error.message || 'Login request failed. Please try again.');
            }
        }
    }

    // Other methods remain the same
}

export default new AuthService();
