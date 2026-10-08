// Sub-path the site is served from: '' on Cloudflare or greylab.ca, '/grey-lab'
// on GitHub Pages. Next adds it to <Link> and route URLs itself; anything built
// by hand (image loader output, plain <a> downloads) goes through withBase().
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

export const withBase = (path: string) => (path.startsWith('/') ? basePath + path : path)
