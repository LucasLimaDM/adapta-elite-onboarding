import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { Progress } from '@/components/ui/progress'
import { Skeleton } from '@/components/ui/skeleton'

export type LayoutContextType = {
  currentStep: number
  setCurrentStep: (step: number) => void
  totalSteps: number
}

export default function Layout() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const totalSteps = 6
  const progress = (currentStep / totalSteps) * 100

  // Simulate initial loading state for premium feel
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col font-sans">
        <header className="w-full bg-white border-b border-slate-200">
          <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-2 w-32 hidden sm:block" />
          </div>
        </header>
        <main className="flex-1 flex flex-col items-center py-8 sm:py-16 px-4">
          <div className="w-full max-w-[600px]">
            <Skeleton className="h-[400px] w-full rounded-2xl shadow-sm" />
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-primary/20">
      <header className="w-full bg-white border-b border-slate-200 sticky top-0 z-20 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="font-bold text-primary text-xl tracking-tight">Adapta Elite</div>
          <div className="hidden sm:flex items-center gap-4">
            <span className="text-sm font-medium text-slate-500">
              Passo {currentStep} de {totalSteps}
            </span>
            <Progress value={progress} className="w-32 h-2 bg-slate-100" />
          </div>
          <div className="sm:hidden text-sm font-medium text-slate-500">
            {currentStep} / {totalSteps}
          </div>
        </div>
        <Progress value={progress} className="w-full h-1 sm:hidden rounded-none bg-slate-100" />
      </header>

      <main className="flex-1 flex flex-col items-center py-8 sm:py-16 px-4 sm:px-6">
        <div className="w-full max-w-[600px] flex-1 flex flex-col justify-center">
          <Outlet
            context={{ currentStep, setCurrentStep, totalSteps } satisfies LayoutContextType}
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
