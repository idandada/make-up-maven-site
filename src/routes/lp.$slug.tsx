import { createFileRoute, notFound } from '@tanstack/react-router';
import { useServerFn } from '@tanstack/react-start';
import { useEffect, useState } from 'react';
import { getPublishedPage, submitLandingLead } from '@/lib/landing-pages.functions';

export const Route = createFileRoute('/lp/$slug')({
  component: LandingPageView,
  head: ({ loaderData }) => ({
    meta: [
      { title: (loaderData as any)?.title || 'דף נחיתה' },
      { name: 'description', content: (loaderData as any)?.meta_description || '' },
    ],
  }),
  loader: async ({ params }) => {
    try {
      const page = await getPublishedPage({ data: { slug: params.slug } });
      return page;
    } catch {
      throw notFound();
    }
  },
  notFoundComponent: () => (
    <div dir="rtl" style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#0a0606', color: '#f5ecea', fontFamily: 'system-ui', padding: 24, textAlign: 'center' }}>
      <div>
        <h1 style={{ fontSize: 28, marginBottom: 10 }}>הדף לא נמצא</h1>
        <p style={{ color: '#a89993' }}>ייתכן שהדף לא קיים או טרם פורסם.</p>
      </div>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div dir="rtl" style={{ padding: 24, color: '#fca5a5', fontFamily: 'system-ui' }}>שגיאה: {String(error?.message || error)}</div>
  ),
});

type Page = Awaited<ReturnType<typeof getPublishedPage>>;

function LandingPageView() {
  const page = Route.useLoaderData() as Page;
  const submit = useServerFn(submitLandingLead);
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'err'>('idle');
  const [err, setErr] = useState('');

  const branches: string[] = Array.isArray((page as any).branches) ? (page as any).branches : [];
  const images: string[] = Array.isArray((page as any).images) ? (page as any).images : [];

  // Meta Pixel — load base code once
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if ((window as any).fbq) return;
    const s = document.createElement('script');
    s.innerHTML = `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','1477108497508059');fbq('track','PageView');`;
    document.head.appendChild(s);
  }, []);

  // Meta Pixel — fire Lead event on successful submission
  useEffect(() => {
    if (status === 'done' && typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'Lead');
    }
  }, [status]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErr('');
    const f = e.currentTarget;
    const name = (f.elements.namedItem('name') as HTMLInputElement).value.trim();
    const phone = (f.elements.namedItem('phone') as HTMLInputElement).value.replace(/[\s-]/g, '');
    const branch = (f.elements.namedItem('branch') as HTMLSelectElement).value;

    const hebrewNameRe = /^[\u0590-\u05FF]{2,}(?:[ '\-][\u0590-\u05FF]{2,})*$/;
    if (!hebrewNameRe.test(name)) { setErr('יש להזין שם בעברית'); return; }
    if (!/^05\d{8}$/.test(phone)) { setErr('מספר טלפון לא תקין (10 ספרות מתחיל ב-05)'); return; }
    if (!branch) { setErr('יש לבחור סניף'); return; }

    setStatus('sending');
    try {
      await submit({ data: { slug: (page as any).slug, name, phone, branch } });
      setStatus('done');
    } catch (e: any) {
      setStatus('err');
      setErr(e?.message || 'שליחה נכשלה');
    }
  };

  useEffect(() => { document.documentElement.dir = 'rtl'; }, []);

  return (
    <div dir="rtl" style={S.page}>
      <div style={S.wrap}>
        {(page as any).subtitle && <div style={S.eyebrow}>{(page as any).subtitle}</div>}
        {(page as any).title && <h1 style={S.brandTitle}>{(page as any).title}</h1>}
        {(page as any).hero_heading && <h2 style={S.h1}>{(page as any).hero_heading}</h2>}
        {(page as any).hero_sub && <p style={S.sub}>{(page as any).hero_sub}</p>}

        {images.length > 0 && (
          <div style={S.gallery}>
            {images.slice(0, 6).map((src, i) => (
              <img key={i} src={src} alt="" style={S.img} loading="lazy" />
            ))}
          </div>
        )}

        {(page as any).body_html && (
          <div style={S.bodyHtml} dangerouslySetInnerHTML={{ __html: (page as any).body_html }} />
        )}

        {status === 'done' ? (
          <div style={S.successCard}>
            <div style={S.successIcon}>✓</div>
            <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>תודה שהשארת לנו פרטים!</div>
            <div style={{ color: '#d4c4c0' }}>נציגה תחזור אלייך בהקדם 💕</div>
          </div>
        ) : (
          <form onSubmit={onSubmit} style={S.form}>
            <input name="name" placeholder="שם מלא" required style={S.input} />
            <input name="phone" placeholder="טלפון (05XXXXXXXX)" required style={S.input} inputMode="tel" />
            <select name="branch" required defaultValue="" style={S.input}>
              <option value="" disabled>בחרי סניף</option>
              {branches.map((b) => <option key={b} value={b}>{b}</option>)}
            </select>
            {err && <div style={S.err}>{err}</div>}
            <button type="submit" disabled={status === 'sending'} style={S.cta}>
              {status === 'sending' ? 'שולחת...' : (page as any).cta_text || 'השאירי פרטים'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

const S: Record<string, React.CSSProperties> = {
  page: { minHeight: '100vh', background: 'linear-gradient(180deg,#0a0606,#12090a)', color: '#f5ecea', fontFamily: 'Heebo, system-ui, sans-serif', padding: '48px 16px' },
  wrap: { maxWidth: 720, margin: '0 auto' },
  eyebrow: { display: 'inline-block', fontSize: 13, color: '#e8a8b4', padding: '6px 14px', border: '1px solid rgba(232,168,180,.3)', borderRadius: 999, marginBottom: 16 },
  brandTitle: { fontSize: 'clamp(26px,4.5vw,40px)', fontWeight: 900, marginBottom: 8, letterSpacing: '-1px' },
  h1: { fontSize: 'clamp(28px,4.5vw,46px)', fontWeight: 800, lineHeight: 1.1, marginBottom: 14, letterSpacing: '-1px' },
  sub: { fontSize: 16, color: '#a89993', lineHeight: 1.7, marginBottom: 24 },
  gallery: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(140px,1fr))', gap: 10, margin: '20px 0 28px' },
  img: { width: '100%', aspectRatio: '3/4', objectFit: 'cover', borderRadius: 14, border: '1px solid rgba(232,168,180,.18)' },
  bodyHtml: { lineHeight: 1.8, marginBottom: 28 },
  form: { display: 'grid', gap: 12, background: 'rgba(28,20,19,.7)', border: '1px solid rgba(232,168,180,.2)', borderRadius: 18, padding: 20 },
  input: { background: '#0f0a0a', border: '1px solid #3a2828', color: '#f5ebe6', padding: '14px 16px', borderRadius: 12, fontSize: 16, outline: 'none', fontFamily: 'inherit' },
  cta: { background: 'linear-gradient(135deg,#e8a8b4,#c46879)', color: '#1a0c0c', border: 0, padding: '16px 24px', borderRadius: 50, fontWeight: 800, fontSize: 16, cursor: 'pointer' },
  err: { color: '#fca5a5', fontSize: 13 },
  successCard: { textAlign: 'center', padding: '36px 20px', background: 'rgba(232,168,180,.06)', border: '1px solid rgba(232,168,180,.25)', borderRadius: 18 },
  successIcon: { width: 64, height: 64, borderRadius: '50%', background: 'linear-gradient(135deg,#e8a8b4,#c98594)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, fontWeight: 700, marginBottom: 14, color: '#fff' },
};
