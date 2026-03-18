"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";

const testimonials = [
  {
    name: "Lynn Teh",
    role: "Beauty Ambassador",
    quote:
      "DDW+ fits well into my daily hydration routine. I like that the information is clearly explained and the ppm level is stated. It gives me confidence in what I'm drinking, and it feels like a thoughtful upgrade from regular water.",
    image: "/images/Lynn.png",
  },
  {
    name: "Kaka",
    role: "KOL / House Wife",
    quote:
      "As I get older, my knees and back feel stiff, especially in the morning. EasyMove Gel gives a gentle warming feeling that helps me feel more comfortable when I start moving for the day.",
    image: "/images/Kaka.png",
  },
  {
    name: "Eve Tan",
    role: "Beautician Entrepreneur",
    quote:
      "I drink DDW+ regularly as part of my daily routine. It tastes clean and light, and I appreciate the focus on quality and transparency rather than exaggeration.",
    image: "/images/Eve.png",
  },
  {
    name: "Wawa",
    role: "Online Retailer",
    quote:
      "I spend most of my day doing housework, and sometimes my lower back and legs feel tired by evening. I've been using EasyMove Gel after long days, and it gives a comforting warm feeling that helps me relax.",
    image: "/images/Wawa.png",
  },
  {
    name: "Kath",
    role: "KOL",
    quote:
      "I've also been drinking DDW+ regularly, and I like how clean and light it tastes. It feels like a small but thoughtful upgrade to my hydration.",
    image: "/images/Kath.png",
  },
  {
    name: "Irene",
    role: "Beautician",
    quote:
      "Since incorporating DDW+ into my routine, I feel more mindful about what I'm drinking every day.",
    image: "/images/Irene.png",
  },
  {
    name: "Candy",
    role: "KOL / Team Leader",
    quote:
      "After workouts, my muscles sometimes feel tight. EasyMove Gel provides a gentle warming comfort that I enjoy post-exercise.",
    image: "/images/Candy.png",
  },
  {
    name: "Patricia",
    role: "Hairstylist",
    quote:
      "I drink DDW+ daily and appreciate the transparency about its ppm level. It gives me confidence in my daily water choice.",
    image: "/images/Patricia.png",
  },
  {
    name: "Davne",
    role: "Entrepreneur",
    quote:
      "My schedule can be quite packed, and I'm often moving around. EasyMove Gel is helpful when I need quick comfort during the day.",
    image: "/images/Davne.png",
  },
  {
    name: "Poh Choo",
    role: "Retiree",
    quote:
      "As I've gotten older, walking sometimes feels uncomfortable. After applying EasyMove, it feels more eased and I can move more smoothly.",
    image: "/images/Poh-Choo.png",
  },
  {
    name: "Marcle",
    role: "KOL",
    quote:
      "I love to exercise, but after workouts, my muscles sometimes feel tight. EasyMove Gel provides a gentle warming comfort that I enjoy post-exercise.",
    image: "/images/Marcle.png",
  },
  {
    name: "Ee Ling",
    role: "Accountant",
    quote:
      "Long desk hours can feel stiff. EasyMove absorbs quickly, and help my muscle relax a lot.",
    image: "/images/Ee-Ling.png",
  },
];

// Replace these with your actual YouTube video IDs
const videos = [
  { id: "7nKO_qYNCjo", title: "video title" },
  { id: "F3VVmolvgOM", title: "video title" },
  { id: "7", title: "video title" },
];

