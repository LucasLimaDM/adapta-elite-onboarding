import { Navigate, Outlet, useLocation } from 'react-router-dom'
import useAuthStore from '@/stores/useAuthStore'

export function ProtectedRoute() {
  const { user, isLoading } = useAuthStore()
  const location = useLocation()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-transparent">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // Domain restriction explicitly implemented for /dashboard as requested in Acceptance Criteria
  if (location.pathname === '/dashboard' && !user.email.endsWith('@adapta.org')) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}
