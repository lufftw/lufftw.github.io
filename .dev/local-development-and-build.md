# Local Development and Production Build Guide

This document describes the standard workflow for running the site locally and verifying a production-equivalent build before deployment.  
Following these steps ensures consistency between local development, CI, and GitHub Pages deployment.

---

## 1. Prerequisites

* **Operating System:** Windows
* **Node.js version:** `20.x`
* **Package manager:** `pnpm`
* **Node version manager:** `nvm for Windows`

> **Note:** The project uses Node 20 in both CI and deployment workflows. Local development should match this version.

---

## 2. Node Version Setup (via nvm)

Ensure the correct Node.js version is active.

### Check Installed Versions

List all installed Node.js versions:

```bash
nvm list

```

This shows all Node.js versions installed on your system.

### Switch to Node Version

Switch to the desired Node.js version (use the version number you need):

```bash
nvm use 20

```

Or use a specific version:

```bash
nvm use 20.19.6

```

### Verify Node.js Version

After switching, verify the active Node.js version:

```bash
node -v

```

**Expected output:**

```text
v20.x.x

```

### Verify npm Version

Check the npm version that comes with the active Node.js installation:

```bash
npm -v

```

**Expected output:**

```text
10.x.x

```

### Install Node 20 (if not installed)

If Node 20 is not installed:

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
   ├─ pnpm-lock.yaml
   └─ src/

```

**Important:** All development and build commands must be executed inside the `site/` directory.

---

## 4. Install Dependencies

From the repository root:

```bash
cd site
pnpm install

```

This step is required only on first setup or when `pnpm-lock.yaml` changes.

---

## 5. Local Development Server

Start the local development server with hot reload:

```bash
pnpm dev

```

**Expected output:**

```text
Local:   http://localhost:4321/

```

Open the URL in a browser to view the site. Changes to source files will be reflected immediately.

---

## 6. Production-Equivalent Build (Recommended)

Before pushing changes to the `main` branch, always verify the production build.

```bash
pnpm build
pnpm preview

```

* `pnpm build`: Generates the static output in `site/dist/`.
* `pnpm preview`: Serves the built site locally.

**Verify that the following routes load correctly:**

* `/`
* `/posts`
* `/notes`
* `/topics`
* `/tags`

If these steps succeed locally, GitHub Pages deployment is expected to succeed as well.

---

## 7. Standard Local Workflow Summary

```bash
# 1. Switch Node version
nvm use 20

# 2. Go to site directory
cd site

# 3. Install (if needed) and run
pnpm install
pnpm dev

```

**Before deployment:**

```bash
pnpm build
pnpm preview

```

---

## Appendix A: nvm for Windows Configuration Issue

In some Windows environments, running `nvm list` may fail with the following error:

> `ERROR open \settings.txt: The system cannot find the file specified.`

This indicates that `settings.txt` or related environment variables are missing or misconfigured.

### Resolution Summary

1. **Check settings.txt:** Ensure `settings.txt` exists in the `nvm` root directory.
2. **System Environment Variables:** Configure the following:
* `NVM_HOME`
* `NVM_SYMLINK`


3. **Path Configuration:** Ensure the Node.js symlink directory is included in the system `PATH`.

For detailed recovery steps, see the internal setup notes or reinitialize `nvm for Windows` with a clean configuration.