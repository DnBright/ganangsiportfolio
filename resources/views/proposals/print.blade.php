<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>{{ $proposal->title ?? 'Proposal' }}</title>
    <style>
        @page {
            margin: 0px;
            size: 210mm 297mm;
        }
        body {
            font-family: 'Helvetica', 'Arial', sans-serif;
            margin: 0px;
            padding: 0px;
            color: #333333;
            background-color: #ffffff;
        }
        
        /* Container for each page */
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

        /* --- COVER PAGE --- */
        .cover-bg {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: #0f172a;
            z-index: -1;
        }
        /* Blue accent bar at bottom instead of complex clip-path */
        .cover-accent-bar {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 15mm;
            background-color: #2563eb;
        }
        
        .cover-content {
            padding: 20mm;
            color: #ffffff;
            position: relative;
            height: 260mm; /* Leave space for footer */
        }
        
        .logo-img {
            width: 40mm;
            margin-bottom: 30mm;
        }
        .logo-text {
            font-size: 24pt;
            font-weight: bold;
            color: #ffffff;
            margin-bottom: 30mm;
            display: block;
        }

        .cover-category {
            font-size: 10pt;
            text-transform: uppercase;
            letter-spacing: 2px;
            border-bottom: 1px solid #475569;
            padding-bottom: 5px;
            display: inline-block;
            margin-bottom: 20px;
            color: #94a3b8;
        }

        .cover-title {
            font-size: 36pt;
            font-weight: bold;
            line-height: 1.2;
            text-transform: uppercase;
            margin-bottom: 10px;
            color: #f8fafc;
        }

        .cover-client {
            font-size: 18pt;
            font-weight: normal;
            color: #60a5fa; /* Light Blue */
            margin-top: 0;
        }

        .cover-footer {
            position: absolute;
            bottom: 25mm;
            left: 20mm;
            right: 20mm;
            border-top: 1px solid #334155;
            padding-top: 10px;
            font-size: 9pt;
            color: #64748b;
        }

        /* --- INTERNAL PAGES --- */
        .header {
            position: absolute;
            top: 15mm;
            left: 20mm;
            right: 20mm;
            height: 10mm;
            border-bottom: 2px solid #f1f5f9;
        }
        .header-left {
            float: left;
            font-size: 8pt;
            color: #cbd5e1; /* Light gray */
            font-weight: bold;
            text-transform: uppercase;
        }
        .header-right {
            float: right;
            font-size: 8pt;
            color: #cbd5e1;
        }

        .content-wrapper {
            position: absolute;
            top: 35mm;
            left: 20mm;
            right: 20mm;
            bottom: 25mm;
        }

        .section-number {
            font-size: 60pt;
            font-weight: bold;
            color: #f1f5f9; /* Very light gray */
            position: absolute;
            top: -20px;
            right: 0;
            line-height: 1;
            z-index: -1;
        }

        .section-title {
            font-size: 22pt;
            font-weight: bold;
            color: #0f172a;
            text-transform: uppercase;
            margin-bottom: 20px;
            border-bottom: 3px solid #2563eb;
            padding-bottom: 10px;
            display: inline-block;
            width: 100%;
        }

        .text-content {
            font-size: 11pt;
            line-height: 1.6;
            color: #334155;
            text-align: justify;
        }
        .text-content p { margin-bottom: 15px; }
        .text-content h3 {
            font-size: 13pt;
            color: #1e293b;
            margin-top: 25px;
            margin-bottom: 10px;
            font-weight: bold;
        }
        .text-content ul { margin-bottom: 15px; padding-left: 20px; }
        .text-content li { margin-bottom: 5px; }

        .footer {
            position: absolute;
            bottom: 15mm;
            left: 20mm;
            right: 20mm;
            text-align: center;
            font-size: 8pt;
            color: #cbd5e1;
            border-top: 1px solid #f1f5f9;
            padding-top: 5px;
        }

        /* --- CLOSING PAGE --- */
        .closing-container {
            width: 100%;
            height: 100%;
            background-color: #0f172a;
            color: #ffffff;
            text-align: center;
        }
        /* Vertical center hack for DomPDF tables */
        .closing-table {
            width: 100%;
            height: 100%;
            border: none;
        }
        .closing-cell {
            vertical-align: middle;
            text-align: center;
        }
        .closing-big {
            font-size: 40pt;
            font-weight: bold;
            text-transform: uppercase;
            margin-bottom: 20px;
        }
        .closing-sub {
            font-size: 14pt;
            color: #94a3b8;
            max-width: 500px;
            margin: 0 auto;
        }
    </style>
