# getzeekey.com portfolio

A static personal art portfolio prepared for Cloudflare Pages.

## Deploy on Cloudflare Pages

1. Push these files to a GitHub repository.
2. In Cloudflare, open **Workers & Pages**.
3. Choose **Create application** → **Pages** → connect the GitHub repository.
4. Use these settings:
   - Framework preset: `None`
   - Build command: leave empty
   - Build output directory: `/`
5. Deploy.

## Connect getzeekey.com

1. In the Pages project, open **Custom domains**.
2. Add `getzeekey.com`.
3. If Cloudflare manages the DNS zone, approve the DNS record Cloudflare suggests.
4. Add `www.getzeekey.com` too if you want the `www` version.

## Customize

- Replace artwork files in `assets/`.
- Edit titles and captions in `index.html`.
- Change `hello@getzeekey.com` to your real email.
- Update the artist statement in the Studio section.
