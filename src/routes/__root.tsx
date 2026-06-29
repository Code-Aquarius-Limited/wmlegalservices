import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { Toaster } from "sonner";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Header } from "../components/site/Header";
import { Footer } from "../components/site/Footer";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-serif text-7xl text-primary">404</h1>
        <h2 className="mt-4 text-xl font-medium">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center justify-center rounded-sm bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-medium">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">Please try again or head back home.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="rounded-sm bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          >Try again</button>
          <a href="/" className="rounded-sm border border-input bg-background px-4 py-2 text-sm font-medium">
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "WM Legal Services — Specialist Property Law In London" },
      { name: "description", content: "Specialist property law team based in London. Conveyancing, auction conveyancing, panel management and partner services." },
      { property: "og:title", content: "WM Legal Services — Specialist Property Law In London" },
      { property: "og:description", content: "Specialist property law team based in London. Conveyancing, auction conveyancing, panel management and partner services." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "WM Legal Services — Specialist Property Law In London" },
      { name: "twitter:description", content: "Specialist property law team based in London. Conveyancing, auction conveyancing, panel management and partner services." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/hVwWIy58G2ZiNS1DGn6qNrbja4y2/social-images/social-1782143284675-WM_Legal_Services_Social_Image.webp" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/hVwWIy58G2ZiNS1DGn6qNrbja4y2/social-images/social-1782143284675-WM_Legal_Services_Social_Image.webp" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebSite",
              "@id": "https://wmlegalservices.co.uk/#website",
              url: "https://wmlegalservices.co.uk",
              name: "WM Legal Services",
              description: "Specialist property law team based in London. Conveyancing, auction conveyancing, panel management and partner services.",
            },
            {
              "@type": "Organization",
              "@id": "https://wmlegalservices.co.uk/#organization",
              name: "WM Legal Services",
              url: "https://wmlegalservices.co.uk",
              logo: "https://storage.googleapis.com/gpt-engineer-file-uploads/hVwWIy58G2ZiNS1DGn6qNrbja4y2/social-images/social-1782143284675-WM_Legal_Services_Social_Image.webp",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+44-20-3292-0669",
                contactType: "customer service",
                email: "enquiries@wmlegalservices.co.uk",
              },
            },
          ],
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      {/* Google tag (gtag.js) */}
      <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-60MJ2XEQN4"
      ></script>
      <script>
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', 'G-60MJ2XEQN4');`}
      </script>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
        <Toaster position="bottom-right" richColors />
      </div>
    </QueryClientProvider>
  );
}
