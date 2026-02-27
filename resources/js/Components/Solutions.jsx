import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagicBentoCard from './MagicBentoCard';
import { useLanguage } from '../Contexts/LanguageContext';
import { t } from '../translations';

gsap.registerPlugin(ScrollTrigger);

const solutions = [
    {
        titleKey: "solutions.education.title",
        descKey: "solutions.education.desc",
        icon: "🎓",
        image: "/images/solutions/education.png",
        span: "md:col-span-2 lg:col-span-1"
    },
    {
        titleKey: "solutions.business.title",
        descKey: "solutions.business.desc",
        icon: "🏢",
        image: "/images/solutions/business.png",
        span: "md:col-span-2 lg:col-span-1"
    },
    {
        titleKey: "solutions.digitalization.title",
        descKey: "solutions.digitalization.desc",
        icon: "⚡",
        image: "/images/solutions/digitalization.png",
        span: "md:col-span-4 lg:col-span-2"
    },
    {
        titleKey: "solutions.custom.title",
        descKey: "solutions.custom.desc",
        icon: "🎯",
        image: "/images/solutions/custom.png",
        span: "md:col-span-4 lg:col-span-2"
    }
];

const Solutions = () => {
    const sectionRef = useRef(null);
    const { language } = useLanguage();

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".solution-card", {
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.15,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".solution-grid",
                    start: "top 75%",
                }
            });

            gsap.from(".solution-header", {
                y: 30,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="w-full bg-[#050508] text-white py-32 md:py-48 px-6 md:px-12 lg:px-24">
            <div className="max-w-7xl mx-auto">

                {/* 1. Narrative Header */}
                <div className="solution-header mb-32 max-w-4xl">
                    <span className="text-blue-500 font-bold text-xs tracking-[0.4em] uppercase mb-8 block">
                        Problem Solving Framework
                    </span>
                    <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.9] mb-12">
                        {t('solutions.headline', language)}
                    </h2>
                    <p className="text-white/40 text-xl md:text-2xl font-light leading-relaxed max-w-2xl">
                        {t('solutions.subtitle', language)}
                    </p>
                </div>

                {/* 2. Simulation Call-to-Action */}
                <div className="solution-header mb-24 w-full bg-white text-black p-1 md:p-1 overflow-hidden rounded-full flex items-center shadow-[0_0_50px_rgba(255,255,255,0.1)] group">
                    <div className="flex-1 px-8 hidden md:block">
                        <span className="text-[10px] font-black uppercase tracking-widest text-black/40">Ready for a demo?</span>
                        <h4 className="text-sm font-bold uppercase tracking-tight">EXPERIENCE THE ARCHITECTURE IN REAL-TIME</h4>
                    </div>
                    <a
                        href="#portfolio"
                        className="bg-black text-white px-12 py-5 rounded-full font-black uppercase tracking-widest hover:bg-blue-600 transition-all active:scale-95 flex items-center gap-4 whitespace-nowrap text-xs flex-1 md:flex-none justify-center"
                    >
                        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                        Initiate Simulation
                    </a>
                </div>

                {/* 3. Solution Matrix (Bento) */}
                <div className="solution-grid grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
                    {solutions.map((item, index) => (
                        <div key={index} className={`solution-card group relative ${item.span} aspect-square md:aspect-auto md:h-[450px] bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden transition-all duration-700 hover:border-blue-500/30`}>

                            {/* Visual Layer */}
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                            {/* Icon/Decoration */}
                            <div className="absolute top-10 right-10 text-4xl opacity-20 filter grayscale">
                                {item.icon}
                            </div>

                            <div className="relative z-10 p-10 h-full flex flex-col justify-end">
                                <h4 className="text-3xl font-black mb-6 uppercase tracking-tighter group-hover:text-blue-400 transition-colors">
                                    {t(item.titleKey, language)}
                                </h4>
                                <p className="text-white/40 leading-relaxed text-sm group-hover:text-white/70 transition-colors">
                                    {t(item.descKey, language)}
                                </p>
                            </div>

                            {/* Hover Reveal Interaction */}
                            <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Solutions;
