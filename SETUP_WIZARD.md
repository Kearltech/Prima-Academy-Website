# Firebase Setup Wizard - Interactive Guide

**Date**: $(date)  
**Status**: Ready to Begin

---

## ✅ Prerequisites Check

- ✅ Node.js v22.14.0 - Installed
- ✅ npm 10.9.2 - Installed  
- ✅ Firebase CLI 14.9.0 - Installed

**All prerequisites are ready!** 🎉

---

## 🚀 Step-by-Step Setup

### Step 1: Login to Firebase (2 minutes)

If you're not logged in, run:
```bash
firebase login
```

This will open a browser window. Sign in with your Google account.

**Verify login**:
```bash
firebase login:list
```

You should see your email address.

---

### Step 2: Create Firebase Project (5 minutes)

1. **Open Firebase Console**:
   - Go to: https://console.firebase.google.com/
   - Or run: `firebase open` (after login)

2. **Create New Project**:
   - Click **"Add project"** or **"Create a project"**
   - Enter project name: `prima-academy-website`
   - Click **Continue**

3. **Google Analytics** (Optional):
   - Toggle **"Enable Google Analytics"** to OFF (unless you want it)
   - Click **Create project**

4. **Wait for Creation**:
   - Project creation takes 30-60 seconds
   - Click **Continue** when ready

---

### Step 3: Enable Firestore Database (2 minutes)

1. In Firebase Console, click **"Firestore Database"** in left menu
2. Click **"Create database"**
3. **Select Mode**:
   - Choose **"Start in test mode"** (we have rules ready)
   - Click **Next**
4. **Select Location**:
   - Choose: **us-central1** (Iowa, USA) - or closest to your users
   - Click **Enable**
5. **Wait for Database** (30 seconds)

**✅ Firestore Database Enabled!**

---

### Step 4: Enable Authentication (2 minutes)

1. In Firebase Console, click **"Authentication"** in left menu
2. Click **"Get started"**
3. Click **"Sign-in method"** tab
4. Click on **"Email/Password"**
5. **Toggle "Enable"** to ON
6. Click **Save**

**✅ Authentication Enabled!**

---

### Step 5: Enable Storage (2 minutes)

1. In Firebase Console, click **"Storage"** in left menu
2. Click **"Get started"**
3. **Select Mode**:
   - Choose **"Start in test mode"** (we have rules ready)
   - Click **Next**
4. **Select Location**:
   - Choose: **us-central1** (same as Firestore)
   - Click **Done**

**✅ Storage Enabled!**

---

### Step 6: Get Firebase Configuration (3 minutes)

1. In Firebase Console, click **Project Settings** (gear icon ⚙️)
2. Scroll down to **"Your apps"** section
3. If you see "Web" apps, click on it. Otherwise:
   - Click **"Add app"** → Click **Web icon** (</>)
   - Register app name: `Prima Academy Website`
   - Click **Register app**
