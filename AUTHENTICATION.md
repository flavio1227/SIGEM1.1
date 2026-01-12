# Authentication Guard Setup

This document explains how the authentication guard works and how to configure it.

## Overview

The SIGEM Shell application is now protected by Firebase Authentication. Users must be authenticated before they can access the shell interface.

## How It Works

1. **On Application Load**: The `AuthGuard` component checks the user's authentication status using Firebase's `onAuthStateChanged` listener.

2. **If Not Authenticated**: The user is immediately redirected to the SIGEM Login micro-app.

3. **If Authenticated**: The shell UI renders normally, allowing access to all micro-apps.

## File Structure

```
src/
├── config/
│   ├── firebase.ts      # Firebase initialization and configuration
│   └── auth.ts          # Authentication constants (LOGIN_URL)
├── hooks/
│   └── useAuth.ts       # Custom hook for authentication state
├── components/
│   └── AuthGuard.tsx    # Guard component that protects the shell
└── App.tsx              # Main app component (wrapped with AuthGuard)
```

## Configuration

### 1. Firebase Configuration

Edit `src/config/firebase.ts` and replace the Firebase configuration values with your project's credentials:

```typescript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};
```

**OR** use environment variables by creating a `.env` file:

```env
VITE_FIREBASE_API_KEY=your-api-key-here
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

### 2. Login URL Configuration

Edit `src/config/auth.ts` to set the URL of your SIGEM Login micro-app:

```typescript
export const LOGIN_URL = 'https://flavio1227.github.io/SIGEM-Login/';
```

## Where the Guard is Applied

The authentication guard is applied in `src/App.tsx`:

```typescript
function App() {
  // ... component logic ...
  
  return (
    <AuthGuard>
      {/* All shell UI content */}
    </AuthGuard>
  );
}
```

The `AuthGuard` component wraps the entire shell interface, ensuring that no part of the shell is accessible without authentication.

## Components Explained

### `useAuth` Hook (`src/hooks/useAuth.ts`)

- Monitors authentication state using Firebase's `onAuthStateChanged`
- Returns `{ user, loading }` where:
  - `user`: Firebase User object if authenticated, `null` otherwise
  - `loading`: `true` while checking auth status, `false` once determined

### `AuthGuard` Component (`src/components/AuthGuard.tsx`)

- Wraps protected content
- Shows nothing while loading (prevents UI flash)
- Redirects to `LOGIN_URL` if user is not authenticated
- Renders children only if user is authenticated

## Testing

1. **Without Authentication**: 
   - Clear browser cookies/localStorage
   - Navigate to the shell
   - Should redirect to LOGIN_URL

2. **With Authentication**:
   - Login through the SIGEM Login app
   - Navigate to the shell
   - Should display the shell interface normally

## Notes

- The guard uses the same Firebase project as the SIGEM Login micro-app
- Authentication state is checked on every page load
- The redirect happens immediately if the user is not authenticated
- No UI flash occurs during the authentication check
