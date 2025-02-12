import React, { useState } from 'react';

const DocumentFormStep = ({ 
    onNext, 
    onPrevious, 
    documentType, 
    uploadedFile 
}) => {
    const [formData, setFormData] = useState({});
    const [documentName, setDocumentName] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = () => {
        onNext({ 
            formData, 
            documentName 
        });
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6 text-center">
                Fill Document Details
            </h2>

            <div className="mb-4">
                <label className="block mb-2">Document Name</label>
                <input
                    type="text"
                    value={documentName}
                    onChange={(e) => setDocumentName(e.target.value)}
                    className="w-full px-3 py-2 border rounded"
                    placeholder="Enter document name"
                />
            </div>

            {uploadedFile && (
                <div className="mb-4">
                    <p>Uploaded File: {uploadedFile.name}</p>
                </div>
            )}

            <div className="flex justify-between mt-6">
                <button 
                    onClick={onPrevious}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                >
                    Previous
                </button>
                <button 
                    onClick={handleSubmit}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Issue Document
                </button>
            </div>
        </div>
    );
};

export default DocumentFormStep;
