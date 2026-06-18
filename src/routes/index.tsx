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
@keyframes glow{0%,100%{opacity:.55;transform:translate(0,0)}50%{opacity:.95;transform:translate(2%,-1%)}}
@keyframes pulse{0%,100%{box-shadow:0 0 0 0 rgba(232,168,180,.45)}70%{box-shadow:0 0 0 14px rgba(232,168,180,0)}}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
@keyframes shimmer{0%{background-position:200% 50%}100%{background-position:-200% 50%}}
@keyframes auroraShift{0%,100%{transform:translate(-10%,-5%) rotate(0deg)}50%{transform:translate(8%,4%) rotate(8deg)}}
@keyframes auroraShift2{0%,100%{transform:translate(8%,4%) rotate(0deg)}50%{transform:translate(-6%,-3%) rotate(-10deg)}}
@keyframes accentHue{0%,100%{filter:hue-rotate(0deg)}50%{filter:hue-rotate(-18deg)}}
@keyframes ctaGlow{0%,100%{box-shadow:0 0 40px rgba(232,168,180,.35),0 12px 32px rgba(232,168,180,.22)}50%{box-shadow:0 0 80px rgba(232,168,180,.55),0 16px 40px rgba(232,168,180,.35)}}
@keyframes risePart{0%{opacity:0;transform:translateY(40px) scale(.96)}100%{opacity:1;transform:none}}

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
.partners-band .partner-logo:nth-child(7){animation:fadeIn .6s .55s both}
.partners-band .partner-logo:nth-child(9){animation:fadeIn .6s .7s both}
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
  padding:56px 0 48px;
  overflow:hidden;
}
.hero::before{
  content:'';position:absolute;
  top:-10%;left:-10%;width:70%;height:80%;
  background:radial-gradient(ellipse at center,rgba(232,168,180,.22) 0,rgba(196,104,121,.08) 35%,transparent 65%);
  pointer-events:none;
  animation:auroraShift 14s ease-in-out infinite;
  filter:blur(20px);
}
.hero::after{
  content:'';position:absolute;
  bottom:-15%;right:-10%;width:70%;height:80%;
  background:radial-gradient(ellipse at center,rgba(196,104,121,.18) 0,rgba(232,168,180,.05) 40%,transparent 70%);
  pointer-events:none;
  animation:auroraShift2 18s ease-in-out infinite;
  filter:blur(24px);
}
.hero-inner{position:relative;z-index:2;animation:fadeUp .8s ease both}
.hero-grid{display:grid;grid-template-columns:1.05fr 1fr;gap:56px;align-items:center}
.hero-brand-title{
  font-size:clamp(30px,4vw,48px);
  font-weight:900;
  letter-spacing:-1.5px;
  line-height:1.1;
  color:var(--text);
  margin-bottom:10px;
}
.hero-brand-line{
  height:4px;
  width:70px;
  border-radius:2px;
  background:linear-gradient(90deg,var(--rose),var(--rose-3));
  margin-bottom:22px;
}
@media(max-width:860px){
  .hero-brand-line{height:3px;width:55px}
}
.hero-text{text-align:right}
.eyebrow{
  display:inline-flex;align-items:center;gap:8px;
  font-size:13px;font-weight:600;color:var(--rose);
  letter-spacing:.4px;margin-bottom:22px;padding:7px 16px;
  border:1px solid var(--border-2);border-radius:50px;
  background:rgba(232,168,180,.04);backdrop-filter:blur(6px);
}
.eyebrow-dot{width:6px;height:6px;border-radius:50%;background:var(--rose);animation:pulse 2s infinite}
h1{
  font-family:'Heebo',sans-serif;
  font-size:clamp(34px,4.6vw,60px);
  line-height:1.05;font-weight:800;letter-spacing:-1.4px;
  color:var(--text);margin-bottom:18px;
}
.h1-accent{
  background:linear-gradient(90deg,#f0c2ce 0%,#e8a8b4 25%,#c46879 50%,#e8a8b4 75%,#f0c2ce 100%);
  background-size:200% 100%;
  -webkit-background-clip:text;background-clip:text;color:transparent;
  animation:shimmer 6s linear infinite;
}
.hero-sub{
  font-size:clamp(15px,1.4vw,18px);line-height:1.6;
  color:var(--muted);font-weight:500;margin-bottom:10px;
}
.hero-sub strong{color:var(--text);font-weight:700}
.btn-primary{
  display:inline-flex;align-items:center;gap:10px;
  background:linear-gradient(135deg,var(--rose),var(--rose-3));
  color:#1a0c0c;padding:18px 36px;border-radius:50px;
  text-decoration:none;font-weight:800;font-size:16px;
  transition:transform .25s cubic-bezier(.2,.8,.2,1),box-shadow .25s;
  margin-top:28px;border:0;cursor:pointer;font-family:inherit;
  animation:ctaGlow 3.4s ease-in-out infinite;position:relative;
}
.btn-primary:hover{transform:translateY(-2px) scale(1.02)}
@media(max-width:860px){
  .hero{padding:48px 0 40px}
  .hero-grid{grid-template-columns:1fr;gap:36px}
  .hero-text{text-align:center}
}

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

/* ── HERO COLLAGE ── */
.hero-collage{
  display:grid;grid-template-columns:1.35fr 1fr;gap:14px;
  max-width:520px;margin:0 0 0 auto;position:relative;z-index:2;
}
@media(max-width:860px){.hero-collage{margin:0 auto}}
.hero-collage-main,.hero-collage-side{
  position:relative;border-radius:24px;overflow:hidden;
  border:1px solid var(--border-2);background:#16100f;
  box-shadow:0 30px 80px rgba(0,0,0,.55),0 0 50px rgba(232,168,180,.10);
  opacity:0;animation:risePart .9s cubic-bezier(.2,.8,.2,1) both;
  transition:transform .5s cubic-bezier(.2,.8,.2,1),box-shadow .5s;
}
.hero-collage-main{aspect-ratio:4/5;animation-delay:.25s}
.hero-collage-side{aspect-ratio:3/4;align-self:end;animation-delay:.4s;animation:risePart .9s .4s cubic-bezier(.2,.8,.2,1) both,float 6.5s ease-in-out 1.4s infinite}
.hero-collage-main:hover,.hero-collage-side:hover{transform:translateY(-4px);box-shadow:0 40px 100px rgba(0,0,0,.6),0 0 80px rgba(232,168,180,.22)}
.hero-collage img{width:100%;height:100%;object-fit:cover;opacity:.95;display:block;transition:transform 1s cubic-bezier(.2,.8,.2,1)}
.hero-collage-main:hover img,.hero-collage-side:hover img{transform:scale(1.05)}
.hero-collage-main::after,.hero-collage-side::after{
  content:'';position:absolute;inset:0;
  background:linear-gradient(180deg,transparent 40%,rgba(10,6,6,.88));
  pointer-events:none;
}
.hero-collage-badge{
  position:absolute;bottom:14px;right:14px;left:14px;z-index:2;
  font-size:12px;font-weight:700;color:var(--text);
  background:rgba(10,6,6,.55);backdrop-filter:blur(8px);
  border:1px solid var(--border-2);border-radius:10px;
  padding:9px 12px;text-align:center;letter-spacing:.3px;
}
.hero-collage-tag{
  position:absolute;top:14px;right:14px;z-index:2;
  background:linear-gradient(135deg,var(--rose),var(--rose-3));
  color:#1a0c0c;padding:9px 13px;border-radius:14px;
  font-size:11px;font-weight:800;line-height:1.1;text-align:center;
  box-shadow:0 10px 30px rgba(232,168,180,.45),0 0 30px rgba(232,168,180,.3);
  animation:ctaGlow 3.4s ease-in-out infinite;
}
.hero-collage-tag b{display:block;font-size:17px;letter-spacing:-.3px;margin-top:3px}
@media(max-width:600px){
  .hero-collage{grid-template-columns:1.3fr 1fr;gap:10px;max-width:92vw}
  .hero-collage-main{aspect-ratio:3/4}
  .hero-collage-side{aspect-ratio:3/4}
  .hero-collage-badge{font-size:11px;padding:6px 10px}
}



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
.section{padding:64px 0;position:relative}
.compact-section{padding:44px 0}
.section-head{text-align:center;margin-bottom:36px;max-width:680px;margin-inline:auto}
.compact-section .section-head{margin-bottom:22px}
.section-tag{
  display:inline-block;
  font-size:11px;font-weight:600;
  letter-spacing:2px;text-transform:uppercase;
  color:var(--rose);
  margin-bottom:10px;
}
.section-title{
  font-size:clamp(28px,3.6vw,44px);
  font-weight:800;
  line-height:1.08;
  letter-spacing:-1.2px;
  color:var(--text);
  margin-bottom:10px;
}
.section-sub{font-size:15px;color:var(--muted);font-weight:500;line-height:1.6}

/* ── BENEFITS ── */
.benefits-layout{
  max-width:1080px;margin:0 auto;
  display:grid;grid-template-columns:1fr 1.05fr;gap:36px;align-items:center;
}
.benefits-image{
  position:relative;border-radius:22px;overflow:hidden;
  border:1px solid var(--border-2);
  aspect-ratio:4/5;
  box-shadow:0 30px 80px rgba(0,0,0,.55),0 0 60px rgba(232,168,180,.12);
}
.benefits-image img{width:100%;height:100%;object-fit:cover;object-position:center;display:block;transition:transform 1.2s cubic-bezier(.2,.8,.2,1)}
.benefits-image:hover img{transform:scale(1.05)}
.benefits-image::after{
  content:"";position:absolute;inset:0;
  background:linear-gradient(180deg,rgba(10,6,6,0) 45%,rgba(10,6,6,.85) 100%);
  pointer-events:none;
}
.benefits-image-tag{
  position:absolute;left:16px;right:16px;bottom:16px;z-index:2;
  text-align:center;font-size:13px;font-weight:700;color:var(--text);
  background:rgba(10,6,6,.55);backdrop-filter:blur(10px);
  border:1px solid var(--border-2);border-radius:12px;padding:10px 14px;
}
.benefits-grid{display:flex;flex-direction:column;gap:14px}
.benefit-card{
  background:linear-gradient(180deg,rgba(28,20,19,.6),rgba(22,16,15,.4));
  border:1px solid var(--border);
  border-radius:16px;
  padding:18px 18px;
  display:flex;align-items:center;gap:14px;text-align:right;
  transition:border-color .3s,transform .3s;
}
.benefit-card:hover{border-color:var(--border-2);transform:translateY(-2px)}
.benefit-icon{
  width:46px;height:46px;border-radius:12px;
  background:rgba(232,168,180,.08);
  border:1px solid var(--border-2);
  display:grid;place-items:center;flex-shrink:0;
  color:var(--rose);
}
.benefit-icon svg{width:22px;height:22px}
.benefit-body{min-width:0}
.benefit-title{font-size:16px;font-weight:700;color:var(--text);margin-bottom:3px}
.benefit-text{font-size:13px;color:var(--muted);font-weight:500;line-height:1.5}
@media(max-width:860px){
  .benefits-layout{grid-template-columns:1fr;gap:22px;max-width:520px}
  .benefits-image{aspect-ratio:4/5;max-width:380px;margin:0 auto;width:100%;border-radius:18px}
  .benefits-image-tag{font-size:12px;padding:8px 12px}
}

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
.steps-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;max-width:960px;margin:0 auto}
.step-card{
  background:linear-gradient(180deg,rgba(28,20,19,.6),rgba(22,16,15,.4));
  border:1px solid var(--border);
  border-radius:14px;
  padding:18px 16px;
  position:relative;
  transition:border-color .3s,transform .3s;
}
.step-card:hover{border-color:var(--border-2);transform:translateY(-3px)}
.step-num{
  font-size:13px;font-weight:700;
  color:var(--rose);
  letter-spacing:1px;
  margin-bottom:12px;
  opacity:.8;
}
.step-title{font-size:17px;font-weight:700;color:var(--text);margin-bottom:6px}
.step-text{font-size:13.5px;color:var(--muted);font-weight:500;line-height:1.55}

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
  padding:64px 0;
}
.final-grid{
  display:grid;grid-template-columns:1fr 1fr;gap:44px;
  max-width:1040px;margin:0 auto;align-items:center;
}
.final-title{
  font-size:clamp(28px,3.6vw,44px);
  font-weight:800;line-height:1.08;letter-spacing:-1.2px;
  color:var(--text);margin-bottom:14px;
}
.final-title-accent{color:var(--rose)}
.final-sub{font-size:15px;color:var(--muted);font-weight:500;line-height:1.6;margin-bottom:20px}
.final-points{display:flex;flex-direction:column;gap:10px}
.final-point{
  display:flex;align-items:center;gap:12px;
  font-size:14.5px;font-weight:500;color:var(--text);
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
  border-radius:22px;
  padding:28px 24px;
  backdrop-filter:blur(12px);
  box-shadow:0 30px 80px rgba(0,0,0,.4);
}
.lead-card-title{font-size:20px;font-weight:700;color:var(--text);margin-bottom:4px}
.lead-card-sub{font-size:13.5px;color:var(--muted);font-weight:500;margin-bottom:18px}
.form-field{margin-bottom:10px}
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
  padding:40px 0;
  background:
    radial-gradient(ellipse 60% 100% at 50% 50%,rgba(232,168,180,.12) 0,transparent 70%),
    linear-gradient(180deg,rgba(232,168,180,.04),transparent);
  border-top:1px solid var(--border);
  border-bottom:1px solid var(--border);
}
.inline-lead-card{
  background:rgba(22,16,15,.7);
  border:1px solid var(--border-2);
  border-radius:20px;
  padding:24px 28px;
  backdrop-filter:blur(14px);
  box-shadow:0 30px 80px rgba(0,0,0,.4);
  max-width:1080px;margin:0 auto;
}
.inline-lead-head{text-align:center;margin-bottom:16px}
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

