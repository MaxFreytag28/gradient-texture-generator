import { allBlogPosts, type BlogPost } from '$lib/blog-content';

export const load = async () => {
  // Get the blog posts data for this page
  const allPosts = Object.values(allBlogPosts).sort((a: BlogPost, b: BlogPost) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  // Only get the most recent 4 posts
  const recentPosts = allPosts.slice(0, 4).map(({ content, ...post }: BlogPost) => post);
  
  return {
    blogPosts: recentPosts
  };
};
