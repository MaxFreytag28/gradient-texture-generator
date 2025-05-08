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
      <label for="export-size" class="block text-sm font-medium mb-2" style="color: var(--color-text-secondary);">Size</label>
      
      <div class="grid grid-cols-2 gap-2 mb-3">
        <div>
          <div class="flex items-center justify-between mb-1">
            <label for="export-width" class="block text-sm font-medium" style="color: var(--color-text-secondary);">W:</label>
            <div class="relative w-20">
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
            <div class="relative w-20">
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
      
      <!-- Format selection -->
      <label for="export-format" class="block text-sm font-medium mb-2" style="color: var(--color-text-secondary);">Format</label>
      <select 
        id="export-format" 
        bind:value={exportFormat} 
        class="w-full p-2 rounded"
      >
        <option value="png">PNG</option>
        <option value="jpeg">JPEG</option>
        <option value="webp">WebP</option>
        <option value="svg">SVG</option>
      </select>
    </div>
    
    <!-- Column 2: Preset sizes in 2 rows -->
    <div>
      <span class="block text-sm font-medium mb-2" style="color: var(--color-text-secondary);">Preset Sizes</span>
      <div class="grid grid-cols-2 gap-2" role="group" aria-label="Preset sizes">
        {#each presetSizes as preset}
          <button 
            type="button"
            class="theme-button-secondary px-2 py-1 text-xs rounded"
            onclick={() => setPresetSize(preset.width, preset.height)}
          >{preset.label}</button>
        {/each}
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
