import { FormData } from '@/components/onboarding/Steps'

export async function upsertSubmission(data: FormData, isFinal: boolean = false) {
  if (!data.additionalData.email) return

  const payload = {
    name: data.additionalData.name || '',
    email: data.additionalData.email,
    profession: data.profession || '',
    use_cases: data.useCases || [],
    portfolio: data.additionalData.portfolio || '',
    risk: data.additionalData.risk || '',
    vsl_watched: data.additionalData.vslWatched || false,
    full_payload: data,
  }

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
  const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    // Mock successful network request if no env vars are present
    await new Promise((resolve) => setTimeout(resolve, isFinal ? 1000 : 300))
    return { success: true }
  }

  const res = await fetch(`${supabaseUrl}/rest/v1/onboarding_submissions?on_conflict=email`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`,
      Prefer: 'resolution=merge-duplicates',
    },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    throw new Error('Failed to upsert submission data')
  }

  return { success: true }
}
