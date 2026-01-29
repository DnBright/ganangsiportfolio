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
    <div style="height: 100px; position: relative; z-index: 1000;">
        <div id="navbar-root"></div>
    </div>

    @yield('content')

    <footer>
        <div class="container">
            <p>&copy; {{ date('Y') }} The Dark and Bright General. All rights reserved.</p>
        </div>
    </footer>
</body>
</html>
