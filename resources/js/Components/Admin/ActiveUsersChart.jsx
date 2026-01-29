import React from 'react';

const ActiveUsersChart = () => {
    const barData = [60, 40, 80, 50, 90, 70, 45, 85, 30, 75, 65, 55];

    return (
        <div className="h-full w-full bg-[#0f1535]/60 backdrop-blur-xl border border-white/10 rounded-[30px] p-6 flex flex-col">
            <div className="h-48 w-full bg-gradient-to-br from-[#2d5cfe] to-[#1a2c8a] rounded-2xl mb-6 p-6 relative overflow-hidden">
                <div className="flex items-end justify-between h-full gap-2 relative z-10">
                    {barData.map((h, i) => (
                        <div
                            key={i}
                            className="flex-1 bg-white/30 rounded-full hover:bg-white transition-all duration-300"
                            style={{ height: `${h}%` }}
                        />
                    ))}
                </div>
                {/* Background Decorative Mesh */}
                <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
            </div>

            <div>
                <h3 className="text-sm font-bold mb-1">Active Users</h3>
                <p className="text-xs text-green-400 font-bold mb-6">(+23) <span className="text-white/40 font-normal">than last week</span></p>
            </div>

            <div className="grid grid-cols-4 gap-4">
                {[
                    { label: 'Users', value: '32,984', progress: 'w-[60%]' },
                    { label: 'Clicks', value: '2.42m', progress: 'w-[80%]' },
                    { label: 'Sales', value: '2,400$', progress: 'w-[45%]' },
                    { label: 'Items', value: '320', progress: 'w-[90%]' },
                ].map((stat, i) => (
                    <div key={i} className="space-y-2">
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#2d5cfe]" />
                            <p className="text-[10px] text-white/40 font-bold uppercase">{stat.label}</p>
                        </div>
                        <p className="text-sm font-bold tracking-tight">{stat.value}</p>
                        <div className="h-[3px] w-full bg-white/10 rounded-full overflow-hidden">
                            <div className={`h-full bg-white rounded-full ${stat.progress}`} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ActiveUsersChart;
