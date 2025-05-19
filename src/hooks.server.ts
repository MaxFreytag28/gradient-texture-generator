import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  const host = event.request.headers.get('host');
  const url = new URL(event.request.url);
  
  // Redirect www to non-www
  if (host?.startsWith('www.')) {
    return new Response(null, {
      status: 301,
      headers: {
        Location: `https://makegradients.app${url.pathname}${url.search}`
      }
    });
  }
  
  // Continue with normal request handling
  return await resolve(event);
};
