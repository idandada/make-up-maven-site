import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import heroModel from "@/assets/hero-model.jpg";
import makeupKit from "@/assets/makeup-kit.jpg";
import makeupArtist from "@/assets/makeup-artist.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "קורס מאפרת מקצועית | מהפיקדון הצבאי למקצוע מבוקש" },
      { name: "description", content: "קורס איפור מקצועי 6-8 חודשים לבנות אחרי צבא ושירות לאומי. מזוודת איפור 11,000 ₪, תעודה בינלאומית, מלגה ועבודה מובטחת." },
    ],
  }),
  component: LandingPage,
});

function LandingPage() {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Hero />
      <Stats />
      <Benefits />
      <Course />
      <Scholarship />
      <LeadForm />
      <Footer />
      <StickyCTA />
    </main>
  );
}

function Hero() {
  return (
    <section className="relative bg-gradient-hero sparkle-bg overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 right-8 w-32 h-32 rounded-full bg-gradient-gold opacity-20 blur-3xl" />
        <div className="absolute bottom-20 left-8 w-40 h-40 rounded-full bg-deep-rose opacity-15 blur-3xl" />
      </div>

      <div className="relative max-w-xl mx-auto px-5 pt-10 pb-8">
        <div className="text-center animate-fade-up">
          <h1 className="font-black leading-[0.95]" style={{ fontFamily: "'Playfair Display', serif" }}>
            <span className="block text-foreground text-5xl sm:text-6xl tracking-tight">קורס</span>
            <span className="block text-rose-gradient text-[5.5rem] sm:text-8xl my-1 leading-none">מאפרת</span>
            <span className="block text-gold-gradient text-6xl sm:text-7xl">מקצועית</span>
          </h1>

          <div className="w-20 h-px bg-gradient-gold mx-auto my-5" />

          <p className="text-base sm:text-lg text-foreground/85 leading-relaxed font-medium px-2">
            באורך <span className="font-black text-[var(--deep-rose)]">6-8 חודשים</span> ודואגים לך לעבודה
            <br/>
            עם שכר ממוצע יומי של
          </p>
          <div className="mt-1 font-black text-[var(--deep-rose)] text-3xl sm:text-4xl" style={{ fontFamily: "'Playfair Display', serif" }}>
            800-2,000 ש״ח
          </div>

          <div className="mt-5 inline-flex items-center gap-2 bg-gradient-rose text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-soft">
            <span className="text-[var(--gold)]">♥</span>
            <span>לבנות שעשו צבא / שירות לאומי · בכל גיל</span>
          </div>
        </div>

        <div className="relative mt-8 mx-auto max-w-sm">
          <div className="absolute -inset-3 bg-gradient-gold opacity-30 blur-2xl rounded-full" />
          <div className="relative rounded-3xl overflow-hidden shadow-card border-4 border-white">
            <img
              src={heroModel}
              alt="מאפרת מקצועית"
              width={1024}
              height={1280}
              className="w-full h-auto block"
            />
          </div>
          <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-gradient-gold flex items-center justify-center text-white font-black text-center text-sm leading-tight shadow-glow animate-float" style={{ fontFamily: "'Playfair Display', serif" }}>
            מלגה<br/>לנרשמות
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6 leading-relaxed">
          בשיתוף בית הספר הגדול בארץ לאיפור<br/>
          <span className="font-semibold">בלי ניסיון · בלי רקע · רק רצון ללמוד מקצוע אמיתי</span>
        </p>

        <a
          href="#lead-form"
          className="mt-6 block w-full text-center bg-gradient-rose text-white text-lg font-black py-4 rounded-2xl shadow-soft active:scale-[0.98] transition-transform"
        >
          בואי לפגישת ייעוץ ←
        </a>
      </div>
    </section>
  );
}

