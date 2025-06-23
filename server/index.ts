import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import bodyParser from 'body-parser';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import fs from 'fs';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 8080;
const MONGO_URI = process.env.MONGO_URI || '';
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key_here';

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://eliza-trader-pro.netlify.app'
  ],
  credentials: true,
}));

// Increase payload limit for potential image uploads
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// Static files middleware for uploaded images
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Database Connection
if (MONGO_URI) {
  mongoose.connect(MONGO_URI)
    .then(() => {
      console.log('✅ MongoDB connected successfully');
      console.log('📊 Database:', mongoose.connection.db?.databaseName || 'elizaapi');
    })
    .catch(err => {
      console.error('❌ MongoDB connection error:', err);
      console.log('⚠️  Continuing without database - some features will be limited');
    });
} else {
  console.log('⚠️  No MONGO_URI found - running without database');
}

// Admin User Schema
const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  name: {
    type: String,
    default: 'Elizabeth'
  },
  role: {
    type: String,
    default: 'admin'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastLogin: {
    type: Date,
    default: null
  }
});

// Hash password before saving
adminSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

// Compare password method
adminSchema.methods.comparePassword = async function(candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password);
};

const Admin = mongoose.model('Admin', adminSchema);

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
    enum: ['market-analysis', 'education', 'trading-tips', 'news', 'strategy'],
    default: 'education'
  },
  tags: [{
    type: String,
    trim: true
  }],
  featuredImage: {
    type: String,
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
  excerpt: {
    type: String,
    default: ''
  },
  seoTitle: {
    type: String,
    default: ''
  },
  seoDescription: {
    type: String,
    default: ''
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
  if (!this.excerpt && this.content) {
    // Generate excerpt from content (first 150 characters)
    this.excerpt = this.content.substring(0, 150).replace(/<[^>]*>/g, '') + '...';
  }
  next();
});

const Post = mongoose.model('Post', postSchema);

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'));
    }
  }
});

// JWT Authentication Middleware
const authenticateToken = (req: any, res: express.Response, next: express.NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ 
      success: false, 
      error: 'Access token required' 
    });
  }

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) {
      return res.status(403).json({ 
        success: false, 
        error: 'Invalid or expired token' 
      });
    }
    req.user = user;
    next();
  });
};

// Initialize default admin user
const initializeAdmin = async () => {
  try {
    if (mongoose.connection.readyState !== 1) return;
    
    const adminExists = await Admin.findOne({ username: 'elizabeth' });
    if (!adminExists) {
      const defaultAdmin = new Admin({
        username: 'elizabeth',
        email: 'elizabeth@trader.com',
        password: 'elizabeth123',
        name: 'Elizabeth'
      });
      
      await defaultAdmin.save();
      console.log('✅ Default admin user created');
      console.log('🔑 Username: elizabeth');
      console.log('🔑 Password: elizabeth123');
    }
  } catch (error) {
    console.error('❌ Error creating default admin:', error);
  }
};

// Initialize admin after database connection
mongoose.connection.once('open', () => {
  initializeAdmin();
});

// AUTH ROUTES

