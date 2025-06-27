import express from 'express'
import fetch from 'node-fetch'
import cors from 'cors'
import 'dotenv/config';

const app = express();
app.use(cors());

const GOOGLE_API_KEY = process.env.VITE_GOOGLE_MAPS_API_KEY;

app.get('/api/place/:placeId', async (req, res) => {
  const { placeId } = req.params;
  console.log(placeId)
  const url = `https://places.googleapis.com/v1/places/${placeId}`;
  console.log(url)
  try {
    const response = await fetch(`${url}`, {
      method: 'GET',
      headers: {
        'X-Goog-Api-Key': GOOGLE_API_KEY,
        'X-Goog-FieldMask': '*'      
      }
    });

    const data = await response.json();
    console.log(data)

    if (!response.ok) {
      console.error("Google API error", data);
      return res.status(response.status).json(data);
    }

    res.json(data);
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log('✅ Server running at http://localhost:3000');
});
