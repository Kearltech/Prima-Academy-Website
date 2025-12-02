# Firebase to Supabase Migration Plan

**Project:** Prima Academy Website  
**Date:** December 1, 2025  
**Status:** Planning Phase - DO NOT MODIFY CODE YET

---

## 📊 Executive Summary

**Total Files with Firebase:** 17 files  
**Firebase Services Used:**
- ✅ Authentication (Firebase Auth)
- ✅ Database (Firestore)
- ✅ Storage (Firebase Storage)
- ✅ Hosting (Firebase Hosting)

---

## 🔍 Detailed Audit by File

### **1. JavaScript Configuration Files**

#### `js/firebase-config.js` (168 lines)
**Category: CONFIG + AUTH + DATABASE + STORAGE**

| Line(s) | Code | Category | Notes |
|---------|------|----------|-------|
| 17-26 | `const firebaseConfig = { apiKey, authDomain, projectId, storageBucket, ... }` | Config | Replace with Supabase config |
| 31-34 | `if (typeof firebase === 'undefined')` | Config | Remove Firebase SDK check |
| 39 | `firebase.initializeApp(firebaseConfig)` | Config | Replace with `createClient()` |
| 45 | `firebase.app()` | Config | Remove |
| 55 | `firebase.auth()` | Auth | Replace with Supabase auth |
| 56 | `window.firebaseAuth = auth` | Auth | Replace with Supabase auth |
| 65 | `firebase.firestore()` | Database | Replace with Supabase client |
| 66 | `window.firebaseDb = db` | Database | Replace with Supabase client |
| 78 | `firebase.storage()` | Storage | Replace with Supabase storage |
| 79 | `window.firebaseStorage = storage` | Storage | Replace with Supabase storage |
| 155-166 | Modular SDK imports (commented) | Config | Update for Supabase |

---

#### `js/firebase-init.js` (49 lines)
**Category: CONFIG (Modular SDK)**

| Line(s) | Code | Category | Notes |
|---------|------|----------|-------|
| 8-12 | `import { initializeApp, getAnalytics, getAuth, getFirestore, getStorage }` | Config | Replace with Supabase imports |
| 15-23 | `const firebaseConfig = {...}` | Config | Replace with Supabase URL/Key |
| 26 | `initializeApp(firebaseConfig)` | Config | Replace with `createClient()` |
| 31 | `getAnalytics(app)` | Config | Supabase has built-in analytics |
| 37-39 | `getAuth(app)`, `getFirestore(app)`, `getStorage(app)` | All | Replace with Supabase services |
| 42-46 | `window.firebaseApp`, `window.firebaseAuth`, etc. | All | Update global references |

---

#### `js/firebase-auth.js` (156 lines)
**Category: AUTH**

| Line(s) | Code | Category | Notes |
|---------|------|----------|-------|
| 6 | `import { auth, db } from './firebase-init.js'` | Auth | Replace with Supabase imports |
| 7 | `import { signInWithEmailAndPassword, onAuthStateChanged, signOut }` | Auth | Replace with Supabase auth methods |
| 8 | `import { doc, getDoc } from 'firebase-firestore'` | Database | Replace with Supabase queries |
| 20 | `onAuthStateChanged(this.auth, ...)` | Auth | Replace with `supabase.auth.onAuthStateChange()` |
| 38 | `signInWithEmailAndPassword(this.auth, email, password)` | Auth | Replace with `supabase.auth.signInWithPassword()` |
| 43-44 | `doc(this.db, 'users', user.uid)`, `getDoc(userRef)` | Database | Replace with `supabase.from('users').select()` |
| 48 | `await this.signOut()` | Auth | Replace with `supabase.auth.signOut()` |
| 64 | `fbSignOut(this.auth)` | Auth | Replace with Supabase signOut |
| 73 | `this.auth.currentUser` | Auth | Replace with `supabase.auth.getUser()` |
| 83-84 | Firestore user role check | Database | Replace with Supabase RLS policies |

---

#### `js/firebase-db.js` (278 lines)
**Category: DATABASE**

