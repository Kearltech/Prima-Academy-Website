/**
 * Firebase Authentication Module
 * Prima Academy Website
 * 
 * Handles all authentication operations
 */

// Make sure firebase-config.js is loaded before this file

class FirebaseAuth {
    constructor() {
        this.auth = window.firebaseAuth;
        this.db = window.firebaseDb;
        this.currentUser = null;
        this.init();
    }

    init() {
        // Listen for auth state changes
        if (this.auth) {
            this.auth.onAuthStateChanged((user) => {
                this.currentUser = user;
                this.onAuthStateChanged(user);
            });
        }
    }

    /**
     * Handle authentication state changes
     * Override this method to handle state changes
     */
    onAuthStateChanged(user) {
        if (user) {
            console.log('User signed in:', user.email);
            // Update UI to show user is logged in
            this.updateUIForLoggedIn(user);
        } else {
            console.log('User signed out');
            // Update UI to show user is logged out
            this.updateUIForLoggedOut();
        }
    }

    /**
     * Sign in with email and password
     */
    async signIn(email, password) {
        try {
            const userCredential = await this.auth.signInWithEmailAndPassword(email, password);
            const user = userCredential.user;
            
            // Check if user is admin
            const userDoc = await this.db.collection('users').doc(user.uid).get();
            if (userDoc.exists && userDoc.data().role === 'admin') {
                return { success: true, user: user };
            } else {
                // Sign out if not admin
                await this.signOut();
                return { success: false, error: 'Access denied. Admin privileges required.' };
            }
        } catch (error) {
            console.error('Sign in error:', error);
            return { success: false, error: this.getErrorMessage(error) };
        }
    }

    /**
     * Sign out current user
     */
    async signOut() {
        try {
            await this.auth.signOut();
            return { success: true };
        } catch (error) {
            console.error('Sign out error:', error);
            return { success: false, error: this.getErrorMessage(error) };
        }
    }

    /**
     * Get current user
     */
    getCurrentUser() {
        return this.auth.currentUser;
    }

    /**
     * Check if user is authenticated
     */
    isAuthenticated() {
        return this.auth.currentUser !== null;
    }

    /**
     * Check if user is admin
     */
    async isAdmin() {
        if (!this.isAuthenticated()) {
            return false;
        }
        
        try {
            const userDoc = await this.db.collection('users').doc(this.auth.currentUser.uid).get();
            return userDoc.exists && userDoc.data().role === 'admin';
        } catch (error) {
            console.error('Error checking admin status:', error);
            return false;
        }
    }

    /**
     * Require authentication - redirect if not authenticated
     */
    async requireAuth() {
        if (!this.isAuthenticated()) {
            window.location.href = 'admin.html';
            return false;
        }
        return true;
    }

    /**
     * Require admin - redirect if not admin
     */
    async requireAdmin() {
        if (!this.isAuthenticated()) {
            window.location.href = 'admin.html';
            return false;
        }
        
        const admin = await this.isAdmin();
        if (!admin) {
            alert('Access denied. Admin privileges required.');
            window.location.href = 'index.html';
            return false;
        }
        
        return true;
    }

    /**
     * Update UI for logged in user
     */
    updateUIForLoggedIn(user) {
        // Update admin panel UI
        const userInfo = document.querySelector('.user-info');
        if (userInfo) {
            const userEmail = userInfo.querySelector('span');
            if (userEmail) {
                userEmail.textContent = user.email;
            }
        }
        
        // Show admin panel content
        const adminDashboard = document.getElementById('adminDashboard');
        if (adminDashboard) {
            adminDashboard.classList.remove('hidden');
        }
        
        // Hide login page
        const loginPage = document.getElementById('loginPage');
        if (loginPage) {
            loginPage.classList.add('hidden');
        }
    }

    /**
     * Update UI for logged out user
     */
    updateUIForLoggedOut() {
        // Show login page
        const loginPage = document.getElementById('loginPage');
        if (loginPage) {
            loginPage.classList.remove('hidden');
        }
        
        // Hide admin panel
        const adminDashboard = document.getElementById('adminDashboard');
        if (adminDashboard) {
            adminDashboard.classList.add('hidden');
        }
    }

    /**
     * Get user-friendly error messages
     */
    getErrorMessage(error) {
        const errorMessages = {
            'auth/user-not-found': 'No account found with this email.',
            'auth/wrong-password': 'Incorrect password.',
            'auth/email-already-in-use': 'This email is already registered.',
            'auth/weak-password': 'Password should be at least 6 characters.',
            'auth/invalid-email': 'Invalid email address.',
            'auth/user-disabled': 'This account has been disabled.',
            'auth/too-many-requests': 'Too many failed attempts. Please try again later.',
            'auth/network-request-failed': 'Network error. Please check your connection.',
            'auth/operation-not-allowed': 'This operation is not allowed.'
        };
        
        return errorMessages[error.code] || error.message || 'An error occurred. Please try again.';
    }
}

// Initialize Firebase Auth
let firebaseAuth;
if (typeof window !== 'undefined' && window.firebaseAuth) {
    firebaseAuth = new FirebaseAuth();
    window.firebaseAuthInstance = firebaseAuth;
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FirebaseAuth;
}

