import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import bodyParser from 'body-parser';
import axios from 'axios'; // Add axios for HTTP requests

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI || '';
const ELIZA_API_URL = process.env.ELIZA_API_URL || 'https://eliza-api-41mt.onrender.com';

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://eliza-trader-pro.netlify.app'
  ],
  credentials: true,
}));
app.use(bodyParser.json());

// Database Connection
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Proxy routes to eliza-api
app.post('/api/auth/login', async (req, res) => {
  try {
    const response = await axios.post(`${ELIZA_API_URL}/api/auth/login`, req.body);
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json(error.response?.data || { error: 'Login failed' });
  }
});

app.post('/api/auth/logout', async (req, res) => {
  try {
    const response = await axios.post(`${ELIZA_API_URL}/api/auth/logout`, req.body);
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json(error.response?.data || { error: 'Logout failed' });
  }
});

// Your local post routes (if any)
import localPostRoutes from './routes/post'; // Only for routes that exist in this repo
app.use('/api/posts', localPostRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK',
    services: {
      database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
      eliza_api: 'external' // This would be your API status check if needed
    }
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
