<script lang="ts">
	import '../app.css';
	import '$lib/styles/fonts.css';
	import '$lib/styles/theme.css';
</script>

<svelte:head>
	<!-- Primary Meta Tags -->
	<title>MakeGradients.app | Generate & Export Custom Web Gradients</title>
	<meta name="description" content="Create stunning linear, radial, and conic gradients in your browser. Export them as CSS, SVG, or PNG for your UI, code, or design work.">
	<link rel="apple-touch-icon" href="/images/apple-touch-icon.png">
	
	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website">
	<meta property="og:url" content="https://makegradients.app/">
	<meta property="og:title" content="MakeGradients.app | Generate & Export Custom Web Gradients">
	<meta property="og:description" content="Create stunning linear, radial, and conic gradients in your browser. Export them as CSS, SVG, or PNG for your UI, code, or design work.">
	<meta property="og:image" content="https://makegradients.app/images/gradient-preview-social.png">
	
	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image">
	<meta property="twitter:url" content="https://makegradients.app/">
	<meta property="twitter:title" content="MakeGradients.app | Generate & Export Custom Web Gradients">
	<meta property="twitter:description" content="Create stunning linear, radial, and conic gradients in your browser. Export them as CSS, SVG, or PNG for your UI, code, or design work.">
	<meta property="twitter:image" content="https://makegradients.app/images/gradient-preview-social.png">
	
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
	
	<footer class="text-center text-sm py-6 mt-8 border-t theme-text-muted" style="border-color: var(--color-border-primary); background-color: var(--color-bg-tertiary);">
		<div class="container mx-auto px-4">
			<a href="/legal" class="mx-2 hover:text-white" style="color: var(--color-text-secondary);">Legal Disclosure</a> · 
			<a href="/privacy" class="mx-2 hover:text-white" style="color: var(--color-text-secondary);">Privacy Policy</a>
		</div>
	</footer>
</div>
