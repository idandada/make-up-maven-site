REVOKE SELECT, UPDATE, DELETE ON public.leads FROM anon, authenticated;
GRANT INSERT ON public.leads TO anon, authenticated;
GRANT ALL ON public.leads TO service_role;

CREATE POLICY "Leads are not readable by clients"
  ON public.leads FOR SELECT
  TO anon, authenticated
  USING (false);