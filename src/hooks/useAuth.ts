import { useEffect, useState } from 'react';
import { User, onAuthStateChanged, signOut } from 'firebase/auth';
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
    let timeoutId: NodeJS.Timeout;
    let isMounted = true;

    /**
     * Timeout to prevent infinite loading state
     * If Firebase doesn't respond within 5 seconds, assume no user
     */
    timeoutId = setTimeout(() => {
      if (isMounted) {
        console.warn('Firebase Auth timeout - assuming no user');
        setLoading(false);
      }
    }, 5000);

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
          if (isMounted) {
            clearTimeout(timeoutId);
            setUser(currentUser);
            setLoading(false);
          }
        },
        (error) => {
          // Handle authentication errors gracefully
          if (isMounted) {
            clearTimeout(timeoutId);
            console.error('Firebase Auth Error:', error);
            setUser(null);
            setLoading(false);
          }
        }
      );

      /**
       * Cleanup: Unsubscribe from auth state changes when component unmounts
       */
      return () => {
        isMounted = false;
        clearTimeout(timeoutId);
        unsubscribe();
      };
    } catch (error) {
      // If Firebase initialization fails, allow app to continue
      if (isMounted) {
        clearTimeout(timeoutId);
        console.error('Error initializing Firebase Auth:', error);
        setUser(null);
        setLoading(false);
      }
    }
  }, []);

  /**
   * Function to sign out the current user
   * After signing out, the AuthGuard will redirect to login
   */
  const logout = async () => {
    try {
      await signOut(auth);
      console.log('User signed out successfully');
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  return { user, loading, logout };
}
