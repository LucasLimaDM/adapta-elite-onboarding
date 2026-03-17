import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import useAuthStore from '@/stores/useAuthStore'
import { useToast } from '@/hooks/use-toast'
import { Loader2, ArrowLeft } from 'lucide-react'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const { resetPassword } = useAuthStore()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await resetPassword(email)
      setIsSuccess(true)
      toast({
        title: 'E-mail enviado',
        description:
          'Se houver uma conta associada a este e-mail, você receberá um link para redefinir sua senha em breve.',
      })
    } catch (err: any) {
      toast({
        title: 'Erro',
        description: err.message || 'Ocorreu um erro ao tentar enviar o e-mail de recuperação.',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 bg-[#111111]/80 p-8 rounded-2xl border border-[#333333] shadow-elevation animate-in fade-in duration-500">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold font-display tracking-tight">Recuperar Senha</h1>
          <p className="text-muted-foreground">
            Digite seu e-mail para receber um link de redefinição
          </p>
        </div>

        {isSuccess ? (
          <div className="space-y-6">
            <div className="p-4 bg-primary/10 border border-primary/20 rounded-[8px] text-primary text-center">
              E-mail de recuperação enviado com sucesso! Verifique sua caixa de entrada.
            </div>
            <Button asChild className="w-full h-12 text-base" variant="outline">
              <Link to="/login">Voltar ao login</Link>
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="nome@exemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full h-12 text-base" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
              Enviar link de redefinição
            </Button>

            <div className="text-center">
              <Link
                to="/login"
                className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar ao login
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
