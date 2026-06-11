"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { useLanguage } from '@/app/LanguageContext';
import { client } from '@/lib/sanity';

const baseTestimonials = [
  {
    name: "Lynn Teh",
    role: "Beauty Ambassador",
    quote: "DDW+ fits well into my daily hydration routine. I like that the information is clearly explained and the ppm level is stated. It gives me confidence in what I'm drinking, and it feels like a thoughtful upgrade from regular water.",
    image: "/images/Lynn.png",
  },
  {
    name: "Kaka",
    role: "KOL / House Wife",
    quote: "As I get older, my knees and back feel stiff, especially in the morning. EasyMove Gel gives a gentle warming feeling that helps me feel more comfortable when I start moving for the day.",
    image: "/images/Kaka.png",
  },
  {
    name: "Eve Tan",
    role: "Beautician Entrepreneur",
    quote: "I drink DDW+ regularly as part of my daily routine. It tastes clean and light, and I appreciate the focus on quality and transparency rather than exaggeration.",
    image: "/images/Eve.png",
  },
  {
    name: "Wawa",
    role: "Online Retailer",
    quote: "I spend most of my day doing housework, and sometimes my lower back and legs feel tired by evening. I've been using EasyMove Gel after long days, and it gives a comforting warm feeling that helps me relax.",
    image: "/images/Wawa.png",
  },
  {
    name: "Kath",
    role: "KOL",
    quote: "I've also been drinking DDW+ regularly, and I like how clean and light it tastes. It feels like a small but thoughtful upgrade to my hydration.",
    image: "/images/Kath.png",
  },
  {
    name: "Irene",
    role: "Beautician",
    quote: "Since incorporating DDW+ into my routine, I feel more mindful about what I'm drinking every day.",
    image: "/images/Irene.png",
  },
  {
    name: "Candy",
    role: "KOL / Team Leader",
    quote: "After workouts, my muscles sometimes feel tight. EasyMove Gel provides a gentle warming comfort that I enjoy post-exercise.",
    image: "/images/Candy.png",
  },
  {
    name: "Patricia",
    role: "Hairstylist",
    quote: "I drink DDW+ daily and appreciate the transparency about its ppm level. It gives me confidence in my daily water choice.",
    image: "/images/Patricia.png",
  },
  {
    name: "Davne",
    role: "Entrepreneur",
    quote: "My schedule can be quite packed, and I'm often moving around. EasyMove Gel is helpful when I need quick comfort during the day.",
    image: "/images/Davne.png",
  },
  {
    name: "Poh Choo",
    role: "Retiree",
    quote: "As I've gotten older, walking sometimes feels uncomfortable. After applying EasyMove, it feels more eased and I can move more smoothly.",
    image: "/images/Poh-Choo.png",
  },
  {
    name: "Marcle",
    role: "KOL",
    quote: "I love to exercise, but after workouts, my muscles sometimes feel tight. EasyMove Gel provides a gentle warming comfort that I enjoy post-exercise.",
    image: "/images/Marcle.png",
  },
  {
    name: "Ee Ling",
    role: "Accountant",
    quote: "Long desk hours can feel stiff. EasyMove absorbs quickly, and help my muscle relax a lot.",
    image: "/images/Ee-Ling.png",
  },
];

