// Email Validation
export const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
};

// Password Validation
export const validatePassword = (password) => {
    // At least 8 characters, one uppercase, one lowercase, one number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return passwordRegex.test(password);
};

// Username Validation
export const validateUsername = (username) => {
    // 3-16 characters, alphanumeric
    const usernameRegex = /^[a-zA-Z0-9_]{3,16}$/;
    return usernameRegex.test(username);
};

// Form Validation
export const validateForm = (formData, validationRules) => {
    const errors = {};

    Object.keys(validationRules).forEach(field => {
        const rules = validationRules[field];
        const value = formData[field];

        if (rules.required && !value) {
            errors[field] = `${field} is required`;
        }

        if (value) {
            if (rules.minLength && value.length < rules.minLength) {
                errors[field] = `${field} must be at least ${rules.minLength} characters`;
            }

            if (rules.maxLength && value.length > rules.maxLength) {
                errors[field] = `${field} must be at most ${rules.maxLength} characters`;
            }

            if (rules.type === 'email' && !validateEmail(value)) {
                errors[field] = 'Invalid email format';
            }

            if (rules.type === 'password' && !validatePassword(value)) {
                errors[field] = 'Password must contain uppercase, lowercase, and number';
            }
        }
    });

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};

// Document Metadata Validation
export const validateDocumentMetadata = (metadata) => {
    const errors = {};

    // Example validation rules for document metadata
    const requiredFields = ['documentNumber', 'documentType'];
    
    requiredFields.forEach(field => {
        if (!metadata[field]) {
            errors[field] = `${field} is required`;
        }
    });

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};

// Blockchain Address Validation
export const validateBlockchainAddress = (address) => {
    // XDC address validation (starts with 0x or xdc)
    const addressRegex = /^(0x|xdc)[0-9a-fA-F]{40}$/;
    return addressRegex.test(address);
};
