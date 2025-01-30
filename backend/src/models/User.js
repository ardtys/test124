const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const speakeasy = require('speakeasy');

const UserSchema = new mongoose.Schema({
    // ... existing fields
    twoFactorSecret: {
        type: String,
        select: false // Prevent secret from being returned in queries
    },
    twoFactorEnabled: {
        type: Boolean,
        default: false
    },
    magicLinkVerified: {
        type: Boolean,
        default: false
    }
}, { 
    timestamps: true,
    toJSON: { 
        transform: (doc, ret) => {
            delete ret.password;
            delete ret.twoFactorSecret;
            return ret;
        }
    }
});

// Method to generate 2FA secret
UserSchema.methods.generateTwoFactorSecret = function() {
    const secret = speakeasy.generateSecret({ name: `DocumentManagement:${this.email}` });
    this.twoFactorSecret = secret.base32;
    return secret;
};

// Method to verify TOTP
UserSchema.methods.verifyTwoFactorToken = function(token) {
    return speakeasy.totp.verify({
        secret: this.twoFactorSecret,
        encoding: 'base32',
        token: token
    });
};

module.exports = mongoose.model('User', UserSchema);
