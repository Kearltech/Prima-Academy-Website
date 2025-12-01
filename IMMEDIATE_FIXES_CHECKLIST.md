# Immediate Fixes Checklist - Prima Academy Website

## 🔴 CRITICAL (Do First)

### 1. Secure Firebase Configuration (30 minutes)

**Problem:** `js/firebase-config.js` with real credentials is committed to git.

**Fix:**

a) **Update `.gitignore`:**
```gitignore
# Firebase config with actual credentials (keep only example file)
js/firebase-config.js
```

b) **Create example template** `js/firebase-config.example.js` (copy current, but with dummy values):
```javascript
/**
 * Firebase Configuration Example
 * Copy this file to js/firebase-config.js and fill in your Firebase project details
 * Get these from Firebase Console > Project Settings > General
 */

const firebaseConfig = {
    apiKey: "YOUR_API_KEY_HERE",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "1:YOUR_APP_ID:web:YOUR_WEB_APP_ID"
};

// ... rest of initialization code (same as current firebase-config.js)
```

c) **Update `README.md`** with setup instructions:
```markdown
## Setup Firebase Configuration

1. Clone the repository
2. Create `js/firebase-config.js` from template:
   ```bash
   cp js/firebase-config.example.js js/firebase-config.js
   ```
3. Open `js/firebase-config.js` and fill in your Firebase project credentials:
   - Go to Firebase Console
   - Select your project (prima-academy-website)
   - Click Project Settings (gear icon)
   - Under "Your apps", find the web app
   - Copy the config object
   - Paste into `js/firebase-config.js`

4. Deploy:
   ```bash
   firebase deploy --only hosting
   ```
```

d) **Verify with git:**
```bash
cd C:\Users\Hp\Desktop\mobile_dev\prima-academy-website
git rm --cached js/firebase-config.js
git add .gitignore
git commit -m "Secure: Remove firebase-config.js from git tracking"
git push
```

---

### 2. Harden Firestore Rules - Admissions (30 minutes)

**File:** `firestore.rules`

**Problem:** Clients can set `status` and `reviewed` fields on admission submission, bypassing admin review.

**Fix:** Replace the admissions section:

```firestore
// Admissions Collection - Public can create (but not set status), Admin can read/update
match /admissions/{admissionId} {
  // Public can only create admissions with required fields
  // IMPORTANT: status, reviewed, and reviewedAt must NOT be set by client
  allow create: if request.resource.data.keys().hasAll(['firstName', 'lastName', 'gradeLevel']) &&
                   !request.resource.data.keys().hasAny(['status', 'reviewed', 'reviewedAt', 'approvedAt', 'rejectedAt']) &&
                   request.resource.data.firstName is string &&
                   request.resource.data.firstName.size() > 1 &&
                   request.resource.data.firstName.size() <= 100 &&
                   request.resource.data.lastName is string &&
                   request.resource.data.lastName.size() > 1 &&
                   request.resource.data.lastName.size() <= 100 &&
                   request.resource.data.gradeLevel is string;
  
  // Admin can read all admissions
  allow read: if isAdmin();
  
  // Admin can update (set status, reviewed, etc)
  allow update: if isAdmin() && 
                   request.resource.data.status in ['Pending', 'Approved', 'Rejected'] &&
                   request.resource.data.reviewed is bool;
  
  // Admin can delete
  allow delete: if isAdmin();
}
```

**Then deploy:**
```bash
firebase deploy --only firestore:rules
```

---

### 3. Harden Firestore Rules - Contacts (15 minutes)

**File:** `firestore.rules`

**Problem:** No validation of email format or content length; clients can spam.

**Fix:** Replace the contacts section:

```firestore
// Contacts Collection - Public can create with validation, Admin can read
match /contacts/{contactId} {
  allow create: if request.resource.data.keys().hasAll(['name', 'email', 'subject', 'message']) &&
                   !request.resource.data.keys().hasAny(['read', 'readAt']) &&
                   request.resource.data.name is string &&
                   request.resource.data.name.size() > 1 &&
                   request.resource.data.name.size() <= 200 &&
                   request.resource.data.email is string &&
                   request.resource.data.email.matches('.*@.*\\..*') &&
                   request.resource.data.subject is string &&
                   request.resource.data.subject.size() > 1 &&
                   request.resource.data.subject.size() <= 500 &&
                   request.resource.data.message is string &&
                   request.resource.data.message.size() > 1 &&
                   request.resource.data.message.size() <= 5000;
  
  allow read: if isAdmin();
  allow update: if isAdmin();
  allow delete: if isAdmin();
}
```

**Deploy:**
```bash
firebase deploy --only firestore:rules
```

---

### 4. Restrict Storage Uploads to Authenticated Users (20 minutes)

**File:** `storage.rules`

**Problem:** Unauthenticated users can upload admission documents without verification.

**Fix:** Replace the admissions section:

```firebase-storage
// Admission documents - Authenticated users only
match /admissions/{admissionId}/{fileName} {
  // Authenticated users can upload documents (for admission applications)
  // File size limit: 10MB
  allow write: if request.auth != null &&
                  request.resource.size < 10 * 1024 * 1024 &&
                  request.resource.contentType.matches('application/pdf|image/.*') &&
                  fileName.matches('.*\\.(pdf|jpg|jpeg|png)$');
  
  // Only admins can read/delete admission documents
  allow read, delete: if isAdmin();
}
```

**Deploy:**
```bash
firebase deploy --only storage:rules
```

---

