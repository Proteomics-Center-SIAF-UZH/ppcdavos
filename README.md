# Precision Proteomics Center Davos Website

## About This Site
Welcome to the official website of the **Precision Proteomics Center Davos**.  

The website is built using **React**, **TypeScript**, and **Next.js**, and exports to plain static HTML — no server runtime required.

- **Production:** [https://admin.whp.uzh.ch/](https://admin.whp.uzh.ch/)  
- **Testing:** [https://admin.whptest.uzh.ch/](https://admin.whptest.uzh.ch/)  

---

## Editing Content (Team, Publications, Research, Positions)

All editable content lives in the **`/content/`** folder at the root of this repository. Each file is plain JSON — you can edit it directly in GitHub's web editor or in any text editor.

| File | What it controls |
|---|---|
| `content/team.json` | Team members and alumni |
| `content/publications.json` | Publications list |
| `content/research.json` | Research area descriptions and images |
| `content/openPositions.json` | Open positions (set `"isActive": true` to show a position) |

After editing a file, commit your changes and run a build (see below) to regenerate the site.

> **Tip:** Always test on the **testing instance** before deploying to production. If changes don't appear immediately, try opening the site in **Incognito mode**.

---

## Running the App Locally

1. Install dependencies: `npm install`
2. Start the development server: `npm run dev` (available at `localhost:3000`)

---

## Building and Deploying

### Build
```bash
npm run build
```
This generates static HTML in `/out/` and copies it to `/out_deploy/`.

### Deploy
1. Navigate to the `/out_deploy/` folder, commit all changes, and push to the [ppcdavos_output](https://github.com/Proteomics-Center-SIAF-UZH/ppcdavos_output) repository.
2. In Plesk, navigate to the Git section, then click **Pull now** and **Deploy now**.

---

## How It Works

`npm run build` runs `next build`, which reads all content from `content/*.json` at build time and produces fully static HTML pages in `/out/`. No server-side runtime is needed to serve the site.

- **Why copy to `/out_deploy/`?**  
  The `/out/` folder is fully overwritten on every build. By copying files to `/out_deploy/`, we preserve the `.git` metadata and maintain the connection with the Git repository.

- **Deployment flow:**  
  `/out_deploy/` is linked to the `ppcdavos_output` repository, which is connected to Plesk. Clicking **Pull now** on Plesk fetches the latest changes and updates the hosted site automatically.
