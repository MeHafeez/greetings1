const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

// Configure CORS with specific options
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['POST', 'GET'],
  credentials: true
}));

app.use(express.json());

// Log API endpoint with error handling
app.post('/api/log', (req, res) => {
  try {
    const { name, isValid, timestamp } = req.body;
    console.log(`[${timestamp}] Name: ${name} | Valid: ${isValid}`);
    res.json({ success: true });
  } catch (error) {
    console.error('Logging error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));  // Changed from 'build' to 'dist'
});

const port = 3001;  // Changed from 3000 to 3001
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});