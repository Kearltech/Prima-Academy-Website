/**
 * Firebase Storage Module
 * Prima Academy Website
 * 
 * Handles file uploads and storage operations
 */

// Make sure firebase-config.js is loaded before this file

class FirebaseStorage {
    constructor() {
        this.storage = window.firebaseStorage;
    }

    /**
     * Upload admission document
     */
    async uploadAdmissionDocument(file, admissionId, documentType) {
        try {
            // Validate file
            const validation = this.validateFile(file, ['pdf', 'jpg', 'jpeg', 'png'], 10 * 1024 * 1024);
            if (!validation.valid) {
                return { success: false, error: validation.error };
            }

            // Create file path
            const fileName = `${documentType}_${Date.now()}_${file.name}`;
            const filePath = `admissions/${admissionId}/${fileName}`;
            
            // Create storage reference
            const storageRef = this.storage.ref(filePath);
            
            // Upload file
            const uploadTask = storageRef.put(file);
            
            // Return promise for upload
            return new Promise((resolve, reject) => {
                uploadTask.on(
                    'state_changed',
                    (snapshot) => {
                        // Progress tracking
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log('Upload progress:', progress + '%');
                    },
                    (error) => {
                        console.error('Upload error:', error);
                        reject({ success: false, error: error.message });
                    },
                    async () => {
                        // Upload complete
                        const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
                        resolve({
                            success: true,
                            url: downloadURL,
                            path: filePath,
                            fileName: fileName
                        });
                    }
                );
            });
        } catch (error) {
            console.error('Error uploading document:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Upload multiple admission documents
     */
    async uploadAdmissionDocuments(files, admissionId, documentTypes) {
        try {
            const uploads = [];
            
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const documentType = documentTypes[i] || 'document';
                const upload = await this.uploadAdmissionDocument(file, admissionId, documentType);
                uploads.push(upload);
            }
            
            const successful = uploads.filter(u => u.success);
            const failed = uploads.filter(u => !u.success);
            
            return {
                success: successful.length > 0,
                successful: successful,
                failed: failed,
                total: uploads.length
            };
        } catch (error) {
            console.error('Error uploading documents:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Upload gallery image
     */
    async uploadGalleryImage(file, imageData) {
        try {
            // Validate file
            const validation = this.validateFile(file, ['jpg', 'jpeg', 'png', 'webp'], 5 * 1024 * 1024);
            if (!validation.valid) {
                return { success: false, error: validation.error };
            }

            // Create file path
            const fileName = `gallery_${Date.now()}_${file.name}`;
            const filePath = `gallery/${fileName}`;
            
            // Create storage reference
            const storageRef = this.storage.ref(filePath);
            
            // Upload file
            const uploadTask = storageRef.put(file);
            
            // Return promise for upload
            return new Promise((resolve, reject) => {
                uploadTask.on(
                    'state_changed',
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log('Upload progress:', progress + '%');
                    },
                    (error) => {
                        console.error('Upload error:', error);
                        reject({ success: false, error: error.message });
                    },
                    async () => {
                        const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
                        resolve({
                            success: true,
                            url: downloadURL,
                            path: filePath,
                            fileName: fileName
                        });
                    }
                );
            });
        } catch (error) {
            console.error('Error uploading gallery image:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Upload news image
     */
    async uploadNewsImage(file, newsId) {
        try {
            // Validate file
            const validation = this.validateFile(file, ['jpg', 'jpeg', 'png', 'webp'], 5 * 1024 * 1024);
            if (!validation.valid) {
                return { success: false, error: validation.error };
            }

            // Create file path
            const fileName = `news_${Date.now()}_${file.name}`;
            const filePath = `news/${newsId}/${fileName}`;
            
            // Create storage reference
            const storageRef = this.storage.ref(filePath);
            
            // Upload file
            const uploadTask = storageRef.put(file);
            
            // Return promise for upload
            return new Promise((resolve, reject) => {
                uploadTask.on(
                    'state_changed',
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log('Upload progress:', progress + '%');
                    },
                    (error) => {
                        console.error('Upload error:', error);
                        reject({ success: false, error: error.message });
                    },
                    async () => {
                        const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
                        resolve({
                            success: true,
                            url: downloadURL,
                            path: filePath,
                            fileName: fileName
                        });
                    }
                );
            });
        } catch (error) {
            console.error('Error uploading news image:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Delete file
     */
    async deleteFile(filePath) {
        try {
            const storageRef = this.storage.ref(filePath);
            await storageRef.delete();
            return { success: true };
        } catch (error) {
            console.error('Error deleting file:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Get download URL
     */
    async getDownloadURL(filePath) {
        try {
            const storageRef = this.storage.ref(filePath);
            const url = await storageRef.getDownloadURL();
            return { success: true, url: url };
        } catch (error) {
            console.error('Error getting download URL:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Validate file
     */
    validateFile(file, allowedTypes, maxSize) {
        // Check file exists
        if (!file) {
            return { valid: false, error: 'No file selected' };
        }

        // Check file size
        if (file.size > maxSize) {
            const maxSizeMB = (maxSize / (1024 * 1024)).toFixed(2);
            return { valid: false, error: `File size exceeds ${maxSizeMB}MB limit` };
        }

        // Check file type
        const fileExtension = file.name.split('.').pop().toLowerCase();
        if (!allowedTypes.includes(fileExtension)) {
            return { valid: false, error: `File type not allowed. Allowed types: ${allowedTypes.join(', ')}` };
        }

        // Check MIME type
        const allowedMimeTypes = {
            'pdf': 'application/pdf',
            'jpg': 'image/jpeg',
            'jpeg': 'image/jpeg',
            'png': 'image/png',
            'webp': 'image/webp'
        };

        const expectedMimeType = allowedMimeTypes[fileExtension];
        if (expectedMimeType && file.type !== expectedMimeType) {
            return { valid: false, error: 'File type mismatch' };
        }

        return { valid: true };
    }

    /**
     * Format file size
     */
    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    }
}

// Initialize Firebase Storage
let firebaseStorage;
if (typeof window !== 'undefined' && window.firebaseStorage) {
    firebaseStorage = new FirebaseStorage();
    window.firebaseStorageInstance = firebaseStorage;
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FirebaseStorage;
}

