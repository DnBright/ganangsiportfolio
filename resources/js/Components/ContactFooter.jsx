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
                y: 30,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative w-full bg-[#fcfcfc] text-black py-24 md:py-32 px-6 overflow-hidden border-t border-black/5">

            <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-16 md:gap-24">

                {/* Left Side: Massive Branding & Contact */}
                <div className="flex-1 flex flex-col space-y-12">
                    <div className="contact-reveal">
                        <span className="text-black/40 font-bold text-[10px] tracking-[0.3em] uppercase mb-6 block">Project Inquiry</span>
                        <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] text-black mb-8 uppercase">
                            LET'S TALK <br />
                            <span className="text-gray-400">BUSINESS.</span>
                        </h2>
                        <p className="text-lg text-gray-600 max-w-sm font-normal">
                            {t('contact.subtitle', language)}
                        </p>
                    </div>

                    <div className="contact-reveal space-y-6">
                        <div className="group border-t border-black/5 pt-6">
                            <p className="text-[9px] uppercase tracking-widest text-black/40 font-bold mb-2">{t('contact.email', language)}</p>
                            <a href="mailto:darkandbright.official@gmail.com" className="block text-xl md:text-3xl font-bold hover:text-gray-500 transition-colors">
                                darkandbright.official@gmail.com
                            </a>
                        </div>

                        <div className="group border-t border-black/5 pt-6">
                            <p className="text-[9px] uppercase tracking-widest text-black/40 font-bold mb-2">Direct Communication</p>
                            <a href="https://wa.me/6287882794909" target="_blank" rel="noopener noreferrer" className="block text-xl md:text-3xl font-bold hover:text-gray-500 transition-colors">
                                +62 878 8279 4909
                            </a>
                        </div>
                    </div>

                    <div className="contact-reveal space-y-4 pt-4">
                        <p className="text-[9px] uppercase tracking-widest text-black/40 font-bold">{t('contact.follow', language)}</p>
                        <div className="flex flex-wrap gap-x-6 gap-y-2">
                            {['Instagram', 'LinkedIn', 'Dribbble', 'Behance'].map((social) => (
                                <a key={social} href="#" className="text-xs text-black/60 hover:text-black transition-colors uppercase font-bold tracking-widest">
                                    {social}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Side: High-End Minimalist Form Area */}
                <div className="flex-1 max-w-xl self-end w-full">
                    <form className="contact-reveal space-y-8">
                        <div className="relative group">
                            <input
                                type="text"
                                placeholder={t('contact.form.name', language)}
                                className="w-full bg-transparent border-b border-black/20 py-4 text-lg md:text-xl placeholder:text-black/30 focus:outline-none focus:border-black transition-colors text-black font-medium"
                            />
                        </div>
                        <div className="relative group">
                            <input
                                type="email"
                                placeholder={t('contact.form.email', language)}
                                className="w-full bg-transparent border-b border-black/20 py-4 text-lg md:text-xl placeholder:text-black/30 focus:outline-none focus:border-black transition-colors text-black font-medium"
                            />
                        </div>
                        <div className="relative group">
                            <textarea
                                placeholder={t('contact.form.message', language)}
                                rows="3"
                                className="w-full bg-transparent border-b border-black/20 py-4 text-lg md:text-xl placeholder:text-black/30 focus:outline-none focus:border-black transition-colors resize-none text-black font-medium"
                            ></textarea>
                        </div>

                        <button type="button" className="group flex items-center justify-between w-full p-6 mt-4 border border-black/10 rounded-2xl hover:bg-black hover:text-white transition-all shadow-sm">
                            <span className="text-sm font-bold uppercase tracking-widest">{t('contact.form.send', language)}</span>
                            <div className="w-10 h-10 rounded-full border border-black/10 group-hover:border-white/30 flex items-center justify-center transition-colors">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </div>
                        </button>
                    </form>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="max-w-6xl mx-auto mt-24 pt-8 border-t border-black/5 flex flex-col md:flex-row justify-between items-center text-[9px] font-mono tracking-widest text-black/40 uppercase">
                <p>&copy; {new Date().getFullYear()} DARK AND BRIGHT AGENCY / ALL RIGHTS RESERVED.</p>
                <div className="flex space-x-6 mt-6 md:mt-0">
                    <a href="#" className="hover:text-black transition-colors">{t('contact.privacy', language)}</a>
                    <a href="#" className="hover:text-black transition-colors">{t('contact.terms', language)}</a>
                </div>
            </div>
        </section>
    );
};

export default ContactFooter;
