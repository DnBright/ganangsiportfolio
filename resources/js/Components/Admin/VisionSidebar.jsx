import React from 'react';

const VisionSidebar = () => {
    const menuItems = [
        { label: 'Dashboard', icon: '🏠', active: true },
        { label: 'Tables', icon: '📊', active: false },
        { label: 'Billing', icon: '💳', active: false },
        { label: 'RTL', icon: '🔧', active: false },
    ];

    const accountPages = [
        { label: 'Profile', icon: '👤', active: false },
        { label: 'Sign In', icon: '🔑', active: false },
        { label: 'Sign Up', icon: '📝', active: false },
    ];

    return (
        <div className="w-64 h-[calc(100vh-48px)] bg-black/40 backdrop-blur-xl border border-white/5 rounded-[30px] p-6 flex flex-col sticky top-6">
            <div className="flex items-center gap-3 px-2 mb-10">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center font-bold">V</div>
                <span className="font-bold tracking-wider uppercase text-xs">Vision UI free</span>
            </div>

            <nav className="flex-1 space-y-8">
                <div>
                    <ul className="space-y-2">
                        {menuItems.map((item) => (
                            <li key={item.label}>
                                <a
                                    href="#"
                                    className={`flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 ${item.active
                                            ? 'bg-white/10 shadow-lg shadow-blue-500/10'
                                            : 'hover:bg-white/5 opacity-60 hover:opacity-100'
                                        }`}
                                >
                                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm ${item.active ? 'bg-blue-500 shadow-lg shadow-blue-500/40' : 'bg-white/5'
                                        }`}>
                                        {item.icon}
                                    </div>
                                    <span className="text-sm font-medium">{item.label}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <p className="px-4 text-[10px] font-bold uppercase tracking-widest opacity-40 mb-4">Account Pages</p>
                    <ul className="space-y-2">
                        {accountPages.map((item) => (
                            <li key={item.label}>
                                <a
                                    href="#"
                                    className="flex items-center gap-4 px-4 py-3 rounded-2xl hover:bg-white/5 transition-all opacity-60 hover:opacity-100"
                                >
                                    <div className="w-8 h-8 bg-white/5 rounded-xl flex items-center justify-center text-sm">
                                        {item.icon}
                                    </div>
                                    <span className="text-sm font-medium">{item.label}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>

            <div className="mt-auto">
                <div className="bg-gradient-to-br from-blue-600 to-indigo-800 rounded-3xl p-4 relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mb-3 text-xs">⭐</div>
                        <p className="text-xs font-bold mb-1">Need help?</p>
                        <p className="text-[10px] opacity-70 mb-4">Please check our docs</p>
                        <button className="w-full py-2 bg-white text-black rounded-xl text-[10px] font-bold uppercase tracking-wider">Documentation</button>
                    </div>
                    <div className="absolute top-[-20%] right-[-20%] w-24 h-24 bg-white/10 rounded-full blur-xl" />
                </div>
            </div>
        </div>
    );
};

export default VisionSidebar;
