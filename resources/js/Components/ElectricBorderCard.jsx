import React from 'react';

const ElectricBorderCard = ({ children, className = "" }) => {
    return (
        <div className={`relative group/card h-full ${className}`}>
            {/* Gradient Border Background */}
            <div className="absolute -inset-[2px] rounded-2xl bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 group-hover/card:opacity-100 blur-sm transition-opacity duration-500 animate-border-spin" />

            {/* Moving Light Beam */}
            <div className="absolute -inset-[1px] rounded-2xl overflow-hidden">
                <div className="absolute top-1/2 left-1/2 w-[200%] h-[200%] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_90deg_at_50%_50%,#00000000_50%,#06b6d4_100%)] animate-spin-slow opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Inner Content Card */}
            <div className="relative h-full bg-white rounded-2xl p-[1px] z-10">
                <div className="h-full w-full bg-white rounded-2xl overflow-hidden">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default ElectricBorderCard;
