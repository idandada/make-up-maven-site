import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import adHero from "@/assets/ad-hero.jpg";
import adKit from "@/assets/ad-kit.jpg";
import adCloseup from "@/assets/ad-closeup.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "קורס מאפרת מקצועית — לבנות אחרי צבא ושירות לאומי" },
      { name: "description", content: "באורך 6-8 חודשים, דואגים לך לעבודה עם שכר ממוצע יומי 800-2,000 ₪. מזוודה בשווי 11,000 ₪, תעודה בינלאומית ומלגה לנרשמות." },
    ],
  }),
  component: LandingPage,
});

function LandingPage() {
  return (
    <main dir="rtl" className="min-h-screen bg-[#fdf4ee] text-[#1a1a1a] overflow-x-hidden font-[Heebo,sans-serif] relative">
      <Sparkles />
      <Hero />
      <Benefits />
      <KitSection />
      <CelebritySection />
      <Eligibility />
      <LeadForm />
      <Footer />
      <StickyCTA />
    </main>
  );
}

/* ─────────── Decorative sparkle background ─────────── */
function Sparkles() {
  return (
    <div aria-hidden className="fixed inset-0 pointer-events-none z-0 opacity-60">
      <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,#f8d4d4_0%,transparent_70%)] blur-3xl" />
      <div className="absolute top-1/3 -left-40 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,#fde6c4_0%,transparent_70%)] blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,#f5d4dc_0%,transparent_70%)] blur-3xl" />
    </div>
  );
}

