// app/components/ui/LanguageSelector.js
'use client'

import { useTranslation } from '../../context/TranslationContext';
import { useState, useRef, useEffect } from 'react';

const LanguageSelector = () => {
  const { currentLanguage, switchLanguage, isRTL } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' }
  ];
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const currentLang = languages.find(lang => lang.code === currentLanguage);
  
  const handleLanguageChange = (langCode) => {
    switchLanguage(langCode);
    setIsOpen(false);
  };
  
  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 ${
          isRTL ? 'flex-row-reverse' : ''
        }`}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <span className={`text-lg ${isRTL ? 'ml-2' : 'mr-2'}`}>{currentLang.flag}</span>
        <span>{currentLang.name}</span>
        <svg
          className={`h-5 w-5 text-gray-400 ${isRTL ? 'mr-2' : 'ml-2'} transition-transform duration-200 ${
            isOpen ? 'transform rotate-180' : ''
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      
      {isOpen && (
        <div
          className={`absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none ${
            isRTL ? 'left-0' : 'right-0'
          }`}
          role="menu"
          aria-orientation="vertical"
        >
          <div className="py-1" role="none">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageChange(language.code)}
                className={`group flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900 transition-colors duration-150 ${
                  currentLanguage === language.code
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-gray-700'
                } ${isRTL ? 'flex-row-reverse text-right' : 'text-left'}`}
                role="menuitem"
              >
                <span className={`text-lg ${isRTL ? 'ml-3' : 'mr-3'}`}>{language.flag}</span>
                <span className="font-medium">{language.name}</span>
                {currentLanguage === language.code && (
                  <svg
                    className={`h-4 w-4 text-indigo-600 ${isRTL ? 'mr-auto' : 'ml-auto'}`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;