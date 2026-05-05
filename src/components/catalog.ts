import type { CategoryDef, Template } from "./types";

export const CATEGORIES: CategoryDef[] = [
  {
    id: "ecommerce",
    name: "E‑commerce",
    emoji: "🛍️",
    blurb: "بيع منتجاتك أونلاين — كتب، ملابس، إلكترونيات، مستحضرات...",
    gradient: "grad-pink",
    examples: ["متجر كتب", "متجر ملابس", "إلكترونيات", "Beauty shop"],
  },
  {
    id: "restaurant",
    name: "مطاعم & Food",
    emoji: "🍽️",
    blurb: "Menu رقمي تفاعلي للمطاعم، القهاوي، الحلويات والـ Fast food.",
    gradient: "grad-orange",
    examples: ["مطعم", "قهوة", "بيتزيريا", "حلويات"],
  },
  {
    id: "booking",
    name: "حجوزات & Booking",
    emoji: "🏨",
    blurb: "فنادق، رياضات، تأجير سيارات، مواعيد طبيب أو كوافور.",
    gradient: "grad-aqua",
    examples: ["فندق", "رياض", "كوافور", "Coach"],
  },
  {
    id: "portfolio",
    name: "خدمات & Portfolio",
    emoji: "💼",
    blurb: "Freelancer، شركات، عقارات، تكوين، Agency.",
    gradient: "grad-purple",
    examples: ["Freelancer", "Agency", "عقارات", "Coach"],
  },
];

export const TEMPLATES: Template[] = [
  // E-commerce
  { id: "books-classic", category: "ecommerce", name: "Bookshop Classic", tagline: "متجر كتب أنيق وعملي", emoji: "📚", palette: ["from-rose-400","to-pink-600"], features: ["Categories","Cart","Search","WhatsApp checkout"] },
  { id: "fashion-bold", category: "ecommerce", name: "Fashion Bold", tagline: "متجر ملابس عصري", emoji: "👗", palette: ["from-fuchsia-400","to-purple-600"], features: ["Lookbook","Sizes","Wishlist","Stories"] },
  { id: "tech-pro", category: "ecommerce", name: "Tech Pro", tagline: "إلكترونيات و Gadgets", emoji: "📱", palette: ["from-cyan-400","to-blue-600"], features: ["Specs","Compare","Reviews","Filters"] },
  { id: "beauty-glow", category: "ecommerce", name: "Beauty Glow", tagline: "Cosmetics & Skincare", emoji: "💄", palette: ["from-pink-300","to-rose-500"], features: ["Shades","Bundles","Routines","Quiz"] },

  // Restaurant
  { id: "resto-modern", category: "restaurant", name: "Restaurant Modern", tagline: "Menu رقمي بصور", emoji: "🍕", palette: ["from-orange-400","to-red-600"], features: ["Menu","QR code","Promo","Réservation"] },
  { id: "cafe-cozy", category: "restaurant", name: "Cozy Café", tagline: "قهاوي و Brunch", emoji: "☕", palette: ["from-amber-400","to-orange-600"], features: ["Menu","Hours","Loyalty","Stories"] },
  { id: "sweet-shop", category: "restaurant", name: "Sweet Shop", tagline: "حلويات و Pâtisserie", emoji: "🧁", palette: ["from-pink-400","to-fuchsia-600"], features: ["Catalog","Order","Custom cake","Delivery"] },

  // Booking
  { id: "hotel-lux", category: "booking", name: "Hotel Luxe", tagline: "فندق راقي مع حجز", emoji: "🏨", palette: ["from-teal-400","to-cyan-600"], features: ["Rooms","Calendar","Gallery","Multi-lang"] },
  { id: "riad-charm", category: "booking", name: "Riad Charm", tagline: "رياض مغربي تقليدي", emoji: "🕌", palette: ["from-emerald-400","to-teal-600"], features: ["Rooms","Tours","Booking","Map"] },
  { id: "salon-pro", category: "booking", name: "Salon Pro", tagline: "كوافور / Spa مواعيد", emoji: "💇", palette: ["from-violet-400","to-purple-600"], features: ["Services","Staff","Slots","Reviews"] },
  { id: "rent-car", category: "booking", name: "Rent A Car", tagline: "تأجير سيارات", emoji: "🚗", palette: ["from-sky-400","to-indigo-600"], features: ["Fleet","Dates","Pricing","Insurance"] },

  // Portfolio
  { id: "freelancer-pro", category: "portfolio", name: "Freelancer Pro", tagline: "Portfolio احترافي", emoji: "🎨", palette: ["from-purple-400","to-pink-600"], features: ["Projects","Skills","CV","Contact"] },
  { id: "agency-bold", category: "portfolio", name: "Agency Bold", tagline: "Agency / Studio", emoji: "🚀", palette: ["from-indigo-400","to-purple-600"], features: ["Services","Cases","Team","Quote"] },
  { id: "real-estate", category: "portfolio", name: "Real Estate", tagline: "عقارات للبيع/الكراء", emoji: "🏡", palette: ["from-lime-400","to-emerald-600"], features: ["Listings","Map","Filters","Inquiry"] },
  { id: "coach-academy", category: "portfolio", name: "Coach Academy", tagline: "تكوين / Coaching", emoji: "🎓", palette: ["from-yellow-400","to-orange-600"], features: ["Courses","Booking","Testimonials","Blog"] },
];

