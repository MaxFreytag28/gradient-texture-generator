<script lang="ts" context="module">
  // Define the blog post type in module context
  export interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    slug: string;
    gradient: string;
    date?: string;
    content?: string;
  }
</script>

<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  
  // Import blog posts from props
  export let posts: BlogPost[] = [];
  export let showHeading: boolean = true;
  export let headingText: string = "Latest Articles";
  
  // Get the current slug to avoid linking to the current page
  $: currentSlug = $page?.params?.slug;
  
  // Reference to the scroll container
  let scrollContainer: HTMLElement;
  
  // Check if content overflows and needs scrolling
  onMount(() => {
    if (scrollContainer && scrollContainer.parentNode) {
      // Get fade elements
      const leftFade = document.createElement('div');
      const rightFade = document.createElement('div');
      leftFade.className = 'left-fade';
      rightFade.className = 'right-fade';
      scrollContainer.parentNode.appendChild(leftFade);
      scrollContainer.parentNode.appendChild(rightFade);
      
      const checkOverflow = () => {
        const hasOverflow = scrollContainer.scrollWidth > scrollContainer.clientWidth;
        leftFade.style.display = hasOverflow ? 'block' : 'none';
        rightFade.style.display = hasOverflow ? 'block' : 'none';
        
        if (hasOverflow) {
          updateGradients();
        }
      };
      
      const updateGradients = () => {
        // Calculate scroll percentages
        const totalScrollWidth = scrollContainer.scrollWidth - scrollContainer.clientWidth;
        const scrollPercentage = totalScrollWidth > 0 ? scrollContainer.scrollLeft / totalScrollWidth : 0;
        
        // Update left fade size based on scroll position
        const leftFadeWidth = Math.min(2.5, scrollPercentage * 2.5);
        leftFade.style.width = `${leftFadeWidth}rem`;
        leftFade.style.opacity = String(scrollPercentage);
        
        // Update right fade size based on scroll position
        const rightFadeWidth = Math.min(2.5, (1 - scrollPercentage) * 2.5);
        rightFade.style.width = `${rightFadeWidth}rem`;
        rightFade.style.opacity = String(1 - scrollPercentage);
      };
      
      // Add scroll event listener
      scrollContainer.addEventListener('scroll', updateGradients);
      
      // Check on mount and when window resizes
      checkOverflow();
      window.addEventListener('resize', checkOverflow);
      
      return () => {
        window.removeEventListener('resize', checkOverflow);
        scrollContainer.removeEventListener('scroll', updateGradients);
        if (leftFade.parentNode) leftFade.parentNode.removeChild(leftFade);
        if (rightFade.parentNode) rightFade.parentNode.removeChild(rightFade);
      };
    }
  });
  
  // Format date if available
  function formatDate(dateString: string): string {
    if (!dateString) return '';
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
</script>

<div class="py-8 bg-transparent">
  <div class="container mx-auto px-4">
    {#if showHeading}
    <div class="mb-6">
      <div class="flex justify-between items-center">
        <h2 class="theme-heading">{headingText}</h2>
        <a href="/blog" class="text-accent-primary hover:text-accent-primary-dark transition-colors">
          View All
        </a>
      </div>
    </div>
    {/if}
    
    <div class="relative overflow-hidden px-4">
      <div 
        class="flex gap-6 pb-6 overflow-x-auto -mx-4 px-4 snap-x snap-mandatory blog-posts-scroll" 
        bind:this={scrollContainer}
        style="scrollbar-color: var(--color-accent-primary) transparent; scrollbar-width: thin;"
      >
        <style>
          .blog-posts-scroll::-webkit-scrollbar {
            height: 4px;
            background-color: transparent;
          }
          .blog-posts-scroll::-webkit-scrollbar-thumb {
            background-color: var(--color-accent-primary);
            border-radius: 4px;
          }
          .snap-x {
            scroll-snap-type: x mandatory;
          }
          .snap-mandatory > * {
            scroll-snap-align: start;
          }
          /* Fade elements */
          .left-fade, .right-fade {
            position: absolute;
            top: 0;
            bottom: 0;
            width: 0;
            background-color: var(--color-bg-primary);
            pointer-events: none;
            z-index: 1;
            opacity: 0;
            transition: width 0.05s ease-out;
          }
          
          .left-fade {
            left: 0;
            mask-image: linear-gradient(to right, var(--color-bg-primary), transparent);
            -webkit-mask-image: linear-gradient(to right, var(--color-bg-primary), transparent);
          }
          
          .right-fade {
            right: 0;
            mask-image: linear-gradient(to left, var(--color-bg-primary), transparent);
            -webkit-mask-image: linear-gradient(to left, var(--color-bg-primary), transparent);
          }
        </style>
        {#each posts.filter(post => post.slug !== currentSlug) as post}
          <!-- Using standard anchor tag for better SEO and accessibility -->
          <!-- SvelteKit will handle the client-side navigation automatically -->
          <a 
            href={`/blog/${post.slug}`}
            class="flex-shrink-0 w-80 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group block"
            style="background-color: var(--color-bg-secondary);"
          >
            <div class={`h-16 bg-gradient-to-r ${post.gradient}`}></div>
            <div class="p-4">
              <h3 class="text-base mb-2 text-color-text-heading group-hover:text-color-accent-primary transition-colors">
                {post.title}
              </h3>
              <p class="text-color-text-secondary text-sm line-clamp-2 mb-3">
                {post.excerpt}
              </p>
              {#if post.date}
                <div class="text-xs text-color-text-muted mb-2">
                  {formatDate(post.date)}
                </div>
              {/if}
              <div class="inline-flex items-center text-xs font-semibold text-color-accent-primary letter-wide group-hover:text-color-text-heading transition-colors">
                <span>Read more</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </a>
        {/each}
      </div>
      
      <!-- Custom scrollbar styling -->
      <style>
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      </style>
    </div>
  </div>
</div>
