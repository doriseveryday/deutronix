"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useLanguage } from '@/app/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const baseFormulationIngredients = [
  {
    name: "Loquat Leaf Extract",
    desc: "Traditionally used in botanical preparations, loquat leaf extract is included to support localized comfort and contribute to a balanced topical formulation profile.",
    image: "/images/ddwgel/Loquat-Leaf.png",
  },
  {
    name: "Licorice Root Extract",
    desc: "A well-known botanical ingredient valued in topical formulations for its skin-conditioning properties and ability to support overall skin comfort.",
    image: "/images/ddwgel/Licorice.png",
  },
  {
    name: "Siler Root Extract",
    desc: "Traditionally incorporated in external botanical applications, selected to complement formulations intended for areas of physical tension.",
    image: "/images/ddwgel/Siler.png",
  },
  {
    name: "Mugwort Leaf Extract",
    desc: "Commonly used in warming topical preparations, included to enhance sensory comfort and support localized application.",
    image: "/images/ddwgel/Mugwort.png",
  },
  {
    name: "Sophora Root Extract",
    desc: "A botanical extract traditionally used in topical preparations to support skin balance and localized comfort.",
    image: "/images/ddwgel/Sophora-Root.png",
  },
  {
    name: "Skullcap Root Extract",
    desc: "Rich in naturally occurring flavonoids, selected to contribute to formulation stability and skin-conditioning support.",
    image: "/images/ddwgel/Skullcap.png",
  },
  {
    name: "Calendula Extract",
    desc: "Widely used in botanical topical applications, valued for supporting skin conditioning and soothing formulation characteristics.",
    image: "/images/ddwgel/Calendula.png",
  },
];

