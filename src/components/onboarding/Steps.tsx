import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { VslVideo } from './VslVideo'
import { CheckCircle2 } from 'lucide-react'
import { RadioCards, CheckboxCards } from './Cards'
import { cn } from '@/lib/utils'

export type FormData = {
  profession: string
  useCases: string[]
  additionalData: {
    name: string
    email: string
    vslWatched: boolean
    portfolio: string
    risk: string
  }
}

export type StepProps = {
  data: FormData
  updateData: (d: Partial<FormData>) => void
  updateAdditionalData: (d: Partial<FormData['additionalData']>) => void
}

export const Step1 = ({ data, updateAdditionalData }: StepProps) => {
  const { name, email } = data.additionalData
  const nameError = name.length > 0 && name.trim().length < 3
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const emailError = email.length > 0 && !emailRegex.test(email)

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="space-y-2">
        <h2 className="text-2xl sm:text-3xl font-semibold text-primary">Seus Dados</h2>
        <p className="text-slate-600 text-lg">Para um atendimento exclusivo e personalizado.</p>
      </div>
      <div className="space-y-4 pt-2">
        <div className="space-y-2">
          <Label className="text-slate-900 font-medium">
            Nome Completo <span className="text-red-600">*</span>
          </Label>
          <Input
            autoFocus
            className={cn(
              'h-14 text-lg bg-white rounded-xl transition-all duration-300',
              nameError
                ? 'border-red-500 focus-visible:ring-red-500'
                : name.trim().length >= 3
                  ? 'border-green-500 focus-visible:ring-green-500'
                  : '',
            )}
            placeholder="Ex: João Silva"
            value={name}
            onChange={(e) => updateAdditionalData({ name: e.target.value })}
          />
          {nameError && (
            <p className="text-red-600 text-sm animate-in fade-in slide-in-from-top-1">
              O nome deve ter pelo menos 3 caracteres.
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label className="text-slate-900 font-medium">
            Melhor E-mail <span className="text-red-600">*</span>
          </Label>
          <Input
            type="email"
            className={cn(
              'h-14 text-lg bg-white rounded-xl transition-all duration-300',
              emailError
                ? 'border-red-500 focus-visible:ring-red-500'
                : email.length > 0 && !emailError
                  ? 'border-green-500 focus-visible:ring-green-500'
                  : '',
            )}
            placeholder="nome@exemplo.com"
            value={email}
            onChange={(e) => updateAdditionalData({ email: e.target.value })}
          />
          {emailError && (
            <p className="text-red-600 text-sm animate-in fade-in slide-in-from-top-1">
              Insira um e-mail válido.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export const Step2 = ({ data, updateAdditionalData }: StepProps) => (
  <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
    <div className="space-y-2 text-center">
      <h2 className="text-2xl sm:text-3xl font-semibold text-primary">Mensagem Importante</h2>
      <p className="text-slate-600 text-lg">
        Assista ao vídeo abaixo para entender nossa metodologia.
      </p>
    </div>
    <div className="pt-4">
      <VslVideo
        isCompleted={data.additionalData.vslWatched}
        onComplete={() => updateAdditionalData({ vslWatched: true })}
      />
    </div>
    {data.additionalData.vslWatched && (
      <div className="max-w-[600px] mx-auto mt-4 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center justify-center gap-2 text-green-800 animate-in fade-in slide-in-from-bottom-2 duration-500">
        <CheckCircle2 className="h-5 w-5" />
        <span className="font-medium">Vídeo concluído! Você já pode continuar.</span>
      </div>
    )}
  </div>
)

const PROFESSIONS = [
  'Médico',
  'Advogado',
  'Empresário',
  'Gestor',
  'Contador',
  'Engenheiro',
  'Desenvolvedor',
]

export const Step3 = ({ data, updateData }: StepProps) => (
  <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
    <h2 className="text-2xl sm:text-3xl font-semibold text-primary">Sua Área de Atuação</h2>
    <p className="text-slate-600 text-lg">
      Selecione sua profissão para personalizarmos sua experiência.
    </p>
    <RadioCards
      value={data.profession}
      onChange={(v) => updateData({ profession: v, useCases: [] })}
      options={PROFESSIONS}
      columns={2}
    />
  </div>
)

const USE_CASES_MAP: Record<string, string[]> = {
  Médico: [
    'Gestão de Clínicas',
    'Otimização de Impostos',
    'Proteção Patrimonial',
    'Investimentos Seguros',
  ],
  Advogado: [
    'Gestão de Honorários',
    'Planejamento Sucessório',
    'Holding Familiar',
    'Diversificação',
  ],
  Empresário: [
    'Expansão de Negócios',
    'Sucessão Empresarial',
    'Gestão de Caixa',
    'Holding Estruturada',
  ],
  Gestor: [
    'Alocação de Ativos',
    'Previdência Privada',
    'Diversificação Internacional',
    'Proteção contra Inflação',
  ],
  Contador: [
    'Estruturação Tributária',
    'Planejamento Financeiro',
    'Parcerias Estratégicas',
    'Gestão de Patrimônio',
  ],
  Engenheiro: [
    'Investimentos Imobiliários',
    'Gestão de Projetos Pessoais',
    'Proteção de Ativos',
    'Aposentadoria Antecipada',
  ],
  Desenvolvedor: [
    'Recebimentos Internacionais',
    'Startups & Equity',
    'Criptoativos',
    'Independência Financeira',
  ],
}

export const Step4 = ({ data, updateData }: StepProps) => {
  const options = USE_CASES_MAP[data.profession] || []
  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
      <h2 className="text-2xl sm:text-3xl font-semibold text-primary">Interesses e Casos de Uso</h2>
      <p className="text-slate-600 text-lg">
        Como {data.profession}, o que mais faz sentido para você hoje?
      </p>
      {options.length > 0 ? (
        <CheckboxCards
          values={data.useCases}
          onChange={(v) => updateData({ useCases: v })}
          options={options}
        />
      ) : (
        <div className="p-4 bg-amber-50 text-amber-800 rounded-xl">
          Por favor, volte e selecione uma profissão primeiro.
        </div>
      )}
    </div>
  )
}

export const Step5 = ({ data, updateAdditionalData }: StepProps) => (
  <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
    <div className="space-y-4">
      <h2 className="text-2xl sm:text-3xl font-semibold text-primary">Seu Perfil Financeiro</h2>
      <p className="text-slate-600 text-lg">Para entendermos seu momento atual.</p>
    </div>
    <div className="space-y-4">
      <h3 className="text-xl font-medium text-slate-900">1. Volume de Portfólio</h3>
      <RadioCards
        value={data.additionalData.portfolio}
        onChange={(v) => updateAdditionalData({ portfolio: v })}
        options={['R$ 1M - R$ 5M', 'R$ 5M - R$ 15M', 'R$ 15M - R$ 50M', 'Acima de R$ 50M']}
        columns={2}
      />
    </div>
    {data.additionalData.portfolio && (
      <div className="space-y-4 pt-6 border-t border-slate-200 animate-in fade-in slide-in-from-top-4 duration-500">
        <h3 className="text-xl font-medium text-slate-900">2. Perfil de Risco</h3>
        <RadioCards
          value={data.additionalData.risk}
          onChange={(v) => updateAdditionalData({ risk: v })}
          options={['Conservador', 'Moderado', 'Arrojado', 'Agressivo']}
          columns={2}
        />
      </div>
    )}
  </div>
)

export const Step6 = ({ data }: StepProps) => (
  <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
    <h2 className="text-2xl sm:text-3xl font-semibold text-primary">Revisão Final</h2>
    <p className="text-slate-600 text-lg">Confirme seus dados antes de enviar sua solicitação.</p>
    <div className="space-y-3 bg-slate-50 p-6 rounded-xl border border-slate-200 text-sm sm:text-base shadow-inner">
      {Object.entries({
        Nome: data.additionalData.name,
        'E-mail': data.additionalData.email,
        Profissão: data.profession,
        Interesses: data.useCases.join(', '),
        Portfólio: data.additionalData.portfolio,
        Risco: data.additionalData.risk,
      }).map(([k, v]) => (
        <div
          key={k}
          className="flex flex-col sm:flex-row sm:justify-between border-b border-slate-200 last:border-0 pb-3 pt-1 last:pb-0 gap-1"
        >
          <span className="text-slate-600">{k}</span>
          <span className="font-medium text-slate-900 sm:text-right sm:w-2/3">{v || '-'}</span>
        </div>
      ))}
    </div>
  </div>
)
