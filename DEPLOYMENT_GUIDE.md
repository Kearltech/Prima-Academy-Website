# Firebase Hosting Deployment Guide
## Prima Academy Website

### ✅ Setup Complete

Your Firebase Hosting is now configured and ready for deployment.

### 📋 Configuration Summary

- **Firebase Project**: `prima-academy-edu`
- **Public Directory**: `public/`
- **Total Files**: ~37 files (~1.4 MB)
- **Firestore Rules**: Configured and ready
- **Storage**: Using Cloudinary (not Firebase Storage)

### 🚀 Deployment Commands

#### Deploy Everything (Hosting + Firestore Rules)
```powershell
firebase deploy --only "hosting,firestore:rules"
```

#### Deploy Only Hosting
```powershell
firebase deploy --only hosting
```

#### Deploy Only Firestore Rules
```powershell
firebase deploy --only firestore:rules
```

### 📁 Project Structure

```
public/
├── index.html              # Homepage
├── admission.html          # Admissions form
├── admin.html              # Admin dashboard
├── admin-login.html        # Admin login
├── primary.html            # Primary school page
├── middle.html             # Middle school page
├── high.html               # High school page
├── highschool.html         # High school (alternate)
├── middleschool.html       # Middle school (alternate)
├── extracurricular.html    # Extracurricular activities
├── news.html               # News & events
├── 404.html                # Custom 404 page
├── js/                     # JavaScript files
│   ├── firebase-init.js   # Firebase initialization (modular)
│   ├── firebase-config.js # Firebase config (compat)
│   ├── firebase-db.js     # Firestore operations
│   ├── firebase-auth.js   # Authentication
│   └── ...
├── css/                    # Stylesheets
├── images/                 # Image assets
│   ├── logo.png
│   └── landpage.jpg
└── PRIMA ACADEMY PROSPECTUS.pdf
```

### 🔧 Firebase Configuration

**Project ID**: `prima-academy-edu`  
**Auth Domain**: `prima-academy-edu.firebaseapp.com`  
**Storage**: Cloudinary (cloud name: `dczezaxkv`)

### 📝 Important Notes

1. **Media Files**: Large media files have been moved out of `public/` to avoid deployment issues. They can be:
   - Uploaded to Cloudinary for gallery images
   - Added back after optimization (compress to <500KB each)

2. **File Paths**: All paths in HTML files are relative and will work correctly after deployment.

3. **Firestore Rules**: Security rules are configured to:
   - Allow public creation of admissions and contacts
   - Restrict admin operations to authenticated admins
   - Allow public read of news, gallery, and faculty

4. **Cloudinary**: Document uploads from admission form go to Cloudinary, not Firebase Storage.

### 🐛 Troubleshooting

#### Deployment Fails with "Circular JSON" Error
- This is a Firebase CLI bug with large uploads
- Current setup (37 files, ~1.4MB) should work fine
- If it still fails, try deploying in smaller batches

#### Files Not Found After Deployment
- Check that file paths are relative (not absolute)
- Verify files exist in `public/` folder
- Check browser console for 404 errors

#### Firestore Permission Errors
- Ensure Firestore rules are deployed: `firebase deploy --only firestore:rules`
- Check that user has `role: 'admin'` in Firestore `users` collection
- Verify Firebase config matches your project

### 🔄 Updating the Site

1. **Make changes** to files in `public/` folder
2. **Test locally** using Firebase emulators or a local server
3. **Deploy** using: `firebase deploy --only hosting`

### 📊 Post-Deployment Checklist

- [ ] Visit `https://prima-academy-edu.web.app` and verify homepage loads
- [ ] Test navigation to all pages
- [ ] Test admission form submission
- [ ] Test admin login
- [ ] Verify Firestore rules are active
- [ ] Check browser console for errors
- [ ] Test on mobile devices

### 🔗 URLs

- **Production Site**: https://prima-academy-edu.web.app
- **Firebase Console**: https://console.firebase.google.com/project/prima-academy-edu
- **Firestore Database**: https://console.firebase.google.com/project/prima-academy-edu/firestore

---

**Last Updated**: $(Get-Date -Format "yyyy-MM-dd")

