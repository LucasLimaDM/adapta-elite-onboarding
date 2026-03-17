import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { AuthProvider } from '@/stores/useAuthStore'
import { ErrorBoundary } from './components/ErrorBoundary'
import { NetworkStatus } from './components/NetworkStatus'
import Layout from './components/Layout'
import { ProtectedRoute } from './components/ProtectedRoute'
import useAuthStore from './stores/useAuthStore'

const Index = lazy(() => import('./pages/Index'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const NotFound = lazy(() => import('./pages/NotFound'))
const Login = lazy(() => import('./pages/Login'))
const SignUp = lazy(() => import('./pages/SignUp'))
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'))
const ResetPassword = lazy(() => import('./pages/ResetPassword'))

function GuestRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuthStore()
  if (isLoading) return null
  if (user) return <Navigate to="/" replace />
  return <>{children}</>
}

const App = () => (
  <ErrorBoundary>
    <NetworkStatus>
      <BrowserRouter future={{ v7_startTransition: false, v7_relativeSplatPath: false }}>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Suspense
              fallback={
                <div className="min-h-screen flex items-center justify-center bg-transparent">
                  <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
              }
            >
              <Routes>
                <Route element={<Layout />}>
                  <Route
                    path="/login"
                    element={
                      <GuestRoute>
                        <Login />
                      </GuestRoute>
                    }
                  />
                  <Route
                    path="/signup"
                    element={
                      <GuestRoute>
                        <SignUp />
                      </GuestRoute>
                    }
                  />
                  <Route
                    path="/forgot-password"
                    element={
                      <GuestRoute>
                        <ForgotPassword />
                      </GuestRoute>
                    }
                  />
                  <Route path="/reset-password" element={<ResetPassword />} />

                  <Route element={<ProtectedRoute />}>
                    <Route path="/" element={<Index />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                  </Route>
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </TooltipProvider>
        </AuthProvider>
      </BrowserRouter>
    </NetworkStatus>
  </ErrorBoundary>
)

export default App
