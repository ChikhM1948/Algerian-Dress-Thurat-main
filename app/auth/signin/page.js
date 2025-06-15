'use client'

import { useState, Suspense } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Layout from '../../layout';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

// Separate component that uses useSearchParams
function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  const error = searchParams.get('error');
  
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCredentialsSignIn = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      setFormError('Please enter both email and password');
      return;
    }
    
    setIsLoading(true);
    setFormError('');
    
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email: formData.email,
        password: formData.password,
        callbackUrl,
      });
      
      if (result?.error) {
        setFormError('Invalid email or password');
        setIsLoading(false);
      } else if (result?.url) {
        router.push(result.url);
      }
    } catch (error) {
      setFormError('An error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  const handleOAuthSignIn = (provider) => {
    setIsLoading(true);
    signIn(provider, { callbackUrl });
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-2">
          Sign In
        </h1>
        <p className="text-slate-900">
          Access your Language Analysis Platform account
        </p>
      </div>
      
      <Card className="shadow-xl border-0 overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-700 to-blue-700 px-6 py-4 -mx-5 -mt-5 mb-6">
          <h2 className="text-xl font-bold text-white">Welcome Back</h2>
          <p className="text-blue-100 text-sm mt-1">
            Sign in to continue to the platform
          </p>
        </div>
        
        {/* Error messages */}
        {(error || formError) && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-red-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span>
              {formError || (
                error === 'CredentialsSignin' 
                  ? 'Invalid email or password' 
                  : 'An error occurred during sign in'
              )}
            </span>
          </div>
        )}
        
        {/* Credentials Form */}
        <form onSubmit={handleCredentialsSignIn} className="mb-6">
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-slate-900 mb-1">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="your@email.com"
            />
          </div>
          
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium text-slate-900 mb-1">
                Password
              </label>
              <a href="#" className="text-sm text-blue-600 hover:text-blue-500">
                Forgot password?
              </a>
            </div>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="••••••••"
            />
          </div>
          
          <Button
            type="submit"
            loading={isLoading}
            className="w-full py-2.5"
          >
            Sign In with Email
          </Button>
        </form>
        
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-slate-500">Or continue with</span>
          </div>
        </div>
        
        {/* OAuth Providers */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button
            onClick={() => handleOAuthSignIn('google')}
            disabled={isLoading}
            className="flex items-center justify-center py-2.5 px-4 border border-slate-300 rounded-lg shadow-sm bg-white hover:bg-slate-50 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
                fill="#4285F4"
              />
            </svg>
            Google
          </button>
          
          <button
            onClick={() => handleOAuthSignIn('github')}
            disabled={isLoading}
            className="flex items-center justify-center py-2.5 px-4 border border-slate-300 rounded-lg shadow-sm bg-white hover:bg-slate-50 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z"
              />
            </svg>
            GitHub
          </button>
        </div>
        
        {/* Sign Up Link */}
        <div className="text-center text-sm">
          <span className="text-slate-800">Don't have an account?</span>{' '}
          <Link href="/auth/signup" className="font-medium text-blue-600 hover:text-blue-500">
            Sign up
          </Link>
        </div>
      </Card>
    </div>
  );
}

// Loading fallback component
function SignInLoading() {
  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-2">
          Sign In
        </h1>
        <p className="text-slate-900">
          Loading...
        </p>
      </div>
    </div>
  );
}

// Main component
export default function SignIn() {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12">
        <div className="container mx-auto px-4">
          <Suspense fallback={<SignInLoading />}>
            <SignInForm />
          </Suspense>
        </div>
      </div>
    </Layout>
  );
}