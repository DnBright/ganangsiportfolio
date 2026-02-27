import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useLanguage } from '../Contexts/LanguageContext';
import { t } from '../translations';
import axios from 'axios';

const Hero = () => {
    const heroRef = useRef(null);
    const { language } = useLanguage();

    useEffect(() => {
        try {
            axios.post('/analytics/increment', { key: 'total_visits' });
        } catch (error) {
            console.error('Failed to track visit:', error);
        }
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            gsap.set(".hero-fade", { y: 30, opacity: 0 });
            gsap.set(".hero-logo", { scale: 0.9, opacity: 0 });

            tl.to(".hero-fade", { y: 0, opacity: 1, duration: 1, stagger: 0.15 })
                .to(".hero-logo", { scale: 1, opacity: 1, duration: 1.5, ease: "power2.out" }, "-=0.8");

        }, heroRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={heroRef} className="relative min-h-[90vh] w-full flex flex-col items-center justify-center bg-white text-black overflow-hidden pt-24 px-6">

            {/* Minimalist Grid Pattern Background */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
            </div>

            <div className="relative z-10 flex flex-col items-center text-center max-w-5xl w-full">

                {/* Branding Label */}
                <div className="hero-fade mb-8">
                    <span className="inline-block px-4 py-1.5 rounded-full border border-black/10 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-black/60 bg-white/80 backdrop-blur-sm">
                        {t('hero.branding1', language)}
                    </span>
                </div>

                {/* Main Typography */}
                <h1 className="hero-fade text-[12vw] md:text-[8vw] font-black leading-[0.85] tracking-tighter uppercase mb-6">
                    <span className="block text-black">DARK AND</span>
                    <span className="block text-gray-400">BRIGHT.</span>
                </h1>

                {/* Subtitle */}
                <p className="hero-fade text-lg md:text-2xl text-gray-600 font-medium max-w-2xl mb-12 hover:text-black transition-colors leading-relaxed">
                    {t('hero.dark', language)} — {t('hero.bright', language)}
                </p>

                {/* Actions */}
                <div className="hero-fade flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    <a href="#portfolio" className="px-10 py-4 bg-black text-white rounded-full font-bold uppercase tracking-widest text-xs hover:bg-black/80 hover:-translate-y-1 transition-all duration-300 text-center shadow-lg shadow-black/10">
                        {t('actions.projects', language)}
                    </a>
                    <a href="#contact" className="px-10 py-4 bg-white text-black border border-black/10 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-gray-50 hover:-translate-y-1 transition-all duration-300 text-center shadow-sm">
                        {t('actions.discuss', language)}
                    </a>
                </div>
            </div>

            {/* Central 3D Logo Element (Positioned cleanly) */}
            <div className="hero-logo absolute bottom-0 md:bottom-[-10%] right-[-10%] md:right-[5%] w-[60vw] md:w-[40vw] max-w-[500px] pointer-events-none opacity-10 md:opacity-20 z-0">
                <img
                    src="/images/logo-3d-user.png"
                    alt="Logo Core"
                    className="w-full h-auto object-contain filter grayscale"
                />
            </div>

            {/* Scroll Indicator */}
            <div className="hero-fade absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-black/40">Scroll</span>
                <div className="w-[1px] h-8 bg-black/20"></div>
            </div>
        </section>
    );
};

export default Hero;
