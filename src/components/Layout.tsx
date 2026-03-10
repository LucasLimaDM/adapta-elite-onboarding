import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Progress } from '@/components/ui/progress'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { AlertCircle, LogOut, Loader2 } from 'lucide-react'
import useAuthStore from '@/stores/useAuthStore'

export type LayoutContextType = {
  currentStep: number
  setCurrentStep: (step: number) => void
  totalSteps: number
  user: { email: string; clientId: string }
}

export default function Layout() {
  const { user, isLoading: isAuthLoading, error, logout } = useAuthStore()
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 6
  const progress = (currentStep / totalSteps) * 100

  if (isAuthLoading) {
    return (
      <div className="min-h-screen flex flex-col font-sans bg-slate-50">
        <header className="w-full bg-white border-b border-slate-200">
          <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-32 hidden sm:block" />
          </div>
        </header>
        <main className="flex-1 flex flex-col items-center justify-center py-8 sm:py-16 px-4">
          <div className="w-full max-w-[600px] flex flex-col items-center gap-8">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
            <Skeleton className="h-[400px] w-full rounded-2xl shadow-sm" />
          </div>
        </main>
      </div>
    )
  }

  if (error || !user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4 font-sans">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-elevation text-center border border-slate-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-red-500" />
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-3">Acesso Restrito</h1>
          <p className="text-slate-600 mb-8 leading-relaxed">
            {error || 'Acesso negado. Utilize o link seguro enviado para seu email.'}
          </p>
          {!user && (
            <div className="mt-4 p-5 bg-slate-50 rounded-xl border border-slate-200 text-sm text-slate-600 text-left">
              <p className="mb-3 font-semibold text-slate-800 flex items-center">
                <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
                Modo de Demonstração
              </p>
              <p className="mb-4">
                Para testar a experiência, você pode simular o acesso com um link seguro.
              </p>
              <Button
                variant="default"
                className="w-full bg-primary hover:bg-primary/90 shadow-sm"
                onClick={() => (window.location.href = '/?token=demo')}
              >
                Simular Acesso Seguro
              </Button>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-primary/20 bg-slate-50/50">
      <header className="w-full bg-white border-b border-slate-200 sticky top-0 z-20 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="font-bold text-primary text-xl tracking-tight flex items-center">
            Adapta Elite
            <span className="ml-3 px-2 py-0.5 bg-slate-100 text-slate-500 rounded text-[10px] font-medium tracking-wider uppercase border border-slate-200 hidden sm:inline-block">
              {user.clientId}
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-4">
            <span className="text-sm font-medium text-slate-500">
              Passo {currentStep} de {totalSteps}
            </span>
            <Progress value={progress} className="w-32 h-2 bg-slate-100" />
            <div className="w-px h-6 bg-slate-200 ml-2"></div>
            <Button
              variant="ghost"
              size="sm"
              onClick={logout}
              className="text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </div>

          <div className="sm:hidden flex items-center gap-3">
            <div className="text-sm font-medium text-slate-500">
              {currentStep} / {totalSteps}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={logout}
              className="h-8 w-8 text-slate-500 hover:text-red-600 hover:bg-red-50"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <Progress value={progress} className="w-full h-1 sm:hidden rounded-none bg-slate-100" />
      </header>

      <main className="flex-1 flex flex-col items-center py-8 sm:py-16 px-4 sm:px-6">
        <div className="w-full max-w-[600px] flex-1 flex flex-col justify-center">
          <Outlet
            context={{ currentStep, setCurrentStep, totalSteps, user } satisfies LayoutContextType}
          />
        </div>
      </main>

      <footer className="w-full py-8 text-center text-sm text-slate-400 mt-auto">
        <div className="space-x-6 mb-2">
          <a href="#" className="hover:text-slate-600 transition-colors">
            Privacidade
          </a>
          <a href="#" className="hover:text-slate-600 transition-colors">
            Termos de Uso
          </a>
          <a href="#" className="hover:text-slate-600 transition-colors">
            Contato
          </a>
        </div>
        <p>&copy; {new Date().getFullYear()} Adapta Elite. Todos os direitos reservados.</p>
      </footer>
    </div>
  )
}
