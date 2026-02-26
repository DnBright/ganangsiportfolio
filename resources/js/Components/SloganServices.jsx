import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../Contexts/LanguageContext';
import { t } from '../translations';

gsap.registerPlugin(ScrollTrigger);

const SloganServices = () => {
    const sectionRef = useRef(null);
    const textRef = useRef(null);
    const gridRef = useRef(null);
    const { language } = useLanguage();

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Slogan Reveal
            gsap.from(textRef.current.children, {
                scrollTrigger: {
                    trigger: textRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                },
                y: 100,
                opacity: 0,
                duration: 1.5,
                stagger: 0.1,
                ease: "power4.out"
            });

            // Services Grid Reveal
            // gsap.from(gridRef.current.children, {
            //     scrollTrigger: {
            //         trigger: gridRef.current,
            //         start: "top 85%",
            //     },
            //     y: 50,
            //     opacity: 0,
            //     duration: 1,
            //     stagger: 0.2,
            //     ease: "power3.out"
            // });

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
        <section ref={sectionRef} className="bg-white text-black py-32 md:py-48 px-6 relative overflow-hidden">
            {/* Slogan Container */}
            <div className="container mx-auto max-w-6xl mb-32">
                <div ref={textRef} className="overflow-hidden">
                    <div className="flex flex-col gap-6 mb-16">
                        <h4 className="text-xs md:text-sm font-black uppercase tracking-[0.5em] text-gray-400">
                            {t('hero.branding1', language)}
                        </h4>
                        <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight uppercase">
                            {t('slogan.headline', language)}
                        </h2>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-500 max-w-4xl border-l-2 border-black pl-6">
                        {t('hero.branding2', language).split('|').map((service, idx) => (
                            <React.Fragment key={idx}>
                                <span>{service.trim()}</span>
                                {idx < t('hero.branding2', language).split('|').length - 1 && (
                                    <span className="text-black/20">•</span>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
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
