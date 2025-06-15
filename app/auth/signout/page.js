'use client'

import { useState, useEffect } from 'react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

// Dynamically import Layout to avoid SSR issues
const Layout = dynamic(() => import('../../layout'), {
  ssr: false,
  loading: () => <div>Loading...</div>
});

// Dynamically import Card to avoid SSR issues
const Card = dynamic(() => import('../../components/ui/Card'), {
  ssr: false,
  loading: () => <div className="p-6 bg-white rounded-lg shadow-lg">Loading...</div>
});

export default function SignOut() {
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    // Automatically redirect after a short delay
    const timer = setTimeout(() => {
      router.push('/');
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [router, mounted]);
  
  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await signOut({ redirect: false });
      router.push('/');
    } catch (error) {
      console.error('Sign out error:', error);
      setIsSigningOut(false);
    }
  };

  // Don't render until mounted on client
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <Card className="shadow-xl border-0 overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-700 to-blue-700 px-6 py-4 -mx-5 -mt-5 mb-6">
                <h2 className="text-xl font-bold text-white">Sign Out</h2>
                <p className="text-blue-100 text-sm mt-1">
                  We're sad to see you go
                </p>
              </div>
              
              <div className="flex flex-col items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-blue-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013 3v1" />
                </svg>
                
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  Are you sure you want to sign out?
                </h3>
                
                <p className="text-slate-800 text-center mb-6">
                  You will need to sign in again to access your account.
                </p>
                
                <div className="space-y-4 w-full">
                  <button 
                    onClick={handleSignOut}
                    disabled={isSigningOut}
                    className="block w-full text-center px-4 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSigningOut ? 'Signing Out...' : 'Sign Out'}
                  </button>
                  
                  <button 
                    onClick={() => router.back()}
                    disabled={isSigningOut}
                    className="block w-full text-center px-4 py-2.5 bg-white text-slate-900 font-medium rounded-lg border border-slate-300 hover:bg-slate-50 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}