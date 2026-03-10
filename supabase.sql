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

-- Ensure email is unique for upsert functionality
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'onboarding_submissions_email_key'
  ) THEN
    ALTER TABLE public.onboarding_submissions ADD CONSTRAINT onboarding_submissions_email_key UNIQUE (email);
  END IF;
END $$;

-- Enable Row Level Security (RLS)
ALTER TABLE public.onboarding_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts to the onboarding_submissions table
DROP POLICY IF EXISTS "Enable insert for anonymous users" ON public.onboarding_submissions;
CREATE POLICY "Enable insert for anonymous users" ON public.onboarding_submissions
    AS PERMISSIVE FOR INSERT
    TO public
    WITH CHECK (true);

-- Allow anonymous updates to the onboarding_submissions table
DROP POLICY IF EXISTS "Enable update for anonymous users" ON public.onboarding_submissions;
CREATE POLICY "Enable update for anonymous users" ON public.onboarding_submissions
    AS PERMISSIVE FOR UPDATE
    TO public
    USING (true)
    WITH CHECK (true);

-- Allow read access to authenticated admin users with @adapta.org email
DROP POLICY IF EXISTS "Enable read access for admin users" ON public.onboarding_submissions;
CREATE POLICY "Enable read access for admin users" ON public.onboarding_submissions
    AS PERMISSIVE FOR SELECT
    TO public
    USING (
      (auth.jwt() ->> 'email' LIKE '%@adapta.org')
      OR
      (current_setting('request.headers', true)::json->>'x-user-email' LIKE '%@adapta.org')
    );

