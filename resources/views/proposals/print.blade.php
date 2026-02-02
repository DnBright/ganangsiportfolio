<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>{{ $proposal->title ?? 'Proposal' }}</title>
    <style>
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
