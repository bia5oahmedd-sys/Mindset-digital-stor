import { Link, useLocation } from "@tanstack/react-router";
import { Sparkles, LayoutGrid, Wand2, Eye, Github } from "lucide-react";
import type { ReactNode } from "react";

const LOGO = "https://i.ibb.co/5WmCqV2Y/IMG-5083.png";

const NAV = [
  { to: "/", label: "Home", icon: Sparkles },
  { to: "/templates", label: "Templates", icon: LayoutGrid },
  { to: "/builder", label: "Builder", icon: Wand2 },
  { to: "/preview", label: "Preview", icon: Eye },
] as const;

export function Shell({ children }: { children: ReactNode }) {
  const loc = useLocation();
  const isPreview = loc.pathname.startsWith("/preview");

  return (
    <div className="min-h-screen flex flex-col">
      {!isPreview && (
        <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/70 border-b border-border/60">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl overflow-hidden ring-2 ring-primary/30 grad-purple flex items-center justify-center shadow-pop">
                <img src={LOGO} alt="Mindset Digital" className="w-full h-full object-cover" />
              </div>
              <div className="leading-tight">
                <div className="font-display font-extrabold text-base tracking-tight">Mindset <span className="text-grad-rainbow">Digital</span></div>
                <div className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Build · Customize · Launch</div>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              {NAV.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  activeOptions={{ exact: n.to === "/" }}
                  className="px-3.5 py-2 rounded-full text-sm font-semibold text-muted-foreground hover:text-foreground hover:bg-muted transition-colors data-[status=active]:bg-foreground data-[status=active]:text-background"
                >
                  {n.label}
                </Link>
              ))}
            </nav>

            <Link
              to="/builder"
              className="hidden sm:inline-flex items-center gap-2 grad-purple text-white px-4 py-2 rounded-full text-sm font-bold shadow-pop hover:scale-105 transition-transform"
            >
              <Wand2 size={15} /> Start building
            </Link>
          </div>
        </header>
      )}

      <main className="flex-1">{children}</main>

      {!isPreview && (
        <>
          {/* Mobile bottom nav */}
          <nav className="md:hidden sticky bottom-0 z-40 backdrop-blur-xl bg-background/85 border-t border-border/60">
            <div className="grid grid-cols-4">
              {NAV.map((n) => {
                const Icon = n.icon;
                return (
                  <Link
                    key={n.to}
                    to={n.to}
                    activeOptions={{ exact: n.to === "/" }}
                    className="flex flex-col items-center gap-0.5 py-2.5 text-[10px] font-bold text-muted-foreground data-[status=active]:text-primary"
                  >
                    <Icon size={20} />
                    {n.label}
                  </Link>
                );
              })}
            </div>
          </nav>

          <footer className="border-t border-border/60 mt-10">
            <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <img src={LOGO} alt="" className="w-7 h-7 rounded-lg" />
                <span>© {new Date().getFullYear()} <span className="font-bold text-foreground">Mindset Digital</span> — Build your dream site.</span>
              </div>
              <div className="flex items-center gap-3">
                <a href="#" className="hover:text-foreground transition"><Github size={18} /></a>
                <span className="text-xs">Made with 💜 in Morocco</span>
              </div>
            </div>
          </footer>
        </>
      )}
    </div>
  );
}
