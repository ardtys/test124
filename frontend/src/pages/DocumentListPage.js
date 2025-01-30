import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DocumentService from '../services/documentService';

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

    const handleCreateDocument = () => {
        navigate('/documents/create');
    };

    if (loading) return <div>Loading documents...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Documents</h1>
            <button 
                onClick={handleCreateDocument}
                className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
            >
                Create New Document
            </button>

            {documents.length === 0 ? (
                <p>No documents found</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {documents.map((doc) => (
                        <div 
                            key={doc.id} 
                            className="border rounded p-4 shadow-md"
                        >
                            <h2 className="text-xl font-semibold">
                                {doc.title || 'Untitled Document'}
                            </h2>
                            <p>{doc.documentType}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DocumentListPage;
