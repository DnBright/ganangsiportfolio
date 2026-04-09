# DNB Agency Platform: End-to-End Project Documentation

## 1. Project Overview
Project **DNB Agency (The Dark & Bright)** adalah platform ekosistem agensi digital modern yang dirancang untuk mengelola berbagai lini bisnis (Multi-Domain) dalam satu basis kode (Monolith). Platform ini mengintegrasikan layanan **Digital Agency**, **LPK (Lembaga Pelatihan Kerja)**, dan **Visual Services** dengan dukungan sistem manajemen internal (Admin Dashboard) yang canggih serta fitur **Generative AI** untuk otomasi bisnis.

---

## 2. Core Technology Stack
Platform ini dibangun dengan teknologi mutakhir untuk memastikan performa tinggi dan skalabilitas:

*   **Backend Framework**: [Laravel](https://laravel.com/) (PHP) sebagai core engine.
*   **Frontend Framework**: 
    *   **React**: Digunakan untuk komponen interaktif dan dinamis (Dashboard, AI Tools, Parallax).
    *   **Blade Templates**: Sebagai wrapper dan server-side renderer utama.
    *   **Tailwind CSS**: Framework styling utama untuk desain premium dan responsif.
    *   **Alpine.js**: Digunakan untuk interaksi ringan pada sisi server (seperti modal atau mobile nav).
*   **Database**: **MySQL** untuk penyimpanan data relasional.
*   **AI Integration**: **Google Gemini AI API** (v1/v1beta) untuk pembuatan draf proposal bisnis secara otomatis.
*   **Document Generation**: **DomPDF** untuk pembuatan laporan dan ekspor proposal ke format PDF.
*   **Assets Bundling**: **Vite** untuk kompilasi asset frontend yang cepat.

---

## 3. Multi-Domain Architecture
Salah satu fitur tercanggih proyek ini adalah kemampuan melayani berbagai domain/subdomain dari satu instalasi Laravel menggunakan **Domain Routing**:

1.  **`thedarkandbright.com` (Main Agency)**: Portal utama untuk jasa agensi digital (Web Dev, Branding, AI Solution).
2.  **`agency.thedarkandbright.com` (LPK Target)**: Fokus pada program pelatihan kerja dan kemitraan agensi.
3.  **`gro.thedarkandbright.com` (Gro Visual)**: Portfolio dan layanan spesifik untuk kebutuhan visual/desain.
4.  **`admin.thedarkandbright.com` (Central Dashboard)**: Hub pusat untuk manajemen seluruh konten, leads, dan operasional agensi.

---

## 4. Key Modules & Features (End-to-End)

### A. AI-Powered Proposal Generator
Fitur unggulan agensi untuk mempercepat proses *sales*:
*   **Input**: Nama klien, industri, website target, dan masalah bisnis.
*   **Proses AI**: Mengirim data ke **Gemini Service** yang telah diprogram dengan prompt khusus untuk menghasilkan analisis masalah (Problem Analysis), solusi taktis (Digital Solutions), dan rencana kerja (Scope of Work).
*   **Output**: Draft proposal lengkap sebanyak 10+ bagian (Executive Summary, ROI Impact, Timeline, dll).
*   **Export**: Proposal dapat diedit secara langsung dan dicetak dalam format **PDF** atau tampilan **Web-Print** yang profesional.

### B. Admin Command Center (Dashboard)
Pusat kontrol bagi tim agensi:
*   **Analytics Stats**: Tracking jumlah view dan interaksi dari berbagai landing page.
*   **Lead Management**: Sistem CRM sederhana untuk mengelola calon klien yang masuk melalui formulir kontak.
*   **Portfolio Management**: CRUD untuk proyek-proyek yang ditampilkan di website.
*   **Productivity Tracker**: Kalender produktivitas untuk mencatat aktivitas harian tim dan pencapaian target.
*   **Project Management**: Pelacakan status proyek aktif (Active, Completed, On Hold).

### C. Branding & UI/UX (Frontend)
*   **Hybrid Mounting**: Menggunakan React yang di-mount ke elemen HTML spesifik (misalnya `<div id="navbar-root"></div>`), memungkinkan transisi mulus antara dynamic React components dan static Blade content.
*   **Premium Design Elements**: Implementasi Glassmorphism, efek Parallax, dan animasi berbasis scroll (Intersection Observer) untuk memberikan kesan agensi kelas atas.
*   **Multilingual Support**: Sistem translasi terpadu melalui `LanguageProvider` di React untuk dukungan bahasa Indonesia dan Inggris.

---

## 5. Database Schema & Data Logic
Hubungan antar data utama:
*   **Users**: Sistem autentikasi dengan Role-Based Access Control (Admin vs User).
*   **Proposals**: Menyimpan draf AI yang dihasilkan, lengkap dengan teks per bab.
*   **Leads**: Menyimpan data prospek (nama, email, pesan, status follow-up).
*   **Productivity Logs**: Mencatat jam kerja dan deskripsi tugas tim.
*   **Company Targets**: Database target perusahaan untuk keperluan outbound marketing.

---

## 6. Security & Infrastructure
*   **Domain Middleware**: Memastikan user hanya bisa mengakses dashboard admin melalui domain `admin.thedarkandbright.com`.
*   **Rate Limiting**: Melindungi resource API dari eksploitasi berlebihan.
*   **Shared Hosting Compatibility**: Kode menyertakan fallback khusus (seperti manual binding DomPDF) untuk memastikan fitur pembuatan PDF tetap berjalan lancar meski di lingkungan hosting terbatas.

---

## 7. Workflow Pengembangan (End-to-End)
1.  **Frontend**: Tim membuat komponen React di `resources/js/Components`.
2.  **Backend**: Route didefinisikan di `routes/web.php` berdasarkan domain.
3.  **Integration**: Controller mengirim data ke Blade, yang kemudian di-parsing oleh React via `dataset` atribut (JSON).
4.  **Automation**: AI Service (`app/Services/GeminiService.php`) menangani logika komunikasi ke API Google secara asinkron.

---
*Dokumen ini diperbarui secara berkala sesuai dengan perkembangan fitur terbaru.*
