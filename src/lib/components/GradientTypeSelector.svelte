<script lang="ts">
  import { type GradientType } from '$lib/types';
  // Props
  export let gradientType: GradientType;
</script>

<div class="mb-6">
  <div class="block text-sm font-medium text-gray-700 mb-2">Gradient Type</div>
  <div class="toggle-switch-container">
    <div class="toggle-switch" 
      class:radial={gradientType === 'radial'}
      class:conic={gradientType === 'conic'}
    >
      <button 
        class="toggle-option" 
        class:active={gradientType === 'linear'}
        on:click={() => gradientType = 'linear'}
        type="button"
      >
        Linear
      </button>
      <button 
        class="toggle-option" 
        class:active={gradientType === 'radial'}
        on:click={() => gradientType = 'radial'}
        type="button"
      >
        Radial
      </button>
      <button 
        class="toggle-option" 
        class:active={gradientType === 'conic'}
        on:click={() => gradientType = 'conic'}
        type="button"
      >
        Conic
      </button>
    </div>
  </div>
</div>

<style>
  .toggle-switch-container {
    display: flex;
    justify-content: flex-start;
    width: 100%;
  }
  
  .toggle-switch {
    display: flex;
    background-color: #f3f4f6;
    border-radius: 0.5rem;
    overflow: hidden;
    position: relative;
    border: 1px solid #e5e7eb;
    width: 100%;
  }
  
  .toggle-option {
    padding: 0.5rem 1.5rem;
    font-size: 0.875rem;
    font-weight: 500;
    border: none;
    background: transparent;
    position: relative;
    cursor: pointer;
    transition: color 0.2s;
    color: #6b7280;
    z-index: 1;
    flex: 1;
    text-align: center;
  }
  
  .toggle-option.active {
    color: #1f2937;
    font-weight: 600;
  }
  
  .toggle-switch::before {
    content: '';
    position: absolute;
    top: 0.125rem;
    left: 0.125rem;
    height: calc(100% - 0.25rem);
    width: calc(33.333% - 0.25rem);
    background-color: white;
    border-radius: 0.375rem;
    transition: none;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  }
  
  .toggle-switch.radial::before {
    transform: translateX(calc(100% + 0.25rem));
  }
  
  .toggle-switch.conic::before {
    transform: translateX(calc(200% + 0.5rem));
  }
</style>
