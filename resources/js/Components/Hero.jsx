import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Hero = () => {
    const heroRef = useRef(null);
    const contentRef = useRef(null);
    const lightRef = useRef(null);

    useEffect(() => {
        // Subtle entry animation
        const ctx = gsap.context(() => {
            gsap.from(contentRef.current.children, {
                y: 30,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: 'power3.out'
            });

            // Subtle light movement
            gsap.to(lightRef.current, {
                x: '20%',
                y: '10%',
                duration: 8,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut'
            });
        }, heroRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={heroRef}
            className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#060010] text-white px-6 pt-20"
        >
            {/* Background Accents */}
            <div
                ref={lightRef}
                className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none"
            />
            <div
                className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-900/10 blur-[100px] pointer-events-none"
            />

            {/* Grid Pattern overlay */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-50 pointer-events-none" />

            <div ref={contentRef} className="relative z-10 max-w-5xl w-full text-center space-y-8">
                <div className="flex justify-center mb-8">
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                        <img
                            src="/images/logo-dnb.png"
                            alt="Dark and Bright Logo"
                            className="relative w-24 h-24 md:w-32 md:h-32 object-contain"
                        />
                    </div>
                </div>

                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/5 text-blue-400 text-xs font-medium uppercase tracking-widest mb-4">
                    <span className="relative flex h-2 w-2 mr-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                    </span>
                    Enterprise Digital Strategy
                </div>

                <h1 className="text-5xl md:text-8xl font-black tracking-tight leading-[1.0] uppercase">
                    Digital Stagnation is <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-200 to-indigo-300">
                        A Business Liability.
                    </span>
                </h1>

                <p className="text-lg md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-light">
                    Scale your legacy. We bridge the gap between fragmented digital footprints and <span className="text-white font-medium">high-performance enterprise dominance.</span>
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                    <a
                        href="/contact"
                        className="group relative px-8 py-4 bg-white text-black font-semibold rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95"
                    >
                        <span className="relative z-10">Start Your Transition</span>
                        <div className="absolute inset-0 bg-blue-400 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    </a>

                    <a
                        href="/services"
                        className="px-8 py-4 border border-white/10 rounded-full font-medium hover:bg-white/5 transition-colors"
                    >
                        Explore Solutions
                    </a>
                </div>

                {/* Modular elements / Trust badges */}
                <div className="pt-20 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-40">
                    <div className="text-sm font-mono tracking-tighter uppercase">01. Strategy</div>
                    <div className="text-sm font-mono tracking-tighter uppercase">02. Engineering</div>
                    <div className="text-sm font-mono tracking-tighter uppercase">03. Performance</div>
                    <div className="text-sm font-mono tracking-tighter uppercase">04. Scalability</div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
