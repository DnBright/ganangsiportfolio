@extends('agency.layout')

@section('title', 'DNB Agency - Strategic Digital Partnership for Enterprise')

@section('content')
<!-- HERO SECTION: STRATEGIC PARTNERSHIP -->
<section style="background: url('/api/artifacts/agency_hero_digital_learning_1770130988487.png') center/cover no-repeat; min-height: 80vh; display: flex; align-items: center; position: relative;">
    <div style="position: absolute; top:0; left:0; width:100%; height:100%; background: linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(15, 23, 42, 0.8) 100%); z-index: 1;"></div>
    
    <div class="container" style="position: relative; z-index: 2;">
        <div class="animate-subtle" style="max-width: 720px;">
            <span style="color: var(--primary); font-weight: 800; text-transform: uppercase; letter-spacing: 4px; display: block; margin-bottom: 1.5rem; font-size: 0.85rem;">Strategic Digital Partner</span>
            <h1 style="font-size: clamp(2.5rem, 5vw, 4rem); line-height: 1.1; font-weight: 900; color: white; margin-bottom: 2rem; letter-spacing: -2px;">
                Membangun <span style="color: var(--primary);">Ekosistem Teknologi</span> yang Mendorong Skala Bisnis.
            </h1>
            <p style="font-size: 1.2rem; color: #94a3b8; margin-bottom: 3rem; line-height: 1.8; font-weight: 400; max-width: 600px;">
                Kami membantu para pemimpin bisnis mengatasi kompleksitas operasional melalui pendekatan teknologi yang terukur, aman, dan berorientasi hasil.
            </p>
            <div style="display: flex; gap: 20px;">
                <a href="{{ route('agency.contact') }}" class="btn-strategic" style="background: var(--primary);">Mulai Konsultasi</a>
                <a href="#pendekatan" style="display: inline-block; padding: 16px 36px; border: 1.5pt solid rgba(255,255,255,0.3); color: white; text-decoration: none; border-radius: 8px; font-weight: 700; font-family: 'Outfit'; transition: all 0.3s;">Pelajari Pendekatan</a>
            </div>
        </div>
    </div>
</section>

<!-- THE STRATEGIC GAP SECTION -->
<section class="section">
    <div class="container">
        <div style="display: grid; grid-template-columns: 1fr 1.2fr; gap: 80px; align-items: center;">
            <div>
                <span style="color: #64748b; font-weight: 800; text-transform: uppercase; letter-spacing: 2px; font-size: 0.8rem;">The Digital Gap</span>
                <h2 class="section-title">Masalah Bisnis yang Kami Selesaikan.</h2>
                <div style="width: 50px; height: 4px; background: var(--primary); margin: 30px 0;"></div>
                <p style="font-size: 1.1rem; color: #64748b; margin-bottom: 2rem;">
                    Banyak bisnis terjebak dalam sistem yang terfragmentasi, proses manual yang melelahkan, dan ketidakpastian data. Kami hadir untuk menjembatani celah tersebut.
                </p>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px;">
                <div style="padding: 30px; background: #fafafa; border-radius: 12px; border-left: 4pt solid #e2e8f0;">
                    <h3 style="font-size: 1.2rem; margin-bottom: 10px;">Fragmentasi Data</h3>
                    <p style="font-size: 0.9rem; color: #64748b;">Menyatukan informasi yang terpisah untuk pengambilan keputusan yang tepat.</p>
                </div>
                <div style="padding: 30px; background: #fafafa; border-radius: 12px; border-left: 4pt solid #e2e8f0;">
                    <h3 style="font-size: 1.2rem; margin-bottom: 10px;">Inefisiensi Proses</h3>
                    <p style="font-size: 0.9rem; color: #64748b;">Mengotomatiskan alur kerja manual yang menghambat produktivitas tim.</p>
                </div>
                <div style="padding: 30px; background: #fafafa; border-radius: 12px; border-left: 4pt solid #e2e8f0;">
                    <h3 style="font-size: 1.2rem; margin-bottom: 10px;">Skalabilitas Terbatas</h3>
                    <p style="font-size: 0.9rem; color: #64748b;">Membangun fondasi teknologi yang siap tumbuh seiring bisnis Anda.</p>
                </div>
                <div style="padding: 30px; background: #fafafa; border-radius: 12px; border-left: 4pt solid #e2e8f0;">
                    <h3 style="font-size: 1.2rem; margin-bottom: 10px;">Resiko Keamanan</h3>
                    <p style="font-size: 0.9rem; color: #64748b;">Melindungi aset digital dan data sensitif perusahaan secara menyeluruh.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- OUR APPROACH SECTION -->
