import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';

const ADMIN_PASS = 'makeup2026';

const PassSchema = z.object({ password: z.string() });

const HEBREW_NAME_RE = /^[\u0590-\u05FF]{2,}(?:[ '\-][\u0590-\u05FF]{2,})*$/;
const PHONE_RE = /^05\d{8}$/;

/** PUBLIC — submit a lead from the legacy home page (/).
 *  Saves to DB and forwards to the global Zapier webhook server-side. */
export const submitHomeLead = createServerFn({ method: 'POST' })
  .inputValidator((d: unknown) =>
    z
      .object({
        name: z.string().trim().regex(HEBREW_NAME_RE, 'שם בעברית בלבד'),
        phone: z
          .string()
          .transform((v) => v.replace(/[\s-]/g, ''))
          .pipe(z.string().regex(PHONE_RE, 'טלפון לא תקין')),
        branch: z.string().trim().min(1, 'יש לבחור סניף'),
        source: z.string().optional().default('/'),
      })
      .parse(d),
  )
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import('@/integrations/supabase/client.server');

    // 1) Always save the lead first
    const { error: insErr } = await supabaseAdmin.from('leads').insert({
      name: data.name,
      phone: data.phone,
      branch: data.branch,
      source: data.source || '/',
    });
    if (insErr) {
      console.error('[submitHomeLead] DB insert failed:', insErr.message);
      throw new Error('שמירה נכשלה');
    }

    // 2) Forward to Zapier webhook (best-effort, never block the user)
    try {
      const { data: row } = await supabaseAdmin
        .from('app_settings')
        .select('value')
        .eq('key', 'zapier_webhook')
        .maybeSingle();
      const hook = ((row?.value as string | undefined) || '').trim();
      if (hook) {
        const res = await fetch(hook, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: data.name,
            phone: data.phone,
            branch: data.branch,
            source: data.source || '/',
            timestamp: new Date().toISOString(),
          }),
        });
        if (!res.ok) {
          console.error('[submitHomeLead] Zapier non-OK:', res.status, await res.text().catch(() => ''));
        }
      } else {
        console.warn('[submitHomeLead] No global zapier_webhook configured');
      }
    } catch (e: any) {
      console.error('[submitHomeLead] Zapier forward failed:', e?.message || e);
    }

    return { ok: true };
  });



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
