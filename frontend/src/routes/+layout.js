/** @type {import('@sveltejs/kit').LayoutLoad} */
export async function load({ url }) {
  const pathname = url.pathname;

  if (pathname === '/') {
    // Check localStorage isn't available on server — do redirect here statically
    return {
      status: 302,
      redirect: '/hu' // default
    };
  }

  return {};
}
