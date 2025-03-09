const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

// Configure CORS with more permissive options
app.use(cors({
  origin: true, // Allow all origins in development
  methods: ['POST', 'GET', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Add OPTIONS handler for preflight requests
app.options('*', cors());

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

const PORT = process.env.PORT || 3003;  // Change default from 3001 to 3003

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});