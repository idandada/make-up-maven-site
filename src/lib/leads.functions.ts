import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';

const ADMIN_PASS = 'makeup2026';

const PassSchema = z.object({ password: z.string() });

export const listLeads = createServerFn({ method: 'POST' })
  .inputValidator((d: unknown) => PassSchema.parse(d))
  .handler(async ({ data }) => {
    if (data.password !== ADMIN_PASS) throw new Error('Unauthorized');
    const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
    const { data: rows, error } = await supabaseAdmin
      .from('leads')
      .select('id,name,phone,branch,source,created_at')
      .order('created_at', { ascending: false })
      .limit(2000);
    if (error) throw new Error(error.message);
    return rows ?? [];
  });

export const deleteLead = createServerFn({ method: 'POST' })
  .inputValidator((d: unknown) =>
    z.object({ password: z.string(), id: z.string().uuid() }).parse(d),
  )
  .handler(async ({ data }) => {
    if (data.password !== ADMIN_PASS) throw new Error('Unauthorized');
    const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
    const { error } = await supabaseAdmin.from('leads').delete().eq('id', data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const clearLeads = createServerFn({ method: 'POST' })
  .inputValidator((d: unknown) => PassSchema.parse(d))
  .handler(async ({ data }) => {
    if (data.password !== ADMIN_PASS) throw new Error('Unauthorized');
    const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
    const { error } = await supabaseAdmin
      .from('leads')
      .delete()
      .not('id', 'is', null);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const getZapierHook = createServerFn({ method: 'GET' })
  .handler(async () => {
    const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
    const { data, error } = await supabaseAdmin
      .from('app_settings')
      .select('value')
      .eq('key', 'zapier_webhook')
      .maybeSingle();
    if (error) throw new Error(error.message);
    return { value: (data?.value as string) || '' };
  });

export const saveZapierHook = createServerFn({ method: 'POST' })
  .inputValidator((d: unknown) =>
    z.object({ password: z.string(), value: z.string() }).parse(d),
  )
  .handler(async ({ data }) => {
    if (data.password !== ADMIN_PASS) throw new Error('Unauthorized');
    const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
    const { error } = await supabaseAdmin
      .from('app_settings')
      .upsert({ key: 'zapier_webhook', value: data.value.trim(), updated_at: new Date().toISOString() });
    if (error) throw new Error(error.message);
    return { ok: true };
  });
