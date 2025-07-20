# StartupConnect

StartupConnect is a web platform that connects students with startups for real-world opportunities. It features AI-powered skill matching, personalized dashboards, and easy gig management.

## Requirements
- Node.js (v18 or higher recommended)
- npm (comes with Node.js)

## Installation
1. Clone the repository:
   ```sh
   git clone <YOUR_GIT_URL>
   cd <YOUR_PROJECT_NAME>
   ```
2. Install dependencies:
   ```sh
   npm install
   ```

## Running the Project
- Start the development server:
  ```sh
  npm run dev
  ```
  The app will be available at http://localhost:8080 (or another port if 8080 is in use).

- Build for production:
  ```sh
  npm run build
  ```

- Preview the production build:
  ```sh
  npm run preview
  ```

---

**To generate documentation using Entelligence AI:**

1. **Open the Command Palette** (which you already have open).
2. **Type:**  
   ```
   Entelligence AI: Create Note
   ```
   or  
   ```
   Entelligence AI: Start conversation
   ```
   (Choose the one that best matches documentation generation. "Create Note" is often used for documentation.)

3. **When prompted, enter your request:**  
   For example, you can paste this prompt:
   > Generate comprehensive documentation for this project, including an overview, features, setup instructions, usage, tech stack, folder structure, and contribution guidelines.

4. **Follow any further prompts** from the extension (such as selecting files or folders to document).

5. **Review the generated documentation**—it may appear in a new file, a note, or as comments, depending on the extension’s workflow.

---

**Tip:**  
If you want documentation for a specific file

Since your project is hosted on Netlify at [https://startupconnect.netlify.app/](https://startupconnect.netlify.app/), here are the most common reasons why a project might "disappear" or show a blank page after deployment, specifically for Vite + React projects like yours:

---

## 1. **SPA Routing Issue**
Netlify serves static files, so if you refresh or directly access a route (e.g., `/dashboard`), it may return a 404 or blank page unless you configure redirects.

**Solution:**  
Add a `_redirects` file in your `public/` folder with the following content:
```
/*    /index.html   200
```
This tells Netlify to serve `index.html` for all routes, which is required for React Router.

---

## 2. **Missing Environment Variables**
If you use environment variables (like Supabase keys), you must set them in the Netlify dashboard under Site settings → Environment variables.  
If these are missing, your app may fail to load data and appear blank.

---

## 3. **Build Output Directory**
Netlify expects the build output to be in the `dist` folder for Vite projects.  
Check that your Netlify build settings use:
- **Build command:** `npm run build`
- **Publish directory:** `dist`

---

## 4. **Case Sensitivity/File Paths**
Netlify’s servers are case-sensitive. If you have mismatched file names (e.g., `Logo.png` vs `logo.png`), it may work locally (on Windows) but fail on Netlify (Linux).

---

## 5. **Check Build Logs**
Go to your Netlify dashboard, select your site, and review the Deploys tab for any build errors or warnings.

---

## 6. **Static Assets**
Ensure all static assets are in the `public/` directory and referenced correctly.

---

## 7. **Browser Console Errors**
Open the browser console at [https://startupconnect.netlify.app/](https://startupconnect.netlify.app/) and look for errors (e.g., 404s, CORS, or JavaScript errors). These can provide clues.

---

### **What to Do Next**
1. Add the `_redirects` file for SPA routing.
2. Double-check your environment variables in Netlify.
3. Confirm your build and publish settings.
4. Review the Netlify deploy logs for errors.
5. Check the browser console for runtime errors.

If you need step-by-step help with any of these, let me know which issue you suspect or what errors you see!

---

Here’s a step-by-step guide to make your Vite + React project work on GitHub Pages at  
[https://akshaya-reddy18.github.io/StartupConnect/](https://akshaya-reddy18.github.io/StartupConnect/):

---

## 1. Set the Base Path in Vite

Open your `vite.config.ts` and set the `base` option to your repo name:

```ts
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/StartupConnect/', // <-- Add this line
});
```

---

## 2. Build the Project

In your terminal, run:

```sh
npm run build
```

This creates a `dist/` folder with your production build.

---

## 3. Deploy to GitHub Pages

You can use the `gh-pages` package to automate deployment:

### a. Install gh-pages (if not already):

```sh
npm install --save-dev gh-pages
```

### b. Add deploy scripts to `package.json`:

```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

### c. Deploy:

```sh
npm run deploy
```

This will push the contents of `dist/` to the `gh-pages` branch, which GitHub Pages uses.

---

## 4. Enable GitHub Pages

- Go to your GitHub repo → Settings → Pages.
- Set the source to the `gh-pages` branch and `/ (root)` folder.

---

## 5. Wait for Deployment

- After a few minutes, your site should be live at  
  [https://akshaya-reddy18.github.io/StartupConnect/](https://akshaya-reddy18.github.io/StartupConnect/).

---

## 6. (Optional) SPA Routing Fix

If you use React Router and want to support client-side routing, use a workaround like [spa-github-pages](https://github.com/rafgraph/spa-github-pages) or keep all navigation within the app.

---

## 7. Check Your Site

- Open the URL and check for errors.
- If you see a blank page or 404s, check the browser console for missing files or path issues.

---

### **Summary**
1. Set `base: '/StartupConnect/'` in `vite.config.ts`.
2. Build: `npm run build`
3. Deploy: `npm run deploy`
4. Enable GitHub Pages on the `gh-pages` branch.
5. Visit your site and verify.

If you need help with any step or want a sample config, let me know!
