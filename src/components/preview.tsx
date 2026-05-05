import { createFileRoute, Link } from "@tanstack/react-router";
import { useBuilder } from "@/contexts/BuilderContext";
import { CATEGORIES, TEMPLATES } from "@/lib/catalog";
import type { BuilderState, SampleItem } from "@/lib/types";
import { ArrowLeft, MessageCircle, Phone, ShoppingBag, Star, Calendar, Mail, MapPin, Menu, Check, Wand2, Smartphone, Tablet, Monitor } from "lucide-react";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/preview")({
  head: () => ({
    meta: [
      { title: "Preview — Mindset Digital" },
      { name: "description", content: "معاينة حية للموقع لي بنيتي." },
    ],
  }),
  component: PreviewPage,
});

type Device = "mobile" | "tablet" | "desktop";

function PreviewPage() {
  const { state } = useBuilder();
  const [device, setDevice] = useState<Device>("desktop");

  if (!state.category) {
    return (
      <div className="max-w-md mx-auto px-5 py-20 text-center">
        <Wand2 size={40} className="mx-auto text-primary mb-4" />
        <h1 className="text-2xl font-extrabold mb-2">No store yet</h1>
        <p className="text-muted-foreground mb-6">ابدا ببناء موقعك أولاً.</p>
        <Link to="/builder" className="inline-flex items-center gap-2 grad-purple text-white px-5 py-3 rounded-full font-bold shadow-pop">Open builder</Link>
      </div>
    );
  }

  const widthMap: Record<Device, string> = {
    mobile: "max-w-[390px]",
    tablet: "max-w-[820px]",
    desktop: "max-w-full",
  };

  return (
    <div className="min-h-screen bg-foreground/5">
      {/* Top bar */}
      <div className="sticky top-0 z-40 bg-background/85 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between gap-3">
          <Link to="/builder" className="inline-flex items-center gap-1.5 text-sm font-bold text-muted-foreground hover:text-foreground">
            <ArrowLeft size={16} /> Edit
          </Link>
          <div className="flex items-center gap-1 bg-foreground/5 rounded-full p-1">
            {([
              ["mobile", Smartphone],
              ["tablet", Tablet],
              ["desktop", Monitor],
            ] as const).map(([id, Icon]) => (
              <button
                key={id}
                onClick={() => setDevice(id)}
                aria-label={id}
                className={`p-2 rounded-full transition ${device === id ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}
              >
                <Icon size={16} />
              </button>
            ))}
          </div>
          <div className="text-xs font-bold text-muted-foreground hidden sm:block">Live preview</div>
        </div>
      </div>

      {/* Frame */}
      <div className="px-4 py-6">
        <div className={`mx-auto ${widthMap[device]} transition-all duration-300`}>
          <div className="rounded-2xl overflow-hidden bg-card shadow-pop border border-border">
            <StoreRender state={state} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───── The generated store ───── */

function StoreRender({ state }: { state: BuilderState }) {
  const cat = CATEGORIES.find((c) => c.id === state.category)!;
  const tpl = TEMPLATES.find((t) => t.id === state.templateId);
  const dir = state.rtl ? "rtl" : "ltr";

  const cssVars: React.CSSProperties = {
    // @ts-ignore
    "--store-primary": state.primaryColor,
    // @ts-ignore
    "--store-accent": state.accentColor,
  };

  const hasPage = (id: string) => state.pages.includes(id);

  const t = i18n[state.language];

  const sendOrder = (item?: SampleItem) => {
    const lines = [
      `🛒 ${t.newOrder} — ${state.storeName || cat.name}`,
      item ? `• ${item.name}${item.price ? ` — ${item.price} ${state.currency}` : ""}` : t.fullCatalog,
      "",
      `${t.name}: `,
      `${t.phone}: `,
      `${t.address}: `,
    ].join("\n");

    if (state.delivery === "whatsapp" || state.delivery === "both") {
      const num = state.whatsapp.replace(/\D/g, "");
      if (num) window.open(`https://wa.me/${num}?text=${encodeURIComponent(lines)}`, "_blank");
    }
    if ((state.delivery === "sheets" || state.delivery === "both") && state.sheetUrl) {
      try {
        fetch(state.sheetUrl, { method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify({ store: state.storeName, item: item?.name, price: item?.price, ts: Date.now() }) });
      } catch {}
    }
  };

  return (
    <div dir={dir} style={cssVars} className="bg-white text-slate-900 min-h-[600px] font-[var(--font-body)]">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b border-slate-200">
        <div className="px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {state.logo ? (
              <img src={state.logo} alt="" className="w-9 h-9 rounded-lg object-cover" />
            ) : (
              <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-extrabold text-lg" style={{ background: state.primaryColor }}>
                {(state.storeName || cat.name).charAt(0).toUpperCase()}
              </div>
            )}
            <div className="font-extrabold text-lg leading-tight">
              {state.storeName || cat.name}
            </div>
          </div>
          <nav className="hidden sm:flex items-center gap-1 text-sm font-semibold text-slate-600">
            {state.pages.map((p) => (
              <a key={p} href={`#${p}`} className="px-3 py-1.5 hover:text-slate-900">{labelFor(p, t)}</a>
            ))}
          </nav>
          <button className="sm:hidden p-2"><Menu size={20} /></button>
        </div>
      </header>

      {/* Hero */}
      <section id="home" className="relative overflow-hidden px-4 sm:px-10 py-12 sm:py-20 text-white" style={{ background: `linear-gradient(135deg, ${state.primaryColor}, ${state.accentColor})` }}>
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, white 0%, transparent 40%), radial-gradient(circle at 80% 80%, white 0%, transparent 40%)" }} />
        <div className="relative max-w-3xl">
          <div className="inline-block bg-white/20 backdrop-blur rounded-full px-3 py-1 text-xs font-bold mb-4">{cat.emoji} {cat.name}</div>
          <h1 className="font-extrabold text-3xl sm:text-5xl leading-tight mb-3">{state.storeName || cat.name}</h1>
          <p className="text-base sm:text-lg opacity-90 mb-6 max-w-xl">{state.tagline || tpl?.tagline || cat.blurb}</p>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => sendOrder()} className="inline-flex items-center gap-2 bg-white text-slate-900 px-5 py-3 rounded-full font-bold text-sm shadow-lg hover:scale-105 transition">
              {primaryCTA(state.category, t)}
            </button>
            {hasPage("contact") && (
              <a href="#contact" className="inline-flex items-center gap-2 bg-white/20 backdrop-blur text-white border border-white/40 px-5 py-3 rounded-full font-bold text-sm">
                {t.contact}
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Catalog */}
      <section id="catalog" className="px-4 sm:px-10 py-12">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="font-extrabold text-2xl sm:text-3xl">{labelFor("catalog", t)}</h2>
            <p className="text-slate-500 text-sm">{state.items.length} {t.items}</p>
          </div>
        </div>

        {state.layout === "list" ? (
          <div className="space-y-3">
            {state.items.map((it) => (
              <ItemRow key={it.id} item={it} state={state} t={t} onOrder={() => sendOrder(it)} />
            ))}
          </div>
        ) : state.layout === "magazine" ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {state.items[0] && <ItemBig item={state.items[0]} state={state} t={t} onOrder={() => sendOrder(state.items[0])} />}
            <div className="md:col-span-2 grid grid-cols-2 gap-3">
              {state.items.slice(1).map((it) => (
                <ItemCard key={it.id} item={it} state={state} t={t} onOrder={() => sendOrder(it)} />
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {state.items.map((it) => (
              <ItemCard key={it.id} item={it} state={state} t={t} onOrder={() => sendOrder(it)} />
            ))}
          </div>
        )}
      </section>

      {/* About */}
      {hasPage("about") && (
        <section id="about" className="px-4 sm:px-10 py-12 bg-slate-50">
          <div className="max-w-3xl">
            <h2 className="font-extrabold text-2xl sm:text-3xl mb-3">{t.about}</h2>
            <p className="text-slate-600 leading-relaxed">{state.tagline || `${state.storeName} — ${cat.blurb}`} نقدمو لكم تجربة استثنائية مع جودة عالية وخدمة احترافية.</p>
          </div>
        </section>
      )}

      {/* Reviews */}
      {hasPage("reviews") && (
        <section id="reviews" className="px-4 sm:px-10 py-12">
          <h2 className="font-extrabold text-2xl sm:text-3xl mb-6">{t.reviews}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { n: "Sara M.", r: "تجربة رائعة، خدمة سريعة وجودة ممتازة!" },
              { n: "Yassine B.", r: "ننصح بقوة، أسعار معقولة وتعامل احترافي." },
              { n: "Khadija L.", r: "Top! غادي نعاود نشري بلا شك." },
            ].map((r) => (
              <div key={r.n} className="rounded-2xl p-5 bg-slate-50 border border-slate-200">
                <div className="flex gap-0.5 mb-2 text-amber-400">{Array.from({length:5}).map((_,i)=><Star key={i} size={14} fill="currentColor"/>)}</div>
                <p className="text-sm text-slate-600 mb-3">"{r.r}"</p>
                <div className="text-xs font-bold">{r.n}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* FAQ */}
      {hasPage("faq") && (
        <section id="faq" className="px-4 sm:px-10 py-12 bg-slate-50">
          <h2 className="font-extrabold text-2xl sm:text-3xl mb-6">FAQ</h2>
          <div className="space-y-2 max-w-2xl">
            {[
              ["كيفاش نطلب؟", "اضغط على المنتج وغادي يفتح ليك Whatsapp مباشرة."],
              ["كاين Delivery؟", "أيوه، نوصلو لجميع المدن."],
              ["شكون كيخلص؟", "Cash on delivery أو تحويل بنكي."],
            ].map(([q,a]) => (
              <details key={q} className="bg-white border border-slate-200 rounded-xl p-4 group">
                <summary className="font-bold cursor-pointer flex items-center justify-between">{q}<span className="text-slate-400 group-open:rotate-45 transition-transform">+</span></summary>
                <p className="text-sm text-slate-600 mt-2">{a}</p>
              </details>
            ))}
          </div>
        </section>
      )}

      {/* Contact */}
      {hasPage("contact") && (
        <section id="contact" className="px-4 sm:px-10 py-12">
          <h2 className="font-extrabold text-2xl sm:text-3xl mb-6">{t.contact}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {state.whatsapp && (
              <a href={`https://wa.me/${state.whatsapp.replace(/\D/g,"")}`} target="_blank" rel="noreferrer" className="rounded-2xl p-5 bg-slate-50 border border-slate-200 hover:shadow-lg transition flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-green-500 text-white flex items-center justify-center"><MessageCircle size={20} /></div>
                <div><div className="font-bold text-sm">WhatsApp</div><div className="text-xs text-slate-500" dir="ltr">{state.whatsapp}</div></div>
              </a>
            )}
            <div className="rounded-2xl p-5 bg-slate-50 border border-slate-200 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white" style={{background: state.primaryColor}}><Mail size={20} /></div>
              <div><div className="font-bold text-sm">Email</div><div className="text-xs text-slate-500">contact@{(state.storeName || "store").toLowerCase().replace(/\s+/g,"")}.com</div></div>
            </div>
            <div className="rounded-2xl p-5 bg-slate-50 border border-slate-200 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white" style={{background: state.accentColor}}><MapPin size={20} /></div>
              <div><div className="font-bold text-sm">Location</div><div className="text-xs text-slate-500">Morocco</div></div>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="px-4 sm:px-10 py-8 text-center text-xs text-slate-500 bg-slate-50 border-t border-slate-200">
        © {new Date().getFullYear()} {state.storeName || cat.name} · Powered by <span className="font-bold" style={{ color: state.primaryColor }}>Mindset Digital</span>
      </footer>

      {/* WA fab */}
      {(state.delivery === "whatsapp" || state.delivery === "both") && state.whatsapp && (
        <a
          href={`https://wa.me/${state.whatsapp.replace(/\D/g, "")}`}
          target="_blank"
          rel="noreferrer"
          className="fixed bottom-5 right-5 z-30 w-14 h-14 rounded-full bg-green-500 text-white shadow-2xl flex items-center justify-center hover:scale-110 transition"
        >
          <MessageCircle size={24} fill="currentColor" />
        </a>
      )}
    </div>
  );
}

function primaryCTA(cat: BuilderState["category"], t: any) {
  switch (cat) {
    case "restaurant": return <><Calendar size={16} /> {t.bookTable}</>;
    case "booking": return <><Calendar size={16} /> {t.bookNow}</>;
    case "portfolio": return <><Mail size={16} /> {t.contactMe}</>;
    default: return <><ShoppingBag size={16} /> {t.orderNow}</>;
  }
}

function labelFor(id: string, t: any) {
  return t.pages[id] ?? id;
}

function ItemCard({ item, state, t, onOrder }: { item: SampleItem; state: BuilderState; t: any; onOrder: () => void }) {
  return (
    <div className="rounded-2xl overflow-hidden bg-white border border-slate-200 hover:shadow-lg transition group">
      <div className="aspect-square overflow-hidden bg-slate-100">
        <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition" loading="lazy" />
      </div>
      <div className="p-3">
        <div className="font-bold text-sm leading-tight truncate">{item.name}</div>
        <div className="text-[11px] text-slate-500 truncate">{item.desc}</div>
        <div className="flex items-center justify-between mt-2.5">
          {item.price !== undefined ? (
            <div className="font-extrabold text-sm" style={{color: state.primaryColor}}>{item.price} {state.currency}</div>
          ) : <div />}
          <button onClick={onOrder} className="text-xs font-bold text-white px-3 py-1.5 rounded-full" style={{ background: state.primaryColor }}>{t.order}</button>
        </div>
      </div>
    </div>
  );
}

function ItemRow({ item, state, t, onOrder }: { item: SampleItem; state: BuilderState; t: any; onOrder: () => void }) {
  return (
    <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-2xl p-3">
      <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover bg-slate-100 shrink-0" />
      <div className="flex-1 min-w-0">
        <div className="font-bold text-sm">{item.name}</div>
        <div className="text-xs text-slate-500 truncate">{item.desc}</div>
      </div>
      {item.price !== undefined && <div className="font-extrabold text-sm" style={{color: state.primaryColor}}>{item.price} {state.currency}</div>}
      <button onClick={onOrder} className="text-xs font-bold text-white px-3 py-1.5 rounded-full" style={{ background: state.primaryColor }}>{t.order}</button>
    </div>
  );
}

function ItemBig({ item, state, t, onOrder }: { item: SampleItem; state: BuilderState; t: any; onOrder: () => void }) {
  return (
    <div className="row-span-2 rounded-2xl overflow-hidden bg-white border border-slate-200 hover:shadow-lg transition group">
      <div className="aspect-[4/5] overflow-hidden bg-slate-100">
        <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition" />
      </div>
      <div className="p-4">
        <div className="text-[10px] uppercase font-bold tracking-wider mb-1" style={{color: state.primaryColor}}>{t.featured}</div>
        <div className="font-extrabold text-lg leading-tight">{item.name}</div>
        <div className="text-sm text-slate-500">{item.desc}</div>
        <div className="flex items-center justify-between mt-3">
          {item.price !== undefined ? <div className="font-extrabold" style={{color: state.primaryColor}}>{item.price} {state.currency}</div> : <div />}
          <button onClick={onOrder} className="text-xs font-bold text-white px-4 py-2 rounded-full" style={{ background: state.primaryColor }}>{t.order}</button>
        </div>
      </div>
    </div>
  );
}

const i18n = {
  ar: {
    pages: { home: "الرئيسية", catalog: "المنتجات", about: "من نحن", contact: "اتصل بنا", reviews: "آراء العملاء", faq: "أسئلة", gallery: "معرض", blog: "مدونة" },
    about: "من نحن", reviews: "آراء العملاء", contact: "اتصل بنا",
    items: "عنصر", order: "اطلب", orderNow: "اطلب الآن", bookNow: "احجز الآن", bookTable: "احجز طاولة", contactMe: "تواصل معي",
    newOrder: "طلب جديد", fullCatalog: "كل المنتجات", name: "الاسم", phone: "الهاتف", address: "العنوان", featured: "مميز",
  },
  fr: {
    pages: { home: "Accueil", catalog: "Catalogue", about: "À propos", contact: "Contact", reviews: "Avis", faq: "FAQ", gallery: "Galerie", blog: "Blog" },
    about: "À propos", reviews: "Avis clients", contact: "Contact",
    items: "articles", order: "Commander", orderNow: "Commander", bookNow: "Réserver", bookTable: "Réserver", contactMe: "Me contacter",
    newOrder: "Nouvelle commande", fullCatalog: "Tout le catalogue", name: "Nom", phone: "Téléphone", address: "Adresse", featured: "À la une",
  },
  en: {
    pages: { home: "Home", catalog: "Catalog", about: "About", contact: "Contact", reviews: "Reviews", faq: "FAQ", gallery: "Gallery", blog: "Blog" },
    about: "About us", reviews: "Customer reviews", contact: "Contact",
    items: "items", order: "Order", orderNow: "Order now", bookNow: "Book now", bookTable: "Book a table", contactMe: "Contact me",
    newOrder: "New order", fullCatalog: "Full catalog", name: "Name", phone: "Phone", address: "Address", featured: "Featured",
  },
};
