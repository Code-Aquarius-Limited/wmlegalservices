// Static-site build for the SFTP host, used only by `bun run build:static`
// (see .github/workflows/deploy.yml). Lovable's own build and preview keep using vite.config.ts.
//
// Every page is prerendered to plain HTML in dist/client (no server runtime on the host):
//   /          -> index.html
//   /services  -> services.html   (served at /services by the generated .htaccess)
//   unknown    -> 404.html        (app shell; the router renders the not-found page)
// Two things stay on the published Lovable app, because a static host cannot run them:
//   - the enquiry form backend (/api/public/enquiry, sends the email through Resend)
//   - media uploaded in Lovable (src/assets/*.asset.json, served from /__l5e/...)
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import type { Plugin } from "vite";

const LOVABLE_APP_URL = (
  process.env.VITE_ENQUIRY_API_URL || "https://wmlegalservices.lovable.app"
).replace(/\/$/, "");

// Read by EnquiryForm.tsx; set before defineConfig loads VITE_* env so the form always posts to Lovable.
process.env.VITE_ENQUIRY_API_URL = LOVABLE_APP_URL;

// "/__l5e/assets-v1/..." only resolves on Lovable's hosting, so point it at the Lovable app.
function lovableMediaUrls(): Plugin {
  return {
    name: "static:lovable-media-urls",
    enforce: "pre",
    transform(code, id) {
      if (!id.split("?")[0].endsWith(".asset.json")) return;
      const asset = JSON.parse(code);
      if (typeof asset.url === "string" && asset.url.startsWith("/__l5e/")) {
        asset.url = LOVABLE_APP_URL + asset.url;
      }
      return { code: JSON.stringify(asset), map: null };
    },
  };
}

export default defineConfig({
  nitro: false,
  vite: { plugins: [lovableMediaUrls()] },
  tanstackStart: {
    server: { entry: "server" },
    pages: [{ path: "/sitemap.xml", prerender: { outputPath: "/sitemap.xml" } }],
    // The app shell, served by .htaccess for unknown URLs (status 404); the router then shows
    // the root notFoundComponent. A /404 page can't be prerendered because it returns 404.
    spa: { enabled: true, prerender: { outputPath: "/404" } },
    prerender: {
      enabled: true,
      // New pages added in Lovable are picked up from the route tree and from links.
      autoStaticPathsDiscovery: true,
      crawlLinks: true,
      autoSubfolderIndex: false,
      failOnError: true,
      filter: ({ path }) => !path.startsWith("/api/"),
    },
  },
});
