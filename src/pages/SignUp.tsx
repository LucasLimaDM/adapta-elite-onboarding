import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import useAuthStore from '@/stores/useAuthStore'
import { useToast } from '@/hooks/use-toast'
import { Loader2, MailCheck } from 'lucide-react'

export default function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [pendingConfirmation, setPendingConfirmation] = useState(false)
  const { signup } = useAuthStore()
  const navigate = useNavigate()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email.endsWith('@adapta.org')) {
      toast({
        title: 'Email não autorizado',
        description: 'Apenas emails @adapta.org podem se cadastrar.',
        variant: 'destructive',
      })
      return
    }

    if (password !== confirmPassword) {
      toast({
        title: 'Senhas não coincidem',
        description: 'Por favor, verifique se as senhas são iguais.',
        variant: 'destructive',
      })
      return
    }

    if (password.length < 6) {
      toast({
        title: 'Senha muito curta',
        description: 'A senha deve ter pelo menos 6 caracteres.',
        variant: 'destructive',
      })
      return
    }

    setIsSubmitting(true)
    try {
      await signup(email, password)
      navigate('/', { replace: true })
    } catch (err: any) {
      if (err.code === 'CONFIRM_EMAIL') {
        setPendingConfirmation(true)
      } else {
        toast({
          title: 'Erro no cadastro',
          description: err.message || 'Não foi possível criar a conta.',
          variant: 'destructive',
        })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  if (pendingConfirmation) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6 bg-[#111111]/80 p-8 rounded-2xl border border-[#333333] shadow-elevation animate-in fade-in duration-500 text-center">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-primary/10 border border-primary/20 rounded-full flex items-center justify-center">
              <MailCheck className="w-8 h-8 text-primary" />
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold font-display tracking-tight">Confirme seu email</h1>
            <p className="text-muted-foreground">
              Enviamos um link de confirmação para{' '}
              <span className="text-foreground font-medium">{email}</span>.
              <br />
              Clique no link para ativar sua conta.
            </p>
          </div>
          <p className="text-sm text-muted-foreground">
            Não recebeu?{' '}
            <button
              className="text-primary hover:underline font-medium"
              onClick={() => setPendingConfirmation(false)}
            >
              Tentar novamente
            </button>
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 bg-[#111111]/80 p-8 rounded-2xl border border-[#333333] shadow-elevation animate-in fade-in duration-500">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold font-display tracking-tight">Criar Conta</h1>
          <p className="text-muted-foreground">Preencha os dados abaixo para se cadastrar</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="nome@adapta.org"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar Senha</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <Button type="submit" className="w-full h-12 text-base" disabled={isSubmitting}>
            {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
            Criar Conta
          </Button>
        </form>

        <div className="text-center text-sm text-muted-foreground">
          Já possui uma conta?{' '}
          <Link to="/login" className="text-primary hover:underline font-medium">
            Fazer login
          </Link>
        </div>
      </div>
    </div>
  )
}
