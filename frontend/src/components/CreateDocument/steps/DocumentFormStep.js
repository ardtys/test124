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

            <h2 className="font-bold text-lg mt-10 mb-2">Transferable Record Owner</h2>

            <div className="mb-4">
                <label className="block mb-2">owner</label>
                <input
                    type="text"
                    className="w-full px-3 py-2 border rounded"
                />
            </div>
            <div className="mb-6">
                <label className="block mb-2">Holder</label>
                <input
                    type="text"
                    className="w-full px-3 py-2 border rounded"
                />
            </div>

            <hr></hr>

            <div className="mb-4 mt-5">
                <label className="block mb-2">BL Number</label>
                <input
                    type="text"
                    className="w-full px-3 py-2 border rounded"
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2">Standard Carrier Alpha Code (SCAC)</label>
                <input
                    type="text"
                    className="w-full px-3 py-2 border rounded"
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2">Signed for the Carrier</label>
                <input
                    type="text"
                    className="w-full px-3 py-2 border rounded"
                />
            </div>

            <hr></hr>

            <h2 className="font-bold text-lg mt-5 mb-2">shipper</h2>
            <div className="mb-5">
                <label className="block mb-2">name</label>
                <input
                    type="text"
                    className="w-full px-3 py-2 border rounded"
                />
            </div>

            <hr></hr>

            <h2 className="font-bold text-lg mt-5 mb-2">Address</h2>
            <div className="mb-5">
                <label className="block mb-2">street</label>
                <input
                    type="text"
                    className="w-full px-3 py-2 border rounded"
                />
            </div>
            <div className="mb-5">
                <label className="block mb-2">country</label>
                <input
                    type="text"
                    className="w-full px-3 py-2 border rounded"
                />
            </div>
            <div className="mb-5">
                <label className="block mb-2">Onward Inland Routing</label>
                <input
                    type="text"
                    className="w-full px-3 py-2 border rounded"
                />
            </div>

            <hr></hr>

            <h2 className="font-bold text-lg mt-5 mb-2">consignee</h2>
            <div className="mb-5">
                <label className="block mb-2">is consigned to (e.g. TO ORDER OF, TO ORDER, etc..)</label>
                <input
                    type="text"
                    className="w-full px-3 py-2 border rounded"
                />
            </div>
            <div className="mb-5">
                <label className="block mb-2">name</label>
                <input
                    type="text"
                    className="w-full px-3 py-2 border rounded"
                />
            </div>

            <hr></hr>

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
