# Firebase Init - Feature Selection Guide

**Current Step**: Selecting Firebase features

---

## 🎯 What to Select

**Use arrow keys** to navigate, **Space** to select, **Enter** to confirm.

### Required Features:
- ✅ **Firestore** - For database (REQUIRED)
- ✅ **Hosting** - For deploying website (REQUIRED)

### Optional Features:
- ⏭️ **Storage** - Optional (requires billing, but you can select it now)

---

## 📋 Selection Instructions

1. **Navigate** with arrow keys to **"Firestore"**
2. **Press Space** to select it (you'll see ✅)
3. **Navigate** to **"Hosting"**
4. **Press Space** to select it (you'll see ✅)
5. **Navigate** to **"Storage"** (optional)
6. **Press Space** to select it (you'll see ✅) - Optional, won't break if not enabled
7. **Press Enter** to confirm your selections

---

## ✅ Expected Selections

```
❯◯ Data Connect
 ◯ Firestore          ← Select this ✅
 ◯ Genkit
 ◯ Functions
 ◯ App Hosting
 ◯ Hosting            ← Select this ✅
 ◯ Storage            ← Select this ✅ (optional)
```

After selecting, press **Enter**.

---

## 🎯 Next Steps After Selection

After you press Enter, you'll be asked:
1. **Use existing project?** → Select **"Use an existing project"**
2. **Select project** → Choose **"prima-academy-website"**
3. **Firestore rules file** → Press Enter (uses `firestore.rules`)
4. **Overwrite existing file?** → Type **n** (don't overwrite)
5. **Firestore indexes file** → Press Enter (uses `firestore.indexes.json`)
6. **Overwrite existing file?** → Type **n** (don't overwrite)
7. **Storage rules file** → Press Enter (uses `storage.rules`)
8. **Overwrite existing file?** → Type **n** (don't overwrite)
9. **Public directory** → Type **.** (current directory)
10. **Single-page app?** → Type **n** (we have multiple HTML files)
11. **GitHub setup?** → Type **n** (skip for now)
12. **Overwrite index.html?** → Type **n** (keep existing)

---

**Ready?** Select Firestore and Hosting (and Storage if you want), then press Enter! 🚀

