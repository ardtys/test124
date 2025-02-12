import React, { useState, useEffect } from 'react';
import DocumentService from '../services/documentService';
import { useNavigate } from 'react-router-dom';

const DocumentListPage = () => {
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const fetchedDocuments = await DocumentService.getDocuments();
                setDocuments(fetchedDocuments);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch documents');
                setLoading(false);
            }
        };

        fetchDocuments();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Documents</h1>
            {documents.map(doc => (
                <div key={doc.id} className="border p-4 mb-2">
                    <h2>{doc.title || 'Untitled Document'}</h2>
                </div>
            ))}
        </div>
    );
};

export default DocumentListPage;
