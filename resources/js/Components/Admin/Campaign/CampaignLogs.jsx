import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const CampaignLogs = ({ campaign, onClose }) => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchLogs = async () => {
        try {
            const response = await axios.get(`/campaigns/${campaign.id}/logs`);
            setLogs(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching logs:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLogs();
        const interval = setInterval(fetchLogs, 5000); // Polling logs every 5s
        return () => clearInterval(interval);
    }, [campaign.id]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
        >
            <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                className="bg-[#0b1437] border border-white/10 rounded-[40px] w-full max-w-4xl max-h-[80vh] overflow-hidden flex flex-col shadow-2xl"
            >
                {/* Header */}
                <div className="p-8 border-b border-white/5 flex justify-between items-center bg-[#0d173d]">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-600/10 border border-blue-500/20 rounded-2xl flex items-center justify-center text-xl">
                            📋
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white uppercase tracking-wider">{campaign.name} - Execution Logs</h3>
                            <p className="text-[10px] text-white/40 font-bold uppercase tracking-tight">Real-time status feed from worker bot</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="text-white/40 hover:text-white transition-colors text-xl">✕</button>
                </div>

                {/* Table Header */}
                <div className="px-8 py-4 bg-white/5 border-b border-white/5 grid grid-cols-12 gap-4 text-[10px] font-black text-white/40 uppercase tracking-widest">
                    <div className="col-span-2">Time</div>
                    <div className="col-span-2">Status</div>
                    <div className="col-span-3">Target Group</div>
                    <div className="col-span-5">Message / Caption Preview</div>
                </div>

                {/* Scrollable Logs */}
                <div className="flex-1 overflow-y-auto p-4 space-y-2 no-scrollbar bg-[#060b26]/50">
                    <AnimatePresence mode='popLayout'>
                        {logs.map((log) => (
                            <motion.div
                                key={log.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="px-4 py-3 bg-white/5 hover:bg-white/[0.08] rounded-xl border border-white/5 transition-colors grid grid-cols-12 gap-4 items-center"
                            >
                                <div className="col-span-2">
                                    <p className="text-[10px] text-white/60 font-mono">
                                        {new Date(log.executed_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                                    </p>
                                    <p className="text-[8px] text-white/20 font-bold uppercase tracking-tighter">
                                        {new Date(log.executed_at).toLocaleDateString()}
                                    </p>
                                </div>
                                <div className="col-span-2">
                                    <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest inline-block ${
                                        log.status === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 
                                        'bg-red-500/10 text-red-500 border border-red-500/20'
                                    }`}>
                                        {log.status === 'success' ? '✔️ Success' : '❌ Failed'}
                                    </span>
                                </div>
                                <div className="col-span-3">
                                    <p className="text-[10px] font-bold text-white/80 truncate uppercase tracking-tight">
                                        {log.group_name || 'System Query'}
                                    </p>
                                </div>
                                <div className="col-span-5">
                                    <p className="text-[10px] text-white/40 overflow-hidden text-ellipsis line-clamp-1 leading-relaxed">
                                        {log.status === 'success' ? log.caption_used : log.error_message}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {logs.length === 0 && !loading && (
                        <div className="py-20 flex flex-col items-center justify-center">
                            <span className="text-3xl mb-4 opacity-20">📡</span>
                            <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Waiting for worker activity...</p>
                        </div>
                    )}
                </div>

                {/* Footer with Summary */}
                <div className="p-6 bg-[#0d173d] border-t border-white/5 flex justify-between items-center">
                    <div className="flex gap-8">
                        <div>
                            <p className="text-[8px] text-white/40 font-black uppercase tracking-tighter mb-1">Total Executed</p>
                            <p className="text-sm font-bold text-white">{logs.length}</p>
                        </div>
                        <div>
                            <p className="text-[8px] text-white/40 font-black uppercase tracking-tighter mb-1">Success Rate</p>
                            <p className="text-sm font-bold text-green-400">
                                {logs.length > 0 ? Math.round((logs.filter(l => l.status === 'success').length / logs.length) * 100) : 0}%
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Worker Online</span>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default CampaignLogs;
