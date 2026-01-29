import React from 'react';

const StatCard = ({ title, value, growth, icon }) => {
    const getIcon = () => {
        switch (icon) {
            case 'money': return '💰';
            case 'users': return '👥';
            case 'clients': return '💼';
            case 'sales': return '🛒';
            default: return '📊';
        }
    };

    const isPositive = growth.startsWith('+');

    return (
        <div className="bg-[#0f1535]/60 backdrop-blur-xl border border-white/10 rounded-[24px] p-5 flex items-center justify-between group hover:border-white/20 transition-all duration-300">
            <div className="space-y-1">
                <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">{title}</p>
                <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold tracking-tight">{value}</h3>
                    <span className={`text-[10px] font-bold ${isPositive ? 'text-green-400' : 'text-red-500'}`}>
                        {growth}
                    </span>
                </div>
            </div>

            <div className="w-11 h-11 bg-[#2d5cfe] rounded-xl flex items-center justify-center text-lg shadow-[0_0_15px_rgba(45,92,254,0.4)] group-hover:scale-110 transition-transform">
                {getIcon()}
            </div>
        </div>
    );
};

export default StatCard;
