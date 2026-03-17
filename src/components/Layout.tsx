import { Outlet, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import useAuthStore from '@/stores/useAuthStore'
import { LogOut, User } from 'lucide-react'

export default function Layout() {
  const { user, logout } = useAuthStore()

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0C0C0D] to-[#191919] text-foreground selection:bg-primary/30 selection:text-primary flex flex-col">
      <header className="border-b border-[#333333] bg-[#111111]/50 sticky top-0 z-50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/" className="font-display font-bold text-xl text-primary">
              Adapta Elite
            </Link>
          </div>
          {user && (
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
                <User className="w-4 h-4" />
                <span>{user.email}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                className="text-muted-foreground hover:text-foreground"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </Button>
            </div>
          )}
        </div>
      </header>
      <main className="flex-1 w-full">
        <Outlet />
      </main>
    </div>
  )
}
