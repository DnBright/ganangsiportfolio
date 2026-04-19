import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const CampaignForm = ({ onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        name: '',
        post_link: '',
        target_category: 'UMKM',
        daily_limit: 50,
        sessions_count: 3,
        delay_minutes: 15
    });
    const [captions, setCaptions] = useState([]);
    const [generatingCaptions, setGeneratingCaptions] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const handleGenerateCaptions = async () => {
        if (!formData.post_link || !formData.target_category) {
            alert('Please fill post link and target category first');
            return;
        }
        setGeneratingCaptions(true);
        try {
            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.content;
            const response = await axios.post('/campaigns/generate-captions', {
                post_link: formData.post_link,
                target_category: formData.target_category
            }, {
                headers: { 'X-CSRF-TOKEN': csrfToken }
            });
            setCaptions(response.data.captions);
        } catch (error) {
            alert('Failed to generate captions');
        } finally {
            setGeneratingCaptions(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.content;
            await axios.post('/campaigns', {
                ...formData,
                settings: { captions }
            }, {
                headers: { 'X-CSRF-TOKEN': csrfToken }
            });
            onSuccess();
        } catch (error) {
            alert('Failed to save campaign');
        } finally {
            setSubmitting(false);
        }
    };

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
                className="bg-[#0b1437] border border-white/10 rounded-[40px] w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl"
            >
                {/* Header */}
                <div className="p-8 border-bottom border-white/5 flex justify-between items-center">
                    <div>
                        <h3 className="text-xl font-bold text-white uppercase tracking-wider">New Automation Campaign</h3>
                        <p className="text-[10px] text-white/40 font-bold uppercase tracking-tight">Configure distribution parameters and AI content</p>
                    </div>
                    <button onClick={onClose} className="text-white/40 hover:text-white transition-colors text-xl">✕</button>
                </div>

                <div className="flex-1 overflow-y-auto p-8 space-y-8 no-scrollbar">
                    <form id="campaign-form" onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-white/40 uppercase tracking-widest pl-2">Campaign Name</label>
                                <input 
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    placeholder="e.g. Ramadhan Sale UMKM"
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-sm outline-none focus:border-blue-500/50 transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-white/40 uppercase tracking-widest pl-2">Target Category</label>
                                <select 
                                    value={formData.target_category}
                                    onChange={(e) => setFormData({...formData, target_category: e.target.value})}
                                    className="w-full bg-[#0f1535] border border-white/10 rounded-2xl px-5 py-3.5 text-sm outline-none focus:border-blue-500/50 transition-all cursor-pointer"
                                >
                                    <option value="UMKM">UMKM (Small Business)</option>
                                    <option value="Community">General Community</option>
                                    <option value="Professional">Professional / B2B</option>
                                    <option value="Entertainment">Entertainment / Viral</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-white/40 uppercase tracking-widest pl-2">Facebook Post Link</label>
                            <input 
                                required
                                type="url"
                                value={formData.post_link}
                                onChange={(e) => setFormData({...formData, post_link: e.target.value})}
                                placeholder="https://facebook.com/posts/..."
                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-sm outline-none focus:border-blue-500/50 transition-all font-mono"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-white/40 uppercase tracking-widest pl-2">Daily Limit</label>
                                <input 
                                    type="number"
                                    value={formData.daily_limit}
                                    onChange={(e) => setFormData({...formData, daily_limit: parseInt(e.target.value)})}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-sm outline-none focus:border-blue-500/50 transition-all font-bold"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-white/40 uppercase tracking-widest pl-2">Sessions/Day</label>
                                <select 
                                    value={formData.sessions_count}
                                    onChange={(e) => setFormData({...formData, sessions_count: parseInt(e.target.value)})}
                                    className="w-full bg-[#0f1535] border border-white/10 rounded-2xl px-5 py-3.5 text-sm outline-none focus:border-blue-500/50 transition-all cursor-pointer font-bold"
                                >
                                    {[1, 2, 3, 4, 6].map(n => <option key={n} value={n}>{n} Sessions</option>)}
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-white/40 uppercase tracking-widest pl-2">Delay (Minutes)</label>
                                <input 
                                    type="number"
                                    value={formData.delay_minutes}
                                    onChange={(e) => setFormData({...formData, delay_minutes: parseInt(e.target.value)})}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-sm outline-none focus:border-blue-500/50 transition-all font-bold"
                                />
                            </div>
                        </div>

                        {/* AI Section */}
                        <div className="pt-6 border-t border-white/5">
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-widest">AI Content Engine</h4>
                                    <p className="text-[9px] text-white/20 font-bold uppercase mt-1">Generates unique captions to bypass group spam detection</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={handleGenerateCaptions}
                                    disabled={generatingCaptions}
                                    className={`px-4 py-2 bg-blue-600/10 border border-blue-500/20 text-blue-400 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all disabled:opacity-50 ${generatingCaptions ? 'animate-pulse' : ''}`}
                                >
                                    {generatingCaptions ? '💫 Generating...' : '🪄 Generate Variations'}
                                </button>
                            </div>

                            <div className="space-y-4">
                                {captions.map((caption, idx) => (
                                    <motion.div 
                                        key={idx}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="bg-white/5 rounded-2xl p-4 border border-white/10 relative group"
                                    >
                                        <textarea 
                                            value={caption}
                                            onChange={(e) => {
                                                const newCaptions = [...captions];
                                                newCaptions[idx] = e.target.value;
                                                setCaptions(newCaptions);
                                            }}
                                            className="w-full bg-transparent border-none outline-none text-xs text-white/80 resize-none min-h-[60px] no-scrollbar leading-relaxed"
                                        />
                                        <span className="absolute top-2 right-4 text-[8px] font-bold text-white/20 uppercase">Variant #{idx + 1}</span>
                                    </motion.div>
                                ))}
                                {captions.length === 0 && !generatingCaptions && (
                                    <div className="py-8 text-center bg-white/5 rounded-2xl border border-dashed border-white/10">
                                        <p className="text-[10px] text-white/20 font-bold uppercase">No AI variations generated yet</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </form>
                </div>

                {/* Footer Actions */}
                <div className="p-8 border-t border-white/5 flex gap-4">
                    <button
                        onClick={onClose}
                        className="flex-1 py-4 bg-white/5 hover:bg-white/10 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all"
                    >
                        Discard
                    </button>
                    <button
                        form="campaign-form"
                        type="submit"
                        disabled={submitting || captions.length === 0}
                        className="flex-[2] py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-blue-500/20 disabled:opacity-50 active:scale-95 transition-all"
                    >
                        {submitting ? '⌛ Saving...' : '🚀 Finalize & Create Campaign'}
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default CampaignForm;
