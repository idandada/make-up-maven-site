import { createFileRoute, Link } from '@tanstack/react-router';
import { useServerFn } from '@tanstack/react-start';
import { useEffect, useState } from 'react';
import { listPages, deletePage, upsertPage } from '@/lib/landing-pages.functions';

export const Route = createFileRoute('/admin/pages')({
  component: AdminPagesList,
  head: () => ({ meta: [{ title: 'ניהול דפי נחיתה' }, { name: 'robots', content: 'noindex,nofollow' }] }),
});

const AUTH_KEY = 'mua_admin_auth';
const PASS_KEY = 'mua_admin_pass';
const ADMIN_PASS = 'makeup2026';

function AdminPagesList() {
  const [authed, setAuthed] = useState(false);
  const [pass, setPass] = useState('');
  const [pages, setPages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');
  const [newSlug, setNewSlug] = useState('');
  const list = useServerFn(listPages);
  const del = useServerFn(deletePage);
  const upsert = useServerFn(upsertPage);

  const currentPass = () => sessionStorage.getItem(PASS_KEY) || '';

  const refresh = async (p: string) => {
    setLoading(true); setErr('');
    try {
      const rows = await list({ data: { password: p } });
      setPages(rows as any[]);
    } catch (e: any) { setErr(e?.message || 'שגיאה'); }
    finally { setLoading(false); }
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const p = sessionStorage.getItem(AUTH_KEY) === '1' ? currentPass() : '';
    if (p) { setAuthed(true); refresh(p); }
  }, []);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pass !== ADMIN_PASS) return alert('סיסמה שגויה');
    sessionStorage.setItem(AUTH_KEY, '1');
    sessionStorage.setItem(PASS_KEY, pass);
    setAuthed(true);
    await refresh(pass);
  };

  const createPage = async (e: React.FormEvent) => {
    e.preventDefault();
    const slug = newSlug.trim().toLowerCase();
    if (!/^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(slug)) return alert('slug חייב להיות אותיות אנגלית קטנות / מספרים / מקפים');
    try {
      await upsert({
        data: {
          password: currentPass(),
          page: {
            slug,
            title: 'דף חדש',
            subtitle: '',
            meta_description: '',
            hero_heading: '',
            hero_sub: '',
            cta_text: 'השאירי פרטים',
            zapier_webhook_url: '',
            branches: [],
            images: [],
            body_html: '',
            theme: {},
            is_published: false,
          },
        },
      });
      setNewSlug('');
      await refresh(currentPass());
    } catch (e: any) { alert('יצירה נכשלה: ' + (e?.message || '')); }
  };

  const remove = async (slug: string) => {
    if (!confirm(`למחוק את הדף ${slug}?`)) return;
    try { await del({ data: { password: currentPass(), slug } }); await refresh(currentPass()); }
    catch (e: any) { alert('שגיאה: ' + (e?.message || '')); }
  };

  if (!authed) {
    return (
      <div dir="rtl" style={S.loginWrap}>
        <form onSubmit={login} style={S.loginBox}>
          <h1 style={S.loginTitle}>ניהול דפי נחיתה</h1>
          <input type="password" value={pass} onChange={(e) => setPass(e.target.value)} placeholder="סיסמה" style={S.input} autoFocus />
          <button type="submit" style={S.btnPrimary}>כניסה</button>
        </form>
      </div>
    );
  }

  return (
    <div dir="rtl" style={S.page}>
      <div style={S.container}>
        <header style={S.header}>
          <div>
            <h1 style={S.h1}>דפי נחיתה</h1>
            <p style={S.sub}>{pages.length} דפים סך הכל</p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <Link to="/admin/leads" style={S.btnGhost}>לידים (דף ראשי)</Link>
            <button onClick={() => refresh(currentPass())} style={S.btnGhost}>{loading ? 'טוען...' : 'רענון'}</button>
          </div>
        </header>

        {err && <div style={{ ...S.card, color: '#fca5a5' }}>{err}</div>}

        <section style={S.card}>
          <h2 style={S.h2}>צרי דף חדש</h2>
          <form onSubmit={createPage} style={{ display: 'flex', gap: 8, marginTop: 10 }}>
            <input
              value={newSlug}
              onChange={(e) => setNewSlug(e.target.value)}
              placeholder="slug (לדוגמה: makeup-tlv)"
              style={{ ...S.input, flex: 1, direction: 'ltr', textAlign: 'left' }}
            />
            <button type="submit" style={S.btnPrimary}>צרי</button>
          </form>
          <p style={S.cardSub}>הדף החדש ייווצר כטיוטה לא מפורסמת. הכתובת תהיה <code>/lp/&lt;slug&gt;</code>.</p>
        </section>

        <section style={S.card}>
          {pages.length === 0 ? (
            <div style={S.empty}>אין דפים עדיין</div>
          ) : (
            <table style={S.table}>
              <thead>
                <tr>
                  <th style={S.th}>Slug</th>
                  <th style={S.th}>כותרת</th>
                  <th style={S.th}>סטטוס</th>
                  <th style={S.th}>Zapier</th>
                  <th style={S.th}>עודכן</th>
                  <th style={S.th}></th>
                </tr>
              </thead>
              <tbody>
                {pages.map((p) => (
                  <tr key={p.id} style={S.tr}>
                    <td style={{ ...S.td, direction: 'ltr', fontFamily: 'monospace' }}>{p.slug}</td>
                    <td style={S.td}>{p.title || '—'}</td>
                    <td style={S.td}>
                      <span style={{
                        fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 999,
                        background: p.is_published ? 'rgba(74,222,128,.15)' : 'rgba(252,165,165,.12)',
                        color: p.is_published ? '#86efac' : '#fca5a5',
                      }}>{p.is_published ? 'מפורסם' : 'טיוטה'}</span>
                    </td>
                    <td style={S.td}>{p.zapier_webhook_url ? '● מחובר' : '○ אין'}</td>
                    <td style={S.td}>{new Date(p.updated_at).toLocaleString('he-IL')}</td>
                    <td style={S.td}>
                      <Link to="/admin/pages/$slug" params={{ slug: p.slug }} style={S.linkBtn}>עריכה</Link>{' · '}
                      <a href={`/lp/${p.slug}`} target="_blank" rel="noreferrer" style={S.linkBtn}>צפייה</a>{' · '}
                      <button onClick={() => remove(p.slug)} style={S.btnTiny}>מחיקה</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </div>
    </div>
  );
}

const S: Record<string, React.CSSProperties> = {
  page: { minHeight: '100vh', background: '#0f0a0a', color: '#f5ebe6', fontFamily: 'system-ui, sans-serif', padding: '24px 16px' },
  container: { maxWidth: 1100, margin: '0 auto' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 22, gap: 12, flexWrap: 'wrap' },
  h1: { fontSize: 28, fontWeight: 700, margin: 0, color: '#fff' },
  h2: { fontSize: 18, fontWeight: 700, margin: 0, color: '#fff' },
  sub: { margin: '6px 0 0', color: '#a89991', fontSize: 14 },
  cardSub: { margin: '8px 0 0', color: '#a89991', fontSize: 13 },
  card: { background: '#1a1212', border: '1px solid #2d2020', borderRadius: 14, padding: 20, marginBottom: 18 },
  input: { background: '#0f0a0a', border: '1px solid #3a2828', color: '#f5ebe6', padding: '10px 14px', borderRadius: 10, fontSize: 14, outline: 'none', minWidth: 120 },
  btnPrimary: { background: 'linear-gradient(135deg,#c9a679,#a8855b)', color: '#1a0f0f', border: 'none', padding: '10px 18px', borderRadius: 10, fontWeight: 700, cursor: 'pointer', fontSize: 14 },
  btnGhost: { background: 'transparent', color: '#c9a679', border: '1px solid #c9a679', padding: '10px 18px', borderRadius: 10, fontWeight: 600, cursor: 'pointer', fontSize: 14, textDecoration: 'none', display: 'inline-block' },
  btnTiny: { background: 'transparent', color: '#fca5a5', border: '1px solid #7a3030', padding: '4px 10px', borderRadius: 8, cursor: 'pointer', fontSize: 12 },
  linkBtn: { color: '#c9a679', textDecoration: 'none', fontSize: 13 },
  table: { width: '100%', borderCollapse: 'collapse', fontSize: 14 },
  th: { textAlign: 'right', padding: '12px 10px', color: '#a89991', fontWeight: 600, fontSize: 12, borderBottom: '1px solid #2d2020' },
  td: { padding: '14px 10px', borderBottom: '1px solid #221818' },
  tr: {},
  empty: { padding: 40, textAlign: 'center', color: '#a89991' },
  loginWrap: { minHeight: '100vh', background: '#0f0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 },
  loginBox: { background: '#1a1212', border: '1px solid #2d2020', borderRadius: 14, padding: 32, width: '100%', maxWidth: 380, textAlign: 'center', display: 'grid', gap: 12 },
  loginTitle: { fontSize: 22, margin: 0, color: '#fff' },
};
