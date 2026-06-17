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

@keyframes fadeUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes scaleIn{from{opacity:0;transform:scale(.92)}to{opacity:1;transform:scale(1)}}
@keyframes slideRight{from{opacity:0;transform:translateX(-40px)}to{opacity:1;transform:translateX(0)}}
@keyframes slideLeft{from{opacity:0;transform:translateX(40px)}to{opacity:1;transform:translateX(0)}}
@keyframes countUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
@keyframes glow{0%,100%{opacity:.55}50%{opacity:.9}}
@keyframes pulse{0%,100%{box-shadow:0 0 0 0 rgba(232,168,180,.45)}70%{box-shadow:0 0 0 14px rgba(232,168,180,0)}}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
@keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}

.wrap{width:min(1180px,92vw);margin:auto}

/* ── SCROLL REVEALS ── */
.reveal{opacity:0;transform:translateY(30px);transition:opacity .7s cubic-bezier(.25,.46,.45,.94),transform .7s cubic-bezier(.25,.46,.45,.94)}
.reveal.revealed{opacity:1;transform:none}
.reveal-scale{opacity:0;transform:scale(.92);transition:opacity .7s cubic-bezier(.25,.46,.45,.94),transform .7s cubic-bezier(.25,.46,.45,.94)}
.reveal-scale.revealed{opacity:1;transform:scale(1)}
.reveal-right{opacity:0;transform:translateX(-40px);transition:opacity .7s cubic-bezier(.25,.46,.45,.94),transform .7s cubic-bezier(.25,.46,.45,.94)}
.reveal-right.revealed{opacity:1;transform:none}
.reveal-left{opacity:0;transform:translateX(40px);transition:opacity .7s cubic-bezier(.25,.46,.45,.94),transform .7s cubic-bezier(.25,.46,.45,.94)}
.reveal-left.revealed{opacity:1;transform:none}
.reveal-delay-1{transition-delay:.1s}
.reveal-delay-2{transition-delay:.2s}
.reveal-delay-3{transition-delay:.3s}
.reveal-delay-4{transition-delay:.4s}
.reveal-delay-5{transition-delay:.5s}
.reveal-delay-6{transition-delay:.6s}
.hero-inner{animation:fadeUp .9s cubic-bezier(.25,.46,.45,.94) both}
.hero-cards .mini-card:nth-child(1){animation:scaleIn .6s .15s both}
.hero-cards .mini-card:nth-child(2){animation:scaleIn .6s .3s both}
.hero-cards .mini-card:nth-child(3){animation:scaleIn .6s .45s both}
.eyebrow-dot{animation:pulse 2.4s infinite}
.partners-band .partner-logo:nth-child(1){animation:fadeIn .6s .1s both}
.partners-band .partner-logo:nth-child(3){animation:fadeIn .6s .25s both}
.partners-band .partner-logo:nth-child(5){animation:fadeIn .6s .4s both}
.stats-inner > div{opacity:0;animation:countUp .6s both}
.stats-inner > div:nth-child(1){animation-delay:.1s}
.stats-inner > div:nth-child(2){animation-delay:.2s}
.stats-inner > div:nth-child(3){animation-delay:.3s}
.stats-inner > div:nth-child(4){animation-delay:.4s}

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

