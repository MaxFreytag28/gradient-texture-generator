<script lang="ts">
  import { type RadialGradientOptions } from '$lib/types';
  
  // Props
  export let radialOptions: RadialGradientOptions;
  export let onScaleChange: (newScale: number) => void;
  
  // Handle scale change
  function handleScaleChange(e: Event) {
    const input = e.target as HTMLInputElement;
    const newScale = parseFloat(input.value);
    onScaleChange(newScale);
  }
</script>

<div class="mb-6">
  <div class="flex justify-between items-center mb-2">
    <label for="scale-slider" class="block text-sm font-medium" style="color: var(--color-text-secondary);">Radius Scale</label>
    <div class="flex items-center">
      <input 
        id="scale-number"
        type="number" 
        min="10" 
        max="200" 
        step="5"
        value={(radialOptions.scale * 100).toFixed(0)}
        on:input={(e) => {
          const value = parseInt(e.currentTarget.value);
          if (!isNaN(value)) {
            onScaleChange(value / 100);
          }
        }}
        class="w-16 text-right px-2 py-1 rounded text-sm"
        style="background-color: var(--color-bg-tertiary); color: var(--color-text-primary); border: 1px solid var(--color-border-secondary);"
      />
      <span class="ml-1 text-sm theme-text-muted">%</span>
    </div>
  </div>
  <input 
    id="scale-slider"
    type="range" 
    min="0.1" 
    max="2" 
    step="0.05" 
    value={radialOptions.scale} 
    on:input={handleScaleChange}
    class="w-full h-2 rounded-lg appearance-none cursor-pointer"
    style="background-color: var(--color-bg-tertiary); accent-color: var(--color-accent-primary);"
    aria-label="Radius scale slider"
    title="Drag to adjust gradient radius scale"
  />
  <div class="flex justify-between text-xs theme-text-muted mt-1">
    <span>10%</span>
    <span>100%</span>
    <span>200%</span>
  </div>
</div>
