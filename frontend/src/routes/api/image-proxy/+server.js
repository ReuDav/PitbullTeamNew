/**
 * Proxies external images (e.g. Google profile photos) to avoid hotlink blocking.
 * Only allows URLs from trusted domains (e.g. lh3.googleusercontent.com).
 */
const ALLOWED_ORIGINS = ['https://lh3.googleusercontent.com', 'https://lh4.googleusercontent.com', 'https://lh5.googleusercontent.com', 'https://lh6.googleusercontent.com'];

function isAllowedUrl(url) {
  try {
    const u = new URL(url);
    return ALLOWED_ORIGINS.some(origin => u.origin === origin);
  } catch {
    return false;
  }
}

export async function GET({ url: reqUrl }) {
  const imageUrl = reqUrl.searchParams.get('url');
  if (!imageUrl || !isAllowedUrl(imageUrl)) {
    return new Response('Bad request', { status: 400 });
  }

  try {
    const res = await fetch(imageUrl, {
      headers: {
        'Accept': 'image/*',
        'User-Agent': 'Mozilla/5.0 (compatible; SvelteKit-Image-Proxy/1.0)',
      },
    });

    if (!res.ok) {
      return new Response('Upstream image error', { status: res.status });
    }

    const contentType = res.headers.get('Content-Type') || 'image/jpeg';
    const blob = await res.arrayBuffer();

    return new Response(blob, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=86400',
      },
    });
  } catch (err) {
    console.error('Image proxy error:', err);
    return new Response('Proxy error', { status: 502 });
  }
}
