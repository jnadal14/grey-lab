# Greylab Productions website

Prototype redesign of [greylab.ca](https://www.greylab.ca): Next.js + Motion,
exported as a static site for Cloudflare Pages.

## Pages
| Route | Content |
|---|---|
| `/` | Hero with the next show → Homecoming Fest 26' → services → past events → latest article → full-bleed photo → contact |
| `/about/` | Who are we → services (`#services`) → gallery, Concert / Shoots (`#work`) → community form |
| `/get-involved/` | Collaboration copy and pitch form |
| `/articles/` | Under construction until `content/articles.ts` has entries |

## Stack
- **Next.js 16** (App Router, TypeScript), `output: 'export'`: `npm run build` writes plain files to `out/`
- **Tailwind CSS v4**, tokens in `app/globals.css`
- **Motion** (formerly Framer Motion) for springs, scroll-linked and layout animation
- **Lenis** smooth scroll
- **sharp** image pipeline: `_source/` masters → WebP at 480/828/1280/1920 px + blur placeholders

## Working on it
```
npm install
npm run dev                         # http://localhost:3000
node scripts/fetch-media.mjs        # first time only: pull source photos
node scripts/optimize-images.mjs    # after adding/changing photos
npm run build                       # static site in out/
```

Content edits happen in `content/`: `events.ts` (next show, past shows),
`services.ts`, `gallery.ts` (photo order and Concert/Shoot category),
`articles.ts`, `site.ts` (socials, form id, demo date).

## Deploying to Cloudflare Pages
Connect the (private) GitHub repo in Cloudflare → Workers & Pages → Create →
Pages → Connect to Git, then:
- Build command: `npm run build`
- Output directory: `out`
- Environment variable: `NODE_VERSION=22`

`public/_headers` sets caching and keeps the prototype out of search engines.

Photography by Jackson Iseli and Greylab Productions. All media © Greylab Productions Ltd.
