import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const MONGO_URI = process.env.MONGO_URI || '';

const connectDB = async () => {
  try {
    if (!MONGO_URI) {
      console.log('⚠️  No MONGO_URI found - running without database');
      return;
    }

    await mongoose.connect(MONGO_URI);
    console.log('✅ MongoDB connected successfully');
    console.log('📊 Database:', mongoose.connection.db?.databaseName);
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    console.log('⚠️  Continuing without database - some features will be limited');
  }
};

export default connectDB;
