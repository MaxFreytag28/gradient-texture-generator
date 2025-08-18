import { _blogPostsData, type BlogPost } from '../blog/+page.server';
import { SITE_URL } from '$lib/config';

export function GET() {
  const posts = Object.values(_blogPostsData);

  const staticPages = [
    { path: '/', lastmod: '2025-05-19' },
    { path: '/blog', lastmod: '2025-05-19' },
    { path: '/privacy', lastmod: '2025-05-13' },
    { path: '/legal', lastmod: '2025-05-13' }
  ];

  const headers = { 'Content-Type': 'application/xml' };

  const sitemap = `<?xml version="1.0" encoding="UTF-8" ?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${staticPages
        .map(
          (page) => `
        <url>
          <loc>${SITE_URL}${page.path}</loc>
          <lastmod>${page.lastmod}</lastmod>
        </url>
      `
        )
        .join('')}
      ${posts
        .map(
          (post: BlogPost) => `
        <url>
          <loc>${SITE_URL}/blog/${post.slug}</loc>
          <lastmod>${new Date(post.date).toISOString().slice(0, 10)}</lastmod>
        </url>
      `
        )
        .join('')}
    </urlset>`;

  return new Response(sitemap, { headers });
}
