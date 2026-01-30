@extends('general.layout')

@section('title', 'Home - The Dark and Bright General')

@section('content')
    <!-- Hero Section -->
    <div id="hero-root"></div>

    <!-- Impact Intro Section (NEW) -->
    <div id="impact-intro-root"></div>

    <!-- Portfolio Section (Moved Higher as Social Proof) -->
    @if($featuredPortfolios->count() > 0)
        <div id="portfolio-root" data-portfolios="{{ json_encode($featuredPortfolios) }}"></div>
    @endif

    <!-- Solutions Section -->
    <div id="solutions-root"></div>

    <!-- Contact & Footer Section -->
    <div id="contact-footer-root"></div>
@endsection
