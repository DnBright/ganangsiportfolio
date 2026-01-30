import React, { useState } from 'react';

const TemplatesPrompt = ({ savedTemplates = [], onSaveTemplate }) => {
    const [industry, setIndustry] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedTemplate, setGeneratedTemplate] = useState(null);
    const [isSaving, setIsSaving] = useState(false);

    const handleGenerate = () => {
        if (!industry) return;
        setIsGenerating(true);
        setGeneratedTemplate(null);

        setTimeout(() => {
            setGeneratedTemplate({
                id: Date.now(),
                title: `Premium Proposal Template for ${industry}`,
                industry: industry,
                content: `[STRUKTUR STRATEGIS KHUSUS ${industry.toUpperCase()}]\n\n` +
                    `1. PENDAHULUAN: Fokus pada urgensi transformasi digital di sektor ${industry}.\n` +
                    `2. ANALISIS MASALAH: Menjelaskan bagaimana keterlambatan digital menghambat pertumbuhan ${industry}.\n` +
                    `3. VALUE PROPOSITION DNB: Solusi modul spesifik untuk optimasi bisnis ${industry}.\n` +
                    `4. TIMELINE & KOMITMEN: Jadwal implementasi Agile 4-minggu.\n\n` +
                    `*Template ini dirancang fleksibel untuk fase Draft AI.*`
            });
            setIsGenerating(false);
        }, 3000);
    };

    const handleSave = () => {
        if (!generatedTemplate) return;
        setIsSaving(true);
        setTimeout(() => {
            onSaveTemplate({
                id: generatedTemplate.id,
                name: generatedTemplate.title,
                industry: generatedTemplate.industry,
                date: new Date().toISOString().split('T')[0],
                quality: 'High'
            });
            setGeneratedTemplate(null);
            setIndustry('');
            setIsSaving(false);
        }, 1000);
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
                            <p className="text-xs text-white/40">Gedung kendali kualitas AI untuk memastikan standar tinggi Dark and Bright.</p>
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
                            <p className="text-xs text-white/40 mb-6">AI DNB akan merancang kerangka proposal yang taktis, berfokus pada efisiensi bisnis industri pilihan Anda.</p>

                            <div className="flex flex-col md:flex-row gap-4">
                                <input
                                    type="text"
                                    value={industry}
                                    onChange={(e) => setIndustry(e.target.value)}
                                    placeholder="Ketik Industri... (misal: LPK, Startup, Retail)"
                                    className="flex-1 bg-[#060b26]/50 border border-white/10 rounded-2xl px-6 py-4 text-sm outline-none focus:border-amber-500/50 transition-all font-bold placeholder:text-white/10"
                                />
                                <button
                                    onClick={handleGenerate}
                                    disabled={isGenerating || !industry}
                                    className="px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-400 hover:from-amber-500 hover:to-amber-300 text-white rounded-2xl font-bold text-sm shadow-xl shadow-amber-500/20 active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    {isGenerating ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            Engineering...
                                        </>
                                    ) : (
                                        <><span>✨</span> Generate Framework</>
                                    )}
                                </button>
                            </div>
                        </div>

                        {generatedTemplate && (
                            <div className="mt-8 p-6 bg-white/5 border border-white/10 rounded-[24px] animate-fade-down">
                                <div className="flex justify-between items-center mb-4 pb-4 border-b border-white/5">
                                    <h4 className="text-xs font-bold text-amber-400 uppercase tracking-[3px]">{generatedTemplate.title}</h4>
                                    <button
                                        onClick={handleSave}
                                        disabled={isSaving}
                                        className="text-[10px] font-bold bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 px-6 py-2 rounded-xl transition-all border border-amber-500/20"
                                    >
                                        {isSaving ? 'Saving...' : 'Confirm & Save to Library'}
                                    </button>
                                </div>
                                <div className="bg-[#060b26]/30 p-8 rounded-2xl text-[13px] leading-relaxed text-white/60 whitespace-pre-wrap font-sans selection:bg-amber-500/20">
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
                                <h3 className="text-sm font-bold mb-1">Global Template Library</h3>
                                <p className="text-[10px] text-white/30 uppercase tracking-[8px] font-bold">Persistence Collection</p>
                            </div>
                            <span className="bg-[#060b26]/50 border border-white/10 px-5 py-2.5 rounded-2xl text-[10px] font-black text-amber-400/80 shadow-inner">
                                {savedTemplates.length} SAVED
                            </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {savedTemplates.map((t) => (
                                <div key={t.id} className="p-8 bg-[#060b26]/40 border border-white/5 rounded-[40px] hover:border-amber-500/20 transition-all group cursor-pointer relative overflow-hidden flex flex-col justify-between min-h-[220px]">
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 blur-[30px] rounded-full -mr-12 -mt-12 group-hover:bg-amber-500/10 transition-colors" />

                                    <div className="relative z-10">
                                        <div className="flex items-center justify-between mb-6">
                                            <span className={`text-[8px] font-black px-3 py-1 rounded-lg uppercase tracking-widest ${t.quality === 'High' ? 'bg-amber-500/20 text-amber-400' : 'bg-blue-500/10 text-blue-400'
                                                }`}>
                                                {t.quality} Content
                                            </span>
                                            <span className="text-[10px] text-white/20 font-mono italic">{t.date}</span>
                                        </div>
                                        <h4 className="text-sm font-bold mb-2 group-hover:text-amber-400 transition-colors tracking-tight">{t.name}</h4>
                                        <p className="text-[10px] text-white/30 font-medium">Industry: <span className="text-white/50">{t.industry}</span></p>
                                    </div>

                                    <div className="flex items-center gap-3 pt-6 border-t border-white/5 relative z-10">
                                        <button className="text-[10px] font-bold text-white/20 hover:text-amber-400 transition-colors">EDIT</button>
                                        <span className="text-white/10 text-[8px]">/</span>
                                        <button className="text-[10px] font-black text-white/20 hover:text-white transition-colors">DEFAULT</button>
                                    </div>
                                </div>
                            ))}
                            {/* Empty Add Card */}
                            <div className="border-2 border-dashed border-white/5 rounded-[40px] flex flex-col items-center justify-center p-8 hover:bg-white/5 hover:border-white/10 transition-all group cursor-pointer min-h-[220px]">
                                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white/10 text-xl group-hover:scale-110 group-hover:bg-white/10 group-hover:text-white/30 transition-all">+</div>
                                <span className="text-[10px] font-bold text-white/20 mt-4 uppercase tracking-[4px]">Custom Template</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TemplatesPrompt;
