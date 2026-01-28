<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title', 'The Dark and Bright Agency')</title>
    <meta name="description" content="@yield('meta_description', 'Professional digital agency services')">
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
        header { background: #1a1a2e; color: white; padding: 1rem 0; }
        header nav { display: flex; justify-content: space-between; align-items: center; }
        header nav a { color: white; text-decoration: none; margin-left: 2rem; }
        header nav a:hover { color: #00adb5; }
        .hero { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 4rem 0; text-align: center; }
        .hero h1 { font-size: 3rem; margin-bottom: 1rem; }
        .section { padding: 4rem 0; }
        .btn { display: inline-block; padding: 0.8rem 2rem; background: #00adb5; color: white; text-decoration: none; border-radius: 5px; }
        .btn:hover { background: #007b83; }
        footer { background: #1a1a2e; color: white; padding: 2rem 0; text-align: center; }
    </style>
</head>
<body>
    <header>
        <div class="container">
            <nav>
                <div><strong>The Dark and Bright</strong></div>
                <div>
                    <a href="{{ route('agency.home') }}">Home</a>
                    <a href="{{ route('agency.about') }}">About</a>
                    <a href="{{ route('agency.services') }}">Services</a>
                    <a href="{{ route('agency.portfolio') }}">Portfolio</a>
                    <a href="{{ route('agency.contact') }}">Contact</a>
                </div>
            </nav>
        </div>
    </header>

    @yield('content')

    <footer>
        <div class="container">
            <p>&copy; {{ date('Y') }} The Dark and Bright Agency. All rights reserved.</p>
        </div>
    </footer>
</body>
</html>
