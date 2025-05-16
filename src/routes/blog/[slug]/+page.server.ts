import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

// Import the blog posts data
import { _blogPostsData } from '../+page.server';

// Use a direct approach with hardcoded data to ensure consistency
export const load: PageServerLoad = async ({ params }) => {
  const { slug } = params;
  
  // Get the post directly by slug
  const post = _blogPostsData[slug];
  
  if (!post) {
    throw error(404, `Post not found: ${slug}`);
  }

  // Get related posts (all posts except the current one)
  const allPosts = Object.values(_blogPostsData);
  const relatedPosts = allPosts
    .filter(p => p.slug !== slug) // Show all other posts

  // Create a clean copy of the post data to avoid reference issues
  const cleanPost = {
    id: post.id,
    title: post.title,
    excerpt: post.excerpt,
    slug: post.slug,
    gradient: post.gradient,
    content: post.content,
    date: post.date
  };

  // Create clean copies of related posts
  const cleanRelatedPosts = relatedPosts.map(p => ({
    id: p.id,
    title: p.title,
    excerpt: p.excerpt,
    slug: p.slug,
    gradient: p.gradient,
    date: p.date
  }));

  return {
    post: cleanPost,
    relatedPosts: cleanRelatedPosts
  };
};
