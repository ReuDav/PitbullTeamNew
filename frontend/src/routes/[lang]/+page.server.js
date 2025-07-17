/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch, url }) {
  const placeId = process.env.GOOGLE_MAPS_PLACE_ID;
console.log('GOOGLE_MAPS_PLACE_ID:', process.env.GOOGLE_MAPS_PLACE_ID);
  if (!placeId) {
    console.error("Missing GOOGLE_MAPS_PLACE_ID");
    return { reviews: [] };
  }

  const baseUrl = url.origin;
  const res = await fetch(`${baseUrl}/api/place/${placeId}`);

  if (!res.ok) {
    console.error("API error");
    return { reviews: [] };
  }

  const data = await res.json();

  // Feltételezve, hogy az API `data.reviews` tömböt ad vissza
  return {
    reviews: data.reviews || []
  };
}
