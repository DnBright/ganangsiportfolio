@extends('agency.layout')
@section('title', 'Agency The Dark and Bright - Pelatihan Profesional')
@section('content')
<div class="hero">
    <div class="container">
        <h1>Tingkatkan Skill Digital Anda</h1>
        <p style="font-size: 1.2rem; margin-bottom: 2rem;">Program pelatihan profesional untuk karir yang lebih baik</p>
        <a href="{{ route('agency.contact') }}" class="btn">Daftar Sekarang</a>
    </div>
</div>
<section class="section">
    <div class="container">
        <h2 style="text-align: center; margin-bottom: 3rem;">Program Pelatihan Kami</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
            <div style="padding: 2rem; border: 1px solid #ddd; border-radius: 8px;">
                <h3>Web Development</h3>
                <p>Belajar membuat website modern dengan teknologi terkini.</p>
            </div>
            <div style="padding: 2rem; border: 1px solid #ddd; border-radius: 8px;">
                <h3>Digital Marketing</h3>
                <p>Kuasai strategi pemasaran digital untuk bisnis online.</p>
            </div>
            <div style="padding: 2rem; border: 1px solid #ddd; border-radius: 8px;">
                <h3>Graphic Design</h3>
                <p>Pelajari desain grafis profesional dari dasar hingga mahir.</p>
            </div>
        </div>
    </div>
</section>
@endsection
