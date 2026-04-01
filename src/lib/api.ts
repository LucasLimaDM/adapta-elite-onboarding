import { FormData } from '@/components/onboarding/Steps'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export async function upsertSubmission(
  data: FormData,
  isFinal: boolean = false,
  userToken: string,
  userId: string,
) {
  if (!data.additionalData.email) return

  const { additionalData, niche, useCases, otherUseCase } = data

  const payload = {
    user_id: userId,
    name: additionalData.name || '',
    email: additionalData.email,
    vsl_watched: additionalData.vslWatched || false,
    company_name: additionalData.companyName || '',
    employee_count: additionalData.employeeCount || '',
    role: additionalData.role || '',
    niche: niche || '',
    use_cases: useCases || [],
    other_use_case: otherUseCase || '',
    uses_ai: additionalData.usesAI,
    ai_tools: additionalData.aiTools || '',
    ai_usage: additionalData.aiUsage || '',
    main_objective: additionalData.mainObjective || '',
    additional_info: additionalData.additionalInfo || '',
    full_payload: data,
  }

  if (!supabaseUrl || !supabaseKey) {
    await new Promise((resolve) => setTimeout(resolve, isFinal ? 1000 : 300))
    return { success: true }
  }

  const res = await fetch(`${supabaseUrl}/rest/v1/onboarding_submissions?on_conflict=email`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: supabaseKey,
      Authorization: `Bearer ${userToken}`,
      Prefer: 'resolution=merge-duplicates',
    },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    throw new Error('Failed to upsert submission data')
  }

  return { success: true }
}

export async function getSubmissions(userToken: string) {
  if (!supabaseUrl || !supabaseKey) {
    await new Promise((resolve) => setTimeout(resolve, 800))
    return [
      {
        id: '1',
        name: 'João Silva',
        email: 'joao@exemplo.com',
        company_name: 'Acme Ltda',
        employee_count: '21 a 50',
        role: 'Empreendedor, Sócio ou CEO',
        niche: 'Tecnologia',
        uses_ai: true,
        vsl_watched: true,
        created_at: new Date().toISOString(),
      },
    ]
  }

  const res = await fetch(`${supabaseUrl}/rest/v1/onboarding_submissions?select=*`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      apikey: supabaseKey,
      Authorization: `Bearer ${userToken}`,
    },
  })

  if (!res.ok) return []

  return await res.json()
}