</head>
<body>

    <!-- 1. COVER PAGE -->
    <div class="page-container">
        <div class="cover-bg"></div>
        <div class="cover-accent-bar"></div>
        
        <div class="cover-content">
            @if(file_exists(public_path('images/logo-dnb.png')))
                <img src="{{ public_path('images/logo-dnb.png') }}" class="logo-img">
            @else
                <div class="logo-text">DNB AGENCY</div>
            @endif

            <div class="cover-category">Strategic Proposal</div>
            
            <div class="cover-title">{{ $proposal->title ?? 'Untitled Proposal' }}</div>
            <div class="cover-client">Prepared for {{ $proposal->client_name }}</div>

            <div class="cover-footer">
                <table width="100%">
                    <tr>
                        <td align="left">CONFIDENTIAL DOCUMENT</td>
                        <td align="right">{{ now()->format('d F Y') }}</td>
                    </tr>
                </table>
            </div>
        </div>
    </div>

    <!-- 2. CONTENT PAGES -->
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
    <div class="page-container">
        <!-- Header -->
        <div class="header">
            <div class="header-left">DNB AGENCY / PROPOSAL</div>
            <div class="header-right">SECTION {{ sprintf('%02d', $section['id']) }}</div>
        </div>

        <div class="content-wrapper">
            <div class="section-number">{{ sprintf('%02d', $section['id']) }}</div>
            <div class="section-title">{{ $section['title'] }}</div>
            
            <div class="text-content">
                {!! nl2br(e($section['content'])) !!}
            </div>
        </div>

        <div class="footer">
            Page {{ $loop->iteration + 1 }} &bull; {{ $proposal->client_name }}
        </div>
    </div>
    @endforeach

    <!-- 3. CLOSING PAGE -->
    <div class="page-container">
        <div class="closing-container">
            <table class="closing-table">
                <tr>
                    <td class="closing-cell">
                        <div class="closing-big">THANK YOU</div>
                        <div class="closing-sub">
                            Let's build something extraordinary together.<br>
                            Contact us to proceed.
                        </div>
                    </td>
                </tr>
            </table>
        </div>
    </div>

