import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import useAuthStore from '@/stores/useAuthStore'
import { getSubmissions } from '@/lib/api'
import { Loader2, LayoutDashboard, LogOut, ShieldAlert } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Dashboard() {
  const { user, isLoading: isAuthLoading, logout } = useAuthStore()
  const [data, setData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!user) return

    const fetchSubmissions = async () => {
      setIsLoading(true)
      try {
        const result = await getSubmissions(user.email)
        setData(result || [])
      } catch (error) {
        setData([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchSubmissions()
  }, [user])

  if (isAuthLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen p-8 flex flex-col items-center justify-center space-y-4 animate-in fade-in duration-500">
        <div className="w-16 h-16 bg-[#111111] text-muted-foreground border border-[#333333] rounded-full flex items-center justify-center mb-2 shadow-elevation">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-display font-bold">Acesso Restrito</h1>
        <p className="text-muted-foreground max-w-md text-center">
          Esta área é restrita para administradores. Acesse utilizando o link seguro enviado para o
          seu email.
        </p>
      </div>
    )
  }

  const isAuthorized = user.email.endsWith('@adapta.org')

  return (
    <div className="min-h-screen p-4 md:p-8 animate-in fade-in duration-500 max-w-6xl mx-auto space-y-8 pt-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#111111]/50 p-6 rounded-2xl border border-[#333333] shadow-elevation">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-primary/10 text-primary border border-primary/20 rounded-[8px] flex items-center justify-center">
            <LayoutDashboard className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-display font-bold">Dashboard Admin</h1>
            <p className="text-muted-foreground text-sm">
              Gerenciamento de submissões de clientes.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="text-sm text-muted-foreground flex-1 sm:flex-none text-right sm:text-left">
            Logado como: <span className="text-foreground font-medium">{user.email}</span>
          </div>
          <Button variant="outline" onClick={logout} size="icon" title="Sair" className="shrink-0">
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <Card className="bg-[#111111]/80 border-[#333333] shadow-elevation overflow-hidden">
        <CardHeader className="border-b border-[#333333] bg-[#0C0C0D]/50">
          <CardTitle>Submissões Recentes</CardTitle>
          <CardDescription>
            Resultados do pré-onboarding de clientes de alto padrão.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center p-16 space-y-4">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">Carregando dados...</p>
            </div>
          ) : !isAuthorized || data.length === 0 ? (
            <div className="text-center p-16 space-y-3">
              <p className="text-muted-foreground text-lg">Nenhum dado disponível para exibição.</p>
              {!isAuthorized && (
                <p className="text-sm text-destructive bg-destructive/10 inline-block px-3 py-1 rounded-full border border-destructive/20">
                  Acesso negado: Domínio de email não autorizado.
                </p>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-[#0C0C0D]/80">
                  <TableRow className="border-[#333333] hover:bg-transparent">
                    <TableHead className="w-[200px]">Nome</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Profissão</TableHead>
                    <TableHead>Portfólio</TableHead>
                    <TableHead>Risco</TableHead>
                    <TableHead className="text-center">VSL</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.map((item, index) => (
                    <TableRow
                      key={item.id || index}
                      className="border-[#333333] hover:bg-[#222222]/50 transition-colors"
                    >
                      <TableCell className="font-medium text-foreground">
                        {item.name || '-'}
                      </TableCell>
                      <TableCell className="text-muted-foreground">{item.email}</TableCell>
                      <TableCell>{item.profession || '-'}</TableCell>
                      <TableCell>{item.portfolio || '-'}</TableCell>
                      <TableCell>{item.risk || '-'}</TableCell>
                      <TableCell className="text-center">
                        <span
                          className={`inline-flex items-center justify-center px-2 py-1 rounded-full text-xs font-medium ${
                            item.vsl_watched
                              ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                              : 'bg-zinc-500/10 text-zinc-400 border border-zinc-500/20'
                          }`}
                        >
                          {item.vsl_watched ? 'Assistido' : 'Pendente'}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
