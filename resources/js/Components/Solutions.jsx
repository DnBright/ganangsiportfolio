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
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
        span: "md:col-span-2 lg:col-span-1"
    },
    {
        titleKey: "solutions.business.title",
        descKey: "solutions.business.desc",
        icon: "🏢",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
        span: "md:col-span-2 lg:col-span-1"
    },
    {
        titleKey: "solutions.digitalization.title",
        descKey: "solutions.digitalization.desc",
        icon: "⚡",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
        span: "md:col-span-4 lg:col-span-2"
    },
    {
        titleKey: "solutions.custom.title",
        descKey: "solutions.custom.desc",
        icon: "🎯",
        image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80",
        span: "md:col-span-4 lg:col-span-2"
    }
];

const Solutions = () => {
    const sectionRef = useRef(null);
    const { language } = useLanguage();

    useEffect(() => {
        // Use IntersectionObserver for reliable visibility - never opacity:0 hidden
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in');
                    }
                });
            },
            { threshold: 0.1 }
        );

        const cards = sectionRef.current?.querySelectorAll('.solution-card, .solution-header');
        cards?.forEach(el => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} className="w-full bg-[#f3f4f6] text-black py-24 md:py-32 px-6">
            <style>{`
                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(24px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .solution-card {
                    animation: fadeUp 0.6s ease forwards;
                }
                .solution-header {
                    animation: fadeUp 0.6s ease forwards;
                }
            `}</style>
            <div className="max-w-6xl mx-auto">

                {/* 1. Narrative Header */}
                <div className="solution-header mb-20 max-w-3xl">
                    <span className="text-black/40 font-bold text-[10px] tracking-[0.3em] uppercase mb-6 block">
                        Problem Solving Framework
                    </span>
                    <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-[1.1] mb-8">
                        {t('solutions.headline', language)}
                    </h2>
                    <p className="text-gray-600 text-lg md:text-xl font-normal leading-relaxed max-w-2xl">
                        {t('solutions.subtitle', language)}
                    </p>
                </div>

                {/* 2. Simulation Call-to-Action */}
                <div className="solution-header mb-16 w-full bg-white border border-black/10 p-2 overflow-hidden rounded-full flex flex-col md:flex-row items-center justify-between shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex-1 px-8 py-2 md:py-0 text-center md:text-left">
                        <span className="text-[9px] font-bold uppercase tracking-widest text-black/40 block mb-1">Ready for a demo?</span>
                        <h4 className="text-xs md:text-sm font-black uppercase tracking-widest">EXPERIENCE THE ARCHITECTURE</h4>
                    </div>
                    <a
                        href="#portfolio"
                        className="bg-black text-white px-8 md:px-12 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-black/80 transition-all flex items-center gap-3 text-[10px] w-full md:w-auto justify-center"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                        Initiate Simulation
                    </a>
                </div>

                {/* 3. Solution Matrix (Bento) */}
                <div className="solution-grid grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
                    {solutions.map((item, index) => (
                        <div key={index} className={`solution-card group relative ${item.span} aspect-square md:aspect-auto md:h-[400px] bg-white border border-black/5 rounded-[2rem] overflow-hidden transition-all hover:border-black/20 hover:shadow-xl hover:-translate-y-1`}
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            {/* Background Photo */}
                            <div className="absolute inset-0">
                                <img
                                    src={item.image}
                                    alt={t(item.titleKey, language)}
                                    className="w-full h-full object-cover opacity-20 group-hover:opacity-30 group-hover:scale-105 transition-all duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/60 to-white/20"></div>
                            </div>

                            {/* Icon/Decoration */}
                            <div className="absolute top-8 right-8 text-3xl opacity-40 group-hover:opacity-80 transition-opacity">
                                {item.icon}
                            </div>

                            <div className="relative z-10 p-8 h-full flex flex-col justify-end">
                                <h4 className="text-2xl font-black mb-4 uppercase tracking-tighter text-black">
                                    {t(item.titleKey, language)}
                                </h4>
                                <p className="text-gray-600 leading-relaxed text-sm">
                                    {t(item.descKey, language)}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Solutions;
