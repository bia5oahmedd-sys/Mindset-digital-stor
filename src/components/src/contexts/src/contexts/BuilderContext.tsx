import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { BuilderState, SampleItem, StoreCategory } from "@/lib/types";
import { SAMPLE_ITEMS } from "@/lib/catalog";

const STORAGE_KEY = "mindset_builder_v1";

const initial: BuilderState = {
  step: 0,
  category: null,
  templateId: null,
  storeName: "",
  tagline: "",
  logo: "",
  primaryColor: "#7c3aed",
  accentColor: "#ec4899",
  vibe: "fun",
  layout: "grid",
  pages: ["home", "catalog", "about", "contact"],
  delivery: "whatsapp",
  whatsapp: "",
  sheetUrl: "",
  currency: "MAD",
  language: "ar",
  rtl: true,
  items: [],
};

interface Ctx {
  state: BuilderState;
  set: <K extends keyof BuilderState>(key: K, val: BuilderState[K]) => void;
  patch: (p: Partial<BuilderState>) => void;
  reset: () => void;
  pickCategory: (c: StoreCategory) => void;
  loadSampleItems: (cat: StoreCategory) => void;
  addItem: (item: Omit<SampleItem, "id">) => void;
  removeItem: (id: string) => void;
  updateItem: (id: string, p: Partial<SampleItem>) => void;
}

const BuilderCtx = createContext<Ctx | null>(null);

export function BuilderProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<BuilderState>(initial);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
      if (raw) setState({ ...initial, ...JSON.parse(raw) });
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {}
    }
  }, [state, hydrated]);

  const set: Ctx["set"] = (key, val) => setState((s) => ({ ...s, [key]: val }));
  const patch: Ctx["patch"] = (p) => setState((s) => ({ ...s, ...p }));
  const reset = () => setState(initial);

  const pickCategory: Ctx["pickCategory"] = (c) => {
    setState((s) => ({
      ...s,
      category: c,
      items: SAMPLE_ITEMS[c].map((it, i) => ({ ...it, id: `${c}-${i}` })),
    }));
  };

  const loadSampleItems: Ctx["loadSampleItems"] = (cat) => {
    setState((s) => ({
      ...s,
      items: SAMPLE_ITEMS[cat].map((it, i) => ({ ...it, id: `${cat}-${i}-${Date.now()}` })),
    }));
  };

  const addItem: Ctx["addItem"] = (item) => {
    setState((s) => ({
      ...s,
      items: [...s.items, { ...item, id: `i-${Date.now()}-${Math.random().toString(36).slice(2,6)}` }],
    }));
  };
  const removeItem: Ctx["removeItem"] = (id) =>
    setState((s) => ({ ...s, items: s.items.filter((i) => i.id !== id) }));
  const updateItem: Ctx["updateItem"] = (id, p) =>
    setState((s) => ({ ...s, items: s.items.map((i) => (i.id === id ? { ...i, ...p } : i)) }));

  return (
    <BuilderCtx.Provider value={{ state, set, patch, reset, pickCategory, loadSampleItems, addItem, removeItem, updateItem }}>
      {children}
    </BuilderCtx.Provider>
  );
}

export function useBuilder() {
  const ctx = useContext(BuilderCtx);
  if (!ctx) throw new Error("useBuilder must be inside BuilderProvider");
  return ctx;
}
