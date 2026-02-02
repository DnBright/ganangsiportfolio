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

                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;900&family=Outfit:wght@400;600;700;900&display=swap');

                @media print {
                    @page { 
                        size: A4; 
                        margin: 0 !important; 
                    }
                    * {
                        -webkit-print-color-adjust: exact !important; 
                        print-color-adjust: exact !important;
                    }
                    
                    /* THE ANCESTOR NEUTRALIZER: Strip EVERYTHING away */
                    html, body, #app, [class*="Inertia"], [class*="modal"], 
                    [class*="content"], #premium-proposal-preview,
                    #premium-proposal-preview > div {
                        display: block !important;
                        position: static !important;
                        visibility: visible !important;
                        margin: 0 !important;
                        padding: 0 !important;
                        width: auto !important;
                        height: auto !important;
                        min-height: auto !important;
                        overflow: visible !important;
                        transform: none !important;
                        background: none !important;
                        box-shadow: none !important;
                    }

                    /* NUCLEAR HIDE: Anything that isn't the proposal or a critical ancestor */
                    nav, aside, footer, .no-print, button, .sticky {
                        display: none !important;
                        visibility: hidden !important;
                    }

                    /* THE WRAPPER: The only thing allowed to have A4 width */
                    .proposal-print-wrapper {
                        display: block !important;
                        position: absolute !important;
                        top: 0 !important;
                        left: 0 !important;
                        width: 210mm !important;
                        background: #fff !important;
                        margin: 0 !important;
                        padding: 0 !important;
                        z-index: 9999999 !important;
                    }

                    /* THE PAGES: The physical A4 blocks */
                    .internal-page, .cover-page, .closing-hero {
                        display: block !important;
                        position: relative !important;
                        width: 210mm !important;
                        margin: 0 !important;
                        padding: 0 !important;
                        page-break-after: always !important;
                        break-after: page !important;
                        page-break-inside: avoid !important;
                        break-inside: avoid !important;
                        box-sizing: border-box !important;
                        border: none !important;
                        background-color: white !important;
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                    }

                    .internal-page {
                        min-height: 297mm !important;
                        height: auto !important;
                        overflow: visible !important;
                        padding: 30mm 20mm !important;
                    }

                    .cover-page, .closing-hero {
                        height: 297mm !important;
                        overflow: hidden !important;
                    }
                }

                .proposal-print-wrapper {
                    width: 210mm;
                    margin: 0 auto;
                    color: #1e293b;
                    background: #fff;
                    font-family: 'Inter', sans-serif;
                    display: block;
                    box-sizing: border-box;
                }

                /* SHARED ELEMENTS */
                .internal-page {
                    position: relative;
                    width: 210mm;
                    min-height: 297mm;
                    padding: 30mm 20mm;
                    background: #fff;
                    overflow: visible;
                    display: flex;
                    flex-direction: column;
                    box-sizing: border-box !important;
                    page-break-after: always !important;
                    break-after: page !important;
                }

                .bg-number {
                    position: absolute;
                    top: -15mm;
                    right: -10mm;
                    font-size: 200pt;
                    font-family: 'Outfit', sans-serif;
                    font-weight: 900;
                    color: #f1f5f9;
                    z-index: 0;
                    line-height: 1;
                    user-select: none;
                    opacity: 1;
                }

                .internal-header {
                    position: absolute; top: 12mm; left: 20mm; right: 20mm;
                    display: flex; justify-content: space-between;
                    font-size: 8pt; font-weight: 900; color: #cbd5e1;
                    border-bottom: 2pt solid #f1f5f9; padding-bottom: 5mm;
                    text-transform: uppercase; letter-spacing: 2pt;
                    z-index: 10;
                }

                .internal-footer {
                    position: absolute; bottom: 12mm; left: 20mm; right: 20mm;
                    display: flex; justify-content: space-between;
                    font-size: 8pt; font-weight: 900; color: #e2e8f0;
                    text-transform: uppercase; letter-spacing: 2pt;
                    z-index: 10;
                }

                /* COVER PAGE */
                .cover-page {
                    position: relative; 
                    width: 210mm;
                    height: 297mm; 
                    background: #0f172a; 
                    overflow: hidden;
                    box-sizing: border-box !important;
                    page-break-after: always !important;
                    break-after: page !important;
                    display: flex;
                    flex-direction: column;
                }
                
                .cover-accent {
                    position: absolute; top: 0; right: 0; width: 65%; height: 100%;
                    background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
                    clip-path: polygon(30% 0, 100% 0, 100% 100%, 0% 100%);
                    z-index: 1;
                }
                .cover-grid {
                    position: absolute; inset: 0;
                    background-image: radial-gradient(circle at 1mm 1mm, rgba(255,255,255,0.05) 0.5mm, transparent 0);
                    background-size: 10mm 10mm;
                    z-index: 2;
                }
                .cover-content {
                    position: relative; z-index: 10; padding: 25mm; height: 100%;
                    display: flex; flex-direction: column; justify-content: space-between;
                    box-sizing: border-box;
                }
                .cover-title {
                    font-family: 'Outfit', sans-serif; font-size: 54pt; font-weight: 900;
                    line-height: 0.95; color: #fff; text-transform: uppercase; letter-spacing: -2pt;
                    margin-top: 30mm; max-width: 90%;
                }
                .cover-subtitle {
                    font-size: 22pt; font-weight: 300; color: #3b82f6; margin-top: 10mm;
                    letter-spacing: -0.5pt;
                }

                /* LAYOUT ENGINE WRAPPERS */
                .layout-engine-wrapper { position: relative; z-index: 1; flex: 1; width: 100%; }

                /* LAYOUT: SIDEBAR (Bab 1) */
                .layout-sidebar { display: grid; grid-template-columns: 1.8fr 1fr; gap: 15mm; }
                .sidebar-accent { 
                    background: #f8fafc; padding: 8mm; border-radius: 8mm;
                    border: 1pt solid #e2e8f0; height: fit-content;
                    position: relative; margin-top: 5mm;
                }
                .sidebar-accent::before {
                    content: ''; position: absolute; top: -1px; left: 10mm; width: 10mm; height: 2pt; background: #3b82f6;
                }
                .sidebar-accent h4 { font-size: 8pt; font-weight: 900; color: #0f172a; text-transform: uppercase; margin-bottom: 5mm; letter-spacing: 1pt; }

                /* LAYOUT: PROBLEM (Bab 2) */
                .layout-problem { position: relative; padding-top: 5mm; }
                .problem-bracket {
                    font-family: 'Outfit', sans-serif; font-size: 100pt; color: #eff6ff;
                    position: absolute; top: -10mm; left: -5mm; opacity: 0.8; z-index: -1;
                }
                .problem-quote {
                    font-size: 24pt; font-weight: 900; color: #0f172a; line-height: 1.1;
                    margin-bottom: 15mm; padding-left: 5mm; border-left: 8pt solid #3b82f6;
                    letter-spacing: -1pt;
                }

                /* LAYOUT: OBJECTIVES (Bab 3) */
                .layout-objectives-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8mm; }
                .objective-card { 
                    background: #fff; padding: 8mm; border-radius: 6mm; 
                    border: 1pt solid #f1f5f9; box-shadow: 0 5mm 15mm rgba(0,0,0,0.02);
                }
                .obj-icon { width: 10mm; height: 10mm; background: #eff6ff; border-radius: 3mm; margin-bottom: 5mm; display: flex; align-items: center; justify-content: center; color: #3b82f6; font-weight: 900; font-size: 14pt; }

                /* LAYOUT: GRID (Bab 4) */
                .layout-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6mm; margin-top: 10mm; }
                .grid-item { 
                    padding: 8mm; border-radius: 6mm; 
                    background: #fff; border: 1pt solid #f1f5f9;
                }
                .grid-item h3 { font-size: 11pt; font-weight: 900; color: #3b82f6; margin-bottom: 3mm; text-transform: uppercase; }

                /* LAYOUT: LIST (Bab 5) */
                .layout-deliverables-list { background: #0f172a; border-radius: 10mm; padding: 15mm; color: #fff; flex: 1; }
                .deliverable-item { 
                    display: flex; align-items: flex-start; gap: 5mm; margin-bottom: 5mm; 
                    border-bottom: 1pt solid rgba(255,255,255,0.05); padding-bottom: 5mm; 
                }
                .deliverable-dot { width: 2mm; height: 2mm; background: #3b82f6; border-radius: 0.5mm; margin-top: 2mm; flex-shrink: 0; transform: rotate(45deg); }

                /* LAYOUT: FLOW (Bab 6) */
                .flow-container { display: flex; flex-direction: column; gap: 4mm; margin-top: 8mm; }
                .flow-step { 
                    display: flex; align-items: center; gap: 8mm; padding: 6mm; 
                    background: #f8fafc; border-radius: 5mm; border: 1pt solid #e2e8f0;
                }
                .flow-number { 
                    font-family: 'Outfit', sans-serif; font-size: 18pt; font-weight: 900; color: #3b82f6; opacity: 0.3;
                }

                /* LAYOUT: MILESTONE (Bab 7) */
                .milestone-visual { 
                    display: flex; justify-content: space-between; margin-top: 15mm; position: relative;
                    padding-bottom: 10mm;
                }
                .milestone-visual::after {
                    content: ''; position: absolute; top: 4mm; left: 0; right: 0; height: 1pt;
                    background: #e2e8f0; z-index: 0;
                }
                .ms-node { position: relative; z-index: 1; text-align: center; width: 25%; }
                .ms-dot { width: 8mm; height: 8mm; background: #3b82f6; border-radius: 50%; border: 2pt solid #fff; margin: 0 auto 4mm; box-shadow: 0 0 0 1pt #3b82f6; }

                /* LAYOUT: PRICING (Bab 8) */
                .pricing-hero {
                    background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); 
                    color: #fff; padding: 15mm; border-radius: 10mm; text-align: center;
                    margin-top: 15mm; position: relative; overflow: hidden;
                }
                .pricing-hero::before {
                    content: 'ESTIMATE'; position: absolute; top: 2mm; left: 50%; transform: translateX(-50%);
                    font-size: 80pt; font-weight: 900; opacity: 0.03; font-family: 'Outfit';
                }
                .price-value { font-family: 'Outfit', sans-serif; font-size: 48pt; font-weight: 900; color: #3b82f6; line-height: 1; margin: 5mm 0; }

                /* LAYOUT: IMPACT (Bab 9) */
                .impact-grid { display: grid; grid-template-columns: 1fr 1.5fr; gap: 10mm; align-items: center; }
                .impact-visual {
                    height: 50mm; background: #f8fafc; border-radius: 8mm; display: flex; align-items: center; justify-content: center;
                    flex-direction: column; position: relative; border: 1pt dashed #cbd5e1;
                }
                .impact-big-text { font-family: 'Outfit', sans-serif; font-size: 60pt; font-weight: 900; color: #3b82f6; line-height: 1; }

                /* LAYOUT: CARDS (Bab 10) */
                .asymmetric-cards { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 5mm; margin-top: 10mm; }
                .value-card-premium {
                    padding: 8mm; background: #fff; border-radius: 6mm; border-top: 4pt solid #0f172a;
                    box-shadow: 0 4mm 10mm rgba(0,0,0,0.05);
                }
                .value-card-premium:nth-child(even) { transform: translateY(5mm); border-top-color: #3b82f6; }

                /* LAYOUT: CLOSING (Bab 11) */
                .closing-hero {
                    width: 210mm;
                    height: 297mm;
                    display: flex; flex-direction: column; align-items: center; justify-content: center;
                    text-align: center; background: #0f172a; color: #fff; 
                    padding: 25mm;
                    box-sizing: border-box !important;
                }
                .closing-ty { font-family: 'Outfit', sans-serif; font-size: 72pt; font-weight: 900; letter-spacing: -3pt; line-height: 0.8; margin-bottom: 10mm; }

                /* MARKDOWN CONTENT REFINEMENT */
                .markdown-content { font-size: 11pt; line-height: 1.6; color: #334155; }
                .markdown-content h3 { font-size: 14pt; font-weight: 900; color: #0f172a; margin-top: 8mm; text-transform: uppercase; letter-spacing: 1pt; }
                .markdown-content strong { color: #0f172a; font-weight: 700; }
                .markdown-content ul { list-style-type: none; padding-left: 0; }
                .markdown-content li { position: relative; padding-left: 6mm; margin-bottom: 3mm; }
                .markdown-content li::before { content: '→'; position: absolute; left: 0; color: #3b82f6; font-weight: 900; }
                `}
            </style>

            {/* PAGE: COVER (Page 1) */}
            <div className="cover-page">
                <div className="cover-grid" />
                <div className="cover-accent" />
                <div className="cover-content">
                    <div>
                        <img src="/assets/logo-dnb.png" style={{ width: '35mm', filter: 'brightness(0) invert(1)', marginBottom: '15mm' }} alt="Logo" />
                    </div>
                    <div>
                        <div style={{ width: '25mm', height: '1.5mm', background: '#3b82f6', marginBottom: '15mm' }} />
                        <h1 className="cover-title">{proposal.title || "Project Proposal"}</h1>
                        <p className="cover-subtitle">Prepared for {proposal.client_name}</p>
                    </div>
                    <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '8pt', fontWeight: '900', letterSpacing: '4pt' }}>
                        DNB STRATEGIC DOCUMENT / {today.toUpperCase()}
                    </div>
                </div>
            </div>

            {/* PAGES: CHAPTERS 1-11 (Page 2-12) */}
            {sections.map((section) => (
                <div key={section.id} className="internal-page">
                    <div className="bg-number">{String(section.id).padStart(2, '0')}</div>

                    <div className="internal-header">
                        <div>{agencyName} / STRATEGIC PROPOSAL</div>
                        <div>SECTION {String(section.id).padStart(2, '0')}</div>
                    </div>

                    <div style={{ marginBottom: '15mm', position: 'relative', zIndex: 10 }}>
                        <h2 style={{ fontSize: '32pt', fontFamily: 'Outfit', fontWeight: '900', color: '#0f172a', textTransform: 'uppercase', letterSpacing: '-1.5pt', lineHeight: 1 }}>
                            {section.title.split('. ')[1]}
                        </h2>
                        <div style={{ width: '25mm', height: '2mm', background: '#3b82f6', marginTop: '5mm' }} />
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

            {/* PAGE 13: STANDALONE CLOSING HERO */}
            <div className="closing-hero">
                <div className="closing-ty">THANK YOU.</div>
                <div className="markdown-content" style={{ color: 'rgba(255,255,255,0.7)', textAlign: 'center', fontSize: '16pt', maxWidth: '80%' }}>
                    Kami percaya kerjasama ini akan membawa dampak transformasi digital yang signifikan bagi bisnis anda.
                </div>
                <div style={{ marginTop: '80px', paddingTop: '40px', borderTop: '1px solid rgba(255,255,255,0.1)', width: '300px' }}>
                    <p style={{ fontWeight: 900, fontSize: '14px', letterSpacing: '2px' }}>{agencyName.toUpperCase()}</p>
                    <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', marginTop: 5 }}>Your Strategic Digital Partner</p>
                </div>
            </div>
            <div className="no-print" style={{ height: '30mm', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '8pt', color: '#cbd5e1', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '4pt', borderTop: '1pt solid #e2e8f0' }}>
                End of Strategic Document / Powered by DNB Agency
            </div>
        </div>
    );
};

export default ProposalPrintTemplate;
