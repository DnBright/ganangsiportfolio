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
        image: "/images/solutions/education.png"
    },
    {
        titleKey: "solutions.business.title",
        descKey: "solutions.business.desc",
        icon: "🏢",
        image: "/images/solutions/business.png"
    },
    {
        titleKey: "solutions.digitalization.title",
        descKey: "solutions.digitalization.desc",
        icon: "⚡",
        image: "/images/solutions/digitalization.png"
    },
    {
        titleKey: "solutions.custom.title",
        descKey: "solutions.custom.desc",
        icon: "🎯",
        image: "/images/solutions/custom.png"
    }
];

const Solutions = () => {
    const sectionRef = useRef(null);
    const headerRef = useRef(null);
    const gridRef = useRef(null);
    const { language } = useLanguage();

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            });

            tl.from(headerRef.current, {
                y: 50,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            })
                .from(gridRef.current.children, {
                    y: 50,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power3.out"
                }, "-=0.5");

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="w-full bg-white text-black py-24 px-6 md:px-12 lg:px-24">
            <div className="max-w-7xl mx-auto">
                {/* Prototype Trigger Section */}
                <div className="mb-24 w-full bg-[#0a0a0a] rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden group border border-white/10 shadow-2xl">
                    <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-gradient-to-tr from-red-600/10 to-orange-600/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                <span className="text-xs font-mono text-white/60 uppercase tracking-widest">Simulasi Langsung</span>
                            </div>
                            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4 max-w-xl leading-[0.9]">
                                Coba Sendiri <span className="text-white underline underline-offset-4 decoration-red-500 decoration-4">Sistem Kami</span>
                            </h2>
                            <p className="text-white/60 max-w-lg leading-relaxed text-sm md:text-base">
                                Tidak perlu menebak. Rasakan langsung performa dan kualitas sistem digital yang kami bangun.
                            </p>
                        </div>

                        <a
                            href="#portfolio"
                            onClick={(e) => {
                                e.preventDefault();
                                const el = document.getElementById('portfolio');
                                if (el) el.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="bg-white text-black px-8 py-4 rounded-full font-black uppercase tracking-widest hover:scale-105 transition-transform active:scale-95 flex items-center gap-3 shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_50px_rgba(255,255,255,0.4)] whitespace-nowrap"
                        >
                            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                            Buka Simulasi
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </svg>
                        </a>
                    </div>
                </div>

                <div ref={headerRef} className="mb-20">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">{t('solutions.headline', language)}</h2>
                    <h3 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                        {t('solutions.subtitle', language)}
                    </h3>
                </div>

                <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    {solutions.map((item, index) => (
                        <MagicBentoCard key={index} image={item.image} className="h-full group">
                            <div className="h-full p-8 flex flex-col items-start justify-start">
                                <div className="text-4xl mb-6">{item.icon}</div>
                                <h4 className="text-2xl font-bold mb-4 translate-x-0 group-hover:translate-x-2 transition-transform duration-300">{t(item.titleKey, language)}</h4>
                                <p className="text-gray-600 leading-relaxed">
                                    {t(item.descKey, language)}
                                </p>
                            </div>
                        </MagicBentoCard>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Solutions;
