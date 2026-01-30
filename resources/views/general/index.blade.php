@extends('general.layout')

@section('title', 'Home - The Dark and Bright General')

@section('content')
<div id="hero-root"></div>
<div id="slogan-services-root"></div>

@if($featuredPortfolios->count() > 0)
<section class="section" style="background: #1a1616; color: white;">
    <div class="container">
        <h2 style="text-align: center; margin-bottom: 3rem; font-weight: 800; text-transform: uppercase;">Featured Work</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
            @foreach($featuredPortfolios as $portfolio)
            <div style="background: rgba(255,255,255,0.05); padding: 2rem; border-radius: 20px; border: 1px solid rgba(255,255,255,0.1);">
                <h3 style="margin-bottom: 0.5rem;">{{ $portfolio->title }}</h3>
                <p style="color: #aaa; margin-bottom: 1rem;">{{ $portfolio->client_name }}</p>
                <p style="color: #eee;">{{ Str::limit($portfolio->description, 100) }}</p>
            </div>
            @endforeach
        </div>
        <div style="text-align: center; margin-top: 3rem;">
            <a href="{{ route('general.portfolio') }}" class="btn" style="background: white; color: black;">View All Projects</a>
        </div>
    </div>
</section>
@endif
@endsection
