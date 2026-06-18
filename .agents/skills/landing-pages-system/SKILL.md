---
name: landing-pages-system
description: Multi-tenant landing pages app. Pages at /lp/<slug>, admin at /admin/pages. Per-page Zapier webhook. Free-text brief auto-applied by AI via pg_cron.
---

# Landing Pages System

One Lovable app hosts many landing pages, each at `/lp/<slug>`, each with its own content, its own Zapier webhook, and its own free-text brief that is auto-converted to content by AI.

## Architecture

```
DB table: landing_pages
  slug, title, subtitle, hero_heading, hero_sub, cta_text, meta_description
  zapier_webhook_url   -> per-page webhook (never exposed to client)
  branches jsonb[]     -> select options
  images jsonb[]       -> gallery URLs
  body_html text       -> free-form HTML above the form
  theme jsonb          -> reserved
  is_published bool    -> public read gate

  brief text                  -> operator writes what should appear in the page
  brief_hash text             -> sha256 of last processed brief
  brief_processed_at ts       -> when the brief was last applied
  brief_error text            -> last AI/processor error
  brief_auto_apply bool       -> opt out of automatic cron processing

DB table: leads
  landing_page_id -> FK to landing_pages
```

## Routes

| URL | Purpose |
|---|---|
| `/` | Legacy single landing page (old global webhook) |
| `/lp/$slug` | Public landing page (RLS: is_published = true) |
| `/admin` | Redirects to `/admin/pages` |
| `/admin/pages` | List + create + delete |
| `/admin/pages/$slug` | Edit one page: brief, content, webhook, leads |
| `/api/public/cron-process-briefs` | Cron hook (POST). Auth: `apikey` header = SUPABASE_PUBLISHABLE_KEY OR `x-cron-secret` = CRON_SECRET |

## Server functions — `src/lib/landing-pages.functions.ts`

Public: `getPublishedPage`, `submitLandingLead`
Admin (password `makeup2026`): `listPages`, `getPageForEdit`, `upsertPage`, `deletePage`, `testPageWebhook`, `listLeadsForPage`, `deleteLeadForPage`, `processBriefNow`

## Brief processor — `src/lib/brief-processor.server.ts`

- `briefHash(text)` — sha256 of trimmed brief
- `processBriefForPage(pageId)` — calls Lovable AI Gateway (`google/gemini-3-flash-preview`) with a Hebrew system prompt + the brief, expects JSON `{title, subtitle, meta_description, hero_heading, hero_sub, cta_text, branches[], body_html}`, patches the page, updates `brief_hash` + `brief_processed_at`. Errors stored in `brief_error`.
- `processAllPendingBriefs(limit=10)` — scans rows with `brief_auto_apply=true` and `brief != ''` and `brief_hash != sha256(brief)`, processes up to `limit`.

The cron route imports the processor dynamically and is rate-limited by the 5-minute pg_cron schedule. Manual trigger button "▶ הרץ AI עכשיו" in the editor calls `processBriefNow` for a single page.

## pg_cron job

Scheduled via `cron.schedule('process-landing-briefs', '*/5 * * * *', ...)` — calls `https://project--870e0daf-97e9-4a0b-a44d-6da7007a0c12.lovable.app/api/public/cron-process-briefs` with the supabase publishable key in `apikey` header. To inspect / change:

```sql
SELECT * FROM cron.job WHERE jobname = 'process-landing-briefs';
SELECT * FROM cron.job_run_details WHERE jobid = (SELECT jobid FROM cron.job WHERE jobname='process-landing-briefs') ORDER BY start_time DESC LIMIT 10;
SELECT cron.unschedule('process-landing-briefs');
```

## Operator workflow

1. `/admin` → login → "צרי דף חדש" with a slug
2. Click עריכה, write a free-text brief, save
3. Either wait <=5 min for cron OR click "▶ הרץ AI עכשיו"
4. Review the AI-generated content, paste Zapier webhook, tick "מפורסם", save
5. Open `/lp/<slug>` — leads route to the page's webhook

## Important constraints

- `getPublishedPage` MUST NOT return `zapier_webhook_url`
- `landing_pages` writes are service-role only; never grant INSERT/UPDATE/DELETE to anon/authenticated
- LOVABLE_API_KEY is read only inside server handlers; never expose to client
- The legacy `/` page still uses the old `app_settings.zapier_webhook`; leave alone unless asked
- Slug regex: `/^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/`
- Brief processor caps each cron run at 10 pages to keep cost predictable
