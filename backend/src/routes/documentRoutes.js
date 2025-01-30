const express = require('express');
const DocumentController = require('../controllers/documentController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post(
    '/create', 
    authMiddleware.authenticate,
    DocumentController.createDocument
);

router.post(
    '/:documentId/verify', 
    authMiddleware.authenticate,
    authMiddleware.requireVerifierRole,
    DocumentController.verifyDocument
);

router.post(
    '/:documentId/transfer', 
    authMiddleware.authenticate,
    authMiddleware.requireTransferrerRole,
    DocumentController.transferDocument
);

module.exports = router;
