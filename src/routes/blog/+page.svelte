<script lang="ts">
  import type { PageData } from './$types';
  import '$lib/styles/blog.css';
  import { SITE_URL } from '$lib/config';
  
  export let data: PageData;
  const { posts } = data;
  
  function formatDate(dateString: string): string {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  }
</script>

<svelte:head>
  <!-- Primary Meta Tags -->
  <title>Gradient Design Tips & Tutorials | MakeGradients Blog</title>
  <meta name="description" content="Learn gradient design techniques, CSS tricks, and best practices for creating stunning web and graphic designs with our gradient maker tutorials." />
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content={`${SITE_URL}/blog`} />
  <meta property="og:title" content="Gradient Design Tips & Tutorials | MakeGradients Blog" />
  <meta property="og:description" content="Learn gradient design techniques, CSS tricks, and best practices for creating stunning web and graphic designs." />
  <meta property="og:image" content={`${SITE_URL}/images/gradient-preview-social.png`} />
  
  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Gradient Design Tips & Tutorials | MakeGradients Blog" />
  <meta name="twitter:description" content="Learn gradient design techniques, CSS tricks, and best practices for creating stunning web and graphic designs." />
  <meta name="twitter:image" content={`${SITE_URL}/images/gradient-preview-social.png`} />
</svelte:head>

<div class="blog-container">
  <header class="blog-header">
    <a href="/" class="blog-back-link" style="color: var(--color-text-heading); display: flex; align-items: center; margin-bottom: 1.5rem; font-size: 0.95rem;">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" style="width: 20px; height: 20px; margin-right: 0.5rem;">
        <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
      </svg>
      Back to Home
    </a>
    
    <h1 class="text-3xl md:text-4xl font-bold font-heading tracking-tight letter-spacing--0.02em uppercase mb-4">Blog</h1>
    <p class="text-lg text-color-text-secondary max-w-2xl mx-auto">
      Discover tips, techniques, and inspiration for creating beautiful gradient textures for your projects.
    </p>
  </header>
  
  <div class="container mx-auto px-4 py-8">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
      {#each posts as post}
        <a 
          href={`/blog/${post.slug}`}
          class="rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group block"
          style="background-color: var(--color-bg-secondary);"
        >
          <div class={`h-32 bg-gradient-to-r ${post.gradient}`}></div>
          <div class="p-5">
            <h3 class="text-base font-semibold mb-2 theme-heading group-hover:text-accent-primary transition-colors">
              {post.title}
            </h3>
            <p class="text-sm theme-text-muted line-clamp-3 mb-3">
              {post.excerpt}
            </p>
            {#if post.date}
              <div class="text-xs theme-text-muted mb-3">
                {formatDate(post.date)}
              </div>
            {/if}
            <div class="inline-flex items-center text-xs font-semibold text-accent-primary group-hover:opacity-80 transition-opacity">
              <span>Read article</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </a>
      {/each}
    </div>
  </div>
</div>

<style>
  .line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>
