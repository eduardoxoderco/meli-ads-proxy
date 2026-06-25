const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

// Health check
app.get('/', (req, res) => res.json({ status: 'ok', service: 'meli-ads-proxy' }));

// Generic proxy — forwards any ML API path with the user's token
app.get('/meli/*', async (req, res) => {
  const token = req.headers['x-meli-token'];
  if (!token) return res.status(401).json({ error: 'Missing x-meli-token header' });

  // Build ML URL: /meli/advertising/advertisers → https://api.mercadolibre.com/advertising/advertisers
  const path = req.params[0];
  const query = new URLSearchParams(req.query).toString();
  const url = `https://api.mercadolibre.com/${path}${query ? '?' + query : ''}`;

  try {
    const apiVersion = req.headers['x-api-version'] || '1';
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'api-version': apiVersion,
      },
    });
    res.status(response.status).json(response.data);
  } catch (err) {
    const status = err.response?.status || 500;
    const data = err.response?.data || { error: err.message };
    res.status(status).json(data);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy running on port ${PORT}`));
