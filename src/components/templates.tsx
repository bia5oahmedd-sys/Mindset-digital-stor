import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { CATEGORIES, TEMPLATES, templatesFor } from "@/lib/catalog";
import { useBuilder } from "@/contexts/BuilderContext";
import { ArrowRight, Sparkles } from "lucide-react";
import type { StoreCategory } from "@/lib/types";

const searchSchema = z.object({
  cat: z.enum(["ecommerce", "restaurant", "booking", "portfolio"]).optional(),
});

export const Route = createFileRoute("/templates")({
  validateSearch: (s) => searchSchema.parse(s),
  head: () => ({
    meta: [
      { title: "Templates — Mindset Digital" },
      { name: "description", content: "اختر من بين 15+ قالب احترافي: متاجر، مطاعم، فنادق، portfolio." },
      { property: "og:title", content: "Templates — Mindset Digital" },
    ],
  }),
  component: TemplatesPage,
});

function TemplatesPage() {
  const { cat } = Route.useSearch();
  const navigate = useNavigate();
  const { patch } = useBuilder();

  const list = templatesFor(cat ?? null);

  const setCat = (next: StoreCategory | null) => {
    navigate({ to: "/templates", search: next ? { cat: next } : {} });
  };

  const useTemplate = (templateId: string, category: StoreCategory) => {
    patch({ category, templateId, step: 1 });
    navigate({ to: "/builder" });
  };

  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-6 py-10">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-foreground/5 border border-border rounded-full px-3 py-1 text-xs font-bold mb-4">
          <Sparkles size={14} className="text-primary" /> {TEMPLATES.length} templates · {CATEGORIES.length} industries
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-2">Choose your <span className="text-grad-rainbow">template</span></h1>
        <p className="text-muted-foreground">Pick one and customize it in the builder.</p>
      </div>

      {/* Filter chips */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 mb-8 -mx-5 px-5 sm:justify-center">
        <button
          onClick={() => setCat(null)}
          className={`shrink-0 px-4 py-2 rounded-full text-sm font-bold transition ${
            !cat ? "bg-foreground text-background" : "bg-foreground/5 hover:bg-foreground/10"
          }`}
        >
          All ({TEMPLATES.length})
        </button>
        {CATEGORIES.map((c) => {
          const count = TEMPLATES.filter((t) => t.category === c.id).length;
          const active = cat === c.id;
          return (
            <button
              key={c.id}
              onClick={() => setCat(c.id)}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-bold transition flex items-center gap-1.5 ${
                active ? "bg-foreground text-background" : "bg-foreground/5 hover:bg-foreground/10"
              }`}
            >
              <span>{c.emoji}</span> {c.name} <span className="opacity-60">({count})</span>
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {list.map((t, i) => (
          <div
            key={t.id}
            className="group rounded-3xl bg-card border border-border overflow-hidden shadow-card hover:shadow-pop hover:-translate-y-1 transition-all animate-slide-up"
            style={{ animationDelay: `${i * 50}ms` }}
          >
            <div className={`aspect-[4/3] bg-gradient-to-br ${t.palette[0]} ${t.palette[1]} p-6 flex flex-col justify-between text-white relative overflow-hidden`}>
              <div className="absolute inset-0 animate-shine pointer-events-none" />
              <div className="text-6xl drop-shadow">{t.emoji}</div>
              <div>
                <div className="text-xs uppercase tracking-wider opacity-80 mb-1">{CATEGORIES.find((c) => c.id === t.category)?.name}</div>
                <div className="font-display font-extrabold text-2xl leading-tight">{t.name}</div>
                <div className="text-sm opacity-90">{t.tagline}</div>
              </div>
            </div>
            <div className="p-5">
              <div className="flex flex-wrap gap-1.5 mb-4">
                {t.features.map((f) => (
                  <span key={f} className="text-[10px] bg-foreground/5 text-foreground/80 px-2 py-0.5 rounded-full font-bold">{f}</span>
                ))}
              </div>
              <button
                onClick={() => useTemplate(t.id, t.category)}
                className="w-full inline-flex items-center justify-center gap-2 grad-purple text-white py-3 rounded-2xl text-sm font-bold shadow-pop hover:scale-[1.02] transition"
              >
                Use this template <ArrowRight size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-10">
        <p className="text-muted-foreground mb-3">Don't see what you need?</p>
        <Link to="/builder" className="inline-flex items-center gap-2 bg-foreground/5 hover:bg-foreground/10 px-5 py-3 rounded-full font-bold">
          Start from scratch <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
