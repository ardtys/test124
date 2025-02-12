import api from './api';

class DocumentService {
    async createDocument(documentData) {
        try {
            const response = await api.post('/documents/create', documentData);
            return response.data;
        } catch (error) {
            console.error('Document creation error', error);
            throw error;
        }
    }

    async uploadDocumentFile(file) {
        const formData = new FormData();
        formData.append('document', file);

        try {
            const response = await api.post('/documents/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (error) {
            console.error('File upload error', error);
            throw error;
        }
    }

    getDocumentTemplates() {
        return [
            {
                id: 'bill-of-lading',
                name: 'TradeTrust Bill of Lading v2 (Carrier)',
                description: 'Bill of Lading document for carrier',
                templateUrl: '/templates/bill-of-lading.json'
            },
            {
                id: 'certificate-of-origin',
                name: 'TradeTrust ChAFTA Certificate of Origin v2',
                description: 'Certificate of Origin document',
                templateUrl: '/templates/certificate-of-origin.json'
            },
            {
                id: 'invoice',
                name: 'TradeTrust Invoice v2 (DNS-DID)',
                description: 'Invoice document with DNS-DID',
                templateUrl: '/templates/invoice.json'
            }
        ];
    }

    async downloadTemplate(templateId) {
        const templates = this.getDocumentTemplates();
        const template = templates.find(t => t.id === templateId);

        if (!template) {
            throw new Error('Template not found');
        }

        try {
            const response = await fetch(template.templateUrl);
            const blob = await response.blob();
            
            // Create download link
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${template.id}-template.json`;
            document.body.appendChild(a);
            a.click();
            a.remove();
        } catch (error) {
            console.error('Template download error', error);
            throw error;
        }
    }
}

export default new DocumentService();
