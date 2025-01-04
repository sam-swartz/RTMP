const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Use body-parser to properly parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Route for authentication
app.post("/auth", function (req, res) {
  // Log the incoming request (helpful for debugging)
  console.log('Auth request received');

  // Extract stream key from request body
  const streamkey = req.body.key;

  // Check if stream key is provided
  if (!streamkey) {
    console.warn('No stream key provided');
    return res.status(400).send('Stream key is required');
  }

  /* You can make a database of users instead :) */
  if (streamkey === "supersecret") {
    console.log('Authentication successful');
    return res.status(200).send();
  }

  // Log failed authentication attempts
  console.warn('Authentication failed for stream key');
  
  /* Reject the stream */
  res.status(403).send();
});

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}!`);
});