<script lang="ts">
  import { onMount } from 'svelte';
  import { type ColorStop, type GradientType, type RadialGradientOptions } from '$lib/types';
  import type { PageData } from './$types';
  
  // Import components
  import WIPBanner from '$lib/components/WIPBanner.svelte';

  import FaqSection from '$lib/components/FaqSection.svelte';
  import GradientPreview from '$lib/components/GradientPreview.svelte';
  import ColorStopBar from '$lib/components/ColorStopBar.svelte';
  import ColorPicker from '$lib/components/ColorPicker.svelte';
  import GradientTypeSelector from '$lib/components/GradientTypeSelector.svelte';
  import AngleControl from '$lib/components/AngleControl.svelte';
  import CenterControl from '$lib/components/CenterControl.svelte';
  import RadialScaleControl from '$lib/components/RadialScaleControl.svelte';
  import ExportSettings from '$lib/components/ExportSettings.svelte';
  import CSSCode from '$lib/components/CSSCode.svelte';
  import AdvertisementPlaceholder from '$lib/components/AdvertisementPlaceholder.svelte';
  import GradientPresets from '$lib/components/GradientPresets.svelte';
  import BlogPosts from '$lib/components/BlogPosts.svelte';
  
  // Get the blog posts data from the server using runes
  const props = $props();
  const blogPosts = $derived(props.data?.blogPosts || []);
  
  // Gradient properties
  let gradientType = $state<GradientType>('linear');
  let angle = $state(90);
  let centerX = $state(50);
  let centerY = $state(50);
  let isSnappingEnabled = $state(true); // Enable snapping to 5 degrees by default
  
  // Radial gradient options
  let radialOptions = $state<RadialGradientOptions>({
    scale: 1.0 // Default scale (1.0 = 100%)
  });
  
  // Export settings
  let exportWidth = $state(512);
  let exportHeight = $state(512);
  let exportFormat = $state('png');
  
  // Removed duplicate snapToGrid state
  
  // Function to generate a unique ID
  function generateId(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }
  
  // Gradient state - using a Map instead of an array to avoid index-based selection issues
  // This is a fundamental change that ensures selection is always by ID
  let colorStopsMap = $state<Record<string, ColorStop>>({});
  
  // Create a derived array from the map for components that need an array
  let colorStops = $derived(Object.values(colorStopsMap).sort((a, b) => a.position - b.position));
  
  // Initialize with two default stops
  $effect(() => {
    if (Object.keys(colorStopsMap).length === 0) {
      const stop1 = { id: generateId(), color: '#FF5F6D', position: 0, alpha: 1 };
      const stop2 = { id: generateId(), color: '#FFC371', position: 100, alpha: 1 };
      colorStopsMap = {
        [stop1.id]: stop1,
        [stop2.id]: stop2
      };
      
      // Select the first stop by default
      selectedStopId = stop1.id;
    }
  });
  
  // Track the currently selected color stop by its ID
  let selectedStopId = $state<string | null>(null);
  
  // Create a stable default color stop object that won't be recreated on each render
  const defaultColorStop: ColorStop = $state({
    id: 'default',
    color: '#cccccc',
    position: 50,
    alpha: 1
  });
  
  // Get the currently selected stop object directly from the map by ID
  // This is more efficient and avoids any array-based lookups
  let selectedStop = $state<ColorStop | null>(null);
  $effect(() => {
    if (selectedStopId && selectedStopId in colorStopsMap) {
      selectedStop = colorStopsMap[selectedStopId];
    } else {
      selectedStop = null;
    }
  });
  
  // Stable reference to the color stop that will be passed to the ColorPicker
  // This ensures we don't create a new object on every render
  let colorPickerStop = $derived(selectedStop || defaultColorStop);
  
  // Track whether we're currently dragging and which stop is being dragged
  let isDraggingColorStop = $state(false);
  let draggedStopId = $state<string | null>(null);
  
  // Initialize the selected stop ID after colorStops are defined
  $effect(() => {
    const stopIds = Object.keys(colorStopsMap);
    if (stopIds.length > 0) {
      // If no stop is selected or the selected stop was removed
      if (selectedStopId === null || !colorStopsMap[selectedStopId]) {
        // Select the first stop by ID, not by index
        const firstId = stopIds[0]; // This is unavoidable - we need the first ID
        selectedStopId = firstId;
      }
    }
  });
  
  // Component references
  let colorStopBarComponent: any;
  const previewSize = 400; // Set to 400px
  
  // Update the gradient border when any gradient property changes
  $effect(() => {
    if (gradientType || angle || centerX || centerY || colorStops.length > 0) {
      updateGradientBorderCssVar();
    }
  });
  
  // Initialize on mount
  onMount(() => {
    // This code only runs in the browser, not during SSR
    if (typeof window !== 'undefined') {
      // Initialize the gradient border CSS variable
      updateGradientBorderCssVar();
    }
  });
  
  // Color stop functions
  function addColorStop(e: MouseEvent) {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    
    // Clamp the percentage between 0 and 100
    percentage = Math.max(0, Math.min(100, percentage));
    
    // Find color at this position by interpolating between existing stops
    const sortedStops = Object.values(colorStopsMap).sort((a, b) => a.position - b.position);
    let prevStop = sortedStops[0];
    let nextStop = sortedStops[sortedStops.length - 1];
    
    for (let i = 0; i < sortedStops.length - 1; i++) {
      if (percentage >= sortedStops[i].position && percentage <= sortedStops[i + 1].position) {
        prevStop = sortedStops[i];
        nextStop = sortedStops[i + 1];
        break;
      }
    }
    
    // Interpolate color
    const ratio = (percentage - prevStop.position) / (nextStop.position - prevStop.position);
    const color = interpolateColor(prevStop.color, nextStop.color, ratio);
    const alpha = prevStop.alpha + (nextStop.alpha - prevStop.alpha) * ratio;
    
    // Create a new color stop with interpolated color
    const newStop = {
      id: generateId(),
      color,
      position: percentage,
      alpha
    };
    
    // Add the new stop to the map
    colorStopsMap = {
      ...colorStopsMap,
      [newStop.id]: newStop
    };
    
    // Select the new stop
    selectedStopId = newStop.id;
  }
  
  // Track the last clicked stop to prevent double deletion
  let lastClickedStopId = $state<string | null>(null);
  let lastClickTime = $state(0);
  
  function selectColorStop(stopId: string, e?: MouseEvent) {
    // If the event doesn't exist, this was triggered programmatically
    if (!e) {
      selectedStopId = stopId;
      return;
    }
    
    const now = Date.now();
    
    // If it's a double-click (within 300ms), remove the stop
    if (lastClickedStopId === stopId && (now - lastClickTime) < 300 && Object.keys(colorStopsMap).length > 2) {
      removeColorStop(stopId);
      // Reset tracking variables to prevent multiple deletions
      lastClickedStopId = null;
      lastClickTime = 0;
      return;
    }
    
    // Update tracking variables for future double-click detection
    lastClickedStopId = stopId;
    lastClickTime = now;
    
    // Set the selected stop ID
    selectedStopId = stopId;
  }
  
  // Helper function to find a stop by its properties
  function findStopByProperties(color: string, alpha: number, position: number): string | undefined {
    return Object.keys(colorStopsMap).find(stopId => 
      colorStopsMap[stopId].color === color && 
      Math.abs(colorStopsMap[stopId].alpha - alpha) < 0.001 &&
      Math.abs(colorStopsMap[stopId].position - position) < 0.1
    );
  }
  
  function removeColorStop(stopId: string) {
    // Ensure we have at least 2 stops
    if (Object.keys(colorStopsMap).length <= 2) return; 
    
    // Get the sorted stops to find the one to the right (we'll select this one)
    const sortedStops = Object.values(colorStopsMap).sort((a, b) => a.position - b.position);
    const stopIndex = sortedStops.findIndex(stop => stop.id === stopId);
    
    // Find the stop to the right (or the left one if this is the last stop)
    // This gives us a more natural selection flow
    const rightStopIndex = stopIndex < sortedStops.length - 1 ? stopIndex + 1 : stopIndex - 1;
    const nextSelectedId = sortedStops[rightStopIndex]?.id;
    
    // If we're removing the currently selected stop, update selection BEFORE removing it
    // This prevents any flickering
    if (selectedStopId === stopId && nextSelectedId) {
      selectedStopId = nextSelectedId;
    }
    
    // Now remove the stop from the map
    const newMap = { ...colorStopsMap };
    delete newMap[stopId];
    colorStopsMap = newMap;
  }
  
  function updateSelectedStopProperties(color?: string, position?: number, alpha?: number) {
    if (!selectedStopId || !colorStopsMap[selectedStopId]) return;
    
    // Update the stop directly in the map
    if (colorStopsMap[selectedStopId]) {
      colorStopsMap = {
        ...colorStopsMap,
        [selectedStopId]: {
          ...colorStopsMap[selectedStopId],
          ...(color !== undefined ? { color } : {}),
          ...(position !== undefined ? { position } : {}),
          ...(alpha !== undefined ? { alpha } : {})
        }
      };
    }
  }
  
  // Function to update a color stop's position directly (used by input fields)
  function updateColorStopPosition(stopId: string, position: number) {
    if (!stopId || !colorStopsMap[stopId]) return;
    
    // Update the stop position directly in the map
    colorStopsMap = {
      ...colorStopsMap,
      [stopId]: {
        ...colorStopsMap[stopId],
        position: Math.max(0, Math.min(100, position)) // Clamp between 0 and 100
      }
    };
  }
  
  function handleColorStopDragStart(e: MouseEvent | TouchEvent, stopId: string) {
    // Set drag state
    isDraggingColorStop = true;
    draggedStopId = stopId;
    
    // Select the stop being dragged
    selectedStopId = stopId;
    
    // Add event listeners for drag movement and end
    document.addEventListener('mousemove', handleDragMove);
    document.addEventListener('touchmove', handleDragMove, { passive: false });
    document.addEventListener('mouseup', handleDragEnd);
    document.addEventListener('touchend', handleDragEnd);
    document.addEventListener('touchcancel', handleDragEnd);
    
    e.preventDefault();
  }
  
  function handleDragMove(e: MouseEvent | TouchEvent) {
    if (!isDraggingColorStop || !draggedStopId || !colorStopBarComponent) return;
    
    // Get the client X position (handle both mouse and touch events)
    let clientX: number;
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
    } else {
      clientX = e.clientX;
    }
    
    // Use the component's method to get the bar rect
    const rect = colorStopBarComponent.getBarRect();
    if (!rect) return;
    
    // Calculate the percentage position within the color stop bar
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    
    // Clamp the percentage between 0 and 100
    percentage = Math.max(0, Math.min(100, percentage));
    
    // Update the stop directly in the map
    if (colorStopsMap[draggedStopId]) {
      colorStopsMap = {
        ...colorStopsMap,
        [draggedStopId]: {
          ...colorStopsMap[draggedStopId],
          position: percentage
        }
      };
    }
    
    e.preventDefault();
  }
  
  function handleDragEnd(e: MouseEvent | TouchEvent) {
    if (!isDraggingColorStop || !draggedStopId) return;
    
    // No need to sort or do anything special - the derived colorStops array
    // will automatically be sorted based on position
    
    // Remove event listeners
    document.removeEventListener('mousemove', handleDragMove);
    document.removeEventListener('touchmove', handleDragMove);
    document.removeEventListener('mouseup', handleDragEnd);
    document.removeEventListener('touchend', handleDragEnd);
    document.removeEventListener('touchcancel', handleDragEnd);
    
    // Reset drag state
    isDraggingColorStop = false;
    draggedStopId = null;
    
    e.preventDefault();
  }
  
  // Helper function to interpolate between two colors
  function interpolateColor(color1: string, color2: string, ratio: number) {
    const r1 = parseInt(color1.slice(1, 3), 16);
    const g1 = parseInt(color1.slice(3, 5), 16);
    const b1 = parseInt(color1.slice(5, 7), 16);
    
    const r2 = parseInt(color2.slice(1, 3), 16);
    const g2 = parseInt(color2.slice(3, 5), 16);
    const b2 = parseInt(color2.slice(5, 7), 16);
    
    const r = Math.round(r1 + (r2 - r1) * ratio);
    const g = Math.round(g1 + (g2 - g1) * ratio);
    const b = Math.round(b1 + (b2 - b1) * ratio);
    
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  }
  
  // Handle preset selection
  function handlePresetSelect(event: CustomEvent<{
    id: string;
    name: string;
    gradientType: GradientType;
    angle?: number;
    centerX?: number;
    centerY?: number;
    radialOptions?: RadialGradientOptions;
    colorStops: ColorStop[];
  }>) {
    const preset = event.detail;
    
    // Update gradient type
    gradientType = preset.gradientType;
    
    // Update angle or center based on gradient type
    if (preset.gradientType === 'linear' || preset.gradientType === 'conic') {
      if (preset.angle !== undefined) {
        angle = preset.angle;
      }
    }
    
    if (preset.gradientType === 'radial' || preset.gradientType === 'conic') {
      if (preset.centerX !== undefined) {
        centerX = preset.centerX;
      }
      if (preset.centerY !== undefined) {
        centerY = preset.centerY;
      }
    }
    
    // Update radial options if applicable
    if (preset.gradientType === 'radial' && preset.radialOptions) {
      radialOptions = preset.radialOptions;
    }
    
    // Update color stops - create new stops with unique IDs
    const newStopsMap: Record<string, ColorStop> = {};
    preset.colorStops.forEach(stop => {
      const newId = generateId();
      newStopsMap[newId] = {
        id: newId,
        color: stop.color,
        position: stop.position,
        alpha: stop.alpha
      };
    });
    
    colorStopsMap = newStopsMap;
    
    // Select the first stop
    const firstStopId = Object.keys(newStopsMap)[0];
    if (firstStopId) {
      selectedStopId = firstStopId;
    }
  }
  
  // Export function
  function exportGradient() {
    // Handle SVG export differently
    if (exportFormat === 'svg') {
      exportSvgGradient();
      return;
    }
    
    // For raster formats (PNG, JPEG, WebP)
    // Create a new canvas with the export size
    const exportCanvas = document.createElement('canvas');
    exportCanvas.width = exportWidth;
    exportCanvas.height = exportHeight;
    const exportCtx = exportCanvas.getContext('2d');
    
    if (!exportCtx) return;
    
    // Sort color stops by position
    const sortedStops = [...colorStops].sort((a, b) => a.position - b.position);
    const colorStopsString = sortedStops.map(stop => {
      const rgba = hexToRgba(stop.color, stop.alpha);
      return `${rgba} ${stop.position}%`;
    }).join(', ');
    
    // Create a temporary div to render the gradient exactly as CSS would
    const tempDiv = document.createElement('div');
    tempDiv.style.width = `${exportWidth}px`;
    tempDiv.style.height = `${exportHeight}px`;
    tempDiv.style.position = 'absolute';
    tempDiv.style.left = '-9999px';
    tempDiv.style.top = '-9999px';
    
    // Apply the gradient based on type
    if (gradientType === 'linear') {
      tempDiv.style.background = `linear-gradient(${angle}deg, ${colorStopsString})`;
    } else if (gradientType === 'radial') {
      // Use percentage values for width and height based on scale
      const scalePercentage = radialOptions.scale * 100;
      tempDiv.style.background = `radial-gradient(${scalePercentage}% ${scalePercentage}% at ${centerX}% ${centerY}%, ${colorStopsString})`;
    } else if (gradientType === 'conic') {
      tempDiv.style.background = `conic-gradient(from ${angle}deg at ${centerX}% ${centerY}%, ${colorStopsString})`;
    }
    
    // Add the div to the document so it can be rendered
    document.body.appendChild(tempDiv);
    
    // Use html2canvas to capture the rendered gradient
    // This ensures the gradient is rendered exactly as CSS would
    import('html2canvas').then((html2canvasModule: any) => {
      html2canvasModule.default(tempDiv, {
        backgroundColor: null, // Transparent background
        scale: 1,
        logging: false,
        width: exportWidth,
        height: exportHeight
      }).then((canvas: HTMLCanvasElement) => {
        // Remove the temporary div
        document.body.removeChild(tempDiv);
        
        // Draw checkerboard pattern for transparency (only for PNG and WebP)
        if (exportFormat === 'png' || exportFormat === 'webp') {
          const tileSize = 10;
          const lightColor = '#f0f0f0';
          const darkColor = '#e0e0e0';
          
          for (let y = 0; y < exportHeight; y += tileSize) {
            for (let x = 0; x < exportWidth; x += tileSize) {
              exportCtx.fillStyle = ((x / tileSize) + (y / tileSize)) % 2 === 0 ? lightColor : darkColor;
              exportCtx.fillRect(x, y, tileSize, tileSize);
            }
          }
        } else {
          // For JPEG, fill with white background
          exportCtx.fillStyle = '#ffffff';
          exportCtx.fillRect(0, 0, exportWidth, exportHeight);
        }
        
        // Draw the captured gradient on top
        exportCtx.drawImage(canvas, 0, 0, exportWidth, exportHeight);
        
        // Convert to data URL and trigger download
        const dataURL = exportCanvas.toDataURL(`image/${exportFormat}`);
        const link = document.createElement('a');
        link.download = `gradient-texture.${exportFormat}`;
        link.href = dataURL;
        link.click();
      });
    }).catch(error => {
      console.error('Error exporting gradient:', error);
      
      // Fallback to the original method if html2canvas fails
      exportGradientFallback();
    });
  }
  
  // Fallback export function using the original canvas-based approach
  function exportGradientFallback() {
    // Create a new canvas with the export size
    const exportCanvas = document.createElement('canvas');
    exportCanvas.width = exportWidth;
    exportCanvas.height = exportHeight;
    const exportCtx = exportCanvas.getContext('2d');
    
    if (!exportCtx) return;
    
    // Draw checkerboard pattern for transparency
    const tileSize = 10;
    const lightColor = '#f0f0f0';
    const darkColor = '#e0e0e0';
    
    for (let y = 0; y < exportHeight; y += tileSize) {
      for (let x = 0; x < exportWidth; x += tileSize) {
        exportCtx.fillStyle = ((x / tileSize) + (y / tileSize)) % 2 === 0 ? lightColor : darkColor;
        exportCtx.fillRect(x, y, tileSize, tileSize);
      }
    }
    
    // Render gradient to export canvas
    let gradient: CanvasGradient | null = null;
    
    if (gradientType === 'linear') {
      // For linear gradients, use the full diagonal to ensure the gradient covers the entire canvas
      const adjustedAngle = (angle + 270) % 360;
      const radians = adjustedAngle * (Math.PI / 180);
      const diagonal = Math.sqrt(exportWidth * exportWidth + exportHeight * exportHeight) * 1.5; // Extend beyond canvas
      
      const centerX = exportWidth / 2;
      const centerY = exportHeight / 2;
      const startX = centerX - Math.cos(radians) * diagonal / 2;
      const startY = centerY - Math.sin(radians) * diagonal / 2;
      const endX = centerX + Math.cos(radians) * diagonal / 2;
      const endY = centerY + Math.sin(radians) * diagonal / 2;
      
      gradient = exportCtx.createLinearGradient(startX, startY, endX, endY);
    } else if (gradientType === 'radial') {
      const x = (centerX / 100) * exportWidth;
      const y = (centerY / 100) * exportHeight;
      
      // Apply scaling and ensure the gradient covers the entire canvas
      const scale = radialOptions.scale;
      const maxDimension = Math.max(exportWidth, exportHeight);
      const radius = maxDimension * scale; // Use the maximum dimension to ensure coverage
      
      gradient = exportCtx.createRadialGradient(x, y, 0, x, y, radius);
    } else if (gradientType === 'conic') {
      const x = (centerX / 100) * exportWidth;
      const y = (centerY / 100) * exportHeight;
      
      // Adjust the angle to match the preview
      const adjustedAngle = (angle + 270) % 360;
      const startAngle = (adjustedAngle * Math.PI) / 180;
      
      gradient = exportCtx.createConicGradient(startAngle, x, y);
    }
    
    // Sort color stops by position
    const sortedStops = [...colorStops].sort((a, b) => a.position - b.position);
    
    // Add color stops if gradient was created successfully
    if (gradient) {
      sortedStops.forEach(stop => {
        const rgba = hexToRgba(stop.color, stop.alpha);
        gradient.addColorStop(stop.position / 100, rgba);
      });
      
      exportCtx.fillStyle = gradient;
      exportCtx.fillRect(0, 0, exportWidth, exportHeight);
    }
    
    // Convert to data URL and trigger download
    const dataURL = exportCanvas.toDataURL(`image/${exportFormat}`);
    const link = document.createElement('a');
    link.download = `gradient-texture.${exportFormat}`;
    link.href = dataURL;
    link.click();
  }
  
  // Function to export gradient as SVG
  function exportSvgGradient() {
    // Sort color stops by position
    const sortedStops = [...colorStops].sort((a, b) => a.position - b.position);
    
    // Create SVG document
    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('width', exportWidth.toString());
    svg.setAttribute('height', exportHeight.toString());
    svg.setAttribute('xmlns', svgNS);
    
    // Create defs element for gradient definition
    const defs = document.createElementNS(svgNS, 'defs');
    
    // Create gradient element based on type
    let gradientElement: SVGLinearGradientElement | SVGRadialGradientElement | null = null;
    const gradientId = 'gradient';
    
    if (gradientType === 'linear') {
      gradientElement = document.createElementNS(svgNS, 'linearGradient') as SVGLinearGradientElement;
      gradientElement.setAttribute('id', gradientId);
      
      // Calculate gradient vector based on angle
      const adjustedAngle = (angle + 270) % 360;
      const radians = adjustedAngle * (Math.PI / 180);
      
      // Calculate start and end points
      const x1 = 50 - Math.cos(radians) * 50;
      const y1 = 50 - Math.sin(radians) * 50;
      const x2 = 50 + Math.cos(radians) * 50;
      const y2 = 50 + Math.sin(radians) * 50;
      
      // Set coordinates as percentages
      gradientElement.setAttribute('x1', `${x1}%`);
      gradientElement.setAttribute('y1', `${y1}%`);
      gradientElement.setAttribute('x2', `${x2}%`);
      gradientElement.setAttribute('y2', `${y2}%`);
      
    } else if (gradientType === 'radial') {
      gradientElement = document.createElementNS(svgNS, 'radialGradient') as SVGRadialGradientElement;
      gradientElement.setAttribute('id', gradientId);
      
      // Set center point
      gradientElement.setAttribute('cx', `${centerX}%`);
      gradientElement.setAttribute('cy', `${centerY}%`);
      gradientElement.setAttribute('r', `${50 * radialOptions.scale}%`);
      gradientElement.setAttribute('fx', `${centerX}%`);
      gradientElement.setAttribute('fy', `${centerY}%`);
      
    } else if (gradientType === 'conic') {
      // SVG doesn't have native conic gradients, so we'll use a workaround
      // We'll create a linear gradient as a fallback
      gradientElement = document.createElementNS(svgNS, 'linearGradient') as SVGLinearGradientElement;
      gradientElement.setAttribute('id', gradientId);
      
      // Add a note as a comment
      const comment = document.createComment('SVG does not support conic gradients natively. Using linear gradient as fallback.');
      defs.appendChild(comment);
      
      // Set a horizontal gradient as fallback
      gradientElement.setAttribute('x1', '0%');
      gradientElement.setAttribute('y1', '50%');
      gradientElement.setAttribute('x2', '100%');
      gradientElement.setAttribute('y2', '50%');
    }
    
    // Add color stops to gradient
    if (gradientElement) {
      sortedStops.forEach(stop => {
        const stopElement = document.createElementNS(svgNS, 'stop');
        stopElement.setAttribute('offset', `${stop.position}%`);
        stopElement.setAttribute('stop-color', stop.color);
        stopElement.setAttribute('stop-opacity', stop.alpha.toString());
        gradientElement!.appendChild(stopElement);
      });
      
      // Add gradient to defs
      defs.appendChild(gradientElement);
    }
    
    svg.appendChild(defs);
    
    // Create rectangle with gradient fill
    const rect = document.createElementNS(svgNS, 'rect');
    rect.setAttribute('x', '0');
    rect.setAttribute('y', '0');
    rect.setAttribute('width', '100%');
    rect.setAttribute('height', '100%');
    rect.setAttribute('fill', `url(#${gradientId})`);
    svg.appendChild(rect);
    
    // Convert SVG to string
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svg);
    
    // Create blob and download
    const blob = new Blob([svgString], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = 'gradient-texture.svg';
    link.href = url;
    link.click();
    
    // Clean up
    setTimeout(() => URL.revokeObjectURL(url), 100);
  }
  
  // Helper function to convert hex to rgba
  function hexToRgba(hex: string, alpha: number = 1): string {
    // Remove # if present
    hex = hex.replace('#', '');
    
    // Parse the hex values
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    // Format alpha to 2 decimal places max
    const formattedAlpha = alpha.toFixed(2).replace(/\.?0+$/, '');
    
    // Return rgba string
    return `rgba(${r}, ${g}, ${b}, ${formattedAlpha})`;
  }
  
  // Generate CSS code for the current gradient
  function generateCssCode(): string {
    // Update the CSS variable for the gradient border
    updateGradientBorderCssVar();
    
    // Sort color stops by position
    const sortedStops = [...colorStops].sort((a, b) => a.position - b.position);
    
    // Generate the color stops string with more detailed formatting
    const colorStopsString = sortedStops.map(stop => {
      const rgba = hexToRgba(stop.color, stop.alpha);
      // Format position to max 2 decimal places
      const position = stop.position.toFixed(2).replace(/\.?0+$/, '');
      return `${rgba} ${position}%`;
    }).join(', ');
    
    // Generate the CSS code based on gradient type
    if (gradientType === 'linear') {
      // Use the angle directly as it's already in CSS convention
      // In CSS: 0deg = bottom to top, 90deg = left to right
      // Format angle to max 2 decimal places
      const formattedAngle = angle.toFixed(2).replace(/\.?0+$/, '');
      return `background: linear-gradient(${formattedAngle}deg, ${colorStopsString});`;
    } else if (gradientType === 'radial') {
      // Format center position to max 2 decimal places
      const formattedCenterX = centerX.toFixed(2).replace(/\.?0+$/, '');
      const formattedCenterY = centerY.toFixed(2).replace(/\.?0+$/, '');
      
      // Apply scaling if provided (convert scale to percentage of the size)
      const scale = radialOptions.scale;
      
      // Use percentage values for width and height based on scale
      const scalePercentage = (scale * 100).toFixed(0);
      return `background: radial-gradient(${scalePercentage}% ${scalePercentage}% at ${formattedCenterX}% ${formattedCenterY}%, ${colorStopsString});`;
    } else if (gradientType === 'conic') {
      // Format center position and angle to max 2 decimal places
      const formattedCenterX = centerX.toFixed(2).replace(/\.?0+$/, '');
      const formattedCenterY = centerY.toFixed(2).replace(/\.?0+$/, '');
      const formattedAngle = angle.toFixed(2).replace(/\.?0+$/, '');
      
      return `background: conic-gradient(from ${formattedAngle}deg at ${formattedCenterX}% ${formattedCenterY}%, ${colorStopsString});`;
    }
    
    // Default return in case none of the conditions match (should never happen)
    return `background: linear-gradient(90deg, ${colorStopsString});`;
  }
  
  // Generate the full CSS code block
  function generateFullCssCode(): string {
    // Get the first color stop to use as fallback background color
    const sortedStops = [...colorStops].sort((a, b) => a.position - b.position);
    const firstStop = sortedStops[0];
    const fallbackColor = firstStop ? hexToRgba(firstStop.color, firstStop.alpha) : 'rgba(255, 95, 109, 1)';
    
    // Add fallback background color before the gradient
    return `background-color: ${fallbackColor};
${generateCssCode()}`;
  }
  
  // Update CSS variable for gradient border
  function updateGradientBorderCssVar() {
    // Only run in browser environment, not during SSR
    if (typeof window === 'undefined') return;
    
    // Sort color stops by position
    const sortedStops = [...colorStops].sort((a, b) => a.position - b.position);
    
    // Generate the color stops string
    const colorStopsString = sortedStops.map(stop => {
      const rgba = hexToRgba(stop.color, stop.alpha);
      const position = stop.position.toFixed(2).replace(/\.?0+$/, '');
      return `${rgba} ${position}%`;
    }).join(', ');
    
    // Create the gradient CSS
    let gradientCSS = `linear-gradient(90deg, ${colorStopsString})`; // Default value
    if (gradientType === 'linear') {
      // Use the angle directly as it's already in CSS convention
      // In CSS: 0deg = bottom to top, 90deg = left to right
      gradientCSS = `linear-gradient(${angle}deg, ${colorStopsString})`;
    } else if (gradientType === 'radial') {
      // For radial gradients with scaling, use percentage values for width and height
      // This allows the gradient to be scaled properly
      const scalePercentage = radialOptions.scale * 100;
      gradientCSS = `radial-gradient(${scalePercentage}% ${scalePercentage}% at ${centerX}% ${centerY}%, ${colorStopsString})`;
    } else if (gradientType === 'conic') {
      gradientCSS = `conic-gradient(from ${angle}deg at ${centerX}% ${centerY}%, ${colorStopsString})`;
    }
    
    // Set the CSS variable - only in browser environment
    if (typeof document !== 'undefined') {
      document.documentElement.style.setProperty('--current-gradient', gradientCSS);
    }
  }
  
  // Copy CSS code to clipboard
  function copyCssToClipboard() {
    const cssCode = generateFullCssCode();
    navigator.clipboard.writeText(cssCode)
      .then(() => {
        // Could add a toast notification here
        console.log('CSS copied to clipboard');
      })
      .catch(err => {
        console.error('Could not copy CSS: ', err);
      });
  }
  
  // Event handlers for components
  function handleAngleChange(newAngle: number) {
    angle = newAngle;
  }
  
  function handleCenterChange(newX: number, newY: number) {
    centerX = newX;
    centerY = newY;
    updateGradientBorderCssVar();
  }
  
  // Handle radial scale change
  function handleRadialScaleChange(newScale: number) {
    radialOptions.scale = newScale;
    updateGradientBorderCssVar();
  }
  
  function handleSnapChange(isSnapping: boolean) {
    isSnappingEnabled = isSnapping;
  }
