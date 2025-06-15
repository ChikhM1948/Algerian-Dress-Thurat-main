"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { FiShoppingCart, FiMenu, FiX, FiUser, FiLogOut, FiSettings } from "react-icons/fi";
import { FaHeart, FaUserCircle } from "react-icons/fa";
import { GiLargeDress } from "react-icons/gi";

const Navbar = ({ 
  mobileMenuOpen, 
  setMobileMenuOpen,
  cartItemCount = 0,
  wishlistItemCount = 0,
  openCart,
  openWishlist
}) => {
  const { data: session, status } = useSession();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const loading = status === "loading";

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };

    if (userMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [userMenuOpen]);

  // Close mobile menu when screen size changes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileMenuOpen, setMobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const handleSignOut = async () => {
    try {
      setUserMenuOpen(false);
      setMobileMenuOpen(false);
      await signOut({ 
        callbackUrl: "/", 
        redirect: true 
      });
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const handleUserMenuToggle = () => {
    setUserMenuOpen(prev => !prev);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="bg-white text-[#333333] shadow-lg sticky top-0 z-50 border-b-2 border-[#D8315B]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" onClick={closeMobileMenu}>
                <span className="flex items-center font-bold text-xl cursor-pointer text-[#D8315B] hover:text-[#FF8BA7] transition-colors duration-300">
                  <GiLargeDress className="mr-2 text-[#D8315B] text-2xl" />
                  <span className="hidden sm:block">Algerian Dress Turath</span>
                  <span className="block sm:hidden">Algerian Dress Turath</span>
                </span>
              </Link>
            </div>

            {/* Desktop menu */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="hover:text-[#D8315B] font-medium transition duration-300 border-b-2 border-transparent hover:border-[#D8315B]">
                Accueil
              </Link>
              <Link href="/" className="hover:text-[#D8315B] font-medium transition duration-300 border-b-2 border-transparent hover:border-[#D8315B]">
                Nos Vêtements
              </Link>
              <Link href="/about" className="hover:text-[#D8315B] font-medium transition duration-300 border-b-2 border-transparent hover:border-[#D8315B]">
                À Propos
              </Link>
              <Link href="/contact" className="hover:text-[#D8315B] font-medium transition duration-300 border-b-2 border-transparent hover:border-[#D8315B]">
                Contactez-nous
              </Link>
            </div>

            {/* Icons and User Menu */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Wishlist Button - Hidden on very small screens */}
              <button 
                className="relative group p-2 rounded-full hover:bg-[#FFF0F3] transition-colors duration-300 hidden xs:block"
                onClick={openWishlist}
                type="button"
                aria-label="Ouvrir la liste de souhaits"
              >
                <FaHeart className="h-5 w-5 text-[#D8315B] hover:text-[#FF8BA7] transition duration-300" />
                {wishlistItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#D8315B] text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold">
                    {wishlistItemCount > 9 ? '9+' : wishlistItemCount}
                  </span>
                )}
                <span className="absolute top-full right-0 w-40 bg-black text-white shadow-md rounded-md p-2 text-xs text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50 mt-2">
                  Ma liste de souhaits
                </span>
              </button>
              
              {/* Cart Button - Hidden on very small screens */}
              <button 
                className="relative group p-2 rounded-full hover:bg-[#FFF0F3] transition-colors duration-300 hidden xs:block"
                onClick={openCart}
                type="button"
                aria-label="Ouvrir le panier"
              >
                <FiShoppingCart className="h-5 w-5 text-[#D8315B] hover:text-[#FF8BA7] transition duration-300" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#D8315B] text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold">
                    {cartItemCount > 9 ? '9+' : cartItemCount}
                  </span>
                )}
                <span className="absolute top-full right-0 w-40 bg-black text-white shadow-md rounded-md p-2 text-xs text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50 mt-2">
                  Mon panier
                </span>
              </button>

              {/* User Authentication Section - Desktop */}
              <div className="relative hidden md:block" ref={userMenuRef}>
                {loading ? (
                  <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>
                ) : session?.user ? (
                  <div className="relative">
                    <button
                      onClick={handleUserMenuToggle}
                      className="flex items-center space-x-2 focus:outline-none p-1 rounded-full hover:bg-[#FFF0F3] transition-colors duration-300"
                      type="button"
                      aria-label="Menu utilisateur"
                    >
                      {session.user.image ? (
                        <Image
                          src={session.user.image}
                          alt={session.user.name || "Utilisateur"}
                          width={32}
                          height={32}
                          className="rounded-full border-2 border-[#D8315B] object-cover"
                          unoptimized
                        />
                      ) : (
                        <FaUserCircle className="h-8 w-8 text-[#D8315B]" />
                      )}
                      <span className="hidden lg:block text-sm font-medium text-[#333333] max-w-20 truncate">
                        {session.user.name || "Utilisateur"}
                      </span>
                    </button>

                    {/* User Dropdown Menu */}
                    {userMenuOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-[#FF8BA7]">
                        <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
                          <div className="font-medium truncate">{session.user.name || "Utilisateur"}</div>
                          <div className="text-gray-500 truncate text-xs">{session.user.email}</div>
                        </div>
                        
                        <Link
                          href="/profile"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-[#FFF0F3] transition duration-300"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <FiUser className="mr-3 h-4 w-4" />
                          Mon Profil
                        </Link>
                        
                        <Link
                          href="/orders"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-[#FFF0F3] transition duration-300"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <FiSettings className="mr-3 h-4 w-4" />
                          Mes Commandes
                        </Link>
                        
                        <button
                          onClick={handleSignOut}
                          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-[#FFF0F3] transition duration-300 text-left"
                          type="button"
                        >
                          <FiLogOut className="mr-3 h-4 w-4" />
                          Se Déconnecter
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Link
                      href="/auth/signin"
                      className="text-[#D8315B] hover:text-[#FF8BA7] font-medium transition duration-300 px-2 py-1 rounded"
                    >
                      Connexion
                    </Link>
                    <span className="text-gray-400">|</span>
                    <Link
                      href="/auth/signup"
                      className="bg-[#D8315B] text-white px-3 py-1 rounded-full text-sm hover:bg-[#FF8BA7] transition duration-300 font-medium"
                    >
                      S'inscrire
                    </Link>
                  </div>
                )}
              </div>
              
              {/* Mobile menu hamburger button */}
              <button 
                className="md:hidden p-2 rounded-full hover:bg-[#FFF0F3] transition-colors duration-300 relative z-60"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                type="button"
                aria-label="Menu mobile"
                aria-expanded={mobileMenuOpen}
              >
                <div className="w-6 h-6 flex flex-col justify-center items-center">
                  <span className={`block w-5 h-0.5 bg-[#D8315B] transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
                  <span className={`block w-5 h-0.5 bg-[#D8315B] mt-1 transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
                  <span className={`block w-5 h-0.5 bg-[#D8315B] mt-1 transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Mobile menu */}
      <div className={`fixed top-16 left-0 right-0 bottom-0 bg-white z-50 md:hidden transform transition-transform duration-300 ease-in-out ${
        mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Navigation Links */}
          <div className="flex-1 overflow-y-auto px-4 py-6">
            <nav className="space-y-4">
              <Link 
                href="/" 
                className="block py-3 px-4 text-lg font-medium text-[#333333] hover:text-[#D8315B] hover:bg-[#FFF0F3] rounded-lg transition duration-300"
                onClick={closeMobileMenu}
              >
                Accueil
              </Link>
              <Link 
                href="/" 
                className="block py-3 px-4 text-lg font-medium text-[#333333] hover:text-[#D8315B] hover:bg-[#FFF0F3] rounded-lg transition duration-300"
                onClick={closeMobileMenu}
              >
                Nos Vêtements
              </Link>
              <Link 
                href="/about" 
                className="block py-3 px-4 text-lg font-medium text-[#333333] hover:text-[#D8315B] hover:bg-[#FFF0F3] rounded-lg transition duration-300"
                onClick={closeMobileMenu}
              >
                À Propos
              </Link>
              <Link 
                href="/contact" 
                className="block py-3 px-4 text-lg font-medium text-[#333333] hover:text-[#D8315B] hover:bg-[#FFF0F3] rounded-lg transition duration-300"
                onClick={closeMobileMenu}
              >
                Contactez-nous
              </Link>
            </nav>

            {/* Mobile Cart and Wishlist */}
            <div className="mt-8 pt-6 border-t border-[#FF8BA7]">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide px-4 mb-4">
                Mes achats
              </h3>
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  closeMobileMenu();
                  if (openWishlist) openWishlist();
                }}
                className="flex items-center justify-between w-full py-3 px-4 text-[#333333] hover:text-[#D8315B] hover:bg-[#FFF0F3] rounded-lg transition duration-300"
                type="button"
              >
                <div className="flex items-center">
                  <FaHeart className="h-5 w-5 mr-3 text-[#D8315B]" />
                  <span className="font-medium">Liste de souhaits</span>
                </div>
                {wishlistItemCount > 0 && (
                  <span className="bg-[#D8315B] text-white text-xs px-2 py-1 rounded-full font-bold">
                    {wishlistItemCount > 9 ? '9+' : wishlistItemCount}
                  </span>
                )}
              </button>
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  closeMobileMenu();
                  if (openCart) openCart();
                }}
                className="flex items-center justify-between w-full py-3 px-4 text-[#333333] hover:text-[#D8315B] hover:bg-[#FFF0F3] rounded-lg transition duration-300"
                type="button"
              >
                <div className="flex items-center">
                  <FiShoppingCart className="h-5 w-5 mr-3 text-[#D8315B]" />
                  <span className="font-medium">Panier</span>
                </div>
                {cartItemCount > 0 && (
                  <span className="bg-[#D8315B] text-white text-xs px-2 py-1 rounded-full font-bold">
                    {cartItemCount > 9 ? '9+' : cartItemCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Auth Section */}
          <div className="border-t border-[#FF8BA7] px-4 py-6 bg-[#FFF0F3]">
            {loading ? (
              <div className="animate-pulse">
                <div className="h-12 bg-gray-200 rounded-lg"></div>
              </div>
            ) : session?.user ? (
              <div className="space-y-4">
                <div className="flex items-center space-x-3 px-4 py-3 bg-white rounded-lg">
                  {session.user.image ? (
                    <Image
                      src={session.user.image}
                      alt={session.user.name || "Utilisateur"}
                      width={40}
                      height={40}
                      className="rounded-full border-2 border-[#D8315B] object-cover"
                      unoptimized
                    />
                  ) : (
                    <FaUserCircle className="h-10 w-10 text-[#D8315B]" />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-[#333333] truncate">{session.user.name || "Utilisateur"}</div>
                    <div className="text-sm text-gray-500 truncate">{session.user.email}</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Link
                    href="/profile"
                    className="flex items-center py-2 px-4 text-[#333333] hover:text-[#D8315B] transition duration-300"
                    onClick={closeMobileMenu}
                  >
                    <FiUser className="mr-3 h-5 w-5 text-[#D8315B]" />
                    <span className="font-medium">Mon Profil</span>
                  </Link>
                  
                  <Link
                    href="/orders"
                    className="flex items-center py-2 px-4 text-[#333333] hover:text-[#D8315B] transition duration-300"
                    onClick={closeMobileMenu}
                  >
                    <FiSettings className="mr-3 h-5 w-5 text-[#D8315B]" />
                    <span className="font-medium">Mes Commandes</span>
                  </Link>
                  
                  <button
                    onClick={handleSignOut}
                    className="flex items-center w-full py-2 px-4 text-[#333333] hover:text-[#D8315B] transition duration-300 text-left"
                    type="button"
                  >
                    <FiLogOut className="mr-3 h-5 w-5 text-[#D8315B]" />
                    <span className="font-medium">Se Déconnecter</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <Link
                  href="/auth/signin"
                  className="block w-full py-3 px-4 text-center text-[#D8315B] border-2 border-[#D8315B] rounded-lg font-medium hover:bg-[#D8315B] hover:text-white transition duration-300"
                  onClick={closeMobileMenu}
                >
                  Connexion
                </Link>
                <Link
                  href="/auth/signup"
                  className="block w-full py-3 px-4 text-center bg-[#D8315B] text-white rounded-lg font-medium hover:bg-[#FF8BA7] transition duration-300"
                  onClick={closeMobileMenu}
                >
                  S'inscrire
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;