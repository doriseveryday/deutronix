"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/app/LanguageContext';

const Navbar = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  // Separate state for mobile submenu toggle
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);
  
  const menuRef = React.useRef<HTMLDivElement>(null);
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const productsDropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!isMenuOpen) return;
    function handleClick(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
        setIsProductsOpen(false);
        setIsMobileProductsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isMenuOpen]);

  // Close products dropdown when clicking outside
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        productsDropdownRef.current &&
        !productsDropdownRef.current.contains(event.target as Node)
      ) {
        setIsProductsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="w-full bg-white border-b border-gray-100 py-3 px-4 sm:py-4 sm:px-6 flex justify-between items-center fixed top-0 left-0 z-[9999] overflow-visible">
      <div className="flex items-center flex-shrink-0">
        <Link href="/" className="flex items-center">
          <Image 
            src="/images/Deutronix-Logo.png" 
            alt="Deutronix Logo" 
            width={160}
            height={35}
            className="h-5 sm:h-6 md:h-7 xl:h-9 w-auto"
            priority
          />
        </Link>
      </div>

      {/* Desktop Navigation Links - Fixed positioning with better spacing */}
      <div className="hidden xl:flex absolute left-1/2 transform -translate-x-1/2 space-x-4 xl:space-x-6 2xl:space-x-8 text-sm font-medium text-gray-600">
        <Link href="/about" className="hover:text-[#009FE3] transition-colors whitespace-nowrap">
          {t('nav.about')}
        </Link>
        
        {/* Products Dropdown (Desktop) */}
        <div className="relative group" ref={productsDropdownRef}>
          <button 
            className="hover:text-[#009FE3] transition-colors whitespace-nowrap inline-flex items-center gap-1 focus:outline-none"
            onClick={() => setIsProductsOpen(!isProductsOpen)}
          >
            {t('nav.products')} <span className="text-xs transition-transform duration-200" style={{ transform: isProductsOpen ? 'rotate(180deg)' : 'none' }}>▼</span>
          </button>
          
          <div className={`absolute top-full left-1/2 transform -translate-x-1/2 pt-2 transition-all duration-200 z-50 ${
            isProductsOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}>
            <div className="bg-white rounded-xl shadow-xl border border-gray-100 py-2 w-56">
              <Link 
                href="/ddwplus" 
                className="block px-4 py-2.5 text-sm text-gray-600 hover:text-[#009FE3] hover:bg-gray-50 transition-colors"
                onClick={() => setIsProductsOpen(false)}
              >
                {t('nav.ddwplus')}
              </Link>
              <Link 
                href="/ddwgel" 
                className="block px-4 py-2.5 text-sm text-gray-600 hover:text-[#009FE3] hover:bg-gray-50 transition-colors"
                onClick={() => setIsProductsOpen(false)}
              >
                {t('nav.easymoveGel')}
              </Link>
            </div>
          </div>
        </div>
        
        <Link href="/science" className="hover:text-[#009FE3] transition-colors whitespace-nowrap">
          {t('nav.science')}
        </Link>
        <Link href="/source" className="hover:text-[#009FE3] transition-colors whitespace-nowrap">
          {t('nav.source')}
        </Link>
        <Link href="/testimonials" className="hover:text-[#009FE3] transition-colors whitespace-nowrap">
          {t('nav.testimonials')}
        </Link>
        <Link href="/events" className="hover:text-[#009FE3] transition-colors whitespace-nowrap">
          {t('nav.events')}
        </Link>
        <Link href="/contact" className="hover:text-[#009FE3] transition-colors whitespace-nowrap">
          {t('nav.contact')}
        </Link>
      </div>

      {/* Right Side: Login Button + Language Switcher + Hamburger */}
      <div className="flex items-center gap-2 sm:gap-3 xl:gap-4 ml-4 sm:ml-6 xl:ml-8 flex-shrink-0">
        
        {/* Language Switcher (Hidden on Mobile, Shows on Desktop) */}
        <div className="hidden xl:flex items-center border border-gray-300 rounded-full p-0.5">
          <button
            onClick={() => setLanguage('en')}
            className={`px-2 xl:px-3 py-1 text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 rounded-full ${
              language === 'en'
                ? 'bg-[#009FE3] text-white'
                : 'text-gray-600 hover:text-[#009FE3]'
            }`}
          >
            EN
          </button>
          <button
            onClick={() => setLanguage('zh')}
            className={`px-2 xl:px-3 py-1 text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 rounded-full ${
              language === 'zh'
                ? 'bg-[#009FE3] text-white'
                : 'text-gray-600 hover:text-[#009FE3]'
            }`}
          >
            中文
          </button>
        </div>

        <a 
          href="https://deutronix.my/sign-in" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block bg-gradient-to-r from-[#0077B6] to-[#009FE3] hover:from-[#006699] hover:to-[#0086c9] text-white text-xs sm:text-sm font-semibold py-2 px-3 sm:px-4 md:px-5 xl:px-6 rounded-full transition-all duration-300 flex items-center gap-1.5 sm:gap-2 whitespace-nowrap shadow-md hover:shadow-lg"
        >
          {t('nav.member')} <span className="text-xs hidden sm:inline">↓</span>
        </a>

        <button 
          ref={buttonRef}
          className="xl:hidden flex flex-col justify-center items-center w-7 h-7 sm:w-8 sm:h-8 ml-1 mr-2 flex-shrink-0 p-1 overflow-visible relative"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-5 sm:w-6 h-0.5 bg-gray-600 transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'rotate-45 translate-y-[5.5px] sm:translate-y-[6px]' : ''
          }`}></span>
          <span className={`block w-5 sm:w-6 h-0.5 bg-gray-600 mt-1 transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'opacity-0' : 'opacity-100'
          }`}></span>
          <span className={`block w-5 sm:w-6 h-0.5 bg-gray-600 mt-1 transition-all duration-300 ease-in-out ${
            isMenuOpen ? '-rotate-45 -translate-y-[5.5px] sm:-translate-y-[6px]' : ''
          }`}></span>
        </button>
      </div>

      {/* Mobile Menu Dropdown - KEPT EXACTLY AS ORIGINAL */}
      {isMenuOpen && (
        <div ref={menuRef} className="absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-lg xl:hidden z-40">
          <div className="flex flex-col py-4 px-6 space-y-4">
            <Link 
              href="/about" 
              className="text-gray-600 hover:text-[#009FE3] py-2 transition-colors text-base"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.about')}
            </Link>
            
            {/* Mobile Products with Toggleable Submenu */}
            <div className="py-2">
              <button 
                onClick={() => setIsMobileProductsOpen(!isMobileProductsOpen)}
                className="w-full text-gray-600 font-medium py-2 flex items-center justify-between focus:outline-none"
              >
                {t('nav.products')}
                <span className={`text-xs text-gray-400 transition-transform duration-200 ${isMobileProductsOpen ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>
              
              {isMobileProductsOpen && (
                <div className="flex flex-col space-y-3 pl-4 border-l-2 border-gray-100 mt-2">
                  <Link 
                    href="/ddwplus" 
                    className="text-gray-500 hover:text-[#009FE3] py-1 transition-colors text-sm"
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsMobileProductsOpen(false);
                    }}
                  >
                    {t('nav.ddwplus')}
                  </Link>
                  <Link 
                    href="/ddwgel" 
                    className="text-gray-500 hover:text-[#009FE3] py-1 transition-colors text-sm"
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsMobileProductsOpen(false);
                    }}
                  >
                    {t('nav.easymoveGel')}
                  </Link>
                </div>
              )}
            </div>
            
            <Link 
              href="/science" 
              className="text-gray-600 hover:text-[#009FE3] py-2 transition-colors text-base"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.science')}
            </Link>
            <Link 
              href="/source" 
              className="text-gray-600 hover:text-[#009FE3] py-2 transition-colors text-base"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.source')}
            </Link>
            <Link 
              href="/testimonials" 
              className="text-gray-600 hover:text-[#009FE3] py-2 transition-colors text-base"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.testimonials')}
            </Link>
            <Link
              href="/events"
              className="text-gray-600 hover:text-[#009FE3] py-2 transition-colors text-base"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.events')}
            </Link>
            <Link
              href="/contact"
              className="text-gray-600 hover:text-[#009FE3] py-2 transition-colors text-base"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.contact')}
            </Link>

            {/* Mobile Language Switcher */}
            <div className="pt-4 mt-2 border-t border-gray-100 flex justify-center">
              <div className="flex items-center border border-gray-300 rounded-full p-1 w-fit">
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-6 py-1.5 text-sm font-semibold whitespace-nowrap transition-all duration-200 rounded-full ${
                    language === 'en'
                      ? 'bg-[#009FE3] text-white'
                      : 'text-gray-600 hover:text-[#009FE3]'
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLanguage('zh')}
                  className={`px-6 py-1.5 text-sm font-semibold whitespace-nowrap transition-all duration-200 rounded-full ${
                    language === 'zh'
                      ? 'bg-[#009FE3] text-white'
                      : 'text-gray-600 hover:text-[#009FE3]'
                  }`}
                >
                  中文
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;