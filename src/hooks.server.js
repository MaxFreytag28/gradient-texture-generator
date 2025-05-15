/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  const response = await resolve(event);
  
  // Add security headers
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Cache-Control', 'max-age=3600');
  response.headers.set('Content-Security-Policy', "frame-ancestors 'self'");
  
  return response;
}
