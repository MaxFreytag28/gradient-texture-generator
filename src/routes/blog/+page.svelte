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
    <h1 class="text-3xl md:text-4xl font-bold font-heading tracking-tight letter-spacing--0.02em uppercase mb-4">Blog</h1>
    <p class="text-lg text-color-text-secondary max-w-2xl mx-auto">
      Discover tips, techniques, and inspiration for creating beautiful gradient textures for your projects.
    </p>
  </header>
  
  <BlogPosts posts={posts} />
</div>
