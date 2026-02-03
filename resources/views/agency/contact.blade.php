@extends('agency.layout')

@section('title', 'Diskusi Strategis - DNB Agency')

@section('content')
<section class="section" style="background: #fafafa; padding: 120px 0 60px;">
    <div class="container">
        <div class="animate-subtle" style="max-width: 700px;">
            <span style="color: var(--primary); font-weight: 800; text-transform: uppercase; letter-spacing: 3px; font-size: 0.85rem; display: block; margin-bottom: 1rem;">Let's Talk Strategy</span>
            <h1 style="font-size: 3.5rem; font-weight: 900; margin-bottom: 1.5rem; letter-spacing: -2px; line-height: 1.1;">Mulai Transformasi <span style="color: var(--primary);">Digital</span> Anda.</h1>
            <p style="font-size: 1.25rem; color: #64748b; line-height: 1.8;">
                Jadwalkan diskusi mendalam untuk memetakan tantangan bisnis Anda dan menemukan solusi teknologi yang paling tepat.
            </p>
        </div>
    </div>
</section>

<section class="section" style="background: white;">
    <div class="container">
        <div class="animate-subtle" style="max-width: 800px; margin: 0 auto; background: white; padding: 4rem; border-radius: 20px; border: 1px solid #f1f5f9; box-shadow: 0 40px 80px rgba(15, 23, 42, 0.04);">
            
            @if(session('success'))
            <div style="background: #f0fdf4; color: #166534; padding: 1.5rem; border-radius: 12px; margin-bottom: 3rem; border: 1px solid #bbf7d0; display: flex; align-items: center; gap: 15px;">
                <svg style="width: 24px;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <span style="font-weight: 700;">Permintaan Anda telah kami terima. Tim Partner kami akan segera menghubungi Anda.</span>
            </div>
            @endif

            <form action="{{ route('agency.contact.store') }}" method="POST">
                @csrf
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2.5rem; margin-bottom: 2rem;">
                    <div>
                        <label style="display: block; margin-bottom: 0.8rem; font-weight: 700; color: var(--text-dark); font-size: 0.9rem;">Nama & Jabatan *</label>
                        <input type="text" name="name" required placeholder="Contoh: Ganang (Director)" 
                            style="width: 100%; padding: 1.1rem; border: 1.5pt solid #f1f5f9; border-radius: 10px; outline: none; transition: all 0.3s; font-family: 'Inter'; font-size: 1rem; background: #fafafa;">
                    </div>
                    <div>
                        <label style="display: block; margin-bottom: 0.8rem; font-weight: 700; color: var(--text-dark); font-size: 0.9rem;">Email Bisnis *</label>
                        <input type="email" name="email" required placeholder="name@company.com" 
                            style="width: 100%; padding: 1.1rem; border: 1.5pt solid #f1f5f9; border-radius: 10px; outline: none; transition: all 0.3s; font-family: 'Inter'; font-size: 1rem; background: #fafafa;">
                    </div>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2.5rem; margin-bottom: 2rem;">
                    <div>
                        <label style="display: block; margin-bottom: 0.8rem; font-weight: 700; color: var(--text-dark); font-size: 0.9rem;">Nama Perusahaan *</label>
                        <input type="text" name="company" required placeholder="PT. Contoh Sukses" 
                            style="width: 100%; padding: 1.1rem; border: 1.5pt solid #f1f5f9; border-radius: 10px; outline: none; transition: all 0.3s; font-family: 'Inter'; font-size: 1rem; background: #fafafa;">
                    </div>
                    <div>
                        <label style="display: block; margin-bottom: 0.8rem; font-weight: 700; color: var(--text-dark); font-size: 0.9rem;">Nomor WhatsApp / Kantor</label>
                        <input type="text" name="phone" placeholder="+62 812..." 
                            style="width: 100%; padding: 1.1rem; border: 1.5pt solid #f1f5f9; border-radius: 10px; outline: none; transition: all 0.3s; font-family: 'Inter'; font-size: 1rem; background: #fafafa;">
                    </div>
                </div>

                <div style="margin-bottom: 3rem;">
                    <label style="display: block; margin-bottom: 0.8rem; font-weight: 700; color: var(--text-dark); font-size: 0.9rem;">Tantangan Bisnis Anda *</label>
                    <textarea name="message" required rows="5" placeholder="Jelaskan secara singkat kendala atau kebutuhan sistem yang ingin Anda diskusikan..." 
                        style="width: 100%; padding: 1.1rem; border: 1.5pt solid #f1f5f9; border-radius: 10px; outline: none; transition: all 0.3s; font-family: 'Inter'; font-size: 1rem; resize: none; background: #fafafa;"></textarea>
                </div>

                <button type="submit" class="btn-strategic" style="width: 100%; border: none; cursor: pointer; text-align: center; font-size: 1rem; background: var(--primary);">
                    Booking Diskusi Strategis
                </button>
            </form>
        </div>
    </div>
</section>

<style>
    input:focus, textarea:focus {
        border-color: var(--primary) !important;
        background: white !important;
        box-shadow: 0 10px 30px rgba(37, 99, 235, 0.05);
    }
</style>
@endsection
