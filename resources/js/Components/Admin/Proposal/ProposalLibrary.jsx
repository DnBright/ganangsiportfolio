import React, { useState } from 'react';
import ProposalPrintTemplate from './ProposalPrintTemplate';

const ProposalLibrary = ({ proposals = [], onEdit, onDuplicate, onDelete }) => {
    const [selectedProposal, setSelectedProposal] = useState(null);
    const [showInsights, setShowInsights] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [printingProposal, setPrintingProposal] = useState(null);

    const handleAnalyze = () => {
        setIsAnalyzing(true);
        setTimeout(() => {
            setIsAnalyzing(false);
            setShowInsights(true);
        }, 3000);
    };

    const handlePrint = (proposal) => {
        setPrintingProposal(proposal);
        // Wait for React to render the template into the hidden div before printing
        setTimeout(() => {
            window.print();
        }, 500);
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case 'Approved': return 'bg-green-400/10 text-green-400 border-green-400/20';
            case 'Sent': return 'bg-blue-400/10 text-blue-400 border-blue-400/20';
            case 'Draft': return 'bg-white/10 text-white/40 border-white/20';
            case 'Rejected': return 'bg-red-400/10 text-red-400 border-red-400/20';
            default: return '';
        }
    };

    return (
        <div className="space-y-6 animate-fade-up animate-duration-500">
            {/* Hidden Printable Area */}
            <div className="hidden print:block">
                {printingProposal && <ProposalPrintTemplate proposal={printingProposal} />}
            </div>

            {/* Header Content */}
            <div className="bg-[#0f1535]/60 backdrop-blur-xl border border-white/10 rounded-[30px] p-8 overflow-hidden relative group">
                <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-emerald-500/10 blur-[80px] rounded-full group-hover:bg-emerald-500/15 transition-all duration-700" />

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-teal-500 rounded-2xl flex items-center justify-center text-xl shadow-lg shadow-emerald-600/20">
                            📚
                        </div>
                        <div>
                            <h2 className="text-xl font-bold tracking-tight">Proposal Library</h2>
                            <p className="text-xs text-white/40">Arsip strategis untuk meningkatkan win-rate agensi Anda.</p>
                        </div>
                    </div>

                    <button
                        onClick={handleAnalyze}
                        disabled={isAnalyzing}
                        className="px-6 py-3 bg-white/5 border border-white/10 hover:bg-white/10 rounded-2xl text-xs font-bold text-white transition-all flex items-center gap-2 group"
                    >
                        {isAnalyzing ? (
                            <>
                                <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Analyzing History...
                            </>
                        ) : (
                            <><span>📊</span> Get AI Strategic Insights</>
                        )}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Proposal List Area */}
                <div className={`${showInsights ? 'lg:col-span-8' : 'lg:col-span-12'} transition-all duration-500`}>
                    <div className="bg-[#0f1535]/60 backdrop-blur-xl border border-white/10 rounded-[30px] overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-white/5">
                                        <th className="px-6 py-5 text-[10px] font-bold text-white/30 uppercase tracking-widest">Client Name</th>
                                        <th className="px-6 py-5 text-[10px] font-bold text-white/30 uppercase tracking-widest">Industry</th>
                                        <th className="px-6 py-5 text-[10px] font-bold text-white/30 uppercase tracking-widest">Problem Statement</th>
                                        <th className="px-6 py-5 text-[10px] font-bold text-white/30 uppercase tracking-widest">Date</th>
                                        <th className="px-6 py-5 text-[10px] font-bold text-white/30 uppercase tracking-widest">Status</th>
                                        <th className="px-6 py-5 text-[10px] font-bold text-white/30 uppercase tracking-widest">Value</th>
                                        <th className="px-6 py-5 text-[10px] font-bold text-white/30 uppercase tracking-widest text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {proposals.map((p) => (
                                        <tr key={p.id} className="hover:bg-white/5 transition-colors group">
                                            <td className="px-6 py-5">
                                                <p className="text-sm font-bold text-white/90 group-hover:text-white">{p.client_name}</p>
                                            </td>
                                            <td className="px-6 py-5">
                                                <span className="text-xs text-white/40">{p.industry}</span>
                                            </td>
                                            <td className="px-6 py-5">
                                                <p className="text-[10px] text-white/40 italic line-clamp-2 max-w-[200px] leading-relaxed">
                                                    {p.problem_statement || 'Tidak ada catatan masalah.'}
                                                </p>
                                            </td>
                                            <td className="px-6 py-5">
                                                <span className="text-xs text-white/40">{p.created_at ? new Date(p.created_at).toLocaleDateString() : p.date}</span>
                                            </td>
                                            <td className="px-6 py-5">
                                                <span className={`text-[10px] font-bold px-3 py-1 rounded-full border ${getStatusStyle(p.status)}`}>
                                                    {p.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-5">
                                                <span className="text-xs font-bold text-white/70">{p.pricing}</span>
                                            </td>
                                            <td className="px-6 py-5 text-right">
                                                <div className="flex justify-end gap-2 no-print">
                                                    <button onClick={() => handlePrint(p)} className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-all text-xs" title="Print/Download">🖨️</button>
                                                    <button
                                                        onClick={() => onEdit && onEdit(p)}
                                                        className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-all text-xs text-blue-400"
                                                        title="View/Edit"
                                                    >
                                                        👁️
                                                    </button>
                                                    <button
                                                        onClick={() => onDuplicate && onDuplicate(p)}
                                                        className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-all text-xs text-emerald-400"
                                                        title="Duplicate"
                                                    >
                                                        📋
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            if (window.confirm(`Hapus proposal untuk ${p.client_name}?`)) {
                                                                onDelete && onDelete(p.id);
                                                            }
                                                        }}
                                                        className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-all text-xs text-white/20 hover:text-red-400"
                                                        title="Delete"
                                                    >
                                                        🗑️
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* AI Insights Sidebar */}
                {showInsights && (
                    <div className="lg:col-span-4 animate-fade-left">
                        <div className="bg-[#0f1535]/80 backdrop-blur-2xl border border-emerald-500/20 rounded-[30px] p-8 h-full relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-[40px] -mr-16 -mt-16" />

                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-sm font-bold flex items-center gap-2">
                                    <span className="text-lg">🤖</span> AI Strategic Analysis
                                </h3>
                                <button onClick={() => setShowInsights(false)} className="text-white/20 hover:text-white transition-colors">✕</button>
                            </div>

                            <div className="space-y-8 relative z-10">
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                        <h4 className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Common Patterns Identified</h4>
                                    </div>
                                    <p className="text-xs text-white/60 leading-relaxed">
                                        Proposal untuk klien **LPK** yang menggunakan narasi "Digitalisasi Pendaftaran Siswa" memiliki rasio approval **40% lebih tinggi**.
                                    </p>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                        <h4 className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Effectiveness Insight</h4>
                                    </div>
                                    <p className="text-xs text-white/60 leading-relaxed">
                                        Struktur solusi yang menyertakan "Estimasi ROI" singkat cenderung lebih cepat mendapatkan respon positif dari klien kategori **Company Profile**.
                                    </p>
                                </div>

                                <div className="space-y-3 p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl">
                                    <div className="flex items-center gap-2 mb-2">
                                        <h4 className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Future Recommendations</h4>
                                    </div>
                                    <ul className="text-[10px] text-white/40 space-y-2 list-disc list-inside">
                                        <li>Perkuat visualisasi 'Timeline' untuk klien LPK.</li>
                                        <li>Gunakan tone 'Kreatif' hanya pada klien Start-up/Service.</li>
                                        <li>Pertajam bagian 'Masalah Utama' agar lebih personal.</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="mt-10 p-4 border border-white/5 rounded-2xl text-center">
                                <p className="text-[9px] text-white/20 uppercase tracking-widest font-bold mb-1">Knowledge Base Status</p>
                                <p className="text-[10px] text-emerald-400/60">Updated with {proposals.length} historical documents</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProposalLibrary;
