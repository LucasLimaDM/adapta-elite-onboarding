import { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { LayoutContextType } from '@/components/Layout'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import {
  Step1,
  Step2,
  Step3,
  Step4,
  Step5,
  Step6,
  type FormData,
} from '@/components/onboarding/Steps'

export default function Index() {
  const { currentStep, setCurrentStep, totalSteps, user } = useOutletContext<LayoutContextType>()
  const { toast } = useToast()

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: user?.email || '',
    objective: '',
    portfolio: '',
    risk: '',
  })

  const updateData = (newData: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...newData }))
  }

  const validateStep = () => {
    if (currentStep === 1 && !formData.name.trim()) {
      toast({
        title: 'Atenção',
        description: 'Por favor, preencha seu nome.',
        variant: 'destructive',
      })
      return false
    }
    if (currentStep === 2 && (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email))) {
      toast({ title: 'Atenção', description: 'Insira um e-mail válido.', variant: 'destructive' })
      return false
    }
    if (currentStep === 3 && !formData.objective) {
      toast({ title: 'Atenção', description: 'Selecione um objetivo.', variant: 'destructive' })
      return false
    }
    if (currentStep === 4 && !formData.portfolio) {
      toast({
        title: 'Atenção',
        description: 'Selecione o volume do portfólio.',
        variant: 'destructive',
      })
      return false
    }
    if (currentStep === 5 && !formData.risk) {
      toast({
        title: 'Atenção',
        description: 'Selecione seu perfil de risco.',
        variant: 'destructive',
      })
      return false
    }
    return true
  }

  const handleNext = () => {
    if (!validateStep()) return

    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    } else {
      toast({
        title: 'Solicitação Enviada!',
        description: 'Um de nossos consultores entrará em contato em breve.',
      })
      // Reset after submission for demo purposes
      setTimeout(() => {
        setFormData({ name: '', email: user?.email || '', objective: '', portfolio: '', risk: '' })
        setCurrentStep(1)
      }, 3000)
    }
  }

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const renderStep = () => {
    const props = { data: formData, updateData }
    switch (currentStep) {
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
      default:
        return <Step1 {...props} />
    }
  }

  return (
    <div className="w-full relative">
      <Card className="border border-slate-200 shadow-elevation overflow-hidden bg-white/95 backdrop-blur-sm rounded-2xl">
        <div key={currentStep} className="animate-fade-in-up">
          <CardContent className="p-6 sm:p-10 min-h-[360px] flex flex-col justify-center">
            {renderStep()}
          </CardContent>
        </div>

        <CardFooter className="px-6 py-5 sm:px-10 bg-slate-50/80 border-t border-slate-100 flex gap-4 justify-between items-center">
          <Button
            variant="ghost"
            size="lg"
            onClick={handlePrev}
            disabled={currentStep === 1}
            className="h-12 px-2 sm:px-6 rounded-xl text-slate-500 hover:bg-slate-200/50 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Anterior</span>
            <span className="sm:hidden">Voltar</span>
          </Button>

          <Button
            size="lg"
            onClick={handleNext}
            className="h-14 px-8 rounded-xl w-full sm:w-auto shadow-md hover:shadow-lg transition-all text-base bg-primary hover:bg-primary/90"
          >
            {currentStep === totalSteps ? (
              <>
                Finalizar <CheckCircle2 className="ml-2 h-5 w-5" />
              </>
            ) : (
              <>
                Próximo <ArrowRight className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
