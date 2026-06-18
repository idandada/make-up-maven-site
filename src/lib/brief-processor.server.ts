/**
 * Brief processor — takes a free-text brief written in the admin editor and
 * asks Lovable AI to turn it into a landing-page content object.
 *
 * Server-only: imports supabaseAdmin and reads LOVABLE_API_KEY.
 */
import { createHash } from 'crypto';
import { supabaseAdmin } from '@/integrations/supabase/client.server';

const MODEL = 'google/gemini-3-flash-preview';

export function briefHash(brief: string) {
  return createHash('sha256').update(brief.trim()).digest('hex');
}

type Generated = {
  title?: string;
  subtitle?: string;
  meta_description?: string;
  hero_heading?: string;
  hero_sub?: string;
  cta_text?: string;
  branches?: string[];
  body_html?: string;
};

const SYSTEM = `אתה כותב/ת תוכן בעברית לדפי נחיתה. קלט: בריף חופשי על העסק/הקורס/המבצע.
פלט: JSON תקני בלבד, ללא טקסט נוסף וללא markdown, עם השדות הבאים בעברית:
{
  "title": "כותרת מטא קצרה (עד 60 תווים)",
  "subtitle": "כותרת משנה קצרה",
  "meta_description": "תיאור מטא ל-SEO (עד 155 תווים)",
  "hero_heading": "כותרת ראשית עוצמתית להירו",
  "hero_sub": "תת-כותרת קצרה להירו",
  "cta_text": "טקסט כפתור קצר (למשל: השאירי פרטים)",
  "branches": ["שם סניף 1", "שם סניף 2"],
  "body_html": "HTML עשיר עם <h2>, <p>, <ul><li> שמתאר את ההצעה, היתרונות וקריאה לפעולה. ללא <script> ו-<style>."
}
כל שדה חייב להיות מחרוזת או מערך מחרוזות. אם חסר מידע — תני ערך הגיוני בעברית.`;

async function callAI(brief: string): Promise<Generated> {
  const key = process.env.LOVABLE_API_KEY;
  if (!key) throw new Error('Missing LOVABLE_API_KEY');

  const res = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Lovable-API-Key': key,
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        { role: 'system', content: SYSTEM },
        { role: 'user', content: brief },
      ],
      response_format: { type: 'json_object' },
    }),
  });

  if (!res.ok) {
    const txt = await res.text();
    if (res.status === 429) throw new Error('AI rate limit (429)');
    if (res.status === 402) throw new Error('AI credits exhausted (402)');
    throw new Error(`AI error ${res.status}: ${txt.slice(0, 300)}`);
  }

  const data = (await res.json()) as { choices?: Array<{ message?: { content?: string } }> };
  const content = data.choices?.[0]?.message?.content ?? '{}';
  let parsed: Generated;
  try {
    parsed = JSON.parse(content);
  } catch {
    // try to pull a JSON block
    const m = content.match(/\{[\s\S]*\}/);
    parsed = m ? JSON.parse(m[0]) : {};
  }
  return parsed;
}

/** Process a single page by id. Updates content fields from the brief. */
export async function processBriefForPage(pageId: string) {
  const { data: page, error } = await supabaseAdmin
    .from('landing_pages')
    .select('id, slug, brief, brief_hash')
    .eq('id', pageId)
    .maybeSingle();
  if (error) throw new Error(error.message);
  if (!page) throw new Error('Page not found');
  const brief = (page.brief || '').trim();
  if (!brief) throw new Error('Brief is empty');

  const newHash = briefHash(brief);
  try {
    const g = await callAI(brief);
    const patch: Record<string, unknown> = {
      brief_hash: newHash,
      brief_processed_at: new Date().toISOString(),
      brief_error: null,
      updated_at: new Date().toISOString(),
    };
    if (typeof g.title === 'string' && g.title.trim()) patch.title = g.title.trim();
    if (typeof g.subtitle === 'string') patch.subtitle = g.subtitle;
    if (typeof g.meta_description === 'string') patch.meta_description = g.meta_description;
    if (typeof g.hero_heading === 'string' && g.hero_heading.trim()) patch.hero_heading = g.hero_heading;
    if (typeof g.hero_sub === 'string') patch.hero_sub = g.hero_sub;
    if (typeof g.cta_text === 'string' && g.cta_text.trim()) patch.cta_text = g.cta_text;
    if (Array.isArray(g.branches) && g.branches.length > 0) {
      patch.branches = g.branches.filter((b) => typeof b === 'string' && b.trim()).map((b) => b.trim());
    }
    if (typeof g.body_html === 'string' && g.body_html.trim()) patch.body_html = g.body_html;

    const { error: upErr } = await supabaseAdmin
      .from('landing_pages')
      .update(patch as any)
      .eq('id', pageId);
    if (upErr) throw new Error(upErr.message);
    return { ok: true, slug: page.slug };
  } catch (e: any) {
    await supabaseAdmin
      .from('landing_pages')
      .update({
        brief_error: String(e?.message || e).slice(0, 1000),
        brief_processed_at: new Date().toISOString(),
      })
      .eq('id', pageId);
    throw e;
  }
}

/** Find all pages that need processing and run them sequentially. */
export async function processAllPendingBriefs(limit = 10) {
  const { data: rows, error } = await supabaseAdmin
    .from('landing_pages')
    .select('id, slug, brief, brief_hash, brief_auto_apply')
    .eq('brief_auto_apply', true)
    .neq('brief', '')
    .limit(200);
  if (error) throw new Error(error.message);

  const pending = (rows ?? []).filter(
    (r) => (r.brief || '').trim() && briefHash(r.brief || '') !== (r.brief_hash || ''),
  );

  const results: Array<{ slug: string; ok: boolean; error?: string }> = [];
  for (const r of pending.slice(0, limit)) {
    try {
      await processBriefForPage(r.id);
      results.push({ slug: r.slug, ok: true });
    } catch (e: any) {
      results.push({ slug: r.slug, ok: false, error: String(e?.message || e) });
    }
  }
  return { scanned: rows?.length ?? 0, pending: pending.length, processed: results.length, results };
}
