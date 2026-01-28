@extends('lpk.layout')
@section('title', 'Hubungi Kami')
@section('content')
<div class="hero" style="padding: 3rem 0;"><div class="container"><h1>Hubungi Kami</h1></div></div>
<section class="section">
    <div class="container">
        @if(session('success'))
        <div style="background: #d4edda; color: #155724; padding: 1rem; border-radius: 5px; margin-bottom: 2rem;">
            {{ session('success') }}
        </div>
        @endif
        <div style="max-width: 600px; margin: 0 auto;">
            <form action="{{ route('lpk.contact.store') }}" method="POST">
                @csrf
                <div style="margin-bottom: 1.5rem;">
                    <label style="display: block; margin-bottom: 0.5rem; font-weight: bold;">Nama *</label>
                    <input type="text" name="name" required style="width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 5px;">
                </div>
                <div style="margin-bottom: 1.5rem;">
                    <label style="display: block; margin-bottom: 0.5rem; font-weight: bold;">Email *</label>
                    <input type="email" name="email" required style="width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 5px;">
                </div>
                <div style="margin-bottom: 1.5rem;">
                    <label style="display: block; margin-bottom: 0.5rem; font-weight: bold;">Telepon</label>
                    <input type="text" name="phone" style="width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 5px;">
                </div>
                <div style="margin-bottom: 1.5rem;">
                    <label style="display: block; margin-bottom: 0.5rem; font-weight: bold;">Pesan *</label>
                    <textarea name="message" required rows="5" style="width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 5px;"></textarea>
                </div>
                <button type="submit" class="btn" style="width: 100%; cursor: pointer; border: none; font-size: 1rem;">Kirim Pesan</button>
            </form>
        </div>
    </div>
</section>
@endsection
