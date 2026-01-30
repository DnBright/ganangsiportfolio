import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SloganServices = () => {
    const sectionRef = useRef(null);
    const textRef = useRef(null);
    const gridRef = useRef(null);

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
            gsap.from(gridRef.current.children, {
                scrollTrigger: {
                    trigger: gridRef.current,
                    start: "top 85%",
                },
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out"
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const services = [
        {
            title: "Web Development",
            desc: "Custom built websites with React & Laravel that perform impeccably.",
            icon: "01"
        },
        {
            title: "Digital Marketing",
            desc: "Strategic campaigns to amplify your brand's digital presence.",
            icon: "02"
        },
        {
            title: "Brand Identity",
            desc: "Forging serious visual identities for professional businesses.",
            icon: "03"
        }
    ];

    return (
        <section ref={sectionRef} className="bg-white text-black py-32 md:py-48 px-6 relative overflow-hidden">
            {/* Slogan Container */}
            <div className="container mx-auto max-w-6xl mb-40">
                <div ref={textRef} className="overflow-hidden">
                    <h2 className="text-4xl md:text-7xl font-black leading-[1.1] tracking-tight uppercase mb-8">
                        Kami membangun <span className="text-transparent bg-clip-text bg-gradient-to-r from-black to-gray-500">solusi digital</span> yang serius
                    </h2>
                    <h2 className="text-4xl md:text-7xl font-black leading-[1.1] tracking-tight uppercase">
                        dengan pendekatan <span className="italic font-serif font-light lowercase">artistik & teknis</span> yang presisi.
                    </h2>
                </div>
            </div>

            {/* Services Grid */}
            <div className="container mx-auto max-w-6xl">
                <div className="flex justify-between items-end mb-16 border-b-2 border-black pb-6">
                    <h3 className="text-xs font-black uppercase tracking-[0.3em]">Our Expertise</h3>
                    <span className="text-xs font-mono">Service List // 2024</span>
                </div>

                <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <div key={index} className="group relative p-10 border border-gray-100 hover:border-black transition-colors duration-500 bg-gray-50 hover:bg-white rounded-3xl">
                            <div className="text-5xl font-black text-gray-200 mb-8 group-hover:text-black transition-colors duration-500">
                                {service.icon}
                            </div>
                            <h4 className="text-2xl font-bold mb-4 uppercase tracking-tight">{service.title}</h4>
                            <p className="text-gray-500 leading-relaxed text-sm">{service.desc}</p>

                            <div className="absolute top-10 right-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-x-4 group-hover:translate-x-0">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                                </svg>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SloganServices;
