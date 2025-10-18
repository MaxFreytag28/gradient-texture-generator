<script lang="ts">
  // SEO-optimized page for "gradient app" keyword
  // Reuses the exact same tool as homepage
  import Homepage from '../+page.svelte';
  import { SITE_URL } from '$lib/config';
  
  const props = $props();
</script>

<svelte:head>
  <title>Gradient App - Free Online Gradient Generator Tool</title>
  <meta name="description" content="Free gradient app for creating stunning CSS gradients. Design linear, radial, and conic gradients with our online gradient generator tool. Export as CSS or images.">
  <meta name="keywords" content="gradient app, gradients app, online gradient app, free gradient app, css gradient app, gradient generator app">
  <link rel="canonical" href="{SITE_URL}/gradient-app" />
  
  <meta property="og:title" content="Gradient App - Free Online Gradient Generator Tool">
  <meta property="og:description" content="Free gradient app for creating stunning CSS gradients. Design linear, radial, and conic gradients with our online gradient generator tool.">
  <meta property="og:url" content="{SITE_URL}/gradient-app">
  
  <meta property="twitter:title" content="Gradient App - Free Online Gradient Generator Tool">
  <meta property="twitter:description" content="Free gradient app for creating stunning CSS gradients. Design linear, radial, and conic gradients with our online gradient generator tool.">
</svelte:head>

<Homepage data={props.data} />
