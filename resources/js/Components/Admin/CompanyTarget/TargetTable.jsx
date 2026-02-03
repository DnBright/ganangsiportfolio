import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';

const TargetTable = () => {
    const [targets, setTargets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Filters State
    const [filters, setFilters] = useState({
        region: '',
        industry: '',
        status: ''
    });

    const [formData, setFormData] = useState({
        id: null,
        company_name: '',
        region: '',
        industry: '',
        contact_person: '',
        email: '',
        whatsapp_contact: '',
        social_media: '',
        project_type: 'Website',
        proposal_status: 'Draft',
        proposal_final: null, // File object for upload
        proposal_final_url: null, // Display URL for edit
        admin_in_charge: 'Ganang'
    });
    const [errors, setErrors] = useState({});

    // Fetch data
    const fetchTargets = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/company-targets');
            const data = Array.isArray(response.data) ? response.data : [];
            setTargets(data);
        } catch (err) {
            console.error('Error fetching targets:', err);
            setTargets([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTargets();
    }, []);

    // Filter Logic
    const filteredTargets = useMemo(() => {
        return targets.filter(target => {
            const matchRegion = filters.region === '' ||
                (target.region && target.region.toLowerCase().includes(filters.region.toLowerCase()));
            const matchIndustry = filters.industry === '' ||
                (target.industry && target.industry.toLowerCase().includes(filters.industry.toLowerCase()));

            const matchStatus = filters.status === '' ||
                (target.proposal_status && target.proposal_status.toLowerCase() === filters.status.toLowerCase());

            return matchRegion && matchIndustry && matchStatus;
        });
    }, [targets, filters]);

    // Unique values for filter dropdowns (optional, but good UX if not free text)
    // For now using free text as requested, or maybe simple dropdowns if data is consistent?
    // Let's use text input for flexibility or simple unique mapping if list is small.
    // User asked for "filter daerah dan jenis company".

    const resetForm = () => {
        setFormData({
            id: null,
            company_name: '',
            region: '',
            industry: '',
            contact_person: '',
            email: '',
            whatsapp_contact: '',
            social_media: '',
            project_type: 'Website',
            proposal_status: 'Draft',
            proposal_final: null,
            proposal_final_url: null,
            admin_in_charge: 'Ganang'
        });
        setErrors({});
    };

    const handleOpenModal = (target = null) => {
        if (target) {
            setFormData({
                ...target,
                proposal_final: null,
                proposal_final_url: target.proposal_final
            });
        } else {
            resetForm();
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        resetForm();
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setFormData(prev => ({ ...prev, proposal_final: e.target.files[0] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        const data = new FormData();
        data.append('company_name', formData.company_name);
        data.append('region', formData.region || '');
        data.append('industry', formData.industry || '');
        data.append('contact_person', formData.contact_person || '');
        data.append('email', formData.email || '');
        data.append('whatsapp_contact', formData.whatsapp_contact || '');
        data.append('social_media', formData.social_media || '');
        data.append('project_type', formData.project_type || '');
        data.append('proposal_status', formData.proposal_status || 'Draft');
        data.append('admin_in_charge', formData.admin_in_charge || '');

        if (formData.proposal_final) {
            data.append('proposal_final', formData.proposal_final);
        }

        try {
            if (formData.id) {
                data.append('_method', 'PUT');
                await axios.post(`/company-targets/${formData.id}`, data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            } else {
                await axios.post('/company-targets', data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            }
            handleCloseModal();
            fetchTargets();
        } catch (err) {
            console.error('Error saving target:', err);
            if (err.response && err.response.data.errors) {
                setErrors(err.response.data.errors);
            } else {
                alert('An error occurred. Please try again.');
            }
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this target?')) {
            try {
                await axios.delete(`/company-targets/${id}`);
                fetchTargets();
            } catch (err) {
                console.error('Error deleting target:', err);
                alert('Failed to delete target.');
            }
        }
    };

    const handleStatusChange = async (id, newStatus) => {
        try {
            // Optimistic update
            setTargets(prev => prev.map(t =>
                t.id === id ? { ...t, proposal_status: newStatus } : t
            ));

            // We need to send other required fields or use PATCH if backend supports it.
            // Since controller uses validated data for update, let's just send the necessary fields 
            // but controller update method might require all fields if using 'put' semantic with 'validate'.
            // However, usually for status update we might want a specific endpoint or just send everything.
            // To be safe and simple given the current controller:

            const target = targets.find(t => t.id === id);
            if (!target) return;

            const data = new FormData();
            data.append('_method', 'PUT');
            data.append('company_name', target.company_name);
            data.append('region', target.region || '');
            data.append('industry', target.industry || '');
            data.append('contact_person', target.contact_person || '');
            data.append('email', target.email || '');
            data.append('whatsapp_contact', target.whatsapp_contact || '');
            data.append('social_media', target.social_media || '');
            data.append('project_type', target.project_type || '');
            data.append('proposal_status', newStatus); // The new status
            data.append('admin_in_charge', target.admin_in_charge || '');

            // Note: proposal_final file is not re-sent, so it should stay as is in DB (controller handles this if nullable)

            await axios.post(`/company-targets/${id}`, data);

            // Re-fetch to ensure sync (optional if optimistic is enough, but good for consistency)
            // fetchTargets(); 
        } catch (err) {
            console.error('Error updating status:', err);
            alert('Failed to update status.');
            fetchTargets(); // Revert on error
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Approved': return 'bg-green-500/20 text-green-400';
            case 'Sent': return 'bg-blue-500/20 text-blue-400';
            case 'Revised': return 'bg-yellow-500/20 text-yellow-400';
            case 'Archived': return 'bg-gray-500/20 text-gray-400';
            default: return 'bg-white/10 text-white/60';
        }
    };

    return (
        <div className="bg-[#0f1535]/60 backdrop-blur-xl border border-white/10 rounded-[30px] p-8 min-h-[500px]">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-xl font-bold text-white mb-2">Company Targets</h2>
                    <p className="text-sm text-white/50">Manage your prospective clients and proposals.</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-lg hover:shadow-blue-500/30"
                >
                    + Add New Target
                </button>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 bg-white/5 p-4 rounded-xl border border-white/5">
                <div className="flex flex-col gap-1">
                    <label className="text-xs text-white/40 uppercase font-bold tracking-wider">Filter Region (Daerah)</label>
                    <input
                        type="text"
                        name="region"
                        value={filters.region}
                        onChange={handleFilterChange}
                        className="bg-[#0f1535] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:border-blue-500 outline-none"
                        placeholder="All Regions..."
                    />
                </div>
                <input
                    type="text"
                    name="industry"
                    value={filters.industry}
                    onChange={handleFilterChange}
                    className="bg-[#0f1535] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:border-blue-500 outline-none"
                    placeholder="All Industries..."
                />
            </div>
            <div className="flex flex-col gap-1">
                <label className="text-xs text-white/40 uppercase font-bold tracking-wider">Filter Status</label>
                <select
                    name="status"
                    value={filters.status}
                    onChange={handleFilterChange}
                    className="bg-[#0f1535] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:border-blue-500 outline-none"
                >
                    <option value="">All Statuses</option>
                    <option value="Draft">DRAFT</option>
                    <option value="Archived">ARCHIVED</option>
                    <option value="Sent">SENT</option>
                    <option value="Approved">APPROVED</option>
                </select>
            </div>
            <div className="flex items-end">
                <button
                    onClick={() => setFilters({ region: '', industry: '', status: '' })}
                    className="px-4 py-2 text-sm text-white/40 hover:text-white transition-colors"
                >
                    Clear Filters
                </button>
            </div>


            {
                loading ? (
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
                                    <th className="p-4 text-xs uppercase tracking-wider text-white/40 font-bold">Email/WA</th>
                                    <th className="p-4 text-xs uppercase tracking-wider text-white/40 font-bold">Type</th>
                                    <th className="p-4 text-xs uppercase tracking-wider text-white/40 font-bold">Status</th>
                                    <th className="p-4 text-xs uppercase tracking-wider text-white/40 font-bold">Update</th>
                                    <th className="p-4 text-xs uppercase tracking-wider text-white/40 font-bold">Final</th>
                                    <th className="p-4 text-xs uppercase tracking-wider text-white/40 font-bold">Admin</th>
                                    <th className="p-4 text-xs uppercase tracking-wider text-white/40 font-bold text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {filteredTargets.length === 0 ? (
                                    <tr>
                                        <td colSpan="11" className="p-8 text-center text-white/30 italic">
                                            No targets found matching your filters.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredTargets.map((target) => (
                                        <tr key={target.id} className="hover:bg-white/5 transition-colors group">
                                            <td className="p-4 font-bold text-white max-w-[150px] truncate" title={target.company_name}>{target.company_name}</td>
                                            <td className="p-4 text-white/70 text-sm">{target.region || '-'}</td>
                                            <td className="p-4 text-white/70 text-sm">{target.industry}</td>
                                            <td className="p-4 text-white/70 text-sm">{target.contact_person}</td>
                                            <td className="p-4 text-white/70">
                                                <div className="flex flex-col gap-1 text-[10px]">
                                                    {target.email && <span className="text-white/60 truncate max-w-[120px]" title={target.email}>📧 {target.email}</span>}
                                                    {target.whatsapp_contact && <span className="text-green-400">📞 {target.whatsapp_contact}</span>}
                                                </div>
                                            </td>
                                            <td className="p-4 text-white/70 text-sm">{target.project_type}</td>
                                            <td className="p-4">
                                                <select
                                                    value={target.proposal_status}
                                                    onChange={(e) => handleStatusChange(target.id, e.target.value)}
                                                    className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border-none outline-none cursor-pointer appearance-none text-center min-w-[80px] ${getStatusColor(target.proposal_status)} hover:opacity-80 transition-opacity`}
                                                    style={{ textAlignLast: 'center' }}
                                                >
                                                    <option value="Draft" className="bg-[#0f1535] text-white">Draft</option>
                                                    <option value="Sent" className="bg-[#0f1535] text-white">Sent</option>
                                                    <option value="Revised" className="bg-[#0f1535] text-white">Revised</option>
                                                    <option value="Approved" className="bg-[#0f1535] text-white">Approved</option>
                                                    <option value="Archived" className="bg-[#0f1535] text-white">Archived</option>
                                                </select>
                                            </td>
                                            <td className="p-4 text-white/60 text-[10px]">
                                                {new Date(target.updated_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                                            </td>
                                            <td className="p-4 text-white/70">
                                                {target.proposal_final ? (
                                                    <a href={target.proposal_final} target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300 underline text-xs flex items-center gap-1">
                                                        <span>📄 View</span>
                                                    </a>
                                                ) : (
                                                    <span className="text-white/20 text-sm">-</span>
                                                )}
                                            </td>
                                            <td className="p-4 text-white/70 text-xs">
                                                {target.admin_in_charge}
                                            </td>
                                            <td className="p-4 text-right">
                                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button
                                                        onClick={() => handleOpenModal(target)}
                                                        className="w-8 h-8 rounded-lg bg-blue-500/20 hover:bg-blue-500 text-blue-400 hover:text-white flex items-center justify-center transition-all"
                                                        title="Edit Target"
                                                    >
                                                        ✏️
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(target.id)}
                                                        className="w-8 h-8 rounded-lg bg-red-500/20 hover:bg-red-500 text-red-400 hover:text-white flex items-center justify-center transition-all"
                                                        title="Delete Target"
                                                    >
                                                        🗑️
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                )
            }

            {/* Modal */}
            {
                isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                        <div className="bg-[#1a2042] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
                            <div className="p-6 border-b border-white/10">
                                <h3 className="text-xl font-bold text-white">
                                    {formData.id ? 'Edit Company Target' : 'New Company Target'}
                                </h3>
                            </div>
                            <form onSubmit={handleSubmit} className="p-6 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm text-white/60 font-medium">Company Name</label>
                                        <input
                                            type="text"
                                            name="company_name"
                                            value={formData.company_name}
                                            onChange={handleInputChange}
                                            className="w-full bg-[#0f1535] border border-white/20 rounded-lg p-3 text-white focus:border-blue-500 outline-none"
                                            placeholder="e.g. Acme Corp"
                                        />
                                        {errors.company_name && <p className="text-red-400 text-xs">{errors.company_name[0]}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm text-white/60 font-medium">Region (Daerah)</label>
                                        <input
                                            type="text"
                                            name="region"
                                            value={formData.region}
                                            onChange={handleInputChange}
                                            className="w-full bg-[#0f1535] border border-white/20 rounded-lg p-3 text-white focus:border-blue-500 outline-none"
                                            placeholder="e.g. Surabaya"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm text-white/60 font-medium">Industry</label>
                                        <input
                                            type="text"
                                            name="industry"
                                            value={formData.industry}
                                            onChange={handleInputChange}
                                            className="w-full bg-[#0f1535] border border-white/20 rounded-lg p-3 text-white focus:border-blue-500 outline-none"
                                            placeholder="e.g. Retail"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm text-white/60 font-medium">Contact Person</label>
                                        <input
                                            type="text"
                                            name="contact_person"
                                            value={formData.contact_person}
                                            onChange={handleInputChange}
                                            className="w-full bg-[#0f1535] border border-white/20 rounded-lg p-3 text-white focus:border-blue-500 outline-none"
                                            placeholder="e.g. John Doe"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm text-white/60 font-medium">Email (Optional)</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="w-full bg-[#0f1535] border border-white/20 rounded-lg p-3 text-white focus:border-blue-500 outline-none"
                                            placeholder="client@example.com"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm text-white/60 font-medium">WhatsApp (Optional)</label>
                                        <input
                                            type="text"
                                            name="whatsapp_contact"
                                            value={formData.whatsapp_contact}
                                            onChange={handleInputChange}
                                            className="w-full bg-[#0f1535] border border-white/20 rounded-lg p-3 text-white focus:border-blue-500 outline-none"
                                            placeholder="e.g. 0812..."
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm text-white/60 font-medium">Social Media (Optional)</label>
                                        <input
                                            type="text"
                                            name="social_media"
                                            value={formData.social_media}
                                            onChange={handleInputChange}
                                            className="w-full bg-[#0f1535] border border-white/20 rounded-lg p-3 text-white focus:border-blue-500 outline-none"
                                            placeholder="Link or Handle"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm text-white/60 font-medium">Project Type</label>
                                        <select
                                            name="project_type"
                                            value={formData.project_type}
                                            onChange={handleInputChange}
                                            className="w-full bg-[#0f1535] border border-white/20 rounded-lg p-3 text-white focus:border-blue-500 outline-none"
                                        >
                                            <option value="Website">Website</option>
                                            <option value="Landing Page">Landing Page</option>
                                            <option value="Dashboard">Dashboard</option>
                                            <option value="Sistem">Sistem</option>
                                            <option value="Mobile App">Mobile App</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm text-white/60 font-medium">Proposal Status</label>
                                        <select
                                            name="proposal_status"
                                            value={formData.proposal_status}
                                            onChange={handleInputChange}
                                            className="w-full bg-[#0f1535] border border-white/20 rounded-lg p-3 text-white focus:border-blue-500 outline-none"
                                        >
                                            <option value="Draft">Draft</option>
                                            <option value="Sent">Sent</option>
                                            <option value="Revised">Revised</option>
                                            <option value="Approved">Approved</option>
                                            <option value="Archived">Archived</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm text-white/60 font-medium">Admin In Charge</label>
                                        <select
                                            name="admin_in_charge"
                                            value={formData.admin_in_charge}
                                            onChange={handleInputChange}
                                            className="w-full bg-[#0f1535] border border-white/20 rounded-lg p-3 text-white focus:border-blue-500 outline-none"
                                        >
                                            <option value="Ganang">Ganang</option>
                                            <option value="Ipancok">Ipancok</option>
                                            <option value="Beseren">Beseren</option>
                                        </select>
                                    </div>
                                    <div className="md:col-span-2 space-y-2">
                                        <label className="text-sm text-white/60 font-medium">Proposal Final (PDF/Doc)</label>
                                        <input
                                            type="file"
                                            onChange={handleFileChange}
                                            className="w-full bg-[#0f1535] border border-white/20 rounded-lg p-3 text-white/60 file:bg-blue-600 file:border-none file:text-white file:rounded-md file:mr-4 file:px-4 file:py-1 hover:file:bg-blue-500 cursor-pointer"
                                        />
                                        {formData.proposal_final_url && (
                                            <p className="text-xs text-green-400 mt-1">Current file available. Upload new to replace.</p>
                                        )}
                                        {errors.proposal_final && <p className="text-red-400 text-xs">{errors.proposal_final[0]}</p>}
                                    </div>
                                </div>

                                <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-white/10">
                                    <button type="button" onClick={handleCloseModal} className="px-6 py-2 text-white/60 hover:text-white">Cancel</button>
                                    <button type="submit" className="px-8 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg shadow-lg">Save Target</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
        </div>
    );
};

export default TargetTable;
