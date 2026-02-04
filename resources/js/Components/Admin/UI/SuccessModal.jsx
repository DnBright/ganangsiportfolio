import React from 'react';

const SuccessModal = ({ isOpen, onClose, projectData, yOffset = 40 }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-start justify-center p-4 overflow-y-auto animate-in fade-in duration-300">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-[#060b26]/90 backdrop-blur-sm"
                onClick={onClose}
            ></div>

            {/* Modal */}
            <div
                className="relative z-10 bg-gradient-to-br from-[#1a2042] to-[#0f1535] border-2 border-green-500/30 rounded-[32px] w-full max-w-md overflow-hidden shadow-2xl shadow-green-500/20 animate-in zoom-in-95 duration-500"
                style={{ marginTop: `${yOffset}px` }}
            >
                {/* Confetti Effect */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(20)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-2 h-2 bg-gradient-to-br from-green-400 to-blue-500 rounded-full animate-ping"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 0.5}s`,
                                animationDuration: `${1 + Math.random()}s`
                            }}
                        />
                    ))}
                </div>

                {/* Glow Effect */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-green-500/20 blur-[100px] rounded-full"></div>

                {/* Content */}
                <div className="relative p-8 text-center">
                    {/* Success Icon */}
                    <div className="mx-auto w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-green-500/50 animate-bounce">
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl font-bold text-white mb-2 animate-in slide-in-from-bottom duration-700">
                        Project Berhasil Dieksekusi! 🎉
                    </h2>
                    <p className="text-white/60 text-sm mb-6 animate-in slide-in-from-bottom duration-700 delay-100">
                        Data telah dipindahkan ke halaman Projects
                    </p>

                    {/* Project Info */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6 text-left animate-in slide-in-from-bottom duration-700 delay-200">
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-xs text-white/40 uppercase font-bold">Company</span>
                                <span className="text-white font-bold">{projectData?.company_name}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-xs text-white/40 uppercase font-bold">Industry</span>
                                <span className="text-white/70">{projectData?.industry}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-xs text-white/40 uppercase font-bold">Type</span>
                                <span className="text-white/70">{projectData?.project_type}</span>
                            </div>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 animate-in slide-in-from-left duration-700 delay-300">
                            <div className="text-2xl font-bold text-green-400">✓</div>
                            <div className="text-xs text-white/60 mt-1">Proposal Uploaded</div>
                        </div>
                        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 animate-in slide-in-from-right duration-700 delay-300">
                            <div className="text-2xl font-bold text-blue-400">✓</div>
                            <div className="text-xs text-white/60 mt-1">Screenshot Saved</div>
                        </div>
                    </div>

                    {/* Action Button */}
                    <button
                        onClick={onClose}
                        className="w-full py-4 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white font-bold rounded-2xl shadow-xl shadow-green-600/40 transition-all active:scale-95 text-sm uppercase tracking-widest animate-in slide-in-from-bottom duration-700 delay-400"
                    >
                        Lanjutkan Kerja
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SuccessModal;
