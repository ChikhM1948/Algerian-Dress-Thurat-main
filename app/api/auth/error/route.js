'use client'

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Layout from '../../components/layout/Layout';
import Card from '../../components/ui/Card';

export default function AuthError() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  
  // Map error codes to user-friendly messages
  const getErrorMessage = (errorCode) => {
    switch (errorCode) {
      case 'Configuration':
        return 'There is an issue with the server configuration.';
      case 'AccessDenied':
        return 'You do not have permission to sign in.';
      case 'Verification':
        return 'The verification token has expired or has already been used.';
      case 'OAuthSignin':
        return 'Error in the OAuth sign-in process.';
      case 'OAuthCallback':
        return 'Error in the OAuth callback process.';
      case 'OAuthCreateAccount':
        return 'Could not create OAuth account.';
      case 'EmailCreateAccount':
        return 'Could not create email account.';
      case 'Callback':
        return 'Error in the OAuth callback.';
      case 'OAuthAccountNotLinked':
        return 'Email already in use with different provider.';
      case 'EmailSignin':
        return 'Check your email address.';
      case 'CredentialsSignin':
        return 'Sign in failed. Check the details you provided are correct.';
      case 'SessionRequired':
        return 'Please sign in to access this page.';
      default:
        return 'An unknown error occurred.';
    }
  };

  const errorMessage = getErrorMessage(error);

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <Card className="shadow-xl border-0 overflow-hidden">
              <div className="bg-gradient-to-r from-red-600 to-red-700 px-6 py-4 -mx-5 -mt-5 mb-6">
                <h2 className="text-xl font-bold text-white">Authentication Error</h2>
                <p className="text-red-100 text-sm mt-1">
                  There was a problem signing you in
                </p>
              </div>
              
              <div className="flex flex-col items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  Sign In Failed
                </h3>
                
                <p className="text-slate-800 text-center mb-6">
                  {errorMessage}
                </p>
                
                <div className="space-y-4 w-full">
                  <Link 
                    href="/auth/signin" 
                    className="block w-full text-center px-4 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Try Again
                  </Link>
                  
                  <Link 
                    href="/" 
                    className="block w-full text-center px-4 py-2.5 bg-white text-slate-900 font-medium rounded-lg border border-slate-300 hover:bg-slate-50 transition-colors"
                  >
                    Return to Home
                  </Link>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}