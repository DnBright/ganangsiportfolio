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
                        'investment' => '',
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
            'investment' => '',
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
        $deadline = $data['deadline'] ?? '14 Hari';

        // Hitung rincian biaya untuk instruksi prompt
        $setupPct = ($type == 'Landing Page' ? 0.4 : ($type == 'Website Bisnis' ? 0.3 : ($type == 'Dashboard / Sistem' ? 0.2 : 0.15)));
        $maintPct = 1 - $setupPct;
        
        $setupCost = number_format($total * $setupPct, 0, ',', '.');
        $maintMonthly = number_format(($total * $maintPct) / $duration, 0, ',', '.');
        $totalFmt = number_format($total, 0, ',', '.');

        return 'Anda adalah sistem AI Proposal Generator milik agency "Dark and Bright".
        Tugas Anda adalah menghasilkan ISI PROPOSAL BISNIS PROFESIONAL yang:
        - Berfokus pada kebutuhan dan masalah klien
        - Menggunakan bahasa Indonesia formal dan profesional
        - Mudah dipahami oleh pemilik usaha dan manajemen
        - Tidak berlebihan, tidak overclaim, dan tidak terlalu teknis
        - Melindungi kepentingan bisnis Dark and Bright secara wajar

        DATA PROYEK:
        Klien: ' . $client . '
        Industri: ' . $industry . '
        Masalah: ' . $problem . '
        Tipe: ' . $type . '
        Nilai: IDR ' . $totalFmt . '
        Durasi: ' . $duration . ' Bulan
        Timeline: ' . $deadline . '

        IKUTI STRUKTUR WAJIB BERIKUT (11 BAB):

        1. Ringkasan Eksekutif (Key: executive_summary)
        - Masalah utama klien
        - Solusi inti Dark and Bright
        - Dampak bisnis (focus: control, efisiensi). Jangan tonjolkan durasi ' . $deadline . ' sebagai value utama.

        2. Latar Belakang & Masalah Klien (Key: problem_analysis)
        - Inefisiensi operasional / Ketergantungan manual
        - IMPLIKASI BISNIS: Risiko/kerugian jika tidak selesai.

        3. Tujuan Proyek (Key: project_objectives)
        - Poin terukur. Gunakan kata "Estimasi", "Potensi", "Diharapkan". JANGAN JANJI PASTI.

        4. Solusi yang Ditawarkan (Key: solutions)
        - Modul jelas.
        - Tutup dengan: "Solusi dapat dikembangkan bertahap sesuai kebutuhan."

        5. Ruang Lingkup Pekerjaan (Key: scope_of_work)
        - Daftar output konkret.
        - WAJIB TULIS: "Ruang lingkup pekerjaan dibatasi pada fitur dan modul yang disepakati dalam proposal ini. Permintaan di luar ruang lingkup akan dibahas dan disepakati secara terpisah."

        6. Alur Sistem & Cara Kerja (Key: system_walkthrough)
        - Naratif sisi user & admin. Bahasa sederhana.

        7. Timeline Implementasi (Key: timeline)
        - Tahapan: Analisis, Desain, Dev, Uji, Launch.
        - Durasi estimatif ' . $deadline . '. Tambahkan catatan fleksibilitas.

        8. Estimasi Investasi Proyek (Key: investment)
        - Sajikan rincian berikut dalam narasi profesional:
          * Setup Awal (Development): IDR ' . $setupCost . ' (Sekali bayar).
          * Maintenance & Support: IDR ' . $maintMonthly . ' / bulan selama ' . $duration . ' bulan.
          * Total Nilai Kontrak: IDR ' . $totalFmt . '.
        - WAJIB TULIS: "Estimasi investasi ini bersifat indikatif dan dapat disesuaikan berdasarkan kebutuhan final serta hasil diskusi lanjutan."

        9. Estimasi Dampak & ROI (Key: roi_impact)
        - Ilustratif. Jangan janji finansial pasti.

        10. Nilai Tambah Dark and Bright (Key: value_add)
        - Fokus pendekatan sistem & cara berpikir.

        11. Penutup & Ajakan (Key: closing_cta)
        - Next step: Meeting/Demo.

        OUTPUT JSON MURNI:
        {
          "title": "Proposal Proyek...",
          "executive_summary": "...",
          "problem_analysis": "...",
          "project_objectives": "...",
          "solutions": "...",
          "scope_of_work": "...",
          "system_walkthrough": "...",
          "timeline": "...",
          "investment": "...",
          "roi_impact": "...",
          "value_add": "...",
          "closing_cta": "...",
          "pricing": "' . $totalFmt . '"
        }';
    }
}
