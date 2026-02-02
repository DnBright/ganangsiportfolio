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
            background-color: #f8fafc;
            color: #334155;
        }
        
        /* --- UTILS --- */
        .page-container {
            width: 210mm;
            height: 297mm;
            position: relative;
            page-break-after: always;
            overflow: hidden;
            background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
        }
        .page-container:last-child {
            page-break-after: avoid;
        }
        .text-uppercase { text-transform: uppercase; }
        .text-bold { font-weight: bold; }
        .text-blue { color: #2563eb; }
        .text-dark { color: #0B1120; }
        
        /* --- CARD SYSTEM (ENHANCED) --- */
        .card-floater {
            position: absolute;
            background-color: #ffffff;
            border: 1px solid #e2e8f0;
            box-shadow: 0px 8px 24px rgba(0,0,0,0.08), 0px 2px 8px rgba(0,0,0,0.04);
            border-radius: 2px;
        }

        /* --- COVER PAGE (ENHANCED MODERN DESIGN) --- */
        .cover-page {
            background: linear-gradient(135deg, #0B1120 0%, #1e293b 100%);
            position: relative;
            overflow: hidden;
        }
        
        /* Animated gradient overlay */
        .cover-dark-shape {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 60%;
            background: linear-gradient(165deg, #0B1120 0%, #1e293b 50%, #334155 100%);
            clip-path: polygon(0 0, 100% 0, 100% 75%, 0 95%);
        }
        
        .cover-accent-shape {
            position: absolute;
            top: 0;
            right: 0;
            width: 60%;
            height: 50%;
            background: linear-gradient(135deg, #3b82f6 0%, #2563eb 50%, #1d4ed8 100%);
            clip-path: polygon(40% 0, 100% 0, 100% 100%, 0 0);
            opacity: 0.15;
        }
        
        /* Additional decorative elements */
        .cover-accent-dots {
            position: absolute;
            top: 20mm;
            right: 20mm;
            width: 40mm;
            height: 40mm;
            background-image: radial-gradient(circle, rgba(59, 130, 246, 0.1) 1px, transparent 1px);
            background-size: 4mm 4mm;
        }
        
        .cover-content-card {
            position: absolute;
            bottom: 30mm;
            left: 15mm;
            right: 15mm;
            height: 35%;
            background: #ffffff;
            padding: 15mm;
            border-top: 5px solid #3b82f6;
            box-shadow: 0 20px 40px rgba(0,0,0,0.2), 0 8px 16px rgba(0,0,0,0.1);
            border-radius: 3px;
            position: relative;
        }
        
        /* Subtle inner shadow for depth */
        .cover-content-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 1px;
            background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.3), transparent);
        }
        
        .cover-logo-wrapper {
            position: absolute;
            top: 30mm;
            left: 20mm;
            z-index: 10;
            filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));
        }
        
        .cover-title {
            font-size: 32pt;
            font-weight: bold;
            color: #0B1120;
            margin-bottom: 5mm;
            line-height: 1.1;
            letter-spacing: -0.5px;
        }
        
        .cover-client {
            font-size: 14pt;
            color: #64748b;
            margin-bottom: 10mm;
            font-weight: 500;
        }
        
        /* --- LAYOUT A: SIDEBAR CARD (ENHANCED) --- */
        .layout-a-card {
            top: 25mm;
            left: 15mm;
            right: 15mm;
            bottom: 25mm;
            border-left: 5px solid #3b82f6;
            position: relative;
            overflow: hidden;
        }
        
        /* Gradient accent on card edge */
        .layout-a-card::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            width: 5px;
            height: 30%;
            background: linear-gradient(180deg, #3b82f6, #2563eb);
        }
        
        .layout-a-sidebar {
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            width: 50mm;
            background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
            border-right: 1px solid #e2e8f0;
            padding: 10mm;
            text-align: center;
        }
        
        .layout-a-main {
            position: absolute;
            top: 0;
            left: 50mm;
            right: 0;
            bottom: 0;
            padding: 15mm;
            background: #ffffff;
        }
        
        .layout-a-number {
            font-size: 40pt;
            font-weight: bold;
            background: linear-gradient(135deg, #cbd5e1, #94a3b8);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 5mm;
            display: block;
        }
        
        .layout-a-icon {
            width: 20mm;
            height: 20mm;
            background: linear-gradient(135deg, #e0e7ff, #dbeafe);
            border-radius: 50%;
            margin: 0 auto 10mm auto;
            display: block;
            position: relative;
            box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
        }
        
        /* Icon inner decoration */
        .layout-a-icon::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 8mm;
            height: 8mm;
            background: #3b82f6;
            border-radius: 50%;
            opacity: 0.3;
        }
        
        .layout-a-title {
            font-size: 12pt;
            font-weight: bold;
            color: #0B1120;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        /* --- LAYOUT B: TOP HEADER CARD (ENHANCED) --- */
        .layout-b-card {
            top: 30mm;
            left: 15mm;
            right: 15mm;
            bottom: 30mm;
            overflow: hidden;
        }
        
        .layout-b-header-bar {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 25mm;
            background: linear-gradient(135deg, #0B1120 0%, #1e293b 100%);
            color: #ffffff;
            padding: 0 10mm;
            display: table;
            position: relative;
            overflow: hidden;
        }
        
        /* Decorative pattern overlay */
        .layout-b-header-bar::before {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            width: 50%;
            height: 100%;
            background-image: 
                linear-gradient(45deg, rgba(59, 130, 246, 0.05) 25%, transparent 25%),
                linear-gradient(-45deg, rgba(59, 130, 246, 0.05) 25%, transparent 25%);
            background-size: 8mm 8mm;
            background-position: 0 0, 4mm 4mm;
        }
        
        .layout-b-header-content {
            display: table-cell;
            vertical-align: middle;
            position: relative;
            z-index: 1;
        }
        
        .layout-b-main {
            position: absolute;
            top: 25mm;
            left: 0;
            right: 0;
            bottom: 0;
            padding: 15mm;
            background: #ffffff;
        }
        
        .layout-b-title {
            font-size: 16pt;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        .layout-b-number {
            font-size: 16pt;
            font-weight: bold;
            color: #60a5fa;
            float: right;
            text-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }

        /* --- CONTENT TYPOGRAPHY (ENHANCED) --- */
        .content-body {
            font-size: 10.5pt;
            line-height: 1.6;
            color: #475569;
            text-align: justify;
        }
        
        .content-body h3 {
            font-size: 12pt;
            font-weight: bold;
            color: #0B1120;
            margin-top: 5mm;
            margin-bottom: 2mm;
            text-transform: uppercase;
            border-bottom: 2px solid #3b82f6;
            padding-bottom: 1mm;
            display: inline-block;
            letter-spacing: 0.5px;
            position: relative;
        }
        
        /* Animated underline effect */
        .content-body h3::after {
            content: '';
            position: absolute;
            bottom: -2px;
            left: 0;
            width: 30%;
            height: 2px;
            background: linear-gradient(90deg, #3b82f6, transparent);
        }
        
        .content-body p {
            margin-bottom: 3mm;
        }
        
        .content-body ul {
            margin-bottom: 3mm;
            padding-left: 5mm;
        }
        
        .content-body li {
            margin-bottom: 1mm;
            position: relative;
            padding-left: 2mm;
        }
        
        /* Custom bullet points */
        .content-body li::marker {
            color: #3b82f6;
        }

        /* --- DECOR (ENHANCED) --- */
        .decor-line-top {
            position: absolute;
            top: 10mm;
            left: 15mm;
            width: 30mm;
            height: 1mm;
            background: linear-gradient(90deg, #3b82f6, #60a5fa);
            box-shadow: 0 2px 4px rgba(59, 130, 246, 0.3);
        }
        
        .decor-page-num {
            position: absolute;
            top: 10mm;
            right: 15mm;
            font-size: 9pt;
            font-weight: bold;
            color: #94a3b8;
            letter-spacing: 1px;
        }

        /* --- CLOSING PAGE (ENHANCED) --- */
        .closing-bg {
            background: linear-gradient(135deg, #0B1120 0%, #1e293b 50%, #334155 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            overflow: hidden;
        }
        
        /* Animated background pattern */
        .closing-bg::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-image: radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                              radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%);
        }
        
        .closing-card {
            width: 80%;
            height: 40%;
            background: #ffffff;
            color: #0B1120;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            text-align: center;
            padding-top: 20mm;
            box-shadow: 0 30px 60px rgba(0,0,0,0.3), 0 10px 20px rgba(0,0,0,0.2);
            border-bottom: 10px solid #3b82f6;
            border-radius: 4px;
            position: relative;
            z-index: 1;
        }
        
        /* Subtle gradient overlay on closing card */
        .closing-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 50%;
            background: linear-gradient(180deg, rgba(248, 250, 252, 0.5), transparent);
            pointer-events: none;
        }

        /* Table styling enhancement */
        table {
            border-collapse: collapse;
        }
        
        table td {
            padding: 2mm 0;
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
        <div class="cover-accent-dots"></div>
        
        <div class="cover-logo-wrapper">
             @if($logoBase64)
                <img src="{{ $logoBase64 }}" style="height: 20mm;">
            @else
                <div style="font-size: 24pt; font-weight: bold; color: #fff; letter-spacing: 2px;">DNB AGENCY</div>
            @endif
        </div>

        <div class="cover-content-card">
            <div style="font-size: 10pt; color: #3b82f6; font-weight: bold; letter-spacing: 2px; margin-bottom: 5mm;">PROPOSAL PROYEK</div>
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
                        <div class="layout-a-icon"></div>
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
    <div class="page-container closing-bg">
        <div class="closing-card">
             @if($logoBase64)
                <img src="{{ $logoBase64 }}" style="height: 15mm; margin-bottom: 10mm;">
            @endif
            <div style="font-size: 30pt; font-weight: bold; margin-bottom: 5mm; letter-spacing: 1px;">THANK YOU</div>
            <div style="font-size: 12pt; color: #64748b; margin-bottom: 15mm; font-weight: 500;">
                We look forward to working with you.
            </div>
            
            <div style="border-top: 1px solid #e2e8f0; padding-top: 10mm; display: inline-block; width: 60%;">
                <div style="font-weight: bold; color: #3b82f6; font-size: 11pt;">Dark and Bright Agency</div>
                <div style="color: #94a3b8; font-size: 10pt; margin-top: 2mm;">admin.thedarkandbright.com</div>
            </div>
        </div>
    </div>

</body>
</html>