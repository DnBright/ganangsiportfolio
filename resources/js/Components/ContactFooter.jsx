import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ContactFooter = () => {
    const sectionRef = useRef(null);
    const formRef = useRef(null);
    const infoRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate headers and info
            gsap.from(infoRef.current.children, {
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                }
            });

            // Animate form elements
            gsap.from(formRef.current.children, {
                x: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                delay: 0.3,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                }
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative w-full bg-neutral-900 text-white py-24 px-6 md:px-12 lg:px-24 overflow-hidden border-t border-white/10">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 md:gap-24">

                {/* Left Side: Info & Direct Contact */}
                <div ref={infoRef} className="flex-1 flex flex-col space-y-12">
                    <div>
                        <h2 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[0.9] text-white mb-6">
                            Let's build <br /> something <span className="text-gray-500">great.</span>
                        </h2>
                        <p className="text-xl text-gray-400 max-w-md">
                            Have a project in mind? We'd love to hear about it. Drop us a line and let's start a conversation.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <p className="text-sm uppercase tracking-widest text-gray-500 font-semibold">Contact</p>
                        <a href="mailto:hello@thedarkandbright.com" className="block text-3xl md:text-4xl hover:text-gray-300 transition-colors duration-300 border-b border-transparent hover:border-white w-fit">
                            hello@thedarkandbright.com
                        </a>
                        <p className="text-2xl text-gray-400">+62 812 3456 7890</p>
                    </div>

                    <div className="space-y-4">
                        <p className="text-sm uppercase tracking-widest text-gray-500 font-semibold">Socials</p>
                        <div className="flex space-x-6">
                            {['Instagram', 'LinkedIn', 'Dribbble', 'Behance'].map((social) => (
                                <a key={social} href="#" className="text-lg text-white hover:text-gray-400 transition-colors uppercase font-medium">
                                    {social}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Side: Simple Form */}
                <div ref={formRef} className="flex-1 max-w-xl">
                    <form className="space-y-8">
                        <div className="group">
                            <input
                                type="text"
                                placeholder="What's your name?"
                                className="w-full bg-transparent border-b border-white/20 py-4 text-2xl placeholder:text-gray-600 focus:outline-none focus:border-white transition-colors text-white"
                            />
                        </div>
                        <div className="group">
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="w-full bg-transparent border-b border-white/20 py-4 text-2xl placeholder:text-gray-600 focus:outline-none focus:border-white transition-colors text-white"
                            />
                        </div>
                        <div className="group">
                            <textarea
                                placeholder="Tell us about the project"
                                rows="4"
                                className="w-full bg-transparent border-b border-white/20 py-4 text-2xl placeholder:text-gray-600 focus:outline-none focus:border-white transition-colors resize-none text-white"
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="w-full px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-lg hover:shadow-xl"
                        >
                            Mulai Konsultasi Gratis
                        </button>
                    </form>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="max-w-7xl mx-auto mt-32 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                <p>&copy; {new Date().getFullYear()} DnB Agency. All rights reserved.</p>
                <div className="flex space-x-6 mt-4 md:mt-0">
                    <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                </div>
            </div>
        </section>
    );
};

export default ContactFooter;