<div id="pendekatan"></div>
<section class="section" style="background: var(--secondary); color: white;">
    <div class="container">
        <div style="text-align: center; max-width: 800px; margin: 0 auto 80px;">
            <span style="color: var(--primary); font-weight: 800; text-transform: uppercase; letter-spacing: 3px; font-size: 0.8rem;">Our Methodology</span>
            <h2 class="section-title" style="color: white; margin-top: 15px;">Pendekatan Strategis Kami.</h2>
            <p style="color: #94a3b8; font-size: 1.2rem;">Bukan sekadar *vendor*, kami berperan sebagai *partner* yang memahami logika bisnis Anda sebelum menyentuh baris kode.</p>
        </div>

        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 40px;">
            <div style="text-align: center;">
                <div style="width: 80px; height: 80px; background: rgba(255,255,255,0.05); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 30px; border: 1px solid rgba(255,255,255,0.1); color: var(--primary); font-family: 'Outfit'; font-size: 2rem; font-weight: 900;">01</div>
                <h3 style="color: white; margin-bottom: 15px; font-size: 1.4rem;">Diagnosis & Audit</h3>
                <p style="color: #94a3b8; font-size: 0.95rem;">Kami menganalisis infrastruktur dan alur bisnis Anda untuk menemukan celah inefisiensi.</p>
            </div>
            <div style="text-align: center;">
                <div style="width: 80px; height: 80px; background: rgba(255,255,255,0.05); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 30px; border: 1px solid rgba(255,255,255,0.1); color: var(--primary); font-family: 'Outfit'; font-size: 2rem; font-weight: 900;">02</div>
                <h3 style="color: white; margin-bottom: 15px; font-size: 1.4rem;">Arsitektur Solusi</h3>
                <p style="color: #94a3b8; font-size: 0.95rem;">Merancang blueprint teknologi yang spesifik untuk tantangan unik perusahaan Anda.</p>
            </div>
            <div style="text-align: center;">
                <div style="width: 80px; height: 80px; background: rgba(255,255,255,0.05); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 30px; border: 1px solid rgba(255,255,255,0.1); color: var(--primary); font-family: 'Outfit'; font-size: 2rem; font-weight: 900;">03</div>
                <h3 style="color: white; margin-bottom: 15px; font-size: 1.4rem;">Eksekusi & Skalasi</h3>
                <p style="color: #94a3b8; font-size: 0.95rem;">Implementasi sistem secara bertahap dengan fokus pada stabilisasi dan pertumbuhan.</p>
            </div>
        </div>
    </div>
</section>

<!-- CALL TO ACTION -->
<section class="section" style="background: white; border-top: 1px solid #f1f5f9;">
    <div class="container">
        <div style="background: var(--bg-light); padding: 80px; border-radius: 20px; text-align: center; border: 1px solid #f1f5f9;">
            <h2 class="section-title">Mari Diskusikan Strategi <span style="color: var(--primary);">Digital</span> Anda.</h2>
            <p style="color: #64748b; font-size: 1.2rem; max-width: 600px; margin: 0 auto 40px;">Bawa bisnis Anda ke level berikutnya dengan ekosistem teknologi yang tepat. Tim ahli kami siap mendengarkan tantangan Anda.</p>
            <a href="{{ route('agency.contact') }}" class="btn-strategic">Mulai Diskusi</a>
        </div>
    </div>
</section>
@endsection