/* ── HERO PORTRAIT ── */
.hero-portrait-wrap{
  position:relative;
  max-width:520px;margin:60px auto 0;
  z-index:2;
}
.hero-portrait{
  position:relative;
  border-radius:28px;overflow:hidden;
  border:1px solid var(--border-2);
  box-shadow:0 30px 90px rgba(0,0,0,.5),0 0 80px rgba(232,168,180,.15);
  aspect-ratio:16/10;
  background:#16100f;
}
.hero-portrait img{width:100%;height:100%;object-fit:cover;display:block;opacity:.95}
.hero-portrait::after{
  content:'';position:absolute;inset:0;
  background:linear-gradient(180deg,transparent 40%,rgba(10,6,6,.6) 100%);
  pointer-events:none;
}
.hero-floater{
  position:absolute;
  bottom:-30px;left:-30px;
  width:180px;
  border-radius:18px;overflow:hidden;
  border:1px solid var(--border-2);
  box-shadow:0 20px 50px rgba(0,0,0,.6);
  transform:rotate(-4deg);
  background:#16100f;
}
.hero-floater img{width:100%;display:block;opacity:.95}
.hero-badge-float{
  position:absolute;
  top:-18px;right:-18px;
  background:linear-gradient(135deg,var(--rose),var(--rose-3));
  color:#1a0c0c;
  padding:14px 18px;border-radius:50px;
  font-size:13px;font-weight:800;
  box-shadow:0 0 40px rgba(232,168,180,.45),0 12px 28px rgba(232,168,180,.3);
  white-space:nowrap;
  transform:rotate(6deg);
}

/* ── GALLERY ── */
.gallery-grid{
  display:grid;grid-template-columns:1.2fr 1fr 1fr;gap:14px;
  max-width:1100px;margin:0 auto;
}
.gallery-tile{
  position:relative;
  border-radius:20px;overflow:hidden;
  border:1px solid var(--border);
  aspect-ratio:3/4;
  background:#16100f;
  transition:transform .4s,border-color .3s;
}
.gallery-tile:hover{transform:translateY(-6px);border-color:var(--border-2)}
.gallery-tile img{
  width:100%;height:100%;object-fit:cover;display:block;
  opacity:.85;transition:opacity .4s,transform .8s;
}
.gallery-tile:hover img{opacity:1;transform:scale(1.04)}
.gallery-tile::after{
  content:'';position:absolute;inset:0;
  background:linear-gradient(180deg,transparent 50%,rgba(10,6,6,.85) 100%);
  pointer-events:none;
}
.gallery-cap{
  position:absolute;bottom:20px;right:20px;left:20px;
  z-index:2;color:var(--text);
  font-size:15px;font-weight:700;
}
.gallery-cap small{display:block;font-size:12px;font-weight:500;color:var(--rose);margin-bottom:4px;letter-spacing:.5px}

/* ── HOW IT WORKS IMAGE ── */
.how-with-image{
  display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center;
  max-width:1100px;margin:0 auto;
}
.how-image-wrap{
  border-radius:24px;overflow:hidden;
  border:1px solid var(--border-2);
  box-shadow:0 30px 80px rgba(0,0,0,.4);
  aspect-ratio:4/5;
  position:relative;
  background:#16100f;
}
.how-image-wrap img{width:100%;height:100%;object-fit:cover;display:block;opacity:.95}
.how-image-wrap::after{
  content:'';position:absolute;inset:0;
  background:linear-gradient(180deg,transparent 50%,rgba(10,6,6,.4) 100%);
  pointer-events:none;
}
.steps-vertical{display:flex;flex-direction:column;gap:18px}

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

/* ── INLINE LEAD BAND (horizontal) ── */
.inline-lead{
  position:relative;
  padding:64px 0;
  background:
    radial-gradient(ellipse 60% 100% at 50% 50%,rgba(232,168,180,.12) 0,transparent 70%),
    linear-gradient(180deg,rgba(232,168,180,.04),transparent);
  border-top:1px solid var(--border);
  border-bottom:1px solid var(--border);
}
.inline-lead-card{
  background:rgba(22,16,15,.7);
  border:1px solid var(--border-2);
  border-radius:24px;
  padding:32px;
  backdrop-filter:blur(14px);
  box-shadow:0 30px 80px rgba(0,0,0,.4);
  max-width:1080px;margin:0 auto;
}
.inline-lead-head{text-align:center;margin-bottom:24px}
.inline-lead-title{
  font-size:clamp(24px,3vw,32px);
  font-weight:800;color:var(--text);
  letter-spacing:-.8px;line-height:1.15;
}
.inline-lead-title .h1-accent{color:var(--rose)}
.inline-lead-sub{
  font-size:15px;color:var(--muted);
  font-weight:500;margin-top:8px;
}
.inline-form{
  display:grid;
  grid-template-columns:1.2fr 1fr 1fr auto;
  gap:12px;align-items:stretch;
}
.inline-form .form-input{margin:0;height:54px}
.inline-form .btn-submit{
  margin:0;height:54px;padding:0 26px;
  white-space:nowrap;width:auto;
}
.inline-lead .form-micro{margin-top:16px}
@media(max-width:860px){
  .inline-form{grid-template-columns:1fr 1fr;gap:10px}
  .inline-form .btn-submit{grid-column:1/-1}
}
@media(max-width:520px){
  .inline-form{grid-template-columns:1fr}
  .inline-lead{padding:48px 0}
  .inline-lead-card{padding:24px 18px;border-radius:20px}
}

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

