import express, { Request, Response, Router } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(bodyParser.json());

// Environment variables
if (!process.env.ADMIN_USERS || !process.env.ADMIN_PASSWORD_HASH) {
  throw new Error('ADMIN_USERS and ADMIN_PASSWORD_HASH environment variables must be set');
}
const ADMIN_USERS = process.env.ADMIN_USERS.split(',');
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH;
const JWT_SECRET = process.env.JWT_SECRET || 'your_strong_secret_here';

// API Routes
const apiRouter: Router = express.Router();

// Login endpoint
apiRouter.post('/login', async function (req: Request, res: Response) {
  const { userId, password } = req.body;

  if (!userId || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  try {
    const normalizedUserId = userId.toLowerCase();
    const isValidUser = ADMIN_USERS.map(u => u.toLowerCase()).includes(normalizedUserId);
    const isValidPassword = await bcryptjs.compare(password, ADMIN_PASSWORD_HASH);

    if (!isValidUser || !isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: normalizedUserId, role: 'admin' },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Logout endpoint
apiRouter.post('/logout', (req: Request, res: Response) => {
  res.json({ message: 'Logged out successfully' });
});

// Protected route example
apiRouter.get('/profile', (req: Request & { user?: any }, res: Response) => {
  // Verify token middleware would go here
  res.json({ user: req.user });
});

// Mount API router
app.use('/api', apiRouter);

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'OK' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;

// For Vercel deployment
module.exports = app;
