<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class GeminiService
{
    protected $apiKey;
    protected $baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models/';
    protected $models = [
        'gemini-2.0-flash',
        'gemini-1.5-flash-latest',
        'gemini-flash-latest',
        'gemini-pro-latest',
        'gemini-2.0-flash-lite-001'
    ];

    public function __construct()
    {
        $this->apiKey = config('services.gemini.key');
    }

    public function generateProposal($data)
    {
        if (!$this->apiKey) {
            return "Error: Gemini API Key is not configured in .env (GEMINI_API_KEY).";
        }

        $prompt = $this->buildPrompt($data);
        $lastError = 'Unknown error';

        foreach ($this->models as $model) {
            try {
                $endpoint = $this->baseUrl . $model . ':generateContent?key=' . $this->apiKey;
                
                $response = Http::post($endpoint, [
                    'contents' => [
                        [
                            'parts' => [
                                ['text' => $prompt]
                            ]
                        ]
                    ],
                    'generationConfig' => [
                        'temperature' => 0.7,
                        'topK' => 40,
                        'topP' => 0.95,
                        'maxOutputTokens' => 4096,
                    ]
                ]);

                if ($response->successful()) {
                    $result = $response->json();
                    $text = $result['candidates'][0]['content']['parts'][0]['text'] ?? '';
                    
                    // Clean up markdown code blocks if the AI includes them
                    $text = preg_replace('/```json\s?|\s?```/', '', $text);
                    
                    $decoded = json_decode($text, true);
                    
                    if (is_array($decoded)) {
                        // Ensure all elements are strings to prevent React crash (Error #31)
                        return array_map(function($val) {
                            return is_array($val) ? json_encode($val) : (string)$val;
                        }, $decoded);
                    }

                    return [
                        'title' => 'Proposal ' . ($data['client_name'] ?? 'Klien'),
                        'executive_summary' => (string)$text,
                        'problem_analysis' => '',
                        'project_objectives' => '',
                        'solutions' => '',
                        'scope_of_work' => '',
                        'system_walkthrough' => '',
                        'timeline' => '',
                        'roi_impact' => '',
                        'value_add' => '',
                        'closing_cta' => '',
                        'pricing' => isset($data['total_value']) ? number_format($data['total_value'], 0, ',', '.') : ''
                    ];
                }

                $lastError = $response->json()['error']['message'] ?? 'Unknown error';
                Log::warning("Gemini model $model failed: $lastError. Trying next...");

            } catch (\Exception $e) {
                $lastError = $e->getMessage();
                Log::error("Gemini Service Exception with $model: " . $lastError);
            }
        }

        return [
            'title' => 'Error Generation',
            'executive_summary' => "Gemini API Error (Confirmed models failed): " . $lastError,
            'problem_analysis' => '',
            'project_objectives' => '',
            'solutions' => '',
            'scope_of_work' => '',
            'system_walkthrough' => '',
            'timeline' => '',
            'roi_impact' => '',
            'value_add' => '',
            'closing_cta' => '',
            'pricing' => ''
        ];
    }

    protected function buildPrompt($data)
    {
        $client = $data['client_name'] ?? 'Klien';
        $industry = $data['industry'] ?? 'Industri Umum';
        $website = $data['target_website'] ?? 'Tidak disebutkan';
        $problem = $data['problem_statement'] ?? 'Tidak disebutkan';
        $type = $data['project_type'] ?? 'Website Bisnis';
        $total = $data['total_value'] ?? 0;
        $duration = $data['contract_duration'] ?? 6;

        return 'Anda adalah sistem AI Proposal Generator milik agency "Dark and Bright".
        Tugas Anda adalah menghasilkan ISI PROPOSAL PROFESIONAL dengan standar "High-Ticket Consultancy".
        
        Klien: ' . $client . '
        Industri: ' . $industry . '
        Masalah: ' . $problem . '
        Tipe: ' . $type . '
        Nilai: IDR ' . number_format($total, 0, ',', '.') . '
        Durasi: ' . $duration . ' Bulan
        
        PRINSIP DASAR PERHITUNGAN BIAYA (Dark and Bright):
        - Total nilai proyek dianggap sebagai 100% nilai kontrak.
        - Persentase Setup & Maintenance berdasarkan Tipe Proyek:
          * Landing Page: Setup 40%, Maintenance 60%
          * Website Bisnis: Setup 30%, Maintenance 70%
          * Dashboard / Sistem: Setup 20%, Maintenance 80%
          * Sistem Kompleks: Setup 15%, Maintenance 85%
        - Nilai Setup = Persentase Setup × Nilai Total
        - Nilai Maintenance Total = Persentase Maintenance × Nilai Total
        - Maintenance Bulanan = Nilai Maintenance Total ÷ ' . $duration . ' bulan

        INSTRUKSI KHUSUS PER BAGIAN (STRATEGIC WRITING):

        1. RINGKASAN EKSEKUTIF:
           - Jangan tonjolkan "Waktu Pengerjaan" sebagai headline utama. Jadikan itu detail pendukung.
           - FOKUS UTAMA: Kontrol manajemen, visibilitas bisnis, dan solusi masalah.
           - Tone: "Kami membereskan masalah Anda agar Anda bisa fokus membesarkan bisnis."

        2. LATAR BELAKANG & MASALAH:
           - Wajib tambahkan "IMPLIKASI BISNIS" jika masalah tidak diselesaikan.
           - Contoh: "Risiko kehilangan potensi margin..." atau "Keputusan berbasis asumsi yang berisiko..."
           - Buat klien merasa urgensi tanpa merasa dihakimi.

        3. TUJUAN PROYEK:
           - GUNAKAN KATA AMAN: "Estimasi", "Potensi Peningkatan", "Target".
           - JANGAN pakai kata pasti seperti "Akan menjamin peningkatan 60%". Hindari risiko hukum.

        4. SOLUSI:
           - Tutup bagian ini dengan disclaimer skalabilitas: "Solusi disesuaikan dengan kebutuhan inti operasional saat ini dan dapat dikembangkan bertahap sesuai kebutuhan bisnis."

        5. RUANG LINGKUP (SCOPE):
           - TAMBAHKAN PEMBATAS TEGAS: "Ruang lingkup pekerjaan dibatasi pada fitur dan modul yang disepakati dalam proposal ini. Permintaan di luar ruang lingkup akan dibahas secara terpisah." (PENTING UNTUK MENCEGAH SCOPE CREEP).

        6. ALUR SISTEM:
           - Jelaskan dengan bahasa awam, fokus pada kemudahan user.

        7. TIMELINE & INVESTASI (BAB 7) - WAJIB ADA RINCIAN BIAYA:
           - Bagian A: Timeline Implementasi (Logis & Bertahap).
           - Bagian B: Estimasi Investasi & Pembiayaan.
             * Tampilkan breakdown: Setup Awal (IDR ' . number_format($total * ($type == 'Landing Page' ? 0.4 : ($type == 'Website Bisnis' ? 0.3 : ($type == 'Dashboard / Sistem' ? 0.2 : 0.15))), 0, ',', '.') . ') & Maintenance Bulanan (IDR ' . number_format(($total * ($type == 'Landing Page' ? 0.6 : ($type == 'Website Bisnis' ? 0.7 : ($type == 'Dashboard / Sistem' ? 0.8 : 0.85)))) / $duration, 0, ',', '.') . '/bulan).
           - Tutup dengan: "Estimasi ini dapat disesuaikan berdasarkan hasil diskusi lanjutan dan penyesuaian ruang lingkup."

        8. ESTIMASI DAMPAK & ROI:
           - Tambahkan disclaimer: "Estimasi dampak bersifat ilustratif dan bergantung pada implementasi serta operasional internal klien."

        9. NILAI TAMBAH DARK AND BRIGHT:
           - Fokus pada "Pendekatan Berbasis Sistem & Data", bukan hanya "Desain Bagus".

        10. PENUTUP:
            - Berikan Call to Action jelas: "Langkah selanjutnya: Diskusi Teknis / Demo Sistem."

        OUTPUT JSON MURNI (Tanpa Markdown):
        Keys: "title", "executive_summary", "problem_analysis", "project_objectives", "solutions", "scope_of_work", "system_walkthrough", "timeline", "roi_impact", "value_add", "closing_cta", "pricing"
        Key "pricing" isi dengan string nominal total saja.';
    }
}
