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
</script>

<hr class="my-4 border-gray-300">

<!-- Color swatch and hex input -->
<div class="flex items-center space-x-2 mb-3">
  <div class="w-10 h-10 rounded border border-gray-300 relative">
    <div class="absolute inset-0 bg-checkerboard rounded"></div>
    <div 
      class="absolute inset-0 rounded" 
      style="background-color: {localColor}; opacity: {localAlpha};"
    ></div>
  </div>
  <div class="flex-1">
    <input 
      type="text" 
      value={localColor} 
      on:input={handleHexChange}
      class="w-full py-1 px-2 text-sm border border-gray-300 rounded"
    />
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
  
  /* Override iro.js styles for better visibility */
  :global(.IroSlider) {
    margin-top: 8px !important;
  }
  
  :global(.IroSlider[style*="alpha"]) {
    background-image: var(--checkerboard-pattern) !important;
    background-size: 16px 16px !important;
  }
</style>
