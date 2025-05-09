<script lang="ts">
  import { type ColorStop as ColorStopType } from '$lib/types';
  import { onMount, onDestroy } from 'svelte';
  import iro from '@jaames/iro';
  
  // Props
  export let selectedStop: ColorStopType;
  export let onColorChange: (updatedStop: ColorStopType) => void;
  
  // Local state to track changes
  let localColor = selectedStop?.color || '#000000';
  let localAlpha = selectedStop?.alpha || 1;
  let localPosition = selectedStop?.position || 0;
  
  // Reference to the color picker element
  let colorPickerElement: HTMLElement;
  let colorPicker: any;
  
  // Track the previous selected stop to avoid unnecessary updates
  let prevStopId: string | null = null;
  
  // Update only when the selected stop actually changes (by ID)
  $: if (selectedStop && (prevStopId !== selectedStop.id)) {
    prevStopId = selectedStop.id;
    localColor = selectedStop.color;
    localAlpha = selectedStop.alpha;
    localPosition = selectedStop.position;
    
    // Update color picker if it exists
    if (colorPicker) {
      try {
        colorPicker.color.hexString = localColor;
        colorPicker.color.alpha = localAlpha;
      } catch (e) {
        console.error('Error updating color picker:', e);
      }
    }
  }
  
  // Initialize color picker
  onMount(() => {
    if (colorPickerElement) {
      try {
        // Create initial color
        const initialColor = new iro.Color();
        initialColor.hexString = localColor;
        initialColor.alpha = localAlpha;
        
        // Create color picker
        // @ts-ignore
        colorPicker = new iro.ColorPicker(colorPickerElement, {
          width: 200,
          color: initialColor,
          layoutDirection: 'horizontal',
          layout: [
            { component: iro.ui.Box },
            { 
              component: iro.ui.Slider,
              options: { sliderType: 'hue', sliderSize: 22 }
            },
            { 
              component: iro.ui.Slider,
              options: { sliderType: 'alpha', sliderSize: 22 }
            }
          ]
        });
        
        // Listen for color changes
        colorPicker.on('color:change', (color: any) => {
          localColor = color.hexString;
          localAlpha = color.alpha;
          notifyChange();
        });
        
        console.log('Color picker initialized');
      } catch (e) {
        console.error('Error initializing color picker:', e);
      }
    }
  });
  
  // Clean up on destroy
  onDestroy(() => {
    if (colorPicker) {
      try {
        colorPicker.off('color:change');
      } catch (e) {
        console.error('Error cleaning up color picker:', e);
      }
    }
  });
  
  // Notify parent of changes
  function notifyChange() {
    if (!selectedStop) return;
    
    const updatedStop: ColorStopType = {
      id: selectedStop.id,
      color: localColor,
      alpha: localAlpha,
      position: localPosition
    };
    
    onColorChange(updatedStop);
  }
  
  // Handle hex input change
  function handleHexChange(e: Event) {
    const target = e.target as HTMLInputElement;
    if (target) {
      localColor = target.value;
      if (colorPicker) {
        try {
          colorPicker.color.hexString = localColor;
        } catch (e) {
          console.error('Error updating color picker from hex input:', e);
        }
      }
      notifyChange();
    }
  }
  
  // Copy color to clipboard
  function copyColorToClipboard() {
    navigator.clipboard.writeText(localColor)
      .then(() => {
        console.log('Color copied to clipboard');
      })
      .catch(err => {
        console.error('Could not copy color: ', err);
      });
  }
  
  // Paste color from clipboard
  async function pasteColorFromClipboard() {
    try {
      const text = await navigator.clipboard.readText();
      // Simple validation to check if it's a hex color
      if (/^#[0-9A-Fa-f]{6}$/.test(text)) {
        localColor = text;
        if (colorPicker) {
          colorPicker.color.hexString = localColor;
        }
        notifyChange();
      }
    } catch (err) {
      console.error('Could not paste color: ', err);
    }
  }
</script>

<hr class="my-4" style="border-color: var(--color-border-primary); border-width: 1px; border-style: solid; background: none;">

<!-- Color swatch and hex input -->
<div class="flex items-center space-x-2 mb-3">
  <div class="w-10 h-10 rounded relative" style="border: 1px solid var(--color-border-secondary);">
    <div class="absolute inset-0 bg-checkerboard rounded"></div>
    <div 
      class="absolute inset-0 rounded" 
      style="background-color: {localColor}; opacity: {localAlpha};"
    ></div>
  </div>
  <div class="flex-1 flex items-center space-x-1">
    <input 
      type="text" 
      value={localColor} 
      on:input={handleHexChange}
      class="flex-1 py-1 px-2 text-sm rounded h-8" 
      style="background-color: var(--color-bg-tertiary); color: var(--color-text-primary); border: 1px solid var(--color-border-secondary);"
    />
    <!-- Copy button -->
    <button 
      type="button"
      class="theme-button-secondary rounded h-8 w-8 flex items-center justify-center" 
      title="Copy color"
      aria-label="Copy color to clipboard"
      on:click={copyColorToClipboard}
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
      </svg>
    </button>
    <!-- Paste button -->
    <button 
      type="button"
      class="theme-button-secondary rounded h-8 w-8 flex items-center justify-center" 
      title="Paste color"
      aria-label="Paste color from clipboard"
      on:click={pasteColorFromClipboard}
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    </button>
  </div>
</div>

<!-- Color Picker -->
<div bind:this={colorPickerElement} class="w-full flex justify-center mb-4"></div>

<style>
  :root {
    --checkerboard-pattern: linear-gradient(45deg, #ccc 25%, transparent 25%),
                           linear-gradient(-45deg, #ccc 25%, transparent 25%),
                           linear-gradient(45deg, transparent 75%, #ccc 75%),
                           linear-gradient(-45deg, transparent 75%, #ccc 75%);
  }
  
  .bg-checkerboard {
    background-image: var(--checkerboard-pattern);
    background-size: 16px 16px;
    background-position: 0 0, 0 8px, 8px -8px, -8px 0px;
  }
  
  /* Using theme-button-secondary class from theme.css for consistent button styling */
  
  /* Override iro.js styles for better visibility */
  :global(.IroSlider) {
    margin-top: 8px !important;
  }
  
  :global(.IroSlider[style*="alpha"]) {
    background-image: var(--checkerboard-pattern) !important;
    background-size: 16px 16px !important;
  }
</style>