/* ── BOTTOM BRAND ── */
.bottom-brand{
  padding:80px 0 20px;
  text-align:center;
}
.bottom-brand-inner{display:inline-block}
.bottom-brand-title{
  font-size:clamp(36px,5.5vw,64px);
  font-weight:900;
  letter-spacing:-2px;
  line-height:1.1;
  color:var(--text);
  margin-bottom:14px;
}
.bottom-brand-line{
  height:4px;
  width:80px;
  margin:0 auto;
  border-radius:2px;
  background:linear-gradient(90deg,var(--rose),var(--rose-3));
}
.bottom-brand-sub{
  font-size:clamp(15px,2vw,20px);
  font-weight:500;
  color:var(--muted);
  margin-top:18px;
  letter-spacing:1px;
}
@media(max-width:768px){
  .bottom-brand{padding:56px 0 16px}
  .bottom-brand-line{width:60px;height:3px}
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
  padding:32px 0;
}
.partners-label{
  text-align:center;font-size:11px;font-weight:700;
  letter-spacing:4px;text-transform:uppercase;
  color:var(--muted);margin-bottom:20px;
}
.partners-label::before,.partners-label::after{
  content:'';display:inline-block;width:40px;height:1px;
  background:var(--border-2);vertical-align:middle;margin:0 14px;
}
.partners-row{
  display:flex;align-items:stretch;justify-content:center;
  gap:0;flex-wrap:nowrap;
}
.partner-logo{
  display:flex;align-items:center;gap:14px;
  padding:6px 28px;
  flex-shrink:0;
}
.partner-emblem{
  width:64px;height:64px;border-radius:16px;
  display:grid;place-items:center;
  background:linear-gradient(135deg,rgba(245,236,234,.96),rgba(232,224,222,.88));
  border:1px solid var(--border-2);
  color:var(--rose);flex-shrink:0;
  box-shadow:inset 0 1px 0 rgba(255,255,255,.6),0 8px 24px rgba(0,0,0,.35);
  padding:8px;
  transition:transform .3s ease;
}
.partner-logo:hover .partner-emblem{transform:translateY(-2px) scale(1.04)}
.partner-emblem svg{width:28px;height:28px}
.partner-emblem img{width:100%;height:100%;object-fit:contain;display:block;filter:drop-shadow(0 1px 1px rgba(0,0,0,.15))}
.partner-name{font-size:16px;font-weight:800;color:var(--text);line-height:1.2;letter-spacing:-.3px}
.partner-sub{font-size:12px;color:var(--muted);font-weight:500;margin-top:4px;letter-spacing:.3px}
.partner-divider{
  width:1px;align-self:stretch;flex-shrink:0;
  background:linear-gradient(180deg,transparent,var(--border-2),transparent);
}
@media(max-width:1060px){
  .partner-logo{padding:6px 18px;gap:10px}
  .partner-emblem{width:48px;height:48px;border-radius:12px;padding:6px}
  .partner-emblem svg{width:22px;height:22px}
  .partner-name{font-size:14px}
  .partner-sub{font-size:11px}
}
@media(max-width:860px){
  .partners-row{gap:4px}
  .partner-logo{padding:6px 10px;gap:8px}
  .partner-emblem{width:40px;height:40px;border-radius:10px;padding:5px}
  .partner-emblem svg{width:18px;height:18px}
  .partner-name{font-size:12.5px}
  .partner-sub{font-size:10px}
}
@media(max-width:760px){
  .partners-band{padding:32px 0}
}
@media(max-width:560px){
  .partners-row{overflow-x:auto;justify-content:flex-start;padding:0 4px;-webkit-overflow-scrolling:touch;scrollbar-width:none}
  .partners-row::-webkit-scrollbar{display:none}
  .partners-band .wrap{max-width:100%}
  .partner-logo{padding:6px 8px;gap:6px}
  .partner-emblem{width:36px;height:36px;border-radius:8px;padding:4px}
  .partner-name{font-size:11.5px}
  .partner-sub{font-size:9.5px}
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

/* ── SHOWCASE ── */
.showcase-section{padding:110px 0;border-top:1px solid var(--border);background:radial-gradient(ellipse 70% 90% at 50% 50%,rgba(232,168,180,.05),transparent 65%)}
.showcase-grid{display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:center;max-width:1080px;margin:0 auto}
.showcase-media{position:relative;border-radius:26px;overflow:hidden;border:1px solid var(--border-2);aspect-ratio:4/5;background:#16100f;box-shadow:0 40px 100px rgba(0,0,0,.55),0 0 70px rgba(232,168,180,.12);animation:float 7s ease-in-out infinite}
.showcase-media img{width:100%;height:100%;object-fit:cover;opacity:.95;transition:transform .8s ease}
.showcase-media:hover img{transform:scale(1.04)}
.showcase-media::after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,transparent 55%,rgba(10,6,6,.7));pointer-events:none}
.showcase-media-badge{position:absolute;bottom:20px;right:20px;left:20px;z-index:2;text-align:center;font-size:13px;font-weight:700;color:var(--text);background:rgba(10,6,6,.55);backdrop-filter:blur(10px);border:1px solid var(--border-2);border-radius:12px;padding:10px 14px}
.showcase-body .section-title{text-align:right}
@media(max-width:860px){
  .showcase-grid{grid-template-columns:1fr;gap:36px;max-width:520px}
  .showcase-media{aspect-ratio:4/5;max-width:420px;margin:0 auto;width:100%}
  .showcase-body{text-align:center}
  .showcase-body .section-title{text-align:center}
  .showcase-section{padding:80px 0}
}

