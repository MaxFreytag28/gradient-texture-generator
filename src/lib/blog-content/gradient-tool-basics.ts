export const gradientToolBasicsPost = {
  id: '5',
  title: 'Getting Started with Gradient Tools: A Beginner\'s Guide',
  excerpt: 'New to gradient design? Learn how to use gradient tools effectively and create your first stunning gradients in minutes.',
  slug: 'gradient-tool-basics-getting-started',
  gradient: 'from-violet-500 via-purple-500 to-fuchsia-500',
  date: '2025-05-06',
  content: `
    <p class="mb-8 text-lg">So you want to make gradients but don't know where to start. Maybe you saw a nice gradient background somewhere and wondered how to make one yourself. Or you're just tired of googling "CSS gradient syntax" every single time. Whatever brought you here, let's fix that.</p>
    
    <div class="space-y-8">
      <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 class="text-xl font-bold font-heading mb-4">What Actually Is a Gradient?</h3>
        <p class="mb-4">A gradient is colors smoothly transitioning into each other. That's literally it. You see them in sunsets, app backgrounds, packaging design. They're everywhere once you start noticing.</p>
        <p class="mb-4">Three main types you'll use:</p>
        
        <div class="grid md:grid-cols-3 gap-4 mt-4">
          <div class="p-4 rounded-lg" style="background: linear-gradient(to right, #3b82f6, #8b5cf6); color: white;">
            <h4 class="font-bold mb-2">Linear</h4>
            <p class="text-sm">Colors flow in a straight line. Think of a horizon at sunset.</p>
          </div>
          <div class="p-4 rounded-lg" style="background: radial-gradient(circle, #10b981, #06b6d4); color: white;">
            <h4 class="font-bold mb-2">Radial</h4>
            <p class="text-sm">Colors radiate from a center point, like ripples in water.</p>
          </div>
          <div class="p-4 rounded-lg" style="background: conic-gradient(from 0deg, #f59e0b, #ef4444, #8b5cf6, #f59e0b); color: white;">
            <h4 class="font-bold mb-2">Conic</h4>
            <p class="text-sm">Colors rotate around a point, like a color wheel.</p>
          </div>
        </div>
      </div>
      
      <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 class="text-xl font-bold font-heading mb-4">Why Use a Gradient Tool?</h3>
        <p class="mb-4">You could write CSS gradients by hand. Gradient syntax isn't fun though. Angles, color stops, rgba values—it's tedious. A visual tool lets you just drag colors around and see what happens.</p>
        <p class="mb-4">Plus you can export in whatever format you need. CSS, PNG, SVG, whatever. Make it once, use it anywhere. Check out our guide on <a href="/blog/when-to-use-png-vs-css-gradients" style="color: var(--color-accent-primary); text-decoration: underline;">choosing between PNG and CSS gradients</a> if you're not sure which to use.</p>
      </div>
      
      <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 class="text-xl font-bold font-heading mb-4">Your First Gradient in 60 Seconds</h3>
        <p class="mb-4">Stop overthinking it. Here's what you do:</p>
        
        <ol class="list-decimal pl-6 space-y-3">
          <li><strong>Pick two colors.</strong> Any two. Blue and purple. Orange and pink. Doesn't matter.</li>
          <li><strong>Choose linear gradient.</strong> It's the easiest to start with.</li>
          <li><strong>Adjust the angle.</strong> Horizontal, vertical, diagonal. Try a few.</li>
          <li><strong>Add more colors if you want.</strong> Click the bar to add color stops. Drag them around.</li>
          <li><strong>Export it.</strong> Copy the CSS or download an image file.</li>
        </ol>
        
        <div class="mt-6 p-4 rounded-lg" style="background-color: var(--color-bg-secondary); border-left: 4px solid var(--color-accent-primary);">
          <p class="text-sm"><strong>Note:</strong> Your first gradient will probably look bad. That's fine. Make ten gradients, delete nine of them. You'll figure it out.</p>
        </div>
      </div>
      
      <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 class="text-xl font-bold font-heading mb-4">Common Mistakes</h3>
        
        <div class="space-y-4">
          <div class="p-4 rounded-lg" style="background-color: var(--color-bg-secondary);">
            <h4 class="font-bold mb-2">❌ Too many colors</h4>
            <p>Start with 2-3 colors. More isn't better. It just gets messy.</p>
          </div>
          
          <div class="p-4 rounded-lg" style="background-color: var(--color-bg-secondary);">
            <h4 class="font-bold mb-2">❌ Bad contrast</h4>
            <p>If you're putting text on top, make sure it's readable. Test it with both light and dark text before committing.</p>
          </div>
          
          <div class="p-4 rounded-lg" style="background-color: var(--color-bg-secondary);">
            <h4 class="font-bold mb-2">❌ Random color picks</h4>
            <p>Some colors blend into ugly brown or muddy gray. If that happens, pick colors closer together on the color wheel.</p>
          </div>
        </div>
      </div>
      
      <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 class="text-xl font-bold font-heading mb-4">Export Formats</h3>
        <p class="mb-4">Which format you need:</p>
        
        <ul class="space-y-3">
          <li><strong>CSS:</strong> For websites. Lightweight, scales perfectly.</li>
          <li><strong>PNG:</strong> For everything else. Presentations, mockups, social media.</li>
          <li><strong>SVG:</strong> When you need scalable vector graphics outside of CSS.</li>
          <li><strong>JPG:</strong> Only if you need small file sizes and don't need transparency.</li>
        </ul>
        
        <p class="mt-4">Want more details? Read our full comparison: <a href="/blog/when-to-use-png-vs-css-gradients" style="color: var(--color-accent-primary); text-decoration: underline;">PNG vs CSS Gradients</a>.</p>
      </div>
    </div>
    
    <div class="mt-12 p-8 rounded-lg border-t-4 border-t-[var(--color-accent-primary)]" style="background-color: var(--color-bg-secondary);">
      <h3 class="font-bold theme-heading text-xl mb-4">Bottom Line</h3>
      <p class="text-lg mb-4">Gradient tools are visual editors. They save you from memorizing syntax and doing color math. Drag colors, adjust settings, export.</p>
      <p class="text-lg">That's it. The rest is practice. Make bad gradients, make good ones, whatever. You'll get better at it.</p>
    </div>
    
    <div class="mt-8 p-6 rounded-lg" style="background: linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.1)); border: 2px solid var(--color-accent-primary);">
      <h3 class="font-bold text-lg mb-2">Ready to create your first gradient?</h3>
      <p class="mb-4 theme-text-muted">Try our free <a href="/gradient-maker" style="color: var(--color-accent-primary); text-decoration: underline;">gradient maker tool</a> – no signup required. Create linear, radial, and conic gradients, then export as CSS, PNG, SVG, or WebP.</p>
      <a href="/" style="display: inline-block; padding: 0.75rem 1.5rem; background-color: var(--color-accent-primary); color: white; border-radius: 0.5rem; font-weight: 600; text-decoration: none; transition: opacity 0.2s;">Start Creating Gradients →</a>
    </div>
  `
};
