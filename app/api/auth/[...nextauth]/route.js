//@ts-nocheck
// app/api/auth/[...nextauth]/route.js - FIXED VERSION
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import { connectToDatabase } from '../../../lib/db/mongodb';
import User from '../../../lib/db/models/User';

/** @type {import('next-auth').AuthOptions} */
const authOptions = {
  providers: [
    // Email/Password authentication
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        console.log('🔐 AUTHORIZE FUNCTION CALLED');
        console.log('📧 Email:', credentials?.email);
        console.log('🔑 Password provided:', !!credentials?.password);
        
        if (!credentials || !credentials.email || !credentials.password) {
          console.log('❌ Missing credentials');
          return null;
        }
        
        try {
          console.log('🔌 Connecting to database...');
          await connectToDatabase();
          console.log('✅ Database connected');
          
          console.log('🔍 Looking for user with email:', credentials.email);
          // Find user by email - use exec() to return a proper Promise
          const user = await User.findOne({ 
            email: credentials.email 
          }).select('+password').exec();
          
          console.log('👤 User found:', !!user);
          
          // If no user found, return null
          if (!user) {
            console.log('❌ No user found with email:', credentials.email);
            return null;
          }
          
          console.log('📋 User details:');
          console.log('  - ID:', user._id.toString());
          console.log('  - Name:', user.name);
          console.log('  - Email:', user.email);
          console.log('  - Provider:', user.provider);
          console.log('  - Has password:', !!user.password);
          console.log('  - Password length:', user.password?.length);
          console.log('  - Password starts with $2b$:', user.password?.startsWith('$2b$'));
          console.log('  - Password starts with $2a$:', user.password?.startsWith('$2a$'));
          
          // Check if this is an OAuth user trying to sign in with credentials
          if (user.provider !== 'credentials') {
            console.log('❌ User registered with OAuth provider:', user.provider);
            return null;
          }
          
          // Check if user has a password
          if (!user.password) {
            console.log('❌ User has no password (OAuth user)');
            return null;
          }
          
          console.log('🔐 Comparing passwords...');
          console.log('  - Input password:', credentials.password);
          console.log('  - Stored hash preview:', user.password.substring(0, 20) + '...');
          
          // Check if password matches
          const isMatch = await user.comparePassword(credentials.password);
          console.log('✅ Password match result:', isMatch);
          
          if (!isMatch) {
            console.log('❌ Password does not match');
            return null;
          }
          
          console.log('🎉 Authentication successful!');
          
          // Return user object without password
          const returnUser = {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            image: user.image,
            role: user.role,
          };
          
          console.log('📤 Returning user:', returnUser);
          return returnUser;
          
        } catch (error) {
          console.error('💥 Auth error:', error);
          console.error('Stack trace:', error.stack);
          return null;
        }
      },
    }),
    
    // Google OAuth provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    
    // GitHub OAuth provider
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  
  // Session configuration
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  
  callbacks: {
    // Add user info to JWT token
    async jwt({ token, user, account }) {
      console.log('🎫 JWT Callback:', { 
        hasUser: !!user, 
        hasAccount: !!account,
        tokenId: token.id 
      });
      
      if (user) {
        token.id = user.id;
        token.role = user.role;
        console.log('✅ Added user info to token');
      }
      if (account) {
        token.provider = account.provider;
        console.log('✅ Added provider to token:', account.provider);
      }
      return token;
    },
    
    // Add user info to session
    async session({ session, token }) {
      console.log('📋 Session Callback:', { 
        hasSession: !!session.user,
        tokenId: token.id 
      });
      
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        console.log('✅ Added user info to session');
      }
      return session;
    },
    
    // Handle OAuth signins
    async signIn({ user, account, profile }) {
      console.log('🚪 SignIn Callback:', { 
        provider: account?.provider,
        email: user?.email,
        hasProfile: !!profile 
      });
      
      if (!account || !user || !user.email) {
        console.log('❌ SignIn failed: missing account, user, or email');
        return false;
      }
      
      if (account.provider === 'credentials') {
        console.log('✅ Credentials signin approved');
        return true;
      }
      
      // For OAuth providers
      try {
        await connectToDatabase();
        
        // Check if user exists - use exec() to return a proper Promise
        const dbUser = await User.findOne({ 
          email: user.email 
        }).exec();
        
        if (!dbUser) {
          // Create new user if doesn't exist
          console.log('🆕 Creating new OAuth user');
          await User.create({
            name: user.name || profile?.name || profile?.login || 'User',
            email: user.email,
            image: user.image || null,
            provider: account.provider,
            providerId: account.providerAccountId,
          });
          console.log('✅ OAuth user created');
        } else if (dbUser.provider !== account.provider) {
          // Update provider if user exists but used a different provider
          console.log('🔄 Updating user provider');
          dbUser.provider = account.provider;
          dbUser.providerId = account.providerAccountId;
          dbUser.image = user.image || dbUser.image;
          await dbUser.save();
          console.log('✅ User provider updated');
        }
        
        return true;
      } catch (error) {
        console.error('💥 OAuth signin error:', error);
        return false;
      }
    },
  },
  
  // Pages configuration
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
  },
  
  // Enable debug in development
  debug: process.env.NODE_ENV === 'development',
};

// Use the NextAuth handler
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };