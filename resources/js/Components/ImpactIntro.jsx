import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ImpactIntro = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".impact-item", {
                y: 40,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const impacts = [
        {
            icon: "⚡",
            title: "Efisiensi SDM",
            description: "Kurangi beban kerja manual tim Anda. Sistem kami menggantikan proses repetitif sehingga staff bisa fokus pada tugas strategis."
        },
        {
            icon: "🔄",
            title: "Otomasi Proses",
            description: "Dari pendaftaran hingga pelaporan, semua berjalan otomatis. Hemat waktu hingga 15+ jam per minggu untuk operasional rutin."
        },
        {
            icon: "📊",
            title: "Data Terpusat",
            description: "Satu sistem untuk semua data. Akses real-time, laporan instan, dan keputusan lebih cepat berdasarkan informasi akurat."
        }
    ];

    return (
        <section ref={sectionRef} className="w-full bg-gray-50 py-20 md:py-32 px-6 md:px-12 lg:px-24">
            <div className="max-w-7xl mx-auto">

                {/* Section Header */}
                <div className="impact-item max-w-3xl mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-black mb-6 leading-tight">
                        Kami membangun website dan sistem yang <span className="text-blue-600">menggantikan proses manual</span>
                    </h2>
                    <p className="text-xl text-gray-600 leading-relaxed">
                        Sehingga bisnis dapat berjalan lebih efisien dengan SDM yang lebih sedikit, biaya operasional lebih rendah, dan hasil yang terukur.
                    </p>
                </div>

                {/* Impact Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                    {impacts.map((item, index) => (
                        <div key={index} className="impact-item bg-white p-8 rounded-xl border border-gray-200 hover:border-blue-200 hover:shadow-lg transition-all duration-300">
                            <div className="text-5xl mb-6">{item.icon}</div>
                            <h3 className="text-2xl font-bold text-black mb-4">{item.title}</h3>
                            <p className="text-gray-600 leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="impact-item mt-16 text-center">
                    <a
                        href="#contact"
                        className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-lg hover:shadow-xl"
                    >
                        Diskusikan Kebutuhan Anda
                        <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </a>
                </div>

            </div>
        </section>
    );
};

export default ImpactIntro;