| Line(s) | Code | Category | Notes |
|---------|------|----------|-------|
| 12 | `this.db = window.firebaseDb` | Database | Replace with Supabase client |
| 20-24 | `this.db.collection('admissions').add({...})` | Database | Replace with `supabase.from('admissions').insert()` |
| 22 | `firebase.firestore.FieldValue.serverTimestamp()` | Database | Replace with `new Date().toISOString()` or SQL `now()` |
| 26-43 | Modular imports: `collection, addDoc, getDocs, getDoc, doc, query, where, orderBy, limit, updateDoc, setDoc, serverTimestamp, increment, onSnapshot, Timestamp` | Database | Replace with Supabase query methods |
| 52-57 | `addDoc(collection(this.db, 'admissions'), {...})` | Database | Replace with `.insert()` |
| 67-68 | `doc(this.db, 'admissions', admissionId)`, `getDoc(docRef)` | Database | Replace with `.select().eq('id', admissionId).single()` |
| 79-82 | `query(collection(...), orderBy('submittedAt', 'desc'))`, `getDocs(q)` | Database | Replace with `.select().order('submitted_at', { ascending: false })` |
| 93-94 | `updateDoc(ref, { status, reviewedAt: serverTimestamp() })` | Database | Replace with `.update()` |
| 104-108 | `addDoc(collection(this.db, 'contacts'), {...})` | Database | Replace with `.insert()` |
| 118-121 | Query contacts with orderBy | Database | Replace with Supabase query |
| 131-134 | Query with `where`, `orderBy`, `limit` | Database | Replace with `.select().eq().order().limit()` |
| 144-146 | Get single news article | Database | Replace with `.select().single()` |
| 158-163 | Update or insert news | Database | Replace with `.upsert()` or conditional insert/update |
| 174-177 | Query gallery images | Database | Replace with Supabase query |
| 187-190 | Query faculty with where clause | Database | Replace with `.select().eq('status', 'active')` |
| 208-213 | Insert page visit + increment counter with `setDoc(..., { merge: true })` | Database | Replace with `.insert()` and `.upsert()` or use PostgreSQL functions |
| 225-230 | Aggregate visitCounters | Database | Replace with Supabase aggregate query |
| 244 | `Timestamp.fromDate(start)` | Database | Use JavaScript Date or ISO strings |
| 272-273 | `window.firebaseDBInstance = firebaseDBInstance` | Database | Update global reference |

---

#### `js/firebase-storage.js` (286 lines)
**Category: STORAGE**

| Line(s) | Code | Category | Notes |
|---------|------|----------|-------|
| 12 | `this.storage = window.firebaseStorage` | Storage | Replace with Supabase storage |
| 18-64 | `uploadAdmissionDocument()` - Storage ref, put(), getDownloadURL() | Storage | Replace with `supabase.storage.from('bucket').upload()` |
| 31-34 | `storageRef.put(file)`, upload task with progress | Storage | Supabase has different upload API |
| 51 | `uploadTask.snapshot.ref.getDownloadURL()` | Storage | Replace with `.getPublicUrl()` |
| 70-94 | `uploadAdmissionDocuments()` - batch upload | Storage | Adapt for Supabase batch uploads |
| 99-144 | `uploadGalleryImage()` | Storage | Replace with Supabase storage |
| 149-194 | `uploadNewsImage()` | Storage | Replace with Supabase storage |
| 199-208 | `deleteFile()` | Storage | Replace with `.remove()` |
| 213-222 | `getDownloadURL()` | Storage | Replace with `.getPublicUrl()` |
| 227-260 | `validateFile()` - client-side validation | Storage | Keep as-is (client-side logic) |

---

#### `js/utils/firebase-helpers.js` (234 lines)
**Category: DATABASE (Utility Functions)**

