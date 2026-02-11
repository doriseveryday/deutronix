"use client";

import React from 'react';
import Image from 'next/image';

const DDWPlus = () => {
  return (
    <section className="w-full max-w-7xl mx-auto px-6 py-16">
      <h1 className="text-4xl md:text-5xl font-bold text-[#009FE3] mb-8">DDW Plus</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            Your DDW Plus page content here...
          </p>
        </div>
        <div>
          <Image 
            src="/images/about-image.png" 
            alt="About Deutronix"
            width={600}
            height={400}
            className="object-contain w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default DDWPlus;