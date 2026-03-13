"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const DDWPlus = () => {
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Hero Section Entrance (Plays immediately on load)
      gsap.fromTo(
        ".hero-element",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
        }
      );

      // 2. Existing Banner Overlays (Who is DDW+ Suitable For)
      gsap.utils.toArray<HTMLElement>(".ddwplus-banner-overlay").forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: i * 0.15, // Optional: you can remove the delay if you want them to trigger exactly when they enter the viewport
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // 3. Reusable Fade Up Elements (Product images, section titles)
      gsap.utils.toArray<HTMLElement>(".fade-up").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // 4. Directional Slides (Left/Right elements)
      gsap.utils.toArray<HTMLElement>(".slide-in-left").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, x: -50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>(".slide-in-right").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, x: 50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, bannerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full bg-white overflow-hidden" ref={bannerRef}>
      {/* ===== HERO BANNER ===== */}
      <section className="w-full bg-gray-100 py-10 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="hero-element text-3xl md:text-5xl font-extrabold text-[#009FE3] leading-tight">
            Precision for Every Need.
          </h1>
          <p className="hero-element text-gray-700 text-sm md:text-base mt-4 leading-relaxed">
            Two precision applications of Deuterium-Depleted Water, engineered
            with clearly defined deuterium levels to support the body from within
            and from without. Each formulation is optimized for its specific
            purpose. Measured, intentional, and uncompromised.
          </p>
        </div>
      </section>

      {/* ===== PRODUCT SHOWCASE ===== */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex justify-center">
          <div className="relative fade-up">
            <Image
              src="/images/ddwplus/01.png"
              alt="DDW+ Product Range"
              width={600}
              height={400}
              className="object-contain w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* ===== DESIGNED FOR DAILY HYDRATION ===== */}
      <section className="max-w-6xl mx-auto px-6 pb-12 fade-up">
        <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-3">
          Designed for Daily Hydration with Purpose
        </h2>
        <p className="text-sm md:text-base text-gray-600 leading-relaxed">
          DDW+ is formulated with a naturally reduced deuterium level of 132–138
          ppm, making it suitable for long-term, daily consumption. This specific
          ppm range is intentionally chosen to balance effectiveness, safety, and
          consistency — supporting everyday wellness without overstimulation.
        </p>
      </section>

      {/* ===== DIVIDER ===== */}
      <div className="w-full h-px bg-gray-200 fade-up" />

      {/* ===== WHO IS DDW+ SUITABLE FOR? ===== */}
      <section className="max-w-6xl mx-auto px-6 py-14">
        <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-8 md:mb-10 fade-up">
          Who Is DDW+ Suitable For?
        </h2>

        <div className="flex flex-col gap-0">
          {/* --- Athletes --- */}
          <div className="relative w-full overflow-hidden rounded-t-xl">
            <Image
              src="/images/ddwplus/02.png"
              alt="Athletes"
              width={1200}
              height={400}
              className="w-full h-[110px] md:h-auto object-cover object-right"
            />
            <div className="absolute inset-0 flex flex-col justify-center px-4 md:px-12 max-w-[60%] md:max-w-md ddwplus-banner-overlay">
              <h3 className="text-xs md:text-2xl font-bold text-white mb-0 md:mb-2">
                Athletes
              </h3>
              <p className="text-white/80 text-[7px] md:text-xs font-semibold mb-0 md:mb-1">Why?</p>
              <p className="text-white/90 text-[8px] md:text-sm leading-tight md:leading-relaxed">
                Training and competition put stress on the body. DDW+ helps
                optimize cellular energy and reduce oxidative stress, promoting
                faster recovery and enhanced performance.
              </p>
            </div>
          </div>

          {/* --- Working Professionals --- */}
          <div className="relative w-full overflow-hidden">
            <Image
              src="/images/ddwplus/03.png"
              alt="Working Professionals"
              width={1200}
              height={400}
              className="w-full h-[110px] md:h-auto object-cover object-left"
            />
            <div className="absolute inset-0 flex flex-col justify-center items-end px-4 md:px-12 text-right max-w-[60%] md:max-w-md ml-auto ddwplus-banner-overlay">
              <h3 className="text-xs md:text-2xl font-bold text-white mb-0 md:mb-2">
                Working Professionals
              </h3>
              <p className="text-white/80 text-[7px] md:text-xs font-semibold mb-0 md:mb-1">Why?</p>
              <p className="text-white/90 text-[8px] md:text-sm leading-tight md:leading-relaxed">
                Mental fatigue and stress are common in busy lifestyles. DDW+
                enhances brain clarity, energy, and stress resilience.
              </p>
            </div>
          </div>

          {/* --- Chronic Condition Management --- */}
          <div className="relative w-full overflow-hidden">
            <Image
              src="/images/ddwplus/04.png"
              alt="Chronic Condition Management"
              width={1200}
              height={400}
              className="w-full h-[110px] md:h-auto object-cover object-[55%_center] md:object-right"
            />
            <div className="absolute inset-0 flex flex-col justify-center px-4 md:px-12 max-w-[60%] md:max-w-md ddwplus-banner-overlay">
              <h3 className="text-xs md:text-2xl font-bold text-gray-900 mb-0">
                Chronic Condition
              </h3>
              <h3 className="text-xs md:text-2xl font-bold text-gray-900 mb-0.5 md:mb-3">
                Management Population
              </h3>
              <p className="text-gray-500 text-[7px] md:text-xs font-semibold mb-0 md:mb-1">Why?</p>
              <p className="text-gray-600 text-[8px] md:text-sm leading-tight md:leading-relaxed">
                Those with metabolic or fatigue-related conditions benefit from
                DDW+&apos;s support for cell function, mitochondrial health,
                and overall vitality.
              </p>
            </div>
          </div>

          {/* --- Health Seekers --- */}
          <div className="relative w-full overflow-hidden">
            <Image
              src="/images/ddwplus/05.png"
              alt="Health Seekers"
              width={1200}
              height={400}
              className="w-full h-[110px] md:h-auto object-cover object-left"
            />
            <div className="absolute inset-0 flex flex-col justify-end items-end px-4 md:px-12 pb-2 md:pb-10 text-right max-w-[60%] md:max-w-md ml-auto ddwplus-banner-overlay">
              <h3 className="text-xs md:text-2xl font-bold text-black mb-0 md:mb-2">
                Health Seekers
              </h3>
              <p className="text-black/80 text-[7px] md:text-xs font-semibold mb-0 md:mb-1">Why?</p>
              <p className="text-black/90 text-[8px] md:text-sm leading-tight md:leading-relaxed">
                Health-conscious individuals seek clean, effective ways to
                maintain vitality. DDW+ supports detox, immunity, and balanced
                metabolism naturally.
              </p>
            </div>
          </div>

          {/* --- Aging & Elderly --- */}
          <div className="relative w-full overflow-hidden rounded-b-xl">
            <Image
              src="/images/ddwplus/06.png"
              alt="Aging & Elderly"
              width={1200}
              height={400}
              className="w-full h-[110px] md:h-auto object-cover object-[75%_center] md:object-right"
            />
            <div className="absolute inset-0 flex flex-col justify-end px-4 md:px-12 pb-2 md:pb-10 max-w-[60%] md:max-w-md ddwplus-banner-overlay">
              <h3 className="text-xs md:text-2xl font-bold text-white mb-0">
                Aging &amp; Elderly
              </h3>
              <p className="text-white/80 text-[7px] md:text-xs font-semibold mb-0 md:mb-1">Why?</p>
              <p className="text-white/90 text-[8px] md:text-sm leading-tight md:leading-relaxed">
                Aging involves a natural decline in cell energy and repair. DDW+
                helps slow down aging, protect DNA, and maintain energy for
                active aging.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== WHY 132-138 PPM MATTERS ===== */}
      <section className="max-w-6xl mx-auto px-6 py-14 overflow-hidden">
        <div className="md:grid md:grid-cols-2 gap-4 md:gap-6 items-center">
          {/* Left: heading+logo inline on mobile, heading+text on desktop */}
          <div className="w-full">
            <div className="flex flex-row items-center mb-4 md:block">
              <h2 className="text-2xl font-bold text-gray-900 mr-3 mb-0 md:text-4xl md:mb-6">
                Why 132–138 ppm Matters
              </h2>
              <span className="flex-shrink-0 md:hidden">
                <Image
                  src="/images/ddwplus/132.png"
                  alt="132-138 PPM"
                  width={300}
                  height={300}
                  className="object-contain w-16 h-16"
                />
              </span>
            </div>
            <div>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-4">
                Not all deuterium-depleted water products clearly disclose their
                deuterium concentration on the bottle label.
              </p>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-4">
                At Deutronix, we openly state 132–138 ppm because precision and
                transparency are part of our product philosophy. This range
                reflects a naturally low and stable deuterium level, carefully
                monitored to ensure consistency and suitability for daily
                hydration.
              </p>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                Declaring the ppm is not a requirement — it is a deliberate
                choice. A choice to communicate clearly, measure accurately, and
                allow consumers to understand exactly what they are drinking.
              </p>
            </div>
          </div>
          {/* Right: logo only on desktop, hidden on mobile */}
          <div className="hidden md:flex justify-end items-center">
            <Image
              src="/images/ddwplus/132.png"
              alt="132-138 PPM"
              width={300}
              height={300}
              className="object-contain w-[300px] h-[300px]"
            />
          </div>
        </div>
      </section>

      {/* ===== BOTTOM CTA ===== */}
      <section className="max-w-6xl mx-auto px-6 py-14 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="flex justify-center slide-in-left">
            <Image
              src="/images/ddwplus/07.png"
              alt="DDW+ Bottle"
              width={380}
              height={600}
              className="object-contain"
            />
          </div>
          <div className="slide-in-right">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-700 leading-snug">
              DDW+ is not designed
              <br />
              for short-term intervention.
              <br />
              It is designed for everyday hydration
              <br />
              refined by science and nature.
            </h2>
            
          </div>
        </div>
      </section>
    </div>
  );
};

export default DDWPlus;