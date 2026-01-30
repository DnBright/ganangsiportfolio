import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagicBentoCard from './MagicBentoCard';
import { useLanguage } from '../Contexts/LanguageContext';
import { t } from '../translations';

gsap.registerPlugin(ScrollTrigger);

const solutions = [
    {
        titleKey: "solutions.education.title",
        descKey: "solutions.education.desc",
        icon: "🎓",
        image: "/images/solutions/education.png"
    },
    {
        titleKey: "solutions.business.title",
        descKey: "solutions.business.desc",
        icon: "🏢",
        image: "/images/solutions/business.png"
    },
    {
        titleKey: "solutions.digitalization.title",
        descKey: "solutions.digitalization.desc",
        icon: "⚡",
        image: "/images/solutions/digitalization.png"
    },
    {
        titleKey: "solutions.custom.title",
        descKey: "solutions.custom.desc",
        icon: "🎯",
        image: "/images/solutions/custom.png"
    }
];

const Solutions = () => {
    const sectionRef = useRef(null);
    const headerRef = useRef(null);
    const gridRef = useRef(null);
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

            tl.from(headerRef.current, {
                y: 50,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            })
                .from(gridRef.current.children, {
                    y: 50,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power3.out"
                }, "-=0.5");

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="w-full bg-white text-black py-24 px-6 md:px-12 lg:px-24">
            <div className="max-w-7xl mx-auto">
                <div ref={headerRef} className="mb-20">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">{t('solutions.headline', language)}</h2>
                    <h3 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                        {t('solutions.subtitle', language)}
                    </h3>
                </div>

                <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    {solutions.map((item, index) => (
                        <MagicBentoCard key={index} image={item.image} className="h-full group">
                            <div className="h-full p-8 flex flex-col items-start justify-start">
                                <div className="text-4xl mb-6">{item.icon}</div>
                                <h4 className="text-2xl font-bold mb-4 translate-x-0 group-hover:translate-x-2 transition-transform duration-300">{t(item.titleKey, language)}</h4>
                                <p className="text-gray-600 leading-relaxed">
                                    {t(item.descKey, language)}
                                </p>
                            </div>
                        </MagicBentoCard>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Solutions;
