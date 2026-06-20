import { createFileRoute, Link } from '@tanstack/react-router';
import { useServerFn } from '@tanstack/react-start';
import { useEffect, useState } from 'react';
import { listLeads, deleteLead, getZapierHook, saveZapierHook } from '@/lib/leads.functions';

export const Route = createFileRoute('/admin/leads')({
  component: AdminLeads,
  head: () => ({ meta: [{ title: 'לידים — דף הבית' }, { name: 'robots', content: 'noindex,nofollow' }] }),
});

const AUTH_KEY = 'mua_admin_auth';
const PASS_KEY = 'mua_admin_pass';
const ADMIN_PASS = 'makeup2026';

function AdminLeads() {
  const [authed, setAuthed] = useState(false);
  const [pass, setPass] = useState('');
  const [leads, setLeads] = useState<any[]>([]);
  const [hook, setHook] = useState('');
  const [hookSaved, setHookSaved] = useState('');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');
  const list = useServerFn(listLeads);
  const del = useServerFn(deleteLead);
  const getHook = useServerFn(getZapierHook);
  const saveHook = useServerFn(saveZapierHook);

  const currentPass = () => sessionStorage.getItem(PASS_KEY) || '';

  const refresh = async (p: string) => {
    setLoading(true); setErr('');
    try {
      const [rows, h] = await Promise.all([
        list({ data: { password: p } }),
        getHook(),
      ]);
      setLeads(rows as any[]);
      setHook((h as any)?.value || '');
    } catch (e: any) { setErr(e?.message || 'שגיאה'); }
    finally { setLoading(false); }
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (sessionStorage.getItem(AUTH_KEY) === '1') {
      const p = currentPass();
      if (p) { setAuthed(true); refresh(p); }
    }
  }, []);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pass !== ADMIN_PASS) return alert('סיסמה שגויה');
    sessionStorage.setItem(AUTH_KEY, '1');
    sessionStorage.setItem(PASS_KEY, pass);
    setAuthed(true);
    await refresh(pass);
  };

  const saveWebhook = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await saveHook({ data: { password: currentPass(), value: hook } });
      setHookSaved('נשמר ✓');
      setTimeout(() => setHookSaved(''), 2500);
    } catch (e: any) { alert('שגיאה: ' + (e?.message || '')); }
  };

  const remove = async (id: string) => {
    if (!confirm('למחוק את הליד?')) return;
    try { await del({ data: { password: currentPass(), id } }); await refresh(currentPass()); }
    catch (e: any) { alert('שגיאה: ' + (e?.message || '')); }
  };

  if (!authed) {
    return (
      <div dir="rtl" style={S.loginWrap}>
        <form onSubmit={login} style={S.loginBox}>
          <h1 style={S.loginTitle}>לידים — דף הבית</h1>
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
            <h1 style={S.h1}>לידים — דף הבית הקלאסי</h1>
            <p style={S.sub}>הלידים שמתקבלים מהדף הראשי (/) והוובוק הגלובלי שלו</p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <Link to="/admin/pages" style={S.btnGhost}>דפי נחיתה</Link>
            <button onClick={() => refresh(currentPass())} style={S.btnGhost}>{loading ? 'טוען...' : 'רענון'}</button>
          </div>
        </header>

        {err && <div style={{ ...S.card, color: '#fca5a5' }}>{err}</div>}

        <section style={S.card}>
          <h2 style={S.h2}>Zapier Webhook (גלובלי — לדף הראשי /)</h2>
          <p style={S.cardSub}>הכתובת הזו מקבלת את הלידים שנשלחים מהדף הראשי. לכל דף נחיתה ב-/lp/&lt;slug&gt; יש וובוק נפרד שמוגדר בעריכת הדף.</p>
          <form onSubmit={saveWebhook} style={{ display: 'flex', gap: 8, marginTop: 12 }}>
            <input
              value={hook}
              onChange={(e) => setHook(e.target.value)}
              placeholder="https://hooks.zapier.com/hooks/catch/..."
              style={{ ...S.input, flex: 1, direction: 'ltr', textAlign: 'left' }}
            />
            <button type="submit" style={S.btnPrimary}>שמירה</button>
          </form>
          {hookSaved && <p style={{ color: '#86efac', marginTop: 8, fontSize: 13 }}>{hookSaved}</p>}
        </section>

        <section style={S.card}>
          <h2 style={S.h2}>לידים ({leads.length})</h2>
          {leads.length === 0 ? (
            <div style={S.empty}>אין לידים עדיין</div>
          ) : (
            <table style={S.table}>
              <thead>
                <tr>
                  <th style={S.th}>תאריך</th>
                  <th style={S.th}>שם</th>
                  <th style={S.th}>טלפון</th>
                  <th style={S.th}>סניף</th>
                  <th style={S.th}>מקור</th>
                  <th style={S.th}></th>
                </tr>
              </thead>
              <tbody>
                {leads.map((l) => (
                  <tr key={l.id}>
                    <td style={S.td}>{new Date(l.created_at).toLocaleString('he-IL')}</td>
                    <td style={S.td}>{l.name}</td>
                    <td style={{ ...S.td, direction: 'ltr', textAlign: 'right' }}>{l.phone}</td>
                    <td style={S.td}>{l.branch}</td>
                    <td style={S.td}>{l.source || '—'}</td>
                    <td style={S.td}>
                      <button onClick={() => remove(l.id)} style={S.btnTiny}>מחיקה</button>
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
  table: { width: '100%', borderCollapse: 'collapse', fontSize: 14 },
  th: { textAlign: 'right', padding: '12px 10px', color: '#a89991', fontWeight: 600, fontSize: 12, borderBottom: '1px solid #2d2020' },
  td: { padding: '14px 10px', borderBottom: '1px solid #221818' },
  empty: { padding: 40, textAlign: 'center', color: '#a89991' },
  loginWrap: { minHeight: '100vh', background: '#0f0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 },
  loginBox: { background: '#1a1212', border: '1px solid #2d2020', borderRadius: 14, padding: 32, width: '100%', maxWidth: 380, textAlign: 'center', display: 'grid', gap: 12 },
  loginTitle: { fontSize: 22, margin: 0, color: '#fff' },
};
