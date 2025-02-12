import React, { useState } from 'react';

const DOCUMENT_TYPES = [
    {
        id: 'bill-of-lading',
        name: 'TradeTrust Bill of Lading v2 (Carrier)',
        description: 'Bill of Lading document for carrier'
    },
    {
        id: 'certificate-of-origin',
        name: 'TradeTrust ChAFTA Certificate of Origin v2',
        description: 'Certificate of Origin document'
    },
    {
        id: 'invoice',
        name: 'TradeTrust Invoice v2 (DNS-DID)',
        description: 'Invoice document with DNS-DID'
    }
];

const DocumentTypeStep = ({ onNext, onPrevious, initialData = '' }) => {
    const [selectedType, setSelectedType] = useState(initialData);

    const handleSubmit = () => {
        if (!selectedType) {
            alert('Please select a document type');
            return;
        }
        onNext({ documentType: selectedType });
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6 text-center">
                Choose Document Type
            </h2>

            <div className="space-y-4">
                {DOCUMENT_TYPES.map((type) => (
                    <div 
                        key={type.id}
                        onClick={() => setSelectedType(type.id)}
                        className={`
                            border rounded p-4 cursor-pointer 
                            ${selectedType === type.id 
                                ? 'border-blue-500 bg-blue-50' 
                                : 'border-gray-300'
                            }
                        `}
                    >
                        <h3 className="font-semibold">{type.name}</h3>
                        <p className="text-sm text-gray-600">{type.description}</p>
                    </div>
                ))}
            </div>

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
                    Next
                </button>
            </div>
        </div>
    );
};

export default DocumentTypeStep;
