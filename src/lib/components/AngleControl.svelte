<script lang="ts">
  // Props using runes
  const props = $props<{
    angle: number;
    onAngleChange: (newAngle: number) => void;
    onSnapChange?: (isSnapping: boolean) => void;
  }>();
  
  // Local state
  let snapToGrid = $state(false);
  
  // Local state to track angle changes
  let localAngle = $state(props.angle);
  
  function handleInput(e: Event) {
    let value = Number((e.target as HTMLInputElement).value);
    
    // Apply snapping if enabled
    if (snapToGrid) {
      value = Math.round(value / 5) * 5;
    }
    
    localAngle = value;
    props.onAngleChange(value);
  }
  
  function handleSliderInput() {
    // Apply snapping if enabled
    if (snapToGrid) {
      localAngle = Math.round(localAngle / 5) * 5;
    }
    
    props.onAngleChange(localAngle);
  }
  
  // Watch for prop changes
  $effect(() => {
    // Don't apply snapping when receiving angle from props
    localAngle = props.angle;
  });
  
  // Notify parent when snap state changes
  $effect(() => {
    if (props.onSnapChange) {
      props.onSnapChange(snapToGrid);
    }
  });
</script>

<div class="mb-6">
  <div class="flex items-center justify-between mb-1">
    <label for="angle-input" class="block text-sm font-medium" style="color: var(--color-text-secondary);">Angle:</label>
    <div class="relative w-20">
      <input 
        type="number" 
        value={localAngle.toFixed(1)} 
        oninput={handleInput}
        class="w-full py-1 px-2 text-sm rounded no-spinner"
        style="background-color: var(--color-bg-tertiary); color: var(--color-text-primary); border: 1px solid var(--color-border-secondary);"
        min="0"
        max="360"
        step="0.1"
      />
      <span class="absolute right-2 top-1/2 -translate-y-1/2 text-xs theme-text-muted">°</span>
    </div>
  </div>
  
  <div class="flex items-center mb-2">
    <input 
      type="checkbox" 
      id="angle-snap-to-grid" 
      bind:checked={snapToGrid} 
      class="mr-2"
    />
    <label for="angle-snap-to-grid" class="text-sm" style="color: var(--color-text-secondary);">Snap to 5° increments</label>
  </div>
  
  <input 
    type="range" 
    min="0" 
    max="360" 
    step={snapToGrid ? "5" : "1"} 
    bind:value={localAngle} 
    oninput={handleSliderInput}
    class="w-full h-2 rounded-lg appearance-none cursor-pointer"
    style="background-color: var(--color-bg-tertiary); accent-color: var(--color-accent-primary);"
    id="angle-input"
  >
</div>
