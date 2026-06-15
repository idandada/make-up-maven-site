import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import heroModel from "@/assets/hero-model.jpg";
import makeupKit from "@/assets/makeup-kit.jpg";
import makeupArtist from "@/assets/makeup-artist.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "קורס מאפרת מקצועית | מהמכללה המובילה בארץ" },
      { name: "description", content: "קורס איפור מקצועי 6-8 חודשים לבנות אחרי צבא ושירות לאומי. מזוודה בשווי 11,000 ₪, תעודה בינלאומית, מלגות ועבודה מובטחת." },
    ],
  }),
  component: LandingPage,
});

function LandingPage() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <TopBar />
      <Hero />
      <Marquee />
      <Editorial />
      <Numbers />
      <Includes />
      <Showcase />
      <Scholarship />
      <Testimonial />
      <LeadForm />
      <Footer />
      <StickyCTA />
    </main>
  );
}

/* ───────────────────────── TOP BAR ───────────────────────── */
function TopBar() {
  return (
    <div className="bg-[var(--ink)] text-[var(--cream)] text-[11px] tracking-[0.25em] uppercase">
      <div className="max-w-[1400px] mx-auto px-5 py-2.5 flex items-center justify-between font-medium">
        <span className="opacity-80">est. בית הספר המוביל בארץ</span>
        <span className="hidden sm:inline opacity-80">מלגות לנרשמות</span>
        <span className="opacity-80">2026 ✦</span>
      </div>
    </div>
  );
}

