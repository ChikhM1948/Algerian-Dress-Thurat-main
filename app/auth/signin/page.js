'use client'

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Layout from '../../layout';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

export default function SignIn() {
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
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-extrabold text-slate-900 mb-2">
                Se Connecter
              </h1>
              
            </div>
            
            <Card className="shadow-xl border-0 overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-700 to-blue-700 px-6 py-4 -mx-5 -mt-5 mb-6">
                <h2 className="text-xl font-bold text-white">Bienvenue dans Algerian Dress Thurat</h2>
                <p className="text-blue-100 text-sm mt-1">
                Se Connecter
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
                    Email 
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
                      Mot de passe
                    </label>
                    <a href="#" className="text-sm text-blue-600 hover:text-blue-500">
                      Mot de passe Oublié?
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
              
              
              
              {/* Sign Up Link */}
              <div className="text-center text-sm">
                <span className="text-slate-800">Inscrivez-vous si vous n'avez pas de compte ?</span>{' '}
                <Link href="/auth/signup" className="font-medium text-blue-600 hover:text-blue-500">
Inscrivez-vous                </Link>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}