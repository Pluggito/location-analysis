
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { start, end } = req.body;

  if (!start || !end) {
    return res.status(400).json({ error: 'Missing start or end coordinates' });
  }

  try {
    const orsRes = await fetch(
      'https://api.openrouteservice.org/v2/directions/driving-car/geojson',
      {
        method: 'POST',
        headers: {
          'Authorization': process.env.ORS_API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          coordinates: [start, end],
        }),
      }
    );

    if (!orsRes.ok) {
      const errorData = await orsRes.json();
      console.error('ORS Error:', errorData);
      return res.status(orsRes.status).json({ error: 'ORS request failed', details: errorData });
    }

    const data = await orsRes.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Server error' });
  }
}
