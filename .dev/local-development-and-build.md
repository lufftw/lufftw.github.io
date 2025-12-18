# Local Development and Production Build Guide

This document describes the standard workflow for running the site locally and verifying a production-equivalent build before deployment.  
Following these steps ensures consistency between local development, CI, and GitHub Pages deployment.

---

## 1. Prerequisites

* **Operating System:** Windows (PowerShell recommended)
* **Node.js version:** `20.x` (or `18.x` for stability)
* **Package manager:** `pnpm`
* **Node version manager:** `nvm for Windows`

> **Note:** The project uses Node 20 in both CI and deployment workflows. Local development should match this version to avoid environment discrepancies.

---

## 2. Node Version Setup (via nvm)

Ensure the correct Node.js version is active before running any development commands.

### Check Installed Versions
List all Node.js versions currently installed on your system:
```bash
nvm list

```

### Switch to Target Version

Switch to Node 20 (or your project's required version):

```bash
nvm use 20
# Example for a specific patch version:
# nvm use 20.18.0

```

### Verify Environment

Confirm that both Node.js and npm are correctly linked:

```bash
node -v  # Expected: v20.x.x
npm -v   # Expected: 10.x.x (or corresponding version)

```

### Install Node (if missing)

If Node 20 is not found in the list:

```bash
nvm install 20
nvm use 20

```

---

## 3. Project Structure

The website source code lives under the `site/` directory.

```text
lufftw.github.io/
├─ README.md
├─ .github/
├─ .dev/
└─ site/
   ├─ package.json
   ├─ pnpm-lock.yaml  <-- Critical for dependency consistency
   └─ src/

```

**Important:** All development and build commands must be executed inside the `site/` directory.

---

## 4. Install Dependencies

Navigate to the `site` directory and install packages. **pnpm** is the preferred manager for this project to ensure lockfile integrity.

```bash
cd site

# Recommended: Clean install based on lockfile
pnpm install

# Alternatively, if using npm:
# npm ci (if package-lock.json exists)
# npm install (if starting fresh)

```

This step is required only on first setup or when `pnpm-lock.yaml` / `package.json` changes.

---

## 5. Local Development Server

Start the local development server with hot reload (Astro):

```bash
pnpm dev
# or: npm run dev

```

**Expected output:**

```text
Local:   http://localhost:4321/

```

Open the URL in a browser. Changes to source files will be reflected immediately.

---

## 6. Production-Equivalent Build (Recommended)

Before pushing changes to the `main` branch, always verify the production build locally to catch SSR or static generation errors.

```bash
pnpm build
pnpm preview

```

* `pnpm build`: Generates the static output in `site/dist/`.
* `pnpm preview`: Serves the production-ready files locally for testing.

**Verification Checklist:**
Ensure the following routes render correctly:

* `/` (Home)
* `/posts` (Blog Posts)
* `/notes` (Daily Notes)
* `/topics` (Content Topics)
* `/tags` (Content Tags)

---

## 7. Standard Local Workflow Summary

```bash
# 1. Environment Check
nvm use 20

# 2. Enter workspace
cd site

# 3. Launch Dev Environment
pnpm install   # only when needed
pnpm dev

```

**Final Verification before Deployment:**

```bash
pnpm build && pnpm preview

```

---

## Appendix A: nvm for Windows Configuration Issue

In some Windows environments, running `nvm` commands may fail with:

> `ERROR open \settings.txt: The system cannot find the file specified.`

### Resolution Summary

1. **Verify settings.txt:** Ensure it exists in the `%APPDATA%\nvm` or the nvm installation root.
2. **Environment Variables:**
* `NVM_HOME`: Path to the nvm folder.
* `NVM_SYMLINK`: Path where the active Node symlink will be created.


3. **Path Check:** Ensure `%NVM_HOME%` and `%NVM_SYMLINK%` are in your System `PATH`.