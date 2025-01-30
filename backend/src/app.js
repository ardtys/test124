const express = require('express');
const cors = require('cors');
const connectDatabase = require('./config/database');
const authRoutes = require('./routes/authRoutes');

class App {
    constructor() {
        this.app = express();
        this.initializeMiddlewares();
        this.initializeRoutes();
        this.connectDatabase();
    }

    initializeMiddlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    initializeRoutes() {
        // Root health check
        this.app.get('/', (req, res) => {
            res.json({ 
                message: 'Backend is running',
                status: 'OK' 
            });
        });

        // Authentication routes
        this.app.use('/api/auth', authRoutes);
    }

    connectDatabase() {
        connectDatabase();
    }

    // Add this method to return the Express app
    getApp() {
        return this.app;
    }
}

// Export an instance of the App
module.exports = new App();
