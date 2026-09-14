# Precision Proteomics Center Davos Website

## About This Site

The official website of the **Precision Proteomics Center Davos**, built with **Next.js**, **React**, **TypeScript**, and **Convex**, hosted on **Vercel**.

- **Production:** [https://precisionproteomics.uzh.ch](https://precisionproteomics.uzh.ch)
- **Admin panel:** https://precisionproteomics.uzh.ch/admin
- **Vercel dashboard:** [vercel.com](https://vercel.com)
- **Convex dashboard:** [convex.dev](https://convex.dev)

Every push to `main` automatically triggers a new deployment on Vercel. Changes go live within ~1 minute.

---

## Managing Content (Admin Panel)

All content is managed through the **admin panel** at `/admin`. Log in with the admin password set in the Convex dashboard.

| Tab | What you can do |
|---|---|
| **Team** | Add/edit/remove members, set photo, bio, LinkedIn, ORCID, Google Scholar, mark as alumni or visiting |
| **Publications** | Add/edit/remove publications; abstracts can be added and expand on click |
| **Research** | Add/edit/remove research areas; drag to reorder |
| **Open Positions** | Add/edit/remove positions; toggle `isActive` to show or hide on the site |
| **Pages** | Edit text content for the Homepage, About Us, and Services pages |
| **Images** | Central image library — upload images with a title and optional source credit; pick from library in any image field |
| **Settings** | Edit footer external links and social media URLs (Twitter/X, GitHub, Bluesky, LinkedIn) |

### Author bolding in publications

In the Team admin, the **Other names** field matches publication author names for bolding. For example, if Christoph publishes as "Christoph B. Messner" but his display name is "Christoph Messner", add "Christoph B. Messner" to his Other names. This also determines which publications appear on his personal page.

### Member photos and images

Upload images via the **Images** tab first (title required), then pick from the library in any image field across Team, Research, and Pages. Photos are stored in Convex Storage — no files need to be added to the repo.

Reference photos for existing members are kept in `assets/member-photos/` for convenience.

### Member profile pages

Each team member has a personal page at `/team/their-name`. It shows their photo, title, contact info, LinkedIn/ORCID/Google Scholar links, bio, and a list of matched publications.

---

## Running Locally (for developers)

```bash
npm install
npx convex dev   # starts Convex dev backend (keep running in a separate terminal)
npm run dev      # starts Next.js at localhost:3000
```

---

## Deploying Convex Changes

When you add or modify files in `convex/` (schema, functions), run:

```bash
# 1. Regenerate TypeScript types and commit them
npx convex dev --once
git add convex/_generated/
git commit -m "Regenerate Convex types"
git push

# 2. Deploy functions to production
npx convex deploy
```

Next.js code changes (anything outside `convex/`) deploy automatically via Vercel on every `git push`.

---

## How It Works

- **Hosting:** Vercel — auto-deploys on every push to `main`
- **Backend & database:** Convex — stores all content and images; admin password in `ADMIN_PASSWORD` env var
- **Domain:** `precisionproteomics.uzh.ch` — DNS managed by UZH IT (Claudio Rhyner)
- **TLS:** Automatic via Vercel + Let's Encrypt
- **Fonts:** Lora (serif) throughout, Inter for form inputs
