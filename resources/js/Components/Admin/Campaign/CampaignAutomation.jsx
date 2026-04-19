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
    const [globalStats, setGlobalStats] = useState({ total_success_today: 0, active_campaigns: 0, total_failed_today: 0 });
    const [latestLogs, setLatestLogs] = useState([]);

    const fetchData = async () => {
        try {
            const [campaignsRes, statsRes, logsRes] = await Promise.all([
                axios.get('/campaigns'),
                axios.get('/campaigns/global-stats'),
                axios.get('/campaigns/latest-logs')
            ]);
            setCampaigns(campaignsRes.data);
            setGlobalStats(statsRes.data);
            setLatestLogs(logsRes.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 10000); 
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
            {/* Header section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-xl font-black uppercase tracking-widest text-white flex items-center gap-3">
                        <span className="p-2 bg-blue-600 rounded-xl shadow-lg shadow-blue-500/20">🚀</span>
                        Command Center
                    </h2>
                    <p className="text-xs text-white/40 font-bold mt-1 uppercase tracking-tighter">Real-Time Bot Performance Monitoring</p>
                </div>
                <button
                    onClick={() => setShowForm(true)}
                    className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-[10px] font-black uppercase tracking-[0.2em] px-6 py-3 rounded-2xl shadow-xl shadow-blue-500/20 transition-all active:scale-95"
                >
                    + Create New Campaign
                </button>
            </div>

            {/* Global Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#0f1535]/40 backdrop-blur-xl border border-white/10 rounded-[30px] p-6 flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-500/10 rounded-2xl flex items-center justify-center text-xl">✅</div>
                    <div>
                        <p className="text-[10px] text-white/40 font-black uppercase tracking-widest">Success Today</p>
                        <p className="text-2xl font-bold text-green-400">{globalStats.total_success_today}</p>
                    </div>
                </div>
                <div className="bg-[#0f1535]/40 backdrop-blur-xl border border-white/10 rounded-[30px] p-6 flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-xl">🤖</div>
                    <div>
                        <p className="text-[10px] text-white/40 font-black uppercase tracking-widest">Active Workforce</p>
                        <p className="text-2xl font-bold text-blue-400">{globalStats.active_campaigns} Bots</p>
                    </div>
                </div>
                <div className="bg-[#0f1535]/40 backdrop-blur-xl border border-white/10 rounded-[30px] p-6 flex items-center gap-4">
                    <div className="w-12 h-12 bg-red-500/10 rounded-2xl flex items-center justify-center text-xl">⚠️</div>
                    <div>
                        <p className="text-[10px] text-white/40 font-black uppercase tracking-widest">Failed Efforts</p>
                        <p className="text-2xl font-bold text-red-500">{globalStats.total_failed_today}</p>
                    </div>
                </div>
            </div>

            {/* Live Activity Stream */}
            <div className="bg-[#0f1535]/20 backdrop-blur-md border border-white/5 rounded-[30px] p-6 overflow-hidden">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-[10px] font-black text-white/60 uppercase tracking-[0.2em] flex items-center gap-2">
                        <span className="w-2 h-2 bg-blue-500 rounded-full animate-ping" />
                        Live Activity Stream
                    </h3>
                    <span className="text-[8px] text-white/20 font-black uppercase tracking-tighter">Updated every 10s</span>
                </div>
                <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                    {latestLogs.map((log) => (
                        <div key={log.id} className="flex-shrink-0 bg-white/5 border border-white/5 rounded-2xl p-3 min-w-[200px] flex flex-col gap-2">
                            <div className="flex justify-between items-center">
                                <span className="text-[8px] font-black text-blue-400 uppercase tracking-tighter">{log.campaign?.name}</span>
                                <span className={`w-2 h-2 rounded-full ${log.status === 'success' ? 'bg-green-500' : 'bg-red-500'}`} />
                            </div>
                            <p className="text-[9px] text-white/80 font-bold truncate">{log.group_name || 'Processing...'}</p>
                            <span className="text-[7px] text-white/20 font-mono text-right">{new Date(log.executed_at).toLocaleTimeString()}</span>
                        </div>
                    ))}
                    {latestLogs.length === 0 && <p className="text-[10px] text-white/10 py-4">Waiting for telemetry data...</p>}
                </div>
            </div>

            {/* Campaign Grid Section Header */}
            <div>
                <h3 className="text-sm font-black text-white/40 uppercase tracking-[.3em] mb-4">Active Deployments</h3>
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
