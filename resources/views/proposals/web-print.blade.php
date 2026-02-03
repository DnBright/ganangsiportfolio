<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $proposal->title ?? 'Proposal' }} - Print View</title>
    <!-- Tailwind via CDN for Modern Styling -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
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
            /* Force heights to match A4 exact mm */
            .page-container {
                height: 297mm !important;
                width: 210mm !important;
            }
        }
        
        /* --- BASE STYLES --- */
        body {
            font-family: 'Inter', sans-serif;
            background-color: #334155; /* Dark background for screen viewing */
            margin: 0;
            padding: 20px;
        }
        
        /* --- A4 CONTAINER SIMULATION --- */
        .page-container {
            width: 210mm;
            height: 296mm; /* -1mm safety */ 
            background: white;
            margin: 0 auto 30px auto;
            position: relative;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5); /* Screen Shadow */
        }

        /* --- MODERN DESIGN ELEMENTS (Unlimited CSS3) --- */
        .glass-panel {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            box-shadow: 0 20px 40px -5px rgba(0, 0, 0, 0.1);
        }
        
        .gradient-text {
            background: linear-gradient(135deg, #1e293b 0%, #3b82f6 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        /* --- TYPOGRAPHY --- */
        .font-heading { font-weight: 800; letter-spacing: -0.5px; }
        
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

    <!-- FLOATING ACTION BUTTON -->
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
            <a href="{{ url()->previous() }}" class="cursor-pointer bg-slate-800 hover:bg-slate-900 text-white font-bold py-3 px-6 rounded-full shadow-2xl transform transition hover:scale-105 border-2 border-white/10">
                Back
            </a>
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

    <!-- 1. COVER PAGE (Modern CSS3) -->
    <div class="page-container page-break relative bg-slate-900 overflow-hidden">
        <!-- Background Graphics (Creative & Dynamic) -->
        <div class="absolute top-0 right-0 w-[80%] h-full bg-blue-600/20 transform skew-x-12 translate-x-32"></div>
        <div class="absolute bottom-0 left-0 w-[60%] h-[70%] bg-indigo-900/40 rounded-full blur-[120px] -translate-x-32 translate-y-32"></div>
        <div class="absolute top-20 right-20 w-64 h-64 bg-cyan-400/20 rounded-full blur-[80px]"></div>
        
        <!-- Shape Accents -->
        <div class="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-cyan-400 to-indigo-600"></div>
        <div class="absolute bottom-0 right-0 w-full h-2 bg-gradient-to-r from-indigo-600 via-cyan-400 to-blue-500"></div>

        <!-- Content -->
        <div class="relative z-10 h-full flex flex-col justify-center px-16">
            <!-- White Logo Config -->
            @if($logoBase64)
                 <div class="mb-12">
                     <img src="{{ $logoBase64 }}" style="height: 35mm; filter: brightness(0) invert(1);" alt="DNB Logo">
                 </div>
            @else
                <div class="text-white text-4xl font-bold mb-12 tracking-tighter">DNB AGENCY</div>
            @endif

            <div class="glass-panel p-12 rounded-2xl max-w-3xl border-l-[6px] border-cyan-400 bg-white/10 backdrop-blur-xl">
                <div class="flex items-center gap-3 mb-6">
                    <div class="h-[1px] w-12 bg-cyan-400"></div>
                    <div class="text-cyan-400 font-bold tracking-[0.3em] text-sm uppercase">Strategic Proposal</div>
                </div>
                
                <h1 class="text-7xl font-heading text-white leading-tight mb-8 drop-shadow-lg">
                    {{ $proposal->title ?? 'DIGITAL TRANSFORMATION' }}
                </h1>
                
                <div class="mt-8">
                    <p class="text-slate-400 text-sm uppercase tracking-wider mb-2">Prepared Exclusively For</p>
                    <p class="text-4xl font-bold text-white tracking-wide border-b-2 border-white/20 pb-2 inline-block">
                        {{ $proposal->client_name }}
                    </p>
                </div>
            </div>
            
            <div class="absolute bottom-12 left-16 right-16 flex justify-between items-end border-t border-white/10 pt-6">
                 <div class="text-slate-400 text-xs tracking-widest uppercase">
                    Strictly Confidential &bull; {{ date('Y') }}
                </div>
                <div class="text-right">
                    <div class="text-white font-bold tracking-widest">THE DARK AND BRIGHT</div>
                    <div class="text-cyan-400 text-xs tracking-wider">admin.thedarkandbright.com</div>
                </div>
            </div>
        </div>
    </div>

    @foreach($sections as $section)
        <div class="page-container page-break relative bg-slate-50">
            
            @if($section['type'] == 'magazine')
                <!-- TYPE: MAGAZINE (Multi-Column) -->
                <div class="h-24 bg-white border-b border-slate-200 flex items-center px-12 justify-between">
                    <h2 class="text-xl font-bold text-slate-900 uppercase tracking-tight border-b-4 border-blue-600 pb-1">
                        {{ $section['title'] }}
                    </h2>
                    <span class="text-slate-400 font-mono">0{{ $section['id'] }}</span>
                </div>
                
                <div class="p-12 h-[calc(100%-6rem)] relative">
                    <!-- Intro Box for first section -->
                    @if($section['id'] == 1)
                        <div class="bg-slate-900 text-white p-8 rounded-lg mb-8 shadow-xl border-l-8 border-blue-500">
                            <h3 class="font-bold text-lg mb-2">EXECUTIVE SUMMARY</h3>
                            <p class="text-slate-300 text-sm leading-relaxed">
                                Overview strategis solusi digital untuk {{ $proposal->client_name }}.
                            </p>
                        </div>
                    @endif
                    
                    <!-- CSS Columns -->
                    <div class="prose prose-slate max-w-none" style="column-count: 2; column-gap: 3rem; text-align: justify;">
                        {!! $section['content'] !!}
                    </div>
                </div>

            @elseif($section['type'] == 'grid')
                <!-- TYPE: GRID (Wide Card) -->
                <div class="pt-16 px-16 text-center mb-8">
                    <p class="text-blue-600 text-xs font-bold tracking-[0.3em] uppercase mb-2">Our Capabilities</p>
                    <h2 class="text-3xl font-heading text-slate-900 uppercase">{{ $section['title'] }}</h2>
                </div>
                
                <div class="px-12 flex-1">
                    <div class="bg-white p-12 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 h-full relative overflow-hidden">
                        <!-- Decorative Blob -->
                        <div class="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -mr-8 -mt-8"></div>
                        
                        <div class="prose prose-slate max-w-none relative z-10">
                            {!! $section['content'] !!}
                        </div>
                    </div>
                </div>

            @elseif($section['type'] == 'sidebar')
                <!-- TYPE: SIDEBAR (Financials) -->
                <div class="flex h-full">
                    <!-- Left Sidebar -->
                    <div class="w-1/4 bg-blue-600 text-white p-12 flex flex-col justify-between relative overflow-hidden">
                        <div class="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
                        
                        <div class="relative z-10">
                            <span class="text-6xl font-black opacity-20 block mb-4">0{{ $section['id'] }}</span>
                            <h2 class="text-2xl font-bold uppercase leading-tight">{{ $section['title'] }}</h2>
                            <div class="w-12 h-1 bg-white/30 my-6"></div>
                            <p class="text-sm text-blue-100 leading-relaxed">
                                Detailed breakdown of timeline, costs, and value proposition.
                            </p>
                        </div>
                    </div>
                    
                    <!-- Right Content -->
                    <div class="w-3/4 p-12 bg-white">
                         <div class="prose prose-slate max-w-none">
                             <!-- Tailwind Table Styles -->
                             <style>
                                 table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
                                 th { text-align: left; padding: 0.75rem; background-color: #f8fafc; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; font-weight: 600; }
                                 td { padding: 1rem 0.75rem; border-bottom: 1px solid #e2e8f0; color: #334155; font-size: 0.875rem; }
                                 tr:last-child td { border-bottom: none; }
                             </style>
                            {!! $section['content'] !!}
                        </div>
                    </div>
                </div>

            @elseif($section['type'] == 'cover')
                <!-- TYPE: CLOSING -->
                <div class="h-full bg-slate-900 flex items-center justify-center relative overflow-hidden text-center text-white">
                     <!-- Animated Background (CSS) -->
                    <div class="absolute inset-0 opacity-20">
                        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500 rounded-full blur-[100px]"></div>
                    </div>
                    
                    <div class="relative z-10 max-w-2xl p-12 glass-panel rounded-2xl bg-white/5 border-white/10">
                        <h2 class="text-6xl font-heading mb-6 tracking-tight">Let's Build This.</h2>
                        <p class="text-xl text-slate-300 font-light mb-12">
                            Transformasi digital dimulai dari langkah pertama.<br>
                            Kami siap menjadi mitra strategis Anda.
                        </p>
                        
                        <div class="inline-block border border-blue-500/50 bg-blue-900/30 px-8 py-4 rounded-lg backdrop-blur-sm">
                            <span class="text-blue-400 font-mono text-sm block mb-1">VISIT OUR DASHBOARD</span>
                            <span class="text-xl font-bold tracking-wide">admin.thedarkandbright.com</span>
                        </div>
                    </div>
                </div>
            @endif

            <!-- Footer Number -->
            <div class="absolute bottom-6 w-full text-center text-slate-300 text-xs font-mono tracking-widest uppercase">
                Page {{ $loop->iteration + 1 }}
            </div>
        </div>
    @endforeach

</body>
</html>
