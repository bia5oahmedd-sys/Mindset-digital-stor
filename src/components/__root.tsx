import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { Shell } from "@/components/Shell";
import { BuilderProvider } from "@/contexts/BuilderContext";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-grad-rainbow">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">The page you are looking for has been moved or doesn't exist.</p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full grad-purple px-5 py-2.5 text-sm font-semibold text-white shadow-pop hover:opacity-90"
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" },
      { name: "theme-color", content: "#9333ea" },
      { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
      { title: "Mindset Digital — Build your store in minutes" },
      { name: "description", content: "Mindset Digital — منصة لإنشاء متجر، مطعم، فندق، أو portfolio احترافي بدون كود. اختر، خصّص، وأطلق." },
      { name: "author", content: "Mindset Digital" },
      { property: "og:title", content: "Mindset Digital — Build your store in minutes" },
      { property: "og:description", content: "أنشئ متجرك أو موقعك في دقائق — بدون كود، مع تسليم الطلبات على واتساب أو Google Sheets." },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://i.ibb.co/5WmCqV2Y/IMG-5083.png" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Tajawal:wght@400;500;700;800;900&display=swap",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "https://i.ibb.co/5WmCqV2Y/IMG-5083.png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <BuilderProvider>
      <Shell>
        <Outlet />
      </Shell>
    </BuilderProvider>
  );
}
