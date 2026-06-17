import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "קורס מאפרת מקצועית | דואגים לך לעבודה בסיום הלימודים" },
      { name: "description", content: "קורס מאפרת מקצועית 6–8 חודשים. מתנה: מזוודת איפור בשווי 11,000 ₪, תעודה בינלאומית, ליווי להשמה ושכר יומי 800–1,700 ₪." },
    ],
  }),
  component: LandingPage,
});

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;600;700;800;900&display=swap');

:root{
  --bg:#0a0606;
  --bg-2:#120a0a;
  --surface:#16100f;
  --surface-2:#1c1413;
  --border:rgba(232,168,180,.14);
  --border-2:rgba(232,168,180,.28);
  --text:#f5ecea;
  --muted:#a89993;
  --dim:#7a6a66;
  --rose:#e8a8b4;
  --rose-2:#d98a99;
  --rose-3:#c46879;
  --rose-glow:rgba(232,168,180,.35);
}
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{
  font-family:'Heebo',sans-serif;
  background:var(--bg);
  color:var(--text);
  direction:rtl;
  overflow-x:hidden;
  font-weight:400;
  -webkit-font-smoothing:antialiased;
}

@keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
@keyframes glow{0%,100%{opacity:.55}50%{opacity:.9}}
@keyframes pulse{0%,100%{box-shadow:0 0 0 0 rgba(232,168,180,.45)}70%{box-shadow:0 0 0 14px rgba(232,168,180,0)}}

.wrap{width:min(1180px,92vw);margin:auto}

/* ── TOPBAR ── */
.topbar{
  position:sticky;top:0;z-index:100;
  background:rgba(10,6,6,.72);
  backdrop-filter:blur(18px);
  -webkit-backdrop-filter:blur(18px);
  border-bottom:1px solid var(--border);
}
.topbar-inner{display:flex;align-items:center;justify-content:space-between;padding:14px 0}
.brand{display:flex;align-items:center;gap:10px;color:var(--text);text-decoration:none;font-weight:800;font-size:16px}
.brand-mark{
  width:34px;height:34px;border-radius:10px;
  background:linear-gradient(135deg,var(--rose),var(--rose-3));
  display:grid;place-items:center;color:#1a0c0c;font-weight:900;
}
.brand small{display:block;font-size:11px;font-weight:500;color:var(--muted);margin-top:2px}
.topbar-cta{
  background:linear-gradient(135deg,var(--rose),var(--rose-3));
  color:#1a0c0c;padding:10px 20px;border-radius:50px;
  text-decoration:none;font-weight:800;font-size:13px;
  box-shadow:0 8px 24px rgba(232,168,180,.18);
  transition:transform .2s,box-shadow .2s;
  white-space:nowrap;
}
.topbar-cta:hover{transform:translateY(-1px);box-shadow:0 12px 32px rgba(232,168,180,.28)}

/* ── HERO ── */
.hero{
  position:relative;
  padding:90px 0 80px;
  overflow:hidden;
  text-align:center;
}
.hero::before{
  content:'';position:absolute;inset:0;
  background:radial-gradient(ellipse 60% 50% at 50% 35%,rgba(232,168,180,.18) 0,rgba(232,168,180,.05) 40%,transparent 70%);
  pointer-events:none;
  animation:glow 6s ease-in-out infinite;
}
.hero::after{
  content:'';position:absolute;
  top:20%;right:-10%;
  width:500px;height:500px;
  background:radial-gradient(circle,rgba(196,104,121,.12) 0,transparent 65%);
  pointer-events:none;
}
.hero-inner{position:relative;z-index:2;animation:fadeUp .8s ease both}
.eyebrow{
  display:inline-flex;align-items:center;gap:8px;
  font-size:13px;font-weight:600;
  color:var(--rose);
  letter-spacing:.4px;
  margin-bottom:28px;
  padding:7px 16px;
  border:1px solid var(--border-2);
  border-radius:50px;
  background:rgba(232,168,180,.04);
}
.eyebrow-dot{width:6px;height:6px;border-radius:50%;background:var(--rose);animation:pulse 2s infinite}
h1{
  font-family:'Heebo',sans-serif;
  font-size:clamp(44px,7vw,92px);
  line-height:1;
  font-weight:800;
  letter-spacing:-2px;
  color:var(--text);
  margin-bottom:28px;
  max-width:900px;
  margin-inline:auto;
}
.h1-accent{color:var(--rose)}
.hero-sub{
  font-size:clamp(16px,1.6vw,19px);
  line-height:1.6;
  color:var(--muted);
  font-weight:500;
  margin-bottom:14px;
  max-width:560px;
  margin-inline:auto;
}
.hero-sub strong{color:var(--text);font-weight:700}
.btn-primary{
  display:inline-flex;align-items:center;gap:10px;
  background:linear-gradient(135deg,var(--rose),var(--rose-3));
  color:#1a0c0c;padding:18px 40px;border-radius:50px;
  text-decoration:none;font-weight:800;font-size:16px;
  box-shadow:0 0 60px rgba(232,168,180,.4),0 12px 32px rgba(232,168,180,.25);
  transition:transform .2s,box-shadow .2s;
  margin-top:36px;
  border:0;cursor:pointer;font-family:inherit;
}
.btn-primary:hover{transform:translateY(-2px);box-shadow:0 0 80px rgba(232,168,180,.55),0 16px 40px rgba(232,168,180,.35)}

