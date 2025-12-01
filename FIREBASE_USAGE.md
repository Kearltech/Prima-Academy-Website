**Firebase Usage & Local Configuration**

- **Files added/updated:** `js/firebase-init.js` (ES module), `js/firebase-config.js` (compat initialization)
- **Purpose:** The site uses the Firebase **compat** SDK in its pages (`index.html`, `admin.html`). The compat initializer is `js/firebase-config.js` which exposes `window.firebaseApp`, `window.firebaseAuth`, `window.firebaseDb`, and `window.firebaseStorage` for the existing `js/firebase-auth.js` and `js/firebase-db.js` modules.

Quick start (development):

1. Serve the site locally (any static server). Example using PowerShell + Python:

   python -m http.server 8000
   # then open http://localhost:8000 in the browser

2. The site will initialize Firebase via the compat SDKs included in the HTML and `js/firebase-config.js`.

Notes and tips:
- Analytics requires HTTPS (or `localhost`) and may not initialize on file:// or other insecure origins — the code fails gracefully and logs a warning.
- `storageBucket` was set to the canonical `prima-academy-website.appspot.com`. If you use a custom bucket, update `js/firebase-config.js` accordingly.
- If you prefer the newer modular SDK, `js/firebase-init.js` (ES module) is provided as a reference module. It is not wired into the compat-based modules; migrate `firebase-auth.js` and `firebase-db.js` to modular APIs before removing compat usage.

Using the Firebase emulators (recommended for local testing):

1. Install Firebase CLI and emulators (if not installed):

   npm install -g firebase-tools
   firebase emulators:start --only firestore,auth,storage,hosting

2. The project already contains `firebase.json` emulator configuration. When running the emulators, update `js/firebase-config.js` at runtime to point to the emulator host/ports, or initialize the emulator connections in a small bootstrap script. Example (run in browser dev console or add a script):

   // Example: connect SDK to local emulators after compat initialization
   if (window.firebase && window.firebase.firestore) {
     // Firestore emulator
     window.firebase.firestore().settings({ host: 'localhost:8080', ssl: false });
     // Auth emulator
     window.firebase.auth().useEmulator('http://localhost:9099/');
     // Storage emulator (if available)
     // window.firebase.storage().useEmulator('localhost', 9199);
   }

What I changed and next suggestions:
- Updated `js/firebase-config.js` to canonical project config values.
- Added `FIREBASE_USAGE.md` with usage and emulator notes.
- Existing pages (`index.html`, `admin.html`) currently use the compat SDK and will work without further changes.

If you want I can:
- Wire the modular `js/firebase-init.js` into the site and migrate existing modules to the modular SDK.
- Add a small `init-emulators.js` to automatically connect to emulators when `window.location.hostname === 'localhost'`.
- Add CI-friendly checks or a `.env.example` to help manage config for different environments.
