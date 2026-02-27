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
        // Use IntersectionObserver for reliable visibility
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in');
                    }
                });
            },
            { threshold: 0.05 }
        );

        const els = sectionRef.current?.querySelectorAll('.service-card, .agency-card-reveal');
        els?.forEach(el => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    const services = [
        { key: "slogan.webDev", icon: "01" },
        { key: "slogan.uiux", icon: "02" },
        { key: "slogan.consulting", icon: "03" }
    ];

    return (
        <section ref={sectionRef} className="bg-white text-black py-24 md:py-32 relative overflow-hidden">
            <style>{`
                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(24px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .agency-card-reveal {
                    animation: fadeUp 0.7s ease forwards;
                }
                .service-card {
                    animation: fadeUp 0.6s ease forwards;
                }
            `}</style>

            {/* 1. Immersive Slogan (Massive Text) */}
            <div className="max-w-7xl mx-auto px-6 mb-24 md:mb-40 text-center relative">
                <h2 className="text-[12vw] md:text-[8vw] font-black leading-[0.8] tracking-tighter uppercase opacity-5 select-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-black">
                    DIGITAL SUPREMACY
                </h2>
                <div className="relative z-10 max-w-4xl mx-auto">
                    <span className="text-black/40 font-bold text-[10px] tracking-[0.3em] uppercase mb-6 block">
                        Our Manifest
                    </span>
                    <h3 className="text-3xl md:text-5xl font-black leading-tight tracking-tighter uppercase text-black">
                        {t('slogan.headline', language)}
                    </h3>
                </div>
            </div>

            {/* 2. Agency Tryptich (DNB vs Gro) */}
            <div className="agency-section max-w-6xl mx-auto px-6 mb-32 md:mb-40">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">

                    {/* Dark & Bright */}
                    <div className="agency-card-reveal group relative p-10 md:p-14 bg-[#fcfcfc] border border-black/10 rounded-3xl overflow-hidden transition-all duration-500 hover:border-black/30 hover:shadow-xl">
                        {/* Decorative Background Photo */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                            <img
                                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80"
                                alt="Engineering"
                                className="w-full h-full object-cover opacity-[0.06]"
                            />
                        </div>
                        <div className="relative z-10 pr-8">
                            <h4 className="text-[10px] font-bold text-black/40 tracking-[0.3em] uppercase mb-6">Engineering Division</h4>
                            <h3 className="text-3xl md:text-4xl font-black uppercase mb-4 tracking-tighter text-black">
                                {t('slogan.agencies.dnb.name', language)}
                            </h3>
                            <p className="text-sm font-bold text-black mb-6 uppercase tracking-widest">
                                {t('slogan.agencies.dnb.focus', language)}
                            </p>
                            <p className="text-gray-600 leading-relaxed mb-10 max-w-sm text-sm">
                                {t('slogan.agencies.dnb.desc', language)}
                            </p>
                            <a href="#" className="inline-flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-black group-hover:gap-6 transition-all">
                                {t('slogan.agencies.dnb.cta', language)}
                                <span>→</span>
                            </a>
                        </div>
                    </div>

                    {/* Gro Visual */}
                    <div className="agency-card-reveal group relative p-10 md:p-14 bg-black text-white rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-2xl">
                        {/* Decorative Background Photo */}
                        <div className="absolute inset-0">
                            <img
                                src="https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1200&q=80"
                                alt="Creative Design"
                                className="w-full h-full object-cover opacity-[0.12] group-hover:opacity-[0.2] group-hover:scale-105 transition-all duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-tr from-black via-black/80 to-transparent"></div>
                        </div>
                        <div className="relative z-10 pr-8">
                            <h4 className="text-[10px] font-bold text-white/40 tracking-[0.3em] uppercase mb-6">Creative Division</h4>
                            <h3 className="text-3xl md:text-4xl font-black uppercase mb-4 tracking-tighter">
                                {t('slogan.agencies.gro.name', language)}
                            </h3>
                            <p className="text-sm font-bold mb-6 uppercase italic tracking-widest text-gray-300">
                                {t('slogan.agencies.gro.focus', language)}
                            </p>
                            <p className="text-gray-400 leading-relaxed mb-10 max-w-sm text-sm">
                                {t('slogan.agencies.gro.desc', language)}
                            </p>
                            <a href="#" className="inline-flex items-center gap-4 text-xs font-bold uppercase tracking-widest group-hover:gap-6 transition-all">
                                {t('slogan.agencies.gro.cta', language)}
                                <span>→</span>
                            </a>
                        </div>
                    </div>

                </div>
            </div>

            {/* 3. Rolling Ticker of Expertise */}
            <div className="relative flex overflow-x-hidden border-y border-black/5 py-8 mb-32 md:mb-40 bg-[#f9f9f9]">
                <motion.div
                    className="flex whitespace-nowrap gap-12 px-6"
                    animate={{ x: [0, -2000] }}
                    transition={{
                        x: { repeat: Infinity, duration: 40, ease: "linear" },
                    }}
                >
                    {[...tickerItems, ...tickerItems, ...tickerItems, ...tickerItems].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-12">
                            <span className="text-2xl md:text-4xl font-black uppercase tracking-tighter text-black">
                                {item}
                            </span>
                            <span className="text-black/10 text-3xl italic font-serif">/</span>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* 4. Services Grid (The Spectrum) */}
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div className="max-w-xl">
                        <span className="text-black/40 font-bold text-[10px] tracking-[0.3em] uppercase mb-4 block">Precision Engineering</span>
                        <h3 className="text-4xl md:text-5xl font-black tracking-tighter uppercase text-black">{t('slogan.services', language)}</h3>
                    </div>
                </div>

                <div className="service-grid grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {services.map((service, i) => (
                        <div key={i} className="service-card group relative p-10 bg-white border border-black/10 rounded-2xl h-[380px] flex flex-col justify-between transition-all duration-300 hover:border-black/40 hover:-translate-y-2 hover:shadow-xl">

                            {/* Card Content */}
                            <div>
                                <div className="text-4xl font-black text-black/10 mb-6 group-hover:text-black/30 transition-colors uppercase font-mono">
                                    {service.icon}
                                </div>
                                <h4 className="text-2xl font-black mb-4 uppercase tracking-tighter text-black">
                                    {t(`${service.key}.title`, language)}
                                </h4>
                                <p className="text-gray-600 leading-relaxed text-sm">
                                    {t(`${service.key}.desc`, language)}
                                </p>
                            </div>

                            {/* Decorative Interaction */}
                            <div className="flex justify-between items-end">
                                <div className="w-8 h-[2px] bg-black/10 group-hover:w-16 group-hover:bg-black transition-all duration-300"></div>
                            </div>

                        </div>
                    ))}
                </div>
            </div>

        </section>
    );
};

export default SloganServices;
