// Vercel Serverless Function
// Proxies requests to Anthropic API, keeping the API key on the server side.
// Deployed at: https://<your-domain>.vercel.app/api/claude

export default async function handler(req, res) {
  // CORS preflight
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error('ANTHROPIC_API_KEY is not set in environment variables.');
    return res.status(500).json({ error: 'Server configuration error: API key not set.' });
  }

  try {
    // Validate body
    const body = req.body;
    if (!body || !body.model || !body.messages) {
      return res.status(400).json({ error: 'Invalid request: model and messages are required.' });
    }

    // Forward request to Anthropic
    const upstream = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify(body),
    });

    const data = await upstream.json();

    if (!upstream.ok) {
      console.error('Anthropic API error:', data);
      return res.status(upstream.status).json(data);
    }

    return res.status(200).json(data);
  } catch (err) {
    console.error('Proxy error:', err);
    return res.status(500).json({ error: 'Internal server error', detail: String(err) });
  }
}
