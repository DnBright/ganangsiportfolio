import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../Contexts/LanguageContext';
import { t } from '../translations';

gsap.registerPlugin(ScrollTrigger);

const PortfolioShowcase = ({ portfolios = [] }) => {
    const sectionRef = useRef(null);
    const containerRef = useRef(null);
    const { language } = useLanguage();

    // Hardcoded projects as requested by user
    const displayPortfolios = [
        { title: "PT Saitama Juara Mendunia", category: "Corporate Global", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80" },
        { title: "Kursus Jepang", category: "Education Platform", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80" },
        { title: "Ayaka", category: "Beauty & Wellness", image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80" },
        { title: "AKAB", category: "Technology Systems", image: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&w=1200&q=80" }
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (window.innerWidth > 768) {
                const totalWidth = containerRef.current.scrollWidth;
                const windowWidth = window.innerWidth;

                // Horizontal Scroll Animation
                gsap.to(containerRef.current, {
                    x: () => -(totalWidth - windowWidth + 100), // Scroll until end with padding
                    ease: "none",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top top",
                        end: () => `+=${totalWidth}`,
                        pin: true,
                        scrub: 1,
                        anticipatePin: 1
                    }
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, [displayPortfolios]);

    return (
        <section ref={sectionRef} className="relative bg-[#0a0a0a] text-white overflow-hidden">
            {/* Context Header (Absolute) */}
            <div className="absolute top-10 left-6 md:left-12 z-20 mix-blend-difference">
                <span className="text-xs font-mono uppercase tracking-[0.3em] text-white/40">
                    {t('portfolio.scroll', language)}
                </span>
            </div>

            {/* Horizontal Scroll Container */}
            <div className="h-screen w-full flex items-center overflow-hidden">
                <div
                    ref={containerRef}
                    className="flex gap-12 md:gap-24 px-6 md:px-24 items-center"
                    style={{ width: 'max-content' }}
                >
                    {/* Intro Card */}
                    <div className="w-[80vw] md:w-[40vw] flex-shrink-0">
                        <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9] mb-8">
                            {t('portfolio.featured', language)}
                        </h2>
                        <p className="text-base md:text-lg text-white/60 max-w-2xl leading-relaxed">
                            {t('portfolio.subtitle', language)}
                        </p>
                        <div className="mt-12 flex items-center gap-4 animate-pulse">
                            <span className="text-xs uppercase tracking-widest">{t('portfolio.scroll', language)}</span>
                            <div className="h-[1px] w-12 bg-white"></div>
                        </div>
                    </div>

                    {/* Portfolio Cards */}
                    {displayPortfolios.map((item, index) => (
                        <div
                            key={index}
                            className="group relative w-[85vw] md:w-[60vw] h-[60vh] md:h-[70vh] flex-shrink-0 bg-gray-900 overflow-hidden"
                        >
                            {/* Image with Parallax Hover */}
                            <div className="absolute inset-0 overflow-hidden">
                                <img
                                    src={item.image && item.image.startsWith('http') ? item.image : (item.image ? `/storage/${item.image}` : `https://source.unsplash.com/random/1200x800?sig=${index}`)}
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-60 group-hover:opacity-100"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
                            </div>

                            {/* Content Overlay */}
                            <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between z-10">
                                <div className="flex justify-between items-start">
                                    <span className="text-xs font-mono border border-white/20 px-3 py-1 rounded-full backdrop-blur-md">
                                        {item.category || 'Development'}
                                    </span>
                                    <span className="text-4xl font-black opacity-20">0{index + 1}</span>
                                </div>

                                <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                                    <h3 className="text-4xl md:text-6xl font-black uppercase leading-none mb-4 mix-blend-difference">
                                        {item.title}
                                    </h3>
                                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                        <a href="#" className="inline-flex items-center gap-2 text-sm uppercase tracking-widest hover:underline underline-offset-4">
                                            {t('portfolio.viewCase', language)}
                                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M5 12h14M12 5l7 7-7 7" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Outro / View All */}
                    <div className="w-[50vw] md:w-[30vw] flex-shrink-0 flex items-center justify-center">
                        <a
                            href="/portfolio"
                            className="group relative w-48 h-48 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-500"
                        >
                            <span className="text-sm font-black uppercase tracking-widest relative z-10">{t('portfolio.viewAll', language)}</span>
                            <div className="absolute inset-0 bg-white rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 ease-out"></div>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PortfolioShowcase;
