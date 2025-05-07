<script lang="ts">
  import { onMount } from 'svelte';
  import { type ColorStop } from '$lib/types';
  
  // Props using runes
  const props = $props<{
    gradientType: 'linear' | 'radial';
    angle: number;
    centerX: number;
    centerY: number;
    colorStops: ColorStop[];
    previewSize?: number;
    isSnappingEnabled?: boolean;
    onAngleChange: (newAngle: number) => void;
    onCenterChange: (newX: number, newY: number) => void;
  }>();
  
  // Local state for tracking changes
  let localAngle = $state(props.angle);
  let localCenterX = $state(props.centerX);
  let localCenterY = $state(props.centerY);
  
  // Canvas and context
  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D | null;
  
  // Handle for angle/center
  let isDraggingHandle = $state(false);
  let handleX = $state(0);
  let handleY = $state(0);
  
  // Watch for prop changes to update local state
  $effect(() => {
    localAngle = props.angle;
    localCenterX = props.centerX;
    localCenterY = props.centerY;
  });
  
  onMount(() => {
    ctx = canvas.getContext('2d');
    updateHandlePosition();
    renderGradient();
    
    // Set up resize observer to handle canvas resizing
    const resizeObserver = new ResizeObserver(() => {
      renderGradient();
    });
    
    if (canvas) {
      resizeObserver.observe(canvas);
    }
    
    return () => {
      if (canvas) {
        resizeObserver.unobserve(canvas);
      }
    };
  });
  
  // Update handle position based on angle or center
  function updateHandlePosition() {
    const size = props.previewSize || 512;
    
    if (props.gradientType === 'linear') {
      // Calculate handle position based on CSS angle convention
      // CSS: 0deg = bottom to top, 90deg = left to right
      // Convert to radians for handle positioning
      const cssToCanvasAngle = (90 - localAngle) % 360; // Convert CSS angle to canvas angle
      const radians = (cssToCanvasAngle + 180) * (Math.PI / 180);
      const lineLength = size * 0.2; // Fixed line length - 20% of the canvas size for handle position
      handleX = size / 2 + Math.cos(radians) * lineLength;
      handleY = size / 2 + Math.sin(radians) * lineLength;
    } else {
      // For radial gradients, handle represents center
      handleX = (localCenterX / 100) * size;
      handleY = (localCenterY / 100) * size;
    }
  }
  
  // Render gradient to canvas
  function renderGradient() {
    if (!ctx) return;
    
    const size = props.previewSize || 512;
    ctx.clearRect(0, 0, size, size);
    
    // Draw checkerboard pattern for transparency
    drawCheckerboard();
    
    let gradient;
    
    if (props.gradientType === 'linear') {
      // Convert angle from CSS convention to canvas coordinates
      // CSS: 0deg = bottom to top, 90deg = left to right
      // We need to adjust the angle to match this convention in canvas
      const cssToCanvasAngle = (90 - localAngle) % 360; // Convert CSS angle to canvas angle
      const radians = cssToCanvasAngle * (Math.PI / 180);
      const diagonal = Math.sqrt(2) * size;
      
      const startX = size / 2 - Math.cos(radians) * diagonal / 2;
      const startY = size / 2 - Math.sin(radians) * diagonal / 2;
      const endX = size / 2 + Math.cos(radians) * diagonal / 2;
      const endY = size / 2 + Math.sin(radians) * diagonal / 2;
      
      gradient = ctx.createLinearGradient(startX, startY, endX, endY);
    } else {
      // Radial gradient
      const x = (localCenterX / 100) * size;
      const y = (localCenterY / 100) * size;
      const radius = size / 2;
      
      gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
    }
    
    // Sort color stops by position for the canvas gradient
    const sortedStops = [...props.colorStops].sort((a, b) => a.position - b.position);
    
    // Add color stops
    sortedStops.forEach(stop => {
      const rgba = hexToRgba(stop.color, stop.alpha);
      gradient.addColorStop(stop.position / 100, rgba);
    });
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
    
    // Draw guide lines
    drawGuideLines();
    
    // Update handle position in DOM
    updateHandleDOM();
  }
  
  // Draw checkerboard pattern for transparency
  function drawCheckerboard() {
    if (!ctx) return;
    
    const size = props.previewSize || 512;
    const tileSize = 10;
    const lightColor = '#f0f0f0';
    const darkColor = '#e0e0e0';
    
    for (let y = 0; y < size; y += tileSize) {
      for (let x = 0; x < size; x += tileSize) {
        ctx.fillStyle = ((x / tileSize) + (y / tileSize)) % 2 === 0 ? lightColor : darkColor;
        ctx.fillRect(x, y, tileSize, tileSize);
      }
    }
  }
  // We no longer draw guide lines on the canvas
  function drawGuideLines() {
    // Empty function - we're using DOM elements instead
  }
  
  // Update handle position in the DOM
  function updateHandleDOM() {
    const handleElement = document.getElementById('gradient-handle');
    if (!handleElement) return;
    
    // Update handle position
    handleElement.style.left = `${(handleX / (props.previewSize || 512)) * 100}%`;
    handleElement.style.top = `${(handleY / (props.previewSize || 512)) * 100}%`;
  }
  
  // Handle mouse/touch events for the gradient preview
  function startDragHandle(e: MouseEvent | TouchEvent) {
    isDraggingHandle = true;
    
    // Change cursor to grabbing
    const handleElement = e.currentTarget as HTMLElement;
    handleElement.style.cursor = 'grabbing';
    
    // Add event listeners to document for better drag handling
    document.addEventListener('mousemove', dragHandle);
    document.addEventListener('touchmove', dragHandle, { passive: false });
    document.addEventListener('mouseup', stopDragHandle);
    document.addEventListener('touchend', stopDragHandle);
    document.addEventListener('touchcancel', stopDragHandle);
    
    // Prevent default to avoid text selection during drag
    e.preventDefault();
    e.stopPropagation();
  }
  
  function dragHandle(e: MouseEvent | TouchEvent) {
    if (!isDraggingHandle) return;
    
    e.preventDefault();
    
    // Get client coordinates from either mouse or touch event
    let clientX: number, clientY: number;
    
    if ('touches' in e) {
      // Touch event
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      // Mouse event
      clientX = e.clientX;
      clientY = e.clientY;
    }
    
    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    
    // Constrain to canvas boundaries
    const clampedX = Math.max(0, Math.min(rect.width, x));
    const clampedY = Math.max(0, Math.min(rect.height, y));
    
    // Convert to canvas coordinates (internal canvas size)
    handleX = (clampedX / rect.width) * (props.previewSize || 512);
    handleY = (clampedY / rect.height) * (props.previewSize || 512);
    
    if (props.gradientType === 'linear') {
      // Calculate angle based on handle position relative to center
      const size = props.previewSize || 512;
      const dx = handleX - size / 2;
      const dy = handleY - size / 2;
      // Calculate canvas angle first
      let canvasAngle = (Math.atan2(dy, dx) * (180 / Math.PI) + 180) % 360;
      if (canvasAngle < 0) canvasAngle += 360;
      
      // Convert canvas angle to CSS angle
      // CSS: 0deg = bottom to top, 90deg = left to right
      localAngle = (90 - canvasAngle + 360) % 360;
      
      // Use the isSnappingEnabled prop directly instead of trying to detect it
      if (props.isSnappingEnabled) {
        // Apply 5-degree snapping
        localAngle = Math.round(localAngle / 5) * 5;
      } else {
        // No snapping, use the exact angle (with minimal rounding for floating point precision)
        localAngle = Math.round(localAngle * 10) / 10;
      }
      
      // Notify parent component
      props.onAngleChange(localAngle);
    } else {
      // Update center position for radial gradient
      const size = props.previewSize || 512;
      localCenterX = (handleX / size) * 100;
      localCenterY = (handleY / size) * 100;
      
      // Notify parent component
      props.onCenterChange(localCenterX, localCenterY);
    }
    
    renderGradient();
    e.preventDefault(); // Prevent text selection during drag
  }
  
  function stopDragHandle(e: MouseEvent | TouchEvent) {
    if (isDraggingHandle) {
      isDraggingHandle = false;
      
      // Reset cursor on handle
      const handleElement = document.getElementById('gradient-handle');
      if (handleElement) {
        handleElement.style.cursor = 'grab';
      }
      
      // Reset document cursor
      document.body.style.cursor = 'default';
      
      // Reset canvas cursor
      if (canvas) {
        canvas.style.cursor = 'crosshair';
      }
      
      // Remove event listeners from document
      document.removeEventListener('mousemove', dragHandle);
      document.removeEventListener('touchmove', dragHandle);
      document.removeEventListener('mouseup', stopDragHandle);
      document.removeEventListener('touchend', stopDragHandle);
      document.removeEventListener('touchcancel', stopDragHandle);
      
      e.preventDefault();
    }
  }
  
  // Handle keyboard navigation for the handle
  function handleKeydown(e: KeyboardEvent) {
    // Only process if we're not already dragging
    if (isDraggingHandle) return;
    
    const step = e.shiftKey ? 10 : 1;
    if (props.gradientType === 'linear') {
      const size = props.previewSize || 512;
      const dx = handleX - size / 2;
      const dy = handleY - size / 2;
      // Adjust the angle calculation to match our rotated control (180 degrees)
      localAngle = (Math.atan2(dy, dx) * (180 / Math.PI) + 180) % 360;
      if (localAngle < 0) localAngle += 360;
      
      // Check if the parent angle is a multiple of 5 (indicating snapping is enabled)
      const isSnappingEnabled = Math.abs(Math.round(props.angle / 5) * 5 - props.angle) < 0.001;
      
      if (isSnappingEnabled) {
        // Apply 5-degree snapping
        localAngle = Math.round(localAngle / 5) * 5;
      } else {
        // No snapping, use the exact angle (with minimal rounding for floating point precision)
        localAngle = Math.round(localAngle * 10) / 10;
      }
      
      props.onAngleChange(localAngle);
    }
    
    renderGradient();
    e.preventDefault();
  }
  
  // Reset handle to default position on double-click
  function resetHandle() {
    if (props.gradientType === 'linear') {
      // Reset angle to 90 degrees (left to right)
      localAngle = 90;
      props.onAngleChange(localAngle);
    } else {
      // Reset center to middle (50%, 50%)
      localCenterX = 50;
      localCenterY = 50;
      props.onCenterChange(localCenterX, localCenterY);
    }
    updateHandlePosition();
    renderGradient();
  }
  
  // Handle mousedown on the canvas to set handle position and immediately start dragging
  function handleCanvasClick(e: MouseEvent) {
    // Don't process if we're already dragging
    if (isDraggingHandle) return;
    
    const rect = canvas.getBoundingClientRect();
    const size = props.previewSize || 512;
    
    // Calculate click position relative to canvas
    const clickX = ((e.clientX - rect.left) / rect.width) * size;
    const clickY = ((e.clientY - rect.top) / rect.height) * size;
    
    if (props.gradientType === 'linear') {
      // Calculate angle based on click position relative to center
      const dx = clickX - size / 2;
      const dy = clickY - size / 2;
      // Calculate canvas angle first
      let canvasAngle = (Math.atan2(dy, dx) * (180 / Math.PI) + 180) % 360;
      if (canvasAngle < 0) canvasAngle += 360;
      
      // Convert canvas angle to CSS angle
      // CSS: 0deg = bottom to top, 90deg = left to right
      localAngle = (90 - canvasAngle + 360) % 360;
      
      // Only apply snapping if it's enabled via the prop
      if (props.isSnappingEnabled) {
        localAngle = Math.round(localAngle / 5) * 5;
      } else {
        // Otherwise, use the exact angle with minimal rounding for floating point precision
        localAngle = Math.round(localAngle * 10) / 10;
      }
      
      props.onAngleChange(localAngle);
    } else {
      // For radial gradients, set center directly
      localCenterX = (clickX / size) * 100;
      localCenterY = (clickY / size) * 100;
      props.onCenterChange(localCenterX, localCenterY);
    }
    
    // Update handle position immediately
    updateHandlePosition();
    renderGradient();
    
    // Start dragging immediately - this is the key part that makes the handle "in hand"
    isDraggingHandle = true;
    
    // Set document cursor to grabbing
    document.body.style.cursor = 'grabbing';
    
    // Set the handle cursor to grabbing
    const handleElement = document.getElementById('gradient-handle');
    if (handleElement) {
      handleElement.style.cursor = 'grabbing';
    }
    
    // Add event listeners for dragging
    document.addEventListener('mousemove', dragHandle);
    document.addEventListener('mouseup', stopDragHandle);
    document.addEventListener('touchmove', dragHandle, { passive: false });
    document.addEventListener('touchend', stopDragHandle);
    document.addEventListener('touchcancel', stopDragHandle);
    
    // Prevent default to avoid text selection
    e.preventDefault();
  }
  
  // Helper function to convert hex to rgba
  function hexToRgba(hex: string, alpha: number = 1): string {
    // Remove # if present
    hex = hex.replace('#', '');
    
    // Parse the hex values
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    // Return rgba string
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  

  
  // Watch for changes to update the gradient
  $effect(() => {
    if (ctx && (props.gradientType || localAngle || localCenterX || localCenterY || props.colorStops)) {
      updateHandlePosition();
      renderGradient();
    }
  });
</script>

<div class="relative">
  <div class="relative w-full aspect-square">
    <canvas
      bind:this={canvas}
      width={props.previewSize || 512}
      height={props.previewSize || 512}
      class="w-full h-full border border-gray-300 rounded-lg cursor-crosshair"
      aria-label="Gradient preview canvas"
      style="touch-action: none;"
      onmousedown={handleCanvasClick}
    ></canvas>
    
    <!-- DOM-based line from center -->
    {#if props.gradientType === 'linear'}
      <div 
        class="absolute pointer-events-none z-[5]"
        style="
          left: 50%; 
          top: 50%; 
          width: {(props.previewSize || 512) * 0.3 - 24}px; 
          height: 1px; 
          background-color: rgba(0, 0, 0, 0.3);
          transform: rotate({270 - localAngle}deg);
          transform-origin: left center;
        "
      ></div>
    {/if}
    
    <!-- Gradient Handle Overlay -->
    <div 
      id="gradient-handle"
      class="absolute w-[20px] h-[20px] rounded-full bg-transparent cursor-grab transform -translate-x-1/2 -translate-y-1/2 z-10"
      style="
        left: {handleX / (props.previewSize || 512) * 100}%; 
        top: {handleY / (props.previewSize || 512) * 100}%; 
        border: 2px solid rgba(0, 0, 0, 0.3);
      "
      tabindex="0"
      role="slider"
      aria-label="{props.gradientType === 'linear' ? `Angle: ${localAngle.toFixed(1)}°` : `Center: X ${localCenterX.toFixed(1)}%, Y ${localCenterY.toFixed(1)}%`}"
      aria-valuemin="0"
      aria-valuemax="{props.gradientType === 'linear' ? 360 : 100}"
      aria-valuenow="{props.gradientType === 'linear' ? localAngle : (localCenterX + localCenterY) / 2}"
      onkeydown={handleKeydown}
      onmousedown={startDragHandle}
      ontouchstart={startDragHandle}
      ondblclick={resetHandle}
    ></div>
  </div>
</div>
