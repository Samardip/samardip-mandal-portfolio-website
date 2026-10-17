# Samardip Mandal — portfolio

Personal site positioning me as a frontend engineer for AI products. Built with Next.js (App Router, Cache Components), TypeScript (strict) and CSS Modules. There are no UI or animation libraries; entrance motion is CSS scroll-driven and respects `prefers-reduced-motion`.

## Scripts

```bash
npm run dev     # local development
npm run lint    # ESLint (next/core-web-vitals + TypeScript)
npx tsc --noEmit
npm run build   # every route is prerendered
npm start
```

## Where things live

| Path | What |
| --- | --- |
| `src/content/` | All copy and claims: projects, case studies, metrics, experience. Edit here, not in components. |
| `src/content/slugs.ts` | Case-study routes. Add a slug here when you add a case study. |
| `src/components/sections/` | Home page sections |
| `src/components/case-study/` | Case-study page blocks and the table of contents |
| `src/components/figures/` | Architecture diagrams used in case studies |
| `src/app/globals.css` | Design tokens (color, type scale, spacing) |
| `resume/` | LaTeX source of the résumé; the PDF lives in `public/` |

## Deploying

Set `NEXT_PUBLIC_SITE_URL` to the production origin (for example `https://your-domain.com`). It's used for canonical URLs, Open Graph URLs, `sitemap.xml` and `robots.txt`. On Vercel, `VERCEL_PROJECT_PRODUCTION_URL` is used as a fallback.

## Updating the résumé

```bash
cd resume && tectonic Samardip_Mandal_Resume.tex && mv Samardip_Mandal_Resume.pdf ../public/
```

## Content rules

Every metric on the site carries an attribution: individual, team, or product-level (company-reported). Keep it that way when adding numbers.
