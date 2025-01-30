const Document = require('../models/Document');
const BlockchainService = require('../services/blockchainService');
const crypto = require('crypto');

class DocumentController {
    // Create Document
    async createDocument(req, res) {
        try {
            const { documentType, metadata } = req.body;
            const creator = req.user._id;

            // Generate document hash
            const documentHash = crypto.createHash('sha256')
                .update(JSON.stringify(metadata))
                .digest('hex');

            // Prepare blockchain transaction data
            const blockchainDocumentData = {
                category: documentType === 'Transferable' ? 0 : 1,
                documentType: 0, // Default document type
                documentHash,
                expiryDate: Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60,
                metadataKeys: Object.keys(metadata).map(key => 
                    Buffer.from(key, 'utf8')
                ),
                metadataValues: Object.values(metadata).map(value => 
                    Buffer.from(JSON.stringify(value), 'utf8')
                )
            };

            // Create document on blockchain
            const blockchainId = await BlockchainService.createDocument(blockchainDocumentData);

            // Create document in database
            const document = new Document({
                blockchainId,
                documentType,
                creator,
                metadata,
                documentHash,
                status: 'Draft'
            });

            await document.save();

            res.status(201).json({
                message: 'Document created successfully',
                document
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Verify Document
    async verifyDocument(req, res) {
        try {
            const { documentId } = req.params;
            
            const document = await Document.findById(documentId);
            
            if (!document) {
                return res.status(404).json({ error: 'Document not found' });
            }

            // Verify on blockchain
            await BlockchainService.verifyDocument(
                document.blockchainId, 
                document.documentHash
            );

            // Update local document status
            document.status = 'Verified';
            await document.save();

            res.json({
                message: 'Document verified successfully',
                document
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Transfer Document
    async transferDocument(req, res) {
        try {
            const { documentId } = req.params;
            const { newHolder } = req.body;

            const document = await Document.findById(documentId);
            
            if (!document) {
                return res.status(404).json({ error: 'Document not found' });
            }

            // Transfer on blockchain
            await BlockchainService.transferDocument(
                document.blockchainId, 
                newHolder
            );

            // Update local document
            document.status = 'Transferred';
            document.endorsementChain.push(newHolder);
            await document.save();

            res.json({
                message: 'Document transferred successfully',
                document
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new DocumentController();
