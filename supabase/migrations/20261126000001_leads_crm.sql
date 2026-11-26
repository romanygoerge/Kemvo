-- ============================================================================
-- KEMVO Lead Management & CRM Schema (Supabase / PostgreSQL)
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- 1. Admin Users Allowlist (linked to Supabase Auth)
CREATE TABLE IF NOT EXISTS public.admin_users (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  role text NOT NULL DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin')),
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- 2. Leads Table
CREATE TABLE IF NOT EXISTS public.leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ref_code text UNIQUE NOT NULL,
  name text NOT NULL CHECK (char_length(btrim(name)) BETWEEN 2 AND 120),
  email text CHECK (
    email IS NULL
    OR (char_length(email) <= 254 AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$')
  ),
  country_code text NOT NULL DEFAULT '+20' CHECK (char_length(btrim(country_code)) BETWEEN 1 AND 8),
  phone text NOT NULL CHECK (char_length(btrim(phone)) BETWEEN 6 AND 30),
  service_type text NOT NULL CHECK (char_length(btrim(service_type)) BETWEEN 2 AND 160),
  service_slug text CHECK (service_slug IS NULL OR char_length(service_slug) <= 100),
  project_description text CHECK (
    project_description IS NULL OR char_length(project_description) <= 4000
  ),
  budget text CHECK (budget IS NULL OR char_length(budget) <= 100),
  status text NOT NULL DEFAULT 'new' CHECK (
    status IN ('new', 'contacted', 'qualified', 'proposal_sent', 'won', 'lost')
  ),
  internal_notes text CHECK (internal_notes IS NULL OR char_length(internal_notes) <= 5000),
  last_contacted_at timestamptz,
  source text NOT NULL DEFAULT 'website_form' CHECK (char_length(btrim(source)) BETWEEN 1 AND 100),
  landing_page text CHECK (landing_page IS NULL OR char_length(landing_page) <= 1000),
  referrer text CHECK (referrer IS NULL OR char_length(referrer) <= 1000),
  utm_source text CHECK (utm_source IS NULL OR char_length(utm_source) <= 200),
  utm_medium text CHECK (utm_medium IS NULL OR char_length(utm_medium) <= 200),
  utm_campaign text CHECK (utm_campaign IS NULL OR char_length(utm_campaign) <= 250),
  utm_content text CHECK (utm_content IS NULL OR char_length(utm_content) <= 250),
  utm_term text CHECK (utm_term IS NULL OR char_length(utm_term) <= 250),
  fbclid text CHECK (fbclid IS NULL OR char_length(fbclid) <= 500),
  fbp text CHECK (fbp IS NULL OR char_length(fbp) <= 255),
  fbc text CHECK (fbc IS NULL OR char_length(fbc) <= 500),
  locale text NOT NULL DEFAULT 'ar' CHECK (locale IN ('ar', 'en')),
  idempotency_key text UNIQUE,
  ip_hash text,
  user_agent text CHECK (user_agent IS NULL OR char_length(user_agent) <= 500),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- 3. Lead Notes & Activity Timeline Table
CREATE TABLE IF NOT EXISTS public.lead_notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id uuid NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
  note text NOT NULL CHECK (char_length(btrim(note)) BETWEEN 1 AND 4000),
  note_type text NOT NULL DEFAULT 'note' CHECK (
    note_type IN ('note', 'status_change', 'contact_log')
  ),
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_by_email text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- 4. Triggers: ref_code generation & updated_at maintenance
CREATE OR REPLACE FUNCTION public.set_lead_defaults()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  IF NEW.ref_code IS NULL OR btrim(NEW.ref_code) = '' THEN
    NEW.ref_code := 'KMV-' || upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 6));
  END IF;
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at := now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_leads_defaults ON public.leads;
CREATE TRIGGER trg_leads_defaults
  BEFORE INSERT ON public.leads
  FOR EACH ROW
  EXECUTE FUNCTION public.set_lead_defaults();

DROP TRIGGER IF EXISTS trg_leads_updated_at ON public.leads;
CREATE TRIGGER trg_leads_updated_at
  BEFORE UPDATE ON public.leads
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

-- 5. Indexes for CRM Search, Filtering, Stats & Anti-Spam Rate Limiting
CREATE INDEX IF NOT EXISTS idx_leads_status_created_at
  ON public.leads (status, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_leads_service_type_created_at
  ON public.leads (service_type, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_leads_source_created_at
  ON public.leads (source, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_leads_utm_campaign
  ON public.leads (utm_campaign)
  WHERE utm_campaign IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_leads_created_at_desc
  ON public.leads (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_leads_phone
  ON public.leads (phone);

CREATE INDEX IF NOT EXISTS idx_leads_email
  ON public.leads (email)
  WHERE email IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_leads_ip_hash_created_at
  ON public.leads (ip_hash, created_at DESC)
  WHERE ip_hash IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_lead_notes_lead_id_created_at
  ON public.lead_notes (lead_id, created_at DESC);

-- 6. Admin Authorization Helper (SECURITY DEFINER, restricted execution)
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.admin_users au
    WHERE au.user_id = auth.uid()
      AND au.is_active = true
  );
$$;

REVOKE ALL ON FUNCTION public.is_admin() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated, service_role;

-- 7. Row Level Security (RLS)
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lead_notes ENABLE ROW LEVEL SECURITY;

-- Admin Users Policies: authenticated user can read only their own active admin record
DROP POLICY IF EXISTS "Admins can read own record" ON public.admin_users;
CREATE POLICY "Admins can read own record"
  ON public.admin_users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id AND is_active = true);

-- Leads Policies:
-- a) Visitors (anon) CANNOT SELECT, UPDATE, or DELETE any leads.
-- b) Visitors (anon) CAN INSERT only new leads with safe defaults & bounded fields.
DROP POLICY IF EXISTS "Public can submit new leads only" ON public.leads;
CREATE POLICY "Public can submit new leads only"
  ON public.leads
  FOR INSERT
  TO anon
  WITH CHECK (
    status = 'new'
    AND last_contacted_at IS NULL
    AND internal_notes IS NULL
    AND char_length(btrim(name)) BETWEEN 2 AND 120
    AND char_length(btrim(phone)) BETWEEN 6 AND 30
    AND char_length(btrim(service_type)) BETWEEN 2 AND 160
  );

-- c) Authorized Admins ONLY can read and update leads
DROP POLICY IF EXISTS "Admins can read all leads" ON public.leads;
CREATE POLICY "Admins can read all leads"
  ON public.leads
  FOR SELECT
  TO authenticated
  USING (public.is_admin());

DROP POLICY IF EXISTS "Admins can update leads" ON public.leads;
CREATE POLICY "Admins can update leads"
  ON public.leads
  FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Lead Notes Policies: Authorized Admins ONLY
DROP POLICY IF EXISTS "Admins can read lead notes" ON public.lead_notes;
CREATE POLICY "Admins can read lead notes"
  ON public.lead_notes
  FOR SELECT
  TO authenticated
  USING (public.is_admin());

DROP POLICY IF EXISTS "Admins can insert lead notes" ON public.lead_notes;
CREATE POLICY "Admins can insert lead notes"
  ON public.lead_notes
  FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin());
