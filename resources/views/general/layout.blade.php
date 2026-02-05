<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0">
    <title>@yield('title', 'Dark and Bright - Digital Solution Partner')</title>
    <meta name="description" content="@yield('meta_description', 'Dark and Bright: Transforming complex business challenges into bright digital solutions.')">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="{{ url()->current() }}">
    <meta property="og:title" content="@yield('title', 'Dark and Bright')">
    <meta property="og:description" content="@yield('meta_description', 'Dark and Bright: Transforming complex business challenges into bright digital solutions.')">
    <meta property="og:image" content="{{ asset('images/logo-dnb.png') }}">

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="{{ url()->current() }}">
    <meta property="twitter:title" content="@yield('title', 'Dark and Bright')">
    <meta property="twitter:description" content="@yield('meta_description', 'Dark and Bright: Transforming complex business challenges into bright digital solutions.')">
    <meta property="twitter:image" content="{{ asset('images/logo-dnb.png') }}">

    <link rel="icon" type="image/png" href="/images/logo-dnb.png">
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
