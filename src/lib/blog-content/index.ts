// Central export file for all blog posts
import { gradientToolBasicsPost } from './gradient-tool-basics';
import { pngVsCssPost } from './png-vs-css-gradients';
import { gradientsMadeEasyPost } from './gradients-made-easy';
import { pngVsSvgPost } from './png-vs-svg';
import { whyGradients2025Post } from './why-gradients-2025';
import { gradientInspirationPost } from './gradient-inspiration';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  gradient: string;
  date: string;
  content: string;
}

export const allBlogPosts: Record<string, BlogPost> = {
  [gradientToolBasicsPost.slug]: gradientToolBasicsPost,
  [pngVsCssPost.slug]: pngVsCssPost,
  [gradientsMadeEasyPost.slug]: gradientsMadeEasyPost,
  [pngVsSvgPost.slug]: pngVsSvgPost,
  [whyGradients2025Post.slug]: whyGradients2025Post,
  [gradientInspirationPost.slug]: gradientInspirationPost,
};

export {
  gradientToolBasicsPost,
  pngVsCssPost,
  gradientsMadeEasyPost,
  pngVsSvgPost,
  whyGradients2025Post,
  gradientInspirationPost,
};
