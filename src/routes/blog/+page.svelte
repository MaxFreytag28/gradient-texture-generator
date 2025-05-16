<script lang="ts">
  import type { PageData } from './$types';
  import '$lib/styles/blog.css';
  import BlogPosts from '$lib/components/BlogPosts.svelte';
  
  export let data: PageData;
  const { posts } = data;
</script>

<svelte:head>
  <title>Blog — Gradient Texture Generator</title>
  <meta name="description" content="Learn about gradient design, techniques, and inspiration for your projects." />
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