/* ── PARTNERS BAND ── */
.partners-band{
  border-top:1px solid var(--border);
  border-bottom:1px solid var(--border);
  background:
    radial-gradient(ellipse 70% 100% at 50% 50%,rgba(232,168,180,.05),transparent 70%),
    linear-gradient(180deg,rgba(232,168,180,.02),transparent);
  padding:48px 0;
}
.partners-label{
  text-align:center;font-size:11px;font-weight:700;
  letter-spacing:4px;text-transform:uppercase;
  color:var(--muted);margin-bottom:28px;
}
.partners-label::before,.partners-label::after{
  content:'';display:inline-block;width:40px;height:1px;
  background:var(--border-2);vertical-align:middle;margin:0 14px;
}
.partners-row{
  display:flex;align-items:stretch;justify-content:center;
  gap:0;flex-wrap:wrap;
}
.partner-logo{
  display:flex;align-items:center;gap:14px;
  padding:6px 28px;
}
.partner-emblem{
  width:56px;height:56px;border-radius:14px;
  display:grid;place-items:center;
  background:linear-gradient(135deg,rgba(232,168,180,.10),rgba(196,104,121,.05));
  border:1px solid var(--border-2);
  color:var(--rose);flex-shrink:0;
  box-shadow:inset 0 1px 0 rgba(255,255,255,.04),0 8px 24px rgba(0,0,0,.3);
}
.partner-emblem svg{width:28px;height:28px}
.partner-name{font-size:16px;font-weight:800;color:var(--text);line-height:1.2;letter-spacing:-.3px}
.partner-sub{font-size:12px;color:var(--muted);font-weight:500;margin-top:4px;letter-spacing:.3px}
.partner-divider{
  width:1px;align-self:stretch;
  background:linear-gradient(180deg,transparent,var(--border-2),transparent);
}
@media(max-width:760px){
  .partners-row{gap:8px;flex-direction:column;align-items:stretch}
  .partner-logo{justify-content:center;padding:10px 16px;border-bottom:1px solid var(--border)}
  .partner-logo:last-child{border-bottom:0}
  .partner-divider{display:none}
  .partners-band{padding:32px 0}
}

