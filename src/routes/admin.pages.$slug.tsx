import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useServerFn } from '@tanstack/react-start';
import { useEffect, useState } from 'react';
import { getPageForEdit, upsertPage, testPageWebhook, listLeadsForPage, deleteLeadForPage } from '@/lib/landing-pages.functions';

export const Route = createFileRoute('/admin/pages/$slug')({
  component: AdminPageEditor,
  head: () => ({ meta: [{ title: 'עריכת דף נחיתה' }, { name: 'robots', content: 'noindex,nofollow' }] }),
});

const AUTH_KEY = 'mua_admin_auth';
const PASS_KEY = 'mua_admin_pass';

function AdminPageEditor() {
  const { slug } = Route.useParams();
  const nav = useNavigate();
  const get = useServerFn(getPageForEdit);
  const save = useServerFn(upsertPage);
  const test = useServerFn(testPageWebhook);
  const listLeads = useServerFn(listLeadsForPage);
  const delLead = useServerFn(deleteLeadForPage);
  const [leads, setLeads] = useState<any[]>([]);

  const [loaded, setLoaded] = useState(false);
  const [page, setPage] = useState<any>(null);
  const [err, setErr] = useState('');
  const [saved, setSaved] = useState(false);
  const [testStatus, setTestStatus] = useState('');
  const currentPass = () => (typeof window !== 'undefined' ? sessionStorage.getItem(PASS_KEY) || '' : '');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (sessionStorage.getItem(AUTH_KEY) !== '1') { nav({ to: '/admin/pages' }); return; }
    (async () => {
      try {
        const p = await get({ data: { password: currentPass(), slug } });
        if (!p) { setErr('הדף לא קיים'); setLoaded(true); return; }
        setPage({
          ...p,
          branches: Array.isArray(p.branches) ? p.branches : [],
          images: Array.isArray(p.images) ? p.images : [],
          theme: p.theme || {},
        });
        setLoaded(true);
      } catch (e: any) { setErr(e?.message || 'שגיאה'); setLoaded(true); }
    })();
  }, [slug]);

  const update = (patch: any) => setPage((p: any) => ({ ...p, ...patch }));

  const handleSave = async () => {
    setErr(''); setSaved(false);
    try {
      await save({
        data: {
          password: currentPass(),
          page: {
            slug: page.slug,
            title: page.title || '',
            subtitle: page.subtitle || '',
            meta_description: page.meta_description || '',
            hero_heading: page.hero_heading || '',
            hero_sub: page.hero_sub || '',
            cta_text: page.cta_text || 'השאירי פרטים',
            zapier_webhook_url: page.zapier_webhook_url || '',
            branches: page.branches || [],
            images: page.images || [],
            body_html: page.body_html || '',
            theme: page.theme || {},
            is_published: !!page.is_published,
          },
        },
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 1800);
    } catch (e: any) { setErr(e?.message || 'שמירה נכשלה'); }
  };

  const handleTest = async () => {
    setTestStatus('שולח...');
    try {
      const r = await test({ data: { password: currentPass(), slug } });
      setTestStatus(`✓ נשלח (status ${(r as any).status})`);
    } catch (e: any) { setTestStatus('✗ ' + (e?.message || '')); }
  };

  if (!loaded) return <div dir="rtl" style={S.page}><div style={S.container}>טוען...</div></div>;
  if (!page) return <div dir="rtl" style={S.page}><div style={S.container}>{err || 'שגיאה'}</div></div>;

  return (
    <div dir="rtl" style={S.page}>
      <div style={S.container}>
        <header style={S.header}>
          <div>
            <h1 style={S.h1}>עריכת דף: <span style={{ fontFamily: 'monospace', direction: 'ltr', display: 'inline-block' }}>{slug}</span></h1>
            <p style={S.sub}>כתובת ציבורית: <a href={`/lp/${slug}`} target="_blank" rel="noreferrer" style={S.link}>/lp/{slug}</a></p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <Link to="/admin/pages" style={S.btnGhost}>חזרה לרשימה</Link>
            <button onClick={handleSave} style={S.btnPrimary}>{saved ? '✓ נשמר' : 'שמירה'}</button>
          </div>
        </header>

        {err && <div style={{ ...S.card, color: '#fca5a5' }}>{err}</div>}

        <section style={S.card}>
          <h2 style={S.h2}>סטטוס פרסום</h2>
          <label style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 10 }}>
            <input type="checkbox" checked={!!page.is_published} onChange={(e) => update({ is_published: e.target.checked })} />
            הדף מפורסם (זמין בכתובת /lp/{slug})
          </label>
        </section>

        <section style={S.card}>
          <h2 style={S.h2}>חיבור ל-Zapier (וובהוק ייחודי לדף הזה)</h2>
          <div style={{ display: 'flex', gap: 8, marginTop: 10, flexWrap: 'wrap' }}>
            <input
              value={page.zapier_webhook_url || ''}
              onChange={(e) => update({ zapier_webhook_url: e.target.value })}
              placeholder="https://hooks.zapier.com/hooks/catch/..."
              style={{ ...S.input, flex: 1, direction: 'ltr', textAlign: 'left' }}
            />
            <button onClick={handleSave} style={S.btnPrimary}>שמירה</button>
            <button onClick={handleTest} style={S.btnGhost}>שליחת בדיקה</button>
          </div>
          {testStatus && <p style={{ ...S.sub, marginTop: 8 }}>{testStatus}</p>}
        </section>

        <section style={S.card}>
          <h2 style={S.h2}>תוכן הדף</h2>
          <Field label="כותרת קטנה (eyebrow / בשיתוף...)" v={page.subtitle} on={(v) => update({ subtitle: v })} />
          <Field label="כותרת מותג" v={page.title} on={(v) => update({ title: v })} />
          <Field label="כותרת ראשית (H1)" v={page.hero_heading} on={(v) => update({ hero_heading: v })} />
          <FieldArea label="תיאור" v={page.hero_sub} on={(v) => update({ hero_sub: v })} />
          <Field label="טקסט כפתור CTA" v={page.cta_text} on={(v) => update({ cta_text: v })} />
          <Field label="meta description (SEO)" v={page.meta_description} on={(v) => update({ meta_description: v })} />
        </section>

        <section style={S.card}>
          <h2 style={S.h2}>סניפים בטופס (אחד בכל שורה)</h2>
          <textarea
            value={(page.branches || []).join('\n')}
            onChange={(e) => update({ branches: e.target.value.split('\n').map((s) => s.trim()).filter(Boolean) })}
            placeholder={'תל אביב\nירושלים\nחיפה'}
            style={{ ...S.input, width: '100%', minHeight: 120, fontFamily: 'inherit' }}
          />
        </section>

        <section style={S.card}>
          <h2 style={S.h2}>תמונות (URL אחד בכל שורה)</h2>
          <textarea
            value={(page.images || []).join('\n')}
            onChange={(e) => update({ images: e.target.value.split('\n').map((s) => s.trim()).filter(Boolean) })}
            placeholder={'https://...image1.jpg\nhttps://...image2.jpg'}
            style={{ ...S.input, width: '100%', minHeight: 100, direction: 'ltr', textAlign: 'left', fontFamily: 'monospace', fontSize: 13 }}
          />
        </section>

        <section style={S.card}>
          <h2 style={S.h2}>תוכן HTML חופשי (אופציונלי)</h2>
          <p style={S.sub}>אפשר להדביק כאן HTML מותאם לתוכן נוסף (יוצג מעל הטופס).</p>
          <textarea
            value={page.body_html || ''}
            onChange={(e) => update({ body_html: e.target.value })}
            placeholder="<p>תוכן נוסף...</p>"
            style={{ ...S.input, width: '100%', minHeight: 200, direction: 'ltr', textAlign: 'left', fontFamily: 'monospace', fontSize: 13 }}
          />
        </section>

        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginBottom: 30 }}>
          <button onClick={handleSave} style={S.btnPrimary}>{saved ? '✓ נשמר' : 'שמירת כל השינויים'}</button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, v, on }: { label: string; v: string; on: (v: string) => void }) {
  return (
    <label style={{ display: 'block', marginBottom: 12 }}>
      <div style={{ fontSize: 13, color: '#a89991', marginBottom: 5 }}>{label}</div>
      <input value={v || ''} onChange={(e) => on(e.target.value)} style={{ ...S.input, width: '100%' }} />
    </label>
  );
}
function FieldArea({ label, v, on }: { label: string; v: string; on: (v: string) => void }) {
  return (
    <label style={{ display: 'block', marginBottom: 12 }}>
      <div style={{ fontSize: 13, color: '#a89991', marginBottom: 5 }}>{label}</div>
      <textarea value={v || ''} onChange={(e) => on(e.target.value)} style={{ ...S.input, width: '100%', minHeight: 80, fontFamily: 'inherit' }} />
    </label>
  );
}

