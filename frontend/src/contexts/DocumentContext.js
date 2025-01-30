import React, { createContext, useState, useContext } from 'react';
import DocumentService from '../services/documentService';

const DocumentContext = createContext(null);

export const DocumentProvider = ({ children }) => {
    const [documents, setDocuments] = useState([]);
    const [currentDocument, setCurrentDocument] = useState(null);

    const createDocument = async (documentData) => {
        const newDocument = await DocumentService.createDocument(documentData);
        setDocuments(prev => [...prev, newDocument]);
        return newDocument;
    };

    const fetchDocuments = async () => {
        const fetchedDocuments = await DocumentService.getDocuments();
        setDocuments(fetchedDocuments);
        return fetchedDocuments;
    };

    const fetchDocumentById = async (documentId) => {
        const document = await DocumentService.getDocumentById(documentId);
        setCurrentDocument(document);
        return document;
    };

    const verifyDocument = async (documentId) => {
        const verifiedDocument = await DocumentService.verifyDocument(documentId);
        
        // Update documents list
        setDocuments(prev => 
            prev.map(doc => 
                doc.id === documentId ? verifiedDocument : doc
            )
        );

        // Update current document if it's the same
        if (currentDocument && currentDocument.id === documentId) {
            setCurrentDocument(verifiedDocument);
        }

        return verifiedDocument;
    };

    const transferDocument = async (documentId, recipientId) => {
        const transferredDocument = await DocumentService.transferDocument(documentId, recipientId);
        
        // Update documents list
        setDocuments(prev => 
            prev.map(doc => 
                doc.id === documentId ? transferredDocument : doc
            )
        );

        // Update current document if it's the same
        if (currentDocument && currentDocument.id === documentId) {
            setCurrentDocument(transferredDocument);
        }

        return transferredDocument;
    };

    return (
        <DocumentContext.Provider 
            value={{ 
                documents,
                currentDocument,
                createDocument,
                fetchDocuments,
                fetchDocumentById,
                verifyDocument,
                transferDocument
            }}
        >
            {children}
        </DocumentContext.Provider>
    );
};

export const useDocument = () => useContext(DocumentContext);
