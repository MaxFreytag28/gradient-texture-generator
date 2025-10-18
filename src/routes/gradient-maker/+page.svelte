<script lang="ts">
  // SEO-optimized page for "gradient maker" keyword
  // Reuses the exact same tool as homepage
  import Homepage from '../+page.svelte';
  import { SITE_URL } from '$lib/config';
  
  const props = $props();
</script>

<svelte:head>
  <title>Gradient Maker - Free Online Tool to Make Gradients</title>
  <meta name="description" content="Free gradient maker tool for creating beautiful CSS gradients. Make linear, radial, and conic gradients online. Export as CSS, PNG, SVG, or WebP.">
  <meta name="keywords" content="gradient maker, make gradient, online gradient maker, free gradient maker, css gradient maker, gradient tool">
  <link rel="canonical" href="{SITE_URL}/gradient-maker" />
  
  <meta property="og:title" content="Gradient Maker - Free Online Tool to Make Gradients">
  <meta property="og:description" content="Free gradient maker tool for creating beautiful CSS gradients. Make linear, radial, and conic gradients online.">
  <meta property="og:url" content="{SITE_URL}/gradient-maker">
  
  <meta property="twitter:title" content="Gradient Maker - Free Online Tool to Make Gradients">
  <meta property="twitter:description" content="Free gradient maker tool for creating beautiful CSS gradients. Make linear, radial, and conic gradients online.">
</svelte:head>

<Homepage data={props.data} />
