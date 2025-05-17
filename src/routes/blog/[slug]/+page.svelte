<script lang="ts">
  import { onMount } from 'svelte';
  import type { PageData } from './$types';
  import '$lib/styles/blog.css';
  import BlogPosts from '$lib/components/BlogPosts.svelte';
  
  export let data: PageData;
  const { post, relatedPosts } = data;
  
  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  // Calculate reading time
  const getReadingTime = (content: string): string => {
    const wordsPerMinute = 200;
    const words = content?.split(/\s+/).length || 0;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };
  
  // No table of contents needed for short posts
  
  onMount(() => {
    
    // Get the content container for anchor link handling
    const content = document.querySelector('.blog-post-content');
    
    // Handle anchor links in markdown content
    const handleAnchorClick = (e: MouseEvent) => {
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
    };
    
    // Add click event listener to the content container
    if (content) {
      content.addEventListener('click', handleAnchorClick as EventListener);
      
      // Cleanup
      return () => {
        content.removeEventListener('click', handleAnchorClick as EventListener);
      };
    }
  });
  
  // No social sharing functions needed
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
  <meta property="og:image" content={`https://makegradients.app/blog/og-${post.slug}.jpg`} />
  
  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={post.title} />
  <meta name="twitter:description" content={post.excerpt} />
  <meta name="twitter:image" content={`https://makegradients.app/blog/og-${post.slug}.jpg`} />
  
  <!-- Viewport -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
