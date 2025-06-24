<script lang="ts">
	import '../app.css';
	import '$lib/styles/fonts.css';
	import '$lib/styles/theme.css';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
	import Footer from '$lib/components/Footer.svelte';
	import { page } from '$app/stores';
	import { SITE_URL, SITE_TITLE, SITE_DESCRIPTION, SEO_KEYWORDS, SITE_AUTHOR, SITE_LANGUAGE } from '$lib/config';
	import { faqItems, type FaqItem } from '$lib/components/FaqSection.svelte';

	injectSpeedInsights();

	let { children } = $props();

	// Function to generate canonical URL without www prefix
	function getCanonicalUrl() {
		const path = $page.url.pathname;
		const canonicalPath = path.endsWith('/') && path !== '/' ? path.slice(0, -1) : path;
		return `${SITE_URL}${canonicalPath}`;
	}

	// Determine if current page is homepage
	const isHomepage = $derived($page.url.pathname === '/');

	// Define structured data schemas
	const websiteSchema = {
		"@context": "https://schema.org",
		"@type": "WebSite",
		"name": "MakeGradients.app",
		"url": SITE_URL,
		"description": SITE_DESCRIPTION
	};

	const softwareAppSchema = {
		"@context": "https://schema.org",
		"@type": "SoftwareApplication",
		"name": "MakeGradients.app",
		"offers": {
			"@type": "Offer",
			"price": "0",
			"priceCurrency": "USD"
		},
		"operatingSystem": "All"
	};

	// Prepare FAQ data for structured data
	const faqSchema = {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: faqItems.map((item: FaqItem) => ({
			'@type': 'Question',
			name: item.question,
			acceptedAnswer: {
				'@type': 'Answer',
				text: item.answer
			}
		}))
	};
</script>

<svelte:head>
	<!-- Primary Meta Tags -->
	<title>{SITE_TITLE}</title>
	<meta name="description" content={SITE_DESCRIPTION}>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="keywords" content={SEO_KEYWORDS}>
	<meta name="author" content={SITE_AUTHOR}>
	<meta name="language" content={SITE_LANGUAGE}>
	<meta name="robots" content="index, follow">
	<meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
	<meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
	<link rel="canonical" href={getCanonicalUrl()} />
	<link rel="apple-touch-icon" href="/images/apple-touch-icon.png">
	
	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website">
	<meta property="og:url" content={getCanonicalUrl()}>
	<meta property="og:title" content={SITE_TITLE}>
	<meta property="og:description" content={SITE_DESCRIPTION}>

	<meta property="og:site_name" content="MakeGradients.app">
	<meta property="og:locale" content="en_US">
	
	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image">
	<meta property="twitter:url" content={getCanonicalUrl()}>
	<meta property="twitter:title" content={SITE_TITLE}>
	<meta property="twitter:description" content={SITE_DESCRIPTION}>

	<meta name="twitter:creator" content="@makegradients">
	
	<!-- Fonts -->
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
	<!-- Urbanist from Google Fonts -->
	<link href="https://fonts.googleapis.com/css2?family=Urbanist:wght@400;600;700&display=swap" rel="stylesheet">
	<!-- Cal Sans from Google Fonts -->
	<!-- Cal Sans is already imported in app.html -->
	
	<!-- Structured Data - Website & Other Structured Data (only on homepage) -->
	{#if isHomepage}
		<script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
		<script type="application/ld+json">{JSON.stringify(softwareAppSchema)}</script>
		<script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
	{/if}
</svelte:head>

<div class="min-h-screen flex flex-col">
	<main class="flex-grow">
		{@render children()}
	</main>
	<Footer />
</div>


