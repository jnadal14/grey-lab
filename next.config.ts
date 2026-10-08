import type { NextConfig } from 'next'

// Static export: `next build` writes plain HTML/CSS/JS to out/, which
// Cloudflare Pages serves as-is. Anything needing a server (ticketing,
// store) can move to @opennextjs/cloudflare later without a rewrite.
// Set by the GitHub Pages workflow ("/grey-lab"); empty everywhere else.
const basePath = process.env.PAGES_BASE_PATH ?? ''

const nextConfig: NextConfig = {
  output: 'export',
  basePath,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  trailingSlash: true,
  images: {
    loader: 'custom',
    loaderFile: './lib/image-loader.ts',
    // Must match the widths scripts/optimize-images.mjs writes.
    deviceSizes: [480, 828, 1280, 1920],
    imageSizes: [256],
  },
  turbopack: {
    // A stray package-lock.json in the home folder otherwise confuses root detection.
    root: process.cwd(),
    rules: {
      '*.css': {
        loaders: ['@tailwindcss/turbopack'],
        as: '*.css',
      },
    },
  },
}

export default nextConfig