/* ── HERO CARDS ── */
.hero-cards{
  display:grid;grid-template-columns:repeat(3,1fr);gap:18px;
  max-width:840px;margin:64px auto 0;
  position:relative;z-index:2;
}
.mini-card{
  background:rgba(28,20,19,.6);
  border:1px solid var(--border);
  border-radius:18px;
  padding:28px 22px;
  text-align:center;
  backdrop-filter:blur(8px);
  transition:border-color .3s,transform .3s;
}
.mini-card:hover{border-color:var(--border-2);transform:translateY(-3px)}
.mini-icon{
  width:44px;height:44px;border-radius:50%;
  background:rgba(232,168,180,.08);
  border:1px solid var(--border-2);
  display:grid;place-items:center;margin:0 auto 14px;
  color:var(--rose);
}
.mini-icon svg{width:20px;height:20px}
.mini-label{font-size:12px;color:var(--dim);font-weight:500;margin-bottom:4px}
.mini-value{font-size:16px;color:var(--text);font-weight:700}

/* ── SECTION ── */
.section{padding:100px 0;position:relative}
.section-head{text-align:center;margin-bottom:64px;max-width:680px;margin-inline:auto}
.section-tag{
  display:inline-block;
  font-size:12px;font-weight:600;
  letter-spacing:2px;text-transform:uppercase;
  color:var(--rose);
  margin-bottom:16px;
}
.section-title{
  font-size:clamp(34px,4.5vw,56px);
  font-weight:800;
  line-height:1.05;
  letter-spacing:-1.5px;
  color:var(--text);
  margin-bottom:16px;
}
.section-sub{font-size:17px;color:var(--muted);font-weight:500;line-height:1.6}

/* ── BENEFITS ── */
.benefits-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;max-width:1000px;margin:0 auto}
.benefit-card{
  background:linear-gradient(180deg,rgba(28,20,19,.6),rgba(22,16,15,.4));
  border:1px solid var(--border);
  border-radius:22px;
  padding:36px 28px;
  text-align:center;
  transition:border-color .3s,transform .3s;
}
.benefit-card:hover{border-color:var(--border-2);transform:translateY(-4px)}
.benefit-icon{
  width:56px;height:56px;border-radius:50%;
  background:rgba(232,168,180,.08);
  border:1px solid var(--border-2);
  display:grid;place-items:center;margin:0 auto 20px;
  color:var(--rose);
}
.benefit-icon svg{width:24px;height:24px}
.benefit-title{font-size:20px;font-weight:700;color:var(--text);margin-bottom:10px}
.benefit-text{font-size:14px;color:var(--muted);font-weight:500;line-height:1.6}

/* ── ELIGIBILITY ── */
.eligibility-list{
  max-width:680px;margin:0 auto;
  display:flex;flex-direction:column;gap:14px;
}
.elig-item{
  display:flex;align-items:center;gap:16px;
  background:rgba(28,20,19,.5);
  border:1px solid var(--border);
  border-radius:16px;padding:20px 24px;
  transition:border-color .3s;
}
.elig-item:hover{border-color:var(--border-2)}
.elig-check{
  width:32px;height:32px;border-radius:50%;
  background:linear-gradient(135deg,var(--rose),var(--rose-3));
  display:grid;place-items:center;flex-shrink:0;
  color:#1a0c0c;
}
.elig-check svg{width:16px;height:16px;stroke-width:3}
.elig-text{font-size:16px;font-weight:600;color:var(--text)}

