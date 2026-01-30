import React from 'react';
import ReactMarkdown from 'react-markdown';

const ProposalPrintTemplate = ({ proposal, agencyName = "DARK AND BRIGHT" }) => {
    if (!proposal) return null;

    const today = new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    return (
        <div className="proposal-print-wrapper bg-white text-[#1a1c2e] font-sans">
            {/* CSS for Ultra-Minimalist Monochrome Architectural Design */}
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
                    color: #000;
                    background: #fff;
                }

                /* SHARED ELEMENTS */
                .logo-container {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }
                .logo-box {
                    width: 40px;
                    height: 40px;
                    background: #000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #fff;
                    font-weight: 900;
                    font-size: 24px;
                }
                .logo-text {
                    font-size: 18px;
                    font-weight: 900;
                    letter-spacing: -0.5px;
                }

                /* COVER PAGE STYLING (MATCHING IMAGE) */
                .cover-page {
                    position: relative;
                    height: 297mm;
                    background: #fff;
                    display: flex;
                    flex-direction: column;
                    padding: 20mm;
                    overflow: hidden;
                }

                .cover-header {
                    display: flex;
                    justify-content: flex-end;
                    margin-bottom: 40px;
                }

                .cover-image-container {
                    position: relative;
                    flex: 1;
                    background: #f3f4f6;
                    background-image: url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000');
                    background-size: cover;
                    background-position: center;
                    filter: grayscale(100%) contrast(1.2);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .cover-image-container::after {
                    content: '';
                    position: absolute;
                    top: 0; left: 0; right: 0; bottom: 0;
                    background: rgba(0,0,0,0.1);
                }

                .cover-title-box {
                    position: relative;
                    z-index: 10;
                    background: rgba(0, 0, 0, 0.85);
                    color: #fff;
                    padding: 60px;
                    width: 80%;
                    max-width: 500px;
                    text-align: center;
                    backdrop-filter: blur(5px);
                }

                .cover-title-box h1 {
                    font-size: 52px;
                    font-weight: 900;
                    line-height: 0.9;
                    margin: 0;
                    letter-spacing: -2px;
                    text-transform: uppercase;
                }

                .cover-title-box p {
                    font-size: 11px;
                    margin-top: 20px;
                    letter-spacing: 2px;
                    opacity: 0.7;
                    text-transform: uppercase;
                    border-top: 1px solid rgba(255,255,255,0.2);
                    padding-top: 20px;
                }

                .cover-footer {
                    display: flex;
                    justify-content: space-between;
                    padding-top: 40px;
                    font-size: 10px;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }

                /* TABLE OF CONTENTS PAGE */
                .toc-page {
                    height: 297mm;
                    padding: 20mm;
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 0;
                }

                .toc-left {
                    background: #000;
                    color: #fff;
                    padding: 40px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                }

                .toc-right {
                    background: #fff;
                    padding: 40px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                }

                .toc-title {
                    font-size: 32px;
                    font-weight: 900;
                    margin-bottom: 40px;
                    border-bottom: 4px solid #000;
                    padding-bottom: 10px;
                    width: fit-content;
                }

                .toc-item {
                    display: flex;
                    justify-content: space-between;
                    border-bottom: 1px solid #e5e7eb;
                    padding: 12px 0;
                    font-size: 12px;
                    font-weight: 700;
                }

                /* CONTENT PAGE STYLING */
                .content-page {
                    height: 297mm;
                    padding: 30mm 20mm;
                    position: relative;
                }

                .page-number-side {
                    position: absolute;
                    left: 10mm;
                    top: 50%;
                    transform: rotate(-90deg) translateY(-50%);
                    font-size: 9px;
                    font-weight: 900;
                    letter-spacing: 5px;
                    color: #d1d5db;
                }

                .section-header {
                    margin-bottom: 40px;
                }

                .section-header h2 {
                    font-size: 32px;
                    font-weight: 900;
                    text-transform: uppercase;
                    margin: 0;
                    letter-spacing: -1px;
                }

                .section-header .line {
                    width: 60px;
                    height: 6px;
                    background: #000;
                    margin-top: 10px;
                }

                .markdown-content {
                    column-count: 2;
                    column-gap: 30px;
                    font-size: 10pt;
                    line-height: 1.6;
                    text-align: justify;
                }

                .markdown-content h4 {
                    font-weight: 900;
                    text-transform: uppercase;
                    margin-top: 0;
                    column-span: all;
                    font-size: 14px;
                    border-bottom: 2px solid #000;
                    display: inline-block;
                    margin-bottom: 15px;
                }

                .markdown-content p {
                    margin-bottom: 15px;
                }

                .internal-footer {
                    position: absolute;
                    bottom: 20mm;
                    left: 20mm;
                    right: 20mm;
                    border-top: 1px solid #000;
                    padding-top: 10px;
                    display: flex;
                    justify-content: space-between;
                    font-size: 8px;
                    font-weight: 900;
                    text-transform: uppercase;
                }

                /* DARK PAGE VARIANT */
                .dark-page {
                    background: #000;
                    color: #fff;
                }
                .dark-page .internal-footer { border-top-color: #fff; color: #fff; }
                .dark-page .section-header .line { background: #fff; }
                `}
            </style>

            {/* COVER PAGE */}
            <div className="cover-page page-break">
                <div className="cover-header">
                    <div className="logo-container">
                        <div className="text-right">
                            <div className="logo-text">{agencyName}</div>
                            <div className="text-[8px] tracking-[2px] opacity-60 font-bold">WWW.THEDARKANDBRIGHT.COM</div>
                        </div>
                        <div className="logo-box">B</div>
                    </div>
                </div>

                <div className="cover-image-container">
                    <div className="cover-title-box">
                        <h1>Project<br />Proposal</h1>
                        <p>{proposal.title || 'Transforming Business Through Strategic Design'}</p>
                    </div>
                </div>

                <div className="cover-footer">
                    <div>Client: {proposal.client_name}</div>
                    <div>Date: {today}</div>
                    <div>Proposal Issued - {today}</div>
                </div>
            </div>

            {/* TABLE OF CONTENTS PAGE */}
            <div className="toc-page page-break">
                <div className="toc-left">
                    <h2 className="text-4xl font-black mb-6 uppercase leading-none">Welcome to<br />Company</h2>
                    <p className="text-xs opacity-60 leading-relaxed italic">
                        "Your vision, our execution. Dark And Bright Agency delivers strategic intelligence wrapped in premium digital aesthetics."
                    </p>
                </div>
                <div className="toc-right">
                    <h2 className="toc-title">Contents</h2>
                    <div className="space-y-2">
                        {[
                            '01. Executive Audit',
                            '02. Transformatif Solutions',
                            '03. Pricing & ROI',
                            '04. Roadmap & Investment',
                            '05. Conclusion'
                        ].map((item, i) => (
                            <div key={i} className="toc-item">
                                <span>{item}</span>
                                <span>0{i + 3}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CONTENT PAGES */}
            {[
                { title: 'Executive Audit', content: proposal.bab_1, dark: false },
                { title: 'Transformatif Solutions', content: proposal.bab_2, dark: true },
                { title: 'Roadmap & Investment', content: proposal.bab_3, dark: false },
                { title: 'Conclusion', content: proposal.bab_4, dark: false },
            ].map((section, index) => (
                <div key={index} className={`content-page page-break ${section.dark ? 'dark-page' : ''}`}>
                    <div className="page-number-side">PAGE 0{index + 3} / PROJECT PROPOSAL</div>

                    <div className="section-header">
                        <h2>{section.title}</h2>
                        <div className="line"></div>
                    </div>

                    <div className="markdown-content">
                        <ReactMarkdown>{section.content}</ReactMarkdown>
                    </div>

                    <div className="internal-footer">
                        <div>{agencyName} / {proposal.client_name}</div>
                        <div>Official Strategic Document / 2026</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProposalPrintTemplate;
