export const pngVsSvgPost = {
  id: '2',
  title: 'PNG vs SVG Gradients: Choosing the Best Format',
  excerpt: 'Learn the pros and cons of SVG and PNG gradients to make the best choice for your design needs.',
  slug: 'png-vs-svg-gradients',
  gradient: 'from-blue-500 via-cyan-500 to-teal-500',
  date: '2025-05-12',
  content: `
    <p class="mb-8 text-lg">PNG or SVG for your gradients? Both work, but they're built for different things. Here's when to use each.</p>
    
    <div class="space-y-8">
      <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 class="text-xl font-bold font-heading mb-4">PNG Gradients</h3>
        <p class="mb-4">PNG is a raster format. Your gradient is pixels.</p>
        
        <div class="mt-4">
          <h4 class="font-bold mb-2">When to use PNG:</h4>
          <ul class="space-y-2 ml-4">
            <li>• <strong>Complex gradients</strong> - Multiple colors, textures, effects</li>
            <li>• <strong>Print design</strong> - Flyers, posters, business cards</li>
            <li>• <strong>Social media</strong> - Graphics for Instagram, Twitter, Facebook</li>
            <li>• <strong>Design software</strong> - Photoshop, Figma, Sketch</li>
            <li>• <strong>Exact color matching</strong> - What you see is what you get</li>
          </ul>
          
          <h4 class="font-bold mt-4 mb-2">Downsides:</h4>
          <ul class="space-y-2 ml-4">
            <li>• Pixelates when scaled up</li>
            <li>• Larger file size</li>
            <li>• Can't be edited without image software</li>
          </ul>
        </div>
      </div>
      
      <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 class="text-xl font-bold font-heading mb-4">SVG Gradients</h3>
        <p class="mb-4">SVG is a vector format. Your gradient is code.</p>
        
        <div class="mt-4">
          <h4 class="font-bold mb-2">When to use SVG:</h4>
          <ul class="space-y-2 ml-4">
            <li>• <strong>Icons and logos</strong> - Need to scale without blur</li>
            <li>• <strong>Responsive design</strong> - Different screen sizes</li>
            <li>• <strong>Simple gradients</strong> - 2-3 colors, clean transitions</li>
            <li>• <strong>Web graphics</strong> - Faster than PNG for simple gradients</li>
            <li>• <strong>Animation</strong> - Can be animated with CSS or JavaScript</li>
          </ul>
          
          <h4 class="font-bold mt-4 mb-2">Downsides:</h4>
          <ul class="space-y-2 ml-4">
            <li>• Older software might not support it</li>
            <li>• Complex gradients increase file size</li>
            <li>• Limited filter/texture support</li>
          </ul>
        </div>
      </div>
      
      <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 class="text-xl font-bold font-heading mb-4">File Size Comparison</h3>
        <p class="mb-4">Here's how they compare for a simple two-color gradient:</p>
        
        <div class="grid md:grid-cols-2 gap-4">
          <div class="p-4 rounded-lg" style="background-color: var(--color-bg-secondary);">
            <h4 class="font-bold mb-2">PNG (512x512)</h4>
            <p class="text-2xl font-bold text-accent-primary">~45 KB</p>
            <p class="text-sm mt-2">Scales poorly, looks good at native size</p>
          </div>
          <div class="p-4 rounded-lg" style="background-color: var(--color-bg-secondary);">
            <h4 class="font-bold mb-2">SVG (any size)</h4>
            <p class="text-2xl font-bold text-accent-primary">~1 KB</p>
            <p class="text-sm mt-2">Scales infinitely, always sharp</p>
          </div>
        </div>
      </div>
      
      <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 class="text-xl font-bold font-heading mb-4">Quick Decision Tree</h3>
        <div class="space-y-3">
          <div class="p-4 rounded-lg" style="background-color: var(--color-bg-secondary);">
            <p class="font-bold">Need it to scale? → <span class="text-accent-primary">SVG</span></p>
          </div>
          <div class="p-4 rounded-lg" style="background-color: var(--color-bg-secondary);">
            <p class="font-bold">For print? → <span class="text-accent-primary">PNG</span> (high-res)</p>
          </div>
          <div class="p-4 rounded-lg" style="background-color: var(--color-bg-secondary);">
            <p class="font-bold">Complex effects? → <span class="text-accent-primary">PNG</span></p>
          </div>
          <div class="p-4 rounded-lg" style="background-color: var(--color-bg-secondary);">
            <p class="font-bold">Simple gradient for web? → <span class="text-accent-primary">SVG or CSS</span></p>
          </div>
        </div>
        
        <p class="mt-4 text-sm">Not sure about CSS? Check our <a href="/blog/when-to-use-png-vs-css-gradients" style="color: var(--color-accent-primary); text-decoration: underline;">PNG vs CSS comparison</a>.</p>
      </div>
    </div>
    
    <div class="mt-12 p-8 rounded-lg border-t-4 border-t-[var(--color-accent-primary)]" style="background-color: var(--color-bg-secondary);">
      <h3 class="font-bold theme-heading text-xl mb-4">Bottom Line</h3>
      <p class="text-lg">SVG for web graphics that need to scale. PNG for print, social media, or complex effects. Both have their place.</p>
    </div>
    
    <div class="mt-8 p-6 rounded-lg" style="background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(20, 184, 166, 0.1)); border: 2px solid var(--color-accent-primary);">
      <h3 class="font-bold text-lg mb-2">Export in any format</h3>
      <p class="mb-4 theme-text-muted">Our <a href="/gradient-app" style="color: var(--color-accent-primary); text-decoration: underline;">gradient tool</a> exports PNG, SVG, CSS, JPG, and WebP. Try them all and see which works best.</p>
      <a href="/" style="display: inline-block; padding: 0.75rem 1.5rem; background-color: var(--color-accent-primary); color: white; border-radius: 0.5rem; font-weight: 600; text-decoration: none; transition: opacity 0.2s;">Create Gradients →</a>
    </div>
  `
};
