import React, { useState, useEffect } from 'react';
import SimulationWrapper from './SimulationWrapper';

const AkabSimulation = ({ onClose }) => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        const mainElement = document.getElementById('akab-main-scroll');
        if (mainElement) {
            mainElement.addEventListener('scroll', handleScroll);
            return () => mainElement.removeEventListener('scroll', handleScroll);
        }
    }, []);

    const Logo = () => (
        <img src="/images/akab-logo.png" alt="AKAB AGRO" className="h-12 w-auto object-contain" />
    );

    return (
        <SimulationWrapper onClose={onClose} title="AKAB AGRO - Corporate Landing Page">
            <div id="akab-main-scroll" className="h-full overflow-y-auto bg-slate-50 font-sans text-slate-800">

                {/* Navigation */}
                <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
                    <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                        <Logo />
                        <div className="hidden md:flex items-center gap-8 font-medium text-sm text-slate-600">
                            <a href="#about" className="hover:text-green-700 transition-colors">Tentang Kami</a>
                            <a href="#products" className="hover:text-green-700 transition-colors">Produk Bibit</a>
                            <a href="#capacity" className="hover:text-green-700 transition-colors">Kapasitas</a>
                            <a href="#order" className="px-6 py-2.5 bg-green-700 text-white rounded-lg hover:bg-green-800 transition-colors font-bold">
                                Pesan Partai Besar
                            </a>
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <header className="relative pt-12 pb-24 px-6 overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        <img
                            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1920&q=80"
                            alt="Lahan Pertanian Luas"
                            className="w-full h-full object-cover opacity-20"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-slate-50/80 to-slate-50"></div>
                    </div>

                    <div className="max-w-7xl mx-auto relative z-10 text-center">
                        <span className="inline-block px-4 py-2 bg-green-100 text-green-800 text-xs font-bold tracking-widest uppercase rounded-full mb-6">
                            B2B Agriculture Solution
                        </span>
                        <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 leading-tight tracking-tight">
                            Supplier Bibit Pertanian <br />
                            <span className="text-green-700">Berkualitas Skala Besar</span>
                        </h1>
                        <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed">
                            Melayani pemesanan partai besar untuk petani, kelompok tani, dan proyek agribisnis di seluruh Indonesia dengan standar mutu terjamin.
                        </p>
                        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                            <button className="w-full md:w-auto px-8 py-4 bg-green-700 text-white font-bold rounded-xl hover:bg-green-800 shadow-lg shadow-green-700/30 transition-all transform hover:-translate-y-1">
                                Ajukan Pemesanan Besar
                            </button>
                            <button className="w-full md:w-auto px-8 py-4 bg-white text-slate-700 border-2 border-slate-200 font-bold rounded-xl hover:border-green-600 hover:text-green-700 transition-colors">
                                Konsultasi Kebutuhan
                            </button>
                        </div>

                        {/* Stats Preview */}
                        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto border-t border-slate-200 pt-8">
                            {[
                                { val: '500k+', label: 'Bibit/Bulan' },
                                { val: '100%', label: 'Quality Control' },
                                { val: '30+', label: 'Kota Jangkauan' },
                                { val: 'B2B', label: 'Fokus Utama' },
                            ].map((stat, i) => (
                                <div key={i}>
                                    <div className="text-2xl md:text-3xl font-black text-green-700">{stat.val}</div>
                                    <div className="text-sm font-bold text-slate-500 uppercase tracking-wider">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </header>

                {/* About Us */}
                <section id="about" className="py-20 px-6 bg-white">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div className="relative">
                            <div className="absolute -top-4 -left-4 w-24 h-24 bg-green-100 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
                            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-yellow-100 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                                <img
                                    src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=800&q=80"
                                    alt="Greenhouse Modern"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                        <div>
                            <h2 className="text-3xl font-black text-slate-900 mb-6">Mitra Terpercaya Agribisnis Indonesia</h2>
                            <p className="text-slate-600 mb-6 leading-relaxed">
                                AKAB AGRO adalah perusahaan agrikultur yang berfokus pada produksi dan distribusi bibit unggul. Kami bukan sekadar penjual, tapi mitra strategis bagi pertanian skala besar.
                            </p>
                            <p className="text-slate-600 mb-8 leading-relaxed">
                                Dengan fasilitas greenhouse modern dan tim agronom berpengalaman, kami memastikan setiap benih yang kami kirim memiliki daya tumbuh tinggi dan ketahanan yang teruji.
                            </p>

                            <div className="space-y-4">
                                {[
                                    'Bibit teruji & terseleksi ketat',
                                    'Standar kontrol kualitas benih bersertifikat',
                                    'Siap supply partai besar & rutin'
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-700">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <span className="font-bold text-slate-700">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Product Section */}
                <section id="products" className="py-20 px-6 bg-slate-50">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-black text-slate-900 mb-4">Katalog Bibit Unggul</h2>
                            <p className="text-slate-600 max-w-2xl mx-auto">
                                Kami menyediakan berbagai varietas bibit berkualitas tinggi untuk memaksimalkan hasil panen Anda.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                { title: 'Bibit Padi', img: 'https://images.unsplash.com/photo-1599940824399-b87987ce0799?auto=format&fit=crop&w=600&q=80', min: '500 kg', items: ['Inpari 32', 'Ciherang', 'Mapan P-05'] },
                                { title: 'Bibit Jagung', img: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=600&q=80', min: '200 kg', items: ['Pertiwi 3', 'Bisi 18', 'Pioneer P35'] },
                                { title: 'Hortikultura', img: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=600&q=80', min: '1000 pcs', items: ['Cabai Rawit', 'Tomat Servo', 'Terong'] },
                                { title: 'Perkebunan', img: 'https://images.unsplash.com/photo-1596706037748-bd03a744275f?auto=format&fit=crop&w=600&q=80', min: '500 btg', items: ['Sawit', 'Kopi', 'Kakao'] }
                            ].map((prod, i) => (
                                <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow border border-slate-100 group">
                                    <div className="h-48 overflow-hidden relative">
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10"></div>
                                        <img src={prod.img} alt={prod.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                        <div className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-slate-800">
                                            Min. {prod.min}
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-slate-900 mb-4">{prod.title}</h3>
                                        <div className="space-y-2 mb-6">
                                            {prod.items.map((item, j) => (
                                                <div key={j} className="flex items-center text-sm text-slate-600">
                                                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
                                                    {item}
                                                </div>
                                            ))}
                                        </div>
                                        <button className="w-full py-3 bg-slate-50 text-slate-700 font-bold rounded-lg hover:bg-green-700 hover:text-white transition-colors text-sm">
                                            Cek Spesifikasi
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Capacity & Scale */}
                <section id="capacity" className="py-20 px-6 bg-slate-900 text-white relative overflow-hidden">
                    <img
                        src="https://images.unsplash.com/photo-1628352081506-83c43123ed6d?auto=format&fit=crop&w=1920&q=80"
                        alt="Background"
                        className="absolute inset-0 w-full h-full object-cover opacity-10"
                    />
                    <div className="max-w-7xl mx-auto relative z-10">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <h2 className="text-3xl font-black mb-6">Kapasitas Produksi Skala Industri</h2>
                                <p className="text-slate-300 mb-8 text-lg leading-relaxed">
                                    Kami memahami kebutuhan proyek besar yang membutuhkan kepastian supply. Dengan lahan produksi seluas 50 Hektar dan sistem nursery modern, kami menjamin ketersediaan stok sepanjang tahun.
                                </p>
                                <div className="grid grid-cols-2 gap-8">
                                    {[
                                        { val: '50 Ha', label: 'Luas Lahan Produksi' },
                                        { val: '500.000', label: 'Bibit per Bulan' },
                                        { val: '15', label: 'Agronom Ahli' },
                                        { val: '24/7', label: 'Monitoring Sistem' }
                                    ].map((stat, i) => (
                                        <div key={i}>
                                            <div className="text-3xl font-black text-green-400 mb-1">{stat.val}</div>
                                            <div className="text-sm text-slate-400 font-medium">{stat.label}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
                                <h3 className="text-xl font-bold mb-6">Standardisasi Mutu</h3>
                                <div className="space-y-6">
                                    {[
                                        { title: 'Seleksi Genetik', desc: 'Hanya menggunakan induk terbaik untuk hasil maksimal.' },
                                        { title: 'Perlakuan Benih', desc: 'Coating fungisida & nutrisi awal untuk daya tumbuh.' },
                                        { title: 'Uji Laboratorium', desc: 'Pengecekan rutin kemurnian dan viabilitas benih.' }
                                    ].map((step, i) => (
                                        <div key={i} className="flex gap-4">
                                            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center font-bold text-lg shrink-0">
                                                {i + 1}
                                            </div>
                                            <div>
                                                <div className="font-bold text-lg">{step.title}</div>
                                                <div className="text-slate-400 text-sm">{step.desc}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Steps Order */}
                <section className="py-20 px-6 bg-white">
                    <div className="max-w-7xl mx-auto text-center">
                        <h2 className="text-3xl font-black text-slate-900 mb-16">Alur Pemesanan B2B</h2>
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative">
                            {/* Connector Line (Desktop) */}
                            <div className="hidden md:block absolute top-8 left-0 right-0 h-0.5 bg-slate-200 -z-10"></div>

                            {[
                                { title: 'Request', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
                                { title: 'Konsultasi', icon: 'M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z' },
                                { title: 'Penawaran', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
                                { title: 'Produksi', icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z' },
                                { title: 'Pengiriman', icon: 'M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4' }
                            ].map((step, i) => (
                                <div key={i} className="flex flex-col items-center gap-4 bg-white">
                                    <div className="w-16 h-16 rounded-2xl bg-white border-2 border-slate-200 flex items-center justify-center text-slate-400 shadow-sm z-10 transition-colors hover:border-green-500 hover:text-green-600">
                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={step.icon} />
                                        </svg>
                                    </div>
                                    <div className="font-bold text-slate-800">{step.title}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Target & Klien */}
                <section className="py-20 px-6 bg-slate-50 border-t border-slate-200">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-black text-slate-900 mb-4">Jangkauan & Klien Strategis</h2>
                            <p className="text-slate-600 max-w-2xl mx-auto">
                                Kami bangga menjadi bagian dari pertumbuhan agribisnis di berbagai wilayah Indonesia melalui penyediaan bibit tersertifikasi.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {[
                                { title: 'Petani Skala Besar', wilayah: 'Jawa Timur & Tengah', desc: 'Suplai bibit padi & jagung rutin untuk lahan > 100 Ha.' },
                                { title: 'Kelompok Tani', wilayah: 'Sumatera Utara', desc: 'Pendampingan & penyediaan bibit hortikultura berkualitas.' },
                                { title: 'Proyek Daerah', wilayah: 'Kalimantan & Sulawesi', desc: 'Pengadaan bibit perkebunan untuk program revitalisasi lahan.' },
                                { title: 'Distributor Agrikultur', wilayah: 'Seluruh Indonesia', desc: 'Kemitraan distribusi bibit unggul untuk jangkauan luas.' }
                            ].map((klien, i) => (
                                <div key={i} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                                    <h3 className="text-lg font-bold text-slate-900 mb-1">{klien.title}</h3>
                                    <p className="text-sm font-bold text-green-700 mb-4">{klien.wilayah}</p>
                                    <p className="text-sm text-slate-500 leading-relaxed">{klien.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Order Form Section */}
                <section id="order" className="py-24 px-6 bg-green-900">
                    <div className="max-w-4xl mx-auto bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
                        <div className="p-8 md:p-12 md:w-1/2 bg-slate-50 flex flex-col justify-between">
                            <div>
                                <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full mb-4">FORMULIR PROYEK</span>
                                <h2 className="text-3xl font-black text-slate-900 mb-4">Mulai Kerja Sama</h2>
                                <p className="text-slate-600 leading-relaxed mb-8">
                                    Isi formulir ini untuk mendapatkan penawaran harga terbaik khusus pemesanan partai besar. Tim kami akan merespons dalam 1x24 jam.
                                </p>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 text-slate-600">
                                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    <span className="font-medium">+62 812-3456-7890</span>
                                </div>
                                <div className="flex items-center gap-3 text-slate-600">
                                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    <span className="font-medium">marketing@akabagro.com</span>
                                </div>
                            </div>
                        </div>
                        <div className="p-8 md:p-12 md:w-1/2">
                            <form className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Nama Lengkap</label>
                                    <input type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-green-500 font-medium" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Nama Perusahaan / Kelompok</label>
                                    <input type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-green-500 font-medium" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Jenis Bibit</label>
                                    <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-green-500 font-medium">
                                        <option>Pilih Jenis Bibit</option>
                                        <option>Padi</option>
                                        <option>Jagung</option>
                                        <option>Hortikultura</option>
                                        <option>Perkebunan</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Estimasi Volume (Qty)</label>
                                    <input type="text" placeholder="Contoh: 10.000 batang" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-green-500 font-medium" />
                                </div>
                                <button className="w-full py-4 bg-green-700 text-white font-bold rounded-lg hover:bg-green-800 transition-colors mt-4">
                                    Kirim Permintaan Penawaran
                                </button>
                            </form>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-slate-900 text-slate-400 py-12 px-6 border-t border-slate-800">
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                        <div className="flex flex-col items-center md:items-start gap-4">
                            <div className="bg-white p-2 rounded-lg inline-block">
                                <Logo />
                            </div>
                            <p className="text-sm text-center md:text-left max-w-xs">
                                Mitra strategis penyediaan bibit pertanian unggul untuk ketahanan pangan Indonesia.
                            </p>
                        </div>
                        <div className="text-sm text-center md:text-right">
                            <p className="font-bold text-white mb-2">Kantor Pusat</p>
                            <p>Jl. Raya Pertanian No. 88, Malang</p>
                            <p>Jawa Timur, Indonesia</p>
                            <p className="mt-4">© 2024 AKAB AGRO. All rights reserved.</p>
                        </div>
                    </div>
                </footer>

            </div>
        </SimulationWrapper>
    );
};

export default AkabSimulation;
