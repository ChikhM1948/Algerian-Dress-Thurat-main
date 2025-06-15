'use client'

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Layout from '../../layout';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

export default function SignUp() {
  const router = useRouter();
  
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setFormError('All fields are required');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setFormError('Passwords do not match');
      return;
    }
    
    if (formData.password.length < 8) {
      setFormError('Password must be at least 8 characters long');
      return;
    }
    
    setIsLoading(true);
    setFormError('');
    
    try {
      // Call your registration API
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Error registering user');
      }
      
      // Automatically sign in after successful registration
      await signIn('credentials', {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });
      
      // Redirect to home page
      router.push('/');
      
    } catch (error) {
      setFormError(error.message || 'An error occurred during registration');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleOAuthSignIn = (provider) => {
    setIsLoading(true);
    signIn(provider, { callbackUrl: '/' });
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-extrabold text-slate-900 mb-2">
                Créer un compte
              </h1>
              <p className="text-slate-900">
                Rejoignez-nous pour une expérience exceptionele
              </p>
            </div>
            
            <Card className="shadow-xl border-0 overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-700 to-blue-700 px-6 py-4 -mx-5 -mt-5 mb-6">
                <h2 className="text-xl font-bold text-white">Sign Up</h2>
                <p className="text-blue-100 text-sm mt-1">
                  Créer un compte pour comencer
                </p>
              </div>
              
              {/* Error messages */}
              {formError && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span>{formError}</span>
                </div>
              )}
              
              {/* Registration Form */}
              <form onSubmit={handleSubmit} className="mb-6">
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-slate-900 mb-1">
                   Nom & prénom
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Your Name"
                  />
                </div>
                
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
                
                <div className="mb-4">
                  <label htmlFor="password" className="block text-sm font-medium text-slate-900 mb-1">
                    Mot de passe
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="••••••••"
                  />
                  <p className="mt-1 text-xs text-slate-600">
                    Password must be at least 8 characters
                  </p>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-900 mb-1">
                    Confirmer mot de passe
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={formData.confirmPassword}
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
                  Créer un compte 
                </Button>
              </form>
              
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                </div>
              </div>
              
              {/* OAuth Providers */}
              
              
              {/* Sign In Link */}
              <div className="text-center text-sm">
                <span className="text-slate-800">Vous avez déja un compte ?</span>{' '}
                <Link href="/auth/signin" className="font-medium text-blue-600 hover:text-blue-500">
                  Connectez-vous
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}