// Login route
app.post('/api/auth/login', async (req, res) => {
  try {
    console.log('🔐 Login attempt for:', req.body.username || req.body.email);
    
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        error: 'Database not connected'
      });
    }

    const { username, email, password } = req.body;

    if (!password) {
      return res.status(400).json({
        success: false,
        error: 'Password is required'
      });
    }

    if (!username && !email) {
      return res.status(400).json({
        success: false,
        error: 'Username or email is required'
      });
    }

    // Find admin by username or email
    const query = username ? { username } : { email };
    const admin = await Admin.findOne(query);

    if (!admin) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    // Check password
    const isValidPassword = await admin.comparePassword(password);
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    // Update last login
    admin.lastLogin = new Date();
    await admin.save();

    // Generate JWT token
    const token = jwt.sign(
      { 
        id: admin._id, 
        username: admin.username, 
        email: admin.email,
        role: admin.role 
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    console.log('✅ Login successful for:', admin.username);

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        name: admin.name,
        role: admin.role,
        lastLogin: admin.lastLogin
      }
    });
  } catch (error) {
    console.error('❌ Login failed:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Login failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Logout route
app.post('/api/auth/logout', authenticateToken, async (req, res) => {
  try {
    // In a more complex setup, you might want to blacklist the token
    // For now, we'll just send a success response
    console.log('🔓 User logged out:', req.user?.username);
    
    res.json({
      success: true,
      message: 'Logout successful'
    });
  } catch (error) {
    console.error('❌ Logout failed:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Logout failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Verify token route
app.get('/api/auth/verify', authenticateToken, (req, res) => {
  res.json({
    success: true,
    user: req.user
  });
});

// Change password route
app.post('/api/auth/change-password', authenticateToken, async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        error: 'Database not connected'
      });
    }

    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        error: 'Current password and new password are required'
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        error: 'New password must be at least 6 characters long'
      });
    }

    const admin = await Admin.findById(req.user.id);
    if (!admin) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    // Verify current password
    const isValidPassword = await admin.comparePassword(currentPassword);
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        error: 'Current password is incorrect'
      });
    }

    // Update password
    admin.password = newPassword;
    await admin.save();

    res.json({
      success: true,
      message: 'Password changed successfully'
    });
  } catch (error) {
    console.error('❌ Password change failed:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to change password',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// FILE UPLOAD ROUTES

// Upload image route
app.post('/api/upload', authenticateToken, upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'No file uploaded'
      });
    }

    const fileUrl = `/uploads/${req.file.filename}`;
    
    console.log('✅ File uploaded:', req.file.filename);
    
    res.json({
      success: true,
      message: 'File uploaded successfully',
      url: fileUrl,
      filename: req.file.filename
    });
  } catch (error) {
    console.error('❌ File upload failed:', error);
    res.status(500).json({ 
      success: false, 
      error: 'File upload failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// POST ROUTES - Database Operations

// Get all posts (for public viewing)
app.get('/api/posts', async (req, res) => {
  try {
    // Check if database is connected
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        error: 'Database not connected',
        message: 'Posts feature is temporarily unavailable'
      });
    }

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
    console.error('❌ Error fetching posts:', error);
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
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        error: 'Database not connected'
      });
    }

    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ 
        success: false, 
        error: 'Post not found' 
      });
    }
    
    // Increment view count only for published posts
    if (post.isPublished) {
      post.viewCount += 1;
      await post.save();
    }
    
    res.json({
      success: true,
      post
    });
  } catch (error) {
    console.error('❌ Error fetching post:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch post',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Create new post (admin only)
app.post('/api/posts', authenticateToken, async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        error: 'Database not connected'
      });
    }

    const { 
      title, 
      content, 
      category, 
      tags, 
      isPublished, 
      featuredImage,
      excerpt,
      seoTitle,
      seoDescription
    } = req.body;
    
    // Validate required fields
    if (!title || !content) {
      return res.status(400).json({
        success: false,
        error: 'Title and content are required'
      });
    }
    
    // Process tags
    let processedTags = [];
    if (tags) {
      processedTags = typeof tags === 'string' ? 
        tags.split(',').map((tag: string) => tag.trim()) : 
        tags;
    }
    
    const newPost = new Post({
      title,
      content,
      category: category || 'education',
      tags: processedTags,
      featuredImage: featuredImage || null,
      isPublished: isPublished !== undefined ? isPublished : true,
      excerpt: excerpt || '',
      seoTitle: seoTitle || title,
      seoDescription: seoDescription || ''
    });
    
    const savedPost = await newPost.save();
    console.log('✅ New post created:', savedPost.title);
    
    res.status(201).json({
      success: true,
      message: 'Post created successfully',
      post: savedPost
    });
  } catch (error) {
    console.error('❌ Error creating post:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to create post',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Update post (admin only)
app.put('/api/posts/:id', authenticateToken, async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        error: 'Database not connected'
      });
    }

    const { 
      title, 
      content, 
      category, 
      tags, 
      isPublished, 
      featuredImage,
      excerpt,
      seoTitle,
      seoDescription
    } = req.body;
    
    const updateData: any = {};
    if (title) updateData.title = title;
    if (content) updateData.content = content;
    if (category) updateData.category = category;
    if (isPublished !== undefined) updateData.isPublished = isPublished;
    if (featuredImage !== undefined) updateData.featuredImage = featuredImage;
    if (excerpt !== undefined) updateData.excerpt = excerpt;
    if (seoTitle !== undefined) updateData.seoTitle = seoTitle;
    if (seoDescription !== undefined) updateData.seoDescription = seoDescription;
    
    // Process tags
    if (tags) {
      updateData.tags = typeof tags === 'string' ? 
        tags.split(',').map((tag: string) => tag.trim()) : 
        tags;
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
    
    console.log('✅ Post updated:', updatedPost.title);
    
    res.json({
      success: true,
      message: 'Post updated successfully',
      post: updatedPost
    });
  } catch (error) {
    console.error('❌ Error updating post:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to update post',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Delete post (admin only)
app.delete('/api/posts/:id', authenticateToken, async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        error: 'Database not connected'
      });
    }

    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    
    if (!deletedPost) {
      return res.status(404).json({ 
        success: false, 
        error: 'Post not found' 
      });
    }
    
    console.log('🗑️  Post deleted:', deletedPost.title);
    
    res.json({
      success: true,
      message: 'Post deleted successfully'
    });
  } catch (error) {
    console.error('❌ Error deleting post:', error);
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
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        error: 'Database not connected'
      });
    }

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
    console.error('❌ Error liking post:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to like post',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Get all posts for admin (including unpublished)
app.get('/api/admin/posts', authenticateToken, async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        error: 'Database not connected'
      });
    }

    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .select('-__v');
    
    res.json({
      success: true,
      posts
    });
  } catch (error) {
    console.error('❌ Error fetching admin posts:', error);
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
    if (mongoose.connection.readyState !== 1) {
      return res.json({
        success: true,
        stats: {
          totalPosts: 0,
          totalViews: 0,
          totalLikes: 0,
          categoryStats: [],
          message: 'Database not connected - showing default stats'
        }
      });
    }

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
    console.error('❌ Error fetching stats:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch statistics',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Test database connection endpoint
app.get('/api/test-db', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        error: 'Database not connected',
        connectionState: mongoose.connection.readyState
      });
    }

    // Try to create a test post
    const testPost = new Post({
      title: 'Test Post',
      content: 'This is a test post to verify database connection',
      category: 'education',
      isPublished: false
    });

    await testPost.save();
    await Post.findByIdAndDelete(testPost._id); // Clean up

    res.json({
      success: true,
      message: 'Database connection working properly',
      database: mongoose.connection.db?.databaseName
    });
  } catch (error) {
    console.error('❌ Database test failed:', error);
    res.status(500).json({
      success: false,
      error: 'Database test failed',
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
      database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
    },
    environment: process.env.NODE_ENV || 'development',
    port: PORT
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Elizabeth Trading Backend API',
    version: '2.0.0',
    status: 'running',
    endpoints: {
      posts: '/api/posts',
      auth: '/api/auth',
      upload: '/api/upload',
      health: '/health',
      stats: '/api/stats',
      testDb: '/api/test-db'
    }
  });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('💥 Unhandled error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    details: err.message
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
    path: req.originalUrl
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📊 MongoDB: ${MONGO_URI ? 'Configured' : 'Not configured'}`);
  console.log(`🔗 Frontend URL: http://localhost:5173`);
  console.log(`🔗 API URL: http://localhost:${PORT}`);
  console.log(`🔑 Default Admin - Username: elizabeth, Password: elizabeth123`);
});

export default app;