export function templatesFor(cat: string | null) {
  if (!cat) return TEMPLATES;
  return TEMPLATES.filter((t) => t.category === cat);
}

export const COLOR_PRESETS: { name: string; primary: string; accent: string }[] = [
  { name: "Sunset", primary: "#ec4899", accent: "#f97316" },
  { name: "Ocean", primary: "#0ea5e9", accent: "#22d3ee" },
  { name: "Royal", primary: "#7c3aed", accent: "#ec4899" },
  { name: "Forest", primary: "#10b981", accent: "#84cc16" },
  { name: "Midnight", primary: "#1e293b", accent: "#a78bfa" },
  { name: "Coral", primary: "#f43f5e", accent: "#fb923c" },
  { name: "Mint", primary: "#14b8a6", accent: "#a3e635" },
  { name: "Mocha", primary: "#92400e", accent: "#f59e0b" },
];

export const PAGES = [
  { id: "home", name: "Home / Hero", essential: true },
  { id: "catalog", name: "Catalog / Menu / Rooms", essential: true },
  { id: "about", name: "About us" },
  { id: "contact", name: "Contact" },
  { id: "reviews", name: "Reviews / Testimonials" },
  { id: "faq", name: "FAQ" },
  { id: "gallery", name: "Gallery" },
  { id: "blog", name: "Blog / News" },
];

export const SAMPLE_ITEMS: Record<string, { name: string; desc: string; price?: number; image: string }[]> = {
  ecommerce: [
    { name: "Premium Hoodie", desc: "قطن 100% — Limited", price: 299, image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600" },
    { name: "Sneakers Edition", desc: "Comfort all‑day", price: 599, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600" },
    { name: "Vintage Watch", desc: "Timeless elegance", price: 1299, image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=600" },
    { name: "Leather Bag", desc: "Handcrafted", price: 899, image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600" },
  ],
  restaurant: [
    { name: "Margherita Pizza", desc: "Tomato, mozza, basil", price: 75, image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600" },
    { name: "Beef Burger", desc: "Cheddar, bacon", price: 65, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600" },
    { name: "Caesar Salad", desc: "Crispy & fresh", price: 45, image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=600" },
    { name: "Chocolate Cake", desc: "Maison", price: 40, image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600" },
  ],
  booking: [
    { name: "Deluxe Suite", desc: "Sea view · King bed", price: 1200, image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=600" },
    { name: "Family Room", desc: "Up to 4 guests", price: 850, image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600" },
    { name: "Standard Room", desc: "Cozy & quiet", price: 500, image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600" },
    { name: "Rooftop Terrace", desc: "Private event", price: 2000, image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600" },
  ],
  portfolio: [
    { name: "Brand Identity", desc: "Logo + Guidelines", image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600" },
    { name: "Web Design", desc: "Landing + dashboard", image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=600" },
    { name: "Mobile App", desc: "iOS + Android", image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600" },
    { name: "Photo Shoot", desc: "Editorial series", image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=600" },
  ],
};
