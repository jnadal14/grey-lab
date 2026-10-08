@AGENTS.md

# Greylab website

Pitch prototype for the greylab.ca redesign (Greylab Productions, Vancouver).
Next.js 16 App Router, static export, hosted on Cloudflare Pages.

## Commands
- `npm run dev`: local dev server
- `npm run build`: static export to `out/` (what Cloudflare deploys)
- `npm run lint`, `npx tsc --noEmit`: run both before committing
- `node scripts/fetch-media.mjs`: download source photos into `_source/` (gitignored)
- `node scripts/optimize-images.mjs`: build `public/media/` + `content/media.json`

## Conventions
- **Content lives in `content/*.ts`**, never hard-coded in components. Events,
  services, gallery order, articles, nav and site settings each have a file.
- **Images are referenced by key** (`<Media id="hero" />`). To add one, put the
  master in `_source/`, add a key in `scripts/media-list.mjs`, run the optimizer.
  `next/image` uses the custom loader in `lib/image-loader.ts`; always pass `sizes`.
- **Animation**: `motion` (import from `motion/react`) and Lenis. Reusable pieces
  are in `components/motion/`. Everything respects reduced motion through
  `MotionConfig reducedMotion="user"`; Lenis is skipped entirely in that case.
- Sticky children need ancestors with `overflow-clip`, not `overflow-hidden`.
- Server components by default; add `'use client'` only where hooks or motion need it.
- Design tokens (colors, fonts, type scale) are in `app/globals.css` `@theme`.
  Palette is black, greys and white only: no accent colour. Fonts match
  greylab.ca: Vina Sans headings (`.display`), Bayon body and nav, Familjen
  Grotesk for small labels, buttons and forms (`font-sans`).
- Copy comes from greylab.ca word for word (`content/copy.ts`,
  `content/services.ts`); only capitalization and typos are fixed.
- Must work on any phone in portrait and landscape: display sizes are capped
  with `svh`, and the `short:` variant (max-height 540px) handles landscape.
- Header follows the Dirty Aesthetic layout: logo + next-show pill on the left,
  text links on the right, links drop to a second row on phones (no hamburger).
- Only Greylab or Jackson Iseli photos. From the Dirty Aesthetic repo, only
  files named `jackson-iseli--*`.

## Pitch-only settings to undo at launch
- `site.demoNow` in `content/site.ts` (pretends Homecoming Fest 26' is upcoming)
- `robots: { index: false }` in `app/layout.tsx` and `X-Robots-Tag` in `public/_headers`
- `site.formspreeId` is empty, so forms don't send
- `upcoming.ticketUrl` points at the empty greylab.ca store
