import React, { useState } from 'react';

const VisionSidebar = ({ activeTab, onNavigate }) => {
    const [proposalExpanded, setProposalExpanded] = useState(false);

    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
        { id: 'leads', label: 'Leads', icon: '👥' },
        {
            id: 'proposal',
            label: 'Proposal Generator',
            icon: '📝',
            hasSubmenu: true,
            children: [
                { id: 'create_proposal', label: 'Create Proposal', icon: '➕' },
                { id: 'draft_ai', label: 'Draft AI', icon: '🤖' },
                { id: 'editor_proposal', label: 'Editor Proposal', icon: '✍️' },
                { id: 'proposal_library', label: 'Proposal Library', icon: '📚' },
                { id: 'templates_prompt', label: 'Templates & Prompt', icon: '⚡' },
                { id: 'performance', label: 'Performance', icon: '📈' },
            ]
        },
        { id: 'projects', label: 'Projects', icon: '💼' },
        { id: 'portfolio', label: 'Portfolio', icon: '📁' },
    ];

    const managementItems = [
        { id: 'users', label: 'Users / Team', icon: '👤' },
        { id: 'settings', label: 'Settings', icon: '⚙️' },
    ];

    return (
        <div className="w-64 h-[calc(100vh-48px)] bg-gradient-to-b from-[#060b26] to-[#0b1437] border border-white/10 rounded-[30px] p-6 flex flex-col fixed shadow-2xl overflow-y-auto no-scrollbar selection:bg-blue-500/30">
            {/* Brand Header */}
            <div className="flex items-center gap-3 px-4 mb-10">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-400 rounded-lg flex items-center justify-center font-bold text-lg shadow-[0_0_15px_rgba(45,92,254,0.4)] text-white">D</div>
                <div className="flex flex-col">
                    <span className="font-bold text-xs tracking-widest uppercase text-white">DNB Admin v2.2</span>
                    <span className="text-[8px] text-white/30 tracking-tighter uppercase font-bold">Proposal Command</span>
                </div>
            </div>

            {/* Navigation */}
            <div className="flex-1 space-y-8">
                <div>
                    <nav className="space-y-1">
                        {menuItems.map((item) => (
                            <div key={item.id} className="space-y-1">
                                <div
                                    onClick={() => {
                                        if (item.hasSubmenu) {
                                            setProposalExpanded(!proposalExpanded);
                                        } else {
                                            onNavigate(item.id);
                                        }
                                    }}
                                    className={`flex items-center gap-4 px-4 py-3 rounded-2xl cursor-pointer transition-all duration-300 group ${activeTab === item.id ? 'bg-[#1a2c8a] shadow-lg shadow-blue-900/20' : 'hover:bg-white/5'
                                        }`}
                                >
                                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm transition-transform duration-300 group-hover:scale-110 ${activeTab === item.id ? 'bg-blue-600' : 'bg-[#1b2252]'}`}>
                                        {item.icon}
                                    </div>
                                    <span className={`text-xs font-bold flex-1 ${activeTab === item.id ? 'text-white' : 'text-white/40 group-hover:text-white'}`}>
                                        {item.label}
                                    </span>
                                    {item.hasSubmenu && (
                                        <span className={`text-[10px] transition-transform duration-300 ${proposalExpanded ? 'rotate-180' : ''} text-white/20`}>
                                            ▼
                                        </span>
                                    )}
                                </div>

                                {/* Submenu */}
                                {item.hasSubmenu && proposalExpanded && (
                                    <div className="ml-6 space-y-1 overflow-hidden transition-all animate-fade-down animate-duration-300">
                                        {item.children.map((child, ci) => (
                                            <div
                                                key={ci}
                                                onClick={() => onNavigate(child.id)}
                                                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl cursor-pointer group transition-colors ${activeTab === child.id ? 'bg-white/5' : 'hover:bg-white/5'}`}
                                            >
                                                <span className={`text-[10px] transition-opacity ${activeTab === child.id ? 'opacity-100' : 'opacity-20 group-hover:opacity-100'}`}>{child.icon}</span>
                                                <span className={`text-[10px] font-bold transition-colors ${activeTab === child.id ? 'text-white' : 'text-white/30 group-hover:text-white'}`}>
                                                    {child.label}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </nav>
                </div>

                <div>
                    <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest px-4 mb-3">Management</p>
                    <nav className="space-y-1">
                        {managementItems.map((item) => (
                            <div
                                key={item.id}
                                onClick={() => onNavigate(item.id)}
                                className={`flex items-center gap-4 px-4 py-3 rounded-2xl cursor-pointer transition-all duration-300 group ${activeTab === item.id ? 'bg-white/5' : 'hover:bg-white/5'}`}
                            >
                                <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm transition-transform duration-300 group-hover:scale-110 ${activeTab === item.id ? 'bg-blue-600 animate-pulse' : 'bg-[#1b2252]'}`}>
                                    {item.icon}
                                </div>
                                <span className={`text-xs font-bold ${activeTab === item.id ? 'text-white' : 'text-white/40 group-hover:text-white'}`}>
                                    {item.label}
                                </span>
                            </div>
                        ))}

                        {/* Logout Button */}
                        <form action="/logout" method="POST" className="mt-4">
                            <input type="hidden" name="_token" value={document.querySelector('meta[name="csrf-token"]')?.content} />
                            <button
                                type="submit"
                                className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl cursor-pointer hover:bg-red-500/10 transition-all duration-300 group border border-transparent hover:border-red-500/20"
                            >
                                <div className="w-8 h-8 rounded-xl bg-red-500/10 flex items-center justify-center text-sm group-hover:bg-red-500 group-hover:animate-bounce transition-all">
                                    🚪
                                </div>
                                <span className="text-xs font-bold text-red-500/60 group-hover:text-red-500">
                                    Logout
                                </span>
                            </button>
                        </form>
                    </nav>
                </div>
            </div>

            {/* AI Target Card */}
            <div className="mt-8 relative group overflow-hidden rounded-[24px] border border-blue-500/20">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-cyan-400/5 backdrop-blur-sm" />
                <div className="relative z-10 p-5">
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center text-xs shadow-lg shadow-blue-600/30">
                            🤖
                        </div>
                        <span className="text-[10px] font-bold text-blue-400 uppercase">Daily Goal</span>
                    </div>
                    <p className="text-xs font-bold mb-1">Target: 3 Proposals</p>
                    <div className="h-1.5 w-full bg-white/5 rounded-full mb-3 overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 w-1/3 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                    </div>
                    <p className="text-[9px] text-white/40 mb-0 font-medium">1 of 3 generated today</p>
                </div>
            </div>
        </div>
    );
};

export default VisionSidebar;
