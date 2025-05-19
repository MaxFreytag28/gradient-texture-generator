<script lang="ts">
	import '../app.css';
	import '$lib/styles/fonts.css';
	import '$lib/styles/theme.css';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
	import Footer from '$lib/components/Footer.svelte';
	import { page } from '$app/stores';
	import { SITE_URL, SITE_TITLE, SITE_DESCRIPTION } from '$lib/config';

	injectSpeedInsights();

	// Function to generate canonical URL without www prefix
	function getCanonicalUrl() {
		const path = $page.url.pathname;
		const canonicalPath = path.endsWith('/') && path !== '/' ? path.slice(0, -1) : path;
		return `${SITE_URL}${canonicalPath}`;
	}
</script>

<svelte:head>
	<!-- Primary Meta Tags -->
	<title>{SITE_TITLE}</title>
	<meta name="description" content={SITE_DESCRIPTION}>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="canonical" href={getCanonicalUrl()} />
	<link rel="apple-touch-icon" href="/images/apple-touch-icon.png">
	
	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website">
	<meta property="og:url" content={getCanonicalUrl()}>
	<meta property="og:title" content={SITE_TITLE}>
	<meta property="og:description" content={SITE_DESCRIPTION}>
	<meta property="og:image" content={`${SITE_URL}/images/gradient-preview-social.png`}>
	
	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image">
	<meta property="twitter:url" content={getCanonicalUrl()}>
	<meta property="twitter:title" content={SITE_TITLE}>
	<meta property="twitter:description" content={SITE_DESCRIPTION}>
	<meta property="twitter:image" content={`${SITE_URL}/images/gradient-preview-social.png`}>
	
	<!-- Fonts -->
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
	<!-- Urbanist from Google Fonts -->
	<link href="https://fonts.googleapis.com/css2?family=Urbanist:wght@400;600;700&display=swap" rel="stylesheet">
	<!-- Cal Sans from Google Fonts -->
	<!-- Cal Sans is already imported in app.html -->
</svelte:head>

<div class="min-h-screen flex flex-col">
	<main class="flex-grow">
		<slot></slot>
	</main>
	<Footer />
</div>