| Line(s) | Code | Category | Notes |
|---------|------|----------|-------|
| 12-22 | `timestampToDate()` - converts Firestore timestamps | Database | Adapt for PostgreSQL timestamps |
| 27-41 | `formatDate()` - date formatting | Database | Keep as-is (works with any date) |
| 46-51 | `serverTimestamp()` returns `firebase.firestore.FieldValue.serverTimestamp()` | Database | Replace with `new Date()` or remove |
| 56-58 | `generateId()` uses `firebase.firestore().collection('_').doc().id` | Database | Replace with `crypto.randomUUID()` or let Supabase auto-generate |
| 63-83 | `sanitizeData()` - handles Firestore timestamps | Database | Adapt for PostgreSQL date handling |
| 47-48 | `typeof firebase !== 'undefined' && firebase.firestore` | Database | Remove Firebase checks |
| 74 | `firebase.firestore.Timestamp.fromDate(value)` | Database | Remove Firestore-specific conversion |

---

#### `js/init-emulators.js` (49 lines)
**Category: CONFIG (Development)**

| Line(s) | Code | Category | Notes |
|---------|------|----------|-------|
| 4-7 | `import { db, auth, storage }`, `connectFirestoreEmulator`, `connectAuthEmulator`, `connectStorageEmulator` | Config | Replace with Supabase local development setup |
| 10-14 | Emulator configuration ports | Config | Supabase has different local setup |
| 23-36 | Connect to Firebase emulators | Config | Replace with Supabase local connection |
| 40 | `window.__useFirebaseEmulators = true` | Config | Update flag for Supabase local mode |

---

#### `js/admin-config.js` (497 lines)
**Category: CONFIG (Admin Settings)**

| Line(s) | Code | Category | Notes |
|---------|------|----------|-------|
| 113 | `allowedDocumentTypes` reference | Storage | Keep as-is (validation logic) |
| 389 | `collections` configuration | Database | Update collection/table names if needed |
| All | Admin configuration constants | Config | Minimal Firebase dependency, mostly keep as-is |

---

### **2. HTML Files**

#### `index.html` (1992 lines)
**Category: AUTH + DATABASE**

| Line(s) | Code | Category | Notes |
|---------|------|----------|-------|
| 1572 | `await waitForFirebaseReady()` | Config | Replace with Supabase ready check |
| 1583 | `if (!window.firebaseDBInstance) return` | Database | Update global reference |
| 1585 | `await window.firebaseDBInstance.trackPageVisit(pageName)` | Database | Call Supabase DB method |
| 1591-1600 | `waitForFirebaseReady()` function | Config | Replace with Supabase initialization check |
| 1595 | `if (window.firebaseDBInstance && window.firebaseDb)` | Database | Update checks |
| 1741 | `if (!window.firebaseDBInstance || !window.firebaseDb)` | Database | Update checks |
| 1758 | `await window.firebaseDBInstance.submitContact(contactData)` | Database | Call Supabase method |
| 1876-1879 | Load news: `window.firebaseDBInstance.getNews()` | Database | Call Supabase method |
| 1911-1914 | Load faculty: `window.firebaseDBInstance.getAllFacultyMembers()` | Database | Call Supabase method |
| 1942-1945 | Load gallery: `window.firebaseDBInstance.getAllGalleryImages()` | Database | Call Supabase method |
| 1984-1990 | `<script type="module">` imports firebase-init, firebase-auth, firebase-db | Config | Update imports to Supabase modules |

---

#### `admin.html` (1726 lines)
**Category: AUTH**

| Line(s) | Code | Category | Notes |
|---------|------|----------|-------|
| 1258 | `if (!window.firebaseAuthInstance)` | Auth | Update reference |
| 1262 | `await window.firebaseAuthInstance.signIn(username, password)` | Auth | Call Supabase auth method |
| 1279 | `await window.firebaseAuthInstance.signOut()` | Auth | Call Supabase signOut |
| 1721-1726 | `<script type="module">` imports | Config | Update imports |

---

#### `admin1.html` (8908 lines)
**Category: AUTH + DATABASE + STORAGE**

