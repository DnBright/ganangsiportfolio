import React from 'react';

const StatCard = ({ title, value, growth, icon }) => {
    const getIcon = () => {
        switch (icon) {
            case 'money': return '💰';
            case 'users': return '👥';
            case 'clients': return '💼';
            case 'sales': return '🛒';
            default: return '📈';
        }
    };

    return (
        <div className="bg-black/40 backdrop-blur-xl border border-white/5 rounded-[30px] p-6 flex justify-between items-center group hover:bg-white/5 transition-all duration-300">
            <div>
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-40 mb-1">{title}</p>
                <div className="flex items-center gap-2">
                    <span className="text-xl font-bold">{value}</span>
                    <span className={`text-[10px] font-bold ${growth.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                        {growth}
                    </span>
                </div>
            </div>
            <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center text-xl shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform duration-300">
                {getIcon()}
            </div>
        </div>
    );
};

export default StatCard;
