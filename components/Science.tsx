"use client";

import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/app/LanguageContext';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const Science = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  // Base english advisors as a fallback and to store image paths securely
  const baseAdvisors = [
    {
      name: "Professor Cong Feng Song",
      title: "Professor | Functional Nutrition",
      description: "Expert in functional nutrition and long-term wellness research, with a focus on metabolic health and low-deuterium science education.",
      image: "/images/Cong.png",
    },
    {
      name: "Professor Wang Fei Teng",
      title: "Professor | Glaciology & Cryosphere Science",
      description: "Research specialist in glacial systems and cryosphere science, contributing expertise on natural low-deuterium water formation and high-altitude water sources.",
      image: "/images/Wang.png",
    },
    {
      name: "Guo De Yong",
      title: "DDW Resource Specialist",
      description: "Specialist in natural deuterium-depleted water resources and sustainable development of low-deuterium water sources.",
      image: "/images/Guo.png",
    },
    {
      name: "Doctor Li Hui Lin",
      title: "Doctor | Cryosphere & DDW Research",
      description: "Researcher in cryosphere science and low-deuterium water studies, contributing international academic perspectives on water science.",
      image: "/images/Li.png",
    },
  ];

  // --- BULLETPROOF ADVISOR MAPPING ---
  // We fetch each string individually so the t() function doesn't choke on arrays
  const localizedAdvisors = baseAdvisors.map((baseAdv, index) => {
    const tName = t(`sciencePage.advisory.advisors.${index}.name`) as string;
    const tTitle = t(`sciencePage.advisory.advisors.${index}.title`) as string;
    const tDesc = t(`sciencePage.advisory.advisors.${index}.description`) as string;

    // If t() returns the raw key (meaning it failed), we use the English base fallback
    return {
      ...baseAdv,
      name: tName && !tName.includes('sciencePage') ? tName : baseAdv.name,
      title: tTitle && !tTitle.includes('sciencePage') ? tTitle : baseAdv.title,
      description: tDesc && !tDesc.includes('sciencePage') ? tDesc : baseAdv.description,
    };
  });

  // --- BULLETPROOF HELPER FOR LISTS ---
  const getList = (baseKey: string, count: number) => {
    const list = [];
    for (let i = 0; i < count; i++) {
      const item = t(`${baseKey}.${i}`) as string;
      if (item && !item.includes('sciencePage')) {
        list.push(item);
      }
    }
    return list;
  };

  const whyMatterList = getList('sciencePage.whyMatter.list', 3);
  const precisionList = getList('sciencePage.precision.list', 4);
  const sourceList = getList('sciencePage.source.list', 3);

  useGSAP(() => {
    // Fade-in + slide-up for text sections
    const sections = gsap.utils.toArray('.sci-reveal');
    sections.forEach((section: any) => {
      gsap.fromTo(
        section,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    // Full-width images / bg sections - scale up reveal
    const images = gsap.utils.toArray('.sci-image-reveal');
    images.forEach((img: any) => {
      gsap.fromTo(
        img,
        { scale: 0.95, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: img,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    // Parallax on background image sections
    const bgSections = gsap.utils.toArray('.sci-bg-parallax');
    bgSections.forEach((bg: any) => {
      gsap.fromTo(
        bg,
        { backgroundPositionY: '30%' },
        {
          backgroundPositionY: '70%',
          ease: 'none',
          scrollTrigger: {
            trigger: bg,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        }
      );
    });

    // Advisory board cards - staggered entrance
    const cards = gsap.utils.toArray('.advisor-card');
    gsap.fromTo(
      cards,
      { x: -40, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.advisor-list',
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Bottom quote text reveal
    const quote = document.querySelector('.sci-quote');
    if (quote) {
      gsap.fromTo(
        quote,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: quote,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }
  }, { scope: pageRef });

  return (
    <div ref={pageRef} className="w-full flex flex-col font-sans text-gray-700 bg-white">

      {/* ===== TITLE ===== */}
      <section className="w-full max-w-4xl mx-auto px-6 pt-12 pb-6">
        <h1 className="text-4xl md:text-6xl font-extrabold text-[#009FE3] leading-tight">
          {t('sciencePage.hero.title')}
        </h1>
        <p className="text-lg md:text-2xl font-bold text-gray-800 mt-1">
          {t('sciencePage.hero.subtitle')}
        </p>
      </section>

      {/* ===== What is Deuterium? ===== */}
      <section className="w-full max-w-4xl mx-auto px-6 py-8">
        <div className="sci-reveal">
          <h2 className="text-xl md:text-xl text-gray-600 mb-3">{t('sciencePage.whatIsDeuterium.title')}</h2>
          <p className="text-base text-gray-600 leading-relaxed mb-2">
            {t('sciencePage.whatIsDeuterium.p1')}
          </p>
          <p className="text-base text-gray-600 leading-relaxed">
            {t('sciencePage.whatIsDeuterium.p2')}
          </p>
        </div>
      </section>

      {/* ===== Image 01 ===== */}
      <div className="sci-image-reveal w-full max-w-3xl mx-auto px-6 py-6">
        <Image
          src="/images/01.png"
          alt="Deuterium and H2O"
          width={700}
          height={350}
          className="object-contain w-full h-auto"
        />
      </div>

      {/* ===== What is DDW? ===== */}
      <section className="w-full bg-gray-50 py-10 px-6">
        <div className="sci-reveal max-w-4xl mx-auto">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-3">{t('sciencePage.whatIsDDW.title')}</h2>
          <p className="text-base text-gray-600 leading-relaxed mb-3">
            {t('sciencePage.whatIsDDW.p1')}
          </p>
          <p className="text-base text-gray-600 leading-relaxed mb-3">
            {t('sciencePage.whatIsDDW.p2')}
          </p>
          <p className="text-base text-gray-600 leading-relaxed mb-1">
            {t('sciencePage.whatIsDDW.p3')}
          </p>
          <p className="text-base text-gray-600 leading-relaxed">
            {t('sciencePage.whatIsDDW.p4')}
          </p>
        </div>
      </section>

      {/* ===== Why Deuterium + Image 02 + Natural vs Artificial ===== */}
      <div
        className="sci-bg-parallax sci-image-reveal relative w-full min-h-[120vh] md:min-h-[140vh] bg-center bg-no-repeat flex flex-col justify-between"
        style={{
          backgroundImage: "url('/images/02.png')",
          backgroundSize: '100% 140%',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#009FE3]/50 via-transparent to-[#009FE3]/50 pointer-events-none" />

        {/* Top section — Why Deuterium Levels Matter */}
        <div className="relative z-10 w-full max-w-4xl mx-auto px-6 pt-14 md:pt-20 pb-4 md:pb-8">
          <div className="sci-reveal">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">{t('sciencePage.whyMatter.title')}</h2>
            <p className="text-sm md:text-base text-gray-800 leading-relaxed mb-3">
              {t('sciencePage.whyMatter.p1')}
            </p>
            <p className="text-sm md:text-base text-gray-800 leading-relaxed mb-3 md:mb-4">
              {t('sciencePage.whyMatter.p2')}
            </p>
            {whyMatterList.length > 0 && (
              <ul className="list-disc list-inside text-sm md:text-base text-gray-800 space-y-1 mb-3 md:mb-4 pl-2">
                {whyMatterList.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            )}
            <p className="text-sm md:text-base text-gray-800 leading-relaxed">
              {t('sciencePage.whyMatter.p3')}
            </p>
          </div>
        </div>

        <div className="flex-1 min-h-[9vh] md:min-h-0" />

        {/* Bottom section — Natural vs Artificial */}
        <div className="relative z-10 w-full max-w-4xl mx-auto px-6 pt-4 md:pt-8 pb-14 md:pb-20">
          <div className="sci-reveal">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">{t('sciencePage.naturalVsArtificial.title')}</h2>
            <p className="text-sm md:text-base text-gray-800 leading-relaxed mb-3">
              {t('sciencePage.naturalVsArtificial.p1')}
            </p>
            <p className="text-sm md:text-base text-gray-800 leading-relaxed mb-3">
              {t('sciencePage.naturalVsArtificial.p2')}
            </p>
            <p className="text-sm md:text-base text-gray-800 leading-relaxed">
              {t('sciencePage.naturalVsArtificial.p3')}
            </p>
          </div>
        </div>
      </div>

      {/* ===== Precision, Not Excess ===== */}
      <section className="w-full bg-gray-50 py-10 px-6">
        <div className="sci-reveal max-w-4xl mx-auto border border-gray-300 rounded-xl p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-3">{t('sciencePage.precision.title')}</h2>
          <p className="text-base text-gray-600 leading-relaxed mb-2">
            {t('sciencePage.precision.p1')}
          </p>
          <p className="text-base text-gray-600 leading-relaxed mb-2">
            {t('sciencePage.precision.p2')}
          </p>
          <p className="text-base text-gray-600 leading-relaxed mb-3">
            {t('sciencePage.precision.p3')}
          </p>
          {precisionList.length > 0 && (
            <ul className="list-disc list-inside text-base text-gray-600 space-y-1 mb-4 pl-2">
              {precisionList.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          )}
          <p className="text-base text-gray-600 leading-relaxed">
            {t('sciencePage.precision.p4')}
          </p>
        </div>
      </section>

      {/* ===== Image 03 — Our Natural Source ===== */}
      <div
        className="sci-image-reveal relative w-full min-h-[70vh] md:min-h-[85vh] bg-cover bg-right md:bg-center bg-no-repeat flex items-center"
        style={{ backgroundImage: "url('/images/03.png')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="relative z-10 w-full max-w-4xl mx-auto px-6 py-12 md:py-16">
          <h2 className="text-2xl md:text-3xl font-bold text-[#ffffff] mb-3">{t('sciencePage.source.title')}</h2>
          <p className="text-base text-white/90 leading-relaxed mb-3">
            {t('sciencePage.source.p1')}
          </p>
          <p className="text-base text-white/90 leading-relaxed mb-3">
            {t('sciencePage.source.p2')}
          </p>
          <p className="text-base text-white/90 leading-relaxed mb-4">
            {t('sciencePage.source.p3')}
          </p>
          {sourceList.length > 0 && (
            <ul className="list-disc list-inside text-base text-white/90 space-y-1 mb-4 pl-2">
              {sourceList.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          )}
          <p className="text-base text-white font-semibold">
            {t('sciencePage.source.p4')}
          </p>
        </div>
      </div>

      {/* ===== Scientific Advisory Board ===== */}
      <section className="w-full bg-white py-14 px-6">
        <div className="sci-reveal max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">{t('sciencePage.advisory.title')}</h2>
          <p className="text-base text-gray-500 italic mb-6">
            {t('sciencePage.advisory.subtitle')}
          </p>
          <p className="text-base text-gray-600 leading-relaxed mb-3">
            {t('sciencePage.advisory.p1')}
          </p>
          <p className="text-base text-gray-600 leading-relaxed">
            {t('sciencePage.advisory.p2')}
          </p>
        </div>
      </section>

      {/* ===== Advisory Board Members ===== */}
      <section className="w-full max-w-4xl mx-auto px-6 py-14">
        <h2 className="sci-reveal text-2xl md:text-3xl font-bold text-gray-800 mb-10 text-center">
          {t('sciencePage.advisory.listTitle')}
        </h2>
        <div className="advisor-list flex flex-col gap-8">
          {localizedAdvisors.map((advisor, index) => (
            <div
              key={index}
              className="advisor-card flex flex-row items-start gap-5 md:gap-8 bg-white border border-gray-100 rounded-2xl shadow-sm p-6 md:p-8 hover:shadow-lg hover:border-[#009FE3]/20 transition-all duration-300"
            >
              <div className="flex-shrink-0">
                <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
                  <Image
                    src={advisor.image}
                    alt={advisor.name}
                    fill
                    sizes="(max-width: 768px) 80px, 96px"
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-0.5">{advisor.name}</h3>
                <p className="text-sm text-[#009FE3] font-medium mb-2">{advisor.title}</p>
                <p className="text-sm text-gray-500 leading-relaxed">{advisor.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== A Responsible Wellness Philosophy ===== */}
      <section className="w-full bg-gray-50 py-14 px-6">
        <div className="sci-reveal max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">{t('sciencePage.philosophy.title')}</h2>
          <p className="text-base text-gray-600 leading-relaxed mb-3">
            {t('sciencePage.philosophy.p1')} <span className="font-semibold">{t('sciencePage.philosophy.p1_highlight')}</span>
          </p>
          <p className="text-base text-gray-600 leading-relaxed mb-3">
            {t('sciencePage.philosophy.p2')}
          </p>
          <p className="text-base text-gray-600 leading-relaxed">
            {t('sciencePage.philosophy.p3')}
          </p>
        </div>
      </section>

      {/* ===== Bottom Quote ===== */}
      <section className="w-full py-16 md:py-20 px-6">
        <div className="sci-quote max-w-3xl mx-auto text-center">
          <p className="text-xl md:text-2xl font-bold text-gray-800 leading-relaxed">
            {t('sciencePage.quote.line1')}
          </p>
          <p className="text-xl md:text-2xl font-bold text-[#009FE3] leading-relaxed mt-1">
            {t('sciencePage.quote.line2')}
          </p>
        </div>
      </section>

    </div>
  );
};

export default Science;