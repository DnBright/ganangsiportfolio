<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kursus Jepang - Raih Impian Kerjamu di Jepang</title>
    <link rel="stylesheet" href="{{ asset('css/landing.css') }}">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Noto+Sans+JP:wght@400;500;700;900&display=swap" rel="stylesheet">
    <script src="https://unpkg.com/lucide@latest"></script>
</head>
<body>

    <!-- Navbar -->
    <nav>
        <a href="/" class="logo">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="#E60012" stroke="none"><circle cx="12" cy="12" r="10"/></svg>
            <span>KursusJepang</span>
        </a>
        <ul class="nav-links">
            <li><a href="#about">Tentang LPK</a></li>
            <li><a href="#programs">Program Kursus</a></li>
            <li><a href="#sensei">Mentor</a></li>
            <li><a href="#testimonials">Alumni</a></li>
        </ul>
        <div class="auth-buttons">
            @if (Route::has('login'))
                @auth
                    <a href="{{ url('/dashboard') }}" class="btn-auth">Dashboard</a>
                @else
                    <a href="{{ route('login') }}" style="margin-right: 25px; text-decoration: none; color: var(--dark-grey); font-weight: 600;">Masuk</a>
                    @if (Route::has('register'))
                        <a href="{{ route('register') }}" class="btn-auth">Daftar Sekarang</a>
                    @endif
                @endauth
            @endif
        </div>
    </nav>

    <!-- Hero Section -->
    <header class="hero">
        <div class="hero-pattern"></div>
        <div class="hero-content reveal active">
            <div class="badge">
                <span>🇯🇵</span> #1 Platform Belajar Jepang Terpercaya
            </div>
            <h1>Jalan Pintas Karirmu <br>Menuju <span>Jepang.</span></h1>
            <p>Platform belajar bahasa Jepang & persiapan kerja online terlengkap. Kurikulum standar industri, mentor profesional, dan koneksi langsung ke perusahaan Jepang.</p>
            <div class="hero-buttons">
                <a href="{{ route('register') }}" class="btn-auth" style="padding: 15px 40px; font-size: 1.1rem;">Mulai Gratis</a>
                <a href="#programs" class="btn-secondary">Lihat Program</a>
            </div>
        </div>
        
        <div class="hero-image reveal active" style="transition-delay: 0.2s;">
            <div class="hero-blob"></div>
            <!-- Main Illustration -->
            <div style="position: relative; z-index: 10;">
                <img src="https://cdni.iconscout.com/illustration/premium/thumb/japanese-language-learning-illustration-download-in-svg-png-gif-file-formats--education-study-culture-school-pack-people-illustrations-3796645.png" alt="Belajar Jepang" style="width: 500px; max-width: 100%; filter: drop-shadow(0 20px 40px rgba(0,0,0,0.1));">
                
                <!-- Floating Cards -->
                <div class="floating-card card-top">
                    <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 5px;">
                        <span style="font-size: 1.5rem;">🎓</span>
                        <span style="font-weight: 700; color: var(--dark-grey);">Lulus JLPT</span>
                    </div>
                    <div style="height: 6px; background: #eee; border-radius: 10px; width: 100%; overflow: hidden;">
                        <div style="height: 100%; width: 100%; background: #4ADE80;"></div>
                    </div>
                </div>

                <div class="floating-card card-bottom">
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <div style="background: #E60012; color: white; padding: 10px; border-radius: 10px;">
                            <i data-lucide="briefcase"></i>
                        </div>
                        <div>
                            <p style="font-size: 0.8rem; color: #666;">Tokutei Ginou</p>
                            <h4 style="font-weight: 800;">Job Ready</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>

    <!-- Stats Strip -->
    <div class="stats-strip reveal">
        <div class="stat-item">
            <h3>1,200+</h3>
            <p>Siswa Aktif</p>
        </div>
        <div class="stat-item">
            <h3>98%</h3>
            <p>Tingkat Kelulusan</p>
        </div>
        <div class="stat-item">
            <h3>50+</h3>
            <p>Mitra Perusahaan</p>
        </div>
        <div class="stat-item">
            <h3>4.9/5</h3>
            <p>Rating Alumni</p>
        </div>
    </div>

    <!-- Programs Section -->
    <section id="programs">
        <div class="section-title reveal">
            <h2>Pilih Jalur Suksesmu</h2>
            <p>Kurikulum yang disusun khusus untuk kebutuhan industri dan sertifikasi internasional.</p>
        </div>
        <div class="program-grid">
            <!-- N5 Card -->
            <div class="glass-card reveal">
                <div class="card-icon">
                    <span style="font-size: 1.8rem; font-weight: 900;">N5</span>
                </div>
                <h3>Dasar Bahasa Jepang</h3>
                <p>Kuasai Hiragana, Katakana, dan percakapan dasar. Fondasi utama untuk pemula mutlak.</p>
                <ul style="list-style: none; margin-bottom: 25px; color: var(--text-grey);">
                    <li style="margin-bottom: 10px; display: flex; gap: 10px;"><i data-lucide="check-circle" style="width: 18px; color: #10B981;"></i> 20 Modul Video</li>
                    <li style="margin-bottom: 10px; display: flex; gap: 10px;"><i data-lucide="check-circle" style="width: 18px; color: #10B981;"></i> Sertifikat LPK</li>
                </ul>
                <a href="#" class="link-arrow">Lihat Silabus <i data-lucide="arrow-right" style="width: 18px;"></i></a>
            </div>

            <!-- N4 Card -->
            <div class="glass-card reveal" style="border-color: var(--primary-red); box-shadow: 0 20px 40px rgba(230, 0, 18, 0.05);">
                <div style="position: absolute; top: 20px; right: 20px; background: var(--primary-red); color: white; padding: 5px 12px; border-radius: 20px; font-size: 0.8rem; font-weight: 700;">POPULER</div>
                <div class="card-icon" style="background: var(--primary-red); color: white;">
                    <span style="font-size: 1.8rem; font-weight: 900;">N4</span>
                </div>
                <h3>Intermediate Level</h3>
                <p>Persiapan intensif JLPT N4. Syarat minimal untuk program Magang dan Tokutei Ginou.</p>
                <ul style="list-style: none; margin-bottom: 25px; color: var(--text-grey);">
                    <li style="margin-bottom: 10px; display: flex; gap: 10px;"><i data-lucide="check-circle" style="width: 18px; color: #10B981;"></i> 40 Modul + Live</li>
                    <li style="margin-bottom: 10px; display: flex; gap: 10px;"><i data-lucide="check-circle" style="width: 18px; color: #10B981;"></i> Simulasi Ujian</li>
                </ul>
                <a href="#" class="link-arrow">Lihat Silabus <i data-lucide="arrow-right" style="width: 18px;"></i></a>
            </div>

            <!-- Special Card -->
            <div class="glass-card reveal">
                <div class="card-icon">
                    <span style="font-size: 1.8rem; font-weight: 900;">TG</span>
                </div>
                <h3>Persiapan Tokutei Ginou</h3>
                <p>Fokus pada skill spesifik (Kaigo, Pengolahan Makanan, Pertanian) dan wawancara kerja.</p>
                <ul style="list-style: none; margin-bottom: 25px; color: var(--text-grey);">
                    <li style="margin-bottom: 10px; display: flex; gap: 10px;"><i data-lucide="check-circle" style="width: 18px; color: #10B981;"></i> Bimbingan Interview</li>
                    <li style="margin-bottom: 10px; display: flex; gap: 10px;"><i data-lucide="check-circle" style="width: 18px; color: #10B981;"></i> Penyaluran Kerja</li>
                </ul>
                <a href="#" class="link-arrow">Lihat Silabus <i data-lucide="arrow-right" style="width: 18px;"></i></a>
            </div>
        </div>
    </section>

    <!-- Sensei Section -->
    <section id="sensei" style="background: #FFF5F5;">
        <div class="section-title reveal">
            <h2>Belajar dari Ahlinya</h2>
            <p>Mentor kami adalah praktisi berpengalaman dan native speaker.</p>
        </div>
        <div class="sensei-grid">
            <div class="sensei-card reveal">
                <img src="https://randomuser.me/api/portraits/men/32.jpg" class="sensei-img" alt="Tanaka">
                <h3 style="font-size: 1.2rem; margin-bottom: 5px;">Tanaka Kenji</h3>
                <p style="color: var(--primary-red); font-weight: 600; font-size: 0.9rem;">Native Speaker</p>
                <p style="color: var(--text-grey); font-size: 0.9rem; margin-top: 10px;">"Bahasa adalah kunci budaya. Mari belajar dengan menyenangkan!"</p>
            </div>
            <div class="sensei-card reveal" style="transition-delay: 0.1s;">
                <img src="https://randomuser.me/api/portraits/women/44.jpg" class="sensei-img" alt="Sari">
                <h3 style="font-size: 1.2rem; margin-bottom: 5px;">Sari Pratiwi</h3>
                <p style="color: var(--primary-red); font-weight: 600; font-size: 0.9rem;">JLPT N1 Certified</p>
                <p style="color: var(--text-grey); font-size: 0.9rem; margin-top: 10px;">"Saya akan bantu kamu menaklukkan kanji dengan metode mudah."</p>
            </div>
            <div class="sensei-card reveal" style="transition-delay: 0.2s;">
                <img src="https://randomuser.me/api/portraits/men/86.jpg" class="sensei-img" alt="Budi">
                <h3 style="font-size: 1.2rem; margin-bottom: 5px;">Budi Santoso</h3>
                <p style="color: var(--primary-red); font-weight: 600; font-size: 0.9rem;">Ex-Tokutei Ginou</p>
                <p style="color: var(--text-grey); font-size: 0.9rem; margin-top: 10px;">"Tips dan trik lolos interview user Jepang ada di sini."</p>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer>
        <div class="footer-top">
            <div class="footer-brand">
                <h2>
                    <span style="background: white; color: var(--primary-red); width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.2rem;">🇯🇵</span>
                    KursusJepang
                </h2>
                <p style="color: #9CA3AF; line-height: 1.8;">
                    Mitra terbaikmu dalam meraih masa depan di Jepang. Kami menyediakan pelatihan bahasa komprehensif dan jalur karir terpercaya.
                </p>
            </div>
            <div class="footer-grid-links">
                <div class="footer-col">
                    <h4>Program</h4>
                    <a href="#">Kelas N5 Pemula</a>
                    <a href="#">Kelas N4 Lanjutan</a>
                    <a href="#">Tokutei Ginou</a>
                    <a href="#">Kebutuhan Industri</a>
                </div>
                <div class="footer-col">
                    <h4>Perusahaan</h4>
                    <a href="#">Tentang Kami</a>
                    <a href="#">Karir</a>
                    <a href="#">Blog</a>
                    <a href="#">Kontak</a>
                </div>
                <div class="footer-col">
                    <h4>Hubungi Kami</h4>
                    <a href="#">support@kursusjepang.com</a>
                    <a href="#">+62 812 3456 7890</a>
                    <a href="#">Jakarta Selatan, ID</a>
                    <div style="display: flex; gap: 15px; margin-top: 15px;">
                        <i data-lucide="instagram" style="color: white; width: 20px;"></i>
                        <i data-lucide="facebook" style="color: white; width: 20px;"></i>
                        <i data-lucide="twitter" style="color: white; width: 20px;"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="copyright">
            &copy; 2026 Kursus Jepang LPK. All rights reserved.
        </div>
    </footer>

    <script>
        // Init Icons
        lucide.createIcons();

        // Reveal Animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: "0px"
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.reveal').forEach(el => {
            observer.observe(el);
        });
    </script>
</body>
</html>
