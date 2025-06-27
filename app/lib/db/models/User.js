import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Define the schema first
const userSchema = new mongoose.Schema({
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
});

// CRITICAL: Pre-save hook to hash passwords
userSchema.pre('save', async function(next) {
  console.log('💾 Pre-save hook triggered');
  console.log('  - Is password modified:', this.isModified('password'));
  console.log('  - Has password:', !!this.password);
  
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) {
    console.log('  - Password not modified, skipping hash');
    return next();
  }
  
  // Skip hashing if password is not provided (for OAuth users)
  if (!this.password) {
    console.log('  - No password provided, skipping hash');
    return next();
  }
  
  try {
    console.log('  - Original password length:', this.password.length);
    console.log('  - Is already hashed:', this.password.startsWith('$2b$') || this.password.startsWith('$2a$'));
    
    // Don't hash if already hashed
    if (this.password.startsWith('$2b$') || this.password.startsWith('$2a$')) {
      console.log('  - Password already hashed, skipping');
      return next();
    }
    
    // Hash password with cost of 12
    console.log('  - Hashing password...');
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    console.log('  - Hash generated, length:', hashedPassword.length);
    
    this.password = hashedPassword;
    console.log('  - Password hash saved');
    next();
  } catch (error) {
    console.error('  - Hash error:', error);
    next(error);
  }
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  console.log('🔐 comparePassword method called');
  console.log('  - Candidate password:', candidatePassword);
  console.log('  - Stored password exists:', !!this.password);
  console.log('  - Stored password length:', this.password?.length);
  console.log('  - Stored password preview:', this.password?.substring(0, 20) + '...');
  
  try {
    // Only compare if password exists (for OAuth users, password might be null)
    if (!this.password) {
      console.log('  - No password stored for user (likely OAuth user)');
      return false;
    }
    
    // Check if stored password looks like a hash
    const isHashed = this.password.startsWith('$2b$') || this.password.startsWith('$2a$');
    console.log('  - Password appears to be hashed:', isHashed);
    
    if (!isHashed) {
      console.log('  - WARNING: Password is not hashed! This is a security issue.');
      // For debugging purposes, let's try direct comparison
      const directMatch = candidatePassword === this.password;
      console.log('  - Direct string comparison result:', directMatch);
      return directMatch;
    }
    
    console.log('  - Performing bcrypt comparison...');
    const result = await bcrypt.compare(candidatePassword, this.password);
    console.log('  - Bcrypt comparison result:', result);
    
    // Additional debugging
    if (!result) {
      console.log('  - DEBUG: Testing if bcrypt is working...');
      const testHash = await bcrypt.hash(candidatePassword, 12);
      const testResult = await bcrypt.compare(candidatePassword, testHash);
      console.log('  - Bcrypt test result:', testResult);
    }
    
    return result;
  } catch (error) {
    console.error('  - Password comparison error:', error);
    console.error('  - Error stack:', error.stack);
    return false;
  }
};

// Update the updatedAt field before saving
userSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Check if the User model already exists to prevent OverwriteModelError
const UserModel = mongoose.models.User || mongoose.model('User', userSchema);

export default UserModel;