/* ─────────── HERO ─────────── */
function Hero() {
  return (
    <section className="relative z-10 overflow-hidden">
      {/* Top banner */}
      <div className="bg-[#1a1a1a] text-[#fdf4ee] text-center py-2.5 px-4 text-[11px] sm:text-xs tracking-[0.2em] font-bold">
        ✦ באורך 6–8 חודשים — דואגים לך לעבודה ✦
      </div>

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-8 pt-8 sm:pt-12 pb-10">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-center">
          {/* Right column = text (RTL first) */}
          <div className="order-2 lg:order-1 text-right relative z-10">
            <div className="inline-block bg-white/80 backdrop-blur border border-[#d4a574]/40 rounded-full px-5 py-2 mb-5 text-[11px] sm:text-xs font-bold tracking-wider text-[#7a3b2a]">
              ✦ קמפיין הגיוס 2026 ✦
            </div>

            <h1 className="font-black leading-[0.95] tracking-tight">
              <span className="block text-[#1a1a1a] text-[1.75rem] sm:text-6xl lg:text-7xl">
                קורס מאפרת
              </span>
              <span
                className="block text-[2.25rem] sm:text-7xl lg:text-8xl mt-2 font-black"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg,#c9a14a 0%,#f3d57e 30%,#a87435 60%,#e8c47a 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                  textShadow: "0 2px 0 rgba(0,0,0,0.04)",
                }}
              >
                מקצועית
              </span>
            </h1>

            <div className="mt-4 relative inline-block">
              <div className="absolute inset-0 bg-[#f5b8c4] -rotate-1 rounded-full blur-[2px] opacity-70" />
              <p className="relative font-bold text-[#1a1a1a] text-lg sm:text-2xl px-5 py-1.5">
                לבנות שעשו צבא / שירות לאומי — בכל גיל
              </p>
            </div>


            {/* Black headline block */}
            <div className="mt-7 bg-[#1a1a1a] text-white rounded-2xl px-6 py-5 sm:py-6 block sm:inline-block shadow-2xl shadow-black/30">
              <div className="text-sm sm:text-base opacity-90 mb-1">אצלנו תוכלי לעשות</div>
              <div className="font-black text-xl sm:text-4xl leading-tight">
                קורס איפור{" "}
                <span
                  style={{
                    backgroundImage:
                      "linear-gradient(135deg,#f3d57e 0%,#c9a14a 50%,#f3d57e 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  מקצועי
                </span>
              </div>
              <div className="text-sm sm:text-base opacity-90 mt-1">בלי ניסיון. בלי רקע.</div>
            </div>

            {/* Salary highlight */}
            <div className="mt-7 bg-white/90 backdrop-blur border-2 border-[#e8b8a8] rounded-2xl px-6 py-5 shadow-xl shadow-[#e8b8a8]/30">
              <div className="text-sm sm:text-base text-[#1a1a1a] font-medium">
                בסיום הלימודים <strong>דואגים לך לעבודה</strong>
              </div>
              <div className="text-[#c44569] font-bold text-sm sm:text-base mt-1">
                עם שכר ממוצע יומי של
              </div>
              <div className="flex items-baseline gap-2 mt-1">
                <span
                  className="font-black text-4xl sm:text-7xl leading-none"
                  style={{
                    backgroundImage:
                      "linear-gradient(135deg,#c9a14a 0%,#f3d57e 50%,#a87435 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
 1 800-2,000
                </span>
                <span className="font-black text-2xl sm:text-3xl text-[#1a1a1a]">₪</span>
              </div>
            </div>

            <a
              href="#lead"
              className="mt-7 group relative inline-flex items-center gap-3 bg-gradient-to-l from-[#c44569] via-[#d96a85] to-[#c44569] text-white font-bold text-base sm:text-lg px-8 py-4 rounded-full shadow-xl shadow-[#c44569]/40 hover:shadow-2xl hover:shadow-[#c44569]/60 transition-all hover:-translate-y-0.5"
            >
              <span className="w-7 h-7 rounded-full bg-white/95 text-[#c44569] flex items-center justify-center text-sm">♥</span>
              בואי לפגישת ייעוץ — בדקי כמה מלגה מגיעה לך
            </a>
          </div>

          {/* Hero image */}
          <div className="order-1 lg:order-2 relative">
            <div className="relative">
              <img
                src={adHero}
                alt="קורס מאפרת מקצועית"
                className="w-full h-auto rounded-3xl shadow-2xl object-cover"
              />
              {/* Floating badge — kit value */}
              <div className="absolute -bottom-4 -right-4 sm:bottom-6 sm:right-6 w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-gradient-to-br from-[#f3d57e] via-[#c9a14a] to-[#a87435] text-[#1a1a1a] flex flex-col items-center justify-center shadow-2xl rotate-[-8deg] border-4 border-white">
                <div className="text-[10px] sm:text-xs font-bold">בשווי</div>
                <div className="font-black text-xl sm:text-3xl leading-none">11,000</div>
                <div className="text-[10px] sm:text-xs font-bold mt-0.5">₪ מזוודה</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────── BENEFITS strip ─────────── */
function Benefits() {
  const items = [
    { icon: "🎓", title: "6-8 חודשי", desc: "לימוד מקצועי" },
    { icon: "💼", title: "מזוודה", desc: "בשווי 11,000 ₪" },
    { icon: "🌍", title: "תעודה", desc: "בינלאומית" },
    { icon: "💖", title: "מלגה", desc: "לנרשמות" },
  ];
  return (
    <section className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-8 py-10">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
        {items.map((it) => (
          <div
            key={it.title}
            className="bg-white/80 backdrop-blur border border-[#e8b8a8]/40 rounded-2xl px-4 py-5 text-center shadow-lg shadow-[#e8b8a8]/20 hover:-translate-y-1 transition-transform"
          >
            <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-[#1a1a1a] to-[#3a2a2a] flex items-center justify-center text-xl mb-2 shadow-lg">
              <span className="filter brightness-150">{it.icon}</span>
            </div>
            <div className="font-black text-base sm:text-lg text-[#1a1a1a]">{it.title}</div>
            <div className="text-xs sm:text-sm text-[#7a3b2a] font-semibold mt-0.5">{it.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─────────── KIT SECTION ─────────── */
function KitSection() {
  const checks = [
    "ניתן לשלם דרך הפיקדון הצבאי או בכל דרך שתבחרי",
    "מזוודת איפור מקצועית בשווי 11,000 ₪",
    "תעודת מאפרת בינלאומית מוכרת",
    "מלגה אישית לכל נרשמת",
  ];
  return (
    <section className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-8 py-12 sm:py-16">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <div className="relative">
          <img
            src={adKit}
            alt="מזוודת איפור מקצועית בשווי 11,000 ש״ח"
            loading="lazy"
            className="w-full h-auto rounded-3xl shadow-2xl"
          />
        </div>

        <div className="text-right">
          <div className="inline-block bg-[#1a1a1a] text-[#f3d57e] px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-black tracking-[0.3em] mb-4">
            ✦ מה את מקבלת ✦
          </div>
          <h2 className="font-black text-3xl sm:text-5xl leading-tight text-[#1a1a1a]">
            הכל כלול —{" "}
            <span
              style={{
                backgroundImage:
                  "linear-gradient(135deg,#c44569 0%,#e8a7b6 50%,#c44569 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              ויוצאת מקצוענית
            </span>
          </h2>
          <p className="mt-3 text-[#5a4a4a] text-base sm:text-lg">
            בשיתוף בית הספר הגדול בארץ ללימודי איפור.
          </p>

          <ul className="mt-6 space-y-3">
            {checks.map((t) => (
              <li
                key={t}
                className="flex items-start gap-3 bg-white/90 backdrop-blur border border-[#e8b8a8]/50 rounded-xl px-4 py-3.5 shadow-md shadow-[#e8b8a8]/20"
              >
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gradient-to-br from-[#c44569] to-[#a83454] text-white flex items-center justify-center text-sm font-black mt-0.5">
                  ✓
                </span>
                <span className="text-[#1a1a1a] font-bold text-sm sm:text-base leading-snug">
                  {t}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ─────────── CELEBRITY / closeup section ─────────── */
function CelebritySection() {
  return (
    <section className="relative z-10 py-12 sm:py-20">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl">
          <img
            src={adCloseup}
            alt=""
            loading="lazy"
            className="w-full h-[400px] sm:h-[500px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-[#1a1a1a]/95 via-[#1a1a1a]/60 to-transparent" />
          <div className="absolute inset-0 flex items-center px-6 sm:px-16">
            <div className="max-w-lg text-right text-white">
              <div className="text-[#f3d57e] text-xs sm:text-sm font-black tracking-[0.3em] mb-3">
                ✦ הרמה הכי גבוהה
              </div>
              <h3 className="font-black text-3xl sm:text-5xl leading-tight">
                את לומדת{" "}
                <span
                  style={{
                    backgroundImage:
                      "linear-gradient(135deg,#f3d57e 0%,#c9a14a 50%,#f3d57e 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  מהמקצוענים
                </span>
                <br />
                שבתעשייה
              </h3>
              <p className="mt-4 text-base sm:text-lg opacity-90">
                איפור כלות, אופנה, צילום ואירועים — מהמרצים שמאפרים את הסלבריטאים בארץ.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────── ELIGIBILITY ─────────── */
function Eligibility() {
  return (
    <section className="relative z-10 max-w-[1100px] mx-auto px-4 sm:px-8 py-10 sm:py-14">
      <div className="bg-gradient-to-bl from-white/90 via-[#fdf4ee] to-[#f8e3d4] border-2 border-[#d4a574]/40 rounded-3xl p-8 sm:p-12 text-center shadow-xl">
        <div className="text-[10px] sm:text-xs font-black tracking-[0.4em] text-[#c44569] mb-3">
          ✦ מתאים לך אם
        </div>
        <h3 className="font-black text-2xl sm:text-4xl text-[#1a1a1a] leading-tight">
          עשית{" "}
          <span className="bg-[#1a1a1a] text-[#f3d57e] px-3 py-0.5 rounded-lg">צבא / שירות לאומי</span>{" "}
          — בכל גיל
        </h3>
        <p className="mt-4 text-base sm:text-lg text-[#5a4a4a] font-semibold">
          ניתן להשתמש גם בפיקדון הצבאי לתשלום הקורס
          <br />
          <span className="text-[#c44569] font-bold">בלי ניסיון · בלי רקע · רק רצון ללמוד מקצוע אמיתי</span>
        </p>
      </div>
    </section>
  );
}

/* ─────────── LEAD FORM ─────────── */
function LeadForm() {
  const [data, setData] = useState({ name: "", phone: "", branch: "" });
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="lead" className="relative z-10 py-16 sm:py-24 px-4 sm:px-8">
      <div className="max-w-[640px] mx-auto">
        <div className="bg-white/95 backdrop-blur border-2 border-[#d4a574]/40 rounded-3xl p-7 sm:p-10 shadow-2xl shadow-[#c44569]/15">
          <div className="text-center mb-7">
            <div className="inline-block bg-gradient-to-l from-[#c44569] to-[#a83454] text-white text-[10px] sm:text-xs font-black tracking-[0.3em] px-4 py-1.5 rounded-full mb-4">
              ♥ בואי לפגישת ייעוץ ♥
            </div>
            <h2 className="font-black text-3xl sm:text-5xl leading-tight text-[#1a1a1a]">
              בדקי כמה{" "}
              <span
                style={{
                  backgroundImage:
                    "linear-gradient(135deg,#c9a14a 0%,#f3d57e 50%,#a87435 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                מלגה
              </span>{" "}
              מגיעה לך
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#5a4a4a]">
              השאירי פרטים — נחזור אליך תוך 24 שעות
            </p>
          </div>

          {sent ? (
            <div className="text-center py-10">
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-[#c44569] to-[#a83454] flex items-center justify-center text-white text-3xl mb-4 shadow-lg">
                ♥
              </div>
              <div className="font-black text-2xl text-[#1a1a1a]">תודה!</div>
              <div className="mt-2 text-[#5a4a4a]">ניצור איתך קשר ממש בקרוב</div>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-4">
              <div>
                <label className="block text-xs font-black tracking-wider text-[#1a1a1a] mb-1.5">
                  שם מלא
                </label>
                <input
                  required
                  type="text"
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                  placeholder="השם שלך"
                  className="w-full bg-[#fdf4ee] border-2 border-[#e8d4c4] focus:border-[#c44569] outline-none rounded-xl px-4 py-3.5 text-base font-medium transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-black tracking-wider text-[#1a1a1a] mb-1.5">
                  טלפון
                </label>
                <input
                  required
                  type="tel"
                  value={data.phone}
                  onChange={(e) => setData({ ...data, phone: e.target.value })}
                  placeholder="050-0000000"
                  className="w-full bg-[#fdf4ee] border-2 border-[#e8d4c4] focus:border-[#c44569] outline-none rounded-xl px-4 py-3.5 text-base font-medium transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-black tracking-wider text-[#1a1a1a] mb-1.5">
                  סניף מועדף
                </label>
                <select
                  required
                  value={data.branch}
                  onChange={(e) => setData({ ...data, branch: e.target.value })}
                  className="w-full bg-[#fdf4ee] border-2 border-[#e8d4c4] focus:border-[#c44569] outline-none rounded-xl px-4 py-3.5 text-base font-medium cursor-pointer"
                >
                  <option value="">בחרי סניף</option>
                  <option value="tel-aviv">תל אביב</option>
                  <option value="jerusalem">ירושלים</option>
                  <option value="haifa">חיפה</option>
                  <option value="beer-sheva">באר שבע</option>
                  <option value="netanya">נתניה</option>
                  <option value="online">לא משנה / מקוון</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full mt-4 bg-gradient-to-l from-[#c44569] via-[#d96a85] to-[#c44569] text-white font-black text-base sm:text-lg py-4 rounded-full shadow-xl shadow-[#c44569]/40 hover:shadow-2xl hover:-translate-y-0.5 transition-all"
              >
                ♥ שלחי וקבעי פגישה ♥
              </button>

              <p className="text-center text-xs text-[#7a3b2a] pt-1">
                ללא התחייבות · פרטייך מאובטחים
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

/* ─────────── FOOTER ─────────── */
function Footer() {
  return (
    <footer className="relative z-10 bg-[#1a1a1a] text-[#fdf4ee] py-8 px-4 sm:px-8 text-center text-xs sm:text-sm">
      <div className="max-w-[1400px] mx-auto opacity-80">
        © 2026 קמפיין הגיוס · בשיתוף בית הספר הגדול בארץ ללימודי איפור
      </div>
    </footer>
  );
}

/* ─────────── STICKY MOBILE CTA ─────────── */
function StickyCTA() {
  return (
    <a
      href="#lead"
      className="lg:hidden fixed bottom-4 inset-x-4 z-50 bg-gradient-to-l from-[#c44569] via-[#d96a85] to-[#c44569] text-white font-black text-base py-4 rounded-full shadow-2xl shadow-[#c44569]/50 text-center backdrop-blur"
    >
      ♥ בואי לפגישת ייעוץ
    </a>
  );
}
