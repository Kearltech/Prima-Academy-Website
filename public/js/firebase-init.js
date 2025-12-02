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
// CONFIG: prima-academy-edu (new Firebase project)
const firebaseConfig = {
  apiKey: "AIzaSyBkX5ivgJZlc5e7ViHvJxOhJnOKh4JlHrs",
  authDomain: "prima-academy-edu.firebaseapp.com",
  projectId: "prima-academy-edu",
  storageBucket: "prima-academy-edu.firebasestorage.app",
  messagingSenderId: "697603354164",
  appId: "1:697603354164:web:065446df5e98f61b04e461",
  measurementId: "G-N2XG2CTW0H"
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
