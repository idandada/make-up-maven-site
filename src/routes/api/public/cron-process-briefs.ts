import { createFileRoute } from '@tanstack/react-router';

/**
 * Cron endpoint: scans landing_pages and applies any new/changed brief via AI.
 * Auth: header `x-cron-secret` must match CRON_SECRET env var.
 * Callable from pg_cron via pg_net, or manually for testing.
 */
export const Route = createFileRoute('/api/public/cron-process-briefs')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const secret = process.env.CRON_SECRET;
        const provided =
          request.headers.get('x-cron-secret') ||
          request.headers.get('X-Cron-Secret') ||
          new URL(request.url).searchParams.get('secret');
        if (!secret || provided !== secret) {
          return new Response('Unauthorized', { status: 401 });
        }

        const { processAllPendingBriefs } = await import('@/lib/brief-processor.server');
        try {
          const result = await processAllPendingBriefs(10);
          return Response.json(result);
        } catch (e: any) {
          return Response.json({ ok: false, error: String(e?.message || e) }, { status: 500 });
        }
      },
      GET: async ({ request }) => {
        // Allow GET for easy manual testing with ?secret=...
        const secret = process.env.CRON_SECRET;
        const provided = new URL(request.url).searchParams.get('secret');
        if (!secret || provided !== secret) return new Response('Unauthorized', { status: 401 });
        const { processAllPendingBriefs } = await import('@/lib/brief-processor.server');
        const result = await processAllPendingBriefs(10);
        return Response.json(result);
      },
    },
  },
});
