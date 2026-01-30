import React from 'react';
import ReactMarkdown from 'react-markdown';

const ProposalPrintTemplate = ({ proposal, agencyName = "DNB Agency" }) => {
    if (!proposal) return null;

    const today = new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    return (
        <div className="proposal-print-wrapper bg-white text-[#1a1c2e] font-sans">
            {/* CSS for Print Optimization */}
            <style>
                {`
                @media print {
                    @page {
                        size: A4;
                        margin: 20mm;
                    }
                    body {
                        -webkit-print-color-adjust: exact;
                    }
                    .page-break {
                        page-break-before: always;
                    }
                }
                .proposal-print-wrapper {
                    max-width: 800px;
                    margin: 0 auto;
                    line-height: 1.6;
                }
                .markdown-content h2 {
                    font-size: 1.5rem;
                    font-weight: 800;
                    margin-top: 2rem;
                    margin-bottom: 1rem;
                    color: #0f172a;
                    border-bottom: 2px solid #e2e8f0;
                    padding-bottom: 0.5rem;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }
                .markdown-content p {
                    margin-bottom: 1.25rem;
                    text-align: justify;
                }
                .markdown-content strong {
                    color: #1e293b;
                }
                .cover-page {
                    height: 100vh;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    text-align: center;
                    border: 15px solid #0f172a;
                    padding: 40px;
                    background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
                }
                `}
            </style>

            {/* COVER PAGE */}
            <div className="cover-page page-break">
                <div className="w-24 h-24 bg-[#0f172a] rounded-2xl flex items-center justify-center text-white text-4xl mb-8 shadow-xl">
                    D
                </div>
                <h2 className="text-[10px] font-bold tracking-[8px] uppercase text-slate-400 mb-2">{agencyName} Strategic Document</h2>
                <h1 className="text-4xl font-black text-slate-900 mb-6 leading-tight uppercase tracking-tight">
                    {proposal.title || 'Business Transformation Proposal'}
                </h1>
                <div className="w-20 h-1 bg-blue-600 mb-8" />

                <div className="space-y-4 mb-12">
                    <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Prepared exclusively for:</p>
                    <p className="text-2xl font-black text-slate-800 uppercase tracking-tighter">{proposal.client_name}</p>
                </div>

                <div className="mt-auto pt-10 border-t border-slate-100 w-full flex justify-between items-center px-10">
                    <div className="text-left">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Document Date</p>
                        <p className="text-xs font-bold text-slate-700">{today}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Classification</p>
                        <p className="text-xs font-bold text-blue-600 uppercase">Highly Confidential</p>
                    </div>
                </div>
            </div>

            {/* CONTENT SECTIONS */}
            <div className="py-10 px-8">
                {[
                    { title: 'Bab 1: Executive Audit & Analysis', content: proposal.bab_1 },
                    { title: 'Bab 2: Transformatif Solutions & ROI', content: proposal.bab_2 },
                    { title: 'Bab 3: Roadmap & Investment', content: proposal.bab_3 },
                    { title: 'Bab 4: Conclusion & Action', content: proposal.bab_4 },
                ].map((section, index) => (
                    <div key={index} className="mb-12 page-break">
                        <div className="flex items-center gap-4 mb-6">
                            <span className="text-4xl font-black text-slate-100 tabular-nums">0{index + 1}</span>
                            <h2 className="text-xl font-extrabold text-slate-900 m-0 p-0 border-none uppercase tracking-tight">
                                {section.title}
                            </h2>
                        </div>
                        <div className="markdown-content text-slate-700 text-[11pt] leading-relaxed">
                            <ReactMarkdown>{section.content}</ReactMarkdown>
                        </div>
                    </div>
                ))}

                {/* CLOSING FOOTER ON LAST PAGE */}
                <div className="mt-20 pt-10 border-t-2 border-slate-900 flex justify-between items-end">
                    <div>
                        <h4 className="font-black text-slate-900 uppercase">DNB Agency</h4>
                        <p className="text-[10px] text-slate-500 max-w-xs uppercase leading-tight font-bold">
                            Strategic Marketing Intelligence & <br />
                            High-Performance Digital Solutions
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] text-slate-400 font-bold mb-1 italic">Approved Strategic Document</p>
                        <div className="w-32 h-0.5 bg-slate-200 ml-auto mb-2" />
                        <p className="text-[10px] font-bold">admin.thedarkandbright.com</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProposalPrintTemplate;
