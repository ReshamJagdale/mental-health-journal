console.log('🧪 server.js has started running');

const express = require('express');
const app = express();
const PORT = 5000;

// Middleware to parse JSON
app.use(express.json());

// Default route
app.get('/', (req, res) => {
  res.send('Mental Health Journal backend is running!');
});

// Start server
app.listen(PORT, () => {
  console.log('SERVER STARTED');
});
