import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../Contexts/LanguageContext';
import { t } from '../translations';
import SaitamaSimulation from './SaitamaSimulation';
import KursusJepangSimulation from './KursusJepangSimulation';
import AyakaSimulation from './AyakaSimulation';
import AkabSimulation from './AkabSimulation';
import { AnimatePresence } from 'framer-motion';
import axios from 'axios';

gsap.registerPlugin(ScrollTrigger);

const PortfolioShowcase = ({ portfolios = [] }) => {
    const sectionRef = useRef(null);
    const containerRef = useRef(null);
    const { language } = useLanguage();
    const [isSaitamaOpen, setIsSaitamaOpen] = useState(false);
    const [isKursusOpen, setIsKursusOpen] = useState(false);
    const [isAyakaOpen, setIsAyakaOpen] = useState(false);
    const [isAkabOpen, setIsAkabOpen] = useState(false);

    const trackClick = (id) => {
        try {
            axios.post('/analytics/increment', { key: `click_${id}` });
        } catch (error) {
            console.error('Failed to track click:', error);
        }
    };

    // Hardcoded projects as requested by user
    const displayPortfolios = [
        { id: 'saitama', title: "PT Saitama Juara Mendunia", category: "Corporate Global", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80" },
        { id: 'kursus', title: "Kursus Jepang", category: "Education Platform", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80" },
        { id: 'ayaka', title: "Ayaka Josei Center", category: "Japanese Recruitment", image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80" },
        { id: 'akab', title: "AKAB", category: "Technology Systems", image: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&w=1200&q=80" }
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

            {/* Scroll Down Indicator - Enhanced */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-4">
                {/* Pulsing Glow Background */}
                <div className="absolute inset-0 bg-gradient-to-t from-red-500/30 to-transparent blur-2xl animate-pulse"></div>

                {/* Main Content */}
                <div className="relative flex flex-col items-center gap-3 animate-bounce">
                    <div className="text-center bg-black/40 backdrop-blur-sm px-6 py-3 rounded-2xl border-2 border-red-500/50 shadow-lg shadow-red-500/20">
                        <p className="text-sm font-black uppercase tracking-[0.3em] text-white mb-1 drop-shadow-lg">
                            Scroll Down
                        </p>
                        <p className="text-xs text-red-400 font-bold animate-pulse">
                            untuk melihat portfolio lainnya
                        </p>
                    </div>

                    {/* Animated Arrows Stack */}
                    <div className="flex flex-col -space-y-2">
                        <svg className="w-8 h-8 text-red-500 animate-bounce" style={{ animationDelay: '0ms' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                        <svg className="w-8 h-8 text-red-400 animate-bounce" style={{ animationDelay: '150ms' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                        <svg className="w-8 h-8 text-red-300 animate-bounce" style={{ animationDelay: '300ms' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </div>

                    {/* Enhanced Mouse Scroll Icon */}
                    <div className="w-8 h-12 border-3 border-red-500 rounded-full flex justify-center pt-2 bg-black/60 shadow-lg shadow-red-500/30 animate-pulse">
                        <div className="w-1.5 h-3 bg-red-500 rounded-full animate-bounce"></div>
                    </div>
                </div>
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
                            className={`group relative w-[85vw] md:w-[60vw] h-[60vh] md:h-[70vh] flex-shrink-0 bg-gray-900 overflow-hidden cursor-pointer rounded-2xl md:rounded-3xl border border-white/5`}
                            onClick={() => {
                                if (item.id === 'saitama') {
                                    setIsSaitamaOpen(true);
                                    trackClick('saitama');
                                }
                                if (item.id === 'kursus') {
                                    setIsKursusOpen(true);
                                    trackClick('kursus_jepang');
                                }
                                if (item.id === 'ayaka') {
                                    setIsAyakaOpen(true);
                                    trackClick('ayaka');
                                }
                                if (item.id === 'akab') {
                                    setIsAkabOpen(true);
                                    trackClick('akab');
                                }
                            }}
                        >
                            {/* Image with Parallax Hover */}
                            <div className="absolute inset-0 overflow-hidden">
                                <img
                                    src={item.image && item.image.startsWith('http') ? item.image : (item.image ? `/storage/${item.image}` : `https://source.unsplash.com/random/1200x800?sig=${index}`)}
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-60 group-hover:opacity-100"
                                />
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-500"></div>
                            </div>

                            {/* Content Overlay */}
                            <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between z-10">
                                <div className="flex justify-between items-start">
                                    <span className="text-[10px] md:text-xs font-mono border border-white/20 px-3 py-1 rounded-full backdrop-blur-md bg-white/5 uppercase tracking-widest">
                                        {item.category || 'Development'}
                                    </span>

                                    {/* Prominent Play Badge for Simulations */}
                                    {(item.id === 'saitama' || item.id === 'kursus' || item.id === 'ayaka' || item.id === 'akab') && (
                                        <div className="absolute top-8 right-8 md:top-12 md:right-12 animate-pulse">
                                            <div className="bg-[#E60012] text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg shadow-red-600/40 group-hover:scale-110 transition-transform">
                                                <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M8 5v14l11-7z" />
                                                </svg>
                                            </div>
                                            <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-black uppercase tracking-widest whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                                                Try Demo
                                            </span>
                                        </div>
                                    )}

                                    <span className="text-4xl md:text-6xl font-black opacity-10 font-mono tracking-tighter self-start">0{index + 1}</span>
                                </div>

                                <div className="transform md:translate-y-8 md:group-hover:translate-y-0 transition-transform duration-500">
                                    <h3 className="text-4xl md:text-7xl font-black uppercase leading-none mb-6 mix-blend-difference tracking-tighter">
                                        {item.title}
                                    </h3>

                                    {/* Always visible action area */}
                                    <div className="flex items-center gap-4 mt-6">
                                        {item.id === 'saitama' || item.id === 'kursus' || item.id === 'ayaka' || item.id === 'akab' ? (
                                            <button className="bg-white text-black px-8 py-4 rounded-full text-xs font-black uppercase tracking-widest hover:scale-105 transition-transform active:scale-95 flex items-center gap-3 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]">
                                                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                                                Coba Simulation Live
                                                <svg className="w-4 h-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                                </svg>
                                            </button>
                                        ) : (
                                            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest hover:underline underline-offset-4 font-black text-white/80 group-hover:text-white transition-colors">
                                                {t('portfolio.viewCase', language)}
                                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                                </svg>
                                            </div>
                                        )}
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

            <AnimatePresence>
                {isSaitamaOpen && (
                    <SaitamaSimulation onClose={() => setIsSaitamaOpen(false)} />
                )}
                {isKursusOpen && (
                    <KursusJepangSimulation onClose={() => setIsKursusOpen(false)} />
                )}
                {isAyakaOpen && (
                    <AyakaSimulation onClose={() => setIsAyakaOpen(false)} />
                )}
                {isAkabOpen && (
                    <AkabSimulation onClose={() => setIsAkabOpen(false)} />
                )}
            </AnimatePresence>
        </section>

    );
};

export default PortfolioShowcase;
