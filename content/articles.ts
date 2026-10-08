import type { MediaKey } from '@/lib/media'

export type Article = { slug: string; title: string; excerpt: string; date: string; image: MediaKey }

// Newest first. While this is empty, the landing teaser and /articles show
// their "coming soon" state.
export const articles: Article[] = []
