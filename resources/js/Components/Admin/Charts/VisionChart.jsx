import React from 'react';

const VisionChart = ({ type }) => {
    if (type === 'area') {
        return (
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 400 200">
                <defs>
                    <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                    </linearGradient>
                </defs>
                <path
                    d="M0,150 Q50,120 100,140 T200,80 T300,110 T400,60 L400,200 L0,200 Z"
                    fill="url(#areaGradient)"
                    className="animate-pulse"
                />
                <path
                    d="M0,150 Q50,120 100,140 T200,80 T300,110 T400,60"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="3"
                    strokeLinecap="round"
                />
            </svg>
        );
    }

    if (type === 'bar') {
        return (
            <div className="w-full h-full flex items-end justify-between px-2 gap-1 px-4">
                {[40, 70, 45, 90, 65, 85, 30, 75, 50].map((height, i) => (
                    <div
                        key={i}
                        className="w-2 bg-white/20 rounded-full relative group transition-all duration-500 hover:bg-white/40"
                        style={{ height: `${height}%` }}
                    >
                        <div className="absolute inset-0 bg-blue-400 opacity-0 group-hover:opacity-100 transition-opacity rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
                    </div>
                ))}
            </div>
        );
    }

    return null;
};

export default VisionChart;
