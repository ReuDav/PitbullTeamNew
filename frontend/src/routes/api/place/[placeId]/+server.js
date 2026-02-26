import { writeFile } from 'fs/promises';
import path from 'path';
import { GOOGLE_MAPS_API_KEY } from '$env/static/private';

export async function GET({ params }) {
  const { placeId } = params;

  if (!GOOGLE_MAPS_API_KEY) {
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
        'X-Goog-Api-Key': GOOGLE_MAPS_API_KEY,
        'X-Goog-FieldMask': '*',
      },
    });

    const data = await response.json();

    // Log the full place payload for inspection (server console)
    console.log('Google Place full data:', JSON.stringify(data, null, 2));

    // In development, also persist the full payload to a JSON file
    // Write outside the frontend directory to avoid triggering Vite reload loops
    if (process.env.NODE_ENV !== 'production') {
      try {
        const filePath = path.join(process.cwd(), '..', 'place-data.json');
        await writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
        console.log('Saved Google Place data to', filePath);
      } catch (writeErr) {
        console.error('Failed to write place-data.json:', writeErr);
      }
    }

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
