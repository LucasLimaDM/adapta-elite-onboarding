import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { VslVideo } from './VslVideo'
import { CheckCircle2 } from 'lucide-react'
import { RadioCards, CheckboxCards } from './Cards'
import { cn } from '@/lib/utils'
import { NICHES, USE_CASES_MAP, EMPLOYEE_COUNT_OPTIONS, ROLE_OPTIONS } from './config'

export type FormData = {
  additionalData: {
    name: string
    email: string
    vslWatched: boolean
    companyName: string
    employeeCount: string
    role: string
    usesAI: boolean | null
    aiTools: string
    aiUsage: string
    mainObjective: string
    additionalInfo: string
  }
  niche: string
  useCases: string[]
  otherUseCase: string
}

export type StepProps = {
  data: FormData
  updateData: (d: Partial<FormData>) => void
  updateAdditionalData: (d: Partial<FormData['additionalData']>) => void
}

// Step 1 — Nome
export const Step1 = ({ data, updateAdditionalData }: StepProps) => {
  const { name } = data.additionalData
  const nameError = name.length > 0 && name.trim().length < 3

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="space-y-2">
        <h2 className="text-2xl sm:text-3xl font-bold font-display">Seus Dados</h2>
        <p className="text-muted-foreground text-lg">
          Para um atendimento exclusivo e personalizado.
        </p>
      </div>
      <div className="space-y-2">
        <Label className="text-foreground font-medium mb-1.5 block">
          Nome Completo <span className="text-red-500">*</span>
        </Label>
        <Input
          autoFocus
          className={cn(
            'h-14 text-lg bg-[#111111]/80 rounded-[8px] transition-all duration-300 hover:border-primary/50',
            nameError
              ? 'border-red-500/50 focus-visible:ring-red-500'
              : name.trim().length >= 3
                ? 'border-primary/50 focus-visible:ring-primary shadow-glow'
                : 'border-[#333333]',
          )}
          placeholder="Ex: João Silva"
          value={name}
          onChange={(e) => updateAdditionalData({ name: e.target.value })}
        />
        {nameError && (
          <p className="text-red-500 text-sm animate-in fade-in slide-in-from-top-1">
            O nome deve ter pelo menos 3 caracteres.
          </p>
        )}
      </div>
    </div>
  )
}

// Step 2 — VSL
export const Step2 = ({ data, updateAdditionalData }: StepProps) => (
  <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
    <div className="space-y-2 text-center">
      <h2 className="text-2xl sm:text-3xl font-bold font-display">Mensagem Importante</h2>
      <p className="text-muted-foreground text-lg">
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
      <div className="max-w-[600px] mx-auto mt-6 p-4 bg-primary/10 border border-primary/20 rounded-[8px] flex items-center justify-center gap-3 text-primary shadow-glow animate-in fade-in slide-in-from-bottom-2 duration-500">
        <CheckCircle2 className="h-5 w-5" />
        <span className="font-medium">Vídeo concluído! Você já pode continuar.</span>
      </div>
    )}
  </div>
)

// Step 3 — Empresa
export const Step3 = ({ data, updateAdditionalData }: StepProps) => {
  const { companyName, employeeCount, role } = data.additionalData
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="space-y-2">
        <h2 className="text-2xl sm:text-3xl font-bold font-display">Sua Empresa</h2>
        <p className="text-muted-foreground text-lg">Conte-nos um pouco sobre onde você atua.</p>
      </div>

      <div className="space-y-2">
        <Label className="text-foreground font-medium">
          Nome da empresa <span className="text-red-500">*</span>
        </Label>
        <Input
          className={cn(
            'h-14 text-lg bg-[#111111]/80 rounded-[8px] transition-all duration-300 hover:border-primary/50',
            companyName.trim().length > 0
              ? 'border-primary/50 focus-visible:ring-primary shadow-glow'
              : 'border-[#333333]',
          )}
          placeholder="Ex: Acme Ltda"
          value={companyName}
          onChange={(e) => updateAdditionalData({ companyName: e.target.value })}
        />
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-medium text-primary">Número de funcionários</h3>
        <RadioCards
          value={employeeCount}
          onChange={(v) => updateAdditionalData({ employeeCount: v })}
          options={EMPLOYEE_COUNT_OPTIONS}
          columns={3}
        />
      </div>

      {employeeCount && (
        <div className="space-y-3 animate-in fade-in slide-in-from-top-4 duration-500">
          <h3 className="text-lg font-medium text-primary">Seu cargo</h3>
          <RadioCards
            value={role}
            onChange={(v) => updateAdditionalData({ role: v })}
            options={ROLE_OPTIONS}
            columns={2}
          />
        </div>
      )}
    </div>
  )
}

