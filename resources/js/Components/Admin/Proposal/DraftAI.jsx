import React, { useState, useEffect } from 'react';

const DraftAI = ({ analysisData, onBack, onNext }) => {
    const [isGenerating, setIsGenerating] = useState(true);
    const [draftContent, setDraftContent] = useState({
        title: '',
        bab_1: '',
        bab_2: '',
        bab_3: '',
        bab_4: ''
    });
    const [generationStep, setGenerationStep] = useState(0);

    const steps = [
        "Menganalisis profil bisnis & kompetitor...",
        "Menyusun strategi solusi digital...",
        "Mendalami pemahaman masalah klien...",
        "Menyusun ruang lingkup pekerjaan detail...",
        "Memformulasikan estimasi timeline proyek...",
        "Melakukan polishing bahasa profesional..."
    ];

    useEffect(() => {
        let currentStep = 0;
        const interval = setInterval(() => {
            if (currentStep < steps.length - 1) {
                currentStep++;
                setGenerationStep(currentStep);
            }
        }, 800);

        const generateAIPost = async () => {
            try {
                const response = await axios.post('/proposals/generate-draft', {
                    client_name: analysisData.client_name,
                    industry: analysisData.industry,
                    target_website: analysisData.target_website,
                    problem_statement: analysisData.client_problem
                });

                setDraftContent(response.data.draft);
                setIsGenerating(false);
                clearInterval(interval);
            } catch (error) {
                console.error('Gemini Generation Error:', error);
                const errorText = `Maaf, terjadi kesalahan saat menghubungi AI: ${error.response?.data?.message || error.message}. \n\nPastikan GEMINI_API_KEY sudah terpasang di file .env server Anda.`;
                setDraftContent({
                    title: 'Error Generation',
                    bab_1: errorText,
                    bab_2: '',
                    bab_3: '',
                    bab_4: ''
                });
                setIsGenerating(false);
                clearInterval(interval);
            }
        };

        generateAIPost();

        return () => {
            clearInterval(interval);
        };
    }, [analysisData]);

    return (
        <div className="space-y-6 animate-fade-up animate-duration-500 pb-10">
            {/* Header Content */}
            <div className="bg-[#0f1535]/60 backdrop-blur-xl border border-white/10 rounded-[30px] p-8 overflow-hidden relative group">
                <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-cyan-500/10 blur-[80px] rounded-full group-hover:bg-cyan-500/15 transition-all duration-700" />

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-cyan-600 to-blue-500 rounded-2xl flex items-center justify-center text-xl shadow-lg shadow-cyan-600/20">
                            🤖
                        </div>
                        <div>
                            <h2 className="text-xl font-bold tracking-tight">AI Senior Writing Center</h2>
                            <p className="text-xs text-white/40">Menghasilkan dokumen strategis densitas tinggi (5-6 Halaman).</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={onBack}
                            className="px-6 py-2.5 rounded-xl border border-white/10 text-xs font-bold hover:bg-white/5 transition-all"
                        >
                            ← Kembali ke Input
                        </button>
                    </div>
                </div>
            </div>

            {/* AI Output Section */}
            <div className="bg-[#0f1535]/60 backdrop-blur-xl border border-white/10 rounded-[30px] p-8 md:p-12 relative min-h-[600px]">
                {isGenerating ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center space-y-8">
                        <div className="relative">
                            <div className="w-24 h-24 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin" />
                            <div className="absolute inset-0 flex items-center justify-center text-3xl">📝</div>
                        </div>
                        <div className="text-center space-y-3">
                            <h3 className="text-xl font-bold tracking-tight">{steps[generationStep]}</h3>
                            <div className="flex items-center justify-center gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-cyan-500 animate-bounce [animation-delay:-0.3s]"></span>
                                <span className="h-1.5 w-1.5 rounded-full bg-cyan-500 animate-bounce [animation-delay:-0.15s]"></span>
                                <span className="h-1.5 w-1.5 rounded-full bg-cyan-500 animate-bounce"></span>
                            </div>
                            <p className="text-xs text-white/40 italic mt-4">"Membangun narasi strategis untuk mengatasi masalah: ${analysisData.client_problem}"</p>
                        </div>
                    </div>
                ) : (
                    <div className="animate-fade">
                        <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/5">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                <span className="text-[10px] font-bold text-white/40 uppercase tracking-[4px]">Penyusunan Selesai</span>
                            </div>
                            <div className="flex gap-4">
                                <div className="text-right">
                                    <p className="text-[10px] text-white/20 uppercase font-bold">Estimasi Panjang</p>
                                    <p className="text-xs font-bold text-cyan-400">5.5 Halaman Standar</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-12">
                            <div className="border-l-4 border-cyan-500 pl-6">
                                <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-tight">{draftContent.title}</h3>
                                <p className="text-[10px] text-white/30 font-bold uppercase tracking-[4px]">DNB Agency Strategic Document</p>
                            </div>

                            {[
                                { title: 'Bab 1: Executive Audit', content: draftContent.bab_1 },
                                { title: 'Bab 2: Transformatif Solutions', content: draftContent.bab_2 },
                                { title: 'Bab 3: Roadmap & Authority', content: draftContent.bab_3 },
                                { title: 'Bab 4: Conclusion & Action', content: draftContent.bab_4 },
                            ].map((section, idx) => (
                                <div key={idx} className="bg-[#060b26]/50 rounded-[40px] p-8 md:p-12 border border-white/5 relative group hover:border-cyan-500/20 transition-all duration-500">
                                    <div className="absolute top-8 left-[-1px] w-1 h-8 bg-cyan-500 rounded-full opacity-50" />
                                    <h4 className="text-xs font-bold text-cyan-500 uppercase tracking-[6px] mb-8">{section.title}</h4>
                                    <div className="whitespace-pre-wrap font-sans text-sm md:text-md leading-[1.8] text-white/80 selection:bg-cyan-500/30">
                                        {section.content}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-6 pt-10 border-t border-white/5">
                            <div className="flex flex-col gap-1">
                                <h4 className="text-xs font-bold text-white/80">Draft Hasil Analisis Tersedia</h4>
                                <p className="text-[10px] text-white/30 leading-relaxed max-w-sm">Tinjau hasil ini dan berikan sentuhan manusia di tahap Editor untuk memasukkan strategi harga.</p>
                            </div>

                            <button
                                onClick={() => onNext(draftContent)}
                                className="w-full md:w-auto px-10 py-5 bg-gradient-to-r from-cyan-600 to-cyan-400 hover:from-cyan-500 hover:to-cyan-300 text-white rounded-[24px] font-bold text-sm tracking-wide shadow-xl shadow-cyan-500/20 active:scale-95 transition-all flex items-center gap-3 justify-center"
                            >
                                🖊️ Beralih ke Editor Manual
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DraftAI;
