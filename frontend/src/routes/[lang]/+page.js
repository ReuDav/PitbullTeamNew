export async function load({ fetch }) {
  const placeId = import.meta.env.VITE_PITBULL_TEAM_GOOGLE_MAPS_ID;
  const res = await fetch(`/api/place/${placeId}`);
  const data = await res.json();

  return {
    reviews: data.reviews ?? []
  };
}
