"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from '@/app/LanguageContext'; // Import translation hook

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage(); // Initialize translation hook

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero section - fade in on load
      gsap.from(".about-hero-heading", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });
      gsap.from(".about-hero-sub", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: "power3.out",
      });
      gsap.from(".about-hero-text p", {
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        delay: 0.4,
        ease: "power3.out",
      });

      // Content cards - scroll triggered
      const cards = gsap.utils.toArray<HTMLElement>(".about-card");
      cards.forEach((card, i) => {
        const heading = card.querySelector(".about-card-heading");
        const texts = card.querySelectorAll(".about-card-text");
        const accent = card.querySelector(".about-card-accent");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            end: "top 40%",
            toggleActions: "play none none none",
          },
        });

        // Accent bar slides in
        if (accent) {
          tl.from(accent, {
            scaleX: 0,
            transformOrigin: "left center",
            duration: 0.5,
            ease: "power3.out",
          });
        }

        // Heading slides up
        if (heading) {
          tl.from(
            heading,
            {
              y: 30,
              opacity: 0,
              duration: 0.6,
              ease: "power3.out",
            },
            accent ? "-=0.3" : 0
          );
        }

        // Text paragraphs stagger in
        if (texts.length) {
          tl.from(
            texts,
            {
              y: 25,
              opacity: 0,
              duration: 0.5,
              stagger: 0.12,
              ease: "power2.out",
            },
            "-=0.3"
          );
        }
      });

      // Dividers animate width
      gsap.utils.toArray<HTMLElement>(".about-divider").forEach((div) => {
        gsap.from(div, {
          scaleX: 0,
          transformOrigin: "center center",
          duration: 0.6,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: div,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });

      // Bottom quote
      const quoteTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".about-quote",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
      quoteTl.from(".about-quote-line", {
        scaleX: 0,
        duration: 0.6,
        ease: "power3.out",
      });
      quoteTl.from(
        ".about-quote p",
        {
          y: 30,
          opacity: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power3.out",
        },
        "-=0.3"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full bg-white overflow-hidden">
      {/* ===== ABOUT DEUTRONIX ===== */}
      <section className="max-w-6xl mx-auto px-6 pt-12 pb-10">
        <h1 className="about-hero-heading text-3xl md:text-4xl font-extrabold text-[#009FE3] mb-2">
          {t('aboutPage.hero.title')}
        </h1>
        <p className="about-hero-sub text-gray-500 text-sm mb-6">
          {t('aboutPage.hero.subtitle')}
        </p>
        <div className="about-hero-text">
          <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-4">
            {t('aboutPage.hero.p1')}
          </p>
          <p className="text-sm md:text-base text-gray-600 leading-relaxed">
            {t('aboutPage.hero.p2')}
          </p>
        </div>
      </section>

      <div className="about-divider w-full h-2 bg-gray-100" />

      {/* ===== OUR APPROACH ===== */}
      <section className="about-card max-w-6xl mx-auto px-6 py-10">
        <div className="about-card-accent w-12 h-1 bg-[#009FE3] rounded mb-4" />
        <h2 className="about-card-heading text-3xl md:text-4xl font-extrabold text-[#009FE3] mb-4">
          {t('aboutPage.approach.title')}
        </h2>
        <p className="about-card-text text-sm md:text-base text-gray-600 leading-relaxed mb-1">
          {t('aboutPage.approach.p1')}
        </p>
        <p className="about-card-text text-sm md:text-base text-gray-600 leading-relaxed mb-4">
          {t('aboutPage.approach.p2')}
        </p>
        <p className="about-card-text text-sm md:text-base text-gray-600 leading-relaxed">
          {t('aboutPage.approach.p3')}
        </p>
      </section>

      <div className="about-divider w-full h-2 bg-gray-100" />

      {/* ===== SCIENCE & RESPONSIBILITY ===== */}
      <section className="about-card max-w-6xl mx-auto px-6 py-10">
        <div className="about-card-accent w-12 h-1 bg-[#009FE3] rounded mb-4" />
        <h2 className="about-card-heading text-3xl md:text-4xl font-extrabold text-[#009FE3] mb-4">
          {t('aboutPage.science.title')}
        </h2>
        <p className="about-card-text text-sm md:text-base text-gray-600 leading-relaxed mb-1">
          {t('aboutPage.science.p1')}
        </p>
        <p className="about-card-text text-sm md:text-base text-gray-600 leading-relaxed mb-4">
          {t('aboutPage.science.p2')}
        </p>
        <p className="about-card-text text-sm md:text-base text-gray-600 leading-relaxed">
          {t('aboutPage.science.p3')}
        </p>
      </section>

      <div className="about-divider w-full h-2 bg-gray-100" />

      {/* ===== QUALITY & STANDARDS ===== */}
      <section className="about-card max-w-6xl mx-auto px-6 py-10">
        <div className="about-card-accent w-12 h-1 bg-[#009FE3] rounded mb-4" />
        <h2 className="about-card-heading text-3xl md:text-4xl font-extrabold text-[#009FE3] mb-4">
          {t('aboutPage.quality.title')}
        </h2>
        <p className="about-card-text text-sm md:text-base text-gray-600 leading-relaxed mb-4">
          {t('aboutPage.quality.p1')}
        </p>
        <p className="about-card-text text-sm md:text-base text-gray-600 leading-relaxed">
          {t('aboutPage.quality.p2')}
        </p>
      </section>

      {/* ===== BOTTOM QUOTE ===== */}
      <section className="about-quote w-full bg-gray-100 py-12 mt-6">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="about-quote-line w-16 h-1 bg-[#009FE3] rounded mx-auto mb-6" />
          <p className="text-lg md:text-xl font-bold text-gray-900 leading-snug">
            {t('aboutPage.quote.line1')}
          </p>
          <p className="text-lg md:text-xl font-bold text-gray-900 leading-snug">
            {t('aboutPage.quote.line2')}
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;