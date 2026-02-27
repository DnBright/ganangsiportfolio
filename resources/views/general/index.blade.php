@extends('general.layout')

@section('title', 'Dark and Bright | Digital Marketing & Creative Agency')
@section('meta_description', 'Dark and Bright Agency: Solusi branding dan pemasaran digital menyeluruh untuk pertumbuhan bisnis Anda. Partner strategis dalam transformasi digital.')


@section('content')
<div id="hero-root" class="scroll-mt-24"></div>
<div id="beranda"></div> {{-- Alias for hero --}}

<div id="about-agency-root" class="scroll-mt-24"></div>
<div id="tentang-agensi"></div> {{-- Alias for about --}}

<div id="slogan-services-root" class="scroll-mt-24"></div>
<div id="layanan"></div> {{-- Alias for services --}}

<div id="solutions-root" class="scroll-mt-24"></div>
<div id="solusi"></div> {{-- Alias for solutions --}}

<div id="portfolio-root" class="scroll-mt-24" data-portfolios="{{ json_encode($featuredPortfolios ?? []) }}"></div>
<div id="portfolio"></div> {{-- Alias for portfolio --}}

<div id="contact-footer-root" class="scroll-mt-24"></div>
<div id="kontak"></div> {{-- Alias for contact --}}
@endsection
