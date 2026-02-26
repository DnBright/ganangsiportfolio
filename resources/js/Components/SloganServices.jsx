import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../Contexts/LanguageContext';
import { t } from '../translations';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const SloganServices = () => {
    const sectionRef = useRef(null);
    const textRef = useRef(null);
    const gridRef = useRef(null);
    const { language } = useLanguage();

    const servicesList = t('hero.branding2', language).split('|').map(s => s.trim());

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Slogan Reveal
            gsap.from(".slogan-reveal", {
                scrollTrigger: {
                    trigger: ".slogan-reveal",
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                },
                y: 50,
                opacity: 0,
                duration: 1.2,
                stagger: 0.1,
                ease: "power3.out"
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const services = [
        {
            titleKey: "slogan.webDev.title",
            descKey: "slogan.webDev.desc",
            icon: "01",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
        },
        {
            titleKey: "slogan.uiux.title",
            descKey: "slogan.uiux.desc",
            icon: "02",
            image: "https://images.unsplash.com/photo-1545235617-9465d2a55698?auto=format&fit=crop&w=800&q=80"
        },
        {
            titleKey: "slogan.consulting.title",
            descKey: "slogan.consulting.desc",
            icon: "03",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
        }
    ];

    return (
        <section ref={sectionRef} id="slogan-services-root" className="bg-white text-black pt-0 pb-32 md:pb-48 px-6 relative overflow-hidden">
            {/* Transition: Service Ticker */}
            <div className="mb-24 md:mb-32">
                <div className="container mx-auto max-w-6xl mb-12">
                    <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between border-b border-black/10 pb-6 mb-12 slogan-reveal">
                        <div className="flex items-center gap-4">
                            <span className="w-12 h-[1px] bg-black"></span>
                            <h4 className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-black">
                                {t('slogan.services', language)}
                            </h4>
                        </div>
                        <p className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">
                            {t('hero.branding1', language)}
                        </p>
                    </div>
                </div>

                <div className="relative flex overflow-x-hidden border-y border-black/5 py-8 bg-gray-50/50">
                    <motion.div
                        className="flex whitespace-nowrap gap-12 px-6"
                        animate={{ x: [0, -1000] }}
                        transition={{
                            x: {
                                repeat: Infinity,
                                repeatType: "loop",
                                duration: 25,
                                ease: "linear",
                            },
                        }}
                    >
                        {[...servicesList, ...servicesList, ...servicesList].map((service, idx) => (
                            <div key={idx} className="flex items-center gap-12">
                                <span className="text-2xl md:text-4xl font-black uppercase tracking-tighter text-black/90">
                                    {service}
                                </span>
                                <span className="w-3 h-3 md:w-4 md:h-4 bg-black rounded-full"></span>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Dual Agency Section */}
            <div className="container mx-auto max-w-6xl mb-12 slogan-reveal">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Dark And Bright Agency Card */}
                    <div className="flex-1 group relative p-10 md:p-12 bg-black text-white rounded-[2rem] overflow-hidden hover:shadow-2xl transition-all duration-700 hover:-translate-y-2">
                        <div className="relative z-10">
                            <h4 className="text-xs font-mono uppercase tracking-[0.4em] mb-8 text-white/40">
                                {t('slogan.agencies.title', language)}
                            </h4>
                            <h3 className="text-3xl font-black uppercase mb-6 tracking-tighter">
                                {t('slogan.agencies.dnb.name', language)}
                            </h3>
                            <div className="h-[2px] w-12 bg-white/20 mb-8 group-hover:w-24 transition-all duration-500"></div>

                            <p className="text-lg font-bold text-white mb-6 uppercase tracking-tight">
                                {t('slogan.agencies.dnb.focus', language)}
                            </p>

                            <p className="text-base font-light text-white/60 leading-relaxed italic">
                                "{t('slogan.agencies.dnb.desc', language)}"
                            </p>
                        </div>
                        {/* Subtle background glow */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:bg-white/10 transition-colors duration-700"></div>
                    </div>

                    {/* Gro Visual Card */}
                    <div className="flex-1 group relative p-10 md:p-12 bg-gray-50 border border-gray-100 rounded-[2rem] overflow-hidden hover:shadow-2xl transition-all duration-700 hover:-translate-y-2">
                        <div className="relative z-10">
                            <h4 className="text-xs font-mono uppercase tracking-[0.4em] mb-8 text-gray-400">
                                {t('slogan.agencies.title', language)}
                            </h4>
                            <h3 className="text-3xl font-black uppercase mb-6 tracking-tighter text-black">
                                {t('slogan.agencies.gro.name', language)}
                            </h3>
                            <div className="h-[2px] w-12 bg-black/10 mb-8 group-hover:w-24 transition-all duration-500"></div>

                            <p className="text-lg font-bold text-black mb-6 uppercase tracking-tight">
                                {t('slogan.agencies.gro.focus', language)}
                            </p>

                            <p className="text-base font-light text-gray-500 leading-relaxed italic">
                                "{t('slogan.agencies.gro.desc', language)}"
                            </p>
                        </div>
                        {/* Subtle background decoration */}
                        <div className="absolute bottom-0 right-0 w-64 h-64 bg-gray-200/50 rounded-full blur-[100px] translate-y-1/2 translate-x-1/2 group-hover:bg-gray-200 transition-colors duration-700"></div>
                    </div>
                </div>
            </div>

            {/* Slogan Container - Aggressive spacing fix */}
            <div className="container mx-auto max-w-6xl py-32 md:py-48 slogan-reveal border-t border-black/5 mt-12">
                <div className="max-w-4xl">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black leading-[1.05] tracking-tight uppercase">
                        {t('slogan.headline', language)}
                    </h2>
                </div>
            </div>

            {/* Services Grid */}
            <div className="container mx-auto max-w-6xl">
                <div className="flex justify-between items-end mb-16 border-b-2 border-black pb-6">
                    <h3 className="text-xs font-black uppercase tracking-[0.3em]">{t('slogan.services', language)}</h3>
                    <span className="text-xs font-mono">Service List // 2024</span>
                </div>

                <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <div key={index} className="group relative p-10 border border-gray-100 hover:border-transparent transition-all duration-500 bg-gray-50 hover:shadow-2xl hover:-translate-y-2 rounded-3xl overflow-hidden h-[400px] flex flex-col justify-between">

                            {/* Background Image on Hover */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                                <img
                                    src={service.image}
                                    alt={t(service.titleKey, language)}
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
                                />
                                <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors duration-500"></div>
                            </div>

                            <div className="relative z-10">
                                <div className="text-5xl font-black text-gray-200 mb-8 group-hover:text-white/20 transition-colors duration-500">
                                    {service.icon}
                                </div>
                                <h4 className="text-2xl font-bold mb-4 uppercase tracking-tight group-hover:text-white transition-colors duration-300">{t(service.titleKey, language)}</h4>
                                <p className="text-gray-500 leading-relaxed text-sm group-hover:text-white/80 transition-colors duration-300">{t(service.descKey, language)}</p>
                            </div>

                            <div className="relative z-10 self-end opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                                <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
