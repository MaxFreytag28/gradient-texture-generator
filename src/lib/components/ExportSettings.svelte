<script lang="ts">
  // Props
  export let exportWidth: number;
  export let exportHeight: number;
  export let exportFormat: string;
  
  // Events
  export let onExport: () => void;
  
  // Preset sizes
  const presetSizes = [
    { label: '128×128', width: 128, height: 128 },
    { label: '256×256', width: 256, height: 256 },
    { label: '512×512', width: 512, height: 512 },
    { label: '1024×1024', width: 1024, height: 1024 },
    { label: '2048×2048', width: 2048, height: 2048 },
    { label: '4096×4096', width: 4096, height: 4096 }
  ];
  
  function setPresetSize(width: number, height: number) {
    exportWidth = width;
    exportHeight = height;
  }
</script>

<div class="mb-6">
  <!-- Two-column layout for all settings -->
  <div class="grid grid-cols-2 gap-4 mb-4">
    <!-- Column 1: Size inputs and Format -->
    <div>
      <!-- Size inputs -->
      <div class="block text-sm font-medium mb-2" style="color: var(--color-text-secondary);">Size</div>
      
      <div class="grid grid-cols-2 gap-2 mb-3">
        <div>
          <div class="flex items-center justify-between mb-1">
            <label for="export-width" class="block text-sm font-medium" style="color: var(--color-text-secondary);">W:</label>
            <div class="relative w-16">
              <input 
                type="number" 
                value={exportWidth} 
                oninput={(e) => { exportWidth = Number((e.target as HTMLInputElement).value); }}
                class="w-full py-1 px-2 text-sm rounded"
                min="32"
                max="4096"
                step="1"
                id="export-width"
              />
              <span class="absolute right-2 top-1/2 -translate-y-1/2 text-xs theme-text-muted">px</span>
            </div>
          </div>
        </div>
        <div>
          <div class="flex items-center justify-between mb-1">
            <label for="export-height" class="block text-sm font-medium" style="color: var(--color-text-secondary);">H:</label>
            <div class="relative w-16">
              <input 
                type="number" 
                value={exportHeight} 
                oninput={(e) => { exportHeight = Number((e.target as HTMLInputElement).value); }}
                class="w-full py-1 px-2 text-sm rounded"
                min="32"
                max="4096"
                step="1"
                id="export-height"
              />
              <span class="absolute right-2 top-1/2 -translate-y-1/2 text-xs theme-text-muted">px</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Column 2: Preset sizes in 3 columns -->
    <div>
      <span class="block text-sm font-medium mb-2" style="color: var(--color-text-secondary);">Preset Sizes</span>
      <div class="grid grid-cols-3 gap-2" role="group" aria-label="Preset sizes">
        {#each presetSizes as preset}
          <button 
            type="button"
            class="theme-button-secondary px-1 py-1 text-xs rounded"
            onclick={() => setPresetSize(preset.width, preset.height)}
          >{preset.label}</button>
        {/each}
      </div>
    </div>
  </div>
  
  <!-- Format selection -->
  <div class="mb-4">
    <div class="block text-sm font-medium mb-2" style="color: var(--color-text-secondary);">Format</div>
    <div class="toggle-switch-container">
      <div class="toggle-switch" 
        class:jpeg={exportFormat === 'jpeg'}
        class:webp={exportFormat === 'webp'}
        class:svg={exportFormat === 'svg'}
      >
        <button 
          class="toggle-option" 
          class:active={exportFormat === 'png'}
          onclick={() => exportFormat = 'png'}
          type="button"
        >
          PNG
        </button>
        <button 
          class="toggle-option" 
          class:active={exportFormat === 'jpeg'}
          onclick={() => exportFormat = 'jpeg'}
          type="button"
        >
          JPEG
        </button>
        <button 
          class="toggle-option" 
          class:active={exportFormat === 'webp'}
          onclick={() => exportFormat = 'webp'}
          type="button"
        >
          WebP
        </button>
        <button 
          class="toggle-option" 
          class:active={exportFormat === 'svg'}
          onclick={() => exportFormat = 'svg'}
          type="button"
        >
          SVG
        </button>
      </div>
    </div>
  </div>
  
  <!-- Export button -->
  <button 
    type="button" 
    onclick={onExport}
    class="w-full theme-button-primary font-medium py-2 px-4 rounded"
  >
    Export Texture
  </button>
</div>

<style>
  .toggle-switch-container {
    display: flex;
    justify-content: flex-start;
    width: 100%;
  }
  
  .toggle-switch {
    display: flex;
    background-color: var(--color-bg-tertiary);
    border-radius: 0.5rem;
    overflow: hidden;
    position: relative;
    border: 1px solid var(--color-border-primary);
    width: 100%;
  }
  
  .toggle-option {
    padding: 0.5rem 0.5rem;
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
    width: calc(25% - 0.25rem);
    background-color: var(--color-bg-accent);
    border-radius: 0.375rem;
    transition: none;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  }
  
  .toggle-switch.jpeg::before {
    transform: translateX(calc(100% + 0.25rem));
  }
  
  .toggle-switch.webp::before {
    transform: translateX(calc(200% + 0.5rem));
  }
  
  .toggle-switch.svg::before {
    transform: translateX(calc(300% + 0.75rem));
  }
</style>
