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
     */
    if (!loading && !user) {
      window.location.href = LOGIN_URL;
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
   * If no user after loading, return null (redirect will happen via useEffect)
   * This prevents rendering the shell before redirect completes
   */
  if (!user) {
    return null;
  }

  /**
   * User is authenticated, render the protected content
   */
  return <>{children}</>;
}
