<script lang="ts">
  import ColorStop from './ColorStop.svelte';
  import { type ColorStop as ColorStopType } from '$lib/types';
  
  // Props
  export let colorStops: ColorStopType[];
  export let selectedStopId: string | null = null;
  
  // DOM reference for getting bar dimensions
  let colorStopBar: HTMLElement;
  
  // Events - all using stopId for consistency
  export let onColorStopSelect: (stopId: string, event?: MouseEvent) => void;
  export let onColorStopRemove: (stopId: string) => void;
  export let onColorStopAdd: (event: MouseEvent) => void;
  export let onColorStopDragStart: (event: MouseEvent | TouchEvent, stopId: string) => void;
  export let onColorStopPositionChange: (stopId: string, position: number) => void;
  
  // Helper function to get gradient CSS
  function getGradientCSS(): string {
    const gradientType = 'linear';
    const gradientDirection = 'to right';
    
    // Sort color stops by position for the CSS gradient
    const sortedStops = [...colorStops].sort((a, b) => a.position - b.position);
    
    const colorStopCSS = sortedStops.map(stop => {
      const rgb = hexToRgb(stop.color);
      return `rgba(${rgb}, ${stop.alpha}) ${stop.position}%`;
    }).join(', ');
    
    return `${gradientType}-gradient(${gradientDirection}, ${colorStopCSS})`;
  }
  
  // Helper function to convert hex to rgb
  function hexToRgb(hex: string): string {
    // Remove # if present
    hex = hex.replace('#', '');
    
    // Parse the hex values
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    return `${r}, ${g}, ${b}`;
  }
  
  // Get the bar rect for position calculations
  export function getBarRect(): DOMRect | null {
    if (!colorStopBar) return null;
    return colorStopBar.getBoundingClientRect();
  }
</script>

<div class="mt-4">
  <div class="relative">
    <!-- Container for color stops that extends beyond the bar edges -->
    <div class="relative h-10 mb-6 mt-6">
      <!-- The actual gradient bar -->
      <div 
        class="relative h-10 rounded-md color-stop-bar"
        style="border: 1px solid var(--color-border-secondary);"
        bind:this={colorStopBar}
      >
        <!-- Checkerboard pattern for transparency -->
        <div class="absolute inset-0 bg-checkerboard overflow-hidden"></div>
        
        <!-- Gradient overlay -->
        <div 
          class="absolute inset-0 z-[1] overflow-hidden"
          style={`background: ${getGradientCSS()};`}
          onclick={onColorStopAdd}
          ondblclick={onColorStopAdd}
          onkeydown={(e) => e.key === 'Enter' && onColorStopAdd(e as unknown as MouseEvent)}
          role="button"
          tabindex="0"
          aria-label="Click to add a color stop"
        >
        </div>
        
        <!-- Color stops -->
        {#each colorStops as stop}
          <ColorStop 
            {stop}
            isSelected={selectedStopId === stop.id}
            onSelect={onColorStopSelect}
            onRemove={onColorStopRemove}
            onDragStart={onColorStopDragStart}
            updateStopPosition={onColorStopPositionChange}
          />
        {/each}
      </div>
    </div>
  </div>
  <!-- Instructions moved to main page -->
</div>

<style>
  .bg-checkerboard {
    background-image: linear-gradient(45deg, #444 25%, transparent 25%),
                      linear-gradient(-45deg, #444 25%, transparent 25%),
                      linear-gradient(45deg, transparent 75%, #444 75%),
                      linear-gradient(-45deg, transparent 75%, #444 75%);
    background-size: 16px 16px;
    background-position: 0 0, 0 8px, 8px -8px, -8px 0px;
  }
</style>
