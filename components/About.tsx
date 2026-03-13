"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);

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
          About Deutronix
        </h1>
        <p className="about-hero-sub text-gray-500 text-sm mb-6">
          Precision Wellness, Guided by Science
        </p>
        <div className="about-hero-text">
          <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-4">
            Deutronix is a wellness-focused company dedicated to the research,
            development, and responsible application of Deuterium-Depleted Water
            (DDW).
          </p>
          <p className="text-sm md:text-base text-gray-600 leading-relaxed">
            We apply DDW science with precision — creating purpose-built
            formulations designed to support everyday hydration and targeted
            mobility needs.
          </p>
        </div>
      </section>

      <div className="about-divider w-full h-2 bg-gray-100" />

      {/* ===== OUR APPROACH ===== */}
      <section className="about-card max-w-6xl mx-auto px-6 py-10">
        <div className="about-card-accent w-12 h-1 bg-[#009FE3] rounded mb-4" />
        <h2 className="about-card-heading text-3xl md:text-4xl font-extrabold text-[#009FE3] mb-4">
          Our Approach
        </h2>
        <p className="about-card-text text-sm md:text-base text-gray-600 leading-relaxed mb-1">
          Deutronix is built on a single scientific platform, applied
          thoughtfully across different wellness applications.
        </p>
        <p className="about-card-text text-sm md:text-base text-gray-600 leading-relaxed mb-4">
          Each product is developed with clearly defined intent, measured
          parameters, and transparent communication.
        </p>
        <p className="about-card-text text-sm md:text-base text-gray-600 leading-relaxed">
          We believe precision matters more than exaggeration.
        </p>
      </section>

      <div className="about-divider w-full h-2 bg-gray-100" />

      {/* ===== SCIENCE & RESPONSIBILITY ===== */}
      <section className="about-card max-w-6xl mx-auto px-6 py-10">
        <div className="about-card-accent w-12 h-1 bg-[#009FE3] rounded mb-4" />
        <h2 className="about-card-heading text-3xl md:text-4xl font-extrabold text-[#009FE3] mb-4">
          Science &amp; Responsibility
        </h2>
        <p className="about-card-text text-sm md:text-base text-gray-600 leading-relaxed mb-1">
          Our work is guided by an international scientific advisory team
          spanning nutrition, biomedical science, and water research.
        </p>
        <p className="about-card-text text-sm md:text-base text-gray-600 leading-relaxed mb-4">
          We reference established research, maintain responsible boundaries,
          and avoid overstated claims.
        </p>
        <p className="about-card-text text-sm md:text-base text-gray-600 leading-relaxed">
          Education comes before promotion. Responsibility comes before trends.
        </p>
      </section>

      <div className="about-divider w-full h-2 bg-gray-100" />

      {/* ===== QUALITY & STANDARDS ===== */}
      <section className="about-card max-w-6xl mx-auto px-6 py-10">
        <div className="about-card-accent w-12 h-1 bg-[#009FE3] rounded mb-4" />
        <h2 className="about-card-heading text-3xl md:text-4xl font-extrabold text-[#009FE3] mb-4">
          Quality &amp; Standards
        </h2>
        <p className="about-card-text text-sm md:text-base text-gray-600 leading-relaxed mb-4">
          Our DDW is naturally sourced from pristine glacial regions and produced
          under strict quality, hygiene, and safety standards, aligned with
          internationally recognised systems and local regulatory requirements.
        </p>
        <p className="about-card-text text-sm md:text-base text-gray-600 leading-relaxed">
          Consistency, traceability, and verification are central to how we
          operate.
        </p>
      </section>

      {/* ===== BOTTOM QUOTE ===== */}
      <section className="about-quote w-full bg-gray-100 py-12 mt-6">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="about-quote-line w-16 h-1 bg-[#009FE3] rounded mx-auto mb-6" />
          <p className="text-lg md:text-xl font-bold text-gray-900 leading-snug">
            Deutronix is built for the long term
          </p>
          <p className="text-lg md:text-xl font-bold text-gray-900 leading-snug">
            where science, precision, and trust come together.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;