| Line(s) | Code | Category | Notes |
|---------|------|----------|-------|
| 10-14 | `<script src="...firebase-app-compat.js">`, auth, firestore, storage | Config | Replace with Supabase CDN or npm |
| 16-17 | `<script src="js/firebase-config.js">` | Config | Replace with Supabase config |
| 19-21 | Firebase module scripts | Config | Update to Supabase modules |
| 4242-4243 | `if (!window.firebaseDBInstance || !window.firebaseDb)` | Database | Update checks |
| 4252-4387 | Multiple `window.firebaseDBInstance.on*Update()` listeners | Database | Replace with Supabase realtime subscriptions |
| 4405-4461 | Multiple `window.firebaseDBInstance.getAll*()` calls | Database | Replace with Supabase select queries |
| 4492-4503 | `firebaseInitInterval` - wait for Firebase init | Config | Replace with Supabase init check |
| 4800-8625 | Extensive Firebase DB operations throughout admin dashboard | Database | Migrate all to Supabase queries |
| 8349-8402 | `fetchEnrollmentsFromFirebase()` function | Database | Rename and update to Supabase |
| 8794, 8849, 8881, 8891-8893, 8919-8922, 8937, 8950, 8975 | `window.firebaseAuth.signOut()`, `onAuthStateChanged()` | Auth | Replace with Supabase auth |

---

#### `admin-login.html` (768 lines)
**Category: AUTH + DATABASE**

| Line(s) | Code | Category | Notes |
|---------|------|----------|-------|
| 10-13 | Firebase SDK imports (compat) | Config | Replace with Supabase |
| 15-16 | `<script src="js/firebase-config.js">` | Config | Update |
| 18-19 | Firebase auth module | Auth | Replace with Supabase auth |
| 405-438 | `waitForFirebaseReady()` function | Config | Replace with Supabase ready check |
| 410-423 | `typeof firebase === 'undefined'` checks | Config | Update for Supabase |
| 516-527 | `showFirebaseError()` | Config | Update error handling |
| 533-656 | Auth state check, sign in with email/password, Firestore user doc check | Auth + Database | Replace with Supabase auth + RLS |
| 541 | `auth.onAuthStateChanged()` | Auth | Replace with `onAuthStateChange()` |
| 618 | `window.firebaseAuth.signInWithEmailAndPassword()` | Auth | Replace with `supabase.auth.signInWithPassword()` |
| 622-626 | Get user doc from Firestore, check role | Database | Replace with Supabase user metadata or separate table |
| 640-642 | `setPersistence()` | Auth | Supabase handles persistence differently |
| 656-657 | Update user lastLogin with serverTimestamp | Database | Replace with Supabase update |
| 768 | `sendPasswordResetEmail()` | Auth | Replace with `supabase.auth.resetPasswordForEmail()` |

---

#### `admission.html` (1455 lines)
**Category: DATABASE + STORAGE**

| Line(s) | Code | Category | Notes |
|---------|------|----------|-------|
| 1208-1212 | Firebase SDK imports | Config | Replace with Supabase |
| 1214-1215 | Firebase config script | Config | Update |
| 1217-1219 | Firebase DB and Storage modules | Config | Update |
| 1226-1228 | Track page visit | Database | Replace with Supabase insert |
| 1254-1267 | `waitForFirebaseReady()` | Config | Update |
| 1276-1281 | `getAllNotifications()` | Database | Replace with Supabase query |
| 1374 | `if (!window.firebaseDBInstance || !window.firebaseDb)` | Database | Update check |
| 1414 | `window.firebaseDBInstance.submitAdmission(enrollmentData)` | Database | Replace with Supabase insert |
| 1419-1455 | File upload with `window.firebaseStorageInstance.uploadAdmissionDocument()` | Storage | Replace with Supabase storage upload |

---

#### `news.html` (721 lines)
**Category: DATABASE**

| Line(s) | Code | Category | Notes |
|---------|------|----------|-------|
| 648-650 | Firebase SDK imports (compat) | Config | Replace with Supabase |
| 651-652 | Firebase config and DB scripts | Config | Update |
| 668-670 | Track page visit | Database | Replace with Supabase |
| 700-710 | `waitForFirebaseReady()` | Config | Update |
| 717-721 | `window.firebaseDBInstance.getAllNewsArticles()` | Database | Replace with Supabase query |

