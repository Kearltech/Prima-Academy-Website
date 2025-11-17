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
    apiKey: "AIzaSyAYJZx4bVSaA06njWIOjuKEnMUofcii41Q", // Public API key - safe for client-side use
    authDomain: "prima-academy-website.firebaseapp.com",
    projectId: "prima-academy-website",
    storageBucket: "prima-academy-website.firebasestorage.app",
    messagingSenderId: "321142938461",
    appId: "1:321142938461:web:1c7d6eddf39bec01a6a6b4",
    measurementId: "G-CHFZ93P3BF" // Optional, for Analytics
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
    // Don't throw - let the page load and show error message
    window.firebaseApp = null;
    window.firebaseAuth = null;
    window.firebaseDb = null;
    window.firebaseStorage = null;
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

