import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DocumentService from '../services/documentService';
import AuthService from '../services/authService';
import { logout } from '../store/authSlice';

const DashboardPage = () => {
    const { user } = useSelector((state) => state.auth);
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

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

    const handleTransferDocument = () => {
        navigate('/documents/transfer');
    };

    const handleLogout = async () => {
        try {
            await AuthService.logout();
            dispatch(logout());
            navigate('/login');
        } catch (err) {
            console.error('Logout failed', err);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div>Loading...</div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">XDC Trade</h1>
                <div className="flex space-x-4">
                    <button 
                        onClick={handleCreateDocument}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Create Document
                    </button>
                    <button 
                        // onClick={}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Verify Document
                    </button>
                    <button 
                        onClick={handleTransferDocument}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Transfer Document
                    </button>
                    <button 
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                        Logout
                    </button>
                </div>
            </div>

            <div className="bg-white shadow-md rounded-lg">
                <div className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Welcome, {user?.email}</h2>
                    
                    <section className="mt-6">
                        <h3 className="text-lg font-medium mb-3">Your Documents</h3>
                        {error && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                                {error}
                            </div>
                        )}

                        {documents.length === 0 ? (
                            <div className="text-gray-500 text-center py-6">
                                No documents found. Create your first document!
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {documents.map((doc) => (
                                    <div 
                                        key={doc.id} 
                                        className="border rounded-lg p-4 hover:shadow-md transition"
                                    >
                                        <h4 className="font-semibold mb-2">{doc.title || 'Untitled Document'}</h4>
                                        <p className="text-sm text-gray-600">
                                            Created: {new Date(doc.createdAt).toLocaleDateString()}
                                        </p>
                                        <div className="mt-4 flex justify-between">
                                            <button 
                                                onClick={() => navigate(`/documents/${doc.id}`)}
                                                className="text-blue-500 hover:underline"
                                            >
                                                View Details
                                            </button>
                                            <span className="text-sm text-gray-500">
                                                {doc.status}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
