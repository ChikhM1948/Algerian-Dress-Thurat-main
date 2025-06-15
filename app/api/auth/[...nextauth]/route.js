// app/api/auth/[...nextauth]/route.js
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import { connectToDatabase } from '../../../lib/db/mongodb';
import User from '../../../lib/db/models/User';
import bcrypt from 'bcryptjs';

/** @type {import('next-auth').AuthOptions} */
export const authOptions = {
  providers: [
    // Email/Password authentication
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        
        try {
          await connectToDatabase();
          
          // Find user by email
          const user = await User.findOne({ 
            email: credentials.email 
          }).select('+password');
          
          if (!user) {
            return null;
          }
          
          // Check if password matches
          const isMatch = await bcrypt.compare(credentials.password, user.password);
          if (!isMatch) {
            return null;
          }
          
          // Return user object without password
          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            image: user.image,
            role: user.role || 'user',
          };
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      },
    }),
    
    // Google OAuth provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    
    // GitHub OAuth provider
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
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
      if (user) {
        token.id = user.id;
        token.role = user.role || 'user';
      }
      if (account) {
        token.provider = account.provider;
      }
      return token;
    },
    
    // Add user info to session
    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
    
    // Handle OAuth signins
    async signIn({ user, account, profile }) {
      if (!account || !user?.email) return false;
      
      if (account.provider === 'credentials') {
        return true;
      }
      
      // For OAuth providers
      try {
        await connectToDatabase();
        
        // Check if user exists
        let dbUser = await User.findOne({ 
          email: user.email 
        });
        
        if (!dbUser) {
          // Create new user if doesn't exist
          dbUser = await User.create({
            name: user.name || profile?.name || profile?.login || 'User',
            email: user.email,
            image: user.image || profile?.avatar_url || null,
            provider: account.provider,
            providerId: account.providerAccountId,
            role: 'user',
          });
        } else {
          // Update user info if needed
          let needsUpdate = false;
          
          if (dbUser.provider !== account.provider) {
            dbUser.provider = account.provider;
            dbUser.providerId = account.providerAccountId;
            needsUpdate = true;
          }
          
          if (user.image && dbUser.image !== user.image) {
            dbUser.image = user.image;
            needsUpdate = true;
          }
          
          if (user.name && dbUser.name !== user.name) {
            dbUser.name = user.name;
            needsUpdate = true;
          }
          
          if (needsUpdate) {
            await dbUser.save();
          }
        }
        
        // Update user object with database info
        user.id = dbUser._id.toString();
        user.role = dbUser.role;
        
        return true;
      } catch (error) {
        console.error('OAuth signin error:', error);
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
  
  // Add secret
  secret: process.env.NEXTAUTH_SECRET,
};

// Use the NextAuth handler
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };