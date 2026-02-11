"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
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
    <nav className="w-full bg-white border-b border-gray-100 py-3 px-4 sm:py-4 sm:px-6 flex justify-between items-center sticky top-0 z-50 overflow-visible">
      <div className="flex items-center flex-shrink-0">
        <Link href="/" className="flex items-center">
          <Image 
            src="/images/Deutronix-Logo.png" 
            alt="Deutronix Logo" 
            width={160}
            height={35}
            className="h-5 sm:h-6 md:h-7 lg:h-9 w-auto"
            priority
          />
        </Link>
      </div>

      {/* Desktop Navigation Links - CENTERED with responsive breakpoints */}
      <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 space-x-6 xl:space-x-8 text-sm font-medium text-gray-600">
        <Link href="/about" className="hover:text-[#009FE3] transition-colors whitespace-nowrap">
          About
        </Link>
        
        {/* Products Dropdown */}
        <div className="relative group" ref={productsDropdownRef}>
          <button 
            className="hover:text-[#009FE3] transition-colors whitespace-nowrap inline-flex items-center gap-1 focus:outline-none"
            onClick={() => setIsProductsOpen(!isProductsOpen)}
          >
            Products <span className="text-xs transition-transform duration-200" style={{ transform: isProductsOpen ? 'rotate(180deg)' : 'none' }}>▼</span>
          </button>
          
          {/* Dropdown Menu */}
          <div className={`absolute top-full left-1/2 transform -translate-x-1/2 pt-2 transition-all duration-200 z-50 ${
            isProductsOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}>
            <div className="bg-white rounded-xl shadow-xl border border-gray-100 py-2 w-56">
              <Link 
                href="/ddwplus" 
                className="block px-4 py-2.5 text-sm text-gray-600 hover:text-[#009FE3] hover:bg-gray-50 transition-colors"
                onClick={() => setIsProductsOpen(false)}
              >
                DDW+
              </Link>
              <Link 
                href="/ddwgel" 
                className="block px-4 py-2.5 text-sm text-gray-600 hover:text-[#009FE3] hover:bg-gray-50 transition-colors"
                onClick={() => setIsProductsOpen(false)}
              >
                EasyMove Gel
              </Link>
            </div>
          </div>
        </div>
        
        <Link href="/science" className="hover:text-[#009FE3] transition-colors whitespace-nowrap">
          DDW Science
        </Link>
        <Link href="/standards" className="hover:text-[#009FE3] transition-colors whitespace-nowrap">
          Standards
        </Link>
      </div>

      {/* Right Side: Login Button + Hamburger */}
      <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 ml-6 sm:ml-8">
        <a 
          href="https://deutronix.my/sign-in" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block bg-gradient-to-r from-[#0077B6] to-[#009FE3] hover:from-[#006699] hover:to-[#0086c9] text-white text-xs sm:text-sm font-semibold py-2 px-4 sm:py-2.5 sm:px-5 md:py-3 md:px-8 rounded-full transition-all duration-300 flex items-center gap-1.5 sm:gap-2 whitespace-nowrap shadow-md hover:shadow-lg"
        >
          MEMBER LOGIN <span className="text-xs">↓</span>
        </a>

        {/* Hamburger/X Icon for Mobile ONLY */}
        <button 
          ref={buttonRef}
          className="lg:hidden flex flex-col justify-center items-center w-7 h-7 sm:w-8 sm:h-8 ml-1 mr-2 flex-shrink-0 p-1 overflow-visible relative"
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

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div ref={menuRef} className="absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-lg lg:hidden z-40">
          <div className="flex flex-col py-4 px-6 space-y-4">
            <Link 
              href="/about" 
              className="text-gray-600 hover:text-[#009FE3] py-2 transition-colors text-base"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            
            {/* Mobile Products with Submenu */}
            <div className="py-2">
              <div className="text-gray-600 font-medium mb-2 flex items-center justify-between">
                Products
                <span className="text-xs text-gray-400">▼</span>
              </div>
              <div className="flex flex-col space-y-3 pl-4 border-l-2 border-gray-100">
                <Link 
                  href="/ddwplus" 
                  className="text-gray-500 hover:text-[#009FE3] py-1 transition-colors text-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  DDW+
                </Link>
                <Link 
                  href="/ddwgel" 
                  className="text-gray-500 hover:text-[#009FE3] py-1 transition-colors text-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  EasyMove Gel
                </Link>
              </div>
            </div>
            
            <Link 
              href="/science" 
              className="text-gray-600 hover:text-[#009FE3] py-2 transition-colors text-base"
              onClick={() => setIsMenuOpen(false)}
            >
              DDW Science
            </Link>
            <Link 
              href="/standards" 
              className="text-gray-600 hover:text-[#009FE3] py-2 transition-colors text-base"
              onClick={() => setIsMenuOpen(false)}
            >
              Standards
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;