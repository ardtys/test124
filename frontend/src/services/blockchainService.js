// services/blockchainService.js
import Web3 from 'web3';
import DocumentRegistryABI from '../contracts/DocumentRegistry.json';
import DocumentManagementABI from '../contracts/DocumentManagement.json';

class BlockchainService {
    constructor() {
        this.web3 = new Web3(process.env.REACT_APP_BLOCKCHAIN_PROVIDER);

        this.documentRegistryContract = new this.web3.eth.Contract(
            DocumentRegistryABI, 
            process.env.REACT_APP_DOCUMENT_REGISTRY_CONTRACT_ADDRESS
        );

        this.documentManagementContract = new this.web3.eth.Contract(
            DocumentManagementABI, 
            process.env.REACT_APP_DOCUMENT_MANAGEMENT_CONTRACT_ADDRESS
        );
    }

    // Implement similar methods as backend service
}

export default new BlockchainService();
