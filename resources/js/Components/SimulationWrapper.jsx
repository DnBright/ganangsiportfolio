import React from 'react';
import { motion } from 'framer-motion';

const SimulationWrapper = ({ children, title, onClose }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/60 backdrop-blur-md"
        >
            {/* Main Window Container */}
            <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="w-full h-full max-w-7xl max-h-[90vh] bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col relative ring-1 ring-white/10"
            >
                {/* Header / Toolbar */}
                <div className="h-14 bg-slate-900 flex items-center justify-between px-6 shrink-0 border-b border-white/10">
                    <div className="flex items-center gap-4">
                        <div className="flex gap-2">
                            <button onClick={onClose} className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors group relative flex items-center justify-center">
                                <span className="opacity-0 group-hover:opacity-100 text-[8px] text-black font-bold">×</span>
                            </button>
                            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <div className="h-4 w-[1px] bg-white/20 ml-2"></div>
                        <span className="text-white/80 text-xs font-mono font-medium tracking-wide flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            {title} • Live Preview
                        </span>
                    </div>

                    <button
                        onClick={onClose}
                        className="flex items-center gap-2 px-4 py-1.5 bg-white/10 hover:bg-white/20 rounded-full transition-all group"
                    >
                        <span className="text-[10px] uppercase font-bold text-white tracking-widest group-hover:pr-1 transition-all">Kembali ke Portfolio</span>
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-auto bg-slate-50 relative">
                    {children}
                </div>
            </motion.div>
        </motion.div>
    );
};

export default SimulationWrapper;
