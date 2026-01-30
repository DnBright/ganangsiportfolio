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
                    background: #111827; /* Dark grayish-navy */
                    clip-path: polygon(0 0, 100% 0, 25% 100%, 0% 100%);
                    z-index: 1;
                }

                .cover-content {
                    position: relative;
                    z-index: 10;
                    padding: 40px 60px;
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                }

                /* Logo Section */
                .logo-section {
                    margin-bottom: 30px;
                }
                .logo-icon {
                    width: 50px;
                    height: 50px;
                    margin-bottom: 10px;
                }
                .logo-text-large {
                    color: #fff;
                    font-size: 24px;
                    font-weight: 800;
                    line-height: 1;
                    margin-bottom: 2px;
                }
                .logo-subtext {
                    color: rgba(255,255,255,0.6);
                    font-size: 10px;
                    font-weight: 600;
                    letter-spacing: 0.5px;
                }

                /* Technology Illustration Place-holder (futuristic schematic) */
                .tech-illustration {
                    position: relative;
                    width: 100%;
                    height: 250px;
                    margin-top: 20px;
                    margin-bottom: 40px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .tech-image {
                    width: 80%;
                    max-width: 400px;
                    filter: drop-shadow(0 0 20px rgba(59, 130, 246, 0.4));
                }

                /* Main Heading Area */
                .heading-area {
                    margin-top: 20px;
                    margin-bottom: 40px;
                }
                .heading-main {
                    font-size: 48px;
                    font-weight: 900;
                    line-height: 1.1;
                    color: #fff; /* Part of it is on dark background */
                    text-transform: uppercase;
                    letter-spacing: -1px;
                }
                /* Mix blend mode for text overlap color inversion effect if needed, 
                   but usually simpler to handle via layout in print */
                .heading-white-area {
                    color: #111827;
                }

                .client-info-area {
                    margin-bottom: 30px;
                }
                .client-name-display {
                    font-size: 32px;
                    font-weight: 800;
                    color: #fff;
                    text-transform: uppercase;
                    margin-bottom: 15px;
                    position: relative;
                }
                .client-name-display::after {
                    content: '';
                    display: block;
                    width: 100%;
                    height: 1.5px;
                    background: rgba(255,255,255,0.3);
                    margin-top: 15px;
                }

                .problem-statement-display {
                    font-size: 16px;
                    font-weight: 700;
                    color: #fff;
                    opacity: 0.9;
                }

                /* Metadata Footer */
                .cover-metadata {
                    margin-top: auto;
                    display: flex;
                    flex-direction: column;
                    align-items: flex-end;
                    text-align: right;
                    color: #4b5563;
                    font-size: 12px;
                    font-weight: 600;
                    line-height: 1.6;
                }
                .meta-item span {
                    font-weight: 800;
                    color: #1f2937;
                }

                /* INTERNAL PAGE STYLING */
                .internal-page {
                    position: relative;
                    min-height: 297mm;
                    padding: 30mm 20mm;
                    background: white;
                }
                .internal-header {
                    position: absolute;
                    top: 15mm;
                    left: 20mm;
                    right: 20mm;
                    display: flex;
                    justify-content: space-between;
                    font-size: 9px;
                    font-weight: 800;
                    color: #94a3b8;
                    border-bottom: 1.5px solid #f1f5f9;
                    padding-bottom: 5px;
                    text-transform: uppercase;
                }
                .section-title-wrap {
                    margin-bottom: 40px;
                    border-left: 8px solid #111827;
                    padding-left: 20px;
                }
                .section-title-wrap h2 {
                    font-size: 28px;
                    font-weight: 900;
                    color: #111827;
                    text-transform: uppercase;
                    margin: 0;
                }
                .markdown-content {
                    font-size: 11pt;
                    line-height: 1.8;
                    color: #374151;
                    text-align: justify;
                }
                .markdown-content strong { color: #000; font-weight: 800; }
                .internal-footer {
                    position: absolute;
                    bottom: 15mm;
                    left: 20mm;
                    right: 20mm;
                    display: flex;
                    justify-content: space-between;
                    font-size: 9px;
                    font-weight: 800;
                    color: #cbd5e1;
                    text-transform: uppercase;
                }
                `}
            </style>

            {/* COVER PAGE */}
            <div className="cover-page page-break">
                <div className="cover-bg-dark" />

                <div className="cover-content">
                    {/* Logo Area */}
                    <div className="logo-section">
                        {/* Replicating the logo from image (3D Cube-ish icon) */}
                        <svg className="logo-icon" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M50 5L15 25V65L50 85L85 65V25L50 5Z" fill="#1e293b" />
                            <path d="M50 5L85 25L50 45L15 25L50 5Z" fill="#334155" />
                            <path d="M15 25L50 45V85L15 65V25Z" fill="#0f172a" />
                            <path d="M50 45L85 25V65L50 85V45Z" fill="#475569" />
                            <text x="35" y="60" fill="white" fontSize="25" fontWeight="900" fontFamily="sans-serif">DB</text>
                        </svg>
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
                            PROPOSAL PENGEMBANGAN<br />
                            WEBSITE & SISTEM DIGITAL
                        </div>
                    </div>

                    {/* Client & Problem Area */}
                    <div className="client-info-area">
                        <div className="client-name-display">
                            {proposal.client_name}
                        </div>
                        <div className="problem-statement-display">
                            {proposal.problem_statement || "Digitalisasi Informasi, Penerimaan Siswa, dan Manajemen Konten"}
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
            {[
                { title: 'Executive Audit & Analysis', content: proposal.bab_1 },
                { title: 'Transformatif Solutions & ROI', content: proposal.bab_2 },
                { title: 'Roadmap & Investment', content: proposal.bab_3 },
                { title: 'Conclusion & Action', content: proposal.bab_4 },
            ].map((section, index) => (
                <div key={index} className="internal-page page-break">
                    <div className="internal-header">
                        <div>{agencyName} STRATEGIC DOCUMENT</div>
                        <div>PAGE 0{index + 2}</div>
                    </div>

                    <div className="section-title-wrap">
                        <h2>{section.title}</h2>
                    </div>

                    <div className="markdown-content">
                        <ReactMarkdown>{section.content}</ReactMarkdown>
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
