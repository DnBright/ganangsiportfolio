import React from 'react';
import ReactMarkdown from 'react-markdown';

const ProposalPrintTemplate = ({ proposal, agencyName = "Dark and Bright" }) => {
    if (!proposal) return null;

    const today = new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    const currentMonthYear = new Date().toLocaleDateString('id-ID', {
        month: 'long',
        year: 'numeric'
    });

    const sections = [
        { title: '1. Ringkasan Eksekutif', content: proposal.executive_summary },
        { title: '2. Latar Belakang & Masalah Klien', content: proposal.problem_analysis },
        { title: '3. Tujuan Proyek', content: proposal.project_objectives },
        { title: '4. Solusi yang Ditawarkan', content: proposal.solutions },
        { title: '5. Ruang Lingkup Pekerjaan (Deliverables)', content: proposal.scope_of_work },
        { title: '6. Alur Sistem & Cara Kerja', content: proposal.system_walkthrough },
        { title: '7. Timeline Implementasi', content: proposal.timeline },
        { title: '8. Estimasi Investasi Proyek', content: proposal.investment },
        { title: '9. Estimasi Dampak & ROI', content: proposal.roi_impact },
        { title: '10. Nilai Tambah Dark and Bright', content: proposal.value_add },
        { title: '11. Penutup & Ajakan Kerja Sama', content: proposal.closing_cta },
    ];

    return (
        <div className="proposal-print-wrapper bg-white text-[#1a1c2e] font-sans">
            {/* CSS for Exact Cover Page Replication */}
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
                        background: #fff;
                    }
                    .page-break {
                        page-break-before: always;
                    }
                }

                .proposal-print-wrapper {
                    width: 210mm;
                    margin: 0 auto;
                    color: #1a202c;
                    background: #fff;
                    font-family: 'Inter', 'Segoe UI', Roboto, sans-serif;
                }

                /* REPLICATED COVER PAGE STYLING */
                .cover-page {
                    position: relative;
                    height: 297mm;
                    background: #fff;
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                    padding: 0;
                }

                /* Diagonal Slanted Background */
                .cover-bg-dark {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: #0f172a; /* Slate 900 */
                    clip-path: polygon(0 0, 100% 0, 30% 100%, 0% 100%);
                    z-index: 1;
                }

                .cover-content {
                    position: relative;
                    z-index: 10;
                    padding: 50px 70px;
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                }

                /* Logo Section */
                .logo-section {
                    margin-bottom: 40px;
                }
                .logo-icon {
                    width: 60px;
                    height: 60px;
                    margin-bottom: 12px;
                }
                .logo-text-large {
                    color: #fff;
                    font-size: 28px;
                    font-weight: 900;
                    line-height: 1;
                    margin-bottom: 4px;
                    letter-spacing: -1px;
                }
                .logo-subtext {
                    color: rgba(255,255,255,0.5);
                    font-size: 11px;
                    font-weight: 700;
                    letter-spacing: 1px;
                }

                /* Technology Illustration */
                .tech-illustration {
                    position: relative;
                    width: 100%;
                    height: 280px;
                    margin-top: 30px;
                    margin-bottom: 50px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .tech-image {
                    width: 85%;
                    max-width: 450px;
                    filter: saturate(0) brightness(1.5);
                    opacity: 0.2;
                }

                /* Main Heading Area */
                .heading-area {
                    margin-top: auto;
                    margin-bottom: 40px;
                    max-width: 80%;
                }
                .heading-main {
                    font-size: 48px;
                    font-weight: 950;
                    line-height: 1;
                    color: #fff;
                    text-transform: uppercase;
                    letter-spacing: -2px;
                }

                .client-info-area {
                    margin-bottom: 30px;
                }
                .client-name-display {
                    font-size: 36px;
                    font-weight: 900;
                    color: #fff;
                    text-transform: uppercase;
                    margin-bottom: 20px;
                    position: relative;
                    letter-spacing: -1px;
                }
                .client-name-display::after {
                    content: '';
                    display: block;
                    width: 120px;
                    height: 3px;
                    background: #3b82f6; /* Bright Blue accent */
                    margin-top: 20px;
                }

                .problem-statement-display {
                    font-size: 18px;
                    font-weight: 700;
                    color: rgba(255,255,255,0.8);
                    letter-spacing: 0.5px;
                }

                /* Metadata Footer */
                .cover-metadata {
                    margin-top: auto;
                    display: flex;
                    flex-direction: column;
                    align-items: flex-end;
                    text-align: right;
                    color: #64748b;
                    font-size: 11px;
                    font-weight: 700;
                    line-height: 1.8;
                    letter-spacing: 1px;
                }
                .meta-item span {
                    font-weight: 900;
                    color: #1e293b;
                    margin-left: 5px;
                }

                /* INTERNAL PAGE STYLING */
                .internal-page {
                    position: relative;
                    min-height: 297mm;
                    padding: 35mm 25mm;
                    background: white;
                }
                .internal-header {
                    position: absolute;
                    top: 15mm;
                    left: 25mm;
                    right: 25mm;
                    display: flex;
                    justify-content: space-between;
                    font-size: 10px;
                    font-weight: 900;
                    color: #cbd5e1;
                    border-bottom: 2px solid #f8fafc;
                    padding-bottom: 8px;
                    text-transform: uppercase;
                    letter-spacing: 1.5px;
                }
                .section-title-wrap {
                    margin-bottom: 40px;
                    border-bottom: 4px solid #0f172a;
                    padding-bottom: 15px;
                    display: inline-block;
                    min-width: 100px;
                }
                .section-title-wrap h2 {
                    font-size: 28px;
                    font-weight: 950;
                    color: #0f172a;
                    text-transform: uppercase;
                    margin: 0;
                    letter-spacing: -0.5px;
                }
                .markdown-content {
                    font-size: 11.5pt;
                    line-height: 1.8;
                    color: #334155;
                    text-align: justify;
                }
                .markdown-content strong { color: #0f172a; font-weight: 850; }
                .markdown-content ul { list-style-type: square; padding-left: 25px; margin-bottom: 20px; }
                .markdown-content li { margin-bottom: 10px; }
                
                .markdown-content h3 {
                    font-size: 16pt;
                    font-weight: 900;
                    color: #0f172a;
                    margin-top: 25px;
                    margin-bottom: 15px;
                    text-transform: uppercase;
                    letter-spacing: -0.5px;
                }

                .internal-footer {
                    position: absolute;
                    bottom: 15mm;
                    left: 25mm;
                    right: 25mm;
                    display: flex;
                    justify-content: space-between;
                    font-size: 10px;
                    font-weight: 900;
                    color: #e2e8f0;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }
                `}
            </style>

            {/* COVER PAGE */}
            <div className="cover-page page-break">
                <div className="cover-bg-dark" />

                <div className="cover-content">
                    {/* Logo Area */}
                    <div className="logo-section">
                        <img src="/assets/logo-dnb.png" className="logo-icon" alt="Dark and Bright Logo" />
                        <div className="logo-text-large">{agencyName.toUpperCase()}</div>
                        <div className="logo-subtext">DIGITAL SYSTEMS, NET FAST WEBSITES</div>
                    </div>

                    {/* Tech Schematic Illustration */}
                    <div className="tech-illustration">
                        <img
                            src="https://img.freepik.com/premium-vector/abstract-technology-schematic-circuit-background_1017-31350.jpg"
                            className="tech-image"
                            alt="Technology Perspective"
                            style={{ mixBlendMode: 'screen', opacity: '0.8' }}
                        />
                    </div>

                    {/* Heading Group */}
                    <div className="heading-area">
                        <div className="heading-main">
                            {proposal.title || "PROPOSAL PENGEMBANGAN WEBSITE & SISTEM DIGITAL"}
                        </div>
                    </div>

                    {/* Client & Problem Area */}
                    <div className="client-info-area">
                        <div className="client-name-display">
                            {proposal.client_name}
                        </div>
                        <div className="problem-statement-display">
                            {proposal.problem_statement || "Digitalisasi Strategis & Otomasi Bisnis"}
                        </div>
                    </div>

                    {/* Footer Metadata */}
                    <div className="cover-metadata">
                        <div className="meta-item">Tanggal Proposal: <span>{today}</span></div>
                        <div className="meta-item">Versi Dokumen: <span>v1.0 / {currentMonthYear}</span></div>
                        <div className="meta-item">Status Dokumen: <span>Confidential</span></div>
                    </div>
                </div>
            </div>

            {/* INTERNAL PAGES */}
            {sections.map((section, index) => (
                <div key={index} className="internal-page page-break">
                    <div className="internal-header">
                        <div>{agencyName} STRATEGIC DOCUMENT</div>
                        <div>PAGE {String(index + 2).padStart(2, '0')}</div>
                    </div>

                    <div className="section-title-wrap">
                        <h2>{section.title}</h2>
                    </div>

                    <div className="markdown-content">
                        {section.content ? (
                            <ReactMarkdown>{section.content}</ReactMarkdown>
                        ) : (
                            <p className="text-gray-300 italic text-sm">Bagian ini belum diisi.</p>
                        )}
                    </div>

                    <div className="internal-footer">
                        <div>OFFICIAL STRATEGIC DOCUMENT / 2026</div>
                        <div>{proposal.client_name} - CONFIDENTIAL</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProposalPrintTemplate;
