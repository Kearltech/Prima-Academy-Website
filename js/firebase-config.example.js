/**
 * Firebase Configuration Template
 * Prima Academy Website
 * 
 * IMPORTANT: Copy this file to firebase-config.js and fill in your actual Firebase project config
 * Get these values from Firebase Console > Project Settings > General > Your apps
 * 
 * NOTE: For client-side Firebase apps, API keys are safe to expose as they're meant to be public.
 * Security is enforced through Firebase Security Rules, not API key secrecy.
 */

// Firebase configuration object
// Copy this file to firebase-config.js and replace with your actual values
const firebaseConfig = {
    apiKey: "YOUR_API_KEY_HERE",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdef123456",
    measurementId: "G-XXXXXXXXXX" // Optional, for Analytics
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

