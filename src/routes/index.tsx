import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import heroEditorial from "@/assets/hero-editorial.jpg";
import editorialBrush from "@/assets/editorial-brush.jpg";
import editorialKit from "@/assets/editorial-kit.jpg";
import editorialProfile from "@/assets/editorial-profile.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "קמפיין 2026 — קורס מאפרת מקצועית" },
      { name: "description", content: "קמפיין הגיוס לקורס מאפרת מקצועית 2026. מזוודה בשווי 11,000 ₪, תעודה בינלאומית, מלגות לנרשמות. בואי לפגישת ייעוץ." },
    ],
  }),
  component: LandingPage,
});

function LandingPage() {
  return (
    <main className="min-h-screen bg-[#f3ede3] text-[#1a0f0a] overflow-x-hidden">
      <Nav />
      <Hero />
      <Manifesto />
      <CampaignSplit />
      <KitFeature />
      <Numbers />
      <ProfileBlock />
      <LeadForm />
      <Footer />
    </main>
  );
}

/* ───────────── NAV ───────────── */
function Nav() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 mix-blend-difference text-white pointer-events-none">
      <div className="max-w-[1600px] mx-auto px-5 sm:px-8 py-5 flex items-center justify-between">
        <div className="font-serif text-xl tracking-[0.3em]">M·A</div>
        <div className="text-[10px] tracking-[0.4em] uppercase opacity-90">Campaign &nbsp;·&nbsp; SS 26</div>
        <a href="#lead" className="pointer-events-auto text-[10px] tracking-[0.4em] uppercase border-b border-white pb-0.5">בואי</a>
      </div>
    </header>
  );
}

/* ───────────── HERO — full bleed campaign ───────────── */
function Hero() {
  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden bg-[#1a0f0a]">
      {/* Image */}
      <img
        src={heroEditorial}
        alt=""
        className="absolute inset-0 w-full h-full object-cover object-[60%_30%] sm:object-[center_25%]"
      />
      {/* Cinematic vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#1a0f0a]/85 via-[#1a0f0a]/10 to-[#1a0f0a]/40" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#1a0f0a]/40 via-transparent to-transparent" />

      {/* Top meta */}
      <div className="absolute top-0 inset-x-0 pt-24 sm:pt-28 px-5 sm:px-10">
        <div className="max-w-[1600px] mx-auto flex items-start justify-between text-[#f3ede3]">
          <div className="text-[10px] tracking-[0.45em] uppercase opacity-80">
            <div>Issue №07</div>
            <div className="mt-1">2026 / TLV</div>
          </div>
          <div className="text-right text-[10px] tracking-[0.45em] uppercase opacity-80">
            <div>Campaign</div>
            <div className="mt-1">Beauty Pro</div>
          </div>
        </div>
      </div>

      {/* Headline */}
      <div className="absolute inset-x-0 bottom-0 px-5 sm:px-10 pb-20 sm:pb-28">
        <div className="max-w-[1600px] mx-auto text-[#f3ede3]">
          <div className="text-[10px] tracking-[0.45em] uppercase opacity-80 mb-4">
            ✦ הקורס שכולן מדברות עליו
          </div>
          <h1 className="font-serif font-light leading-[0.92] tracking-[-0.02em]">
            <span className="block text-[clamp(3.2rem,12vw,9rem)]">היופי</span>
            <span className="block text-[clamp(3.2rem,12vw,9rem)] italic opacity-90 -mt-2">הוא מקצוע.</span>
          </h1>
          <p className="mt-7 max-w-md text-[15px] sm:text-base leading-relaxed opacity-90 font-light">
            קורס מאפרת מקצועית — בשיתוף בית הספר הגדול בארץ.
            <br />
            בלי ניסיון. בלי רקע. רק רצון ללמוד מקצוע אמיתי.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:items-center">
            <a
              href="#lead"
              className="group inline-flex items-center justify-center gap-3 bg-[#f3ede3] text-[#1a0f0a] px-8 py-4 text-[11px] tracking-[0.4em] uppercase hover:bg-[#d4a574] transition-colors duration-500"
            >
              בואי לפגישת ייעוץ
              <span className="group-hover:translate-x-[-4px] transition-transform">←</span>
            </a>
            <span className="text-[11px] tracking-[0.35em] uppercase opacity-70 sm:mr-4">
              מלגה אישית · ללא התחייבות
            </span>
          </div>
        </div>
      </div>

      {/* Side text */}
      <div className="hidden lg:flex absolute right-6 top-1/2 -translate-y-1/2 [writing-mode:vertical-rl] rotate-180 text-[#f3ede3] text-[10px] tracking-[0.5em] uppercase opacity-70">
        Editorial · Beauty · Education · 2026
      </div>
    </section>
  );
}

