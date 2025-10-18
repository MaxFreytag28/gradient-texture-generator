<script module lang="ts">
  // Define the type for an FAQ item
  export type FaqItem = {
    question: string;
    answer: string;
  };

  // FAQ data structure
  export const faqItems: FaqItem[] = [
    {
      question: "What is makegradients.app used for?",
      answer: "It's a minimalist tool that helps designers, developers, and artists quickly generate gradients. You can export them in multiple formats like CSS, SVG, PNG, JPG, or WebP, fitting almost any digital project."
    },
    {
      question: "Is this gradient maker free to use?",
      answer: "Yes, this gradient maker is completely free with no signup required. Create unlimited gradients and export them in any format without restrictions."
    },
    {
      question: "How do I create gradients with this tool?",
      answer: "Creating gradients is simple: choose your gradient type (linear, radial, or conic), click the color bar to add color stops, adjust colors and positions, then export. The gradient preview updates in real-time as you make changes."
    },
    {
      question: "What's the difference between a gradient app and CSS gradients?",
      answer: "A gradient app like makegradients.app generates CSS gradient code for you visually. Instead of writing CSS gradient syntax manually, you design it visually and get the code automatically. You can also export as images for use outside of web projects."
    },
    {
      question: "Can I export PNG gradients for use in other applications?",
      answer: "Yes! You can export your gradients as PNG, JPG, WebP, or SVG files in any resolution. This makes them perfect for graphic design, 3D textures, game development, and print projects."
    },
    {
      question: "Can gradients from makegradients.app be used commercially?",
      answer: "Absolutely! All gradients you create can be freely used in personal or commercial projects with no restrictions or attributions needed."
    },
    {
      question: "How customizable are the gradients?",
      answer: "You can fully adjust colors, angles, and gradient types to precisely match your project's style. The intuitive interface lets you quickly experiment and export the perfect gradient."
    },
    {
      question: "What gradient types can I create with this gradient tool?",
      answer: "You can create linear gradients (straight color transitions), radial gradients (circular color transitions), and conic gradients (angular color transitions). Each type offers full control over colors, positions, angles, and opacity."
    },
    {
      question: "Is makegradients.app optimized for mobile devices?",
      answer: "Currently, it's best used on desktop browsers, though basic functionality does work on tablets. Improved mobile compatibility is planned, but for now, desktops offer the smoothest experience."
    },
    {
      question: "Do I need design skills to use makegradients.app effectively?",
      answer: "Not at all. The tool is designed to be intuitive even for complete beginners, helping anyone create visually pleasing gradients effortlessly."
    },
    {
      question: "Can I convert PNG to SVG with gradient?",
      answer: "While this tool creates gradients from scratch rather than converting existing images, you can recreate any gradient visually and export it as SVG. For true PNG to SVG conversion, you'd need specialized tracing software."
    },
    {
      question: "How do I make gradient backgrounds for websites?",
      answer: "Create your gradient in the tool, then copy the CSS code provided. Paste this code into your website's CSS file using the 'background' property. The gradient will work perfectly across all modern browsers."
    }
  ];
</script>

<script lang="ts">
  // FAQ section with a single accordion for the entire section
  
  // Track if the FAQ section is open or closed
  let isFaqOpen = $state(false);
  
  // Toggle FAQ section open/closed
  function toggleFaq(): void {
    isFaqOpen = !isFaqOpen;
  }
</script>

<section class="w-full py-4 theme-text-muted border-t" style="border-color: var(--color-border-primary);">
  <div class="container mx-auto px-4 max-w-3xl">
    <button 
      class="w-full text-left py-2 flex justify-between items-center focus:outline-none rounded-md mx-auto max-w-xs"
      onclick={toggleFaq}
      aria-expanded={isFaqOpen}
      style="background-color: var(--color-bg-secondary); padding-left: 1rem; padding-right: 1rem;"
    >
      <span class="text-sm font-medium">Frequently Asked Questions</span>
      <svg 
        class="w-3 h-3 opacity-60 transition-transform duration-200" 
        style="transform: rotate({isFaqOpen ? '180deg' : '0deg'});"
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        stroke-width="2" 
        stroke-linecap="round" 
        stroke-linejoin="round"
      >
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    </button>
    
    {#if isFaqOpen}
      <div class="text-xs mt-3 rounded-md p-3 space-y-3" style="background-color: var(--color-bg-secondary);">
        {#each faqItems as item}
          <div class="mb-2">
            <h3 class="font-medium mb-1">{item.question}</h3>
            <p class="opacity-70 leading-relaxed">{item.answer}</p>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</section>

<style>
  section {
    border-top: 1px solid var(--color-border-primary);
  }
</style>
