import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import { Calendar, CalendarDays, Loader2, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { StepProps } from './Steps'

export const Step7 = ({ data }: StepProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [meetingId, setMeetingId] = useState<string | null>(
    localStorage.getItem('adapta_meeting_id'),
  )
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [selectedTime, setSelectedTime] = useState<string>('')
  const [isLoadingCalendar, setIsLoadingCalendar] = useState(false)
  const [isScheduling, setIsScheduling] = useState(false)
  const { toast } = useToast()

  const handleOpenCalendar = async () => {
    setIsLoadingCalendar(true)
    try {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() > 0.8) reject(new Error('Calendar load error'))
          resolve(true)
        }, 800)
      })
      setIsModalOpen(true)
    } catch (e) {
      toast({
        title: 'Erro',
        description: 'Não foi possível abrir o calendário. Tente novamente.',
        variant: 'destructive',
      })
    } finally {
      setIsLoadingCalendar(false)
    }
  }

  const handleSchedule = async () => {
    if (!selectedDate || !selectedTime) return
    setIsScheduling(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      const newMeetingId = 'MTG-' + Math.random().toString(36).substring(2, 9).toUpperCase()
      localStorage.setItem('adapta_meeting_id', newMeetingId)
      setMeetingId(newMeetingId)
      setIsModalOpen(false)
      toast({
        title: 'Consulta agendada com sucesso!',
        className: 'bg-green-50 border-green-200 text-green-800',
      })
    } catch (e) {
      toast({
        title: 'Erro no agendamento',
        description: 'Não foi possível concluir o agendamento. Tente novamente.',
        variant: 'destructive',
      })
    } finally {
      setIsScheduling(false)
    }
  }

  if (meetingId) {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500 text-center py-8">
        <div className="mx-auto w-16 h-16 bg-green-100 text-green-700 rounded-full flex items-center justify-center mb-6 shadow-sm">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-semibold text-primary">Consulta Confirmada!</h2>
        <p className="text-slate-600 text-lg max-w-md mx-auto">
          Sua consultoria foi agendada com sucesso. Nossa equipe entrará em contato em breve.
        </p>
        <div className="mt-8 p-6 bg-slate-50 rounded-xl border border-slate-200 max-w-sm mx-auto shadow-inner">
          <div className="text-sm text-slate-600 mb-1 font-medium">ID da Reunião</div>
          <div className="text-xl font-mono font-bold text-slate-900">{meetingId}</div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500 text-center py-8">
      <div className="mx-auto w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6 shadow-sm">
        <Calendar className="w-8 h-8" />
      </div>
      <h2 className="text-2xl sm:text-3xl font-semibold text-primary">
        Tudo certo com seus dados!
      </h2>
      <p className="text-slate-600 text-lg max-w-md mx-auto">
        Agora, escolha o melhor horário para conversarmos sobre suas necessidades e objetivos.
      </p>

      <div className="pt-8 flex justify-center">
        <Button
          size="lg"
          className="h-14 px-8 text-lg w-full max-w-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
          onClick={handleOpenCalendar}
          disabled={isLoadingCalendar}
        >
          {isLoadingCalendar ? (
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          ) : (
            <CalendarDays className="mr-2 h-5 w-5" />
          )}
          Agendar Consultoria
        </Button>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px] p-6">
          <DialogHeader>
            <DialogTitle className="text-xl">Escolha um horário</DialogTitle>
            <DialogDescription className="text-base text-slate-600">
              Selecione a data e horário de sua preferência para a consultoria.
            </DialogDescription>
          </DialogHeader>
          <div className="py-6 space-y-6">
            <div className="space-y-3">
              <Label className="text-base font-medium text-slate-900">Data</Label>
              <div className="grid grid-cols-3 gap-2">
                {['Hoje', 'Amanhã', 'Depois'].map((d) => (
                  <Button
                    key={d}
                    variant={selectedDate === d ? 'default' : 'outline'}
                    className={cn(
                      'h-12 text-sm sm:text-base transition-all duration-300',
                      selectedDate === d && 'bg-primary ring-2 ring-primary/20 shadow-md',
                    )}
                    onClick={() => setSelectedDate(d)}
                  >
                    {d}
                  </Button>
                ))}
              </div>
            </div>
            {selectedDate && (
              <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
                <Label className="text-base font-medium text-slate-900">Horário</Label>
                <div className="grid grid-cols-3 gap-2">
                  {['09:00', '10:30', '14:00', '15:30', '17:00'].map((t) => (
                    <Button
                      key={t}
                      variant={selectedTime === t ? 'default' : 'outline'}
                      className={cn(
                        'h-12 text-sm sm:text-base transition-all duration-300',
                        selectedTime === t && 'bg-primary ring-2 ring-primary/20 shadow-md',
                      )}
                      onClick={() => setSelectedTime(t)}
                    >
                      {t}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
          <DialogFooter className="sm:justify-between gap-3">
            <Button variant="outline" className="h-11 flex-1" onClick={() => setIsModalOpen(false)}>
              Cancelar
            </Button>
            <Button
              className="h-11 flex-1 transition-all duration-300"
              disabled={!selectedDate || !selectedTime || isScheduling}
              onClick={handleSchedule}
            >
              {isScheduling && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isScheduling ? 'Confirmando...' : 'Confirmar'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
