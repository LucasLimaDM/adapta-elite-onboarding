-- Supabase Table Setup for Onboarding Submissions

CREATE TABLE IF NOT EXISTS public.onboarding_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    profession TEXT NOT NULL,
    use_cases TEXT[] NOT NULL,
    portfolio TEXT NOT NULL,
    risk TEXT NOT NULL,
    vsl_watched BOOLEAN NOT NULL DEFAULT false,
    full_payload JSONB NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.onboarding_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts to the onboarding_submissions table
CREATE POLICY "Enable insert for anonymous users" ON public.onboarding_submissions
    AS PERMISSIVE FOR INSERT
    TO public
    WITH CHECK (true);