const S: Record<string, React.CSSProperties> = {
  page: { minHeight: '100vh', background: '#0f0a0a', color: '#f5ebe6', fontFamily: 'system-ui, sans-serif', padding: '24px 16px' },
  container: { maxWidth: 980, margin: '0 auto' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 22, gap: 12, flexWrap: 'wrap' },
  h1: { fontSize: 24, fontWeight: 700, margin: 0, color: '#fff' },
  h2: { fontSize: 18, fontWeight: 700, margin: 0, color: '#fff' },
  sub: { margin: '6px 0 0', color: '#a89991', fontSize: 14 },
  card: { background: '#1a1212', border: '1px solid #2d2020', borderRadius: 14, padding: 20, marginBottom: 18 },
  input: { background: '#0f0a0a', border: '1px solid #3a2828', color: '#f5ebe6', padding: '10px 14px', borderRadius: 10, fontSize: 14, outline: 'none' },
  btnPrimary: { background: 'linear-gradient(135deg,#c9a679,#a8855b)', color: '#1a0f0f', border: 'none', padding: '10px 18px', borderRadius: 10, fontWeight: 700, cursor: 'pointer', fontSize: 14 },
  btnGhost: { background: 'transparent', color: '#c9a679', border: '1px solid #c9a679', padding: '10px 18px', borderRadius: 10, fontWeight: 600, cursor: 'pointer', fontSize: 14, textDecoration: 'none', display: 'inline-block' },
  link: { color: '#c9a679' },
};
