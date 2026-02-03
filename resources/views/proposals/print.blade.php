<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>{{ $proposal->title ?? 'Proposal' }}</title>
    <style>
        /* CRITICAL: Box Model & Reset */
        * { box-sizing: border-box; }
        
        @page {
            margin: 0px;
            size: A4 portrait;
        }
        
        body {
            font-family: 'Helvetica', 'Arial', sans-serif;
            margin: 0px;
            padding: 0px;
            background-color: #f8fafc; /* Ultra Light Slate */
            color: #334155; /* Slate 700 */
        }
        
        /* --- UTILS --- */
        .page-container {
            width: 210mm;
            height: 297mm;
            position: relative;
            page-break-after: always;
            overflow: hidden;
            background: #ffffff; /* White Base for Clean Look */
        }
        .page-container:last-child {
            page-break-after: avoid;
        }
        
        /* --- COLORS (DNB EXACT MATCH) --- */
        .text-blue { color: #2563eb; } /* Royal Blue replacement for Red */
        .text-dark { color: #0B1120; } /* Deep Black */
        .bg-blue { background-color: #2563eb; }
        .bg-dark { background-color: #0B1120; }
        
        /* --- COVER PAGE (PREMIUM ANGLED) --- */
        .cover-page {
            background-color: #ffffff;
        }
        .cover-top-shape {
            position: absolute; top: 0; left: 0; right: 0; height: 35%;
            background-color: #0B1120;
            clip-path: polygon(0 0, 100% 0, 100% 70%, 0 100%);
        }
        .cover-accent-block {
            position: absolute; top: 0; right: 10mm; width: 40mm; height: 50mm;
            background-color: #2563eb;
            color: #ffffff;
            text-align: center;
            padding-top: 15mm;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }
        
        .cover-content {
            position: absolute; top: 40%; left: 20mm; right: 20mm;
        }
        .cover-title-label {
            font-size: 14pt; font-weight: bold; color: #2563eb; text-transform: uppercase;
            letter-spacing: 2px; margin-bottom: 5mm;
            border-left: 4px solid #2563eb; padding-left: 4mm;
        }
        .cover-title {
            font-size: 42pt; font-weight: bold; color: #0B1120; line-height: 1;
            margin-bottom: 10mm;
        }
        
        .cover-image-placeholder {
            margin-top: 10mm;
            width: 100%; height: 60mm;
            background-color: #f1f5f9;
            border: 1px dashed #cbd5e1;
            display: flex; align-items: center; justify-content: center;
            color: #94a3b8; font-size: 10pt;
        }

        .cover-footer {
            position: absolute; bottom: 15mm; left: 20mm; right: 20mm;
            border-top: 1px solid #e2e8f0; padding-top: 5mm;
            font-size: 9pt; color: #64748b;
        }

        /* --- LAYOUT 1: MAGAZINE (Text-Heavy: Intro) --- */
        .layout-magazine-header {
            position: absolute; top: 0; left: 0; width: 100%; height: 25mm;
            border-bottom: 1px solid #e2e8f0;
            /* Removed display: table to fix "Frame not found in cellmap" error */
        }
        .layout-magazine-title {
            position: absolute; top: 8mm; left: 20mm;
            font-size: 12pt; font-weight: bold; color: #0B1120; text-transform: uppercase;
            border-bottom: 3px solid #2563eb; 
        }
        .layout-magazine-meta {
            position: absolute; top: 9mm; right: 20mm;
            text-align: right; color: #cbd5e1; font-size: 9pt;
        }
        
        .layout-magazine-content {
            position: absolute; top: 35mm; left: 20mm; right: 20mm; bottom: 25mm;
        }
        .magazine-columns {
            /* SIMULATING COLUMNS VISUALLY SINCE DOMPDF COLUMN SUPPORT IS FLAKY */
            /* We stick to single column for safety, but with "narrower" feel */
            width: 100%; 
        }
        .magazine-intro-box {
            background-color: #0B1120; color: #ffffff;
            padding: 10mm; margin-bottom: 10mm;
            border-left: 5px solid #2563eb;
        }

        /* --- LAYOUT 2: GRID CARD (Service/Solusi) --- */
        .layout-grid-header {
            position: absolute; top: 20mm; left: 20mm; right: 20mm;
            text-align: center; border-bottom: 1px solid #e2e8f0; padding-bottom: 5mm;
        }
        .layout-grid-title {
            font-size: 20pt; font-weight: bold; color: #0B1120; text-transform: uppercase; margin-bottom: 2mm;
        }
        .layout-grid-subtitle {
            font-size: 10pt; color: #2563eb; letter-spacing: 2px; text-transform: uppercase;
        }
        
        .layout-grid-content {
            position: absolute; top: 45mm; left: 20mm; right: 20mm; bottom: 25mm;
            background-color: #0B1120 !important;
            border-radius: 12mm;
            padding: 15mm 12mm;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }
        .layout-grid-content,
        .layout-grid-content * {
            color: #ffffff !important;
            opacity: 1 !important;
            visibility: visible !important;
            fill: #ffffff !important;
        }
        .layout-grid-content h3 {
            border-left: 3px solid #ffffff !important;
            padding-left: 3mm;
        }
        .layout-grid-content ul {
            list-style-type: square !important;
            color: #ffffff !important;
        }

        /* --- LAYOUT 3: SIDEBAR DATA (Financials) --- */
        .layout-sidebar-left {
            position: absolute; top: 0; bottom: 0; left: 0; width: 60mm;
            background-color: #2563eb; color: #ffffff;
            padding: 20mm 10mm;
        }
        .layout-sidebar-title {
            font-size: 24pt; font-weight: bold; margin-bottom: 5mm; line-height: 1.1;
        }
        .layout-sidebar-desc {
            font-size: 10pt; opacity: 0.9; line-height: 1.5;
        }
        .layout-sidebar-right {
             position: absolute; top: 0; bottom: 0; right: 0; width: 150mm;
             padding: 20mm;
        }

        /* --- TYPOGRAPHY UTILS --- */
        .content-body {
            font-size: 10.5pt; color: #475569;
        }
        .content-body p {
            margin-top: 0;
            margin-bottom: 4mm;
            line-height: 1.6;
            text-align: justify;
        }
        .content-body h3 {
            font-size: 12pt; font-weight: bold; color: #0B1120;
            margin-top: 6mm; margin-bottom: 3mm;
            text-transform: uppercase;
            border-left: 3px solid #2563eb;
            padding-left: 3mm;
        }
        .content-body ul { padding-left: 8mm; margin-bottom: 5mm; list-style-type: square; }
        .content-body li { margin-bottom: 2mm; line-height: 1.5; text-align: justify; }
        .content-body strong { color: #1e293b; }

        /* Table Styling for Financials */
        .data-table { width: 100%; border-collapse: collapse; margin-top: 5mm; }
        .data-table th { background: #f1f5f9; color: #0B1120; padding: 3mm; text-align: left; font-size: 9pt; text-transform: uppercase; }
        .data-table td { border-bottom: 1px solid #e2e8f0; padding: 3mm; font-size: 10pt; color: #334155; }
        .data-table tr:last-child td { border-bottom: 2px solid #2563eb; }

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
        <div class="cover-top-shape"></div>
        <div class="cover-accent-block">
            <div style="font-size: 10pt; text-transform: uppercase;">Proposal</div>
            <div style="font-size: 24pt; font-weight: bold;">{{ date('Y') }}</div>
        </div>
        
        <div class="cover-content">
             @if($logoBase64)
                <img src="{{ $logoBase64 }}" style="height: 15mm; margin-bottom: 10mm; background: #fff; padding: 2mm; border-radius: 2px;">
            @endif
            
            <div class="cover-title-label">Project Proposal</div>
            <div class="cover-title">{{ $proposal->title ?? 'DIGITAL TRANSFORMATION' }}</div>
            
            <div style="margin-top: 10mm; border-left: 1px solid #cbd5e1; padding-left: 5mm;">
                <div style="font-size: 9pt; color: #64748b; text-transform: uppercase;">Prepared For</div>
                <div style="font-size: 16pt; font-weight: bold; color: #334155;">{{ $proposal->client_name }}</div>
            </div>
        </div>

        <div class="cover-footer">
            <table width="100%">
                <tr>
                    <td align="left">CONFIDENTIAL</td>
                    <td align="right">admin.thedarkandbright.com</td>
                </tr>
            </table>
        </div>
    </div>

    @php
        $sections = [
            ['id' => 1, 'title' => 'Ringkasan Eksekutif', 'content' => $proposal->executive_summary, 'type' => 'magazine'],
            ['id' => 2, 'title' => 'Latar Belakang & Masalah', 'content' => $proposal->problem_analysis, 'type' => 'magazine'],
            ['id' => 3, 'title' => 'Tujuan Proyek', 'content' => $proposal->project_objectives, 'type' => 'magazine'],
            
            ['id' => 4, 'title' => 'Solusi Utama', 'content' => $proposal->solutions, 'type' => 'grid'],
            ['id' => 5, 'title' => 'Ruang Lingkup (Deliverables)', 'content' => $proposal->scope_of_work, 'type' => 'grid'],
            ['id' => 6, 'title' => 'Alur Sistem & Cara Kerja', 'content' => $proposal->system_walkthrough, 'type' => 'grid'],
            
            ['id' => 7, 'title' => 'Timeline Implementasi', 'content' => $proposal->timeline, 'type' => 'sidebar'],
            ['id' => 8, 'title' => 'Estimasi Investasi Proyek', 'content' => $proposal->investment ?? $proposal->pricing, 'type' => 'sidebar'],
            ['id' => 9, 'title' => 'Estimasi Dampak & ROI', 'content' => $proposal->roi_impact, 'type' => 'sidebar'],
            
            ['id' => 10, 'title' => 'Nilai Tambah Agensi', 'content' => $proposal->value_add, 'type' => 'magazine'],
            ['id' => 11, 'title' => 'Penutup & Kerja Sama', 'content' => $proposal->closing_cta, 'type' => 'cover'],
        ];
    @endphp

    @foreach($sections as $section)
        <div class="page-container">
            
            @if($section['type'] == 'magazine')
                <!-- LAYOUT 1: MAGAZINE -->
                <div class="layout-magazine-header">
                    <div class="layout-magazine-title">{{ $section['title'] }}</div>
                     <div class="layout-magazine-meta">
                        SECTION {{ sprintf('%02d', $section['id']) }}
                    </div>
                </div>
                
                <div class="layout-magazine-content">
                    @if($section['id'] == 1)
                        <div class="magazine-intro-box">
                            <div style="font-weight: bold; font-size: 14pt; margin-bottom: 2mm;">EXECUTIVE SUMMARY</div>
                            <div style="opacity: 0.8; font-size: 10pt;">Ringkasan tingkat tinggi solusi untuk {{ $proposal->client_name }}.</div>
                        </div>
                    @endif
                    
                    <div class="magazine-columns content-body">
                         {!! $section['content'] !!}
                    </div>
                </div>
                
                <div style="position: absolute; bottom: 10mm; left: 0; width: 100%; text-align: center; color: #e2e8f0; font-size: 9pt;">
                    {{ $loop->iteration + 1 }}
                </div>

            @elseif($section['type'] == 'grid')
                <!-- LAYOUT 2: GRID CARD -->
                <div class="layout-grid-header">
                    <div class="layout-grid-subtitle">Our Solution Phase</div>
                    <div class="layout-grid-title">{{ $section['title'] }}</div>
                </div>
                
                <div class="layout-grid-content">
                    <div class="content-body">
                         {!! $section['content'] !!}
                    </div>
                </div>
                 <div style="position: absolute; bottom: 10mm; right: 20mm; color: #cbd5e1; font-size: 9pt; font-weight: bold;">
                    PAGE {{ $loop->iteration + 1 }}
                </div>

            @elseif($section['type'] == 'sidebar')
                <!-- LAYOUT 3: SIDEBAR -->
                <div class="layout-sidebar-left">
                    <div style="font-size: 60pt; font-weight: bold; opacity: 0.2; line-height: 1;">{{ sprintf('%02d', $section['id']) }}</div>
                    <div class="layout-sidebar-title">{{ $section['title'] }}</div>
                    <div style="width: 20mm; height: 1px; background: #fff; margin: 5mm 0;"></div>
                    <div class="layout-sidebar-desc">
                        Detail data, angka, dan timeline untuk transparansi proyek.
                    </div>
                </div>
                
                <div class="layout-sidebar-right">
                    <div class="content-body" style="width: 100%;">
                        <!-- Hack to style tables if present -->
                        <style>
                            .layout-sidebar-right table { width: 100%; border-collapse: collapse; }
                            .layout-sidebar-right th { background: #f1f5f9; padding: 5px; text-align: left; }
                            .layout-sidebar-right td { border-bottom: 1px solid #e2e8f0; padding: 5px; }
                        </style>
                        {!! $section['content'] !!}
                    </div>
                </div>
                
            @elseif($section['type'] == 'cover')
                 <!-- LAYOUT 4: CLOSING (Same as Cover but simpler) -->
                 <div style="position: absolute; top:0; left:0; width:100%; height:100%; bg-color: #0B1120; display:flex; align-items:center; justify-content:center; background: #0B1120; text-align: center; color: #fff;">
                     <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 80%;">
                         @if($logoBase64)
                            <img src="{{ $logoBase64 }}" style="height: 20mm; margin-bottom: 10mm;">
                        @endif
                         <div style="font-size: 30pt; font-weight: bold; margin-bottom: 5mm;">LET'S START</div>
                         <div style="font-size: 14pt; color: #94a3b8; margin-bottom: 20mm;">
                             Hubungi kami untuk memulai transformasi.<br>
                             admin.thedarkandbright.com
                         </div>
                         
                         <div class="content-body" style="text-align: left; background: #1e293b; padding: 10mm; border-radius: 4px; color: #cbd5e1;">
                             {!! $section['content'] !!}
                         </div>
                     </div>
                 </div>
            @endif
            
        </div>
    @endforeach

</body>
</html>
