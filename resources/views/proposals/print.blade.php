<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>{{ $proposal->title ?? 'Proposal' }}</title>
    <style>
        /* CRITICAL: Box Model */
        * { box-sizing: border-box; }
        
        @page {
            margin: 0px;
            size: A4 portrait;
        }
        
        body {
            font-family: 'Helvetica', 'Arial', sans-serif;
            margin: 0px;
            padding: 0px;
            background-color: #ffffff;
            color: #1e293b; /* Slate 800 */
        }
        
        /* --- UTILS --- */
        .page-container {
            width: 210mm;
            height: 297mm;
            position: relative;
            page-break-after: always;
            overflow: hidden;
            background: #ffffff;
        }
        .page-container:last-child {
            page-break-after: avoid;
        }
        .text-uppercase { text-transform: uppercase; }
        .text-bold { font-weight: bold; }
        
        /* --- COLORS (DNB BRANDING) --- */
        .bg-dark { background-color: #0B1120; }
        .bg-blue { background-color: #2563eb; }
        .text-cyan { color: #38bdf8; }
        .text-dark { color: #0B1120; }
        .text-muted { color: #94a3b8; }
        
        /* --- DECOR ELEMENTS (ACTIVE) --- */
        .watermark {
            position: absolute;
            top: 50%; left: 50%;
            transform: translate(-50%, -50%);
            width: 150mm; height: 150mm;
            opacity: 0.03; /* Very subtle texture */
            z-index: 0;
            background-repeat: no-repeat;
            background-position: center;
        }
        
        .tech-dot {
            width: 15mm; height: 15mm;
            border-radius: 50%;
            background-color: #38bdf8;
            opacity: 0.1;
            position: absolute;
        }
        
        .accent-line-bleed {
            position: absolute;
            height: 2mm; background-color: #38bdf8;
            z-index: 1;
        }

        /* --- COVER PAGE --- */
        .cover-page {
            background-color: #0B1120;
            color: #ffffff;
        }
        .cover-circle-huge {
            position: absolute; top: -100mm; right: -50mm;
            width: 250mm; height: 250mm;
            border: 2px solid rgba(56,189,248,0.1);
            border-radius: 50%;
        }
        .cover-circle-small {
            position: absolute; bottom: 50mm; left: 20mm;
            width: 20mm; height: 20mm;
            background-color: #2563eb;
            border-radius: 50%;
            opacity: 0.5;
        }
        .cover-line-vertical {
            position: absolute; top: 20mm; bottom: 20mm; left: 20mm;
            width: 1px; background: linear-gradient(to bottom, #38bdf8, transparent);
        }
        
        .cover-content {
            position: absolute; top: 45%; left: 30mm; right: 20mm;
            z-index: 10;
        }
        .cover-title {
            font-size: 38pt; font-weight: bold; line-height: 1; color: #ffffff;
            margin-bottom: 5mm; text-transform: uppercase;
            text-shadow: 0 4px 20px rgba(0,0,0,0.5);
        }
        .cover-subtitle {
            font-size: 14pt; color: #38bdf8; letter-spacing: 3px; font-weight: 300;
            margin-bottom: 20mm; display: block;
        }
        .cover-client-box {
            border-left: 4px solid #38bdf8; padding-left: 5mm;
            margin-top: 10mm;
        }

        /* --- LAYOUT A - THE "TECH CARD" (Odd Sections) --- */
        .layout-a-bg {
            position: absolute; top: 0; left: 0; width: 60mm; height: 100%;
            background-color: #f1f5f9; z-index: 0;
            border-right: 1px solid #e2e8f0;
        }
        .layout-a-header {
            position: absolute; top: 20mm; left: 0; width: 100%; height: 40mm;
            z-index: 10;
        }
        /* Massive Number Layering */
        .layout-a-number-huge {
            position: absolute; top: 15mm; left: 5mm;
            font-size: 80pt; font-weight: bold; color: rgba(148, 163, 184, 0.15);
            line-height: 0.8; z-index: 1;
        }
        .layout-a-title-overlay {
            position: absolute; top: 25mm; left: 20mm;
            font-size: 20pt; font-weight: bold; color: #0B1120;
            text-transform: uppercase; z-index: 2;
            width: 140mm;
            border-bottom: 3px solid #38bdf8; padding-bottom: 2mm;
        }
        
        .layout-a-content {
            position: absolute; top: 60mm; left: 25mm; bottom: 25mm;
            width: 155mm; /* SAFETY WIDTH */
            z-index: 5;
        }

        /* --- LAYOUT B - THE "OPEN FLUX" (Even Sections) --- */
        .layout-b-top-bar {
            position: absolute; top: 0; left: 0; width: 100%; height: 15mm;
            background-color: #0B1120; z-index: 0;
        }
        .layout-b-header {
             position: absolute; top: 25mm; right: 20mm; text-align: right;
             width: 100%; z-index: 10;
        }
        .layout-b-number-huge {
            position: absolute; top: -10mm; right: 0;
            font-size: 100pt; font-weight: bold; color: rgba(56, 189, 248, 0.1);
            line-height: 0.8; z-index: 1;
        }
        .layout-b-title-overlay {
            position: relative; 
            font-size: 24pt; font-weight: bold; color: #0B1120;
            text-transform: uppercase; z-index: 2;
        }
        
        .layout-b-content {
             position: absolute; top: 60mm; right: 25mm; bottom: 25mm;
             width: 155mm; /* SAFETY WIDTH */
             z-index: 5;
             text-align: left; /* Reset text align */
        }
        
        /* --- RICH CONTENT STYLING --- */
        .content-body {
            font-size: 11pt; line-height: 1.6; color: #334155; text-align: justify;
        }
        .content-body h3 {
            font-size: 13pt; font-weight: bold; color: #0B1120;
            margin-top: 8mm; margin-bottom: 4mm;
            border-left: 4px solid #38bdf8; padding-left: 4mm;
            background: linear-gradient(to right, #f8fafc, transparent);
        }
        .content-body p { margin-bottom: 4mm; }
        .content-body li { margin-bottom: 2mm; }

        /* --- FOOTER --- */
        .footer-mod {
            position: absolute; bottom: 10mm; width: 100%; text-align: center;
            font-size: 8pt; color: #cbd5e1; border-top: 1px solid #f1f5f9; padding-top: 3mm;
        }

        /* --- CLOSING --- */
        .closing-page { background: #0B1120; color: white; display: table; width: 100%; height: 100%; text-align: center; }
        .closing-box { display: table-cell; vertical-align: middle; position: relative; z-index: 10; }
        .closing-circle {
            position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
            width: 180mm; height: 180mm; border: 1px dashed #334155; border-radius: 50%; z-index: 0;
        }
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
    @endphp

    <!-- 1. COVER PAGE -->
    <div class="page-container cover-page">
        <div class="cover-circle-huge"></div>
        <div class="cover-circle-small"></div>
        <div class="cover-line-vertical"></div>
        
        <div class="cover-content">
             @if($logoBase64)
                <img src="{{ $logoBase64 }}" style="height: 25mm; margin-bottom: 10mm;">
            @else
                <div style="font-size: 30pt; font-weight: bold;">DNB AGENCY</div>
            @endif
            
            <span class="cover-subtitle">STRATEGIC PROPOSAL</span>
            <div class="cover-title">{{ $proposal->title ?? 'DIGITAL TRANSFORMATION PROPOSAL' }}</div>
            
            <div class="cover-client-box">
                <div style="font-size: 9pt; color: #94a3b8; letter-spacing: 2px;">PREPARED FOR</div>
                <div style="font-size: 20pt; color: #38bdf8;">{{ $proposal->client_name }}</div>
            </div>
        </div>

        <div style="position: absolute; bottom: 15mm; left: 20mm; font-size: 8pt; color: #64748b;">STRICTLY CONFIDENTIAL</div>
        <div style="position: absolute; bottom: 15mm; right: 20mm; font-size: 8pt; color: #64748b;">{{ now()->format('d F Y') }}</div>
    </div>

    @php
        $sections = [
            ['id' => 1, 'title' => 'Ringkasan Eksekutif', 'content' => $proposal->executive_summary],
            ['id' => 2, 'title' => 'Latar Belakang & Masalah', 'content' => $proposal->problem_analysis],
            ['id' => 3, 'title' => 'Tujuan Proyek', 'content' => $proposal->project_objectives],
            ['id' => 4, 'title' => 'Solusi Utama', 'content' => $proposal->solutions],
            ['id' => 5, 'title' => 'Ruang Lingkup (Deliverables)', 'content' => $proposal->scope_of_work],
            ['id' => 6, 'title' => 'Alur Sistem & Cara Kerja', 'content' => $proposal->system_walkthrough],
            ['id' => 7, 'title' => 'Timeline Implementasi', 'content' => $proposal->timeline],
            ['id' => 8, 'title' => 'Estimasi Investasi Proyek', 'content' => $proposal->investment ?? $proposal->pricing],
            ['id' => 9, 'title' => 'Estimasi Dampak & ROI', 'content' => $proposal->roi_impact],
            ['id' => 10, 'title' => 'Nilai Tambah Agensi', 'content' => $proposal->value_add],
            ['id' => 11, 'title' => 'Penutup & Kerja Sama', 'content' => $proposal->closing_cta],
        ];
    @endphp

    @foreach($sections as $section)
        @if($loop->iteration % 2 != 0)
            <!-- LAYOUT A (ODD - SIDEBAR TECH) -->
            <div class="page-container">
                 @if($logoBase64)
                    <div class="watermark" style="background-image: url('{{ $logoBase64 }}'); background-size: contain;"></div>
                @endif
                
                <div class="layout-a-bg"></div> <!-- Grey Sidebar Background -->
                <div class="tech-dot" style="top: 10mm; left: 10mm;"></div>
                <div class="tech-dot" style="bottom: 10mm; left: 40mm; background-color: #0B1120;"></div>
                
                <div class="layout-a-header">
                    <div class="layout-a-number-huge">{{ sprintf('%02d', $section['id']) }}</div>
                    <div class="layout-a-title-overlay">{{ $section['title'] }}</div>
                </div>

                <div class="layout-a-content">
                    <div class="content-body">
                         {!! $section['content'] !!}
                    </div>
                </div>
                
                <div class="footer-mod">DNB Agency / Creative & Active Layout / Page {{ $loop->iteration + 1 }}</div>
            </div>
        @else
            <!-- LAYOUT B (EVEN - OPEN FLUX) -->
            <div class="page-container">
                @if($logoBase64)
                    <div class="watermark" style="background-image: url('{{ $logoBase64 }}'); background-size: contain; opacity: 0.04;"></div>
                @endif
                
                <div class="layout-b-top-bar"></div>
                <div class="accent-line-bleed" style="top: 15mm; right: 0; width: 30mm;"></div>
                <div class="tech-dot" style="top: 25mm; left: 10mm; width: 10mm; height: 10mm;"></div>

                <div class="layout-b-header">
                    <div class="layout-b-number-huge">{{ sprintf('%02d', $section['id']) }}</div>
                    <div class="layout-b-title-overlay">{{ $section['title'] }}</div>
                </div>

                <div class="layout-b-content">
                    <div class="content-body">
                         {!! $section['content'] !!}
                    </div>
                </div>

                <div class="footer-mod">Confidentially Prepared for {{ $proposal->client_name }} / Page {{ $loop->iteration + 1 }}</div>
            </div>
        @endif
    @endforeach

    <!-- 3. CLOSING PAGE -->
    <div class="page-container closing-page">
        <div class="closing-circle"></div>
        <div class="closing-box">
             @if($logoBase64)
                <img src="{{ $logoBase64 }}" style="height: 20mm; opacity: 0.8; margin-bottom: 10mm;">
            @endif
            <div style="font-size: 48pt; font-weight: bold; margin-bottom: 5mm; letter-spacing: -2px;">LET'S BUILD.</div>
            <div style="font-size: 14pt; color: #94a3b8; font-weight: 300;">
                Ready to transform your business?<br>
                Let's start the conversation.
            </div>
            
            <div style="margin-top: 25mm; border: 1px solid #38bdf8; padding: 5mm 10mm; display: inline-block;">
                <span style="color: #38bdf8; font-weight: bold; font-size: 12pt;">ADMIN.THEDARKANDBRIGHT.COM</span>
            </div>
        </div>
    </div>

</body>
</html>
