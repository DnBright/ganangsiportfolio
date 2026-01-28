@extends('agency.layout')
@section('title', 'Portfolio')
@section('content')
<div class="hero" style="padding: 3rem 0;"><div class="container"><h1>Our Portfolio</h1></div></div>
<section class="section"><div class="container">
    @if($portfolios->count() > 0)
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
            @foreach($portfolios as $portfolio)
            <div style="background: white; padding: 1.5rem; border: 1px solid #ddd; border-radius: 8px;">
                <h3>{{ $portfolio->title }}</h3>
                <p style="color: #666;">{{ $portfolio->client_name }}</p>
                <p>{{ Str::limit($portfolio->description, 150) }}</p>
            </div>
            @endforeach
        </div>
        <div style="margin-top: 2rem;">{{ $portfolios->links() }}</div>
    @else
        <p>No portfolios available yet.</p>
    @endif
</div></section>
@endsection