/* ───────────── MANIFESTO ───────────── */
function Manifesto() {
  return (
    <section className="bg-[#f3ede3] py-24 sm:py-36 px-5 sm:px-10">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-[10px] tracking-[0.45em] uppercase text-[#7a3b2a] mb-8">
          ✦ Manifesto
        </div>
        <p className="font-serif font-light text-[clamp(1.7rem,4.2vw,3.4rem)] leading-[1.15] tracking-[-0.015em] text-[#1a0f0a]">
          לבנות שעשו צבא או שירות לאומי — <span className="italic text-[#7a3b2a]">בכל גיל.</span>
          <br />
          קורס של חודשים בודדים שמסתיים עם
          <span className="italic"> שכר ממוצע יומי </span>
          של <span className="whitespace-nowrap">800–2,000 ₪</span>.
        </p>
      </div>
    </section>
  );
}

/* ───────────── CAMPAIGN SPLIT — image + text ───────────── */
function CampaignSplit() {
  return (
    <section className="bg-[#1a0f0a] text-[#f3ede3]">
      <div className="grid lg:grid-cols-2">
        <div className="relative aspect-[3/4] lg:aspect-auto lg:min-h-[700px] overflow-hidden">
          <img
            src={editorialBrush}
            alt=""
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        <div className="flex items-center px-6 sm:px-12 py-20 lg:py-32">
          <div className="max-w-md">
            <div className="text-[10px] tracking-[0.45em] uppercase text-[#d4a574] mb-8">
              ✦ Chapter 01
            </div>
            <h2 className="font-serif font-light text-[clamp(2.2rem,5vw,4rem)] leading-[1] tracking-[-0.02em]">
              מה שאת לומדת
              <br />
              <span className="italic text-[#d4a574]">בכיתה,</span>
              <br />
              עובד בשטח.
            </h2>
            <p className="mt-8 text-[15px] leading-relaxed opacity-80 font-light">
              איפור כלות, אופנה, צילום ואירועים — בשיטה שמעמידה אותך מול לקוחה אמיתית
              כבר מהשבועות הראשונים. דואגים לך לעבודה אחרי הסיום.
            </p>
            <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-[#3d2817] pt-8">
              {[
                ["6–8", "חודשים"],
                ["100%", "השמה"],
                ["₪11K", "מזוודה"],
                ["INT'L", "תעודה"],
              ].map(([n, l]) => (
                <div key={l}>
                  <div className="font-serif text-3xl text-[#d4a574]">{n}</div>
                  <div className="text-[10px] tracking-[0.3em] uppercase opacity-70 mt-1">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────── KIT FEATURE — magazine spread ───────────── */
function KitFeature() {
  return (
    <section className="bg-[#f3ede3] py-20 sm:py-28 px-5 sm:px-10">
      <div className="max-w-[1500px] mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="text-[10px] tracking-[0.45em] uppercase text-[#7a3b2a] mb-4">
              ✦ The Kit
            </div>
            <h2 className="font-serif font-light text-[clamp(2.4rem,6vw,5rem)] leading-[0.95] tracking-[-0.02em]">
              מזוודה
              <br />
              <span className="italic">בשווי 11,000 ₪</span>
            </h2>
          </div>
          <div className="hidden sm:block text-right text-[10px] tracking-[0.4em] uppercase opacity-60 max-w-[220px]">
            כלים מקצועיים שמלווים אותך מהיום הראשון ולכל הקריירה
          </div>
        </div>

        <div className="relative overflow-hidden">
          <img
            src={editorialKit}
            alt="מזוודת איפור מקצועית"
            loading="lazy"
            className="w-full h-auto object-cover aspect-[16/10]"
          />
          <div className="absolute bottom-4 right-4 bg-[#1a0f0a] text-[#f3ede3] px-4 py-2 text-[10px] tracking-[0.35em] uppercase">
            Included
          </div>
        </div>

        <div className="mt-12 grid sm:grid-cols-3 gap-8 sm:gap-12 border-t border-[#1a0f0a]/15 pt-10">
          {[
            ["מזוודה מלאה", "פלטות, פאונדיישנים, מברשות מקצועיות"],
            ["תעודה בינלאומית", "מוכרת בכל העולם — לעבוד מאיפה שתבחרי"],
            ["מלגה אישית", "לכל נרשמת — לפי בדיקת זכאות בפגישה"],
          ].map(([t, d], i) => (
            <div key={t}>
              <div className="font-serif italic text-[#7a3b2a] text-sm mb-3">0{i + 1}</div>
              <div className="font-serif text-xl mb-2">{t}</div>
              <div className="text-[13px] leading-relaxed opacity-75">{d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────── BIG NUMBERS BAND ───────────── */
function Numbers() {
  return (
    <section className="bg-[#7a3b2a] text-[#f3ede3] py-20 sm:py-28 px-5 sm:px-10">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-[10px] tracking-[0.45em] uppercase opacity-80 mb-8">
          ✦ Numbers
        </div>
        <div className="grid sm:grid-cols-3 gap-12 sm:gap-6">
          <div>
            <div className="font-serif italic font-light text-[clamp(3.5rem,8vw,7rem)] leading-[0.85] text-[#f3ede3]">
              800<span className="text-[#d4a574]">–</span>2K
            </div>
            <div className="mt-3 text-[11px] tracking-[0.35em] uppercase opacity-80">שכר יומי ממוצע ₪</div>
          </div>
          <div>
            <div className="font-serif italic font-light text-[clamp(3.5rem,8vw,7rem)] leading-[0.85]">
              11K<span className="text-[#d4a574]">.</span>
            </div>
            <div className="mt-3 text-[11px] tracking-[0.35em] uppercase opacity-80">שווי המזוודה ₪</div>
          </div>
          <div>
            <div className="font-serif italic font-light text-[clamp(3.5rem,8vw,7rem)] leading-[0.85]">
              100<span className="text-[#d4a574]">%</span>
            </div>
            <div className="mt-3 text-[11px] tracking-[0.35em] uppercase opacity-80">השמה לעבודה</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────── PROFILE / TESTIMONIAL ───────────── */
function ProfileBlock() {
  return (
    <section className="bg-[#f3ede3]">
      <div className="grid lg:grid-cols-5">
        <div className="lg:col-span-2 px-6 sm:px-12 py-20 lg:py-32 flex items-center order-2 lg:order-1">
          <div>
            <div className="text-[10px] tracking-[0.45em] uppercase text-[#7a3b2a] mb-8">
              ✦ Voice
            </div>
            <blockquote className="font-serif font-light text-[clamp(1.6rem,2.6vw,2.2rem)] leading-[1.2] tracking-[-0.01em] text-[#1a0f0a]">
              <span className="font-serif italic text-[#7a3b2a] text-3xl">“</span>
              נכנסתי בלי לדעת איך מחזיקים מברשת. תוך חצי שנה הייתי עם לקוחות,
              קליינטים קבועים והכנסה שלא חלמתי עליה.
              <span className="font-serif italic text-[#7a3b2a] text-3xl">”</span>
            </blockquote>
            <div className="mt-8 text-[10px] tracking-[0.4em] uppercase opacity-70">
              נועה ש׳ · בוגרת מחזור 2025
            </div>
          </div>
        </div>
        <div className="lg:col-span-3 relative min-h-[60vh] order-1 lg:order-2">
          <img
            src={editorialProfile}
            alt=""
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}

/* ───────────── LEAD FORM ───────────── */
function LeadForm() {
  const [data, setData] = useState({ name: "", phone: "", branch: "" });
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="lead" className="bg-[#1a0f0a] text-[#f3ede3] py-24 sm:py-36 px-5 sm:px-10">
      <div className="max-w-[900px] mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <div className="text-[10px] tracking-[0.5em] uppercase text-[#d4a574] mb-6">
            ✦ Apply
          </div>
          <h2 className="font-serif font-light text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.95] tracking-[-0.02em]">
            בואי לפגישת
            <br />
            <span className="italic text-[#d4a574]">ייעוץ אישית.</span>
          </h2>
          <p className="mt-6 opacity-75 text-[14px] sm:text-base max-w-md mx-auto leading-relaxed">
            נשמח לבדוק איתך זכאות למלגה, להתאים סניף ולענות על הכל. ללא התחייבות.
          </p>
        </div>

        {sent ? (
          <div className="border border-[#d4a574]/40 p-10 text-center">
            <div className="font-serif italic text-3xl text-[#d4a574]">תודה.</div>
            <div className="mt-3 text-sm opacity-80">ניצור איתך קשר בשעות הקרובות.</div>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-8">
            {[
              { k: "name", label: "שם מלא", type: "text" },
              { k: "phone", label: "טלפון", type: "tel" },
            ].map((f) => (
              <div key={f.k}>
                <label className="block text-[10px] tracking-[0.4em] uppercase opacity-70 mb-3">
                  {f.label}
                </label>
                <input
                  required
                  type={f.type}
                  value={(data as any)[f.k]}
                  onChange={(e) => setData({ ...data, [f.k]: e.target.value })}
                  className="w-full bg-transparent border-b border-[#f3ede3]/30 focus:border-[#d4a574] outline-none py-3 text-lg font-serif transition-colors"
                />
              </div>
            ))}
            <div>
              <label className="block text-[10px] tracking-[0.4em] uppercase opacity-70 mb-3">
                סניף מועדף
              </label>
              <select
                required
                value={data.branch}
                onChange={(e) => setData({ ...data, branch: e.target.value })}
                className="w-full bg-transparent border-b border-[#f3ede3]/30 focus:border-[#d4a574] outline-none py-3 text-lg font-serif appearance-none cursor-pointer"
              >
                <option value="" className="bg-[#1a0f0a]">בחרי סניף</option>
                <option value="tel-aviv" className="bg-[#1a0f0a]">תל אביב</option>
                <option value="jerusalem" className="bg-[#1a0f0a]">ירושלים</option>
                <option value="haifa" className="bg-[#1a0f0a]">חיפה</option>
                <option value="beer-sheva" className="bg-[#1a0f0a]">באר שבע</option>
                <option value="netanya" className="bg-[#1a0f0a]">נתניה</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-[#d4a574] text-[#1a0f0a] py-5 mt-6 text-[11px] tracking-[0.45em] uppercase hover:bg-[#f3ede3] transition-colors duration-500"
            >
              שלחי וקבעי פגישה ←
            </button>

            <p className="text-center text-[10px] tracking-[0.3em] uppercase opacity-50 pt-2">
              פרטייך מאובטחים · ללא ספאם
            </p>
          </form>
        )}
      </div>
    </section>
  );
}

/* ───────────── FOOTER ───────────── */
function Footer() {
  return (
    <footer className="bg-[#f3ede3] text-[#1a0f0a] py-12 px-5 sm:px-10 border-t border-[#1a0f0a]/10">
      <div className="max-w-[1600px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] tracking-[0.4em] uppercase opacity-70">
        <div className="font-serif text-base tracking-[0.3em]">M·A · 2026</div>
        <div>קמפיין הגיוס · כל הזכויות שמורות</div>
        <div>ייעוץ · התאמה · ליווי</div>
      </div>
    </footer>
  );
}
