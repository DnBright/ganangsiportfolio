@extends('general.layout')

@section('title', 'Contact Us - The Dark and Bright General')

@section('content')
<div class="hero" style="padding: 3rem 0;">
    <div class="container">
        <h1>Get In Touch</h1>
        <p>Let's discuss your project</p>
    </div>
</div>

<section class="section">
    <div class="container">
        @if(session('success'))
        <div style="background: #d4edda; color: #155724; padding: 1rem; border-radius: 5px; margin-bottom: 2rem;">
            {{ session('success') }}
        </div>
        @endif

        <div style="max-width: 600px; margin: 0 auto;">
            <form action="{{ route('general.contact.store') }}" method="POST">
                @csrf
                <div style="margin-bottom: 1.5rem;">
                    <label style="display: block; margin-bottom: 0.5rem; font-weight: bold;">Name *</label>
                    <input type="text" name="name" required style="width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 5px;">
                    @error('name')<span style="color: red;">{{ $message }}</span>@enderror
                </div>

                <div style="margin-bottom: 1.5rem;">
                    <label style="display: block; margin-bottom: 0.5rem; font-weight: bold;">Email *</label>
                    <input type="email" name="email" required style="width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 5px;">
                    @error('email')<span style="color: red;">{{ $message }}</span>@enderror
                </div>

                <div style="margin-bottom: 1.5rem;">
                    <label style="display: block; margin-bottom: 0.5rem; font-weight: bold;">Phone</label>
                    <input type="text" name="phone" style="width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 5px;">
                </div>

                <div style="margin-bottom: 1.5rem;">
                    <label style="display: block; margin-bottom: 0.5rem; font-weight: bold;">Company</label>
                    <input type="text" name="company" style="width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 5px;">
                </div>

                <div style="margin-bottom: 1.5rem;">
                    <label style="display: block; margin-bottom: 0.5rem; font-weight: bold;">Message *</label>
                    <textarea name="message" required rows="5" style="width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 5px;"></textarea>
                    @error('message')<span style="color: red;">{{ $message }}</span>@enderror
                </div>

                <button type="submit" class="btn" style="width: 100%; cursor: pointer; border: none; font-size: 1rem;">Send Message</button>
            </form>
        </div>
    </div>
</section>
@endsection
