import React from 'react';

const ActiveUsersChart = ({ clickStats = {} }) => {
    const counts = [
        clickStats.click_saitama || 0,
        clickStats.click_kursus_jepang || 0,
        clickStats.click_ayaka || 0,
        clickStats.click_akab || 0
    ];

    const maxCount = Math.max(...counts, 10);

    const barData = counts.flatMap(count => {
        const baseH = (count / maxCount) * 80 + 10;
        return [
            Math.min(100, baseH * 0.8),
            Math.min(100, baseH),
            Math.min(100, baseH * 0.9)
        ];
    });

    const stats = [
        { label: 'Saitama', value: clickStats.click_saitama || 0, progress: `${((clickStats.click_saitama || 0) / maxCount) * 100}%` },
        { label: 'Kursus Jepang', value: clickStats.click_kursus_jepang || 0, progress: `${((clickStats.click_kursus_jepang || 0) / maxCount) * 100}%` },
        { label: 'Ayaka', value: clickStats.click_ayaka || 0, progress: `${((clickStats.click_ayaka || 0) / maxCount) * 100}%` },
        { label: 'AKAB', value: clickStats.click_akab || 0, progress: `${((clickStats.click_akab || 0) / maxCount) * 100}%` },
    ];

    return (
        <div className="h-full w-full bg-[#0f1535]/60 backdrop-blur-xl border border-white/10 rounded-[30px] p-6 flex flex-col">
            <div className="h-48 w-full bg-gradient-to-br from-[#2d5cfe] to-[#1a2c8a] rounded-2xl mb-6 p-6 relative overflow-hidden">
                <div className="flex items-end justify-between h-full gap-2 relative z-10">
                    {barData.map((h, i) => (
                        <div
                            key={i}
                            className="flex-1 bg-white/30 rounded-full hover:bg-white transition-all duration-500 ease-out"
                            style={{ height: `${h}%` }}
                        />
                    ))}
                </div>
                {/* Background Decorative Mesh */}
                <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
            </div>

            <div>
                <h3 className="text-sm font-bold mb-1">Click Prototype</h3>
                <p className="text-xs text-green-400 font-bold mb-6">Live <span className="text-white/40 font-normal">Tracking Report</span></p>
            </div>

            <div className="grid grid-cols-4 gap-4">
                {stats.map((stat, i) => (
                    <div key={i} className="space-y-2">
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#2d5cfe]" />
                            <p className="text-[10px] text-white/40 font-bold uppercase truncate">{stat.label}</p>
                        </div>
                        <p className="text-sm font-black tracking-tight">{stat.value}</p>
                        <div className="h-[3px] w-full bg-white/10 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-white rounded-full transition-all duration-1000"
                                style={{ width: stat.progress }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ActiveUsersChart;
