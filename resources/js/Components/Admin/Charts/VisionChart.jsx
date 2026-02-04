import React from 'react';

const VisionChart = ({ type, monthlyData = [] }) => {
    // Fallback if no data
    const data = monthlyData.length === 12 ? monthlyData : Array(12).fill(0);
    const maxVal = Math.max(...data, 10);

    // Generate path points for 12 months
    // SVG width is 800, so each month is ~72px apart (800 / 11)
    const points = data.map((val, i) => {
        const x = i * (800 / 11);
        const y = 250 - (val / maxVal) * 200; // Scale to 250-50 range
        return { x, y };
    });

    // Create a smooth SVG path string from points
    const pathD = points.length > 0
        ? `M${points[0].x},${points[0].y} ` + points.slice(1).map((p, i) => {
            const prev = points[i];
            const cpX = (prev.x + p.x) / 2;
            return `C${cpX},${prev.y} ${cpX},${p.y} ${p.x},${p.y}`;
        }).join(' ') + " V300 H0 Z"
        : "";

    const lineD = points.length > 0
        ? `M${points[0].x},${points[0].y} ` + points.slice(1).map((p, i) => {
            const prev = points[i];
            const cpX = (prev.x + p.x) / 2;
            return `C${cpX},${prev.y} ${cpX},${p.y} ${p.x},${p.y}`;
        }).join(' ')
        : "";

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
                    d={pathD}
                    fill="url(#areaGradient)"
                    className="transition-all duration-1000"
                />

                {/* Neon Line */}
                <path
                    d={lineD}
                    fill="none"
                    stroke="#2d5cfe"
                    strokeWidth="3"
                    filter="url(#glow)"
                    className="transition-all duration-1000"
                />

                {/* Monthly Data Points */}
                {points.map((p, i) => (
                    <circle key={i} cx={p.x} cy={p.y} r="3" fill="#fff" filter="url(#glow)" className="opacity-40 hover:opacity-100 transition-all cursor-pointer" />
                ))}
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
