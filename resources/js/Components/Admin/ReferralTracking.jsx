import React from 'react';

const ReferralTracking = () => {
    return (
        <div className="h-full w-full bg-[#0f1535]/60 backdrop-blur-xl border border-white/10 rounded-[30px] p-6">
            <div className="flex justify-between items-center mb-6 px-1">
                <h3 className="text-sm font-bold">Referral Tracking</h3>
                <span className="bg-[#1b2252]/60 p-2 rounded-xl text-[10px] cursor-pointer hover:bg-[#2d5cfe]/20 transition-colors">⋮</span>
            </div>

            <div className="grid grid-cols-2 gap-4 h-full">
                <div className="space-y-4">
                    <div className="bg-[#10173e] border border-white/5 rounded-2xl p-4">
                        <p className="text-[10px] text-white/40 uppercase font-bold mb-1">Invited</p>
                        <p className="text-lg font-bold">145 people</p>
                    </div>
                    <div className="bg-[#10173e] border border-white/5 rounded-2xl p-4">
                        <p className="text-[10px] text-white/40 uppercase font-bold mb-1">Bonus</p>
                        <p className="text-lg font-bold">1,465</p>
                    </div>
                </div>

                <div className="relative flex items-center justify-center">
                    {/* Safety Score Gauge */}
                    <svg viewBox="0 0 100 100" className="w-full max-w-[140px] transform -rotate-90">
                        <circle cx="50" cy="50" r="40" fill="transparent" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                        <circle
                            cx="50" cy="50" r="40"
                            fill="transparent"
                            stroke="#01c0c8"
                            strokeWidth="8"
                            strokeDasharray="251.2"
                            strokeDashoffset="75"
                            strokeLinecap="round"
                        />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <p className="text-[10px] text-white/40 uppercase font-bold mb-1">Safety</p>
                        <p className="text-2xl font-bold">9.3</p>
                        <p className="text-[8px] text-white/30 uppercase mt-1">Total Score</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReferralTracking;