</script>

<!-- WIP banner disabled for production -->
<!-- <WIPBanner /> -->

<!-- Main layout with side heading -->
<div class="relative container mx-auto px-4 py-8 max-w-6xl">
  <!-- Side heading (vertical text) -->
  <div class="absolute left-0 top-0 bottom-0 flex items-start">
    <h1 class="vertical-text text-5xl theme-heading whitespace-nowrap">MAKE GRADIENTS</h1>
  </div>
  
  <div class="flex flex-col lg:flex-row gap-4 mb-4 justify-center">
    <!-- Gradient Presets Column -->
    <div class="theme-card p-2 rounded-lg gradient-border w-auto">
      <GradientPresets on:selectPreset={handlePresetSelect} />
    </div>
    
    <!-- Gradient Preview -->
    <div class="theme-card p-4 rounded-lg gradient-border flex-1 flex-col items-center w-auto">
      <div class="w-full aspect-square">
        <GradientPreview 
          {gradientType}
          {angle}
          {centerX}
          {centerY}
          {colorStops}
          {radialOptions}
          {previewSize}
          {isSnappingEnabled}
          onAngleChange={handleAngleChange}
          onCenterChange={handleCenterChange}
        />
      </div>
      
      <!-- Color Stop Bar -->
      <div class="mt-4 w-full">
        <ColorStopBar 
          bind:this={colorStopBarComponent}
          {colorStops}
          {selectedStopId}
          onColorStopAdd={addColorStop}
          onColorStopSelect={selectColorStop}
          onColorStopDragStart={handleColorStopDragStart}
          onColorStopRemove={removeColorStop}
          onColorStopPositionChange={updateColorStopPosition}
        />
        <p class="text-sm mt-2 text-center theme-text-muted">Click to add a color stop, drag to move, click on a stop to edit, double-click to remove.</p>
      </div>
    </div>
    
    <!-- Controls -->
    <div class="theme-card p-4 rounded-lg gradient-border w-auto">
      <h2 class="text-xl mb-4 theme-heading">Settings</h2>
      <!-- Gradient Type -->
      <div class="mb-4">
        <GradientTypeSelector bind:gradientType />
      </div>
      
      <!-- Angle/Center Controls -->
      <div class="mb-4">
        {#if gradientType === 'linear'}
          <AngleControl 
            {angle} 
            onAngleChange={handleAngleChange}
            onSnapChange={handleSnapChange}
          />
        {:else if gradientType === 'radial'}
          <CenterControl 
            {centerX} 
            {centerY} 
            onCenterChange={handleCenterChange}
          />
          
          <!-- Radial Scale Control -->
          <div class="mt-4">
            <RadialScaleControl 
              {radialOptions}
              onScaleChange={handleRadialScaleChange}
            />
          </div>
        {:else if gradientType === 'conic'}
          <div class="space-y-4">
            <CenterControl 
              {centerX} 
              {centerY} 
              onCenterChange={handleCenterChange}
            />
            
            <AngleControl 
              {angle} 
              onAngleChange={handleAngleChange}
              onSnapChange={handleSnapChange}
            />
          </div>
        {/if}
      </div>
      
      <!-- Selected Color Stop Controls -->
      <ColorPicker 
        selectedStop={colorPickerStop}
        colorStops={colorStops}
        onColorStopSelect={selectColorStop}
        onColorChange={(updatedStop) => {
          if (selectedStop) {
            updateSelectedStopProperties(updatedStop.color, updatedStop.position, updatedStop.alpha);
          }
        }}
      />
      
      <!-- Separator line - temporarily hidden
      <hr class="my-4" style="border-color: var(--color-border-primary); border-width: 1px; border-style: solid; background: none;">
      
      <!-- Advertisement Placeholder - temporarily hidden
      <AdvertisementPlaceholder />
      -->
    </div>
  </div>
  
  <!-- Export Settings and CSS Code (Horizontal) -->
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
    <!-- Export Settings -->
    <div class="theme-card p-4 rounded-lg gradient-border">
      <h2 class="text-xl font-semibold mb-4 theme-heading">Export</h2>
      <ExportSettings 
        bind:exportWidth
        bind:exportHeight
        bind:exportFormat
        onExport={exportGradient}
      />
    </div>
    
    <!-- CSS Code Display -->
    <CSSCode 
      cssCode={generateFullCssCode()} 
      onCopy={copyCssToClipboard} 
    />
  </div>
</div>

<!-- Blog Posts Section -->
<BlogPosts posts={blogPosts} />

<!-- FAQ Section for SEO and user information -->
<FaqSection />



<style>
  :global(.gradient-border) {
    border: 0px solid transparent;
    background-clip: padding-box, border-box;
    background-origin: padding-box, border-box;
    /* background-image: linear-gradient(to bottom, var(--color-bg-secondary), var(--color-bg-secondary)), var(--current-gradient); */
  }
  
  /* Vertical text for side heading */
  .vertical-text {
    writing-mode: vertical-rl;
    transform: rotate(180deg);
    position: absolute;
    left: -50px; /* Position outside the main content area */
    top: 42px; /* Increased top spacing for better visual weight */
    color: var(--color-text-heading);
    font-weight: var(--font-weight-heading);
    word-spacing: 0.5em;
  }
</style>
