import type { PageServerLoad } from './$types';
import { _blogPostsData } from './blog/+page.server';

export const load: PageServerLoad = async () => {
  // Get the blog posts data for the homepage
  const allPosts = Object.values(_blogPostsData).sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  // Only get the most recent 4 posts for the homepage
  const recentPosts = allPosts.slice(0, 4).map(({ content, ...post }) => post);
  
  return {
    blogPosts: recentPosts
  };
};
