const express = require('express');
const User = require('../models/User');
const AuthMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Existing login route with 2FA support
router.post('/login', async (req, res) => {
    try {
        const { email, password, twoFactorToken } = req.body;

        // Find user
        const user = await User.findOne({ email }).select('+twoFactorSecret');
        
        if (!user) {
            return res.status(401).json({ 
                message: 'Invalid credentials' 
            });
        }

        // Check password
        const isMatch = await user.comparePassword(password);
        
        if (!isMatch) {
            return res.status(401).json({ 
                message: 'Invalid credentials' 
            });
        }

        // Check if 2FA is enabled
        if (user.twoFactorEnabled) {
            // Require 2FA token
            if (!twoFactorToken) {
                return res.status(206).json({ 
                    message: 'Two-factor authentication required',
                    twoFactorRequired: true
                });
            }

            // Verify 2FA token
            const isValidToken = user.verifyTwoFactorToken(twoFactorToken);
            
            if (!isValidToken) {
                return res.status(401).json({ 
                    message: 'Invalid two-factor authentication token' 
                });
            }
        }

        // Generate token
        const token = AuthMiddleware.generateToken(user);

        res.json({
            message: 'Login successful',
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                twoFactorEnabled: user.twoFactorEnabled
            },
            token
        });
    } catch (error) {
        res.status(500).json({ 
            message: 'Login failed', 
            error: error.message 
        });
    }
});

module.exports = router;
