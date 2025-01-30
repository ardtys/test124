// services/blockchainService.js
const Web3 = require('web3');
const DocumentRegistryABI = require('../contracts/DocumentRegistry.json');
const DocumentManagementABI = require('../contracts/DocumentManagement.json');

class BlockchainService {
    constructor() {
        // Initialize Web3 with XDC Testnet provider
        this.web3 = new Web3(process.env.BLOCKCHAIN_PROVIDER);

        // Initialize contract instances
        this.documentRegistryContract = new this.web3.eth.Contract(
            DocumentRegistryABI, 
            process.env.DOCUMENT_REGISTRY_CONTRACT_ADDRESS
        );

        this.documentManagementContract = new this.web3.eth.Contract(
            DocumentManagementABI, 
            process.env.DOCUMENT_MANAGEMENT_CONTRACT_ADDRESS
        );
    }

    // Methods for interacting with DocumentRegistry
    async createDocument(documentData) {
        const accounts = await this.web3.eth.getAccounts();
        
        return this.documentManagementContract.methods.createDocument(
            documentData.category,
            documentData.documentHash,
            documentData.expiryDate
        ).send({ 
            from: accounts[0], 
            gas: 300000 
        });
    }

    // Methods for interacting with DocumentManagement
    async transferDocument(documentId, newHolder) {
        const accounts = await this.web3.eth.getAccounts();
        
        return this.documentManagementContract.methods.transferDocument(
            documentId, 
            newHolder
        ).send({ 
            from: accounts[0], 
            gas: 300000 
        });
    }

    // Add more methods as needed
}

module.exports = new BlockchainService();
