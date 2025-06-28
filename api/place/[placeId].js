// /api/place/[placeId].js

export default async function handler(req, res) {
  const { placeId } = req.query;

  const isDev = process.env.NODE_ENV !== 'production';

  const GOOGLE_API_KEY = isDev
    ? import.meta?.env?.GOOGLE_MAPS_API_KEY // fejlesztéskor
    : process.env.GOOGLE_MAPS_API_KEY;      // éles környezetben

  if (!GOOGLE_API_KEY) {
    return res.status(500).json({ error: 'Google API kulcs hiányzik.' });
  }

  const url = `https://places.googleapis.com/v1/places/${placeId}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-Goog-Api-Key': GOOGLE_API_KEY,
        'X-Goog-FieldMask': '*'
      }
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Google API error", data);
      return res.status(response.status).json(data);
    }

    return res.status(200).json(data);
  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({ error: err.message });
  }
}
