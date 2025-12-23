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

## 3. Package Manager Setup (corepack & pnpm)

**Corepack** is a Node.js utility (included with Node 16.9+ and 18+) that manages package manager versions automatically. It ensures that the correct version of `pnpm` is used across different environments, matching the version specified in the project's `package.json` or lockfile.

> **Understanding Corepack:** For a detailed explanation of what Corepack is and why it's useful, see [Appendix B: What is Corepack?](#appendix-b-what-is-corepack).

### Enable Corepack

If corepack is not already enabled on your system, activate it:

```bash
corepack enable
```

**What this does:**
* Activates Corepack as a package manager interface for Node.js
* Allows Node.js to automatically use the correct package manager version for each project
* Requires administrator/administrative privileges on Windows (run PowerShell as Administrator if needed)

**Note:** After enabling corepack, you may need to restart your terminal or PowerShell session for changes to take effect.

### Verify pnpm Availability

Confirm that `pnpm` is accessible through corepack:

```bash
pnpm -v
```

**Expected output:** A version number (e.g., `9.x.x` or similar)

If the command fails, ensure:
1. Corepack is enabled (see above)
2. Node.js version 20 is active (`nvm use 20`)
3. Your terminal session has been restarted after enabling corepack

### Prepare and Activate Latest pnpm

Ensure you have the latest stable version of pnpm available via corepack:

```bash
corepack prepare pnpm@latest --activate
```

**What this does:**
* Downloads and prepares the latest stable version of pnpm
* Makes it available for use via corepack
* The `--activate` flag sets this version as the default for corepack-managed pnpm

**Alternative:** If your project specifies a particular pnpm version in `package.json` (via `packageManager` field), corepack will automatically use that version. You can also prepare a specific version:

```bash
# Example: Prepare a specific version
corepack prepare pnpm@9.0.0 --activate
```

### Re-sync Lockfile (When Needed)

If you encounter dependency resolution issues or the lockfile appears out of sync with `package.json`, you can force a fresh lockfile generation:

```bash
cd site
pnpm install --no-frozen-lockfile
```

**When to use `--no-frozen-lockfile`:**
* When `pnpm-lock.yaml` is missing or corrupted
* When `package.json` dependencies have been manually updated and the lockfile needs regeneration
* When switching between different Node.js versions and encountering version conflicts
* **Note:** In CI/CD environments, this flag is typically **not** used to ensure reproducible builds

**What this does:**
* Ignores the existing lockfile and resolves all dependencies from scratch
* Regenerates `pnpm-lock.yaml` based on current `package.json` and compatible versions
* Updates the lockfile to match your current Node.js and pnpm environment

**Best Practice:** After regenerating the lockfile, commit the updated `pnpm-lock.yaml` to version control to maintain consistency across team members and CI environments.

---

## 4. Project Structure

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

## 5. Install Dependencies

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

## 6. Local Development Server

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

## 7. Production-Equivalent Build (Recommended)

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

## 8. Standard Local Workflow Summary

```bash
# 1. Environment Check
nvm use 20

# 2. Package Manager Setup (first time only)
corepack enable
corepack prepare pnpm@latest --activate
pnpm -v  # verify installation

# 3. Enter workspace
cd site

# 4. Install Dependencies (only when needed)
pnpm install

# 5. Launch Dev Environment
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

---

## Appendix B: What is Corepack?

**Corepack** is a built-in Node.js utility that acts as a bridge between Node.js projects and package managers like Yarn and pnpm. It was introduced to simplify package manager management and ensure consistency across development environments.

### The Problem Corepack Solves

Node.js comes with npm built-in, but many projects use alternative package managers such as Yarn or pnpm for their unique advantages:

* **Yarn** offers improved performance and better dependency resolution
* **pnpm** provides efficient disk space usage through content-addressable storage and strict dependency isolation

However, managing these tools manually presents challenges:

* Different projects may require different versions of the same package manager
* Manual installation and version switching can lead to conflicts
* Team members may have different package manager versions, causing inconsistent behavior
* CI/CD environments need to match local development setups exactly

### How Corepack Works

Corepack serves as an **interface layer** that:

1. **Automatically manages package manager versions** based on project configuration
2. **Eliminates manual installation** of package managers like Yarn and pnpm
3. **Ensures version consistency** by reading the `packageManager` field from `package.json`
4. **Provides seamless switching** between different package managers and versions

When you run a package manager command (e.g., `pnpm install`), Corepack intercepts the call, checks the project's requirements, and automatically uses the correct version of the package manager—all without manual intervention.

### Corepack as a Bridge

Think of Corepack as a **translation layer** or **compatibility bridge**:

* **Node.js** (which only includes npm) communicates with Corepack
* **Corepack** translates requests and manages the appropriate package manager (Yarn, pnpm, etc.)
* **Package managers** execute the actual dependency management tasks

This architecture allows Node.js to support multiple package managers without bundling them directly, while ensuring that each project uses exactly the version it needs.

### Version Management

Corepack reads the `packageManager` field in your `package.json` to determine which package manager and version to use:

```json
{
  "packageManager": "pnpm@9.0.0"
}
```

When this field is present, Corepack automatically:
* Downloads the specified version if not already available
* Uses that exact version for all package manager operations
* Ensures all team members and CI environments use the same version

### Availability and Requirements

* **Included by default** in Node.js 16.9.0 and later (including Node 18+ and 20+)
* **Disabled by default** and must be explicitly enabled with `corepack enable`
* **Note:** Starting from Node.js 25, Corepack is no longer distributed with Node.js and must be installed separately

### Benefits for Development Teams

1. **Consistency:** Everyone uses the same package manager version
2. **Simplicity:** No need to manually install or update package managers
3. **Reliability:** Reduces "works on my machine" issues related to package manager versions
4. **Flexibility:** Easy to switch between package managers or versions per project

### Summary

Corepack is Node.js's solution to package manager fragmentation. By providing a unified interface that automatically handles version management, it eliminates the need for manual installation and version coordination, making JavaScript development more consistent and reliable across different environments and team members.