/* ── STEPS ── */
.steps-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;max-width:1000px;margin:0 auto}
.step-card{
  background:linear-gradient(180deg,rgba(28,20,19,.6),rgba(22,16,15,.4));
  border:1px solid var(--border);
  border-radius:22px;
  padding:36px 28px;
  position:relative;
  transition:border-color .3s,transform .3s;
}
.step-card:hover{border-color:var(--border-2);transform:translateY(-4px)}
.step-num{
  font-size:14px;font-weight:700;
  color:var(--rose);
  letter-spacing:1px;
  margin-bottom:20px;
  opacity:.7;
}
.step-title{font-size:20px;font-weight:700;color:var(--text);margin-bottom:10px}
.step-text{font-size:14px;color:var(--muted);font-weight:500;line-height:1.6}

/* ── STATS ── */
.stats-band{
  border-top:1px solid var(--border);
  border-bottom:1px solid var(--border);
  background:linear-gradient(180deg,transparent,rgba(232,168,180,.03),transparent);
  padding:50px 0;
}
.stats-inner{display:grid;grid-template-columns:repeat(4,1fr);gap:24px;text-align:center}
.stat-num{
  font-size:clamp(32px,4vw,48px);
  font-weight:800;color:var(--rose);
  letter-spacing:-1px;line-height:1;margin-bottom:8px;
}
.stat-lbl{font-size:13px;color:var(--muted);font-weight:500;letter-spacing:.5px}

/* ── TESTIMONIALS ── */
.testi-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;max-width:1080px;margin:0 auto}
.testi-card{
  background:linear-gradient(180deg,rgba(28,20,19,.6),rgba(22,16,15,.4));
  border:1px solid var(--border);
  border-radius:22px;
  padding:32px 26px;
  transition:border-color .3s,transform .3s;
}
.testi-card:hover{border-color:var(--border-2);transform:translateY(-4px)}
.testi-stars{color:var(--rose);font-size:14px;letter-spacing:3px;margin-bottom:16px}
.testi-text{font-size:15px;line-height:1.7;color:var(--text);font-weight:400;margin-bottom:22px}
.testi-author{display:flex;align-items:center;gap:12px;padding-top:16px;border-top:1px solid var(--border)}
.testi-avatar{
  width:40px;height:40px;border-radius:50%;
  background:linear-gradient(135deg,var(--rose),var(--rose-3));
  display:grid;place-items:center;font-size:16px;
  color:#1a0c0c;font-weight:700;flex-shrink:0;
}
.testi-name{font-size:14px;font-weight:700;color:var(--text)}
.testi-role{font-size:12px;color:var(--dim);font-weight:500;margin-top:2px}

/* ── FAQ ── */
.faq-list{max-width:760px;margin:0 auto;display:flex;flex-direction:column;gap:10px}
details{
  background:rgba(28,20,19,.5);
  border:1px solid var(--border);
  border-radius:14px;padding:22px 26px;
  transition:border-color .3s;
}
details[open]{border-color:var(--border-2)}
summary{
  font-weight:700;font-size:16px;
  cursor:pointer;list-style:none;
  display:flex;justify-content:space-between;align-items:center;
  color:var(--text);
}
summary::-webkit-details-marker{display:none}
summary::after{content:'+';font-size:22px;color:var(--rose);font-weight:300;transition:transform .25s;line-height:1}
details[open] summary::after{transform:rotate(45deg)}
details p{
  color:var(--muted);font-weight:500;
  line-height:1.7;font-size:15px;
  padding-top:16px;margin-top:16px;
  border-top:1px solid var(--border);
}

/* ── FINAL FORM ── */
.final-section{
  background:radial-gradient(ellipse 80% 100% at 50% 0%,rgba(232,168,180,.1) 0,transparent 60%);
  padding:100px 0;
}
.final-grid{
  display:grid;grid-template-columns:1fr 1fr;gap:60px;
  max-width:1080px;margin:0 auto;align-items:center;
}
.final-title{
  font-size:clamp(36px,4.5vw,54px);
  font-weight:800;line-height:1.05;letter-spacing:-1.5px;
  color:var(--text);margin-bottom:20px;
}
.final-title-accent{color:var(--rose)}
.final-sub{font-size:17px;color:var(--muted);font-weight:500;line-height:1.6;margin-bottom:28px}
.final-points{display:flex;flex-direction:column;gap:12px}
.final-point{
  display:flex;align-items:center;gap:12px;
  font-size:15px;font-weight:500;color:var(--text);
}
.final-dot{
  width:18px;height:18px;border-radius:50%;
  background:rgba(232,168,180,.12);
  border:1px solid var(--border-2);
  display:grid;place-items:center;
  color:var(--rose);font-size:11px;flex-shrink:0;
}

