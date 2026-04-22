"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from '@/app/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const Source = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  // --- BULLETPROOF HELPER FOR LISTS (Same as Science Page) ---
  const getList = (baseKey: string, count: number) => {
    const list = [];
    for (let i = 0; i < count; i++) {
      const item = t(`${baseKey}.${i}`) as string;
      // Make sure it doesn't push empty strings or raw keys
      if (item && !item.includes('sourcePage')) {
        list.push(item);
      }
    }
    return list;
  };

  const certList = getList('sourcePage.cert.list', 6);
  const commitList = getList('sourcePage.commit.list', 3);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero - cascade on load
      gsap.from(".src-hero-title", {
        y: 40, opacity: 0, duration: 0.8, ease: "power3.out",
      });
      gsap.from(".src-hero-sub", {
        y: 30, opacity: 0, duration: 0.8, delay: 0.15, ease: "power3.out",
      });
      gsap.from(".src-hero-stars span", {
        scale: 0, opacity: 0, duration: 0.4, stagger: 0.1, delay: 0.3, ease: "back.out(2)",
      });
      gsap.from(".src-hero-text", {
        y: 20, opacity: 0, duration: 0.7, stagger: 0.15, delay: 0.5, ease: "power3.out",
      });

      // Water source banner - clip reveal
      gsap.from(".src-water-banner", {
        scaleX: 0.8, opacity: 0, duration: 1, ease: "power2.out",
        scrollTrigger: { trigger: ".src-water-banner", start: "top 85%", toggleActions: "play none none none" },
      });
      gsap.from(".src-water-title", {
        y: 30, opacity: 0, duration: 0.8, delay: 0.2, ease: "power3.out",
        scrollTrigger: { trigger: ".src-water-banner", start: "top 85%", toggleActions: "play none none none" },
      });

      // Water source text - stagger paragraphs
      gsap.from(".src-water-text p", {
        y: 30, opacity: 0, duration: 0.7, stagger: 0.2, ease: "power3.out",
        scrollTrigger: { trigger: ".src-water-text", start: "top 80%", toggleActions: "play none none none" },
      });

      // Cert logos - pop in with stagger
      gsap.from(".src-cert-item", {
        scale: 0.5, opacity: 0, duration: 0.5, stagger: 0.1, ease: "back.out(1.5)",
        scrollTrigger: { trigger: ".src-certs", start: "top 80%", toggleActions: "play none none none" },
      });

      // Certifications & Compliance - heading + content
      gsap.from(".src-compliance-heading", {
        x: -40, opacity: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: ".src-compliance", start: "top 80%", toggleActions: "play none none none" },
      });
      gsap.from(".src-compliance-text", {
        y: 20, opacity: 0, duration: 0.6, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: ".src-compliance", start: "top 75%", toggleActions: "play none none none" },
      });

      // Product-specific - text from left, image from right
      gsap.from(".src-product-text", {
        x: -50, opacity: 0, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: ".src-product", start: "top 80%", toggleActions: "play none none none" },
      });
      gsap.from(".src-product-image", {
        x: 50, opacity: 0, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: ".src-product", start: "top 80%", toggleActions: "play none none none" },
      });

      // Our Commitment - heading + list items stagger
      gsap.from(".src-commit-heading", {
        x: -40, opacity: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: ".src-commit", start: "top 80%", toggleActions: "play none none none" },
      });
      gsap.from(".src-commit-item", {
        x: -30, opacity: 0, duration: 0.5, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: ".src-commit", start: "top 75%", toggleActions: "play none none none" },
      });

      // Bottom quote - dramatic reveal
      gsap.from(".src-quote-line", {
        y: 40, opacity: 0, duration: 0.9, stagger: 0.25, ease: "power3.out",
        scrollTrigger: { trigger: ".src-quote", start: "top 85%", toggleActions: "play none none none" },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full bg-white">
      {/* ===== MOBILE TITLE ===== */}
      <div className="block md:hidden px-6 py-4 text-center src-hero-title">
        <h1 className="text-3xl font-extrabold text-[#009FE3] leading-tight">
          {t('sourcePage.hero.title')}
        </h1>
      </div>

      {/* ===== HERO BANNER ===== */}
      <section className="relative w-full h-auto md:h-[480px] overflow-hidden">
        <Image
          src="/images/source/01.png"
          alt="Source & Standards"
          fill
          className="object-cover hidden md:block"
        />
        <Image
          src="/images/source/01.png"
          alt="Source & Standards"
          width={800}
          height={600}
          className="w-full h-auto block md:hidden"
        />
        <div className="absolute inset-0 bg-black/40 md:bg-gradient-to-r md:from-black/50 md:to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center md:text-center px-14 md:px-16 max-w-3xl mx-auto">
          <h1 className="src-hero-title hidden md:block text-5xl font-extrabold text-white leading-tight">
            {t('sourcePage.hero.title')}
          </h1>
          <p className="src-hero-sub text-white font-semibold text-xs md:text-lg mt-1 md:mt-2">
            {t('sourcePage.hero.subtitle')}
          </p>
          <div className="src-hero-stars flex gap-1 mt-2 md:mt-4 justify-center">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-yellow-400 text-xl md:text-4xl">
                ★
              </span>
            ))}
          </div>
          <p className="src-hero-text text-white/90 text-[10px] md:text-base mt-2 md:mt-4 leading-relaxed text-justify">
            {t('sourcePage.hero.p1')}
          </p>
          <p className="src-hero-text text-white/90 text-[10px] md:text-base mt-1 md:mt-3 leading-relaxed text-justify">
            {t('sourcePage.hero.p2')}
          </p>
        </div>
      </section>

      {/* ===== OUR WATER SOURCE BANNER ===== */}
      <section className="src-water-banner relative w-full h-[80px] md:h-[160px] overflow-hidden mt-10">
        <Image
          src="/images/source/02.png"
          alt="Our Water Source"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex items-center justify-center px-6 md:px-16">
          <h2 className="src-water-title text-2xl md:text-6xl font-bold text-white">
            {t('sourcePage.water.title')}
          </h2>
        </div>
      </section>

      {/* ===== WATER SOURCE TEXT ===== */}
      <section className="src-water-text max-w-6xl mx-auto px-6 py-12">
        <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-4">
          {t('sourcePage.water.p1')}
        </p>
        <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-4">
          {t('sourcePage.water.p2')}
        </p>
        <p className="text-sm md:text-base text-gray-600 leading-relaxed">
          {t('sourcePage.water.p3')}
          <br />
          {t('sourcePage.water.p4')}
        </p>
      </section>

      {/* ===== CERTIFICATION LOGOS ===== */}
      <section className="src-certs max-w-6xl mx-auto px-6 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-8">
          {[
            { src: "/images/ISO.png", alt: "ISO 22000", cols: "" },
            { src: "/images/FDA.png", alt: "FDA Registered", cols: "" },
            { src: "/images/HACCP.png", alt: "HACCP", cols: "" },
            { src: "/images/Halal.png", alt: "Halal", cols: "" },
            { src: "/images/GMPC.png", alt: "GMPC Intertek", cols: "" },
            { src: "/images/Interlek.png", alt: "ISO 22716 Intertek", cols: "" },
            { src: "/images/NOT.png", alt: "Notification Note", cols: "col-span-2 md:col-span-2" },
          ].map((cert, index) => (
            <div key={index} className={`src-cert-item flex flex-col items-center justify-start ${cert.cols}`}>
              <div className="relative w-full h-24 md:h-32">
                <Image src={cert.src} alt={cert.alt} fill sizes="(max-width: 768px) 100px, 120px" className="object-contain" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== CERTIFICATIONS & COMPLIANCE ===== */}
      <section className="src-compliance max-w-6xl mx-auto px-6 py-10">
        <h2 className="src-compliance-heading text-xl md:text-2xl font-bold text-gray-900 mb-4">
          {t('sourcePage.cert.title')}
        </h2>
        <p className="src-compliance-text text-sm md:text-base text-gray-600 leading-relaxed mb-4">
          {t('sourcePage.cert.p1')}
        </p>
        
        {certList.length > 0 && (
          <ul className="src-compliance-text text-sm md:text-base text-gray-600 leading-relaxed list-disc list-inside space-y-1 mb-4">
            {certList.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        )}
        
        <p className="src-compliance-text text-sm md:text-base text-gray-600 leading-relaxed mb-4">
          {t('sourcePage.cert.p2')}
        </p>
        <p className="src-compliance-text text-sm md:text-base text-gray-600 leading-relaxed">
          {t('sourcePage.cert.p3')}
        </p>
      </section>

      {/* ===== PRODUCT-SPECIFIC COMPLIANCE ===== */}
      <section className="src-product max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="src-product-text">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
              {t('sourcePage.product.title')}
            </h2>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-4">
              {t('sourcePage.product.p1')}
            </p>
            <p className="text-sm md:text-base text-gray-900 font-semibold mb-1">
              {t('sourcePage.product.ddwTitle')}
            </p>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-4">
              {t('sourcePage.product.ddwP')}
            </p>
            <p className="text-sm md:text-base text-gray-900 font-semibold mb-1">
              {t('sourcePage.product.gelTitle')}
            </p>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-4">
              {t('sourcePage.product.gelP')}
            </p>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              {t('sourcePage.product.p2')}
            </p>
          </div>
          <div className="src-product-image flex justify-start md:justify-center">
            <Image
              src="/images/source/03.png"
              alt="DDW+ and EasyMove Gel Products"
              // CHANGED: Bumped up intrinsic resolution to keep it sharp on PC
              width={1000}
              height={1000}
              // CHANGED: Added w-full, h-auto, and max-w classes to scale up on desktop
              className="object-contain w-full h-auto max-w-[400px] md:max-w-xl lg:max-w-2xl -ml-6 md:ml-0"
            />
          </div>
        </div>
      </section>

      {/* ===== OUR COMMITMENT ===== */}
      <section className="src-commit max-w-6xl mx-auto px-6 py-10">
        <h2 className="src-commit-heading text-xl md:text-2xl font-bold text-gray-900 mb-4">
          {t('sourcePage.commit.title')}
        </h2>
        <p className="src-commit-item text-sm md:text-base text-gray-600 leading-relaxed mb-4">
          {t('sourcePage.commit.p1')}
        </p>

        {commitList.length > 0 && (
          <ul className="text-sm md:text-base text-gray-600 leading-relaxed list-disc list-inside space-y-1 mb-4">
            {commitList.map((item, index) => (
              <li key={index} className="src-commit-item">{item}</li>
            ))}
          </ul>
        )}

        <p className="src-commit-item text-sm md:text-base text-gray-600 leading-relaxed mb-1">
          {t('sourcePage.commit.p2')}
        </p>
        <p className="src-commit-item text-sm md:text-base text-gray-600 leading-relaxed">
          {t('sourcePage.commit.p3')}
        </p>
      </section>

      {/* ===== BOTTOM QUOTE ===== */}
      <section className="src-quote max-w-6xl mx-auto px-6 py-16 text-center">
        <h2 className="src-quote-line text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-snug">
          {t('sourcePage.quote.line1')}
        </h2>
        <p className="src-quote-line text-xl md:text-2xl lg:text-3xl text-gray-900 font-bold mt-2 md:mt-3 leading-snug">
          {t('sourcePage.quote.line2')}
        </p>
      </section>
    </div>
  );
};

export default Source;