<script lang="ts">
  import { onMount, afterUpdate } from 'svelte';
  import { page } from '$app/stores';
  import type { PageData } from './$types';
  import '$lib/styles/blog.css';
  import BlogPosts from '$lib/components/BlogPosts.svelte';
  
  export let data: PageData;
  
  // Destructure the data
  let { post, relatedPosts, slug } = data;
  
  // This will run whenever the data prop changes (on navigation)
  $: if (data) {
    post = data.post;
    relatedPosts = data.relatedPosts;
    slug = data.slug;
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  // Calculate reading time
  const getReadingTime = (content: string): string => {
    if (!content) return '0 min read';
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };
  
  // Handle anchor links in markdown content
  function handleAnchorClick(e: MouseEvent) {
    const target = e.target as HTMLElement;
    if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
      e.preventDefault();
      const id = target.getAttribute('href')?.substring(1);
      if (id) {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  }
  
  // Set up event listeners after the component mounts or updates
  function setupEventListeners() {
    const content = document.querySelector('.blog-post-content');
    if (content) {
      content.addEventListener('click', handleAnchorClick as EventListener);
      return () => {
        content.removeEventListener('click', handleAnchorClick as EventListener);
      };
    }
  }
  
  // Set up event listeners on mount and after updates
  onMount(setupEventListeners);
  afterUpdate(setupEventListeners);
  
  // Reset scroll position when the post changes
  $: if (post?.slug) {
    // Scroll to top when post changes
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  };
</script>

<svelte:head>
  <!-- Primary Meta Tags -->
  <title>{post.title} — Gradient Texture Generator</title>
  <meta name="description" content={post.excerpt} />
  <link rel="canonical" href={`https://makegradients.app/blog/${post.slug}`} />
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="article" />
  <meta property="og:title" content={post.title} />
  <meta property="og:description" content={post.excerpt} />
  <meta property="og:url" content={`https://makegradients.app/blog/${post.slug}`} />

  
  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={post.title} />
  <meta name="twitter:description" content={post.excerpt} />

  
  <!-- Viewport -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  
  <!-- Structured Data -->
  {#if data?.post}
    <!-- BlogPosting structured data -->
    <script type="application/ld+json">{JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": data.post.title,
      "description": data.post.excerpt,
      "datePublished": data.post.date,
      "dateModified": data.post.date,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://makegradients.app/blog/${data.post.slug}`
      },
      "publisher": {
        "@type": "Organization",
        "name": "MakeGradients.app",
        "logo": {
          "@type": "ImageObject",
          "url": `https://makegradients.app/favicon.ico`
        }
      },
      "inLanguage": "en-US",
      "keywords": [
        "CSS gradients",
        "web design",
        "gradient generator",
        "web development",
        ...data.post.title.toLowerCase().split(' ').slice(0, 3)
      ],
      "wordCount": data.post.content.split(/\s+/).length
    })}</script>
  {/if}
</svelte:head>

<div class="blog-container">
  <article class="blog-post">
    <!-- Post Header -->
    <header class="blog-post-header">
      <a href="/" class="blog-back-link" style="color: var(--color-text-heading);">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
        </svg>
        Back to Home
      </a>
      
      <h1 class="blog-post-title">{post.title}</h1>
      
      <div class="blog-post-meta">
        <div class="blog-post-date">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
          </svg>
          <time datetime={post.date}>{formatDate(post.date)}</time>
        </div>
        
        <div class="blog-post-reading-time">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
          </svg>
          <span>{getReadingTime(post.content)}</span>
        </div>
      </div>
    </header>
    
    <!-- Post Gradient Banner -->
    <div class="blog-post-gradient bg-gradient-to-r {post.gradient}"></div>
    
    
    <!-- Post Content -->
    <div class="blog-post-content">
      {@html post.content}
    </div>
    
    <!-- No social sharing buttons -->
    
    <!-- Related Posts -->
    {#if relatedPosts && relatedPosts.length > 0}
      <div class="blog-related-posts">
        <BlogPosts posts={relatedPosts} headingText="More Articles" />
      </div>
    {/if}
  </article>
</div>
