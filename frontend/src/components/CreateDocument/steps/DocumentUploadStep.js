import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const DocumentUploadStep = ({ onNext, onPrevious, initialData = null }) => {
    const [file, setFile] = useState(initialData);

    const onDrop = useCallback((acceptedFiles) => {
        const uploadedFile = acceptedFiles[0];
        setFile(uploadedFile);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'application/json': ['.json'],
            'text/csv': ['.csv']
        }
    });

    const handleSubmit = () => {
        onNext({ uploadedFile: file });
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6 text-center">
                Upload Configuration
            </h2>

            <div 
                {...getRootProps()}
                className={`
                    border-2 border-dashed p-8 text-center 
                    ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}
                `}
            >
                <input {...getInputProps()} />
                {file ? (
                    <div>
                        <p>Selected File: {file.name}</p>
                        <p>Type: {file.type}</p>
                        <p>Size: {file.size} bytes</p>
                    </div>
                ) : (
                    <p>
                        Drag 'n' drop your configuration file here, 
                        or click to select file (JSON/CSV)
                    </p>
                )}
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
                    disabled={!file}
                    className={`
                        px-4 py-2 rounded
                        ${file 
                            ? 'bg-blue-500 text-white' 
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }
                    `}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default DocumentUploadStep;
