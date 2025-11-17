/**
 * Firebase Helper Utilities
 * Prima Academy Website
 * 
 * Common utility functions for Firebase operations
 */

class FirebaseHelpers {
    /**
     * Convert Firestore timestamp to JavaScript Date
     */
    static timestampToDate(timestamp) {
        if (!timestamp) return null;
        
        if (timestamp.toDate) {
            return timestamp.toDate();
        } else if (timestamp.seconds) {
            return new Date(timestamp.seconds * 1000);
        } else {
            return new Date(timestamp);
        }
    }

    /**
     * Format date for display
     */
    static formatDate(date, format = 'long') {
        if (!date) return '';
        
        const d = date instanceof Date ? date : this.timestampToDate(date);
        if (!d) return '';
        
        const options = {
            short: { year: 'numeric', month: 'short', day: 'numeric' },
            long: { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' },
            date: { year: 'numeric', month: 'long', day: 'numeric' },
            time: { hour: '2-digit', minute: '2-digit' }
        };
        
        return d.toLocaleDateString('en-US', options[format] || options.short);
    }

    /**
     * Get server timestamp
     */
    static serverTimestamp() {
        if (typeof firebase !== 'undefined' && firebase.firestore) {
            return firebase.firestore.FieldValue.serverTimestamp();
        }
        return new Date();
    }

    /**
     * Generate unique ID
     */
    static generateId() {
        return firebase.firestore().collection('_').doc().id;
    }

    /**
     * Sanitize data for Firestore
     */
    static sanitizeData(data) {
        const sanitized = {};
        
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                const value = data[key];
                
                // Remove undefined values
                if (value !== undefined) {
                    // Convert Date objects to Firestore timestamps if needed
                    if (value instanceof Date) {
                        sanitized[key] = firebase.firestore.Timestamp.fromDate(value);
                    } else {
                        sanitized[key] = value;
                    }
                }
            }
        }
        
        return sanitized;
    }

    /**
     * Handle Firestore errors
     */
    static handleError(error) {
        console.error('Firebase error:', error);
        
        const errorMessages = {
            'permission-denied': 'You do not have permission to perform this action.',
            'unauthenticated': 'Please sign in to continue.',
            'not-found': 'The requested resource was not found.',
            'already-exists': 'This resource already exists.',
            'failed-precondition': 'The operation was rejected.',
            'aborted': 'The operation was aborted.',
            'out-of-range': 'The value is out of range.',
            'unimplemented': 'This operation is not implemented.',
            'internal': 'An internal error occurred.',
            'unavailable': 'The service is currently unavailable.',
            'data-loss': 'Unrecoverable data loss or corruption.',
            'deadline-exceeded': 'The operation timed out.'
        };
        
        return errorMessages[error.code] || error.message || 'An error occurred. Please try again.';
    }

    /**
     * Show loading indicator
     */
    static showLoading(elementId = 'loading') {
        const loader = document.getElementById(elementId);
        if (loader) {
            loader.style.display = 'block';
        }
    }

    /**
     * Hide loading indicator
     */
    static hideLoading(elementId = 'loading') {
        const loader = document.getElementById(elementId);
        if (loader) {
            loader.style.display = 'none';
        }
    }

    /**
     * Show success message
     */
    static showSuccess(message, duration = 3000) {
        // Create or get toast element
        let toast = document.getElementById('toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'toast';
            toast.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: #4caf50;
                color: white;
                padding: 15px 20px;
                border-radius: 4px;
                box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                z-index: 10000;
                display: none;
            `;
            document.body.appendChild(toast);
        }
        
        toast.textContent = message;
        toast.style.display = 'block';
        
        setTimeout(() => {
            toast.style.display = 'none';
        }, duration);
    }

    /**
     * Show error message
     */
    static showError(message, duration = 5000) {
        // Create or get toast element
        let toast = document.getElementById('error-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'error-toast';
            toast.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: #f44336;
                color: white;
                padding: 15px 20px;
                border-radius: 4px;
                box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                z-index: 10000;
                display: none;
            `;
            document.body.appendChild(toast);
        }
        
        toast.textContent = message;
        toast.style.display = 'block';
        
        setTimeout(() => {
            toast.style.display = 'none';
        }, duration);
    }

    /**
     * Validate email
     */
    static validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    /**
     * Validate phone number (basic)
     */
    static validatePhone(phone) {
        const re = /^[\d\s\-\+\(\)]+$/;
        return re.test(phone) && phone.replace(/\D/g, '').length >= 10;
    }

    /**
     * Debounce function
     */
    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

// Export for use
if (typeof window !== 'undefined') {
    window.FirebaseHelpers = FirebaseHelpers;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = FirebaseHelpers;
}

