---
name: landing-pages-system
description: Multi-tenant landing pages system. Use when adding, editing, or troubleshooting landing pages, their Zapier webhooks, the /lp/$slug routes, or the admin pages editor at /admin/pages.
type: feature
---

# Landing Pages System

The project is a multi-tenant landing-page platform: one Lovable app hosts many independent landing pages, each at `/lp/<slug>`, each with its own content and its own Zapier webhook.

## Architecture

```
DB table: landing_pages
   slug  ──>  unique URL segment, used in /lp/<slug>
   title, subtitle, hero_heading, hero_sub, cta_text, meta_description
   zapier_webhook_url  ──>  per-page Zapier hook (NEVER exposed to client)
   branches: jsonb[]   ──>  options shown in the form's branch <select>
   images:   jsonb[]   ──>  image URLs rendered in the gallery
   body_html: text     ──>  optional free-form HTML inserted above the form
   theme:    jsonb     ──>  reserved for per-page color overrides
   is_published: bool  ──>  only published pages are publicly readable

DB table: leads
   landing_page_id ──> FK to landing_pages (nullable, ON DELETE SET NULL)
```

RLS:
- `landing_pages`: anon/authenticated can SELECT only rows where `is_published = true`. All writes go through admin server fns (service role).
- `leads`: INSERT open to anon (form submissions). SELECT denied to clients — admin reads via service-role server fn.

## Routes

| URL | Purpose | Access |
|---|---|---|
| `/` | Legacy single landing page (the original "קורס מאפרת") | public |
| `/lp/$slug` | Renders a landing page from DB | public (only if published) |
| `/admin` | Leads dashboard (existing) | password (`makeup2026`) |
| `/admin/pages` | List / create / delete landing pages | password |
| `/admin/pages/$slug` | Edit one landing page (content + webhook + publish toggle) | password |

## Server functions — `src/lib/landing-pages.functions.ts`

Public:
- `getPublishedPage({ slug })` — returns a published page (used by loader of `/lp/$slug`). Webhook URL is intentionally NOT returned.
- `submitLandingLead({ slug, name, phone, branch })` — validates, inserts into `leads` with `landing_page_id`, then forwards the payload to the page's `zapier_webhook_url` server-side. Validation: Hebrew name, `/^05\d{8}$/` phone.

Admin (password-gated, service role):
- `listPages({ password })`
- `getPageForEdit({ password, slug })`
- `upsertPage({ password, page })` — slug-conflict upsert
- `deletePage({ password, slug })`
- `testPageWebhook({ password, slug })` — sends a test payload to the page's webhook

> Admin password lives in `ADMIN_PASS` constant in `src/lib/leads.functions.ts` and `src/lib/landing-pages.functions.ts`. Change in both places if rotating.

## Adding a new landing page (operator workflow)

1. Go to `/admin` → login → click **דפי נחיתה**.
2. Type a slug (lowercase, dashes only: `makeup-tlv`) → **צרי**.
3. Click **עריכה** on the new row.
4. Fill content fields, paste Zapier webhook URL, add branches (one per line) and image URLs.
5. Tick **הדף מפורסם** + **שמירה**.
6. Open `/lp/<slug>` — page is live.

## Adding a new landing page (developer / from chat)

- Either insert via SQL (`supabase--insert` tool with table `landing_pages`), or
- Wrap the `upsertPage` server fn in a small admin script.

## Zapier per page

Each page has its own `zapier_webhook_url`. The forward happens **inside the server function** — the URL never reaches the browser. This means:
- Switching the webhook on a page does NOT require redeploy.
- Different pages can route leads to completely different Zaps / sheets / inboxes.

## Slug rules

Regex enforced both client- and server-side:
```
/^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
```
Lowercase a–z, digits, dashes. No leading/trailing dash. Max 80 chars.

## Important constraints

- The legacy `/` route still uses the old `app_settings.zapier_webhook` global — it is NOT yet migrated to `landing_pages`. Leave it alone unless asked to convert.
- Never grant INSERT/UPDATE/DELETE on `landing_pages` to `anon` or `authenticated`. All writes are service-role only.
- Never return `zapier_webhook_url` from `getPublishedPage` — keep it server-side.

## Future extensions (not built yet)

- Custom subdomains per page (requires custom domain + Cloudflare Worker; Lovable doesn't support dynamic subdomains natively).
- Rich content blocks (sections list) instead of `body_html` blob.
- Per-page theme colors driven by the `theme` jsonb column.
