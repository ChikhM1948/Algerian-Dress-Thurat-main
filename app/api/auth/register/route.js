// app/api/auth/register/route.js
import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/db/mongodb';
import User from '../../../lib/db/models/User';
import bcrypt from 'bcryptjs';

export async function POST(request) {
  try {
    // Parse request body
    const { name, email, password } = await request.json();
    
    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    if (password.length < 8) {
      return NextResponse.json(
        { message: 'Password must be at least 8 characters long' },
        { status: 400 }
      );
    }
    
    // Connect to database
    await connectToDatabase();
    
    // Check if user already exists
    const existingUser = await User.findOne({ email }).exec();
    if (existingUser) {
      return NextResponse.json(
        { message: 'Email already in use' },
        { status: 409 }
      );
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);
    
    // Create new user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      provider: 'credentials',
      role: 'user',
    });
    
    // Return success response (without password)
    const user = newUser.toObject();
    delete user.password;
    
    return NextResponse.json(
      { 
        message: 'User registered successfully',
        user: {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
        } 
      },
      { status: 201 }
    );
    
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}