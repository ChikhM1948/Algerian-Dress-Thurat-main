import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Check if the User model already exists to prevent OverwriteModelError
const UserModel = mongoose.models.User || mongoose.model('User', new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email',
    ],
  },
  password: {
    type: String,
    select: false, // Don't return password by default
    minlength: [8, 'Password should be at least 8 characters long'],
  },
  image: {
    type: String,
    default: null,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  provider: {
    type: String,
    enum: ['credentials', 'google', 'github'],
    default: 'credentials',
  },
  providerId: {
    type: String,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
}));

// Add method to User model prototype
UserModel.prototype.comparePassword = async function(candidatePassword) {
  try {
    // Only compare if password exists (for OAuth users, password might be null)
    if (!this.password) {
      return false;
    }
    
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    console.error('Password comparison error:', error);
    return false;
  }
};

export default UserModel;