import React from 'react';
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-white py-12 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6">
        {/* Brand Section with Logo - FIXED */}
        <div className="mb-8">
          <div className="font-bold text-gray-900">
            <Image 
              src="/images/Deutronix-Logo.png" 
              alt="Deutronix" 
              width={150} 
              height={40}
              className="h-6 w-auto"
            />
          </div>
        </div>

        <div className="flex flex-row justify-between mb-6">
          
          {/* Main content - takes 70% width */}
          <div className="w-7/12">
            {/* Single column on mobile, 3 columns on desktop */}
            <div className="space-y-6 md:space-y-0 md:grid md:grid-cols-3 md:gap-8">
              
              {/* Left column - About */}
              <div>
                <h3 className="font-bold text-gray-900 mb-2 text-sm">About Deutronix</h3>
                <div className="space-y-1 text-sm text-gray-600">
                  <a href="science" className="block hover:text-gray-900">DDW Science</a>
                  <a href="source" className="block hover:text-gray-900">Source & Standards</a>
                </div>
              </div>

              {/* Middle column - Products */}
              <div>
                <h3 className="font-bold text-gray-900 mb-2 text-sm">Products</h3>
                <div className="space-y-1 text-sm text-gray-600">
                  <a href="ddwplus" className="block hover:text-gray-900">DDW+ Drinking Water</a>
                  <a href="ddwgel" className="block hover:text-gray-900">EasyMove Gel</a>
                </div>
              </div>

              {/* Right column - Contact */}
              <div>
                <h3 className="font-bold text-gray-900 mb-2 text-sm">Contact</h3>
                <div className="space-y-1 text-sm text-gray-600">
                  <a href="tel:0102850516" className="block hover:text-gray-900">Contact Us</a>
                  <a href="mailto:deutronix.my@gmail.com" className="block hover:text-gray-900">deutronix.my@gmail.com</a>
                  <p className="block">Malaysia</p>
                </div>
              </div>
            </div>
          </div>
{/* right section */}
          <div className="w-3/12 flex justify-end">
            <div className="flex flex-col items-end justify-end space-y-4">
              <a 
                href="https://wa.me" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-green-600 transition-colors"
                aria-label="WhatsApp"
              >
                <FaWhatsapp size={36} className="md:size-7" />
              </a>
              <a 
                href="https://www.facebook.com/deutronix.my" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600 transition-colors"
                aria-label="Facebook"
              >
                <FaFacebook size={36} className="md:size-7" />
              </a>
              <a 
                href="https://www.instagram.com/deutronix.my" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-pink-600 transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram size={36} className="md:size-7" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom section with copyright and links */}
        <div className="pt-6 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
          {/* Left: Copyright */}
          <div className="text-xs text-gray-500">
            © 2026 Deutronix Sdn. Bhd. All rights reserved.
          </div>

          {/* Center: Policy links */}
          <div className="flex items-center space-x-4 text-xs text-gray-600">
            <a href="https://deutronix.my/document/DEUTRONIX_TNC.pdf" className="hover:text-gray-900">Privacy Policy</a>
            <span>·</span>
            <a href="https://deutronix.my/document/DEUTRONIX_TNC.pdf" className="hover:text-gray-900">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;