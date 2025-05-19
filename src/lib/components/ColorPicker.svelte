<script lang="ts">
  import { type ColorStop as ColorStopType } from '$lib/types';
  import { onMount, onDestroy } from 'svelte';
  import iro from '@jaames/iro';
  
  // Props using runes mode
  const props = $props<{
    selectedStop: ColorStopType;
    onColorChange: (updatedStop: ColorStopType) => void;
    colorStops: ColorStopType[];
    onColorStopSelect: (stopId: string) => void;
  }>();
  
  // Set default values for optional props
  const colorStops = $derived(props.colorStops || []);
  const onColorStopSelect = $derived(props.onColorStopSelect || ((id: string) => {}));
  
  // Local state to track changes
  let localColor = $state(props.selectedStop?.color || '#000000');
  let localAlpha = $state(props.selectedStop?.alpha || 1);
  let localPosition = $state(props.selectedStop?.position || 0);
  
  // Color input mode (hex or rgb)
  let colorInputMode = $state('hex');
  
  // RGB values
  let localRed = $state(0);
  let localGreen = $state(0);
  let localBlue = $state(0);
  
  // Update RGB values when hex changes
  $effect(() => {
    const rgb = hexToRgb(localColor);
    if (rgb) {
      localRed = rgb.r;
      localGreen = rgb.g;
      localBlue = rgb.b;
    }
  });
  
  // Reference to the color picker elements
  let colorPickerElement: HTMLElement;
  let colorPicker: any;
  
  // Track the previous selected stop to avoid unnecessary updates
  let prevStopId = $state<string | null>(null);
  
  // Update when the selected stop changes
  $effect(() => {
    if (props.selectedStop && (prevStopId !== props.selectedStop.id)) {
      prevStopId = props.selectedStop.id;
      localColor = props.selectedStop.color;
      localAlpha = props.selectedStop.alpha;
      localPosition = props.selectedStop.position;
      
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
  });
  
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
          width: 180,
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
    if (!props.selectedStop) return;
    
    const updatedStop: ColorStopType = {
      id: props.selectedStop.id,
      color: localColor,
      alpha: localAlpha,
      position: localPosition
    };
    
    props.onColorChange(updatedStop);
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
  
  // Handle RGB input changes
  function handleRgbChange() {
    // Convert RGB to hex
    const hexColor = rgbToHex(localRed, localGreen, localBlue);
    localColor = hexColor;
    
    // Update color picker
    if (colorPicker) {
      try {
        colorPicker.color.hexString = localColor;
      } catch (e) {
        console.error('Error updating color picker from RGB input:', e);
      }
    }
    
    notifyChange();
  }
  
  // Toggle between hex and RGB input modes
  function toggleColorInputMode() {
    colorInputMode = colorInputMode === 'hex' ? 'rgb' : 'hex';
  }
  
  // Convert hex to RGB
  function hexToRgb(hex: string) {
    // Remove # if present
    hex = hex.replace('#', '');
    
    // Parse the hex values
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    if (isNaN(r) || isNaN(g) || isNaN(b)) {
      return null;
    }
    
    return { r, g, b };
  }
  
  // Convert RGB to hex
  function rgbToHex(r: number, g: number, b: number) {
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
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

<!-- Grid layout for color picker with 2-column layout -->
<div class="color-picker-layout">
  <!-- Left Column -->
  <div class="left-column">
    <!-- Top Left: RGB/HEX toggle button (no background) -->
    <div class="top-left">
      <button 
        type="button"
        class="theme-button-secondary rounded h-8 w-8 flex items-center justify-center" 
        title="Toggle color format"
        aria-label="Toggle between HEX and RGB color formats"
        onclick={toggleColorInputMode}
      >
        <span class="text-xs font-bold">{colorInputMode === 'hex' ? 'RGB' : 'HEX'}</span>
      </button>
    </div>
    
    <!-- Bottom Left: Color stops with background -->
    <div class="bottom-left grid-section">
      <div class="color-stops-column">
        {#each colorStops as stop}
          <button 
            class="color-stop-item {props.selectedStop && props.selectedStop.id === stop.id ? 'selected' : ''}" 
            onclick={() => onColorStopSelect(stop.id)}
            title="Position: {stop.position}%"
          >
            <!-- Checkerboard background for transparency -->
            <div class="absolute inset-0 bg-checkerboard" style="border-radius: 6px;"></div>
            
            <!-- Color display -->
            <div 
              class="absolute inset-0" 
              style="background-color: {stop.color}; opacity: {stop.alpha}; border-radius: 6px;"
            ></div>
            
            <!-- Border -->
            <div 
              class="absolute inset-0 rounded-lg border-2 {props.selectedStop && props.selectedStop.id === stop.id ? 'border-accent' : 'border-secondary'}"
              style="border-radius: 6px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);"
            ></div>
          </button>
        {/each}
      </div>
    </div>
  </div>
  
  <!-- Right Column -->
  <div class="right-column">
    <!-- Top Right: Color input (HEX or RGB) with background -->
    <div class="top-right grid-section">
      <div class="color-input-wrapper">
        {#if colorInputMode === 'hex'}
          <!-- HEX input -->
          <div class="flex items-center space-x-1 color-input-container" style="width: 250px;">
            <label for="hex-input" class="sr-only">Hex Color</label>
            <input 
              id="hex-input"
              type="text" 
              value={localColor} 
              oninput={handleHexChange}
              class="flex-1 py-1 px-2 text-sm rounded h-8" 
              style="background-color: var(--color-bg-tertiary); color: var(--color-text-primary); border: 1px solid var(--color-border-secondary); width: 100%;"
              placeholder="#RRGGBB"
              aria-label="Hex Color"
            />
            <!-- Copy button -->
            <button 
              type="button"
              class="theme-button-secondary rounded h-8 w-8 flex items-center justify-center" 
              title="Copy color"
              aria-label="Copy color to clipboard"
              onclick={copyColorToClipboard}
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
              onclick={pasteColorFromClipboard}
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </button>
          </div>
        {:else}
          <!-- RGB inputs in 4-column grid -->
          <div class="grid grid-cols-4 gap-1 color-input-container" style="width: 250px;">
            <div class="flex items-center">
              <label for="red-input" class="rgb-label">R</label>
              <div class="flex-1">
                <input 
                  id="red-input"
                  type="number" 
                  min="0" 
                  max="255" 
                  value={localRed} 
                  oninput={(e) => { localRed = parseInt((e.target as HTMLInputElement).value); handleRgbChange(); }}
                  class="w-full h-8 py-1 px-1 text-sm rounded no-spinner text-center" 
                  style="background-color: var(--color-bg-tertiary); color: var(--color-text-primary); border: 1px solid var(--color-border-secondary); max-width: 40px;"
                />
              </div>
            </div>
            <div class="flex items-center">
              <label for="green-input" class="rgb-label">G</label>
              <div class="flex-1">
                <input 
                  id="green-input"
                  type="number" 
                  min="0" 
                  max="255" 
                  value={localGreen} 
                  oninput={(e) => { localGreen = parseInt((e.target as HTMLInputElement).value); handleRgbChange(); }}
                  class="w-full h-8 py-1 px-1 text-sm rounded no-spinner text-center" 
                  style="background-color: var(--color-bg-tertiary); color: var(--color-text-primary); border: 1px solid var(--color-border-secondary); max-width: 40px;"
                />
              </div>
            </div>
            <div class="flex items-center">
              <label for="blue-input" class="rgb-label">B</label>
              <div class="flex-1">
                <input 
                  id="blue-input"
                  type="number" 
                  min="0" 
                  max="255" 
                  value={localBlue} 
                  oninput={(e) => { localBlue = parseInt((e.target as HTMLInputElement).value); handleRgbChange(); }}
                  class="w-full h-8 py-1 px-1 text-sm rounded no-spinner text-center" 
                  style="background-color: var(--color-bg-tertiary); color: var(--color-text-primary); border: 1px solid var(--color-border-secondary); max-width: 40px;"
                />
              </div>
            </div>
            <div class="flex items-center">
              <label for="alpha-input" class="rgb-label">A</label>
              <div class="flex-1">
                <input 
                  id="alpha-input"
                  type="number" 
                  min="0" 
                  max="1" 
                  step="0.01"
                  value={localAlpha.toFixed(2)} 
                  oninput={(e) => { localAlpha = Math.max(0, Math.min(1, Number((e.target as HTMLInputElement).value))); notifyChange(); }}
                  class="w-full h-8 py-1 px-1 text-sm rounded no-spinner text-center" 
                  style="background-color: var(--color-bg-tertiary); color: var(--color-text-primary); border: 1px solid var(--color-border-secondary); max-width: 40px;"
                />
              </div>
            </div>
          </div>
        {/if}
      </div>
    </div>
    
    <!-- Bottom Right: Color picker with same background -->
    <div class="bottom-right grid-section">
      <div bind:this={colorPickerElement} class="w-full flex justify-center"></div>
    </div>
  </div>
</div>

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
  
  /* New 2-column layout for color picker */
  .color-picker-layout {
    display: flex;
    gap: 8px;
  }
  
  /* Left column */
  .left-column {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: auto;
  }
  
  /* Right column */
  .right-column {
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 0; /* No gap between top and bottom sections */
  }
  
  .top-left {
    padding: 8px;
  }
  
  .top-right {
    width: 100%;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }
  
  .bottom-left {
    flex: 1;
    border-radius: 8px;
  }
  
  .bottom-right {
    width: 100%;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }
  
  /* Grid section styling */
  .grid-section {
    padding: 8px;
    background-color: var(--color-bg-primary);
  }
  
  /* Connect top-right and bottom-right sections */
  .right-column .top-right {
    border-bottom: none;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
  
  .right-column .bottom-right {
    border-top: none;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
  
  /* Ensure consistent width between HEX and RGB inputs */
  .color-input-container {
    width: 100%;
    min-width: 0;
  }
  
  .color-input-wrapper {
    width: 100%;
    height: 40px; /* Fixed height to prevent layout shifts */
    display: flex;
    align-items: center;
  }
  
  /* Set fixed widths for both input modes */
  .flex.items-center.space-x-1.color-input-container,
  .grid.grid-cols-4.gap-1.color-input-container {
    width: 100%;
    max-width: 100%;
  }
  
  /* Ensure input fields have consistent width */
  #hex-input {
    width: 100%;
    max-width: calc(100% - 70px); /* Accounting for the two buttons */
  }
  
  /* RGB inputs styling */
  /* RGB styling removed in favor of grid layout */
  
  .rgb-label {
    width: 10px;
    font-size: 12px;
    font-weight: 700;
    color: var(--color-text-secondary);
    margin-right: 2px;
    margin-left: 6px;
    padding: 0;
  }
  
  /* RGB input group styling removed in favor of grid layout */
  
  /* Remove spinner buttons */
  .no-spinner::-webkit-outer-spin-button,
  .no-spinner::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  
  .no-spinner {
    -moz-appearance: textfield;
    appearance: textfield;
  }
  
  /* End of RGB input styling */
  
  /* Vertical color stops column */
  .color-stops-column {
    display: flex;
    flex-direction: column;
    gap: 6px;
    width: 32px;
  }
  
  .color-stop-item {
    position: relative;
    width: 32px;
    height: 32px;
    cursor: pointer;
    transition: all 0.15s ease;
  }
  
  /* Unselected stops are horizontal pills */
  .color-stop-item:not(.selected) {
    border-radius: 8px;
    width: 32px;
    height: 12px;
  }
  
  /* Selected stops are square with rounded corners */
  .color-stop-item.selected {
    border-radius: 8px;
    transform: scale(1.1);
  }
  
  .border-accent {
    border-color: var(--color-border-accent);
  }
  
  .border-secondary {
    border-color: var(--color-border-secondary);
  }
  
  /* Override iro.js styles for better visibility */
  :global(.IroSlider) {
    margin-top: 0px !important;
  }
  
  /* Basic color picker styling */
  :global(.IroColorPicker) {
    padding: 0 !important;
    margin: 0 !important;
  }
</style>
