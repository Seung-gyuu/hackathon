const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Backend server is running!');
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Backend Server is running on http://localhost:${PORT}`);
});