ALTER TABLE public.landing_pages
  ADD COLUMN IF NOT EXISTS brief_hash text,
  ADD COLUMN IF NOT EXISTS brief_processed_at timestamptz,
  ADD COLUMN IF NOT EXISTS brief_error text,
  ADD COLUMN IF NOT EXISTS brief_auto_apply boolean NOT NULL DEFAULT true;