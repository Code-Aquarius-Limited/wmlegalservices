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
