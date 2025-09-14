# Precision Proteomics Center Davos Website

## About This Site
Welcome to the official website of the **Precision Proteomics Center Davos**.  

The website is built using **React**, **TypeScript**, and **Next.js**, with static files hosted on **Plesk** via Git:  

- **Production:** [https://admin.whp.uzh.ch/](https://admin.whp.uzh.ch/)  
- **Testing:** [https://admin.whptest.uzh.ch/](https://admin.whptest.uzh.ch/)  

---

## Running the App Locally
To run the app locally:  

1. Install all dependencies: `npm install`  
2. Run the app locally (accessible at `localhost:3000`): `npm run dev`  

---

## Updating the Website

### Updating Content (Data Only)
For changes to displayed content—such as team members, research sections, open positions, or publications—you can directly update the [ppcdavos_output](https://github.com/Proteomics-Center-SIAF-UZH/ppcdavos_output) repository:  

1. Go to the [`/data/`](https://github.com/Proteomics-Center-SIAF-UZH/ppcdavos_output/tree/main/data) folder.  
2. Edit the relevant files and commit your changes. (You can also do this locally if you have cloned the repository.)  
3. In Plesk, navigate to the Git section, then click **Pull now** and **Deploy now**.  

> **Tip:** Always test your changes on the **testing instance** before deploying to production. If changes don’t appear immediately, try opening the site in **Incognito mode**.

---

### Updating Code or Functionality
For changes beyond content, you need to modify the source code:  

1. Make your code changes and commit them.  
2. Run `npm run build` to generate the static files.  
3. Navigate to the `/out_deploy/` folder, commit all changes, and push to the [ppcdavos_output](https://github.com/Proteomics-Center-SIAF-UZH/ppcdavos_output) repository.  
4. In Plesk, pull and deploy from Git.  

---

## How It Works
When you run `npm run build`, the static files are generated in the `/out/` folder and then copied to `/out_deploy/`.  

- **Why copy to `/out_deploy/`?**  
  The `/out/` folder is fully overwritten on every build. By copying files to `/out_deploy/`, we preserve the `.git` metadata and maintain the connection with the Git repository.  

- **Deployment flow:**  
  `/out_deploy/` is linked to the `ppcdavos_output` repository, which is connected to Plesk. Clicking **Pull now** on Plesk fetches the latest changes from the repository and updates the hosted site automatically.  

This setup ensures that your local changes remain fully synchronized with the Plesk-hosted website.
