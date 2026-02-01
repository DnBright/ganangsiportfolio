import React, { useState } from 'react';

const ProposalCreator = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        client_name: '',
        industry: '',
        target_website: '',
        client_problem: '',
        project_type: 'Website Bisnis',
        total_value: '',
        contract_duration: '6',
        project_scale: 'medium',
        deadline: '',
        tone: 'professional'
    });

    const [isGenerating, setIsGenerating] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsGenerating(true);
        // This will eventually call the AI API
        if (onSubmit) onSubmit(formData);
    };

    return (
        <div className="space-y-6 animate-fade-up animate-duration-500">
            {/* Header Content */}
            <div className="bg-[#0f1535]/60 backdrop-blur-xl border border-white/10 rounded-[30px] p-8 overflow-hidden relative group">
                <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-blue-500/10 blur-[80px] rounded-full group-hover:bg-blue-500/15 transition-all duration-700" />

                <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-xl shadow-lg shadow-blue-600/20">
                            📝
                        </div>
                        <div>
                            <h2 className="text-xl font-bold tracking-tight">Create New Proposal</h2>
                            <p className="text-xs text-white/40">Mulai langkah pertama dengan memahami kebutuhan klien secara mendalam.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Form Section */}
            <div className="bg-[#0f1535]/60 backdrop-blur-xl border border-white/10 rounded-[30px] p-8 md:p-10 relative overflow-hidden">
                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Column 1: Client & Type */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-blue-500">🏢</span>
                                <h3 className="text-[10px] font-black uppercase tracking-[3px] text-white/60">Profil Klien & Dasar Proyek</h3>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] text-white/40 font-bold uppercase tracking-widest ml-1">Nama Klien / Perusahaan</label>
                                <input
                                    type="text"
                                    name="client_name"
                                    value={formData.client_name}
                                    onChange={handleChange}
                                    placeholder="Contoh: LPK Maju Jaya"
                                    className="w-full bg-[#060b26]/50 border border-white/10 rounded-2xl px-4 py-3.5 text-sm outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 transition-all"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] text-white/40 font-bold uppercase tracking-widest ml-1">Tipe Proyek (Sangat Penting)</label>
                                <select
                                    name="project_type"
                                    value={formData.project_type}
                                    onChange={handleChange}
                                    className="w-full bg-blue-500/5 border border-blue-500/20 text-blue-100 rounded-2xl px-4 py-3.5 text-sm outline-none focus:border-blue-500 transition-all appearance-none cursor-pointer font-bold"
                                    required
                                >
                                    <option value="Landing Page">Landing Page</option>
                                    <option value="Website Bisnis">Website Bisnis</option>
                                    <option value="Dashboard / Sistem">Dashboard / Sistem</option>
                                    <option value="Sistem Kompleks">Sistem Kompleks</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] text-white/40 font-bold uppercase tracking-widest ml-1">Jenis Bisnis / Kategori</label>
                                <select
                                    name="industry"
                                    value={formData.industry}
                                    onChange={handleChange}
                                    className="w-full bg-[#060b26]/50 border border-white/10 rounded-2xl px-4 py-3.5 text-sm outline-none focus:border-blue-500/50 transition-all appearance-none cursor-pointer"
                                    required
                                >
                                    <option value="" disabled>Pilih Kategori</option>
                                    <option value="LPK">LPK / Lembaga Pendidikan</option>
                                    <option value="Company">Company Profile / Perusahaan</option>
                                    <option value="Service">Service / Jasa Digital</option>
                                    <option value="Other">Lainnya</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] text-white/40 font-bold uppercase tracking-widest ml-1">Target Website (Opsional)</label>
                                <input
                                    type="text"
                                    name="target_website"
                                    value={formData.target_website}
                                    onChange={handleChange}
                                    placeholder="www.client-site.com"
                                    className="w-full bg-[#060b26]/50 border border-white/10 rounded-2xl px-4 py-3.5 text-sm outline-none focus:border-blue-500/50 transition-all"
                                />
                            </div>
                        </div>

                        {/* Column 2: Investment & Strategy */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-blue-500">💰</span>
                                <h3 className="text-[10px] font-black uppercase tracking-[3px] text-white/60">Investasi & Durasi (WAJIB)</h3>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] text-blue-400 font-bold uppercase tracking-widest ml-1">Total Investasi (IDR)</label>
                                    <input
                                        type="number"
                                        name="total_value"
                                        value={formData.total_value}
                                        onChange={handleChange}
                                        placeholder="Contoh: 10000000"
                                        className="w-full bg-blue-500/5 border border-blue-500/30 text-blue-400 rounded-2xl px-4 py-3.5 text-sm outline-none focus:border-blue-400 transition-all font-mono font-bold"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] text-blue-400 font-bold uppercase tracking-widest ml-1">Durasi Kontrak (Bln)</label>
                                    <input
                                        type="number"
                                        name="contract_duration"
                                        value={formData.contract_duration}
                                        onChange={handleChange}
                                        placeholder="6"
                                        className="w-full bg-blue-500/5 border border-blue-500/30 text-blue-400 rounded-2xl px-4 py-3.5 text-sm outline-none focus:border-blue-400 transition-all font-bold"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] text-white/40 font-bold uppercase tracking-widest ml-1">Skala Proyek</label>
                                <div className="grid grid-cols-3 gap-3">
                                    {['small', 'medium', 'enterprise'].map((s) => (
                                        <div
                                            key={s}
                                            onClick={() => setFormData(prev => ({ ...prev, project_scale: s }))}
                                            className={`py-3 px-2 rounded-xl border text-[10px] font-bold text-center cursor-pointer transition-all uppercase tracking-tight ${formData.project_scale === s ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/20' : 'bg-white/5 border-white/10 text-white/30 hover:bg-white/10'}`}
                                        >
                                            {s}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] text-white/40 font-bold uppercase tracking-widest ml-1">Deadline / Estimasi (Hari)</label>
                                <input
                                    type="text"
                                    name="deadline"
                                    value={formData.deadline}
                                    onChange={handleChange}
                                    placeholder="Contoh: 14 Hari"
                                    className="w-full bg-[#060b26]/50 border border-white/10 rounded-2xl px-4 py-3.5 text-sm outline-none focus:border-blue-500/50 transition-all"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] text-white/40 font-bold uppercase tracking-widest ml-1">Tone / Gaya Bahasa</label>
                                <div className="flex gap-4">
                                    <label className="flex items-center gap-2 cursor-pointer group">
                                        <input
                                            type="radio" name="tone" value="professional"
                                            checked={formData.tone === 'professional'}
                                            onChange={handleChange}
                                            className="hidden"
                                        />
                                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${formData.tone === 'professional' ? 'border-blue-500' : 'border-white/20'}`}>
                                            {formData.tone === 'professional' && <div className="w-2 h-2 rounded-full bg-blue-500" />}
                                        </div>
                                        <span className="text-xs text-white/60 group-hover:text-white transition-colors">Profesional</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer group">
                                        <input
                                            type="radio" name="tone" value="creative"
                                            checked={formData.tone === 'creative'}
                                            onChange={handleChange}
                                            className="hidden"
                                        />
                                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${formData.tone === 'creative' ? 'border-purple-500' : 'border-white/20'}`}>
                                            {formData.tone === 'creative' && <div className="w-2 h-2 rounded-full bg-purple-500" />}
                                        </div>
                                        <span className="text-xs text-white/60 group-hover:text-white transition-colors">Kreatif</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Problem Description (Full Width) */}
                    <div className="space-y-2 pt-4 border-t border-white/5">
                        <label className="text-[10px] text-white/40 font-bold uppercase tracking-widest ml-1">Masalah Utama Klien</label>
                        <textarea
                            name="client_problem"
                            value={formData.client_problem}
                            onChange={handleChange}
                            rows="4"
                            placeholder="Apa hambatan terbesar bisnis mereka saat ini? (Contoh: Website lama tidak mobile-friendly, pendaftaran siswa LPK masih manual, dll)"
                            className="w-full bg-[#060b26]/50 border border-white/10 rounded-2xl px-4 py-4 text-sm outline-none focus:border-blue-500/50 transition-all resize-none"
                            required
                        ></textarea>
                    </div>

                    {/* Submit Section */}
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-6">
                        <div className="flex items-center gap-3">
                            <div className="w-3 h-3 rounded-md bg-blue-500 animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.6)]" />
                            <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">IA Consultant AI is ready</p>
                        </div>

                        <button
                            type="submit"
                            disabled={isGenerating}
                            className={`w-full md:w-auto px-10 py-5 rounded-[20px] font-bold text-sm tracking-wide transition-all ${isGenerating ? 'bg-white/5 text-white/40 cursor-not-allowed border border-white/10' : 'bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-500 hover:to-blue-300 text-white shadow-xl shadow-blue-500/20 active:scale-95'}`}
                        >
                            {isGenerating ? (
                                <span className="flex items-center gap-3 justify-center">
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Analyzing Business...
                                </span>
                            ) : (
                                '🔍 Generate Draft Analysis (AI)'
                            )}
                        </button>
                    </div>
                </form>
            </div>

            {/* AI Concept Card - Informational */}
            <div className="p-6 bg-blue-500/5 border border-blue-500/20 rounded-3xl">
                <div className="flex gap-4">
                    <div className="text-xl">🤖</div>
                    <div>
                        <h4 className="text-xs font-bold text-blue-400 mb-1">AI Instruction Logic:</h4>
                        <p className="text-[10px] text-white/40 leading-relaxed italic">
                            "System: Kamu adalah konsultan digital agency profesional. Tugasmu adalah memahami konteks bisnis, identifikasi masalah utama, dan dampak bisnis jika masalah tidak diselesaikan."
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProposalCreator;
