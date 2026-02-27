import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../Contexts/LanguageContext';
import { t } from '../translations';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const SloganServices = () => {
    const sectionRef = useRef(null);
    const { language } = useLanguage();

    const tickerItems = t('hero.branding2', language).split('|').map(s => s.trim());

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".service-card", {
                y: 60,
                opacity: 0,
                duration: 1.2,
                stagger: 0.1,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: ".service-grid",
                    start: "top 80%",
                }
            });

            gsap.from(".agency-card-reveal", {
                x: (i) => i === 0 ? -100 : 100,
                opacity: 0,
                duration: 1.5,
                ease: "expo.out",
                stagger: 0.3,
                scrollTrigger: {
                    trigger: ".agency-section",
                    start: "top 70%",
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const services = [
        { key: "slogan.webDev", icon: "01" },
        { key: "slogan.uiux", icon: "02" },
        { key: "slogan.consulting", icon: "03" }
    ];

    return (
        <section ref={sectionRef} className="bg-[#050508] text-white py-24 md:py-48 relative overflow-hidden">

            {/* 1. Immersive Slogan (Massive Text) */}
            <div className="container mx-auto px-6 mb-32 md:mb-48 text-center">
                <h2 className="text-[12vw] md:text-[8vw] font-black leading-[0.8] tracking-tighter uppercase opacity-10 select-none absolute top-0 left-0 w-full">
                    DIGITAL SUPREMACY
                </h2>
                <div className="relative z-10 max-w-5xl mx-auto">
                    <span className="text-blue-500 font-bold text-xs tracking-[0.4em] uppercase mb-8 block">
                        Our Manifest
                    </span>
                    <h3 className="text-4xl md:text-7xl font-black leading-tight tracking-tight uppercase">
                        {t('slogan.headline', language)}
                    </h3>
                </div>
            </div>

            {/* 2. Agency Tryptich (DNB vs Gro) */}
            <div className="agency-section container mx-auto px-6 mb-48">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                    {/* Dark & Bright */}
                    <div className="agency-card-reveal group relative p-12 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[3rem] overflow-hidden transition-all duration-700 hover:border-blue-500/50">
                        <div className="relative z-10">
                            <h4 className="text-[10px] font-bold text-blue-500 tracking-[0.4em] uppercase mb-8">Engineering Division</h4>
                            <h3 className="text-4xl font-black uppercase mb-6 tracking-tighter text-white">
                                {t('slogan.agencies.dnb.name', language)}
                            </h3>
                            <p className="text-lg font-bold text-white/90 mb-6 uppercase">
                                {t('slogan.agencies.dnb.focus', language)}
                            </p>
                            <p className="text-white/40 leading-relaxed mb-10 max-w-md">
                                {t('slogan.agencies.dnb.desc', language)}
                            </p>
                            <a href="#" className="inline-flex items-center gap-4 text-xs font-black uppercase tracking-widest text-white group-hover:text-blue-400 transition-colors">
                                {t('slogan.agencies.dnb.cta', language)}
                                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-blue-500 group-hover:border-blue-500 transition-all">
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                        <path d="M5 12h14m-7-7l7 7-7 7" />
                                    </svg>
                                </div>
                            </a>
                        </div>
                        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                    </div>

                    {/* Gro Visual */}
                    <div className="agency-card-reveal group relative p-12 bg-white text-black rounded-[3rem] overflow-hidden transition-all duration-700 hover:shadow-[0_40px_100px_rgba(0,0,0,0.4)]">
                        <div className="relative z-10">
                            <h4 className="text-[10px] font-bold text-gray-400 tracking-[0.4em] uppercase mb-8">Creative Division</h4>
                            <h3 className="text-4xl font-black uppercase mb-6 tracking-tighter">
                                {t('slogan.agencies.gro.name', language)}
                            </h3>
                            <p className="text-lg font-bold mb-6 uppercase italic">
                                {t('slogan.agencies.gro.focus', language)}
                            </p>
                            <p className="text-black/50 leading-relaxed mb-10 max-w-md">
                                {t('slogan.agencies.gro.desc', language)}
                            </p>
                            <a href="#" className="inline-flex items-center gap-4 text-xs font-black uppercase tracking-widest group-hover:text-blue-600 transition-colors">
                                {t('slogan.agencies.gro.cta', language)}
                                <div className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                        <path d="M5 12h14m-7-7l7 7-7 7" />
                                    </svg>
                                </div>
                            </a>
                        </div>
                    </div>

                </div>
            </div>

            {/* 3. Rolling Ticker of Expertise */}
            <div className="relative flex overflow-x-hidden border-y border-white/5 py-12 mb-48 rotate-[-1deg] bg-blue-600 scale-[1.05]">
                <motion.div
                    className="flex whitespace-nowrap gap-16 px-8"
                    animate={{ x: [0, -2000] }}
                    transition={{
                        x: { repeat: Infinity, duration: 30, ease: "linear" },
                    }}
                >
                    {[...tickerItems, ...tickerItems, ...tickerItems, ...tickerItems].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-16">
                            <span className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white">
                                {item}
                            </span>
                            <span className="text-white/30 text-4xl italic font-serif">/</span>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* 4. Services Grid (The Spectrum) */}
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <div className="max-w-xl">
                        <span className="text-blue-500 font-bold text-xs tracking-[0.4em] uppercase mb-4 block">Precision Engineering</span>
                        <h3 className="text-5xl md:text-6xl font-black tracking-tighter uppercase">{t('slogan.services', language)}</h3>
                    </div>
                    <div className="text-white/30 text-[10px] font-mono tracking-widest hidden md:block">
                        SPECTRUM_OF_EXCELLENCE_v2.0
                    </div>
                </div>

                <div className="service-grid grid grid-cols-1 md:grid-cols-3 gap-8">
                    {services.map((service, i) => (
                        <div key={i} className="service-card group relative p-12 bg-white/5 border border-white/10 rounded-[2.5rem] h-[450px] flex flex-col justify-between transition-all duration-500 hover:bg-white/10 hover:border-blue-500/30">

                            {/* Card Content */}
                            <div>
                                <div className="text-6xl font-black text-white/5 mb-8 group-hover:text-blue-500/20 transition-colors uppercase font-display">
                                    {service.icon}
                                </div>
                                <h4 className="text-3xl font-black mb-4 uppercase tracking-tight group-hover:text-blue-400 transition-colors">
                                    {t(`${service.key}.title`, language)}
                                </h4>
                                <p className="text-white/40 leading-relaxed text-sm group-hover:text-white/70 transition-colors">
                                    {t(`${service.key}.desc`, language)}
                                </p>
                            </div>

                            {/* Decorative Interaction */}
                            <div className="flex justify-between items-end">
                                <div className="w-12 h-[2px] bg-white/10 group-hover:w-24 group-hover:bg-blue-500 transition-all duration-500"></div>
                                <div className="w-14 h-14 rounded-full border border-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                        <path d="M7 17L17 7M17 7H7M17 7V17" />
                                    </svg>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            </div>

        </section>
    );
};

export default SloganServices;