/* ── HOW IT WORKS REFINED ── */
.how-section{border-top:1px solid var(--border)}
.step-card{text-align:right;display:grid;grid-template-columns:auto 1fr;column-gap:12px;align-items:start;min-height:126px}
.step-num-big{
  grid-row:1 / span 3;
  font-size:28px;font-weight:900;line-height:1;
  background:linear-gradient(135deg,var(--rose),var(--rose-3));
  -webkit-background-clip:text;background-clip:text;color:transparent;
  letter-spacing:-.5px;margin-top:3px;opacity:.95;
}
.step-icon{
  width:34px;height:34px;border-radius:10px;
  background:rgba(232,168,180,.08);border:1px solid var(--border-2);
  display:grid;place-items:center;color:var(--rose);margin-bottom:8px;
}
.step-icon svg{width:17px;height:17px}


@media(max-width:1024px){
  .hero-cards{grid-template-columns:repeat(3,1fr);gap:12px}
  .benefits-grid,.steps-grid{grid-template-columns:1fr;max-width:520px;margin-inline:auto}
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
  .section{padding:54px 0}
  .compact-section{padding:38px 0}
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
  .testi-card{padding:24px 20px}
  .compact-section{padding:30px 0}
  .compact-section .section-tag{margin-bottom:6px;font-size:10px;letter-spacing:1.4px}
  .compact-section .section-title{font-size:24px;line-height:1.15;margin:0 auto;letter-spacing:0;max-width:330px;text-wrap:balance}
  .benefit-card,.step-card{min-height:82px;padding:12px 12px;border-radius:12px}
  .benefits-grid,.steps-grid{gap:8px;max-width:360px}
  .benefit-title,.step-title{font-size:15px}
  .benefit-text,.step-text{font-size:12.5px;line-height:1.45}
  .step-num-big{font-size:24px}
  .step-icon{width:30px;height:30px;margin-bottom:6px}
  .topbar-inner{padding:12px 0}
  .brand{font-size:14px}
  .brand small{font-size:10px}
  .btn-primary{width:100%;justify-content:center;font-size:14px;padding:16px 22px}
  .section-head{margin-bottom:26px}
  .compact-section .section-head{margin-bottom:16px}
  details summary{font-size:15px;padding:18px 0}
}
@media(max-width:480px){
  h1{font-size:32px;letter-spacing:-1px}
  .hero-sub{font-size:15px}
  .section-title,.final-title{font-size:26px}
  .wrap{width:94vw}
}

