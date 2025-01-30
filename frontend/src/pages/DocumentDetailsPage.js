import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DocumentService from '../services/documentService';

const DocumentDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [document, setDocument] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDocumentDetails = async () => {
            try {
                const docDetails = await DocumentService.getDocumentById(id);
                setDocument(docDetails);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch document details');
                setLoading(false);
            }
        };

        fetchDocumentDetails();
    }, [id]);

    const handleTransfer = () => {
        navigate(`/documents/${id}/transfer`);
    };

    const handleVerify = async () => {
        try {
            await DocumentService.verifyDocument(id);
            // Refresh document details
            const updatedDoc = await DocumentService.getDocumentById(id);
            setDocument(updatedDoc);
        } catch (err) {
            setError('Verification failed');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div>Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-red-500">{error}</div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-8">
                <h1 className="text-2xl font-bold mb-6">Document Details</h1>

                <div className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-bold">Title</label>
                        <p>{document.metadata.title}</p>
                    </div>

                    <div>
                        <label className="block text-gray-700 font-bold">Description</label>
                        <p>{document.metadata.description}</p>
                    </div>

                    <div>
                        <label className="block text-gray-700 font-bold">Document Number</label>
                        <p>{document.metadata.documentNumber}</p>
                    </div>

                    <div>
                        <label className="block text-gray-700 font-bold">Type</label>
                        <p>{document.documentType}</p>
                    </div>

                    <div>
                        <label className="block text-gray-700 font-bold">Status</label>
                        <p>{document.status}</p>
                    </div>

                    <div>
                        <label className="block text-gray-700 font-bold">Created At</label>
                        <p>{new Date(document.createdAt).toLocaleString()}</p>
                    </div>
                </div>

                <div className="mt-6 flex space-x-4">
                    {document.documentType === 'Transferable' && (
                        <button
                            onClick={handleTransfer}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Transfer Document
                        </button>
                    )}

                    {document.status !== 'Verified' && (
                        <button
                            onClick={handleVerify}
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                        >
                            Verify Document
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DocumentDetailsPage;
