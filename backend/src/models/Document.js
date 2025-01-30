const mongoose = require('mongoose');

const DocumentSchema = new mongoose.Schema({
    blockchainId: {
        type: String,
        required: true,
        unique: true
    },
    documentType: {
        type: String,
        enum: ['Transferable', 'Verifiable'],
        required: true
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    metadata: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    },
    documentHash: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Draft', 'Active', 'Verified', 'Transferred', 'Revoked'],
        default: 'Draft'
    },
    endorsementChain: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    expiryDate: {
        type: Date
    }
}, { 
    timestamps: true 
});

module.exports = mongoose.model('Document', DocumentSchema);
