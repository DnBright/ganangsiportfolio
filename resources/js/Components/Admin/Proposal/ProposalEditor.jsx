import React, { useState } from 'react';

const ProposalEditor = ({ draftContent, onBack, onSave }) => {
    const [content, setContent] = useState(draftContent);
    const [pricing, setPricing] = useState('');
    const [bonus, setBonus] = useState('');
    const [isPolishing, setIsPolishing] = useState(false);

    const handleAIPolish = () => {
        setIsPolishing(true);
        // Simulate AI Polish logic: Editor bahasa & kejelasan
        setTimeout(() => {
            const polished = content.replace(/adalah/g, 'merupakan')
                .replace(/merasakan/g, 'mengalami')
                .concat('\n\n*Catatan: Kalimat telah dioptimasi untuk kejelasan profesional.*');
            setContent(polished);
            setIsPolishing(false);
        }, 2000);
    };

    return (
        <div className="space-y-6 animate-fade-up animate-duration-500">
            {/* Header Content */}
            <div className="bg-[#0f1535]/60 backdrop-blur-xl border border-white/10 rounded-[30px] p-8 overflow-hidden relative group">
                <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-purple-500/10 blur-[80px] rounded-full group-hover:bg-purple-500/15 transition-all duration-700" />

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-indigo-500 rounded-2xl flex items-center justify-center text-xl shadow-lg shadow-purple-600/20">
                            ✍️
                        </div>
                        <div>
                            <h2 className="text-xl font-bold tracking-tight">Manual Editor & Refinement</h2>
                            <p className="text-xs text-white/40">Berikan sentuhan manusia agar proposal benar-benar meyakinkan.</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleAIPolish}
                            disabled={isPolishing}
                            className={`px-6 py-2.5 rounded-xl border ${isPolishing ? 'border-purple-500/50 text-purple-400 bg-purple-500/5' : 'border-purple-500/30 text-purple-400 hover:bg-purple-500/10'} text-xs font-bold transition-all flex items-center gap-2`}
                        >
                            {isPolishing ? (
                                <>
                                    <div className="w-3 h-3 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
                                    Polishing...
                                </>
                            ) : (
                                <><span>✨</span> AI Polish (Language)</>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-10">
                {/* Main Editor */}
                <div className="lg:col-span-8 space-y-6">
                    <div className="bg-[#0f1535]/60 backdrop-blur-xl border border-white/10 rounded-[30px] p-6 h-full min-h-[700px] flex flex-col">
                        <div className="flex items-center justify-between mb-4 px-2">
                            <label className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Proposal Content (Draft)</label>
                            <span className="text-[10px] text-blue-400 font-bold bg-blue-400/10 px-2 py-1 rounded-md">Editable</span>
                        </div>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="flex-1 w-full bg-[#060b26]/30 border-none outline-none text-sm leading-relaxed text-white/80 p-6 rounded-2xl resize-none font-sans no-scrollbar selection:bg-purple-500/30"
                            placeholder="Tulis proposal Anda di sini..."
                        ></textarea>
                    </div>
                </div>

                {/* Human Strategy Panel */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="bg-[#0f1535]/60 backdrop-blur-xl border border-white/10 rounded-[30px] p-8 space-y-8">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-8 h-8 bg-green-500/20 text-green-500 rounded-xl flex items-center justify-center text-xs">💰</div>
                                <h3 className="text-sm font-bold">Investment Strategy</h3>
                            </div>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] text-white/40 font-bold uppercase tracking-widest ml-1">Total Project Price (IDR)</label>
                                    <input
                                        type="text"
                                        value={pricing}
                                        onChange={(e) => setPricing(e.target.value)}
                                        placeholder="Contoh: Rp 15.000.000"
                                        className="w-full bg-[#060b26]/50 border border-white/10 rounded-2xl px-4 py-3.5 text-sm outline-none focus:border-green-500/50 transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] text-white/40 font-bold uppercase tracking-widest ml-1">Special Offer / Bonus</label>
                                    <textarea
                                        value={bonus}
                                        onChange={(e) => setBonus(e.target.value)}
                                        placeholder="Contoh: Free Maintenance 3 Bulan"
                                        rows="3"
                                        className="w-full bg-[#060b26]/50 border border-white/10 rounded-2xl px-4 py-3.5 text-sm outline-none focus:border-green-500/50 transition-all resize-none"
                                    ></textarea>
                                </div>
                            </div>
                        </div>

                        <div className="pt-8 border-t border-white/5">
                            <button
                                onClick={() => onSave({ content, pricing, bonus })}
                                className="w-full py-5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-[20px] font-bold text-sm tracking-wide shadow-xl shadow-blue-500/20 active:scale-95 transition-all mb-4"
                            >
                                ✅ Save & Finish Proposal
                            </button>
                            <button
                                onClick={onBack}
                                className="w-full py-4 bg-white/5 border border-white/10 text-white/60 hover:text-white rounded-[20px] text-xs font-bold transition-all"
                            >
                                ← Back to AI Generation
                            </button>
                        </div>
                    </div>

                    {/* Pro Tip Card */}
                    <div className="p-6 bg-purple-500/5 border border-purple-500/20 rounded-3xl">
                        <div className="flex gap-4">
                            <div className="text-xl">💡</div>
                            <div>
                                <h4 className="text-xs font-bold text-purple-400 mb-1">Human Touch Tip:</h4>
                                <p className="text-[10px] text-white/40 leading-relaxed">
                                    AI sangat bagus dalam struktur, tapi Anda yang paling tahu psikologi harga klien. Masukkan angka yang sesuai dengan nilai bisnis yang mereka dapatkan.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProposalEditor;
