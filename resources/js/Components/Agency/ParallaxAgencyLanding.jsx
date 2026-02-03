import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';

const ParallaxAgencyLanding = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 70,
        damping: 30,
        restDelta: 0.001
    });

    // Deep Parallax Layers
    const layer1Y = useTransform(smoothProgress, [0, 1], [0, -500]);
    const layer2Y = useTransform(smoothProgress, [0, 1], [0, -250]);
    const layer3Y = useTransform(smoothProgress, [0, 1], [0, -125]);

    // Aesthetic Transforms
    const heroScale = useTransform(smoothProgress, [0, 0.2], [1, 0.8]);
    const heroOpacity = useTransform(smoothProgress, [0, 0.15], [1, 0]);
    const bgScale = useTransform(smoothProgress, [0, 1], [1, 1.2]);
    const bgRotate = useTransform(smoothProgress, [0, 1], [0, 15]);

    return (
        <div ref={containerRef} style={{
            background: '#050505',
            color: 'white',
            minHeight: '500vh',
            fontFamily: "'Inter', sans-serif",
            overflowX: 'hidden',
            position: 'relative'
        }}>

            {/* NOISE OVERLAY */}
            <div style={{
                position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3BaseFilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/feFilter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                opacity: 0.05, pointerEvents: 'none', zIndex: 9999
            }}></div>

            {/* FLOATING DEEP GRADIENTS */}
            <motion.div style={{
                position: 'fixed', width: '80vw', height: '80vw', borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(37, 99, 235, 0.15) 0%, transparent 70%)',
                top: '-20%', left: '-10%', zIndex: 0,
                y: layer3Y, scale: bgScale, rotate: bgRotate, filter: 'blur(100px)'
            }} />
            <motion.div style={{
                position: 'fixed', width: '60vw', height: '60vw', borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%)',
                bottom: '-20%', right: '-10%', zIndex: 0,
                y: layer2Y, filter: 'blur(120px)'
            }} />

            {/* 1. HERO SECTION (Extreme Immersion) */}
            <section style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'sticky', top: 0 }}>
                <motion.div
                    style={{ opacity: heroOpacity, scale: heroScale, zIndex: 10, textAlign: 'center', padding: '0 24px' }}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                >
                    <motion.span
                        initial={{ opacity: 0, letterSpacing: '20px' }}
                        animate={{ opacity: 1, letterSpacing: '8px' }}
                        transition={{ duration: 1.5 }}
                        style={{ color: '#3b82f6', fontWeight: 900, textTransform: 'uppercase', fontSize: '0.8rem', display: 'block', marginBottom: '2rem' }}
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
                    <div style={{ display: 'flex', gap: '30px', justifyContent: 'center' }}>
                        <motion.a
                            href="/contact"
                            whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(59, 130, 246, 0.4)' }}
                            whileTap={{ scale: 0.95 }}
                            style={{
                                background: '#3b82f6', color: 'white', padding: '20px 48px',
                                borderRadius: '14px', fontWeight: 900, fontSize: '1.1rem',
                                textDecoration: 'none', transition: 'box-shadow 0.3s'
                            }}
                        >
                            Mulai Diskusi
                        </motion.a>
                    </div>
                </motion.div>
            </section>

            {/* 2. THE PROBLEM (Scroll Reveal Grid) */}
            <section style={{ padding: '20vh 0', position: 'relative', zIndex: 20 }}>
                <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1 }}
                        style={{ marginBottom: '100px' }}
                    >
                        <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 900, lineHeight: 1, fontFamily: "'Outfit', sans-serif" }}>
                            Masalah <span style={{ color: '#3b82f6' }}>Klasik</span><br />
                            Solusi Strategis.
                        </h2>
                    </motion.div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '40px' }}>
                        {[
                            { title: 'Inefisiensi Produk', icon: '⚡', desc: 'Proses manual yang menghambat skala pertumbuhan bisnis Anda.' },
                            { title: 'Data Terisolasi', icon: '📊', desc: 'Informasi yang terfragmentasi membuat keputusan menjadi bias.' },
                            { title: 'Infrastruktur Rapuh', icon: '🛡️', desc: 'Sistem yang tidak aman dan sulit untuk dikembangkan lebih jauh.' }
                        ].map((card, i) => (
                            <motion.div
                                key={card.title}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.2, duration: 0.8 }}
                                style={{
                                    padding: '60px 40px', background: 'rgba(255,255,255,0.02)',
                                    border: '1px solid rgba(255,255,255,0.05)', borderRadius: '32px',
                                    backdropFilter: 'blur(20px)'
                                }}
                            >
                                <div style={{ fontSize: '3rem', marginBottom: '2rem' }}>{card.icon}</div>
                                <h3 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '1.5rem', fontFamily: "'Outfit', sans-serif" }}>{card.title}</h3>
                                <p style={{ color: '#94a3b8', fontSize: '1.1rem', lineHeight: 1.7 }}>{card.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. APPROACH (Horizontal Shift Parallax) */}
            <section style={{ padding: '20vh 0', background: '#0a0a0a' }}>
                <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '100px', alignItems: 'center' }}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1 }}
                            style={{
                                aspectRatio: '1', background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
                                borderRadius: '40px', position: 'relative', overflow: 'hidden',
                                border: '1px solid rgba(255,255,255,0.1)'
                            }}
                        >
                            <motion.div
                                style={{ y: layer2Y, position: 'absolute', top: '20%', left: '20%', width: '60%', height: '60%', background: '#2563eb', borderRadius: '20px', filter: 'blur(60px)', opacity: 0.3 }}
                            />
                            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '5rem', fontWeight: 900, opacity: 0.1 }}>DNB</div>
                        </motion.div>

                        <div>
                            <span style={{ color: '#3b82f6', fontWeight: 800, textTransform: 'uppercase', fontSize: '0.8rem', display: 'block', marginBottom: '1.5rem' }}>Our Approach</span>
                            <h2 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '2rem', fontFamily: "'Outfit', sans-serif", lineHeight: 1.1 }}>Diagnosis Sebelum Eksekusi.</h2>
                            <p style={{ color: '#94a3b8', fontSize: '1.2rem', lineHeight: 1.8, marginBottom: '3rem' }}>
                                Kami tidak hanya membangun kode. Kami mendesain strategi digital yang selaras dengan KPI bisnis Anda melalui audit mendalam dan arsitektur presisi.
                            </p>
                            <div style={{ display: 'flex', gap: '20px' }}>
                                <div style={{ height: '2px', background: '#3b82f6', width: '60px', marginTop: '12px' }}></div>
                                <p style={{ fontWeight: 700, fontSize: '1.1rem' }}>Metodologi Disruptif</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. FINAL CTA (High Impact) */}
            <section style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
    );
};

export default ParallaxAgencyLanding;
