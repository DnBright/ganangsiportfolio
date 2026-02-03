<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title', 'DNB Agency - Strategic Digital Partner for Business Growth')</title>
    
    <!-- Premium Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800;900&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    
    @vite(['resources/css/app.css', 'resources/js/app.jsx'])
    
    <style>
        :root {
            --primary: #2563eb;
            --primary-dark: #1d4ed8;
            --secondary: #0f172a;
            --accent: #10b981;
            --bg-light: #ffffff;
            --text-main: #334155;
            --text-dark: #0f172a;
            --glass: rgba(255, 255, 255, 0.9);
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body { 
            font-family: 'Inter', sans-serif; 
            line-height: 1.7; 
            color: var(--text-main); 
            background: var(--bg-light);
            -webkit-font-smoothing: antialiased;
        }

        h1, h2, h3, h4, .font-heading { font-family: 'Outfit', sans-serif; color: var(--text-dark); }

        .container { max-width: 1100px; margin: 0 auto; padding: 0 24px; }

        /* Professional Navigation */
        header { 
            position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
            backdrop-filter: blur(16px);
            background: var(--glass);
            border-bottom: 1px solid #f1f5f9;
            transition: all 0.3s ease;
        }
        
        header nav { 
            display: flex; justify-content: space-between; align-items: center; 
            height: 90px;
        }

        .brand-logo {
            font-size: 1.4rem; font-weight: 900; letter-spacing: -0.5px;
            color: var(--secondary); text-decoration: none;
            display: flex; align-items: center; gap: 4px;
        }
        .brand-logo .dot { color: var(--primary); }

        .nav-links { display: flex; gap: 40px; align-items: center; }
        .nav-links a { 
            color: var(--text-main); text-decoration: none; 
            font-weight: 500; font-size: 0.95rem;
            transition: color 0.2s;
        }
        .nav-links a:hover { color: var(--primary); }
        .nav-links a.active { color: var(--primary); font-weight: 700; }

        .nav-cta {
            background: var(--secondary); color: white !important;
            padding: 12px 28px; border-radius: 8px;
            font-weight: 700 !important; font-size: 0.9rem !important;
            transition: all 0.3s;
        }
        .nav-cta:hover { background: var(--primary); transform: translateY(-1px); }

        /* Main structure */
        main { padding-top: 90px; }
        
        .section { padding: 100px 0; }
        .section-title { font-size: 2.5rem; font-weight: 900; margin-bottom: 1.5rem; letter-spacing: -1px; }
        
        .btn-strategic { 
            display: inline-block; padding: 16px 36px; 
            background: var(--secondary); color: white; 
            text-decoration: none; border-radius: 8px; 
            font-weight: 700; font-family: 'Outfit';
            transition: all 0.3s;
        }
        .btn-strategic:hover { background: var(--primary); transform: translateY(-2px); }

        footer { 
            background: #fafafa; padding: 80px 0 40px; 
            border-top: 1px solid #eee;
        }
        .footer-grid {
            display: grid; grid-template-columns: 1.5fr 1fr 1fr; gap: 60px; margin-bottom: 60px;
        }
        .footer-label { font-weight: 800; color: var(--secondary); margin-bottom: 24px; display: block; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1px; }
        .footer-links { list-style: none; }
        .footer-links li { margin-bottom: 14px; }
        .footer-links a { color: #64748b; text-decoration: none; font-size: 0.95rem; transition: color 0.2s; }
        .footer-links a:hover { color: var(--primary); }

        .copyright {
            padding-top: 40px; border-top: 1px solid #eee;
            text-align: left; color: #94a3b8; font-size: 0.9rem;
            display: flex; justify-content: space-between; align-items: center;
        }

        /* Animations */
        @keyframes subtleUp {
            from { opacity: 0; transform: translateY(15px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-subtle { animation: subtleUp 0.6s ease-out forwards; }
    </style>
</head>
<body>
    <header>
        <div class="container">
            <nav>
                <a href="{{ route('agency.home') }}" class="brand-logo">
                    DNB AGENCY<span class="dot">.</span>
                </a>
                <div class="nav-links">
                    <a href="{{ route('agency.home') }}" class="{{ request()->routeIs('agency.home') ? 'active' : '' }}">Beranda</a>
                    <a href="#pendekatan">Pendekatan</a>
                    <a href="{{ route('agency.programs') }}" class="{{ request()->routeIs('agency.programs') ? 'active' : '' }}">Solusi</a>
                    <a href="{{ route('agency.contact') }}" class="nav-cta">Diskusi Strategis</a>
                </div>
            </nav>
        </div>
    </header>

    <main>
        @yield('content')
    </main>

    <footer>
        <div class="container">
            <div class="footer-grid">
                <div>
                    <a href="{{ route('agency.home') }}" class="brand-logo" style="margin-bottom: 24px; display: block;">
                        DNB AGENCY<span class="dot">.</span>
                    </a>
                    <p style="color: #64748b; font-size: 1rem; max-width: 360px; line-height: 1.8;">
                        Partner strategis untuk transformasi digital dan efisiensi bisnis. Kami membantu para pemimpin usaha membangun ekosistem teknologi yang scalable dan berkelanjutan.
                    </p>
                </div>
                <div>
                    <span class="footer-label">Navigasi</span>
                    <ul class="footer-links">
                        <li><a href="{{ route('agency.home') }}">Beranda</a></li>
                        <li><a href="#pendekatan">Pendekatan Kerja</a></li>
                        <li><a href="{{ route('agency.programs') }}">Solusi Bisnis</a></li>
                        <li><a href="{{ route('agency.contact') }}">Diskusi Strategis</a></li>
                    </ul>
                </div>
                <div>
                    <span class="footer-label">Hubungi Kami</span>
                    <ul class="footer-links">
                        <li><a href="mailto:hello@thedarkandbright.com">hello@thedarkandbright.com</a></li>
                        <li><a href="#">LinkedIn</a></li>
                        <li><a href="#">Kantor Pusat</a></li>
                    </ul>
                </div>
            </div>
            <div class="copyright">
                <p>&copy; {{ date('Y') }} Dark and Bright Agency. Strategic Partnership for Enterprise.</p>
                <div style="font-size: 0.8rem; opacity: 0.6;">DNB_CORP_INFRA_V1</div>
            </div>
        </div>
    </footer>
</body>
</html>
