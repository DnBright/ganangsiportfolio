import React from 'react';

const VisionChart = ({ type, totalVisits = 0 }) => {
    // Generate organic motion for the chart based on visits
    const scale = Math.min(1, totalVisits / 100); // Scale faster for smaller numbers
    const h1 = 280 - (scale * 80); // Move control point 1
    const h2 = 180 - (scale * 40); // Move data point peak
    const h3 = 150 - (scale * 20); // Move point 3

    if (type === 'area') {
        return (
            <svg className="w-full h-full" viewBox="0 0 800 300" preserveAspectRatio="none">
                <defs>
                    <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#2d5cfe" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#2d5cfe" stopOpacity="0" />
                    </linearGradient>
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Horizontal Grid lines */}
                {[0, 1, 2, 3, 4].map(i => (
                    <line
                        key={i}
                        x1="0" y1={i * 75} x2="800" y2={i * 75}
                        stroke="rgba(255,255,255,0.05)" strokeWidth="1"
                    />
                ))}

                {/* Smooth Area Path */}
                <path
                    d={`M0,250 C100,200 200,${h1} 300,${h2} C400,80 500,200 600,${h3} C700,100 800,180 800,180 V300 H0 Z`}
                    fill="url(#areaGradient)"
                    className="transition-all duration-1000"
                />

                {/* Neon Line */}
                <path
                    d={`M0,250 C100,200 200,${h1} 300,${h2} C400,80 500,200 600,${h3} C700,100 800,180 800,180`}
                    fill="none"
                    stroke="#2d5cfe"
                    strokeWidth="3"
                    filter="url(#glow)"
                    className="transition-all duration-1000"
                />

                {/* Data point at the peak */}
                <circle cx="300" cy={h2} r="4" fill="#fff" filter="url(#glow)" className="transition-all duration-1000" />
            </svg>
        );
    }

    return (
        <div className="flex h-full items-end justify-between gap-1">
            {[40, 70, 45, 90, 65, 85, 30, 75, 50, 60, 80, 55].map((h, i) => (
                <div
                    key={i}
                    className="flex-1 bg-white/20 rounded-full hover:bg-white transition-all cursor-pointer"
                    style={{ height: `${h}%` }}
                />
            ))}
        </div>
    );
};

export default VisionChart;
