import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import CampaignForm from './CampaignForm';
import CampaignLogs from './CampaignLogs';

const CampaignAutomation = () => {
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [selectedCampaign, setSelectedCampaign] = useState(null);
    const [showLogs, setShowLogs] = useState(false);

    const fetchCampaigns = async () => {
        try {
            const response = await axios.get('/campaigns');
            setCampaigns(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching campaigns:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCampaigns();
        const interval = setInterval(fetchCampaigns, 10000); // Polling every 10s for real-time feel
        return () => clearInterval(interval);
    }, []);

    const handleStatusToggle = async (campaign) => {
        const nextStatus = campaign.status === 'running' ? 'paused' : 'running';
        try {
            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.content;
            await axios.patch(`/campaigns/${campaign.id}/status`, { status: nextStatus }, {
                headers: { 'X-CSRF-TOKEN': csrfToken }
            });
            fetchCampaigns();
        } catch (error) {
            alert('Failed to update status');
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this campaign?')) return;
        try {
            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.content;
            await axios.delete(`/campaigns/${id}`, {
                headers: { 'X-CSRF-TOKEN': csrfToken }
            });
            fetchCampaigns();
        } catch (error) {
            alert('Failed to delete campaign');
        }
    };

    return (
        <div className="space-y-6">
            {/* Header section with Stats */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-xl font-black uppercase tracking-widest text-white flex items-center gap-3">
                        <span className="p-2 bg-blue-600 rounded-xl shadow-lg shadow-blue-500/20">🚀</span>
                        Campaign Automation
                    </h2>
                    <p className="text-xs text-white/40 font-bold mt-1 uppercase tracking-tighter">AI-Powered Content Distribution Command Center</p>
                </div>
                <button
                    onClick={() => setShowForm(true)}
                    className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-[10px] font-black uppercase tracking-[0.2em] px-6 py-3 rounded-2xl shadow-xl shadow-blue-500/20 transition-all active:scale-95"
                >
                    + Create New Campaign
                </button>
            </div>

            {/* Campaign Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                <AnimatePresence mode='popLayout'>
                    {campaigns.map((campaign) => (
                        <motion.div
                            key={campaign.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="bg-[#0f1535]/60 backdrop-blur-xl border border-white/10 rounded-[30px] p-6 hover:border-blue-500/30 transition-all group relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-[50px] -mr-16 -mt-16 group-hover:bg-blue-500/10 transition-all" />
                            
                            <div className="flex justify-between items-start mb-6">
                                <div className="space-y-1">
                                    <h3 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors uppercase tracking-tight">{campaign.name}</h3>
                                    <p className="text-[10px] text-white/30 font-bold uppercase">{campaign.target_category}</p>
                                </div>
                                <div className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${
                                    campaign.status === 'running' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 
                                    'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'
                                }`}>
                                    {campaign.status}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="bg-white/5 rounded-2xl p-3 border border-white/5">
                                    <p className="text-[8px] text-white/40 font-black uppercase tracking-tighter mb-1">Success</p>
                                    <p className="text-xl font-bold text-green-400">{campaign.success_count}</p>
                                </div>
                                <div className="bg-white/5 rounded-2xl p-3 border border-white/5">
                                    <p className="text-[8px] text-white/40 font-black uppercase tracking-tighter mb-1">Failed</p>
                                    <p className="text-xl font-bold text-red-500">{campaign.failed_count}</p>
                                </div>
                            </div>

                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-[10px] font-bold">
                                    <span className="text-white/40 uppercase">Daily Limit</span>
                                    <span>{campaign.daily_limit} Posts</span>
                                </div>
                                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                    <div 
                                        className="h-full bg-gradient-to-r from-blue-500 to-cyan-400" 
                                        style={{ width: `${Math.min((campaign.success_count / campaign.daily_limit) * 100, 100)}%` }}
                                    />
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleStatusToggle(campaign)}
                                    className={`flex-1 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                                        campaign.status === 'running' 
                                            ? 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20' 
                                            : 'bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-500/20'
                                    }`}
                                >
                                    {campaign.status === 'running' ? '⏸ Pause' : '▶ Start'}
                                </button>
                                <button
                                    onClick={() => { setSelectedCampaign(campaign); setShowLogs(true); }}
                                    className="px-4 py-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-white/60 hover:text-white transition-all text-xs"
                                >
                                    📋
                                </button>
                                <button
                                    onClick={() => handleDelete(campaign.id)}
                                    className="px-4 py-2.5 bg-red-500/10 hover:bg-red-500/20 rounded-xl text-red-500/60 hover:text-red-500 transition-all text-xs"
                                >
                                    🗑
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {campaigns.length === 0 && !loading && (
                    <div className="lg:col-span-3 py-12 flex flex-col items-center justify-center bg-white/5 border border-dashed border-white/10 rounded-[30px]">
                        <span className="text-4xl mb-4">🛸</span>
                        <p className="text-xs font-bold text-white/40 uppercase tracking-widest">No active campaigns found</p>
                    </div>
                )}
            </div>

            {/* Modals */}
            <AnimatePresence>
                {showForm && (
                    <CampaignForm 
                        onClose={() => setShowForm(false)} 
                        onSuccess={() => { setShowForm(false); fetchCampaigns(); }}
                    />
                )}
                {showLogs && selectedCampaign && (
                    <CampaignLogs 
                        campaign={selectedCampaign} 
                        onClose={() => setShowLogs(false)} 
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default CampaignAutomation;
