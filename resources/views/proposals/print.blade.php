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
        .font-light { font-weight: 300; }
        
        /* --- COLORS (DNB BRANDING) --- */
        .bg-dark { background-color: #0B1120; }
        .bg-blue { background-color: #2563eb; }
        .text-cyan { color: #38bdf8; }
        .text-blue { color: #2563eb; }
        .text-dark { color: #0B1120; }
        .text-white { color: #ffffff; }
        .text-muted { color: #64748b; }

        /* --- COVER PAGE (PREMIUM REFINED) --- */
        .cover-page {
            background-color: #0B1120;
            color: #ffffff;
        }
        .cover-accent-splat {
            position: absolute; top: -50mm; right: -50mm;
            width: 150mm; height: 150mm;
            background: radial-gradient(circle, rgba(56,189,248,0.1) 0%, rgba(11,17,32,0) 70%);
            z-index: 1;
        }
        .cover-border-left {
            position: absolute; top: 20mm; bottom: 20mm; left: 20mm;
            width: 1px; background-color: #1e293b;
        }
        .cover-border-right {
            position: absolute; top: 20mm; bottom: 20mm; right: 20mm;
            width: 1px; background-color: #1e293b;
        }
        .cover-top-bar {
            position: absolute; top: 20mm; left: 20mm; right: 20mm; height: 1px; background: #38bdf8;
        }
        .cover-bottom-bar {
            position: absolute; bottom: 20mm; left: 20mm; right: 20mm; height: 1px; background: #38bdf8;
        }
        
        .cover-content {
            position: absolute; top: 50%; left: 50%;
            transform: translate(-50%, -50%);
            width: 160mm; text-align: center;
            z-index: 10;
        }
        .cover-logo-img { height: 25mm; margin-bottom: 20mm; }
        .cover-category {
            font-size: 9pt; letter-spacing: 5px; color: #94a3b8; text-transform: uppercase;
            margin-bottom: 5mm; display: block;
        }
        .cover-title {
            font-size: 32pt; font-weight: bold; line-height: 1.1; color: #ffffff;
            margin-bottom: 10mm;
        }
        .cover-client-label {
            font-size: 9pt; color: #64748b; letter-spacing: 2px; margin-bottom: 2mm;
        }
        .cover-client-name {
            font-size: 18pt; color: #38bdf8; font-weight: normal;
        }

        /* --- LAYOUT A: SIDEBAR (Odd Sections) --- */
        .layout-a-sidebar {
            position: absolute; top: 0; left: 0; bottom: 0;
            width: 50mm; background-color: #f8fafc;
            border-right: 1px solid #e2e8f0;
        }
        .layout-a-sidebar-decor {
            position: absolute; top: 0; left: 0; width: 100%; height: 50mm;
            background-color: #0B1120;
        }
        /* Overlapping Number */
        .layout-a-number {
             position: absolute; top: 35mm; left: 10mm;
             font-size: 45pt; font-weight: bold; color: #38bdf8; z-index: 10;
             line-height: 1;
        }
        .layout-a-title {
            position: absolute; top: 60mm; left: 5mm; right: 5mm;
            text-align: right; font-size: 14pt; font-weight: bold; color: #0B1120;
            text-transform: uppercase; line-height: 1.2;
        }
        /* Content Area A */
        .layout-a-content {
            position: absolute; top: 20mm; left: 65mm; right: 15mm; bottom: 20mm;
            width: 130mm; /* Strict Width Safety */
        }
        /* Header in A Content */
        .layout-a-header-meta {
            border-bottom: 2px solid #0B1120; padding-bottom: 5mm; margin-bottom: 10mm;
            display: flex; /* Careful with flex, formatting fallback */
        }

        /* --- LAYOUT B: HEADER BAR (Even Sections) --- */
        .layout-b-header {
            position: absolute; top: 0; left: 0; width: 100%; height: 35mm;
            background-color: #0B1120;
        }
        .layout-b-number {
             position: absolute; top: 5mm; left: 15mm;
             font-size: 60pt; font-weight: bold; color: rgba(255,255,255,0.1);
        }
        .layout-b-title {
            position: absolute; top: 12mm; left: 20mm;
            font-size: 18pt; font-weight: bold; color: #ffffff;
            text-transform: uppercase; letter-spacing: 1px; border-left: 4px solid #38bdf8;
            padding-left: 5mm;
        }
        /* Content Area B */
        .layout-b-content {
            position: absolute; top: 50mm; left: 20mm; right: 20mm; bottom: 20mm;
            width: 170mm; /* Standard Width */
            /* BUT WAIT, padding issue safety */
            width: 155mm; /* FORCE SAFETY WIDTH */
            margin-left: 10mm; /* Centering helper */
        }

        /* --- SHARED CONTENT STYLING --- */
        .content-body {
            font-size: 11pt; line-height: 1.6; color: #334155; text-align: justify;
        }
        .content-body h3 {
            font-size: 13pt; font-weight: bold; color: #0B1120;
            margin-top: 8mm; margin-bottom: 3mm;
        }
        .content-body p { margin-bottom: 4mm; }
        .content-body ul { margin-bottom: 4mm; padding-left: 5mm; }
        .content-body li { margin-bottom: 2mm; }

        /* --- FOOTER --- */
        .footer-a {
            position: absolute; bottom: 10mm; right: 15mm;
            font-size: 8pt; color: #94a3b8; text-align: right;
        }
        .footer-b {
            position: absolute; bottom: 10mm; left: 0; width: 100%;
            font-size: 8pt; color: #94a3b8; text-align: center; border-top: 1px solid #f1f5f9;
            padding-top: 3mm;
        }

        /* --- CLOSING PAGE --- */
        .closing-page { background-color: #0B1120; color: white; display: table; width: 100%; height: 100%; text-align: center; }
        .closing-cell { display: table-cell; vertical-align: middle; }
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
        <div class="cover-accent-splat"></div>
        <div class="cover-border-left"></div>
        <div class="cover-border-right"></div>
        <div class="cover-top-bar"></div>
        <div class="cover-bottom-bar"></div>

        <div class="cover-content">
            @if($logoBase64)
                <img src="{{ $logoBase64 }}" class="cover-logo-img" alt="DNB">
            @else
                <div style="font-size: 30pt; font-weight: bold; margin-bottom: 20mm;">DNB AGENCY</div>
            @endif

            <span class="cover-category">STRATEGIC PROPOSAL</span>
            <div class="cover-title">{{ $proposal->title ?? 'DIGITAL TRANSFORMATION PROPOSAL' }}</div>
            
            <div class="cover-client-label">PREPARED FOR</div>
            <div class="cover-client-name">{{ $proposal->client_name }}</div>
        </div>
        
        <div style="position: absolute; bottom: 12mm; left: 20mm; font-size: 8pt; color: #475569; letter-spacing: 1px;">STRICTLY CONFIDENTIAL</div>
        <div style="position: absolute; bottom: 12mm; right: 20mm; font-size: 8pt; color: #475569; letter-spacing: 1px;">{{ now()->format('d F Y') }}</div>
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
            <!-- LAYOUT A (ODD - SIDEBAR) -->
            <div class="page-container">
                <div class="layout-a-sidebar">
                    <div class="layout-a-sidebar-decor"></div>
                    <div class="layout-a-number">{{ sprintf('%02d', $section['id']) }}</div>
                    <div class="layout-a-title">{{ $section['title'] }}</div>
                </div>

                <div class="layout-a-content">
                    <!-- Mini Header -->
                    <div class="layout-a-header-meta">
                        <div style="float: left; width: 50%;">
                            @if($logoBase64) <img src="{{ $logoBase64 }}" style="height: 6mm; opacity: 0.8;"> @endif
                        </div>
                        <div style="float: right; width: 50%; text-align: right; color: #94a3b8; font-size: 8pt;">
                            REF: {{ $proposal->id }}/{{ date('Y') }}
                        </div>
                        <div style="clear: both;"></div>
                    </div>

                    <!-- Content -->
                    <div class="content-body">
                         {!! $section['content'] !!}
                    </div>
                </div>

                <div class="footer-a">
                     Page {{ $loop->iteration + 1 }} &bull; DNB Agency
                </div>
            </div>
        @else
            <!-- LAYOUT B (EVEN - HEADER BAR) -->
            <div class="page-container">
                <div class="layout-b-header">
                    <div class="layout-b-number">{{ sprintf('%02d', $section['id']) }}</div>
                    <div class="layout-b-title">{{ $section['title'] }}</div>
                </div>

                <div class="layout-b-content">
                    <div class="content-body">
                         {!! $section['content'] !!}
                    </div>
                </div>

                <div class="footer-b">
                    Page {{ $loop->iteration + 1 }} &bull; Dark and Bright Agency &bull; Confidential
                </div>
            </div>
        @endif
    @endforeach

    <!-- 3. CLOSING PAGE -->
    <div class="page-container closing-page">
        <div class="closing-cell">
             @if($logoBase64)
                <img src="{{ $logoBase64 }}" style="height: 15mm; opacity: 0.5; margin-bottom: 10mm;" alt="Logo">
            @endif
            <div style="font-size: 36pt; font-weight: bold; margin-bottom: 5mm; letter-spacing: 2px;">LET'S BUILD THIS.</div>
            <div style="font-size: 12pt; color: #94a3b8; line-height: 1.6;">
                Kami siap menjadi mitra transformasi digital Anda.<br>
                Hubungi kami untuk langkah selanjutnya.
            </div>
            <div style="margin-top: 20mm; font-size: 14pt; color: #38bdf8;">
                admin.thedarkandbright.com
            </div>
        </div>
    </div>

</body>
</html>
