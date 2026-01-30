import React from 'react';
import ReactMarkdown from 'react-markdown';

const ProposalPrintTemplate = ({ proposal, agencyName = "Dark And Bright" }) => {
    if (!proposal) return null;

    const today = new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    const validUntil = new Date();
    validUntil.setDate(validUntil.getDate() + 14);
    const validStr = validUntil.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    return (
        <div className="proposal-print-wrapper bg-white text-[#1a1c2e] font-sans">
            {/* CSS for High-Fidelity Design (Polygonal & Branded) */}
            <style>
                {`
                @media print {
                    @page {
                        size: A4;
                        margin: 0;
                    }
                    body {
                        -webkit-print-color-adjust: exact;
                        margin: 0;
                    }
                    .page-break {
                        page-break-before: always;
                    }
                    .no-print { display: none; }
                }

                .proposal-print-wrapper {
                    width: 210mm;
                    margin: 0 auto;
                    color: #1a202c;
                }

                /* COVER PAGE STYLING */
                .cover-page {
                    position: relative;
                    height: 296.5mm; /* A4 height */
                    background: #fff;
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                    padding: 80px 60px;
                }

                .bg-polygon-top {
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: 70%;
                    height: 40%;
                    background: linear-gradient(135deg, #0ea5e9 0%, #0369a1 100%);
                    clip-path: polygon(20% 0%, 100% 0%, 100% 100%, 0% 80%);
                    z-index: 1;
                }

                .bg-polygon-accent {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 35%;
                    height: 45%;
                    background: #0f172a;
                    clip-path: polygon(0% 0%, 100% 0%, 80% 60%, 0% 100%);
                    z-index: 2;
                }

                .bg-polygon-bottom {
                    position: absolute;
                    bottom: 0;
                    right: 0;
                    width: 100%;
                    height: 30%;
                    background: linear-gradient(225deg, #0ea5e9 0%, #0284c7 100%);
                    clip-path: polygon(100% 0%, 100% 100%, 0% 100%, 30% 70%);
                    z-index: 1;
                }

                .cover-content {
                    position: relative;
                    z-index: 10;
                    margin-top: 15%;
                }

                .cover-logo {
                    color: #fff;
                    margin-bottom: 2rem;
                }

                .cover-title-group h2 {
                    font-size: 14px;
                    letter-spacing: 0.4em;
                    color: #0ea5e9;
                    font-weight: 800;
                    text-transform: uppercase;
                    margin-bottom: 0.5rem;
                }

                .cover-title-group h1 {
                    font-size: 64px;
                    font-weight: 900;
                    line-height: 1;
                    color: #0f172a;
                    text-transform: uppercase;
                    margin-bottom: 1rem;
                }

                .expand-tagline {
                    color: #0ea5e9;
                    font-weight: 700;
                    font-size: 14px;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    margin-bottom: 3rem;
                }

                .company-name-label {
                    font-size: 12px;
                    font-weight: 800;
                    color: #64748b;
                    text-transform: uppercase;
                    margin-bottom: 0.25rem;
                }

                .prepared-for {
                    margin-top: auto;
                    padding-bottom: 40px;
                }

                .prepared-for p {
                    font-size: 12px;
                    font-weight: 700;
                    color: #94a3b8;
                    text-transform: uppercase;
                }

                .prepared-for h3 {
                    font-size: 24px;
                    font-weight: 900;
                    color: #0f172a;
                    text-transform: uppercase;
                }

                /* INTERNAL PAGE STYLING */
                .internal-page {
                    position: relative;
                    min-height: 297mm;
                    padding: 40mm 20mm 25mm 20mm;
                    background: white;
                }

                .page-header {
                    position: absolute;
                    top: 20mm;
                    left: 20mm;
                    right: 20mm;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-bottom: 1px solid #e2e8f0;
                    padding-bottom: 5px;
                }

                .page-footer {
                    position: absolute;
                    bottom: 15mm;
                    left: 20mm;
                    right: 20mm;
                    display: flex;
                    justify-content: space-between;
                    font-size: 9px;
                    color: #94a3b8;
                    font-weight: 700;
                    text-transform: uppercase;
                }

                .section-number {
                    font-size: 80px;
                    font-weight: 900;
                    color: #f1f5f9;
                    position: absolute;
                    top: 35mm;
                    left: 15mm;
                    z-index: 0;
                }

                .section-title {
                    font-size: 24px;
                    font-weight: 900;
                    color: #0f172a;
                    text-transform: uppercase;
                    margin-bottom: 2rem;
                    position: relative;
                    z-index: 1;
                    border-left: 6px solid #0ea5e9;
                    padding-left: 15px;
                }

                .markdown-content {
                    position: relative;
                    z-index: 1;
                    font-size: 11pt;
                    line-height: 1.7;
                    color: #334155;
                }

                .markdown-content h4 {
                    font-weight: 800;
                    color: #0f172a;
                    margin-top: 1.5rem;
                    margin-bottom: 0.5rem;
                    text-transform: uppercase;
                }

                .markdown-content p {
                    margin-bottom: 1rem;
                    text-align: justify;
                }

                .markdown-content ul {
                    list-style-type: none;
                    margin-bottom: 1.5rem;
                }

                .markdown-content li {
                    position: relative;
                    padding-left: 1.5rem;
                    margin-bottom: 0.5rem;
                }

                .markdown-content li:before {
                    content: "•";
                    position: absolute;
                    left: 0;
                    color: #0ea5e9;
                    font-weight: bold;
                }
                `}
            </style>

            {/* COVER PAGE */}
            <div className="cover-page page-break">
                <div className="bg-polygon-top" />
                <div className="bg-polygon-accent" />
                <div className="bg-polygon-bottom" />

                <div className="cover-logo">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center font-black text-[#0f172a] text-xl">D</div>
                        <div className="text-left font-black text-white leading-tight">
                            <div className="text-sm tracking-tighter">{agencyName.toUpperCase()}</div>
                            <div className="text-[8px] tracking-[3px] opacity-60">AGENCY PLATFORM</div>
                        </div>
                    </div>
                </div>

                <div className="cover-content">
                    <div className="cover-title-group">
                        <h2>PROJECT</h2>
                        <h1>PROPOSAL</h1>
                    </div>
                    <div className="expand-tagline">Expand Your Business With Us Now</div>

                    <div className="company-name-label">COMPANY NAME</div>
                    <div className="font-bold text-slate-700 text-lg mb-8">{agencyName.toUpperCase()}</div>

                    <div className="grid grid-cols-2 gap-8 text-[11px] font-bold text-slate-500">
                        <div>
                            <div className="text-slate-400 mb-1">Proposal Issued :</div>
                            <div className="text-slate-800">{today}</div>
                        </div>
                        <div>
                            <div className="text-slate-400 mb-1">Proposal Valid :</div>
                            <div className="text-slate-800">{validStr}</div>
                        </div>
                    </div>
                </div>

                <div className="prepared-for">
                    <p>Prepared for</p>
                    <h3>{proposal.client_name}</h3>
                </div>
            </div>

            {/* INTERNAL PAGES */}
            {[
                { title: 'Executive Audit & Analysis', content: proposal.bab_1 },
                { title: 'Transformatif Solutions & ROI', content: proposal.bab_2 },
                { title: 'Roadmap & Investment', content: proposal.bab_3 },
                { title: 'Conclusion & Action', content: proposal.bab_4 },
            ].map((section, index) => (
                <div key={index} className="internal-page page-break">
                    <div className="page-header">
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{agencyName} Strategic Doc</div>
                        <div className="text-[10px] font-black text-blue-500 uppercase">Page {index + 2}</div>
                    </div>

                    <div className="section-number">0{index + 1}</div>
                    <h2 className="section-title">{section.title}</h2>

                    <div className="markdown-content">
                        <ReactMarkdown>{section.content}</ReactMarkdown>
                    </div>

                    <div className="page-footer">
                        <div>{agencyName} - {proposal.client_name}</div>
                        <div>Confidential & Strategic</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProposalPrintTemplate;
