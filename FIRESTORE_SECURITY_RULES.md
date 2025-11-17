# Firestore Security Rules for Prima Academy Website

## Overview
This document provides recommended Firestore security rules for the Prima Academy website. These rules should be deployed to your Firebase project to ensure proper data access control.

## Security Rules

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    
    // Helper function to check if user is authenticated
    function isAuthenticated() {
      return request.auth != null;
    }
    
    // Helper function to check if user is admin
    function isAdmin() {
      return isAuthenticated() && 
             get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Admissions Collection - Public can create, Admin can read/update
    match /admissions/{admissionId} {
      allow create: if request.resource.data.keys().hasAll(['firstName', 'lastName', 'gradeLevel', 'status']);
      allow read: if isAdmin();
      allow update: if isAdmin();
      allow delete: if isAdmin();
    }
    
    // Contacts Collection - Public can create, Admin can read
    match /contacts/{contactId} {
      allow create: if request.resource.data.keys().hasAll(['name', 'email', 'subject', 'message']);
      allow read: if isAdmin();
      allow update: if isAdmin();
      allow delete: if isAdmin();
    }
    
    // Students Collection - Admin only
    match /students/{studentId} {
      allow read, write: if isAdmin();
    }
    
    // Classes Collection - Admin only
    match /classes/{classId} {
      allow read, write: if isAdmin();
    }
    
    // Instructors Collection - Admin only
    match /instructors/{instructorId} {
      allow read, write: if isAdmin();
    }
    
    // Schedules Collection - Admin only
    match /schedules/{scheduleId} {
      allow read, write: if isAdmin();
    }
    
    // Payments Collection - Admin only
    match /payments/{paymentId} {
      allow read, write: if isAdmin();
    }
    
    // News Collection - Public can read published, Admin can write
    match /news/{newsId} {
      allow read: if resource.data.status == 'published' || isAdmin();
      allow write: if isAdmin();
    }
    
    // Events Collection - Public can read published, Admin can write
    match /events/{eventId} {
      allow read: if resource.data.status == 'published' || isAdmin();
      allow write: if isAdmin();
    }
    
    // Gallery Collection - Public can read published, Admin can write
    match /gallery/{imageId} {
      allow read: if resource.data.status == 'published' || isAdmin();
      allow write: if isAdmin();
    }
    
    // Faculty Collection - Public can read active, Admin can write
    match /faculty/{facultyId} {
      allow read: if resource.data.status == 'active' || isAdmin();
      allow write: if isAdmin();
    }
    
    // Settings Collection - Admin only
    match /settings/{settingId} {
      allow read, write: if isAdmin();
    }
    
    // Users Collection - Users can read their own data, Admin can read/write all
    match /users/{userId} {
      allow read: if isAuthenticated() && (request.auth.uid == userId || isAdmin());
      allow write: if isAdmin();
    }
  }
}
```

## Deployment Instructions

1. **Open Firebase Console**: Go to https://console.firebase.google.com
2. **Select Your Project**: Choose the Prima Academy project
3. **Navigate to Firestore**: Click on "Firestore Database" in the left sidebar
4. **Go to Rules Tab**: Click on the "Rules" tab
5. **Paste Rules**: Copy and paste the rules above into the editor
6. **Publish**: Click "Publish" to deploy the rules

## Important Notes

1. **User Authentication**: These rules assume you have Firebase Authentication set up with user roles stored in a `users` collection. You may need to adjust the `isAdmin()` function based on your authentication setup.

2. **Testing**: Before deploying to production, test the rules using the Firebase Console's Rules Playground.

3. **Development Mode**: For development, you might want to temporarily allow all reads/writes:
   ```javascript
   match /{document=**} {
     allow read, write: if true;
   }
   ```
   **WARNING**: Never use this in production!

4. **Indexes**: Some queries may require composite indexes. Firebase will prompt you to create them when needed.

## Data Validation

The rules include basic validation (checking for required fields). For more robust validation, consider:
- Using Cloud Functions for server-side validation
- Implementing client-side validation before submission
- Using Firestore data validation rules (if available in your Firebase plan)

## Security Best Practices

1. **Never expose admin credentials** in client-side code
2. **Use Firebase Authentication** for user management
3. **Implement rate limiting** for public write operations (admissions, contacts)
4. **Regularly audit** access logs in Firebase Console
5. **Keep rules updated** as your application evolves

