import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, Wand2, ShoppingBag, UtensilsCrossed, Hotel, Briefcase, Check, Zap, Palette, Globe } from "lucide-react";
import { CATEGORIES, TEMPLATES } from "@/lib/catalog";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mindset Digital — Build your store in minutes" },
      { name: "description", content: "أنشئ متجر، مطعم، فندق أو portfolio في دقائق — بدون كود. اختر template، خصّص، وأطلق مع تسليم واتساب أو Google Sheets." },
      { property: "og:title", content: "Mindset Digital — Build your store in minutes" },
    ],
  }),
  component: HomePage,
});

const ICON_MAP = { ecommerce: ShoppingBag, restaurant: UtensilsCrossed, booking: Hotel, portfolio: Briefcase } as const;

function HomePage() {
  return (
    <div className="relative overflow-hidden">
      {/* Animated blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-10 -left-20 w-72 h-72 rounded-full bg-pink-400/30 animate-blob" />
        <div className="absolute top-40 right-0 w-80 h-80 rounded-full bg-cyan-400/30 animate-blob" style={{ animationDelay: "3s" }} />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 rounded-full bg-purple-500/20 animate-blob" style={{ animationDelay: "6s" }} />
      </div>

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-5 sm:px-6 pt-12 sm:pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 bg-foreground/5 backdrop-blur border border-border rounded-full px-4 py-1.5 text-xs font-bold text-foreground/80 mb-6 animate-pop">
          <Sparkles size={14} className="text-primary" />
          <span>No-code builder · 4 industries · 15+ templates</span>
        </div>

        <h1 className="font-display text-5xl sm:text-7xl font-extrabold leading-[0.95] tracking-tight mb-6">
          Launch your <br className="sm:hidden" />
          <span className="text-grad-rainbow">dream store</span> <br />
          in 10 minutes.
        </h1>

        <p className="max-w-2xl mx-auto text-lg sm:text-xl text-muted-foreground mb-10 leading-relaxed">
          Mindset Digital هي منصّة بدون كود لصناعة متجرك، مطعمك، فندقك أو portfolio ديالك.
          اختر، خصّص، وأطلق — مع تسليم الطلبات على واتساب أو Google Sheets.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-14">
          <Link
            to="/builder"
            className="group inline-flex items-center gap-2 grad-purple text-white px-7 py-4 rounded-full text-base font-bold shadow-pop hover:scale-105 transition-transform"
          >
            <Wand2 size={18} /> Start building free
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/templates"
            className="inline-flex items-center gap-2 bg-foreground/5 hover:bg-foreground/10 border border-border text-foreground px-7 py-4 rounded-full text-base font-bold transition"
          >
            Browse templates
          </Link>
        </div>

        {/* Floating preview mockup */}
        <div className="relative max-w-4xl mx-auto animate-float">
          <div className="absolute -inset-4 grad-rainbow opacity-30 blur-3xl rounded-[3rem]" />
          <div className="relative grid grid-cols-3 gap-3 sm:gap-4">
            {TEMPLATES.slice(0, 6).map((t, i) => (
              <div
                key={t.id}
                className={`aspect-[3/4] rounded-2xl bg-gradient-to-br ${t.palette[0]} ${t.palette[1]} shadow-card p-3 sm:p-5 text-white flex flex-col justify-between animate-slide-up`}
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="text-3xl sm:text-5xl">{t.emoji}</div>
                <div>
                  <div className="text-xs sm:text-sm font-bold leading-tight">{t.name}</div>
                  <div className="text-[10px] sm:text-xs opacity-80">{t.tagline}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="max-w-6xl mx-auto px-5 sm:px-6 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-5xl font-extrabold mb-3">Pick your <span className="text-grad-rainbow">industry</span></h2>
          <p className="text-muted-foreground text-lg">4 صناعات مدعومة — كل واحدة بقوالب جاهزة وميزات خاصة.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CATEGORIES.map((c, i) => {
            const Icon = ICON_MAP[c.id];
            return (
              <Link
                key={c.id}
                to="/templates"
                search={{ cat: c.id }}
                className={`group ${c.gradient} rounded-3xl p-6 text-white shadow-card hover:shadow-pop hover:-translate-y-1 transition-all animate-slide-up`}
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="text-4xl">{c.emoji}</div>
                  <Icon size={22} className="opacity-70" />
                </div>
                <div className="text-xl font-bold mb-1">{c.name}</div>
                <p className="text-sm opacity-90 leading-relaxed mb-4">{c.blurb}</p>
                <div className="flex flex-wrap gap-1.5">
                  {c.examples.slice(0, 3).map((ex) => (
                    <span key={ex} className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-semibold">{ex}</span>
                  ))}
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="max-w-6xl mx-auto px-5 sm:px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-5xl font-extrabold mb-3">3 steps to <span className="text-grad-rainbow">launch</span></h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { n: "01", icon: Palette, title: "Pick a template", desc: "اختر من بين 15+ قالب احترافي حسب الصناعة." },
            { n: "02", icon: Wand2, title: "Customize", desc: "غير اللون، الاسم، الصفحات، اللوغو والمنتجات بكل سهولة." },
            { n: "03", icon: Globe, title: "Launch", desc: "شارك الرابط مع زبنائك — الطلبات تجي على WhatsApp أو Sheets." },
          ].map((s) => (
            <div key={s.n} className="relative rounded-3xl bg-card border border-border p-7 shadow-card hover:shadow-pop transition group">
              <div className="absolute -top-4 -right-4 w-14 h-14 rounded-2xl grad-rainbow text-white font-extrabold text-xl flex items-center justify-center shadow-pop">
                {s.n}
              </div>
              <s.icon size={32} className="text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">{s.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-6xl mx-auto px-5 sm:px-6 py-16">
        <div className="rounded-[2.5rem] grad-rainbow p-1 shadow-glow">
          <div className="rounded-[calc(2.5rem-4px)] bg-background p-8 sm:p-12">
            <div className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl font-extrabold mb-2">All you need, <span className="text-grad-rainbow">included</span></h2>
              <p className="text-muted-foreground">Every feature you need to run a modern online business.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                "Drag & drop builder","WhatsApp orders","Google Sheets sync","Mobile responsive","Custom colors & fonts",
                "RTL & multi‑language","SEO optimized","Image gallery","Reviews & ratings","Booking calendar",
                "QR code menu","Cart & checkout",
              ].map((f) => (
                <div key={f} className="flex items-center gap-2 bg-foreground/5 rounded-xl px-4 py-3">
                  <Check size={16} className="text-primary shrink-0" />
                  <span className="text-sm font-semibold">{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-5 sm:px-6 py-20 text-center">
        <Zap size={40} className="mx-auto text-primary mb-4 animate-pop" />
        <h2 className="text-3xl sm:text-5xl font-extrabold mb-4">Ready to build something <span className="text-grad-rainbow">amazing</span>?</h2>
        <p className="text-muted-foreground text-lg mb-8">Free to try · No credit card · Live preview.</p>
        <Link
          to="/builder"
          className="inline-flex items-center gap-2 grad-purple text-white px-8 py-4 rounded-full text-base font-bold shadow-pop hover:scale-105 transition-transform"
        >
          <Wand2 size={18} /> Start building now
        </Link>
      </section>
    </div>
  );
}
