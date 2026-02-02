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
        { id: 1, title: '1. Ringkasan Eksekutif', content: proposal.executive_summary, layout: 'sidebar' },
        { id: 2, title: '2. Latar Belakang & Masalah', content: proposal.problem_analysis, layout: 'problem' },
        { id: 3, title: '3. Tujuan Proyek', content: proposal.project_objectives, layout: 'objectives' },
        { id: 4, title: '4. Solusi Utama', content: proposal.solutions, layout: 'grid' },
        { id: 5, title: '5. Ruang Lingkup (Deliverables)', content: proposal.scope_of_work, layout: 'list' },
        { id: 6, title: '6. Alur Sistem & Cara Kerja', content: proposal.system_walkthrough, layout: 'flow' },
        { id: 7, title: '7. Timeline Implementasi', content: proposal.timeline, layout: 'milestone' },
        { id: 8, title: '8. Estimasi Investasi Proyek', content: proposal.investment, layout: 'pricing' },
        { id: 9, title: '9. Estimasi Dampak & ROI', content: proposal.roi_impact, layout: 'impact' },
        { id: 10, title: '10. Nilai Tambah Agensi', content: proposal.value_add, layout: 'cards' },
        { id: 11, title: '11. Penutup & Kerja Sama', content: proposal.closing_cta, layout: 'closing' },
    ];

    return (
        <div className="proposal-print-wrapper bg-white text-[#0f172a] font-sans pb-[100px] min-h-screen">
            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700;900&family=Outfit:wght@400;600;900&display=swap');

                @media print {
                    @page { size: A4; margin: 0; }
                    body { -webkit-print-color-adjust: exact; margin: 0; background: #fff; }
                    .page-break { page-break-before: always; }
                }

                .proposal-print-wrapper {
                    width: 210mm;
                    margin: 0 auto;
                    color: #1e293b;
                    background: #fff;
                    font-family: 'Inter', sans-serif;
                }

                /* SHARED ELEMENTS */
                .internal-page {
                    position: relative;
                    min-height: 297mm;
                    padding: 30mm 20mm;
                    background: #fff;
                    overflow: hidden;
                }

                .internal-header {
                    position: absolute; top: 15mm; left: 20mm; right: 20mm;
                    display: flex; justify-content: space-between;
                    font-size: 10px; font-weight: 900; color: #cbd5e1;
                    border-bottom: 2px solid #f8fafc; padding-bottom: 8px;
                    text-transform: uppercase; letter-spacing: 2px;
                }

                .internal-footer {
                    position: absolute; bottom: 15mm; left: 20mm; right: 20mm;
                    display: flex; justify-content: space-between;
                    font-size: 10px; font-weight: 900; color: #e2e8f0;
                    text-transform: uppercase; letter-spacing: 1px;
                }

                /* COVER PAGE */
                .cover-page {
                    position: relative; height: 297mm; background: #0f172a; overflow: hidden;
                }
                .cover-accent {
                    position: absolute; top: 0; right: 0; width: 60%; height: 100%;
                    background: #1e293b; clip-path: polygon(40% 0, 100% 0, 100% 100%, 0% 100%);
                }
                .cover-content {
                    position: relative; z-index: 10; padding: 60px 80px; height: 100%;
                    display: flex; flex-direction: column; justify-content: space-between;
                }
                .cover-title {
                    font-family: 'Outfit', sans-serif; font-size: 56px; font-weight: 900;
                    line-height: 1; color: #fff; text-transform: uppercase; letter-spacing: -2px;
                    margin-top: 100px; max-width: 80%;
                }
                .cover-subtitle {
                    font-size: 24px; font-weight: 400; color: #3b82f6; margin-top: 20px;
                }

                /* LAYOUT: SIDEBAR (Bab 1) */
                .layout-sidebar { display: grid; grid-template-columns: 2fr 1fr; gap: 40px; }
                .sidebar-accent { 
                    background: #f8fafc; padding: 25px; border-radius: 20px;
                    border-left: 5px solid #3b82f6; height: fit-content;
                }
                .sidebar-accent h4 { font-size: 10px; font-weight: 900; color: #3b82f6; text-transform: uppercase; margin-bottom: 15px; }

                /* LAYOUT: PROBLEM (Bab 2) */
                .layout-problem { position: relative; }
                .problem-quote {
                    font-size: 28px; font-weight: 900; color: #0f172a; line-height: 1.2;
                    margin-bottom: 40px; border-left: 10px solid #ef4444; padding-left: 30px;
                }

                /* LAYOUT: GRID (Bab 4) */
                .layout-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 30px; }
                .grid-item { padding: 25px; background: #f8fafc; border-radius: 20px; border: 1px solid #e2e8f0; }
                .grid-item h3 { font-size: 14px; font-weight: 900; color: #0f172a; margin-bottom: 10px; text-transform: uppercase; }

                /* LAYOUT: PRICING (Bab 8) */
                .pricing-container {
                    background: #0f172a; color: #fff; padding: 40px; border-radius: 30px;
                    margin-top: 40px; border: 4px solid #3b82f6; text-align: center;
                }
                .price-tag { font-family: 'Outfit', sans-serif; font-size: 48px; font-weight: 950; color: #3b82f6; }

                /* LAYOUT: CLOSING (Bab 11) */
                .layout-closing {
                    display: flex; flex-direction: column; align-items: center; justify-content: center;
                    text-align: center; height: 100%; color: #0f172a;
                }
                .closing-signature { margin-top: 80px; padding-top: 30px; border-top: 2px solid #e2e8f0; width: 300px; }

                /* LAYOUT: OBJECTIVES (Bab 3) */
                .layout-objectives-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; }
                .objective-card { border-left: 4px solid #3b82f6; padding-left: 20px; margin-bottom: 20px; }
                .objective-card h3 { font-size: 14px; font-weight: 950; margin-bottom: 5px; }

                /* LAYOUT: LIST (Bab 5) */
                .layout-deliverables-list { background: #f8fafc; border-radius: 30px; padding: 40px; border: 1px solid #e2e8f0; }
                .deliverable-item { display: flex; align-items: flex-start; gap: 15px; margin-bottom: 15px; border-bottom: 1px solid #e2e8f0; padding-bottom: 15px; }

                /* LAYOUT: FLOW (Bab 6) */
                .flow-step { display: flex; gap: 20px; margin-bottom: 30px; position: relative; }
                .flow-number { 
                    width: 40px; height: 40px; background: #0f172a; color: #fff; border-radius: 50%; 
                    display: flex; align-items: center; justify-content: center; font-weight: 900; flex-shrink: 0;
                }

                /* LAYOUT: MILESTONE (Bab 7) */
                .milestone-track { border-left: 2px dashed #cbd5e1; margin-left: 20px; padding-left: 30px; }
                .milestone-item { position: relative; margin-bottom: 40px; }
                .milestone-dot { 
                    position: absolute; left: -41px; top: 0; width: 20px; height: 20px; 
                    background: #3b82f6; border-radius: 50%; border: 4px solid #fff;
                }

                /* LAYOUT: IMPACT (Bab 9) */
                .impact-box { 
                    display: flex; align-items: center; gap: 30px; background: #eff6ff; 
                    padding: 40px; border-radius: 30px; border-right: 10px solid #3b82f6;
                }
                .impact-metric { font-family: 'Outfit', sans-serif; font-size: 64px; font-weight: 950; color: #1d4ed8; line-height: 1; }

                /* LAYOUT: CARDS (Bab 10) */
                .value-cards { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 15px; }
                .value-card { background: #fff; border: 2px solid #0f172a; padding: 20px; border-radius: 15px; box-shadow: 4px 4px 0px #0f172a; }

                /* GENERAL CONTENT */
                .markdown-content { font-size: 11.5pt; line-height: 1.8; color: #334155; }
                .markdown-content h3 { font-size: 16px; font-weight: 900; color: #0f172a; margin-top: 25px; text-transform: uppercase; }
                .markdown-content strong { color: #0f172a; font-weight: 800; }
                .markdown-content ul { list-style-type: square; padding-left: 20px; }
                .markdown-content li { margin-bottom: 10px; }
                `}
            </style>

            {/* PAGE: COVER */}
            <div className="cover-page page-break">
                <div className="cover-accent" />
                <div className="cover-content">
                    <div>
                        <img src="/assets/logo-dnb.png" style={{ width: '80px', filter: 'brightness(0) invert(1)' }} alt="Logo" />
                    </div>
                    <div>
                        <h1 className="cover-title">{proposal.title || "Project Proposal"}</h1>
                        <p className="cover-subtitle">Prepared for {proposal.client_name}</p>
                    </div>
                    <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px', fontWeight: '800', letterSpacing: '2px' }}>
                        DNB STRATEGIC DOCUMENT / {today.toUpperCase()}
                    </div>
                </div>
            </div>

            {/* PAGE: CHAPTERS */}
            {sections.map((section) => (
                <div key={section.id} className="internal-page page-break">
                    <div className="internal-header">
                        <div>{agencyName} / CONCEPT DOCUMENT</div>
                        <div>CHAPTER {String(section.id).padStart(2, '0')}</div>
                    </div>

                    <div style={{ marginBottom: '40px' }}>
                        <h2 style={{ fontSize: '32px', fontWeight: '950', color: '#0f172a', textTransform: 'uppercase', letterSpacing: '-1px' }}>
                            {section.title}
                        </h2>
                        <div style={{ width: '60px', height: '6px', background: '#3b82f6', marginTop: '10px' }} />
                    </div>

                    {/* DYNAMIC LAYOUT ENGINE */}
                    <div className={`layout-engine-wrapper ${section.layout}`}>
                        {section.id === 1 ? (
                            <div className="layout-sidebar">
                                <div className="markdown-content">
                                    <ReactMarkdown>{section.content}</ReactMarkdown>
                                </div>
                                <div className="sidebar-accent">
                                    <h4>Strategic Snapshot</h4>
                                    <p style={{ fontSize: '11px', color: '#64748b', fontStyle: 'italic' }}>
                                        Ringkasan ini memuat esensi solusi yang kami tawarkan untuk mempercepat pertumbuhan bisnis Anda.
                                    </p>
                                </div>
                            </div>
                        ) : section.id === 2 ? (
                            <div className="layout-problem">
                                <div className="problem-quote">
                                    "Efisiensi adalah kunci, namun digitalisasi adalah fondasi masa depan."
                                </div>
                                <div className="markdown-content">
                                    <ReactMarkdown>{section.content}</ReactMarkdown>
                                </div>
                            </div>
                        ) : section.id === 3 ? (
                            <div className="layout-objectives-grid">
                                <div className="objective-card">
                                    <h3>Target Pertumbuhan</h3>
                                    <p style={{ fontSize: '10px', color: '#64748b' }}>Meningkatkan efisiensi operasional melalui integrasi sistem digital modern.</p>
                                </div>
                                <div className="markdown-content" style={{ gridColumn: 'span 2' }}>
                                    <ReactMarkdown>{section.content}</ReactMarkdown>
                                </div>
                            </div>
                        ) : section.id === 4 ? (
                            <div className="layout-grid-container">
                                <div className="markdown-content" style={{ marginBottom: '30px' }}>
                                    <ReactMarkdown>{section.content ? section.content.split('\n\n')[0] : ''}</ReactMarkdown>
                                </div>
                                <div className="layout-grid">
                                    <div className="grid-item">
                                        <h3>Core System</h3>
                                        <p style={{ fontSize: '10px', color: '#64748b' }}>Centralized architecture for maximum stability.</p>
                                    </div>
                                    <div className="grid-item">
                                        <h3>User Experience</h3>
                                        <p style={{ fontSize: '10px', color: '#64748b' }}>Intuitive design focused on conversion.</p>
                                    </div>
                                    <div className="grid-item">
                                        <h3>Integration</h3>
                                        <p style={{ fontSize: '10px', color: '#64748b' }}>Seamless sync with existing workflows.</p>
                                    </div>
                                    <div className="grid-item">
                                        <h3>Analytics</h3>
                                        <p style={{ fontSize: '10px', color: '#64748b' }}>Data-driven insights for strategic growth.</p>
                                    </div>
                                </div>
                            </div>
                        ) : section.id === 5 ? (
                            <div className="layout-deliverables-list">
                                <div className="markdown-content">
                                    <ReactMarkdown>{section.content}</ReactMarkdown>
                                </div>
                            </div>
                        ) : section.id === 6 ? (
                            <div className="layout-flow-container">
                                <div className="markdown-content">
                                    <ReactMarkdown>{section.content}</ReactMarkdown>
                                </div>
                            </div>
                        ) : section.id === 7 ? (
                            <div className="milestone-track">
                                <div className="markdown-content">
                                    <ReactMarkdown>{section.content}</ReactMarkdown>
                                </div>
                            </div>
                        ) : section.id === 8 ? (
                            <div className="layout-pricing-container">
                                <div className="markdown-content">
                                    <ReactMarkdown>{section.content}</ReactMarkdown>
                                </div>
                                <div className="pricing-container">
                                    <div style={{ fontSize: '12px', textTransform: 'uppercase', fontWeight: '900', letterSpacing: '4px', marginBottom: '10px' }}>Total Est. Invesment</div>
                                    <div className="price-tag">PRO GRADE</div>
                                    <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px', marginTop: '10px' }}>Value tailored for high-impact results.</p>
                                </div>
                            </div>
                        ) : section.id === 9 ? (
                            <div className="impact-box">
                                <div className="impact-metric">10x</div>
                                <div className="markdown-content">
                                    <ReactMarkdown>{section.content}</ReactMarkdown>
                                </div>
                            </div>
                        ) : section.id === 10 ? (
                            <div className="layout-cards-container">
                                <div className="markdown-content" style={{ marginBottom: '30px' }}>
                                    <ReactMarkdown>{section.content}</ReactMarkdown>
                                </div>
                                <div className="value-cards">
                                    <div className="value-card">
                                        <h4 style={{ fontSize: '10px', fontWeight: '900' }}>EXPERT SUPPORT</h4>
                                    </div>
                                    <div className="value-card">
                                        <h4 style={{ fontSize: '10px', fontWeight: '900' }}>SCALABLE TECH</h4>
                                    </div>
                                    <div className="value-card">
                                        <h4 style={{ fontSize: '10px', fontWeight: '900' }}>FAST DELIVERY</h4>
                                    </div>
                                </div>
                            </div>
                        ) : section.id === 11 ? (
                            <div className="layout-closing">
                                <div className="markdown-content" style={{ fontSize: '14pt', textAlign: 'center' }}>
                                    <ReactMarkdown>{section.content}</ReactMarkdown>
                                </div>
                                <div className="closing-signature">
                                    <p style={{ fontWeight: '900', fontSize: '12px' }}>{agencyName.toUpperCase()}</p>
                                    <p style={{ fontSize: '10px', color: '#94a3b8' }}>Strategic Partner</p>
                                </div>
                            </div>
                        ) : (
                            <div className="markdown-content">
                                <ReactMarkdown>{section.content}</ReactMarkdown>
                            </div>
                        )}
                    </div>

                    <div className="internal-footer">
                        <div>DNB AGENCY STRATEGIC DOCUMENT / 2026</div>
                        <div>{proposal.client_name} - CONFIDENTIAL</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProposalPrintTemplate;
