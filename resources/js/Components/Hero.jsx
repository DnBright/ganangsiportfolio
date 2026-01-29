import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Hero = () => {
    const heroRef = useRef(null);
    const topSectionRef = useRef(null);
    const bottomSectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(topSectionRef.current, {
                y: -50,
                opacity: 0,
                duration: 1,
                ease: 'power3.out'
            });

            gsap.from('.hero-cube', {
                scale: 0.8,
                opacity: 0,
                duration: 1.2,
                delay: 0.3,
                ease: 'back.out(1.7)'
            });

            gsap.from(bottomSectionRef.current.children, {
                y: 30,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                delay: 0.6,
                ease: 'power3.out'
            });
        }, heroRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={heroRef} className="relative min-h-screen bg-[#1a1616] overflow-hidden">
            {/* White Top Section with Squared edges but very rounded bottom */}
            <div
                ref={topSectionRef}
                className="relative bg-white pt-32 pb-40 rounded-b-[100px] md:rounded-b-[200px] shadow-sm z-10 mx-4 mt-4 rounded-t-[40px]"
            >
                <div className="container mx-auto px-6 flex flex-col items-center">
                    <div className="relative w-full max-w-2xl flex justify-center">
                        <img
                            src="/images/logo-3d-user.png"
                            alt="Dark and Bright 3D Logo"
                            className="hero-cube w-full h-auto max-w-[650px] object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.15)] z-10"
                        />
                    </div>
                </div>
            </div>

            {/* Dark Bottom Section */}
            <div
                ref={bottomSectionRef}
                className="container mx-auto px-6 py-28 md:py-40 grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
            >
                <div className="space-y-10">
                    <h1 className="text-6xl md:text-[100px] font-black text-white tracking-tighter leading-[0.9] uppercase">
                        DARK AND BRIGHT
                    </h1>
                    <p className="text-white/90 text-xl md:text-3xl font-medium max-w-2xl leading-relaxed">
                        Dark and Bright adalah layanan web development yang menghadirkan website
                        modern, responsif, dan selaras dengan branding bisnis. Kami menggabungkan
                        desain yang kuat dan teknologi efisien untuk menciptakan website yang tidak
                        hanya menarik, tetapi juga bekerja optimal.
                    </p>
                </div>

                <div className="hidden md:flex justify-end relative">
                    {/* Overlapping Pages Placeholder using CSS */}
                    <div className="relative w-96 h-96">
                        <div className="absolute top-0 right-0 w-72 h-96 bg-white rounded-2xl shadow-2xl rotate-[-25deg] translate-x-24 border border-gray-100/50 opacity-90"></div>
                        <div className="absolute top-0 right-0 w-72 h-96 bg-white rounded-2xl shadow-2xl rotate-[-15deg] translate-x-12 border border-gray-100/50 opacity-95"></div>
                        <div className="absolute top-0 right-0 w-72 h-96 bg-white rounded-2xl shadow-2xl rotate-[-5deg] border border-gray-100/50"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
