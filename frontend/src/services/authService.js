import axios from 'axios';
import { Magic } from 'magic-sdk';

class AuthService {
  constructor() {
    this.magic = new Magic(process.env.REACT_APP_MAGIC_PUBLISHABLE_KEY);
    this.api = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_URL
    });
  }

  async login(email) {
    try {
      // Initiate Magic Link login
      await this.magic.auth.loginWithMagicLink({ email });
      
      // Get user metadata
      const metadata = await this.magic.user.getMetadata();
      
      // Send token to backend for verification
      const response = await this.api.post('/auth/magic-link', {
        email: metadata.email
      });

      // Store token and user info
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      return response.data;
    } catch (error) {
      console.error('Login error', error);
      throw error;
    }
  }

  async register(userData) {
    try {
      // Send registration data to backend
      const response = await this.api.post('/auth/register', userData);

      // Store token and user info
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      return response.data;
    } catch (error) {
      console.error('Registration error', error);
      throw error;
    }
  }

  async logout() {
    try {
      // Logout from Magic Link
      await this.magic.user.logout();
      
      // Clear local storage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    } catch (error) {
      console.error('Logout error', error);
    }
  }

  isAuthenticated() {
    return !!localStorage.getItem('token');
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  async getProfile() {
    try {
      const response = await this.api.get('/auth/profile');
      return response.data.user;
    } catch (error) {
      console.error('Profile fetch error', error);
      throw error;
    }
  }
}

export default new AuthService();
