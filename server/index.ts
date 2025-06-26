import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import bodyParser from 'body-parser';
import axios from 'axios';
import { createClient } from '@supabase/supabase-js';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 3001;
const ELIZA_API_URL = process.env.ELIZA_API_URL || 'https://eliza-api-41mt.onrender.com';
const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_KEY = process.env.SUPABASE_KEY || '';

// Initialize Supabase
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Enhanced CORS configuration
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://eliza-trader-pro.netlify.app'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK',
    services: {
      supabase: 'connected',
      eliza_api: ELIZA_API_URL ? 'configured' : 'not configured'
    }
  });
});

// Auth routes - properly structured under /api/auth
app.post('/api/auth/login', async (req, res) => {
  try {
    const response = await axios.post(`${ELIZA_API_URL}/api/auth/login`, req.body);
    res.json(response.data);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      res.status(error.response?.status || 500).json(error.response?.data || { error: 'Login failed' });
    } else {
      res.status(500).json({ error: 'Unexpected error occurred' });
    }
  }
});

app.post('/api/auth/logout', async (req, res) => {
  try {
    const response = await axios.post(`${ELIZA_API_URL}/api/auth/logout`, req.body);
    res.json(response.data);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      res.status(error.response?.status || 500).json(error.response?.data || { error: 'Logout failed' });
    } else {
      res.status(500).json({ error: 'Unexpected error occurred' });
    }
  }
});

// Posts routes - properly structured under /api/posts
app.get('/api/posts', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return res.json(data);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Unknown error occurred' });
  }
});

app.post('/api/posts', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    const { data, error } = await supabase
      .from('posts')
      .insert([{ 
        ...req.body,
        author: req.body.userId,
        created_at: new Date().toISOString()
      }])
      .select();
    
    if (error) throw error;
    return res.status(201).json(data[0]);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Unknown error occurred' });
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
    return res.json(data[0]);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Unknown error occurred' });
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
    return res.status(204).end();
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Unknown error occurred' });
  }
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Backend is running!',
    endpoints: {
      auth: {
        login: 'POST /api/auth/login',
        logout: 'POST /api/auth/logout'
      },
      posts: {
        get: 'GET /api/posts',
        create: 'POST /api/posts',
        update: 'PUT /api/posts/:id',
        delete: 'DELETE /api/posts/:id'
      },
      health: 'GET /health'
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`ELIZA_API_URL: ${ELIZA_API_URL}`);
  console.log(`CORS allowed origins: 
    http://localhost:5173
    https://eliza-trader-pro.netlify.app`);
});

export default app;
