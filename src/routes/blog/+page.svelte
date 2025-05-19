<script lang="ts">
  import type { PageData } from './$types';
  import '$lib/styles/blog.css';
  import BlogPosts from '$lib/components/BlogPosts.svelte';
  
  export let data: PageData;
  const { posts } = data;
</script>

<svelte:head>
  <!-- Primary Meta Tags -->
  <title>Blog — Gradient Texture Generator</title>
  <meta name="description" content="Learn about gradient design, techniques, and inspiration for your projects." />
  <link rel="canonical" href="https://makegradients.app/blog" />
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://makegradients.app/blog" />
  <meta property="og:title" content="Blog — Gradient Texture Generator" />
  <meta property="og:description" content="Learn about gradient design, techniques, and inspiration for your projects." />
  <meta property="og:image" content="https://makegradients.app/images/gradient-preview-social.png" />
  
  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Blog — Gradient Texture Generator" />
  <meta name="twitter:description" content="Learn about gradient design, techniques, and inspiration for your projects." />
  <meta name="twitter:image" content="https://makegradients.app/images/gradient-preview-social.png" />
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
  
  <BlogPosts posts={posts} />
</div>
