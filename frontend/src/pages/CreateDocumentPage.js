import React from 'react';
import { useNavigate } from 'react-router-dom';

const CreateDocumentPage = () => {
    const navigate = useNavigate();

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Create Document</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">Guided Document Creation</h2>
                    <p className="text-gray-600 mb-4">
                        Step-by-step wizard to create your document with ease.
                    </p>
                    <button 
                        onClick={() => navigate('/documents/create/wizard')}
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                    >
                        Start Wizard
                    </button>
                </div>

                <div className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">Manual Document Creation</h2>
                    <p className="text-gray-600 mb-4">
                        Manually enter document details without a guided process.
                    </p>
                    <button 
                        className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
                        disabled
                    >
                        Coming Soon
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateDocumentPage;
