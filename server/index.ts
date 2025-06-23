// index.ts
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import bodyParser from 'body-parser';
import axios from 'axios';
import multer from 'multer';

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

// Increase payload limit for image uploads
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Database Connection
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected successfully');
    console.log('Database:', mongoose.connection.db.databaseName);
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Post Schema
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['market-analysis', 'education', 'trading-tips', 'news', 'strategy']
  },
  tags: [{
    type: String,
    trim: true
  }],
  featuredImage: {
    type: String, // Base64 string or URL
    default: null
  },
  author: {
    type: String,
    default: 'Elizabeth'
  },
  isPublished: {
    type: Boolean,
    default: true
  },
  viewCount: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
postSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

const Post = mongoose.model('Post', postSchema);

// Keep your existing auth routes (don't modify these)
app.post('/api/auth/login', async (req, res) => {
  try {
    const response = await axios.post(`${ELIZA_API_URL}/api/auth/login`, req.body);
    res.json(response.data);
  } catch (error: any) {
    res.status(error.response?.status || 500).json(error.response?.data || { error: 'Login failed' });
  }
});

app.post('/api/auth/logout', async (req, res) => {
  try {
    const response = await axios.post(`${ELIZA_API_URL}/api/auth/logout`, req.body);
    res.json(response.data);
  } catch (error: any) {
    res.status(error.response?.status || 500).json(error.response?.data || { error: 'Logout failed' });
  }
});

// POST ROUTES - Database Operations

// Get all posts (for public viewing)
app.get('/api/posts', async (req, res) => {
  try {
    const { category, page = 1, limit = 10, search } = req.query;
    
    let query: any = { isPublished: true };
    
    // Filter by category if provided
    if (category && category !== 'all') {
      query.category = category;
    }
    
    // Search functionality
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search as string, 'i')] } }
      ];
    }
    
    const posts = await Post.find(query)
      .sort({ createdAt: -1 })
      .limit(Number(limit) * Number(page))
      .skip((Number(page) - 1) * Number(limit))
      .select('-__v');
    
    const totalPosts = await Post.countDocuments(query);
    
    res.json({
      success: true,
      posts,
      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(totalPosts / Number(limit)),
        totalPosts,
        hasNext: Number(page) < Math.ceil(totalPosts / Number(limit)),
        hasPrev: Number(page) > 1
      }
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch posts',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Get single post by ID
app.get('/api/posts/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ 
        success: false, 
        error: 'Post not found' 
      });
    }
    
    // Increment view count
    post.viewCount += 1;
    await post.save();
    
    res.json({
      success: true,
      post
    });
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch post',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Create new post (admin only)
app.post('/api/posts', upload.single('featuredImage'), async (req, res) => {
  try {
    const { title, content, category, tags, isPublished } = req.body;
    
    // Validate required fields
    if (!title || !content || !category) {
      return res.status(400).json({
        success: false,
        error: 'Title, content, and category are required'
      });
    }
    
    // Process tags
    let processedTags = [];
    if (tags) {
      processedTags = typeof tags === 'string' ? 
        tags.split(',').map((tag: string) => tag.trim()) : 
        tags;
    }
    
    // Handle image upload
    let featuredImage = null;
    if (req.file) {
      // Convert to base64
      featuredImage = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
    }
    
    const newPost = new Post({
      title,
      content,
      category,
      tags: processedTags,
      featuredImage,
      isPublished: isPublished !== undefined ? isPublished : true
    });
    
    const savedPost = await newPost.save();
    
    res.status(201).json({
      success: true,
      message: 'Post created successfully',
      post: savedPost
    });
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to create post',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Update post (admin only)
app.put('/api/posts/:id', upload.single('featuredImage'), async (req, res) => {
  try {
    const { title, content, category, tags, isPublished } = req.body;
    
    const updateData: any = {};
    if (title) updateData.title = title;
    if (content) updateData.content = content;
    if (category) updateData.category = category;
    if (isPublished !== undefined) updateData.isPublished = isPublished;
    
    // Process tags
    if (tags) {
      updateData.tags = typeof tags === 'string' ? 
        tags.split(',').map((tag: string) => tag.trim()) : 
        tags;
    }
    
    // Handle image upload
    if (req.file) {
      updateData.featuredImage = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
    }
    
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!updatedPost) {
      return res.status(404).json({ 
        success: false, 
        error: 'Post not found' 
      });
    }
    
    res.json({
      success: true,
      message: 'Post updated successfully',
      post: updatedPost
    });
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to update post',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Delete post (admin only)
app.delete('/api/posts/:id', async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    
    if (!deletedPost) {
      return res.status(404).json({ 
        success: false, 
        error: 'Post not found' 
      });
    }
    
    res.json({
      success: true,
      message: 'Post deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to delete post',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Like post
app.post('/api/posts/:id/like', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ 
        success: false, 
        error: 'Post not found' 
      });
    }
    
    post.likes += 1;
    await post.save();
    
    res.json({
      success: true,
      likes: post.likes
    });
  } catch (error) {
    console.error('Error liking post:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to like post',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Get all posts for admin (including unpublished)
app.get('/api/admin/posts', async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .select('-__v');
    
    res.json({
      success: true,
      posts
    });
  } catch (error) {
    console.error('Error fetching admin posts:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch posts',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Get post statistics
app.get('/api/stats', async (req, res) => {
  try {
    const totalPosts = await Post.countDocuments({ isPublished: true });
    const totalViews = await Post.aggregate([
      { $match: { isPublished: true } },
      { $group: { _id: null, total: { $sum: '$viewCount' } } }
    ]);
    const totalLikes = await Post.aggregate([
      { $match: { isPublished: true } },
      { $group: { _id: null, total: { $sum: '$likes' } } }
    ]);
    
    const categoryStats = await Post.aggregate([
      { $match: { isPublished: true } },
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);
    
    res.json({
      success: true,
      stats: {
        totalPosts,
        totalViews: totalViews[0]?.total || 0,
        totalLikes: totalLikes[0]?.total || 0,
        categoryStats
      }
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch statistics',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK',
    timestamp: new Date().toISOString(),
    services: {
      database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
      eliza_api: 'external'
    }
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Elizabeth Trading Backend API',
    version: '1.0.0',
    endpoints: {
      posts: '/api/posts',
      auth: '/api/auth',
      health: '/health',
      stats: '/api/stats'
    }
  });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    details: err.message
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
});

export default app;
