import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';

const ADMIN_PASS = 'makeup2026';

const SlugSchema = z
  .string()
  .min(1)
  .max(80)
  .regex(/^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/, 'slug must be lowercase letters, digits and dashes');

const PageSchema = z.object({
  slug: SlugSchema,
  title: z.string().default(''),
  subtitle: z.string().default(''),
  meta_description: z.string().default(''),
  hero_heading: z.string().default(''),
  hero_sub: z.string().default(''),
  cta_text: z.string().default('השאירי פרטים'),
  zapier_webhook_url: z.string().default(''),
  branches: z.array(z.string()).default([]),
  images: z.array(z.string()).default([]),
  body_html: z.string().default(''),
  theme: z.record(z.string(), z.any()).default({}),
  is_published: z.boolean().default(false),
  brief: z.string().default(''),
});

export type LandingPageInput = z.infer<typeof PageSchema>;

/** PUBLIC — read a published landing page by slug (used by /lp/$slug) */
export const getPublishedPage = createServerFn({ method: 'GET' })
  .inputValidator((d: unknown) => z.object({ slug: SlugSchema }).parse(d))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
    const { data: row, error } = await supabaseAdmin
      .from('landing_pages')
      .select('id,slug,title,subtitle,meta_description,hero_heading,hero_sub,cta_text,branches,images,body_html,theme,is_published')
      .eq('slug', data.slug)
      .eq('is_published', true)
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!row) throw new Error('NOT_FOUND');
    // Strip the webhook — never expose to public
    return row;
  });

/** PUBLIC — submit a lead for a given landing page slug. Forwards to that page's Zapier webhook server-side. */
export const submitLandingLead = createServerFn({ method: 'POST' })
  .inputValidator((d: unknown) =>
    z
      .object({
        slug: SlugSchema,
        name: z.string().min(2).max(100),
        phone: z.string().regex(/^05\d{8}$/, 'invalid phone'),
        branch: z.string().min(1).max(100),
      })
      .parse(d),
  )
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
    const { data: page, error: pageErr } = await supabaseAdmin
      .from('landing_pages')
      .select('id, zapier_webhook_url, is_published')
      .eq('slug', data.slug)
      .maybeSingle();
    if (pageErr) throw new Error(pageErr.message);
    if (!page || !page.is_published) throw new Error('Page not found');

    const { error: insErr } = await supabaseAdmin.from('leads').insert({
      name: data.name,
      phone: data.phone,
      branch: data.branch,
      source: `/lp/${data.slug}`,
      landing_page_id: page.id,
    });
    if (insErr) throw new Error(insErr.message);

    const hook = (page.zapier_webhook_url || '').trim();
    if (hook) {
      // fire and forget; don't fail the user submit if zapier is down
      try {
        await fetch(hook, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: data.name,
            phone: data.phone,
            branch: data.branch,
            slug: data.slug,
            landing_page_id: page.id,
            createdAt: new Date().toISOString(),
          }),
        });
      } catch {
        /* ignore */
      }
    }
    return { ok: true };
  });

/** ADMIN — list all pages */
export const listPages = createServerFn({ method: 'POST' })
  .inputValidator((d: unknown) => z.object({ password: z.string() }).parse(d))
  .handler(async ({ data }) => {
    if (data.password !== ADMIN_PASS) throw new Error('Unauthorized');
    const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
    const { data: rows, error } = await supabaseAdmin
      .from('landing_pages')
      .select('id,slug,title,is_published,zapier_webhook_url,updated_at,created_at')
      .order('updated_at', { ascending: false });
    if (error) throw new Error(error.message);
    return rows ?? [];
  });

/** ADMIN — get a page (full) by slug for editing */
export const getPageForEdit = createServerFn({ method: 'POST' })
  .inputValidator((d: unknown) => z.object({ password: z.string(), slug: SlugSchema }).parse(d))
  .handler(async ({ data }) => {
    if (data.password !== ADMIN_PASS) throw new Error('Unauthorized');
    const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
    const { data: row, error } = await supabaseAdmin
      .from('landing_pages')
      .select('*')
      .eq('slug', data.slug)
      .maybeSingle();
    if (error) throw new Error(error.message);
    return row;
  });

