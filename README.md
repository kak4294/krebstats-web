# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Personal React Site — Quick Start Guide

> A condensed reference for running, building, and deploying this project.

## Requirements

| Tool | Minimum Version | Check |
| ---- | --------------- | ----- |
|      |                 |       |

| **Node.js** | 16 LTS (tested on 20.x) | `node -v` |
| ----------- | ----------------------- | --------- |
| **npm**     | 8 or newer              | `npm -v`  |

Clone the repo, then install dependencies once:

```bash
npm ci      # or `npm install` for the first run
```

---

## Local development (hot‑reload)

```bash
npm run dev
```

* Starts the **Vite dev server** on [http://localhost:5173](http://localhost:5173) (port may vary).
* Watches all files; saving a change instantly refreshes the browser.
* Stop it with **Ctrl +C** when you’re done.

---

## Production build

```bash
npm run build
```

* Generates an optimized, minified bundle in \`\`.
* Fingerprints filenames (e.g. `assets/index‑5d381.js`) for long‑term caching.

### Preview the build locally (optional)

```bash
npm run preview
```

Serves \`\` so you can test the exact files that will go to production.

---

## Deploying

### CI‑friendly recipe (Vercel, Netlify, GitHub Actions, etc.)

```bash
npm ci        # reproducible install based on package‑lock.json
npm run build # emit dist/
#→ upload dist/ to your host or let the platform do it automatically
```

Most static hosts detect **Vite** out‑of‑the‑box and run those same commands for you.

### Self‑hosting (Nginx example)

```bash
npm run build
sudo cp -r dist/* /var/www/your‑site
sudo systemctl reload nginx
```

Only the static files in \`\` are needed on the server—no running Node process.

---

## Common scripts (package.json)

| Script    | Purpose                                   |
| --------- | ----------------------------------------- |
| `dev`     | Hot‑reload dev server                     |
| `build`   | Create production bundle                  |
| `preview` | Serve the bundle locally for final checks |

Feel free to tweak ports, domain names, or hosting instructions as your setup evolves. Pull requests welcome!
