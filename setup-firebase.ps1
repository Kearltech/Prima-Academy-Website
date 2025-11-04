# Firebase Setup Script for Prima Academy Website
# PowerShell script to automate Firebase setup steps

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Firebase Setup for Prima Academy Website" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Firebase CLI is installed
Write-Host "Checking Firebase CLI..." -ForegroundColor Yellow
try {
    $firebaseVersion = firebase --version
    Write-Host "✓ Firebase CLI found: $firebaseVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Firebase CLI not found. Installing..." -ForegroundColor Red
    npm install -g firebase-tools
}

Write-Host ""

# Check if logged in
Write-Host "Checking Firebase login status..." -ForegroundColor Yellow
$loginStatus = firebase login:list 2>&1
if ($loginStatus -match "Not logged in") {
    Write-Host "✗ Not logged in to Firebase" -ForegroundColor Red
    Write-Host "Please run: firebase login" -ForegroundColor Yellow
    Write-Host ""
    $login = Read-Host "Would you like to login now? (y/n)"
    if ($login -eq "y" -or $login -eq "Y") {
        firebase login
    }
} else {
    Write-Host "✓ Logged in to Firebase" -ForegroundColor Green
    Write-Host $loginStatus -ForegroundColor Gray
}

Write-Host ""

# Initialize Firebase
Write-Host "Firebase initialization..." -ForegroundColor Yellow
Write-Host "This will set up Firebase in your project." -ForegroundColor Gray
Write-Host ""
$init = Read-Host "Would you like to initialize Firebase now? (y/n)"
if ($init -eq "y" -or $init -eq "Y") {
    Write-Host ""
    Write-Host "Running: firebase init" -ForegroundColor Cyan
    Write-Host "Please follow the prompts:" -ForegroundColor Yellow
    Write-Host "  - Select: Firestore, Storage, Hosting" -ForegroundColor Gray
    Write-Host "  - Choose existing project" -ForegroundColor Gray
    Write-Host "  - Don't overwrite existing files" -ForegroundColor Gray
    Write-Host ""
    firebase init
}

Write-Host ""

# Deploy rules
Write-Host "Security rules deployment..." -ForegroundColor Yellow
$deploy = Read-Host "Would you like to deploy security rules now? (y/n)"
if ($deploy -eq "y" -or $deploy -eq "Y") {
    Write-Host ""
    Write-Host "Deploying Firestore and Storage rules..." -ForegroundColor Cyan
    firebase deploy --only firestore:rules,storage:rules
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Setup Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Create Firebase project in Firebase Console" -ForegroundColor Gray
Write-Host "2. Enable Firestore, Authentication, and Storage" -ForegroundColor Gray
Write-Host "3. Get Firebase config and update js/firebase-config.js" -ForegroundColor Gray
Write-Host "4. Create admin user in Authentication" -ForegroundColor Gray
Write-Host "5. Create user document in Firestore with role: 'admin'" -ForegroundColor Gray
Write-Host ""
Write-Host "See SETUP_WIZARD.md for detailed instructions" -ForegroundColor Cyan

