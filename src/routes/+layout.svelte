<script lang="ts">
	import '../app.css';
	import '$lib/styles/fonts.css';
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
	<!-- Urbanist from Google Fonts -->
	<link href="https://fonts.googleapis.com/css2?family=Urbanist:wght@400;600;700&display=swap" rel="stylesheet">
	<!-- Chivo from Google Fonts -->
	<link href="https://fonts.googleapis.com/css2?family=Chivo:wght@500;600;700&display=swap" rel="stylesheet">
	<style>
		body {
			font-family: 'Urbanist', sans-serif !important;
		}
		h1, h2, h3, h4, h5, h6, .font-heading {
			font-family: 'Chivo', sans-serif !important;
			font-weight: 600;
		}
		h1, h2, h3 {
			text-transform: uppercase;
			letter-spacing: -0.02em;
			font-weight: 700;
		}
		button.font-heading {
			letter-spacing: 0.06em;
			font-weight: 600;
		}
	</style>
</svelte:head>

<div class="min-h-screen flex flex-col">
	<main class="flex-grow">
		<slot></slot>
	</main>
	
	<footer class="text-center text-sm py-6 mt-8 border-t border-gray-200 bg-gray-50">
		<div class="container mx-auto px-4">
			<a href="/legal" class="text-gray-600 hover:text-gray-900 mx-2">Legal Disclosure</a> · 
			<a href="/privacy" class="text-gray-600 hover:text-gray-900 mx-2">Privacy Policy</a>
		</div>
	</footer>
</div>
