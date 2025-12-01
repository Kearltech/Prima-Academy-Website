// Auto-connect modular Firebase SDKs to local emulators when running on localhost
// This file should be imported after `firebase-init.js` so `db`, `auth`, and `storage` are available.

import { db, auth, storage } from './firebase-init.js';
import { connectFirestoreEmulator } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js';
import { connectAuthEmulator } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js';
import { connectStorageEmulator } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-storage.js';

// Emulator ports are taken from project's firebase.json by default
const EMULATOR_CONFIG = {
  firestore: { host: 'localhost', port: 8080 },
  auth: { url: 'http://localhost:9099' },
  storage: { host: 'localhost', port: 9199 }
};

function isLocalhost() {
  const host = window.location.hostname;
  return host === 'localhost' || host === '127.0.0.1' || host === '';
}

if (isLocalhost()) {
  try {
    if (db && typeof connectFirestoreEmulator === 'function') {
      connectFirestoreEmulator(db, EMULATOR_CONFIG.firestore.host, EMULATOR_CONFIG.firestore.port);
      console.info('Connected Firestore to emulator:', `${EMULATOR_CONFIG.firestore.host}:${EMULATOR_CONFIG.firestore.port}`);
    }

    if (auth && typeof connectAuthEmulator === 'function') {
      // connectAuthEmulator expects the full URL for auth emulator
      connectAuthEmulator(auth, EMULATOR_CONFIG.auth.url, { disableWarnings: true });
      console.info('Connected Auth to emulator:', EMULATOR_CONFIG.auth.url);
    }

    if (storage && typeof connectStorageEmulator === 'function') {
      connectStorageEmulator(storage, EMULATOR_CONFIG.storage.host, EMULATOR_CONFIG.storage.port);
      console.info('Connected Storage to emulator:', `${EMULATOR_CONFIG.storage.host}:${EMULATOR_CONFIG.storage.port}`);
    }

    // Mark that emulators are in use for other code paths
    window.__useFirebaseEmulators = true;
  } catch (err) {
    console.warn('Failed to connect to Firebase emulators:', err && err.message ? err.message : err);
  }
} else {
  window.__useFirebaseEmulators = false;
}

export default window.__useFirebaseEmulators;
