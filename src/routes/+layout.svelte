<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<div class="font-sans">
	{@render children()}
</div>
