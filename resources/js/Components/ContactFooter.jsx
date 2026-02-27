import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../Contexts/LanguageContext';
import { t } from '../translations';

gsap.registerPlugin(ScrollTrigger);

const ContactFooter = () => {
    const sectionRef = useRef(null);
    const { language } = useLanguage();

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".contact-reveal", {
                y: 50,
                opacity: 0,
                duration: 1.2,
                stagger: 0.15,
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
        <section ref={sectionRef} className="relative w-full bg-[#050508] text-white py-32 md:py-48 px-6 md:px-12 lg:px-24 overflow-hidden border-t border-white/5">

            {/* Ambient Accent */}
            <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-blue-600/5 rounded-full blur-[150px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-24">

                {/* Left Side: Massive Branding & Contact */}
                <div className="flex-1 flex flex-col space-y-16">
                    <div className="contact-reveal">
                        <span className="text-blue-500 font-bold text-xs tracking-[0.4em] uppercase mb-8 block">Project Inquiry</span>
                        <h2 className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.85] text-white mb-12 uppercase">
                            LET'S TALK <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">DOMINANCE.</span>
                        </h2>
                        <p className="text-xl text-white/40 max-w-md font-light">
                            {t('contact.subtitle', language)}
                        </p>
                    </div>

                    <div className="contact-reveal space-y-8">
                        <div className="group border-t border-white/5 pt-8">
                            <p className="text-[10px] uppercase tracking-widest text-white/20 font-bold mb-4">{t('contact.email', language)}</p>
                            <a href="mailto:darkandbright.official@gmail.com" className="block text-2xl md:text-4xl font-bold hover:text-blue-400 transition-all">
                                darkandbright.official@gmail.com
                            </a>
                        </div>

                        <div className="group border-t border-white/5 pt-8">
                            <p className="text-[10px] uppercase tracking-widest text-white/20 font-bold mb-4">Direct Communication</p>
                            <a href="https://wa.me/6287882794909" target="_blank" rel="noopener noreferrer" className="block text-2xl font-bold hover:text-blue-400 transition-all">
                                +62 878-8279-4909
                            </a>
                        </div>
                    </div>

                    <div className="contact-reveal space-y-4">
                        <p className="text-[10px] uppercase tracking-widest text-white/20 font-bold">{t('contact.follow', language)}</p>
                        <div className="flex flex-wrap gap-x-8 gap-y-4">
                            {['Instagram', 'LinkedIn', 'Dribbble', 'Behance'].map((social) => (
                                <a key={social} href="#" className="text-xs text-white/50 hover:text-white transition-colors uppercase font-black tracking-widest">
                                    {social}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Side: High-End Form Area */}
                <div className="flex-1 max-w-xl self-end">
                    <form className="contact-reveal space-y-12">
                        <div className="relative group">
                            <input
                                type="text"
                                placeholder={t('contact.form.name', language)}
                                className="w-full bg-transparent border-b border-white/10 py-6 text-xl md:text-2xl placeholder:text-white/20 focus:outline-none focus:border-blue-500 transition-colors text-white font-bold"
                            />
                        </div>
                        <div className="relative group">
                            <input
                                type="email"
                                placeholder={t('contact.form.email', language)}
                                className="w-full bg-transparent border-b border-white/10 py-6 text-xl md:text-2xl placeholder:text-white/20 focus:outline-none focus:border-blue-500 transition-colors text-white font-bold"
                            />
                        </div>
                        <div className="relative group">
                            <textarea
                                placeholder={t('contact.form.message', language)}
                                rows="3"
                                className="w-full bg-transparent border-b border-white/10 py-6 text-xl md:text-2xl placeholder:text-white/20 focus:outline-none focus:border-blue-500 transition-colors resize-none text-white font-bold"
                            ></textarea>
                        </div>

                        <button type="button" className="group flex items-center justify-between w-full p-8 border border-white/10 rounded-3xl hover:bg-white hover:text-black transition-all">
                            <span className="text-xl font-black uppercase tracking-widest">{t('contact.form.send', language)}</span>
                            <div className="w-12 h-12 rounded-full border border-black/10 group-hover:border-black/50 flex items-center justify-center transition-all">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </div>
                        </button>
                    </form>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="max-w-7xl mx-auto mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] font-mono tracking-widest text-white/20 uppercase">
                <p>&copy; {new Date().getFullYear()} DARK AND BRIGHT AGENCY / ALL RIGHTS RESERVED.</p>
                <div className="flex space-x-8 mt-6 md:mt-0">
                    <a href="#" className="hover:text-blue-500 transition-colors">{t('contact.privacy', language)}</a>
                    <a href="#" className="hover:text-blue-500 transition-colors">{t('contact.terms', language)}</a>
                </div>
            </div>
        </section>
    );
};

export default ContactFooter;
