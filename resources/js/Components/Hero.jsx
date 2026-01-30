import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Hero = () => {
    const heroRef = useRef(null);
    const topSectionRef = useRef(null);
    const bottomSectionRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Initial states
            gsap.set('.premium-element', { opacity: 0, y: 30 });

            const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.2 } });

            tl.from(topSectionRef.current, {
                y: -100,
                opacity: 0,
                duration: 1.5
            })
                .from('.hero-logo-container', {
                    scale: 0.9,
                    opacity: 0,
                    duration: 1.5
                }, '-=1.2')
                .to('.premium-element', {
                    opacity: 1,
                    y: 0,
                    stagger: 0.1,
                    duration: 1
                }, '-=1');

            // Floating animation for pages
            gsap.to('.floating-page', {
                y: -15,
                duration: 4,
                repeat: -1,
                yoyo: true,
                stagger: 0.4,
                ease: 'sine.inOut'
            });

            // Interactive effect on logo (magnetic feel)
            const logo = document.querySelector('.hero-logo-container');
            if (logo) {
                const handleMouseMove = (e) => {
                    const rect = logo.getBoundingClientRect();
                    const x = (e.clientX - rect.left) / rect.width - 0.5;
                    const y = (e.clientY - rect.top) / rect.height - 0.5;
                    gsap.to('.hero-cube', {
                        rotationY: x * 25,
                        rotationX: -y * 25,
                        transformPerspective: 1000,
                        duration: 0.6
                    });
                };
                const handleMouseLeave = () => {
                    gsap.to('.hero-cube', { rotationY: 0, rotationX: 0, duration: 1.2, ease: 'elastic.out(1, 0.3)' });
                };
                logo.addEventListener('mousemove', handleMouseMove);
                logo.addEventListener('mouseleave', handleMouseLeave);
                return () => {
                    logo.removeEventListener('mousemove', handleMouseMove);
                    logo.removeEventListener('mouseleave', handleMouseLeave);
                };
            }
        }, heroRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={heroRef} className="relative min-h-screen bg-[#0a0a0a] overflow-hidden">
            {/* White Top Section - The Premium Stage */}
            <div
                ref={topSectionRef}
                className="relative bg-white pt-28 pb-48 rounded-b-[120px] md:rounded-b-[240px] shadow-[0_10px_60px_rgba(0,0,0,0.08)] z-10 mx-2 mt-2 rounded-t-[50px] overflow-hidden"
            >
                {/* Subtle Grid Pattern for Technical Feel */}
                <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

                <div className="container mx-auto px-6 flex flex-col items-center relative z-10">
                    <div className="hero-logo-container relative w-full max-w-2xl flex justify-center">
                        {/* Soft Ambient Glow */}
                        <div className="absolute inset-0 bg-blue-600/[0.03] blur-[120px] rounded-full scale-150"></div>

                        <img
                            src="/images/logo-3d-user.png"
                            alt="Dark and Bright 3D Logo"
                            className="hero-cube w-full h-auto max-w-[640px] object-contain drop-shadow-[0_45px_75px_rgba(0,0,0,0.18)] z-10"
                        />
                    </div>

                    <div className="mt-14 text-center premium-element">
                        <span className="px-6 py-2 rounded-full bg-black/[0.03] text-black/40 text-[10px] font-bold uppercase tracking-[0.4em] mb-4 inline-block border border-black/[0.05]">
                            Elite Web Development Suite
                        </span>
                    </div>
                </div>
            </div>

            {/* Dark Bottom Section - The Serious Messaging */}
            <div
                ref={bottomSectionRef}
                className="container mx-auto px-6 py-36 md:py-52 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center relative"
            >
                <div className="space-y-14">
                    <div className="space-y-8">
                        <h1 className="premium-element text-7xl md:text-[115px] font-black text-white tracking-tighter leading-[0.82] uppercase">
                            PRESISI <span className="text-white/20">&</span><br />
                            PROFESIONAL.
                        </h1>
                        <p className="premium-element text-white/70 text-xl md:text-3xl font-light max-w-2xl leading-relaxed">
                            Dark and Bright adalah solusi nyata bagi perusahaan yang membutuhkan website
                            dengan <span className="text-white font-medium italic underline decoration-blue-500/50 underline-offset-8">integritas tinggi</span>.
                            Kami mengatasi hambatan koding kompleks untuk memastikan bisnis Anda mendominasi ranah digital.
                        </p>
                    </div>

                    <div className="premium-element flex flex-wrap gap-8 pt-6">
                        <a href="#contact" className="px-12 py-6 bg-white text-black font-black rounded-full hover:bg-gray-100 transition-colors duration-300 shadow-[0_20px_40px_rgba(255,255,255,0.1)] text-sm uppercase tracking-widest">
                            Mulai Konsultasi Serius
                        </a>
                        <a href="#portfolio" className="px-12 py-6 bg-white/5 text-white font-bold rounded-full border border-white/10 hover:bg-white/10 transition-all duration-300 backdrop-blur-md text-sm uppercase tracking-widest">
                            Eksplorasi Solusi
                        </a>
                    </div>
                </div>

                <div className="hidden lg:flex justify-end relative premium-element">
                    {/* Visual representation of structural integrity */}
                    <div className="relative w-[480px] h-[480px]">
                        <div className="floating-page absolute top-0 right-0 w-80 h-[500px] bg-white rounded-[2rem] shadow-2xl rotate-[-25deg] translate-x-24 border border-white/10 opacity-30 backdrop-blur-xl"></div>
                        <div className="floating-page absolute top-0 right-0 w-80 h-[500px] bg-white rounded-[2rem] shadow-2xl rotate-[-15deg] translate-x-12 border border-white/10 opacity-60 backdrop-blur-md"></div>
                        <div className="floating-page absolute top-0 right-0 w-80 h-[500px] bg-white rounded-[2rem] shadow-2xl rotate-[-5deg] border border-white/20 bg-gradient-to-br from-white to-gray-50 p-10 flex flex-col">
                            <div className="flex gap-2 mb-8">
                                <div className="w-3 h-3 bg-red-400/20 rounded-full"></div>
                                <div className="w-3 h-3 bg-yellow-400/20 rounded-full"></div>
                                <div className="w-3 h-3 bg-green-400/20 rounded-full"></div>
                            </div>
                            <div className="w-full h-5 bg-black/[0.03] rounded-lg mb-4"></div>
                            <div className="w-4/5 h-5 bg-black/[0.03] rounded-lg mb-4"></div>
                            <div className="w-full h-40 bg-gray-100/50 rounded-3xl border border-black/[0.03] mt-auto"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Subtle glow in the distance */}
            <div className="absolute bottom-[-10%] left-[-10%] w-[1000px] h-[1000px] bg-blue-500/[0.02] blur-[200px] rounded-full pointer-events-none"></div>
        </section>
    );
};

export default Hero;
