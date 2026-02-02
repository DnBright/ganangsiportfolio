import React, { useState } from 'react';
import ProposalPrintTemplate from './ProposalPrintTemplate';

const ProposalEditor = ({ draftContent, onBack, onSave }) => {
    const [title, setTitle] = useState(draftContent?.title || '');
    const [executiveSummary, setExecutiveSummary] = useState(draftContent?.executive_summary || '');
    const [problemAnalysis, setProblemAnalysis] = useState(draftContent?.problem_analysis || '');
    const [projectObjectives, setProjectObjectives] = useState(draftContent?.project_objectives || '');
    const [solutions, setSolutions] = useState(draftContent?.solutions || '');
    const [scopeOfWork, setScopeOfWork] = useState(draftContent?.scope_of_work || '');
    const [systemWalkthrough, setSystemWalkthrough] = useState(draftContent?.system_walkthrough || '');
    const [timeline, setTimeline] = useState(draftContent?.timeline || '');
    const [investment, setInvestment] = useState(draftContent?.investment || '');
    const [roiImpact, setRoiImpact] = useState(draftContent?.roi_impact || '');
    const [valueAdd, setValueAdd] = useState(draftContent?.value_add || '');
    const [closingCta, setClosingCta] = useState(draftContent?.closing_cta || '');

    const [pricing, setPricing] = useState(draftContent?.pricing || '');
    const [bonus, setBonus] = useState('');
    const [isPolishing, setIsPolishing] = useState(false);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);

    const handleAIPolish = () => {
        setIsPolishing(true);
        setTimeout(() => {
            const polish = (text) => (text || '').replace(/adalah/g, 'merupakan')
                .replace(/merasakan/g, 'mengalami')
                .replace(/hanya/g, 'semata-mata')
                .replace(/sangat/g, 'signifikan');

            setExecutiveSummary(polish(executiveSummary));
            setProblemAnalysis(polish(problemAnalysis));
            setProjectObjectives(polish(projectObjectives));
            setSolutions(polish(solutions));
            setScopeOfWork(polish(scopeOfWork));
            setSystemWalkthrough(polish(systemWalkthrough));
            setTimeline(polish(timeline));
            setInvestment(polish(investment));
            setRoiImpact(polish(roiImpact));
            setValueAdd(polish(valueAdd));
            setClosingCta(polish(closingCta));

            setIsPolishing(false);
        }, 2000);
    };

    const currentProposalData = {
        title,
        client_name: draftContent?.client_name || 'Valued Client',
        executive_summary: executiveSummary,
        problem_analysis: problemAnalysis,
        project_objectives: projectObjectives,
        solutions,
        scope_of_work: scopeOfWork,
        system_walkthrough: systemWalkthrough,
        timeline,
        investment,
        roi_impact: roiImpact,
        value_add: valueAdd,
        closing_cta: closingCta,
    };

    const sections = [
        { id: 'executive_summary', label: '1. Ringkasan Eksekutif', value: executiveSummary, setter: setExecutiveSummary },
        { id: 'problem_analysis', label: '2. Latar Belakang & Masalah', value: problemAnalysis, setter: setProblemAnalysis },
        { id: 'project_objectives', label: '3. Tujuan Proyek', value: projectObjectives, setter: setProjectObjectives },
        { id: 'solutions', label: '4. Solusi yang Ditawarkan', value: solutions, setter: setSolutions },
        { id: 'scope_of_work', label: '5. Ruang Lingkup Pekerjaan', value: scopeOfWork, setter: setScopeOfWork },
        { id: 'system_walkthrough', label: '6. Alur Sistem & Cara Kerja', value: systemWalkthrough, setter: setSystemWalkthrough },
        { id: 'timeline', label: '7. Timeline Implementasi', value: timeline, setter: setTimeline },
        { id: 'investment', label: '8. Estimasi Investasi Proyek', value: investment, setter: setInvestment },
        { id: 'roi_impact', label: '9. Estimasi Dampak & ROI', value: roiImpact, setter: setRoiImpact },
        { id: 'value_add', label: '10. Nilai Tambah Dark and Bright', value: valueAdd, setter: setValueAdd },
        { id: 'closing_cta', label: '11. Penutup & Ajakan Kerja Sama', value: closingCta, setter: setClosingCta },
    ];

    return (
        <div className="space-y-6 animate-fade-up animate-duration-500 pb-10">
            {/* Premium Preview Modal */}
            {isPreviewOpen && (
                <div id="premium-proposal-preview" className="fixed inset-0 z-[100] bg-[#0f111a] overflow-y-auto custom-scrollbar-hide">
                    <style>
                        {`
                        @media print {
                            /* Step 1: Neutralize Global Body/Html */
                            html, body {
                                height: auto !important;
                                overflow: visible !important;
                                visibility: hidden !important;
                            }

                            /* Step 2: Extract Modal to Root Flow */
                            #premium-proposal-preview {
                                visibility: visible !important;
                                position: absolute !important;
                                top: 0 !important;
                                left: 0 !important;
                                width: 210mm !important;
                                height: auto !important;
                                overflow: visible !important;
                                display: block !important;
                                background: white !important;
                            }

                            /* Step 3: Dissolve centering wrappers that cause flex-truncation */
                            #premium-proposal-preview > div {
                                display: block !important;
                                width: 100% !important;
                                height: auto !important;
                                overflow: visible !important;
                                padding: 0 !important;
                                margin: 0 !important;
                            }

                            /* Step 4: Fix Document Area */
                            .printable-document-area {
                                width: 210mm !important;
                                height: auto !important;
                                overflow: visible !important;
                                display: block !important;
                                margin: 0 !important;
                                padding: 0 !important;
                                box-shadow: none !important;
                            }

                            .no-print { display: none !important; visibility: hidden !important; }
                        }
                        `}
                    </style>

                    {/* Header: Sticky to remain visible during scroll */}
                    <div className="sticky top-0 z-[110] flex items-center justify-between p-6 border-b border-white/10 bg-[#0f111a]/80 backdrop-blur-xl no-print">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center text-xl shadow-lg shadow-blue-500/20">
                                👁️
                            </div>
                            <div>
                                <h2 className="text-white font-bold">Premium Live Layout Preview</h2>
                                <p className="text-[10px] text-white/40 uppercase tracking-widest">DNB Agency Visual Engine v2.0</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => window.print()}
                                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2"
                            >
                                🖨️ Export to PDF
                            </button>
                            <button
                                onClick={() => setIsPreviewOpen(false)}
                                className="px-6 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-bold transition-all"
                            >
                                Close Preview
                            </button>
                        </div>
                    </div>

                    {/* Content Section: Simple block flow for maximum scroll stability */}
                    <div className="w-full flex flex-col items-center py-20 px-4">
                        <div className="printable-document-area shadow-[0_0_100px_rgba(0,0,0,0.8)] bg-white shrink-0 mb-40"
                            style={{
                                width: '210mm',
                                minHeight: '297mm',
                                display: 'block',
                                position: 'relative',
                                borderRadius: '4px'
                            }}>
                            <ProposalPrintTemplate proposal={currentProposalData} />
                        </div>
                    </div>
                </div>
            )}

            {/* Header Content */}
            <div className="bg-[#0f1535]/60 backdrop-blur-xl border border-white/10 rounded-[30px] p-8 overflow-hidden relative group no-print">
                <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-purple-500/10 blur-[80px] rounded-full group-hover:bg-purple-500/15 transition-all duration-700" />

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-indigo-500 rounded-2xl flex items-center justify-center text-xl shadow-lg shadow-purple-600/20">
                            ✍️
                        </div>
                        <div>
                            <h2 className="text-xl font-bold tracking-tight">Manual Refinement Workspace</h2>
                            <p className="text-xs text-white/40">Tahap akhir pengerjaan proposal panjang untuk kualitas Dark and Bright.</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setIsPreviewOpen(true)}
                            className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-bold tracking-widest uppercase transition-all shadow-lg shadow-blue-500/20 flex items-center gap-2"
                        >
                            <span>👁️</span> Live Premium Preview
                        </button>
                        <button
                            onClick={handleAIPolish}
                            disabled={isPolishing}
                            className={`px-8 py-3 rounded-2xl border ${isPolishing ? 'border-purple-500/50 text-purple-400 bg-purple-500/5' : 'border-purple-500/30 text-purple-400 hover:bg-purple-500/10'} text-[10px] font-bold tracking-widest uppercase transition-all flex items-center gap-2`}
                        >
                            {isPolishing ? (
                                <>
                                    <div className="w-3 h-3 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
                                    Optimizing Language...
                                </>
                            ) : (
                                <><span>✨</span> AI Polish (Full Document)</>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Main Editor */}
                <div className="lg:col-span-8 space-y-8">
                    {/* Title Section */}
                    <div className="bg-[#0f1535]/60 backdrop-blur-xl border border-white/10 rounded-[30px] p-8 shadow-2xl">
                        <label className="text-[10px] text-cyan-400 font-bold uppercase tracking-[4px] mb-4 block">Proposal Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full bg-transparent border-none outline-none text-2xl font-black text-white placeholder:text-white/10"
                            placeholder="Enter Proposal Title..."
                        />
                    </div>

                    {/* Sections Group */}
                    <div className="space-y-8">
                        {sections.map((section) => (
                            <div key={section.id} className="bg-[#0f1535]/60 backdrop-blur-xl border border-white/10 rounded-[30px] p-8 shadow-2xl group transition-all duration-500 hover:border-cyan-500/20">
                                <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
                                    <label className="text-[10px] text-white/30 font-bold uppercase tracking-[4px]">{section.label}</label>
                                    <span className="text-[10px] text-white/10 font-bold uppercase">{(section.value || '').split(' ').length} WORDS</span>
                                </div>
                                <textarea
                                    value={section.value}
                                    onChange={(e) => section.setter(e.target.value)}
                                    className="w-full bg-transparent border-none outline-none text-base leading-relaxed text-white/70 min-h-[250px] resize-none font-sans no-scrollbar"
                                    placeholder={`Isi ${section.label} di sini...`}
                                ></textarea>
                            </div>
                        ))}
                    </div>

                </div>

                {/* Human Strategy Panel */}
                <div className="lg:col-span-4 space-y-6 no-print">
                    <div className="sticky top-6 space-y-6">
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] text-white/40 font-bold uppercase tracking-widest ml-1">High-Value Bonus / Service (Notes)</label>
                                <textarea
                                    value={bonus}
                                    onChange={(e) => setBonus(e.target.value)}
                                    placeholder="e.g. Free 6-Month Premium Support"
                                    rows="6"
                                    className="w-full bg-[#060b26]/50 border border-white/10 rounded-2xl px-4 py-4 text-sm outline-none focus:border-blue-500/50 transition-all resize-none leading-relaxed"
                                ></textarea>
                            </div>
                        </div>
                    </div>

                    <div className="pt-8 border-t border-white/5 space-y-4">
                        <button
                            onClick={() => onSave({
                                title,
                                executive_summary: executiveSummary,
                                problem_analysis: problemAnalysis,
                                project_objectives: projectObjectives,
                                solutions,
                                scope_of_work: scopeOfWork,
                                system_walkthrough: systemWalkthrough,
                                timeline,
                                investment,
                                roi_impact: roiImpact,
                                value_add: valueAdd,
                                closing_cta: closingCta,
                                pricing,
                                bonus
                            })}
                            className="w-full py-5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-[24px] font-black text-sm tracking-[2px] shadow-2xl shadow-blue-500/30 active:scale-95 transition-all uppercase"
                        >
                            Finish & Save Proposal
                        </button>
                        <button
                            onClick={onBack}
                            className="w-full py-4 bg-white/5 border border-white/10 text-white/60 hover:text-white rounded-[24px] text-[10px] font-bold uppercase tracking-widest transition-all"
                        >
                            ← Kembali Perbaiki Draft
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProposalEditor;