/* ── CERTIFICATION SHOWCASE ── */
.cert-section{
  padding:80px 0;
  background:radial-gradient(ellipse 60% 80% at 50% 0%,rgba(232,168,180,.06),transparent 60%);
}
.cert-card{
  max-width:920px;margin:0 auto;
  display:grid;grid-template-columns:auto 1fr;gap:36px;align-items:center;
  background:linear-gradient(180deg,rgba(28,20,19,.7),rgba(22,16,15,.5));
  border:1px solid var(--border-2);
  border-radius:24px;
  padding:40px 44px;
  box-shadow:0 30px 80px rgba(0,0,0,.4);
  position:relative;overflow:hidden;
}
.cert-card::before{
  content:'';position:absolute;top:-40%;right:-10%;
  width:300px;height:300px;
  background:radial-gradient(circle,rgba(232,168,180,.10),transparent 70%);
  pointer-events:none;
}
.cert-seal{
  width:140px;height:140px;border-radius:50%;
  background:
    radial-gradient(circle at 50% 40%,rgba(232,168,180,.25),transparent 60%),
    conic-gradient(from 0deg,var(--rose-3),var(--rose),var(--rose-3),var(--rose));
  display:grid;place-items:center;
  position:relative;flex-shrink:0;
  box-shadow:0 0 60px rgba(232,168,180,.3),inset 0 0 30px rgba(26,12,12,.3);
}
.cert-seal::after{
  content:'';position:absolute;inset:8px;border-radius:50%;
  background:#16100f;
  border:2px dashed rgba(232,168,180,.4);
}
.cert-seal-inner{position:relative;z-index:2;text-align:center;color:var(--rose)}
.cert-seal-inner svg{width:38px;height:38px;margin-bottom:4px}
.cert-seal-inner small{display:block;font-size:9px;font-weight:800;letter-spacing:2px;color:var(--rose)}
.cert-body h3{
  font-size:clamp(24px,3vw,32px);font-weight:800;
  color:var(--text);letter-spacing:-.8px;margin-bottom:10px;line-height:1.15;
}
.cert-body h3 span{color:var(--rose)}
.cert-body p{font-size:15px;color:var(--muted);line-height:1.7;margin-bottom:18px}
.cert-meta{display:flex;flex-wrap:wrap;gap:8px}
.cert-chip{
  font-size:12px;font-weight:600;padding:6px 12px;border-radius:50px;
  background:rgba(232,168,180,.08);border:1px solid var(--border-2);
  color:var(--rose);letter-spacing:.3px;
}
@media(max-width:720px){
  .cert-card{grid-template-columns:1fr;text-align:center;padding:32px 24px;gap:24px}
  .cert-seal{margin:0 auto;width:120px;height:120px}
  .cert-meta{justify-content:center}
}

/* ── SALARY BREAKDOWN ── */
.salary-section{padding:90px 0;border-top:1px solid var(--border)}
.salary-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;max-width:1080px;margin:0 auto}
.salary-card{
  background:linear-gradient(180deg,rgba(28,20,19,.7),rgba(22,16,15,.5));
  border:1px solid var(--border);border-radius:18px;
  padding:26px 22px;position:relative;
  transition:border-color .3s,transform .3s;
}
.salary-card:hover{border-color:var(--border-2);transform:translateY(-4px)}
.salary-card.featured{
  border-color:var(--rose);
  background:linear-gradient(180deg,rgba(232,168,180,.10),rgba(196,104,121,.04));
  box-shadow:0 0 50px rgba(232,168,180,.15);
}
.salary-card.featured::before{
  content:'הכי משתלם';position:absolute;top:-12px;right:18px;
  background:linear-gradient(135deg,var(--rose),var(--rose-3));
  color:#1a0c0c;font-size:10px;font-weight:800;
  padding:5px 12px;border-radius:50px;letter-spacing:.5px;
}
.salary-icon{
  width:42px;height:42px;border-radius:12px;
  background:rgba(232,168,180,.08);border:1px solid var(--border-2);
  display:grid;place-items:center;color:var(--rose);margin-bottom:16px;
}
.salary-icon svg{width:20px;height:20px}
.salary-cat{font-size:15px;font-weight:700;color:var(--text);margin-bottom:6px}
.salary-range{
  font-size:22px;font-weight:800;color:var(--rose);
  letter-spacing:-.5px;line-height:1;margin-bottom:4px;
  font-variant-numeric:tabular-nums;
}
.salary-unit{font-size:12px;color:var(--dim);font-weight:500}
.salary-note{text-align:center;font-size:13px;color:var(--dim);margin-top:28px;font-weight:500}
@media(max-width:900px){.salary-grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:480px){.salary-grid{grid-template-columns:1fr;max-width:340px}}

