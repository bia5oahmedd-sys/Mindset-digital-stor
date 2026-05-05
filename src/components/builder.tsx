import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useBuilder } from "@/contexts/BuilderContext";
import { CATEGORIES, COLOR_PRESETS, PAGES, TEMPLATES, templatesFor } from "@/lib/catalog";
import type { Delivery, Layout, SampleItem, StoreCategory, Vibe } from "@/lib/types";
import {
  ArrowLeft, ArrowRight, Check, Eye, MessageCircle, Palette, Plus, RefreshCw,
  Sheet, Sparkles, Trash2, Wand2,
} from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/builder")({
  head: () => ({
    meta: [
      { title: "Builder — Mindset Digital" },
      { name: "description", content: "Step-by-step wizard لإنشاء موقعك بدون كود — اختر النوع، الألوان، الصفحات والمنتجات." },
    ],
  }),
  component: BuilderPage,
});

const STEPS = [
  { id: 0, label: "Industry" },
  { id: 1, label: "Template" },
  { id: 2, label: "Brand" },
  { id: 3, label: "Style" },
  { id: 4, label: "Pages" },
  { id: 5, label: "Items" },
  { id: 6, label: "Delivery" },
] as const;

function BuilderPage() {
  const { state, set, patch, pickCategory } = useBuilder();
  const navigate = useNavigate();
  const step = state.step;

  const goStep = (s: number) => set("step", Math.max(0, Math.min(STEPS.length - 1, s)));
  const next = () => {
    if (step >= STEPS.length - 1) navigate({ to: "/preview" });
    else goStep(step + 1);
  };
  const prev = () => goStep(step - 1);

  const canNext = (() => {
    if (step === 0) return !!state.category;
    if (step === 1) return !!state.templateId;
    if (step === 2) return state.storeName.trim().length > 1;
    if (step === 6) {
      if (state.delivery === "whatsapp" || state.delivery === "both") return state.whatsapp.replace(/\D/g, "").length >= 8;
      if (state.delivery === "sheets") return state.sheetUrl.trim().length > 5;
    }
    return true;
  })();

  return (
    <div className="max-w-5xl mx-auto px-5 sm:px-6 py-8">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <div className="text-sm font-bold text-muted-foreground">Step {step + 1} / {STEPS.length}</div>
          <div className="text-sm font-bold text-primary">{STEPS[step].label}</div>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full grad-rainbow transition-all duration-500"
            style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
          />
        </div>
        <div className="hidden sm:flex justify-between mt-3 text-[11px] font-bold text-muted-foreground">
          {STEPS.map((s, i) => (
            <button
              key={s.id}
              onClick={() => goStep(i)}
              className={`transition ${i <= step ? "text-foreground" : ""}`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Step content */}
      <div className="rounded-3xl bg-card border border-border shadow-card p-6 sm:p-10 min-h-[400px] animate-pop" key={step}>
        {step === 0 && <StepIndustry />}
        {step === 1 && <StepTemplate />}
        {step === 2 && <StepBrand />}
        {step === 3 && <StepStyle />}
        {step === 4 && <StepPages />}
        {step === 5 && <StepItems />}
        {step === 6 && <StepDelivery />}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between gap-3 mt-6">
        <button
          onClick={prev}
          disabled={step === 0}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-full font-bold text-sm bg-foreground/5 hover:bg-foreground/10 disabled:opacity-40 disabled:cursor-not-allowed transition"
        >
          <ArrowLeft size={16} /> Back
        </button>
        <div className="flex items-center gap-2">
          <Link
            to="/preview"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full font-bold text-sm bg-foreground/5 hover:bg-foreground/10 transition"
          >
            <Eye size={16} /> Preview
          </Link>
          <button
            onClick={next}
            disabled={!canNext}
            className="inline-flex items-center gap-2 grad-purple text-white px-6 py-3 rounded-full font-bold text-sm shadow-pop hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 transition-transform"
          >
            {step === STEPS.length - 1 ? <>Launch <Sparkles size={16} /></> : <>Next <ArrowRight size={16} /></>}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ───── Steps ───── */

function StepIndustry() {
  const { state, pickCategory } = useBuilder();
  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-extrabold mb-2">Pick your industry</h2>
      <p className="text-muted-foreground mb-6">شنو هي الصناعة ديال موقعك؟</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {CATEGORIES.map((c) => {
          const active = state.category === c.id;
          return (
            <button
              key={c.id}
              onClick={() => pickCategory(c.id)}
              className={`text-right ${c.gradient} text-white rounded-2xl p-5 shadow-card hover:scale-[1.02] transition-transform relative ${
                active ? "ring-4 ring-foreground/40" : ""
              }`}
            >
              {active && (
                <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white text-primary flex items-center justify-center">
                  <Check size={16} strokeWidth={3} />
                </div>
              )}
              <div className="text-4xl mb-2">{c.emoji}</div>
              <div className="font-bold text-lg">{c.name}</div>
              <div className="text-sm opacity-90 mt-1">{c.blurb}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function StepTemplate() {
  const { state, set } = useBuilder();
  const list = templatesFor(state.category);
  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-extrabold mb-2">Pick a template</h2>
      <p className="text-muted-foreground mb-6">قالب جاهز يقدر يتبدّل بأي وقت.</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {list.map((t) => {
          const active = state.templateId === t.id;
          return (
            <button
              key={t.id}
              onClick={() => set("templateId", t.id)}
              className={`text-right rounded-2xl overflow-hidden border-2 transition ${
                active ? "border-primary shadow-pop" : "border-transparent hover:border-border"
              }`}
            >
              <div className={`aspect-[4/3] bg-gradient-to-br ${t.palette[0]} ${t.palette[1]} p-3 flex flex-col justify-between text-white`}>
                <div className="text-3xl">{t.emoji}</div>
                <div className="text-xs font-bold leading-tight">{t.name}</div>
              </div>
              <div className="p-2 text-xs font-semibold text-foreground bg-card">{t.tagline}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function StepBrand() {
  const { state, set } = useBuilder();
  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-extrabold mb-2">Brand identity</h2>
      <p className="text-muted-foreground mb-6">الاسم، الشعار، والوصف ديال موقعك.</p>

      <div className="space-y-4">
        <Field label="Store name *">
          <input
            value={state.storeName}
            maxLength={60}
            onChange={(e) => set("storeName", e.target.value)}
            placeholder="مثال: Brand Ahmed"
            className="w-full px-4 py-3 rounded-xl bg-foreground/5 border border-border focus:border-primary focus:outline-none font-semibold"
          />
        </Field>
        <Field label="Tagline">
          <input
            value={state.tagline}
            maxLength={120}
            onChange={(e) => set("tagline", e.target.value)}
            placeholder="مثال: متجر الكتب الأنيق في المغرب"
            className="w-full px-4 py-3 rounded-xl bg-foreground/5 border border-border focus:border-primary focus:outline-none"
          />
        </Field>
        <Field label="Logo URL">
          <div className="flex gap-3">
            {state.logo && (
              <div className="w-14 h-14 rounded-xl bg-foreground/5 border border-border overflow-hidden shrink-0">
                <img src={state.logo} alt="logo" className="w-full h-full object-cover" />
              </div>
            )}
            <input
              value={state.logo}
              onChange={(e) => set("logo", e.target.value)}
              placeholder="https://..."
              className="flex-1 px-4 py-3 rounded-xl bg-foreground/5 border border-border focus:border-primary focus:outline-none text-sm"
            />
          </div>
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Language">
            <select
              value={state.language}
              onChange={(e) => {
                const lang = e.target.value as "ar" | "fr" | "en";
                set("language", lang);
                set("rtl", lang === "ar");
              }}
              className="w-full px-4 py-3 rounded-xl bg-foreground/5 border border-border focus:border-primary focus:outline-none font-semibold"
            >
              <option value="ar">العربية</option>
              <option value="fr">Français</option>
              <option value="en">English</option>
            </select>
          </Field>
          <Field label="Currency">
            <select
              value={state.currency}
              onChange={(e) => set("currency", e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-foreground/5 border border-border focus:border-primary focus:outline-none font-semibold"
            >
              <option value="MAD">MAD · درهم</option>
              <option value="EUR">EUR · €</option>
              <option value="USD">USD · $</option>
              <option value="DZD">DZD · دج</option>
              <option value="TND">TND · د.ت</option>
            </select>
          </Field>
        </div>
      </div>
    </div>
  );
}

function StepStyle() {
  const { state, set } = useBuilder();
  const vibes: { id: Vibe; name: string; desc: string }[] = [
    { id: "fun", name: "Fun & Playful", desc: "ألوان حية، شكل مرح" },
    { id: "clean", name: "Clean Minimal", desc: "أبيض، Typography نقية" },
    { id: "bold", name: "Bold & Modern", desc: "كونتراست عالي، Statement" },
    { id: "elegant", name: "Elegant Premium", desc: "ذهبي، فاخر، أنيق" },
  ];
  const layouts: { id: Layout; name: string; desc: string }[] = [
    { id: "grid", name: "Grid", desc: "شبكة منتجات" },
    { id: "list", name: "List", desc: "قائمة مفصّلة" },
    { id: "magazine", name: "Magazine", desc: "Hero + Featured" },
  ];
  return (
    <div className="space-y-7">
      <div>
        <h2 className="text-2xl sm:text-3xl font-extrabold mb-2">Visual style</h2>
        <p className="text-muted-foreground">Vibe، الألوان، والشكل العام.</p>
      </div>

      <Section title="Color palette" icon={Palette}>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {COLOR_PRESETS.map((p) => {
            const active = state.primaryColor.toLowerCase() === p.primary.toLowerCase();
            return (
              <button
                key={p.name}
                onClick={() => { set("primaryColor", p.primary); set("accentColor", p.accent); }}
                className={`rounded-2xl p-3 border-2 transition ${active ? "border-foreground shadow-pop" : "border-transparent hover:border-border"}`}
              >
                <div className="flex gap-1 mb-2">
                  <div className="flex-1 h-12 rounded-l-xl" style={{ background: p.primary }} />
                  <div className="flex-1 h-12 rounded-r-xl" style={{ background: p.accent }} />
                </div>
                <div className="text-xs font-bold text-center">{p.name}</div>
              </button>
            );
          })}
        </div>
        <div className="grid grid-cols-2 gap-3 mt-4">
          <Field label="Primary">
            <div className="flex items-center gap-2">
              <input type="color" value={state.primaryColor} onChange={(e) => set("primaryColor", e.target.value)} className="w-12 h-10 rounded-lg cursor-pointer bg-transparent border border-border" />
              <input value={state.primaryColor} onChange={(e) => set("primaryColor", e.target.value)} className="flex-1 px-3 py-2 rounded-lg bg-foreground/5 border border-border text-sm font-mono" />
            </div>
          </Field>
          <Field label="Accent">
            <div className="flex items-center gap-2">
              <input type="color" value={state.accentColor} onChange={(e) => set("accentColor", e.target.value)} className="w-12 h-10 rounded-lg cursor-pointer bg-transparent border border-border" />
              <input value={state.accentColor} onChange={(e) => set("accentColor", e.target.value)} className="flex-1 px-3 py-2 rounded-lg bg-foreground/5 border border-border text-sm font-mono" />
            </div>
          </Field>
        </div>
      </Section>

      <Section title="Vibe" icon={Sparkles}>
        <div className="grid grid-cols-2 gap-3">
          {vibes.map((v) => {
            const active = state.vibe === v.id;
            return (
              <button
                key={v.id}
                onClick={() => set("vibe", v.id)}
                className={`text-right rounded-2xl p-4 border-2 transition ${active ? "border-primary bg-primary/5" : "border-border hover:bg-foreground/5"}`}
              >
                <div className="font-bold">{v.name}</div>
                <div className="text-xs text-muted-foreground mt-1">{v.desc}</div>
              </button>
            );
          })}
        </div>
      </Section>

      <Section title="Layout" icon={Wand2}>
        <div className="grid grid-cols-3 gap-3">
          {layouts.map((l) => {
            const active = state.layout === l.id;
            return (
              <button
                key={l.id}
                onClick={() => set("layout", l.id)}
                className={`rounded-2xl p-3 border-2 text-center transition ${active ? "border-primary bg-primary/5" : "border-border hover:bg-foreground/5"}`}
              >
                <div className="font-bold text-sm">{l.name}</div>
                <div className="text-[10px] text-muted-foreground mt-0.5">{l.desc}</div>
              </button>
            );
          })}
        </div>
      </Section>
    </div>
  );
}

function StepPages() {
  const { state, set } = useBuilder();
  const toggle = (id: string) => {
    const has = state.pages.includes(id);
    set("pages", has ? state.pages.filter((p) => p !== id) : [...state.pages, id]);
  };
  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-extrabold mb-2">Pages & sections</h2>
      <p className="text-muted-foreground mb-6">اختر الصفحات والأقسام لي بغيت يكونو فموقعك.</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {PAGES.map((p) => {
          const active = state.pages.includes(p.id);
          const disabled = p.essential;
          return (
            <button
              key={p.id}
              onClick={() => !disabled && toggle(p.id)}
              disabled={disabled}
              className={`rounded-2xl p-4 border-2 text-right transition ${
                active ? "border-primary bg-primary/5" : "border-border hover:bg-foreground/5"
              } ${disabled ? "opacity-90 cursor-default" : ""}`}
            >
              <div className="flex items-center justify-between">
                <div className="font-bold text-sm">{p.name}</div>
                {active && <Check size={16} className="text-primary" />}
              </div>
              {disabled && <div className="text-[10px] text-muted-foreground mt-1">Required</div>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function StepItems() {
  const { state, addItem, removeItem, updateItem, loadSampleItems } = useBuilder();
  const [draft, setDraft] = useState<Omit<SampleItem, "id">>({ name: "", desc: "", price: undefined, image: "" });
  const showPrice = state.category !== "portfolio";

  return (
    <div>
      <div className="flex items-center justify-between gap-2 mb-2">
        <h2 className="text-2xl sm:text-3xl font-extrabold">Your items ({state.items.length})</h2>
        <button
          onClick={() => state.category && loadSampleItems(state.category)}
          className="inline-flex items-center gap-1.5 text-xs font-bold bg-foreground/5 hover:bg-foreground/10 px-3 py-2 rounded-full"
        >
          <RefreshCw size={13} /> Reset samples
        </button>
      </div>
      <p className="text-muted-foreground mb-5">منتجات/خدمات/غرف — تقدر تزيد ولا تحذف.</p>

      {/* Add new */}
      <div className="rounded-2xl bg-foreground/5 border border-border p-4 mb-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} placeholder="Name" className="px-3 py-2.5 rounded-lg bg-background border border-border text-sm focus:border-primary focus:outline-none" />
          <input value={draft.desc} onChange={(e) => setDraft({ ...draft, desc: e.target.value })} placeholder="Description" className="px-3 py-2.5 rounded-lg bg-background border border-border text-sm focus:border-primary focus:outline-none" />
          <input value={draft.image} onChange={(e) => setDraft({ ...draft, image: e.target.value })} placeholder="Image URL" className="px-3 py-2.5 rounded-lg bg-background border border-border text-sm focus:border-primary focus:outline-none sm:col-span-2" />
          {showPrice && (
            <input
              type="number" inputMode="decimal"
              value={draft.price ?? ""} onChange={(e) => setDraft({ ...draft, price: e.target.value ? Number(e.target.value) : undefined })}
              placeholder={`Price (${state.currency})`}
              className="px-3 py-2.5 rounded-lg bg-background border border-border text-sm focus:border-primary focus:outline-none"
            />
          )}
        </div>
        <button
          onClick={() => {
            if (!draft.name.trim()) return;
            addItem({ ...draft, image: draft.image || "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600" });
            setDraft({ name: "", desc: "", price: undefined, image: "" });
          }}
          className="mt-3 w-full grad-purple text-white py-2.5 rounded-xl font-bold text-sm inline-flex items-center justify-center gap-2 shadow-pop"
        >
          <Plus size={16} /> Add item
        </button>
      </div>

      {/* Items list */}
      <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
        {state.items.map((it) => (
          <div key={it.id} className="flex items-center gap-3 bg-card border border-border rounded-xl p-2.5">
            <img src={it.image} alt={it.name} className="w-14 h-14 rounded-lg object-cover bg-foreground/5 shrink-0" />
            <div className="flex-1 min-w-0">
              <input value={it.name} onChange={(e) => updateItem(it.id, { name: e.target.value })} className="w-full bg-transparent font-bold text-sm focus:outline-none" />
              <input value={it.desc} onChange={(e) => updateItem(it.id, { desc: e.target.value })} className="w-full bg-transparent text-xs text-muted-foreground focus:outline-none" />
            </div>
            {showPrice && (
              <input
                type="number" value={it.price ?? ""} onChange={(e) => updateItem(it.id, { price: e.target.value ? Number(e.target.value) : undefined })}
                className="w-20 px-2 py-1 rounded-lg bg-foreground/5 border border-border text-sm font-bold text-center focus:border-primary focus:outline-none"
              />
            )}
            <button onClick={() => removeItem(it.id)} className="p-2 text-muted-foreground hover:text-destructive transition" aria-label="Delete">
              <Trash2 size={16} />
            </button>
          </div>
        ))}
        {state.items.length === 0 && (
          <p className="text-center text-muted-foreground py-8 text-sm">ما عندك حتى عنصر بعدا. زيد واحد فوق.</p>
        )}
      </div>
    </div>
  );
}

function StepDelivery() {
  const { state, set } = useBuilder();
  const opts: { id: Delivery; name: string; desc: string; icon: typeof MessageCircle }[] = [
    { id: "whatsapp", name: "WhatsApp", desc: "كل طلب يفتح محادثة WhatsApp جاهزة.", icon: MessageCircle },
    { id: "sheets", name: "Google Sheets", desc: "كل طلب يتسجل تلقائياً فـ Sheet ديالك.", icon: Sheet },
    { id: "both", name: "Both", desc: "WhatsApp + Sheets معاً.", icon: Sparkles },
  ];
  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-extrabold mb-2">Order delivery</h2>
      <p className="text-muted-foreground mb-6">فين تيمشيو الطلبات ديال زبنائك؟</p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        {opts.map((o) => {
          const active = state.delivery === o.id;
          const Icon = o.icon;
          return (
            <button
              key={o.id}
              onClick={() => set("delivery", o.id)}
              className={`text-right rounded-2xl p-4 border-2 transition ${active ? "border-primary bg-primary/5 shadow-pop" : "border-border hover:bg-foreground/5"}`}
            >
              <Icon size={22} className="text-primary mb-2" />
              <div className="font-bold">{o.name}</div>
              <div className="text-xs text-muted-foreground mt-1">{o.desc}</div>
            </button>
          );
        })}
      </div>

      {(state.delivery === "whatsapp" || state.delivery === "both") && (
        <Field label="WhatsApp number (with country code)">
          <input
            value={state.whatsapp}
            onChange={(e) => set("whatsapp", e.target.value.replace(/[^\d+]/g, ""))}
            placeholder="+212706036413"
            className="w-full px-4 py-3 rounded-xl bg-foreground/5 border border-border focus:border-primary focus:outline-none font-mono"
          />
        </Field>
      )}
      {(state.delivery === "sheets" || state.delivery === "both") && (
        <Field label="Google Apps Script Web URL">
          <input
            value={state.sheetUrl}
            onChange={(e) => set("sheetUrl", e.target.value)}
            placeholder="https://script.google.com/macros/s/AKfyc.../exec"
            className="w-full px-4 py-3 rounded-xl bg-foreground/5 border border-border focus:border-primary focus:outline-none text-sm"
          />
          <p className="text-xs text-muted-foreground mt-2">انشر Google Apps Script ك‑Web App و حط الرابط هنا.</p>
        </Field>
      )}
    </div>
  );
}

/* ───── helpers ───── */

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">{label}</span>
      {children}
    </label>
  );
}

function Section({ title, icon: Icon, children }: { title: string; icon: typeof Palette; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <Icon size={18} className="text-primary" />
        <h3 className="font-bold">{title}</h3>
      </div>
      {children}
    </div>
  );
}
