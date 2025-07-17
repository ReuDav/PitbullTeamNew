export async function GET({ params }) {
  const { placeId } = params;

  const GOOGLE_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

  if (!GOOGLE_API_KEY) {
    return new Response(
        JSON.stringify({ error: 'Google API kulcs hiányzik.' }),
        { status: 500 }
    );
  }

  const url = `https://places.googleapis.com/v1/places/${placeId}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-Goog-Api-Key': GOOGLE_API_KEY,
        'X-Goog-FieldMask': '*',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Google API error:', data);
      return new Response(JSON.stringify(data), {
        status: response.status,
      });
    }

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (err) {
    console.error('Server error:', err);
    return new Response(
        JSON.stringify({ error: err.message }),
        { status: 500 }
    );
  }
}
