<script lang="ts">
	import '../app.css';
	import '$lib/styles/fonts.css';
	import '$lib/styles/theme.css';
</script>

<svelte:head>
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
