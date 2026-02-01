import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DraftAI = ({ analysisData, onBack, onNext }) => {
    const [isGenerating, setIsGenerating] = useState(true);
    const [draftContent, setDraftContent] = useState({
        title: '',
        executive_summary: '',
        problem_analysis: '',
        project_objectives: '',
        solutions: '',
        scope_of_work: '',
        system_walkthrough: '',
        timeline: '',
        investment: '',
        roi_impact: '',
        value_add: '',
        closing_cta: ''
    });
    const [generationStep, setGenerationStep] = useState(0);

    const steps = [
        "Menganalisis profil bisnis & kompetitor...",
        "Menyusun strategi solusi digital...",
        "Mendalami pemahaman masalah klien...",
        "Menyusun modul solusi sistem...",
        "Menentukan ruang lingkup detail...",
        "Merancang alur kerja sistem...",
        "Memformulasikan timeline & fase proyek...",
        "Menghitung estimasi investasi & biaya...",
        "Menghitung estimasi ROI & dampak bisnis...",
        "Menyusun nilai tambah Dark and Bright...",
        "Melakukan polishing bahasa profesional..."
    ];

    useEffect(() => {
        if (!analysisData?.client_name) return;

        setIsGenerating(true);
        setGenerationStep(0);

        let currentStep = 0;
        const interval = setInterval(() => {
            if (currentStep < steps.length - 1) {
                currentStep++;
                setGenerationStep(currentStep);
            }
        }, 800);

        const generateAIPost = async () => {
            const clientName = analysisData?.client_name || analysisData?.clientName || 'Klien';

            console.log('DraftAI: Requesting generation for:', clientName);

            try {
                const api = window.axios || axios;
                const csrfToken = document.querySelector('meta[name="csrf-token"]')?.content;

                const response = await api.post('/proposals/generate-draft', {
                    client_name: clientName,
                    industry: analysisData?.industry || 'General',
                    target_website: analysisData?.target_website || '',
                    problem_statement: analysisData?.client_problem || analysisData?.problem_statement || '',
                    project_type: analysisData?.project_type || 'Website Bisnis',
                    total_value: analysisData?.total_value || 0,
                    contract_duration: analysisData?.contract_duration || 6,
                    project_scale: analysisData?.project_scale || 'medium',
                    deadline: analysisData?.deadline || '14 Hari'
                }, {
                    headers: {
                        'X-CSRF-TOKEN': csrfToken,
                        'X-Requested-With': 'XMLHttpRequest'
                    }
                });

                console.log('DraftAI: Response received:', response.data);

                // Ensure the draft is an object and not a string/null
                const draft = response.data.draft || {};
                setDraftContent(draft);
                setIsGenerating(false);
                clearInterval(interval);
            } catch (error) {
                console.error('Gemini Generation Error:', error);
                const rawError = error.response?.data?.message || error.message;
                const errorText = typeof rawError === 'object' ? JSON.stringify(rawError) : String(rawError);

                setDraftContent({
                    title: 'Error Generation',
                    executive_summary: `Maaf, terjadi kesalahan: ${errorText}. Pastikan GEMINI_API_KEY terpasang di .env server.`,
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

    const previewSections = [
        { title: '1. Ringkasan Eksekutif', content: draftContent?.executive_summary },
        { title: '2. Analisis Masalah', content: draftContent?.problem_analysis },
        { title: '3. Tujuan Proyek', content: draftContent?.project_objectives },
        { title: '4. Modul Solusi', content: draftContent?.solutions },
        { title: '5. Ruang Lingkup', content: draftContent?.scope_of_work },
        { title: '6. Alur Sistem', content: draftContent?.system_walkthrough },
        { title: '7. Timeline', content: draftContent?.timeline },
        { title: '8. Estimasi Investasi', content: draftContent?.investment },
        { title: '9. Estimasi ROI', content: draftContent?.roi_impact },
        { title: '10. Nilai Tambah', content: draftContent?.value_add },
        { title: '11. Penutup', content: draftContent?.closing_cta },
    ];

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
                            <p className="text-xs text-white/40">Menghasilkan dokumen strategis komprehensif (10 Bagian Utama).</p>
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
                            <p className="text-xs text-white/40 italic mt-4">{`"Membangun narasi strategis untuk mengatasi masalah: ${analysisData?.client_problem || analysisData?.problem_statement || ''}"`}</p>
                        </div>
                    </div>
                ) : (
                    <div className="animate-fade">
                        <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/5">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                <span className="text-[10px] font-bold text-white/40 uppercase tracking-[4px]">Analisis Selesai</span>
                            </div>
                            <div className="flex gap-4">
                                <div className="text-right">
                                    <p className="text-[10px] text-white/20 uppercase font-bold">Struktur Proposal</p>
                                    <p className="text-xs font-bold text-cyan-400">10 Segmen Bisnis</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-12">
                            <div className="border-l-4 border-cyan-500 pl-6">
                                <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-tight">
                                    {draftContent?.title || 'Draft Proposal Bisnis'}
                                </h3>
                                <p className="text-[10px] text-white/30 font-bold uppercase tracking-[4px]">DNB Agency Strategic Document</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {previewSections.map((section, idx) => (
                                    <div key={idx} className="bg-[#060b26]/50 rounded-[30px] p-6 border border-white/5 relative group hover:border-cyan-500/20 transition-all duration-500">
                                        <h4 className="text-[10px] font-bold text-cyan-500 uppercase tracking-[4px] mb-4">{section.title}</h4>
                                        <div className="whitespace-pre-wrap font-sans text-xs leading-relaxed text-white/60 line-clamp-6">
                                            {section.content || 'Konten sedang disiapkan atau tidak tersedia.'}
                                        </div>
                                    </div>
                                ))}
                            </div>
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
                                🖊️ Sempurnakan isi di Editor
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DraftAI;
