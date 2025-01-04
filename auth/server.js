// auth/server.js
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Use body-parser to properly parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Route for authentication
app.post("/auth", function (req, res) {
  console.log('Auth request received');
  
  try {
    const streamkey = req.body.key;
    
    if (!streamkey) {
      console.warn('No stream key provided');
      return res.status(400).send('Stream key is required');
    }
    
    if (streamkey === "supersecret") {
      console.log('Authentication successful');
      
      // Add CORS headers
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Content-Type');
      
      return res.status(200).send();
    }
    
    console.warn('Authentication failed for stream key');
    res.status(403).send();
  } catch (error) {
    console.error('Auth error:', error);
    res.status(500).send('Internal server error');
  }
});

app.get("/health", (req, res) => {
  res.status(200).send('OK');
});

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}!`);
});