const Testimonials = () => {
  const { t } = useLanguage();
  const videoScrollRef = useRef<HTMLDivElement>(null);
  const testimonialScrollRef = useRef<HTMLDivElement>(null);
  
  // SANITY & MODAL STATES
  const [sanityVideos, setSanityVideos] = useState<any[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<any | null>(null);
  
  // DYNAMIC DOT STATES
  const [videoDotCount, setVideoDotCount] = useState(0);
  const [activeVideoDot, setActiveVideoDot] = useState(0);

  const [activeTestimonial, setActiveTestimonial] = useState(1);
  const autoScrollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // FETCH SANITY VIDEOS ON LOAD
  useEffect(() => {
    async function fetchVideos() {
      try {
        const data = await client.fetch(`*[_type == "testimonialVideo"] | order(_createdAt desc)`);
        setSanityVideos(data || []);
      } catch (err) {
        console.error("Failed to fetch videos from Sanity", err);
      }
    }
    fetchVideos();
  }, []);

  // ==========================================
  // BULLETPROOF TRANSLATION MAPPING
  // ==========================================
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

  const safeT = (key: string, fallback: string) => {
    const val = t(key);
    if (!val || (typeof val === 'string' && val.includes('testimonialsPage.'))) return fallback;
    return val as string;
  };

  // ===== DYNAMIC VIDEO SCROLL LOGIC =====
  const updateVideoScrollInfo = useCallback(() => {
    const container = videoScrollRef.current;
    if (!container) return;
    const card = container.firstElementChild as HTMLElement | null;
    if (!card) return;

    const style = window.getComputedStyle(container);
    const gap = parseFloat(style.columnGap) || parseFloat(style.gap) || 0;
    const colWidth = card.offsetWidth + gap;

    const maxScroll = container.scrollWidth - container.clientWidth;
    
    if (maxScroll <= 0) {
      setVideoDotCount(0);
      return;
    }

    // Calculates exactly how many stops exist based on physical width
    const stops = Math.round(maxScroll / colWidth) + 1;
    setVideoDotCount(stops);

    let currentIdx = Math.round(container.scrollLeft / colWidth);
    
    // Failsafe for the final dot
    if (container.scrollLeft >= maxScroll - 5) {
       currentIdx = stops - 1;
    }
    
    setActiveVideoDot(currentIdx);
  }, []);

  useEffect(() => {
    updateVideoScrollInfo();
    window.addEventListener("resize", updateVideoScrollInfo);
    const container = videoScrollRef.current;
    if (container) {
      container.addEventListener("scroll", updateVideoScrollInfo, { passive: true });
    }
    return () => {
      window.removeEventListener("resize", updateVideoScrollInfo);
      if (container) container.removeEventListener("scroll", updateVideoScrollInfo);
    };
  }, [updateVideoScrollInfo, sanityVideos]);

  const scrollVideo = useCallback(
    (direction: "left" | "right") => {
      const container = videoScrollRef.current;
      if (!container) return;
      const card = container.firstElementChild as HTMLElement | null;
      if (!card) return;
      
      const style = window.getComputedStyle(container);
      const gap = parseFloat(style.columnGap) || parseFloat(style.gap) || 0;
      const colWidth = card.offsetWidth + gap;
      const maxScroll = container.scrollWidth - container.clientWidth;
      const currentScroll = container.scrollLeft;

      if (direction === "right") {
        if (currentScroll >= maxScroll - 10) {
          container.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          container.scrollBy({ left: colWidth, behavior: "smooth" });
        }
      } else if (direction === "left") {
        if (currentScroll <= 10) {
          container.scrollTo({ left: maxScroll, behavior: "smooth" });
        } else {
          container.scrollBy({ left: -colWidth, behavior: "smooth" });
        }
      }
    },
    []
  );

  // ===== TESTIMONIAL LOGIC =====
  const updateTestimonialCounter = useCallback(() => {
    const container = testimonialScrollRef.current;
    if (!container) return;
    
    const card = container.firstElementChild as HTMLElement | null;
    if (!card) return;

    const cardWidth = card.offsetWidth;
    const gap = 24;
    const singleItemWidth = cardWidth + gap;
    
    const containerWidth = container.clientWidth;
    const scrollLeft = container.scrollLeft;
    const scrollWidth = container.scrollWidth;
    
    const visibleItems = Math.round(containerWidth / singleItemWidth) || 1;
    const firstVisibleIndex = Math.round(scrollLeft / singleItemWidth);
    
    let currentEndIndex = firstVisibleIndex + visibleItems;

    if (Math.ceil(scrollLeft + containerWidth) >= scrollWidth - 10) {
      currentEndIndex = localizedTestimonials.length;
    }

    setActiveTestimonial(Math.min(currentEndIndex, localizedTestimonials.length));
  }, [localizedTestimonials.length]);

  useEffect(() => {
    const container = testimonialScrollRef.current;
    if (!container) return;

    updateTestimonialCounter();

    container.addEventListener("scroll", updateTestimonialCounter, { passive: true });
    window.addEventListener("resize", updateTestimonialCounter);
    
    return () => {
      container.removeEventListener("scroll", updateTestimonialCounter);
      window.removeEventListener("resize", updateTestimonialCounter);
    };
  }, [updateTestimonialCounter]);

  const scrollTestimonial = useCallback(
    (direction: "left" | "right") => {
      const container = testimonialScrollRef.current;
      if (!container) return;
      const card = container.firstElementChild as HTMLElement | null;
      if (!card) return;

      const cardWidth = card.offsetWidth + 24;
      const maxScroll = container.scrollWidth - container.clientWidth;
      const currentScroll = container.scrollLeft;

      if (direction === "right") {
        if (currentScroll >= maxScroll - 10) {
          container.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          container.scrollBy({ left: cardWidth, behavior: "smooth" });
        }
      } else if (direction === "left") {
        if (currentScroll <= 10) {
          container.scrollTo({ left: maxScroll, behavior: "smooth" });
        } else {
          container.scrollBy({ left: -cardWidth, behavior: "smooth" });
        }
      }
    },
    []
  );

  const resetAutoScroll = useCallback(() => {
    if (autoScrollRef.current) clearInterval(autoScrollRef.current);
    autoScrollRef.current = setInterval(() => {
      scrollTestimonial("right");
    }, 4000);
  }, [scrollTestimonial]);

  useEffect(() => {
    resetAutoScroll();
    return () => {
      if (autoScrollRef.current) clearInterval(autoScrollRef.current);
    };
  }, [resetAutoScroll]);


  // ===== RENDER =====
  return (
    <div className="w-full bg-white relative">
      {/* ===== HERO ===== */}
      <section className="w-full bg-gradient-to-r from-[#009FE3] to-[#0077B6] py-14 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white">
            {safeT('testimonialsPage.hero.title', 'What Our Users Say')}
          </h1>
          <p className="text-white/80 mt-4 text-sm md:text-base max-w-2xl mx-auto">
            {safeT('testimonialsPage.hero.subtitle', 'Real stories from real people. Hear how DDW+ and EasyMove Gel fit into everyday life.')}
          </p>
        </div>
      </section>

      {/* ===== SCROLLABLE 2-ROW VIDEO CAROUSEL ===== */}
      {sanityVideos.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 py-14">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              {safeT('testimonialsPage.videoSection.title', 'Video Testimonials')}
            </h2>
            
            {/* Desktop Navigation Arrows */}
            <div className="hidden md:flex gap-3">
              <button 
                onClick={() => scrollVideo("left")} 
                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-[#009FE3] hover:text-[#009FE3] transition"
                aria-label="Previous column"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button 
                onClick={() => scrollVideo("right")} 
                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-[#009FE3] hover:text-[#009FE3] transition"
                aria-label="Next column"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>

          <div className="relative">
            {/* Grid container with 2 rows, horizontally flowing columns */}
            <div
              ref={videoScrollRef}
              className="
                grid grid-rows-2 grid-flow-col auto-cols-[calc(50%-6px)] gap-3 
                md:flex md:flex-row md:gap-6 
                overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide pb-4 
                [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]
              "
            >
              {sanityVideos.map((video) => {
                const thumbnailUrl = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;
                
                return (
                  <div
                    key={video._id}
                    className="
                      w-full snap-start cursor-pointer group
                      md:flex-shrink-0 md:w-[23.5%] md:snap-center md:flex md:flex-col md:items-center md:justify-center
                    "
                    onClick={() => setSelectedVideo(video)}
                  >
                    <div
                      /* FIXED: Hardcoded aspect-[9/16] to bring back the tall TikTok style and cut off the black bars! */
                      className="relative overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-300 bg-gray-900 rounded-2xl w-full aspect-[9/16]"
                    >
                      <Image 
                        src={thumbnailUrl} 
                        alt={video.title || "Video thumbnail"} 
                        fill 
                        className="object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" 
                        unoptimized
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 md:w-14 md:h-14 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-[#009FE3] group-hover:scale-110 transition-all duration-300 border border-white/50 shadow-lg">
                          <svg className="w-5 h-5 md:w-6 md:h-6 text-white translate-x-[1px]" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              {/* Invisible spacer for Desktop flex edge */}
              <div className="hidden md:block w-2 flex-shrink-0"></div>
            </div>
          </div>

          {/* DYNAMIC Dots indicator */}
          {videoDotCount > 1 && (
            <div className="flex justify-center gap-2 mt-4">
              {Array.from({ length: videoDotCount }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    const container = videoScrollRef.current;
                    if (!container) return;
                    const card = container.firstElementChild as HTMLElement | null;
                    if (!card) return;
                    const style = window.getComputedStyle(container);
                    const gap = parseFloat(style.columnGap) || parseFloat(style.gap) || 0;
                    const colWidth = card.offsetWidth + gap;
                    
                    container.scrollTo({
                      left: i * colWidth,
                      behavior: "smooth",
                    });
                    setActiveVideoDot(i);
                  }}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    i === activeVideoDot
                      ? "bg-[#009FE3] scale-125"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to section ${i + 1}`}
                />
              ))}
            </div>
          )}
        </section>
      )}

      {/* ===== VIDEO MODAL (POPS UP ON CLICK) ===== */}
      {selectedVideo && (
        <div 
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <div 
            className={`relative w-full max-h-[90vh] bg-black rounded-2xl overflow-hidden shadow-2xl ${
              selectedVideo.isShort ? 'max-w-[380px] aspect-[9/16]' : 'max-w-4xl aspect-video'
            }`}
            onClick={(e) => e.stopPropagation()} 
          >
            <button 
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            <iframe
              src={`https://www.youtube-nocookie.com/embed/${selectedVideo.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
              title="Video Testimonial"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
        </div>
      )}

      <div className="w-full h-px bg-gray-200" />

      {/* ===== WRITTEN TESTIMONIALS CAROUSEL ===== */}
      <section className="max-w-6xl mx-auto px-6 py-14">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-10 text-center md:text-left">
          {safeT('testimonialsPage.writtenSection.title', 'Stories from Our Community')}
        </h2>

        <div
          ref={testimonialScrollRef}
          className="flex overflow-x-auto gap-6 pb-4 snap-x snap-mandatory scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {localizedTestimonials.map((t) => (
            <div
              key={t.name}
              className="min-w-[85vw] md:min-w-[380px] snap-center bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="relative w-14 h-14 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                  <Image src={t.image} alt={t.name} fill className="object-cover" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">{t.name}</p>
                  <p className="text-[#009FE3] text-xs">{t.role}</p>
                </div>
              </div>

              <div className="flex gap-0.5 mb-3">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-sm">★</span>
                ))}
              </div>

              <p className="text-gray-600 text-sm leading-relaxed flex-1">
                &ldquo;{t.quote}&rdquo;
              </p>
            </div>
          ))}
          <div className="w-2 flex-shrink-0"></div>
        </div>

        <div className="flex items-center justify-center gap-6 mt-8">
          <button
            onClick={() => { scrollTestimonial("left"); resetAutoScroll(); }}
            className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-400 hover:text-[#009FE3] hover:border-[#009FE3] transition"
          >
            &lt;
          </button>
          <span className="text-sm font-medium text-[#009FE3]">
            {activeTestimonial} of {localizedTestimonials.length}
          </span>
          <button
            onClick={() => { scrollTestimonial("right"); resetAutoScroll(); }}
            className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-400 hover:text-[#009FE3] hover:border-[#009FE3] transition"
          >
            &gt;
          </button>
        </div>
      </section>

      {/* ===== BOTTOM CTA ===== */}
      <section className="w-full bg-gradient-to-r from-[#009FE3] to-[#0077B6] py-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-xl md:text-2xl font-bold text-white leading-snug">
            {safeT('testimonialsPage.cta.title', 'Every story begins with a choice.')}
          </p>
          <p className="text-white/80 mt-2 text-sm md:text-base">
            {safeT('testimonialsPage.cta.subtitle', 'Discover what DDW+ and EasyMove Gel can do for your daily routine.')}
          </p>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;