const Testimonials = () => {
  const videoScrollRef = useRef<HTMLDivElement>(null);
  const testimonialScrollRef = useRef<HTMLDivElement>(null);
  const [activeVideo, setActiveVideo] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(1);
  const autoScrollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // ===== VIDEO LOGIC =====
  const scrollVideo = useCallback(
    (direction: "left" | "right") => {
      const container = videoScrollRef.current;
      if (!container) return;
      const card = container.firstElementChild as HTMLElement | null;
      if (!card) return;
      const cardWidth = card.offsetWidth + 24; // gap
      const next =
        direction === "left"
          ? Math.max(activeVideo - 1, 0)
          : Math.min(activeVideo + 1, videos.length - 1);
      container.scrollTo({ left: next * cardWidth, behavior: "smooth" });
      setActiveVideo(next);
    },
    [activeVideo]
  );

  useEffect(() => {
    const container = videoScrollRef.current;
    if (!container) return;
    const handleScroll = () => {
      const card = container.firstElementChild as HTMLElement | null;
      if (!card) return;
      const cardWidth = card.offsetWidth + 24;
      const idx = Math.round(container.scrollLeft / cardWidth);
      setActiveVideo(idx);
    };
    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  // Pause all videos when swiping to a different one
  useEffect(() => {
    const container = videoScrollRef.current;
    if (!container) return;
    const iframes = container.querySelectorAll("iframe");
    iframes.forEach((iframe) => {
      iframe.contentWindow?.postMessage(
        JSON.stringify({ event: "command", func: "pauseVideo", args: [] }),
        "*"
      );
    });
  }, [activeVideo]);

  // ===== TESTIMONIAL LOGIC =====

  // 1. Calculate how many cards are visible and handle the "max scroll" edge case
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
    
    // Calculate how many items fit in the current view
    const visibleItems = Math.round(containerWidth / singleItemWidth) || 1;
    
    // Calculate which item is currently first in view
    const firstVisibleIndex = Math.round(scrollLeft / singleItemWidth);
    
    let currentEndIndex = firstVisibleIndex + visibleItems;

    // Bulletproof check for the end of the scroll container
    if (Math.ceil(scrollLeft + containerWidth) >= scrollWidth - 10) {
      currentEndIndex = testimonials.length;
    }

    // Safely set the state
    setActiveTestimonial(Math.min(currentEndIndex, testimonials.length));
  }, []);

  // 2. Attach the scroll listener (and clean it up properly)
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

  // 3. Handle manual clicking of the < and > buttons
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

  // 4. Handle auto-scrolling
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
    <div className="w-full bg-white">
      {/* ===== HERO ===== */}
      <section className="w-full bg-gradient-to-r from-[#009FE3] to-[#0077B6] py-14 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white">
            What Our Users Say
          </h1>
          <p className="text-white/80 mt-4 text-sm md:text-base max-w-2xl mx-auto">
            Real stories from real people. Hear how DDW+ and EasyMove Gel fit
            into everyday life.
          </p>
        </div>
      </section>

      {/* ===== VIDEO CAROUSEL ===== */}
      <section className="max-w-6xl mx-auto px-6 py-14">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
          Video Testimonials
        </h2>

        <div className="relative">
          {/* Left arrow */}
          <button
            onClick={() => scrollVideo("left")}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition disabled:opacity-30"
            disabled={activeVideo === 0}
            aria-label="Previous video"
          >
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Scrollable video container */}
          <div
            ref={videoScrollRef}
            className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {videos.map((video, i) => (
              <div
                key={video.id}
                className="flex-shrink-0 w-full snap-center"
              >
                <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg bg-gray-900">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${video.id}?playsinline=1&rel=0&modestbranding=1&enablejsapi=1`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
                <p className="mt-3 text-sm font-medium text-gray-700 text-center">
                  {video.title}
                </p>
              </div>
            ))}
          </div>

          {/* Right arrow */}
          <button
            onClick={() => scrollVideo("right")}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition disabled:opacity-30"
            disabled={activeVideo === videos.length - 1}
            aria-label="Next video"
          >
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center gap-2 mt-4">
          {videos.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                const container = videoScrollRef.current;
                if (!container) return;
                const card = container.firstElementChild as HTMLElement | null;
                if (!card) return;
                const cardWidth = card.offsetWidth + 24;
                container.scrollTo({
                  left: i * cardWidth,
                  behavior: "smooth",
                });
                setActiveVideo(i);
              }}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                i === activeVideo
                  ? "bg-[#009FE3] scale-125"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to video ${i + 1}`}
            />
          ))}
        </div>

       
      </section>

      <div className="w-full h-px bg-gray-200" />

      {/* ===== WRITTEN TESTIMONIALS CAROUSEL ===== */}
      <section className="max-w-6xl mx-auto px-6 py-14">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-10">
          Stories from Our Community
        </h2>

        <div
          ref={testimonialScrollRef}
          className="flex overflow-x-auto gap-6 pb-4 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="min-w-[85vw] md:min-w-[380px] snap-center bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col"
            >
              {/* Avatar + Name */}
              <div className="flex items-center gap-4 mb-4">
                <div className="relative w-14 h-14 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                  <Image
                    src={t.image}
                    alt={t.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">{t.name}</p>
                  <p className="text-[#009FE3] text-xs">{t.role}</p>
                </div>
              </div>

              {/* Stars */}
              <div className="flex gap-0.5 mb-3">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-sm">
                    ★
                  </span>
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-600 text-sm leading-relaxed flex-1">
                &ldquo;{t.quote}&rdquo;
              </p>
            </div>
          ))}
          <div className="w-2 flex-shrink-0"></div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-6 mt-8">
          <button
            onClick={() => { scrollTestimonial("left"); resetAutoScroll(); }}
            className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-400 hover:text-[#009FE3] hover:border-[#009FE3] transition"
          >
            &lt;
          </button>
          <span className="text-sm font-medium text-[#009FE3]">
            {activeTestimonial} of {testimonials.length}
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
            Every story begins with a choice.
          </p>
          <p className="text-white/80 mt-2 text-sm md:text-base">
            Discover what DDW+ and EasyMove Gel can do for your daily routine.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;