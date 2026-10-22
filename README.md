# Yura Svituha — Portfolio

Next.js 14 (App Router) + TypeScript. No UI libraries: CSS 3D, canvas effects and plain React.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Deploy to Vercel

**Option A — drag and drop**
1. Unzip the archive.
2. Push the folder to a GitHub repo.
3. On vercel.com → Add New → Project → import the repo → Deploy. Vercel detects Next.js automatically.

**Option B — Vercel CLI**
```bash
npm i -g vercel
vercel        # preview
vercel --prod # production
```

## Where to edit

| What | File |
|---|---|
| Jobs, projects, payout methods, case prizes, wheel labels, email | `lib/data.ts` |
| Photo | `public/yura.jpg` |
| Colors, fonts, all styles | `app/globals.css` (tokens at the top) |
| Page title / SEO | `app/layout.tsx` |
| Roulette intro (spin, ball, warp, explosion) | `components/Intro.tsx` |
| Case opening | `components/CaseDrop.tsx` |
