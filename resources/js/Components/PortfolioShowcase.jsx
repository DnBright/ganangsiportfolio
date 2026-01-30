import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PortfolioShowcase = ({ portfolios = [] }) => {
    const sectionRef = useRef(null);

    // Case study format with context
    const caseStudies = [
        {
            title: "Sistem Manajemen Akademik",
            clientType: "Institusi Pendidikan",
            problem: "Administrasi manual, data mahasiswa tersebar di berbagai file Excel",
            solution: "Platform terpusat untuk pendaftaran, nilai, dan jadwal",
            result: "Hemat 15 jam/minggu untuk staff admin, data real-time untuk 500+ mahasiswa",
            image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80",
            tags: ["Web App", "Dashboard", "Automation"]
        },
        {
            title: "Portal Manajemen Proyek",
            clientType: "Perusahaan Konstruksi",
            problem: "Koordinasi tim lapangan dan kantor tidak efisien, laporan terlambat",
            solution: "Sistem tracking proyek dengan update real-time dan notifikasi otomatis",
            result: "Pengurangan waktu pelaporan dari 3 hari menjadi 1 jam",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
            tags: ["Project Management", "Mobile-Friendly", "Real-time"]
        },
        {
            title: "Sistem Pendaftaran Online",
            clientType: "Lembaga Pelatihan",
            problem: "Proses pendaftaran manual via WhatsApp dan form fisik",
            solution: "Platform pendaftaran online dengan payment gateway terintegrasi",
            result: "Otomasi 100% proses pendaftaran, peningkatan konversi 40%",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
            tags: ["E-commerce", "Payment", "CRM"]
        },
        {
            title: "Dashboard Operasional",
            clientType: "Perusahaan Logistik",
            problem: "Data operasional tidak terpusat, keputusan lambat",
            solution: "Dashboard analytics dengan visualisasi data real-time",
            result: "Keputusan operasional 3x lebih cepat, efisiensi rute 25%",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
            tags: ["Analytics", "Dashboard", "Data Visualization"]
        }
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".portfolio-card", {
                y: 60,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="w-full bg-white py-20 md:py-32 px-6 md:px-12 lg:px-24">
            <div className="max-w-7xl mx-auto">

                {/* Section Header */}
                <div className="mb-16">
                    <p className="text-sm text-blue-600 font-semibold uppercase tracking-wider mb-4">Bukti Nyata</p>
                    <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
                        Sistem yang Sudah Membantu Klien Kami
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl">
                        Dari institusi pendidikan hingga perusahaan swasta, kami telah membantu berbagai organisasi meningkatkan efisiensi operasional mereka.
                    </p>
                </div>

                {/* Case Studies Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    {caseStudies.map((study, index) => (
                        <div key={index} className="portfolio-card group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-2xl hover:border-blue-200 transition-all duration-500">
                            {/* Image */}
                            <div className="relative h-64 overflow-hidden bg-gray-100">
                                <img
                                    src={study.image}
                                    alt={study.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="inline-block px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold text-gray-900 rounded-full">
                                        {study.clientType}
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-8">
                                <h3 className="text-2xl font-bold text-black mb-4 group-hover:text-blue-600 transition-colors">
                                    {study.title}
                                </h3>

                                {/* Problem */}
                                <div className="mb-4">
                                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Masalah</p>
                                    <p className="text-sm text-gray-700">{study.problem}</p>
                                </div>

                                {/* Solution */}
                                <div className="mb-4">
                                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Solusi</p>
                                    <p className="text-sm text-gray-700">{study.solution}</p>
                                </div>

                                {/* Result */}
                                <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                                    <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">Hasil</p>
                                    <p className="text-sm font-semibold text-blue-900">{study.result}</p>
                                </div>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2">
                                    {study.tags.map((tag, i) => (
                                        <span key={i} className="px-3 py-1 bg-gray-100 text-xs text-gray-600 rounded-full">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="mt-16 text-center">
                    <p className="text-gray-600 mb-6">Ingin hasil serupa untuk organisasi Anda?</p>
                    <a
                        href="#contact"
                        className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-lg hover:shadow-xl"
                    >
                        Diskusikan Proyek Anda
                        <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </a>
                </div>

            </div>
        </section>
    );
};

export default PortfolioShowcase;
