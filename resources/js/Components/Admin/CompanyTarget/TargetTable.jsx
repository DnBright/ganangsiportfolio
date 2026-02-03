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
                                                <div className="flex items-center justify-end gap-2 transition-opacity">
                                                    <button
                                                        onClick={() => handleOpenModal(target)}
                                                        className="w-8 h-8 rounded-lg bg-blue-500/10 hover:bg-blue-500 text-blue-400 hover:text-white flex items-center justify-center transition-all shadow-sm"
                                                        title="Edit Target"
                                                    >
                                                        ✏️
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(target.id)}
                                                        className="w-8 h-8 rounded-lg bg-red-500/20 hover:bg-red-500 text-red-400 hover:text-white flex items-center justify-center transition-all shadow-sm"
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

            {/* Optimized Zero-Scroll Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-[#060b26]/90 backdrop-blur-md animate-in fade-in duration-300"
                        onClick={handleCloseModal}
                    ></div>

                    <div className="bg-[#1a2042] border border-white/10 rounded-[32px] w-full max-w-5xl max-h-[85vh] overflow-hidden shadow-2xl relative z-10 animate-in zoom-in-95 duration-300 flex flex-col">

                        {/* Fixed Compact Header */}
                        <div className="shrink-0 px-8 py-6 border-b border-white/10 bg-gradient-to-r from-blue-600/10 to-transparent flex justify-between items-center z-20">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-lg shadow-lg shadow-blue-600/20">
                                    {formData.id ? '✏️' : '🎯'}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white">
                                        {formData.id ? 'Edit Company Target' : 'New Company Target'}
                                    </h3>
                                    <p className="text-white/40 text-[10px] uppercase tracking-widest font-bold">Quick Management Dashboard</p>
                                </div>
                            </div>
                            <button onClick={handleCloseModal} className="w-10 h-10 rounded-full hover:bg-white/5 flex items-center justify-center text-white/40 hover:text-white transition-colors">✕</button>
                        </div>

                        {/* Form Body - Split View */}
                        <form onSubmit={handleSubmit} className="flex-1 overflow-hidden flex flex-col md:flex-row">

                            {/* Left: Client Details */}
                            <div className="flex-1 p-8 space-y-6 border-r border-white/5 overflow-y-auto no-scrollbar">
                                <h4 className="text-[10px] uppercase tracking-widest text-blue-400 font-bold mb-4">1. Client Details</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] text-white/40 font-bold uppercase ml-1">Company Name</label>
                                        <input
                                            type="text"
                                            name="company_name"
                                            value={formData.company_name}
                                            onChange={handleInputChange}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white text-sm focus:border-blue-500 outline-none transition-all placeholder:text-white/10"
                                            placeholder="Company name"
                                        />
                                        {errors.company_name && <p className="text-red-400 text-[10px] mt-1 ml-1">{errors.company_name[0]}</p>}
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] text-white/40 font-bold uppercase ml-1">Region</label>
                                        <input
                                            type="text"
                                            name="region"
                                            value={formData.region}
                                            onChange={handleInputChange}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white text-sm focus:border-blue-500 outline-none transition-all"
                                            placeholder="Location"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] text-white/40 font-bold uppercase ml-1">Industry</label>
                                        <input
                                            type="text"
                                            name="industry"
                                            value={formData.industry}
                                            onChange={handleInputChange}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white text-sm focus:border-blue-500 outline-none transition-all"
                                            placeholder="e.g. Retail"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] text-white/40 font-bold uppercase ml-1">Contact Person</label>
                                        <input
                                            type="text"
                                            name="contact_person"
                                            value={formData.contact_person}
                                            onChange={handleInputChange}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white text-sm focus:border-blue-500 outline-none transition-all"
                                            placeholder="Client name"
                                        />
                                    </div>
                                </div>

                                <h4 className="text-[10px] uppercase tracking-widest text-blue-400 font-bold mt-8 mb-4">2. Communication</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] text-white/40 font-bold uppercase ml-1">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white text-sm focus:border-blue-500 outline-none transition-all"
                                            placeholder="email@example.com"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] text-white/40 font-bold uppercase ml-1">WhatsApp</label>
                                        <input
                                            type="text"
                                            name="whatsapp_contact"
                                            value={formData.whatsapp_contact}
                                            onChange={handleInputChange}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white text-sm focus:border-blue-500 outline-none transition-all"
                                            placeholder="0812..."
                                        />
                                    </div>
                                    <div className="space-y-1.5 md:col-span-2">
                                        <label className="text-[10px] text-white/40 font-bold uppercase ml-1">Social Media Link</label>
                                        <input
                                            type="text"
                                            name="social_media"
                                            value={formData.social_media}
                                            onChange={handleInputChange}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white text-sm focus:border-blue-500 outline-none transition-all"
                                            placeholder="Profile URL / Handle"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Right: Status & File Upload */}
                            <div className="w-full md:w-[380px] bg-black/20 p-8 space-y-6 flex flex-col overflow-y-auto no-scrollbar">
                                <h4 className="text-[10px] uppercase tracking-widest text-blue-400 font-bold mb-4">3. Status & Execution</h4>

                                <div className="space-y-4">
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] text-white/40 font-bold uppercase ml-1">Project Type</label>
                                        <div className="relative">
                                            <select
                                                name="project_type"
                                                value={formData.project_type}
                                                onChange={handleInputChange}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white text-sm focus:border-blue-500 outline-none transition-all appearance-none cursor-pointer"
                                            >
                                                {['Website', 'Landing Page', 'Dashboard', 'Sistem', 'Mobile App'].map(t => (
                                                    <option key={t} value={t} className="bg-[#1a2042]">{t}</option>
                                                ))}
                                            </select>
                                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white/20 text-[8px]">▼</div>
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-[10px] text-white/40 font-bold uppercase ml-1">Proposal Status</label>
                                        <div className="relative">
                                            <select
                                                name="proposal_status"
                                                value={formData.proposal_status}
                                                onChange={handleInputChange}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white text-sm focus:border-blue-500 outline-none transition-all appearance-none cursor-pointer"
                                            >
                                                {['Draft', 'Sent', 'Revised', 'Approved', 'Archived'].map(s => (
                                                    <option key={s} value={s} className="bg-[#1a2042]">{s}</option>
                                                ))}
                                            </select>
                                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white/20 text-[8px]">▼</div>
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-[10px] text-white/40 font-bold uppercase ml-1">Admin In Charge</label>
                                        <div className="grid grid-cols-3 gap-2">
                                            {['Ganang', 'Ipancok', 'Beseren'].map(admin => (
                                                <button
                                                    key={admin}
                                                    type="button"
                                                    onClick={() => setFormData({ ...formData, admin_in_charge: admin })}
                                                    className={`py-2 rounded-lg text-[10px] font-bold border transition-all ${formData.admin_in_charge === admin
                                                        ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-600/20'
                                                        : 'bg-white/5 border-white/10 text-white/30 hover:bg-white/10'
                                                        }`}
                                                >
                                                    {admin}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-1.5 flex-1 flex flex-col pt-4">
                                    <label className="text-[10px] text-white/40 font-bold uppercase ml-1">Proposal Documents</label>
                                    <div className="relative group/file flex-1 flex flex-col min-h-[120px]">
                                        <input
                                            type="file"
                                            onChange={handleFileChange}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                        />
                                        <div className="flex-1 bg-white/5 border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center group-hover/file:border-blue-500/50 transition-all p-4 text-center">
                                            <div className="text-2xl mb-1">📁</div>
                                            <p className="text-[10px] text-white/60 font-medium">Upload Document</p>
                                            <p className="text-[8px] text-white/20 mt-1">Click or drag & drop</p>
                                        </div>
                                        {formData.proposal_final_url && (
                                            <div className="mt-2 p-2 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center justify-center gap-2">
                                                <span className="text-[10px]">✅</span>
                                                <p className="text-[8px] text-green-400 font-bold uppercase tracking-tighter">File Ready</p>
                                            </div>
                                        )}
                                        {errors.proposal_final && <p className="text-red-400 text-[10px] mt-1 ml-1">{errors.proposal_final[0]}</p>}
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <button
                                        type="submit"
                                        className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl shadow-xl shadow-blue-600/40 transition-all active:scale-95 text-xs uppercase tracking-widest"
                                    >
                                        {formData.id ? 'Save Changes' : 'Create Target'}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TargetTable;
