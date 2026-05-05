export type StoreCategory = "ecommerce" | "restaurant" | "booking" | "portfolio";

export interface CategoryDef {
  id: StoreCategory;
  name: string;
  emoji: string;
  blurb: string;
  gradient: string;
  examples: string[];
}

export interface Template {
  id: string;
  category: StoreCategory;
  name: string;
  tagline: string;
  emoji: string;
  palette: [string, string]; // tailwind classes for preview gradient
  features: string[];
}

export type Vibe = "clean" | "bold" | "elegant" | "fun";
export type Layout = "grid" | "list" | "magazine";
export type Delivery = "whatsapp" | "sheets" | "both";

export interface SampleItem {
  id: string;
  name: string;
  desc: string;
  price?: number;
  image: string;
}

export interface BuilderState {
  step: number;
  category: StoreCategory | null;
  templateId: string | null;
  storeName: string;
  tagline: string;
  logo: string; // url
  primaryColor: string; // hex
  accentColor: string;
  vibe: Vibe;
  layout: Layout;
  pages: string[]; // ['home','catalog','about','contact','faq','reviews']
  delivery: Delivery;
  whatsapp: string;
  sheetUrl: string;
  currency: string;
  language: "ar" | "fr" | "en";
  rtl: boolean;
  items: SampleItem[];
}
