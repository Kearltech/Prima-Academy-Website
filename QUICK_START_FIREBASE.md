# Quick Start - Firebase Setup

**Date**: $(date)  
**Status**: Ready to Begin

---

## 🚀 Quick Setup (15 minutes)

### Step 1: Install Prerequisites (5 minutes)

1. **Check Node.js**:
   ```bash
   node --version
   ```
   If not installed: Download from https://nodejs.org/

2. **Install Firebase CLI**:
   ```bash
   npm install -g firebase-tools
   ```

3. **Login to Firebase**:
   ```bash
   firebase login
   ```

### Step 2: Create Firebase Project (5 minutes)

1. Go to: https://console.firebase.google.com/
2. Click **"Add project"**
3. Project name: `prima-academy-website`
4. Click **Continue**
5. Disable Analytics (optional)
6. Click **Create project**
7. Wait for project creation
8. Click **Continue**

### Step 3: Enable Services (5 minutes)

1. **Firestore Database**:
   - Click **Firestore Database** → **Create database**
   - Select **"Start in test mode"**
   - Location: **us-central1**
   - Click **Enable**

2. **Authentication**:
   - Click **Authentication** → **Get started**
   - Click **Sign-in method** tab
   - Enable **Email/Password**
   - Click **Save**

3. **Storage**:
   - Click **Storage** → **Get started**
   - Select **"Start in test mode"**
   - Location: **us-central1**
   - Click **Done**

### Step 4: Get Firebase Config (2 minutes)

1. In Firebase Console, click **Project Settings** (gear icon)
2. Scroll to **"Your apps"** section
3. Click **Web icon** (</>)
4. App name: `Prima Academy Website`
5. **Copy the config object**

### Step 5: Update Config File (3 minutes)

1. Open `js/firebase-config.js`
2. Replace placeholder values with your actual Firebase config
3. Save the file

### Step 6: Initialize Firebase (5 minutes)

```bash
cd "C:\Users\Hp\Documents\App Develop\prima-academy-website"
firebase init
```

**Select**:
- ✅ Firestore
- ✅ Storage  
- ✅ Hosting
- ✅ Use existing project: `prima-academy-website`
- ✅ Don't overwrite existing files (type `n`)

### Step 7: Deploy Rules

```bash
firebase deploy --only firestore:rules,storage:rules
```

### Step 8: Create Admin User

1. **Firebase Console** → **Authentication** → **Add user**
   - Email: `admin@primaacademy.edu.gh`
   - Password: (create secure password)
   - Click **Add user**
   - **Copy User UID**

2. **Firestore Database** → **Create collection**:
   - Collection ID: `users`
   - Document ID: (paste User UID)
   - Add fields:
     - `email`: `admin@primaacademy.edu.gh`
     - `role`: `admin`
     - `createdAt`: (timestamp)

---

## ✅ Files Created

All Firebase configuration files have been created:
- ✅ `firebase.json` - Project configuration
- ✅ `.firebaserc` - Project reference
- ✅ `firestore.rules` - Database security rules
- ✅ `storage.rules` - Storage security rules
- ✅ `firestore.indexes.json` - Database indexes
- ✅ `package.json` - NPM configuration
- ✅ `js/firebase-config.js` - Firebase initialization
- ✅ `js/firebase-auth.js` - Authentication module
- ✅ `js/firebase-db.js` - Database module
- ✅ `js/firebase-storage.js` - Storage module
- ✅ `js/utils/firebase-helpers.js` - Helper utilities

---

## 📋 Next Steps

After completing the setup above:

1. **Add Firebase SDK to HTML** (I can help with this)
2. **Test authentication** (I can help with this)
3. **Implement form submissions** (I can help with this)
4. **Deploy to hosting** (I can help with this)

---

## 🆘 Need Help?

If you encounter any issues:
1. Check `FIREBASE_SETUP_INSTRUCTIONS.md` for detailed steps
2. Verify Node.js and Firebase CLI are installed
3. Ensure you're logged into Firebase
4. Check that all services are enabled in Firebase Console

---

**Ready to proceed!** 🚀

