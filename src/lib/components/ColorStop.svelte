<script lang="ts">
  import { type ColorStop as ColorStopType } from '$lib/types';
  
  // Props
  export let stop: ColorStopType;
  export let isSelected: boolean = false;
  
  // Events - all using stopId for consistency
  export let onSelect: (stopId: string, event?: MouseEvent) => void;
  // We're now handling removal in the parent component
  export const onRemove: (stopId: string) => void = () => {};
  export let onDragStart: (event: MouseEvent | TouchEvent, stopId: string) => void;
  
  function handleClick(e: MouseEvent) {
    e.stopPropagation();
    onSelect(stop.id, e);
  }
  
  // We're not using this directly anymore - double-click is handled in the parent
  function handleDoubleClick(e: MouseEvent) {
    e.stopPropagation();
    // Double-click is now handled in the selectColorStop function
    // to avoid multiple deletions
  }
  
  function handleDragStart(e: MouseEvent | TouchEvent) {
    onDragStart(e, stop.id);
  }
</script>

<div 
  class="absolute -translate-y-1/2 flex flex-col items-center cursor-pointer z-[10]"
  role="button"
  tabindex="0"
  aria-label={`Color stop at position ${stop.position.toFixed(1)}%`}
  onkeydown={(e) => e.key === 'Enter' && handleClick(e as unknown as MouseEvent)}
  style={`left: ${stop.position}%; top: 50%;`}
  onmousedown={handleDragStart}
  ontouchstart={handleDragStart}
  onclick={handleClick}
  ondblclick={handleDoubleClick}
  data-stop-id={stop.id}
  class:selected={isSelected}
>
  <!-- Pill-shaped color stop -->
  <div class="pill-handle">
    <div 
      class="pill-inner"
      style={`background-color: ${stop.color};`}
    ></div>
    
    <!-- Border and selection indicator -->
    <div 
      class="pill-border"
      class:selected={isSelected}
      style={`border-color: ${isSelected ? 'var(--color-accent-primary)' : 'var(--color-border-secondary)'};`}
    ></div>
  </div>
  
  <!-- Position value display -->
  {#if isSelected}
    <div class="position-display">
      <input 
        type="number" 
        value={stop.position.toFixed(1)} 
        min="0" 
        max="100" 
        step="0.1"
        class="position-input"
        oninput={(e) => {
          const value = Math.max(0, Math.min(100, Number((e.target as HTMLInputElement).value)));
          // Round to one decimal place
          const roundedValue = Math.round(value * 10) / 10;
          // Create a custom event with position data
          const customEvent = new MouseEvent('click', { bubbles: true });
          // @ts-ignore - Add position data to the event
          customEvent.positionValue = roundedValue;
          // Update the position through the parent component
          onSelect(stop.id, customEvent);
          e.stopPropagation();
        }}
        onclick={(e) => e.stopPropagation()}
      />
    </div>
  {/if}
</div>

<style>
  .pill-handle {
    position: relative;
    width: 16px;
    height: 48px;
    border-radius: 8px;
    transform: translateX(-50%);
  }
  
  .pill-inner {
    position: absolute;
    inset: 0;
    border-radius: 6px;
  }
  
  .pill-border {
    position: absolute;
    inset: 0;
    border-radius: 6px;
    border: 2px solid var(--color-border-secondary);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    transition: all 0.15s ease;
    pointer-events: none;
  }
  
  .pill-border.selected {
    transform: scale(1.1);
    border-width: 3px;
    z-index: 10;
  }
  
  .position-display {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 5px;
    background-color: var(--color-bg-tertiary);
    border: 1px solid var(--color-border-secondary);
    border-radius: 4px;
    padding: 2px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    width: 48px; /* Fixed width to ensure proper centering */
    text-align: center;
  }
  
  .position-input {
    width: 40px;
    border: none;
    text-align: center;
    font-size: 12px;
    padding: 2px;
    background: transparent;
    color: var(--color-text-primary);
    /* Remove spinner buttons */
    appearance: textfield;
    -moz-appearance: textfield;
  }
  
  /* Remove spinner buttons in Chrome, Safari, Edge, Opera */
  .position-input::-webkit-outer-spin-button,
  .position-input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
</style>
