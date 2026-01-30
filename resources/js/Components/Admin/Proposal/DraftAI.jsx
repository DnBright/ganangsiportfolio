import React, { useState, useEffect } from 'react';

const DraftAI = ({ analysisData, onBack, onNext }) => {
    const [isGenerating, setIsGenerating] = useState(true);
    const [draftContent, setDraftContent] = useState('');

    useEffect(() => {
        // Simulate AI generation process
        const timer = setTimeout(() => {
            setIsGenerating(false);
            setDraftContent(`
# PROPOSAL PENGEMBANGAN WEBSITE: ${analysisData.client_name || 'Klien'}

## 1. Pendahuluan
Terima kasih atas kesempatan yang diberikan kepada DNB Agency untuk meninjau kebutuhan digital bisnis Anda. Proposal ini disusun untuk memberikan gambaran strategis bagaimana kami dapat mendukung pertumbuhan bisnis Anda melalui transformasi digital yang tepat sasaran.

## 2. Pemahaman Kebutuhan Klien
Berdasarkan analisis kami, bisnis ${analysisData.industry} Anda saat ini menghadapi tantangan utama berupa: "${analysisData.client_problem}". Ketidaktersediaan infrastruktur digital yang memadai ini berpotensi menghambat efisiensi operasional dan membatasi jangkauan pasar yang lebih luas.

## 3. Solusi yang Ditawarkan
Kami menawarkan solusi platform website terintegrasi yang dirancang khusus untuk menjawab permasalahan di atas. Fokus utama kami bukan hanya pada estetika visual, melainkan pada fungsionalitas yang membantu menyelesaikan hambatan bisnis Anda, sehingga sistem dapat berjalan lebih otomatis dan terukur.

## 4. Ruang Lingkup Pekerjaan
- Desain antarmuka pengguna (UI/UX) yang modern dan responsif.
- Pengembangan sistem backend sesuai kebutuhan spesifik ${analysisData.industry}.
- Integrasi fitur-fitur pendukung (pendaftaran, manajemen data, atau profil perusahaan).
- Optimasi performa dan keamanan data.

## 5. Estimasi Timeline
Proyek ini diperkirakan akan memakan waktu sekitar ${analysisData.deadline || '14 hari kerja'}, terbagi dalam tahap:
- Minggu 1: Analisis Detail & Desain UI/UX.
- Minggu 2: Pengembangan & Testing.
- Minggu 3: Deployment & Pelatihan.

## 6. Penutup
Kami percaya bahwa solusi yang ditawarkan ini merupakan langkah awal yang krusial bagi transformasi digital bisnis Anda. DNB Agency siap menjadi mitra strategis dalam mewujudkan efisiensi bisnis yang handal melalui teknologi.
            `);
        }, 3000);

        return () => clearTimeout(timer);
    }, [analysisData]);

    return (
        <div className="space-y-6 animate-fade-up animate-duration-500">
            {/* Header Content */}
            <div className="bg-[#0f1535]/60 backdrop-blur-xl border border-white/10 rounded-[30px] p-8 overflow-hidden relative group">
                <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-cyan-500/10 blur-[80px] rounded-full group-hover:bg-cyan-500/15 transition-all duration-700" />

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-cyan-600 to-blue-500 rounded-2xl flex items-center justify-center text-xl shadow-lg shadow-cyan-600/20">
                            🤖
                        </div>
                        <div>
                            <h2 className="text-xl font-bold tracking-tight">AI Draft Generation</h2>
                            <p className="text-xs text-white/40">Draft disusun oleh Senior Proposal Writer AI kami.</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={onBack}
                            className="px-6 py-2.5 rounded-xl border border-white/10 text-xs font-bold hover:bg-white/5 transition-all"
                        >
                            ← Edit Analysis
                        </button>
                    </div>
                </div>
            </div>

            {/* AI Output Section */}
            <div className="bg-[#0f1535]/60 backdrop-blur-xl border border-white/10 rounded-[30px] p-8 md:p-12 relative min-h-[500px]">
                {isGenerating ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center space-y-6">
                        <div className="relative">
                            <div className="w-20 h-20 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin" />
                            <div className="absolute inset-0 flex items-center justify-center text-xl">✍️</div>
                        </div>
                        <div className="text-center">
                            <h3 className="text-lg font-bold mb-1">Senior AI Writer is drafting...</h3>
                            <p className="text-xs text-white/40 italic">"Memastikan struktur proposal profesional tanpa jargon teknis berlebihan..."</p>
                        </div>
                    </div>
                ) : (
                    <div className="prose prose-invert max-w-none animate-fade">
                        <div className="bg-[#060b26]/50 rounded-2xl p-8 border border-white/5 whitespace-pre-wrap font-sans text-sm leading-relaxed text-white/80">
                            {draftContent}
                        </div>

                        <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-6 pt-10 border-t border-white/5">
                            <div className="flex items-center gap-3">
                                <span className="flex h-3 w-3 relative">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                </span>
                                <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Draft is ready for human touch</p>
                            </div>

                            <button
                                onClick={() => onNext(draftContent)}
                                className="w-full md:w-auto px-10 py-5 bg-gradient-to-r from-cyan-600 to-cyan-400 hover:from-cyan-500 hover:to-cyan-300 text-white rounded-[20px] font-bold text-sm tracking-wide shadow-xl shadow-cyan-500/20 active:scale-95 transition-all flex items-center gap-3 justify-center"
                            >
                                🖊️ Move to Manual Editor
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DraftAI;
