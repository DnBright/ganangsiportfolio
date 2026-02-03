@extends('agency.layout')

@section('title', 'Pendaftaran & Kontak - DNB Academy')

@section('content')
<section class="hero" style="padding: 100px 0 60px; background: var(--secondary); text-align: center;">
    <div class="container">
        <div class="animate-up" style="max-width: 700px; margin: 0 auto;">
            <h1 style="font-size: 3.5rem; font-weight: 900; margin-bottom: 1rem;">Mulai <span style="color: var(--primary);">Perjalanan</span> Anda</h1>
            <p style="color: #94a3b8; font-size: 1.1rem;">Isi formulir di bawah untuk konsultasi karir gratis atau pendaftaran program.</p>
        </div>
    </div>
</section>

<section class="section" style="background: #f8fafc;">
    <div class="container">
        <div class="animate-up" style="max-width: 800px; margin: 0 auto; background: white; padding: 4rem; border-radius: 30px; border: 1px solid #e2e8f0; box-shadow: 0 20px 50px rgba(0,0,0,0.03);">
            
            @if(session('success'))
            <div style="background: #ecfdf5; color: #065f46; padding: 1.5rem; border-radius: 16px; margin-bottom: 3rem; border: 1px solid #10b981; display: flex; align-items: center; gap: 15px;">
                <svg style="width: 24px;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <span style="font-weight: 700;">{{ session('success') }}</span>
            </div>
            @endif

            <form action="{{ route('agency.contact.store') }}" method="POST">
                @csrf
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-bottom: 1.5rem;">
                    <div>
                        <label style="display: block; margin-bottom: 0.8rem; font-weight: 700; color: var(--secondary); font-size: 0.9rem;">Nama Lengkap *</label>
                        <input type="text" name="name" required placeholder="Contoh: Ganang" 
                            style="width: 100%; padding: 1rem 1.2rem; border: 2.5pt solid #f1f5f9; border-radius: 14px; outline: none; transition: all 0.3s; font-family: 'Inter';">
                    </div>
                    <div>
                        <label style="display: block; margin-bottom: 0.8rem; font-weight: 700; color: var(--secondary); font-size: 0.9rem;">Alamat Email *</label>
                        <input type="email" name="email" required placeholder="ganang@email.com" 
                            style="width: 100%; padding: 1rem 1.2rem; border: 2.5pt solid #f1f5f9; border-radius: 14px; outline: none; transition: all 0.3s; font-family: 'Inter';">
                    </div>
                </div>

                <div style="margin-bottom: 1.5rem;">
                    <label style="display: block; margin-bottom: 0.8rem; font-weight: 700; color: var(--secondary); font-size: 0.9rem;">Nomor WhatsApp</label>
                    <input type="text" name="phone" placeholder="0812..." 
                        style="width: 100%; padding: 1rem 1.2rem; border: 2.5pt solid #f1f5f9; border-radius: 14px; outline: none; transition: all 0.3s; font-family: 'Inter';">
                </div>

                <div style="margin-bottom: 2.5rem;">
                    <label style="display: block; margin-bottom: 0.8rem; font-weight: 700; color: var(--secondary); font-size: 0.9rem;">Minat Program atau Pertanyaan *</label>
                    <textarea name="message" required rows="4" placeholder="Sebutkan program yang ingin Anda ikuti..." 
                        style="width: 100%; padding: 1rem 1.2rem; border: 2.5pt solid #f1f5f9; border-radius: 14px; outline: none; transition: all 0.3s; font-family: 'Inter'; resize: none;"></textarea>
                </div>

                <button type="submit" class="btn-premium" style="width: 100%; border: none; cursor: pointer; text-align: center; font-size: 1rem;">
                    Kirim Pendaftaran
                </button>
            </form>
        </div>
    </div>
</section>

<style>
    input:focus, textarea:focus {
        border-color: var(--primary) !important;
        background: white !important;
        box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
    }
</style>
@endsection
