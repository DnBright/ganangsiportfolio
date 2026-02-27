<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Gro Visual — Studio Desain Kreatif</title>
<link rel="icon" type="image/png" href="{{ asset('images/gro-visual/logo-gro.png') }}">
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet">
<style>
:root {
  --black: #ffffff; /* Main Background */
  --white: #09090d; /* Main Text */
  --accent: #1a3bcc; /* Primary Brand Color */
  --accent-light: #3554e8;
  --gray: #f9fafc; /* Alternating Section Background */
  --gray2: #ffffff; /* Card Background */
  --mid: #e1e4eb; /* Borders & Lines */
  --dim: #5c5c6e; /* Secondary Text */
}
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body { background: var(--black); color: var(--white); font-family: 'DM Sans', sans-serif; font-weight: 400; overflow-x: hidden; -webkit-font-smoothing: antialiased; }

/* CURSOR - Hidden on mobile for efficiency */
.cursor { position: fixed; width: 10px; height: 10px; background: var(--accent-light); border-radius: 50%; pointer-events: none; z-index: 9999; transform: translate(-50%,-50%); transition: transform 0.1s; }
.cursor-ring { position: fixed; width: 38px; height: 38px; border: 1px solid rgba(53,84,232,0.45); border-radius: 50%; pointer-events: none; z-index: 9998; transform: translate(-50%,-50%); transition: all 0.14s ease; }
@media (max-width: 1024px) { .cursor, .cursor-ring { display: none; } body { cursor: auto; } }

/* NAV */
nav { position: fixed; top: 24px; left: 50%; transform: translateX(-50%); width: 90%; max-width: 1200px; z-index: 1000; display: flex; align-items: center; justify-content: space-between; padding: 14px 40px; background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 100px; backdrop-filter: blur(0px); transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1); }
nav.scrolled { top: 16px; background: rgba(255, 255, 255, 0.8); border: 1px solid rgba(26, 59, 204, 0.15); backdrop-filter: blur(20px); box-shadow: 0 20px 40px rgba(0,0,0,0.06); width: 85%; }