function Stats() {
  const items = [
    { num: "6-8", label: "חודשי קורס" },
    { num: "11K", label: "₪ מזוודת איפור" },
    { num: "2,000", label: "₪ שכר יומי" },
  ];
  return (
    <section className="bg-gradient-rose py-6 px-4">
      <div className="max-w-xl mx-auto grid grid-cols-3 gap-3">
        {items.map((it, i) => (
          <div key={i} className="text-center text-white">
            <div className="text-2xl sm:text-3xl font-black text-[var(--gold)]" style={{ fontFamily: "'Playfair Display', serif" }}>{it.num}</div>
            <div className="text-xs font-medium opacity-90 mt-0.5">{it.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Benefits() {
  const benefits = [
    { icon: "👜", title: "מזוודת איפור בשווי 11,000 ₪", desc: "מזוודה מקצועית מלאה במוצרי איפור איכותיים — שלך לתמיד" },
    { icon: "🏆", title: "תעודת מאפרת בינלאומית", desc: "תעודה מוכרת שפותחת דלתות בכל העולם" },
    { icon: "💼", title: "ליווי ועבודה בסיום הקורס", desc: "דואגים לך לעבודה אצל מקצוענים מובילים בתעשייה" },
    { icon: "🎁", title: "מלגה לנרשמות", desc: "מלגות אישיות לפי זכאות — בואי לבדוק כמה מגיע לך" },
    { icon: "💎", title: "אפשרויות תשלום גמישות", desc: "ניתן לשלם דרך הפיקדון הצבאי או בכל דרך שתבחרי" },
    { icon: "✨", title: "בלי ניסיון · בלי רקע", desc: "רק רצון ללמוד מקצוע אמיתי שתאהבי לעשות" },
  ];

  return (
    <section className="py-14 px-5 bg-background relative">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-10">
          <span className="inline-block text-xs font-bold tracking-widest text-[var(--deep-rose)] mb-2">·  מה את מקבלת  ·</span>
          <h2 className="text-3xl sm:text-4xl font-black text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>
            כל מה ש<span className="text-rose-gradient">חלמת עליו</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-gold mx-auto mt-3 rounded-full" />
        </div>

        <div className="space-y-4">
          {benefits.map((b, i) => (
            <div
              key={i}
              className="group relative bg-card rounded-2xl p-5 shadow-card border border-[var(--blush)] hover:shadow-soft transition-all overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-gold opacity-5 rounded-full blur-2xl" />
              <div className="relative flex items-start gap-4">
                <div className="shrink-0 w-12 h-12 rounded-xl bg-gradient-blush flex items-center justify-center text-2xl shadow-soft">
                  {b.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-black text-base text-foreground mb-1">{b.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Course() {
  return (
    <section className="py-14 px-5 bg-gradient-blush relative overflow-hidden">
      <div className="absolute inset-0 sparkle-bg opacity-50" />
      <div className="relative max-w-xl mx-auto">
        <div className="text-center mb-8">
          <span className="inline-block text-xs font-bold tracking-widest text-[var(--deep-rose)] mb-2">·  הקורס  ·</span>
          <h2 className="text-3xl sm:text-4xl font-black" style={{ fontFamily: "'Playfair Display', serif" }}>
            <span className="text-foreground">לומדות מ</span>
            <span className="text-gold-gradient">המקצוענים</span>
            <br/>
            <span className="text-foreground">שבתעשייה</span>
          </h2>
        </div>

        <div className="relative rounded-3xl overflow-hidden shadow-card border-4 border-white mb-6">
          <img src={makeupArtist} alt="מאפרת מקצועית בפעולה" width={1024} height={1024} loading="lazy" className="w-full h-auto block" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 right-4 left-4 text-white">
            <div className="text-xs font-bold opacity-90">מאיפה מגיעות המאפרות של הסלבריטאים?</div>
            <div className="text-lg font-black">מהמכללה המובילה בישראל לאיפור</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-2xl p-4 text-center shadow-card border border-[var(--gold)]/30">
            <div className="text-3xl font-black text-rose-gradient" style={{ fontFamily: "'Playfair Display', serif" }}>6-8</div>
            <div className="text-xs font-semibold text-muted-foreground mt-1">חודשי לימוד מקצועי</div>
          </div>
          <div className="bg-white rounded-2xl p-4 text-center shadow-card border border-[var(--gold)]/30">
            <div className="text-3xl font-black text-rose-gradient" style={{ fontFamily: "'Playfair Display', serif" }}>100%</div>
            <div className="text-xs font-semibold text-muted-foreground mt-1">ליווי עד עבודה</div>
          </div>
        </div>

        <div className="mt-6 relative rounded-3xl overflow-hidden shadow-card border-4 border-white">
          <img src={makeupKit} alt="מזוודת איפור מקצועית" width={1024} height={1024} loading="lazy" className="w-full h-auto block" />
          <div className="absolute top-4 left-4 bg-gradient-gold text-white px-4 py-2 rounded-full text-sm font-black shadow-glow">
            בשווי 11,000 ₪
          </div>
        </div>
      </div>
    </section>
  );
}

function Scholarship() {
  return (
    <section className="py-14 px-5 bg-gradient-rose relative overflow-hidden">
      <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[var(--gold)] opacity-20 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-[var(--blush)] opacity-30 blur-3xl" />

      <div className="relative max-w-xl mx-auto text-center text-white">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-gold mb-5 shadow-glow text-2xl">♥</div>
        <h2 className="text-3xl sm:text-4xl font-black leading-tight mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
          רוב הבנות אחרי צבא<br/>
          <span className="text-gold-gradient">שורפות את הפיקדון</span>
        </h2>
        <p className="text-lg opacity-95 mb-6 leading-relaxed">
          אצלנו תוכלי לעשות קורס איפור מקצועי<br/>
          <strong className="text-[var(--gold)]">עם הפיקדון</strong> — ולצאת עם מקצוע
        </p>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20 mb-6">
          <div className="text-sm font-medium opacity-90 mb-1">שכר ממוצע יומי בתעשייה</div>
          <div className="text-5xl font-black text-[var(--gold)]" style={{ fontFamily: "'Playfair Display', serif" }}>
            800-2,000
            <span className="text-2xl mr-1">₪</span>
          </div>
        </div>

        <a
          href="#lead-form"
          className="inline-block bg-white text-[var(--deep-rose)] text-lg font-black px-8 py-4 rounded-2xl shadow-soft active:scale-[0.98] transition-transform"
        >
          בדקי כמה מלגה מגיעה לך ←
        </a>
      </div>
    </section>
  );
}

function LeadForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", branch: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="lead-form" className="py-14 px-5 bg-background relative">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-8">
          <span className="inline-block text-xs font-bold tracking-widest text-[var(--deep-rose)] mb-2">·  פגישת ייעוץ  ·</span>
          <h2 className="text-3xl sm:text-4xl font-black" style={{ fontFamily: "'Playfair Display', serif" }}>
            <span className="text-foreground">בואי לפגישת</span>{" "}
            <span className="text-rose-gradient">ייעוץ</span>
          </h2>
          <p className="text-muted-foreground mt-3 text-sm">השאירי פרטים — נחזור אליך תוך 24 שעות עם כל המידע</p>
        </div>

        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-gold opacity-30 blur-xl rounded-3xl" />
          <div className="relative bg-card rounded-3xl p-6 shadow-card border-2 border-[var(--gold)]/40">
            {submitted ? (
              <div className="text-center py-8">
                <div className="text-5xl mb-4">✨</div>
                <h3 className="text-2xl font-black text-rose-gradient mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>תודה!</h3>
                <p className="text-muted-foreground">קיבלנו את הפרטים שלך. ניצור איתך קשר תוך 24 שעות.</p>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-foreground mb-1.5">שם מלא</label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[var(--blush)]/50 border-2 border-transparent focus:border-[var(--gold)] focus:bg-white outline-none transition-all text-base"
                    placeholder="השם שלך"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-foreground mb-1.5">טלפון</label>
                  <input
                    required
                    type="tel"
                    inputMode="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[var(--blush)]/50 border-2 border-transparent focus:border-[var(--gold)] focus:bg-white outline-none transition-all text-base"
                    placeholder="050-0000000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-foreground mb-1.5">סניף מועדף</label>
                  <select
                    required
                    value={form.branch}
                    onChange={(e) => setForm({ ...form, branch: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[var(--blush)]/50 border-2 border-transparent focus:border-[var(--gold)] focus:bg-white outline-none transition-all text-base appearance-none"
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
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-rose text-white text-lg font-black py-4 rounded-2xl shadow-soft active:scale-[0.98] transition-transform mt-2"
                >
                  שלחי פרטים ←
                </button>
                <p className="text-center text-xs text-muted-foreground">
                  בלחיצה על הכפתור את מאשרת שניצור איתך קשר
                </p>
              </form>
            )}
          </div>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5"><span className="text-[var(--gold)]">✓</span> ללא ניסיון קודם</div>
          <div className="flex items-center gap-1.5"><span className="text-[var(--gold)]">✓</span> מלגות אישיות</div>
          <div className="flex items-center gap-1.5"><span className="text-[var(--gold)]">✓</span> תעודה בינלאומית</div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[var(--foreground)] text-white/80 py-8 px-5 pb-24">
      <div className="max-w-xl mx-auto text-center">
        <div className="text-lg font-black text-rose-gradient mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
          קורס מאפרת מקצועית
        </div>
        <p className="text-xs opacity-70 mb-3">בשיתוף בית הספר הגדול בארץ לאיפור</p>
        <p className="text-xs opacity-50">© {new Date().getFullYear()} כל הזכויות שמורות</p>
      </div>
    </footer>
  );
}

function StickyCTA() {
  return (
    <div className="fixed bottom-0 inset-x-0 z-50 p-3 bg-gradient-to-t from-background via-background to-transparent pt-6">
      <a
        href="#lead-form"
        className="block max-w-xl mx-auto text-center bg-gradient-rose text-white text-base font-black py-3.5 rounded-2xl shadow-soft active:scale-[0.98] transition-transform"
      >
        ♥  לפגישת ייעוץ ובדיקת מלגה
      </a>
    </div>
  );
}
