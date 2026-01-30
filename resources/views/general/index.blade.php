@extends('general.layout')

@section('title', 'Home - The Dark and Bright General')

@section('content')
<div id="hero-root" class="scroll-mt-24"></div>
<div id="beranda"></div> {{-- Alias for hero --}}
<div id="slogan-services-root" class="scroll-mt-24"></div>
<div id="layanan"></div> {{-- Alias for services --}}

<div id="solutions-root" class="scroll-mt-24"></div>
<div id="solusi"></div> {{-- Alias for solutions --}}

@if($featuredPortfolios->count() > 0)
    <div id="portfolio-root" class="scroll-mt-24" data-portfolios="{{ json_encode($featuredPortfolios) }}"></div>
    <div id="portfolio"></div> {{-- Alias for portfolio --}}
@endif

<div id="contact-footer-root" class="scroll-mt-24"></div>
<div id="kontak"></div> {{-- Alias for contact --}}
@endsection
