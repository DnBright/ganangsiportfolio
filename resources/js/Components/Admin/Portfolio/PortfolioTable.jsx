import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const PortfolioTable = () => {
    const [portfolios, setPortfolios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        client_name: '',
        domain: 'agency',
        category: '',
        description: '',
        project_url: '',
        is_featured: false,
        order: 0,
        image: null
    });

    const fetchPortfolios = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/portfolios', {
                headers: { 'Accept': 'application/json' }
            });
            setPortfolios(Array.isArray(response.data) ? response.data : []);
        } catch (err) {
            console.error('Error fetching portfolios:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPortfolios();
    }, []);

    const handleOpenModal = (item = null) => {
        if (item) {
            setEditingItem(item);
            setFormData({
                title: item.title || '',
                client_name: item.client_name || '',
                domain: item.domain || 'agency',
                category: item.category || '',
                description: item.description || '',
                project_url: item.project_url || '',
                is_featured: !!item.is_featured,
                order: item.order || 0,
                image: null
            });
        } else {
            setEditingItem(null);
            setFormData({
                title: '',
                client_name: '',
                domain: 'agency',
                category: '',
                description: '',
                project_url: '',
                is_featured: false,
                order: 0,
                image: null
            });
        }
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        Object.keys(formData).forEach(key => {
            if (key === 'image') {
                if (formData[key]) data.append(key, formData[key]);
            } else {
                data.append(key, formData[key]);
            }
        });

        if (editingItem) {
            data.append('_method', 'PATCH');
        }

        try {
            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.content;
            const url = editingItem ? `/portfolios/${editingItem.id}` : '/portfolios';
            
            await axios.post(url, data, {
                headers: { 
                    'X-CSRF-TOKEN': csrfToken,
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json'
                }
            });
            
            setShowModal(false);
            fetchPortfolios();
        } catch (err) {
            console.error('Error saving portfolio:', err);
            alert('Failed to save portfolio');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this portfolio item?')) return;
        try {
            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.content;
            await axios.delete(`/portfolios/${id}`, {
                headers: { 
                    'X-CSRF-TOKEN': csrfToken,
                    'Accept': 'application/json'
                }
            });
            fetchPortfolios();
        } catch (err) {
            console.error('Error deleting portfolio:', err);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-black uppercase tracking-widest text-white">Portfolio Manager</h2>
                    <p className="text-xs text-white/40 font-bold mt-1 uppercase tracking-tighter">Showcase your best work across domains</p>
                </div>
                <button 
                    onClick={() => handleOpenModal()}
                    className="bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-black uppercase tracking-widest px-6 py-3 rounded-2xl transition-all shadow-xl shadow-blue-600/20"
                >
                    + Add New Portfolio
                </button>
            </div>

            <div className="bg-[#0f1535]/40 backdrop-blur-xl border border-white/10 rounded-[30px] overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-white/5">
                            <th className="p-6 text-[10px] font-black text-white/40 uppercase tracking-widest">Project</th>
                            <th className="p-6 text-[10px] font-black text-white/40 uppercase tracking-widest">Domain</th>
                            <th className="p-6 text-[10px] font-black text-white/40 uppercase tracking-widest">Category</th>
                            <th className="p-6 text-[10px] font-black text-white/40 uppercase tracking-widest text-center">Featured</th>
                            <th className="p-6 text-[10px] font-black text-white/40 uppercase tracking-widest text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {loading ? (
                            <tr><td colSpan="5" className="p-12 text-center text-white/20 animate-pulse font-black uppercase tracking-widest">Loading Telemetry...</td></tr>
                        ) : portfolios.length === 0 ? (
                            <tr><td colSpan="5" className="p-12 text-center text-white/20 font-black uppercase tracking-widest">No Portfolios Found</td></tr>
                        ) : portfolios.map(item => (
                            <tr key={item.id} className="hover:bg-white/5 transition-colors group">
                                <td className="p-6">
                                    <div className="flex items-center gap-4">
                                        {item.image && (
                                            <img src={`/storage/${item.image}`} className="w-12 h-12 rounded-xl object-cover border border-white/10" alt="" />
                                        )}
                                        <div>
                                            <p className="font-bold text-white text-sm">{item.title}</p>
                                            <p className="text-[10px] text-white/40 font-bold uppercase tracking-tighter">{item.client_name || 'Personal Project'}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-6">
                                    <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-white/5 border border-white/10 rounded-full text-white/60">
                                        {item.domain}
                                    </span>
                                </td>
                                <td className="p-6 text-sm text-white/60 font-medium">{item.category}</td>
                                <td className="p-6 text-center">
                                    {item.is_featured ? <span className="text-yellow-400">⭐</span> : <span className="text-white/10">☆</span>}
                                </td>
                                <td className="p-6 text-right space-x-3">
                                    <button onClick={() => handleOpenModal(item)} className="text-blue-400 hover:text-white transition-colors text-xs font-bold uppercase">Edit</button>
                                    <button onClick={() => handleDelete(item.id)} className="text-red-400 hover:text-white transition-colors text-xs font-bold uppercase">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {showModal && (
                    <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
                    >
                        <motion.div 
                            initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
                            className="bg-[#0b1437] border border-white/10 rounded-[40px] w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl"
                        >
                            <div className="p-8 border-b border-white/5 flex justify-between items-center">
                                <h3 className="text-xl font-bold text-white uppercase tracking-wider">{editingItem ? 'Edit Portfolio' : 'New Portfolio'}</h3>
                                <button onClick={() => setShowModal(false)} className="text-white/40 hover:text-white transition-colors text-xl">✕</button>
                            </div>
                            
                            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8 space-y-6 no-scrollbar">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-white/40 uppercase tracking-widest pl-2">Title</label>
                                        <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-sm outline-none focus:border-blue-500/50 transition-all" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-white/40 uppercase tracking-widest pl-2">Client Name</label>
                                        <input value={formData.client_name} onChange={e => setFormData({...formData, client_name: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-sm outline-none focus:border-blue-500/50 transition-all" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-white/40 uppercase tracking-widest pl-2">Domain</label>
                                        <select value={formData.domain} onChange={e => setFormData({...formData, domain: e.target.value})} className="w-full bg-[#0f1535] border border-white/10 rounded-2xl px-5 py-3.5 text-sm outline-none focus:border-blue-500/50 transition-all cursor-pointer">
                                            <option value="agency">Agency</option>
                                            <option value="lpk">LPK / Japanese</option>
                                            <option value="both">Both Domains</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-white/40 uppercase tracking-widest pl-2">Category</label>
                                        <input value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} placeholder="Web Dev, Mobile, etc" className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-sm outline-none focus:border-blue-500/50 transition-all" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-white/40 uppercase tracking-widest pl-2">Display Order</label>
                                        <input type="number" value={formData.order} onChange={e => setFormData({...formData, order: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-sm outline-none focus:border-blue-500/50 transition-all" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-white/40 uppercase tracking-widest pl-2">Project URL</label>
                                    <input type="url" value={formData.project_url} onChange={e => setFormData({...formData, project_url: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-sm outline-none focus:border-blue-500/50 transition-all" />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-white/40 uppercase tracking-widest pl-2">Description</label>
                                    <textarea rows="3" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-sm outline-none focus:border-blue-500/50 transition-all resize-none" />
                                </div>

                                <div className="flex items-center gap-6">
                                    <div className="flex-1 space-y-2">
                                        <label className="text-[10px] font-black text-white/40 uppercase tracking-widest pl-2">Thumbnail Image</label>
                                        <input type="file" accept="image/*" onChange={e => setFormData({...formData, image: e.target.files[0]})} className="w-full text-xs text-white/40 file:bg-white/5 file:border-none file:text-white file:text-[10px] file:font-black file:uppercase file:px-4 file:py-2 file:rounded-xl file:mr-4 file:cursor-pointer" />
                                    </div>
                                    <label className="flex items-center gap-3 cursor-pointer group mt-4">
                                        <input type="checkbox" checked={formData.is_featured} onChange={e => setFormData({...formData, is_featured: e.target.checked})} className="hidden" />
                                        <div className={`w-10 h-6 rounded-full transition-all flex items-center px-1 ${formData.is_featured ? 'bg-blue-600' : 'bg-white/10'}`}>
                                            <div className={`w-4 h-4 rounded-full bg-white transition-all ${formData.is_featured ? 'translate-x-4' : 'translate-x-0'}`} />
                                        </div>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-white/60 group-hover:text-white transition-colors">Featured Project</span>
                                    </label>
                                </div>

                                <div className="p-8 border-t border-white/5 flex gap-4">
                                    <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-4 bg-white/5 hover:bg-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">Discard</button>
                                    <button type="submit" className="flex-[2] py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-blue-600/20 active:scale-95 transition-all">Save Portfolio Data</button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default PortfolioTable;