4. **Copy the Firebase config** - it looks like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "prima-academy-website.firebaseapp.com",
  projectId: "prima-academy-website",
  storageBucket: "prima-academy-website.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
};
```

**⚠️ IMPORTANT**: Copy all these values - you'll need them next!

---

### Step 7: Update Configuration File (2 minutes)

1. Open: `js/firebase-config.js`
2. Replace the placeholder values with your actual config:

**Find this**:
```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
    measurementId: "YOUR_MEASUREMENT_ID" // Optional
};
```

**Replace with your actual values** from Step 6.

---

### Step 8: Initialize Firebase in Project (5 minutes)

Run this command in your project directory:

```bash
firebase init
```

**Follow the prompts**:

1. **Which Firebase features?**
   - Use arrow keys to navigate
   - Press **Space** to select:
     - ✅ **Firestore**
     - ✅ **Storage**
     - ✅ **Hosting**
   - Press **Enter** to continue

2. **Please select an option:**
   - Select: **"Use an existing project"**
   - Press **Enter**

3. **Select a default Firebase project:**
   - Select: **prima-academy-website**
   - Press **Enter**

4. **What file should be used for Firestore Rules?**
   - Press **Enter** (uses `firestore.rules` - already exists)
   - Type **n** (don't overwrite existing file)

5. **What file should be used for Firestore indexes?**
   - Press **Enter** (uses `firestore.indexes.json` - already exists)
   - Type **n** (don't overwrite existing file)

6. **What file should be used for Storage Rules?**
   - Press **Enter** (uses `storage.rules` - already exists)
   - Type **n** (don't overwrite existing file)

7. **What do you want to use as your public directory?**
   - Type: **.** (current directory)
   - Press **Enter**

8. **Configure as a single-page app?**
   - Type: **n** (we have multiple HTML files)
   - Press **Enter**

9. **Set up automatic builds and deploys with GitHub?**
   - Type: **n** (skip for now)
   - Press **Enter**

10. **File index.html already exists. Overwrite?**
    - Type: **n** (keep existing)
    - Press **Enter**

**✅ Firebase Initialized!**

---

### Step 9: Update .firebaserc (1 minute)

1. Open `.firebaserc`
2. Verify it has:
```json
{
  "projects": {
    "default": "prima-academy-website"
  }
}
```
3. If your project name is different, update it here

---

### Step 10: Deploy Security Rules (2 minutes)

Deploy your security rules to Firebase:

```bash
firebase deploy --only firestore:rules,storage:rules
```

You should see:
- ✅ Deploy complete!
- Rules are now active

---

### Step 11: Create Admin User (5 minutes)

#### 11.1: Create User in Authentication

1. In Firebase Console, go to **Authentication**
2. Click **"Add user"** button
3. Enter:
   - **Email**: `admin@primaacademy.edu.gh` (or your admin email)
   - **Password**: (create a strong password)
   - **Disable**: "Send email verification" (optional)
4. Click **Add user**
5. **Copy the User UID** (you'll see it in the user list)

#### 11.2: Create User Document in Firestore

1. In Firebase Console, go to **Firestore Database**
2. Click **"Start collection"**
3. **Collection ID**: `users`
4. Click **Next**
5. **Document ID**: (paste the User UID you copied)
6. **Add fields**:
   - Field: `email` | Type: `string` | Value: `admin@primaacademy.edu.gh`
   - Field: `role` | Type: `string` | Value: `admin`
   - Field: `createdAt` | Type: `timestamp` | Value: (click timestamp icon)
7. Click **Save**

**✅ Admin User Created!**

---

### Step 12: Verify Setup (2 minutes)

1. **Check Firebase Config**:
   - Open `js/firebase-config.js`
   - Verify all values are updated (not placeholders)

2. **Check .firebaserc**:
   - Open `.firebaserc`
   - Verify project ID matches your Firebase project

3. **Test Firebase Connection** (optional):
   - We'll do this after adding SDK to HTML

---

## ✅ Setup Complete Checklist

- [ ] Firebase CLI logged in
- [ ] Firebase project created
- [ ] Firestore Database enabled
- [ ] Authentication enabled
- [ ] Storage enabled
- [ ] Firebase config copied
- [ ] `js/firebase-config.js` updated
- [ ] `firebase init` completed
- [ ] `.firebaserc` updated
- [ ] Security rules deployed
- [ ] Admin user created in Authentication
- [ ] Admin user document created in Firestore

---

## 🎯 Next Steps After Setup

Once all steps above are complete:

1. **Add Firebase SDK to HTML** (I can help with this)
2. **Test authentication** (I can help with this)
3. **Implement form submissions** (I can help with this)
4. **Deploy to hosting** (I can help with this)

---

## 🆘 Troubleshooting

### Issue: "Firebase: No Firebase App '[DEFAULT]' has been created"
- **Solution**: Make sure `js/firebase-config.js` has actual config values, not placeholders

### Issue: "Permission denied"
- **Solution**: Check that security rules are deployed: `firebase deploy --only firestore:rules,storage:rules`

### Issue: "User not found" or "Access denied"
- **Solution**: Verify admin user exists in Firestore with `role: 'admin'`

### Issue: "Project not found"
- **Solution**: Check `.firebaserc` has correct project ID

---

## 📞 Ready for Next Step?

Once you've completed the setup above, let me know and I can:
1. Add Firebase SDK to your HTML files
2. Test the connection
3. Implement form submissions
4. Set up authentication integration

---

**Created**: $(date)  
**Status**: Ready to begin setup

