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
        body { font-family: 'Inter', 'Segoe UI', system-ui, sans-serif; line-height: 1.6; color: #1a1616; background: #ffffff; }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
        .section { padding: 4rem 0; }
        .btn { display: inline-block; padding: 0.8rem 2rem; background: #1a1616; color: white; text-decoration: none; border-radius: 5px; }
        .btn:hover { background: #333; }
        footer { background: #1a1616; color: #888; padding: 4rem 0; text-align: center; }
    </style>
</head>
<body>
    <div id="navbar-root"></div>

    @yield('content')


</body>
</html>
