<script>
  // No need to import app.css as it's already imported in the layout
  import { page } from '$app/stores';
  
  // Set the page metadata
  $: meta = {
    title: 'Legal Disclosure - Gradient Texture Generator',
    description: 'Legal information and disclosure for MakeGradients.app',
    url: 'https://makegradients.app/legal',
    image: 'https://makegradients.app/images/gradient-preview-social.png'
  };
  
  // Update the page metadata
  $page.data.meta = meta;
</script>

<svelte:head>
  <!-- Primary Meta Tags -->
  <title>{meta.title}</title>
  <meta name="description" content={meta.description} />
  <link rel="canonical" href={meta.url} />
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content={meta.url} />
  <meta property="og:title" content={meta.title} />
  <meta property="og:description" content={meta.description} />
  <meta property="og:image" content={meta.image} />
  
  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={meta.title} />
  <meta name="twitter:description" content={meta.description} />
  <meta name="twitter:image" content={meta.image} />
  
  <!-- Viewport -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</svelte:head>

<div class="container mx-auto px-4 py-8 max-w-3xl">
  <h1 class="text-3xl font-semibold mb-6 theme-heading">Legal Disclosure</h1>

  <p class="mb-4"><strong>Information pursuant to § 5 TMG</strong></p>
  <p class="mb-4">
    Max Freytag<br>
    Valparaisostraße 6<br>
    22761 Hamburg<br>
    Germany
  </p>

  <p class="mb-4">
    <strong>Contact</strong><br>
    Email: <a href="mailto:maxfreytag-app@outlook.com" class="text-blue-600 hover:underline">maxfreytag-app@outlook.com</a>
  </p>

  <p class="mb-4">
    <strong>Responsible for content according to § 55 Abs. 2 RStV:</strong><br>
    Max Freytag (address as above)
  </p>

  <p class="mb-4">This is a private project and not a registered business.</p>
  
  <div class="mt-8">
    <a href="/" class="text-blue-600 hover:underline">← Back to Home</a>
  </div>
</div>