/* ── GIFT SHOWCASE ── */
.gift-section{
  padding:90px 0;
  background:radial-gradient(ellipse 70% 90% at 50% 50%,rgba(232,168,180,.07),transparent 60%);
  border-top:1px solid var(--border);
}
.gift-grid{display:grid;grid-template-columns:1fr 1.1fr;gap:50px;align-items:center;max-width:1080px;margin:0 auto}
.gift-visual{
  position:relative;border-radius:24px;overflow:hidden;
  border:1px solid var(--border-2);aspect-ratio:1/1;background:#16100f;
  box-shadow:0 30px 80px rgba(0,0,0,.5),0 0 60px rgba(232,168,180,.12);
}
.gift-visual img{width:100%;height:100%;object-fit:cover;opacity:.95}
.gift-visual::after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,transparent 50%,rgba(10,6,6,.7))}
.gift-price-tag{
  position:absolute;top:24px;left:24px;z-index:2;
  background:linear-gradient(135deg,var(--rose),var(--rose-3));
  color:#1a0c0c;padding:12px 18px;border-radius:14px;
  font-weight:800;font-size:13px;
  box-shadow:0 12px 30px rgba(232,168,180,.35);
  text-align:center;line-height:1.2;
}
.gift-price-tag b{display:block;font-size:22px;letter-spacing:-.5px;margin-top:2px}
.gift-body h2{
  font-size:clamp(30px,4vw,46px);font-weight:800;
  color:var(--text);letter-spacing:-1.2px;line-height:1.1;
  margin:14px 0 16px;
}
.gift-body h2 span{color:var(--rose)}
.gift-body p{font-size:16px;color:var(--muted);line-height:1.7;margin-bottom:22px}
.gift-items{display:flex;flex-direction:column;gap:10px;margin-bottom:24px}
.gift-item{
  display:flex;align-items:center;gap:12px;
  font-size:14px;color:var(--text);font-weight:500;
  padding:12px 16px;background:rgba(28,20,19,.5);
  border:1px solid var(--border);border-radius:12px;
}
.gift-item svg{width:16px;height:16px;color:var(--rose);flex-shrink:0}
.gift-item b{color:var(--rose);font-weight:700;margin-right:auto}
@media(max-width:860px){
  .gift-grid{grid-template-columns:1fr;gap:32px;max-width:520px}
  .gift-visual{aspect-ratio:4/3;order:-1}
}


