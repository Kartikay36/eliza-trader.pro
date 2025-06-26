import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import bodyParser from 'body-parser';
import axios from 'axios';
import { createClient } from '@supabase/supabase-js'; // Add this

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI || '';
const ELIZA_API_URL = process.env.ELIZA_API_URL || 'https://eliza-api-41mt.onrender.com';
const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_KEY = process.env.SUPABASE_KEY || '';

// Initialize Supabase
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Middleware (keep existing)
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://eliza-trader-pro.netlify.app'
  ],
  credentials: true,
}));
app.use(bodyParser.json());

// Database Connection (keep MongoDB for auth if needed)
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Proxy routes to eliza-api (keep existing)
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

// New Supabase routes for posts
app.get('/api/posts', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/posts', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    const { data, error } = await supabase
      .from('posts')
      .insert([{ ...req.body, author: req.body.userId }])
      .select();
    
    if (error) throw error;
    res.status(201).json(data[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/posts/:id', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    const { data, error } = await supabase
      .from('posts')
      .update(req.body)
      .eq('id', req.params.id)
      .select();
    
    if (error) throw error;
    res.json(data[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/posts/:id', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', req.params.id);
    
    if (error) throw error;
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK',
    services: {
      database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
      eliza_api: 'external',
      supabase: 'connected' // Assuming Supabase connection is always active
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
