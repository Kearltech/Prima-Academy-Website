// Firebase initialization module (ES module using CDN builds)
// Usage in an HTML page:
// <script type="module">
//   import { app, auth, db, storage, analytics } from './js/firebase-init.js';
//   // use auth, db, etc.
// </script>

import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-analytics.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js';
import { getStorage } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-storage.js';

// Replace or review these values if you rotate keys or change projects
const firebaseConfig = {
  apiKey: "AIzaSyAYJZx4bVSaA06njWIOjuKEnMUofcii41Q",
  authDomain: "prima-academy-website.firebaseapp.com",
  projectId: "prima-academy-website",
  storageBucket: "prima-academy-website.firebasestorage.app",
  messagingSenderId: "321142938461",
  appId: "1:321142938461:web:2bf7ffb55d961f75a6a6b4",
  measurementId: "G-EYBYWG3XZ0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Some SDKs (like Analytics) require a secure origin (https) and may fail on unsupported environments.
let analytics = null;
try {
  analytics = getAnalytics(app);
} catch (err) {
  // Analytics initialization can fail on non-secure origins (or when blocked); fail gracefully.
  console.warn('Firebase Analytics not initialized:', err && err.message ? err.message : err);
}

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Also expose compat-friendly globals for any remaining code that expects them
window.firebaseApp = app;
window.firebaseAuth = auth;
window.firebaseDb = db;
window.firebaseStorage = storage;
window.firebaseAnalytics = analytics;

export { app, analytics, auth, db, storage };
