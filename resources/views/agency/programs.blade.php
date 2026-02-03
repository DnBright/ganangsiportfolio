@extends('agency.layout')

@section('title', 'Program Unggulan - DNB Academy')

@section('content')
<section class="hero" style="padding: 100px 0 60px; background: var(--secondary);">
    <div class="container text-center">
        <div class="animate-up" style="max-width: 800px; margin: 0 auto; text-align: center;">
            <h1 style="font-size: 3.5rem; font-weight: 900; margin-bottom: 1.5rem;">Program <span style="color: var(--primary);">Pelatihan</span> Strategis</h1>
            <p style="font-size: 1.2rem; color: #94a3b8; line-height: 1.6;">
                Kurikulum yang dirancang khusus untuk memenuhi kebutuhan industri modern, dibimbing oleh praktisi ahli.
            </p>
        </div>
    </div>
</section>

<section class="section" style="background: white;">
    <div class="container">
        <div style="display: grid; gap: 4rem;">
            
            <!-- Web Development Details -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center;" class="animate-up">
                <div style="background: #f1f5f9; border-radius: 30px; padding: 20px; aspect-ratio: 4/3; display: flex; align-items: center; justify-content: center; overflow: hidden;">
                    <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80" alt="Web Development" style="width: 100%; height: 100%; object-fit: cover; border-radius: 20px;">
                </div>
                <div>
                    <span style="color: var(--primary); font-weight: 800; text-transform: uppercase; letter-spacing: 2px; font-size: 0.85rem;">Course 01</span>
                    <h2 style="font-size: 2.5rem; font-weight: 900; margin: 10px 0 20px; color: var(--secondary);">Fullstack Web Engineering</h2>
                    <p style="color: #64748b; margin-bottom: 2rem; font-size: 1.1rem;">
                        Bangun aplikasi web responsif dan scalable dari nol hingga deployment menggunakan stack teknologi paling populer saat ini.
                    </p>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 2.5rem;">
                        <div style="display: flex; align-items: center; gap: 10px; color: var(--secondary); font-weight: 600; font-size: 0.9rem;">
                            <svg style="width: 20px; color: var(--primary);" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg> React & Next.js
                        </div>
                        <div style="display: flex; align-items: center; gap: 10px; color: var(--secondary); font-weight: 600; font-size: 0.9rem;">
                            <svg style="width: 20px; color: var(--primary);" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg> Laravel & Node.js
                        </div>
                        <div style="display: flex; align-items: center; gap: 10px; color: var(--secondary); font-weight: 600; font-size: 0.9rem;">
                            <svg style="width: 20px; color: var(--primary);" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg> Database Management
                        </div>
                        <div style="display: flex; align-items: center; gap: 10px; color: var(--secondary); font-weight: 600; font-size: 0.9rem;">
                            <svg style="width: 20px; color: var(--primary);" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg> API Integration
                        </div>
                    </div>
                    <a href="{{ route('agency.contact') }}" class="btn-premium">Daftar Sekarang</a>
                </div>
            </div>

            <hr style="border: 0; border-top: 1px solid #f1f5f9;">

            <!-- Digital Marketing Details -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center;" class="animate-up">
                <div style="order: 2; background: #f1f5f9; border-radius: 30px; padding: 20px; aspect-ratio: 4/3; display: flex; align-items: center; justify-content: center; overflow: hidden;">
                    <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" alt="Digital Marketing" style="width: 100%; height: 100%; object-fit: cover; border-radius: 20px;">
                </div>
                <div style="order: 1;">
                    <span style="color: #10b981; font-weight: 800; text-transform: uppercase; letter-spacing: 2px; font-size: 0.85rem;">Course 02</span>
                    <h2 style="font-size: 2.5rem; font-weight: 900; margin: 10px 0 20px; color: var(--secondary);">Growth & Strategic Marketing</h2>
                    <p style="color: #64748b; margin-bottom: 2rem; font-size: 1.1rem;">
                        Kuasai teknik pemasaran digital tingkat lanjut untuk meningkatkan konversi dan skala bisnis secara eksponensial.
                    </p>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 2.5rem;">
                        <div style="display: flex; align-items: center; gap: 10px; color: var(--secondary); font-weight: 600; font-size: 0.9rem;">
                            <svg style="width: 20px; color: #10b981;" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg> Advanced SEO
                        </div>
                        <div style="display: flex; align-items: center; gap: 10px; color: var(--secondary); font-weight: 600; font-size: 0.9rem;">
                            <svg style="width: 20px; color: #10b981;" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg> Performance Ads
                        </div>
                        <div style="display: flex; align-items: center; gap: 10px; color: var(--secondary); font-weight: 600; font-size: 0.9rem;">
                            <svg style="width: 20px; color: #10b981;" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg> Content Strategy
                        </div>
                        <div style="display: flex; align-items: center; gap: 10px; color: var(--secondary); font-weight: 600; font-size: 0.9rem;">
                            <svg style="width: 20px; color: #10b981;" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg> Data Analytics
                        </div>
                    </div>
                    <a href="{{ route('agency.contact') }}" class="btn-premium" style="background: #10b981; box-shadow: 0 10px 25px rgba(16, 185, 129, 0.3);">Daftar Sekarang</a>
                </div>
            </div>

        </div>
    </div>
</section>

<section class="section" style="background: var(--secondary); color: white; text-align: center;">
    <div class="container">
        <div class="animate-up">
            <h2 style="font-size: 2.5rem; font-weight: 900; margin-bottom: 1.5rem;">Siap Menjadi Talenta Digital Berikutnya?</h2>
            <p style="color: #94a3b8; font-size: 1.1rem; max-width: 600px; margin: 0 auto 2.5rem;">
                Bergabunglah dengan ribuan alumni yang telah sukses membangun karir di industri teknologi bersama kami.
            </p>
            <a href="{{ route('agency.contact') }}" class="btn-premium">Hubungi Tim Konsultan Kami</a>
        </div>
    </div>
</section>
@endsection
