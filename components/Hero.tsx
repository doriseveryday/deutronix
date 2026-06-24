'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/app/LanguageContext';
import { client, urlFor } from '@/lib/sanity';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface CalendarEvent {
  id: string;
  summary: string;
  description?: string;
  location?: string;
  start: {
    dateTime?: string;
    date?: string;
  };
  end?: {
    dateTime?: string;
    date?: string;
  };
}

const Hero = () => {
  const { t, language } = useLanguage();

  // ==========================
  // 1. DATA SOURCES & TRANSLATIONS
  // ==========================
  const baseTestimonials = [
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
    },
    {
      name: "Wawa",
      role: "Online Retailer",
      quote: "I spend most of my day doing housework, and sometimes my lower back and legs feel tired by evening. I've been using EasyMove Gel after long days, and it gives a comforting warm feeling that helps me relax.",
      image: "/images/Wawa.png"
    },
    {
      name: "Kath",
      role: "KOL",
      quote: "I've also been drinking DDW+ regularly, and I like how clean and light it tastes. It feels like a small but thoughtful upgrade to my hydration.",
      image: "/images/Kath.png"
    },
    {
      name: "Irene",
      role: "Beautician",
      quote: "Since incorporating DDW+ into my routine, I feel more mindful about what I'm drinking every day.",
      image: "/images/Irene.png"
    },
    {
      name: "Candy",
      role: "KOL / Team Leader",
      quote: "After workouts, my muscles sometimes feel tight. EasyMove Gel provides a gentle warming comfort that I enjoy post-exercise.",
      image: "/images/Candy.png"
    },
    {
      name: "Patricia",
      role: "Hairstylist",
      quote: "I drink DDW+ daily and appreciate the transparency about its ppm level. It gives me confidence in my daily water choice.",
      image: "/images/Patricia.png"
    },
    {
      name: "Davne",
      role: "Entrepreneur",
      quote: "My schedule can be quite packed, and I'm often moving around. EasyMove Gel is helpful when I need quick comfort during the day.",
      image: "/images/Davne.png"
    },
    {
      name: "Poh Choo",
      role: "Retiree",
      quote: "As I've gotten older, walking sometimes feels uncomfortable. After applying EasyMove, it feels more eased and I can move more smoothly.",
      image: "/images/Poh-Choo.png"
    },
    {
      name: "Marcle",
      role: "KOL",
      quote: "I love to exercise, but after workouts, my muscles sometimes feel tight. EasyMove Gel provides a gentle warming comfort that I enjoy post-exercise.",
      image: "/images/Marcle.png"
    },
    {
      name: "Ee Ling",
      role: "Accountant",
      quote: "Long desk hours can feel stiff. EasyMove absorbs quickly, and help my muscle relax a lot.",
      image: "/images/Ee-Ling.png"
    },
  ];

  const localizedTestimonials = baseTestimonials.map((baseTest, index) => {
    const tName = t(`testimonials.testimonials.${index}.name`);
    const tRole = t(`testimonials.testimonials.${index}.title`);
    const tQuote = t(`testimonials.testimonials.${index}.quote`);
    const isValid = (val: any) => val && typeof val === 'string' && !val.includes('testimonials.testimonials');

    return {
      name: isValid(tName) ? tName : baseTest.name,
      role: isValid(tRole) ? tRole : baseTest.role,
      quote: isValid(tQuote) ? tQuote : baseTest.quote,
      image: baseTest.image
    };
  });

  const certs = [
    { name: "ISO 22000", src: "/images/ISO.png", cols: "col-span-1" },
    { name: "FDA Registered", src: "/images/FDA.png", cols: "col-span-1" },
    { name: "HACCP", src: "/images/HACCP.png", cols: "col-span-1" },
    { name: "Halal", src: "/images/Halal.png", cols: "col-span-1" },
    { name: "GMPC Intertek", src: "/images/GMPC.png", cols: "col-span-1" },
    { name: "ISO 22716 Intertek", src: "/images/Interlek.png", cols: "col-span-1" },
    { name: "Notification Note", src: "/images/NOT.png", cols: "col-span-2 md:col-span-2" },
  ];

  // ==========================
  // 2. REFS & STATE
  // ==========================
  const [displayCount, setDisplayCount] = useState(1);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const autoScrollIntervalRef = useRef<NodeJS.Timeout | null>(null);
  
  const [events, setEvents] = useState<any[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null); 
  
  const [banners, setBanners] = useState<any[]>([]); 
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const bannerScrollRefMobile = useRef<HTMLDivElement>(null);
  const bannerScrollRefDesktop = useRef<HTMLDivElement>(null);

  // Hero State
  const [heroData, setHeroData] = useState<any>(null);
  const heroSectionRef = useRef<HTMLElement>(null);
  const heroMediaRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const heroOverlayRef = useRef<HTMLDivElement>(null);
  const heroShadeRef = useRef<HTMLDivElement>(null);

  const productsSectionRef = useRef<HTMLElement>(null);
  const certsContainerRef = useRef<HTMLDivElement>(null);
  const eventsRef = useRef<HTMLElement>(null);
  const eventsScrollContainerRef = useRef<HTMLDivElement>(null);
  
  // ==========================
  // 3. LOGIC & EFFECTS
  // ==========================

  useEffect(() => {
    async function fetchSanityData() {
      try {
        const heroFetch = await client.fetch(`*[_type == "heroVideo" && isActive == true] | order(_createdAt desc)[0] {
          headline,
          subheadline,
          ctaText,
          ctaLink,
          "desktopUrl": desktopMedia.asset->url,
          "desktopExtension": desktopMedia.asset->extension,
          "mobileUrl": mobileMedia.asset->url,
          "mobileExtension": mobileMedia.asset->extension
        }`);
        setHeroData(heroFetch);

        const bannerData = await client.fetch(`*[_type == "banner" && isActive == true]`);
        setBanners(bannerData || []);

        const eventsData = await client.fetch(`*[_type == "event" && startDate >= now()] | order(startDate asc)[0...6]`);
        setEvents(eventsData || []);
      } catch (err) {
        console.error("Sanity fetch failed:", err);
      }
    }

    fetchSanityData();
  }, []);

  const isVideo = (ext: string) => ['mp4', 'webm', 'mov'].includes(ext?.toLowerCase());

  const renderMedia = (url: string, ext: string, displayClass: string) => {
    if (!url) return null;
    if (isVideo(ext)) {
      return (
        <video
          src={url}
          autoPlay
          muted
          loop
          playsInline
          className={`absolute inset-0 w-full h-full object-cover ${displayClass}`}
        />
      );
    }
    return (
      <Image
        src={url}
        alt="Hero Background"
        fill
        priority
        unoptimized
        className={`object-cover ${displayClass}`}
      />
    );
  };

  const updateCounter = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollLeft = container.scrollLeft;
      const containerWidth = container.clientWidth;
      const firstCard = container.firstElementChild;
      const cardWidth = firstCard ? firstCard.clientWidth : 380;
      const gap = 24; 
      const singleItemWidth = cardWidth + gap;
      
      const visibleItems = Math.round(containerWidth / singleItemWidth) || 1;
      const firstVisibleIndex = Math.round(scrollLeft / singleItemWidth);
      let currentEndIndex = Math.min(firstVisibleIndex + visibleItems, localizedTestimonials.length);
      setDisplayCount(currentEndIndex);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const firstCard = container.firstElementChild;
      const cardWidth = firstCard ? firstCard.clientWidth : 380;
      const gap = 24;
      const scrollAmount = cardWidth + gap;
      
      const maxScroll = container.scrollWidth - container.clientWidth;
      const currentScroll = container.scrollLeft;

      if (direction === 'right') {
        if (currentScroll >= maxScroll - 10) {
          container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
      } else if (direction === 'left') {
        if (currentScroll <= 10) {
          container.scrollTo({ left: maxScroll, behavior: 'smooth' });
        } else {
          container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        }
      }
    }
  };

  useEffect(() => {
    updateCounter();
    window.addEventListener('resize', updateCounter);
    return () => window.removeEventListener('resize', updateCounter);
  }, [localizedTestimonials.length]);

  const startAutoScroll = () => {
    if (autoScrollIntervalRef.current) clearInterval(autoScrollIntervalRef.current);
    autoScrollIntervalRef.current = setInterval(() => {
      scroll('right');
    }, 3000);
  };

  const resetAutoScroll = () => startAutoScroll();

  const scrollToEvents = () => {
    eventsRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

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

  const handleBannerScroll = () => {
    const active = (ref: any) => ref && ref.current && ref.current.clientWidth > 0 ? ref.current : null;
    const container = active(bannerScrollRefMobile) || active(bannerScrollRefDesktop);
    if (container) {
      const scrollLeft = container.scrollLeft;
      const width = container.clientWidth || 1;
      const index = Math.round(scrollLeft / width);
      setCurrentBannerIndex((prev) => (prev !== index ? index : prev));
    }
  };

  const scrollToBanner = (index: number) => {
    const activeRef = (ref: any) => ref && ref.current && ref.current.clientWidth > 0 ? ref.current : null;
    const container = activeRef(bannerScrollRefMobile) || activeRef(bannerScrollRefDesktop);
    if (container) {
      container.scrollTo({
        left: container.clientWidth * index,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    if (banners.length <= 1) return;

    const getActiveContainer = () => {
      const m = bannerScrollRefMobile.current;
      const d = bannerScrollRefDesktop.current;
      if (m && m.clientWidth > 0) return m;
      if (d && d.clientWidth > 0) return d;
      return null;
    };

    const interval = setInterval(() => {
      const container = getActiveContainer();
      if (!container) return;

      const maxScroll = container.scrollWidth - container.clientWidth;
      if (container.scrollLeft >= maxScroll - 10) {
        container.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: container.clientWidth, behavior: 'smooth' });
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [banners.length]);

  useGSAP(() => {
    if (heroMediaRef.current && heroSectionRef.current) {
      gsap.to(heroMediaRef.current, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: heroSectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });
    }

    if (heroTextRef.current) {
      gsap.fromTo(heroTextRef.current, 
        { opacity: 0, y: 30 }, 
        { opacity: 1, y: 0, duration: 1.5, delay: 0.2, ease: "power3.out" }
      );
    }

    if (heroSectionRef.current && heroShadeRef.current) {
      gsap.set(heroShadeRef.current, { opacity: 0 });
      gsap.to(heroShadeRef.current, {
        opacity: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: heroSectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6,
        }
      });
      try { ScrollTrigger.refresh(); } catch (e) {}
    }

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

    if (certsContainerRef.current) {
      const certItems = gsap.utils.toArray('.cert-item');
      gsap.fromTo(certItems, 
        { opacity: 0, y: 30, scale: 0.95 }, 
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power2.out", stagger: 0, 
          scrollTrigger: {
            trigger: certsContainerRef.current,
            start: "top 85%",
            end: "top 50%",
            toggleActions: "play none none none",
            once: true 
          }
        }
      );
    }
  }, { scope: undefined, dependencies: [heroData] });

  // ==========================
  // 4. RENDER
  // ==========================
  return (
    <div className="w-full flex flex-col font-sans text-gray-700 bg-white overflow-x-hidden">
      
      {/* 1. CINEMATIC FULL-SCREEN HERO */}
      <section 
        ref={heroSectionRef} 
        className="relative w-full h-[100vh] min-h-[600px] overflow-hidden bg-black flex items-center justify-center z-0"
      >
        <div ref={heroMediaRef} className="absolute inset-0 w-full h-[120%] -top-[10%] z-0">
          {heroData && (
            <>
              {renderMedia(heroData.desktopUrl, heroData.desktopExtension, 'hidden md:block')}
              {renderMedia(heroData.mobileUrl, heroData.mobileExtension, 'block md:hidden')}
            </>
          )}
          <div
            ref={heroOverlayRef}
            className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 z-10"
            style={{ opacity: 0.70, transition: 'opacity 200ms linear' }}
          />
          <div
            ref={heroShadeRef}
            className="absolute inset-0 bg-black z-[15] pointer-events-none"
            style={{ opacity: 0, transition: 'opacity 200ms linear' }}
          />
        </div>

        <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
          <div className="text-center px-4" style={{ fontFamily: 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial' }}>
            <h2 className="text-5xl md:text-7xl lg:text-8xl text-white mb-3 drop-shadow-lg whitespace-pre-line md:whitespace-normal">{t('hero.tagline')}</h2>
            <p className="text-md md:text-xl text-white/90">{t('hero.description')}</p>
          </div>
        </div>

        {heroData && (heroData.headline || heroData.subheadline) && (
          <div ref={heroTextRef} className="relative z-20 flex flex-col items-center text-center px-6 max-w-5xl mt-16" style={{ fontFamily: 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial' }}>
            {heroData.headline && (
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 tracking-tight drop-shadow-lg">
                {heroData.headline}
              </h1>
            )}
            {heroData.subheadline && (
              <p className="text-lg md:text-2xl text-white/90 font-medium mb-10 max-w-3xl drop-shadow-md">
                {heroData.subheadline}
              </p>
            )}
            {heroData.ctaText && heroData.ctaLink && (
              <Link 
                href={heroData.ctaLink} 
                className="bg-white text-black font-bold px-8 py-4 rounded-full hover:scale-105 hover:bg-gray-100 transition-all duration-300 shadow-xl text-lg"
              >
                {heroData.ctaText}
              </Link>
            )}
          </div>
        )}
      </section>

      {/* 2. PROMOTIONAL BANNERS (Floating Card style) */}
      {banners.length > 0 && (
        <section className="w-full relative z-20 bg-white py-4 md:py-8 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            {/* The floating card container - Reduced corner rounding and shadow to look cleaner */}
            <div className="w-full relative rounded-xl overflow-hidden bg-white shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100">
              
              {/* Mobile-friendly banner */}
              <div className="block md:hidden w-full relative">
                <div
                  ref={bannerScrollRefMobile}
                  onScroll={handleBannerScroll}
                  className="flex w-full overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                >
                  {banners.map((banner, index) => (
                    <Link
                      key={banner._id || index}
                      href={banner.link || "#"}
                      className="relative w-full flex-shrink-0 snap-center block"
                    >
                      {banner.bannerImage && (
                        <Image
                          src={urlFor(banner.bannerImage).url()}
                          alt={banner.altText || "Promotional Banner"}
                          width={1200}
                          height={1200}
                          sizes="100vw"
                          className="w-full h-auto object-contain"
                          unoptimized
                        />
                      )}
                    </Link>
                  ))}
                </div>

                {banners.length > 1 && (
                  <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-2 pointer-events-none">
                    {banners.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => scrollToBanner(index)}
                        className={`h-1.5 rounded-full transition-all duration-300 pointer-events-auto shadow-sm ${
                          index === currentBannerIndex ? 'bg-[#009FE3] w-6 opacity-100' : 'bg-gray-300/80 w-2 hover:bg-gray-400'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Desktop banner  */}
              <div className="hidden md:block w-full relative">
                <div
                  ref={bannerScrollRefDesktop}
                  onScroll={handleBannerScroll}
                  className="flex w-full overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                >
                  {banners.map((banner, index) => (
                    <Link
                      key={banner._id || index}
                      href={banner.link || "#"}
                      className="relative w-full flex-shrink-0 snap-center block"
                    >
                      {banner.bannerImage && (
                        <Image
                          src={urlFor(banner.bannerImage).url()}
                          alt={banner.altText || "Promotional Banner"}
                          width={2400}
                          height={800}
                          sizes="100vw"
                          className="w-full h-auto object-contain"
                          unoptimized
                        />
                      )}
                    </Link>
                  ))}
                </div>

                {banners.length > 1 && (
                  <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-2 pointer-events-none">
                    {banners.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => scrollToBanner(index)}
                        className={`h-2 rounded-full transition-all duration-300 pointer-events-auto shadow-sm ${
                          index === currentBannerIndex ? 'bg-[#009FE3] w-8 opacity-100' : 'bg-gray-300/80 w-2 hover:bg-gray-400'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>

            </div>
          </div>
        </section>
      )}

      {/* 3. PRODUCTS SECTION */}
      <section ref={productsSectionRef} className="relative z-20 w-full bg-white pt-4 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center ">
            <h2 className="text-3xl sm:text-4xl md:text-4xl lg:text-6xl font-bold text-[#009FE3] mb-4">{t('products.title')}</h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">
              {t('products.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-6 md:items-end">
            
            {/* Product 1: DDW+ */}
            <div className="product-card flex flex-col items-center">
              <div className="product-image w-[120%] md:w-[115%] -mb-12 relative z-10">
                <Image src="/images/product02.png" alt="DDW+ Pack" width={800} height={800} className="object-contain w-full h-auto drop-shadow-xl" />
              </div>
              <div className="relative w-full bg-white border border-gray-100 rounded-[2rem] shadow-2xl hover:shadow-[0_20px_40px_rgba(0,159,227,0.1)] transition-shadow duration-300 pt-16">
                <div className="px-8 pb-6">
                  <div className="product-text"> 
                    <h3 className="text-4xl font-extrabold text-[#009FE3] mb-1">{t('products.ddwplus.name')}</h3>
                    <p className="text-lg font-semibold text-[#009FE3] mb-2">{t('products.ddwplus.type')}</p>
                    <p className="text-sm font-bold text-gray-400 uppercase mb-2 tracking-wide">{t('products.ddwplus.spec')}</p>
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                      {t('products.ddwplus.description')}
                    </p>
                    <div className="flex justify-end">
                      <Link href="/ddwplus" className="text-[#009FE3] font-semibold text-sm hover:text-[#0077B3] transition-colors flex items-center group">
                        {t('products.ddwplus.learnMore')}
                        <svg 
                          className="w-4 h-4 ml-1.5 group-hover:translate-x-1.5 transition-transform" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Product 2: Gel */}
            <div className="product-card flex flex-col items-center">
              <div className="product-image w-[105%] md:w-[100%] -mb-12 relative z-10">
                <Image src="/images/product03.png" alt="EasyMove Gel" width={800} height={800} className="object-contain w-full h-auto drop-shadow-xl" />
              </div>
              <div className="relative w-full bg-white border border-gray-100 rounded-[2rem] shadow-2xl hover:shadow-[0_20px_40px_rgba(0,159,227,0.1)] transition-shadow duration-300 pt-16">
                <div className="px-8 pb-6">
                  <div className="product-text">
                    <h3 className="text-4xl font-extrabold text-[#009FE3] mb-1">{t('products.gel.name')}</h3>
                    <p className="text-lg font-semibold text-[#009FE3] mb-2">{t('products.gel.type') || <br/>}</p>
                    <p className="text-sm font-bold text-gray-400 uppercase mb-2 tracking-wide">{t('products.gel.spec')}</p>
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                      {t('products.gel.description')}
                    </p>
                    <div className="flex justify-end">
                      <Link href="/ddwgel" className="text-[#009FE3] font-semibold text-sm hover:text-[#0077B3] transition-colors flex items-center group">
                        {t('products.gel.learnMore')}
                        <svg 
                          className="w-4 h-4 ml-1.5 group-hover:translate-x-1.5 transition-transform" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. SOURCE & STANDARDS */}
      <section className="relative z-20 w-full bg-white py-20 px-6">
        <div className="max-w-7xl mx-auto flex flex-col items-start">
          <div className="w-full mb-10">
            <h2 className="text-[32px] md:text-4xl font-bold text-[#009FE3] mb-4">{t('standards.title')}</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              {t('standards.description')}
            </p>
          </div>
          <div ref={certsContainerRef} className="w-full grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-8 mb-10">
            {certs.map((cert, index) => (
               <div key={index} className={`cert-item flex flex-col items-center justify-start ${cert.cols} transition-all duration-300 hover:scale-105`}>
                 <div className="relative w-full h-24 md:h-32 mb-3 filter hover:drop-shadow-lg">
                   <Image src={cert.src} alt={cert.name} fill sizes="(max-width: 768px) 100px, 120px" className="object-contain" />
                 </div>
               </div>
            ))}
          </div>
           <div className="w-full mt-1 mb-2">
            <p className="text-sm md:text-base text-gray-500 pl-4">
              {t('standards.verification')}
            </p>
          </div>
          <div className="flex justify-end w-full px-5">
            <Link href="/source" className="text-[#009FE3] font-semibold hover:text-[#0077B3] transition-colors flex items-center text-lg md:text-xl group">
              {t('standards.learnMore')}
              <svg 
                className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* 5. TESTIMONIALS */}
      <section className="relative z-20 w-full px-6 py-10 bg-white">
        <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-3xl md:text-4xl font-bold text-center text-[#009FE3] mb-12">
          {t('testimonials.title')}
        </h2>
        <div 
          ref={scrollContainerRef}
          onScroll={updateCounter} 
          className="flex overflow-x-auto gap-6 pb-4 snap-x snap-mandatory scrollbar-hide"
        >
          {localizedTestimonials.map((user, index) => (
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
           <span className="text-sm font-medium text-[#009FE3]">{String(displayCount)} of {localizedTestimonials.length}</span>
           <button onClick={() => { scroll('right'); resetAutoScroll(); }} className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-400 hover:text-[#009FE3] hover:border-[#009FE3] transition">&gt;</button>
        </div>
        <div className="flex justify-end mt-6 px-5">
          <Link href="/testimonials" className="text-[#009FE3] font-semibold hover:text-[#0077B3] transition-colors flex items-center text-lg md:text-xl group">
            {t('testimonials.viewMore')}
            <svg 
              className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
        </div>
      </section>

      {/* 6. UPCOMING EVENTS */}
      <section
        id="upcoming-events"
        ref={eventsRef}
        className="relative z-20 w-full bg-white py-20 px-6 border-t border-gray-100"
      >
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:items-center">
          
          <div className="w-full lg:w-1/3 flex flex-col items-center lg:items-start text-center lg:text-left">
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#009FE3] mb-3 leading-tight">
              {t('events.title')}<br />
              {t('events.title2')}
            </h2>
            <p className="text-gray-500 text-lg mb-8 leading-relaxed max-w-md">
              {t('events.description')}
            </p>
            <Link 
              href="/events" 
              className="inline-flex items-center gap-3 border-2 border-[#009FE3] text-[#009FE3] font-bold px-6 py-3 rounded-lg hover:bg-[#009FE3] hover:text-white transition-all duration-300 group"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {t('events.viewCalendar')}
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>

          <div className="w-full lg:w-2/3">
            {events.length > 0 ? (
              <div
                ref={eventsScrollContainerRef}
                className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory scrollbar-hide py-4"
              >
                {events.map((event, index) => {
                  const isMultiDay = event.endDate && new Date(event.startDate).toDateString() !== new Date(event.endDate).toDateString();
                  
                  const startDate = new Date(event.startDate);
                  const endDate = event.endDate ? new Date(event.endDate) : null;
                  
                  const displayDay = language === 'zh' 
                    ? startDate.getDate().toString() 
                    : startDate.toLocaleDateString("en-US", { day: "2-digit" });
                  const displayMonth = startDate.toLocaleDateString(language === 'zh' ? 'zh-CN' : "en-US", { month: "short" }).toUpperCase();
                  const displayYear = startDate.toLocaleDateString(language === 'zh' ? 'zh-CN' : "en-US", { year: "numeric" });

                  let imageUrl = "/images/mountain01.jpg"; 
                  if (event.image) {
                    imageUrl = urlFor(event.image).url();
                  }
                  
                  const isWebinar = event.isWebinar === true;
                  let category = isWebinar ? t('events.webinar') : t('events.event');

                  const dateRangeText = isMultiDay && endDate
                    ? `${startDate.toLocaleDateString(language === 'zh' ? 'zh-CN' : 'en-MY', { month: 'short', day: 'numeric' })} - ${endDate.toLocaleDateString(language === 'zh' ? 'zh-CN' : 'en-MY', { month: 'short', day: 'numeric' })}`
                    : startDate.toLocaleDateString(language === 'zh' ? 'zh-CN' : 'en-MY', { month: 'long', day: 'numeric', year: 'numeric' });

                  return (
                    <div
                      key={index}
                      className="w-[85vw] md:w-[360px] flex-shrink-0 cursor-pointer snap-center bg-white rounded-2xl flex flex-col transition-all duration-300 border border-gray-100 hover:shadow-xl group overflow-hidden"
                      onClick={() => setSelectedEvent(event)}
                    >
                      <div className="relative h-48 w-full bg-gray-200">
                        <Image src={imageUrl} alt={event.title || 'Event'} fill className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized/>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute top-4 left-4 bg-[#009FE3] text-white text-[10px] font-bold px-3 py-1 rounded-full tracking-wider">{category}</div>
                        <div className="absolute top-4 right-4 bg-white rounded-lg flex flex-col items-center justify-center p-2 shadow-lg w-14">
                          <span className="text-xl font-extrabold text-[#0B1B3D] leading-none">{displayDay}</span>
                          <span className="text-[10px] font-bold text-gray-500">{displayMonth}</span>
                          <span className="text-[9px] font-bold text-gray-400">{displayYear}</span>
                        </div>
                        <div className="absolute bottom-4 left-4 right-4">
                          <h3 className="text-white font-bold text-xl leading-tight line-clamp-2 drop-shadow-md">{event.title}</h3>
                        </div>
                      </div>

                      <div className="p-6 flex flex-col flex-grow bg-white">
                        <div className="flex items-center gap-2 text-xs font-bold text-gray-500 mb-3">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                          <span>{dateRangeText}</span>
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-6 flex-grow">
                          {event.description || t('events.modal.noDetails')}
                        </p>
                        <div className="flex items-center text-[#009FE3] font-bold text-sm group/link mt-auto">
                          {isWebinar ? t('events.registerNow') : t('events.viewDetails')}
                          <svg className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                        </div>
                      </div>
                    </div>
                  );
                })}
                {events.length === 1 && (
                  <div className="w-[85vw] md:w-[360px] flex-shrink-0 snap-center bg-gray-50/50 rounded-2xl flex flex-col items-center justify-center border-2 border-dashed border-gray-200 p-8 text-center h-[auto] min-h-[400px]">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm border border-gray-100">
                      <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-400 mb-2">{t('events.moreEventsTitle')}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed max-w-[200px]">
                      {t('events.moreEventsDescription')}
                    </p>
                  </div>
                )}
                <div className="w-4 flex-shrink-0"></div>
              </div>
            ) : (
              <div className="flex items-center justify-center w-full h-full min-h-[250px]">
                <div className="px-8 py-5 bg-gray-50 rounded-xl border border-gray-100 text-gray-400 font-medium shadow-sm w-full max-w-md text-center">
                  {t('events.noEvents')}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* 7. EVENT DETAILS MODAL */}
      {selectedEvent && (() => {
        let modalImageUrl = "/images/mountain01.jpg";
        let modalCleanDesc = selectedEvent.description || "";

        if (selectedEvent.image) {
          modalImageUrl = urlFor(selectedEvent.image).url();
        }

        const isDefaultImage = modalImageUrl === "/images/mountain01.jpg";
        const startDate = selectedEvent.startDate ? new Date(selectedEvent.startDate) : null;
        const endDate = selectedEvent.endDate ? new Date(selectedEvent.endDate) : null;
        const isMultiDay = selectedEvent.endDate && new Date(selectedEvent.startDate).toDateString() !== new Date(selectedEvent.endDate).toDateString();

        return (
          <div 
            className="fixed inset-0 z-[99999] flex items-center justify-center p-4 md:p-6 pt-20 md:pt-24 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setSelectedEvent(null)}
          >
            <div 
              className={`bg-white rounded-3xl w-full shadow-2xl relative max-h-[85vh] overflow-hidden flex ${
                isDefaultImage 
                  ? 'max-w-2xl flex-col' 
                  : 'max-w-5xl md:min-h-[550px] flex-col-reverse md:flex-row'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedEvent(null)}
                className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 bg-white/90 backdrop-blur-sm md:bg-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-200 hover:text-gray-800 transition-colors z-50 shadow-md md:shadow-none"
              >
                ✕
              </button>
              
              {!isDefaultImage && (
                <div className="w-full md:w-1/2 h-[35vh] md:h-auto min-h-[250px] relative bg-gray-50 flex-shrink-0 border-t md:border-t-0 md:border-r border-gray-100">
                  <Image src={modalImageUrl} alt={selectedEvent.title || 'Event'} fill className="object-contain p-4 md:p-8" unoptimized />
                </div>
              )}

              <div className={`w-full ${!isDefaultImage ? 'md:w-1/2' : ''} p-6 md:p-10 flex flex-col overflow-y-auto relative`}>
                <h3 className={`font-extrabold text-[#009FE3] pr-12 mb-6 ${isDefaultImage ? 'text-3xl' : 'text-2xl md:text-3xl'}`}>
                  {selectedEvent.title}
                </h3>

                <div className="flex flex-col gap-4 mb-6 bg-gray-50 p-5 rounded-2xl border border-gray-100">
                  <div className="flex items-start gap-3">
                    <span className="text-xl">📅</span>
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                        {isMultiDay ? (t('events.modal.dateTime') || 'Date Time') : t('events.modal.dateTime')}
                      </p>
                      <p className="text-gray-800 font-medium text-sm md:text-base">
                        {startDate ? startDate.toLocaleDateString(
                          language === 'zh' ? 'zh-CN' : 'en-MY',
                          { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }
                        ) : t('events.modal.noDetails')}
                        
                        {isMultiDay && endDate && (
                          <>
                            <span className="mx-2 font-normal text-gray-400">→</span>
                            {endDate.toLocaleDateString(
                              language === 'zh' ? 'zh-CN' : 'en-MY',
                              { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }
                            )}
                          </>
                        )}
                      </p>
                    </div>
                  </div>

                  {selectedEvent.location && (
                    <div className="flex items-start gap-3 mt-1">
                      <span className="text-xl">📍</span>
                      <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                          {t('events.modal.location')}
                        </p>
                        <p className="text-gray-800 font-medium text-sm md:text-base">{selectedEvent.location}</p>
                      </div>
                    </div>
                  )}
                </div>

              <div>
                  <h4 className="text-lg font-bold text-gray-800 mb-2">{t('events.modal.details')}</h4>
                  <p className="text-gray-600 leading-relaxed whitespace-pre-wrap text-sm md:text-base">
                    {modalCleanDesc || t('events.modal.noDetails')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* 8. ABOUT US SECTION */}
      <section className="relative z-20 w-full bg-white px-6 py-12 md:py-24 overflow-visible border-t border-gray-100">
        <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-10 md:gap-16">
          <div className="w-full lg:w-1/2 flex justify-center items-center relative">
            <Image 
              src="/images/product04.png" 
              alt="Deutronix Company" 
              width={1000} 
              height={1000} 
              className="object-contain w-full h-auto scale-125 md:scale-135 transition-transform duration-500" 
              priority
            />
          </div>

          <div className="w-full lg:w-1/2 mt-8 lg:mt-0">
            <h2 className="text-3xl md:text-4xl font-bold text-[#009FE3] mb-3">{t('aboutUs.title')}</h2>
            <p className="text-gray-600 text-lg md:text-xl leading-relaxed mb-10">
              {t('aboutUs.description')}
            </p>
            <div className="flex justify-end px-5">
              <Link href="/about" className="text-[#009FE3] font-semibold hover:text-[#0077B3] transition-colors flex items-center text-lg md:text-xl group">
                {t('aboutUs.learnMore')}
                <svg 
                  className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Events Button */}
      <button
        onClick={scrollToEvents}
        className="fixed bottom-6 right-6 z-[99] w-14 h-14 rounded-full bg-[#009FE3] text-white shadow-xl hover:scale-110 hover:bg-[#0077B3] transition-all duration-300 flex items-center justify-center group"
        aria-label="Upcoming Events"
      >
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>

        <span className="absolute right-16 whitespace-nowrap bg-gray-900 text-white text-xs px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto">
          {t('events.floatingButton')}
        </span>
      </button>

    </div>
  );
};

export default Hero;