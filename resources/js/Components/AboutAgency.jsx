import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../Contexts/LanguageContext';
import { t } from '../translations';

gsap.registerPlugin(ScrollTrigger);

const AboutAgency = () => {
    const sectionRef = useRef(null);
    const statsRef = useRef(null);
    const { language } = useLanguage();

    useEffect(() => {
        const ctx = gsap.context(() => {
            // General entrance animations
            gsap.from(".about-visual", {
                x: -100,
                opacity: 0,
                duration: 1.5,
                ease: "expo.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                }
            });

            gsap.from(".about-content-stagger", {
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.15,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 60%",
                }
            });

            // Stats counters animation
            const counters = document.querySelectorAll(".stat-value");
            counters.forEach(counter => {
                const target = parseInt(counter.dataset.target);
                gsap.to(counter, {
                    innerText: target,
                    duration: 2,
                    snap: { innerText: 1 },
                    scrollTrigger: {
                        trigger: statsRef.current,
                        start: "top 85%",
                    }
                });
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const statItems = [
        { label: 'stats.projects', target: 250, suffix: '+' },
        { label: 'stats.clients', target: 120, suffix: '+' },
        { label: 'stats.years', target: 5, suffix: '' }
    ];

    return (
        <section ref={sectionRef} className="w-full bg-white text-black py-24 md:py-40 px-6 md:px-12 lg:px-24 overflow-hidden">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">

                {/* Visual Side */}
                <div className="about-visual lg:col-span-5 relative">
                    <div className="aspect-[4/5] rounded-[2rem] bg-gray-100 overflow-hidden relative border border-black/5 shadow-2xl">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent mix-blend-overlay"></div>
                        {/* Placeholder for professional team photo */}
                        <div className="w-full h-full flex items-center justify-center bg-[#07070a]">
                            <img
                                src="/images/logo-3d-user.png"
                                alt="Agency Spirit"
                                className="w-1/2 opacity-20 filter grayscale brightness-200"
                            />
                        </div>
                    </div>
                    {/* Floating Badge */}
                    <div className="absolute -bottom-10 -right-6 md:-right-10 bg-black text-white p-8 rounded-3xl shadow-2xl hidden md:block">
                        <div className="text-[10px] uppercase tracking-[0.3em] opacity-40 mb-2">Since</div>
                        <div className="font-black text-4xl font-display leading-none">2019</div>
                    </div>
                </div>

                {/* Content Side */}
                <div className="lg:col-span-7 flex flex-col">
                    <span className="about-content-stagger text-blue-600 font-bold text-xs tracking-[0.4em] uppercase mb-6 block">
                        {t('nav.about', language)}
                    </span>

                    <h2 className="about-content-stagger text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] mb-12 uppercase">
                        {t('about.title', language)}
                    </h2>

                    <div className="about-content-stagger space-y-8 text-lg text-gray-500 font-medium leading-relaxed max-w-2xl mb-16">
                        <p>{t('about.desc1', language)}</p>
                        <p>{t('about.desc2', language)}</p>
                    </div>

                    {/* Stats Grid */}
                    <div ref={statsRef} className="about-content-stagger grid grid-cols-2 md:grid-cols-3 gap-8 border-t border-black/5 pt-12">
                        {statItems.map((stat, i) => (
                            <div key={i}>
                                <div className="text-4xl md:text-5xl font-black mb-2 flex items-baseline">
                                    <span className="stat-value" data-target={stat.target}>0</span>
                                    <span className="text-blue-600">{stat.suffix}</span>
                                </div>
                                <div className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-400">
                                    {t(stat.label, language)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default AboutAgency;
