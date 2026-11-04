# getzeekey.com portfolio

A monochrome video portfolio prepared for Cloudflare Pages. The homepage is a
full-screen video with a cursor ripple interaction; clicking anywhere opens the
work detail page.

## Upload these files

- `index.html`
- `work.html`
- `sensing-the-unseen.html`
- `sensing-the-unseen.js`
- `the-infinity-of-tides.html`
- `the-infinity-of-tides.js`
- `man-machines-dialogue.html`
- `man-machines-dialogue.js`
- `the-butterfly-in-the-brain.html`
- `the-butterfly-in-the-brain.js`
- `styles.css`
- `script.js`
- `_headers`
- the complete `assets/` folder

Keep every item at the GitHub repository root. Do not upload `index.rtfd`.

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

- Replace `assets/home-water.mp4` with a new compressed MP4 using the same file
  name, or update its path in both `index.html` and `work.html`.
- Edit the six artwork names in `work.html`.
- Edit the Sensing the Unseen text and numbered photograph paths in
  `sensing-the-unseen.html`. Clicking its image advances through photos 01-06
  and loops back to 01.
- Edit The Infinity of Tides text and photograph paths in
  `the-infinity-of-tides.html`. Its image cycles through photos 07-13 and
  returns to 07 on the next click.
- Edit Man-Machine's Dialogue text and its photograph list in
  `man-machines-dialogue.html`. This project currently contains only photo 23,
  so clicking the image returns to the same photograph.
- Edit The Butterfly in the Brain text and photograph paths in
  `the-butterfly-in-the-brain.html`. Its image cycles through photos 14-18 and
  returns to 14 on the next click.
- Replace the artwork JPG files in `assets/` using the same filenames. The
  gallery reads left to right, then top to bottom; mobile uses one work per row.
- Change `hello@getzeekey.com` to your real email.

After changing local files, upload the changed files to GitHub. Cloudflare Pages
will deploy the new commit automatically.
