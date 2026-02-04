import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProjectsTable = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchProjects = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/projects');
            const data = Array.isArray(response.data) ? response.data : [];
            setProjects(data);
        } catch (err) {
            console.error('Error fetching projects:', err);
            setProjects([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Yakin ingin menghapus project ini?')) {
            try {
                await axios.delete(`/projects/${id}`);
                fetchProjects();
            } catch (err) {
                console.error('Error deleting project:', err);
                alert('Gagal menghapus project.');
            }
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Completed': return 'bg-green-500/20 text-green-400';
            case 'In Progress': return 'bg-blue-500/20 text-blue-400';
            case 'On Hold': return 'bg-yellow-500/20 text-yellow-400';
            case 'Cancelled': return 'bg-red-500/20 text-red-400';
            default: return 'bg-white/10 text-white/60';
        }
    };

    return (
        <div className="bg-[#0f1535]/60 backdrop-blur-xl border border-white/10 rounded-[30px] p-8 min-h-[500px]">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-xl font-bold text-white mb-2">Active Projects</h2>
                    <p className="text-sm text-white/50">Perusahaan yang sudah dieksekusi dan dihubungi.</p>
                </div>
                <div className="px-4 py-2 bg-blue-600/20 border border-blue-500/30 rounded-xl">
                    <span className="text-blue-400 font-bold text-sm">{projects.length} Projects</span>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white"></div>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-white/10">
                                <th className="p-4 text-xs uppercase tracking-wider text-white/40 font-bold">Company</th>
                                <th className="p-4 text-xs uppercase tracking-wider text-white/40 font-bold">Region</th>
                                <th className="p-4 text-xs uppercase tracking-wider text-white/40 font-bold">Industry</th>
                                <th className="p-4 text-xs uppercase tracking-wider text-white/40 font-bold">Contact</th>
                                <th className="p-4 text-xs uppercase tracking-wider text-white/40 font-bold">Type</th>
                                <th className="p-4 text-xs uppercase tracking-wider text-white/40 font-bold">Status</th>
                                <th className="p-4 text-xs uppercase tracking-wider text-white/40 font-bold">Executed</th>
                                <th className="p-4 text-xs uppercase tracking-wider text-white/40 font-bold">Files</th>
                                <th className="p-4 text-xs uppercase tracking-wider text-white/40 font-bold">Admin</th>
                                <th className="p-4 text-xs uppercase tracking-wider text-white/40 font-bold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {projects.length === 0 ? (
                                <tr>
                                    <td colSpan="10" className="p-8 text-center text-white/30 italic">
                                        Belum ada project yang dieksekusi.
                                    </td>
                                </tr>
                            ) : (
                                projects.map((project) => (
                                    <tr key={project.id} className="hover:bg-white/5 transition-colors group">
                                        <td className="p-4 font-bold text-white max-w-[150px] truncate" title={project.company_name}>
                                            {project.company_name}
                                        </td>
                                        <td className="p-4 text-white/70 text-sm">{project.region || '-'}</td>
                                        <td className="p-4 text-white/70 text-sm">{project.industry}</td>
                                        <td className="p-4 text-white/70 text-sm">{project.contact_person}</td>
                                        <td className="p-4 text-white/70 text-sm">{project.project_type}</td>
                                        <td className="p-4">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${getStatusColor(project.project_status)}`}>
                                                {project.project_status}
                                            </span>
                                        </td>
                                        <td className="p-4 text-white/60 text-[10px]">
                                            {new Date(project.executed_at).toLocaleDateString('id-ID', {
                                                day: 'numeric',
                                                month: 'short',
                                                year: 'numeric'
                                            })}
                                        </td>
                                        <td className="p-4">
                                            <div className="flex gap-2">
                                                {project.proposal_file && (
                                                    <a
                                                        href={project.proposal_file}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="text-blue-400 hover:text-blue-300 text-xs"
                                                        title="View Proposal"
                                                    >
                                                        📄
                                                    </a>
                                                )}
                                                {project.screenshot_file && (
                                                    <a
                                                        href={project.screenshot_file}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="text-green-400 hover:text-green-300 text-xs"
                                                        title="View Screenshot"
                                                    >
                                                        🖼️
                                                    </a>
                                                )}
                                            </div>
                                        </td>
                                        <td className="p-4 text-white/70 text-xs">{project.admin_in_charge}</td>
                                        <td className="p-4 text-right">
                                            <button
                                                onClick={() => handleDelete(project.id)}
                                                className="w-8 h-8 rounded-lg bg-red-500/20 hover:bg-red-500 text-red-400 hover:text-white flex items-center justify-center transition-all shadow-sm"
                                                title="Delete Project"
                                            >
                                                🗑️
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ProjectsTable;
