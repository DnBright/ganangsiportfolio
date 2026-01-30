import React, { useState, useEffect } from 'react';

const DraftAI = ({ analysisData, onBack, onNext }) => {
    const [isGenerating, setIsGenerating] = useState(true);
    const [draftContent, setDraftContent] = useState('');
    const [generationStep, setGenerationStep] = useState(0);

    const steps = [
        "Menganalisis profil bisnis & kompetitor...",
        "Menyusun strategi solusi digital...",
        "Mendalami pemahaman masalah klien...",
        "Menyusun ruang lingkup pekerjaan detail...",
        "Memformulasikan estimasi timeline proyek...",
        "Melakukan polishing bahasa profesional..."
    ];

    useEffect(() => {
        let currentStep = 0;
        const interval = setInterval(() => {
            if (currentStep < steps.length - 1) {
                currentStep++;
                setGenerationStep(currentStep);
            }
        }, 800);

        const timer = setTimeout(() => {
            clearInterval(interval);
            setIsGenerating(false);

            const detailedContent = `
# PROPOSAL STRATEGIS PENGEMBANGAN EKOSISTEM DIGITAL
**Dipasok Khusus Untuk:** ${analysisData.client_name || 'Klien'}
**Industri:** ${analysisData.industry}
**Tanggal:** ${new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}

---

## 1. PENDAHULUAN: VISI & TRANSFORMASI DIGITAL
Terima kasih atas kepercayaan Anda kepada DNB Agency. Proposal ini bukanlah sekadar dokumen penawaran teknis, melainkan sebuah peta jalan strategis untuk membawa bisnis Anda ke level berikutnya melalui keunggulan digital.

Dalam era ekonomi digital saat ini, kehadiran website bukan lagi pilihan, melainkan fondasi utama kredibilitas. Bisnis di sektor ${analysisData.industry} menuntut kepercayaan tinggi dari calon konsumen, dan website adalah representasi pertama dari integritas layanan Anda. Kami hadir untuk memastikan pesan brand Anda tersampaikan dengan jernih, profesional, dan mampu mengonversi pengunjung menjadi klien setia.

## 2. PEMAHAMAN MENDALAM TERHADAP KEBUTUHAN KLIEN
Setelah melakukan analisis terhadap profil bisnis Anda, kami mengidentifikasi bahwa hambatan utama yang sedang dihadapi adalah:
> **"${analysisData.client_problem}"**

**Analisis Akar Masalah:**
- **In-efisiensi Operasional:** Proses manual yang masih dominan menyebabkan potensi human error dan keterlambatan respon terhadap permintaan klien.
- **Lost Opportunity:** Ketidakadaan platform yang dapat diakses 24/7 membuat Anda kehilangan peluang closing saat tim sedang offline.
- **Trust Deficit:** Calon klien di era modern cenderung melakukan riset digital sebelum transaksi; tanpa website yang memadai, brand Anda berisiko dianggap kurang kompeten dibandingkan kompetitor.

## 3. SOLUSI STRATEGIS: PENGEMBANGAN WEBSITE HIGH-CONVERSION
Kami tidak hanya memberikan "website", kami membangun sebuah "mesin pertumbuhan". Solusi yang kami tawarkan mencakup:

**A. Arsitektur Berfokus Nilai (Value-Driven Architecture)**
Website akan dirancang dengan psikologi warna dan tata letak yang memaksa pengunjung untuk melihat nilai utama (unique selling point) bisnis Anda dalam 3 detik pertama.

**B. Sistem Manajemen Konten Mandiri**
Anda akan memiliki kontrol penuh untuk memperbarui portofolio, layanan, atau pengumuman tanpa harus memiliki keahlian coding. Ini adalah efisiensi jangka panjang yang kami tawarkan.

**C. Optimasi Keamanan & Kecepatan**
Menggunakan standar enkripsi modern untuk menjaga data klien Anda dan memastikan website dapat diakses dengan cepat bahkan di koneksi internet yang terbatas.

## 4. RUANG LINGKUP PEKERJAAN (DETAILED SCOPE)
Pengerjaan akan dibagi menjadi beberapa modul krusial:

- **Modul Strategi & UX:** Penentuan struktur informasi, pembuatan sitemap, dan wireframing interaktif.
- **Modul Desain Visual:** Pembuatan antarmuka (UI) yang mencerminkan karakter kuat dari brand ${analysisData.client_name}.
- **Modul Pengembangan Backend:** Pembangunan database yang kokoh, sistem pendaftaran online, dan integrasi WhatsApp API.
- **Modul Optimasi SEO Dasar:** Memastikan bisnis Anda mudah ditemukan di Google untuk kata kunci relevan di industri ${analysisData.industry}.
- **Modul Pelatihan (Handover):** Sesi khusus untuk mengajari tim Anda cara mengoperasikan dashboard website secara maksimal.

## 5. ESTIMASI TIMELINE & TAHAPAN SPRINT
Proyek ini akan dikerjakan menggunakan metodologi Agile untuk menjamin transparansi:

- **Fase 1: Discovery & Planning (Hari 1-3)**
  Validasi requirement, pengumpulan aset konten, dan finalisasi sitemap.
- **Fase 2: UI/UX Design Sprint (Hari 4-8)**
  Pembuatan prototype desain untuk Anda tinjau dan setujui sebelum masuk tahap coding.
- **Fase 3: Development & Integration (Hari 9-20)**
  Proses coding intensif, integrasi fitur fungsional, dan pembangunan database.
- **Fase 4: Internal Testing & Bug Fixing (Hari 21-24)**
  Uji coba di berbagai perangkat (Mobile, Tablet, Desktop) untuk memastikan performa maksimal.
- **Fase 5: Launch & Training (Hari 25-30)**
  Migrasi ke domain utama dan training operasional untuk tim Anda.

## 6. PENUTUP & KOMITMEN KEMITRAAN
Investasi digital adalah investasi jangka panjang. DNB Agency berkomitmen untuk tidak hanya menjadi "vendor", tetapi menjadi mitra pertumbuhan yang siap mendukung keberlanjutan bisnis Anda.

Kami percaya bahwa dengan solusi yang tepat, hambatan operasional Anda saat ini akan berubah menjadi keunggulan kompetitif yang signifikan. Kami siap memulai langkah besar ini bersama Anda.

**Hormat Kami,**
*Project Lead - DNB Agency*
            `;
            setDraftContent(detailedContent);
        }, 5000);

        return () => {
            clearInterval(interval);
            clearTimeout(timer);
        };
    }, [analysisData]);

    return (
        <div className="space-y-6 animate-fade-up animate-duration-500 pb-10">
            {/* Header Content */}
            <div className="bg-[#0f1535]/60 backdrop-blur-xl border border-white/10 rounded-[30px] p-8 overflow-hidden relative group">
                <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-cyan-500/10 blur-[80px] rounded-full group-hover:bg-cyan-500/15 transition-all duration-700" />

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-cyan-600 to-blue-500 rounded-2xl flex items-center justify-center text-xl shadow-lg shadow-cyan-600/20">
                            🤖
                        </div>
                        <div>
                            <h2 className="text-xl font-bold tracking-tight">AI Senior Writing Center</h2>
                            <p className="text-xs text-white/40">Menghasilkan dokumen strategis densitas tinggi (5-6 Halaman).</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={onBack}
                            className="px-6 py-2.5 rounded-xl border border-white/10 text-xs font-bold hover:bg-white/5 transition-all"
                        >
                            ← Kembali ke Input
                        </button>
                    </div>
                </div>
            </div>

            {/* AI Output Section */}
            <div className="bg-[#0f1535]/60 backdrop-blur-xl border border-white/10 rounded-[30px] p-8 md:p-12 relative min-h-[600px]">
                {isGenerating ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center space-y-8">
                        <div className="relative">
                            <div className="w-24 h-24 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin" />
                            <div className="absolute inset-0 flex items-center justify-center text-3xl">📝</div>
                        </div>
                        <div className="text-center space-y-3">
                            <h3 className="text-xl font-bold tracking-tight">{steps[generationStep]}</h3>
                            <div className="flex items-center justify-center gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-cyan-500 animate-bounce [animation-delay:-0.3s]"></span>
                                <span className="h-1.5 w-1.5 rounded-full bg-cyan-500 animate-bounce [animation-delay:-0.15s]"></span>
                                <span className="h-1.5 w-1.5 rounded-full bg-cyan-500 animate-bounce"></span>
                            </div>
                            <p className="text-xs text-white/40 italic mt-4">"Membangun narasi strategis untuk mengatasi masalah: ${analysisData.client_problem}"</p>
                        </div>
                    </div>
                ) : (
                    <div className="animate-fade">
                        <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/5">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                <span className="text-[10px] font-bold text-white/40 uppercase tracking-[4px]">Penyusunan Selesai</span>
                            </div>
                            <div className="flex gap-4">
                                <div className="text-right">
                                    <p className="text-[10px] text-white/20 uppercase font-bold">Estimasi Panjang</p>
                                    <p className="text-xs font-bold text-cyan-400">5.5 Halaman Standar</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-[#060b26]/50 rounded-[30px] p-8 md:p-10 border border-white/5 whitespace-pre-wrap font-sans text-sm md:text-base leading-relaxed text-white/90 selection:bg-cyan-500/30">
                            {draftContent}
                        </div>

                        <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-6 pt-10 border-t border-white/5">
                            <div className="flex flex-col gap-1">
                                <h4 className="text-xs font-bold text-white/80">Draft Hasil Analisis Tersedia</h4>
                                <p className="text-[10px] text-white/30 leading-relaxed max-w-sm">Tinjau hasil ini dan berikan sentuhan manusia di tahap Editor untuk memasukkan strategi harga.</p>
                            </div>

                            <button
                                onClick={() => onNext(draftContent)}
                                className="w-full md:w-auto px-10 py-5 bg-gradient-to-r from-cyan-600 to-cyan-400 hover:from-cyan-500 hover:to-cyan-300 text-white rounded-[24px] font-bold text-sm tracking-wide shadow-xl shadow-cyan-500/20 active:scale-95 transition-all flex items-center gap-3 justify-center"
                            >
                                🖊️ Beralih ke Editor Manual
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DraftAI;
