# CI/CD Automated Deployment Guide — Gummaraju Jaswanth Abhiram Portfolio

This repository is equipped with automated **Continuous Integration and Continuous Deployment (CI/CD)** pipelines. Every time you commit and push changes to your GitHub repository, the portfolio automatically tests, builds, and deploys to your live production link.

---

## Option 1: GitHub Pages (Built-in & Fully Automated — Free)

A GitHub Actions workflow is pre-configured in `.github/workflows/deploy.yml`.

### One-Time Setup in your GitHub Repository:
1. Push your repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: portfolio with automated CI/CD"
   git branch -M main
   git remote add origin https://github.com/ABHIRAMGJ/<YOUR-REPO-NAME>.git
   git push -u origin main
   ```
2. In your GitHub repository, go to **Settings** > **Pages** (under "Code and automation" in the left sidebar).
3. Under **Build and deployment** > **Source**, choose:
   - **GitHub Actions** (instead of "Deploy from a branch").
4. That's it! Every future `git commit` and `git push` to `main` will automatically trigger the workflow and deploy the live site to:
   `https://ABHIRAMGJ.github.io/<YOUR-REPO-NAME>/`

---

## Option 2: Vercel (Fastest Global Edge Deployment — Free)

A `vercel.json` configuration is pre-configured in the repository root.

1. Go to [vercel.com](https://vercel.com) and log in with your GitHub account.
2. Click **Add New** > **Project** and select your portfolio repository.
3. Keep the default settings (Framework: Vite, Build command: `npm run build`, Output directory: `dist`).
4. Click **Deploy**.
5. Once connected, **any commit to `main` instantly triggers a fresh global edge deployment** with zero manual intervention.

---

## Option 3: Netlify (Alternative Edge Deployment — Free)

A `netlify.toml` configuration is pre-configured in the repository root.

1. Go to [netlify.com](https://netlify.com) and sign in with GitHub.
2. Click **Add new site** > **Import an existing project**.
3. Select your portfolio repository.
4. Netlify automatically reads `netlify.toml` and deploys your site on every push.

---

## Pre-Push Verification Commands

Before committing, you can test the production build locally:

```bash
# 1. Typecheck & lint validation
npm run lint

# 2. Production build verification
npm run build

# 3. Preview the production build locally
npm run preview
```
