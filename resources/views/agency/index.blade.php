@extends('agency.layout')

@section('title', 'DNB Academy - Elevate Your Digital Future')

@section('content')
<section class="hero" style="background: url('/api/artifacts/agency_hero_digital_learning_1770130988487.png') center/cover no-repeat; min-height: 85vh; display: flex; align-items: center;">
    <div style="position: absolute; top:0; left:0; width:100%; height:100%; background: linear-gradient(90deg, rgba(15, 23, 42, 0.95) 0%, rgba(15, 23, 42, 0.6) 50%, transparent 100%); z-index: 1;"></div>
    
    <div class="container" style="position: relative; z-index: 2;">
        <div class="animate-up" style="max-width: 650px;">
            <span style="color: var(--primary); font-weight: 800; text-transform: uppercase; letter-spacing: 3px; display: block; margin-bottom: 1rem; font-size: 0.9rem;">Empowering Future Talents</span>
            <h1 style="font-size: clamp(2.5rem, 5vw, 4.5rem); line-height: 1.1; font-weight: 900; margin-bottom: 1.5rem; letter-spacing: -2px;">
                Tingkatkan <span style="color: var(--primary);">Skill Digital</span> Anda ke Level Dunia.
            </h1>
            <p style="font-size: 1.25rem; color: #94a3b8; margin-bottom: 2.5rem; line-height: 1.6; font-weight: 400;">
                Program pelatihan intensif dengan kurikulum berstandar industri untuk membangun karir impian Anda di ekosistem digital.
            </p>
            <div style="display: flex; gap: 16px;">
                <a href="{{ route('agency.contact') }}" class="btn-premium">Mulai Belajar</a>
                <a href="{{ route('agency.programs') }}" style="display: inline-block; padding: 14px 32px; border: 2px solid white; color: white; text-decoration: none; border-radius: 14px; font-weight: 700; font-family: 'Outfit'; transition: all 0.3s;">Lihat Program</a>
            </div>
        </div>
    </div>
</section>

<section class="section">
    <div class="container">
        <div style="text-align: center; margin-bottom: 4rem;">
            <span style="color: var(--primary); font-weight: 800; text-transform: uppercase; letter-spacing: 2px; font-size: 0.8rem;">Our Programs</span>
            <h2 style="font-size: 2.5rem; font-weight: 900; color: var(--secondary); margin-top: 10px;">Program Pelatihan Unggulan</h2>
            <div style="width: 60px; height: 4px; background: var(--primary); margin: 20px auto;"></div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 2.5rem;">
            <!-- Web Dev -->
            <div style="background: white; padding: 3rem 2rem; border-radius: 20px; transition: all 0.4s; border: 1px solid #f1f5f9; position: relative; overflow: hidden;" class="animate-up">
                <div style="width: 60px; height: 60px; background: #eff6ff; border-radius: 16px; display: flex; align-items: center; justify-content: center; margin-bottom: 2rem;">
                    <svg style="width: 30px; height: 30px; color: var(--primary);" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
                </div>
                <h3 style="font-size: 1.5rem; font-weight: 800; margin-bottom: 1rem; color: var(--secondary);">Web Development</h3>
                <p style="color: #64748b; font-size: 0.95rem; line-height: 1.7; margin-bottom: 2rem;">
                    Kuasai Full-stack development dengan React, Next.js, dan Laravel untuk membangun aplikasi skala enterprise.
                </p>
                <a href="{{ route('agency.contact') }}" style="color: var(--primary); font-weight: 700; text-decoration: none; display: flex; align-items: center; gap: 8px; font-size: 0.9rem;">
                    Daftar Sekarang <svg style="width: 16px;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                </a>
            </div>

            <!-- Digital Marketing -->
            <div style="background: white; padding: 3rem 2rem; border-radius: 20px; transition: all 0.4s; border: 1px solid #f1f5f9; position: relative; overflow: hidden;" class="animate-up">
                <div style="width: 60px; height: 60px; background: #ecfdf5; border-radius: 16px; display: flex; align-items: center; justify-content: center; margin-bottom: 2rem;">
                    <svg style="width: 30px; height: 30px; color: #10b981;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                </div>
                <h3 style="font-size: 1.5rem; font-weight: 800; margin-bottom: 1rem; color: var(--secondary);">Digital Marketing</h3>
                <p style="color: #64748b; font-size: 0.95rem; line-height: 1.7; margin-bottom: 2rem;">
                    Pelajari strategi growth hacking, SEO, Ads management, dan data analytics untuk melipatgandakan performa bisnis.
                </p>
                <a href="{{ route('agency.contact') }}" style="color: #10b981; font-weight: 700; text-decoration: none; display: flex; align-items: center; gap: 8px; font-size: 0.9rem;">
                    Daftar Sekarang <svg style="width: 16px;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                </a>
            </div>

            <!-- UI/UX Design -->
            <div style="background: white; padding: 3rem 2rem; border-radius: 20px; transition: all 0.4s; border: 1px solid #f1f5f9; position: relative; overflow: hidden;" class="animate-up">
                <div style="width: 60px; height: 60px; background: #fff7ed; border-radius: 16px; display: flex; align-items: center; justify-content: center; margin-bottom: 2rem;">
                    <svg style="width: 30px; height: 30px; color: #f59e0b;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.172-1.172a4 4 0 115.656 5.656L10 17.657"></path></svg>
                </div>
                <h3 style="font-size: 1.5rem; font-weight: 800; margin-bottom: 1rem; color: var(--secondary);">UI/UX Design</h3>
                <p style="color: #64748b; font-size: 0.95rem; line-height: 1.7; margin-bottom: 2rem;">
                    Ciptakan pengalaman visual yang memukau dan solutif dengan metodologi design thinking terkini.
                </p>
                <a href="{{ route('agency.contact') }}" style="color: #f59e0b; font-weight: 700; text-decoration: none; display: flex; align-items: center; gap: 8px; font-size: 0.9rem;">
                    Daftar Sekarang <svg style="width: 16px;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                </a>
            </div>
        </div>
    </div>
</section>

<style>
    .section { background: #fff; }
    .section:nth-child(odd) { background: #f8fafc; }
    
    [style*="background: white"]:hover {
        transform: translateY(-10px);
        box-shadow: 0 30px 60px -15px rgba(0,0,0,0.08);
        border-color: var(--primary) !important;
    }
</style>
@endsection
