/**
 * Firebase Configuration
 * Prima Academy Website
 * 
 * This file contains Firebase initialization and configuration
 * 
 * IMPORTANT: Replace the config values with your actual Firebase project config
 * Get these values from Firebase Console > Project Settings > General > Your apps
 * 
 * SECURITY NOTE: Firebase API keys are safe to expose in client-side code.
 * Security is enforced through Firestore Security Rules, not API key secrecy.
 * See SECURITY_NOTES.md for more information.
 */

// Firebase configuration object
// Updated with actual Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyAYJZx4bVSaA06njWIOjuKEnMUofcii41Q",
    authDomain: "prima-academy-website.firebaseapp.com",
    projectId: "prima-academy-website",
    // Use the canonical storage bucket name (appspot.com)
    storageBucket: "prima-academy-website.appspot.com",
    messagingSenderId: "321142938461",
    appId: "1:321142938461:web:2bf7ffb55d961f75a6a6b4",
    measurementId: "G-EYBYWG3XZ0" // Optional, for Analytics
};

// Initialize Firebase
// Make sure Firebase SDK is loaded before this script
try {
    if (typeof firebase === 'undefined') {
        console.error('Firebase SDK not loaded. Make sure to include Firebase scripts in your HTML.');
        throw new Error('Firebase SDK not available');
    }

    // Initialize Firebase app
    let app;
    try {
        app = firebase.initializeApp(firebaseConfig);
        window.firebaseApp = app;
        console.log('Firebase app initialized');
    } catch (error) {
        // App might already be initialized
        if (error.code === 'app/already-initialized') {
            app = firebase.app();
            window.firebaseApp = app;
            console.log('Firebase app already initialized, using existing instance');
        } else {
            throw error;
        }
    }
    
    // Initialize Firebase Auth (required)
    try {
        const auth = firebase.auth();
        window.firebaseAuth = auth;
        console.log('Firebase Auth initialized');
    } catch (error) {
        console.error('Failed to initialize Firebase Auth:', error);
        throw new Error('Firebase Auth initialization failed');
    }
    
    // Initialize Firestore (required)
    try {
        const db = firebase.firestore();
        window.firebaseDb = db;
        console.log('Firebase Firestore initialized');
    } catch (error) {
        console.error('Failed to initialize Firestore:', error);
        throw new Error('Firestore initialization failed');
    }
    
    // Storage is optional (requires billing plan)
    // Initialize Storage only if available
    let storage = null;
    try {
        if (firebase.storage) {
            storage = firebase.storage();
            window.firebaseStorage = storage;
            console.log('Firebase Storage initialized');
        }
    } catch (error) {
        console.warn('Firebase Storage not available. File uploads will be disabled.');
        window.firebaseStorage = null;
    }
    
    // Analytics is optional - skip initialization (not needed for core functionality)
    // If needed, ensure firebase-analytics-compat.js is loaded before this script
    window.firebaseAnalytics = null;
    
    console.log('Firebase initialized successfully');
} catch (error) {
    console.error('Firebase initialization error:', error);
    console.error('Error details:', {
        message: error.message,
        code: error.code
    });
    // Don't throw - let the page load and show error message
    // But try to initialize what we can as fallback
    if (typeof firebase !== 'undefined') {
        try {
            // Try to get existing app instance
            try {
                window.firebaseApp = firebase.app();
            } catch (e) {
                // App doesn't exist, try to initialize
                try {
                    window.firebaseApp = firebase.initializeApp(firebaseConfig);
                } catch (initError) {
                    if (initError.code !== 'app/already-initialized') {
                        throw initError;
                    }
                    window.firebaseApp = firebase.app();
                }
            }
            
            // Try to get auth and firestore
            if (firebase.auth) {
                try {
                    window.firebaseAuth = firebase.auth();
                } catch (e) {
                    console.warn('Could not initialize Auth:', e);
                }
            }
            
            if (firebase.firestore) {
                try {
                    window.firebaseDb = firebase.firestore();
                } catch (e) {
                    console.warn('Could not initialize Firestore:', e);
                }
            }
            
            if (window.firebaseAuth && window.firebaseDb) {
                console.log('Firebase initialized via fallback method');
            }
        } catch (fallbackError) {
            console.error('Fallback initialization also failed:', fallbackError);
            window.firebaseApp = null;
            window.firebaseAuth = null;
            window.firebaseDb = null;
            window.firebaseStorage = null;
        }
    } else {
        window.firebaseApp = null;
        window.firebaseAuth = null;
        window.firebaseDb = null;
        window.firebaseStorage = null;
    }
}

// Alternative: For Firebase v9+ (modular SDK)
// Uncomment if using the newer modular SDK
/*
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);
*/

