<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { ColorStop, GradientType, RadialGradientOptions } from '$lib/types';

  // Define preset type
  interface GradientPreset {
    id: string;
    name: string;
    gradientType: GradientType;
    angle?: number;
    centerX?: number;
    centerY?: number;
    radialOptions?: RadialGradientOptions;
    colorStops: ColorStop[];
  }

  // Dispatch events
  const dispatch = createEventDispatcher<{
    selectPreset: GradientPreset;
  }>();

  // Predefined gradient presets
  const presets: GradientPreset[] = [
    {
      id: 'sunset',
      name: 'Sunset',
      gradientType: 'linear',
      angle: 45,
      colorStops: [
        { id: 'sunset-1', color: '#FF5F6D', position: 0, alpha: 1 },
        { id: 'sunset-2', color: '#FFC371', position: 100, alpha: 1 }
      ]
    },
    {
      id: 'ocean',
      name: 'Ocean',
      gradientType: 'linear',
      angle: 90,
      colorStops: [
        { id: 'ocean-1', color: '#2193b0', position: 0, alpha: 1 },
        { id: 'ocean-2', color: '#6dd5ed', position: 100, alpha: 1 }
      ]
    },
    {
      id: 'emerald',
      name: 'Emerald',
      gradientType: 'linear',
      angle: 120,
      colorStops: [
        { id: 'emerald-1', color: '#0F2027', position: 0, alpha: 1 },
        { id: 'emerald-2', color: '#203A43', position: 50, alpha: 1 },
        { id: 'emerald-3', color: '#2C5364', position: 100, alpha: 1 }
      ]
    },
    {
      id: 'radial-purple',
      name: 'Purple Haze',
      gradientType: 'radial',
      centerX: 50,
      centerY: 50,
      radialOptions: { scale: 1.0 },
      colorStops: [
        { id: 'purple-1', color: '#8E2DE2', position: 0, alpha: 1 },
        { id: 'purple-2', color: '#4A00E0', position: 100, alpha: 1 }
      ]
    },
    {
      id: 'rainbow',
      name: 'Rainbow',
      gradientType: 'linear',
      angle: 90,
      colorStops: [
        { id: 'rainbow-1', color: '#FF0000', position: 0, alpha: 1 },
        { id: 'rainbow-2', color: '#FF9900', position: 20, alpha: 1 },
        { id: 'rainbow-3', color: '#FFFF00', position: 40, alpha: 1 },
        { id: 'rainbow-4', color: '#00FF00', position: 60, alpha: 1 },
        { id: 'rainbow-5', color: '#0099FF', position: 80, alpha: 1 },
        { id: 'rainbow-6', color: '#6633FF', position: 100, alpha: 1 }
      ]
    },
    {
      id: 'conic-spectrum',
      name: 'Spectrum',
      gradientType: 'conic',
      centerX: 50,
      centerY: 50,
      angle: 0,
      colorStops: [
        { id: 'conic-1', color: '#6D8EA0', position: 0, alpha: 1 },
        { id: 'conic-2', color: '#AEC3B0', position: 50, alpha: 1 },
        { id: 'conic-3', color: '#6D8EA0', position: 100, alpha: 1 }
      ]
    },
    // New presets
    {
      id: 'midnight',
      name: 'Midnight',
      gradientType: 'linear',
      angle: 135,
      colorStops: [
        { id: 'midnight-1', color: '#121212', position: 0, alpha: 1 },
        { id: 'midnight-2', color: '#2D3436', position: 100, alpha: 1 }
      ]
    },
    {
      id: 'soft-light',
      name: 'Soft Light',
      gradientType: 'radial',
      centerX: 50,
      centerY: 50,
      radialOptions: { scale: 0.9 },
      colorStops: [
        { id: 'soft-1', color: '#E6E6FA', position: 0, alpha: 1 },
        { id: 'soft-2', color: '#9198e5', position: 100, alpha: 1 }
      ]
    },
    {
      id: 'pastel-dream',
      name: 'Pastel Dream',
      gradientType: 'linear',
      angle: 60,
      colorStops: [
        { id: 'pastel-1', color: '#FFDEE9', position: 0, alpha: 1 },
        { id: 'pastel-2', color: '#B5FFFC', position: 100, alpha: 1 }
      ]
    },
    {
      id: 'forest',
      name: 'Forest',
      gradientType: 'linear',
      angle: 180,
      colorStops: [
        { id: 'forest-1', color: '#134E5E', position: 0, alpha: 1 },
        { id: 'forest-2', color: '#71B280', position: 100, alpha: 1 }
      ]
    },
    {
      id: 'sunset-alpha',
      name: 'Sunset Alpha',
      gradientType: 'linear',
      angle: 90,
      colorStops: [
        { id: 'sunset-alpha-1', color: '#FF416C', position: 0, alpha: 1 },
        { id: 'sunset-alpha-2', color: '#FF4B2B', position: 50, alpha: 1 },
        { id: 'sunset-alpha-3', color: '#FF9900', position: 100, alpha: 1 }
      ]
    },
    {
      id: 'cosmic',
      name: 'Cosmic',
      gradientType: 'conic',
      centerX: 75,
      centerY: 25,
      angle: 45,
      colorStops: [
        { id: 'cosmic-1', color: '#3A1C71', position: 0, alpha: 1 },
        { id: 'cosmic-2', color: '#D76D77', position: 50, alpha: 1 },
        { id: 'cosmic-3', color: '#FFAF7B', position: 100, alpha: 1 }
      ]
    }
  ];

  // Function to generate CSS for preview
  function generatePreviewGradient(preset: GradientPreset): string {
    const stops = preset.colorStops
      .map(stop => `${stop.color} ${stop.position}%`)
      .join(', ');
    
    if (preset.gradientType === 'linear') {
      return `linear-gradient(${preset.angle}deg, ${stops})`;
    } else if (preset.gradientType === 'radial') {
      return `radial-gradient(circle at ${preset.centerX}% ${preset.centerY}%, ${stops})`;
    } else if (preset.gradientType === 'conic') {
      return `conic-gradient(from ${preset.angle}deg at ${preset.centerX}% ${preset.centerY}%, ${stops})`;
    }
    
    return `linear-gradient(90deg, ${stops})`;
  }

  // Handle preset selection
  function selectPreset(preset: GradientPreset) {
    dispatch('selectPreset', preset);
  }
</script>

<div class="gradient-presets-column">
  <div class="preset-buttons">
    {#each presets as preset}
      <button 
        type="button" 
        class="preset-button theme-card-accent" 
        title={preset.name}
        style="background-image: {generatePreviewGradient(preset)};"
        on:click={() => selectPreset(preset)}
      >
        <span class="sr-only">{preset.name}</span>
      </button>
    {/each}
  </div>
</div>

<style>
  .gradient-presets-column {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.5rem;
    gap: 0.5rem;
    position: relative;
  }

  .preset-buttons {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    width: 100%;
  }

  .preset-button {
    width: 3rem;
    height: 3rem;
    border-radius: 0.5rem;
    cursor: pointer;
    border: 2px solid var(--color-border-secondary);
    transition: all 0.2s ease-in-out;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  .preset-button:hover {
    transform: scale(1.05);
    border-color: var(--color-accent-primary);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }
</style>
