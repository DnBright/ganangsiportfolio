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
        { id: 1, title: '1. Ringkasan Eksekutif', content: String(proposal.executive_summary || ''), layout: 'sidebar' },
        { id: 2, title: '2. Latar Belakang & Masalah', content: String(proposal.problem_analysis || ''), layout: 'problem' },
        { id: 3, title: '3. Tujuan Proyek', content: String(proposal.project_objectives || ''), layout: 'objectives' },
        { id: 4, title: '4. Solusi Utama', content: String(proposal.solutions || ''), layout: 'grid' },
        { id: 5, title: '5. Ruang Lingkup (Deliverables)', content: String(proposal.scope_of_work || ''), layout: 'list' },
        { id: 6, title: '6. Alur Sistem & Cara Kerja', content: String(proposal.system_walkthrough || ''), layout: 'flow' },
        { id: 7, title: '7. Timeline Implementasi', content: String(proposal.timeline || ''), layout: 'milestone' },
        { id: 8, title: '8. Estimasi Investasi Proyek', content: String(proposal.investment || ''), layout: 'pricing' },
        { id: 9, title: '9. Estimasi Dampak & ROI', content: String(proposal.roi_impact || ''), layout: 'impact' },
        { id: 10, title: '10. Nilai Tambah Agensi', content: String(proposal.value_add || ''), layout: 'cards' },
        { id: 11, title: '11. Penutup & Kerja Sama', content: String(proposal.closing_cta || ''), layout: 'closing' },
    ];

    return (
        <div className="proposal-print-wrapper bg-white text-[#0f172a] font-sans flex flex-col h-fit">
            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;900&family=Outfit:wght@400;600;700;900&display=swap');

                @media print {
                    @page { size: A4; margin: 0; }
                    body { 
                        -webkit-print-color-adjust: exact !important; 
                        print-color-adjust: exact !important;
                        margin: 0; 
                        background: #fff; 
                    }
                    .page-break { page-break-before: always; }
                }

                .proposal-print-wrapper {
                    width: 210mm;
                    margin: 0 auto;
                    color: #1e293b;
                    background: #fff;
                    font-family: 'Inter', sans-serif;
                    display: block;
                    -webkit-print-color-adjust: exact !important;
                    print-color-adjust: exact !important;
                }

                /* SHARED ELEMENTS */
                .internal-page {
                    position: relative;
                    min-height: 297mm;
                    padding: 35mm 25mm;
                    background: #fff;
                    overflow: hidden;
                    display: block;
                    width: 100%;
                }

                .bg-number {
                    position: absolute;
                    top: -20px;
                    right: -20px;
                    font-size: 280px;
                    font-family: 'Outfit', sans-serif;
                    font-weight: 900;
                    color: #f1f5f9;
                    z-index: 0;
                    line-height: 1;
                    user-select: none;
                }

                .internal-header {
                    position: absolute; top: 15mm; left: 25mm; right: 25mm;
                    display: flex; justify-content: space-between;
                    font-size: 9px; font-weight: 900; color: #cbd5e1;
                    border-bottom: 1px solid #f1f5f9; padding-bottom: 10px;
                    text-transform: uppercase; letter-spacing: 3px;
                    z-index: 10;
                }

                .internal-footer {
                    position: absolute; bottom: 15mm; left: 25mm; right: 25mm;
                    display: flex; justify-content: space-between;
                    font-size: 9px; font-weight: 900; color: #e2e8f0;
                    text-transform: uppercase; letter-spacing: 2px;
                    z-index: 10;
                }

                /* COVER PAGE */
                .cover-page {
                    position: relative; height: 297mm; background: #0f172a; overflow: hidden;
                }
                .cover-accent {
                    position: absolute; top: 0; right: 0; width: 65%; height: 100%;
                    background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
                    clip-path: polygon(30% 0, 100% 0, 100% 100%, 0% 100%);
                }
                .cover-grid {
                    position: absolute; inset: 0;
                    background-image: radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0);
                    background-size: 40px 40px;
                }
                .cover-content {
                    position: relative; z-index: 10; padding: 80px; height: 100%;
                    display: flex; flex-direction: column; justify-content: space-between;
                }
                .cover-title {
                    font-family: 'Outfit', sans-serif; font-size: 72px; font-weight: 900;
                    line-height: 0.9; color: #fff; text-transform: uppercase; letter-spacing: -3px;
                    margin-top: 120px; max-width: 90%;
                }
                .cover-subtitle {
                    font-size: 28px; font-weight: 300; color: #3b82f6; margin-top: 30px;
                    letter-spacing: -0.5px;
                }

                /* LAYOUT ENGINE WRAPPERS */
                .layout-engine-wrapper { position: relative; z-index: 1; height: 100%; }

                /* LAYOUT: SIDEBAR (Bab 1) */
                .layout-sidebar { display: grid; grid-template-columns: 1.8fr 1fr; gap: 50px; }
                .sidebar-accent { 
                    background: #f8fafc; padding: 35px; border-radius: 30px;
                    border: 1px solid #e2e8f0; height: fit-content;
                    position: relative; margin-top: 20px;
                }
                .sidebar-accent::before {
                    content: ''; position: absolute; top: -1px; left: 40px; width: 40px; height: 4px; background: #3b82f6;
                }
                .sidebar-accent h4 { font-size: 11px; font-weight: 900; color: #0f172a; text-transform: uppercase; margin-bottom: 20px; letter-spacing: 1px; }

                /* LAYOUT: PROBLEM (Bab 2) */
                .layout-problem { position: relative; padding-top: 20px; }
                .problem-bracket {
                    font-family: 'Outfit', sans-serif; font-size: 120px; color: #eff6ff;
                    position: absolute; top: -40px; left: -20px; opacity: 0.8; z-index: -1;
                }
                .problem-quote {
                    font-size: 32px; font-weight: 900; color: #0f172a; line-height: 1.1;
                    margin-bottom: 50px; padding-left: 20px; border-left: 12px solid #3b82f6;
                    letter-spacing: -1px;
                }

                /* LAYOUT: OBJECTIVES (Bab 3) */
                .layout-objectives-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; }
                .objective-card { 
                    background: #fff; padding: 30px; border-radius: 25px; 
                    border: 1px solid #f1f5f9; box-shadow: 0 10px 30px rgba(0,0,0,0.02);
                }
                .obj-icon { width: 40px; height: 40px; background: #eff6ff; border-radius: 12px; margin-bottom: 20px; display: flex; alignItems: center; justifyContent: center; color: #3b82f6; font-weight: 900; }

                /* LAYOUT: GRID (Bab 4) */
                .layout-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 25px; margin-top: 40px; }
                .grid-item { 
                    padding: 30px; border-radius: 25px; transition: all 0.3s;
                    background: #fff; border: 1px solid #f1f5f9;
                }
                .grid-item h3 { font-size: 15px; font-weight: 900; color: #0f172a; margin-bottom: 12px; text-transform: uppercase; color: #3b82f6; }

                /* LAYOUT: LIST (Bab 5) */
                .layout-deliverables-list { background: #0f172a; border-radius: 40px; padding: 50px; color: #fff; }
                .deliverable-item { 
                    display: flex; align-items: flex-start; gap: 20px; margin-bottom: 20px; 
                    border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 20px; 
                }
                .deliverable-dot { width: 8px; height: 8px; background: #3b82f6; border-radius: 2px; margin-top: 10px; flex-shrink: 0; transform: rotate(45deg); }

                /* LAYOUT: FLOW (Bab 6) */
                .flow-container { display: flex; flex-direction: column; gap: 15px; margin-top: 30px; }
                .flow-step { 
                    display: flex; align-items: center; gap: 30px; padding: 25px; 
                    background: #f8fafc; border-radius: 20px; border: 1px solid #e2e8f0;
                    position: relative;
                }
                .flow-number { 
                    font-family: 'Outfit', sans-serif; font-size: 24px; font-weight: 900; color: #3b82f6; opacity: 0.3;
                }

                /* LAYOUT: MILESTONE (Bab 7) */
                .milestone-visual { 
                    display: flex; justify-content: space-between; margin-top: 50px; position: relative;
                    padding-bottom: 30px;
                }
                .milestone-visual::after {
                    content: ''; position: absolute; top: 15px; left: 0; right: 0; height: 2px;
                    background: #e2e8f0; z-index: 0;
                }
                .ms-node { position: relative; z-index: 1; text-align: center; width: 20%; }
                .ms-dot { width: 30px; height: 30px; background: #3b82f6; border-radius: 50%; border: 6px solid #fff; margin: 0 auto 15px; box-shadow: 0 0 0 2px #3b82f6; }

                /* LAYOUT: PRICING (Bab 8) */
                .pricing-hero {
                    background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); 
                    color: #fff; padding: 60px; border-radius: 40px; text-align: center;
                    margin-top: 60px; position: relative; overflow: hidden;
                }
                .pricing-hero::before {
                    content: 'ESTIMATE'; position: absolute; top: 10px; left: 50%; transform: translateX(-50%);
                    font-size: 120px; font-weight: 900; opacity: 0.03; font-family: 'Outfit';
                }
                .price-value { font-family: 'Outfit', sans-serif; font-size: 64px; font-weight: 900; color: #3b82f6; line-height: 1; margin: 20px 0; }

                /* LAYOUT: IMPACT (Bab 9) */
                .impact-grid { display: grid; grid-template-columns: 1fr 1.5fr; gap: 40px; align-items: center; }
                .impact-visual {
                    height: 200px; background: #f8fafc; border-radius: 30px; display: flex; align-items: center; justify-content: center;
                    flex-direction: column; position: relative; border: 1px dashed #cbd5e1;
                }
                .impact-big-text { font-family: 'Outfit', sans-serif; font-size: 80px; font-weight: 900; color: #3b82f6; line-height: 1; }

                /* LAYOUT: CARDS (Bab 10) */
                .asymmetric-cards { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; margin-top: 40px; }
                .value-card-premium {
                    padding: 30px; background: #fff; border-radius: 25px; border-top: 6px solid #0f172a;
                    box-shadow: 0 15px 40px rgba(0,0,0,0.05);
                }
                .value-card-premium:nth-child(even) { transform: translateY(20px); border-top-color: #3b82f6; }

                /* LAYOUT: CLOSING (Bab 11) */
                .closing-hero {
                    height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center;
                    text-align: center; background: #0f172a; color: #fff; margin: -35mm -25mm; padding: 35mm 25mm;
                }
                .closing-ty { font-family: 'Outfit', sans-serif; font-size: 100px; font-weight: 900; letter-spacing: -5px; line-height: 0.8; margin-bottom: 40px; }

                /* MARKDOWN CONTENT REFINEMENT */
                .markdown-content { font-size: 12pt; line-height: 1.8; color: #334155; }
                .markdown-content h3 { font-size: 18px; font-weight: 900; color: #0f172a; margin-top: 30px; text-transform: uppercase; letter-spacing: 1px; }
                .markdown-content strong { color: #0f172a; font-weight: 800; }
                .markdown-content ul { list-style-type: none; padding-left: 0; }
                .markdown-content li { position: relative; padding-left: 25px; margin-bottom: 12px; }
                .markdown-content li::before { content: '→'; position: absolute; left: 0; color: #3b82f6; font-weight: 900; }
                `}
            </style>

            {/* PAGE: COVER */}
            <div className="cover-page page-break">
                <div className="cover-grid" />
                <div className="cover-accent" />
                <div className="cover-content">
                    <div>
                        <img src="/assets/logo-dnb.png" style={{ width: '100px', filter: 'brightness(0) invert(1)', marginBottom: '40px' }} alt="Logo" />
                    </div>
                    <div>
                        <div style={{ width: '80px', height: '4px', background: '#3b82f6', marginBottom: '40px' }} />
                        <h1 className="cover-title">{proposal.title || "Project Proposal"}</h1>
                        <p className="cover-subtitle">Prepared for {proposal.client_name}</p>
                    </div>
                    <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px', fontWeight: '900', letterSpacing: '4px' }}>
                        DNB STRATEGIC DOCUMENT / {today.toUpperCase()}
                    </div>
                </div>
            </div>

            {/* PAGE: CHAPTERS */}
            {sections.map((section) => (
                <div key={section.id} className="internal-page page-break">
                    <div className="bg-number">{String(section.id).padStart(2, '0')}</div>

                    <div className="internal-header">
                        <div>{agencyName} / STRATEGIC PROPOSAL</div>
                        <div>SECTION {String(section.id).padStart(2, '0')}</div>
                    </div>

                    <div style={{ marginBottom: '60px', position: 'relative', zIndex: 10 }}>
                        <h2 style={{ fontSize: '42px', fontFamily: 'Outfit', fontWeight: '900', color: '#0f172a', textTransform: 'uppercase', letterSpacing: '-2px', lineHeight: 1 }}>
                            {section.title.split('. ')[1]}
                        </h2>
                        <div style={{ width: '80px', height: '8px', background: '#3b82f6', marginTop: '20px' }} />
                    </div>

                    {/* DYNAMIC LAYOUT ENGINE */}
                    <div className="layout-engine-wrapper">
                        {section.id === 1 ? (
                            <div className="layout-sidebar">
                                <div className="markdown-content">
                                    <ReactMarkdown>{section.content}</ReactMarkdown>
                                </div>
                                <div className="sidebar-accent">
                                    <h4>Agency Insight</h4>
                                    <p style={{ fontSize: '12px', color: '#64748b', fontStyle: 'italic', lineHeight: 1.6 }}>
                                        "Kami merancang solusi ini untuk memaksimalkan ROI anda melalui pendekatan teknologi yang terukur dan desain yang berorientasi pada hasil."
                                    </p>
                                </div>
                            </div>
                        ) : section.id === 2 ? (
                            <div className="layout-problem">
                                <span className="problem-bracket">"</span>
                                <div className="problem-quote">
                                    Menganalisis tantangan anda dengan presisi untuk menciptakan keunggulan kompetitif.
                                </div>
                                <div className="markdown-content">
                                    <ReactMarkdown>{section.content}</ReactMarkdown>
                                </div>
                            </div>
                        ) : section.id === 3 ? (
                            <div className="layout-objectives-active">
                                <div className="markdown-content" style={{ marginBottom: '40px' }}>
                                    <ReactMarkdown>{section.content.split('\n\n')[0]}</ReactMarkdown>
                                </div>
                                <div className="layout-objectives-grid">
                                    <div className="objective-card">
                                        <div className="obj-icon">01</div>
                                        <h3 style={{ fontWeight: 900, marginBottom: 10 }}>Optimalisasi</h3>
                                        <p style={{ fontSize: '11px', color: '#64748b' }}>Meningkatkan efisiensi sistem secara menyeluruh.</p>
                                    </div>
                                    <div className="objective-card">
                                        <div className="obj-icon">02</div>
                                        <h3 style={{ fontWeight: 900, marginBottom: 10 }}>Skalabilitas</h3>
                                        <p style={{ fontSize: '11px', color: '#64748b' }}>Mempersiapkan infrastruktur untuk pertumbuhan masa depan.</p>
                                    </div>
                                </div>
                                <div className="markdown-content" style={{ marginTop: '30px' }}>
                                    <ReactMarkdown>{section.content.split('\n\n').slice(1).join('\n\n')}</ReactMarkdown>
                                </div>
                            </div>
                        ) : section.id === 4 ? (
                            <div className="layout-grid-premium">
                                <div className="markdown-content" style={{ marginBottom: '40px' }}>
                                    <ReactMarkdown>{section.content ? section.content.split('\n\n')[0] : ''}</ReactMarkdown>
                                </div>
                                <div className="layout-grid">
                                    <div className="grid-item">
                                        <h3>Strategy</h3>
                                        <p style={{ fontSize: '11px', color: '#64748b', lineHeight: 1.6 }}>Pendekatan analitis berbasis data.</p>
                                    </div>
                                    <div className="grid-item">
                                        <h3>Execution</h3>
                                        <p style={{ fontSize: '11px', color: '#64748b', lineHeight: 1.6 }}>Implementasi teknis standar industri.</p>
                                    </div>
                                    <div className="grid-item">
                                        <h3>Innovation</h3>
                                        <p style={{ fontSize: '11px', color: '#64748b', lineHeight: 1.6 }}>Solusi kreatif yang tidak konvensional.</p>
                                    </div>
                                    <div className="grid-item">
                                        <h3>Scale</h3>
                                        <p style={{ fontSize: '11px', color: '#64748b', lineHeight: 1.6 }}>Dukungan penuh untuk ekspansi bisnis.</p>
                                    </div>
                                </div>
                            </div>
                        ) : section.id === 5 ? (
                            <div className="layout-deliverables-list">
                                <div className="markdown-content" style={{ color: 'rgba(255,255,255,0.8)' }}>
                                    <ReactMarkdown>{section.content}</ReactMarkdown>
                                </div>
                            </div>
                        ) : section.id === 6 ? (
                            <div className="flow-container">
                                <div className="markdown-content" style={{ marginBottom: '30px' }}>
                                    <ReactMarkdown>{section.content}</ReactMarkdown>
                                </div>
                                <div className="flow-step">
                                    <div className="flow-number">STEP 01</div>
                                    <p style={{ fontWeight: 700, fontSize: '14px' }}>ANALYSIS & RESEARCH</p>
                                </div>
                                <div className="flow-step">
                                    <div className="flow-number">STEP 02</div>
                                    <p style={{ fontWeight: 700, fontSize: '14px' }}>DESIGN & STRATEGY</p>
                                </div>
                                <div className="flow-step">
                                    <div className="flow-number">STEP 03</div>
                                    <p style={{ fontWeight: 700, fontSize: '14px' }}>DEVELOPMENT & DEPLOY</p>
                                </div>
                            </div>
                        ) : section.id === 7 ? (
                            <div className="layout-milestone-premium">
                                <div className="markdown-content">
                                    <ReactMarkdown>{section.content}</ReactMarkdown>
                                </div>
                                <div className="milestone-visual">
                                    <div className="ms-node">
                                        <div className="ms-dot" />
                                        <span style={{ fontSize: '10px', fontWeight: 900 }}>WEEK 01</span>
                                    </div>
                                    <div className="ms-node">
                                        <div className="ms-dot" />
                                        <span style={{ fontSize: '10px', fontWeight: 900 }}>WEEK 03</span>
                                    </div>
                                    <div className="ms-node">
                                        <div className="ms-dot" />
                                        <span style={{ fontSize: '10px', fontWeight: 900 }}>WEEK 06</span>
                                    </div>
                                    <div className="ms-node">
                                        <div className="ms-dot" />
                                        <span style={{ fontSize: '10px', fontWeight: 900 }}>LAUNCH</span>
                                    </div>
                                </div>
                            </div>
                        ) : section.id === 8 ? (
                            <div className="layout-pricing-premium">
                                <div className="markdown-content">
                                    <ReactMarkdown>{section.content}</ReactMarkdown>
                                </div>
                                <div className="pricing-hero">
                                    <div style={{ color: '#3b82f6', fontWeight: 900, fontSize: '14px', letterSpacing: '5px' }}>OFFICIAL QUOTATION</div>
                                    <div className="price-value">STRATEGIC PARTNER</div>
                                    <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px' }}>Investasi masa depan untuk keunggulan bisnis anda.</p>
                                </div>
                            </div>
                        ) : section.id === 9 ? (
                            <div className="impact-grid">
                                <div className="impact-visual">
                                    <div className="impact-big-text">100%</div>
                                    <p style={{ fontSize: '10px', fontWeight: 900, color: '#64748b' }}>PROJECTED SUCCESS</p>
                                </div>
                                <div className="markdown-content">
                                    <ReactMarkdown>{section.content}</ReactMarkdown>
                                </div>
                            </div>
                        ) : section.id === 10 ? (
                            <div className="layout-cards-asymmetric">
                                <div className="markdown-content">
                                    <ReactMarkdown>{section.content}</ReactMarkdown>
                                </div>
                                <div className="asymmetric-cards">
                                    <div className="value-card-premium">
                                        <h4 style={{ fontWeight: 900, fontSize: '12px', marginBottom: 10 }}>DEDICATED TEAM</h4>
                                        <p style={{ fontSize: '10px', color: '#64748b' }}>Akses penuh ke tim ahli kami.</p>
                                    </div>
                                    <div className="value-card-premium">
                                        <h4 style={{ fontWeight: 900, fontSize: '12px', marginBottom: 10 }}>ON-TIME DELIVERY</h4>
                                        <p style={{ fontSize: '10px', color: '#64748b' }}>Komitmen ketepatan waktu proyek.</p>
                                    </div>
                                    <div className="value-card-premium">
                                        <h4 style={{ fontWeight: 900, fontSize: '12px', marginBottom: 10 }}>24/7 SUPPORT</h4>
                                        <p style={{ fontSize: '10px', color: '#64748b' }}>Siap membantu kapan saja dibutuhkan.</p>
                                    </div>
                                </div>
                            </div>
                        ) : section.id === 11 ? (
                            <div className="closing-hero">
                                <div className="closing-ty">THANK YOU.</div>
                                <div className="markdown-content" style={{ color: 'rgba(255,255,255,0.7)', textAlign: 'center', fontSize: '16pt', maxWidth: '80%' }}>
                                    <ReactMarkdown>{section.content}</ReactMarkdown>
                                </div>
                                <div style={{ marginTop: '80px', paddingTop: '40px', borderTop: '1px solid rgba(255,255,255,0.1)', width: '300px' }}>
                                    <p style={{ fontWeight: 900, fontSize: '14px', letterSpacing: '2px' }}>{agencyName.toUpperCase()}</p>
                                    <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', marginTop: 5 }}>Your Strategic Digital Partner</p>
                                </div>
                            </div>
                        ) : (
                            <div className="markdown-content">
                                <ReactMarkdown>{section.content}</ReactMarkdown>
                            </div>
                        )}
                    </div>

                    <div className="internal-footer">
                        <div>DNB AGENCY / STRATEGIC PROPOSAL 2026</div>
                        <div>CONFIDENTIAL DOCUMENT</div>
                    </div>
                </div>
            ))}

            <div style={{ height: '100px', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: '#cbd5e1', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '4px', borderTop: '1px solid #e2e8f0' }}>
                End of Strategic Document / Powered by DNB Agency
            </div>
        </div>
    );
};

export default ProposalPrintTemplate;