/* ── MOBILE POLISH ── */
@media(max-width:860px){
  .hero-brand-line{margin-left:auto;margin-right:auto}
}
@media(max-width:768px){
  .partners-label{font-size:11px;margin-bottom:18px}

  /* Hero collage appears immediately on mobile */
  .hero-grid{display:flex;flex-direction:column;gap:24px}
  .hero-collage{order:-1;grid-template-columns:1.25fr 1fr;gap:10px;max-width:360px;margin:0 auto 2px}
  .hero-collage-main,.hero-collage-side{aspect-ratio:3/4;align-self:end}

  /* Tighten section paddings */
  .section{padding:46px 0}
  .compact-section{padding:34px 0}
  .final-section{padding:56px 0}
  .inline-lead{padding:36px 0}
  .partners-band{padding:30px 0 22px}

  /* Inline lead card tighter */
  .inline-lead-card{padding:22px 16px;border-radius:18px}
  .inline-lead-title{font-size:22px;line-height:1.25}
  .inline-lead-sub{font-size:13px;margin-top:6px}
  .inline-form{gap:10px}
  .form-input{padding:14px 14px;font-size:15px}

  /* Final CTA tighter */
  .final-grid{gap:28px}
  .lead-card{padding:24px 18px;border-radius:20px}
  .lead-card-title{font-size:20px}
  .lead-card-sub{font-size:13px}
  .final-points{gap:8px;margin-top:18px}
  .final-point{font-size:14px}

  /* Section heads tighter */
  .section-head{margin-bottom:22px}
  .compact-section .section-head{margin-bottom:14px}
  .section-head::after{margin-top:10px;width:48px;height:2px}

  /* Sticky CTA */
  .sticky-mobile a{font-size:15px;padding:14px 18px}
}
@media(max-width:480px){
  .hero-collage{max-width:330px}
  .hero-brand-title{font-size:24px;letter-spacing:-1px;margin-bottom:8px}
  .hero-brand-line{height:3px;width:46px;margin-bottom:16px}
  .eyebrow{font-size:11.5px;padding:6px 12px;margin-bottom:16px}
  .btn-primary{padding:15px 22px;font-size:14px;margin-top:22px;width:100%;justify-content:center}
  .inline-lead-title{font-size:19px}
  .final-title{font-size:24px;line-height:1.2}
  .final-sub{font-size:14px;line-height:1.55}
}

