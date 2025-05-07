<script lang="ts">
  // Props
  export let exportWidth: number;
  export let exportHeight: number;
  export let exportFormat: string;
  
  // Events
  export let onExport: () => void;
  
  // Preset sizes
  const presetSizes = [
    { label: '64×64', width: 64, height: 64 },
    { label: '128×128', width: 128, height: 128 },
    { label: '256×256', width: 256, height: 256 },
    { label: '512×512', width: 512, height: 512 },
    { label: '1024×1024', width: 1024, height: 1024 }
  ];
  
  function setPresetSize(width: number, height: number) {
    exportWidth = width;
    exportHeight = height;
  }
</script>

<div class="mb-6">
  
  <div class="mb-4">
    <label for="export-size" class="block text-sm font-medium text-gray-700 mb-2">Size</label>
    
    <div class="grid grid-cols-2 gap-4 mb-2">
      <div>
        <div class="flex items-center justify-between mb-1">
          <label for="export-width" class="block text-sm font-medium text-gray-700">Width:</label>
          <div class="relative w-20">
            <input 
              type="number" 
              value={exportWidth} 
              oninput={(e) => { exportWidth = Number((e.target as HTMLInputElement).value); }}
              class="w-full py-1 px-2 text-sm border border-gray-300 rounded"
              min="32"
              max="4096"
              step="1"
              id="export-width"
            />
            <span class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 text-xs">px</span>
          </div>
        </div>

      </div>
      <div>
        <div class="flex items-center justify-between mb-1">
          <label for="export-height" class="block text-sm font-medium text-gray-700">Height:</label>
          <div class="relative w-20">
            <input 
              type="number" 
              value={exportHeight} 
              oninput={(e) => { exportHeight = Number((e.target as HTMLInputElement).value); }}
              class="w-full py-1 px-2 text-sm border border-gray-300 rounded"
              min="32"
              max="4096"
              step="1"
              id="export-height"
            />
            <span class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 text-xs">px</span>
          </div>
        </div>

      </div>
    </div>
    
    <div class="flex flex-wrap gap-2 mt-2">
      {#each presetSizes as preset}
        <button 
          type="button"
          class="px-2 py-1 text-xs bg-gray-200 hover:bg-gray-300 rounded"
          onclick={() => setPresetSize(preset.width, preset.height)}
        >{preset.label}</button>
      {/each}
    </div>
  </div>
  
  <div class="mb-4">
    <label for="export-format" class="block text-sm font-medium text-gray-700 mb-2">Format</label>
    <select 
      id="export-format" 
      bind:value={exportFormat} 
      class="w-full p-2 border border-gray-300 rounded"
    >
      <option value="png">PNG</option>
      <option value="jpeg">JPEG</option>
      <option value="webp">WebP</option>
    </select>
  </div>
  
  <button 
    type="button" 
    onclick={onExport}
    class="w-full bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-700 font-medium py-2 px-4 rounded font-heading"
  >
    Export Texture
  </button>
</div>
