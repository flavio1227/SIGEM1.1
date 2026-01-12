import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';

/**
 * Firebase Configuration
 * 
 * Firebase project configuration for SIGEM.
 * Values can be overridden using environment variables (VITE_FIREBASE_*)
 */
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyA_KRg3gquEfNTGVBpX5LXsy90kImNNYSc",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "sigem-8c63e.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "sigem-8c63e",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "sigem-8c63e.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "17276488812",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:17276488812:web:d1c6a6573240b3b94bdc49",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-CDHXQFPS5F"
};

/**
 * Initialize Firebase App
 * Only initialize if no apps are already initialized (prevents duplicate initialization)
 */
let app: FirebaseApp;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

/**
 * Initialize Firebase Auth
 */
export const auth: Auth = getAuth(app);

export default app;
