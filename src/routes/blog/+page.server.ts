import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

// Define the blog post type
type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  gradient: string;
  content: string;
  date: string;
};

// Define the blog posts type
type BlogPosts = {
  [key: string]: BlogPost;
};

// Sample blog posts data
const _blogPosts: BlogPosts = {
  'gradients-made-easy-5-practical-tips': {
    id: '1',
    title: 'Gradients Made Easy: 5 Practical Tips for Stunning Web & Graphic Designs',
    excerpt: 'Master the art of gradients with these 5 practical tips for creating stunning web and graphic designs that enhance your projects without overwhelming them.',
    slug: 'gradients-made-easy-5-practical-tips',
    gradient: 'from-purple-400 via-pink-500 to-red-500',
    date: '2025-05-10',
    content: `
      <p class="mb-6">Gradients have returned as a design staple, bringing depth and visual interest to digital creations. Here are five practical tips to master gradients:</p>
      
      <div class="space-y-6">
        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 class="text-xl font-bold font-heading mb-3">1. Keep It Subtle</h3>
          <p>Gradients should enhance, not overwhelm. Use softer color transitions for UI elements to maintain readability and aesthetics.</p>
        </div>
        
        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 class="text-xl font-bold font-heading mb-3">2. Choose Complementary Colors</h3>
          <p>Use tools like color wheels to quickly find gradient pairs that naturally complement each other.</p>
        </div>
        
        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 class="text-xl font-bold font-heading mb-3">3. Test Accessibility</h3>
          <p>Ensure sufficient contrast for text readability. Tools like contrast checkers can help validate your gradients.</p>
        </div>
        
        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 class="text-xl font-bold font-heading mb-3">4. Match Your Brand</h3>
          <p>Pick gradient colors aligned with your brand palette to maintain consistency and strengthen your brand identity.</p>
        </div>
        
        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 class="text-xl font-bold font-heading mb-3">5. Consider Performance</h3>
          <p>SVG gradients are great for scalable graphics, while PNG or WebP gradients can improve loading times in complex designs.</p>
        </div>
      </div>
    `
  },
  'png-vs-svg-gradients': {
    id: '2',
    title: 'PNG vs. SVG Gradients: Choosing the Best Format for Your Project',
    excerpt: 'Learn the pros and cons of SVG and PNG gradients to make the right choice for your design needs and optimize performance.',
    slug: 'png-vs-svg-gradients',
    gradient: 'from-blue-400 via-cyan-500 to-teal-400',
    date: '2025-05-12',
    content: `
      <p class="mb-6">Choosing the right gradient format impacts your design's quality and performance significantly. Here's how to pick wisely:</p>
      
      <div class="grid md:grid-cols-2 gap-6 mb-8">
        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 class="text-xl font-bold font-heading mb-3">SVG Gradients</h3>
          <h4 class="font-semibold text-primary-600 dark:text-primary-400 mb-2">Pros:</h4>
          <ul class="list-disc pl-5 mb-4 space-y-1">
            <li>Scalable without losing quality</li>
            <li>Lightweight for simple gradients</li>
            <li>Great for responsive design</li>
          </ul>
          <h4 class="font-semibold text-primary-600 dark:text-primary-400 mb-2">Best For:</h4>
          <p>UI icons, responsive web design elements, simple color transitions</p>
        </div>
        
        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 class="text-xl font-bold font-heading mb-3">PNG/JPG/WebP Gradients</h3>
          <h4 class="font-semibold text-primary-600 dark:text-primary-400 mb-2">Pros:</h4>
          <ul class="list-disc pl-5 mb-4 space-y-1">
            <li>Easy integration with existing graphics</li>
            <li>Consistent rendering across browsers</li>
            <li>Better for complex patterns</li>
          </ul>
          <h4 class="font-semibold text-primary-600 dark:text-primary-400 mb-2">Best For:</h4>
          <p>Detailed backgrounds, fixed-size graphics, or when cross-browser consistency is crucial</p>
        </div>
      </div>
      
      <div class="bg-blue-50 dark:bg-blue-900/30 p-6 rounded-lg border-l-4 border-blue-500">
        <h3 class="font-bold font-heading text-lg mb-2">Key Takeaway</h3>
        <p>Choose SVG for scalability and consistency across devices, or PNG/WebP for complex, fixed-size graphics where browser compatibility is a concern.</p>
      </div>
    `
  },
  'why-your-website-needs-gradients-2025': {
    id: '3',
    title: 'Why Your Website Needs Gradients in 2025 (and How to Use Them Well)',
    excerpt: 'Discover why gradients are essential for modern web design and how to implement them effectively to enhance user experience and brand identity.',
    slug: 'why-your-website-needs-gradients-2025',
    gradient: 'from-amber-400 via-orange-500 to-pink-500',
    date: '2025-05-14',
    content: `
      <div class="prose dark:prose-invert max-w-none">
        <p class="text-lg mb-6">Gradients are no longer just trendy—they're essential. Here's why your website should embrace gradients and how to use them effectively:</p>
        
        <div class="bg-gradient-to-r from-amber-50 to-pink-50 dark:from-gray-800 dark:to-gray-800 p-8 rounded-xl mb-8">
          <h3 class="text-xl font-bold font-heading mb-4">The Power of Gradients</h3>
          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <h4 class="font-semibold text-primary-600 dark:text-primary-400 mb-2">Modern Visual Appeal</h4>
              <p>Gradients make websites feel modern and fresh, helping retain visitor interest.</p>
            </div>
            <div>
              <h4 class="font-semibold text-primary-600 dark:text-primary-400 mb-2">Enhanced UX</h4>
              <p>Clever use of gradients guides user attention, improving navigation and engagement.</p>
            </div>
            <div>
              <h4 class="font-semibold text-primary-600 dark:text-primary-400 mb-2">Brand Differentiation</h4>
              <p>Unique gradient combinations help distinguish your brand from competitors.</p>
            </div>
          </div>
        </div>
        
        <h3 class="text-xl font-bold font-heading mt-10 mb-4">How to Use Gradients Effectively</h3>
        
        <div class="space-y-6">
          <div class="flex items-start">
            <div class="flex-shrink-0 h-10 w-10 rounded-full bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center mr-4 mt-1">
              <span class="text-amber-600 dark:text-amber-400 font-bold">1</span>
            </div>
            <div>
              <h4 class="font-semibold text-lg mb-1">Use Gradients Sparingly</h4>
              <p class="text-gray-600 dark:text-gray-300">Focus on key elements like headers, buttons, or backgrounds to create focal points.</p>
            </div>
          </div>
          
          <div class="flex items-start">
            <div class="flex-shrink-0 h-10 w-10 rounded-full bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center mr-4 mt-1">
              <span class="text-amber-600 dark:text-amber-400 font-bold">2</span>
            </div>
            <div>
              <h4 class="font-semibold text-lg mb-1">Balance Intensity</h4>
              <p class="text-gray-600 dark:text-gray-300">Ensure gradients enhance rather than distract from your content. Test for readability.</p>
            </div>
          </div>
          
          <div class="flex items-start">
            <div class="flex-shrink-0 h-10 w-10 rounded-full bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center mr-4 mt-1">
              <span class="text-amber-600 dark:text-amber-400 font-bold">3</span>
            </div>
            <div>
              <h4 class="font-semibold text-lg mb-1">Reflect Your Brand</h4>
              <p class="text-gray-600 dark:text-gray-300">Choose gradient colors that align with your brand's personality and values.</p>
            </div>
          </div>
        </div>
      </div>
    `
  },
  'gradient-inspiration-10-brilliant-examples': {
    id: '4',
    title: 'Gradient Inspiration: 10 Brilliant Examples from Modern App Designs',
    excerpt: 'Get inspired by 10 stunning examples of gradient usage in popular apps like Instagram, Spotify, and more.',
    slug: 'gradient-inspiration-10-brilliant-examples',
    gradient: 'from-green-400 via-emerald-500 to-cyan-500',
    date: '2025-05-16',
    content: `
      <p class="mb-8 text-lg">Looking for gradient inspiration? Here are 10 brilliant examples from popular modern apps that showcase effective use of gradients:</p>
      
      <div class="space-y-8">
        <div class="grid md:grid-cols-[100px_1fr] gap-6 items-start">
          <div class="h-24 w-24 rounded-xl bg-gradient-to-br from-yellow-300 via-pink-500 to-purple-600 flex items-center justify-center">
            <span class="text-white font-bold text-xl">IG</span>
          </div>
          <div>
            <h3 class="text-xl font-bold font-heading mb-2">Instagram</h3>
            <p class="text-gray-600 dark:text-gray-300">Iconic gradient logo that's vibrant and energetic, perfectly capturing the platform's creative essence.</p>
          </div>
        </div>
        
        <div class="grid md:grid-cols-[100px_1fr] gap-6 items-start">
          <div class="h-24 w-24 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
            <span class="text-white font-bold text-xl">S</span>
          </div>
          <div>
            <h3 class="text-xl font-bold font-heading mb-2">Spotify Wrapped</h3>
            <p class="text-gray-600 dark:text-gray-300">Bold gradients enhancing user excitement in their annual wrap-up feature.</p>
          </div>
        </div>
        
        <div class="grid md:grid-cols-[100px_1fr] gap-6 items-start">
          <div class="h-24 w-24 rounded-xl bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center">
            <span class="text-white font-bold text-xl">W</span>
          </div>
          <div>
            <h3 class="text-xl font-bold font-heading mb-2">Apple Weather</h3>
            <p class="text-gray-600 dark:text-gray-300">Subtle, dynamic gradients communicating weather moods and conditions effectively.</p>
          </div>
        </div>
        
        <div class="grid md:grid-cols-[100px_1fr] gap-6 items-start">
          <div class="h-24 w-24 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <span class="text-white font-bold text-xl">S</span>
          </div>
          <div>
            <h3 class="text-xl font-bold font-heading mb-2">Stripe</h3>
            <p class="text-gray-600 dark:text-gray-300">Gradient backgrounds reinforcing brand sophistication and trustworthiness.</p>
          </div>
        </div>
        
        <div class="grid md:grid-cols-[100px_1fr] gap-6 items-start">
          <div class="h-24 w-24 rounded-xl bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
            <span class="text-white font-bold text-xl">D</span>
          </div>
          <div>
            <h3 class="text-xl font-bold font-heading mb-2">Duolingo</h3>
            <p class="text-gray-600 dark:text-gray-300">Friendly gradients aligning with a playful and educational personality.</p>
          </div>
        </div>
        
        <div class="grid md:grid-cols-[100px_1fr] gap-6 items-start">
          <div class="h-24 w-24 rounded-xl bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center">
            <span class="text-white font-bold text-xl">H</span>
          </div>
          <div>
            <h3 class="text-xl font-bold font-heading mb-2">Headspace</h3>
            <p class="text-gray-600 dark:text-gray-300">Calming gradients creating a soothing meditation experience.</p>
          </div>
        </div>
        
        <div class="grid md:grid-cols-[100px_1fr] gap-6 items-start">
          <div class="h-24 w-24 rounded-xl bg-gradient-to-br from-indigo-400 to-purple-600 flex items-center justify-center">
            <span class="text-white font-bold text-xl">D</span>
          </div>
          <div>
            <h3 class="text-xl font-bold font-heading mb-2">Discord</h3>
            <p class="text-gray-600 dark:text-gray-300">Vibrant yet controlled gradients building engaging interactions.</p>
          </div>
        </div>
        
        <div class="grid md:grid-cols-[100px_1fr] gap-6 items-start">
          <div class="h-24 w-24 rounded-xl bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center">
            <span class="text-white font-bold text-xl">N</span>
          </div>
          <div>
            <h3 class="text-xl font-bold font-heading mb-2">Notion</h3>
            <p class="text-gray-600 dark:text-gray-300">Soft gradients used sparingly for highlighting new features and updates.</p>
          </div>
        </div>
        
        <div class="grid md:grid-cols-[100px_1fr] gap-6 items-start">
          <div class="h-24 w-24 rounded-xl bg-gradient-to-br from-pink-400 to-red-500 flex items-center justify-center">
            <span class="text-white font-bold text-xl">A</span>
          </div>
          <div>
            <h3 class="text-xl font-bold font-heading mb-2">Airbnb</h3>
            <p class="text-gray-600 dark:text-gray-300">Elegant gradient use in UI elements guiding navigation and user focus.</p>
          </div>
        </div>
        
        <div class="grid md:grid-cols-[100px_1fr] gap-6 items-start">
          <div class="h-24 w-24 rounded-xl bg-gradient-to-br from-blue-400 to-sky-500 flex items-center justify-center">
            <span class="text-white font-bold text-xl">T</span>
          </div>
          <div>
            <h3 class="text-xl font-bold font-heading mb-2">Trello</h3>
            <p class="text-gray-600 dark:text-gray-300">Clear gradients used for productivity and visual clarity in task management.</p>
          </div>
        </div>
      </div>
      
      <div class="mt-10 bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border-l-4 border-green-500">
        <h3 class="font-bold font-heading text-lg mb-2">Key Takeaways</h3>
        <ul class="list-disc pl-5 space-y-2">
          <li>Gradients can effectively communicate brand personality and values</li>
          <li>They create visual hierarchy and guide user attention</li>
          <li>When used consistently, they enhance brand recognition</li>
          <li>Subtle gradients can improve UI elements without overwhelming content</li>
        </ul>
      </div>
    `
  }
};

// Helper function to get all posts for the index
export const load: PageServerLoad = async ({ setHeaders }) => {
  // Set cache control headers to prevent caching issues
  setHeaders({
    'cache-control': 'no-cache, no-store, must-revalidate',
    'pragma': 'no-cache',
    'expires': '0'
  });

  // Make a copy of the blog posts to avoid reference issues
  const blogPostsCopy = { ..._blogPosts };
  
  // Return all blog posts for the blog index page
  const posts = Object.values(blogPostsCopy).sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  return {
    posts: posts.map(({ content, ...post }) => ({ ...post })) // Return copies to avoid reference issues
  };
};

// Helper function to get a single post by slug
function _getPostBySlug(slug: string): BlogPost | undefined {
  return _blogPosts[slug];
}

// Export the blog posts data for server-side use
export const _blogPostsData = _blogPosts;
