import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "קורס מאפרת מקצועית | בדיקת זכאות למלגה" },
      { name: "description", content: "קורס מאפרת מקצועית — לבנות אחרי צבא / שירות לאומי. מזוודה בשווי 11,000 ₪, תעודה בינלאומית ומלגה לנרשמות." },
    ],
  }),
  component: LandingPage,
});

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Frank+Ruhl+Libre:wght@300;400;500;700;900&family=Heebo:wght@400;500;700;800;900&display=swap');

:root{
  --ink:#18120f;
  --ink2:#3a2618;
  --muted:#7a6a60;
  --rose:#c85c70;
  --rose-dark:#9e344b;
  --rose-pale:#fce8eb;
  --gold:#c79a43;
  --gold2:#f5d88c;
  --gold3:#e8c778;
  --cream:#fff8f3;
  --paper:#fffdf9;
  --shadow:0 32px 80px rgba(78,44,25,.18);
  --shadow-sm:0 12px 32px rgba(78,44,25,.10);
  --r:28px;
}
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{
  font-family:'Heebo',sans-serif;
  background:#fffdf9;
  color:var(--ink);
  direction:rtl;
  overflow-x:hidden;
}

/* ── ANIMATIONS ── */
@keyframes fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
@keyframes shimmer{0%{background-position:200% center}100%{background-position:-200% center}}
@keyframes pulse{0%,100%{box-shadow:0 0 0 0 rgba(199,154,67,.4)}70%{box-shadow:0 0 0 16px rgba(199,154,67,0)}}

.wrap{width:min(1200px,92vw);margin:auto}

