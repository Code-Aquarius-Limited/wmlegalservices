<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Every push to `main` runs `.github/workflows/deploy.yml`: `bun run build:static` (`vite.static.config.ts` + `scripts/static/postbuild.mjs`) prerenders each page to `dist/client`, which is uploaded to the IONOS webspace over SFTP (lftp, port 22). Pull requests build but never upload. Only stale files in `assets/` are deleted on the server. Keep `vite.config.ts` for Lovable's own build.
- The SFTP host serves static files only. Don't use `createServerFn` (the static build fails on it); server code belongs in `src/routes/api/public/*`, which runs on the published Lovable app.
- Enquiry emails are sent by `src/routes/api/public/enquiry.ts` on the Lovable app. The static build points the form at `VITE_ENQUIRY_API_URL` (default `https://wmlegalservices.lovable.app`) and loads media from `src/assets/*.asset.json` there too, so keep the Lovable project published, and publish again after changing that route.
