'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const Hero = () => {
  // ==========================
  // 1. DATA SOURCES
  // ==========================
  const testimonials = [
    {
      name: "Lynn Teh",
      role: "Beauty Ambassador",
      quote: "DDW+ fits well into my daily hydration routine. I like that the information is clearly explained and the ppm level is stated. It gives me confidence in what I’m drinking, and it feels like a thoughtful upgrade from regular water.",
      image: "/images/Lynn.png"
    },
    {
      name: "Kaka",
      role: "KOL\nHouse Wife",
      quote: "As I get older, my knees and back feel stiff, especially in the morning. EasyMove Gel gives a gentle warming feeling that helps me feel more comfortable when I start moving for the day.",
      image: "/images/Kaka.png"
    },
    {
      name: "Eve Tan",
      role: "Beautician Entrepreneur",
      quote: "I drink DDW+ regularly as part of my daily routine. It tastes clean and light, and I appreciate the focus on quality and transparency rather than exaggeration.",
      image: "/images/Eve.png"
    }
  ];

  const certs = [
    { name: "ISO 22000", src: "/images/ISO.png", label: "ISO NUMBER:", value: "002FSMS2300343", cols: "col-span-1" },
    { name: "FDA Registered", src: "/images/FDA.png", label: "REGISTRATION NUMBER:", value: "18783320348", cols: "col-span-1" },
    { name: "HACCP", src: "/images/HACCP.png", label: "CERTIFICATE NUMBER:", value: "002HACCP2300315", cols: "col-span-1" },
    { name: "Halal", src: "/images/Halal.png", label: "CERTIFICATE NUMBER:", value: "SSPY-201318-34008", cols: "col-span-1" },
    { name: "Notification Note", src: "/images/NOT.png", label: "", value: "", cols: "col-span-2 md:col-span-2" },
    { name: "GMPC Intertek", src: "/images/GMPC.png", label: "CERTIFICATE NUMBER:", value: "SZ2207H1", cols: "col-span-1" },
    { name: "ISO 22716 Intertek", src: "/images/Interlek.png", label: "CERTIFICATE NUMBER:", value: "SZ2207G9", cols: "col-span-1" },
  ];

  // ==========================
  // 2. REFS & STATE
  // ==========================
  const [displayCount, setDisplayCount] = useState(1);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const autoScrollIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // -- NEW HERO REFS --
  const heroDescriptionRef = useRef<HTMLDivElement>(null);
  const heroCompanyDescRef = useRef<HTMLDivElement>(null);
  const heroProductImageRef = useRef<HTMLDivElement>(null);

  // -- OTHER REFS --
  const scienceSectionRef = useRef<HTMLElement>(null);
  const scienceBgRef = useRef<HTMLDivElement>(null);
  const scienceContentRef = useRef<HTMLDivElement>(null);
  const productsSectionRef = useRef<HTMLElement>(null);
  const certsContainerRef = useRef<HTMLDivElement>(null);

  // ==========================
  // 3. LOGIC & EFFECTS
  // ==========================
  const updateCounter = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollLeft = container.scrollLeft;
      const containerWidth = container.clientWidth;
      const firstCard = container.firstElementChild;
      const cardWidth = firstCard ? firstCard.clientWidth : 380;
      const gap = 24; 
      const singleItemWidth = cardWidth + gap;
      const visibleItems = Math.floor(containerWidth / singleItemWidth) || 1;
      const firstVisibleIndex = Math.round(scrollLeft / singleItemWidth);
      let currentEndIndex = Math.min(firstVisibleIndex + visibleItems, testimonials.length);
      setDisplayCount(currentEndIndex);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const firstCard = container.firstElementChild;
      const cardWidth = firstCard ? firstCard.clientWidth : 380;
      const gap = 24;
      const scrollAmount = direction === 'left' ? -(cardWidth + gap) : (cardWidth + gap);
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    updateCounter();
    window.addEventListener('resize', updateCounter);
    return () => window.removeEventListener('resize', updateCounter);
  }, []);

  // Auto-scroll logic
  const startAutoScroll = () => {
    if (autoScrollIntervalRef.current) clearInterval(autoScrollIntervalRef.current);
    autoScrollIntervalRef.current = setInterval(() => {
      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        const maxScroll = container.scrollWidth - container.clientWidth;
        const currentScroll = container.scrollLeft;
        const firstCard = container.firstElementChild;
        const cardWidth = firstCard ? firstCard.clientWidth : 380;
        const gap = 24;
        const scrollAmount = cardWidth + gap;
        if (currentScroll + scrollAmount >= maxScroll - 10) {
          container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scroll('right');
        }
      }
    }, 3000);
  };

  const resetAutoScroll = () => startAutoScroll();

  useEffect(() => {
    startAutoScroll();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', resetAutoScroll);
      container.addEventListener('mousedown', resetAutoScroll);
    }
    return () => {
      if (autoScrollIntervalRef.current) clearInterval(autoScrollIntervalRef.current);
      if (container) {
        container.removeEventListener('scroll', resetAutoScroll);
        container.removeEventListener('mousedown', resetAutoScroll);
      }
    };
  }, []);

  // --- GSAP ANIMATIONS ---
  useGSAP(() => {
    // 1. Hero Text
    if (heroDescriptionRef.current) {
      gsap.fromTo(heroDescriptionRef.current, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out" });
    }
    if (heroCompanyDescRef.current) {
      gsap.fromTo(heroCompanyDescRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1.2, delay: 0.5, ease: "power3.out" });
    }
    // 2. Hero Image Float
    if (heroProductImageRef.current) {
      gsap.to(heroProductImageRef.current, { y: -10, duration: 2, repeat: -1, yoyo: true, ease: "sine.inOut" });
      gsap.to(heroProductImageRef.current, { filter: "drop-shadow(0 0 8px rgba(0, 159, 227, 0.4))", duration: 1.5, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.3 });
    }
    // 3. Science Section
    const sciSection = scienceSectionRef.current;
    const sciBg = scienceBgRef.current;
    const sciContent = scienceContentRef.current;
    if (sciSection && sciBg && sciContent) {
      gsap.fromTo('.gsap-reveal', 
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out", scrollTrigger: { trigger: sciSection, start: "top 70%", toggleActions: "play none none reverse" } }
      );
      const pinTimeline = gsap.timeline({ scrollTrigger: { trigger: sciSection, start: "top top", end: "+=300%", pin: true, scrub: 1, anticipatePin: 1 } });
      pinTimeline
        .to(sciContent, { y: -500, opacity: 0, scale: 0.80, duration: 0.8 }, 0)
        .to(sciBg, { scale: 1.2, duration: 0.8 }, 0)
        .to(sciBg, { scale: 1.2, duration: 2.2 }, 0.8);
    }
    // 4. Products Section
    if (productsSectionRef.current) {
      const cards = gsap.utils.toArray('.product-card');
      cards.forEach((card: any) => {
        const image = card.querySelector('.product-image');
        const text = card.querySelector('.product-text');
        const tl = gsap.timeline({ scrollTrigger: { trigger: card, start: "top 85%", toggleActions: "play reverse play reverse" } });
        tl.fromTo(image, { scale: 0.5, opacity: 0, y: 50 }, { scale: 1, opacity: 1, y: 0, duration: 0.8, ease: "back.out(1.7)" })
          .fromTo(text, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }, "-=0.4");
      });
    }
    // 5. Certs Section
    if (certsContainerRef.current) {
      const certItems = gsap.utils.toArray('.cert-item');
      certItems.forEach((item: any, index) => {
        gsap.fromTo(item, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, delay: index * 0.1, ease: "power3.out", scrollTrigger: { trigger: item, start: "top 85%", toggleActions: "play none none none" } });
      });
      gsap.to(certsContainerRef.current, { opacity: 1, scrollTrigger: { trigger: certsContainerRef.current, start: "top 80%", toggleActions: "play none none reverse" } });
    }
  }, { scope: undefined });


  // ==========================
  // 4. RENDER
  // ==========================
  return (
    <div className="w-full flex flex-col font-sans text-gray-700 bg-white">
      
      {/* 2. HERO SECTION */}
      <section className="w-full max-w-7xl mx-auto px-6 py-8 md:py-20 z-10 relative bg-gray-50/40 rounded-2xl mt-4">
        {/* Main Title - Centered for both views */}
        <div className="text-center mb-10 md:mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-[#009FE3] mb-4">DDW. Precision. Wellness.</h1>
          <p ref={heroDescriptionRef} className="text-lg md:text-2xl text-gray-600 font-medium">Advanced wellness solutions built on Deuterium-Depleted Water science.</p>
        </div>
        
        {/* Content Grid: Switched to md:grid-cols-2 (50/50 split) for better balance on PC */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          
          {/* Image Column: Centered in its half */}
          <div className="relative flex justify-center">
            <div ref={heroProductImageRef} className="w-40 md:w-64 lg:w-72">
              <Image 
                src="/images/product01.png" 
                alt="Deutronix Products" 
                width={400} 
                height={400} 
                className="object-contain w-full h-auto" 
                priority 
              />
            </div> 
          </div>
          
          {/* Text Column: Left aligned relative to the image */}
          <div className="flex flex-col space-y-6 md:space-y-8 text-center md:text-left">
            <p ref={heroCompanyDescRef} className="text-gray-600 leading-relaxed text-lg text-justify md:text-left">
              Deutronix is a science-driven wellness company focused on precision-formulated solutions using <span className="font-semibold text-[#009FE3]">Deuterium-Depleted Water (DDW)</span>. Our platform applies DDW technology across hydration and mobility, supporting everyday wellness through thoughtful formulation and responsible science.
            </p>
            
            <div className="flex flex-row items-center justify-center md:justify-start gap-4 md:gap-8 mt-2">
              <div className="relative w-28 h-14 md:w-32 md:h-16">
                <Image 
                  src="/images/ddw-logo.png" 
                  alt="DDW+" 
                  width={144} 
                  height={72} 
                  className="object-contain w-full h-full"
                />
              </div>
              
              <div className="relative w-28 h-14 md:w-32 md:h-16">
                <Image 
                  src="/images/EasyMove-logo.png" 
                  alt="EasyMove Gel" 
                  width={144} 
                  height={72} 
                  className="object-contain w-full h-full"
                />
              </div>
            </div>
            
            <div className="border-t border-b border-gray-200 py-4">
              <p className="text-xs md:text-sm text-gray-400 uppercase tracking-widest text-center md:text-left">DDW Science | Precision Formulation | Designed for Absorption</p>
            </div>
          </div>
        </div>
      </section>

     {/* 3. SCIENCE SECTION (Pinned & Reveal) */}
      <section 
        ref={scienceSectionRef}
        className="relative w-full h-screen px-6 flex items-center justify-center overflow-hidden z-10"
      >
        <div ref={scienceBgRef} className="absolute inset-0 z-0 scale-100">
          <Image src="/images/mountain01.jpg" alt="Altai Mountain" fill sizes="100vw" className="object-cover" priority />
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        <div className="relative z-10 w-full max-w-4xl flex flex-col items-center" ref={scienceContentRef}>
          <h2 className="gsap-reveal text-4xl md:text-5xl font-extrabold text-white text-center mb-10 drop-shadow-lg">
            Deuterium-Depleted Water (DDW)
          </h2>
          <div className="gsap-reveal bg-white rounded-2xl shadow-2xl p-8 md:p-12 w-full">
            <div className="gsap-reveal">
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8">
                Deuterium-Depleted Water (DDW) is water with a naturally lower concentration of deuterium...
                <br /><br />
                Lower deuterium levels are an area of scientific interest due to their relationship with cellular energy efficiency.
              </p>
            </div>
            <div className="gsap-reveal flex justify-center">
              <Link href="/science" className="inline-flex items-center bg-white text-[#009FE3] text-lg font-bold border border-gray-100 rounded-full px-8 py-3 shadow-[0_4px_14px_0_rgba(0,0,0,0.1)] hover:shadow-lg transition-all duration-300">
                <span className="border-b border-transparent hover:border-[#009FE3]">Learn the Science &gt;</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PRODUCTS SECTION */}
      <section ref={productsSectionRef} className="relative z-20 w-full bg-white py-24 px-6">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-48">
            <h2 className="text-4xl md:text-6xl font-bold text-[#009FE3] mb-4">Precision for Every Need.</h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">
              Two precision applications of Deuterium-Depleted Water, designed to support the body from within and from without.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 md:gap-12">
            
            {/* Product 1: DDW+ */}
            <div className="product-card relative bg-white border border-gray-100 rounded-[2rem] shadow-2xl p-8 pt-24 text-left hover:shadow-[0_20px_40px_rgba(0,159,227,0.1)] transition-shadow duration-300">
              <div className="product-image absolute -top-48 md:-top-56 left-1/2 transform -translate-x-1/2 w-96 md:w-full max-w-md md:max-w-xl">
                <Image src="/images/product02.png" alt="DDW+ Pack" width={500} height={600} className="object-contain drop-shadow-xl" />
              </div>
              <div className="product-text">
                <h3 className="text-4xl font-extrabold text-[#009FE3] mb-1">DDW+</h3>
                <p className="text-lg font-semibold text-[#009FE3] mb-2">Deuterium-Depleted Water</p>
                <p className="text-sm font-bold text-gray-400 uppercase mb-2 tracking-wide">Daily Hydration (132–138 ppm)</p>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  Glacial-sourced deuterium-depleted water for everyday consumption, supporting metabolic balance.
                </p>
                <div className="flex justify-end">
                  <Link href="/products/ddw" className="text-[#009FE3] font-semibold text-sm hover:underline flex items-center gap-1">
                    Learn the Products <span className="text-lg">&gt;</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Product 2: Gel */}
            <div className="product-card relative bg-white border border-gray-100 rounded-[2rem] shadow-2xl p-8 pt-24 text-left hover:shadow-[0_20px_40px_rgba(0,159,227,0.1)] transition-shadow duration-300 mt-20 md:mt-0">
               <div className="product-image absolute -top-48 md:-top-56 left-1/2 transform -translate-x-1/2 w-96 md:w-full max-w-md md:max-w-xl">
                <Image src="/images/product03.png" alt="EasyMove Gel" width={500} height={600} className="object-contain drop-shadow-xl" />
              </div>
              <div className="product-text">
                <h3 className="text-4xl font-extrabold text-[#009FE3] mb-1">EasyMove Gel</h3>
                <p className="text-lg font-semibold text-[#009FE3] mb-2">DDW+ Topical Solution</p>
                <p className="text-sm font-bold text-gray-400 uppercase mb-2 tracking-wide">Targeted Recovery (50 ppm)</p>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  A high-penetration topical gel designed for localized use, delivering deuterium-depleted water efficiently to muscles and skin.
                </p>
                <div className="flex justify-end">
                  <Link href="/products/gel" className="text-[#009FE3] font-semibold text-sm hover:underline flex items-center gap-1">
                    Learn the Products <span className="text-lg">&gt;</span>
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

     {/* 5. SOURCE & STANDARDS */}
      <section className="relative z-10 w-full bg-white py-20 px-6">
        <div className="max-w-7xl mx-auto flex flex-col items-start">
          <div className="w-full max-w-4xl mb-10">
            <h2 className="text-4xl md:text-5xl font-bold text-[#009FE3] mb-4">Source & Standards</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Our deuterium-depleted water is naturally sourced from the pristine Altai Mountain glacial region...
            </p>
          </div>
          <div ref={certsContainerRef} className="w-full grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12 mb-10">
            {certs.map((cert, index) => (
               <div key={index} className={`cert-item flex flex-col items-center justify-start ${cert.cols} transition-all duration-300 hover:scale-105`}>
                 <div className="relative w-full h-20 md:h-28 mb-3 filter hover:drop-shadow-lg">
                   <Image src={cert.src} alt={cert.name} fill sizes="(max-width: 768px) 100px, 120px" className="object-contain" />
                 </div>
                 {cert.value && (
                   <div className="text-center mt-auto">
                     <p className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-wide">{cert.label}</p>
                     <p className="text-[10px] md:text-xs font-bold text-gray-600 uppercase tracking-wide">{cert.value}</p>
                   </div>
                 )}
               </div>
            ))}
          </div>
          <div className="w-full">
            <Link href="/standards" className="inline-block text-[#009FE3] text-lg font-semibold hover:underline">Learn Our Standards &gt;</Link>
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS */}
      <section className="relative z-10 w-full max-w-7xl mx-auto px-6 py-10 bg-white">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-[#009FE3] mb-12">What Our Users Say</h2>
        <div 
          ref={scrollContainerRef}
          onScroll={updateCounter} 
          className="flex overflow-x-auto gap-6 pb-4 snap-x snap-mandatory scrollbar-hide"
        >
          {testimonials.map((user, index) => (
            <div key={index} className="min-w-[85vw] md:min-w-[380px] snap-center bg-white border border-gray-100 rounded-lg shadow-sm p-8 flex flex-col">
              <div className="flex flex-row items-center gap-5 mb-6">
                <div className="relative w-20 h-20 flex-shrink-0">
                   <div className="w-full h-full rounded-full overflow-hidden bg-gray-200 border border-gray-100 relative">
                     <Image src={user.image} alt={user.name} fill sizes="80px" className="object-cover" />
                   </div>
                </div>
                <div className="flex flex-col">
                  <h3 className="text-xl font-bold text-gray-800 leading-none mb-1">{user.name}</h3>
                  <p className="text-sm text-gray-500 leading-tight whitespace-pre-line">{user.role}</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                <span className="font-semibold text-gray-800">“</span> {user.quote} <span className="font-semibold text-gray-800">”</span>
              </p>
            </div>
          ))}
          <div className="w-2 flex-shrink-0"></div>
        </div>
        <div className="flex items-center justify-center gap-6 mt-8">
           <button onClick={() => { scroll('left'); resetAutoScroll(); }} className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-400 hover:text-[#009FE3] hover:border-[#009FE3] transition">&lt;</button>
           <span className="text-sm font-medium text-[#009FE3]">{String(displayCount)} of {testimonials.length}</span>
           <button onClick={() => { scroll('right'); resetAutoScroll(); }} className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-400 hover:text-[#009FE3] hover:border-[#009FE3] transition">&gt;</button>
        </div>
      </section>

      {/* ABOUT US SECTION */}
      <section className="w-full max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="flex flex-col lg:flex-row items-center gap-6 md:gap-5">
          <div className="w-full lg:w-7/12">
            <Image 
              src="/images/product04.png" 
              alt="Deutronix Company" 
              width={850} 
              height={850} 
              className="object-contain w-full h-auto"
              priority
            />
          </div>
          <div className="w-full lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-[#009FE3] mb-1">About Us</h2>
            <p className="text-gray-600 text-lg md:text-xl leading-relaxed mb-10">
              Deutronix is a health-focused company dedicated to the research, development, and education of deuterium-depleted water applications. Guided by science, quality, and long-term responsibility, we develop wellness solutions designed to support modern lifestyles with clarity and care.
            </p>
            <div className="flex justify-end">
              <button className="text-[#009FE3] font-semibold hover:text-[#0077B3] transition-colors flex items-center text-lg md:text-xl group">
                Learn about Us
                <svg 
                  className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Hero;