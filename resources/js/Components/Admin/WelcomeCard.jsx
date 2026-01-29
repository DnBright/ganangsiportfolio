import React from 'react';

const WelcomeCard = ({ name }) => {
    return (
        <div className="relative h-full min-h-[300px] w-full bg-gradient-to-br from-[#0f1535] to-[#0b0f2a] rounded-[30px] p-8 border border-white/10 overflow-hidden group">
            {/* Background Image - Using a similar jellyfish style */}
            <div
                className="absolute inset-0 bg-cover bg-center opacity-60 mix-blend-screen group-hover:scale-110 transition-transform duration-[2000ms]"
                style={{
                    backgroundImage: 'url("https://images.unsplash.com/photo-1544610898-141443657758?q=80&w=1000&auto=format&fit=crop")', // Placeholder for jellyfish
                    filter: 'hue-rotate(180deg) brightness(0.8)'
                }}
            />

            {/* Content */}
            <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                    <p className="text-xs text-white/50 mb-1 font-medium">Welcome back,</p>
                    <h2 className="text-2xl font-bold mb-4 tracking-tight">{name}</h2>
                    <p className="text-sm text-white/50 max-w-[200px] leading-relaxed">
                        Glad to see you again! Ask me anything.
                    </p>
                </div>

                <div className="mt-8 flex items-center gap-2 group/link cursor-pointer">
                    <span className="text-xs font-bold uppercase tracking-widest text-white group-hover/link:translate-x-1 transition-transform">
                        Tap to record
                    </span>
                    <span className="text-white group-hover/link:translate-x-2 transition-transform">→</span>
                </div>
            </div>
        </div>
    );
};

export default WelcomeCard;
