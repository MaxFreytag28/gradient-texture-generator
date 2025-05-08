<script lang="ts">
  // Props
  export let centerX: number;
  export let centerY: number;
  
  // Events
  export let onCenterChange: (x: number, y: number) => void;
  
  function handleXInput(e: Event) {
    const value = Number((e.target as HTMLInputElement).value);
    centerX = value;
    onCenterChange(centerX, centerY);
  }
  
  function handleYInput(e: Event) {
    const value = Number((e.target as HTMLInputElement).value);
    centerY = value;
    onCenterChange(centerX, centerY);
  }
</script>

<div class="mb-6">
  <label for="center-x-input" class="block text-sm font-medium mb-2" style="color: var(--color-text-secondary);">Center Position</label>
  <div class="grid grid-cols-2 gap-4">
    <div>
      <div class="flex items-center justify-between mb-1">
        <label for="center-x-input" class="block text-sm font-medium" style="color: var(--color-text-secondary);">Center X:</label>
        <div class="relative w-16">
          <input 
            type="number" 
            value={centerX} 
            oninput={handleXInput}
            class="w-full py-1 px-2 text-sm rounded"
            style="background-color: var(--color-bg-tertiary); color: var(--color-text-primary); border: 1px solid var(--color-border-secondary);"
            min="0"
            max="100"
            step="0.1"
          />
          <span class="absolute right-2 top-1/2 -translate-y-1/2 text-xs theme-text-muted">%</span>
        </div>
      </div>
      <input 
        type="range" 
        min="0" 
        max="100" 
        step="0.1" 
        bind:value={centerX} 
        oninput={() => onCenterChange(centerX, centerY)}
        class="w-full h-2 rounded-lg appearance-none cursor-pointer"
        style="background-color: var(--color-bg-tertiary); accent-color: var(--color-accent-primary);"
        id="center-x-input"
      >
    </div>
    <div>
      <div class="flex items-center justify-between mb-1">
        <label for="center-y-input" class="block text-sm font-medium" style="color: var(--color-text-secondary);">Center Y:</label>
        <div class="relative w-16">
          <input 
            type="number" 
            value={centerY} 
            oninput={handleYInput}
            class="w-full py-1 px-2 text-sm rounded"
            style="background-color: var(--color-bg-tertiary); color: var(--color-text-primary); border: 1px solid var(--color-border-secondary);"
            min="0"
            max="100"
            step="0.1"
          />
          <span class="absolute right-2 top-1/2 -translate-y-1/2 text-xs theme-text-muted">%</span>
        </div>
      </div>
      <input 
        type="range" 
        min="0" 
        max="100" 
        step="0.1" 
        bind:value={centerY} 
        oninput={() => onCenterChange(centerX, centerY)}
        class="w-full h-2 rounded-lg appearance-none cursor-pointer"
        style="background-color: var(--color-bg-tertiary); accent-color: var(--color-accent-primary);"
        id="center-y-input"
      >
    </div>
  </div>
</div>
