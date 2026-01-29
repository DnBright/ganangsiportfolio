import React from 'react';

const VisionSidebar = () => {
    const menuItems = [
        { label: 'Dashboard', icon: '🏠', active: true },
        { label: 'Tables', icon: '📊', active: false },
        { label: 'Billing', icon: '💳', active: false },
        { label: 'RTL', icon: '🌍', active: false },
    ];

    const accountPages = [
        { label: 'Profile', icon: '👤', active: false },
        { label: 'Sign In', icon: '🔑', active: false },
        { label: 'Sign Up', icon: '🚀', active: false },
    ];

    return (
        <div className="w-64 h-[calc(100vh-48px)] bg-gradient-to-b from-[#060b26] to-[#0b1437] border border-white/10 rounded-[30px] p-6 flex flex-col fixed shadow-2xl overflow-y-auto no-scrollbar">
            {/* Brand Header */}
            <div className="flex items-center gap-3 px-4 mb-10">
                <div className="w-8 h-8 bg-[#2d5cfe] rounded-lg flex items-center justify-center font-bold text-lg shadow-[0_0_10px_rgba(45,92,254,0.5)]">V</div>
                <span className="font-bold text-sm tracking-widest uppercase">Vision UI Free</span>
            </div>

            {/* Navigation */}
            <div className="flex-1 space-y-8">
                <div>
                    <nav className="space-y-2">
                        {menuItems.map((item, i) => (
                            <div
                                key={i}
                                className={`flex items-center gap-4 px-4 py-3 rounded-2xl cursor-pointer transition-all duration-300 group ${item.active ? 'bg-[#1a2c8a] shadow-lg' : 'hover:bg-white/5'
                                    }`}
                            >
                                <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm ${item.active ? 'bg-[#2d5cfe]' : 'bg-[#1b2252]'}`}>
                                    {item.icon}
                                </div>
                                <span className={`text-xs font-bold ${item.active ? 'text-white' : 'text-white/40 group-hover:text-white'}`}>
                                    {item.label}
                                </span>
                            </div>
                        ))}
                    </nav>
                </div>

                <div>
                    <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest px-4 mb-4">Account Pages</p>
                    <nav className="space-y-2">
                        {accountPages.map((item, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-4 px-4 py-3 rounded-2xl cursor-pointer hover:bg-white/5 transition-all duration-300 group"
                            >
                                <div className="w-8 h-8 rounded-xl bg-[#1b2252] flex items-center justify-center text-sm">
                                    {item.icon}
                                </div>
                                <span className="text-xs font-bold text-white/40 group-hover:text-white transition-colors">
                                    {item.label}
                                </span>
                            </div>
                        ))}
                    </nav>
                </div>
            </div>

            {/* Help Card - Matching the Jellyfish Design */}
            <div className="mt-8 relative group overflow-hidden rounded-[24px]">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-80 mix-blend-overlay group-hover:scale-110 transition-transform duration-700"
                    style={{
                        backgroundImage: 'url("https://images.unsplash.com/photo-1544610898-141443657758?q=20&w=400&auto=format&fit=crop")',
                        filter: 'hue-rotate(200deg) brightness(0.6)'
                    }}
                />
                <div className="relative z-10 p-5 bg-gradient-to-t from-[#2d5cfe]/60 to-transparent">
                    <div className="w-8 h-8 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center mb-4">
                        <span className="text-white text-xs">❓</span>
                    </div>
                    <p className="text-xs font-bold mb-1">Need help?</p>
                    <p className="text-[10px] text-white/60 mb-4">Please check our docs</p>
                    <button className="w-full bg-white text-black text-[10px] font-bold py-2.5 rounded-xl uppercase tracking-wider hover:bg-white/90 active:scale-95 transition-all">
                        Documentation
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VisionSidebar;
