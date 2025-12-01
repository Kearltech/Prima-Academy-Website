**Firebase Migration to Modular SDK (v9+)**

Summary
- Migrated the site from Firebase Compat SDK usage to the modular SDK pattern.
- Updated files:
  - `js/firebase-init.js` — modular initializer (now sets `window.firebase*` globals for compatibility).
  - `js/firebase-auth.js` — rewritten as an ES module using modular `firebase/auth` functions; exposes `window.firebaseAuthInstance`.
  - `js/firebase-db.js` — rewritten as an ES module using modular Firestore functions; exposes `window.firebaseDBInstance`.
  - `index.html`, `admin.html` — replaced compat script includes with a single `<script type="module">` that imports `js/firebase-init.js`, `js/firebase-auth.js`, and `js/firebase-db.js`.

Notes
- The modular modules are loaded as ES modules via CDN imports inside the module files. The initializer `js/firebase-init.js` still sets a few `window.*` globals so code that checks `window.firebaseDb` or `window.firebaseAuthInstance` continues to work.
- I implemented the most-used database and auth methods in modular form (signIn, signOut, submitContact, getNews, getAllGalleryImages, getAllFacultyMembers, trackPageVisit, etc.). If you need more methods ported, I can add them.

Local testing
1. Serve the site locally (PowerShell):

   python -m http.server 8000

2. Open `http://localhost:8000` in the browser. The modular SDK works on `localhost` (Analytics may still require HTTPS).

Emulators
- The project `firebase.json` includes emulator ports. To use emulators, run:

  npm install -g firebase-tools
  firebase emulators:start --only firestore,auth,storage,hosting

Then add a small boot script to connect modular SDK instances to the emulators (I can add this automatically if you want).

Next steps (optional)
- Extend `js/firebase-db.js` to port any remaining methods you use in admin flows.
- Add an `init-emulators.js` to automatically connect to local emulators when developing on `localhost`.
- Remove the old `js/firebase-config.js` fallback if you no longer need compat fallback code.
