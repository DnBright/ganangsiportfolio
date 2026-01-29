import React from 'react';

const SatisfactionGauge = ({ percentage = 95 }) => {
    const radius = 70;
    const stroke = 12;
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
        <div className="h-full w-full bg-[#0f1535]/60 backdrop-blur-xl border border-white/10 rounded-[30px] p-6 flex flex-col items-center justify-between">
            <div className="w-full text-left">
                <h3 className="text-sm font-bold mb-1">Satisfaction Rate</h3>
                <p className="text-[10px] text-white/40 mb-4">From all projects</p>
            </div>

            <div className="relative flex items-center justify-center -mt-4">
                <svg height={radius * 2} width={radius * 2} className="transform -rotate-90">
                    {/* Background circle */}
                    <circle
                        stroke="rgba(255, 255, 255, 0.05)"
                        fill="transparent"
                        strokeWidth={stroke}
                        r={normalizedRadius}
                        cx={radius}
                        cy={radius}
                    />
                    {/* Progress circle */}
                    <circle
                        stroke="#2d5cfe"
                        fill="transparent"
                        strokeWidth={stroke}
                        strokeDasharray={circumference + ' ' + circumference}
                        style={{ strokeDashoffset }}
                        strokeLinecap="round"
                        r={normalizedRadius}
                        cx={radius}
                        cy={radius}
                        className="transition-all duration-1000 ease-out"
                    />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="bg-[#2d5cfe] p-2 rounded-full mb-2">
                        <span className="text-lg leading-none">😊</span>
                    </div>
                </div>
            </div>

            <div className="w-full bg-[#1b2252]/60 rounded-3xl p-4 flex justify-between items-center mt-4">
                <div>
                    <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest">0%</p>
                </div>
                <div className="text-center">
                    <p className="text-xl font-bold">{percentage}%</p>
                    <p className="text-[8px] text-white/30 uppercase tracking-widest">Based on likes</p>
                </div>
                <div>
                    <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest">100%</p>
                </div>
            </div>
        </div>
    );
};

export default SatisfactionGauge;