@media(max-width:1024px){
  .hero-cards{grid-template-columns:repeat(3,1fr);gap:12px}
  .benefits-grid,.steps-grid{grid-template-columns:1fr;max-width:520px}
  .testi-grid{grid-template-columns:1fr;max-width:520px}
  .final-grid{grid-template-columns:1fr;gap:40px}
  .stats-inner{grid-template-columns:repeat(2,1fr);gap:32px}
  .gallery-grid{grid-template-columns:1fr 1fr;max-width:600px}
  .gallery-tile:nth-child(3){grid-column:span 2;aspect-ratio:16/9}
  .how-with-image{grid-template-columns:1fr;gap:32px;max-width:520px}
  .how-image-wrap{aspect-ratio:16/10;order:-1}
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
  .hero-portrait-wrap{margin-top:40px;max-width:90%}
  .hero-floater{width:130px;bottom:-20px;left:-12px}
  .hero-badge-float{top:-14px;right:-8px;font-size:11px;padding:10px 14px}
  .gallery-grid{grid-template-columns:1fr;max-width:380px}
  .gallery-tile:nth-child(3){grid-column:auto;aspect-ratio:3/4}
}
@media(max-width:600px){
  .hero-cards{grid-template-columns:1fr;gap:10px;max-width:320px}
  .stats-inner{grid-template-columns:repeat(2,1fr);gap:24px}
  .stat-num{font-size:32px}
  .partners-band{padding:28px 0}
  .testi-card,.benefit-card{padding:24px 20px}
  .topbar-inner{padding:12px 0}
  .brand{font-size:14px}
  .brand small{font-size:10px}
  .btn-primary{width:100%;justify-content:center;font-size:14px;padding:16px 22px}
  .section-head{margin-bottom:36px}
  details summary{font-size:15px;padding:18px 0}
}
@media(max-width:480px){
  h1{font-size:34px;letter-spacing:-1px}
  .hero-sub{font-size:16px}
  .section-title,.final-title{font-size:28px}
  .wrap{width:94vw}
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

<!-- ══ INLINE LEAD BAND ══ -->
<section class="inline-lead" id="quick-form">
  <div class="wrap">
    <div class="inline-lead-card reveal-scale">
      <div class="inline-lead-head">
        <h2 class="inline-lead-title">השאירי פרטים — <span class="h1-accent">גלי כמה מלגה מגיעה לך</span></h2>
        <p class="inline-lead-sub">תוך 24 שעות נחזור אלייך לתאם פגישת ייעוץ חינמית · ללא התחייבות</p>
      </div>
      <form class="inline-form" onsubmit="submitForm(event)">
        <input class="form-input" type="text" placeholder="שם מלא *" required/>
        <input class="form-input" type="tel" placeholder="מספר טלפון *" required dir="ltr"/>
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
        <button type="submit" class="btn-submit">בדקי זכאות ←</button>
      </form>
      <p class="form-micro">הפרטים שלך מוגנים ולא יועברו לצד שלישי</p>
    </div>
  </div>
</section>

<!-- ══ PARTNERS / TRUST BAND ══ -->
<section class="partners-band">
  <div class="wrap">
    <div class="partners-label">מוסדות מאשרים ושותפים רשמיים</div>
    <div class="partners-row">
      <div class="partner-logo">
        <div class="partner-emblem">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l8 3v6c0 5-3.5 9-8 11-4.5-2-8-6-8-11V5l8-3z"/><path d="M9 12l2 2 4-4"/></svg>
        </div>
        <div class="partner-text">
          <div class="partner-name">צה״ל</div>
          <div class="partner-sub">מסלול מוכר לחיילים משוחררים</div>
        </div>
      </div>
      <div class="partner-divider"></div>
      <div class="partner-logo">
        <div class="partner-emblem">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l9 4v5c0 5.5-3.8 10.2-9 12-5.2-1.8-9-6.5-9-12V6l9-4z"/><path d="M9 11l2.5 2.5L16 9"/></svg>
        </div>
        <div class="partner-text">
          <div class="partner-name">משרד הביטחון</div>
          <div class="partner-sub">תשלום מלא דרך הפיקדון</div>
        </div>
      </div>
      <div class="partner-divider"></div>
      <div class="partner-logo">
        <div class="partner-emblem">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
        </div>
        <div class="partner-text">
          <div class="partner-name">אגף ההכוונה</div>
          <div class="partner-sub">מימון ומלגות מאושרות</div>
        </div>
      </div>
      <div class="partner-divider"></div>
      <div class="partner-logo">
        <div class="partner-emblem">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M9 13.5L7 22l5-3 5 3-2-8.5"/></svg>
        </div>
        <div class="partner-text">
          <div class="partner-name">תעודה בינלאומית</div>
          <div class="partner-sub">מוכרת בישראל ובחו״ל</div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ══ BENEFITS ══ -->
<section class="section">
  <div class="wrap">
    <div class="section-head reveal">
      <div class="section-tag">מה מקבלים בקורס</div>
      <h2 class="section-title">הטבות שלא תמצאי<br/>בשום מקום אחר</h2>
    </div>
    <div class="benefits-grid">
      <div class="benefit-card reveal-scale reveal-delay-1">
        <div class="benefit-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
        </div>
        <div class="benefit-title">מזוודת איפור מקצועית</div>
        <div class="benefit-text">מתנה — מזוודת איפור בשווי 11,000 ₪, מלאה ומוכנה לעבודה</div>
      </div>
      <div class="benefit-card reveal-scale reveal-delay-2">
        <div class="benefit-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M9 13.5L7 22l5-3 5 3-2-8.5"/></svg>
        </div>
        <div class="benefit-title">תעודת מאפרת בינלאומית</div>
        <div class="benefit-text">תעודה מוכרת שפותחת לך דלתות בכל העולם</div>
      </div>
      <div class="benefit-card reveal-scale reveal-delay-3">
        <div class="benefit-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 7h-3V5a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3v2H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/></svg>
        </div>
        <div class="benefit-title">דואגים לך לעבודה</div>
        <div class="benefit-text">בסיום הקורס — התחלת עבודה מיידית עם שכר גבוה</div>
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
    <div class="section-head reveal">
      <div class="section-tag">מה אומרות הבוגרות</div>
      <h2 class="section-title">הצלחות אמיתיות</h2>
    </div>
    <div class="testi-grid">
      <div class="testi-card reveal-scale reveal-delay-1">
        <div class="testi-stars">★★★★★</div>
        <p class="testi-text">סיימתי צבא ולא ידעתי מה לעשות עם הפיקדון. חברה סיפרה לי על הקורס הזה — היום אני עובדת בסטודיו מוביל בתל אביב ומרוויחה יפה מאוד.</p>
        <div class="testi-author">
          <div class="testi-avatar">ש</div>
          <div><div class="testi-name">שירה כ.</div><div class="testi-role">בוגרת הקורס · 2 שנים בתחום</div></div>
        </div>
      </div>
      <div class="testi-card reveal-scale reveal-delay-2">
        <div class="testi-stars">★★★★★</div>
        <p class="testi-text">לא הייתה לי שום ידע קודם. הגעתי בגלל התשוקה, נשארתי בגלל המקצוענות. הצוות מדהים, הלמידה מעמיקה והמזוודה שקיבלתי שווה הרבה.</p>
        <div class="testi-author">
          <div class="testi-avatar">מ</div>
          <div><div class="testi-name">מיכל א.</div><div class="testi-role">מאפרת עצמאית · לקוחות VIP</div></div>
        </div>
      </div>
      <div class="testi-card reveal-scale reveal-delay-3">
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
    <div class="section-head reveal">
      <div class="section-tag">שאלות נפוצות</div>
      <h2 class="section-title">שאלות חשובות</h2>
    </div>
    <div class="faq-list">
      <details open class="reveal reveal-delay-1">
        <summary>צריך ניסיון קודם?</summary>
        <p>בכלל לא. הקורס מתחיל מהבסיס ומלווה אותך צעד אחר צעד. מאות בוגרות הגיעו ללא כל ניסיון קודם.</p>
      </details>
      <details class="reveal reveal-delay-2">
        <summary>כמה עולה הקורס?</summary>
        <p>עלות הקורס תלויה במסלול שתבחרי. בפגישת הייעוץ נבדוק יחד כמה מלגה מגיעה לך ואיך ניתן לממן דרך הפיקדון.</p>
      </details>
      <details class="reveal reveal-delay-3">
        <summary>אפשר לשלם בפיקדון הצבאי?</summary>
        <p>כן! ניתן לשלם דרך הפיקדון הצבאי. נלווה אותך בתהליך מול הפיקדון כדי שיהיה פשוט ומהיר.</p>
      </details>
      <details class="reveal reveal-delay-4">
        <summary>מה השכר שאפשר לצפות לו?</summary>
        <p>שכר ממוצע יומי של 800–1,700 ש"ח. מאפרות מנוסות בחתונות ופרודקשן מרוויחות עד 2,000 ש"ח ליום.</p>
      </details>
      <details class="reveal reveal-delay-5">
        <summary>האם דואגים לי לעבודה?</summary>
        <p>כן. בסיום הקורס דואגים לך לעבודה ראשונה. יש לנו רשת קשרים ענפה עם מעסיקים בתחום.</p>
      </details>
      <details class="reveal reveal-delay-6">
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
      <div class="reveal-right">
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

      <div class="lead-card reveal-left">
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

<footer class="reveal">
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

    // Scroll reveal observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal, .reveal-scale, .reveal-right, .reveal-left').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <div dir="rtl" dangerouslySetInnerHTML={{ __html: BODY_HTML }} />
    </>
  );
}
