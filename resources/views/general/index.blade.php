@extends('general.layout')

@section('title', 'Home - The Dark and Bright General')

@section('content')
<div id="hero-root"></div>
<div id="slogan-services-root"></div>

@if($featuredPortfolios->count() > 0)
    <div id="portfolio-root" data-portfolios="{{ json_encode($featuredPortfolios) }}"></div>
@endif

<div id="contact-footer-root"></div>
@endsection
