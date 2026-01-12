import { useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';

/**
 * Custom hook to manage authentication state
 * 
 * Uses Firebase's onAuthStateChanged to monitor authentication status.
 * Returns the current user and loading state.
 * 
 * @returns {Object} { user: User | null, loading: boolean }
 */
export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    /**
     * Subscribe to authentication state changes
     * This listener will fire:
     * - Immediately with the current auth state
     * - Whenever the auth state changes (login, logout, token refresh)
     */
    try {
      const unsubscribe = onAuthStateChanged(
        auth,
        (currentUser) => {
          setUser(currentUser);
          setLoading(false);
        },
        (error) => {
          // Handle authentication errors gracefully
          console.error('Firebase Auth Error:', error);
          setUser(null);
          setLoading(false);
        }
      );

      /**
       * Cleanup: Unsubscribe from auth state changes when component unmounts
       */
      return () => unsubscribe();
    } catch (error) {
      // If Firebase initialization fails, allow app to continue
      console.error('Error initializing Firebase Auth:', error);
      setUser(null);
      setLoading(false);
    }
  }, []);

  return { user, loading };
}
