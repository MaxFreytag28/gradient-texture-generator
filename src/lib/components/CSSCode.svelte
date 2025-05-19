<script lang="ts">
  // Props
  export let cssCode: string;
  
  // Events
  export let onCopy: () => void;
  
  // Local state
  let useRgb = true;
  
  // Convert CSS code between RGB and HEX formats
  $: displayCode = useRgb ? cssCode : convertRgbToHex(cssCode);
  
  // Function to convert RGB to HEX in CSS code
  function convertRgbToHex(code: string): string {
    return code.replace(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*([\d.]+))?\s*\)/g, 
      (match, r, g, b, a) => {
        const hex = '#' + 
          parseInt(r).toString(16).padStart(2, '0') + 
          parseInt(g).toString(16).padStart(2, '0') + 
          parseInt(b).toString(16).padStart(2, '0');
        
        return a && parseFloat(a) < 1 ? 
          `${hex}${Math.round(parseFloat(a) * 255).toString(16).padStart(2, '0')}` : 
          hex;
      });
  }
</script>

<div class="theme-card p-4 rounded-lg gradient-border">
  <div class="mb-4">
    <h2 class="text-xl font-semibold theme-heading">CSS</h2>
  </div>
  
  <div class="theme-code font-mono text-sm mb-4">
    <pre class="whitespace-pre-wrap break-all"><code>{displayCode}</code></pre>
  </div>
  
  <!-- Controls row at the bottom -->
  <div class="flex gap-4 items-center">
    <!-- Format toggle - 50% width -->
    <div class="toggle-switch-container w-1/2">
      <div class="toggle-switch w-full" class:hex={!useRgb}>
        <button 
          class="toggle-option" 
          class:active={useRgb}
          onclick={() => useRgb = true}
          type="button"
        >
          RGB
        </button>
        <button 
          class="toggle-option" 
          class:active={!useRgb}
          onclick={() => useRgb = false}
          type="button"
        >
          HEX
        </button>
      </div>
    </div>
    
    <!-- Copy button - 50% width -->
    <button 
      type="button"
      class="theme-button-primary px-3 py-2 rounded text-sm flex items-center justify-center w-1/2"
      onclick={onCopy}
    >
      <span class="mr-1">Copy</span>
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
      </svg>
    </button>
  </div>
</div>

<style>
  .toggle-switch-container {
    display: flex;
    justify-content: flex-start;
  }
  
  .toggle-switch {
    display: flex;
    background-color: var(--color-bg-tertiary);
    border-radius: 0.5rem;
    overflow: hidden;
    position: relative;
    border: 1px solid var(--color-border-primary);
  }
  
  .toggle-option {
    padding: 0.5rem 0.75rem;
    font-size: 0.875rem;
    font-weight: 500;
    border: none;
    background: transparent;
    position: relative;
    cursor: pointer;
    transition: color 0.2s, background-color 0.2s;
    color: var(--color-text-secondary);
    z-index: 1;
    flex: 1;
    text-align: center;
  }
  
  .toggle-option:hover:not(.active) {
    color: var(--color-text-primary);
    background-color: color-mix(in srgb, transparent 90%, var(--color-accent-primary));
  }
  
  .toggle-option.active {
    color: white;
    font-weight: 600;
  }
  
  .toggle-switch::before {
    content: '';
    position: absolute;
    top: 0.125rem;
    left: 0.125rem;
    height: calc(100% - 0.25rem);
    width: calc(50% - 0.25rem);
    background-color: var(--color-bg-accent);
    border-radius: 0.375rem;
    transition: none;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  }
  
  /* Use class-based selector instead of :has for better compatibility */
  .toggle-switch:has(.toggle-option:nth-child(2).active)::before,
  .toggle-switch.hex::before {
    transform: translateX(calc(100% + 0.25rem));
  }
</style>
