import React from 'react';

const ProjectTable = () => {
    const projects = [
        { name: 'Chakra Soft UI Version', budget: '$14,000', completion: 60, icon: '🎨' },
        { name: 'Add Progress Track', budget: '$3,000', completion: 10, icon: '🚛' },
        { name: 'Fix Platform Errors', budget: 'Not set', completion: 100, icon: '🔧' },
        { name: 'Launch our Mobile App', budget: '$32,000', completion: 100, icon: '📱' },
        { name: 'Add the New Pricing Page', budget: '$400', completion: 25, icon: '💳' },
    ];

    return (
        <table className="w-full text-left border-collapse">
            <thead>
                <tr className="border-b border-white/5">
                    <th className="pb-4 text-[10px] text-white/40 uppercase font-bold tracking-widest px-1">Companies</th>
                    <th className="pb-4 text-[10px] text-white/40 uppercase font-bold tracking-widest hidden md:table-cell">Members</th>
                    <th className="pb-4 text-[10px] text-white/40 uppercase font-bold tracking-widest">Budget</th>
                    <th className="pb-4 text-[10px] text-white/40 uppercase font-bold tracking-widest">Completion</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
                {projects.map((proj, i) => (
                    <tr key={i} className="group hover:bg-white/[0.02] transition-colors">
                        <td className="py-5 flex items-center gap-3 px-1">
                            <div className="w-8 h-8 rounded-lg bg-[#1b2252] flex items-center justify-center text-sm shadow-inner overflow-hidden group-hover:scale-110 transition-transform">
                                {proj.icon}
                            </div>
                            <span className="text-xs font-bold whitespace-nowrap">{proj.name}</span>
                        </td>
                        <td className="py-4 hidden md:table-cell">
                            <div className="flex -space-x-2">
                                {[1, 2, 3].map(m => (
                                    <div key={m} className="w-5 h-5 rounded-full border border-[#0f1535] bg-gradient-to-br from-blue-500 to-indigo-600" />
                                ))}
                            </div>
                        </td>
                        <td className="py-4 text-xs font-bold text-white/80">{proj.budget}</td>
                        <td className="py-4">
                            <div className="w-full max-w-[100px] flex flex-col gap-1.5">
                                <span className="text-[10px] font-bold">{proj.completion}%</span>
                                <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full bg-[#2d5cfe] rounded-full transition-all duration-1000 ${proj.completion === 0 ? 'w-0' : ''}`}
                                        style={{ width: `${proj.completion}%` }}
                                    />
                                </div>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ProjectTable;
