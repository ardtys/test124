import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DocumentService from '../services/documentService';

const TransferDocumentPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [recipientAddress, setRecipientAddress] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleTransfer = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await DocumentService.transferDocument(id, recipientAddress);
            navigate(`/documents/${id}`);
        } catch (err) {
            setError(err.message || 'Document transfer failed');
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-8">
                <h1 className="text-2xl font-bold mb-6">Transfer Document</h1>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleTransfer}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Recipient Address
                        </label>
                        <input
                            type="text"
                            value={recipientAddress}
                            onChange={(e) => setRecipientAddress(e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                            placeholder="Enter recipient blockchain address"
                            required
                        />
                    </div>

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
                        {loading ? 'Transferring...' : 'Transfer Document'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default TransferDocumentPage;
