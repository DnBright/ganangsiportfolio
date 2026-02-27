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

    const displayPortfolios = [
        { id: 'saitama', title: "PT Saitama Juara Mendunia", category: "Enterprise Architecture", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80" },
        { id: 'kursus', title: "Kursus Jepang", category: "LMS ecosystem", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80" },
        { id: 'ayaka', title: "Ayaka Josei Center", category: "Recruitment cloud", image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80" },
        { id: 'akab', title: "AKAB Tech Systems", category: "Management software", image: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&w=1200&q=80" }
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (window.innerWidth > 768) {
                const totalWidth = containerRef.current.scrollWidth;
                const windowWidth = window.innerWidth;

                gsap.to(containerRef.current, {
                    x: () => -(totalWidth - windowWidth + 200),
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
        <section ref={sectionRef} id="portfolio-root" className="relative bg-white text-black overflow-hidden border-t border-black/5">

            {/* Progress Header */}
            <div className="absolute top-10 left-6 md:left-24 z-20 flex items-center gap-6">
                <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-black/40">
                    Portfolio Matrix
                </span>
                <div className="h-[1px] w-24 bg-black/10"></div>
                <span className="text-[10px] font-mono text-black/20 uppercase tracking-widest hidden md:block">
                    {t('portfolio.scroll', language)}
                </span>
            </div>

            {/* Horizontal Scroll Area */}
            <div className="h-screen w-full flex items-center md:overflow-hidden no-scrollbar">
                <div
                    ref={containerRef}
                    className="flex gap-12 md:gap-32 px-6 md:px-24 items-center"
                    style={{ width: 'max-content' }}
                >
                    {/* 1. Intro Card - Massive Typography */}
                    <div className="w-[85vw] md:w-[45vw] flex-shrink-0">
                        <span className="text-black/30 font-mono text-xs mb-8 block font-bold uppercase tracking-widest">/ SELECTED WORK</span>
                        <h2 className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-[0.85] mb-12 text-black">
                            {t('portfolio.featured', language)}
                        </h2>
                        <p className="text-xl md:text-2xl text-gray-600 font-normal leading-relaxed max-w-xl">
                            {t('portfolio.subtitle', language)}
                        </p>
                    </div>

                    {/* 2. Portfolio Items - Clean Gallery Style */}
                    {displayPortfolios.map((item, index) => (
                        <div
                            key={index}
                            className="group relative w-[85vw] md:w-[65vw] h-[65vh] md:h-[75vh] flex-shrink-0 bg-gray-100 overflow-hidden rounded-3xl border border-black/5 cursor-pointer"
                            onClick={() => {
                                if (item.id === 'saitama') { setIsSaitamaOpen(true); trackClick('saitama'); }
                                if (item.id === 'kursus') { setIsKursusOpen(true); trackClick('kursus_jepang'); }
                                if (item.id === 'ayaka') { setIsAyakaOpen(true); trackClick('ayaka'); }
                                if (item.id === 'akab') { setIsAkabOpen(true); trackClick('akab'); }
                            }}
                        >
                            {/* Project Image */}
                            <div className="absolute inset-0 overflow-hidden bg-white">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                                />
                                {/* Clean subtle gradient for text readability */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                            </div>

                            {/* Content Layout */}
                            <div className="absolute inset-0 p-8 md:p-16 flex flex-col justify-between z-10">
                                <div className="flex justify-between items-start">
                                    <h4 className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-black bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-sm">
                                        {item.category}
                                    </h4>
                                    <span className="text-6xl md:text-8xl font-black text-white/90 font-display leading-none">
                                        0{index + 1}
                                    </span>
                                </div>

                                <div>
                                    <h3 className="text-4xl md:text-6xl font-black uppercase leading-[1] mb-8 tracking-tighter max-w-2xl text-white">
                                        {item.title}
                                    </h3>

                                    <div className="flex items-center gap-6">
                                        <button className="flex items-center gap-4 bg-white text-black px-8 py-4 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all shadow-lg hover:shadow-xl">
                                            <span>LIVE SIMULATION</span>
                                            <div className="w-6 h-6 rounded-full border border-black/10 flex items-center justify-center bg-gray-50 group-hover:bg-white/10 group-hover:border-white/20">
                                                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                                    <path d="M5 12h14m-7-7l7 7-7 7" />
                                                </svg>
                                            </div>
                                        </button>
                                        <div className="w-[1px] h-8 bg-white/30 hidden md:block"></div>
                                        <span className="text-[10px] font-mono text-white/60 hidden md:block">
                                            ID: {item.id.toUpperCase()}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* 3. Outro - Explore More */}
                    <div className="w-[85vw] md:w-[40vw] flex-shrink-0 flex flex-col items-center text-center">
                        <div className="w-24 h-[1px] bg-black/10 mb-12"></div>
                        <h2 className="text-4xl md:text-6xl font-black uppercase leading-tight mb-12 tracking-tighter text-black">
                            WANT TO SEE THE FULL RANGE?
                        </h2>
                        <a
                            href="/portfolio"
                            className="text-xs font-bold uppercase tracking-[0.4em] border border-black/20 px-12 py-5 rounded-full hover:bg-black hover:text-white transition-all text-black"
                        >
                            {t('portfolio.viewAll', language)}
                        </a>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isSaitamaOpen && <SaitamaSimulation onClose={() => setIsSaitamaOpen(false)} />}
                {isKursusOpen && <KursusJepangSimulation onClose={() => setIsKursusOpen(false)} />}
                {isAyakaOpen && <AyakaSimulation onClose={() => setIsAyakaOpen(false)} />}
                {isAkabOpen && <AkabSimulation onClose={() => setIsAkabOpen(false)} />}
            </AnimatePresence>
        </section>
    );
};

export default PortfolioShowcase;
