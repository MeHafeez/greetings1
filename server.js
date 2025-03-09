const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

// Updated CORS configuration
const allowedOrigins = [
  'http://localhost:3002',
  'https://canwe-nine.vercel.app',
  'https://greetings1.vercel.app',
  'https://canyou.vercel.app'  // Removed trailing slash
];

// Enable pre-flight requests for all routes
app.options('*', cors());

// Updated CORS middleware
app.use(cors({
  origin: '*',  // Allow all origins temporarily for debugging
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200
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
  res.sendFile(path.join(__dirname, 'build', 'index.html'));  // Changed from 'dist' to 'build'
});

const PORT = process.env.PORT || 3003;  // Change default from 3001 to 3003

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});