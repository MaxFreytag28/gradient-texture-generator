<script lang="ts">
	import '../app.css';
</script>

<div class="font-sans min-h-screen flex flex-col">
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
