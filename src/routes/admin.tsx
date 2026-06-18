import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useMemo, useState } from 'react';
import { useServerFn } from '@tanstack/react-start';
import { listLeads, deleteLead as deleteLeadFn, clearLeads as clearLeadsFn, getZapierHook, saveZapierHook } from '@/lib/leads.functions';

export const Route = createFileRoute('/admin')({
  component: AdminPage,
  head: () => ({ meta: [{ title: 'ניהול לידים' }, { name: 'robots', content: 'noindex,nofollow' }] }),
});

type Lead = {
  id: string;
  name: string;
  phone: string;
  branch: string;
  source: string | null;
  created_at: string;
};

const HOOK_KEY = 'mua_zapier_webhook';
const AUTH_KEY = 'mua_admin_auth';
const PASS_KEY = 'mua_admin_pass';
const ADMIN_PASS = 'makeup2026';

function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [pass, setPass] = useState('');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState('');
  const [hook, setHook] = useState('');
  const [hookSaved, setHookSaved] = useState(false);
  const [query, setQuery] = useState('');
  const [branchFilter, setBranchFilter] = useState('');
  const [testStatus, setTestStatus] = useState<string>('');

  const list = useServerFn(listLeads);
  const del = useServerFn(deleteLeadFn);
  const clearAllFn = useServerFn(clearLeadsFn);
  const getHook = useServerFn(getZapierHook);
  const saveHookFn = useServerFn(saveZapierHook);

  const refresh = async (password: string) => {
    setLoading(true);
    setLoadError('');
    try {
      const rows = await list({ data: { password } });
      setLeads(rows as Lead[]);
    } catch (e: any) {
      setLoadError(e?.message || 'שגיאת טעינה');
    } finally {
      setLoading(false);
    }
  };

  const loadHook = async () => {
    try {
      const r = await getHook();
      setHook((r as { value: string }).value || '');
    } catch {}
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    loadHook();
    if (sessionStorage.getItem(AUTH_KEY) === '1') {
      const p = sessionStorage.getItem(PASS_KEY) || '';
      if (p) {
        setAuthed(true);
        refresh(p);
      }
    }
  }, []);

  const branches = useMemo(() => {
    const s = new Set<string>();
    leads.forEach((l) => l.branch && s.add(l.branch));
    return Array.from(s);
  }, [leads]);

  const filtered = useMemo(() => {
    const q = query.trim();
    return leads.filter((l) => {
      if (branchFilter && l.branch !== branchFilter) return false;
      if (!q) return true;
      return l.name.includes(q) || l.phone.includes(q) || l.branch.includes(q);
    });
  }, [leads, query, branchFilter]);

  const tryLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pass !== ADMIN_PASS) {
      alert('סיסמה שגויה');
      return;
    }
    sessionStorage.setItem(AUTH_KEY, '1');
    sessionStorage.setItem(PASS_KEY, pass);
    setAuthed(true);
    await refresh(pass);
  };

  const currentPass = () => sessionStorage.getItem(PASS_KEY) || '';

  const saveHook = () => {
    localStorage.setItem(HOOK_KEY, hook.trim());
    setHookSaved(true);
    setTimeout(() => setHookSaved(false), 1800);
  };

  const testHook = async () => {
    if (!hook.trim()) return setTestStatus('יש להזין כתובת Webhook');
    setTestStatus('שולח...');
    try {
      await fetch(hook.trim(), {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          test: true,
          name: 'בדיקה',
          phone: '0500000000',
          branch: 'בדיקה',
          createdAt: new Date().toISOString(),
        }),
      });
      setTestStatus('✓ נשלח! בדוק את היסטוריית ה-Zap ב-Zapier');
    } catch {
      setTestStatus('✗ שליחה נכשלה');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('למחוק ליד זה?')) return;
    try {
      await del({ data: { password: currentPass(), id } });
      setLeads((prev) => prev.filter((l) => l.id !== id));
    } catch (e: any) {
      alert('שגיאה: ' + (e?.message || 'מחיקה נכשלה'));
    }
  };

  const handleClearAll = async () => {
    if (!confirm('למחוק את כל הלידים? פעולה זו לא הפיכה.')) return;
    try {
      await clearAllFn({ data: { password: currentPass() } });
      setLeads([]);
    } catch (e: any) {
      alert('שגיאה: ' + (e?.message || 'מחיקה נכשלה'));
    }
  };

  const exportCSV = () => {
    const rows = [['תאריך', 'שם', 'טלפון', 'סניף', 'מקור']];
    filtered.forEach((l) =>
      rows.push([
        new Date(l.created_at).toLocaleString('he-IL'),
        l.name,
        l.phone,
        l.branch,
        l.source || '',
      ]),
    );
    const csv = '\uFEFF' + rows.map((r) => r.map((c) => `"${(c || '').replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!authed) {
    return (
      <div dir="rtl" style={S.loginWrap}>
        <form onSubmit={tryLogin} style={S.loginBox}>
          <h1 style={S.loginTitle}>ניהול לידים</h1>
          <p style={S.loginSub}>הזיני סיסמה כדי להיכנס</p>
          <input
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            placeholder="סיסמה"
            style={S.input}
            autoFocus
          />
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
            <h1 style={S.h1}>ניהול לידים</h1>
            <p style={S.sub}>{leads.length} לידים בסך הכל · מוצגים {filtered.length}</p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => refresh(currentPass())} style={S.btnGhost}>{loading ? 'טוען...' : 'רענון'}</button>
            <button
              onClick={() => { sessionStorage.removeItem(AUTH_KEY); sessionStorage.removeItem(PASS_KEY); setAuthed(false); }}
              style={S.btnGhost}
            >יציאה</button>
          </div>
        </header>

        {loadError && <div style={{ ...S.card, color: '#fca5a5' }}>{loadError}</div>}

        <section style={S.card}>
          <h2 style={S.h2}>חיבור ל-Zapier (אופציונלי)</h2>
          <p style={S.cardSub}>הלידים כבר נשמרים במסד הנתונים. ה-Webhook משמש להעברה אוטומטית ל-Google Sheets / מייל / WhatsApp.</p>
          <div style={S.row}>
            <input
              type="url"
              value={hook}
              onChange={(e) => setHook(e.target.value)}
              placeholder="https://hooks.zapier.com/hooks/catch/..."
              style={{ ...S.input, flex: 1, direction: 'ltr', textAlign: 'left' }}
            />
            <button onClick={saveHook} style={S.btnPrimary}>{hookSaved ? '✓ נשמר' : 'שמירה'}</button>
            <button onClick={testHook} style={S.btnGhost}>שליחת בדיקה</button>
          </div>
          {testStatus && <p style={{ ...S.cardSub, marginTop: 10 }}>{testStatus}</p>}
        </section>

        <section style={S.card}>
          <div style={S.toolbar}>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="חיפוש לפי שם / טלפון / סניף..."
              style={{ ...S.input, flex: 1 }}
            />
            <select value={branchFilter} onChange={(e) => setBranchFilter(e.target.value)} style={S.input}>
              <option value="">כל הסניפים</option>
              {branches.map((b) => <option key={b} value={b}>{b}</option>)}
            </select>
            <button onClick={exportCSV} style={S.btnPrimary}>ייצוא CSV</button>
            <button onClick={handleClearAll} style={S.btnDanger}>מחיקת הכל</button>
          </div>

          {filtered.length === 0 ? (
            <div style={S.empty}>{loading ? 'טוען...' : 'אין לידים להצגה'}</div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={S.table}>
                <thead>
                  <tr>
                    <th style={S.th}>תאריך</th>
                    <th style={S.th}>שם</th>
                    <th style={S.th}>טלפון</th>
                    <th style={S.th}>סניף</th>
                    <th style={S.th}></th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((l) => (
                    <tr key={l.id} style={S.tr}>
                      <td style={S.td}>{new Date(l.created_at).toLocaleString('he-IL')}</td>
                      <td style={{ ...S.td, fontWeight: 600 }}>{l.name}</td>
                      <td style={S.td}>
                        <a href={`tel:${l.phone}`} style={S.link}>{l.phone}</a>
                        {' · '}
                        <a href={`https://wa.me/972${l.phone.replace(/^0/, '')}`} target="_blank" rel="noreferrer" style={S.link}>WhatsApp</a>
                      </td>
                      <td style={S.td}>{l.branch}</td>
                      <td style={S.td}>
                        <button onClick={() => handleDelete(l.id)} style={S.btnTiny}>מחיקה</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <p style={S.note}>
          ✓ הלידים נשמרים במסד נתונים מרכזי בענן — נגישים מכל מכשיר. בנוסף ניתן לחבר Zapier להעברה אוטומטית ל-Google Sheets / מייל / WhatsApp.
        </p>
      </div>
    </div>
  );
}

const S: Record<string, React.CSSProperties> = {
  page: { minHeight: '100vh', background: '#0f0a0a', color: '#f5ebe6', fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif', padding: '24px 16px' },
  container: { maxWidth: 1100, margin: '0 auto' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 22, gap: 12, flexWrap: 'wrap' },
  h1: { fontSize: 28, fontWeight: 700, margin: 0, color: '#fff' },
  h2: { fontSize: 18, fontWeight: 700, margin: '0 0 6px', color: '#fff' },
  sub: { margin: '6px 0 0', color: '#a89991', fontSize: 14 },
  cardSub: { margin: '4px 0 12px', color: '#a89991', fontSize: 14, lineHeight: 1.7 },
  card: { background: '#1a1212', border: '1px solid #2d2020', borderRadius: 14, padding: 20, marginBottom: 18 },
  row: { display: 'flex', gap: 8, flexWrap: 'wrap' },
  toolbar: { display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' },
  input: { background: '#0f0a0a', border: '1px solid #3a2828', color: '#f5ebe6', padding: '10px 14px', borderRadius: 10, fontSize: 14, outline: 'none', minWidth: 120 },
  btnPrimary: { background: 'linear-gradient(135deg,#c9a679,#a8855b)', color: '#1a0f0f', border: 'none', padding: '10px 18px', borderRadius: 10, fontWeight: 700, cursor: 'pointer', fontSize: 14 },
  btnGhost: { background: 'transparent', color: '#c9a679', border: '1px solid #c9a679', padding: '10px 18px', borderRadius: 10, fontWeight: 600, cursor: 'pointer', fontSize: 14 },
  btnDanger: { background: 'transparent', color: '#fca5a5', border: '1px solid #7a3030', padding: '10px 18px', borderRadius: 10, fontWeight: 600, cursor: 'pointer', fontSize: 14 },
  btnTiny: { background: 'transparent', color: '#fca5a5', border: '1px solid #7a3030', padding: '5px 12px', borderRadius: 8, cursor: 'pointer', fontSize: 12 },
  table: { width: '100%', borderCollapse: 'collapse', fontSize: 14 },
  th: { textAlign: 'right', padding: '12px 10px', color: '#a89991', fontWeight: 600, fontSize: 12, textTransform: 'uppercase', letterSpacing: '.05em', borderBottom: '1px solid #2d2020' },
  td: { padding: '14px 10px', borderBottom: '1px solid #221818' },
  tr: {},
  link: { color: '#c9a679', textDecoration: 'none' },
  empty: { padding: 40, textAlign: 'center', color: '#a89991' },
  note: { textAlign: 'center', color: '#a89991', fontSize: 13, lineHeight: 1.7, margin: '20px 0 0' },
  loginWrap: { minHeight: '100vh', background: '#0f0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, fontFamily: 'system-ui, sans-serif' },
  loginBox: { background: '#1a1212', border: '1px solid #2d2020', borderRadius: 14, padding: 32, width: '100%', maxWidth: 380, textAlign: 'center' },
  loginTitle: { fontSize: 24, margin: '0 0 6px', color: '#fff' },
  loginSub: { color: '#a89991', margin: '0 0 20px', fontSize: 14 },
};
