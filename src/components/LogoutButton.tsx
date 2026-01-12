import { LogOut } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

/**
 * Logout Button Component
 * 
 * Displays a logout button that allows users to sign out.
 * After logout, the AuthGuard will redirect to the login page.
 */
export function LogoutButton() {
  const { logout, user } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      // The AuthGuard will automatically redirect after logout
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      alert('Error al cerrar sesión. Por favor, intenta nuevamente.');
    }
  };

  // Only show logout button if user is authenticated
  if (!user) {
    return null;
  }

  return (
    <button
      onClick={handleLogout}
      className="fixed top-4 left-4 sm:top-6 sm:left-6 px-2 py-1.5 sm:px-3 sm:py-2 rounded-sm bg-white/95 backdrop-blur-sm border border-slate-300 text-slate-600 hover:text-slate-800 hover:border-slate-400 transition-colors z-20 flex items-center gap-1.5 text-xs font-medium shadow-lg"
      aria-label="Cerrar sesión"
      title="Cerrar sesión"
    >
      <LogOut className="w-3 h-3" strokeWidth={1.5} />
      <span className="hidden sm:inline">Cerrar Sesión</span>
    </button>
  );
}
