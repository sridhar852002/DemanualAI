# Deployment Guide

## Prerequisites

1. **Firebase Project Setup**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project
   - Enable Authentication with Email/Password and Google Sign-In
   - Get your Firebase configuration

2. **Vercel Account**
   - Sign up at [Vercel](https://vercel.com/)
   - Connect your GitHub account

## Deployment Steps

### 1. Firebase Configuration

1. In Firebase Console, go to Project Settings
2. Scroll down to "Your apps" section
3. Click "Add app" and select Web
4. Register your app and copy the configuration
5. Enable Authentication:
   - Go to Authentication > Sign-in method
   - Enable Email/Password
   - Enable Google Sign-In

### 2. Deploy to Vercel

#### Option A: Deploy via Vercel CLI

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. Add environment variables:
```bash
vercel env add NEXT_PUBLIC_FIREBASE_API_KEY
vercel env add NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
vercel env add NEXT_PUBLIC_FIREBASE_PROJECT_ID
vercel env add NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
vercel env add NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
vercel env add NEXT_PUBLIC_FIREBASE_APP_ID
```

#### Option B: Deploy via GitHub

1. Push your code to GitHub:
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Click "New Project"
4. Import your GitHub repository
5. Add environment variables in project settings
6. Deploy

### 3. Environment Variables

Add these environment variables in Vercel:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 4. Firebase Authentication Setup

1. In Firebase Console, go to Authentication > Settings
2. Add your Vercel domain to authorized domains:
   - `your-app-name.vercel.app`
   - `your-custom-domain.com` (if using custom domain)

### 5. Test Deployment

1. Visit your deployed URL
2. Test sign up with email/password
3. Test Google Sign-In
4. Test event creation and management

## Troubleshooting

### Common Issues

1. **Authentication not working**
   - Check if Firebase project is properly configured
   - Verify environment variables are set correctly
   - Ensure authorized domains include your Vercel URL

2. **Build failures**
   - Check for TypeScript errors
   - Verify all dependencies are installed
   - Check environment variables are properly formatted

3. **Events not persisting**
   - Events are stored in localStorage, so they persist per browser
   - This is expected behavior for the current implementation

### Support

If you encounter issues:
1. Check Vercel deployment logs
2. Check browser console for errors
3. Verify Firebase configuration
4. Ensure all environment variables are set

## Production Considerations

For a production application, consider:
- Adding a real database (Firestore) for event storage
- Implementing user-specific event storage
- Adding event sharing capabilities
- Implementing proper error boundaries
- Adding loading states and better UX
- Adding unit and integration tests
