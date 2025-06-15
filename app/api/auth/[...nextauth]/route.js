//@ts-nocheck
// app/api/auth/[...nextauth]/route.js
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
        if (!credentials) return null;
        
        try {
          await connectToDatabase();
          
          // Find user by email - use exec() to return a proper Promise
          const user = await User.findOne({ 
            email: credentials.email 
          }).select('+password').exec();
          
          // If no user found, return null
          if (!user) {
            return null;
          }
          
          // Check if password matches
          const isMatch = await user.comparePassword(credentials.password);
          if (!isMatch) {
            return null;
          }
          
          // Return user object without password
          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            image: user.image,
            role: user.role,
          };
        } catch (error) {
          console.error('Auth error:', error);
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
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      if (account) {
        token.provider = account.provider;
      }
      return token;
    },
    
    // Add user info to session
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
    
    // Handle OAuth signins
    async signIn({ user, account, profile }) {
      if (!account || !user || !user.email) return false;
      
      if (account.provider === 'credentials') {
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
          await User.create({
            name: user.name || profile?.name || profile?.login || 'User',
            email: user.email,
            image: user.image || null,
            provider: account.provider,
            providerId: account.providerAccountId,
          });
        } else if (dbUser.provider !== account.provider) {
          // Update provider if user exists but used a different provider
          dbUser.provider = account.provider;
          dbUser.providerId = account.providerAccountId;
          dbUser.image = user.image || dbUser.image;
          await dbUser.save();
        }
        
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
};

// Use the NextAuth handler
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };