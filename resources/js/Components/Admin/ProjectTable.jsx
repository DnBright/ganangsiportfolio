import React from 'react';

const ProjectTable = () => {
    const projects = [
        { name: 'Chakra Soft UI Version', budget: '$14,000', completion: 60, icon: '🎨' },
        { name: 'Add Progress Track', budget: '$3,000', completion: 10, icon: '📈' },
        { name: 'Fix Platform Errors', budget: 'Not set', completion: 100, icon: '🔧' },
        { name: 'Launch New Mobile App', budget: '$20,600', completion: 100, icon: '📱' },
    ];

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead>
                    <tr className="text-[10px] font-bold uppercase tracking-widest opacity-40 border-b border-white/5">
                        <th className="pb-4">Companies</th>
                        <th className="pb-4">Budget</th>
                        <th className="pb-4">Completion</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                    {projects.map((project, i) => (
                        <tr key={i} className="group hover:bg-white/5 transition-colors">
                            <td className="py-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center text-sm">{project.icon}</div>
                                    <span className="text-sm font-bold">{project.name}</span>
                                </div>
                            </td>
                            <td className="py-4 font-bold text-sm">{project.budget}</td>
                            <td className="py-4">
                                <div className="w-24">
                                    <div className="flex justify-between text-[10px] font-bold mb-1">
                                        <span>{project.completion}%</span>
                                    </div>
                                    <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full transition-all duration-1000 ${project.completion === 100 ? 'bg-green-400' : 'bg-blue-500'
                                                }`}
                                            style={{ width: `${project.completion}%` }}
                                        />
                                    </div>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProjectTable;
