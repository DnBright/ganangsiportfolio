import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useLanguage } from '../Contexts/LanguageContext';
import { t } from '../translations';
import axios from 'axios';

const Hero = () => {
    const heroRef = useRef(null);
    const canvasRef = useRef(null);
    const { language } = useLanguage();

    // Track total visits once on mount
    useEffect(() => {
        try {
            axios.post('/analytics/increment', { key: 'total_visits' });
        } catch (error) {
            console.error('Failed to track visit:', error);
        }
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

            // Initial states
            gsap.set(".hero-bg-accent", { opacity: 0, scale: 0.8 });
            gsap.set(".hero-title-main", { y: 100, opacity: 0 });
            gsap.set(".hero-subtitle", { y: 30, opacity: 0 });
            gsap.set(".hero-logo-center", { scale: 0.5, opacity: 0, filter: "blur(20px)" });
            gsap.set(".gsap-action", { y: 20, opacity: 0 });

            tl.to(".hero-bg-accent", { opacity: 0.6, scale: 1, duration: 2, stagger: 0.5 })
                .to(".hero-logo-center", { scale: 1, opacity: 1, filter: "blur(0px)", duration: 2, ease: "elastic.out(1, 0.75)" }, "-=1.5")
                .to(".hero-title-main", { y: 0, opacity: 1, duration: 1.5 }, "-=1.5")
                .to(".hero-subtitle", { y: 0, opacity: 0.6, duration: 1 }, "-=1")
                .to(".gsap-action", { y: 0, opacity: 1, stagger: 0.2, duration: 0.8 }, "-=0.5");

            // Mouse move parallax
            const handleMove = (e) => {
                const { clientX, clientY } = e;
                const xPos = (clientX / window.innerWidth - 0.5) * 40;
                const yPos = (clientY / window.innerHeight - 0.5) * 40;

                gsap.to(".hero-logo-center", { x: xPos * 0.5, y: yPos * 0.5, rotationY: xPos * 0.2, rotationX: -yPos * 0.2, duration: 1, ease: "power2.out" });
                gsap.to(".hero-bg-accent", { x: -xPos, y: -yPos, duration: 1.5, ease: "power2.out" });
            };

            window.addEventListener("mousemove", handleMove);
            return () => window.removeEventListener("mousemove", handleMove);
        }, heroRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={heroRef} className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#050508]">

            {/* Immersive Background Layers */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="hero-bg-accent absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-blue-600/10 blur-[150px]"></div>
                <div className="hero-bg-accent absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-600/10 blur-[150px]"></div>
            </div>

            {/* Content Container */}
            <div className="relative z-20 flex flex-col items-center text-center px-6 max-w-7xl">

                {/* Branding Top */}
                <span className="gsap-action text-blue-500 font-bold text-[10px] md:text-xs tracking-[0.5em] uppercase mb-6">
                    {t('hero.branding1', language)}
                </span>

                {/* Main Heading Overlaid on Logo */}
                <div className="relative flex items-center justify-center mb-12">
                    <div className="hero-logo-center absolute h-[40vh] md:h-[70vh] w-auto pointer-events-none opacity-40 mix-blend-screen">
                        <img
                            src="/images/logo-3d-user.png"
                            alt="3D Logo"
                            className="h-full w-full object-contain filter brightness-125"
                        />
                    </div>

                    <h1 className="hero-title-main relative z-10 font-black leading-[0.85] tracking-tighter text-white select-none">
                        <span className="block text-[14vw] md:text-[10vw]">DARK</span>
                        <span className="block text-[14vw] md:text-[10vw] text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">BRIGHT</span>
                    </h1>
                </div>

                {/* Subtitle / Core Values */}
                <div className="hero-subtitle mb-12 max-w-2xl">
                    <p className="text-white text-lg md:text-xl font-medium tracking-tight leading-relaxed mb-4">
                        {t('hero.dark', language)} — {t('hero.bright', language)}
                    </p>
                    <p className="text-white/40 text-[10px] md:text-xs font-mono tracking-[0.3em] uppercase">
                        {t('hero.branding2', language)}
                    </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 md:gap-6 mt-4">
                    <a href="#portfolio" className="gsap-action group relative px-12 py-4 bg-white rounded-full overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95">
                        <span className="relative z-10 text-black font-black uppercase tracking-widest text-[11px]">
                            {t('actions.projects', language)}
                        </span>
                    </a>
                    <a href="#contact" className="gsap-action group relative px-12 py-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-full overflow-hidden transition-all duration-300 hover:bg-white/10 hover:scale-105 active:scale-95 text-white">
                        <span className="relative z-10 font-black uppercase tracking-widest text-[11px]">
                            {t('actions.discuss', language)}
                        </span>
                    </a>
                </div>
            </div>

            {/* Cinematic Scanlines / Noise */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay z-50 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-20">
                <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent"></div>
            </div>
        </section>
    );
};

export default Hero;
