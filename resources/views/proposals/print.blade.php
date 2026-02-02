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
            background-color: #f1f5f9; /* Slate 100 Background */
            color: #334155; /* Slate 700 Text */
        }
        
        /* --- UTILS --- */
        .page-container {
            width: 210mm;
            height: 297mm;
            position: relative;
            page-break-after: always;
            overflow: hidden;
            background: #f1f5f9; /* Consistent Page BG */
        }
        .page-container:last-child {
            page-break-after: avoid;
        }
        .text-uppercase { text-transform: uppercase; }
        .text-bold { font-weight: bold; }
        .text-blue { color: #2563eb; }
        .text-dark { color: #0B1120; }
        
        /* --- CARD SYSTEM (THE CORE) --- */
        .card-floater {
            position: absolute;
            background-color: #ffffff;
            /* Shadow simulation via border */
            border: 1px solid #e2e8f0;
            box-shadow: 0px 4px 10px rgba(0,0,0,0.05); 
        }

        /* --- COVER PAGE (ANGLED DARK) --- */
        .cover-page {
            background-color: #ffffff;
        }
        .cover-dark-shape {
            position: absolute; top: 0; left: 0; width: 100%; height: 60%;
            background-color: #0B1120;
            clip-path: polygon(0 0, 100% 0, 100% 80%, 0 100%);
        }
        .cover-accent-shape {
            position: absolute; top: 0; right: 0; width: 60%; height: 50%;
            background-color: #2563eb;
            clip-path: polygon(40% 0, 100% 0, 100% 100%, 0 0);
            opacity: 0.9;
        }
        
        .cover-content-card {
            position: absolute; bottom: 30mm; left: 15mm; right: 15mm; height: 35%;
            background: #ffffff;
            padding: 15mm;
            border-top: 5px solid #38bdf8;
            box-shadow: 0 10px 20px rgba(0,0,0,0.1);
        }
        
        .cover-logo-wrapper {
            position: absolute; top: 30mm; left: 20mm; z-index: 10;
        }
        
        .cover-title {
            font-size: 32pt; font-weight: bold; color: #0B1120;
            margin-bottom: 5mm; line-height: 1.1;
        }
        .cover-client {
            font-size: 14pt; color: #64748b; margin-bottom: 10mm;
        }
        
        /* --- LAYOUT A: SIDEBAR CARD (ODD SECTIONS) --- */
        .layout-a-card {
            top: 25mm; left: 15mm; right: 15mm; bottom: 25mm;
            border-left: 5px solid #2563eb;
        }
        
        .layout-a-sidebar {
            position: absolute; top: 0; left: 0; bottom: 0; width: 50mm;
            background-color: #f8fafc;
            border-right: 1px solid #f1f5f9;
            padding: 10mm;
            text-align: center;
        }
        .layout-a-main {
            position: absolute; top: 0; left: 50mm; right: 0; bottom: 0;
            padding: 15mm;
        }
        
        .layout-a-number {
            font-size: 40pt; font-weight: bold; color: #cbd5e1;
            margin-bottom: 5mm; display: block;
        }
        .layout-a-icon {
            width: 20mm; height: 20mm; background: #e2e8f0; border-radius: 50%;
            margin: 0 auto 10mm auto; display: block;
        }
        .layout-a-title {
            font-size: 12pt; font-weight: bold; color: #0B1120; text-transform: uppercase;
        }

        /* --- LAYOUT B: TOP HEADER CARD (EVEN SECTIONS) --- */
        .layout-b-card {
            top: 30mm; left: 15mm; right: 15mm; bottom: 30mm;
            overflow: hidden;
        }
        
        .layout-b-header-bar {
            position: absolute; top: 0; left: 0; width: 100%; height: 25mm;
            background-color: #0B1120;
            color: #ffffff;
            padding: 0 10mm;
            display: table; /* For vertical align */
        }
        .layout-b-header-content {
            display: table-cell; vertical-align: middle;
        }
        
        .layout-b-main {
            position: absolute; top: 25mm; left: 0; right: 0; bottom: 0;
            padding: 15mm;
        }
        
        .layout-b-title {
            font-size: 16pt; font-weight: bold; text-transform: uppercase;
        }
        .layout-b-number {
             font-size: 16pt; font-weight: bold; color: #38bdf8; float: right;
        }

        /* --- CONTENT TYPOGRAPHY --- */
        .content-body {
            font-size: 10.5pt; line-height: 1.6; color: #475569; text-align: justify;
        }
        .content-body h3 {
            font-size: 12pt; font-weight: bold; color: #0B1120;
            margin-top: 5mm; margin-bottom: 2mm;
            text-transform: uppercase;
            border-bottom: 2px solid #e2e8f0; padding-bottom: 1mm;
            display: inline-block;
        }
        .content-body p { margin-bottom: 3mm; }
        .content-body ul { margin-bottom: 3mm; padding-left: 5mm; }
        .content-body li { margin-bottom: 1mm; }

        /* --- DECOR --- */
        .decor-line-top {
            position: absolute; top: 10mm; left: 15mm; width: 30mm; height: 1mm; background: #2563eb;
        }
        .decor-page-num {
            position: absolute; top: 10mm; right: 15mm; font-size: 9pt; font-weight: bold; color: #94a3b8;
        }

        /* --- CLOSING --- */
        .closing-bg {
             background-color: #0B1120; color: #fff;
             display: flex; align-items: center; justify-content: center;
        }
        .closing-card {
            width: 80%; height: 40%; background: #ffffff; color: #0B1120;
            position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
            text-align: center; padding-top: 20mm;
            box-shadow: 0 20px 40px rgba(0,0,0,0.3);
            border-bottom: 10px solid #2563eb;
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
        <div class="cover-dark-shape"></div>
        <div class="cover-accent-shape"></div>
        
        <div class="cover-logo-wrapper">
             @if($logoBase64)
                <img src="{{ $logoBase64 }}" style="height: 20mm;">
            @else
                <div style="font-size: 24pt; font-weight: bold; color: #fff;">DNB AGENCY</div>
            @endif
        </div>

        <div class="cover-content-card">
            <div style="font-size: 10pt; color: #2563eb; font-weight: bold; letter-spacing: 2px; margin-bottom: 5mm;">PROPOSAL PROYEK</div>
            <div class="cover-title">{{ $proposal->title ?? 'DIGITAL MASTERPLAN' }}</div>
            <div class="cover-client">Prepared specifically for {{ $proposal->client_name }}</div>
            
            <table style="width: 100%; border-top: 1px solid #e2e8f0; margin-top: 10mm; padding-top: 5mm;">
                <tr>
                    <td style="font-size: 9pt; color: #94a3b8;">DATE</td>
                    <td style="font-size: 9pt; color: #94a3b8; text-align: right;">VALID UNTIL</td>
                </tr>
                <tr>
                    <td style="font-size: 11pt; font-weight: bold; color: #334155;">{{ now()->format('d M Y') }}</td>
                    <td style="font-size: 11pt; font-weight: bold; color: #334155; text-align: right;">{{ now()->addDays(30)->format('d M Y') }}</td>
                </tr>
            </table>
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
        @if($loop->iteration % 2 != 0)
            <!-- LAYOUT A: SIDEBAR CARD -->
            <div class="page-container">
                <div class="decor-line-top"></div>
                <div class="decor-page-num">PAGE {{ sprintf('%02d', $loop->iteration + 1) }}</div>
                
                <div class="card-floater layout-a-card">
                    <div class="layout-a-sidebar">
                        <div class="layout-a-number">{{ sprintf('%02d', $section['id']) }}</div>
                        <div style="width: 30px; height: 3px; background: #2563eb; margin: 0 auto 10px auto;"></div>
                        <div class="layout-a-title">{{ $section['title'] }}</div>
                    </div>
                    
                    <div class="layout-a-main">
                        <div class="content-body">
                             {!! $section['content'] !!}
                        </div>
                    </div>
                </div>
            </div>
        @else
            <!-- LAYOUT B: TOP HEADER CARD -->
            <div class="page-container">
                <div class="decor-line-top" style="left: auto; right: 15mm;"></div>
                <div class="decor-page-num" style="right: auto; left: 15mm;">PAGE {{ sprintf('%02d', $loop->iteration + 1) }}</div>
                
                <div class="card-floater layout-b-card">
                    <div class="layout-b-header-bar">
                        <div class="layout-b-header-content">
                            <span class="layout-b-title">{{ $section['title'] }}</span>
                            <span class="layout-b-number">SECTION {{ sprintf('%02d', $section['id']) }}</span>
                        </div>
                    </div>
                    
                    <div class="layout-b-main">
                        <div class="content-body">
                             {!! $section['content'] !!}
                        </div>
                    </div>
                </div>
            </div>
        @endif
    @endforeach

    <!-- 3. CLOSING PAGE -->
    <div class="page-container" style="background: #0B1120;">
        <div class="closing-card">
             @if($logoBase64)
                <img src="{{ $logoBase64 }}" style="height: 15mm; margin-bottom: 10mm; filter: invert(0);"> <!-- Logo adjustment if needed -->
            @endif
            <div style="font-size: 30pt; font-weight: bold; margin-bottom: 5mm;">THANK YOU</div>
            <div style="font-size: 12pt; color: #64748b; margin-bottom: 15mm;">
                We look forward to working with you.
            </div>
            
            <div style="border-top: 1px solid #e2e8f0; padding-top: 10mm; display: inline-block; width: 60%;">
                <div style="font-weight: bold; color: #2563eb;">Dark and Bright Agency</div>
                <div style="color: #94a3b8; font-size: 10pt;">admin.thedarkandbright.com</div>
            </div>
        </div>
    </div>

</body>
</html>
