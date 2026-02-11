"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);
  const buttonRef = React.useRef<HTMLButtonElement>(null);

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
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isMenuOpen]);

  return (
    <nav className="w-full bg-white border-b border-gray-100 py-3 px-4 sm:py-4 sm:px-6 flex justify-between items-center sticky top-0 z-50 overflow-visible">
      <div className="flex items-center flex-shrink-0">
        <Link href="/" className="flex items-center">
          <Image 
            src="/images/Deutronix-Logo.png" 
            alt="Deutronix Logo" 
            // width={180} 
            // height={40}
            // className="h-6 sm:h-7 md:h-8 lg:h-10 w-auto"
            width={160}  // Reduced from 180
            height={35}  // Reduced from 40
            className="h-5 sm:h-6 md:h-7 lg:h-9 w-auto"  // Reduced all sizes
            priority
          />
        </Link>
      </div>

      {/* Desktop Navigation Links - CENTERED with responsive breakpoints */}
      <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 space-x-6 xl:space-x-8 text-sm font-medium text-gray-600">
        <Link href="/about" className="hover:text-[#009FE3] transition-colors whitespace-nowrap">About</Link>
        <Link href="/products" className="hover:text-[#009FE3] transition-colors whitespace-nowrap">Products</Link>
        <Link href="/science" className="hover:text-[#009FE3] transition-colors whitespace-nowrap">DDW Science</Link>
        <Link href="/standards" className="hover:text-[#009FE3] transition-colors whitespace-nowrap">Standards</Link>
      </div>

      {/* Right Side: Login Button + Hamburger - With more spacing */}
      <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 ml-6 sm:ml-8">
       {/* <a 
          href="https://deutronix.my/sign-in" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block bg-gradient-to-r from-[#0077B6] to-[#009FE3] hover:from-[#006699] hover:to-[#0086c9] text-white text-[10px] xs:text-xs sm:text-sm font-semibold py-1 px-3 sm:py-1.5 sm:px-4 md:py-2 md:px-6 rounded-full transition-all duration-300 flex items-center gap-1 sm:gap-2 whitespace-nowrap shadow-sm hover:shadow-md"
        >
          MEMBER LOGIN <span className="text-[8px] xs:text-[10px] sm:text-xs">↓</span>
        </a> */}
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
          {/* Hamburger bars that transform into X */}
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

      {/* Mobile Menu Dropdown - ONLY NAV LINKS */}
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
            <Link 
              href="/products" 
              className="text-gray-600 hover:text-[#009FE3] py-2 transition-colors text-base"
              onClick={() => setIsMenuOpen(false)}
            >
              Products
            </Link>
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