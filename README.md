# Precision Proteomics Center Davos Website

## About This Site

The official website of the **Precision Proteomics Center Davos**, built with **Next.js**, **React**, **TypeScript**, and **Convex**, hosted on **Vercel**.

- **Production:** [https://precisionproteomics.uzh.ch](https://precisionproteomics.uzh.ch)
- **Admin panel:** https://precisionproteomics.uzh.ch/admin
- **Vercel dashboard:** [vercel.com](https://vercel.com)
- **Convex dashboard:** [convex.dev](https://convex.dev)

Every push to `main` automatically triggers a new deployment on Vercel. Changes go live within ~1 minute.

---

## Managing Content

All content is managed through the **admin panel** at `/admin`. Log in with the admin password set in the Convex dashboard.

| Section | What you can do |
|---|---|
| **Team** | Add/edit/remove members, upload photos, write bios, mark as alumni |
| **Publications** | Add/edit/remove publications, authors are auto-bolded if they match a team member name |
| **Research** | Add/edit/remove research areas and their descriptions |
| **Open Positions** | Add/edit/remove positions, toggle active/inactive to show or hide on the site |

### Bolding authors in publications

In the Team admin, the **Other names** field is used to match publication author names. For example, if Christoph publishes as "Christoph B. Messner" but his team name is "Christoph Messner", add "Christoph B. Messner" to his Other names. This also determines which publications appear on his personal page.

### Member photos

Upload photos through the admin panel: **Team → Edit → Photo → upload file → Save**. Photos are stored in Convex Storage — no files need to be added to the repo.

---

## Running Locally (for developers)

```bash
npm install
npx convex dev   # starts Convex dev backend (keep running in a separate terminal)
npm run dev      # starts Next.js at localhost:3000
```

---

## Deploying Convex Changes

When you modify files in `convex/`, you need to:

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
- **Backend & database:** Convex — stores all content (team, publications, research, open positions) and image files
- **Admin auth:** Password stored as a Convex environment variable (`ADMIN_PASSWORD`)
- **Domain:** `precisionproteomics.uzh.ch` — DNS managed by UZH IT (Claudio Rhyner)
- **TLS:** Automatic via Vercel + Let's Encrypt
