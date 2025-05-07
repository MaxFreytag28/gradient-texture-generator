<script lang="ts">
  import { onMount } from 'svelte';
  import { type ColorStop, type GradientType, type RadialGradientOptions } from '$lib/types';
  
  // Props using runes
  const props = $props<{
    gradientType: GradientType;
    angle: number;
    centerX: number;
    centerY: number;
    colorStops: ColorStop[];
    previewSize?: number;
    isSnappingEnabled?: boolean;
    radialOptions?: RadialGradientOptions;
    onAngleChange: (newAngle: number) => void;
    onCenterChange: (newX: number, newY: number) => void;
  }>();
  
  // Local state for tracking changes
  let localAngle = $state(props.angle);
  let localCenterX = $state(props.centerX);
  let localCenterY = $state(props.centerY);
  
  // Handle for angle/center
  let isDraggingHandle = $state(false);
  let isDraggingAngleHandle = $state(false);
  let handleX = $state(0);
  let handleY = $state(0);
  let angleHandleX = $state(0);
  let angleHandleY = $state(0);
  
  // Preview element
  let previewElement: HTMLDivElement;
  
  // Watch for prop changes to update local state
  $effect(() => {
    localAngle = props.angle;
    localCenterX = props.centerX;
    localCenterY = props.centerY;
    updateHandlePosition();
    updateGradientCSS();
  });
  
  // Watch for gradient type changes
  let prevGradientType = $state(props.gradientType);
  $effect(() => {
    // Always update when gradient type changes
    prevGradientType = props.gradientType;
    // Force an immediate update of handle positions and CSS
    updateHandlePosition();
    updateGradientCSS();
  });
  
  onMount(() => {
    updateHandlePosition();
    updateGradientCSS();
  });
  
  // Update handle position based on angle or center
  function updateHandlePosition() {
    const displaySize = props.previewSize || 512;
    
    if (props.gradientType === 'linear') {
      // Calculate handle position based on CSS angle convention
      // In CSS: 0deg = to top, 90deg = to right, 180deg = to bottom, 270deg = to left
      // Convert angle to radians, adjusting for CSS convention
      const radians = (90 - localAngle) * (Math.PI / 180);
      const lineLength = displaySize * 0.2; // Fixed line length - 20% of the display size for handle position
      handleX = displaySize / 2 + Math.cos(radians) * lineLength;
      handleY = displaySize / 2 - Math.sin(radians) * lineLength; // Note the minus sign for correct visual representation
    } else if (props.gradientType === 'radial') {
      // For radial gradients, handle represents center
      handleX = (localCenterX / 100) * displaySize;
      handleY = (localCenterY / 100) * displaySize;
    } else if (props.gradientType === 'conic') {
      // For conic gradients, we have two handles:
      // 1. Center handle for position
      handleX = (localCenterX / 100) * displaySize;
      handleY = (localCenterY / 100) * displaySize;
      
      // 2. Angle handle for rotation
      // Convert angle to radians, adjusting for CSS convention
      const radians = (90 - localAngle) * (Math.PI / 180);
      const lineLength = displaySize * 0.2; // Fixed line length - 20% of the display size for handle position
      angleHandleX = handleX + Math.cos(radians) * lineLength;
      angleHandleY = handleY - Math.sin(radians) * lineLength; // Note the minus sign for correct visual representation
    }
  }
  
  // Generate CSS gradient string
  function getGradientCSS(): string {
    // Sort color stops by position for the gradient
    const sortedStops = [...props.colorStops].sort((a, b) => a.position - b.position);
    
    // Create color stops string
    const colorStopsString = sortedStops.map(stop => {
      const rgba = hexToRgba(stop.color, stop.alpha);
      return `${rgba} ${stop.position}%`;
    }).join(', ');
    
    if (props.gradientType === 'linear') {
      // Use the angle directly for linear gradients
      // This matches the behavior in the main component
      return `linear-gradient(${localAngle}deg, ${colorStopsString})`;
    } else if (props.gradientType === 'radial') {
      // For radial gradients, we need to handle the scale
      const scale = props.radialOptions?.scale || 1.0;
      
      // Only include size if scale is not 1.0 (100%)
      let sizeStr = '';
      if (scale !== 1.0) {
        sizeStr = ` ${scale * 100}%`;
      }
      
      return `radial-gradient(circle${sizeStr} at ${localCenterX}% ${localCenterY}%, ${colorStopsString})`;
    } else if (props.gradientType === 'conic') {
      // Use the angle directly for conic gradients
      // This matches the behavior in the main component
      return `conic-gradient(from ${localAngle}deg at ${localCenterX}% ${localCenterY}%, ${colorStopsString})`;
    }
    
    return '';
  }
  
  // Update gradient CSS
  function updateGradientCSS() {
    if (!previewElement) return;
    // Apply the gradient on top of the transparency checkerboard
    const checkerboard = "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMUlEQVQ4T2NkYGAQYcAP3uCTZhw1gGGYhAGBZIA/nYDCgBDAm9BGDWAAJyRCgLaBCAAgXwixzAS0pgAAAABJRU5ErkJggg==')";
    previewElement.style.backgroundImage = `${getGradientCSS()}, ${checkerboard}`;
  }
  
  // Handle mouse/touch events for the gradient preview
  function startDragHandle(e: MouseEvent | TouchEvent) {
    isDraggingHandle = true;
    isDraggingAngleHandle = false;
    
    // Change cursor to grabbing
    const handleElement = e.currentTarget as HTMLElement;
    handleElement.style.cursor = 'grabbing';
    
    // Add event listeners for dragging
    document.addEventListener('mousemove', dragHandle);
    document.addEventListener('mouseup', stopDragHandle);
    document.addEventListener('touchmove', dragHandle, { passive: false });
    document.addEventListener('touchend', stopDragHandle);
    document.addEventListener('touchcancel', stopDragHandle);
    
    // Prevent default to avoid text selection during drag
    e.preventDefault();
    e.stopPropagation();
  }
  
  function startDragAngleHandle(e: MouseEvent | TouchEvent) {
    isDraggingAngleHandle = true;
    isDraggingHandle = false;
    
    // Change cursor to grabbing
    const handleElement = e.currentTarget as HTMLElement;
    handleElement.style.cursor = 'grabbing';
    
    // Add event listeners for dragging
    document.addEventListener('mousemove', dragHandle);
    document.addEventListener('mouseup', stopDragHandle);
    document.addEventListener('touchmove', dragHandle, { passive: false });
    document.addEventListener('touchend', stopDragHandle);
    document.addEventListener('touchcancel', stopDragHandle);
    
    // Prevent default to avoid text selection during drag
    e.preventDefault();
    e.stopPropagation();
  }
  
  function dragHandle(e: MouseEvent | TouchEvent) {
    if (!isDraggingHandle && !isDraggingAngleHandle) return;
    
    e.preventDefault();
    
    // Get client coordinates from either mouse or touch event
    let clientX: number, clientY: number;
    
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    
    const rect = previewElement.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    
    // Constrain to preview boundaries
    const clampedX = Math.max(0, Math.min(rect.width, x));
    const clampedY = Math.max(0, Math.min(rect.height, y));
    
    // Convert to preview coordinates
    const size = props.previewSize || 512;
    
    if (isDraggingHandle) {
      handleX = (clampedX / rect.width) * size;
      handleY = (clampedY / rect.height) * size;
    } else if (isDraggingAngleHandle) {
      // For angle handle, we're only updating the angle handle position
      angleHandleX = (clampedX / rect.width) * size;
      angleHandleY = (clampedY / rect.height) * size;
    }
    
    if (props.gradientType === 'linear') {
      // Calculate angle based on handle position relative to center
      const dx = handleX - size / 2;
      const dy = handleY - size / 2;
      
      // Calculate angle in radians and convert to degrees
      // Using dy (not -dy) to make clockwise rotation match mouse movement
      let angle = Math.atan2(dy, dx) * (180 / Math.PI);
      
      // Convert to CSS angle convention (0deg = to top, 90deg = to right)
      angle = (90 - angle) % 360;
      if (angle < 0) angle += 360;
      
      // Apply snapping if enabled
      if (props.isSnappingEnabled) {
        localAngle = Math.round(angle / 5) * 5;
      } else {
        localAngle = Math.round(angle * 10) / 10;
      }
      
      // Notify parent component
      props.onAngleChange(localAngle);
    } else if (props.gradientType === 'radial') {
      // For radial gradients, set center directly
      localCenterX = (handleX / size) * 100;
      localCenterY = (handleY / size) * 100;
      
      // Notify parent component
      props.onCenterChange(localCenterX, localCenterY);
    } else if (props.gradientType === 'conic') {
      if (isDraggingHandle) {
        // When dragging the center handle, update the center position
        localCenterX = (handleX / size) * 100;
        localCenterY = (handleY / size) * 100;
        
        // Update angle handle position based on new center
        const radians = localAngle * (Math.PI / 180);
        const lineLength = size * 0.2;
        angleHandleX = handleX + Math.cos(radians) * lineLength;
        angleHandleY = handleY + Math.sin(radians) * lineLength;
        
        // Notify parent component about center change
        props.onCenterChange(localCenterX, localCenterY);
      } else if (isDraggingAngleHandle) {
        // When dragging the angle handle, calculate angle based on center and angle handle positions
        const dx = angleHandleX - handleX;
        const dy = angleHandleY - handleY;
        
        // Calculate angle in radians and convert to degrees
        // Using dy (not -dy) to make clockwise rotation match mouse movement
        let angle = Math.atan2(dy, dx) * (180 / Math.PI);
        
        // Convert to CSS angle convention (0deg = to top, 90deg = to right)
        angle = (90 - angle) % 360;
        if (angle < 0) angle += 360;
        
        // Apply snapping if enabled
        if (props.isSnappingEnabled) {
          localAngle = Math.round(angle / 5) * 5;
        } else {
          localAngle = Math.round(angle * 10) / 10;
        }
        
        // Notify parent component about angle change
        props.onAngleChange(localAngle);
      }
    }
    
    // Update handle position and gradient
    updateHandlePosition();
    updateGradientCSS();
  }
  
  function stopDragHandle(e: MouseEvent | TouchEvent) {
    if (isDraggingHandle || isDraggingAngleHandle) {
      // Reset dragging states
      isDraggingHandle = false;
      isDraggingAngleHandle = false;
      
      // Reset cursor on handles
      const handleElement = document.getElementById('gradient-handle');
      if (handleElement) {
        handleElement.style.cursor = 'grab';
      }
      
      const angleHandleElement = document.getElementById('angle-handle');
      if (angleHandleElement) {
        angleHandleElement.style.cursor = 'grab';
      }
      
      // Remove event listeners
      document.removeEventListener('mousemove', dragHandle);
      document.removeEventListener('mouseup', stopDragHandle);
      document.removeEventListener('touchmove', dragHandle);
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
      // For linear gradients, arrow keys adjust angle
      switch (e.key) {
        case 'ArrowUp':
          localAngle = (localAngle - step + 360) % 360;
          props.onAngleChange(localAngle);
          break;
        case 'ArrowDown':
          localAngle = (localAngle + step) % 360;
          props.onAngleChange(localAngle);
          break;
        case 'ArrowLeft':
          localAngle = (localAngle - step + 360) % 360;
          props.onAngleChange(localAngle);
          break;
        case 'ArrowRight':
          localAngle = (localAngle + step) % 360;
          props.onAngleChange(localAngle);
          break;
        default:
          return; // Don't prevent default for other keys
      }
    } else {
      // For radial and conic gradients, arrow keys adjust center position
      switch (e.key) {
        case 'ArrowUp':
          localCenterY = Math.max(0, localCenterY - step);
          props.onCenterChange(localCenterX, localCenterY);
          break;
        case 'ArrowDown':
          localCenterY = Math.min(100, localCenterY + step);
          props.onCenterChange(localCenterX, localCenterY);
          break;
        case 'ArrowLeft':
          localCenterX = Math.max(0, localCenterX - step);
          props.onCenterChange(localCenterX, localCenterY);
          break;
        case 'ArrowRight':
          localCenterX = Math.min(100, localCenterX + step);
          props.onCenterChange(localCenterX, localCenterY);
          break;
        default:
          return; // Don't prevent default for other keys
      }
    }
    
    updateHandlePosition();
    updateGradientCSS();
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
    updateGradientCSS();
  }
  
  // Handle mousedown on the preview to set handle position and immediately start dragging
  function handlePreviewClick(e: MouseEvent) {
    if (isDraggingHandle || isDraggingAngleHandle) return;
    
    const rect = previewElement.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Convert to preview coordinates
    const size = props.previewSize || 512;
    handleX = (x / rect.width) * size;
    handleY = (y / rect.height) * size;
    
    if (props.gradientType === 'linear') {
      // Calculate angle based on handle position relative to center
      const dx = handleX - size / 2;
      const dy = handleY - size / 2;
      
      // Calculate angle in radians and convert to degrees
      // Using dy (not -dy) to make clockwise rotation match mouse movement
      let angle = Math.atan2(dy, dx) * (180 / Math.PI);
      
      // Convert to CSS angle convention
      angle = (90 - angle) % 360;
      if (angle < 0) angle += 360;
      
      localAngle = angle;
      props.onAngleChange(localAngle);
    } else {
      // For radial and conic gradients, set center directly
      localCenterX = (handleX / size) * 100;
      localCenterY = (handleY / size) * 100;
      props.onCenterChange(localCenterX, localCenterY);
    }
    
    updateHandlePosition();
    updateGradientCSS();
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
</script>

<div class="relative">
  <div class="relative w-full aspect-square">
    <!-- CSS Gradient Preview -->
    <div
      bind:this={previewElement}
      class="w-full h-full border border-gray-300 rounded-lg cursor-crosshair"
      style="touch-action: none;"
      onmousedown={handlePreviewClick}
      role="button"
      aria-label="Click to set gradient position"
      tabindex="0"
    ></div>
    
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
          transform: rotate({localAngle}deg);
          transform-origin: left center;
        "
      ></div>
    {:else if props.gradientType === 'conic'}
      <!-- Line connecting center handle to angle handle -->
      <div 
        class="absolute pointer-events-none z-[5]"
        style="
          left: {(localCenterX / 100) * 100}%; 
          top: {(localCenterY / 100) * 100}%; 
          width: {(props.previewSize || 512) * 0.3 - 24}px; 
          height: 1px; 
          background-color: rgba(0, 0, 0, 0.3);
          transform: rotate({localAngle}deg);
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
    
    <!-- Angle Handle for Conic Gradients -->
    {#if props.gradientType === 'conic'}
      <div 
        id="angle-handle"
        class="absolute w-[20px] h-[20px] rounded-full bg-transparent cursor-grab transform -translate-x-1/2 -translate-y-1/2 z-10"
        style="
          left: {angleHandleX / (props.previewSize || 512) * 100}%; 
          top: {angleHandleY / (props.previewSize || 512) * 100}%; 
          border: 2px solid rgba(0, 0, 0, 0.3);
        "
        tabindex="0"
        role="slider"
        aria-label="Angle: {localAngle.toFixed(1)}°"
        aria-valuemin="0"
        aria-valuemax="360"
        aria-valuenow="{localAngle}"
        onmousedown={startDragAngleHandle}
        ontouchstart={startDragAngleHandle}
        ondblclick={resetHandle}
      ></div>
    {/if}
  </div>
</div>
