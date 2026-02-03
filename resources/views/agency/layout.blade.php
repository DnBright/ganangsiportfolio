<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title', 'DNB Academy - Professional Career Gateway')</title>
    
    <!-- Premium Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800;900&family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet">
    
    @vite(['resources/css/app.css', 'resources/js/app.jsx'])
    
    <style>
        :root {
            --primary: #3b82f6;
            --primary-dark: #2563eb;
            --secondary: #0f172a;
            --accent: #10b981;
            --bg-light: #f8fafc;
            --text-main: #1e293b;
            --glass: rgba(255, 255, 255, 0.8);
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body { 
            font-family: 'Inter', sans-serif; 
            line-height: 1.6; 
            color: var(--text-main); 
            background: var(--bg-light);
            -webkit-font-smoothing: antialiased;
        }

        h1, h2, h3, h4, .font-heading { font-family: 'Outfit', sans-serif; }

        .container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }

        /* Premium Navigation */
        header { 
            position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
            backdrop-filter: blur(12px);
            background: var(--glass);
            border-bottom: 1px solid rgba(226, 232, 240, 0.8);
            transition: all 0.3s ease;
        }
        
        header nav { 
            display: flex; justify-content: space-between; align-items: center; 
            height: 80px;
        }

        .brand-logo {
            font-size: 1.5rem; font-weight: 900; letter-spacing: -1px;
            color: var(--secondary); text-decoration: none;
            display: flex; align-items: center; gap: 8px;
        }
        .brand-logo span { color: var(--primary); }

        .nav-links { display: flex; gap: 32px; align-items: center; }
        .nav-links a { 
            color: var(--text-main); text-decoration: none; 
            font-weight: 600; font-size: 0.95rem;
            transition: color 0.2s;
        }
        .nav-links a:hover { color: var(--primary); }
        .nav-links a.active { color: var(--primary); }

        .nav-cta {
            background: var(--secondary); color: white !important;
            padding: 10px 24px; border-radius: 12px;
            font-weight: 700 !important; font-size: 0.9rem !important;
            transition: all 0.3s;
        }
        .nav-cta:hover { transform: translateY(-2px); box-shadow: 0 10px 20px rgba(15, 23, 42, 0.15); }

        /* Hero & Content */
        main { padding-top: 80px; }
        
        .hero { 
            background: var(--secondary); color: white; padding: 100px 0; 
            position: relative; overflow: hidden;
        }
        
        .hero::before {
            content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0;
            background: radial-gradient(circle at 70% 30%, rgba(59, 130, 246, 0.15) 0%, transparent 70%);
            z-index: 0;
        }

        .section { padding: 80px 0; }
        
        .btn-premium { 
            display: inline-block; padding: 14px 32px; 
            background: var(--primary); color: white; 
            text-decoration: none; border-radius: 14px; 
            font-weight: 800; font-family: 'Outfit';
            transition: all 0.3s;
            box-shadow: 0 10px 25px rgba(59, 130, 246, 0.3);
        }
        .btn-premium:hover { transform: translateY(-3px); box-shadow: 0 15px 35px rgba(59, 130, 246, 0.4); }

        footer { 
            background: #fff; padding: 60px 0 30px; 
            border-top: 1px solid #e2e8f0;
        }
        .footer-grid {
            display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 40px; margin-bottom: 40px;
        }
        .footer-label { font-weight: 800; color: var(--secondary); margin-bottom: 20px; display: block; }
        .footer-links { list-style: none; }
        .footer-links li { margin-bottom: 12px; }
        .footer-links a { color: #64748b; text-decoration: none; font-size: 0.9rem; transition: color 0.2s; }
        .footer-links a:hover { color: var(--primary); }

        .copyright {
            padding-top: 30px; border-top: 1px solid #f1f5f9;
            text-align: center; color: #94a3b8; font-size: 0.85rem;
        }

        /* Animations */
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-up { animation: fadeIn 0.8s ease-out forwards; }
    </style>
</head>
<body>
    <header>
        <div class="container">
            <nav>
                <a href="{{ route('agency.home') }}" class="brand-logo">
                    DNB <span>ACADEMY</span>
                </a>
                <div class="nav-links">
                    <a href="{{ route('agency.home') }}" class="{{ request()->routeIs('agency.home') ? 'active' : '' }}">Beranda</a>
                    <a href="{{ route('agency.programs') }}" class="{{ request()->routeIs('agency.programs') ? 'active' : '' }}">Program</a>
                    <a href="{{ route('agency.contact') }}" class="nav-cta">Daftar Sekarang</a>
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
                    <a href="{{ route('agency.home') }}" class="brand-logo" style="margin-bottom: 20px;">
                        DNB <span>ACADEMY</span>
                    </a>
                    <p style="color: #64748b; font-size: 0.95rem; max-width: 300px;">
                        Pusat pelatihan digital strategis untuk mencetak talenta kelas dunia di industri teknologi.
                    </p>
                </div>
                <div>
                    <span class="footer-label">Navigasi</span>
                    <ul class="footer-links">
                        <li><a href="{{ route('agency.home') }}">Beranda</a></li>
                        <li><a href="{{ route('agency.programs') }}">Program Pelatihan</a></li>
                        <li><a href="{{ route('agency.contact') }}">Pendaftaran</a></li>
                    </ul>
                </div>
                <div>
                    <span class="footer-label">Hubungi Kami</span>
                    <ul class="footer-links">
                        <li><a href="mailto:academy@thedarkandbright.com">academy@thedarkandbright.com</a></li>
                        <li><a href="#">Social Media</a></li>
                        <li><a href="#">Kantor Pusat</a></li>
                    </ul>
                </div>
            </div>
            <div class="copyright">
                <p>&copy; {{ date('Y') }} Dark and Bright Academy. Part of DNB Strategic Group.</p>
            </div>
        </div>
    </footer>
</body>
</html>
