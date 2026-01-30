import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Hero = () => {
    const heroRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "expo.inOut" } });
            const isMobile = window.innerWidth < 768;

            // Reset states for cinematic entrance
            gsap.set(".side-dark", { [isMobile ? 'yPercent' : 'xPercent']: -100 });
            gsap.set(".side-bright", { [isMobile ? 'yPercent' : 'xPercent']: 100 });
            gsap.set(".hero-logo", { scale: 0, opacity: 0, rotateY: 180 });
            gsap.set(".gsap-stagger", { y: 50, opacity: 0 });

            tl.to(".side-dark", { [isMobile ? 'yPercent' : 'xPercent']: 0, duration: 1.8 })
                .to(".side-bright", { [isMobile ? 'yPercent' : 'xPercent']: 0, duration: 1.8 }, "<")
                .to(".hero-logo", { scale: 1, opacity: 1, rotateY: 0, duration: 1.5, ease: "back.out(1.2)" }, "-=0.8")
                .to(".gsap-stagger", { y: 0, opacity: 1, stagger: 0.15, duration: 1 }, "-=1");

            // Interactive logo movement
            const handleMove = (e) => {
                const { clientX, clientY } = e;
                const x = (clientX / window.innerWidth - 0.5) * 25;
                const y = (clientY / window.innerHeight - 0.5) * 25;
                gsap.to(".hero-logo", { rotationY: x, rotationX: -y, duration: 0.8, ease: "power2.out" });
            };

            window.addEventListener("mousemove", handleMove);
            return () => window.removeEventListener("mousemove", handleMove);
        }, heroRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={heroRef} className="relative h-screen w-full flex flex-col md:flex-row overflow-hidden bg-white">
            {/* Dark & Bright Identity Badge */}
            <div className="absolute top-12 left-1/2 -translate-x-1/2 z-50 gsap-stagger">
                <span className="text-white mix-blend-difference font-black text-[10px] md:text-xs tracking-[0.6em] uppercase opacity-40">
                    Dark & Bright Agency // Precision & Focus
                </span>
            </div>

            {/* DARK Side (Black background, White Text) */}
            <div className="side-dark relative h-1/2 md:h-full w-full md:w-1/2 bg-black flex items-center justify-center md:justify-end md:pr-[12vw] z-10 border-b md:border-b-0 md:border-r border-white/5">
                <div className="gsap-stagger text-right">
                    <h2 className="text-[16vw] md:text-[11vw] font-black text-white leading-[0.8] tracking-tighter uppercase select-none opacity-90">
                        DARK
                    </h2>
                    <p className="text-white/30 text-[10px] md:text-xs font-mono tracking-[0.4em] mt-4 uppercase">
                        Absolute Integrity
                    </p>
                </div>
            </div>

            {/* BRIGHT Side (White background, Black Text) */}
            <div className="side-bright relative h-1/2 md:h-full w-full md:w-1/2 bg-white flex items-center justify-center md:justify-start md:pl-[12vw] z-10">
                <div className="gsap-stagger">
                    <h2 className="text-[16vw] md:text-[11vw] font-black text-black leading-[0.8] tracking-tighter uppercase select-none opacity-90">
                        BRIGHT
                    </h2>
                    <p className="text-black/30 text-[10px] md:text-xs font-mono tracking-[0.4em] mt-4 uppercase">
                        Digital Clarity
                    </p>
                </div>
            </div>

            {/* The 3D Logo Centerpiece */}
            <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                <div className="hero-logo w-[28vh] h-[28vh] md:w-[55vh] md:h-[55vh] flex items-center justify-center pointer-events-auto">
                    <img
                        src="/images/logo-3d-user.png"
                        alt="Dark and Bright"
                        className="w-full h-auto object-contain drop-shadow-[0_0_80px_rgba(255,255,255,0.12)]"
                    />
                </div>
            </div>

            {/* Core Message & Action Overlay */}
            <div className="absolute bottom-[8vh] left-0 w-full flex flex-col items-center z-40 px-6">
                <div className="gsap-stagger flex flex-col items-center">
                    <p className="text-white mix-blend-difference text-center max-w-2xl text-base md:text-xl font-light leading-relaxed mb-10 opacity-70 tracking-wide font-medium italic underline decoration-blue-500/50 underline-offset-8">
                        Kami membangun solusi digital yang serius dengan pendekatan artistik dan teknis yang presisi.
                    </p>
                    <div className="flex gap-8 md:gap-12">
                        <a href="#work" className="group relative px-10 md:px-14 py-4 md:py-5 overflow-hidden">
                            <span className="relative z-10 text-white mix-blend-difference font-black uppercase tracking-widest text-[10px] transition-colors duration-500 group-hover:text-black">
                                PROJECTS
                            </span>
                            <div className="absolute inset-0 bg-white translate-y-full transition-transform duration-500 group-hover:translate-y-0"></div>
                            <div className="absolute inset-0 border border-white/30"></div>
                        </a>
                        <a href="#contact" className="group relative px-10 md:px-14 py-4 md:py-5 overflow-hidden bg-white shadow-2xl">
                            <span className="relative z-10 text-black font-black uppercase tracking-widest text-[10px] transition-colors duration-500 group-hover:text-white">
                                DISCUSS
                            </span>
                            <div className="absolute inset-0 bg-black -translate-y-full transition-transform duration-500 group-hover:translate-y-0"></div>
                        </a>
                    </div>
                </div>
            </div>

            {/* Subtle Cinematic Grain */}
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay z-50" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>

            {/* Vertical Scroll Hint */}
            <div className="absolute bottom-10 right-10 md:right-20 z-40 flex flex-col items-center opacity-10">
                <div className="w-[1px] h-20 bg-white mix-blend-difference gsap-stagger"></div>
            </div>
        </section>
    );
};

export default Hero;
