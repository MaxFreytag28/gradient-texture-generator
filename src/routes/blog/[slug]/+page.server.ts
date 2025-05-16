import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

// Import the blog posts data
import { _blogPostsData } from '../+page.server';

export const load: PageServerLoad = async ({ params }) => {
  const { slug } = params;
  const post = _blogPostsData[slug];
  
  if (!post) {
    throw error(404, 'Post not found');
  }

  // Get related posts (all posts except the current one)
  const allPosts = Object.values(_blogPostsData);
  const relatedPosts = allPosts
    .filter(p => p.slug !== slug)
    .map(({ content, ...rest }) => rest) // Don't send full content
    .slice(0, 3); // Limit to 3 related posts

  return {
    post,
    relatedPosts
  };
};