// Step 4 — Nicho
export const Step4 = ({ data, updateData }: StepProps) => (
  <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
    <h2 className="text-2xl sm:text-3xl font-bold font-display">Seu Nicho</h2>
    <p className="text-muted-foreground text-lg">
      Selecione o segmento que melhor representa sua atuação.
    </p>
    <RadioCards
      value={data.niche}
      onChange={(v) => updateData({ niche: v, useCases: [], otherUseCase: '' })}
      options={NICHES}
      columns={2}
    />
  </div>
)

// Step 5 — Casos de uso
export const Step5 = ({ data, updateData }: StepProps) => {
  const options = USE_CASES_MAP[data.niche] || []
  const isOtherNiche = data.niche === 'Outros'

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="space-y-2">
        <h2 className="text-2xl sm:text-3xl font-bold font-display">Temas de Interesse</h2>
        {isOtherNiche ? (
          <p className="text-muted-foreground text-lg">
            Descreva as atividades que mais tomam tempo da sua semana hoje.
          </p>
        ) : (
          <p className="text-muted-foreground text-lg">
            Esses são os temas mais abordados por clientes de{' '}
            <span className="text-primary font-medium">{data.niche}</span> em consultoria.
            Selecione os que você mais gostaria de trabalhar.
          </p>
        )}
      </div>

      {!isOtherNiche && (
        <CheckboxCards
          values={data.useCases}
          onChange={(v) => updateData({ useCases: v })}
          options={options}
        />
      )}

      <div className="space-y-2">
        <Label className="text-foreground font-medium">
          {isOtherNiche ? 'Descreva suas atividades *' : 'Outros (opcional)'}
        </Label>
        <Textarea
          className="bg-[#111111]/80 border-[#333333] rounded-[8px] min-h-[100px] text-base focus-visible:ring-primary hover:border-primary/50 transition-all duration-300"
          placeholder={
            isOtherNiche
              ? 'Descreva as atividades que mais tomam seu tempo...'
              : 'Tem alguma ideia fora da lista? Descreva aqui...'
          }
          value={data.otherUseCase}
          onChange={(e) => updateData({ otherUseCase: e.target.value })}
        />
      </div>
    </div>
  )
}

