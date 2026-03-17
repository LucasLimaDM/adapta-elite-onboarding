import { useState, useEffect } from 'react'
import { Step1, Step2, Step3, Step4, Step5, Step6, FormData } from '@/components/onboarding/Steps'
import { Step7 } from '@/components/onboarding/Step7'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { useToast } from '@/hooks/use-toast'
import { ArrowLeft, ArrowRight, Check, Loader2 } from 'lucide-react'
import { upsertSubmission } from '@/lib/api'
import useAuthStore from '@/stores/useAuthStore'

const INITIAL_DATA: FormData = {
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
  const { user } = useAuthStore()
  const [step, setStep] = useState(1)
  const [data, setData] = useState<FormData>({
    ...INITIAL_DATA,
    additionalData: { ...INITIAL_DATA.additionalData, email: user?.email || '' },
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  // Load existing data from local storage to handle re-entry smoothly
  useEffect(() => {
    const savedData = localStorage.getItem('adapta_onboarding_data')
    const savedStep = localStorage.getItem('adapta_onboarding_step')
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData)
        if (user?.email && (!parsed.additionalData.email || parsed.additionalData.email === '')) {
          parsed.additionalData.email = user.email
        }
        setData(parsed)
      } catch (e) {
        // ignore parsing errors
      }
    }
    if (savedStep) {
      const parsedStep = parseInt(savedStep, 10)
      if (parsedStep > 1 && parsedStep <= 7) {
        setStep(parsedStep)
      }
    }
  }, [user])

  // Persist session locally to avoid losing state on accidental refresh
  useEffect(() => {
    localStorage.setItem('adapta_onboarding_data', JSON.stringify(data))
    localStorage.setItem('adapta_onboarding_step', step.toString())
  }, [data, step])

  const updateData = (newData: Partial<FormData>) => {
    setData((prev) => ({ ...prev, ...newData }))
  }

  const updateAdditionalData = (newData: Partial<FormData['additionalData']>) => {
    setData((prev) => ({
      ...prev,
      additionalData: { ...prev.additionalData, ...newData },
    }))
  }

  const handleNext = async () => {
    if (step < 6) {
      // Silent upsert logic for intermediate steps
      if (data.additionalData.email) {
        upsertSubmission(data, false).catch(() => {
          // Silently ignore errors as per acceptance criteria
        })
      }
      setStep((s) => s + 1)
    } else if (step === 6) {
      // Robust upsert for final step
      setIsSubmitting(true)
      try {
        await upsertSubmission(data, true)
        setStep(7)
      } catch (error) {
        toast({
          title: 'Erro na submissão',
          description:
            'Não foi possível salvar seus dados. Verifique sua conexão e tente novamente.',
          variant: 'destructive',
        })
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  const handleBack = () => {
    setStep((s) => Math.max(1, s - 1))
  }

  const canProceed = () => {
    switch (step) {
      case 1: {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return (
          data.additionalData.name.trim().length >= 3 && emailRegex.test(data.additionalData.email)
        )
      }
      case 2:
        return data.additionalData.vslWatched
      case 3:
        return data.profession.length > 0
      case 4:
        return data.useCases.length > 0
      case 5:
        return data.additionalData.portfolio.length > 0 && data.additionalData.risk.length > 0
      default:
        return true
    }
  }

  if (step === 7) {
    return (
      <div className="w-full max-w-3xl mx-auto animate-in fade-in duration-500 pt-12">
        <Step7 data={data} updateData={updateData} updateAdditionalData={updateAdditionalData} />
      </div>
    )
  }

  return (
    <div className="w-full max-w-3xl mx-auto space-y-8 animate-in fade-in duration-500 pt-12 p-4 sm:p-6 lg:p-8">
      <div className="space-y-3 bg-[#111111]/50 p-5 sm:p-6 rounded-2xl border border-[#333333] shadow-elevation">
        <div className="flex justify-between text-sm font-medium">
          <span className="text-muted-foreground font-display tracking-wide">
            Etapa {step} de 6
          </span>
          <span className="text-primary">{Math.round((step / 6) * 100)}%</span>
        </div>
        <Progress value={(step / 6) * 100} className="h-2 bg-[#222222]" />
      </div>

      <div className="min-h-[400px]">
        {step === 1 && (
          <Step1 data={data} updateData={updateData} updateAdditionalData={updateAdditionalData} />
        )}
        {step === 2 && (
          <Step2 data={data} updateData={updateData} updateAdditionalData={updateAdditionalData} />
        )}
        {step === 3 && (
          <Step3 data={data} updateData={updateData} updateAdditionalData={updateAdditionalData} />
        )}
        {step === 4 && (
          <Step4 data={data} updateData={updateData} updateAdditionalData={updateAdditionalData} />
        )}
        {step === 5 && (
          <Step5 data={data} updateData={updateData} updateAdditionalData={updateAdditionalData} />
        )}
        {step === 6 && (
          <Step6 data={data} updateData={updateData} updateAdditionalData={updateAdditionalData} />
        )}
      </div>

      <div className="flex items-center justify-between pt-8 border-t border-[#333333]">
        <Button
          variant="outline"
          size="lg"
          onClick={handleBack}
          disabled={step === 1 || isSubmitting}
          className="w-[120px] sm:w-[130px] h-12 text-sm sm:text-base"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
          Voltar
        </Button>

        <Button
          size="lg"
          onClick={handleNext}
          disabled={!canProceed() || isSubmitting}
          className="w-[140px] sm:w-[160px] h-12 text-sm sm:text-base flex items-center justify-center"
        >
          {isSubmitting ? (
            <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 mr-2 animate-spin" />
          ) : step === 6 ? (
            <Check className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
          ) : null}
          {step === 6 ? 'Finalizar' : 'Continuar'}
          {step < 6 && !isSubmitting && <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />}
        </Button>
      </div>
    </div>
  )
}
