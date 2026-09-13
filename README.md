# Precision Proteomics Center Davos Website

## About This Site

The official website of the **Precision Proteomics Center Davos**, built with **Next.js**, **React**, and **TypeScript**, and hosted on **Vercel**.

- **Production:** [https://precisionproteomics.uzh.ch](https://precisionproteomics.uzh.ch)
- **Vercel dashboard:** [vercel.com](https://vercel.com) (log in with your Vercel account)

Every push to the `main` branch automatically triggers a new deployment on Vercel. Changes go live within ~1 minute.

---

## Editing Content

All content is managed in a **Google Sheet** — no coding required.

[Open the Google Sheet →](https://docs.google.com/spreadsheets/d/e/2PACX-1vQWunO92NxSnFVWEb7e4dV4a8saxxdr8VKfR4rKmKb0s4JCxA6UOEdM0N1zx1tX6VodaGG9COZQ5ngq/pubhtml)

| Tab | What it controls |
|---|---|
| `team` | Team members and alumni — set `isAlumni` to `TRUE` to move someone to the alumni section |
| `publications` | Publications list — authors are semicolon-separated |
| `research` | Research area descriptions — text paragraphs separated by `\|\|\|` |
| `openPositions` | Open positions — set `isActive` to `TRUE` to show a position on the site |

Changes to the sheet appear on the site within **5 minutes** automatically. No redeploy needed.

> **Tip:** If you need changes to appear immediately, go to the Vercel dashboard → Deployments → `...` → **Redeploy**.

---

## Adding or Updating Member Photos

Photos are stored in `public/images/members/` in this repository. The filename must match the `image` field in the Google Sheet (e.g. `christoph.jpeg`).

To add a photo:
1. Go to the [members folder on GitHub](https://github.com/Proteomics-Center-SIAF-UZH/ppcdavos/tree/main/public/images/members)
2. Click **Add file** → **Upload files**
3. Upload the photo and commit — Vercel will redeploy automatically

Recommended: square crop, at least 200×200px, JPEG format.

---

## Running Locally (for developers)

```bash
npm install
npm run dev       # available at localhost:3000
```

```bash
npm run build     # production build
```

---

## How It Works

- **Hosting:** Vercel — connected to this GitHub repo, auto-deploys on every push to `main`
- **Content:** Fetched from Google Sheets at request time and cached for 5 minutes (ISR)
- **Domain:** `precisionproteomics.uzh.ch` — DNS managed by UZH IT (Claudio Rhyner)
- **TLS:** Automatic via Vercel + Let's Encrypt
