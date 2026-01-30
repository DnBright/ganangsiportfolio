import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ElectricBorderCard from './ElectricBorderCard';

gsap.registerPlugin(ScrollTrigger);

const solutions = [
    {
        title: "Institusi & Pendidikan",
        description: "Transformasi digital untuk ekosistem pendidikan masa depan. Sistem manajemen pembelajaran, administrasi, dan operasional yang terintegrasi.",
        icon: "🎓"
    },
    {
        title: "Perusahaan & Bisnis",
        description: "Solusi enterprise yang scalable untuk mempercepat pertumbuhan bisnis. Otomasi workflow, analitik data, dan efisiensi operasional.",
        icon: "🏢"
    },
    {
        title: "Digitalisasi Administrasi",
        description: "Ubah tumpukan kertas menjadi data digital yang mudah diakses. Hemat waktu, kurangi error, dan tingkatkan produktivitas tim.",
        icon: "⚡"
    },
    {
        title: "Sistem Berbasis Kebutuhan",
        description: "Bukan solusi generik. Kami membangun sistem yang dirancang khusus untuk memecahkan masalah unik organisasi Anda.",
        icon: "🎯"
    }
];

const Solutions = () => {
    const sectionRef = useRef(null);
    const headerRef = useRef(null);
    const gridRef = useRef(null);

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
                    <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">Solusi</h2>
                    <h3 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                        Kamu bukan tukang website, <br /> tapi <span className="text-gray-900 border-b-4 border-black">problem solver.</span>
                    </h3>
                    <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
                        Kami tidak sekadar menulis kode. Kami menganalisis masalah, merancang strategi, dan membangun sistem yang memberikan dampak nyata bagi bisnis Anda.
                    </p>
                </div>

                <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    {solutions.map((item, index) => (
                        <ElectricBorderCard key={index} className="h-full">
                            <div className="h-full p-8 flex flex-col items-start justify-start hover:bg-gray-50 transition-colors duration-300">
                                <div className="text-4xl mb-6">{item.icon}</div>
                                <h4 className="text-2xl font-bold mb-4 translate-x-0 group-hover/card:translate-x-2 transition-transform duration-300">{item.title}</h4>
                                <p className="text-gray-600 leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        </ElectricBorderCard>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Solutions;
