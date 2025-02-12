import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DocumentService from '../../services/documentService';

const DocumentList = () => {
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const fetchedDocuments = await DocumentService.getUserDocuments();
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

    const handleViewDocument = (documentId) => {
        navigate(`/documents/${documentId}`);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="spinner">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-red-500">{error}</div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">My Documents</h1>
                <button 
                    onClick={handleCreateDocument}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Create New Document
                </button>
            </div>

            {documents.length === 0 ? (
                <div className="text-center py-8">
                    <p className="text-gray-600">No documents found</p>
                    <button 
                        onClick={handleCreateDocument}
                        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Create Your First Document
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {documents.map((document) => (
                        <div 
                            key={document.id} 
                            className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow"
                        >
                            <h2 className="text-xl font-semibold mb-2">
                                {document.metadata?.title || 'Untitled Document'}
                            </h2>
                            
                            <div className="text-sm text-gray-600 mb-4">
                                <p>Type: {document.documentType}</p>
                                <p>Status: {document.status}</p>
                                <p>
                                    Created: {new Date(document.createdAt).toLocaleDateString()}
                                </p>
                            </div>

                            <div className="flex justify-between items-center">
                                <button 
                                    onClick={() => handleViewDocument(document.id)}
                                    className="text-blue-500 hover:underline"
                                >
                                    View Details
                                </button>
                                
                                {document.documentType === 'Transferable' && (
                                    <span className="text-green-500 text-sm">
                                        Transferable
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DocumentList;
