const express = require('express');
const User = require('../models/User');
const { Magic } = require('@magic-sdk/admin');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Initialize Magic Admin SDK
const magic = new Magic(process.env.MAGIC_SECRET_KEY);

router.post('/magic-link', async (req, res) => {
    try {
        const { email, publicAddress, didToken } = req.body;

        // Validate input
        if (!email || !didToken) {
            return res.status(400).json({ 
                message: 'Missing required fields' 
            });
        }

        // Validate Magic Link token
        try {
            await magic.token.validate(didToken);
        } catch (validationError) {
            console.error('Magic Link Token Validation Error:', validationError);
            return res.status(401).json({ 
                message: 'Invalid Magic Link token' 
            });
        }

        // Find or create user
        let user = await User.findOne({ 
            $or: [
                { email },
                { publicAddress }
            ]
        });

        if (!user) {
            // Create new user
            try {
                user = new User({
                    email,
                    username: email.split('@')[0],
                    publicAddress,
                    role: 'user'
                });

                await user.save();
            } catch (saveError) {
                console.error('User Creation Error:', saveError);
                return res.status(500).json({ 
                    message: 'Failed to create user account' 
                });
            }
        }

        // Generate JWT token
        const token = jwt.sign(
            { 
                id: user._id, 
                email: user.email,
                role: user.role
            }, 
            process.env.JWT_SECRET, 
            { 
                expiresIn: '1d'
            }
        );

        // Successful response
        res.status(200).json({
            token,
            user: {
                id: user._id,
                email: user.email,
                username: user.username,
                role: user.role
            }
        });
    } catch (error) {
        console.error('Authentication Error:', error);
        res.status(500).json({ 
            message: 'Authentication failed. Please try again.' 
        });
    }
});

module.exports = router;
