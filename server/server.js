const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 5000;

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "../build"))); // or ../build

// Catch-all to serve index.html for React Router
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html")); // or ../build/index.html
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