## 🟠 HIGH PRIORITY (Do This Week)

### 5. Add Session Timeout for Admin Users (30 minutes)

**File:** `js/firebase-auth.js`

**Problem:** Logged-in admins stay logged in indefinitely.

**Fix:** Add to the `FirebaseAuth` class:

```javascript
class FirebaseAuth {
    constructor() {
        this.auth = window.firebaseAuth;
        this.db = window.firebaseDb;
        this.currentUser = null;
        this.inactivityTimeout = 30 * 60 * 1000; // 30 minutes
        this.inactivityTimer = null;
        this.init();
    }

    init() {
        // Listen for auth state changes
        if (this.auth) {
            this.auth.onAuthStateChanged((user) => {
                this.currentUser = user;
                if (user) {
                    this.setupInactivityTimer();
                } else {
                    this.clearInactivityTimer();
                }
                this.onAuthStateChanged(user);
            });
        }
    }

    setupInactivityTimer() {
        this.clearInactivityTimer();
        this.inactivityTimer = setTimeout(() => {
            this.signOut();
            alert('Your session has expired due to inactivity. Please log in again.');
        }, this.inactivityTimeout);

        // Reset timer on user activity
        const events = ['mousedown', 'keydown', 'scroll', 'touchstart', 'click'];
        events.forEach(event => {
            document.addEventListener(event, () => this.resetInactivityTimer(), true);
        });
    }

    resetInactivityTimer() {
        if (this.inactivityTimer) {
            this.setupInactivityTimer();
        }
    }

    clearInactivityTimer() {
        if (this.inactivityTimer) {
            clearTimeout(this.inactivityTimer);
            this.inactivityTimer = null;
        }
    }

    // ... rest of class
}
```

---

### 6. Standardize Firebase SDK (Choose One Path) (4 hours)

**Option A: Keep Compat but Align Versions (Quick)**

Update `package.json`:
```json
{
  "dependencies": {
    "firebase": "^9.23.0"
  },
  "devDependencies": {
    "firebase-tools": "^12.0.0"
  }
}
```

Then run:
```bash
npm install
```

**Option B: Migrate to Modular SDK (Recommended, but more effort)**

This requires updating all `js/firebase-*.js` files to use imports. See section 12 of main report for detailed guide.

---

### 7. Add CSP Header to firebase.json (10 minutes)

**File:** `firebase.json`

**Problem:** No Content Security Policy to prevent XSS attacks.

**Fix:** Update the hosting section:

```json
{
  "hosting": {
    "public": ".",
    "headers": [
      {
        "source": "**",
        "headers": [
          {
            "key": "Content-Security-Policy",
            "value": "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://cdn.jsdelivr.net https://www.gstatic.com; style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://cdn.jsdelivr.net; img-src 'self' https: data:; font-src 'self' https: data:; connect-src 'self' https://firestore.googleapis.com https://www.googleapis.com; frame-ancestors 'none';"
          },
          {
            "key": "Strict-Transport-Security",
            "value": "max-age=31536000; includeSubDomains; preload"
          }
        ]
      },
      {
        "source": "**/*.@(jpg|jpeg|gif|png|svg|webp|ico|css|js)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "max-age=31536000"
          }
        ]
      },
      {
        "source": "**/*.html",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "max-age=3600"
          }
        ]
      }
    ]
  }
}
```

**Deploy:**
```bash
firebase deploy --only hosting
```

---

## 🟡 MEDIUM PRIORITY (Do This Month)

### 8. Add Accessibility Labels (2 hours)

Add `for` attributes to labels and `aria-label` to buttons.

**Example fix for admission.html:**
```html
<!-- Before -->
<input type="text" id="firstName" class="form-control">

<!-- After -->
<label for="firstName">First Name *</label>
<input type="text" id="firstName" class="form-control" aria-label="First Name">
```

Use find-and-replace in your editor to add missing `for` attributes.

---

### 9. Set Up GitHub Actions (1 hour)

**Create file:** `.github/workflows/deploy.yml`

```yaml
name: Deploy to Firebase

on:
  push:
    branches: [ master ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy to Firebase
        uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: '${{ secrets.GITHUB_TOKEN }}'
          firebaseServiceAccount: '${{ secrets.FIREBASE_SERVICE_ACCOUNT }}'
          channelId: live
          projectId: prima-academy-website
```

Then add `FIREBASE_SERVICE_ACCOUNT` secret to GitHub (Firebase Console > Project Settings > Service Accounts).

---

## Quick Reference: Deploy Changes

```bash
# After making changes:
git add -A
git commit -m "Security: Harden Firestore rules and fix config management"
git push

# Deploy specific services:
firebase deploy --only firestore:rules
firebase deploy --only storage:rules
firebase deploy --only hosting

# Or deploy everything:
firebase deploy
```

---

## Verification Checklist

- [ ] Removed `js/firebase-config.js` from git history
- [ ] Updated `.gitignore` to exclude `js/firebase-config.js`
- [ ] Firestore rules updated (admissions, contacts validated)
- [ ] Storage rules require authentication
- [ ] CSP header added to `firebase.json`
- [ ] Session timeout implemented
- [ ] Firebase version consistency checked
- [ ] Deployed all changes to production
- [ ] Tested admissions form (should reject if client tries to set `status`)
- [ ] Tested contact form validation

---

**Status:** Ready to implement  
**Estimated Time:** 2-3 hours for all critical fixes  
**Risk if Not Done:** Security vulnerabilities; data integrity issues; information exposure
