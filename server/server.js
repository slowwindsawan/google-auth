const express = require('express');
const path = require('path');
const app = express();

// Adjust build path to one level up
const buildPath = path.join(__dirname, '..', 'build');
app.use(express.static(buildPath));

app.get('/*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
