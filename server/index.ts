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
import connectDB from './db';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 8080;
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key_here';

// Initialize database connection
connectDB();

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
const uploadsDir = path.join(__dirname, '../uploads');
app.use('/uploads', express.static(uploadsDir));

// Create uploads directory if it doesn't exist
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Admin User Schema and Model
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

adminSchema.methods.comparePassword = async function(candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password);
};

const Admin = mongoose.models.Admin || mongoose.model('Admin', adminSchema);

// Post Schema and Model
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

postSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  if (!this.excerpt && this.content) {
    this.excerpt = this.content.substring(0, 150).replace(/<[^>]*>/g, '') + '...';
  }
  next();
});

const Post = mongoose.models.Post || mongoose.model('Post', postSchema);

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

mongoose.connection.once('open', initializeAdmin);

// [Keep all your existing routes exactly as they were]
// AUTH ROUTES
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

    const query = username ? { username } : { email };
    const admin = await Admin.findOne(query);

    if (!admin) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    const isValidPassword = await admin.comparePassword(password);
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    admin.lastLogin = new Date();
    await admin.save();

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

// [Keep all other routes exactly as they were in your original file]
// Logout, verify token, change password, file upload, post routes, etc.

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
// At the end of your index.ts file, replace the app.listen() with:
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📊 MongoDB: ${process.env.MONGO_URI ? 'Configured' : 'Not configured'}`);
});

// Handle shutdown gracefully
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

export default app;
