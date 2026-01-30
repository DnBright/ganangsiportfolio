import React, { useState } from 'react';

const TemplatesPrompt = () => {
    const [industry, setIndustry] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedTemplate, setGeneratedTemplate] = useState(null);

    const [savedTemplates, setSavedTemplates] = useState([
        { id: 1, name: 'Standard LPK Template', industry: 'LPK', date: '2026-01-10', quality: 'High' },
        { id: 2, name: 'Creative Agency Pitch', industry: 'Startup', date: '2026-01-12', quality: 'Balanced' },
        { id: 3, name: 'Corporate Profile v2', industry: 'Manufacturing', date: '2026-01-20', quality: 'Professional' },
    ]);

    const handleGenerate = () => {
        if (!industry) return;
        setIsGenerating(true);
        setTimeout(() => {
            setGeneratedTemplate({
                title: `Premium Proposal Template for ${industry}`,
                content: `[Struktur Template Khusus ${industry}]\n\n1. Pendahuluan: Fokus pada urgensi digitalisasi di sektor ${industry}.\n2. Masalah Utama: Bagaimana website mengatasi hambatan spesifik ${industry}.\n3. Solusi DNB: Penawaran modul kustom (pendaftaran, katalog, atau integrasi data).\n4. Timeline & Penutup: Gaya bahasa yang meyakinkan tanpa jargon teknis.`
            });
            setIsGenerating(false);
        }, 2500);
    };

    return (
        <div className="space-y-6 animate-fade-up animate-duration-500">
            {/* Header Content */}
            <div className="bg-[#0f1535]/60 backdrop-blur-xl border border-white/10 rounded-[30px] p-8 overflow-hidden relative group">
                <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-amber-500/10 blur-[80px] rounded-full group-hover:bg-amber-500/15 transition-all duration-700" />

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-amber-600 to-orange-500 rounded-2xl flex items-center justify-center text-xl shadow-lg shadow-amber-600/20">
                            ⚡
                        </div>
                        <div>
                            <h2 className="text-xl font-bold tracking-tight">Templates & Prompt Control</h2>
                            <p className="text-xs text-white/40">Kontrol kualitas AI untuk memastikan proposal tetap personal & berkelas.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Industry Template Generator */}
                <div className="lg:col-span-12">
                    <div className="bg-[#0f1535]/60 backdrop-blur-xl border border-white/10 rounded-[30px] p-8">
                        <div className="max-w-2xl">
                            <h3 className="text-lg font-bold mb-2">Generate Industry-Specific Template</h3>
                            <p className="text-xs text-white/40 mb-6">AI akan merancang kerangka proposal yang fleksibel dan fokus pada kebutuhan bisnis industri pilihan Anda.</p>

                            <div className="flex flex-col md:flex-row gap-4">
                                <input
                                    type="text"
                                    value={industry}
                                    onChange={(e) => setIndustry(e.target.value)}
                                    placeholder="Contoh: LPK, Real Estate, Retail..."
                                    className="flex-1 bg-[#060b26]/50 border border-white/10 rounded-2xl px-6 py-4 text-sm outline-none focus:border-amber-500/50 transition-all font-bold"
                                />
                                <button
                                    onClick={handleGenerate}
                                    disabled={isGenerating || !industry}
                                    className="px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-400 hover:from-amber-500 hover:to-amber-300 text-white rounded-2xl font-bold text-sm shadow-xl shadow-amber-500/20 active:scale-95 transition-all disabled:opacity-50 disabled:active:scale-100 flex items-center justify-center gap-2"
                                >
                                    {isGenerating ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            Engineering Prompt...
                                        </>
                                    ) : (
                                        <><span>✨</span> Generate Template</>
                                    )}
                                </button>
                            </div>
                        </div>

                        {generatedTemplate && (
                            <div className="mt-8 p-6 bg-white/5 border border-white/10 rounded-[24px] animate-fade-down">
                                <div className="flex justify-between items-center mb-4">
                                    <h4 className="text-xs font-bold text-amber-400 uppercase tracking-widest">{generatedTemplate.title}</h4>
                                    <button className="text-[10px] bg-white/10 hover:bg-white/20 px-3 py-1 rounded-lg transition-all">Save to Library</button>
                                </div>
                                <div className="bg-[#060b26]/30 p-6 rounded-2xl text-xs leading-relaxed text-white/60 whitespace-pre-wrap font-sans">
                                    {generatedTemplate.content}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Templates Library */}
                <div className="lg:col-span-12">
                    <div className="bg-[#0f1535]/60 backdrop-blur-xl border border-white/10 rounded-[30px] p-6 lg:p-10">
                        <div className="flex items-center justify-between mb-8 px-2">
                            <div>
                                <h3 className="text-sm font-bold mb-1">Saved Templates</h3>
                                <p className="text-[10px] text-white/30 uppercase tracking-widest font-bold">Reusable structure for Draft AI</p>
                            </div>
                            <span className="bg-[#060b26]/50 border border-white/5 px-4 py-2 rounded-xl text-[10px] font-bold text-white/40">{savedTemplates.length} Templates</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {savedTemplates.map((t) => (
                                <div key={t.id} className="p-6 bg-[#060b26]/40 border border-white/5 rounded-3xl hover:border-amber-500/20 transition-all group cursor-pointer relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-16 h-16 bg-amber-500/5 blur-[20px] rounded-full -mr-8 -mt-8 group-hover:bg-amber-500/10 transition-colors" />

                                    <div className="flex items-center justify-between mb-4 relative z-10">
                                        <span className={`text-[8px] font-bold px-2 py-0.5 rounded-md uppercase tracking-tighter ${t.quality === 'High' ? 'bg-green-500/10 text-green-400' : 'bg-blue-500/10 text-blue-400'
                                            }`}>
                                            {t.quality} Content
                                        </span>
                                        <span className="text-[10px] text-white/20">{t.date}</span>
                                    </div>
                                    <h4 className="text-sm font-bold mb-1 group-hover:text-amber-400 transition-colors">{t.name}</h4>
                                    <p className="text-[10px] text-white/40 mb-6">Category: {t.industry}</p>

                                    <div className="flex items-center gap-2 pt-4 border-t border-white/5 relative z-10">
                                        <button className="text-[10px] font-bold text-white/40 hover:text-white transition-colors">Edit</button>
                                        <span className="text-white/10 text-[8px]">•</span>
                                        <button className="text-[10px] font-bold text-white/40 hover:text-white transition-colors">Use as Default</button>
                                    </div>
                                </div>
                            ))}
                            {/* Empty Add Card */}
                            <div className="border-2 border-dashed border-white/5 rounded-3xl flex flex-col items-center justify-center p-8 hover:bg-white/5 hover:border-white/10 transition-all group cursor-pointer">
                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/20 group-hover:scale-110 group-hover:text-white/40 transition-all">+</div>
                                <span className="text-[10px] font-bold text-white/20 mt-3 uppercase tracking-widest">New Custom Template</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TemplatesPrompt;