/* ── EXTRA MOTION LAYER ── */
@keyframes textShine{0%{background-position:200% 50%}100%{background-position:-200% 50%}}
@keyframes iconBob{0%,100%{transform:translateY(0) rotate(0)}50%{transform:translateY(-4px) rotate(-3deg)}}
@keyframes ringPulse{0%{box-shadow:0 0 0 0 rgba(232,168,180,.5)}70%{box-shadow:0 0 0 12px rgba(232,168,180,0)}100%{box-shadow:0 0 0 0 rgba(232,168,180,0)}}
@keyframes underlineGrow{from{transform:scaleX(0)}to{transform:scaleX(1)}}
@keyframes tiltIn{from{opacity:0;transform:perspective(800px) rotateX(12deg) translateY(24px)}to{opacity:1;transform:none}}
@keyframes badgeWobble{0%,100%{transform:rotate(-2deg)}50%{transform:rotate(2deg)}}
@keyframes drift{0%,100%{transform:translate(0,0)}50%{transform:translate(6px,-6px)}}
@keyframes gradientMove{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}

/* Animated gradient on section titles */
.section-title,.final-title{
  background:linear-gradient(90deg,#f5ecea 0%,#f5ecea 35%,#e8a8b4 50%,#f5ecea 65%,#f5ecea 100%);
  background-size:200% auto;
  -webkit-background-clip:text;background-clip:text;
  -webkit-text-fill-color:transparent;
  animation:textShine 6s linear infinite;
}

/* Animated underline under section titles */
.section-head{position:relative}
.section-head::after{
  content:"";display:block;margin:14px auto 0;width:64px;height:3px;border-radius:3px;
  background:linear-gradient(90deg,var(--rose),var(--rose-3));
  transform-origin:center;transform:scaleX(0);
  transition:transform .9s cubic-bezier(.25,.46,.45,.94) .15s;
}
.section-head.revealed::after{transform:scaleX(1)}

/* Cards: lift + glow on hover */
.benefit-card,.step-card,.partner-logo,.lead-card,.inline-lead-card{
  transition:transform .45s cubic-bezier(.2,.8,.2,1),box-shadow .45s,border-color .45s,background .45s;
}
.benefit-card:hover,.step-card:hover{
  transform:translateY(-6px);
  border-color:var(--border-2);
  box-shadow:0 18px 40px rgba(0,0,0,.45),0 0 0 1px rgba(232,168,180,.18),0 0 36px rgba(232,168,180,.12);
}
.benefit-card:hover .benefit-icon,.step-card:hover .step-icon{
  transform:scale(1.08) rotate(-4deg);
  background:linear-gradient(135deg,var(--rose),var(--rose-3));
  color:#1a0e0e;
}
.benefit-icon,.step-icon{transition:transform .45s cubic-bezier(.2,.8,.2,1),background .45s,color .45s}

/* Continuous gentle bob on icons */
.benefit-card .benefit-icon{animation:iconBob 5s ease-in-out infinite}
.benefit-card:nth-child(2) .benefit-icon{animation-delay:-1.6s}
.benefit-card:nth-child(3) .benefit-icon{animation-delay:-3.2s}
.step-card .step-icon{animation:iconBob 5.5s ease-in-out infinite}
.step-card:nth-child(2) .step-icon{animation-delay:-1.8s}
.step-card:nth-child(3) .step-icon{animation-delay:-3.6s}

/* Step number shimmer */
.step-num-big{
  background:linear-gradient(90deg,var(--rose),var(--rose-3),var(--rose));
  background-size:200% auto;
  -webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;
  animation:textShine 4s linear infinite;
}

/* Partner logos: stagger hover */
.partner-logo{cursor:default}
.partner-logo:hover{transform:translateY(-3px);background:rgba(232,168,180,.06)}
.partner-emblem{transition:transform .5s cubic-bezier(.2,.8,.2,1)}
.partner-logo:hover .partner-emblem{transform:scale(1.1) rotate(-6deg)}

/* Hero badges drift */
.hero-collage-badge{animation:badgeWobble 5s ease-in-out infinite}
.hero-collage-tag{animation:float 5s ease-in-out infinite}

/* Eyebrow extra pulse ring */
.eyebrow-dot{position:relative}
.eyebrow-dot::after{
  content:"";position:absolute;inset:-4px;border-radius:50%;
  animation:ringPulse 2.4s ease-out infinite;
}

/* CTA buttons: animated gradient + hover lift */
.btn-primary,.btn-submit,.topbar-cta{
  background:linear-gradient(120deg,var(--rose),var(--rose-3),var(--rose-2),var(--rose));
  background-size:300% 100%;
  animation:gradientMove 6s ease infinite;
  transition:transform .35s cubic-bezier(.2,.8,.2,1),box-shadow .35s,filter .35s;
}
.btn-primary:hover,.btn-submit:hover,.topbar-cta:hover{
  transform:translateY(-3px) scale(1.02);
  filter:brightness(1.08);
  box-shadow:0 18px 44px rgba(232,168,180,.45);
}

/* Final points: slide-in with stagger */
.final-point{opacity:0;transform:translateX(20px);transition:opacity .6s,transform .6s}
.reveal-right.revealed .final-point{opacity:1;transform:none}
.reveal-right.revealed .final-point:nth-child(1){transition-delay:.25s}
.reveal-right.revealed .final-point:nth-child(2){transition-delay:.35s}
.reveal-right.revealed .final-point:nth-child(3){transition-delay:.45s}
.reveal-right.revealed .final-point:nth-child(4){transition-delay:.55s}
.reveal-right.revealed .final-point:nth-child(5){transition-delay:.65s}
.final-point .final-dot{transition:transform .4s,background .4s}
.final-point:hover .final-dot{transform:scale(1.25) rotate(360deg)}

/* Form inputs focus motion */
.form-input{transition:border-color .3s,box-shadow .3s,transform .3s,background .3s}
.form-input:focus{transform:translateY(-1px);box-shadow:0 0 0 4px rgba(232,168,180,.18),0 8px 24px rgba(0,0,0,.3);outline:none}

/* Hero brand line draw */
.hero-brand-line{transform-origin:right center;animation:underlineGrow 1s cubic-bezier(.2,.8,.2,1) .5s both}

/* Hero images subtle zoom on hover */
.hero-collage-main img,.hero-collage-side img{transition:transform 1.1s cubic-bezier(.2,.8,.2,1)}
.hero-collage-main:hover img,.hero-collage-side:hover img{transform:scale(1.06)}

/* Benefit/Step card reveal: add tilt feel */
.reveal-scale{transition:opacity .8s cubic-bezier(.2,.8,.2,1),transform .8s cubic-bezier(.2,.8,.2,1)}

/* Sticky mobile pulse */
.sticky-mobile a{animation:ctaGlow 3s ease-in-out infinite}

/* Topbar brand mark spin on hover */
.brand-mark{transition:transform .6s cubic-bezier(.2,.8,.2,1)}
.brand:hover .brand-mark{transform:rotate(180deg) scale(1.15)}

/* Footer subtle drift */
footer .footer-text{transition:color .4s}
footer:hover .footer-text{color:var(--rose)}

@media (prefers-reduced-motion: reduce){
  *,*::before,*::after{animation-duration:.001ms !important;animation-iteration-count:1 !important;transition-duration:.001ms !important}
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
      <div class="hero-grid">
        <div class="hero-text">
          <div class="eyebrow">
            <span class="eyebrow-dot"></span>
            בשיתוף בית הספר הגדול בארץ לביוטי
          </div>
          <div class="hero-brand-title">קורס מאפרת מקצועית</div>
          <div class="hero-brand-line"></div>
          <h1>דואגים לך <span class="h1-accent">לעבודה</span><br/>בסיום הלימודים</h1>
          <p class="hero-sub">6–8 חודשים · תעודה בינלאומית · מזוודת איפור מתנה</p>
          <p class="hero-sub"><strong>שכר יומי ממוצע של 800–1,700 ש״ח</strong></p>
          <a href="#form" class="btn-primary">אני רוצה לדעת כמה מלגה מגיעה לי ←</a>
        </div>
        <div class="hero-collage">
          <div class="hero-collage-main">
            <img src="/assets/hero_woman.jpg" alt="בוגרת הקורס - חיילת משוחררת"/>
            <div class="hero-collage-badge">חיילות משוחררות · מסלול פיקדון</div>
          </div>
          <div class="hero-collage-side">
            <img src="/assets/beauty_case.jpg" alt="מזוודת איפור מתנה בשווי 11,000 ש״ח"/>
            <div class="hero-collage-tag">מתנה בשווי<b>11,000 ש״ח</b></div>
          </div>
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
      <form class="inline-form" onsubmit="submitForm(event)" novalidate>
        <input class="form-input" name="fullName" type="text" placeholder="שם מלא *" required/>
        <input class="form-input" name="phone" type="tel" placeholder="מספר טלפון *" required dir="ltr" inputmode="numeric" maxlength="10"/>
        <select class="form-input" name="branch" required>
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
        <p class="form-error" data-form-error style="grid-column:1/-1;display:none;color:#fca5a5;font-size:13px;margin:6px 0 0;text-align:center"></p>
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
          <img src="/__l5e/assets-v1/940825e7-6625-41ef-8ca1-576b1908f1ea/idf.svg" alt="לוגו צה״ל"/>
        </div>
        <div class="partner-text">
          <div class="partner-name">צה״ל</div>
          <div class="partner-sub">מסלול מוכר לחיילים משוחררים</div>
        </div>
      </div>
      <div class="partner-divider"></div>
      <div class="partner-logo">
        <div class="partner-emblem">
          <img src="/__l5e/assets-v1/baf6dba6-5f7e-49f3-bc69-aa6313699953/mod.svg" alt="לוגו משרד הביטחון"/>
        </div>
        <div class="partner-text">
          <div class="partner-name">משרד הביטחון</div>
          <div class="partner-sub">תשלום מלא דרך הפיקדון</div>
        </div>
      </div>
      <div class="partner-divider"></div>
      <div class="partner-logo">
        <div class="partner-emblem">
          <img src="/__l5e/assets-v1/594ddad4-37c7-4484-8fff-08ff0bcb93df/agaf.svg" alt="לוגו האגף לחיילים משוחררים"/>
        </div>
        <div class="partner-text">
          <div class="partner-name">האגף לחיילים משוחררים</div>
          <div class="partner-sub">מימון ומלגות מאושרות</div>
        </div>
      </div>
      <div class="partner-divider"></div>
      <div class="partner-logo">
        <div class="partner-emblem">
          <img src="/__l5e/assets-v1/d9b4b488-824d-40fb-911b-d1970355dc61/ministry-labor-logo.png" alt="לוגו משרד העבודה"/>
        </div>
        <div class="partner-text">
          <div class="partner-name">משרד העבודה</div>
          <div class="partner-sub">מוכר ומאושר על ידי הממשלה</div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ══ BENEFITS ══ -->
<section class="section compact-section">
  <div class="wrap">
    <div class="section-head reveal">
      <div class="section-tag">מה מקבלים בקורס</div>
      <h2 class="section-title">הטבות בלעדיות לקורס</h2>
    </div>
    <div class="benefits-layout">
      <div class="benefits-image reveal-scale">
        <img src="/__l5e/assets-v1/bb1c803a-2e54-4e93-a6fd-22d0da2ebc77/benefits-makeup-artist.png" alt="מאפרת מקצועית בעבודה - הטבות הקורס"/>
        <div class="benefits-image-tag">לימוד מעשי בסטודיו מקצועי · ליווי אישי עד להשמה</div>
      </div>
      <div class="benefits-grid">
        <div class="benefit-card reveal-scale reveal-delay-1">
          <div class="benefit-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
          </div>
          <div class="benefit-body">
            <div class="benefit-title">מזוודת איפור מקצועית</div>
            <div class="benefit-text">מתנה — מזוודת איפור בשווי 11,000 ₪, מלאה ומוכנה לעבודה</div>
          </div>
        </div>
        <div class="benefit-card reveal-scale reveal-delay-2">
          <div class="benefit-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M9 13.5L7 22l5-3 5 3-2-8.5"/></svg>
          </div>
          <div class="benefit-body">
            <div class="benefit-title">תעודת מאפרת בינלאומית</div>
            <div class="benefit-text">תעודה מוכרת שפותחת לך דלתות בכל העולם</div>
          </div>
        </div>
        <div class="benefit-card reveal-scale reveal-delay-3">
          <div class="benefit-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 7h-3V5a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3v2H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/></svg>
          </div>
          <div class="benefit-body">
            <div class="benefit-title">דואגים לך לעבודה</div>
            <div class="benefit-text">בסיום הקורס — התחלת עבודה מיידית עם שכר גבוה</div>
          </div>
        </div>
        <div class="benefit-card reveal-scale reveal-delay-4">
          <div class="benefit-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>
          </div>
          <div class="benefit-body">
            <div class="benefit-title">גיפטקארד בשווי 900 ₪</div>
            <div class="benefit-text">כרטיס מתנה לאיפור מקצועי בכל רשתות הקוסמטיקה המובילות</div>
          </div>
        </div>
        <div class="benefit-card reveal-scale reveal-delay-5">
          <div class="benefit-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
          </div>
          <div class="benefit-body">
            <div class="benefit-title">2 ימי צילום לבניית פורטפוליו</div>
            <div class="benefit-text">צילומי תדמית מקצועיים לדוגמניות — תבני פורטפוליו מרשים</div>
          </div>
        </div>
        <div class="benefit-card reveal-scale reveal-delay-6">
          <div class="benefit-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          </div>
          <div class="benefit-body">
            <div class="benefit-title">מאסטרים עם מאפרים מובילים</div>
            <div class="benefit-text">השתתפות במאסטרקלאסים אקסקלוסיביים עם השמות הגדולים בתעשייה</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>



<!-- ══ HOW IT WORKS ══ -->
<section class="section compact-section how-section">
  <div class="wrap">
    <div class="section-head reveal">
      <div class="section-tag">איך זה עובד</div>
      <h2 class="section-title">3 צעדים להתחלה</h2>
    </div>
    <div class="steps-grid">
      <div class="step-card reveal-scale reveal-delay-1">
        <div class="step-num-big">01</div>
        <div class="step-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
        </div>
        <div class="step-title">השאירי פרטים</div>
        <div class="step-text">מלאי שם וטלפון בטופס — לוקח 10 שניות</div>
      </div>
      <div class="step-card reveal-scale reveal-delay-2">
        <div class="step-num-big">02</div>
        <div class="step-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z"/></svg>
        </div>
        <div class="step-title">פגישת ייעוץ חינמית</div>
        <div class="step-text">ניצור קשר ונקבע פגישה אישית — בלי התחייבות</div>
      </div>
      <div class="step-card reveal-scale reveal-delay-3">
        <div class="step-num-big">03</div>
        <div class="step-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l2.39 4.84L20 8l-4 3.9.94 5.46L12 14.77 7.06 17.36 8 11.9 4 8l5.61-1.16L12 2z"/></svg>
        </div>
        <div class="step-title">מתחילה ללמוד ולהרוויח</div>
        <div class="step-text">נכנסת לקורס, מקבלת מזוודה ותעודה, ומתחילה לעבוד</div>
      </div>
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
        <form onsubmit="submitForm(event)" novalidate>
          <div class="form-field">
            <input class="form-input" name="fullName" type="text" placeholder="שם מלא *" required/>
          </div>
          <div class="form-field">
            <input class="form-input" name="phone" type="tel" placeholder="מספר טלפון *" required dir="ltr" inputmode="numeric" maxlength="10"/>
          </div>
          <div class="form-field">
            <select class="form-input" name="branch" required>
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
          <p class="form-error" data-form-error style="display:none;color:#fca5a5;font-size:13px;margin:10px 0 0;text-align:center"></p>
          <p class="form-micro">הפרטים שלך מוגנים ולא יועברו לצד שלישי</p>
        </form>
      </div>
    </div>
  </div>
</section>

<!-- bottom-brand removed — moved to hero -->

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
