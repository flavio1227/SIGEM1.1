import { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { LOGIN_URL } from '../config/auth';

interface AuthGuardProps {
  children: React.ReactNode;
}

/**
 * Authentication Guard Component
 * 
 * Protects the shell application by checking Firebase authentication status.
 * 
 * Behavior:
 * - Shows nothing while checking authentication (loading state)
 * - Redirects to LOGIN_URL if user is not authenticated
 * - Renders children if user is authenticated
 * 
 * @param {React.ReactNode} children - The content to render if authenticated
 */
export function AuthGuard({ children }: AuthGuardProps) {
  const { user, loading } = useAuth();

  useEffect(() => {
    /**
     * Redirect to login if user is not authenticated
     * Only redirect after loading is complete to avoid flashing content
     * Skip redirect in development mode (localhost) to allow testing
     */
    if (!loading && !user) {
      const isDevelopment = window.location.hostname === 'localhost' || 
                            window.location.hostname === '127.0.0.1' ||
                            window.location.hostname.includes('localhost');
      
      // Only redirect in production, allow development without auth
      if (!isDevelopment) {
        // Prevent redirect loops by checking if we're already being redirected
        const currentUrl = window.location.href;
        if (!currentUrl.includes(LOGIN_URL)) {
          window.location.href = LOGIN_URL;
        }
      }
    }
  }, [user, loading]);

  /**
   * Show nothing while checking authentication status
   * This prevents the shell UI from flashing before redirect
   */
  if (loading) {
    return null;
  }

  /**
   * If no user after loading, check if we're in development mode
   * In development, allow rendering without auth for testing
   * In production, return null (redirect will happen via useEffect)
   */
  if (!user) {
    const isDevelopment = window.location.hostname === 'localhost' || 
                          window.location.hostname === '127.0.0.1' ||
                          window.location.hostname.includes('localhost');
    
    // Allow rendering in development mode without auth
    if (isDevelopment) {
      console.log('AuthGuard: Development mode - allowing access without authentication');
      return <>{children}</>;
    }
    
    // In production, prevent rendering before redirect completes
    console.log('AuthGuard: No user authenticated, redirecting to login...');
    return null;
  }

  /**
   * User is authenticated, render the protected content
   */
  return <>{children}</>;
}
