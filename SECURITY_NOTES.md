# Security Notes for Prima Academy Website

## Firebase API Key Exposure

### ⚠️ GitHub Secret Detection Alert

GitHub has detected the Firebase API key in `js/firebase-config.js`. This is **expected and safe** for client-side Firebase applications.

### Why Firebase API Keys Can Be Public

1. **Client-Side Design**: Firebase API keys are designed to be included in client-side code (web browsers, mobile apps). They are not secret credentials.

2. **Security Through Rules**: Firebase security is enforced through:
   - **Firestore Security Rules** - Control database access
   - **Storage Security Rules** - Control file access
   - **Authentication Rules** - Control user authentication
   - **App Check** - Verify requests come from your app

3. **API Key Restrictions**: You can restrict API keys in Google Cloud Console:
   - HTTP referrer restrictions (web)
   - Android app restrictions
   - iOS app restrictions
   - IP address restrictions

### What to Do

#### Option 1: Keep Current Setup (Recommended for Static Sites)
- The current setup is **safe** for a static website
- Ensure Firestore Security Rules are properly configured
- Consider adding API key restrictions in Google Cloud Console

#### Option 2: Add API Key Restrictions
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to **APIs & Services** > **Credentials**
3. Find your API key
4. Click **Edit** and add restrictions:
   - **Application restrictions**: HTTP referrers
   - Add your domain: `prima-academy-website.web.app/*`
   - Add your custom domain if applicable

#### Option 3: Rotate the Key (If Concerned)
If you want to rotate the exposed key:
1. Go to Firebase Console > Project Settings
2. Create a new web app or regenerate API key
3. Update `js/firebase-config.js` with new values
4. Update any API key restrictions

### Important Security Practices

✅ **DO:**
- Keep Firestore Security Rules strict
- Use Authentication to verify users
- Validate data on the server side (Cloud Functions)
- Monitor Firebase usage in the console
- Set up API key restrictions

❌ **DON'T:**
- Don't store sensitive server-side credentials in client code
- Don't rely on API key secrecy for security
- Don't expose service account keys
- Don't hardcode admin credentials

### Current Security Status

- ✅ Firestore Security Rules: Configured (see `firestore.rules`)
- ✅ Storage Security Rules: Configured (see `storage.rules`)
- ✅ Authentication: Required for admin access
- ⚠️ API Key Restrictions: Should be configured in Google Cloud Console

### Resources

- [Firebase Security Rules Documentation](https://firebase.google.com/docs/rules)
- [API Key Best Practices](https://cloud.google.com/docs/authentication/api-keys)
- [Firebase Security Guide](https://firebase.google.com/docs/rules/basics)

---

**Note**: If you need to suppress GitHub's secret detection for this specific case, you can add a comment in the file or configure GitHub's secret scanning to ignore this pattern (not recommended unless you understand the implications).

