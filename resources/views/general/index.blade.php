@extends('general.layout')

@section('title', 'Home - The Dark and Bright General')

@section('content')
<div id="hero-root"></div>

<section class="section">
    <div class="container">
        <h2 style="text-align: center; margin-bottom: 3rem;">Our Services</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
            <div style="padding: 2rem; border: 1px solid #ddd; border-radius: 8px;">
                <h3>Web Development</h3>
                <p>Custom websites and web applications built with modern technologies.</p>
            </div>
            <div style="padding: 2rem; border: 1px solid #ddd; border-radius: 8px;">
                <h3>Digital Marketing</h3>
                <p>Strategic marketing campaigns to grow your online presence.</p>
            </div>
            <div style="padding: 2rem; border: 1px solid #ddd; border-radius: 8px;">
                <h3>Brand Design</h3>
                <p>Professional branding and visual identity design services.</p>
            </div>
        </div>
    </div>
</section>

@if($featuredPortfolios->count() > 0)
<section class="section" style="background: #f5f5f5;">
    <div class="container">
        <h2 style="text-align: center; margin-bottom: 3rem;">Featured Work</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
            @foreach($featuredPortfolios as $portfolio)
            <div style="background: white; padding: 1.5rem; border-radius: 8px;">
                <h3>{{ $portfolio->title }}</h3>
                <p style="color: #666;">{{ $portfolio->client_name }}</p>
                <p>{{ Str::limit($portfolio->description, 100) }}</p>
            </div>
            @endforeach
        </div>
        <div style="text-align: center; margin-top: 2rem;">
            <a href="{{ route('general.portfolio') }}" class="btn">View All Projects</a>
        </div>
    </div>
</section>
@endif
@endsection
