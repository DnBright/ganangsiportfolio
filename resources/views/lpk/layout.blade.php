<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title', 'LPK The Dark and Bright')</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
        header { background: #2c3e50; color: white; padding: 1rem 0; }
        header nav { display: flex; justify-content: space-between; align-items: center; }
        header nav a { color: white; text-decoration: none; margin-left: 2rem; }
        .hero { background: linear-gradient(135deg, #3498db 0%, #2980b9 100%); color: white; padding: 4rem 0; text-align: center; }
        .section { padding: 4rem 0; }
        .btn { display: inline-block; padding: 0.8rem 2rem; background: #e74c3c; color: white; text-decoration: none; border-radius: 5px; }
        footer { background: #2c3e50; color: white; padding: 2rem 0; text-align: center; }
    </style>
</head>
<body>
    <header>
        <div class="container">
            <nav>
                <div><strong>LPK The Dark and Bright</strong></div>
                <div>
                    <a href="{{ route('lpk.home') }}">Beranda</a>
                    <a href="{{ route('lpk.programs') }}">Program</a>
                    <a href="{{ route('lpk.contact') }}">Kontak</a>
                </div>
            </nav>
        </div>
    </header>
    @yield('content')
    <footer>
        <div class="container">
            <p>&copy; {{ date('Y') }} LPK The Dark and Bright. Semua hak dilindungi.</p>
        </div>
    </footer>
</body>
</html>
