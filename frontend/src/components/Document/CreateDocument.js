import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DocumentService from '../../services/documentService';

const CreateDocument = () => {
    const [documentType, setDocumentType] = useState('Transferable');
    const [metadata, setMetadata] = useState({
        title: '',
        description: '',
        documentNumber: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setMetadata(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const newDocument = await DocumentService.createDocument({
                documentType,
                metadata
            });

            navigate(`/documents/${newDocument.id}`);
        } catch (err) {
            setError(err.response?.data?.message || 'Document creation failed');
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-8">
                <h1 className="text-2xl font-bold mb-6">Create New Document</h1>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Document Type
                        </label>
                        <select
                            value={documentType}
                            onChange={(e) => setDocumentType(e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                        >
                            <option value="Transferable">Transferable</option>
                            <option value="Verifiable">Verifiable</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={metadata.title}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded"
                            placeholder="Enter document title"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={metadata.description}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded"
                            placeholder="Enter document description"
                            rows="4"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Document Number
                        </label>
                        <input
                            type="text"
                            name="documentNumber"
                            value={metadata.documentNumber}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded"
                            placeholder="Enter document number"
                            required
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            disabled={loading}
                            className={`
                                w-full py-2 px-4 rounded 
                                ${loading 
                                    ? 'bg-gray-400 cursor-not-allowed' 
                                    : 'bg-blue-500 hover:bg-blue-700 text-white'
                                }
                            `}
                        >
                            {loading ? 'Creating...' : 'Create Document'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateDocument;
