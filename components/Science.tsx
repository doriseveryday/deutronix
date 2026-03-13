"use client";

import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const advisors = [
  {
    name: "Professor Cong Feng Song",
    title: "Professor | Functional Nutrition",
    description:
      "Expert in functional nutrition and long-term wellness research, with a focus on metabolic health and low-deuterium science education.",
    image: "/images/Cong.png",
  },
  {
    name: "Professor Wang Fei Teng",
    title: "Professor | Glaciology & Cryosphere Science",
    description:
      "Research specialist in glacial systems and cryosphere science, contributing expertise on natural low-deuterium water formation and high-altitude water sources.",
    image: "/images/Wang.png",
  },
  {
    name: "Guo De Yong",
    title: "DDW Resource Specialist",
    description:
      "Specialist in natural deuterium-depleted water resources and sustainable development of low-deuterium water sources.",
    image: "/images/Guo.png",
  },
  {
    name: "Doctor Li Hui Lin",
    title: "Doctor | Cryosphere & DDW Research",
    description:
      "Researcher in cryosphere science and low-deuterium water studies, contributing international academic perspectives on water science.",
    image: "/images/Li.png",
  },
];

const Science = () => {
  const pageRef = useRef<HTMLDivElement>(null);

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
          DDW SCIENCE
        </h1>
        <p className="text-lg md:text-2xl font-bold text-gray-800 mt-1">
          Understanding Deuterium-Depleted Water
        </p>
      </section>

      {/* ===== What is Deuterium? ===== */}
      <section className="w-full max-w-4xl mx-auto px-6 py-8">
        <div className="sci-reveal">
          <h2 className="text-xl md:text-xl text-gray-600 mb-3">What is Deuterium?</h2>
          <p className="text-base text-gray-600 leading-relaxed mb-2">
            Deuterium is a naturally occurring form of hydrogen found in all water. Because it is heavier than regular hydrogen, it behaves differently inside the body at the cellular level.
          </p>
          <p className="text-base text-gray-600 leading-relaxed">
            All natural water contains deuterium. The difference lies in how much.
          </p>
        </div>
      </section>

      {/* ===== Image 01 (contains the 氘 / H₂O icons) ===== */}
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
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-3">What is Deuterium-Depleted Water (DDW)?</h2>
          <p className="text-base text-gray-600 leading-relaxed mb-3">
            Deuterium-Depleted Water (DDW) is water with a naturally reduced concentration of deuterium compared to ordinary drinking water.
          </p>
          <p className="text-base text-gray-600 leading-relaxed mb-3">
            Lower deuterium levels are an area of scientific interest because deuterium concentration can influence how efficiently cells produce and manage energy. By reducing deuterium intake through hydration, DDW is designed to support more efficient cellular processes and metabolic balance.
          </p>
          <p className="text-base text-gray-600 leading-relaxed mb-1">
            DDW is not a drug, treatment, or supplement.
          </p>
          <p className="text-base text-gray-600 leading-relaxed">
            It is a refined approach to hydration, developed through science and nature.
          </p>
        </div>
      </section>

      {/* ===== Why Deuterium + Image 02 + Natural vs Artificial — Combined ===== */}
      <div
        className="sci-bg-parallax sci-image-reveal relative w-full min-h-[120vh] md:min-h-[140vh] bg-center bg-no-repeat flex flex-col justify-between"
        style={{
          backgroundImage: "url('/images/02.png')",
          backgroundSize: '100% 140%',
        }}
      >
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#009FE3]/50 via-transparent to-[#009FE3]/50 pointer-events-none" />

        {/* Top section — Why Deuterium Levels Matter */}
        <div className="relative z-10 w-full max-w-4xl mx-auto px-6 pt-14 md:pt-20 pb-4 md:pb-8">
          <div className="sci-reveal">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">Why Deuterium Levels Matter</h2>
            <p className="text-sm md:text-base text-gray-800 leading-relaxed mb-3">
              At the cellular level, energy production is a delicate and precise process. Research suggests that excess deuterium may interfere with normal cellular energy efficiency due to its heavier molecular structure.
            </p>
            <p className="text-sm md:text-base text-gray-800 leading-relaxed mb-3 md:mb-4">
              By lowering deuterium exposure through daily hydration, DDW is designed to support:
            </p>
            <ul className="list-disc list-inside text-sm md:text-base text-gray-800 space-y-1 mb-3 md:mb-4 pl-2">
              <li>More efficient cellular energy processes</li>
              <li>Improved metabolic balance</li>
              <li>Long-term hydration efficiency</li>
            </ul>
            <p className="text-sm md:text-base text-gray-800 leading-relaxed">
              This is why DDW is often described as precision hydration, rather than ordinary water.
            </p>
          </div>
        </div>

        {/* Middle spacer — water splash area breathes */}
        <div className="flex-1 min-h-[9vh] md:min-h-0" />

        {/* Bottom section — Natural vs Artificial */}
        <div className="relative z-10 w-full max-w-4xl mx-auto px-6 pt-4 md:pt-8 pb-14 md:pb-20">
          <div className="sci-reveal">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">Natural vs Artificial Low-Deuterium Water</h2>
            <p className="text-sm md:text-base text-gray-800 leading-relaxed mb-3">
              Not all low-deuterium water is the same.
            </p>
            <p className="text-sm md:text-base text-gray-800 leading-relaxed mb-3">
              Some products reduce deuterium through artificial methods such as electrolysis or chemical alteration. While deuterium levels may change, the natural molecular structure of the water can be affected.
            </p>
            <p className="text-sm md:text-base text-gray-800 leading-relaxed">
              Deutronix DDW is naturally low in deuterium, formed through rare environmental conditions over time.
            </p>
          </div>
        </div>
      </div>

      {/* ===== Precision, Not Excess ===== */}
      <section className="w-full bg-gray-50 py-10 px-6">
        <div className="sci-reveal max-w-4xl mx-auto border border-gray-300 rounded-xl p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-3">Precision, Not Excess</h2>
          <p className="text-base text-gray-600 leading-relaxed mb-2">
            Deutronix does not pursue extremes.
          </p>
          <p className="text-base text-gray-600 leading-relaxed mb-2">
            Our approach to DDW is guided by precision, not exaggeration.
          </p>
          <p className="text-base text-gray-600 leading-relaxed mb-3">
            Each formulation is carefully monitored to maintain:
          </p>
          <ul className="list-disc list-inside text-base text-gray-600 space-y-1 mb-4 pl-2">
            <li>Stable deuterium levels</li>
            <li>Consistent quality</li>
            <li>Safety for daily consumption</li>
            <li>Recognition by professors and universities</li>
          </ul>
          <p className="text-base text-gray-600 leading-relaxed">
            DDW is intended to support everyday wellness as part of a balanced lifestyle.
          </p>
        </div>
      </section>

      {/* ===== Image 03 — Full-width background with "Our Natural Source" overlaid ===== */}
      <div
        className="sci-image-reveal relative w-full min-h-[70vh] md:min-h-[85vh] bg-cover bg-right md:bg-center bg-no-repeat flex items-center"
        style={{ backgroundImage: "url('/images/03.png')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="relative z-10 w-full max-w-4xl mx-auto px-6 py-12 md:py-16">
          <h2 className="text-2xl md:text-3xl font-bold text-[#ffffff] mb-3">Our Natural Source</h2>
          <p className="text-base text-white/90 leading-relaxed mb-3">
            Our DDW originates from ancient glacial snowmelt in the Altai Mountain region, one of the world&apos;s most pristine and isolated high-altitude environments.
          </p>
          <p className="text-base text-white/90 leading-relaxed mb-3">
            Over thousands of years, long-distance atmospheric movement, freezing temperatures, and natural filtration gradually reduce deuterium levels — without human intervention.
          </p>
          <p className="text-base text-white/90 leading-relaxed mb-4">
            This natural process creates a rare water profile that:
          </p>
          <ul className="list-disc list-inside text-base text-white/90 space-y-1 mb-4 pl-2">
            <li>Requires no chemical treatment</li>
            <li>Preserves water integrity</li>
            <li>Maintains stable molecular structure</li>
          </ul>
          <p className="text-base text-white font-semibold">
            Nature does the work. Science ensures transparency.
          </p>
        </div>
      </div>

      {/* ===== Scientific Advisory Board ===== */}
      <section className="w-full bg-white py-14 px-6">
        <div className="sci-reveal max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Scientific Advisory Board</h2>
          <p className="text-base text-gray-500 italic mb-6">
            Guiding DDW research, formulation, and responsible application.
          </p>
          <p className="text-base text-gray-600 leading-relaxed mb-3">
            At Deutronix, our DDW research and product development are guided by an international scientific advisory board with expertise spanning biomedical science, nutrition, glaciology, and water resource research.
          </p>
          <p className="text-base text-gray-600 leading-relaxed">
            Their role is to provide scientific guidance, academic insight, and responsible oversight in the exploration and application of deuterium-depleted water.
          </p>
        </div>
      </section>

      {/* ===== Advisory Board Members ===== */}
      <section className="w-full max-w-4xl mx-auto px-6 py-14">
        <h2 className="sci-reveal text-2xl md:text-3xl font-bold text-gray-800 mb-10 text-center">
          Advisory Board Members
        </h2>
        <div className="advisor-list flex flex-col gap-8">
          {advisors.map((advisor, index) => (
            <div
              key={index}
              className="advisor-card flex flex-row items-start gap-5 md:gap-8 bg-white border border-gray-100 rounded-2xl shadow-sm p-6 md:p-8 hover:shadow-lg hover:border-[#009FE3]/20 transition-all duration-300"
            >
              {/* Photo */}
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
              {/* Info */}
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
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">A Responsible Wellness Philosophy</h2>
          <p className="text-base text-gray-600 leading-relaxed mb-3">
            At Deutronix, we believe <span className="font-semibold">education comes before claims</span>.
          </p>
          <p className="text-base text-gray-600 leading-relaxed mb-3">
            DDW represents a growing area of scientific exploration, and we remain committed to responsible development, transparent communication, and continuous research collaboration.
          </p>
          <p className="text-base text-gray-600 leading-relaxed">
            Our goal is not to promise outcomes, but to provide thoughtfully developed wellness solutions grounded in science, nature, and long-term responsibility.
          </p>
        </div>
      </section>

      {/* ===== Bottom Quote ===== */}
      <section className="w-full py-16 md:py-20 px-6">
        <div className="sci-quote max-w-3xl mx-auto text-center">
          <p className="text-xl md:text-2xl font-bold text-gray-800 leading-relaxed">
            Deuterium-Depleted Water is not about trends.
          </p>
          <p className="text-xl md:text-2xl font-bold text-[#009FE3] leading-relaxed mt-1">
            It is about understanding water, more precisely.
          </p>
        </div>
      </section>

    </div>
  );
};

export default Science;