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

- GitHub Actions uploads the full `dist` bundle via password-based SFTP on port 22 after successful branch builds; verified host keys are mandatory, pull requests never deploy, and remote files are not deleted. SFTP transfers artifacts only and does not provision the server runtime required by this app.
- Enquiry emails are sent by the public CORS-enabled server route `src/routes/api/public/enquiry.ts` running on the Lovable-hosted app. Static SFTP builds cannot run server code, so the workflow injects `VITE_ENQUIRY_API_URL` (default `https://wmlegalservices.lovable.app`) at build time and the form posts to that URL; keep the Lovable project published or the form breaks.
