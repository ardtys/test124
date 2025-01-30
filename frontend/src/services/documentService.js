import axios from 'axios';

class DocumentService {
    constructor() {
        // Create axios instance
        this.api = axios.create({
            baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000/api'
        });

        // Request interceptor for adding token
        this.api.interceptors.request.use(
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

        // Response interceptor for error handling
        this.api.interceptors.response.use(
            (response) => response,
            (error) => {
                // Handle specific error scenarios
                if (error.response) {
                    switch (error.response.status) {
                        case 401:
                            // Token expired or unauthorized, redirect to login
                            this.handleUnauthorized();
                            break;
                        case 403:
                            throw new Error('Access denied');
                        case 404:
                            throw new Error('Resource not found');
                        case 500:
                            throw new Error('Server error');
                        default:
                            throw new Error(
                                error.response.data.message || 'An unexpected error occurred'
                            );
                    }
                } else if (error.request) {
                    // Request made but no response received
                    throw new Error('No response from server');
                } else {
                    // Error in setting up the request
                    throw new Error('Error setting up request');
                }
            }
        );
    }

    // Handle unauthorized access
    handleUnauthorized() {
        // Clear token and redirect to login
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
    }

    // Create Document
    async createDocument(documentData) {
        try {
            const response = await this.api.post('/documents/create', documentData);
            return response.data;
        } catch (error) {
            this.handleError(error, 'Document creation failed');
        }
    }

    // Verify Document
    async verifyDocument(documentId) {
        try {
            const response = await this.api.post(`/documents/${documentId}/verify`);
            return response.data;
        } catch (error) {
            this.handleError(error, 'Document verification failed');
        }
    }

    // Transfer Document
    async transferDocument(documentId, recipientId) {
        try {
            const response = await this.api.post(`/documents/${documentId}/transfer`, { recipientId });
            return response.data;
        } catch (error) {
            this.handleError(error, 'Document transfer failed');
        }
    }

    // Get All Documents
    async getUserDocuments() {
        try {
            const response = await this.api.get('/documents');
            return response.data.documents || [];
        } catch (error) {
            this.handleError(error, 'Failed to fetch documents');
        }
    }

    // Get Document by ID
    async getDocumentById(documentId) {
        try {
            const response = await this.api.get(`/documents/${documentId}`);
            return response.data;
        } catch (error) {
            this.handleError(error, 'Failed to fetch document');
        }
    }

    // Generic Error Handler
    handleError(error, defaultMessage) {
        if (error.response) {
            // Server responded with an error
            const errorMessage = error.response.data.message || defaultMessage;
            console.error('API Error:', errorMessage);
            throw new Error(errorMessage);
        } else if (error.request) {
            // Request made but no response received
            console.error('Network Error:', error.request);
            throw new Error('Network error. Please check your connection.');
        } else {
            // Error in setting up the request
            console.error('Request Setup Error:', error.message);
            throw new Error(defaultMessage);
        }
    }

    // Additional Utility Methods

    // Check if a document is transferable
    isTransferable(document) {
        return document.documentType === 'Transferable';
    }

    // Get document status color
    getStatusColor(status) {
        switch (status) {
            case 'Draft':
                return 'text-gray-500';
            case 'Active':
                return 'text-green-500';
            case 'Verified':
                return 'text-blue-500';
            case 'Transferred':
                return 'text-purple-500';
            case 'Revoked':
                return 'text-red-500';
            default:
                return 'text-gray-500';
        }
    }
}

export default new DocumentService();
