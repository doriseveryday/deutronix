import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Hero = () => {
  return (
    <section className="w-full max-w-7xl mx-auto px-6 py-12 md:py-20 bg-white">
      
      {/* --- Top Headings --- */}
      <div className="text-center md:text-left mb-12">
        <h1 className="text-4xl md:text-6xl font-bold text-[#009FE3] mb-4">
          DDW. Precision. Wellness.
        </h1>
        <p className="text-lg md:text-xl text-gray-600 font-medium">
          Advanced wellness solutions built on Deuterium-Depleted Water science.
        </p>
      </div>

      {/* --- Main Content Grid --- */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        
        {/* LEFT COLUMN: Product Image Area */}
        <div className="md:col-span-5 relative flex justify-center md:justify-start">
          <div className="w-full max-w-lg">
            <Image 
              src="/images/product01.png"
              alt="Deutronix DDW+ Bottle and EasyMove Gel" 
              width={600}
              height={600}
              className="object-contain w-full h-auto"
              priority
            />
          </div>
        </div>

        {/* RIGHT COLUMN: Text & Branding */}
        <div className="md:col-span-7 flex flex-col space-y-8">
          
          {/* Description Paragraph [Source: 7] */}
          <p className="text-gray-600 leading-relaxed text-lg">
            Deutronix is a science-driven wellness company focused on precision-formulated 
            solutions using <span className="font-semibold">Deuterium-Depleted Water (DDW)</span>. 
            Our platform applies DDW technology across hydration and mobility, supporting 
            everyday wellness through thoughtful formulation and responsible science.
          </p>

          {/* Divider with Small Tagline [Source: 8] */}
          <div className="border-t border-b border-gray-200 py-3">
            <p className="text-xs md:text-sm text-gray-400 uppercase tracking-widest text-center md:text-left">
              DDW Science | Precision Formulation | Designed for Absorption
            </p>
          </div>

          {/* Product Logos Area */}
          <div className="flex flex-col space-y-8 mt-4">
            
            {/* Logo 1: DDW+ */}
            <div className="flex flex-col items-start">
              <h2 className="text-4xl font-light text-[#009FE3]">
                d.d.w<sup className="text-xl">+</sup>
              </h2>
              <span className="text-sm text-[#009FE3] tracking-wider uppercase">
                Deuterium Depleted Water
              </span>
            </div>

            {/* Separator Line */}
            <div className="w-16 h-[1px] bg-gray-300"></div>

            {/* Logo 2: DDW+ EasyMove Gel */}
            <div className="flex flex-col items-start">
              <h2 className="text-4xl font-light text-[#009FE3]">
                d.d.w<sup className="text-xl">+</sup>
              </h2>
              <span className="text-xl text-[#009FE3] font-medium">
                EasyMove Gel
              </span>
            </div>
          </div>

          {/* Bottom Footer Tagline [Source: 17] */}
          <div className="pt-8">
            <p className="text-gray-400 text-sm">
              Powered by one science platform.<br />
              Across hydration and mobility.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;