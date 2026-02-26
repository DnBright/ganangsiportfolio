import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../Contexts/LanguageContext';
import { t } from '../translations';

gsap.registerPlugin(ScrollTrigger);

const AboutAgency = () => {
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const contentRef = useRef(null);
    const { language } = useLanguage();

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            });

            tl.from(titleRef.current, {
                y: 50,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            })
                .from(contentRef.current.children, {
                    y: 30,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: "power3.out"
                }, "-=0.5");

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="w-full bg-white text-black pt-32 md:pt-48 pb-12 md:pb-24 px-6 md:px-12 lg:px-24 overflow-hidden border-t border-black/[0.03]">
            <div className="max-w-4xl mx-auto">
                <div className="flex flex-col gap-12">
                    <div ref={titleRef}>
                        <h2 className="text-sm font-bold uppercase tracking-[0.4em] text-gray-400 mb-4">
                            {t('nav.about', language)}
                        </h2>
                        <h3 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-[0.9]">
                            {t('about.title', language)}
                        </h3>
                    </div>

                    <div ref={contentRef} className="flex flex-col gap-8 text-lg md:text-xl text-gray-600 leading-relaxed font-light">
                        <p>
                            {t('about.desc1', language)}
                        </p>
                        <p>
                            {t('about.desc2', language)}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-8">
                        <div className="gsap-stagger">
                            <h4 className="text-xl font-black uppercase tracking-tighter mb-4 flex items-center gap-3">
                                <span className="w-8 h-[2px] bg-black"></span>
                                {t('about.vision.title', language)}
                            </h4>
                            <p className="text-gray-600 font-light">
                                {t('about.vision.content', language)}
                            </p>
                        </div>
                        <div className="gsap-stagger">
                            <h4 className="text-xl font-black uppercase tracking-tighter mb-4 flex items-center gap-3">
                                <span className="w-8 h-[2px] bg-black"></span>
                                {t('about.mission.title', language)}
                            </h4>
                            <ul className="flex flex-col gap-3">
                                {(t('about.mission.list', language) || []).map((item, index) => (
                                    <li key={index} className="flex gap-3 text-gray-600 font-light">
                                        <span className="text-black font-black">•</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="w-20 h-[2px] bg-black opacity-20 gsap-stagger mt-8"></div>
                </div>
            </div>
        </section>
    );
};

export default AboutAgency;
