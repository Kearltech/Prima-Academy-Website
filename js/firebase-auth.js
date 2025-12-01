/**
 * Firebase Authentication (modular) ES module
 * Replaces the compat-based implementation and exposes a similar class API.
 */

import { auth, db } from './firebase-init.js';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut as fbSignOut } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js';
import { doc, getDoc } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js';

class FirebaseAuth {
    constructor() {
        this.auth = auth;
        this.db = db;
        this.currentUser = null;
        this.init();
    }

    init() {
        if (!this.auth) return;
        onAuthStateChanged(this.auth, (user) => {
            this.currentUser = user;
            this.onAuthStateChanged(user);
        });
    }

    onAuthStateChanged(user) {
        if (user) {
            console.log('User signed in:', user.email);
            this.updateUIForLoggedIn(user);
        } else {
            console.log('User signed out');
            this.updateUIForLoggedOut();
        }
    }

    async signIn(email, password) {
        try {
            const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
            const user = userCredential.user;

            // Check admin role in Firestore
            try {
                const userRef = doc(this.db, 'users', user.uid);
                const userSnap = await getDoc(userRef);
                if (userSnap.exists() && userSnap.data().role === 'admin') {
                    return { success: true, user };
                } else {
                    await this.signOut();
                    return { success: false, error: 'Access denied. Admin privileges required.' };
                }
            } catch (err) {
                console.error('Error checking user role:', err);
                // allow sign in but warn
                return { success: true, user };
            }
        } catch (error) {
            console.error('Sign in error:', error);
            return { success: false, error: this.getErrorMessage(error) };
        }
    }

    async signOut() {
        try {
            await fbSignOut(this.auth);
            return { success: true };
        } catch (error) {
            console.error('Sign out error:', error);
            return { success: false, error: this.getErrorMessage(error) };
        }
    }

    getCurrentUser() {
        return this.auth.currentUser;
    }

    isAuthenticated() {
        return !!this.auth.currentUser;
    }

    async isAdmin() {
        if (!this.isAuthenticated()) return false;
        try {
            const userRef = doc(this.db, 'users', this.auth.currentUser.uid);
            const userSnap = await getDoc(userRef);
            return userSnap.exists() && userSnap.data().role === 'admin';
        } catch (error) {
            console.error('Error checking admin status:', error);
            return false;
        }
    }

    async requireAuth() {
        if (!this.isAuthenticated()) {
            window.location.href = 'admin.html';
            return false;
        }
        return true;
    }

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

    updateUIForLoggedIn(user) {
        const userInfo = document.querySelector('.user-info');
        if (userInfo) {
            const userEmail = userInfo.querySelector('span');
            if (userEmail) userEmail.textContent = user.email;
        }
        const adminDashboard = document.getElementById('adminDashboard');
        if (adminDashboard) adminDashboard.classList.remove('hidden');
        const loginPage = document.getElementById('loginPage');
        if (loginPage) loginPage.classList.add('hidden');
    }

    updateUIForLoggedOut() {
        const loginPage = document.getElementById('loginPage');
        if (loginPage) loginPage.classList.remove('hidden');
        const adminDashboard = document.getElementById('adminDashboard');
        if (adminDashboard) adminDashboard.classList.add('hidden');
    }

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
        return error && error.code ? (errorMessages[error.code] || error.message) : (error && error.message) || 'An error occurred. Please try again.';
    }
}

// Create and expose instance
const firebaseAuthInstance = new FirebaseAuth();
window.firebaseAuthInstance = firebaseAuthInstance;

export default firebaseAuthInstance;


