import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  // Continue with normal request handling
  return await resolve(event);
};
