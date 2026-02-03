<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $proposal->title ?? 'Proposal' }} - Print View</title>
    <!-- Tailwind via CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Google Fonts: Exact match from React Template -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;900&family=Outfit:wght@400;600;700;900&display=swap" rel="stylesheet">
    
    <style>
        /* --- PRINT CONFIGURATION (THE MAGIC) --- */
        @page {
            size: A4 portrait;
            margin: 0;
        }
        @media print {
            body { 
                -webkit-print-color-adjust: exact !important; 
                print-color-adjust: exact !important; 
            }
            .no-print { display: none !important; }
            .page-break { page-break-after: always; }
            .page-container {
                height: 297mm !important;
                width: 210mm !important;
                overflow: hidden !important;
                margin: 0 !important;
                box-shadow: none !important;
                border: none !important; /* Ensure no borders */
            }
        }
        
        /* --- BASE STYLES --- */
        body {
            font-family: 'Inter', sans-serif;
            background-color: #334155; /* Dark background for screen viewing */
            margin: 0;
            padding: 20px;
        }
        
        .page-container {
            width: 210mm;
            min-height: 297mm; 
            background: white;
            margin: 0 auto 30px auto;
            position: relative;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5); /* Screen Shadow */
            overflow: hidden;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
        }

        /* --- PORTED CSS FROM REACT TEMPLATE --- */
        .bg-number {
            position: absolute;
            top: 10mm;
            right: 10mm;
            font-size: 150pt;
            font-family: 'Outfit', sans-serif;
            font-weight: 900;
            color: #f1f5f9;
            z-index: 0;
            line-height: 1;
            user-select: none;
            opacity: 0.8;
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
            margin-top: auto; /* Push to bottom */
            padding: 0 20mm 12mm 20mm;
            display: flex; justify-content: space-between;
            font-size: 8pt; font-weight: 900; color: #e2e8f0;
            text-transform: uppercase; letter-spacing: 2pt;
            z-index: 10;
        }

        /* LAYOUT ELEMENTS */
        .layout-content-wrapper {
            padding: 40mm 20mm 10mm 20mm; /* Match React padding */
            flex: 1;
            position: relative;
            z-index: 1;
        }

        .layout-title {
            font-size: 32pt; font-family: 'Outfit'; font-weight: 900; 
            color: #0f172a; text-transform: uppercase; letter-spacing: -1.5pt; 
            line-height: 1; margin-bottom: 5mm;
        }

        .blue-bar { width: 25mm; height: 2mm; background: #3b82f6; margin-bottom: 10mm; }

        /* MARKDOWN STYLES */
        .prose { white-space: pre-wrap; } /* Preserve line breaks */
        .prose p { font-size: 11pt; line-height: 1.8; color: #334155; margin-bottom: 1.2em; }
        .prose h3 { font-size: 14pt; font-weight: 900; color: #0f172a; margin-top: 8mm; margin-bottom: 4mm; text-transform: uppercase; letter-spacing: 1pt; }
        .prose ul { list-style-type: square; padding-left: 6mm; margin: 0; }
        .prose li { 
            position: relative; 
            margin-bottom: 4mm; 
            font-size: 11pt; 
            color: #334155; 
            line-height: 1.6;
            display: list-item; 
        }
        /* Removed .prose li::before to eliminate arrows */
        .prose strong { font-weight: 700; color: #0f172a; } /* Ensure bold renders properly */
        .prose em { font-style: italic; }
        
        /* SPECIFIC LAYOUTS */
        
        /* Sidebar (Sec 1) */
        .layout-sidebar { display: grid; grid-template-columns: 1.8fr 1fr; gap: 15mm; }
        .sidebar-accent { 
            background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%); 
            padding: 10mm; 
            border-radius: 10mm;
            border: 1pt solid #e2e8f0; 
            height: fit-content;
            position: relative; 
            margin-top: 5mm;
            box-shadow: 0 2mm 8mm rgba(0,0,0,0.03);
        }
        .sidebar-accent::before {
            content: ''; 
            position: absolute; 
            top: -1px; 
            left: 12mm; 
            width: 15mm; 
            height: 3pt; 
            background: #3b82f6;
            border-radius: 2pt;
        }
        .sidebar-accent h4 {
            font-size: 9pt; 
            font-weight: 900; 
            color: #0f172a; 
            text-transform: uppercase; 
            margin-bottom: 8mm; 
            letter-spacing: 2pt;
        }
        .sidebar-accent p {
            font-size: 12pt; 
            color: #475569; 
            font-style: italic; 
            line-height: 1.7;
            font-weight: 500;
        }

        /* Problem (Sec 2) */
        .problem-bracket {
            font-family: 'Outfit', sans-serif; font-size: 100pt; color: #eff6ff;
            position: absolute; top: -10mm; left: -5mm; opacity: 0.8; z-index: -1;
        }
        .problem-quote {
            font-size: 28pt; font-weight: 900; color: #0f172a; line-height: 1.05;
            margin: 0 0 12mm 0 !important; 
            padding-left: 8mm !important; border-left: 6pt solid #3b82f6 !important;
            letter-spacing: -2pt; text-align: left !important;
            max-width: 90%;
            white-space: normal !important; /* Prevent code indentation from affecting text */
        }

        /* Objectives (Sec 3) */
        .layout-objectives-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8mm; margin: 10mm 0; }
        .objective-card { 
            background: #fff; padding: 8mm; border-radius: 6mm; 
            border: 1pt solid #f1f5f9; box-shadow: 0 5mm 15mm rgba(0,0,0,0.02);
        }
        .obj-icon { width: 10mm; height: 10mm; background: #eff6ff; border-radius: 3mm; margin-bottom: 5mm; display: flex; align-items: center; justify-content: center; color: #3b82f6; font-weight: 900; font-size: 14pt; }

        /* Grid (Sec 4) - PREMIUM SOLUTION CARDS */
        .layout-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8mm; margin-top: 10mm; }
        .grid-item { 
            padding: 8mm; border-radius: 8mm; 
            background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%); 
            border: 1pt solid #e2e8f0;
            text-align: left !important;
            box-shadow: 0 4mm 15mm rgba(0,0,0,0.03);
            position: relative;
            overflow: hidden;
        }
        .grid-item::after {
            content: ''; position: absolute; top: 0; right: 0; width: 12mm; height: 12mm;
            background: #eff6ff; border-radius: 0 0 0 8mm; z-index: 0;
        }
        .grid-item h3 { position: relative; z-index: 1; }
        .grid-item p { position: relative; z-index: 1; margin-top: 3mm !important; }
        .grid-item h3, .grid-item p, .grid-item li { text-align: left !important; }
        
        /* List (Sec 5) - FIXED SELECTORS */
        .layout-deliverables-list { background: #0f172a !important; border-radius: 10mm; padding: 15mm; color: #ffffff !important; }
        .layout-deliverables-list p, 
        .layout-deliverables-list li,
        .layout-deliverables-list strong,
        .layout-deliverables-list span,
        .layout-deliverables-list * { 
            color: #ffffff !important; 
            opacity: 1 !important;
            -webkit-print-color-adjust: exact !important;
        }

        /* Flow (Sec 6) */
        .flow-step { 
            display: flex; align-items: center; gap: 8mm; padding: 6mm; 
            background: #f8fafc; border-radius: 5mm; border: 1pt solid #e2e8f0; margin-bottom: 4mm;
        }
        .flow-number { 
            font-family: 'Outfit', sans-serif; font-size: 18pt; font-weight: 900; color: #3b82f6; opacity: 0.3;
        }

        /* Milestone (Sec 7) */
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

        /* Pricing (Sec 8) */
        .pricing-hero {
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); 
            color: #fff; padding: 15mm; border-radius: 10mm; text-align: center;
            margin-top: 15mm; position: relative; overflow: hidden;
        }
        .price-value { font-family: 'Outfit', sans-serif; font-size: 48pt; font-weight: 900; color: #3b82f6; line-height: 1; margin: 5mm 0; }

        /* Impact (Sec 9) */
        .impact-grid { display: grid; grid-template-columns: 1fr 1.5fr; gap: 10mm; align-items: center; }
        .impact-visual {
            height: 50mm; background: #f8fafc; border-radius: 8mm; display: flex; align-items: center; justify-content: center;
            flex-direction: column; position: relative; border: 1pt dashed #cbd5e1;
        }
        .impact-big-text { font-family: 'Outfit', sans-serif; font-size: 60pt; font-weight: 900; color: #3b82f6; line-height: 1; }

        /* Cards (Sec 10) */
        .asymmetric-cards { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 5mm; margin-top: 10mm; }
        .value-card-premium {
            padding: 8mm; background: #fff; border-radius: 6mm; border-top: 4pt solid #0f172a;
            box-shadow: 0 4mm 10mm rgba(0,0,0,0.05);
        }
        .value-card-premium:nth-child(even) { transform: translateY(5mm); border-top-color: #3b82f6; }

    </style>
</head>
<body>

    @php
        $logoPathLocal = public_path('images/logo-dnb.png');
        $logoBase64 = null;
        if (file_exists($logoPathLocal)) {
            $type = pathinfo($logoPathLocal, PATHINFO_EXTENSION);
            $data = file_get_contents($logoPathLocal);
            $logoBase64 = 'data:image/' . $type . ';base64,' . base64_encode($data);
        }
        
        // Define sections with extracted titles/content
        $sections = [
            ['id' => 1, 'title' => '1. Ringkasan Eksekutif', 'content' => $proposal->executive_summary],
            ['id' => 2, 'title' => '2. Latar Belakang & Masalah', 'content' => $proposal->problem_analysis],
            ['id' => 3, 'title' => '3. Tujuan Proyek', 'content' => $proposal->project_objectives],
            ['id' => 4, 'title' => '4. Solusi Utama', 'content' => $proposal->solutions],
            ['id' => 5, 'title' => '5. Ruang Lingkup (Deliverables)', 'content' => $proposal->scope_of_work],
            ['id' => 6, 'title' => '6. Alur Sistem & Cara Kerja', 'content' => $proposal->system_walkthrough],
            ['id' => 7, 'title' => '7. Timeline Implementasi', 'content' => $proposal->timeline],
            ['id' => 8, 'title' => '8. Estimasi Investasi Proyek', 'content' => $proposal->investment ?? $proposal->pricing],
            ['id' => 9, 'title' => '9. Estimasi Dampak & ROI', 'content' => $proposal->roi_impact],
            ['id' => 10, 'title' => '10. Nilai Tambah Agensi', 'content' => $proposal->value_add],
            ['id' => 11, 'title' => '11. Penutup & Kerja Sama', 'content' => $proposal->closing_cta],
        ];
    @endphp

    <!-- FLOATING ACTION BUTTON (With Instructions) -->
    <div class="no-print fixed bottom-8 right-8 z-[9999] flex flex-col items-end gap-4 pointer-events-auto">
        <div class="bg-black/80 text-white text-xs py-2 px-4 rounded-lg mb-2 backdrop-blur-sm text-right leading-relaxed shadow-xl border border-white/10">
            <span class="text-yellow-400 font-bold">⚠️ PENTING:</span><br>
            1. Destination: <strong>Save as PDF</strong><br>
            2. Options: Centang <strong>✅ Background graphics</strong>
        </div>
        <div class="flex gap-4">
            <button onclick="window.print()" class="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full shadow-2xl transform transition hover:scale-105 flex items-center gap-2 border-2 border-white/20">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                Download PDF
            </button>
        </div>
    </div>

    <!-- 1. COVER PAGE -->
    <div class="page-container page-break relative bg-slate-900 overflow-hidden" style="background-color: #0f172a;">
        <!-- Background Graphics -->
        <div class="absolute top-0 right-0 w-[65%] h-full bg-slate-800" style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); clip-path: polygon(30% 0, 100% 0, 100% 100%, 0% 100%); z-index: 1;"></div>
        <div class="absolute inset-0" style="background-image: radial-gradient(circle at 1mm 1mm, rgba(255,255,255,0.05) 0.5mm, transparent 0); background-size: 10mm 10mm; z-index: 2;"></div>

        <!-- Content -->
        <div class="relative z-10 h-full flex flex-col justify-between p-[25mm] box-border">
            <div>
                 @if($logoBase64)
                     <img src="{{ $logoBase64 }}" style="width: 35mm; filter: brightness(0) invert(1); margin-bottom: 15mm;" alt="DNB Logo">
                @else
                    <div class="text-white text-4xl font-bold mb-12 tracking-tighter">DNB AGENCY</div>
                @endif
            </div>

            <div>
                 <div style="width: 25mm; height: 1.5mm; background: #3b82f6; margin-bottom: 15mm;"></div>
                 <h1 class="text-white" style="font-family: 'Outfit'; font-size: 54pt; font-weight: 900; line-height: 0.95; text-transform: uppercase; letter-spacing: -2pt;">
                    {{ $proposal->title ?? 'DIGITAL TRANSFORMATION' }}
                 </h1>
                 <p style="font-size: 22pt; font-weight: 300; color: #3b82f6; margin-top: 10mm; letter-spacing: -0.5pt;">
                    Prepared for {{ $proposal->client_name }}
                 </p>
                 
                 <!-- Contact Information Block -->
                 <div style="margin-top: 20mm; padding: 8mm; background: rgba(255,255,255,0.05); border-radius: 8mm; border-left: 3px solid #3b82f6;">
                     <div style="color: rgba(255,255,255,0.5); font-size: 8pt; font-weight: 900; letter-spacing: 2pt; text-transform: uppercase; margin-bottom: 5mm;">Informasi Kontak</div>
                     <div style="color: rgba(255,255,255,0.9); font-size: 10pt; line-height: 1.8;">
                         <div><strong>Email:</strong> dnbright000@gmail.com</div>
                         <div><strong>Telepon:</strong> +62 812-3456-7890</div>
                         <div><strong>Alamat:</strong> Yogyakarta, Indonesia</div>
                         <div><strong>Website:</strong> thedarkandbright.com</div>
                     </div>
                 </div>
            </div>

            <div style="color: rgba(255,255,255,0.4); font-size: 8pt; font-weight: 900; letter-spacing: 4pt;">
                 DNB STRATEGIC DOCUMENT / {{ strtoupper(date('F Y')) }}
            </div>
        </div>
    </div>

    <!-- CHAPTERS 1-11 -->
    @foreach($sections as $section)
        <div class="page-container page-break">
            <!-- Header/Footer/Number -->
            <div class="bg-number">{{ sprintf('%02d', $section['id']) }}</div>
            
            <div class="internal-header">
                <div>DARK AND BRIGHT / STRATEGIC PROPOSAL</div>
                <div>SECTION {{ sprintf('%02d', $section['id']) }}</div>
            </div>

            <div class="layout-content-wrapper">
                <!-- Title -->
                @php 
                    $cleanTitle = explode('. ', $section['title'])[1] ?? $section['title'];
                @endphp
                <h2 class="layout-title">{{ $cleanTitle }}</h2>
                <div class="blue-bar"></div>

                <!-- DYNAMIC LAYOUTS -->
                <div class="prose max-w-none">
                    
                    @if($section['id'] == 1)
                        <!-- 1. SIDEBAR -->
                        <div class="layout-sidebar">
                            <div>{!! preg_replace('/\*\*(.+?)\*\*/', '<strong>$1</strong>', $section['content']) !!}</div>
                            <div class="sidebar-accent">
                                <h4>Agency Insight</h4>
                                <p>"Kami merancang solusi ini untuk memaksimalkan ROI anda melalui pendekatan teknologi yang terukur."</p>
                            </div>
                        </div>

                    @elseif($section['id'] == 2)
                        <!-- 2. PROBLEM -->
                        <div style="position: relative; padding-top: 5mm;">
                            <span class="problem-bracket">"</span>
                            <div class="problem-quote">Menganalisis tantangan anda dengan presisi untuk menciptakan keunggulan kompetitif.</div>
                            <div>{!! preg_replace('/\*\*(.+?)\*\*/', '<strong>$1</strong>', $section['content']) !!}</div>
                        </div>

                    @elseif($section['id'] == 3)
                        <!-- 3. OBJECTIVES -->
                        <div>{!! explode("\n\n", $section['content'])[0] ?? '' !!}</div>
                        <div class="layout-objectives-grid">
                            <div class="objective-card">
                                <div class="obj-icon">01</div>
                                <h3 class="font-bold text-lg mb-2">Optimalisasi</h3>
                                <p class="text-xs text-slate-500">Meningkatkan efisiensi sistem secara menyeluruh.</p>
                            </div>
                            <div class="objective-card">
                                <div class="obj-icon">02</div>
                                <h3 class="font-bold text-lg mb-2">Skalabilitas</h3>
                                <p class="text-xs text-slate-500">Mempersiapkan infrastruktur untuk pertumbuhan.</p>
                            </div>
                        </div>
                        <div>{!! preg_replace('/\*\*(.+?)\*\*/', '<strong>$1</strong>', isset(explode("\n\n", $section['content'])[1]) ? implode("\n\n", array_slice(explode("\n\n", $section['content']), 1)) : '') !!}</div>

                    @elseif($section['id'] == 4)
                        <!-- 4. SOLUSI UTAMA (CONTENT CONTROLLED) -->
                         {!! $section['content'] !!}

                    @elseif($section['id'] == 5)
                        <!-- 5. LIST -->
                        <div class="layout-deliverables-list">
                            {!! preg_replace('/\*\*(.+?)\*\*/', '<strong>$1</strong>', $section['content']) !!}
                        </div>

                    @elseif($section['id'] == 6)
                        <!-- 6. FLOW -->
                        <div>{!! preg_replace('/\*\*(.+?)\*\*/', '<strong>$1</strong>', $section['content']) !!}</div>
                        <div style="margin-top: 8mm;">
                            <div class="flow-step">
                                <div class="flow-number">STEP 01</div><div style="font-weight: 700;">ANALYSIS & RESEARCH</div>
                            </div>
                            <div class="flow-step">
                                <div class="flow-number">STEP 02</div><div style="font-weight: 700;">DESIGN & STRATEGY</div>
                            </div>
                            <div class="flow-step">
                                <div class="flow-number">STEP 03</div><div style="font-weight: 700;">DEVELOPMENT & DEPLOY</div>
                            </div>
                        </div>

                    @elseif($section['id'] == 7)
                        <!-- 7. TIMELINE -->
                        <div>{!! preg_replace('/\*\*(.+?)\*\*/', '<strong>$1</strong>', $section['content']) !!}</div>
                        <div class="milestone-visual">
                            <div class="ms-node"><div class="ms-dot"></div><span style="font-size: 10px; font-weight: 900;">WEEK 01</span></div>
                            <div class="ms-node"><div class="ms-dot"></div><span style="font-size: 10px; font-weight: 900;">WEEK 03</span></div>
                            <div class="ms-node"><div class="ms-dot"></div><span style="font-size: 10px; font-weight: 900;">WEEK 06</span></div>
                            <div class="ms-node"><div class="ms-dot"></div><span style="font-size: 10px; font-weight: 900;">LAUNCH</span></div>
                        </div>

                    @elseif($section['id'] == 8)
                        <!-- 8. PRICING -->
                        <div>{!! preg_replace('/\*\*(.+?)\*\*/', '<strong>$1</strong>', $section['content']) !!}</div>
                        <div class="pricing-hero">
                             <div style="color: #3b82f6; font-weight: 900; font-size: 14px; letter-spacing: 5px;">OFFICIAL QUOTATION</div>
                             <!-- Verification marker -->
                <div style="position: absolute; bottom: 5mm; left: 5mm; font-size: 6pt; color: #f1f5f9; opacity: 0.3;">CODE_SYNC_V16</div>
                             <div class="price-value">STRATEGIC PARTNER</div>
                             <p style="color: rgba(255,255,255,0.4); font-size: 12px;">Investasi masa depan untuk keunggulan bisnis anda.</p>
                        </div>

                    @elseif($section['id'] == 9)
                        <!-- 9. IMPACT -->
                        <div class="impact-grid">
                            <div class="impact-visual">
                                <div class="impact-big-text">100%</div>
                                <p style="font-size: 10px; fontWeight: 900; color: #64748b;">PROJECTED SUCCESS</p>
                            </div>
                            <div>{!! preg_replace('/\*\*(.+?)\*\*/', '<strong>$1</strong>', $section['content']) !!}</div>
                        </div>

                    @elseif($section['id'] == 10)
                        <!-- 10. CARDS -->
                        <div>{!! preg_replace('/\*\*(.+?)\*\*/', '<strong>$1</strong>', $section['content']) !!}</div>
                        <div class="asymmetric-cards">
                             <div class="value-card-premium">
                                <h4 style="font-weight: 900; font-size: 12px; margin-bottom: 10px;">DEDICATED TEAM</h4>
                                <p style="font-size: 10px; color: #64748b;">Akses penuh ke tim ahli kami.</p>
                            </div>
                            <div class="value-card-premium">
                                <h4 style="font-weight: 900; font-size: 12px; margin-bottom: 10px;">ON-TIME DELIVERY</h4>
                                <p style="font-size: 10px; color: #64748b;">Komitmen ketepatan waktu proyek.</p>
                            </div>
                            <div class="value-card-premium">
                                <h4 style="font-weight: 900; font-size: 12px; margin-bottom: 10px;">24/7 SUPPORT</h4>
                                <p style="font-size: 10px; color: #64748b;">Siap membantu kapan saja dibutuhkan.</p>
                            </div>
                        </div>

                    @else
                        <!-- DEFAULT -->
                        {!! preg_replace('/\*\*(.+?)\*\*/', '<strong>$1</strong>', $section['content']) !!}
                    @endif
                </div>
            </div>

            <div class="internal-footer">
                <div>DNB AGENCY / STRATEGIC PROPOSAL {{ date('Y') }} / <span style="font-size: 6pt; opacity: 0.5;">CODE_SYNC_V16</span></div>
                <div>CONFIDENTIAL DOCUMENT</div>
            </div>
        </div>
    @endforeach

    <!-- 13. CLOSING HERO -->
    <div class="page-container" style="background-color: #0f172a; color: white; display: flex; align-items: center; justify-content: center; text-align: center;">
         <div style="max-width: 80%;">
             <div style="font-family: 'Outfit'; font-size: 72pt; font-weight: 900; letter-spacing: -3pt; line-height: 0.8; margin-bottom: 10mm;">THANK YOU.</div>
             <div style="font-size: 16pt; color: rgba(255,255,255,0.7); margin-bottom: 20mm;">
                 Kami percaya kerjasama ini akan membawa dampak transformasi digital yang signifikan bagi bisnis anda.
             </div>
             
             <div style="width: 300px; margin: 0 auto; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 10mm;">
                 <p style="font-weight: 900; font-size: 14px; letter-spacing: 2px;">THE DARK AND BRIGHT</p>
                 <p style="font-size: 10px; color: rgba(255,255,255,0.4);">Your Strategic Digital Partner</p>
             </div>
         </div>
    </div>

</body>
</html>
