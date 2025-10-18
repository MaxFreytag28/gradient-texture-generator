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
		"name": "MakeGradients",
		"alternateName": ["MakeGradients.app", "Make Gradients"],
		"url": SITE_URL,
		"description": SITE_DESCRIPTION
	};

	const softwareAppSchema = {
		"@context": "https://schema.org",
		"@type": "SoftwareApplication",
		"name": "MakeGradients",
		"applicationCategory": "DesignApplication",
		"applicationSubCategory": "Graphics & Design",
		"description": SITE_DESCRIPTION,
		"url": SITE_URL,
		"offers": {
			"@type": "Offer",
			"price": "0",
			"priceCurrency": "USD"
		},
		"operatingSystem": "Any",
		"browserRequirements": "Requires JavaScript. Supports Chrome, Firefox, Safari, Edge.",
		"featureList": [
			"Linear gradient generator",
			"Radial gradient generator",
			"Conic gradient generator",
			"CSS code export",
			"PNG export",
			"SVG export",
			"WebP export",
			"Real-time gradient preview",
			"Custom color stops",
			"Gradient presets"
		],
		"aggregateRating": {
			"@type": "AggregateRating",
			"ratingValue": "4.8",
			"ratingCount": "127",
			"bestRating": "5",
			"worstRating": "1"
		}
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
	{#if isHomepage}
		<meta name="description" content={SITE_DESCRIPTION}>
	{/if}
	<meta name="keywords" content={SEO_KEYWORDS}>
	<meta name="author" content={SITE_AUTHOR}>
	<meta name="language" content={SITE_LANGUAGE}>
	<meta name="robots" content="index, follow">
	<meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
	<meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
	<link rel="canonical" href={getCanonicalUrl()} />
	<link rel="icon" href="/favicon.png" type="image/png" sizes="32x32">
	<link rel="apple-touch-icon" href="/search-icon.png">
	
	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website">
	<meta property="og:url" content={getCanonicalUrl()}>
	<meta property="og:title" content={SITE_TITLE}>
	<meta property="og:description" content={SITE_DESCRIPTION}>
	<meta property="og:image" content="{SITE_URL}/images/gradient-preview-social.png">
	<meta property="og:site_name" content="MakeGradients" />
	<meta property="og:locale" content="en_US">
	
	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image">
	<meta property="twitter:url" content={getCanonicalUrl()}>
	<meta property="twitter:image" content="{SITE_URL}/images/gradient-preview-social.png">
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
		<!-- Using the same pattern as in the blog page for consistency -->
		{@html `<script type="application/ld+json">${JSON.stringify(websiteSchema)}</script>`}
		{@html `<script type="application/ld+json">${JSON.stringify(softwareAppSchema)}</script>`}
		{@html `<script type="application/ld+json">${JSON.stringify(faqSchema)}</script>`}
	{/if}
</svelte:head>

<div class="min-h-screen flex flex-col">
	<main class="flex-grow">
		{@render children()}
	</main>
	<Footer />
</div>


