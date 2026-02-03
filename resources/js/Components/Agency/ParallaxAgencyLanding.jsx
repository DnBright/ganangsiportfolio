import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';

// Import Components
import AkabSimulation from '../AkabSimulation';
import AyakaSimulation from '../AyakaSimulation';
import SaitamaSimulation from '../SaitamaSimulation';
import KursusJepangSimulation from '../KursusJepangSimulation';
import SimulationWrapper from '../SimulationWrapper';
import PillNav from '../PillNav';
import { LanguageProvider } from '../../Contexts/LanguageContext';

const ParallaxAgencyLanding = () => {
    const containerRef = useRef(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [activePrototype, setActivePrototype] = useState(null);
    const [activeSection, setActiveSection] = useState('#beranda');

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 70,
        damping: 30,
        restDelta: 0.001
    });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Scroll Observer for PillNav
    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -60% 0px',
            threshold: 0
        };

        const observerCallback = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveSection('#' + entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        const sections = ['beranda', 'prototype', 'kontak'];
        sections.forEach(id => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    // Deep Parallax Layers
    const layer1Y = useTransform(smoothProgress, [0, 1], [0, -500]);
    const layer2Y = useTransform(smoothProgress, [0, 1], [0, -250]);
    const layer3Y = useTransform(smoothProgress, [0, 1], [0, -125]);

    // Aesthetic Transforms
    const heroScale = useTransform(smoothProgress, [0, 0.2], [1, 0.8]);
    const heroOpacity = useTransform(smoothProgress, [0, 0.15], [1, 0]);
    const bgScale = useTransform(smoothProgress, [0, 1], [1, 1.2]);
    const bgRotate = useTransform(smoothProgress, [0, 1], [0, 15]);

    const prototypes = React.useMemo(() => [
        { id: 'akab', name: 'AKAB AGRO', component: AkabSimulation, color: '#10b981' },
        { id: 'ayaka', name: 'AYAKA', component: AyakaSimulation, color: '#ec4899' },
        { id: 'saitama', name: 'SAITAMA', component: SaitamaSimulation, color: '#f59e0b' },
        { id: 'kursus', name: 'KURSUS JEPANG', component: KursusJepangSimulation, color: '#ef4444' }
    ], []);

    const navItems = React.useMemo(() => [
        { label: 'nav.home', href: '#beranda' },
        { label: 'Prototypes', href: '#prototype' },
        { label: 'Diskusi Strategis', href: '/contact' }
    ], []);

    return (
        <LanguageProvider>
            <div ref={containerRef} style={{
                background: '#050505',
                color: 'white',
                minHeight: '700vh',
                fontFamily: "'Inter', sans-serif",
                overflowX: 'hidden',
                position: 'relative'
            }}>

                {/* REACT BITS STYLE PILL NAV */}
                <PillNav
                    items={navItems}
                    activeHref={activeSection}
                    baseColor="#FFFFFF"
                    pillColor="#3b82f6"
                    hoveredPillTextColor="#FFFFFF"
                    pillTextColor="#FFFFFF"
                    className="agency-nav"
                />

                {/* NOISE OVERLAY */}
                <div style={{
                    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3BaseFilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/feFilter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    opacity: 0.05, pointerEvents: 'none', zIndex: 9999
                }}></div>

                {/* MOUSE LIGHTING EFFECT */}
                <div style={{
                    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                    background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(37, 99, 235, 0.1), transparent 80%)`,
                    zIndex: 1, pointerEvents: 'none'
                }}></div>

                {/* FLOATING DEEP GRADIENTS */}
                <motion.div style={{
                    position: 'fixed', width: '80vw', height: '80vw', borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(37, 99, 235, 0.15) 0%, transparent 70%)',
                    top: '-20%', left: '-10%', zIndex: 0,
                    y: layer3Y, scale: bgScale, rotate: bgRotate, filter: 'blur(100px)'
                }} />

                {/* 1. HERO SECTION */}
                <section id="beranda" style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'sticky', top: 0 }}>
                    <motion.div
                        style={{ opacity: heroOpacity, scale: heroScale, zIndex: 10, textAlign: 'center', padding: '0 24px' }}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <img src="/images/logo-dnb.png" alt="DNB Logo" style={{ height: '80px', marginBottom: '2rem', filter: 'drop-shadow(0 0 20px rgba(37, 99, 235, 0.8))' }} />
                        <motion.span
                            initial={{ opacity: 0, letterSpacing: '20px' }}
                            animate={{ opacity: 1, letterSpacing: '8px' }}
                            transition={{ duration: 1.5 }}
                            style={{ color: '#3b82f6', fontWeight: 900, textTransform: 'uppercase', fontSize: '0.8rem', display: 'block', marginBottom: '1.5rem' }}
                        >
                            Strategic Digital Partner
                        </motion.span>
                        <h1 style={{
                            fontSize: 'clamp(3.5rem, 10vw, 8rem)',
                            fontWeight: 900,
                            letterSpacing: '-5px',
                            lineHeight: 0.85,
                            fontFamily: "'Outfit', sans-serif",
                            marginBottom: '3rem'
                        }}>
                            FUTURE<br />
                            <span style={{ color: '#3b82f6' }}>AGENCY.</span>
                        </h1>
                    </motion.div>
                </section>

                {/* STEALTH SECTION */}
                <section style={{ height: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 20 }}>
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 2 }}
                        style={{ textAlign: 'center', maxWidth: '800px' }}
                    >
                        <h2 style={{
                            fontSize: '1.2rem',
                            color: '#475569',
                            fontWeight: 900,
                            letterSpacing: '5px',
                            textTransform: 'uppercase',
                            transition: 'color 0.4s ease'
                        }}
                            onMouseEnter={(e) => e.target.style.color = '#3b82f6'}
                            onMouseLeave={(e) => e.target.style.color = '#475569'}
                        >
                            Kami melihat apa yang orang lain lewatkan. Strategi tersembunyi untuk hasil nyata.
                        </h2>
                    </motion.div>
                </section>

                {/* PROTOTYPE LAB */}
                <section id="prototype" style={{ padding: '10vh 0', position: 'relative', zIndex: 30, background: '#080808' }}>
                    <div className="container" style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px' }}>
                        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                            <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, fontFamily: "'Outfit', sans-serif" }}>
                                Prototype <span style={{ color: '#3b82f6' }}>Lab.</span>
                            </h2>
                            <p style={{ color: '#94a3b8', fontSize: '1.2rem' }}>Coba langsung hasil engineering dan kreativitas kami.</p>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '50px', background: 'rgba(255,255,255,0.02)', padding: '40px', borderRadius: '40px', border: '1px solid rgba(255,255,255,0.05)' }}>
                            {/* Selector */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                {prototypes.map((p) => (
                                    <motion.button
                                        key={p.id}
                                        whileHover={{ x: 10 }}
                                        onClick={() => setActivePrototype(p.id)}
                                        style={{
                                            padding: '24px',
                                            background: activePrototype === p.id ? p.color : 'rgba(255,255,255,0.03)',
                                            border: 'none',
                                            borderRadius: '20px',
                                            color: 'white',
                                            textAlign: 'left',
                                            cursor: 'pointer',
                                            fontWeight: 800,
                                            fontSize: '1rem',
                                            transition: 'all 0.3s'
                                        }}
                                    >
                                        {p.name}
                                    </motion.button>
                                ))}
                                <div style={{ marginTop: 'auto', padding: '20px' }}>
                                    <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>* Klik untuk mencoba simulasi live.</p>
                                </div>
                            </div>

                            {/* Display Area */}
                            <div style={{ minHeight: '600px', background: '#000', borderRadius: '30px', overflow: 'hidden', position: 'relative', border: '1px solid rgba(255,255,255,0.1)' }}>
                                <AnimatePresence mode="wait">
                                    {activePrototype ? (
                                        <motion.div
                                            key={activePrototype}
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 1.05 }}
                                            transition={{ duration: 0.5 }}
                                            style={{ width: '100%', height: '100%' }}
                                        >
                                            <SimulationWrapper>
                                                {React.createElement(prototypes.find(p => p.id === activePrototype).component)}
                                            </SimulationWrapper>
                                        </motion.div>
                                    ) : (
                                        <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '40px' }}>
                                            <div>
                                                <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🕹️</div>
                                                <h3 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Pilih Prototype untuk Mencoba</h3>
                                                <p style={{ color: '#94a3b8' }}>Eksplorasi simulasi sistem yang sudah kami kembangkan.</p>
                                            </div>
                                        </div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FINAL CTA */}
                <section id="kontak" style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ textAlign: 'center' }}>
                        <motion.h2
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1 }}
                            style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', fontWeight: 900, marginBottom: '3rem', fontFamily: "'Outfit', sans-serif" }}
                        >
                            Ready to <span style={{ color: '#3b82f6' }}>Scale?</span>
                        </motion.h2>
                        <motion.a
                            href="/contact"
                            whileHover={{ scale: 1.1, background: '#ffffff', color: '#000000' }}
                            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                            style={{
                                padding: '24px 72px', background: 'transparent', border: '2px solid white',
                                color: 'white', borderRadius: '100px', fontWeight: 900,
                                fontSize: '1.2rem', textDecoration: 'none', display: 'inline-block'
                            }}
                        >
                            Mulai Diskusi
                        </motion.a>
                    </div>
                </section>
            </div>
        </LanguageProvider>
    );
};

export default ParallaxAgencyLanding;
