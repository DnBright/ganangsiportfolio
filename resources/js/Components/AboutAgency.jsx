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
            gsap.from(".about-fade-up", {
                y: 40,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                }
            });

            const counters = document.querySelectorAll(".stat-value");
            counters.forEach(counter => {
                const target = parseInt(counter.dataset.target);
                gsap.to(counter, {
                    innerText: target,
                    duration: 1.5,
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
        <section ref={sectionRef} id="about-agency-root" className="w-full bg-[#fcfcfc] text-black py-24 md:py-32 px-6 border-b border-black/5">
            <div className="max-w-6xl mx-auto">

                <div className="flex flex-col md:flex-row gap-16 md:gap-24">

                    {/* Left Typography Block */}
                    <div className="md:w-1/2 flex flex-col">
                        <span className="about-fade-up text-black/40 font-bold text-[10px] tracking-[0.3em] uppercase mb-8 block">
                            {t('nav.about', language)}
                        </span>

                        <h2 className="about-fade-up text-4xl md:text-6xl font-black tracking-tight leading-[1.1] mb-8 uppercase text-black">
                            {t('about.title', language)}
                        </h2>

                        <div className="about-fade-up space-y-6 text-base md:text-lg text-gray-600 font-normal leading-relaxed">
                            <p>{t('about.desc1', language)}</p>
                            <p>{t('about.desc2', language)}</p>
                        </div>
                    </div>

                    {/* Right Grid Block (Stats & Visual) */}
                    <div className="md:w-1/2 flex flex-col justify-between">

                        {/* Professional Photo Grid */}
                        <div className="about-fade-up w-full mb-12 grid grid-cols-2 gap-3 h-[40vh] md:h-[50vh]">
                            <div className="rounded-2xl overflow-hidden h-full">
                                <img
                                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80"
                                    alt="Agency Team Meeting"
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                            <div className="flex flex-col gap-3 h-full">
                                <div className="rounded-2xl overflow-hidden flex-1">
                                    <img
                                        src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80"
                                        alt="Digital Strategy"
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                                    />
                                </div>
                                <div className="rounded-2xl overflow-hidden flex-1">
                                    <img
                                        src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80"
                                        alt="Creative Work"
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Clean Stats Grid */}
                        <div ref={statsRef} className="about-fade-up grid grid-cols-3 gap-6 pt-8 border-t border-black/10">
                            {statItems.map((stat, i) => (
                                <div key={i} className="flex flex-col">
                                    <div className="text-3xl md:text-5xl font-black mb-1 text-black tracking-tighter">
                                        <span className="stat-value" data-target={stat.target}>0</span>
                                        <span className="text-gray-400">{stat.suffix}</span>
                                    </div>
                                    <div className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
                                        {t(stat.label, language)}
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutAgency;
