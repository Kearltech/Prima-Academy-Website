# Firebase Setup Instructions

**Date**: $(date)  
**Project**: Prima Academy Website

---

## 📋 Prerequisites

Before setting up Firebase, ensure you have:

1. ✅ **Google Account** - For Firebase Console
2. ✅ **Node.js** - Version 14 or higher
   - Check: `node --version`
   - Download: https://nodejs.org/
3. ✅ **npm** - Comes with Node.js
   - Check: `npm --version`

---

## 🚀 Step-by-Step Setup

### Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"** or **"Create a project"**
3. Enter project name: `prima-academy-website` (or your preferred name)
4. Click **Continue**
5. **Disable** Google Analytics (optional, can enable later)
6. Click **Create project**
7. Wait for project to be created (30-60 seconds)
8. Click **Continue**

### Step 2: Enable Firebase Services

#### 2.1 Enable Firestore Database
1. In Firebase Console, click **Firestore Database** in left menu
2. Click **"Create database"**
3. Select **"Start in test mode"** (we'll update rules later)
4. Choose location: **us-central1** (or closest to your users)
5. Click **Enable**

#### 2.2 Enable Authentication
1. In Firebase Console, click **Authentication** in left menu
2. Click **"Get started"**
3. Click **"Sign-in method"** tab
4. Enable **Email/Password**:
   - Click on **Email/Password**
   - Toggle **"Enable"** to ON
   - Click **Save**

#### 2.3 Enable Storage
1. In Firebase Console, click **Storage** in left menu
2. Click **"Get started"**
3. Select **"Start in test mode"** (we'll update rules later)
4. Choose location: **us-central1** (same as Firestore)
5. Click **Done**

### Step 3: Get Firebase Configuration

1. In Firebase Console, click **Project Settings** (gear icon)
2. Scroll down to **"Your apps"** section
3. Click **Web icon** (</>)
4. Register app name: `Prima Academy Website`
5. **Copy the config object** - it looks like:
   ```javascript
   const firebaseConfig = {
     apiKey: "AIza...",
     authDomain: "prima-academy-website.firebaseapp.com",
     projectId: "prima-academy-website",
     storageBucket: "prima-academy-website.appspot.com",
     messagingSenderId: "123456789",
     appId: "1:123456789:web:abcdef123456"
   };
   ```

### Step 4: Update Firebase Config File

1. Open `js/firebase-config.js`
2. Replace the placeholder values with your actual Firebase config:
   ```javascript
   const firebaseConfig = {
     apiKey: "YOUR_ACTUAL_API_KEY",
     authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_PROJECT_ID.appspot.com",
     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
     appId: "YOUR_APP_ID"
   };
   ```

### Step 5: Install Firebase CLI

Open terminal in project directory and run:

```bash
npm install -g firebase-tools
```

Or if you prefer local installation:

```bash
npm install firebase-tools --save-dev
```

### Step 6: Login to Firebase

```bash
firebase login
```

This will open a browser window for authentication.

### Step 7: Initialize Firebase in Project

```bash
firebase init
```

**Follow the prompts:**

1. **Select features**: 
   - ✅ Firestore
   - ✅ Storage
   - ✅ Hosting
   - ✅ Emulators (optional)

2. **Select existing project**: Choose `prima-academy-website`

3. **Firestore rules file**: `firestore.rules` (already created)
   - Type `n` to not overwrite existing file

4. **Firestore indexes file**: `firestore.indexes.json` (already created)
   - Type `n` to not overwrite existing file

5. **Storage rules file**: `storage.rules` (already created)
   - Type `n` to not overwrite existing file

6. **Public directory**: `.` (current directory)

7. **Single-page app**: `n` (we have multiple HTML files)

8. **Overwrite index.html**: `n` (we already have index.html)

9. **Set up automatic builds**: `n` (for now)

### Step 8: Deploy Security Rules

```bash
firebase deploy --only firestore:rules,storage:rules
```

This will deploy your security rules to Firebase.

### Step 9: Add Firebase SDK to HTML

Add Firebase SDK scripts to your HTML files before the closing `</body>` tag:

```html
<!-- Firebase SDK -->
<script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-auth-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-storage-compat.js"></script>

<!-- Firebase Configuration -->
<script src="js/firebase-config.js"></script>

<!-- Firebase Modules -->
<script src="js/firebase-auth.js"></script>
<script src="js/firebase-db.js"></script>
<script src="js/firebase-storage.js"></script>
```

### Step 10: Create First Admin User

1. In Firebase Console, go to **Authentication**
2. Click **"Add user"**
3. Enter admin email and password
4. Click **Add user**
5. Copy the **User UID**

6. In Firebase Console, go to **Firestore Database**
7. Create a new collection: `users`
8. Add a document with ID = the User UID you copied
9. Add fields:
   - `email`: (admin email)
   - `role`: `admin`
   - `createdAt`: (timestamp)

---

## 📝 Testing

### Test Firebase Connection

1. Open `index.html` in browser
2. Open browser console (F12)
3. You should see: `Firebase initialized successfully`

### Test Authentication

1. Open `admin.html`
2. Try logging in with your admin credentials
3. Should redirect to admin dashboard

### Test Database

1. Submit a test contact form
2. Check Firestore Console
3. Should see new document in `contacts` collection

---

## 🚀 Deployment

### Deploy to Firebase Hosting

```bash
firebase deploy --only hosting
```

### Deploy Everything

```bash
firebase deploy
```

### Custom Domain (Optional)

1. In Firebase Console, go to **Hosting**
2. Click **"Add custom domain"**
3. Follow the instructions

---

## 🔒 Security Checklist

- [ ] Security rules deployed
- [ ] Admin user created in Firestore
- [ ] Test mode disabled in Firestore
- [ ] Test mode disabled in Storage
- [ ] API keys restricted (if needed)
- [ ] HTTPS enabled (automatic with Firebase Hosting)

---

## 📚 Next Steps

After Firebase is set up:

1. **Update HTML files** to include Firebase SDK
2. **Implement form submissions** to Firestore
3. **Update admin panel** to use real authentication
4. **Add file upload** functionality
5. **Deploy to Firebase Hosting**

---

## 🆘 Troubleshooting

### Issue: Firebase not initialized
- **Solution**: Check that Firebase SDK scripts are loaded before config file

### Issue: Permission denied
- **Solution**: Check security rules are deployed correctly

### Issue: Authentication not working
- **Solution**: Verify user exists in Firestore with `role: 'admin'`

### Issue: File upload fails
- **Solution**: Check Storage rules and file size limits

---

## 📞 Support

For Firebase-specific issues:
- Firebase Documentation: https://firebase.google.com/docs
- Firebase Console: https://console.firebase.google.com/

---

**Created**: $(date)  
**Status**: Ready for setup

