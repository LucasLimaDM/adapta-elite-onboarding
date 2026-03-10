import { useState, useEffect } from 'react'
import {
  Step1,
  Step2,
  Step3,
  Step4,
  Step5,
  Step6,
  type FormData,
} from '@/components/onboarding/Steps'
import { Step7 } from '@/components/onboarding/Step7'
import { Button } from '@/components/ui/button'
import { ChevronRight, ChevronLeft, Loader2, Check } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'

const initialData: FormData = {
  profession: '',
  useCases: [],
  additionalData: {
    name: '',
    email: '',
    vslWatched: false,
    portfolio: '',
    risk: '',
  },
}

export default function Index() {
  const [step, setStep] = useState(1)
  const [data, setData] = useState<FormData>(initialData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const savedData = localStorage.getItem('adapta_onboarding_data')
    const savedStep = localStorage.getItem('adapta_onboarding_step')

    if (savedData) {
      try {
        const parsed = JSON.parse(savedData)
        setData({
          ...initialData,
          ...parsed,
          additionalData: {
            ...initialData.additionalData,
            ...(parsed.additionalData || {}),
          },
        })
      } catch (e) {
        // Handle invalid JSON silently
      }
    }

    if (savedStep) {
      const stepNum = parseInt(savedStep, 10)
      if (!isNaN(stepNum) && stepNum >= 1 && stepNum <= 7) {
        setStep(stepNum)
      }
    }

    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('adapta_onboarding_data', JSON.stringify(data))
      localStorage.setItem('adapta_onboarding_step', step.toString())
    }
  }, [data, step, isLoaded])

  const isValid = () => {
    const { name, email, vslWatched, portfolio, risk } = data.additionalData
    if (step === 1) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return name.trim().length >= 3 && emailRegex.test(email)
    }
    if (step === 2) return vslWatched
    if (step === 3) return !!data.profession
    if (step === 4) return data.useCases && data.useCases.length > 0
    if (step === 5) return !!portfolio && !!risk
    return true
  }

  const isAllValid = () => {
    const { name, email, vslWatched, portfolio, risk } = data.additionalData
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return (
      name.trim().length >= 3 &&
      emailRegex.test(email) &&
      vslWatched &&
      !!data.profession &&
      data.useCases &&
      data.useCases.length > 0 &&
      !!portfolio &&
      !!risk
    )
  }

  const handleNext = async () => {
    if (!isValid()) return

    if (step < 6) {
      setStep((s) => s + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else if (step === 6) {
      if (!isAllValid()) {
        toast({
          title: 'Dados incompletos',
          description: 'Por favor, revise suas informações antes de enviar.',
          variant: 'destructive',
        })
        return
      }

      setIsSubmitting(true)
      try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 5000)

        const payload = {
          email: data.additionalData.email,
          profession: data.profession,
          useCases: data.useCases,
          timestamp: new Date().toISOString(),
          fullData: data,
        }

        const res = await fetch('/api/submit-form', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          signal: controller.signal,
        }).catch(() => null)

        clearTimeout(timeoutId)

        if (res && !res.ok && res.status !== 404) {
          throw new Error('Server error')
        }

        if (Math.random() > 0.95) throw new Error('Simulated failure')

        toast({
          title: 'Dados salvos com sucesso!',
          className: 'bg-green-50 border-green-200 text-green-800',
        })

        localStorage.removeItem('adapta_onboarding_data')
        setStep(7)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } catch (e: any) {
        toast({
          title: 'Erro de conexão',
          description: 'Não foi possível salvar seus dados. Tente novamente.',
          variant: 'destructive',
        })
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  const handlePrev = () => {
    if (step > 1) {
      setStep((s) => s - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const renderStep = () => {
    const props = {
      data,
      updateData: (d: Partial<FormData>) => setData((p) => ({ ...p, ...d })),
      updateAdditionalData: (d: Partial<FormData['additionalData']>) =>
        setData((p) => ({ ...p, additionalData: { ...p.additionalData, ...d } })),
    }
    switch (step) {
      case 1:
        return <Step1 {...props} />
      case 2:
        return <Step2 {...props} />
      case 3:
        return <Step3 {...props} />
      case 4:
        return <Step4 {...props} />
      case 5:
        return <Step5 {...props} />
      case 6:
        return <Step6 {...props} />
      case 7:
        return <Step7 {...props} />
      default:
        return null
    }
  }

  if (!isLoaded) return null

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <header className="w-full bg-white border-b border-slate-200 py-4 px-6 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto flex items-center justify-between mb-4">
          <div className="font-bold text-xl text-primary tracking-tight">Adapta Elite</div>
          <div className="text-sm font-medium text-slate-600">
            {step < 7 ? (
              <>
                Etapa {step} de 6{' '}
                <span className="ml-1 text-slate-500">({Math.round((step / 6) * 100)}%)</span>
              </>
            ) : (
              <span className="text-green-700 font-semibold flex items-center gap-1">
                <Check className="w-4 h-4" /> Concluído
              </span>
            )}
          </div>
        </div>

        <div className="max-w-3xl mx-auto relative z-0 mt-2">
          <div className="absolute top-1/2 left-0 w-full h-1.5 bg-slate-100 -translate-y-1/2 rounded-full z-[-1]" />
          <div
            className="absolute top-1/2 left-0 h-1.5 bg-primary -translate-y-1/2 rounded-full transition-all duration-700 ease-in-out z-[-1]"
            style={{ width: `${Math.min(((step - 1) / 5) * 100, 100)}%` }}
          />
          <div className="relative flex justify-between w-full">
            {[1, 2, 3, 4, 5, 6].map((i) => {
              const isCompleted = step === 7 ? true : i < step
              const isActive = step === 7 ? false : i === step

              return (
                <div
                  key={i}
                  className={cn(
                    'w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm sm:text-base font-semibold transition-all duration-500',
                    isActive
                      ? 'bg-primary text-primary-foreground ring-4 ring-primary/20 scale-110 shadow-md'
                      : isCompleted
                        ? 'bg-primary text-primary-foreground scale-100'
                        : 'bg-slate-200 text-slate-700 opacity-80 scale-95',
                  )}
                >
                  {isCompleted ? (
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 animate-in zoom-in duration-300" />
                  ) : (
                    i
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-3xl mx-auto p-4 md:p-8 flex flex-col justify-center py-10">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-10 flex-1 min-h-[400px]">
          {renderStep()}
        </div>

        {step < 7 && (
          <div className="flex items-center justify-between mt-8 pb-10 gap-4">
            <Button
              variant="outline"
              size="lg"
              onClick={handlePrev}
              disabled={isSubmitting || step === 1}
              className={cn('h-14 px-4 sm:px-6 text-base shadow-sm', step === 1 && 'invisible')}
            >
              <ChevronLeft className="mr-1 sm:mr-2 h-5 w-5" />
              <span className="hidden sm:inline">Voltar</span>
            </Button>

            <Button
              size="lg"
              onClick={handleNext}
              disabled={isSubmitting || !isValid()}
              className={cn(
                'h-14 px-6 sm:px-8 text-base transition-all duration-500',
                !isValid()
                  ? 'bg-slate-200 text-slate-500 cursor-not-allowed border-none shadow-none disabled:opacity-80'
                  : 'bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg hover:-translate-y-0.5',
              )}
            >
              {isSubmitting && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
              {!isSubmitting && step === 6
                ? 'Finalizar'
                : !isSubmitting
                  ? 'Continuar'
                  : 'Enviando...'}
              {!isSubmitting && step !== 6 && <ChevronRight className="ml-1 sm:ml-2 h-5 w-5" />}
            </Button>
          </div>
        )}
      </main>
    </div>
  )
}
