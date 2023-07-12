const express = require('express');
const axios = require('axios');

const app = express();
const port = 8008;

app.get('/numbers', async (req, res) => {
  const urls = req.query.url;

  if (!urls || !Array.isArray(urls)) {
    return res.status(400).json({ error: 'Invalid URL parameter' });
  }

  try {
    const promises = urls.map(url => axios.get(url).then(response => response.data.numbers));

    const responses = await Promise.allSettled(promises);

    const validResponses = responses.filter(response => response.status === 'fulfilled');

    const mergedNumbers = validResponses.reduce((acc, response) => {
      acc.push(...response.value);
      return acc;
    }, []);

    const uniqueNumbers = [...new Set(mergedNumbers)].sort((a, b) => a - b);

    return res.json({ numbers: uniqueNumbers });
  } catch (error) {
    console.error('Error processing requests:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
