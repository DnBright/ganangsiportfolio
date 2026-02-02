<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>{{ $proposal->title ?? 'Proposal' }}</title>
    <style>
        /* CRITICAL: Ensure padding doesn't increase width */
        * {
            box-sizing: border-box;
        }
        @page {
            margin: 0px;
            size: A4 portrait; /* Explicitly A4 */
        }
        body {
            font-family: 'Helvetica', 'Arial', sans-serif;
            margin: 0px;
            padding: 0px;
            background-color: #ffffff;
            color: #333333;
            width: 100%;
            height: 100%;
        }
        
        /* UTILITIES */
        .page-break {
            page-break-after: always;
            clear: both;
        }
        .text-uppercase { text-transform: uppercase; }
        .text-bold { font-weight: bold; }
        .text-center { text-align: center; }
        .text-right { text-align: right; }
        
        /* -------------------------------------------------------------
           1. COVER PAGE (FIXED DIMENSION)
           ------------------------------------------------------------- */
        .cover-page {
            width: 210mm;
            height: 297mm;
            position: relative;
            overflow: hidden;
            background-color: #0B1120; /* Deepest Blue/Black */
            color: #ffffff;
        }
        
        /* Decorative Elements */
        .cover-line-top {
            position: absolute;
            top: 0;
            left: 20mm;
            width: 1px;
            height: 40mm;
            background-color: #38bdf8;
        }
        .cover-line-bottom {
            position: absolute;
            bottom: 0;
            right: 20mm;
            width: 1px;
            height: 40mm;
            background-color: #38bdf8;
        }
        .cover-box {
            position: absolute;
            top: 40mm;
            left: 20mm;
            right: 20mm;
            bottom: 40mm;
            border: 1px solid #1e293b;
        }
        
        /* Content Positioning */
        .cover-content {
            position: absolute;
            top: 45%;
            left: 50%;
            transform: translate(-50%, -50%);
            text-align: center;
            width: 80%;
        }

        .cover-logo-img {
            height: 25mm;
            width: auto;
            margin-bottom: 15mm;
            display: inline-block;
        }
        
        /* Fallback Text Logo */
        .cover-logo-text {
            font-size: 30pt; 
            font-weight: bold; 
            color: #fff; 
            margin-bottom: 20mm;
            display: inline-block;
        }

        .cover-meta {
            font-size: 10pt;
            letter-spacing: 4px;
            color: #94a3b8;
            margin-bottom: 5mm;
            display: block;
        }

        .cover-title {
            font-size: 28pt; /* Safer size */
            line-height: 1.2;
            font-weight: bold;
            color: #ffffff;
            margin-bottom: 10mm;
            letter-spacing: 1px;
            word-wrap: break-word; /* Prevent overflow */
        }

        .cover-client-label {
            font-size: 9pt;
            color: #64748b;
            margin-bottom: 2mm;
            letter-spacing: 2px;
        }
        .cover-client-name {
            font-size: 16pt;
            color: #38bdf8;
            font-weight: normal;
        }

        .cover-footer-left {
            position: absolute;
            bottom: 15mm;
            left: 20mm;
            font-size: 8pt;
            color: #475569;
            letter-spacing: 1px;
        }
        .cover-footer-right {
            position: absolute;
            bottom: 15mm;
            right: 20mm;
            font-size: 8pt;
            color: #475569;
            letter-spacing: 1px;
        }

        /* -------------------------------------------------------------
           2. INTERNAL PAGES (FLOW LAYOUT)
           ------------------------------------------------------------- */
        .internal-page-wrapper {
            /* No fixed height to allow scrolling/flow across pages */
            width: 210mm; /* Force A4 width */
            padding: 25mm 25mm; /* Safer margins (Left/Right increased) */
            position: relative;
            background: #ffffff;
        }
        
        .header {
            border-bottom: 2px solid #f1f5f9;
            padding-bottom: 5mm;
            margin-bottom: 10mm;
            height: 15mm;
            width: 100%;
        }
        .header-table {
            width: 100%;
            border: none;
        }
        .header-logo-img {
            height: 8mm; 
            width: auto;
            opacity: 0.6;
        }
        .header-meta {
            text-align: right;
            font-size: 8pt;
            color: #94a3b8;
            line-height: 1.4;
        }

        .section-label {
            font-size: 9pt;
            font-weight: bold;
            color: #3b82f6;
            letter-spacing: 2px;
            margin-bottom: 2mm;
            text-transform: uppercase;
        }
        .section-heading {
            font-size: 22pt;
            font-weight: bold;
            color: #0f172a;
            margin-bottom: 10mm;
            line-height: 1.2;
            border-left: 5px solid #0f172a;
            padding-left: 15px;
        }
        
        .content-body {
            font-size: 11pt;
            line-height: 1.6;
            color: #334155;
            text-align: justify;
        }
        
        /* Typography Safety */
        .content-body h3 {
            font-size: 13pt;
            font-weight: bold;
            color: #0f172a;
            margin-top: 8mm;
            margin-bottom: 3mm;
            page-break-after: avoid; /* Keep title with text */
        }
        .content-body p { 
            margin-bottom: 4mm; 
            orphans: 3; 
            widows: 3; 
        }
        .content-body ul { 
            margin-bottom: 4mm; 
            padding-left: 5mm; 
        }
        .content-body li { 
            margin-bottom: 2mm; 
            padding-left: 2mm;
        }

        /* Fix overlapping CSS issues from rich text editors */
        .content-body img {
            max-width: 100%;
            height: auto;
        }
        .content-body table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 4mm;
        }
        .content-body td, .content-body th {
            border: 1px solid #e2e8f0;
            padding: 2mm;
            text-align: left;
        }

        .footer {
            margin-top: 15mm;
            border-top: 1px solid #f1f5f9;
            padding-top: 4mm;
            font-size: 8pt;
            color: #cbd5e1;
            text-align: center;
            width: 100%;
        }

        /* -------------------------------------------------------------
           3. CLOSING PAGE
           ------------------------------------------------------------- */
        .closing-page {
            width: 210mm;
            height: 297mm;
            background-color: #0B1120;
            color: #ffffff;
            text-align: center;
            position: relative;
            overflow: hidden;
            display: table; /* Vertical align hack */
        }
        .closing-content {
            display: table-cell;
            vertical-align: middle;
            text-align: center;
            padding: 0 20mm;
        }
        .closing-title {
            font-size: 36pt;
            font-weight: bold;
            margin-bottom: 5mm;
            letter-spacing: 2px;
        }
        .closing-text {
            font-size: 12pt;
            color: #94a3b8;
            line-height: 1.6;
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
    <div class="cover-page">
        <div class="cover-line-top"></div>
        <div class="cover-line-bottom"></div>
        <div class="cover-box"></div>

        <div class="cover-content">
            @if($logoBase64)
                <img src="{{ $logoBase64 }}" class="cover-logo-img" alt="DNB">
            @else
                <div class="cover-logo-text">DNB AGENCY</div>
            @endif

            <span class="cover-meta">STRATEGIC PROPOSAL</span>
            
            <div class="cover-title">
                {{ $proposal->title ?? 'Untitled Proposal' }}
            </div>

            <div class="cover-client-label">PREPARED FOR</div>
            <div class="cover-client-name">{{ $proposal->client_name }}</div>
        </div>

        <div class="cover-footer-left">STRICTLY CONFIDENTIAL</div>
        <div class="cover-footer-right">{{ now()->format('d F Y') }}</div>
    </div>
    
    <div class="page-break"></div>

    <!-- 2. INTERNAL PAGES -->
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
    <div class="internal-page-wrapper">
        <!-- Header using Table for stability -->
        <div class="header">
            <table class="header-table">
                <tr>
                    <td align="left" style="width: 50%;">
                         @if($logoBase64)
                            <img src="{{ $logoBase64 }}" class="header-logo-img" alt="Logo">
                        @else
                            <strong>DNB</strong>
                        @endif
                    </td>
                    <td align="right" style="width: 50%;">
                        <div class="header-meta">
                            REF: {{ $proposal->id }}/{{ date('Y') }}<br>
                            SEC {{ sprintf('%02d', $section['id']) }}
                        </div>
                    </td>
                </tr>
            </table>
        </div>

        <!-- Title -->
        <div class="section-label">SECTION {{ sprintf('%02d', $section['id']) }}</div>
        <div class="section-heading">{{ $section['title'] }}</div>

        <!-- Content (UNESCAPED for RICH TEXT) -->
        <div class="content-body">
            {!! $section['content'] !!}
        </div>

        <!-- Footer -->
        <div class="footer">
            Page {{ $loop->iteration + 1 }} &bull; Dark and Bright Agency &bull; Confidential
        </div>
    </div>
    
    <div class="page-break"></div>
    @endforeach

    <!-- 3. CLOSING PAGE -->
    <div class="closing-page">
        <div class="closing-content">
             @if($logoBase64)
                <img src="{{ $logoBase64 }}" style="height: 15mm; opacity: 0.5; margin-bottom: 10mm;" alt="Logo">
            @endif
            <div class="closing-title">LET'S BUILD THIS.</div>
            <div class="closing-text">
                Kami siap menjadi mitra transformasi digital Anda.<br>
                Hubungi kami untuk langkah selanjutnya.
            </div>
        </div>
    </div>

</body>
</html>