/* ───────────────────────── HERO ───────────────────────── */
function Hero() {
  return (
    <section className="relative bg-background overflow-hidden grain">
      {/* huge background type */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-[8%] text-center font-serif font-black text-[28vw] sm:text-[18vw] leading-none text-[var(--wine)]/[0.04] tracking-tighter select-none"
      >
        BEAUTY
      </div>

      <div className="relative max-w-[1400px] mx-auto px-5 pt-10 pb-12 sm:pt-16 sm:pb-20">
        {/* Eyebrow */}
        <div className="flex items-center justify-center gap-3 mb-8 animate-fade-up">
          <span className="h-px w-10 bg-[var(--wine)]/40" />
          <span className="eyebrow">קורס מאפרת · מחזור 2026</span>
          <span className="h-px w-10 bg-[var(--wine)]/40" />
        </div>

        {/* Headline */}
        <h1 className="text-center font-serif animate-fade-up" style={{ animationDelay: "0.1s" }}>
          <span className="block text-[15vw] sm:text-[8.5vw] md:text-[7rem] leading-[0.88] font-black text-[var(--ink)]">
            המקצוע
          </span>
          <span className="block font-italic-serif text-[14vw] sm:text-[8vw] md:text-[6.5rem] leading-[0.95] text-champagne-gradient -mt-2 sm:-mt-4">
            שיחכה לך
          </span>
          <span className="block text-[15vw] sm:text-[8.5vw] md:text-[7rem] leading-[0.88] font-black text-[var(--ink)]">
            בסיום השירות
          </span>
        </h1>

        <p className="text-center text-base sm:text-lg text-muted-foreground max-w-md mx-auto mt-8 leading-relaxed animate-fade-up" style={{ animationDelay: "0.2s" }}>
          קורס איפור מקצועי של <span className="font-bold text-foreground">6–8 חודשים</span> לבנות שעשו צבא או שירות לאומי — בשיתוף בית הספר המוביל בארץ.
        </p>

        {/* Hero image w/ overlays */}
        <div className="relative mt-12 mx-auto max-w-[760px] animate-fade-up" style={{ animationDelay: "0.3s" }}>
          <div className="relative aspect-[4/5] sm:aspect-[16/10] rounded-sm overflow-hidden shadow-editorial">
            <img
              src={heroModel}
              alt="מאפרת מקצועית מהמכללה"
              className="absolute inset-0 w-full h-full object-cover animate-slow-zoom"
            />
            {/* gradient veil */}
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--wine-deep)]/70 via-transparent to-transparent" />

            {/* corner serif label */}
            <div className="absolute top-5 right-5 text-[var(--cream)]">
              <div className="text-[10px] tracking-[0.35em] uppercase opacity-80">vol. 01</div>
              <div className="font-italic-serif text-2xl mt-1">L'Atelier</div>
            </div>

            {/* salary badge */}
            <div className="absolute bottom-5 left-5 sm:bottom-8 sm:left-8 bg-[var(--cream)] text-[var(--ink)] px-5 py-4 sm:px-7 sm:py-5 max-w-[230px] shadow-card">
              <div className="eyebrow text-[10px]">שכר יומי בתעשייה</div>
              <div className="number-display text-4xl sm:text-5xl mt-1 text-[var(--wine)]">800–2,000<span className="text-2xl mr-1">₪</span></div>
              <div className="text-[11px] mt-1 text-muted-foreground">ממוצע למאפרת מתחילה</div>
            </div>

            {/* scholarship seal */}
            <div className="absolute top-5 left-5 sm:top-8 sm:left-8 w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-champagne text-[var(--wine-deep)] flex flex-col items-center justify-center shadow-glow rotate-[-8deg]">
              <span className="font-italic-serif text-xl leading-none">מלגה</span>
              <span className="text-[10px] tracking-[0.2em] mt-1 font-bold">לנרשמות</span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 flex flex-col items-center gap-3 animate-fade-up" style={{ animationDelay: "0.4s" }}>
          <a
            href="#lead-form"
            className="group inline-flex items-center gap-3 bg-[var(--ink)] text-[var(--cream)] px-9 py-4 text-base font-bold tracking-wide hover:bg-[var(--wine)] transition-colors"
          >
            <span>לפגישת ייעוץ אישית</span>
            <span className="text-[var(--champagne)] transition-transform group-hover:-translate-x-1">←</span>
          </a>
          <p className="text-xs text-muted-foreground tracking-wider">בלי ניסיון · בלי רקע · רק רצון</p>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── MARQUEE ───────────────────────── */
function Marquee() {
  const items = [
    "מזוודה 11,000 ₪",
    "תעודה בינלאומית",
    "ליווי לעבודה",
    "מלגות אישיות",
    "תשלום מהפיקדון",
    "מחזור חדש נפתח",
  ];
  const repeated = [...items, ...items, ...items, ...items];
  return (
    <div className="bg-[var(--ink)] text-[var(--cream)] py-5 overflow-hidden hairline-top hairline-bottom">
      <div className="flex animate-marquee whitespace-nowrap">
        {repeated.map((t, i) => (
          <div key={i} className="flex items-center gap-6 px-6 shrink-0">
            <span className="font-italic-serif text-2xl text-[var(--champagne)]">✦</span>
            <span className="text-sm tracking-[0.2em] uppercase font-medium">{t}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ───────────────────────── EDITORIAL INTRO ───────────────────────── */
function Editorial() {
  return (
    <section className="bg-background py-20 sm:py-28 px-5 relative grain">
      <div className="max-w-[1100px] mx-auto grid md:grid-cols-12 gap-10 items-center">
        <div className="md:col-span-5 order-2 md:order-1">
          <div className="relative aspect-[3/4] overflow-hidden shadow-editorial">
            <img src={makeupArtist} alt="מאפרת בעבודה" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
          </div>
        </div>

        <div className="md:col-span-7 order-1 md:order-2">
          <div className="eyebrow mb-5">— הסיפור</div>
          <h2 className="font-serif text-4xl sm:text-6xl leading-[1] font-black text-[var(--ink)]">
            איפור הוא לא רק
            <span className="font-italic-serif text-champagne-gradient font-bold"> אמנות.</span>
            <br />
            הוא <span className="font-italic-serif text-[var(--wine)] font-bold">מקצוע</span> שמשנה חיים.
          </h2>

          <div className="gold-rule my-7 max-w-[140px]" />

          <p className="text-lg leading-relaxed text-muted-foreground max-w-xl">
            הקורס שלנו מלמד אותך הכל מאפס — מטכניקות בסיס ועד איפור כלות, צילום ובמה.
            תלמדי מהמאפרות שעובדות עם הסלבריטאים הכי גדולים בארץ, ותסיימי
            <span className="text-foreground font-semibold"> עם מקצוע ביד, תעודה בינלאומית ועבודה. </span>
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {["טכניקות מתקדמות", "איפור כלות", "במה וצילום", "אפקטים מיוחדים"].map((t) => (
              <span key={t} className="px-4 py-2 text-xs tracking-[0.15em] uppercase border border-[var(--wine)]/30 text-[var(--wine)] font-semibold">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── NUMBERS BAND ───────────────────────── */
function Numbers() {
  const stats = [
    { n: "6–8", l: "חודשי לימוד" },
    { n: "11K", l: "₪ ערך מזוודה" },
    { n: "100%", l: "ליווי לעבודה" },
    { n: "2K", l: "₪ שכר יומי" },
  ];
  return (
    <section className="bg-[var(--wine-deep)] text-[var(--cream)] py-14 sm:py-20 relative overflow-hidden grain">
      <div className="absolute inset-0 bg-gradient-wine opacity-90" />
      <div className="relative max-w-[1200px] mx-auto px-5">
        <div className="text-center mb-12">
          <div className="eyebrow text-[var(--champagne)] mb-3">— במספרים</div>
          <h2 className="font-serif text-3xl sm:text-5xl font-black">המכללה <span className="font-italic-serif text-champagne-gradient">בארבעה מספרים</span></h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-x-reverse divide-[var(--champagne)]/20 border-y border-[var(--champagne)]/20">
          {stats.map((s, i) => (
            <div key={i} className="text-center py-8 px-3">
              <div className="number-display text-champagne-gradient text-6xl sm:text-7xl">{s.n}</div>
              <div className="mt-3 text-[11px] tracking-[0.3em] uppercase opacity-80">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── WHAT'S INCLUDED ───────────────────────── */
function Includes() {
  const items = [
    { n: "01", t: "מזוודת איפור מקצועית", d: "מזוודה מלאה במוצרי איפור איכותיים בשווי 11,000 ₪ — שלך לתמיד" },
    { n: "02", t: "תעודה בינלאומית", d: "תעודת מאפרת מוכרת שפותחת דלתות בכל העולם" },
    { n: "03", t: "ליווי אישי לעבודה", d: "אנחנו דואגים לך לעבודה אצל המאפרות המובילות בתעשייה" },
    { n: "04", t: "מלגות אישיות", d: "כל בת זכאית למלגה — בואי לבדוק כמה מגיע לך" },
    { n: "05", t: "אפשרויות תשלום", d: "ניתן לשלם דרך הפיקדון הצבאי או בכל דרך שתבחרי" },
    { n: "06", t: "ללא ניסיון קודם", d: "אנחנו מלמדים אותך הכל מאפס — צריך רק רצון" },
  ];
  return (
    <section className="bg-[var(--cream)] py-20 sm:py-28 px-5 relative">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="eyebrow mb-3">— מה כלול בקורס</div>
          <h2 className="font-serif text-4xl sm:text-6xl font-black text-[var(--ink)] leading-[1]">
            הכל <span className="font-italic-serif text-champagne-gradient">כלול,</span>
            <br />ובלי הפתעות.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-px bg-[var(--wine)]/15">
          {items.map((it, i) => (
            <div key={i} className="bg-[var(--cream)] p-7 sm:p-9 group hover:bg-white transition-colors">
              <div className="flex items-baseline gap-5">
                <span className="font-italic-serif text-5xl sm:text-6xl text-champagne-gradient leading-none">{it.n}</span>
                <div className="h-px flex-1 bg-[var(--wine)]/15 mt-6" />
              </div>
              <h3 className="font-serif text-2xl font-bold mt-4 text-[var(--ink)]">{it.t}</h3>
              <p className="text-muted-foreground leading-relaxed mt-2">{it.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── SHOWCASE (kit) ───────────────────────── */
function Showcase() {
  return (
    <section className="bg-background py-20 sm:py-28 px-5 relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto grid md:grid-cols-12 gap-10 items-center">
        <div className="md:col-span-7 relative">
          <div className="relative aspect-[5/4] overflow-hidden shadow-editorial">
            <img src={makeupKit} alt="מזוודת איפור מקצועית" className="absolute inset-0 w-full h-full object-cover animate-slow-zoom" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[var(--wine-deep)]/40" />
          </div>
          {/* floating ticket */}
          <div className="absolute -bottom-8 right-6 sm:right-10 bg-[var(--ink)] text-[var(--cream)] px-6 py-4 rotate-[-3deg] shadow-editorial">
            <div className="text-[10px] tracking-[0.3em] uppercase opacity-70">המתנה שלך</div>
            <div className="font-italic-serif text-3xl text-[var(--champagne)] leading-none mt-1">11,000 ₪</div>
          </div>
        </div>

        <div className="md:col-span-5">
          <div className="eyebrow mb-4">— המזוודה</div>
          <h2 className="font-serif text-4xl sm:text-5xl font-black text-[var(--ink)] leading-[1]">
            מזוודה מלאה.
            <br />
            <span className="font-italic-serif text-champagne-gradient">שלך לתמיד.</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mt-6">
            כל סטודנטית מקבלת מזוודת איפור מקצועית מלאה במוצרים האהובים על מאפרות מהשורה הראשונה — מוצרי בסיס, צלליות, מכחולים ויותר.
          </p>
          <ul className="mt-6 space-y-3">
            {["מותגים מקצועיים בלעדיים", "מעל 60 מוצרי איפור", "מכחולים מקצועיים", "אחריות מלאה"].map((t) => (
              <li key={t} className="flex items-center gap-3 text-foreground">
                <span className="text-[var(--champagne)] text-xl leading-none">✦</span>
                <span className="font-medium">{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── SCHOLARSHIP ───────────────────────── */
function Scholarship() {
  return (
    <section className="bg-gradient-wine text-[var(--cream)] py-20 sm:py-28 px-5 relative overflow-hidden grain">
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[var(--champagne)]/20 blur-3xl" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-[var(--wine)]/40 blur-3xl" />

      <div className="relative max-w-3xl mx-auto text-center">
        <div className="eyebrow text-[var(--champagne)] mb-5">— הפיקדון הצבאי</div>
        <h2 className="font-serif text-4xl sm:text-6xl font-black leading-[1]">
          רוב הבנות
          <span className="font-italic-serif text-champagne-gradient"> שורפות </span>
          את הפיקדון.
        </h2>
        <div className="gold-rule my-8 mx-auto max-w-[180px]" />
        <p className="text-lg sm:text-xl opacity-90 leading-relaxed max-w-xl mx-auto">
          את יכולה להפוך אותו ל<span className="font-italic-serif text-[var(--champagne)] text-2xl">מקצוע אמיתי</span> —
          לסיים את הקורס עם תעודה, מזוודה, וליווי לעבודה עם שכר של 800–2,000 ₪ ליום.
        </p>

        <a
          href="#lead-form"
          className="inline-flex items-center gap-3 mt-10 bg-[var(--cream)] text-[var(--ink)] px-9 py-4 font-bold tracking-wide hover:bg-[var(--champagne)] transition-colors"
        >
          <span>בדקי כמה מלגה מגיעה לך</span>
          <span className="text-[var(--wine)]">←</span>
        </a>
      </div>
    </section>
  );
}

/* ───────────────────────── TESTIMONIAL ───────────────────────── */
function Testimonial() {
  return (
    <section className="bg-[var(--cream)] py-20 sm:py-24 px-5 relative">
      <div className="max-w-3xl mx-auto text-center">
        <div className="font-italic-serif text-8xl text-champagne-gradient leading-none">"</div>
        <blockquote className="font-serif text-2xl sm:text-3xl leading-relaxed text-[var(--ink)] mt-2 -ml-2">
          הגעתי בלי לדעת כלום על איפור. תוך חודשיים כבר עשיתי איפור לכלה ראשונה,
          <span className="font-italic-serif text-champagne-gradient"> וזה היה שלי. </span>
          היום אני מאפרת עצמאית עם יומן מלא.
        </blockquote>
        <div className="mt-8 flex items-center justify-center gap-3">
          <div className="h-px w-10 bg-[var(--wine)]/40" />
          <div className="text-sm tracking-[0.25em] uppercase text-muted-foreground">דניאל ב׳ · בוגרת מחזור 2025</div>
          <div className="h-px w-10 bg-[var(--wine)]/40" />
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── LEAD FORM ───────────────────────── */
function LeadForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", branch: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="lead-form" className="bg-background py-20 sm:py-28 px-5 relative grain">
      <div className="max-w-[1100px] mx-auto grid md:grid-cols-12 gap-10 items-center">
        <div className="md:col-span-5">
          <div className="eyebrow mb-4">— פגישת ייעוץ אישית</div>
          <h2 className="font-serif text-4xl sm:text-6xl font-black text-[var(--ink)] leading-[0.95]">
            השאירי
            <br />
            <span className="font-italic-serif text-champagne-gradient">שם וטלפון</span>
            <br />
            וסניף.
          </h2>
          <p className="text-muted-foreground mt-6 leading-relaxed text-lg">
            יועצת אישית תחזור אלייך תוך 24 שעות עם כל הפרטים על הקורס,
            המלגה האישית שלך, ותאריכי המחזור הקרוב.
          </p>
          <ul className="mt-6 space-y-2 text-sm text-foreground/80">
            <li className="flex gap-2"><span className="text-[var(--champagne)]">✓</span> ללא התחייבות</li>
            <li className="flex gap-2"><span className="text-[var(--champagne)]">✓</span> מענה אישי עם יועצת קורס</li>
            <li className="flex gap-2"><span className="text-[var(--champagne)]">✓</span> בדיקת זכאות למלגה</li>
          </ul>
        </div>

        <div className="md:col-span-7">
          <div className="relative bg-[var(--cream)] p-8 sm:p-10 shadow-editorial border border-[var(--wine)]/10">
            {/* corner ornaments */}
            <span className="absolute top-3 right-3 font-italic-serif text-3xl text-champagne-gradient leading-none">✦</span>
            <span className="absolute bottom-3 left-3 font-italic-serif text-3xl text-champagne-gradient leading-none">✦</span>

            {submitted ? (
              <div className="text-center py-10">
                <div className="font-italic-serif text-7xl text-champagne-gradient leading-none">✦</div>
                <h3 className="font-serif text-4xl font-black mt-4">תודה.</h3>
                <p className="text-muted-foreground mt-3 text-lg">קיבלנו את הפרטים — ניצור איתך קשר בתוך 24 שעות.</p>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-5">
                <Field label="שם מלא">
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="השם שלך"
                    className="w-full bg-transparent border-b border-[var(--ink)]/20 focus:border-[var(--wine)] outline-none py-3 text-lg text-foreground placeholder:text-muted-foreground/60 transition-colors"
                  />
                </Field>
                <Field label="טלפון">
                  <input
                    required
                    type="tel"
                    inputMode="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="050-0000000"
                    className="w-full bg-transparent border-b border-[var(--ink)]/20 focus:border-[var(--wine)] outline-none py-3 text-lg text-foreground placeholder:text-muted-foreground/60 transition-colors"
                  />
                </Field>
                <Field label="סניף מועדף">
                  <select
                    required
                    value={form.branch}
                    onChange={(e) => setForm({ ...form, branch: e.target.value })}
                    className="w-full bg-transparent border-b border-[var(--ink)]/20 focus:border-[var(--wine)] outline-none py-3 text-lg text-foreground appearance-none"
                  >
                    <option value="">בחרי סניף</option>
                    <option>תל אביב</option>
                    <option>ירושלים</option>
                    <option>חיפה</option>
                    <option>ראשון לציון</option>
                    <option>נתניה</option>
                    <option>באר שבע</option>
                    <option>אשדוד</option>
                  </select>
                </Field>

                <button
                  type="submit"
                  className="group w-full bg-[var(--ink)] text-[var(--cream)] py-4 text-base font-bold tracking-wide hover:bg-[var(--wine)] transition-colors mt-4 flex items-center justify-center gap-3"
                >
                  <span>שלחי פרטים</span>
                  <span className="text-[var(--champagne)] transition-transform group-hover:-translate-x-1">←</span>
                </button>
                <p className="text-center text-[11px] text-muted-foreground tracking-wider">
                  בלחיצה את מאשרת שניצור איתך קשר
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="eyebrow block mb-1">{label}</span>
      {children}
    </label>
  );
}

/* ───────────────────────── FOOTER ───────────────────────── */
function Footer() {
  return (
    <footer className="bg-[var(--ink)] text-[var(--cream)]/80 py-14 px-5 pb-28">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col items-center text-center">
          <div className="font-italic-serif text-4xl text-champagne-gradient">L'Atelier</div>
          <div className="font-serif text-xl font-bold mt-1">קורס מאפרת מקצועית</div>
          <div className="gold-rule my-6 w-32" />
          <p className="text-sm opacity-70 max-w-md leading-relaxed">
            בשיתוף בית הספר המוביל בארץ לאיפור. מלגות לנרשמות, תשלום מהפיקדון הצבאי, ועבודה מובטחת.
          </p>
          <p className="text-xs opacity-50 mt-6 tracking-[0.2em] uppercase">© {new Date().getFullYear()} כל הזכויות שמורות</p>
        </div>
      </div>
    </footer>
  );
}

/* ───────────────────────── STICKY CTA ───────────────────────── */
function StickyCTA() {
  return (
    <div className="fixed bottom-0 inset-x-0 z-50 p-3 bg-gradient-to-t from-[var(--ink)] via-[var(--ink)]/95 to-transparent pt-6 md:hidden">
      <a
        href="#lead-form"
        className="group flex items-center justify-center gap-3 bg-[var(--champagne)] text-[var(--ink)] py-3.5 text-sm font-bold tracking-wide shadow-glow"
      >
        <span>לפגישת ייעוץ אישית</span>
        <span className="text-[var(--wine)] transition-transform group-hover:-translate-x-1">←</span>
      </a>
    </div>
  );
}
