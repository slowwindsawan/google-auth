// server/server.js
const express = require('express');
const path = require('path');
const app = express();
require('dotenv').config();
const cors = require('cors');

const PORT = process.env.PORT || 8080;


// Define CORS options

const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:5000'], // Remove trailing slashes
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
  credentials: true // Enable cookies and credentials
};

// Apply CORS with the specified options
app.use(cors(corsOptions));


// Serve static files from React app
app.use(express.static(path.join(__dirname, '../build')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve React app for unknown routes (for React Router)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
