const jwt = require('jsonwebtoken');
const User = require('../models/User');

class AuthMiddleware {
    async authenticate(req, res, next) {
        try {
            const token = req.header('Authorization').replace('Bearer ', '');
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            const user = await User.findOne({ 
                _id: decoded.id 
            });

            if (!user) {
                throw new Error();
            }

            req.token = token;
            req.user = user;
            next();
        } catch (error) {
            res.status(401).send({ error: 'Please authenticate' });
        }
    }

    requireVerifierRole(req, res, next) {
        if (req.user.role !== 'verifier' && req.user.role !== 'admin') {
            return res.status(403).json({ 
                error: 'Access denied. Verifier role required.' 
            });
        }
        next();
    }

    requireTransferrerRole(req, res, next) {
        if (req.user.role !== 'creator' && req.user.role !== 'admin') {
            return res.status(403).json({ 
                error: 'Access denied. Transfer role required.' 
            });
        }
        next();
    }
}

module.exports = new AuthMiddleware();