/* ── TOPBAR ── */
.topbar{
  position:sticky;top:0;z-index:100;
  background:rgba(255,253,249,.92);
  backdrop-filter:blur(24px);
  -webkit-backdrop-filter:blur(24px);
  border-bottom:1px solid rgba(199,154,67,.18);
}
.topbar-inner{
  display:flex;align-items:center;justify-content:space-between;
  padding:13px 0;
}
.brand{
  display:flex;align-items:center;gap:12px;
  font-family:'Frank Ruhl Libre',serif;
  font-weight:900;font-size:19px;color:var(--ink);
  text-decoration:none;
}
.brand-mark{
  width:44px;height:44px;border-radius:13px;
  background:linear-gradient(135deg,#1a1008,#3a2618);
  display:grid;place-items:center;
  color:var(--gold2);font-size:20px;
  box-shadow:0 8px 20px rgba(0,0,0,.2);
}
.topbar-nav{display:flex;align-items:center;gap:14px}
.topbar-phone{
  font-size:14px;font-weight:700;color:var(--muted);
  text-decoration:none;
  display:flex;align-items:center;gap:5px;
}
.topbar-cta{
  background:linear-gradient(135deg,var(--rose),var(--rose-dark));
  color:#fff;padding:11px 22px;border-radius:50px;
  text-decoration:none;font-weight:900;font-size:14px;
  box-shadow:0 8px 24px rgba(200,92,112,.34);
  transition:transform .2s,box-shadow .2s;
  white-space:nowrap;
}
.topbar-cta:hover{transform:translateY(-2px);box-shadow:0 12px 32px rgba(200,92,112,.44)}

/* ── TRUST BAR ── */
.trust-bar{
  background:linear-gradient(135deg,#1a1008 0%,#2e1e10 100%);
  padding:12px 0;
  overflow:hidden;
}
.trust-bar-inner{
  display:flex;align-items:center;justify-content:center;
  gap:0;flex-wrap:wrap;
}
.trust-item{
  display:flex;align-items:center;gap:7px;
  color:var(--gold2);font-size:13px;font-weight:700;
  padding:4px 20px;
  white-space:nowrap;
}
.trust-item svg{width:16px;height:16px;flex-shrink:0}
.trust-divider{width:1px;height:20px;background:rgba(245,216,140,.25)}

/* ── HERO ── */
.hero{
  position:relative;
  background:linear-gradient(155deg,#fffdf8 0%,#fff4f0 45%,#fffaf5 100%);
  padding:60px 0 80px;
  overflow:hidden;
}
.hero::before{
  content:'';position:absolute;
  top:-80px;left:-8vw;
  width:600px;height:600px;
  background:radial-gradient(circle,rgba(247,217,220,.6) 0,transparent 68%);
  pointer-events:none;
}
.hero::after{
  content:'';position:absolute;
  bottom:-60px;right:5vw;
  width:480px;height:480px;
  background:radial-gradient(circle,rgba(199,154,67,.12) 0,transparent 68%);
  pointer-events:none;
}
.hero-grid{
  position:relative;z-index:2;
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:48px;align-items:center;
}
.hero-copy{animation:fadeUp .7s ease both}
.eyebrow{
  display:inline-flex;align-items:center;gap:8px;
  padding:9px 16px;
  border:1px solid rgba(199,154,67,.4);
  border-radius:50px;
  background:rgba(255,252,246,.9);
  font-size:13px;font-weight:800;color:#7c5521;
  margin-bottom:20px;
  letter-spacing:.3px;
}
.eyebrow-dot{
  width:7px;height:7px;border-radius:50%;
  background:var(--rose);
  animation:pulse 2s infinite;
}
h1{
  font-family:'Frank Ruhl Libre',serif;
  font-size:clamp(50px,6vw,86px);
  line-height:.92;
  font-weight:900;
  letter-spacing:-2.5px;
  color:var(--ink);
  margin-bottom:16px;
}
.gold-text{
  background:linear-gradient(160deg,var(--gold3) 0%,#a97726 50%,var(--gold2) 100%);
  background-size:200% auto;
  -webkit-background-clip:text;background-clip:text;
  color:transparent;
  animation:shimmer 4s linear infinite;
}
.hero-sub{
  font-size:clamp(17px,1.8vw,21px);
  line-height:1.6;
  color:var(--ink2);
  font-weight:600;
  margin-bottom:22px;
  max-width:480px;
}
.salary-highlight{
  background:linear-gradient(135deg,#1a1008 0%,#2e1e10 100%);
  border-radius:20px;
  padding:20px 24px;
  margin-bottom:22px;
  position:relative;overflow:hidden;
  box-shadow:var(--shadow);
}
.salary-highlight::after{
  content:'';position:absolute;
  top:-50%;left:-50%;width:200%;height:200%;
  background:radial-gradient(circle at 70% 30%,rgba(199,154,67,.15) 0,transparent 60%);
  pointer-events:none;
}
.salary-label{font-size:12px;color:rgba(245,216,140,.7);font-weight:700;letter-spacing:.5px;text-transform:uppercase;margin-bottom:4px}
.salary-amount{
  font-family:'Frank Ruhl Libre',serif;
  font-size:clamp(32px,4vw,46px);
  font-weight:900;
  color:var(--gold2);
  line-height:1;
  margin-bottom:4px;
}
.salary-note{font-size:13px;color:rgba(255,255,255,.65);font-weight:600}

.ticks{display:flex;flex-direction:column;gap:9px;margin-bottom:26px}
.tick{
  display:flex;align-items:center;gap:10px;
  background:rgba(255,255,255,.85);
  border:1px solid rgba(199,154,67,.2);
  border-radius:12px;
  padding:11px 14px;
  font-size:14px;font-weight:700;color:var(--ink);
  transition:transform .2s,box-shadow .2s;
}
.tick:hover{transform:translateX(-3px);box-shadow:var(--shadow-sm)}
.tick-icon{
  width:24px;height:24px;border-radius:8px;
  background:linear-gradient(135deg,var(--rose),var(--rose-dark));
  color:#fff;font-size:11px;font-weight:900;
  display:grid;place-items:center;flex-shrink:0;
}
.btn-primary{
  display:inline-flex;align-items:center;gap:8px;
  background:linear-gradient(135deg,var(--rose),var(--rose-dark));
  color:#fff;padding:18px 36px;border-radius:50px;
  text-decoration:none;font-weight:900;font-size:17px;
  box-shadow:0 16px 40px rgba(200,92,112,.4);
  transition:transform .2s,box-shadow .2s;
  width:100%;justify-content:center;
  margin-bottom:10px;
}
.btn-primary:hover{transform:translateY(-3px);box-shadow:0 22px 50px rgba(200,92,112,.5)}
.btn-note{font-size:12px;color:var(--muted);text-align:center;font-weight:600}

/* HERO ART */
.hero-art{
  position:relative;
  animation:fadeUp .9s .2s ease both;
}
.hero-portrait{
  position:relative;
  border-radius:42px;overflow:hidden;
  box-shadow:0 40px 100px rgba(78,44,25,.22);
  border:7px solid #fff;
  aspect-ratio:3/4;
}
.hero-portrait img{
  width:100%;height:100%;object-fit:cover;
  display:block;
}
.hero-case-float{
  position:absolute;
  bottom:-30px;left:-40px;
  width:55%;
  border-radius:28px;overflow:hidden;
  box-shadow:0 24px 60px rgba(78,44,25,.2);
  border:6px solid #fff;
  animation:float 5s ease-in-out infinite;
}
.hero-case-float img{width:100%;display:block}
.hero-badge{
  position:absolute;
  top:32px;left:-20px;
  background:linear-gradient(145deg,var(--gold3),#b8832a);
  border-radius:50%;
  width:110px;height:110px;
  display:grid;place-items:center;text-align:center;
  border:5px solid #fff;
  box-shadow:0 16px 40px rgba(184,131,42,.4);
  transform:rotate(-8deg);
  animation:float 6s 1s ease-in-out infinite;
}
.hero-badge-num{font-size:22px;font-weight:900;color:#1a1008;line-height:1}
.hero-badge-lbl{font-size:9px;font-weight:800;color:#3a2618;letter-spacing:.5px}

/* ── STATS BAR ── */
.stats-bar{
  background:linear-gradient(135deg,#1a1008 0%,#2e1e10 100%);
  padding:32px 0;
  margin:40px 0 0;
}
.stats-inner{
  display:grid;grid-template-columns:repeat(4,1fr);
  gap:0;
}
.stat{
  text-align:center;
  padding:0 16px;
  border-left:1px solid rgba(245,216,140,.15);
}
.stat:last-child{border-left:none}
.stat-num{
  font-family:'Frank Ruhl Libre',serif;
  font-size:clamp(32px,3.5vw,48px);
  font-weight:900;
  color:var(--gold2);
  line-height:1;
  margin-bottom:4px;
}
.stat-lbl{font-size:12px;color:rgba(245,216,140,.65);font-weight:700;letter-spacing:.3px}

/* ── SECTION ── */
.section{padding:72px 0}
.section-head{text-align:center;margin-bottom:48px}
.section-tag{
  display:inline-block;
  font-size:11px;font-weight:800;
  letter-spacing:2.5px;text-transform:uppercase;
  color:var(--rose);
  margin-bottom:12px;
}
.section-title{
  font-family:'Frank Ruhl Libre',serif;
  font-size:clamp(36px,4.5vw,60px);
  font-weight:900;
  line-height:1.05;
  color:var(--ink);
  margin-bottom:12px;
}
.section-sub{font-size:18px;color:var(--muted);font-weight:600;max-width:560px;margin:0 auto}

/* ── BENEFITS ── */
.benefits-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:18px}
.benefit-card{
  background:#fff;
  border:1px solid rgba(199,154,67,.18);
  border-radius:26px;
  padding:28px 22px;
  box-shadow:0 18px 48px rgba(78,44,25,.07);
  transition:transform .25s,box-shadow .25s;
  position:relative;overflow:hidden;
}
.benefit-card::before{
  content:'';position:absolute;
  inset:0;
  background:linear-gradient(135deg,rgba(199,154,67,.04) 0,transparent 60%);
}
.benefit-card:hover{transform:translateY(-6px);box-shadow:0 28px 64px rgba(78,44,25,.14)}
.benefit-icon{
  width:54px;height:54px;border-radius:16px;
  background:linear-gradient(135deg,#1a1008,#3a2618);
  display:grid;place-items:center;
  font-size:26px;margin-bottom:16px;
}
.benefit-title{font-family:'Frank Ruhl Libre',serif;font-size:21px;font-weight:700;color:var(--ink);margin-bottom:8px}
.benefit-text{font-size:14px;color:var(--muted);font-weight:600;line-height:1.6;margin-bottom:14px}
.benefit-val{
  font-size:13px;font-weight:800;
  color:var(--rose);
  background:var(--rose-pale);
  border-radius:50px;
  padding:5px 12px;
  display:inline-block;
}

/* ── HOW IT WORKS ── */
.how-section{
  background:#fff;
  border-radius:40px;
  padding:52px 48px;
  box-shadow:var(--shadow);
  border:1px solid rgba(199,154,67,.14);
}
.how-grid{display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center}
.how-title{
  font-family:'Frank Ruhl Libre',serif;
  font-size:clamp(38px,4vw,56px);
  font-weight:900;
  line-height:1.05;
  color:var(--ink);
  margin:14px 0 16px;
}
.how-sub{font-size:16px;color:var(--muted);font-weight:600;line-height:1.7;margin-bottom:28px}
.steps{display:flex;flex-direction:column;gap:14px}
.step{
  display:grid;grid-template-columns:52px 1fr;gap:16px;
  align-items:center;
  background:linear-gradient(135deg,#fffdf9,#fff8f2);
  border:1px solid rgba(199,154,67,.18);
  border-radius:18px;padding:16px;
}
.step-num{
  width:52px;height:52px;border-radius:16px;
  background:linear-gradient(135deg,var(--gold3),var(--gold));
  display:grid;place-items:center;
  font-weight:900;font-size:22px;
  color:#1a1008;flex-shrink:0;
}
.step-title{font-size:15px;font-weight:800;color:var(--ink);margin-bottom:3px}
.step-text{font-size:13px;color:var(--muted);font-weight:600}
.how-img{border-radius:28px;overflow:hidden;box-shadow:var(--shadow-sm)}
.how-img img{width:100%;height:460px;object-fit:cover;object-position:right center;display:block}

/* ── ARMY BANNER ── */
.army-banner{
  background:linear-gradient(135deg,#111108 0%,#1e1a08 40%,#120c08 100%);
  border-radius:36px;
  padding:52px 52px;
  box-shadow:0 40px 100px rgba(0,0,0,.25);
  position:relative;overflow:hidden;
}
.army-banner::before{
  content:'✦';
  position:absolute;top:-20px;left:40px;
  font-size:200px;color:rgba(199,154,67,.06);
  font-family:'Frank Ruhl Libre',serif;
  pointer-events:none;line-height:1;
}
.army-banner::after{
  content:'';position:absolute;
  bottom:-100px;left:-100px;
  width:400px;height:400px;border-radius:50%;
  background:radial-gradient(circle,rgba(199,154,67,.1) 0,transparent 70%);
}
.army-banner-inner{
  display:grid;grid-template-columns:1fr auto;
  gap:40px;align-items:center;
  position:relative;z-index:2;
}
.army-title{
  font-family:'Frank Ruhl Libre',serif;
  font-size:clamp(40px,5vw,64px);
  font-weight:900;line-height:1;
  color:#fff;margin-bottom:16px;
}
.army-text{
  font-size:clamp(15px,1.6vw,18px);
  color:rgba(255,255,255,.72);
  font-weight:600;line-height:1.7;
  max-width:600px;margin-bottom:22px;
}
.army-tags{display:flex;flex-wrap:wrap;gap:10px}
.army-tag{
  background:rgba(255,255,255,.08);
  border:1px solid rgba(245,216,140,.25);
  border-radius:50px;
  padding:8px 18px;
  font-size:13px;font-weight:700;color:rgba(255,255,255,.8);
}
.army-tag.gold{
  background:linear-gradient(135deg,rgba(199,154,67,.3),rgba(232,199,120,.2));
  border-color:rgba(245,216,140,.5);
  color:var(--gold2);
}
.btn-gold{
  display:inline-flex;align-items:center;gap:8px;
  background:linear-gradient(135deg,var(--gold3),var(--gold));
  color:#1a1008;
  padding:18px 32px;border-radius:50px;
  text-decoration:none;font-weight:900;font-size:16px;
  box-shadow:0 16px 40px rgba(199,154,67,.4);
  transition:transform .2s,box-shadow .2s;
  white-space:nowrap;text-align:center;
}
.btn-gold:hover{transform:translateY(-3px);box-shadow:0 22px 50px rgba(199,154,67,.5)}

/* ── GALLERY ── */
.gallery{
  display:grid;
  grid-template-columns:1.1fr .9fr 1fr;
  gap:16px;
}
.gallery-item{
  border-radius:28px;overflow:hidden;
  border:6px solid #fff;
  box-shadow:0 24px 56px rgba(78,44,25,.14);
  transition:transform .3s,box-shadow .3s;
}
.gallery-item:hover{transform:scale(1.02);box-shadow:0 32px 72px rgba(78,44,25,.2)}
.gallery-item img{width:100%;height:340px;object-fit:cover;display:block}
.gallery-item:nth-child(2){margin-top:30px}
.gallery-item:nth-child(2) img{height:380px}

/* ── TESTIMONIALS ── */
.testi-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
.testi-card{
  background:#fff;
  border:1px solid rgba(199,154,67,.14);
  border-radius:26px;
  padding:30px 26px;
  box-shadow:0 16px 48px rgba(78,44,25,.07);
  position:relative;
  transition:transform .25s,box-shadow .25s;
}
.testi-card:hover{transform:translateY(-5px);box-shadow:0 24px 64px rgba(78,44,25,.12)}
.testi-quote{
  font-family:'Frank Ruhl Libre',serif;
  font-size:72px;color:var(--rose-pale);
  line-height:1;position:absolute;top:14px;right:22px;
}
.testi-stars{color:#f0b429;font-size:16px;letter-spacing:2px;margin-bottom:14px}
.testi-text{
  font-size:15px;line-height:1.7;
  color:var(--ink2);font-weight:600;
  margin-bottom:20px;
  position:relative;z-index:1;
}
.testi-author{display:flex;align-items:center;gap:12px}
.testi-avatar{
  width:46px;height:46px;border-radius:50%;
  background:linear-gradient(135deg,var(--rose-pale),#fce0e5);
  display:grid;place-items:center;font-size:22px;flex-shrink:0;
}
.testi-name{font-size:15px;font-weight:800;color:var(--ink)}
.testi-role{font-size:12px;color:var(--muted);font-weight:600}

/* ── FAQ ── */
.faq-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px}
details{
  background:#fff;
  border:1px solid rgba(199,154,67,.16);
  border-radius:18px;padding:22px;
  box-shadow:0 10px 28px rgba(78,44,25,.06);
  transition:box-shadow .2s;
}
details[open]{box-shadow:0 16px 44px rgba(78,44,25,.1)}
summary{
  font-weight:800;font-size:17px;
  cursor:pointer;list-style:none;
  display:flex;justify-content:space-between;align-items:center;
  color:var(--ink);
}
summary::after{content:'＋';font-size:18px;color:var(--gold);transition:transform .25s}
details[open] summary::after{transform:rotate(45deg)}
details p{
  color:var(--muted);font-weight:600;
  line-height:1.7;font-size:15px;
  padding-top:14px;
  border-top:1px solid rgba(199,154,67,.12);
  margin-top:14px;
}

/* ── FINAL SECTION ── */
.final-section{
  background:linear-gradient(135deg,#fff 0%,#fff4f0 50%,#fffdf9 100%);
  border:1px solid rgba(199,154,67,.24);
  border-radius:42px;
  padding:56px 52px;
  box-shadow:var(--shadow);
}
.final-grid{display:grid;grid-template-columns:1fr 440px;gap:48px;align-items:start}
.final-title{
  font-family:'Frank Ruhl Libre',serif;
  font-size:clamp(40px,5vw,60px);
  font-weight:900;line-height:1.02;
  color:var(--ink);margin-bottom:16px;
}
.final-sub{
  font-size:17px;color:var(--muted);font-weight:600;
  line-height:1.7;margin-bottom:28px;
}
.final-points{display:flex;flex-direction:column;gap:10px}
.final-point{
  display:flex;align-items:center;gap:10px;
  font-size:15px;font-weight:700;color:var(--ink2);
}
.final-dot{
  width:8px;height:8px;border-radius:50%;
  background:linear-gradient(135deg,var(--rose),var(--rose-dark));
  flex-shrink:0;
}

/* ── LEAD CARD ── */
.lead-card{
  background:rgba(255,255,255,.95);
  border:1px solid rgba(199,154,67,.26);
  border-radius:28px;
  padding:32px;
  box-shadow:0 32px 80px rgba(78,44,25,.14);
  position:relative;overflow:hidden;
}
.lead-card::before{
  content:'';position:absolute;
  top:-60px;left:-60px;
  width:200px;height:200px;border-radius:50%;
  background:radial-gradient(circle,rgba(247,217,220,.4) 0,transparent 70%);
  pointer-events:none;
}
.lead-card-title{
  font-family:'Frank Ruhl Libre',serif;
  font-size:24px;font-weight:800;
  color:var(--ink);margin-bottom:6px;
}
.lead-card-sub{font-size:14px;color:var(--muted);font-weight:600;margin-bottom:22px}
.form-field{margin-bottom:12px}
.form-input{
  width:100%;height:54px;
  border:1.5px solid rgba(199,154,67,.28);
  border-radius:14px;
  padding:0 18px;
  font-size:15px;font-weight:700;
  background:#fff;color:var(--ink);
  font-family:'Heebo',sans-serif;
  transition:border-color .2s,box-shadow .2s;
  appearance:none;
}
.form-input:focus{outline:none;border-color:var(--gold);box-shadow:0 0 0 3px rgba(199,154,67,.12)}
.btn-submit{
  width:100%;border:0;cursor:pointer;
  background:linear-gradient(135deg,var(--rose),var(--rose-dark));
  color:#fff;font-family:'Heebo',sans-serif;
  font-size:17px;font-weight:900;
  padding:18px;border-radius:16px;
  box-shadow:0 16px 40px rgba(200,92,112,.36);
  transition:transform .2s,box-shadow .2s;
  margin-top:4px;
}
.btn-submit:hover{transform:translateY(-2px);box-shadow:0 22px 50px rgba(200,92,112,.46)}
.form-micro{font-size:12px;color:#9e8e85;text-align:center;margin-top:10px}

/* ── FOOTER ── */
footer{
  background:linear-gradient(135deg,#1a1008,#2e1e10);
  padding:30px 0;margin-top:80px;
}
.footer-text{color:rgba(245,216,140,.55);font-size:13px;font-weight:600;text-align:center}

/* ── STICKY MOBILE CTA ── */
.sticky-mobile{
  position:fixed;bottom:0;left:0;right:0;z-index:50;
  display:none;
  padding:12px 16px;
  background:rgba(255,253,249,.96);
  backdrop-filter:blur(12px);
  border-top:1px solid rgba(199,154,67,.18);
}
.sticky-mobile a{
  display:block;text-align:center;
  background:linear-gradient(135deg,var(--rose),var(--rose-dark));
  color:#fff;text-decoration:none;
  border-radius:14px;padding:15px;
  font-weight:900;font-size:15px;
  box-shadow:0 12px 28px rgba(200,92,112,.32);
}

/* ── RESPONSIVE ── */
@media(max-width:1024px){
  .benefits-grid{grid-template-columns:repeat(2,1fr)}
  .hero-grid{grid-template-columns:1fr;gap:36px}
  .hero-art{order:-1;max-width:480px;margin:0 auto}
  .final-grid{grid-template-columns:1fr}
}
@media(max-width:768px){
  body{padding-bottom:72px}
  .sticky-mobile{display:block}
  .topbar-phone{display:none}
  .hero{padding:36px 0 52px}
  h1{font-size:46px}
  .hero-badge{width:88px;height:88px;left:-12px;top:20px}
  .hero-badge-num{font-size:17px}
  .hero-case-float{width:58%;bottom:-20px;left:-22px}
  .stats-inner{grid-template-columns:repeat(2,1fr)}
  .stat{border:none;padding:16px 0;border-bottom:1px solid rgba(245,216,140,.12)}
  .how-grid{grid-template-columns:1fr}
  .how-img{display:none}
  .army-banner-inner{grid-template-columns:1fr}
  .army-banner{padding:36px 28px}
  .gallery{grid-template-columns:1fr}
  .gallery-item:nth-child(2){margin-top:0}
  .gallery-item img,.gallery-item:nth-child(2) img{height:240px}
  .testi-grid{grid-template-columns:1fr}
  .faq-grid{grid-template-columns:1fr}
  .how-section{padding:32px 24px;border-radius:28px}
  .final-section{padding:36px 24px;border-radius:32px}
  .benefits-grid{grid-template-columns:1fr}
  .trust-divider{display:none}
  .trust-item{font-size:12px;padding:4px 12px}
}
@media(max-width:480px){
  h1{font-size:40px;letter-spacing:-1.5px}
  .salary-amount{font-size:30px}
  .army-title{font-size:34px}
  .section-title{font-size:32px}
  .final-title{font-size:34px}
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
          <small style="font-size:11px;font-weight:600;color:var(--muted)">המכללה המובילה בישראל</small>
        </div>
      </a>
      <div class="topbar-nav">
        <a href="tel:0500000000" class="topbar-phone">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91A16 16 0 0 0 13 14.86l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          להתקשרות
        </a>
        <a href="#form" class="topbar-cta">לפגישת ייעוץ חינם ←</a>
      </div>
    </div>
  </div>
</header>

<!-- ══ TRUST BAR ══ -->
<div class="trust-bar">
  <div class="wrap">
    <div class="trust-bar-inner">
      <div class="trust-item">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z"/></svg>
        תעודה בינלאומית מוכרת
      </div>
      <div class="trust-divider"></div>
      <div class="trust-item">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-12V5l-8-3-8 3v5c0 8 8 12 8 12z"/></svg>
        מאושר לפיקדון צבאי
      </div>
      <div class="trust-divider"></div>
      <div class="trust-item">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
        מזוודת איפור שווי 11,000 ₪
      </div>
      <div class="trust-divider"></div>
      <div class="trust-item">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9 12l2 2 4-4"/></svg>
        השמה לעבודה בסיום
      </div>
    </div>
  </div>
</div>

<!-- ══ HERO ══ -->
<section class="hero">
  <div class="wrap">
    <div class="hero-grid">

      <!-- COPY -->
      <div class="hero-copy">
        <div class="eyebrow">
          <span class="eyebrow-dot"></span>
          מאיפה מגיעות המאפרות של הסלבריטאים?
        </div>

        <h1>קורס מאפרת<br/><span class="gold-text">מקצועית</span></h1>

        <p class="hero-sub">
          6–8 חודשים תוכלי לרכוש מקצוע אמיתי — בלי ניסיון, בלי רקע, רק רצון.
        </p>

        <div class="salary-highlight">
          <div class="salary-label">פוטנציאל הכנסה יומי של מאפרות</div>
          <div class="salary-amount">800 – 2,000 ₪</div>
          <div class="salary-note">בסיום הלימודים דואגים לך לעבודה עם שכר ממוצע</div>
        </div>

        <div class="ticks">
          <div class="tick"><span class="tick-icon">✓</span><span>ניתן לשלם דרך <strong>הפיקדון הצבאי</strong></span></div>
          <div class="tick"><span class="tick-icon">✓</span><span><strong>מזוודת איפור בשווי 11,000 ₪</strong> כלולה</span></div>
          <div class="tick"><span class="tick-icon">✓</span><span><strong>תעודת מאפרת בינלאומית</strong> מוכרת</span></div>
          <div class="tick"><span class="tick-icon">✓</span><span><strong>מלגה לנרשמות</strong> — בדקי כמה מגיע לך</span></div>
        </div>

        <a href="#form" class="btn-primary">לפגישת ייעוץ חינם ←</a>
        <p class="btn-note">ללא עלות • ללא התחייבות • בדקי כמה מלגה מגיעה לך</p>
      </div>

      <!-- ART -->
      <div class="hero-art">
        <div class="hero-portrait">
          <img src="/assets/hero_woman.jpg" alt="מאפרת מקצועית"/>
        </div>
        <div class="hero-case-float">
          <img src="/assets/beauty_case.jpg" alt="מזוודת איפור מקצועית"/>
        </div>
        <div class="hero-badge">
          <div class="hero-badge-lbl">שווי ציוד</div>
          <div class="hero-badge-num">11K ₪</div>
          <div class="hero-badge-lbl">כלול</div>
        </div>
      </div>

    </div>
  </div>
</section>

<!-- ══ STATS BAR ══ -->
<div class="stats-bar">
  <div class="wrap">
    <div class="stats-inner">
      <div class="stat"><div class="stat-num">6–8</div><div class="stat-lbl">חודשי לימוד</div></div>
      <div class="stat"><div class="stat-num">11K ₪</div><div class="stat-lbl">שווי ציוד כלול</div></div>
      <div class="stat"><div class="stat-num">800+</div><div class="stat-lbl">בוגרות מועסקות</div></div>
      <div class="stat"><div class="stat-num">100%</div><div class="stat-lbl">ליווי לעבודה</div></div>
    </div>
  </div>
</div>

<!-- ══ BENEFITS ══ -->
<section class="section">
  <div class="wrap">
    <div class="section-head">
      <div class="section-tag">מה מחכה לך בקורס</div>
      <h2 class="section-title">כל מה שתצטרכי<br/>להצליח בתעשייה</h2>
      <p class="section-sub">קורס שמלווה אותך מהרגע הראשון ועד שתמצאי עבודה ראשונה</p>
    </div>
    <div class="benefits-grid">
      <div class="benefit-card">
        <div class="benefit-icon">🎓</div>
        <div class="benefit-title">לימוד מקצועי מלא</div>
        <div class="benefit-text">לומדות מהמומחים הגדולים. תכנית עדכנית שמכסה כל טכניקות האיפור.</div>
        <div class="benefit-val">6–8 חודשים</div>
      </div>
      <div class="benefit-card">
        <div class="benefit-icon">💼</div>
        <div class="benefit-title">ליווי לעבודה</div>
        <div class="benefit-text">בסיום הקורס דואגים לך לעבודה. רשת קשרים ענפה עם סטודיואים ומעסיקים.</div>
        <div class="benefit-val">100% מועסקות</div>
      </div>
      <div class="benefit-card">
        <div class="benefit-icon">🌍</div>
        <div class="benefit-title">תעודה בינלאומית</div>
        <div class="benefit-text">תעודת מאפרת מוכרת בינלאומית שתפתח לך דלתות בכל מקום בעולם.</div>
        <div class="benefit-val">מוכרת עולמית</div>
      </div>
      <div class="benefit-card">
        <div class="benefit-icon">🎖️</div>
        <div class="benefit-title">פיקדון ומלגה</div>
        <div class="benefit-text">ניתן לשלם דרך הפיקדון הצבאי. בנוסף — מלגה לכל הנרשמות.</div>
        <div class="benefit-val">השתמשי בפיקדון</div>
      </div>
    </div>
  </div>
</section>

<!-- ══ HOW IT WORKS ══ -->
<section class="section" style="padding-top:0">
  <div class="wrap">
    <div class="how-section">
      <div class="how-grid">
        <div>
          <div class="section-tag">איך זה עובד</div>
          <h2 class="how-title">מתחילה מאפס?<br/>זה בדיוק<br/>בשבילך.</h2>
          <p class="how-sub">לא צריך ניסיון, לא צריך רקע — רק רצון ללמוד מקצוע שיפרנס אותך לכל החיים.</p>
          <div class="steps">
            <div class="step">
              <div class="step-num">1</div>
              <div>
                <div class="step-title">משאירה פרטים בטופס</div>
                <div class="step-text">שם, טלפון וסניף — בלי טפסים ארוכים ומייגעים</div>
              </div>
            </div>
            <div class="step">
              <div class="step-num">2</div>
              <div>
                <div class="step-title">בודקים זכאות למלגה</div>
                <div class="step-text">נבדוק התאמה, פיקדון צבאי וגובה המלגה שמגיעה לך</div>
              </div>
            </div>
            <div class="step">
              <div class="step-num">3</div>
              <div>
                <div class="step-title">מקבלת פגישת ייעוץ</div>
                <div class="step-text">שיחה אישית שתספר לך בדיוק איך תיכנסי לתעשייה</div>
              </div>
            </div>
          </div>
        </div>
        <div class="how-img">
          <img src="/assets/makeup_artist.jpg" alt="מאפרת בעבודה"/>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ══ ARMY BANNER ══ -->
<section class="section" style="padding-top:0">
  <div class="wrap">
    <div class="army-banner">
      <div class="army-banner-inner">
        <div>
          <h2 class="army-title">
            עשית צבא<br/>
            <span style="color:var(--gold2)">או שירות לאומי?</span>
          </h2>
          <p class="army-text">
            בנות לבוגרות צבא ושירות לאומי — את יכולה להשתמש בפיקדון שלך לממן את הקורס.
            ללמוד מקצוע ולהתחיל חיים חדשים, בשיתוף בית הספר הגדול ביותר לאיפור בארץ.
          </p>
          <div class="army-tags">
            <span class="army-tag gold">מלגה מיוחדת</span>
            <span class="army-tag">פיקדון</span>
            <span class="army-tag">גיל 20–35</span>
            <span class="army-tag">ללא ניסיון</span>
          </div>
        </div>
        <div>
          <a href="#form" class="btn-gold">בדקי כמה מלגה<br/>מגיעה לך ←</a>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ══ GALLERY ══ -->
<section class="section" style="padding-top:0">
  <div class="wrap">
    <div class="section-head">
      <div class="section-tag">החוויה הנראית</div>
      <h2 class="section-title">ממש ככה זה נראה</h2>
    </div>
    <div class="gallery">
      <div class="gallery-item"><img src="/assets/hero_woman.jpg" alt="מאפרת מקצועית"/></div>
      <div class="gallery-item"><img src="/assets/makeup_artist.jpg" alt="מאפרת בעבודה"/></div>
      <div class="gallery-item"><img src="/assets/beauty_case.jpg" alt="מזוודת איפור מקצועית"/></div>
    </div>
  </div>
</section>

<!-- ══ TESTIMONIALS ══ -->
<section class="section" style="padding-top:0">
  <div class="wrap">
    <div class="section-head">
      <div class="section-tag">מה אומרות הבוגרות</div>
      <h2 class="section-title">הצלחות אמיתיות<br/>של בוגרות שלנו</h2>
    </div>
    <div class="testi-grid">
      <div class="testi-card">
        <div class="testi-quote">"</div>
        <div class="testi-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
        <p class="testi-text">"סיימתי צבא ולא ידעתי מה לעשות עם הפיקדון. חברה סיפרה לי על הקורס הזה — היום אני עובדת בסטודיו מוביל בתל אביב ומרוויחה יפה מאוד."</p>
        <div class="testi-author">
          <div class="testi-avatar">💄</div>
          <div><div class="testi-name">שירה כ.</div><div class="testi-role">בוגרת הקורס • עובדת 2 שנים בתחום</div></div>
        </div>
      </div>
      <div class="testi-card">
        <div class="testi-quote">"</div>
        <div class="testi-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
        <p class="testi-text">"לא הייתה לי שום ידע קודם. הגעתי בגלל התשוקה, נשארתי בגלל המקצוענות. הצוות מדהים, הלמידה מעמיקה והמזוודה שקיבלתי שווה הרבה."</p>
        <div class="testi-author">
          <div class="testi-avatar">✨</div>
          <div><div class="testi-name">מיכל א.</div><div class="testi-role">מאפרת עצמאית • לקוחות VIP</div></div>
        </div>
      </div>
      <div class="testi-card">
        <div class="testi-quote">"</div>
        <div class="testi-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
        <p class="testi-text">"הפיקדון שלי הלך לדבר הכי טוב שיכולתי לעשות איתו. 8 חודשים אחרי — אני מאפרת בחתונות ומרוויחה 1,500 ש״ח ליום."</p>
        <div class="testi-author">
          <div class="testi-avatar">🌸</div>
          <div><div class="testi-name">נועה ר.</div><div class="testi-role">מאפרת חתונות • בת 22</div></div>
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
    <div class="faq-grid">
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
<section class="section" id="form" style="padding-top:0">
  <div class="wrap">
    <div class="final-section">
      <div class="final-grid">
        <div>
          <div class="section-tag">הזמן לפעול</div>
          <h2 class="final-title">
            בואי לפגישת ייעוץ —<br/>
            <span class="gold-text">גלי כמה מלגה<br/>מגיעה לך</span>
          </h2>
          <p class="final-sub">פגישה אישית, ללא עלות וללא התחייבות. נבדוק יחד כמה מלגה מגיעה לך ואיך לממן את הקורס.</p>
          <div class="final-points">
            <div class="final-point"><span class="final-dot"></span>מלגה מיוחדת לנרשמות</div>
            <div class="final-point"><span class="final-dot"></span>ניתן לשלם דרך הפיקדון</div>
            <div class="final-point"><span class="final-dot"></span>מזוודת איפור 11,000 ₪ כלולה</div>
            <div class="final-point"><span class="final-dot"></span>ליווי לעבודה בסיום הקורס</div>
            <div class="final-point"><span class="final-dot"></span>תעודה בינלאומית מוכרת</div>
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
              לפגישת ייעוץ חינם — בדקי כמה מלגה מגיעה לך ❤️
            </button>
            <p class="form-micro">הפרטים שלך מוגנים ולא יועברו לצד שלישי</p>
          </form>
        </div>
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
  <a href="#form">לפגישת ייעוץ חינם — בדקי את המלגה שלך ←</a>
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
        btn.style.background = 'linear-gradient(135deg,#2C8A4A,#1E6635)';
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
