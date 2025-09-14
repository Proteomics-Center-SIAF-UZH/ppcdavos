## About this site
This is the official website of the Precision Proteomics Center Davos. 


The website is built with React, TypeScript and Next.js. The static files of the website are hosted on Plesk via Git. 
- The production instance is host on https://admin.whp.uzh.ch/ 
- The testing instance is hosted on https://admin.whptest.uzh.ch/


## To run the app locally
```bash
# install all packages
npm install
# run the app locally, localhost:3000
npm run dev
```

## To update the website
If you want to change only the data displayed on the website, e.g. team members, research sections, open positions and publications, you can directly change it in the [ppcdavos_output](https://github.com/Proteomics-Center-SIAF-UZH/ppcdavos_output) repository. 
- Go to [/data/](https://github.com/Proteomics-Center-SIAF-UZH/ppcdavos_output/tree/main/data) 
- Edit files and commit your changes (you can also do it locally if you have copied the ppcdavos_output repo)
- Navigate to the Plesk hosting platform, click git
- Click "Pull now" and "Deploy now"
Now your changes should be online. If you don't see your changes, try Incognito. ALWAYS first try your changes on the testing instance before you deploy to production.

If you want to change other things other than the data displayed on the website, you have to change the source code.
- Make your changes, and once you are happy, commit your changes
- Run `npm run build` to generate static files 
- Then navigate to `/out_deploy/` folder and commit all changes there and push to [ppcdavos_output](https://github.com/Proteomics-Center-SIAF-UZH/ppcdavos_output) repository
- Then navigate to Plesk and pull and deploy from Git 

How does it work under the hood? 

When you run `npm run build`, the static files of the files are generated in `/out/` folder and copied to `/out_deploy/`. Why do we copy them to `/out_deploy`? Because `/out/` folder always gets complete overwritten. By copying all data to `/out_deploy/`, we can keep the `.git` file and always stay connected with git. `/out_deploy/` is hooked to the `ppcdavos_output` repo, and the `ppcdavos_output` repo is connected to Plesk. When you click "Pull now" on Plesk, changes from the `ppcdavos_output` repo is automatically pulled to the Plesk's file system. This is how we keep our changes in sync with the files on Plesk. 