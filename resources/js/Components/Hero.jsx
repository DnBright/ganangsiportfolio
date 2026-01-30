import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Hero = () => {
    const heroRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Simple fade-in animation
            gsap.from(".hero-content", {
                y: 30,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                stagger: 0.2
            });
        }, heroRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={heroRef} className="relative w-full min-h-screen bg-white flex items-center justify-center px-6 md:px-12 lg:px-24 py-24">
            <div className="max-w-6xl mx-auto w-full">

                {/* Logo - Small, Top Left */}
                <div className="hero-content mb-12">
                    <img
                        src="/images/logo-3d-user.png"
                        alt="Dark and Bright"
                        className="w-20 h-20 md:w-24 md:h-24 object-contain opacity-90"
                    />
                </div>

                {/* Main Headline - Problem + Impact Focused */}
                <div className="hero-content max-w-4xl">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-black leading-tight mb-8">
                        Kami Membantu Bisnis dan Institusi <br />
                        <span className="text-gray-600">Mengurangi Beban Administrasi</span> <br />
                        dengan Sistem Website yang Efisien
                    </h1>
                </div>

                {/* Subheadline - Impact Statement */}
                <div className="hero-content max-w-3xl mb-12">
                    <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
                        Otomasi proses manual, kurangi kebutuhan SDM, tingkatkan efisiensi operasional dengan sistem digital yang terukur.
                    </p>
                </div>

                {/* Dual CTA */}
                <div className="hero-content flex flex-col sm:flex-row gap-4">
                    <a
                        href="#contact"
                        className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-lg hover:shadow-xl"
                    >
                        Konsultasi Gratis
                        <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </a>
                    <a
                        href="#portfolio"
                        className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 text-lg font-semibold rounded-lg border-2 border-gray-900 hover:bg-gray-50 transition-colors duration-300"
                    >
                        Lihat Studi Kasus
                    </a>
                </div>

                {/* Trust Indicators (Optional) */}
                <div className="hero-content mt-16 pt-8 border-t border-gray-200">
                    <p className="text-sm text-gray-500 uppercase tracking-wider mb-4">Dipercaya oleh</p>
                    <div className="flex flex-wrap gap-8 items-center opacity-60">
                        <span className="text-gray-400 font-semibold">Institusi Pendidikan</span>
                        <span className="text-gray-300">•</span>
                        <span className="text-gray-400 font-semibold">Perusahaan Swasta</span>
                        <span className="text-gray-300">•</span>
                        <span className="text-gray-400 font-semibold">Organisasi Publik</span>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Hero;