.logo { font-family: 'Bebas Neue', sans-serif; font-size: 24px; letter-spacing: 3px; color: var(--white); text-decoration: none; display: flex; align-items: center; gap: 8px; transition: transform 0.3s; }
.logo:hover { transform: scale(1.05); }
.logo-mark { width: 30px; height: 30px; background: var(--accent); display: flex; align-items: center; justify-content: center; font-size: 18px; color: #ffffff; font-family: 'Bebas Neue', sans-serif; clip-path: polygon(0 0, 100% 0, 100% 100%, 18% 100%); }

.nav-links { display: flex; gap: 32px; list-style: none; }
.nav-links a { color: var(--dim); text-decoration: none; font-size: 10px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; transition: all 0.3s ease; position: relative; padding: 5px 0; }
.nav-links a::after { content: ''; position: absolute; bottom: 0; left: 0; width: 0; height: 2px; background: var(--accent); transition: width 0.3s ease; border-radius: 2px; }
.nav-links a:hover { color: var(--white); }
.nav-links a.active { color: var(--accent); }
.nav-links a.active::after { width: 100%; }

.nav-cta { padding: 12px 28px; background: var(--accent); color: #ffffff; text-decoration: none; font-size: 10px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; transition: all 0.4s; border-radius: 50px; box-shadow: 0 10px 20px rgba(26, 59, 204, 0.2); }
.nav-cta:hover { background: var(--accent-light); transform: translateY(-2px); box-shadow: 0 15px 30px rgba(26, 59, 204, 0.35); }

@media (max-width: 1024px) {
    nav { width: 95%; padding: 12px 24px; top: 12px; }
    nav.scrolled { width: 92%; top: 10px; }
    .nav-links { display: none; }
}

/* HERO */
.hero { min-height: 100vh; display: grid; grid-template-columns: 1.1fr 0.9fr; align-items: center; }
.hero-left { display: flex; flex-direction: column; justify-content: center; padding: 100px 60px; }
.hero-tag { font-size: 11px; font-weight: 600; letter-spacing: 4px; text-transform: uppercase; color: var(--accent); margin-bottom: 24px; }
.hero-title { font-family: 'Bebas Neue', sans-serif; font-size: clamp(60px, 9vw, 130px); line-height: 0.92; letter-spacing: -2px; color: var(--white); }
.hero-title span { color: var(--accent-light); display: block; }
.hero-desc { margin-top: 32px; font-size: 16px; line-height: 1.8; color: var(--dim); max-width: 480px; }
.hero-actions { margin-top: 44px; display: flex; gap: 24px; align-items: center; }
.btn-primary { padding: 18px 38px; background: var(--accent); color: #ffffff; text-decoration: none; font-size: 12px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; transition: all 0.3s; display: inline-block; border-radius: 4px; }
.btn-primary:hover { transform: translateY(-3px); box-shadow: 0 15px 35px rgba(26,59,204,0.25); }
.btn-ghost { color: var(--dim); text-decoration: none; font-size: 12px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; display: flex; align-items: center; gap: 8px; transition: color 0.3s; }
.btn-ghost:hover { color: var(--accent); }

.hero-right { position: relative; height: 100%; min-height: 500px; background: var(--gray); display: flex; align-items: center; justify-content: center; overflow: hidden; }
.hero-visual { position: relative; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; }
.grid-lines { position: absolute; inset: 0; background-image: linear-gradient(var(--mid) 1px, transparent 1px), linear-gradient(90deg, var(--mid) 1px, transparent 1px); background-size: 50px 50px; opacity: 0.3; }
.hero-logo-svg { width: 70%; max-width: 450px; filter: drop-shadow(0 30px 50px rgba(0,0,0,0.08)); animation: floatUp 8s ease-in-out infinite; }

@media (max-width: 1024px) {
    .hero { grid-template-columns: 1fr; }
    .hero-left { padding: 140px 30px 80px; text-align: center; align-items: center; }
    .hero-right { min-height: 400px; grid-row: 1; }
    .hero-desc { margin-left: auto; margin-right: auto; }
}

/* MARQUEE */
.marquee-wrap { overflow: hidden; border-top: 1px solid var(--mid); border-bottom: 1px solid var(--mid); background: var(--white); padding: 20px 0; }
.marquee-track { display: flex; gap: 60px; animation: marquee 25s linear infinite; white-space: nowrap; width: max-content; }
.marquee-item { font-family: 'Bebas Neue', sans-serif; font-size: 24px; letter-spacing: 2px; color: var(--black); display: flex; align-items: center; gap: 20px; }
.marquee-item .dot { width: 6px; height: 6px; background: var(--accent); border-radius: 50%; }

/* SECTIONS */
section { padding: 120px 60px; }
.section-label { font-size: 11px; font-weight: 700; letter-spacing: 4px; text-transform: uppercase; color: var(--accent); margin-bottom: 20px; display: block; }
.section-title { font-family: 'Bebas Neue', sans-serif; font-size: clamp(50px, 6vw, 90px); line-height: 0.95; letter-spacing: -1px; color: var(--white); }

@media (max-width: 1024px) {
    section { padding: 80px 30px; }
}

/* SERVICES */
#services { background: var(--black); }
.services-intro { display: grid; grid-template-columns: 1fr 1fr; gap: 100px; align-items: end; margin-bottom: 80px; }
.services-intro-desc { font-size: 17px; line-height: 1.8; color: var(--dim); }
.services-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px; }
.service-card { background: var(--gray2); padding: 0; border: 1px solid var(--mid); transition: all 0.4s ease; border-radius: 24px; position: relative; overflow: hidden; }
.service-card:hover { transform: translateY(-10px); border-color: var(--accent); box-shadow: 0 30px 60px rgba(0,0,0,0.08); }
.service-num { font-family: 'Bebas Neue', sans-serif; font-size: 80px; color: var(--gray); position: absolute; top: 10px; right: 20px; line-height: 1; opacity: 0.3; z-index: 0; }
.service-icon { font-size: 36px; margin-bottom: 24px; color: var(--accent); position: relative; z-index: 1; }
.service-name { font-family: 'Bebas Neue', sans-serif; font-size: 32px; letter-spacing: 1px; margin-bottom: 18px; position: relative; z-index: 1; }
.service-desc { font-size: 15px; line-height: 1.7; color: var(--dim); margin-bottom: 28px; position: relative; z-index: 1; }
.service-list { list-style: none; position: relative; z-index: 1; }
.service-list li { font-size: 13px; color: var(--white); font-weight: 500; padding: 10px 0; border-bottom: 1px solid var(--mid); display: flex; align-items: center; gap: 12px; }
.service-list li::before { content: '→'; color: var(--accent); font-size: 14px; font-weight: 900; }
.service-list li:last-child { border-bottom: none; }

@media (max-width: 1024px) {
    .services-intro { grid-template-columns: 1fr; gap: 30px; text-align: center; }
    .services-grid { grid-template-columns: 1fr; }
    .service-card { padding: 0; }
    .service-content { padding: 40px 30px; }
}
.service-img-wrapper { width: 100%; height: 220px; overflow: hidden; border-radius: 20px 20px 0 0; position: relative; }
.service-img-wrapper img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s ease; filter: grayscale(20%) brightness(0.9); }
.service-card:hover .service-img-wrapper img { transform: scale(1.08); filter: grayscale(0%) brightness(1); }
.service-content { padding: 40px; position: relative; z-index: 1; }

/* ABOUT */
.about-section { display: grid; grid-template-columns: 1fr 1fr; gap: 100px; align-items: center; padding: 120px 60px; background: var(--gray); }
.about-visual { position: relative; width: 100%; max-width: 500px; aspect-ratio: 1/1; margin: 0 auto; }
.about-box.main { inset: 0 40px 40px 0; background: var(--black); border: 1px solid var(--mid); position: absolute; overflow: hidden; border-radius: 20px; box-shadow: 0 30px 60px rgba(0,0,0,0.05); }
.about-grid-bg { position: absolute; inset: 0; background-image: linear-gradient(var(--mid) 1px, transparent 1px), linear-gradient(90deg, var(--mid) 1px, transparent 1px); background-size: 40px 40px; opacity: 0.2; }
.about-logo-svg { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 200px; opacity: 0.1; }
.about-box.accent-box { width: 220px; height: 180px; bottom: 0; right: 0; background: var(--accent); display: flex; align-items: center; justify-content: center; flex-direction: column; position: absolute; border-radius: 20px; box-shadow: 0 20px 40px rgba(26,59,204,0.3); }
.accent-box-num { font-family: 'Bebas Neue', sans-serif; font-size: 64px; color: #ffffff; line-height: 1; }
.accent-box-label { font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: rgba(255,255,255,0.7); font-weight: 600; }
.about-desc { font-size: 17px; line-height: 1.85; color: var(--dim); margin-top: 30px; }
.about-values { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 40px; }
.value-item { padding: 24px; background: var(--black); border: 1px solid var(--mid); border-radius: 12px; transition: all 0.3s; }
.value-item:hover { border-color: var(--accent); transform: scale(1.02); }
.value-title { font-family: 'Bebas Neue', sans-serif; font-size: 20px; letter-spacing: 1px; margin-bottom: 8px; color: var(--white); }
.value-desc { font-size: 13px; line-height: 1.6; color: var(--dim); }

/* STATS */
.stats-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-top: 56px; padding-top: 48px; border-top: 1px solid var(--mid); }
.stat-card { background: var(--gray); padding: 32px 24px; border-radius: 16px; text-align: center; transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1); border: 1px solid transparent; }
.stat-card:hover { background: #ffffff; border-color: var(--accent); transform: translateY(-5px); box-shadow: 0 20px 40px rgba(0,0,0,0.04); }
.stat-num { font-family: 'Bebas Neue', sans-serif; font-size: 56px; color: var(--accent); line-height: 1; margin-bottom: 8px; }
.stat-label { font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: var(--dim); font-weight: 700; }

@media (max-width: 1024px) {
    .about-section { grid-template-columns: 1fr; gap: 60px; }
    .about-visual { aspect-ratio: 1/1; }
    .about-box.main { inset: 0 20px 20px 0; }
    .about-box.accent-box { width: 160px; height: 140px; }
    .accent-box-num { font-size: 48px; }
    .about-values { grid-template-columns: 1fr; }
}

/* WHY US */
.why-section { background: var(--black); }
.why-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px; margin-top: 80px; }
.why-card { padding: 40px; background: var(--gray2); border-radius: 24px; border: 1px solid var(--mid); transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1); position: relative; overflow: hidden; min-height: 320px; display: flex; flex-direction: column; justify-content: flex-end; }
.why-card-img { position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0; transition: all 0.8s ease; z-index: 1; }
.why-card-overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(180deg, rgba(13,13,18,0.2) 0%, rgba(13,13,18,0.95) 100%); opacity: 0; transition: all 0.5s; z-index: 2; }
.why-card:hover { transform: translateY(-12px); border-color: var(--accent); box-shadow: 0 30px 60px rgba(0,0,0,0.15); }
.why-card:hover .why-card-img { opacity: 0.35; transform: scale(1.15); }
.why-card:hover .why-card-overlay { opacity: 1; }
.why-icon { font-size: 32px; color: var(--accent); margin-bottom: 24px; position: relative; z-index: 3; transition: all 0.4s; }
.why-card:hover .why-icon { transform: translateY(-10px) scale(1.1); color: #ffffff; }
.why-title { font-family: 'Bebas Neue', sans-serif; font-size: 26px; letter-spacing: 1px; margin-bottom: 16px; color: var(--white); position: relative; z-index: 3; }
.why-desc { font-size: 14px; line-height: 1.8; color: var(--dim); position: relative; z-index: 3; transition: color 0.4s; }
.why-card:hover .why-desc { color: #ffffff; }

@media (max-width: 1024px) {
    .why-grid { grid-template-columns: repeat(2, 1fr); }
    .why-card { min-height: 280px; }
}
@media (max-width: 768px) {
    .why-grid { grid-template-columns: 1fr; }
}

/* PROCESS */
.process-section { background: var(--gray); }
.process-steps { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2px; margin-top: 80px; background: var(--mid); padding: 2px; border-radius: 24px; overflow: hidden; }
.process-step { padding: 60px 40px; background: var(--black); transition: all 0.5s; position: relative; overflow: hidden; border-right: 1px solid var(--mid); }
.process-step:last-child { border-right: none; }
.process-step:hover { background: var(--gray2); }
.step-num { font-family: 'Bebas Neue', sans-serif; font-size: 80px; color: var(--mid); line-height: 1; margin-bottom: 20px; opacity: 0.6; }
.step-name { font-family: 'Bebas Neue', sans-serif; font-size: 26px; letter-spacing: 1px; margin-bottom: 14px; color: var(--white); }
.step-desc { font-size: 14px; line-height: 1.8; color: var(--dim); }

@media (max-width: 1024px) {
    .process-steps { grid-template-columns: 1fr; }
    .process-step { padding: 40px 30px; text-align: center; }
}

/* TARGET */
.target-section { background: var(--black); }
.target-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-top: 80px; }
.target-card { padding: 36px; background: var(--gray); border-radius: 20px; border: 1px solid transparent; transition: all 0.3s; text-align: center; }
.target-card:hover { transform: translateY(-5px); border-color: var(--accent); background: #ffffff; box-shadow: 0 10px 30px rgba(0,0,0,0.04); }
.target-icon { font-size: 32px; margin-bottom: 20px; display: block; }
.target-name { font-family: 'Bebas Neue', sans-serif; font-size: 22px; letter-spacing: 1px; margin-bottom: 12px; color: var(--white); }
.target-desc { font-size: 13px; line-height: 1.7; color: var(--dim); }

@media (max-width: 1024px) {
    .target-grid { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 640px) {
    .target-grid { grid-template-columns: 1fr; }
    .stats-row { grid-template-columns: 1fr; gap: 16px; }
}

/* TESTIMONI */
.testi-section { background: var(--gray); }
.testi-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px; margin-top: 80px; }
.testi-card { padding: 44px; background: var(--black); border-radius: 24px; border: 1px solid var(--mid); box-shadow: 0 10px 40px rgba(0,0,0,0.03); }
.testi-stars { color: var(--accent); font-size: 14px; margin-bottom: 24px; letter-spacing: 2px; }
.testi-quote { font-size: 15px; line-height: 1.8; color: var(--white); font-style: italic; margin-bottom: 30px; }
.testi-divider { width: 40px; height: 3px; background: var(--accent); margin-bottom: 20px; }
.testi-name { font-family: 'Bebas Neue', sans-serif; font-size: 20px; letter-spacing: 1px; color: var(--white); }
.testi-role { font-size: 12px; color: var(--dim); letter-spacing: 1px; text-transform: uppercase; margin-top: 6px; font-weight: 600; }

@media (max-width: 1024px) {
    .testi-grid { grid-template-columns: 1fr; }
}

/* CTA */
.cta-section { background: var(--accent); padding: 100px 60px; display: flex; justify-content: space-between; align-items: center; gap: 80px; position: relative; overflow: hidden; border-radius: 40px; margin: 0 60px 100px; }
@media (max-width: 1024px) {
    .cta-section { flex-direction: column; text-align: center; margin: 0 20px 80px; padding: 60px 30px; border-radius: 30px; }
}
.cta-section::before { content: 'GRO'; position: absolute; right: -20px; top: -40px; font-family: 'Bebas Neue', sans-serif; font-size: 350px; color: rgba(255,255,255,0.08); line-height: 1; pointer-events: none; }
.cta-title { font-family: 'Bebas Neue', sans-serif; font-size: clamp(50px, 6vw, 100px); line-height: 0.95; color: #ffffff; letter-spacing: -1px; position: relative; z-index: 1; }
.cta-sub { font-size: 16px; color: rgba(255,255,255,0.8); line-height: 1.8; margin-top: 24px; max-width: 400px; position: relative; z-index: 1; }
.cta-right { position: relative; z-index: 1; }
.btn-dark:hover { transform: translateY(-5px); background: #f0f0f0; }

/* PORTFOLIO MARQUEE */
.portfolio-section { background: var(--black); overflow: hidden; padding-bottom: 160px; }
.portfolio-container { display: flex; flex-direction: column; gap: 20px; margin-top: 80px; width: 100%; }
.marquee-row { display: flex; gap: 20px; width: max-content; }
.marquee-row.forward { animation: marquee-horiz 80s linear infinite; }
.marquee-row.backward { animation: marquee-horiz-rev 80s linear infinite; }
.portfolio-item { width: 160px; height: 160px; flex-shrink: 0; background: var(--gray); border: 1px solid var(--mid); border-radius: 20px; display: flex; align-items: center; justify-content: center; padding: 12px; transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1); }
.portfolio-item img { width: 100%; height: 100%; object-fit: contain; transition: transform 0.4s ease; }
.portfolio-item:hover { background: #ffffff; border-color: var(--accent); transform: translateY(-5px) scale(1.05); box-shadow: 0 20px 40px rgba(0,0,0,0.06); }

@keyframes marquee-horiz {
  0% { transform: translateX(0); }
  100% { transform: translateX(calc(-50% - 10px)); }
}
@keyframes marquee-horiz-rev {
  0% { transform: translateX(calc(-50% - 10px)); }
  100% { transform: translateX(0); }
}

@media (max-width: 768px) {
    .portfolio-item { width: 130px; height: 130px; padding: 10px; }
    .marquee-row.forward, .marquee-row.backward { animation-duration: 40s; }
}

/* FOOTER */
footer { background: var(--black); border-top: 1px solid var(--mid); padding: 100px 60px 60px; display: grid; grid-template-columns: 2fr 1fr 1.2fr; gap: 80px; }
.footer-logo { font-family: 'Bebas Neue', sans-serif; font-size: 32px; letter-spacing: 4px; color: var(--white); display: flex; align-items: center; gap: 12px; margin-bottom: 24px; }
.footer-tagline { font-size: 15px; color: var(--dim); line-height: 1.8; max-width: 320px; }
.footer-col-title { font-size: 11px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; color: var(--accent); margin-bottom: 30px; display: block; }
.footer-links { list-style: none; }
.footer-links li { margin-bottom: 15px; }
.footer-links a { color: var(--dim); text-decoration: none; font-size: 15px; transition: all 0.3s; }
.footer-links a:hover { color: var(--accent); padding-left: 5px; }
.footer-bottom { border-top: 1px solid var(--mid); padding: 30px 60px; display: flex; justify-content: space-between; align-items: center; background: var(--black); }
.footer-copy { font-size: 12px; color: var(--dim); letter-spacing: 0.5px; }

@media (max-width: 1024px) {
    footer { grid-template-columns: 1fr; gap: 50px; padding: 60px 30px; text-align: center; }
    .footer-bottom { flex-direction: column; gap: 15px; padding: 30px; text-align: center; }
    .footer-logo { justify-content: center; }
    .footer-tagline { margin-left: auto; margin-right: auto; }
}

@keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
@keyframes floatUp { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
.reveal { opacity: 0; transform: translateY(30px); transition: all 0.8s cubic-bezier(0.165, 0.84, 0.44, 1); }
.reveal.visible { opacity: 1; transform: translateY(0); }
</style>
</head>
<body>

<div class="cursor" id="cursor"></div>
<div class="cursor-ring" id="cursorRing"></div>

<!-- NAV -->
<nav>
  <a href="#" class="logo">
    <img src="{{ asset('images/gro-visual/logo-gro.png') }}" alt="Gro Visual Logo" style="height: 32px; width: auto; object-fit: contain;">
    GRO VISUAL
  </a>
  <ul class="nav-links">
    <li><a href="#services" class="nav-link">Layanan</a></li>
    <li><a href="#about" class="nav-link">Tentang</a></li>
    <li><a href="#portfolio" class="nav-link">Portfolio</a></li>
    <li><a href="#why" class="nav-link">Keunggulan</a></li>
    <li><a href="#contact" class="nav-link">Kontak</a></li>
  </ul>
  <a href="#contact" class="nav-cta">Mulai Proyek</a>
</nav>

<!-- HERO -->
<section class="hero">
  <div class="hero-left">
    <p class="hero-tag">Studio Desain Kreatif — Yogyakarta</p>
    <h1 class="hero-title">Bangun<br><span>Kuat.</span><br>Tumbuh<br>Lebih Jauh.</h1>
    <p class="hero-desc">Gro Visual membantu bisnis membangun identitas visual yang kuat, modern, dan profesional — dari desain grafis, branding logo, hingga pengelolaan media sosial.</p>
    <div class="hero-actions">
      <a href="#contact" class="btn-primary">Konsultasi Gratis</a>
      <a href="#services" class="btn-ghost">Lihat Layanan</a>
    </div>
  </div>
  <div class="hero-right">
    <div class="hero-visual">
      <div class="grid-lines"></div>
      <div class="scan-line"></div>
      <svg class="hero-logo-svg" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
        <polygon points="60,360 360,40 360,360" fill="#0d0d12" stroke="rgba(26,59,204,0.12)" stroke-width="1"/>
        <polygon points="80,340 340,62 340,340" fill="#111118"/>
        <polygon points="252,98 338,62 338,148 288,148" fill="#09090d"/>
        <polygon points="255,101 336,65 336,145 290,145" fill="none" stroke="#3554e8" stroke-width="1.5"/>
        <polygon points="145,218 338,158 338,244 145,244" fill="#09090d"/>
        <polygon points="148,221 336,161 336,241 148,241" fill="none" stroke="#3554e8" stroke-width="1.5"/>
        <polygon points="80,290 338,262 338,340 80,340" fill="#09090d"/>
        <polygon points="83,293 336,265 336,337 83,337" fill="none" stroke="#3554e8" stroke-width="1.5"/>
        <polygon points="340,340 380,370 365,340" fill="rgba(53,84,232,0.07)"/>
      </svg>
    </div>
  </div>
</section>

<!-- MARQUEE -->
<div class="marquee-wrap">
  <div class="marquee-track">
    <div class="marquee-item"><span class="dot"></span> Desain Grafis</div>
    <div class="marquee-item"><span class="dot"></span> Branding Logo</div>
    <div class="marquee-item"><span class="dot"></span> Manajemen Media Sosial</div>
    <div class="marquee-item"><span class="dot"></span> Identitas Visual</div>
    <div class="marquee-item"><span class="dot"></span> Strategi Brand</div>
    <div class="marquee-item"><span class="dot"></span> Pertumbuhan Digital</div>
    <div class="marquee-item"><span class="dot"></span> Desain Grafis</div>
    <div class="marquee-item"><span class="dot"></span> Branding Logo</div>
    <div class="marquee-item"><span class="dot"></span> Manajemen Media Sosial</div>
    <div class="marquee-item"><span class="dot"></span> Identitas Visual</div>
    <div class="marquee-item"><span class="dot"></span> Strategi Brand</div>
    <div class="marquee-item"><span class="dot"></span> Pertumbuhan Digital</div>
  </div>
</div>

<!-- SERVICES -->
<section id="services">
  <div class="services-intro">
    <div>
      <span class="section-label reveal">Apa yang Kami Lakukan</span>
      <h2 class="section-title reveal">Layanan<br>Unggulan</h2>
    </div>
    <p class="services-intro-desc reveal">Kami menyediakan tiga layanan inti yang saling melengkapi untuk membangun brand Anda dari nol hingga siap bersaing di era digital — dengan pendekatan strategis, bukan sekadar estetis.</p>
  </div>
  <div class="services-grid">
    <div class="service-card reveal">
      <div class="service-img-wrapper">
        <img src="{{ asset('images/gro-visual/graphic_design_service.jpg') }}" alt="Desain Grafis Professional">
      </div>
      <div class="service-content">
        <span class="service-num">01</span>
        <div class="service-icon">✦</div>
        <h3 class="service-name">Desain Grafis</h3>
        <p class="service-desc">Desain visual yang tegas, berkarakter, dan mampu berkomunikasi langsung dengan target audiens Anda.</p>
        <ul class="service-list">
          <li>Poster & Flyer Promosi</li>
          <li>Desain Konten Digital</li>
          <li>Banner & Iklan Visual</li>
          <li>Kemasan & Label Produk</li>
        </ul>
      </div>
    </div>
    <div class="service-card reveal">
      <div class="service-img-wrapper">
        <img src="{{ asset('images/gro-visual/branding_service.jpg') }}" alt="Branding & Logo Professional">
      </div>
      <div class="service-content">
        <span class="service-num">02</span>
        <div class="service-icon">◈</div>
        <h3 class="service-name">Logo & Branding</h3>
        <p class="service-desc">Identitas brand yang kuat dan mudah diingat. Kami membangun sistem visual yang merepresentasikan nilai bisnis Anda.</p>
        <ul class="service-list">
          <li>Desain Logo Profesional</li>
          <li>Panduan Identitas Brand</li>
          <li>Palet Warna & Tipografi</li>
          <li>Rebranding & Pembaruan</li>
        </ul>
      </div>
    </div>
    <div class="service-card reveal">
      <div class="service-img-wrapper">
        <img src="{{ asset('images/gro-visual/social_media_service.jpg') }}" alt="Social Media Management">
      </div>
      <div class="service-content">
        <span class="service-num">03</span>
        <div class="service-icon">⊞</div>
        <h3 class="service-name">Manajemen Media Sosial</h3>
        <p class="service-desc">Kelola kehadiran digital Anda secara strategis dengan konten visual yang konsisten dan mendorong pertumbuhan.</p>
        <ul class="service-list">
          <li>Pembuatan Konten Visual</li>
          <li>Strategi & Kalender Konten</li>
          <li>Pengelolaan Feed Instagram</li>
          <li>Caption & Penulisan Konten</li>
        </ul>
      </div>
    </div>
  </div>
</section>

<!-- ABOUT -->
<div class="about-section" id="about">
    <div class="about-visual reveal">
      <div class="about-box main">
        <div class="about-grid-bg"></div>
        <img src="{{ asset('images/gro-visual/creative_studio_concept.jpg') }}" alt="Gro Visual Studio" style="width: 100%; height: 100%; object-fit: cover; opacity: 1;">
        <img src="{{ asset('images/gro-visual/logo-gro.png') }}" class="about-logo-overlay" alt="Branding" style="position: absolute; top: 20px; left: 20px; width: 60px; opacity: 0.15; filter: grayscale(1) brightness(2);">
      </div>
    <div class="about-box accent-box">
      <span class="accent-box-num">3+</span>
      <span class="accent-box-label">Tahun Pengalaman</span>
    </div>
  </div>
  <div>
    <span class="section-label reveal">Tentang Kami</span>
    <h2 class="section-title reveal">Desain yang<br>Menggerakkan<br>Bisnis</h2>
    <p class="about-desc reveal">Gro Visual lahir dari keyakinan bahwa desain bukan sekadar estetika — ia adalah strategi. Dengan konsep minimalis, tegas, dan berkarakter, kami hadir sebagai solusi bagi UMKM, startup, hingga perusahaan yang ingin meningkatkan citra brand mereka secara berkelanjutan di era digital.</p>
    <div class="about-values reveal">
      <div class="value-item">
        <div class="value-title">Strategis</div>
        <div class="value-desc">Setiap desain dibangun berdasarkan riset dan tujuan bisnis yang nyata.</div>
      </div>
      <div class="value-item">
        <div class="value-title">Berkarakter</div>
        <div class="value-desc">Visual yang khas dan konsisten membangun kepercayaan audiens.</div>
      </div>
      <div class="value-item">
        <div class="value-title">Modern</div>
        <div class="value-desc">Mengikuti tren desain terkini namun tetap relevan jangka panjang.</div>
      </div>
      <div class="value-item">
        <div class="value-title">Kolaboratif</div>
        <div class="value-desc">Kami bekerja bersama klien, bukan hanya untuk klien.</div>
      </div>
    </div>
    <div class="stats-row reveal">
      <div class="stat-card">
        <div class="stat-num">100+</div>
        <div class="stat-label">Proyek Selesai</div>
      </div>
      <div class="stat-card">
        <div class="stat-num">50+</div>
        <div class="stat-label">Klien Puas</div>
      </div>
      <div class="stat-card">
        <div class="stat-num">3+</div>
        <div class="stat-label">Tahun Aktif</div>
      </div>
    </div>
  </div>
</div>

<!-- PORTFOLIO -->
<section id="portfolio" class="portfolio-section">
  <div class="services-intro">
    <div>
      <span class="section-label reveal">Portfolio Kami</span>
      <h2 class="section-title reveal">Logo &<br>Identitas Visual</h2>
    </div>
    <p class="services-intro-desc reveal">Ini adalah koleksi identitas visual yang kami bangun bersama klien. Kami fokus pada desain yang bersih, fungsional, dan penuh karakter.</p>
  </div>

  <div class="portfolio-container">
    @if(count($portfolioImages) > 0)
        @php
            $count = count($portfolioImages);
            $half = ceil($count / 2);
            $row1 = array_slice($portfolioImages, 0, $half);
            $row2 = array_slice($portfolioImages, $half);
        @endphp

        {{-- Baris 1: Forward --}}
        <div class="marquee-row forward">
            @foreach($row1 as $img)
                <div class="portfolio-item">
                    <img src="{{ asset('images/gro-visual/portfolio/' . $img) }}" alt="Portfolio Logo">
                </div>
            @endforeach
            {{-- Duplicate for infinite loop --}}
            @foreach($row1 as $img)
                <div class="portfolio-item">
                    <img src="{{ asset('images/gro-visual/portfolio/' . $img) }}" alt="Portfolio Logo">
                </div>
            @endforeach
        </div>

        {{-- Baris 2: Backward --}}
        <div class="marquee-row backward">
            @foreach($row2 as $img)
                <div class="portfolio-item">
                    <img src="{{ asset('images/gro-visual/portfolio/' . $img) }}" alt="Portfolio Logo">
                </div>
            @endforeach
            {{-- Duplicate for infinite loop --}}
            @foreach($row2 as $img)
                <div class="portfolio-item">
                    <img src="{{ asset('images/gro-visual/portfolio/' . $img) }}" alt="Portfolio Logo">
                </div>
            @endforeach
        </div>
    @else
        <div style="text-align: center; padding: 60px; border: 1px dashed var(--mid); border-radius: 20px; color: var(--dim); margin: 0 60px;">
            Belum ada portfolio yang diunggah ke folder `images/gro-visual/portfolio`.
        </div>
    @endif
  </div>
</section>

<!-- WHY US -->
<section id="why" class="why-section">
  <span class="section-label reveal">Mengapa Gro Visual</span>
  <h2 class="section-title reveal">Keunggulan<br>Kami</h2>
  <div class="why-grid">
    <div class="why-card reveal">
      <img src="{{ asset('images/gro-visual/strategic_approach.png') }}" class="why-card-img" alt="Strategy">
      <div class="why-card-overlay"></div>
      <div class="why-icon">◎</div>
      <h3 class="why-title">Pendekatan Strategis</h3>
      <p class="why-desc">Kami tidak hanya membuat desain yang indah. Setiap keputusan visual didasarkan pada pemahaman mendalam tentang brand, target pasar, dan tujuan bisnis Anda — agar desain benar-benar menghasilkan dampak nyata.</p>
    </div>
    <div class="why-card reveal">
      <img src="{{ asset('images/gro-visual/brand_consistency.png') }}" class="why-card-img" alt="Branding">
      <div class="why-card-overlay"></div>
      <div class="why-icon">⬡</div>
      <h3 class="why-title">Identitas yang Konsisten</h3>
      <p class="why-desc">Brand yang kuat butuh visual yang konsisten di semua platform. Kami memastikan setiap elemen — dari logo hingga konten media sosial — berbicara dalam satu bahasa visual yang kohesif dan mudah dikenali.</p>
    </div>
    <div class="why-card reveal">
      <img src="{{ asset('images/gro-visual/creative_studio_concept.jpg') }}" class="why-card-img" alt="Growth">
      <div class="why-card-overlay"></div>
      <div class="why-icon">↗</div>
      <h3 class="why-title">Hasil yang Terukur</h3>
      <p class="why-desc">Desain yang baik berdampak nyata pada pertumbuhan bisnis. Kami berkomitmen membangun komunikasi visual yang meningkatkan kepercayaan audiens, daya saing, dan pertumbuhan brand secara berkelanjutan.</p>
    </div>
    <div class="why-card reveal">
      <img src="{{ asset('images/gro-visual/branding_service.jpg') }}" class="why-card-img" alt="Satisfaction">
      <div class="why-card-overlay"></div>
      <div class="why-icon">◈</div>
      <h3 class="why-title">Revisi Tanpa Batas</h3>
      <p class="why-desc">Kepuasan Anda adalah prioritas utama kami. Kami menyediakan revisi hingga hasil akhir benar-benar sesuai dengan visi dan ekspektasi Anda — tidak ada kompromi pada kualitas hasil akhir.</p>
    </div>
    <div class="why-card reveal">
      <img src="{{ asset('images/gro-visual/graphic_design_service.jpg') }}" class="why-card-img" alt="Process">
      <div class="why-card-overlay"></div>
      <div class="why-icon">✦</div>
      <h3 class="why-title">Proses yang Transparan</h3>
      <p class="why-desc">Anda selalu tahu perkembangan proyek Anda. Kami menjaga komunikasi terbuka di setiap tahap — dari briefing awal, proses desain, review, hingga file final diserahterimakan secara lengkap.</p>
    </div>
    <div class="why-card reveal">
      <img src="{{ asset('images/gro-visual/social_media_service.jpg') }}" class="why-card-img" alt="Support">
      <div class="why-card-overlay"></div>
      <div class="why-icon">⊕</div>
      <h3 class="why-title">Dukungan Pasca Proyek</h3>
      <p class="why-desc">Hubungan kami tidak berhenti saat proyek selesai. Kami siap mendampingi dan memberikan panduan penerapan aset brand agar identitas visual Anda digunakan secara tepat dan konsisten di semua media.</p>
    </div>
  </div>
</section>

<!-- PROCESS -->
<section class="process-section" id="process">
  <span class="section-label reveal">Bagaimana Kami Bekerja</span>
  <h2 class="section-title reveal">Proses<br>Kerja Kami</h2>
  <div class="process-steps">
    <div class="process-step reveal">
      <div class="step-num">01</div>
      <h3 class="step-name">Konsultasi & Penggalian</h3>
      <p class="step-desc">Kami mendengarkan dan memahami bisnis Anda secara mendalam — mulai dari target audiens, nilai brand, kompetitor, hingga tujuan jangka panjang yang ingin dicapai bersama.</p>
    </div>
    <div class="process-step reveal">
      <div class="step-num">02</div>
      <h3 class="step-name">Strategi Visual</h3>
      <p class="step-desc">Merumuskan arah visual yang tepat — mencakup palet warna, tipografi, gaya desain, nada komunikasi, dan panduan visual yang menjadi fondasi identitas brand Anda.</p>
    </div>
    <div class="process-step reveal">
      <div class="step-num">03</div>
      <h3 class="step-name">Eksekusi & Revisi</h3>
      <p class="step-desc">Tim desainer kami mengeksekusi dengan presisi tinggi. Anda mendapatkan kesempatan revisi hingga hasilnya benar-benar sesuai visi — setiap detail diperhatikan penuh.</p>
    </div>
    <div class="process-step reveal">
      <div class="step-num">04</div>
      <h3 class="step-name">Serah Terima & Tumbuh</h3>
      <p class="step-desc">Berkas final dalam berbagai format siap pakai, panduan brand lengkap, dan pendampingan penerapan agar identitas visual brand Anda berjalan konsisten di semua platform digital.</p>
    </div>
  </div>
</section>

<!-- TARGET -->
<section class="target-section" id="target">
  <div class="target-intro">
    <div>
      <span class="section-label reveal">Yang Kami Bantu</span>
      <h2 class="section-title reveal">Untuk Siapa<br>Gro Visual?</h2>
    </div>
    <p class="target-intro-desc reveal">Gro Visual dirancang untuk melayani berbagai jenis bisnis dan pelaku usaha yang ingin tampil lebih profesional, meningkatkan kepercayaan pelanggan, dan tumbuh lebih cepat melalui kekuatan identitas visual yang strategis dan konsisten.</p>
  </div>
  <div class="target-grid">
    <div class="target-card reveal">
      <div class="target-icon">🏪</div>
      <h3 class="target-name">UMKM</h3>
      <p class="target-desc">Usaha kecil dan menengah yang ingin tampil lebih profesional dan dipercaya pelanggan melalui identitas visual yang kuat, konsisten, dan berkarakter.</p>
    </div>
    <div class="target-card reveal">
      <div class="target-icon">🚀</div>
      <h3 class="target-name">Startup</h3>
      <p class="target-desc">Bisnis rintisan yang membutuhkan brand identity solid sejak awal agar mampu bersaing, menarik perhatian investor, dan meninggalkan kesan kuat pada pengguna.</p>
    </div>
    <div class="target-card reveal">
      <div class="target-icon">🏢</div>
      <h3 class="target-name">Perusahaan</h3>
      <p class="target-desc">Korporasi yang ingin me-refresh brand atau membutuhkan materi visual profesional dan konsisten untuk berbagai keperluan bisnis dan komunikasi internal-eksternal.</p>
    </div>
    <div class="target-card reveal">
      <div class="target-icon">👤</div>
      <h3 class="target-name">Brand Personal</h3>
      <p class="target-desc">Freelancer, content creator, dan profesional yang ingin membangun personal brand yang berkarakter kuat dan mudah dikenal di industri mereka.</p>
    </div>
  </div>
</section>


<!-- TESTIMONI -->
<section class="testi-section">
  <span class="section-label reveal">Kata Klien Kami</span>
  <h2 class="section-title reveal">Apa yang Mereka<br>Katakan</h2>
  <div class="testi-grid">
    <div class="testi-card reveal">
      <div class="testi-stars">★★★★★</div>
      <p class="testi-quote">"Gro Visual benar-benar memahami apa yang kami butuhkan. Logo yang mereka buat sekarang jadi identitas brand kami yang paling dikenal pelanggan. Prosesnya cepat, komunikatif, dan hasilnya melebihi ekspektasi kami."</p>
      <div class="testi-divider"></div>
      <div class="testi-name">Rizky Pratama</div>
      <div class="testi-role">Pemilik — Kedai Kopi Lokal, Yogyakarta</div>
    </div>
    <div class="testi-card reveal">
      <div class="testi-stars">★★★★★</div>
      <p class="testi-quote">"Konten media sosial kami jauh lebih konsisten dan profesional sejak dikelola Gro Visual. Engagement naik signifikan dan brand kami terasa lebih matang di mata audiens. Sangat direkomendasikan!"</p>
      <div class="testi-divider"></div>
      <div class="testi-name">Anindita Sari</div>
      <div class="testi-role">Pendiri — Merek Fashion, Solo</div>
    </div>
    <div class="testi-card reveal">
      <div class="testi-stars">★★★★★</div>
      <p class="testi-quote">"Kami startup yang baru mulai dan butuh brand identity yang kuat. Gro Visual membantu dari nol — logo, warna, panduan brand, hingga template konten. Hasilnya sangat memuaskan dan benar-benar worth it."</p>
      <div class="testi-divider"></div>
      <div class="testi-name">Dimas Wicaksono</div>
      <div class="testi-role">Pendiri Bersama — Perusahaan Rintisan Teknologi, Jakarta</div>
    </div>
  </div>
</section>

<!-- CTA -->
<div class="cta-section" id="contact">
  <div>
    <h2 class="cta-title reveal">Siap Tumbuh<br>Bersama?</h2>
    <p class="cta-sub reveal">Mulai perjalanan membangun brand yang kuat, profesional, dan berkarakter bersama Gro Visual hari ini. Konsultasi pertama gratis, tanpa komitmen.</p>
  </div>
  <div class="reveal">
    <a href="https://wa.me/6281234567890" class="btn-dark">Hubungi Kami Sekarang</a>
    <p class="cta-contact" style="margin-top:18px;">WhatsApp: <a href="https://wa.me/6281234567890">+62 812-3456-7890</a></p>
    <p class="cta-contact" style="margin-top:6px;">Email: <a href="mailto:hello@grovisual.id">hello@grovisual.id</a></p>
    <p class="cta-contact" style="margin-top:6px;">Instagram: <a href="#">@grovisual</a></p>
  </div>
</div>

<!-- FOOTER -->
<footer>
  <div>
    <div class="footer-logo">
      <img src="{{ asset('images/gro-visual/logo-gro.png') }}" alt="Gro Visual Logo" style="height: 40px; width: auto; object-fit: contain;">
      GRO VISUAL
    </div>
    <p class="footer-tagline">Studio kreatif yang membantu bisnis tumbuh melalui identitas visual yang kuat, modern, dan profesional di era digital.</p>
  </div>
  <div>
    <span class="footer-col-title">Layanan</span>
    <ul class="footer-links">
      <li><a href="#services">Desain Grafis</a></li>
      <li><a href="#services">Logo & Branding</a></li>
      <li><a href="#services">Manajemen Media Sosial</a></li>
      <li><a href="#why">Strategi Brand</a></li>
    </ul>
  </div>
  <div>
    <span class="footer-col-title">Hubungi Kami</span>
    <ul class="footer-links">
      <li><a href="mailto:hello@grovisual.id">hello@grovisual.id</a></li>
      <li><a href="#">Instagram @grovisual</a></li>
      <li><a href="#">WhatsApp</a></li>
      <li><a href="#">Yogyakarta, Indonesia</a></li>
    </ul>
  </div>
</footer>
<div class="footer-bottom">
  <span class="footer-copy">© 2024 Gro Visual. Hak Cipta Dilindungi.</span>
  <span class="footer-copy" style="color:var(--accent-light);">Bangun Kuat. Tumbuh Lebih Jauh.</span>
</div>

<script>
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px'; cursor.style.top = my + 'px';
});
(function animate() {
  rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12;
  ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
  requestAnimationFrame(animate);
})();
document.querySelectorAll('a, button, .service-card, .why-card, .target-card, .testi-card, .value-item').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(2)';
    ring.style.transform = 'translate(-50%,-50%) scale(1.4)';
    ring.style.borderColor = '#3554e8';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(1)';
    ring.style.transform = 'translate(-50%,-50%) scale(1)';
    ring.style.borderColor = 'rgba(53,84,232,0.45)';
  });
});

const reveals = document.querySelectorAll('.reveal');
const obs = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 60);
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
reveals.forEach(el => obs.observe(el));

// ACTIVE SECTION TRACKING
const sections = document.querySelectorAll('section, .about-section, .cta-section');
const navLinks = document.querySelectorAll('.nav-link');

const activeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}, { threshold: 0.2, rootMargin: "-20% 0px -60% 0px" });

sections.forEach(section => activeObserver.observe(section));
</script>
</body>
</html>