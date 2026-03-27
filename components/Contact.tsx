"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from '@/app/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  // ========================================================================
  // BULLETPROOF TRANSLATION HELPER
  // Automatically falls back to English if Next.js caches the JSON file
  // ========================================================================
  const safeT = (key: string, fallback: string) => {
    const val = t(key);
    if (!val || (typeof val === 'string' && val.includes('contactPage'))) {
      return fallback;
    }
    return val as string;
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header - fade in on load
      gsap.from(".ct-heading", {
        y: 40, opacity: 0, duration: 0.8, ease: "power3.out",
      });
      gsap.from(".ct-subheading", {
        y: 30, opacity: 0, duration: 0.8, delay: 0.15, ease: "power3.out",
      });

      // Contact items - stagger from left
      gsap.from(".ct-item", {
        x: -40, opacity: 0, duration: 0.6, stagger: 0.15, ease: "power3.out",
        scrollTrigger: { trigger: ".ct-items", start: "top 85%", toggleActions: "play none none none" },
      });

      // Address - fade up
      gsap.from(".ct-address", {
        y: 30, opacity: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: ".ct-address", start: "top 85%", toggleActions: "play none none none" },
      });

      // Map - scale reveal
      gsap.from(".ct-map", {
        scale: 0.95, opacity: 0, duration: 1, ease: "power2.out",
        scrollTrigger: { trigger: ".ct-map", start: "top 85%", toggleActions: "play none none none" },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full bg-white">
      {/* ===== HEADER ===== */}
      <section className="max-w-6xl mx-auto px-6 pt-12 pb-6">
        <h1 className="ct-heading text-3xl md:text-4xl font-extrabold text-[#009FE3] mb-2">
          {safeT('contactPage.hero.title', 'Contact Us')}
        </h1>
        <p className="ct-subheading text-sm md:text-base text-gray-600 leading-relaxed">
          {safeT('contactPage.hero.subtitle', 'If you have questions about our products, science, or standards, our team will be happy to assist.')}
        </p>
      </section>

      <div className="w-full h-px bg-gray-200" />

      {/* ===== CONTACT INFO ===== */}
      <section className="ct-items max-w-6xl mx-auto px-6 py-10 space-y-10">
        {/* Customer Hotline */}
        <div className="ct-item flex items-start gap-5">
          <div className="w-14 h-14 rounded-full border-2 border-[#009FE3] flex items-center justify-center flex-shrink-0">
            <svg className="w-7 h-7 text-[#009FE3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
          <div>
            <p className="font-bold text-gray-900">
              {safeT('contactPage.info.hotlineTitle', 'Customer Hotline')}
            </p>
            <p className="text-gray-600 text-sm">+6010 285 0516</p>
            <p className="text-gray-500 text-sm">
              {safeT('contactPage.info.hotlineHours', '(Monday to Saturday 09:00 - 18:00)')}
            </p>
          </div>
        </div>

        {/* Customer Service Email */}
        <div className="ct-item flex items-start gap-5">
          <div className="w-14 h-14 rounded-full border-2 border-[#009FE3] flex items-center justify-center flex-shrink-0">
            <svg className="w-7 h-7 text-[#009FE3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <p className="font-bold text-gray-900">
              {safeT('contactPage.info.emailTitle', 'Customer Service Email')}
            </p>
            <p className="text-gray-600 text-sm">deutronix.my@gmail.com</p>
          </div>
        </div>

        {/* Facebook */}
        <div className="ct-item flex items-start gap-5">
          <div className="w-14 h-14 rounded-full border-2 border-[#009FE3] flex items-center justify-center flex-shrink-0">
            <svg className="w-7 h-7 text-[#009FE3]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </div>
          <div>
            <p className="font-bold text-gray-900">
              {safeT('contactPage.info.facebookTitle', 'Facebook')}
            </p>
            <p className="text-gray-600 text-sm">facebook.com/deutronix.my</p>
          </div>
        </div>

        {/* Instagram */}
        <div className="ct-item flex items-start gap-5">
          <div className="w-14 h-14 rounded-full border-2 border-[#009FE3] flex items-center justify-center flex-shrink-0">
            <svg className="w-7 h-7 text-[#009FE3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <rect x="2" y="2" width="20" height="20" rx="5" strokeWidth={2} />
              <circle cx="12" cy="12" r="5" strokeWidth={2} />
              <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
            </svg>
          </div>
          <div>
            <p className="font-bold text-gray-900">
              {safeT('contactPage.info.instagramTitle', 'Instagram')}
            </p>
            <p className="text-gray-600 text-sm">instagram.com/deutronix.my</p>
          </div>
        </div>
      </section>

      {/* ===== ADDRESS & MAP ===== */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div className="ct-address mb-4">
          <p className="font-bold text-gray-900 text-sm">DEUTRONIX SDN BHD</p>
          <p className="text-gray-600 text-sm">
            No. 1-2-8, Kenari Avenue, Tingkat Kenari 5, 11900 Bayan Lepas, Pulau
            Pinang, Malaysia.
          </p>
        </div>
        <div className="ct-map w-full rounded-xl overflow-hidden shadow-md">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3972.338575002013!2d100.26767421476566!3d5.292994996053351!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x304ac06b00000001%3A0x6b802eb74f36c559!2sDeutronix%20Sdn%20Bhd!5e0!3m2!1sen!2smy!4v1655555555555!5m2!1sen!2smy"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Deutronix Sdn Bhd Location"
          />
        </div>
      </section>
    </div>
  );
};

export default Contact;