---

### **3. Configuration & Infrastructure Files**

#### `firebase.json` (104 lines)
**Category: CONFIG (Infrastructure)**

| Line(s) | Code | Category | Notes |
|---------|------|----------|-------|
| 2-5 | Firestore rules and indexes configuration | Database | Migrate to Supabase RLS policies |
| 6-73 | Hosting configuration | Config | Replace with Vercel/Netlify or Supabase hosting (if available) |
| 75-77 | Storage rules | Storage | Migrate to Supabase storage policies |
| 78-81 | Functions configuration | Config | Replace with Supabase Edge Functions if needed |
| 82-102 | Emulators configuration | Config | Replace with Supabase local development |

---

#### `firestore.rules` (100 lines)
**Category: DATABASE (Security)**

| Line(s) | Code | Category | Notes |
|---------|------|----------|-------|
| 3 | `service cloud.firestore` | Database | Replace with Supabase RLS policies |
| 7-9 | `isAuthenticated()` helper | Auth | Translate to `auth.uid() is not null` in RLS |
| 13-17 | `isAdmin()` helper with Firestore get() | Database | Translate to RLS with user role check |
| 20-27 | Users collection rules | Database | Create `users` table with RLS |
| 30-35 | Admissions collection rules | Database | Create `admissions` table with RLS |
| 38-43 | Contacts collection rules | Database | Create `contacts` table with RLS |
| 46-98 | All other collection rules (students, classes, news, events, gallery, faculty, settings) | Database | Create tables with corresponding RLS policies |

---

#### `storage.rules` (72 lines)
**Category: STORAGE (Security)**

| Line(s) | Code | Category | Notes |
|---------|------|----------|-------|
| 3 | `service firebase.storage` | Storage | Replace with Supabase storage policies |
| 7-9 | `isAuthenticated()` helper | Auth | Translate to Supabase storage policy |
| 12-15 | `isAdmin()` helper | Auth | Translate to Supabase storage policy |
| 18-30 | Admission documents upload/read rules | Storage | Create Supabase bucket with policies |
| 33-44 | Gallery images rules | Storage | Create gallery bucket with policies |
| 47-58 | News images rules | Storage | Create news bucket with policies |
| 61-64 | General uploads rules | Storage | Create uploads bucket with policies |

---

#### `firestore.indexes.json` (4 lines)
**Category: DATABASE (Indexes)**

| Line(s) | Code | Category | Notes |
|---------|------|----------|-------|
| 2-3 | Empty indexes and fieldOverrides | Database | Create PostgreSQL indexes manually if needed |

---

#### `package.json` (37 lines)
**Category: CONFIG (Dependencies)**

| Line(s) | Code | Category | Notes |
|---------|------|----------|-------|
| 7-15 | Firebase CLI scripts (serve, deploy, etc.) | Config | Replace with Supabase CLI commands |
| 21 | "firebase" keyword | Config | Update to "supabase" |
| 27 | `firebase-tools` devDependency | Config | Replace with `supabase` CLI |
| 30 | `firebase` dependency | Config | Replace with `@supabase/supabase-js` |

---

#### `setup-firebase.ps1` (76 lines)
**Category: CONFIG (Setup Script)**

| Line(s) | Code | Category | Notes |
|---------|------|----------|-------|
| 1-76 | Entire PowerShell script for Firebase setup | Config | Create new `setup-supabase.ps1` script |

---

## 📋 Action Items Checklist

