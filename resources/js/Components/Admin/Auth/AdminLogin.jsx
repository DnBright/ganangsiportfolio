import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useLanguage } from '../../../Contexts/LanguageContext';
import { t } from '../../../translations';

const AdminLogin = ({ csrfToken, loginUrl, oldEmail = '', errors = {}, status = '' }) => {
    const [email, setEmail] = useState(oldEmail);
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const cardRef = useRef(null);
    const { language, toggleLanguage } = useLanguage();

    useEffect(() => {
        if (cardRef.current) {
            gsap.fromTo(cardRef.current,
                { opacity: 0, scale: 0.9, y: 20 },
                { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'power4.out', delay: 0.2 }
            );
        }
    }, []);

    const getFirstError = (field) => {
        const error = errors[field];
        if (!error) return null;
        return Array.isArray(error) ? error[0] : error;
    };

    return (
        <div className="min-h-screen bg-[#060b26] text-white flex items-center justify-center p-6 font-sans antialiased overflow-hidden relative selection:bg-blue-500/30">
            {/* Background Glows (Matching Dashboard) */}
            <div className="fixed top-[-10%] left-[-5%] w-[60%] h-[60%] bg-[#2d5cfe]/10 blur-[120px] rounded-full pointer-events-none z-0" />
            <div className="fixed bottom-[-5%] right-[-5%] w-[40%] h-[40%] bg-[#01c0c8]/5 blur-[100px] rounded-full pointer-events-none z-0" />

            {/* Top Navigation / Language & Back */}
            <div className="fixed top-0 left-0 w-full p-8 flex justify-between items-center z-20">
                <a href="/" className="text-xs font-bold text-white/50 hover:text-white flex items-center gap-2 transition-colors">
                    <span>←</span> Back to Website
                </a>

                <div className="flex bg-[#0f1535]/80 backdrop-blur-md border border-white/10 rounded-xl p-1">
                    <button
                        onClick={() => language !== 'id' && toggleLanguage()}
                        className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${language === 'id' ? 'bg-blue-600 text-white shadow-lg' : 'text-white/40 hover:text-white'}`}
                    >
                        IND
                    </button>
                    <button
                        onClick={() => language !== 'en' && toggleLanguage()}
                        className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${language === 'en' ? 'bg-blue-600 text-white shadow-lg' : 'text-white/40 hover:text-white'}`}
                    >
                        ENG
                    </button>
                </div>
            </div>

            <div className="w-full max-w-md relative z-10" ref={cardRef}>
                {/* Glassy Login Card */}
                <div className="bg-[#0f1535]/60 backdrop-blur-xl border border-white/10 rounded-[30px] p-8 md:p-12 shadow-2xl relative overflow-hidden">
                    {/* Subtle Internal Glow */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-[40px] -mr-16 -mt-16 pointer-events-none" />

                    <div className="text-center mb-10 relative">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 mb-6 shadow-lg shadow-blue-500/20 group hover:animate-slow-spin-once cursor-pointer">
                            <img src="/images/logo-3d-user.png" alt="Logo" className="w-10 h-10 object-contain" />
                        </div>
                        <h1 className="text-2xl font-bold tracking-tight mb-2">Admin Portal</h1>
                        <p className="text-sm text-white/40">Enter credentials to manage your business</p>
                    </div>

                    {status && (
                        <div className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium text-center">
                            {status}
                        </div>
                    )}

                    <form action={loginUrl} method="POST" className="space-y-6">
                        <input type="hidden" name="_token" value={csrfToken} />

                        {/* Email Field */}
                        <div className="space-y-2">
                            <label className="text-[10px] text-white/40 font-bold tracking-wider uppercase ml-1">Email Address</label>
                            <div className="relative group">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 transition-colors group-focus-within:text-blue-400">📧</span>
                                <input
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="admin@thedarkandbright.com"
                                    required
                                    className={`w-full bg-[#0f1535]/80 border ${getFirstError('email') ? 'border-red-500/50' : 'border-white/10'} rounded-2xl px-12 py-3.5 text-sm outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-white/10`}
                                />
                            </div>
                            {getFirstError('email') && <p className="text-[10px] text-red-400 ml-1 font-medium">{getFirstError('email')}</p>}
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <div className="flex justify-between items-center ml-1">
                                <label className="text-[10px] text-white/40 font-bold tracking-wider uppercase">Password</label>
                            </div>
                            <div className="relative group">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 transition-colors group-focus-within:text-blue-400">🔑</span>
                                <input
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                    className={`w-full bg-[#0f1535]/80 border ${getFirstError('password') ? 'border-red-500/50' : 'border-white/10'} rounded-2xl px-12 py-3.5 text-sm outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-white/10`}
                                />
                            </div>
                            {getFirstError('password') && <p className="text-[10px] text-red-400 ml-1 font-medium">{getFirstError('password')}</p>}
                        </div>

                        {/* Remember Me */}
                        <div className="flex items-center gap-3 ml-1">
                            <div
                                className={`w-5 h-5 rounded-md border border-white/10 flex items-center justify-center cursor-pointer transition-all ${remember ? 'bg-blue-600 border-blue-600 shadow-lg shadow-blue-500/40' : 'bg-white/5'}`}
                                onClick={() => setRemember(!remember)}
                            >
                                {remember && <span className="text-[10px] text-white">✔</span>}
                                <input type="checkbox" name="remember" checked={remember} className="hidden" readOnly />
                            </div>
                            <span className="text-xs text-white/50 cursor-pointer hover:text-white transition-colors" onClick={() => setRemember(!remember)}>Remember this device</span>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all text-sm tracking-wide"
                        >
                            Log In to Dashboard
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-[10px] text-white/20 uppercase tracking-[0.2em]">
                            Protected by Vision Secure
                        </p>
                    </div>
                </div>

                {/* Footer Credits */}
                <div className="mt-8 text-center text-[10px] text-white/20 font-medium tracking-widest uppercase">
                    © 2026 The Dark and Bright Agency
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
