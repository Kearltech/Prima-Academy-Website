# Admin Login Setup Guide

## Overview

The admin dashboard now requires authentication via Firebase Authentication. Users must have an account with `role: 'admin'` in the Firestore `users` collection to access the dashboard.

---

## 🔐 Login Page Features

### Created Files
- **`admin-login.html`** - Professional login page with:
  - Email/password authentication
  - Password visibility toggle
  - Remember me functionality
  - Forgot password reset
  - Error handling and validation
  - Responsive design
  - Loading states

### Security Features
- ✅ Firebase Authentication integration
- ✅ Admin role verification
- ✅ Session management
- ✅ Automatic redirect if not authenticated
- ✅ Secure logout with Firebase sign-out

---

## 🚀 Setup Instructions

### Step 1: Create Admin User in Firebase Console

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **Prima Academy Website**
3. Navigate to **Authentication** > **Users**
4. Click **Add User**
5. Enter:
   - **Email**: `admin@primaacademy.edu.gh` (or your admin email)
   - **Password**: Create a strong password
6. Click **Add User**

### Step 2: Create User Document in Firestore

1. In Firebase Console, go to **Firestore Database**
2. Navigate to the `users` collection
3. Create a new document with ID = **User UID** (from Authentication)
4. Add the following fields:

```javascript
{
  email: "admin@primaacademy.edu.gh",
  name: "Admin User",           // Optional
  username: "admin",            // Optional
  role: "admin",                // REQUIRED - must be "admin"
  createdAt: [timestamp],        // Optional
  lastLogin: [timestamp]        // Optional - will be updated automatically
}
```

**Important**: The document ID must match the User UID from Firebase Authentication.

### Step 3: Test Login

1. Navigate to `admin-login.html`
2. Enter your admin email and password
3. Click **Sign In**
4. You should be redirected to `admin1.html`

---

## 📋 How It Works

### Authentication Flow

1. **User visits `admin1.html`**
   - `checkAuthentication()` function runs
   - Checks if `firebaseAuth.currentUser` exists
   - Verifies user has `role: 'admin'` in Firestore
   - If not authenticated → redirects to `admin-login.html`

2. **User logs in via `admin-login.html`**
   - Enters email and password
   - Firebase Authentication verifies credentials
   - System checks Firestore `users` collection for admin role
   - If admin → saves session data → redirects to `admin1.html`
   - If not admin → shows error → signs out

3. **User logs out**
   - Calls `firebaseAuth.signOut()`
   - Clears localStorage session
   - Redirects to `admin-login.html`

### Session Management

- **Remember Me**: Uses `LOCAL` persistence (stays logged in across browser sessions)
- **No Remember Me**: Uses `SESSION` persistence (logs out when browser closes)
- Session data stored in `localStorage` as `prima_current_user`

---

## 🔧 Creating Additional Admin Users

### Method 1: Via Firebase Console (Manual)

1. Create user in **Authentication** > **Users**
2. Create document in **Firestore** > `users` collection with:
   - Document ID = User UID
   - `role: "admin"`

### Method 2: Via Admin Dashboard (Future Feature)

You can add a user management feature in the admin dashboard to:
- Create new admin users
- Manage user roles
- Reset passwords

---

## 🛡️ Security Considerations

### Current Security
- ✅ Firebase Authentication (secure password hashing)
- ✅ Admin role verification
- ✅ Session management
- ✅ Automatic logout on unauthorized access

### Recommended Enhancements
- [ ] Two-factor authentication (2FA)
- [ ] IP whitelisting
- [ ] Login attempt rate limiting
- [ ] Email verification requirement
- [ ] Password strength requirements
- [ ] Session timeout
- [ ] Audit logging

---

## 🐛 Troubleshooting

### Issue: "Access denied. Admin privileges required."
**Solution**: Ensure the user document in Firestore has `role: "admin"`

### Issue: "User account not found"
**Solution**: Create a document in Firestore `users` collection with the User UID as document ID

### Issue: "Firebase Authentication not initialized"
**Solution**: 
- Check that `firebase-config.js` is loaded
- Verify Firebase project configuration is correct
- Check browser console for errors

### Issue: Redirect loop
**Solution**: 
- Clear browser cache and localStorage
- Ensure `admin-login.html` doesn't check authentication (it shouldn't)
- Check that Firebase Auth is properly initialized

### Issue: Can't log in after creating user
**Solution**:
- Verify user was created in Firebase Authentication
- Verify user document exists in Firestore with correct UID
- Check that `role: "admin"` is set correctly
- Try signing out and signing in again

---

## 📝 Firestore Security Rules

Update your Firestore security rules to protect the `users` collection:

```javascript
match /users/{userId} {
  // Users can read their own data
  allow read: if request.auth != null && request.auth.uid == userId;
  
  // Only admins can read other users
  allow read: if request.auth != null && 
    get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
  
  // Only admins can create/update users
  allow write: if request.auth != null && 
    get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
  
  // Users can update their own profile (but not role)
  allow update: if request.auth != null && request.auth.uid == userId &&
    !("role" in request.resource.data.diff(resource.data).affectedKeys());
}
```

---

## ✅ Verification Checklist

- [ ] Admin user created in Firebase Authentication
- [ ] User document created in Firestore with `role: "admin"`
- [ ] Can access `admin-login.html`
- [ ] Can log in with admin credentials
- [ ] Redirected to `admin1.html` after login
- [ ] Cannot access `admin1.html` without login (redirects to login)
- [ ] Logout works correctly
- [ ] "Remember me" works (if tested)
- [ ] Forgot password works (if tested)

---

## 🎯 Next Steps

1. **Create your first admin user** following Step 1 and Step 2 above
2. **Test the login flow** to ensure everything works
3. **Update Firestore security rules** to protect user data
4. **Consider adding**:
   - User management interface in admin dashboard
   - Password reset functionality
   - Two-factor authentication
   - Login activity logging

---

**Need Help?** Check the browser console for error messages and verify all Firebase services are properly configured.

