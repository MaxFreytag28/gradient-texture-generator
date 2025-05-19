import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

// Import the blog posts data
import { _blogPostsData } from '../+page.server';

// This ensures the page is always re-rendered on the client when params.slug changes
export const ssr = true;
export const csr = true;

// Use a direct approach with hardcoded data to ensure consistency
export const load = (async ({ params }) => {
  const { slug } = params;
  
  // Get the post directly by slug
  const post = _blogPostsData[slug];
  
  if (!post) {
    throw error(404, `Post not found: ${slug}`);
  }

  // Get related posts (all posts except the current one)
  const allPosts = Object.values(_blogPostsData);
  const relatedPosts = allPosts
    .filter(p => p.slug !== slug)
    .map(({ id, title, excerpt, slug, gradient, date }) => ({
      id,
      title,
      excerpt,
      slug,
      gradient,
      date
    }));

  // Return the data in a way that ensures reactivity
  return {
    // Current post data
    post: {
      id: post.id,
      title: post.title,
      excerpt: post.excerpt,
      slug: post.slug,
      gradient: post.gradient,
      content: post.content,
      date: post.date
    },
    // Related posts (without content to keep payload small)
    relatedPosts,
    // Add the slug to the page params to help with client-side navigation
    slug
  };
}) satisfies PageServerLoad;
