/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch, url }) {
  const { default: data } = await import('$lib/data/place-data.json');
  return { reviews: data.reviews || [] };
}
