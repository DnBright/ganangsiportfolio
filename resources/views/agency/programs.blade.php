@extends('agency.layout')

@section('title', 'Solusi Strategis - DNB Agency')

@section('content')
<section class="section" style="background: #fafafa; padding: 120px 0 60px;">
    <div class="container">
        <div class="animate-subtle" style="max-width: 800px;">
            <span style="color: var(--primary); font-weight: 800; text-transform: uppercase; letter-spacing: 3px; font-size: 0.85rem; display: block; margin-bottom: 1rem;">Solutions Ecosystem</span>
            <h1 style="font-size: 3.5rem; font-weight: 900; margin-bottom: 1.5rem; letter-spacing: -2px; line-height: 1.1;">Solusi Teknologi untuk <span style="color: var(--primary);">Pertumbuhan</span> Bisnis.</h1>
            <p style="font-size: 1.25rem; color: #64748b; line-height: 1.8;">
                Kami merancang dan membangun infrastruktur digital yang mendukung efisiensi operasional dan skalabilitas bisnis jangka panjang.
            </p>
        </div>
    </div>
</section>

<section class="section" style="background: white;">
    <div class="container">
        <div style="display: grid; gap: 6rem;">
            
            <!-- Enterprise Sales Platform -->
            <div style="display: grid; grid-template-columns: 1fr 1.2fr; gap: 80px; align-items: center;" class="animate-subtle">
                <div style="background: #f8fafc; border-radius: 20px; padding: 40px; border: 1px solid #f1f5f9; box-shadow: 0 30px 60px -20px rgba(0,0,0,0.05);">
                    <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" alt="Enterprise Solutions" style="width: 100%; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
                </div>
                <div>
                    <h2 style="font-size: 2.2rem; font-weight: 900; margin-bottom: 20px; letter-spacing: -1px;">Integrated Sales Ecosystem</h2>
                    <p style="color: #64748b; margin-bottom: 2.5rem; font-size: 1.1rem; line-height: 1.8;">
                        Transformasikan proses penjualan manual menjadi ekosistem digital yang terintegrasi. Pantau setiap transaksi, kelola stok secara real-time, dan tingkatkan akurasi data finansial.
                    </p>
                    <ul style="list-style: none; margin-bottom: 3rem;">
                        <li style="display: flex; align-items: center; gap: 15px; margin-bottom: 15px; color: var(--text-dark); font-weight: 600;">
                            <svg style="width: 24px; color: var(--primary);" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg> 
                            Sentralisasi Data Penjualan & Pelanggan
                        </li>
                        <li style="display: flex; align-items: center; gap: 15px; margin-bottom: 15px; color: var(--text-dark); font-weight: 600;">
                            <svg style="width: 24px; color: var(--primary);" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg> 
                            Otomasi Manajemen Stok (Inventory)
                        </li>
                        <li style="display: flex; align-items: center; gap: 15px; margin-bottom: 15px; color: var(--text-dark); font-weight: 600;">
                            <svg style="width: 24px; color: var(--primary);" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg> 
                            Laporan Keuangan & ROI Analitik
                        </li>
                    </ul>
                    <a href="{{ route('agency.contact') }}" class="btn-strategic">Dapatkan Case Study</a>
                </div>
            </div>

            <hr style="border: 0; border-top: 1px solid #f1f5f9;">

            <!-- Operations Automation -->
            <div style="display: grid; grid-template-columns: 1.2fr 1fr; gap: 80px; align-items: center;" class="animate-subtle">
                <div style="order: 2; background: #f8fafc; border-radius: 20px; padding: 40px; border: 1px solid #f1f5f9; box-shadow: 0 30px 60px -20px rgba(0,0,0,0.05);">
                    <img src="https://images.unsplash.com/photo-1551288049-bbdac8a28a1e?auto=format&fit=crop&w=800&q=80" alt="Operations Excellence" style="width: 100%; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
                </div>
                <div style="order: 1;">
                    <h2 style="font-size: 2.2rem; font-weight: 900; margin-bottom: 20px; letter-spacing: -1px;">Operational Excellence Framework</h2>
                    <p style="color: #64748b; margin-bottom: 2.5rem; font-size: 1.1rem; line-height: 1.8;">
                        Gantikan proses manual yang rentan kesalahan dengan alur kerja digital yang presisi. Kami membangun sistem yang menjaga kualitas operasional tetap konsisten saat bisnis Anda tumbuh.
                    </p>
                    <ul style="list-style: none; margin-bottom: 3rem;">
                        <li style="display: flex; align-items: center; gap: 15px; margin-bottom: 15px; color: var(--text-dark); font-weight: 600;">
                            <svg style="width: 24px; color: var(--primary);" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg> 
                            Workflow Automation (BPM)
                        </li>
                        <li style="display: flex; align-items: center; gap: 15px; margin-bottom: 15px; color: var(--text-dark); font-weight: 600;">
                            <svg style="width: 24px; color: var(--primary);" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg> 
                            Custom ERP & Resource Planning
                        </li>
                        <li style="display: flex; align-items: center; gap: 15px; margin-bottom: 15px; color: var(--text-dark); font-weight: 600;">
                            <svg style="width: 24px; color: var(--primary);" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg> 
                            Internal Control & Risk Mitigation
                        </li>
                    </ul>
                    <a href="{{ route('agency.contact') }}" class="btn-strategic">Edukasi Solusi</a>
                </div>
            </div>

        </div>
    </div>
</section>

<section class="section" style="background: var(--bg-light); border-top: 1px solid #eee;">
    <div class="container" style="text-align: center;">
        <h2 class="section-title">Ingin Solusi yang Lebih Spesifik?</h2>
        <p style="color: #64748b; font-size: 1.2rem; margin-bottom: 40px; max-width: 600px; margin-left: auto; margin-right: auto;">Setiap bisnis memiliki tantangan unik. Mari bicarakan bagaimana kami bisa membantu menyelesaikannya.</p>
        <a href="{{ route('agency.contact') }}" class="btn-strategic">Hubungi Partner Strategis</a>
    </div>
</section>
@endsection
