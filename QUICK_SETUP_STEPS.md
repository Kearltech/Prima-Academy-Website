# Quick Setup Steps - Prima Academy Website

**Current Status**: You have Firebase projects, but need to create `prima-academy-website`

---

## 🚀 Fastest Path (15 minutes)

### Step 1: Create Project (5 min)

1. **Open Firebase Console**: https://console.firebase.google.com/
2. Click **"Add project"**
3. **Project name**: `prima-academy-website`
4. **Analytics**: Disable (or enable if you want)
5. Click **Create project**
6. Wait 30 seconds, click **Continue**

### Step 2: Enable Services (5 min)

**Firestore**:
- Click **Firestore Database** → **Create database**
- Select **"Start in test mode"**
- Location: **us-central1**
- Click **Enable**

**Authentication**:
- Click **Authentication** → **Get started**
- Click **Sign-in method** → **Email/Password** → **Enable** → **Save**

**Storage**:
- Click **Storage** → **Get started**
- Select **"Start in test mode"**
- Location: **us-central1**
- Click **Done**

### Step 3: Get Config (2 min)

1. Click **⚙️ Project Settings**
2. Scroll to **"Your apps"**
3. Click **Web icon** (</>)
4. App name: `Prima Academy Website`
5. **Copy the config object**

### Step 4: Tell Me Your Config

**Paste your Firebase config here, and I'll update the file for you!**

Or update `js/firebase-config.js` manually.

### Step 5: Initialize (3 min)

Run:
```bash
firebase init
```

Select:
- ✅ Firestore
- ✅ Storage
- ✅ Hosting
- Use existing project: `prima-academy-website`
- Don't overwrite existing files (type `n`)

### Step 6: Deploy Rules (2 min)

```bash
firebase deploy --only firestore:rules,storage:rules
```

### Step 7: Create Admin User (5 min)

1. **Authentication** → **Add user**
   - Email: `admin@primaacademy.edu.gh`
   - Password: (create one)
   - Copy User UID

2. **Firestore** → **Start collection**
   - Collection: `users`
   - Document ID: (paste User UID)
   - Fields:
     - `email`: `admin@primaacademy.edu.gh`
     - `role`: `admin`
     - `createdAt`: (timestamp)

---

## ✅ Done!

After this, I can help you:
- Add Firebase SDK to HTML files
- Test the connection
- Implement form submissions
- Set up authentication

---

**Ready?** Start with Step 1 above! 🚀