// Step 6 — Uso de IA
export const Step6 = ({ data, updateAdditionalData }: StepProps) => {
  const { usesAI, aiTools, aiUsage } = data.additionalData

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="space-y-2">
        <h2 className="text-2xl sm:text-3xl font-bold font-display">Inteligência Artificial</h2>
        <p className="text-muted-foreground text-lg">
          Você ou sua empresa já utiliza, com frequência, alguma ferramenta de IA?
        </p>
      </div>

      <RadioCards
        value={usesAI === null ? '' : usesAI ? 'Sim' : 'Não'}
        onChange={(v) =>
          updateAdditionalData({ usesAI: v === 'Sim', aiTools: '', aiUsage: '' })
        }
        options={['Sim', 'Não']}
        columns={2}
      />

      {usesAI === true && (
        <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="space-y-2">
            <Label className="text-foreground font-medium">
              Quais ferramentas você usa? <span className="text-red-500">*</span>
            </Label>
            <Textarea
              className="bg-[#111111]/80 border-[#333333] rounded-[8px] min-h-[80px] text-base focus-visible:ring-primary hover:border-primary/50 transition-all duration-300"
              placeholder="Ex: ChatGPT, Copilot, Gemini..."
              value={aiTools}
              onChange={(e) => updateAdditionalData({ aiTools: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label className="text-foreground font-medium">
              Como você ou sua empresa usa IA no dia a dia? <span className="text-red-500">*</span>
            </Label>
            <Textarea
              className="bg-[#111111]/80 border-[#333333] rounded-[8px] min-h-[100px] text-base focus-visible:ring-primary hover:border-primary/50 transition-all duration-300"
              placeholder="Descreva como a IA está integrada no seu trabalho..."
              value={aiUsage}
              onChange={(e) => updateAdditionalData({ aiUsage: e.target.value })}
            />
          </div>
        </div>
      )}
    </div>
  )
}

// Step 7 — Objetivos
export const Step7Form = ({ data, updateAdditionalData }: StepProps) => {
  const { mainObjective, additionalInfo } = data.additionalData

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="space-y-2">
        <h2 className="text-2xl sm:text-3xl font-bold font-display">Seus Objetivos</h2>
        <p className="text-muted-foreground text-lg">
          Ajude-nos a preparar a melhor consultoria para você.
        </p>
      </div>

      <div className="space-y-2">
        <Label className="text-foreground font-medium">
          Qual seu principal objetivo com a Consultoria? <span className="text-red-500">*</span>
        </Label>
        <Textarea
          className="bg-[#111111]/80 border-[#333333] rounded-[8px] min-h-[120px] text-base focus-visible:ring-primary hover:border-primary/50 transition-all duration-300"
          placeholder="Descreva o que espera alcançar com nossa consultoria..."
          value={mainObjective}
          onChange={(e) => updateAdditionalData({ mainObjective: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label className="text-foreground font-medium">
          Existe alguma informação adicional que gostaria de compartilhar?{' '}
          <span className="text-muted-foreground font-normal">(opcional)</span>
        </Label>
        <Textarea
          className="bg-[#111111]/80 border-[#333333] rounded-[8px] min-h-[100px] text-base focus-visible:ring-primary hover:border-primary/50 transition-all duration-300"
          placeholder="Qualquer contexto relevante para nossa reunião..."
          value={additionalInfo}
          onChange={(e) => updateAdditionalData({ additionalInfo: e.target.value })}
        />
      </div>
    </div>
  )
}

// Step 8 — Revisão
export const Step8 = ({ data }: StepProps) => {
  const { name, companyName, employeeCount, role, usesAI, aiTools, aiUsage, mainObjective, additionalInfo } =
    data.additionalData

  const reviewItems = [
    { label: 'Nome', value: name },
    { label: 'Empresa', value: companyName },
    { label: 'Funcionários', value: employeeCount },
    { label: 'Cargo', value: role },
    { label: 'Nicho', value: data.niche },
    { label: 'Temas de interesse', value: data.useCases.length > 0 ? data.useCases.join(', ') : undefined },
    { label: 'Outros temas', value: data.otherUseCase || undefined },
    { label: 'Usa IA', value: usesAI === null ? '-' : usesAI ? 'Sim' : 'Não' },
    { label: 'Ferramentas de IA', value: aiTools || undefined },
    { label: 'Como usa IA', value: aiUsage || undefined },
    { label: 'Objetivo principal', value: mainObjective },
    { label: 'Informações adicionais', value: additionalInfo || undefined },
  ].filter((item) => item.value !== undefined)

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <h2 className="text-2xl sm:text-3xl font-bold font-display">Revisão Final</h2>
      <p className="text-muted-foreground text-lg">
        Confirme seus dados antes de enviar sua solicitação.
      </p>
      <div className="space-y-3 bg-[#111111]/80 p-6 rounded-[8px] border border-[#333333] text-sm sm:text-base shadow-elevation hover:-translate-y-1 transition-all duration-300 ease-in-out">
        {reviewItems.map(({ label, value }) => (
          <div
            key={label}
            className="flex flex-col sm:flex-row sm:justify-between border-b border-[#333333] last:border-0 pb-3 pt-1 last:pb-0 gap-1"
          >
            <span className="text-muted-foreground shrink-0">{label}</span>
            <span className="font-medium text-foreground sm:text-right sm:w-2/3">{value || '-'}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
