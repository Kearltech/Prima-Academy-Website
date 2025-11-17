# Get Firebase Configuration - Step by Step

**Firestore**: ✅ Enabled  
**Authentication**: ✅ Enabled  
**Storage**: ⏭️ Optional (can add later)

---

## 🎯 Next Step: Get Your Firebase Configuration

### Instructions:

1. **In Firebase Console**, look at the **left sidebar**
2. Click **⚙️ Project Settings** (gear icon, usually at the top)
3. **Scroll down** to the **"Your apps"** section
4. You'll see options to add apps
5. Click the **Web icon** (</>) - it looks like `</>`
6. **Register app**:
   - **App nickname**: `Prima Academy Website` (or any name)
   - Click **Register app**
7. **Copy the Firebase configuration** - You'll see code like this:

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

---

## 📋 What I Need From You

**Copy ALL these values** and paste them here:
- `apiKey`
- `authDomain`
- `projectId`
- `storageBucket` (even if Storage isn't enabled)
- `messagingSenderId`
- `appId`

---

## ✅ Once You Share the Config

I will:
1. ✅ Update `js/firebase-config.js` with your values
2. ✅ Make Storage optional (won't break if not enabled)
3. ✅ Continue with Firebase initialization
4. ✅ Deploy security rules
5. ✅ Help create admin user

---

**Ready?** Get your Firebase config from Project Settings and share it with me! 🚀