</body>
</html>

        * {
            box-sizing: border-box;
        }
        @page {
            margin: 0;
            size: 210mm 297mm;
        }
        body {
            font-family: 'Helvetica', 'Arial', sans-serif;
            margin: 0;
            padding: 0;
            color: #1e293b;
            line-height: 1.6;
            background: #ffffff;
        }
        
        /* Utils */
        .page {
            width: 210mm;
            height: 297mm;
            position: relative;
            page-break-after: always;
            overflow: hidden;
            background: #ffffff;
        }
        .page:last-child {
            page-break-after: avoid;
        }
        
        /* COVER PAGE */
        .cover-page {
            background: #0f172a; /* Dark Blue Baseline */
            background-image: linear-gradient(160deg, #0f172a 0%, #172554 100%);
            color: #ffffff;
        }
        .cover-accent {
            position: absolute;
            top: 0;
            right: 0;
            width: 50%;
            height: 100%;
            background: #1e3a8a; /* Fallback for gradient */
            background: linear-gradient(135deg, transparent 0%, rgba(59, 130, 246, 0.1) 100%);
            clip-path: polygon(100% 0, 0% 100%, 100% 100%);
            z-index: 0;
        }
        .cover-content {
            padding: 20mm;
            position: relative;
            z-index: 10;
            height: 100%;
        }
        .cover-logo {
            width: 40mm;
            margin-bottom: 40mm;
            display: block;
        }
        .cover-type {
            font-size: 10pt;
            letter-spacing: 3px;
            text-transform: uppercase;
            color: #94a3b8;
            margin-bottom: 5mm;
            border-bottom: 1px solid #334155;
            display: inline-block;
            padding-bottom: 2mm;
        }
        .cover-title {
            font-size: 32pt;
            font-weight: bold;
            text-transform: uppercase;
            margin: 0;
            line-height: 1.1;
            color: #f8fafc;
            max-width: 90%;
        }
        .cover-subtitle {
            font-size: 14pt;
            color: #60a5fa;
            margin-top: 10mm;
            font-weight: normal;
        }
        .cover-footer {
            position: absolute;
            bottom: 20mm;
            left: 20mm;
            right: 20mm;
            border-top: 1px solid #334155;
            padding-top: 5mm;
            display: table;
            width: 170mm; /* 210mm - 40mm padding */
        }
        .cf-item {
            display: table-cell;
            font-size: 9pt;
            color: #64748b;
            text-transform: uppercase;
            letter-spacing: 1px;
            width: 50%;
        }
        .cf-right { text-align: right; }

        /* INTERNAL PAGES */
        .internal-page {
            padding: 30mm 20mm 20mm 20mm;
        }
        .internal-header {
            position: absolute;
            top: 12mm;
            left: 20mm;
            right: 20mm;
            height: 10mm;
            border-bottom: 1px solid #e2e8f0;
            width: 170mm;
        }
        .ih-logo {
            height: 8mm;
            float: left;
            opacity: 0.5;
        }
        .ih-text {
            float: right;
            font-size: 8pt;
            color: #94a3b8;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-top: 2mm;
        }
        
        .section-header {
            margin-bottom: 10mm;
            position: relative;
        }
        .bg-number {
            position: absolute;
            top: -15mm;
            right: -5mm;
            font-size: 80pt;
            color: #f1f5f9;
            font-weight: bold;
            z-index: 0;
            line-height: 1;
            font-family: 'Arial', sans-serif;
        }
        .section-title {
            font-size: 24pt;
            font-weight: bold;
            color: #0f172a;
            text-transform: uppercase;
            position: relative;
            z-index: 1;
            margin: 0;
            padding-bottom: 5mm;
        }
        .section-bar {
            width: 50px;
            height: 4px;
            background: #2563eb;
            margin-top: 5mm;
        }

        /* CONTENT STYLING */
        .markdown-content {
            font-size: 11pt;
            color: #334155;
            text-align: justify;
            position: relative;
            z-index: 1;
        }
        .markdown-content h3 {
            font-size: 13pt;
            margin-top: 8mm;
            margin-bottom: 3mm;
            color: #0f172a;
            border-left: 3px solid #60a5fa;
            padding-left: 3mm;
            page-break-after: avoid;
        }
        .markdown-content p {
            margin-bottom: 4mm;
        }
        .markdown-content ul {
            margin-bottom: 4mm;
            padding-left: 5mm;
        }
        .markdown-content li {
            margin-bottom: 2mm;
            padding-left: 2mm;
        }

        /* FOOTER */
        .page-footer {
            position: absolute;
            bottom: 15mm;
            left: 20mm;
            right: 20mm;
            text-align: center;
            font-size: 8pt;
            color: #cbd5e1;
            border-top: 1px solid #f1f5f9;
            padding-top: 3mm;
            width: 170mm;
        }

        /* CLOSING PAGE */
        .closing-page {
            background: #0f172a;
            color: #ffffff;
            display: table;
            text-align: center;
        }
        .closing-container {
            display: table-cell;
            vertical-align: middle;
        }
        .closing-title {
            font-size: 40pt;
            font-weight: bold;
            margin-bottom: 5mm;
            letter-spacing: 2px;
        }
        .closing-text {
            font-size: 14pt;
            color: #94a3b8;
            max-width: 70%;
            margin: 0 auto;
        }
    </style>
</head>
<body>
    @php
        $logoPath = public_path('images/logo-dnb.png');
        $hasLogo = file_exists($logoPath);
    @endphp

    <!-- COVER PAGE -->
    <div class="page cover-page">
        <div class="cover-accent"></div>
        <div class="cover-content">
            @if($hasLogo)
                <img src="{{ $logoPath }}" class="cover-logo" alt="DNB Logo">
            @else
                <div class="cover-logo" style="font-size: 24pt; font-weight: bold; color:white;">DNB</div>
            @endif

            <div class="cover-type">Strategic Proposal Document</div>
            <h1 class="cover-title">{{ $proposal->title ?? 'Untitled Project' }}</h1>
            <h2 class="cover-subtitle">Prepared for {{ $proposal->client_name }}</h2>

            <div class="cover-footer">
                <div class="cf-item">Prepared by <strong>Dark and Bright Agency</strong></div>
                <div class="cf-item cf-right">{{ now()->format('F Y') }} / CONFIDENTIAL</div>
            </div>
        </div>
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
    <div class="page internal-page">
        <!-- Header -->
        <div class="internal-header">
            @if($hasLogo)
                <img src="{{ $logoPath }}" class="ih-logo" alt="Logo">
            @endif
            <div class="ih-text">Reference: {{ strtoupper(Str::slug($proposal->client_name)) }}-{{ now()->format('Y') }}</div>
        </div>

        <!-- Section Title -->
        <div class="section-header">
            <div class="bg-number">{{ sprintf('%02d', $section['id']) }}</div>
            <h2 class="section-title">{{ $section['title'] }}</h2>
            <div class="section-bar"></div>
        </div>
        
        <!-- Content -->
        <div class="markdown-content">
            {!! nl2br(e($section['content'])) !!}
        </div>

        <!-- Footer -->
        <div class="page-footer">
            Page {{ $loop->iteration + 1 }} &bull; Dark and Bright Agency &bull; Confidential
        </div>
    </div>
    @endforeach

    <!-- CLOSING PAGE -->
    <div class="page closing-page">
        <div class="closing-container">
            @if($hasLogo)
                <img src="{{ $logoPath }}" style="width: 30mm; opacity: 0.5; margin-bottom: 10mm;" alt="Logo">
            @endif
            <div class="closing-title">LET'S BUILD THIS.</div>
            <p class="closing-text">
                Kami siap membantu transformasi digital bisnis Anda. 
                Hubungi kami untuk langkah selanjutnya.
            </p>
        </div>
    </div>
</body>
</html>

        @page {
            margin: 0;
            size: A4 portrait;
        }
        body {
            font-family: 'Helvetica', 'Arial', sans-serif;
            margin: 0;
            padding: 0;
            color: #1e293b;
            line-height: 1.6;
        }
        
        /* Utils */
        .page {
            width: 100%;
            height: 100%;
            position: relative;
            page-break-after: always;
            overflow: hidden;
            background: #ffffff;
        }
        .page:last-child {
            page-break-after: avoid;
        }
        
        /* COVER PAGE */
        .cover-page {
            background: #0f172a; /* Dark Blue Baseline */
            background-image: linear-gradient(160deg, #0f172a 0%, #172554 100%);
            color: #ffffff;
        }
        .cover-accent {
            position: absolute;
            top: 0;
            right: 0;
            width: 50%;
            height: 100%;
            background: linear-gradient(135deg, transparent 0%, rgba(59, 130, 246, 0.1) 100%);
            clip-path: polygon(100% 0, 0% 100%, 100% 100%);
        }
        .cover-content {
            padding: 20mm;
            position: relative;
            z-index: 10;
            height: 100%;
        }
        .cover-logo {
            width: 40mm;
            margin-bottom: 40mm;
            display: block;
        }
        .cover-type {
            font-size: 10pt;
            letter-spacing: 3px;
            text-transform: uppercase;
            color: #94a3b8;
            margin-bottom: 5mm;
            border-bottom: 1px solid #334155;
            display: inline-block;
            padding-bottom: 2mm;
        }
        .cover-title {
            font-size: 32pt; /* Reduced from 48pt for better fit */
            font-weight: bold;
            text-transform: uppercase;
            margin: 0;
            line-height: 1.1;
            color: #f8fafc;
            max-width: 90%;
        }
        .cover-subtitle {
            font-size: 14pt;
            color: #60a5fa; /* Cyan/Blue accent */
            margin-top: 10mm;
            font-weight: normal;
        }
        .cover-footer {
            position: absolute;
            bottom: 20mm;
            left: 20mm;
            right: 20mm;
            border-top: 1px solid #334155;
            padding-top: 5mm;
            display: table;
            width: 100%;
        }
        .cf-item {
            display: table-cell;
            font-size: 9pt;
            color: #64748b;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        .cf-right { text-align: right; }

        /* INTERNAL PAGES */
        .internal-page {
            padding: 30mm 20mm 20mm 20mm; /* Top padding for header space */
        }
        .internal-header {
            position: absolute;
            top: 12mm;
            left: 20mm;
            right: 20mm;
            height: 10mm;
            border-bottom: 1px solid #e2e8f0;
        }
        .ih-logo {
            height: 8mm;
            float: left;
            opacity: 0.5; /* Watermark effect */
        }
        .ih-text {
            float: right;
            font-size: 8pt;
            color: #94a3b8;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-top: 2mm;
        }
        
        .section-header {
            margin-bottom: 10mm;
            position: relative;
        }
        .bg-number {
            position: absolute;
            top: -15mm;
            right: -5mm;
            font-size: 80pt; /* Reduced from 120pt */
            color: #f1f5f9;
            font-weight: bold;
            z-index: 0;
            line-height: 1;
            font-family: 'Arial', sans-serif;
        }
        .section-title {
            font-size: 24pt;
            font-weight: bold;
            color: #0f172a;
            text-transform: uppercase;
            position: relative;
            z-index: 1;
            margin: 0;
            padding-bottom: 5mm;
        }
        .section-bar {
            width: 50px;
            height: 4px;
            background: #2563eb;
            margin-top: 5mm;
        }

        /* CONTENT STYLING */
        .markdown-content {
            font-size: 11pt;
            color: #334155;
            text-align: justify;
            position: relative;
            z-index: 1;
        }
        .markdown-content h3 {
            font-size: 13pt;
            margin-top: 8mm;
            margin-bottom: 3mm;
            color: #0f172a;
            border-left: 3px solid #60a5fa;
            padding-left: 3mm;
        }
        .markdown-content p {
            margin-bottom: 4mm;
        }
        .markdown-content ul {
            margin-bottom: 4mm;
            padding-left: 5mm;
        }
        .markdown-content li {
            margin-bottom: 2mm;
            padding-left: 2mm;
        }

        /* FOOTER */
        .page-footer {
            position: absolute;
            bottom: 10mm;
            left: 20mm;
            right: 20mm;
            text-align: center;
            font-size: 8pt;
            color: #cbd5e1;
            border-top: 1px solid #f1f5f9;
            padding-top: 3mm;
        }

        /* CLOSING PAGE */
        .closing-page {
            background: #0f172a;
            color: #ffffff;
            display: table;
            text-align: center;
        }
        .closing-container {
            display: table-cell;
            vertical-align: middle;
        }
        .closing-title {
            font-size: 40pt;
            font-weight: bold;
            margin-bottom: 5mm;
            letter-spacing: 2px;
        }
        .closing-text {
            font-size: 14pt;
            color: #94a3b8;
            max-width: 70%;
            margin: 0 auto;
        }
    </style>
</head>
<body>
    @php
        $logoPath = public_path('images/logo-dnb.png');
        $hasLogo = file_exists($logoPath);
    @endphp

    <!-- COVER PAGE -->
    <div class="page cover-page">
        <div class="cover-accent"></div>
        <div class="cover-content">
            @if($hasLogo)
                <img src="{{ $logoPath }}" class="cover-logo" alt="DNB Logo">
            @else
                <div class="cover-logo" style="font-size: 24pt; font-weight: bold; color:white;">DNB</div>
            @endif

            <div class="cover-type">Strategic Proposal Document</div>
            <h1 class="cover-title">{{ $proposal->title ?? 'Untitled Project' }}</h1>
            <h2 class="cover-subtitle">Prepared for {{ $proposal->client_name }}</h2>

            <div class="cover-footer">
                <div class="cf-item">Prepared by <strong>Dark and Bright Agency</strong></div>
                <div class="cf-item cf-right">{{ now()->format('F Y') }} / CONFIDENTIAL</div>
            </div>
        </div>
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
            ['id' => 8, 'title' => 'Estimasi Investasi Proyek', 'content' => $proposal->investment ?? $proposal->pricing], /* Fallback to pricing if investment empty */
            ['id' => 9, 'title' => 'Estimasi Dampak & ROI', 'content' => $proposal->roi_impact],
            ['id' => 10, 'title' => 'Nilai Tambah Agensi', 'content' => $proposal->value_add],
            ['id' => 11, 'title' => 'Penutup & Kerja Sama', 'content' => $proposal->closing_cta],
        ];
    @endphp

    @foreach($sections as $section)
    <div class="page internal-page">
        <!-- Header -->
        <div class="internal-header">
            @if($hasLogo)
                <img src="{{ $logoPath }}" class="ih-logo" alt="Logo">
            @endif
            <div class="ih-text">Reference: {{ strtoupper(Str::slug($proposal->client_name)) }}-{{ now()->format('Y') }}</div>
        </div>

        <!-- Section Title with background number -->
        <div class="section-header">
            <div class="bg-number">{{ sprintf('%02d', $section['id']) }}</div>
            <h2 class="section-title">{{ $section['title'] }}</h2>
            <div class="section-bar"></div>
        </div>
        
        <!-- Content -->
        <div class="markdown-content">
            {!! nl2br(e($section['content'])) !!}
        </div>

        <!-- Footer -->
        <div class="page-footer">
            Page {{ $loop->iteration + 1 }} &bull; Dark and Bright Agency &bull; Confidential
        </div>
    </div>
    @endforeach

    <!-- CLOSING PAGE -->
    <div class="page closing-page">
        <div class="closing-container">
            @if($hasLogo)
                <img src="{{ $logoPath }}" style="width: 30mm; opacity: 0.5; margin-bottom: 10mm;" alt="Logo">
            @endif
            <div class="closing-title">LET'S BUILD THIS.</div>
            <p class="closing-text">
                Kami siap membantu transformasi digital bisnis Anda. 
                Hubungi kami untuk langkah selanjutnya.
            </p>
        </div>
    </div>
</body>
</html>

        @page {
            margin: 0;
        }
        body {
            font-family: 'Helvetica', 'Arial', sans-serif;
            margin: 0;
            padding: 0;
            color: #1e293b;
            line-height: 1.5;
        }
        .page {
            width: 210mm;
            height: 297mm;
            position: relative;
            page-break-after: always;
            overflow: hidden;
        }
        .cover-page {
            background-color: #0f172a;
            color: #ffffff;
        }
        .cover-content {
            padding: 25mm;
            position: relative;
            z-index: 10;
        }
        .cover-title {
            font-size: 48pt;
            font-weight: bold;
            text-transform: uppercase;
            margin-top: 50mm;
            line-height: 1;
        }
        .cover-subtitle {
            font-size: 20pt;
            color: #3b82f6;
            margin-top: 10mm;
        }
        .internal-page {
            padding: 30mm 20mm;
            background: #ffffff;
        }
        .bg-number {
            position: absolute;
            top: 25mm;
            right: 15mm;
            font-size: 120pt;
            color: #f1f5f9;
            font-weight: bold;
            z-index: -1;
            opacity: 0.6;
            line-height: 1;
        }
        .section-title {
            font-size: 28pt;
            font-weight: bold;
            color: #0f172a;
            text-transform: uppercase;
            border-bottom: 5px solid #3b82f6;
            padding-bottom: 5mm;
            margin-bottom: 10mm;
        }
        .internal-header {
            position: absolute;
            top: 10mm;
            left: 20mm;
            right: 20mm;
            font-size: 8pt;
            font-weight: bold;
            color: #cbd5e1;
            border-bottom: 1px solid #f1f5f9;
            padding-bottom: 2mm;
            text-transform: uppercase;
        }
        .internal-footer {
            position: absolute;
            bottom: 10mm;
            left: 20mm;
            right: 20mm;
            font-size: 8pt;
            font-weight: bold;
            color: #e2e8f0;
            text-transform: uppercase;
            text-align: center;
        }
        .markdown-content {
            font-size: 11pt;
            color: #334155;
        }
        .markdown-content h3 {
            font-size: 14pt;
            margin-top: 5mm;
            color: #0f172a;
        }
        .markdown-content ul {
            padding-left: 20px;
        }
        .closing-page {
            background-color: #0f172a;
            color: #ffffff;
            text-align: center;
            display: table;
        }
        .closing-content {
            display: table-cell;
            vertical-align: middle;
            padding: 25mm;
        }
        .closing-ty {
            font-size: 60pt;
            font-weight: bold;
            margin-bottom: 10mm;
        }
    </style>
</head>
<body>
    <!-- COVER PAGE -->
    <div class="page cover-page">
        <div class="cover-content">
            <h1 class="cover-title">{{ $proposal->title ?? 'Untitled Proposal' }}</h1>
            <p class="cover-subtitle">Prepared for {{ $proposal->client_name }}</p>
            <div style="margin-top: 100mm; font-size: 10pt; color: rgba(255,255,255,0.5);">
                DNB STRATEGIC DOCUMENT / {{ strtoupper(now()->translatedFormat('d F Y')) }}
            </div>
        </div>
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
            ['id' => 8, 'title' => 'Estimasi Investasi Proyek', 'content' => $proposal->investment],
            ['id' => 9, 'title' => 'Estimasi Dampak & ROI', 'content' => $proposal->roi_impact],
            ['id' => 10, 'title' => 'Nilai Tambah Agensi', 'content' => $proposal->value_add],
            ['id' => 11, 'title' => 'Penutup & Kerja Sama', 'content' => $proposal->closing_cta],
        ];
    @endphp

    @foreach($sections as $section)
    <div class="page internal-page">
        <div class="internal-header">
            DNB AGENCY / STRATEGIC PROPOSAL / SECTION {{ sprintf('%02d', $section['id']) }}
        </div>
        <div class="bg-number">{{ sprintf('%02d', $section['id']) }}</div>
        
        <h2 class="section-title">{{ $section['title'] }}</h2>
        
        <div class="markdown-content">
            {!! nl2br(e($section['content'])) !!}
        </div>

        <div class="internal-footer">
            DNB AGENCY &copy; 2026 / CONFIDENTIAL DOCUMENT
        </div>
    </div>
    @endforeach

    <!-- CLOSING PAGE -->
    <div class="page closing-page">
        <div class="closing-content">
            <div class="closing-ty">THANK YOU.</div>
            <p style="font-size: 16pt; color: rgba(255,255,255,0.7);">
                Kami percaya kerjasama ini akan membawa dampak transformasi digital yang signifikan bagi bisnis anda.
            </p>
        </div>
    </div>
</body>
</html>
