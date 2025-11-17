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
if (typeof firebase !== 'undefined') {
    // Initialize Firebase services
    const app = firebase.initializeApp(firebaseConfig);
    
    // Initialize Firebase services
    const auth = firebase.auth();
    const db = firebase.firestore();
    
    // Storage is optional (requires billing plan)
    // Initialize Storage only if available
    let storage = null;
    try {
        storage = firebase.storage();
    } catch (error) {
        console.warn('Firebase Storage not available. File uploads will be disabled.');
    }
    
    // Analytics is optional (may not be available in compat SDK)
    let analytics = null;
    try {
        if (firebase.analytics) {
            analytics = firebase.analytics();
        }
    } catch (error) {
        console.warn('Firebase Analytics not available.');
    }
    
    // Export for use in other files
    window.firebaseApp = app;
    window.firebaseAuth = auth;
    window.firebaseDb = db;
    window.firebaseStorage = storage; // May be null if Storage not enabled
    
    console.log('Firebase initialized successfully');
} else {
    console.error('Firebase SDK not loaded. Make sure to include Firebase scripts in your HTML.');
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

