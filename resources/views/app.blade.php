<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <title inertia>{{ config('app.name', 'Laravel') }}</title>

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.bunny.net">
  <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link
    href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@100..900&family=Geist:wght@100..900&family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap"
    rel="stylesheet">


  <!-- PWA  -->
  <link rel="manifest" href="{{ asset('manifest.webmanifest') }}" />

  <!-- Apple Touch Icons (for iOS devices) -->
  <link rel="apple-touch-icon" sizes="48x48" href="maskable_icon_x48.png">
  <link rel="apple-touch-icon" sizes="72x72" href="maskable_icon_x72.png">
  <link rel="apple-touch-icon" sizes="96x96" href="maskable_icon_x96.png">
  <link rel="apple-touch-icon" sizes="128x128" href="maskable_icon_x128.png">
  <link rel="apple-touch-icon" sizes="192x192" href="maskable_icon_x192.png">
  <link rel="apple-touch-icon" sizes="384x384" href="maskable_icon_x384.png">
  <link rel="apple-touch-icon" sizes="512x512" href="maskable_icon_x512.png">

  <!-- Mobile-specific meta tags -->
  <meta name="mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black">
  <meta name="theme-color" content="#ffffff">

  <!-- Scripts -->
  @routes
  @viteReactRefresh
  @vite(['resources/js/app.tsx', "resources/js/Pages/{$page['component']}.tsx"])
  @inertiaHead

  {{-- import jquery in assets/scripts/jquery.min.js --}}
  <script src="{{ url('/assets/scripts/jquery.min.js') }}"></script>
</head>

<body class="font-sans antialiased">
  @inertia
</body>

</html>