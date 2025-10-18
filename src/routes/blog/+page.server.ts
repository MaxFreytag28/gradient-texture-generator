import type { PageServerLoad } from './$types';
import { allBlogPosts, type BlogPost } from '$lib/blog-content';

// Export the blog posts data for use in other parts of the app
export const _blogPostsData = allBlogPosts;

// Also export the BlogPost type
export type { BlogPost };

// Load function for blog index page
export const load: PageServerLoad = async ({ setHeaders }) => {
  // Set cache control headers
  setHeaders({
    'cache-control': 'no-cache, no-store, must-revalidate',
    'pragma': 'no-cache',
    'expires': '0'
  });

  // Get all blog posts and sort by date (newest first)
  const posts = Object.values(allBlogPosts).sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  // Return posts without content (content is only needed for individual post pages)
  return {
    posts: posts.map(({ content, ...post }) => ({ ...post }))
  };
};