/** ADMIN — create or update a page (by slug) */
export const upsertPage = createServerFn({ method: 'POST' })
  .inputValidator((d: unknown) =>
    z.object({ password: z.string(), page: PageSchema }).parse(d),
  )
  .handler(async ({ data }) => {
    if (data.password !== ADMIN_PASS) throw new Error('Unauthorized');
    const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
    const { error } = await supabaseAdmin
      .from('landing_pages')
      .upsert(
        {
          slug: data.page.slug,
          title: data.page.title,
          subtitle: data.page.subtitle,
          meta_description: data.page.meta_description,
          hero_heading: data.page.hero_heading,
          hero_sub: data.page.hero_sub,
          cta_text: data.page.cta_text,
          zapier_webhook_url: data.page.zapier_webhook_url.trim(),
          branches: data.page.branches,
          images: data.page.images,
          body_html: data.page.body_html,
          theme: data.page.theme,
          is_published: data.page.is_published,
          brief: data.page.brief,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'slug' },
      );
    if (error) throw new Error(error.message);
    return { ok: true };
  });

/** ADMIN — delete a page by slug */
export const deletePage = createServerFn({ method: 'POST' })
  .inputValidator((d: unknown) => z.object({ password: z.string(), slug: SlugSchema }).parse(d))
  .handler(async ({ data }) => {
    if (data.password !== ADMIN_PASS) throw new Error('Unauthorized');
    const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
    const { error } = await supabaseAdmin.from('landing_pages').delete().eq('slug', data.slug);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

/** ADMIN — send a test payload to the page's Zapier webhook */
export const testPageWebhook = createServerFn({ method: 'POST' })
  .inputValidator((d: unknown) => z.object({ password: z.string(), slug: SlugSchema }).parse(d))
  .handler(async ({ data }) => {
    if (data.password !== ADMIN_PASS) throw new Error('Unauthorized');
    const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
    const { data: row } = await supabaseAdmin
      .from('landing_pages')
      .select('zapier_webhook_url')
      .eq('slug', data.slug)
      .maybeSingle();
    const hook = (row?.zapier_webhook_url || '').trim();
    if (!hook) throw new Error('אין כתובת Webhook לדף הזה');
    const res = await fetch(hook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        test: true,
        name: 'בדיקה',
        phone: '0500000000',
        branch: 'בדיקה',
        slug: data.slug,
        createdAt: new Date().toISOString(),
      }),
    });
    return { ok: true, status: res.status };
  });

/** ADMIN — list leads for a specific landing page */
export const listLeadsForPage = createServerFn({ method: 'POST' })
  .inputValidator((d: unknown) => z.object({ password: z.string(), slug: SlugSchema }).parse(d))
  .handler(async ({ data }) => {
    if (data.password !== ADMIN_PASS) throw new Error('Unauthorized');
    const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
    const { data: page } = await supabaseAdmin
      .from('landing_pages')
      .select('id')
      .eq('slug', data.slug)
      .maybeSingle();
    if (!page) return [];
    const { data: rows, error } = await supabaseAdmin
      .from('leads')
      .select('id,name,phone,branch,source,created_at')
      .eq('landing_page_id', page.id)
      .order('created_at', { ascending: false });
    if (error) throw new Error(error.message);
    return rows ?? [];
  });

/** ADMIN — delete a single lead */
export const deleteLeadForPage = createServerFn({ method: 'POST' })
  .inputValidator((d: unknown) => z.object({ password: z.string(), id: z.string().uuid() }).parse(d))
  .handler(async ({ data }) => {
    if (data.password !== ADMIN_PASS) throw new Error('Unauthorized');
    const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
    const { error } = await supabaseAdmin.from('leads').delete().eq('id', data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

/** ADMIN — manually run the brief processor for a single page */
export const processBriefNow = createServerFn({ method: 'POST' })
  .inputValidator((d: unknown) => z.object({ password: z.string(), slug: SlugSchema }).parse(d))
  .handler(async ({ data }) => {
    if (data.password !== ADMIN_PASS) throw new Error('Unauthorized');
    const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
    const { data: page } = await supabaseAdmin
      .from('landing_pages')
      .select('id')
      .eq('slug', data.slug)
      .maybeSingle();
    if (!page) throw new Error('Page not found');
    const { processBriefForPage } = await import('./brief-processor.server');
    return processBriefForPage(page.id);
  });

