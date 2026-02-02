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
        /* Blue accent bar at bottom */
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
        .closing-table {
            width: 100%;
            height: 100%;
            border: none; /* Fixing table border */
            border-collapse: collapse;
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