const DDWGel = () => {
  const bannerRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  // ==========================================
  // BULLETPROOF TRANSLATION HELPERS
  // ==========================================
  const safeT = (key: string, fallback: string) => {
    const val = t(key);
    if (!val || (typeof val === 'string' && val.includes('ddwGelPage'))) {
      return fallback;
    }
    return val as string;
  };

  const getSafeList = (baseKey: string, fallbacks: string[]) => {
    return fallbacks.map((fallback, i) => {
      const val = t(`${baseKey}.${i}`);
      if (val === `${baseKey}.${i}` || !val) {
        return fallback;
      }
      return val as string;
    });
  };

  // Safe Mapping for the Ingredients List
  const localizedIngredients = baseFormulationIngredients.map((baseItem, index) => {
    const tName = t(`ddwGelPage.formulation.ingredients.${index}.name`) as string;
    const tDesc = t(`ddwGelPage.formulation.ingredients.${index}.desc`) as string;

    const isValid = (val: any) => val && typeof val === 'string' && !val.includes('ddwGelPage');

    return {
      name: isValid(tName) ? tName : baseItem.name,
      desc: isValid(tDesc) ? tDesc : baseItem.desc,
      image: baseItem.image
    };
  });

  const productList = getSafeList('ddwGelPage.product.list', [
    "Ultra-light 50 ppm DDW",
    "Herbal warming formulation",
    "Topical delivery design"
  ]);

  useEffect(() => {
    // Add a slight delay to allow Next.js images/layout to settle
    const initGsap = setTimeout(() => {
      const ctx = gsap.context(() => {
        // 1. Hero Section Entrance
        gsap.fromTo(".hero-element", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power2.out" });

        // 2. Banner Overlays
        gsap.utils.toArray<HTMLElement>(".ddwgel-banner-overlay").forEach((el, i) => {
          gsap.fromTo(el, { opacity: 0, y: 40 }, {
            opacity: 1, y: 0, duration: 0.7, delay: i * 0.15, ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none none" },
          });
        });

        // 3. Fade Up Elements
        gsap.utils.toArray<HTMLElement>(".fade-up").forEach((el) => {
          gsap.fromTo(el, { opacity: 0, y: 40 }, {
            opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
            // Changed to 90% so elements near the bottom trigger easier
            scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none none" },
          });
        });

        // 4. Directional Slides
        gsap.utils.toArray<HTMLElement>(".slide-in-left").forEach((el) => {
          gsap.fromTo(el, { opacity: 0, x: -50 }, {
            opacity: 1, x: 0, duration: 0.8, ease: "power2.out",
            // Changed to 90% so bottom CTA doesn't get stuck
            scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none none" },
          });
        });

        gsap.utils.toArray<HTMLElement>(".slide-in-right").forEach((el) => {
          gsap.fromTo(el, { opacity: 0, x: 50 }, {
            opacity: 1, x: 0, duration: 0.8, ease: "power2.out",
            // Changed to 90% so bottom CTA doesn't get stuck
            scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none none" },
          });
        });

        // Force GSAP to recalculate all trigger positions after initialization
        ScrollTrigger.refresh();

      }, bannerRef);

      return () => ctx.revert();
    }, 100); // 100ms delay gives the DOM time to paint

    return () => clearTimeout(initGsap);
  }, []);

  return (
    <div className="w-full bg-white overflow-hidden" ref={bannerRef}>
      {/* ===== HERO BANNER ===== */}
      <section className="w-full bg-gray-100 py-10 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="hero-element text-3xl md:text-5xl font-extrabold text-[#009FE3] leading-tight">
            {safeT('ddwGelPage.hero.title', 'Targeted Recovery with Precision.')}
          </h1>
          <p className="hero-element text-gray-700 text-sm md:text-base mt-4 max-w-2xl leading-relaxed">
            {safeT('ddwGelPage.hero.description', 'EasyMove Gel is formulated with 50 ppm ultra-low deuterium deuterium-depleted water, designed specifically for targeted, external application. This formulation is engineered to support deeper absorption and localized comfort where muscles and joints require focused recovery support.')}
          </p>
        </div>
      </section>

     {/* ===== PRODUCT SHOWCASE ===== */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col items-center justify-center">
          {/* CHANGED: Added md:max-w-3xl and lg:max-w-4xl for PC view */}
          <div className="relative fade-up w-full max-w-lg md:max-w-2xl lg:max-w-3xl">
            <Image
              src="/images/ddwgel/01.png"
              alt="EasyMove Gel Product"
              // CHANGED: Bumped up the base width/height so it doesn't blur on large screens
              width={1200}
              height={800}
              className="object-contain w-full h-auto"
            />
          </div>
          
          <div className="fade-up mt-6">
            <span className="inline-block bg-[#4693D8] text-white italic text-base md:text-lg tracking-wide px-6 py-1.5 rounded-full shadow-sm">
              {safeT('ddwGelPage.product.badge', 'RRP: RM158 / box')}
            </span>
          </div>
        </div>
      </section>

      {/* ===== DESIGNED FOR TARGETED RECOVERY ===== */}
      <section className="max-w-6xl mx-auto px-6 pb-12 fade-up">
        <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-3">
          {safeT('ddwGelPage.product.title', 'Designed for Targeted Recovery with Purpose')}
        </h2>
        <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-2">
          {safeT('ddwGelPage.product.p1', 'EasyMove Gel combines:')}
        </p>
        <ul className="text-sm md:text-base text-gray-600 leading-relaxed list-disc list-inside mb-4 space-y-1">
          {productList.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-4 max-w-3xl">
          {safeT('ddwGelPage.product.p2', 'This integrated approach supports smoother application, enhanced absorption, and warming comfort in localized areas — without overwhelming the body.')}
        </p>
        <p className="text-sm md:text-base text-gray-600 leading-relaxed">
          {safeT('ddwGelPage.product.p3', 'The formulation is intentional, measured, and uncompromised.')}
        </p>
      </section>

      {/* ===== DIVIDER ===== */}
      <div className="w-full h-px bg-gray-200 fade-up" />

      {/* ===== WHO IS EASYMOVE GEL SUITABLE FOR? ===== */}
      <section className="max-w-6xl mx-auto px-6 py-14">
        <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-8 md:mb-10 fade-up">
          {safeT('ddwGelPage.suitable.title', 'Who Is EasyMove Gel Suitable For?')}
        </h2>

        <div className="flex flex-col gap-0">
          {/* --- Joint Pain / Knee Pain --- */}
          <div className="relative w-full overflow-hidden rounded-t-xl">
             <Image
              src="/images/ddwgel/02.png"
              alt="Joint Pain / Knee Pain"
              width={1200}
              height={400}
              className="w-full h-[110px] md:h-auto object-cover object-left"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-[#222]/70 to-transparent md:hidden" />
            <div className="absolute inset-0 flex flex-col justify-center items-end px-4 md:px-12 text-right ddwgel-banner-overlay">
              <h3 className="text-sm md:text-3xl font-bold text-white md:text-black mb-0 md:mb-2">
                {safeT('ddwGelPage.suitable.cards.c1.title', 'Joint Pain / Knee Pain')}
              </h3>
              <p className="text-white/90 md:text-black/90 text-[10px] md:text-base leading-tight md:leading-relaxed max-w-[65%] md:max-w-lg">
                {safeT('ddwGelPage.suitable.cards.c1.desc', 'The most common complaint among elderly individuals. EasyMove Gel is suitable for supporting daily joint comfort and easing stiffness around the knees, hands, and joints during movement.')}
              </p>
            </div>
          </div>

          {/* --- Lower Back Pain --- */}
          <div className="relative w-full overflow-hidden">
             <Image
              src="/images/ddwgel/03.png"
              alt="Lower Back Pain"
              width={1200}
              height={400}
              className="w-full h-[110px] md:h-auto object-cover object-left"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-[#222]/70 to-transparent md:hidden" />
            <div className="absolute inset-0 flex flex-col justify-center items-end px-4 md:px-12 text-right ddwgel-banner-overlay">
              <h3 className="text-sm md:text-3xl font-bold text-white md:text-black mb-0 md:mb-2">
                {safeT('ddwGelPage.suitable.cards.c2.title', 'Lower Back Pain')}
              </h3>
              <p className="text-white/90 md:text-black/90 text-[10px] md:text-base leading-tight md:leading-relaxed max-w-[65%] md:max-w-lg">
                {safeT('ddwGelPage.suitable.cards.c2.desc', 'Back discomfort from aging, posture changes, or long-term strain is very common. EasyMove Gel provides warming support to help relax muscles and improve comfort during daily activities.')}
              </p>
            </div>
          </div>

          {/* --- Frozen Shoulder --- */}
          <div className="relative w-full overflow-hidden">
             <Image
              src="/images/ddwgel/04.png"
              alt="Frozen Shoulder"
              width={1200}
              height={400}
              className="w-full h-[110px] md:h-auto object-cover object-left"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-[#222]/70 to-transparent md:hidden" />
            <div className="absolute inset-0 flex flex-col justify-center items-end px-4 md:px-12 text-right ddwgel-banner-overlay">
              <h3 className="text-sm md:text-3xl font-bold text-white md:text-black mb-0 md:mb-2">
                {safeT('ddwGelPage.suitable.cards.c3.title', 'Frozen Shoulder')}
              </h3>
              <p className="text-white/90 md:text-black/90 text-[10px] md:text-base leading-tight md:leading-relaxed max-w-[65%] md:max-w-lg">
                {safeT('ddwGelPage.suitable.cards.c3.desc', 'Stiff shoulders and limited arm movement often affect seniors. EasyMove Gel is suitable for warming the shoulder area to support flexibility and smoother movement.')}
              </p>
            </div>
          </div>

          {/* --- Muscle Weakness & Stiffness --- */}
          <div className="relative w-full overflow-hidden">
             <Image
              src="/images/ddwgel/05.png"
              alt="Muscle Weakness & Stiffness"
              width={1200}
              height={400}
              className="w-full h-[110px] md:h-auto object-cover object-left"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-[#222]/70 to-transparent md:hidden" />
            <div className="absolute inset-0 flex flex-col justify-center items-end px-4 md:px-12 text-right ddwgel-banner-overlay">
              <h3 className="text-sm md:text-3xl font-bold text-white md:text-black mb-0 md:mb-2">
                {safeT('ddwGelPage.suitable.cards.c4.title', 'Muscle Weakness & Stiffness')}
              </h3>
              <p className="text-white/90 md:text-black/90 text-[10px] md:text-base leading-tight md:leading-relaxed max-w-[65%] md:max-w-lg">
                {safeT('ddwGelPage.suitable.cards.c4.desc', 'As circulation and muscle elasticity decline with age, stiffness becomes more noticeable. EasyMove Gel supports muscle relaxation and comfort, especially before movement or exercise.')}
              </p>
            </div>
          </div>

          {/* --- Difficulty Walking / Reduced Mobility --- */}
          <div className="relative w-full overflow-hidden rounded-b-xl">
             <Image
              src="/images/ddwgel/06.png"
              alt="Difficulty Walking / Reduced Mobility"
              width={1200}
              height={400}
              className="w-full h-[110px] md:h-auto object-cover object-left"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-[#222]/70 to-transparent md:hidden" />
            <div className="absolute inset-0 flex flex-col justify-center items-end px-4 md:px-12 text-right ddwgel-banner-overlay">
              <h3 className="text-sm md:text-3xl font-bold text-white md:text-black mb-0 md:mb-2">
                {safeT('ddwGelPage.suitable.cards.c5.title', 'Difficulty Walking / Reduced Mobility')}
              </h3>
              <p className="text-white/90 md:text-black/90 text-[10px] md:text-base leading-tight md:leading-relaxed max-w-[65%] md:max-w-lg">
                {safeT('ddwGelPage.suitable.cards.c5.desc', 'For elderly individuals who feel tightness, heaviness, or discomfort when walking. EasyMove Gel helps provide warming comfort to support smoother, more confident movement.')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== DIVIDER ===== */}
      <div className="w-full h-px bg-gray-200 fade-up" />

      {/* ===== FORMULATION DESIGN ===== */}
      <section className="max-w-4xl mx-auto px-6 py-14">
        <div className="fade-up mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-500 mb-2">
            {safeT('ddwGelPage.formulation.title', 'Formulation Design')}
          </h2>
          <p className="text-gray-500 mb-4">
            {safeT('ddwGelPage.formulation.subtitle', 'Plant-Based Functional Composition')}
          </p>
          <p className="text-sm md:text-base text-gray-600 leading-relaxed">
            {safeT('ddwGelPage.formulation.desc', 'EasyMove Gel is developed using a precision-based topical formulation strategy. Each botanical extract is selected for compatibility, stability, and localized application performance.')}
          </p>
        </div>

        <div className="flex flex-col gap-6 md:gap-8">
          {localizedIngredients.map((item, index) => (
            <div key={index} className="fade-up flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
              <div className="flex-shrink-0 w-32 h-20 md:w-48 md:h-28 relative rounded-2xl overflow-hidden shadow-sm border border-gray-100 bg-gray-50">
                <Image src={item.image} alt={item.name} fill sizes="(max-width: 768px) 128px, 192px" className="object-cover" />
              </div>
              <div className="flex flex-col flex-1">
                <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-1">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== DIVIDER ===== */}
      <div className="w-full h-px bg-gray-200 fade-up" />

      {/* ===== WHY 50 PPM MATTERS ===== */}
      <section className="max-w-6xl mx-auto px-6 py-14 overflow-hidden">
        <div className="md:grid md:grid-cols-2 gap-4 md:gap-6 items-center">
             <div className="w-full slide-in-left">
            <div className="flex flex-row items-center mb-4 md:block">
              <h2 className="text-2xl font-bold text-gray-900 mr-3 mb-0 md:text-4xl md:mb-6">
                {safeT('ddwGelPage.ppm.title', 'Why 50 ppm Matters')}
              </h2>
              <span className="flex-shrink-0 md:hidden">
                <Image
                  src="/images/ddwgel/50.png"
                  alt="50 PPM"
                  width={300}
                  height={300}
                  className="object-contain w-16 h-16"
                />
              </span>
            </div>
            <div>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-4">
              {safeT('ddwGelPage.ppm.p1', 'Not all deuterium-depleted formulations are intended for the same purpose.')}
            </p>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-4">
              {safeT('ddwGelPage.ppm.p2', 'EasyMove Gel is formulated with 50 ppm DDW because topical delivery requires lighter molecular behavior than daily drinking water. This ultra-low deuterium level is selected to support smoother penetration and more effective delivery of herbal actives into targeted areas.')}
            </p>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              {safeT('ddwGelPage.ppm.p3', 'Stating the ppm is not a marketing statement — it reflects formulation intent, precision, and transparency.')}
            </p>
            </div>
          </div>
          <div className="hidden md:flex justify-center items-center slide-in-right">
            <Image
              src="/images/ddwgel/50.png"
              alt="50 PPM"
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
              src="/images/ddwgel/07.png"
              alt="EasyMove Gel Products"
              // CHANGED: Increased intrinsic dimensions for crispness on PC
              width={800}
              height={1200}
              // CHANGED: Added w-full, h-auto, and responsive max-widths
              className="object-contain w-full max-w-[280px] md:max-w-md lg:max-w-lg h-auto"
            />
          </div>
          <div className="slide-in-right">
            <h2 
              className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-700 leading-snug"
              dangerouslySetInnerHTML={{ __html: safeT('ddwGelPage.cta.title', '50 ppm<br />formulated for targeted comfort,<br />not general hydration.') }}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default DDWGel;