### Phase 1: Planning & Setup
- [ ] **1.1** Create Supabase project at [supabase.com](https://supabase.com)
- [ ] **1.2** Note Supabase project URL and anon/service keys
- [ ] **1.3** Review this migration plan with team
- [ ] **1.4** Set up development branch for migration
- [ ] **1.5** Back up current Firebase data (export Firestore collections)
- [ ] **1.6** Install Supabase CLI: `npm install -g supabase`
- [ ] **1.7** Install Supabase JS client: `npm install @supabase/supabase-js`
- [ ] **1.8** Remove Firebase dependencies from `package.json`

### Phase 2: Database Migration (Firestore → PostgreSQL)
- [ ] **2.1** Design PostgreSQL schema matching Firestore collections
  - [ ] `users` table (with role column for admin check)
  - [ ] `admissions` table
  - [ ] `contacts` table
  - [ ] `students` table
  - [ ] `classes` table
  - [ ] `instructors` table
  - [ ] `schedules` table
  - [ ] `payments` table
  - [ ] `news` table
  - [ ] `events` table
  - [ ] `gallery` table
  - [ ] `faculty` table
  - [ ] `settings` table
  - [ ] `page_visits` table
  - [ ] `visit_counters` table
- [ ] **2.2** Create tables in Supabase (use SQL Editor or migrations)
- [ ] **2.3** Set up Row Level Security (RLS) policies
  - [ ] Public read for published content (news, events, gallery, faculty)
  - [ ] Admin-only write access
  - [ ] Public create for admissions and contacts
- [ ] **2.4** Export data from Firestore
- [ ] **2.5** Transform and import data into PostgreSQL
- [ ] **2.6** Create necessary indexes for performance
- [ ] **2.7** Test queries in Supabase dashboard

### Phase 3: Storage Migration (Firebase Storage → Supabase Storage)
- [ ] **3.1** Create Supabase storage buckets
  - [ ] `admissions` bucket (for admission documents)
  - [ ] `gallery` bucket (for gallery images)
  - [ ] `news` bucket (for news images)
  - [ ] `uploads` bucket (general uploads)
- [ ] **3.2** Set up storage policies
  - [ ] Public upload for admissions (with file size/type restrictions)
  - [ ] Admin-only upload for gallery and news
  - [ ] Public read for gallery and news
- [ ] **3.3** Download all files from Firebase Storage
- [ ] **3.4** Upload files to Supabase Storage
- [ ] **3.5** Update file URLs in database

### Phase 4: Authentication Migration (Firebase Auth → Supabase Auth)
- [ ] **4.1** Export user list from Firebase Authentication
- [ ] **4.2** Create users in Supabase Auth
- [ ] **4.3** Set user metadata (role: admin) for admin users
- [ ] **4.4** Test authentication flow
- [ ] **4.5** Set up password reset email templates
- [ ] **4.6** Configure auth providers if needed (email/password is default)

### Phase 5: Code Refactoring - Configuration Files
- [ ] **5.1** Create `js/supabase-config.js` (replace `firebase-config.js`)
- [ ] **5.2** Create `js/supabase-init.js` (replace `firebase-init.js`)
- [ ] **5.3** Update `js/init-emulators.js` for Supabase local development
- [ ] **5.4** Delete `firebase-config.example.js` or create Supabase equivalent
- [ ] **5.5** Update `package.json` scripts for Supabase

### Phase 6: Code Refactoring - Auth Module
- [ ] **6.1** Refactor `js/firebase-auth.js` → `js/supabase-auth.js`
  - [ ] Replace `signInWithEmailAndPassword` with `supabase.auth.signInWithPassword`
  - [ ] Replace `onAuthStateChanged` with `supabase.auth.onAuthStateChange`
  - [ ] Replace `signOut` with `supabase.auth.signOut`
  - [ ] Replace Firestore user role check with Supabase user metadata or table query
  - [ ] Update `getCurrentUser()` to use `supabase.auth.getUser()`
  - [ ] Update `isAuthenticated()` logic
  - [ ] Update `isAdmin()` role check

### Phase 7: Code Refactoring - Database Module
- [ ] **7.1** Refactor `js/firebase-db.js` → `js/supabase-db.js`
  - [ ] Replace `collection().add()` with `from().insert()`
  - [ ] Replace `doc().get()` with `from().select().eq().single()`
  - [ ] Replace `collection().get()` with `from().select()`
  - [ ] Replace `doc().update()` with `from().update().eq()`
  - [ ] Replace `doc().delete()` with `from().delete().eq()`
  - [ ] Replace `query(where(), orderBy(), limit())` with `.select().eq().order().limit()`
  - [ ] Replace `serverTimestamp()` with `new Date().toISOString()`
  - [ ] Replace `onSnapshot()` with `supabase.channel().on('postgres_changes')`
  - [ ] Update all 15+ methods in the class

### Phase 8: Code Refactoring - Storage Module
- [ ] **8.1** Refactor `js/firebase-storage.js` → `js/supabase-storage.js`
  - [ ] Replace `storage.ref().put()` with `storage.from('bucket').upload()`
  - [ ] Replace `getDownloadURL()` with `.getPublicUrl()`
  - [ ] Update `uploadAdmissionDocument()` method
  - [ ] Update `uploadAdmissionDocuments()` batch upload
  - [ ] Update `uploadGalleryImage()` method
  - [ ] Update `uploadNewsImage()` method
  - [ ] Update `deleteFile()` with `.remove()`
  - [ ] Keep client-side `validateFile()` logic
  - [ ] Update progress tracking (Supabase has different API)

### Phase 9: Code Refactoring - Utility Functions
- [ ] **9.1** Refactor `js/utils/firebase-helpers.js` → `js/utils/supabase-helpers.js`
  - [ ] Update `timestampToDate()` for PostgreSQL timestamps
  - [ ] Remove `serverTimestamp()` or replace with `new Date()`
  - [ ] Replace `generateId()` with `crypto.randomUUID()` or let Supabase auto-generate
  - [ ] Update `sanitizeData()` for PostgreSQL compatibility
  - [ ] Remove Firebase-specific error handling
  - [ ] Keep validation helpers (email, phone)

### Phase 10: Code Refactoring - HTML Files
- [ ] **10.1** Update `index.html` (13 instances)
  - [ ] Replace Firebase script imports with Supabase imports
  - [ ] Update `waitForFirebaseReady()` to `waitForSupabaseReady()`
  - [ ] Update all `window.firebaseDBInstance` references
  - [ ] Update module imports at bottom of file
- [ ] **10.2** Update `admin.html` (8 instances)
  - [ ] Replace Firebase imports
  - [ ] Update auth references
  - [ ] Update module imports
- [ ] **10.3** Update `admin1.html` (150+ instances)
  - [ ] Replace Firebase SDK imports
  - [ ] Update all DB instance references
  - [ ] Update realtime listeners
  - [ ] Update auth state listeners
  - [ ] Rename `fetchEnrollmentsFromFirebase()` function
- [ ] **10.4** Update `admin-login.html` (60 instances)
  - [ ] Replace Firebase imports
  - [ ] Update auth flow
  - [ ] Update user role check
  - [ ] Update persistence logic
  - [ ] Update password reset
- [ ] **10.5** Update `admission.html` (24 instances)
  - [ ] Replace Firebase imports
  - [ ] Update file upload logic
  - [ ] Update admission submission
- [ ] **10.6** Update `news.html` (13 instances)
  - [ ] Replace Firebase imports
  - [ ] Update news loading
  - [ ] Update page tracking

### Phase 11: Infrastructure & Configuration
- [ ] **11.1** Create Supabase security policies (translate from `firestore.rules`)
- [ ] **11.2** Create Supabase storage policies (translate from `storage.rules`)
- [ ] **11.3** Update deployment configuration
  - [ ] Remove `firebase.json` or create for Supabase hosting
  - [ ] Set up alternative hosting (Vercel, Netlify, or Supabase hosting)
- [ ] **11.4** Update environment variables
- [ ] **11.5** Create `setup-supabase.ps1` (replace `setup-firebase.ps1`)
- [ ] **11.6** Update `README.md` with Supabase instructions
- [ ] **11.7** Update all documentation files mentioning Firebase

### Phase 12: Testing
- [ ] **12.1** Test authentication
  - [ ] Login with admin user
  - [ ] Login with non-admin user (should fail)
  - [ ] Logout
  - [ ] Password reset
  - [ ] Session persistence
- [ ] **12.2** Test database operations
  - [ ] Create admission
  - [ ] Read admissions (admin)
  - [ ] Update admission status
  - [ ] Submit contact form
  - [ ] Load news articles
  - [ ] Load gallery images
  - [ ] Load faculty members
  - [ ] Track page visits
- [ ] **12.3** Test file uploads
  - [ ] Upload admission documents
  - [ ] Upload gallery images
  - [ ] Upload news images
  - [ ] Test file size/type validation
  - [ ] Test file deletion
- [ ] **12.4** Test admin dashboard
  - [ ] All CRUD operations for each entity
  - [ ] Real-time updates
  - [ ] Search and filter
  - [ ] Statistics and analytics
- [ ] **12.5** Test public pages
  - [ ] Homepage content loading
  - [ ] News page
  - [ ] Admission form
  - [ ] Contact form
- [ ] **12.6** Performance testing
  - [ ] Page load times
  - [ ] Query performance
  - [ ] File upload/download speed
- [ ] **12.7** Security testing
  - [ ] RLS policies working correctly
  - [ ] Unauthorized access blocked
  - [ ] File access restrictions

### Phase 13: Deployment & Go-Live
- [ ] **13.1** Deploy to staging environment
- [ ] **13.2** Run full regression tests
- [ ] **13.3** Get stakeholder approval
- [ ] **13.4** Schedule maintenance window
- [ ] **13.5** Final data sync from Firebase
- [ ] **13.6** Deploy to production
- [ ] **13.7** Monitor for errors
- [ ] **13.8** Update DNS/URLs if needed

### Phase 14: Post-Migration Cleanup
- [ ] **14.1** Verify all Firebase services are replaced
- [ ] **14.2** Keep Firebase read-only for 30 days (rollback safety)
- [ ] **14.3** Remove Firebase dependencies from `package.json`
- [ ] **14.4** Delete Firebase configuration files
- [ ] **14.5** Cancel Firebase billing (after rollback period)
- [ ] **14.6** Archive Firebase project
- [ ] **14.7** Update all documentation
- [ ] **14.8** Train team on Supabase

---

## 📝 Notes & Considerations

### Key Differences: Firebase vs Supabase

1. **Database**: Firestore (NoSQL) → PostgreSQL (SQL)
   - Collections become tables
   - Documents become rows
   - Subcollections need restructuring (foreign keys)
   - `serverTimestamp()` → `now()` or JavaScript Date
   - Auto-generated IDs remain, but PostgreSQL uses `uuid` or `bigint`

2. **Authentication**: Firebase Auth → Supabase Auth
   - Similar API, easier migration
   - User metadata stored differently
   - Email templates configured in dashboard
   - Sessions handled automatically

3. **Storage**: Firebase Storage → Supabase Storage (backed by S3)
   - Similar bucket concept
   - Different upload API (simpler in Supabase)
   - Policies instead of rules

4. **Security**: Security Rules → Row Level Security (RLS)
   - More powerful with SQL
   - Policies attached to tables
   - Can use PostgreSQL functions

5. **Real-time**: Firestore snapshots → PostgreSQL Change Data Capture
   - Similar functionality
   - Subscribe to table changes
   - Uses WebSockets

### Migration Risks

- **Data Loss**: Back up everything before starting
- **Downtime**: Plan for maintenance window
- **URL Changes**: File URLs will change (update database)
- **Feature Parity**: Ensure Supabase supports all current features
- **Learning Curve**: Team needs Supabase training

### Estimated Timeline

- **Small Team (1-2 developers)**: 2-3 weeks
- **With Testing & QA**: 3-4 weeks
- **Including Data Migration**: Add 1 week

---

## 🎯 Success Criteria

- [ ] All pages load without Firebase errors
- [ ] Authentication works identically
- [ ] All database operations successful
- [ ] File uploads/downloads working
- [ ] Admin dashboard fully functional
- [ ] No degradation in performance
- [ ] Security policies enforced correctly
- [ ] Zero Firebase dependencies remaining

---

**Last Updated:** December 1, 2025  
**Migration Status:** ⏳ Planning Phase - Ready to Execute

