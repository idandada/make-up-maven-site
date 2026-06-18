
CREATE TABLE public.landing_pages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL DEFAULT '',
  subtitle text NOT NULL DEFAULT '',
  meta_description text NOT NULL DEFAULT '',
  hero_heading text NOT NULL DEFAULT '',
  hero_sub text NOT NULL DEFAULT '',
  cta_text text NOT NULL DEFAULT 'השאירי פרטים',
  zapier_webhook_url text NOT NULL DEFAULT '',
  branches jsonb NOT NULL DEFAULT '[]'::jsonb,
  images jsonb NOT NULL DEFAULT '[]'::jsonb,
  body_html text NOT NULL DEFAULT '',
  theme jsonb NOT NULL DEFAULT '{}'::jsonb,
  is_published boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.landing_pages TO anon, authenticated;
GRANT ALL ON public.landing_pages TO service_role;

ALTER TABLE public.landing_pages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published pages are publicly readable"
ON public.landing_pages
FOR SELECT
TO anon, authenticated
USING (is_published = true);

ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS landing_page_id uuid REFERENCES public.landing_pages(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS idx_leads_landing_page_id ON public.leads(landing_page_id);

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS landing_pages_set_updated_at ON public.landing_pages;
CREATE TRIGGER landing_pages_set_updated_at
BEFORE UPDATE ON public.landing_pages
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
