# Deploy Firestore Security Rules - URGENT

## ⚠️ Current Issue

The login page is showing "Missing or insufficient permissions" because the Firestore security rules are blocking access to the `users` collection.

## 🔧 Quick Fix

You need to deploy the updated Firestore rules to Firebase. Here's how:

### Method 1: Using Firebase Console (Recommended)

1. **Go to Firebase Console**: https://console.firebase.google.com
2. **Select your project**: Prima Academy Website
3. **Navigate to Firestore**: Click "Firestore Database" in the left sidebar
4. **Go to Rules tab**: Click on the "Rules" tab at the top
5. **Copy the rules**: Open `firestore.rules` file in this project
6. **Paste and Publish**: 
   - Delete the old rules
   - Paste the new rules from `firestore.rules`
   - Click "Publish" button

### Method 2: Using Firebase CLI

If you have Firebase CLI installed:

```bash
firebase deploy --only firestore:rules
```

## ✅ What the New Rules Do

The updated rules allow:
- **Authenticated users** to read their **own user document** (needed for admin verification during login)
- **Admins** to read/write all user documents
- **Public** to create admissions and contacts
- **Admins** to manage all other collections

## 🔍 Testing

After deploying:

1. Try logging in again
2. The "Missing or insufficient permissions" error should be gone
3. You should be able to access the admin dashboard

## 📝 Important Notes

- The rules file `firestore.rules` in this repository is now updated
- You must deploy it to Firebase for it to take effect
- The rules are secure - users can only read their own user document, not others

