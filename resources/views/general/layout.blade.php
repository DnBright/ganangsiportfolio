<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title', 'The Dark and Bright General')</title>
    <meta name="description" content="@yield('meta_description', 'Professional digital agency services')">
    @vite(['resources/css/app.css', 'resources/js/app.jsx'])
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Inter', 'Segoe UI', system-ui, sans-serif; line-height: 1.6; color: #fff; background: #060010; }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
        .section { padding: 4rem 0; }
        .btn { display: inline-block; padding: 0.8rem 2rem; background: #00adb5; color: white; text-decoration: none; border-radius: 5px; }
        .btn:hover { background: #007b83; }
        footer { background: #020005; color: #666; padding: 4rem 0; text-align: center; border-top: 1px solid rgba(255,255,255,0.05); }
    </style>
</head>
<body>
    <div id="navbar-root"></div>

    @yield('content')

    <footer>
        <div class="container">
            <p>&copy; {{ date('Y') }} The Dark and Bright General. All rights reserved.</p>
        </div>
    </footer>
</body>
</html>
