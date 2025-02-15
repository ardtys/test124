import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import LoginStep from './steps/LoginStep';
import DocumentTypeStep from './steps/DocumentTypeStep';
import DocumentUploadStep from './steps/DocumentUploadStep';
import DocumentFormStep from './steps/DocumentFormStep';
import DocumentSuccessStep from './steps/DocumentSuccessStep';

const CreateDocumentWizard = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [documentData, setDocumentData] = useState({
        documentType: '',
        // loginCredentials: {},
        uploadedFile: null,
        formData: {}
    });

    const handleNextStep = (data) => {
        // Merge new data with existing
        setDocumentData(prev => ({
            ...prev,
            ...data
        }));
        
        // Move to next step
        setStep(prev => prev + 1);
    };

    const handlePreviousStep = () => {
        setStep(prev => prev - 1);
    };

    const renderStep = () => {
        switch(step) {
            case 1:
                return (
                    <DocumentUploadStep 
                    onNext={handleNextStep}
                    onPrevious={handlePreviousStep}
                    initialData={documentData.uploadedFile}
                    />
                );
                case 2:
                    return (
                    <DocumentTypeStep 
                        onNext={handleNextStep}
                        onPrevious={handlePreviousStep}
                        initialData={documentData.documentType}
                        />
                );
            case 3:
                return (
                    <DocumentFormStep 
                        onNext={handleNextStep}
                        onPrevious={handlePreviousStep}
                        documentType={documentData.documentType}
                        uploadedFile={documentData.uploadedFile}
                    />
                );
            case 4:
                return (
                    <DocumentSuccessStep 
                        documentData={documentData}
                        onCreateAnother={() => setStep(1)}
                        onDashboard={() => navigate('/dashboard')}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
                <div className="flex justify-center mb-6">
                    {/* Progress Indicator */}
                    <div className="flex space-x-2">
                        {[1, 2, 3, 4].map((num) => (
                            <div 
                                key={num}
                                className={`
                                    w-8 h-2 rounded-full 
                                    ${step === num 
                                        ? 'bg-blue-500' 
                                        : 'bg-gray-300'
                                    }
                                `}
                            />
                        ))}
                    </div>
                </div>
                
                {renderStep()}
            </div>
        </div>
    );
};

export default CreateDocumentWizard;