.lead-card{
  background:rgba(22,16,15,.7);
  border:1px solid var(--border-2);
  border-radius:24px;
  padding:36px 32px;
  backdrop-filter:blur(12px);
  box-shadow:0 30px 80px rgba(0,0,0,.4);
}
.lead-card-title{font-size:22px;font-weight:700;color:var(--text);margin-bottom:6px}
.lead-card-sub{font-size:14px;color:var(--muted);font-weight:500;margin-bottom:24px}
.form-field{margin-bottom:12px}
.form-input{
  width:100%;height:52px;
  border:1px solid var(--border-2);
  border-radius:12px;
  padding:0 18px;
  font-size:15px;font-weight:500;
  background:rgba(10,6,6,.5);color:var(--text);
  font-family:inherit;
  transition:border-color .2s,background .2s;
  appearance:none;
}
.form-input::placeholder{color:var(--dim)}
.form-input:focus{outline:none;border-color:var(--rose);background:rgba(10,6,6,.8)}
select.form-input{cursor:pointer}
select.form-input option{background:#16100f;color:var(--text)}
.btn-submit{
  width:100%;border:0;cursor:pointer;
  background:linear-gradient(135deg,var(--rose),var(--rose-3));
  color:#1a0c0c;font-family:inherit;
  font-size:16px;font-weight:800;
  padding:18px;border-radius:12px;
  box-shadow:0 0 40px rgba(232,168,180,.3),0 12px 32px rgba(232,168,180,.2);
  transition:transform .2s,box-shadow .2s;
  margin-top:6px;
}
.btn-submit:hover{transform:translateY(-2px);box-shadow:0 0 60px rgba(232,168,180,.45),0 16px 40px rgba(232,168,180,.3)}
.form-micro{font-size:12px;color:var(--dim);text-align:center;margin-top:14px}

/* ── FOOTER ── */
footer{
  border-top:1px solid var(--border);
  padding:36px 0;margin-top:0;
  text-align:center;
}
.footer-text{color:var(--dim);font-size:13px;font-weight:500}

/* ── STICKY MOBILE CTA ── */
.sticky-mobile{
  position:fixed;bottom:0;left:0;right:0;z-index:50;
  display:none;
  padding:12px 16px;
  background:rgba(10,6,6,.92);
  backdrop-filter:blur(12px);
  border-top:1px solid var(--border-2);
}
.sticky-mobile a{
  display:block;text-align:center;
  background:linear-gradient(135deg,var(--rose),var(--rose-3));
  color:#1a0c0c;text-decoration:none;
  border-radius:12px;padding:14px;
  font-weight:800;font-size:14px;
  box-shadow:0 0 30px rgba(232,168,180,.3);
}

/* ── RESPONSIVE ── */
@media(max-width:1024px){
  .hero-cards{grid-template-columns:repeat(3,1fr);gap:12px}
  .benefits-grid,.steps-grid{grid-template-columns:1fr;max-width:520px}
  .testi-grid{grid-template-columns:1fr;max-width:520px}
  .final-grid{grid-template-columns:1fr;gap:40px}
  .stats-inner{grid-template-columns:repeat(2,1fr);gap:32px}
}
@media(max-width:768px){
  body{padding-bottom:80px}
  .sticky-mobile{display:block}
  .topbar-cta{display:none}
  .hero{padding:60px 0 50px}
  .section{padding:70px 0}
  .final-section{padding:70px 0}
  h1{font-size:42px;letter-spacing:-1.5px}
  .section-title{font-size:32px}
  .final-title{font-size:32px}
  .hero-cards{grid-template-columns:1fr;max-width:340px;margin-top:48px}
  .mini-card{padding:22px 20px}
  .lead-card{padding:28px 22px}
}
@media(max-width:480px){
  h1{font-size:38px}
}
`;

const BODY_HTML = `
<!-- ══ TOPBAR ══ -->
<header class="topbar">
  <div class="wrap">
    <div class="topbar-inner">
      <a href="#" class="brand">
        <div class="brand-mark">✦</div>
        <div>
          <div>קורס מאפרת</div>
          <small>המכללה המובילה בישראל</small>
        </div>
      </a>
      <a href="#form" class="topbar-cta">לפגישת ייעוץ חינם ←</a>
    </div>
  </div>
</header>

<!-- ══ HERO ══ -->
<section class="hero">
  <div class="wrap">
    <div class="hero-inner">
      <div class="eyebrow">
        <span class="eyebrow-dot"></span>
        בשיתוף בית הספר הגדול בארץ לביוטי
      </div>

      <h1>דואגים לך <span class="h1-accent">לעבודה</span><br/>בסיום הלימודים</h1>

      <p class="hero-sub">קורס מאפרת מקצועית באורך 6–8 חודשים</p>
      <p class="hero-sub"><strong>שכר יומי ממוצע של 800–1,700 ש״ח</strong></p>

      <a href="#form" class="btn-primary">אני רוצה לדעת כמה מלגה מגיעה לי ←</a>

      <div class="hero-cards">
        <div class="mini-card">
          <div class="mini-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
          </div>
          <div class="mini-label">מתנה: מזוודת איפור בשווי</div>
          <div class="mini-value">11,000 ₪</div>
        </div>
        <div class="mini-card">
          <div class="mini-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M9 13.5L7 22l5-3 5 3-2-8.5"/></svg>
          </div>
          <div class="mini-label">תעודה</div>
          <div class="mini-value">בינלאומית</div>
        </div>
        <div class="mini-card">
          <div class="mini-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><path d="M3 13h18"/></svg>
          </div>
          <div class="mini-label">דואגים לך לעבודה</div>
          <div class="mini-value">בסיום הקורס</div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ══ BENEFITS ══ -->
<section class="section">
  <div class="wrap">
    <div class="section-head">
      <div class="section-tag">מה מקבלים בקורס</div>
      <h2 class="section-title">הטבות שלא תמצאי<br/>בשום מקום אחר</h2>
    </div>
    <div class="benefits-grid">
      <div class="benefit-card">
        <div class="benefit-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
        </div>
        <div class="benefit-title">מזוודת איפור מקצועית</div>
        <div class="benefit-text">מתנה — מזוודת איפור בשווי 11,000 ₪, מלאה ומוכנה לעבודה</div>
      </div>
      <div class="benefit-card">
        <div class="benefit-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M9 13.5L7 22l5-3 5 3-2-8.5"/></svg>
        </div>
        <div class="benefit-title">תעודת מאפרת בינלאומית</div>
        <div class="benefit-text">תעודה מוכרת שפותחת לך דלתות בכל העולם</div>
      </div>
      <div class="benefit-card">
        <div class="benefit-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 7h-3V5a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3v2H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/></svg>
        </div>
        <div class="benefit-title">דואגים לך לעבודה</div>
        <div class="benefit-text">בסיום הקורס — התחלת עבודה מיידית עם שכר גבוה</div>
      </div>
    </div>
  </div>
</section>

<!-- ══ ELIGIBILITY ══ -->
<section class="section" style="padding-top:0">
  <div class="wrap">
    <div class="section-head">
      <div class="section-tag">למי זה מתאים</div>
      <h2 class="section-title">בדקי אם את זכאית</h2>
      <p class="section-sub">הקורס פתוח לכל מי שעומדת בתנאים הבאים</p>
    </div>
    <div class="eligibility-list">
      <div class="elig-item">
        <div class="elig-check">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <div class="elig-text">עשית שירות צבאי או שירות לאומי</div>
      </div>
      <div class="elig-item">
        <div class="elig-check">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <div class="elig-text">בנות 20 עד 45</div>
      </div>
      <div class="elig-item">
        <div class="elig-check">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <div class="elig-text">בלי ניסיון קודם — אפס רקע נדרש</div>
      </div>
      <div class="elig-item">
        <div class="elig-check">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <div class="elig-text">רצון ללמוד מקצוע אמיתי ולהתחיל לעבוד</div>
      </div>
    </div>
  </div>
</section>

<!-- ══ HOW IT WORKS ══ -->
<section class="section" style="padding-top:0">
  <div class="wrap">
    <div class="section-head">
      <div class="section-tag">איך זה עובד</div>
      <h2 class="section-title">3 צעדים<br/>למקצוע חדש</h2>
    </div>
    <div class="steps-grid">
      <div class="step-card">
        <div class="step-num">01</div>
        <div class="step-title">השאירי פרטים</div>
        <div class="step-text">מלאי שם וטלפון בטופס — לוקח 10 שניות</div>
      </div>
      <div class="step-card">
        <div class="step-num">02</div>
        <div class="step-title">פגישת ייעוץ חינמית</div>
        <div class="step-text">ניצור קשר ונקבע פגישה אישית — בלי התחייבות</div>
      </div>
      <div class="step-card">
        <div class="step-num">03</div>
        <div class="step-title">מתחילה ללמוד ולהרוויח</div>
        <div class="step-text">בסיום הקורס — דואגים לך לעבודה עם שכר גבוה</div>
      </div>
    </div>
  </div>
</section>

<!-- ══ STATS ══ -->
<div class="stats-band">
  <div class="wrap">
    <div class="stats-inner">
      <div><div class="stat-num">6–8</div><div class="stat-lbl">חודשי לימוד</div></div>
      <div><div class="stat-num">11K ₪</div><div class="stat-lbl">מתנה: מזוודת איפור</div></div>
      <div><div class="stat-num">800+</div><div class="stat-lbl">בוגרות מועסקות</div></div>
      <div><div class="stat-num">100%</div><div class="stat-lbl">ליווי לעבודה</div></div>
    </div>
  </div>
</div>

<!-- ══ TESTIMONIALS ══ -->
<section class="section">
  <div class="wrap">
    <div class="section-head">
      <div class="section-tag">מה אומרות הבוגרות</div>
      <h2 class="section-title">הצלחות אמיתיות</h2>
    </div>
    <div class="testi-grid">
      <div class="testi-card">
        <div class="testi-stars">★★★★★</div>
        <p class="testi-text">סיימתי צבא ולא ידעתי מה לעשות עם הפיקדון. חברה סיפרה לי על הקורס הזה — היום אני עובדת בסטודיו מוביל בתל אביב ומרוויחה יפה מאוד.</p>
        <div class="testi-author">
          <div class="testi-avatar">ש</div>
          <div><div class="testi-name">שירה כ.</div><div class="testi-role">בוגרת הקורס · 2 שנים בתחום</div></div>
        </div>
      </div>
      <div class="testi-card">
        <div class="testi-stars">★★★★★</div>
        <p class="testi-text">לא הייתה לי שום ידע קודם. הגעתי בגלל התשוקה, נשארתי בגלל המקצוענות. הצוות מדהים, הלמידה מעמיקה והמזוודה שקיבלתי שווה הרבה.</p>
        <div class="testi-author">
          <div class="testi-avatar">מ</div>
          <div><div class="testi-name">מיכל א.</div><div class="testi-role">מאפרת עצמאית · לקוחות VIP</div></div>
        </div>
      </div>
      <div class="testi-card">
        <div class="testi-stars">★★★★★</div>
        <p class="testi-text">הפיקדון שלי הלך לדבר הכי טוב שיכולתי לעשות איתו. 8 חודשים אחרי — אני מאפרת בחתונות ומרוויחה 1,500 ש״ח ליום.</p>
        <div class="testi-author">
          <div class="testi-avatar">נ</div>
          <div><div class="testi-name">נועה ר.</div><div class="testi-role">מאפרת חתונות · בת 22</div></div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ══ FAQ ══ -->
<section class="section" style="padding-top:0">
  <div class="wrap">
    <div class="section-head">
      <div class="section-tag">שאלות נפוצות</div>
      <h2 class="section-title">שאלות חשובות</h2>
    </div>
    <div class="faq-list">
      <details open>
        <summary>צריך ניסיון קודם?</summary>
        <p>בכלל לא. הקורס מתחיל מהבסיס ומלווה אותך צעד אחר צעד. מאות בוגרות הגיעו ללא כל ניסיון קודם.</p>
      </details>
      <details>
        <summary>כמה עולה הקורס?</summary>
        <p>עלות הקורס תלויה במסלול שתבחרי. בפגישת הייעוץ נבדוק יחד כמה מלגה מגיעה לך ואיך ניתן לממן דרך הפיקדון.</p>
      </details>
      <details>
        <summary>אפשר לשלם בפיקדון הצבאי?</summary>
        <p>כן! ניתן לשלם דרך הפיקדון הצבאי. נלווה אותך בתהליך מול הפיקדון כדי שיהיה פשוט ומהיר.</p>
      </details>
      <details>
        <summary>מה השכר שאפשר לצפות לו?</summary>
        <p>שכר ממוצע יומי של 800–1,700 ש"ח. מאפרות מנוסות בחתונות ופרודקשן מרוויחות עד 2,000 ש"ח ליום.</p>
      </details>
      <details>
        <summary>האם דואגים לי לעבודה?</summary>
        <p>כן. בסיום הקורס דואגים לך לעבודה ראשונה. יש לנו רשת קשרים ענפה עם מעסיקים בתחום.</p>
      </details>
      <details>
        <summary>כמה זמן נמשך הקורס?</summary>
        <p>הקורס נמשך 6–8 חודשים. ניתן לשלב עם לימודים אחרים ועם עבודה חלקית.</p>
      </details>
    </div>
  </div>
</section>

<!-- ══ FINAL CTA + FORM ══ -->
<section class="final-section" id="form">
  <div class="wrap">
    <div class="final-grid">
      <div>
        <div class="section-tag">הזמן לפעול</div>
        <h2 class="final-title">בואי לפגישת ייעוץ —<br/><span class="final-title-accent">גלי כמה מלגה מגיעה לך</span></h2>
        <p class="final-sub">פגישה אישית, ללא עלות וללא התחייבות. נבדוק יחד כמה מלגה מגיעה לך ואיך לממן את הקורס.</p>
        <div class="final-points">
          <div class="final-point"><span class="final-dot">✓</span>מלגה מיוחדת לנרשמות</div>
          <div class="final-point"><span class="final-dot">✓</span>ניתן לשלם דרך הפיקדון</div>
          <div class="final-point"><span class="final-dot">✓</span>מתנה: מזוודת איפור בשווי 11,000 ₪</div>
          <div class="final-point"><span class="final-dot">✓</span>ליווי לעבודה בסיום הקורס</div>
          <div class="final-point"><span class="final-dot">✓</span>תעודה בינלאומית מוכרת</div>
        </div>
      </div>

      <div class="lead-card">
        <div class="lead-card-title">השאירי פרטים ונחזור אלייך</div>
        <div class="lead-card-sub">תוך 24 שעות נחזור לתאם פגישת ייעוץ אישית</div>
        <form onsubmit="submitForm(event)">
          <div class="form-field">
            <input class="form-input" type="text" placeholder="שם מלא *" required/>
          </div>
          <div class="form-field">
            <input class="form-input" type="tel" placeholder="מספר טלפון *" required dir="ltr"/>
          </div>
          <div class="form-field">
            <select class="form-input" required>
              <option value="">בחרי סניף *</option>
              <option>תל אביב</option>
              <option>ירושלים</option>
              <option>חיפה</option>
              <option>באר שבע</option>
              <option>נתניה</option>
              <option>רמת גן</option>
              <option>ראשון לציון</option>
              <option>פתח תקווה</option>
              <option>אחר</option>
            </select>
          </div>
          <button type="submit" class="btn-submit">
            לפגישת ייעוץ חינם ←
          </button>
          <p class="form-micro">הפרטים שלך מוגנים ולא יועברו לצד שלישי</p>
        </form>
      </div>
    </div>
  </div>
</section>

<footer>
  <div class="wrap">
    <p class="footer-text">© 2025 המכללה המובילה לאיפור בישראל · כל הזכויות שמורות</p>
  </div>
</footer>

<div class="sticky-mobile">
  <a href="#form">לפגישת ייעוץ חינם ←</a>
</div>
`;

function LandingPage() {
  useEffect(() => {
    (window as any).submitForm = function (e: any) {
      e.preventDefault();
      const btn = e.target.querySelector('.btn-submit');
      if (!btn) return;
      btn.textContent = 'שולחת...';
      btn.style.opacity = '.75';
      setTimeout(() => {
        btn.textContent = '✓ פרטייך נשלחו! נחזור אלייך בקרוב';
        btn.style.background = 'linear-gradient(135deg,#4ade80,#22c55e)';
        btn.style.opacity = '1';
      }, 1300);
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <div dir="rtl" dangerouslySetInnerHTML={{ __html: BODY_HTML }} />
    </>
  );
}
