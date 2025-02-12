import React from 'react';

const DocumentSuccessStep = ({ 
    documentData, 
    onCreateAnother, 
    onDashboard 
}) => {
    const downloadDocument = () => {
        // Implement document download logic
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6 text-center">
                Document(s) Issued Successfully
            </h2>

            <div className="text-center">
                <p className="text-green-600 mb-4">
                    {documentData.formData.length || 1} document(s) issued
                </p>

                <div className="mb-6">
                    <button 
                        onClick={downloadDocument}
                        className="bg-blue-500 text-white px-4 py-2 rounded mr-4"
                    >
                        Download Document
                    </button>
                    <button 
                        onClick={downloadDocument}
                        className="bg-green-500 text-white px-4 py-2 rounded"
                    >
                        Download All
                    </button>
                </div>

                <div className="flex justify-center space-x-4">
                    <button 
                        onClick={onCreateAnother}
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                    >
                        Create Another Document
                    </button>
                    <button 
                        onClick={onDashboard}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Go to Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DocumentSuccessStep;
